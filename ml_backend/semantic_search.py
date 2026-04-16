import json
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

class SemanticSearcher:
    """
    Takes natural language queries like "romantic beach trip under 50k" 
    and uses an NLP model to find the most conceptually relevant packages, 
    even if the exact keywords don't match!
    """
    def __init__(self, packages_filepath: str):
        with open(packages_filepath, "r") as f:
            data = json.load(f)
        self.df = pd.DataFrame(data)
        
        # 1. Synthesize a "document" for each package to help the AI understand its context
        self.df["synthetic_text"] = self.df.apply(
            lambda row: f"{row['name']} in {row['destination']}. A {row['duration_days']}-day {row['category']} trip for roughly {row['budget_inr']} rupees.", 
            axis=1
        )
        
        # 2. Load a very fast, lightweight embedding model
        #    'all-MiniLM-L6-v2' is perfect for this. It downloads automatically the first time.
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # 3. Pre-compute the mathematically embedded vectors for all packages.
        #    (In a massive app, you'd store this in a Vector DB like Pinecone/Faiss)
        self.embeddings = self.model.encode(self.df["synthetic_text"].tolist())

    def search(self, query: str, top_n: int = 5) -> list[dict]:
        # Embed the user's natural language query
        query_embedding = self.model.encode([query])
        
        # Compare the query vector against all package vectors
        similarities = cosine_similarity(query_embedding, self.embeddings)[0]
        
        # Get the top matches
        best_indices = np.argsort(similarities)[::-1][:top_n]
        
        results = []
        for idx in best_indices:
            pkg = self.df.iloc[idx].to_dict()
            # Remove the internal synthetic text from the response payload
            pkg.pop("synthetic_text", None)
            pkg["match_score"] = float(similarities[idx])
            
            # Filter out weak conceptual links (threshold e.g., > 0.20)
            if pkg["match_score"] > 0.20:
                results.append(pkg)
                
        return results

if __name__ == "__main__":
    # Smoke test
    import tempfile, os
    sample_packages = [
        {"id": "pkg_001", "name": "Bali Honeymoon Escape", "destination": "Bali", "category": "honeymoon", "duration_days": 7, "budget_inr": 85000},
        {"id": "pkg_002", "name": "Bali Adventure Trek", "destination": "Bali", "category": "adventure", "duration_days": 5, "budget_inr": 55000},
        {"id": "pkg_003", "name": "Manali Snow Adventure", "destination": "Manali", "category": "adventure", "duration_days": 6, "budget_inr": 40000},
    ]
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        json.dump(sample_packages, f)
        tmp_path = f.name
    
    print("Loading AI Model...")
    searcher = SemanticSearcher(tmp_path)
    
    test_queries = [
        "romantic trip for couples",
        "cold mountains action",
    ]
    
    for q in test_queries:
        print(f"\nQuery: '{q}'")
        res = searcher.search(q, top_n=2)
        for r in res:
            print(f" -> {r['name']} (Match: {r['match_score']:.2f})")
            
    os.unlink(tmp_path)
