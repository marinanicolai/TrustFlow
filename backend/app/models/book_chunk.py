from sqlalchemy import Column, Integer, String, Float, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class BookChunk(Base):
    __tablename__ = "book_chunks"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(String, index=True)
    content = Column(String)
    start_page = Column(Integer)
    end_page = Column(Integer)
    topic_tags = Column(JSON)      # ["procrastination", "perfectionism", ...]
    strategy_type = Column(String) # "tiny_habit" | "timeboxing" | ...
    time_cost = Column(String)     # "5min" | "15min" | "30min+"
    difficulty = Column(String)    # "low" | "medium" | "high"
    embedding_id = Column(String)  # key for vector DB (FAISS/PGV/etc.)
