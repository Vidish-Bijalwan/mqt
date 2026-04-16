import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

class DropoutPredictor:
    """
    Simulates a machine learning model designed to predict if a user is
    about to drop off without inquiring or booking.
    
    In a real scenario, you would train this on historical GA4 or Mixpanel 
    session data. Here, we train a RandomForest on synthetic data replicating 
    common behavioral patterns (e.g., high time on page but 0 steps finished = high risk).
    """
    def __init__(self):
        self.model = RandomForestClassifier(max_depth=5, random_state=42)
        self.scaler = StandardScaler()
        self._train_dummy_model()

    def _train_dummy_model(self):
        # Generate synthetic session data that mimics travel site users
        np.random.seed(42)
        N = 2000
        # Features
        time_on_page = np.random.uniform(10, 600, N)    # Seconds
        steps_completed = np.random.randint(0, 5, N)    # Form steps or filters used
        clicks = np.random.randint(2, 50, N)            # Interaction count
        device = np.random.randint(0, 2, N)             # 0 = Mobile, 1 = Desktop

        # Logic for generating targets: 
        # - High time but low steps = likely stuck/dropout
        # - High clicks but low steps = frustrated/dropout
        prob_stuck = (time_on_page > 180) & (steps_completed == 0)
        prob_frustrated = (clicks > 20) & (steps_completed < 2)
        base_dropout_rate = 0.3
        
        y_prob = np.where(prob_stuck | prob_frustrated, 0.85, base_dropout_rate)
        y = (np.random.rand(N) < y_prob).astype(int)

        X = np.column_stack([time_on_page, steps_completed, clicks, device])
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)

    def predict_risk(self, time_on_page: float, steps_completed: int, clicks: int, device: int) -> float:
        """
        Returns a float between 0.0 and 1.0 representing the predicted probability
        that this user will abandon the session.
        """
        X = np.array([[time_on_page, steps_completed, clicks, device]])
        X_scaled = self.scaler.transform(X)
        # return probability of class 1 (Dropout)
        risk_prob = self.model.predict_proba(X_scaled)[0][1]
        return float(risk_prob)

if __name__ == "__main__":
    # Smoke test
    predictor = DropoutPredictor()
    # Mocking a user who has been on the site for 3 minutes, clicked around a lot, 
    # but hasn't completed any specific booking "steps".
    risk = predictor.predict_risk(time_on_page=200, steps_completed=0, clicks=25, device=0)
    print(f"Test User Dropout Risk: {risk:.2f} (Expected High)")
    
    # Mocking a user who made decisions fast
    risk2 = predictor.predict_risk(time_on_page=45, steps_completed=3, clicks=5, device=1)
    print(f"Test User 2 Dropout Risk: {risk2:.2f} (Expected Low)")
