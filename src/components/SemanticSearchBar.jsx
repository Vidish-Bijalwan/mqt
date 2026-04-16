import { useState, useRef, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const formatBudget = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

const SemanticSearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  // Debounce the search so we aren't hammering the API on every keystroke
  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setShowDropdown(true);
      try {
        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}&top_n=5`);
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={styles.wrapper} ref={wrapperRef}>
      <div style={styles.searchContainer}>
        <span style={styles.icon}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0 || loading) setShowDropdown(true); }}
          placeholder="Try 'romantic trip to the mountains for 50k'..."
          style={styles.input}
        />
        {loading && <span style={styles.spinner}>...</span>}
      </div>

      {showDropdown && (query.length >= 3) && (
        <div style={styles.dropdown}>
          {loading ? (
            <div style={styles.dropdownMessage}>Thinking...</div>
          ) : results.length > 0 ? (
            <ul style={styles.resultList}>
              {results.map((pkg) => (
                <li
                  key={pkg.id}
                  style={styles.resultItem}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f7f7f7")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  onClick={() => {
                    window.location.href = `/packages/${pkg.id}`;
                    setShowDropdown(false);
                  }}
                >
                  <div style={styles.resultMain}>
                    <strong>{pkg.name}</strong>
                    <span style={styles.matchpill}>
                      {Math.round(pkg.match_score * 100)}% match
                    </span>
                  </div>
                  <div style={styles.resultMeta}>
                    {pkg.destination} • {pkg.duration_days} Days • {formatBudget(pkg.budget_inr)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div style={styles.dropdownMessage}>No perfect matches found. Try another phrase!</div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: { position: "relative", width: "100%", maxWidth: "600px", margin: "0 auto", zIndex: 1000 },
  searchContainer: { display: "flex", alignItems: "center", background: "#fff", borderRadius: "30px", padding: "8px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #eaeaea", position: "relative" },
  icon: { fontSize: "18px", color: "#888", marginRight: "12px" },
  input: { flex: 1, border: "none", outline: "none", fontSize: "16px", color: "#333", background: "transparent", padding: "8px 0", minWidth: "0" },
  spinner: { color: "#999", fontSize: "14px", fontWeight: "bold", animation: "pulse 1s infinite" },
  dropdown: { position: "absolute", top: "calc(100% + 12px)", left: 0, right: 0, background: "#fff", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.15)", border: "1px solid #eaeaea", overflow: "hidden" },
  resultList: { listStyle: "none", margin: 0, padding: 0 },
  resultItem: { padding: "16px 20px", cursor: "pointer", borderBottom: "1px solid #f5f5f5", transition: "background 0.2s" },
  resultMain: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" },
  matchpill: { fontSize: "11px", fontWeight: "600", background: "#e0faea", color: "#0c8b41", padding: "3px 8px", borderRadius: "12px" },
  resultMeta: { fontSize: "13px", color: "#777" },
  dropdownMessage: { padding: "20px", textAlign: "center", color: "#777", fontSize: "14px" }
};

export default SemanticSearchBar;
