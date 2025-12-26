from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.routes_ask import router as ask_router

app = FastAPI(title="Self-Trust Productivity Coach API")

# allow your frontend origin
origins = [
    "http://localhost:5173",  # or 3000, or whatever your React dev server is
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ask_router, prefix="/api/v1")
