import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:8000" : "https://api.myquicktrippers.com");

const formatBudget = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

const categoryEmoji = {
  honeymoon: "💑",
  adventure: "🧗",
  family: "👨‍👩‍👧",
  leisure: "🏖️",
};

const SkeletonCard = () => (
  <div style={styles.card}>
    <div style={{ ...styles.skeletonBlock, height: "140px", borderRadius: "8px 8px 0 0" }} />
    <div style={styles.cardBody}>
      <div style={{ ...styles.skeletonBlock, height: "16px", width: "80%" }} />
      <div style={{ ...styles.skeletonBlock, height: "12px", width: "50%", marginTop: "8px" }} />
      <div style={{ ...styles.skeletonBlock, height: "12px", width: "60%", marginTop: "8px" }} />
    </div>
  </div>
);

const PackageCard = ({ pkg, onSelect }) => (
  <div
    style={styles.card}
    onClick={() => onSelect(pkg.id)}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    title={`View ${pkg.name}`}
  >
    <div style={{ ...styles.cardHeader, background: destinationGradient(pkg.destination) }}>
      <span style={styles.categoryBadge}>
        {categoryEmoji[pkg.category] || "✈️"} {pkg.category}
      </span>
      <span style={styles.destinationLabel}>{pkg.destination}</span>
    </div>
    <div style={styles.cardBody}>
      <h4 style={styles.packageName}>{pkg.name}</h4>
      <p style={styles.meta}>📅 {pkg.duration_days} days</p>
      <p style={styles.price}>{formatBudget(pkg.budget_inr)}</p>
      {pkg.similarity_score !== undefined && (
        <div style={styles.matchBar}>
          <div style={styles.matchLabel}>Match</div>
          <div style={styles.matchTrack}>
            <div style={{ ...styles.matchFill, width: `${Math.round(pkg.similarity_score * 100)}%` }} />
          </div>
          <div style={styles.matchPercent}>{Math.round(pkg.similarity_score * 100)}%</div>
        </div>
      )}
    </div>
  </div>
);

const destinationGradient = (destination) => {
  const gradients = {
    Bali:    "linear-gradient(135deg, #f093fb, #f5576c)",
    Manali:  "linear-gradient(135deg, #4facfe, #00f2fe)",
    Paris:   "linear-gradient(135deg, #43e97b, #38f9d7)",
    Kerala:  "linear-gradient(135deg, #fa709a, #fee140)",
    Goa:     "linear-gradient(135deg, #a18cd1, #fbc2eb)",
  };
  return gradients[destination] || "linear-gradient(135deg, #667eea, #764ba2)";
};

const PackageRecommendations = ({ packageId, topN = 4 }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!packageId) return;
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/recommend/${packageId}?top_n=${topN}`);
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const data = await res.json();
        setRecommendations(data.recommendations);
      } catch (err) {
        console.error("Recommendation fetch failed:", err);
        setError("Couldn't load recommendations right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [packageId, topN]);

  if (!loading && !error && recommendations.length === 0) return null;

  return (
    <section style={styles.section}>
      <h3 style={styles.heading}>✨ You might also love</h3>
      <p style={styles.subheading}>Packages similar to the one you're viewing</p>
      <div style={styles.grid}>
        {loading
          ? Array.from({ length: topN }).map((_, i) => <SkeletonCard key={i} />)
          : error
            ? <p style={styles.errorText}>{error}</p>
            : recommendations.map(pkg => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onSelect={(id) => {
                    window.location.href = `/packages/${id}`;
                  }}
                />
              ))
        }
      </div>
    </section>
  );
};

const styles = {
  section: { padding: "40px 0", borderTop: "1px solid #f0f0f0", marginTop: "48px" },
  heading: { fontSize: "22px", fontWeight: "700", margin: "0 0 6px 0", color: "#1a1a2e" },
  subheading: { fontSize: "14px", color: "#888", margin: "0 0 28px 0" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" },
  card: { borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease", background: "#fff" },
  cardHeader: { height: "140px", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "12px" },
  categoryBadge: { background: "rgba(255,255,255,0.25)", color: "#fff", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", textTransform: "capitalize", alignSelf: "flex-start", backdropFilter: "blur(4px)" },
  destinationLabel: { color: "#fff", fontWeight: "700", fontSize: "18px", textShadow: "0 1px 4px rgba(0,0,0,0.3)" },
  cardBody: { padding: "14px" },
  packageName: { fontSize: "14px", fontWeight: "600", margin: "0 0 8px 0", color: "#2d2d2d", lineHeight: "1.4" },
  meta: { fontSize: "12px", color: "#777", margin: "0 0 4px 0" },
  price: { fontSize: "15px", fontWeight: "700", color: "#e84393", margin: "6px 0 10px 0" },
  matchBar: { display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" },
  matchLabel: { fontSize: "10px", color: "#aaa", width: "30px" },
  matchTrack: { flex: 1, height: "4px", background: "#f0f0f0", borderRadius: "2px", overflow: "hidden" },
  matchFill: { height: "100%", background: "linear-gradient(90deg, #43e97b, #38f9d7)", borderRadius: "2px", transition: "width 0.6s ease" },
  matchPercent: { fontSize: "10px", color: "#aaa", width: "28px", textAlign: "right" },
  skeletonBlock: { background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", borderRadius: "4px" },
  errorText: { color: "#e84393", fontSize: "14px", gridColumn: "1 / -1" },
};

export default PackageRecommendations;
