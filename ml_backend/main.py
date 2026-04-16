from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from recommender import TravelRecommender
from dropout_predictor import DropoutPredictor
from semantic_search import SemanticSearcher

app = FastAPI(
    title="MyQuickTrippers Recommendation API",
    description="Returns similar travel packages based on content-based filtering.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

PACKAGES_FILE = os.getenv("PACKAGES_FILE", "packages.json")
try:
    recommender = TravelRecommender(PACKAGES_FILE)
except Exception as e:
    recommender = None
    print(f"Warning: Could not load packages from {PACKAGES_FILE}: {e}")

try:
    dropout_model = DropoutPredictor()
except Exception as e:
    dropout_model = None
    print(f"Warning: Could not initialize dropout predictor: {e}")

try:
    searcher = SemanticSearcher(PACKAGES_FILE)
except Exception as e:
    searcher = None
    print(f"Warning: Could not initialize semantic searcher: {e}")

class PackageOut(BaseModel):
    id: str
    name: str
    destination: str
    category: str
    duration_days: int
    budget_inr: int
    similarity_score: Optional[float] = None
    class Config:
        extra = "allow"

class RecommendResponse(BaseModel):
    package_id: str
    recommendations: list[PackageOut]

class DropoutPayload(BaseModel):
    time_on_page: float
    steps_completed: int
    clicks: int
    device: int  # 0 for Mobile, 1 for Desktop

class DropoutResponse(BaseModel):
    risk_score: float
    show_nudge: bool

class SearchResponse(BaseModel):
    query: str
    results: list[PackageOut]

@app.get("/health")
def health_check():
    count = len(recommender.df) if recommender else 0
    return {"status": "ok", "packages_loaded": count}

@app.get("/packages", response_model=list[PackageOut])
def get_all_packages():
    if not recommender:
        return []
    return recommender.df.to_dict(orient="records")

@app.get("/recommend/{package_id}", response_model=RecommendResponse)
def recommend(
    package_id: str,
    top_n: int = Query(default=5, ge=1, le=20)
):
    if not recommender:
        raise HTTPException(status_code=500, detail="Recommender not initialized")
    try:
        recs = recommender.get_recommendations(package_id, top_n=top_n)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return RecommendResponse(package_id=package_id, recommendations=recs)

@app.post("/predict-dropout", response_model=DropoutResponse)
def predict_dropout(payload: DropoutPayload):
    """
    Accepts real-time session metrics from the frontend, uses the ML model
    to predict dropout risk, and tells the frontend whether to show a nudge.
    """
    if not dropout_model:
        raise HTTPException(status_code=500, detail="Dropout Predictor not initialized.")

    risk = dropout_model.predict_risk(
        time_on_page=payload.time_on_page,
        steps_completed=payload.steps_completed,
        clicks=payload.clicks,
        device=payload.device
    )

    # Threshold for triggering a nudge - if risk is > 70%, trigger it
    show_nudge = risk > 0.70

    return DropoutResponse(risk_score=risk, show_nudge=show_nudge)

@app.get("/search", response_model=SearchResponse)
def search_packages(q: str = Query(..., description="Natural language search query"), top_n: int = 5):
    """
    Accepts natural language queries like 'cheap beach trip for family'
    and uses the embedding model to find the most conceptually relevant packages.
    """
    if not searcher:
        raise HTTPException(status_code=500, detail="Semantic Searcher not initialized.")
    results = searcher.search(query=q, top_n=top_n)
    return SearchResponse(query=q, results=results)
