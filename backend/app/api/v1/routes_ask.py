from fastapi import APIRouter
from app.schemas.ask import AskRequest, AskResponse
from app.services.suggestion_service import generate_suggestion

router = APIRouter(tags=["coach"])

@router.post("/ask", response_model=AskResponse)
def ask_coach(payload: AskRequest):
    suggestion = generate_suggestion(payload.user, payload.message)
    return AskResponse(suggestion=suggestion)
