import { useState, useEffect, useRef } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:8000" : "https://api.myquicktrippers.com");

const RetentionNudge = () => {
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);

  // Use refs to silently track state without causing React re-renders on every tick/click
  const startTime = useRef(Date.now());
  const clicks = useRef(0);
  const stepsCompleted = useRef(0); // In reality, update this when forms/filters act up

  useEffect(() => {
    // 1. Silent click tracker
    const trackClick = () => { clicks.current += 1; };
    window.addEventListener("click", trackClick);

    // 2. Periodic checker pinging the ML model
    const checker = setInterval(async () => {
      // Stop checking if showing or permanently dismissed
      if (showNudge || nudgeDismissed) return;
      
      // Check for cookie consent before tracking data
      const consent = localStorage.getItem('mqt_cookie_consent');
      if (consent === 'declined') return;

      const timeOnPage = (Date.now() - startTime.current) / 1000;
      const device = window.innerWidth < 768 ? 0 : 1;

      try {
        const response = await fetch(`${API_BASE_URL}/predict-dropout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            time_on_page: timeOnPage,
            steps_completed: stepsCompleted.current,
            clicks: clicks.current,
            device: device,
          })
        });

        if (!response.ok) throw new Error("API error");
        
        const data = await response.json();
        
        // Machine Learning told us this user is going to leave! Show the nudge!
        if (data.show_nudge) {
          setShowNudge(true);
        }

      } catch (err) {
        console.error("Dropout prediction failed", err);
      }
    }, 15000); // Check every 15 seconds

    return () => {
      window.removeEventListener("click", trackClick);
      clearInterval(checker);
    };
  }, [showNudge, nudgeDismissed]);

  if (!showNudge || nudgeDismissed) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.nudgeBox}>
        <button 
          style={styles.closeBtn} 
          onClick={() => {
            setShowNudge(false);
            setNudgeDismissed(true);
          }}>
          ✕
        </button>
        <span style={styles.icon}>🤔</span>
        <div style={styles.content}>
          <h3 style={styles.title}>Still deciding?</h3>
          <p style={styles.text}>
            Our travel experts can help you customize the perfect itinerary based on your budget.
          </p>
          <div style={styles.btnRow}>
            <button style={styles.primaryBtn} onClick={() => alert("Open Chat/Form!")}>
              Chat with an Expert
            </button>
            <button style={styles.secondaryBtn} onClick={() => {
              setShowNudge(false);
              setNudgeDismissed(true);
            }}>
              Keep browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: "fixed", bottom: "20px", right: "20px", zIndex: 9999, animation: "slideUp 0.4s ease-out" },
  nudgeBox: { display: "flex", gap: "16px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.15)", maxWidth: "340px", border: "1px solid #eaeaea", position: "relative" },
  closeBtn: { position: "absolute", top: "10px", right: "10px", background: "none", border: "none", fontSize: "14px", cursor: "pointer", color: "#999" },
  icon: { fontSize: "32px", lineHeight: "1" },
  content: { flex: 1 },
  title: { margin: "0 0 6px 0", fontSize: "16px", fontWeight: "700", color: "#111" },
  text: { margin: "0 0 16px 0", fontSize: "13px", color: "#555", lineHeight: "1.5" },
  btnRow: { display: "flex", gap: "10px" },
  primaryBtn: { flex: 1, padding: "8px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s" },
  secondaryBtn: { flex: 1, padding: "8px", background: "#f5f5f5", color: "#555", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }
};

export default RetentionNudge;
