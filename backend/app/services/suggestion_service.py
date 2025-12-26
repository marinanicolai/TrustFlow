from app.core.llm_client import call_llm
from app.schemas.ask import UserContext

def generate_suggestion(user: UserContext, message: str) -> str:
    # === Pre-rules: trust-based constraints ===
    trust = user.currentTrustScore

    if trust <= 3:
        max_steps = 1
        max_time = "10 minutes"
    elif trust <= 6:
        max_steps = 3
        max_time = "30 minutes"
    else:
        max_steps = 5
        max_time = "45 minutes"

    # TODO: add intent classification when you’re ready
    # intent = classify_intent(message)

    system_prompt = f"""
You are a gentle but practical self-trust and productivity coach.

USER CONTEXT:
- Trust score: {trust}/10
- Focus areas: {", ".join(user.focusAreas)}

RULES:
- Create a concrete plan with at most {max_steps} steps.
- Total time must be <= {max_time}.
- Each step must be observable (the user can clearly tell if it's done).
- Keep language simple and encouraging, not shaming.
- End with exactly ONE reflection question about self-trust.
- Do NOT give therapy, medical, or mental-health diagnoses.
"""

    return call_llm(system_prompt, message)
