import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction import DictVectorizer

def load_packages(filepath: str) -> pd.DataFrame:
    with open(filepath, "r") as f:
        data = json.load(f)
    return pd.DataFrame(data)

def build_feature_matrix(df: pd.DataFrame):
    categorical_fields = ["destination", "category"]
    cat_dicts = df[categorical_fields].to_dict(orient="records")
    vec = DictVectorizer(sparse=False)
    cat_matrix = vec.fit_transform(cat_dicts)

    numeric_fields = ["duration_days", "budget_inr"]
    scaler = MinMaxScaler()
    num_matrix = scaler.fit_transform(df[numeric_fields])

    feature_matrix = np.hstack([cat_matrix, num_matrix])
    return feature_matrix, vec, scaler

def compute_similarity_matrix(feature_matrix: np.ndarray) -> np.ndarray:
    return cosine_similarity(feature_matrix)

class TravelRecommender:
    def __init__(self, packages_filepath: str):
        self.df = load_packages(packages_filepath)
        self.feature_matrix, self.vec, self.scaler = build_feature_matrix(self.df)
        self.similarity_matrix = compute_similarity_matrix(self.feature_matrix)
        self.id_to_index = {pkg_id: idx for idx, pkg_id in enumerate(self.df["id"])}

    def get_recommendations(self, package_id: str, top_n: int = 5) -> list[dict]:
        if package_id not in self.id_to_index:
            raise ValueError(f"Package '{package_id}' not found in dataset.")
        idx = self.id_to_index[package_id]
        scores = list(enumerate(self.similarity_matrix[idx]))
        scores_sorted = sorted(scores, key=lambda x: x[1], reverse=True)
        top_matches = [s for s in scores_sorted if s[0] != idx][:top_n]

        results = []
        for match_idx, score in top_matches:
            pkg = self.df.iloc[match_idx].to_dict()
            pkg["similarity_score"] = round(float(score), 4)
            results.append(pkg)
        return results

if __name__ == "__main__":
    import tempfile, os
    sample_packages = [
        {"id": "pkg_001", "name": "Bali Honeymoon Escape", "destination": "Bali", "category": "honeymoon", "duration_days": 7, "budget_inr": 85000},
        {"id": "pkg_002", "name": "Bali Adventure Trek", "destination": "Bali", "category": "adventure", "duration_days": 5, "budget_inr": 55000},
        {"id": "pkg_003", "name": "Manali Snow Adventure", "destination": "Manali", "category": "adventure", "duration_days": 6, "budget_inr": 40000},
        {"id": "pkg_004", "name": "Paris Romantic Getaway", "destination": "Paris", "category": "honeymoon", "duration_days": 8, "budget_inr": 150000},
        {"id": "pkg_005", "name": "Kerala Family Tour", "destination": "Kerala", "category": "family", "duration_days": 5, "budget_inr": 60000},
        {"id": "pkg_006", "name": "Goa Leisure Beach", "destination": "Goa", "category": "leisure", "duration_days": 4, "budget_inr": 35000},
    ]
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        json.dump(sample_packages, f)
        tmp_path = f.name
    recommender = TravelRecommender(tmp_path)
    recs = recommender.get_recommendations("pkg_001", top_n=3)
    print("Recommendations for 'Bali Honeymoon Escape':")
    for r in recs:
        print(f"  -> {r['name']} (similarity: {r['similarity_score']})")
    os.unlink(tmp_path)
