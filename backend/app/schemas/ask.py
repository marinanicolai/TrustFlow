from pydantic import BaseModel
from typing import List, Literal

TrustArea = Literal["procrastination", "perfectionism", "overwhelm", "self_criticism"]

class UserContext(BaseModel):
    id: str
    name: str
    currentTrustScore: int          # 1–10
    focusAreas: List[TrustArea]

class AskRequest(BaseModel):
    message: str                    # "I keep checking my phone..."
    user: UserContext               # minimal info we need from frontend

class AskResponse(BaseModel):
    suggestion: str                 # formatted coach response (for now)
