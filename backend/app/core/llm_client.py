# backend/app/core/llm_client.py

import os
from groq import Groq
from typing import Literal

# 1) Read the API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not set. Add it to your .env file or environment.")

# 2) Create Groq client
client = Groq(api_key=GROQ_API_KEY)

# 3) Optionally choose a default model
GroqModel = Literal[
    "llama-3.1-8b-instant",
    "llama-3.1-70b-versatile",
    "llama3-8b-8192",
    "llama3-70b-8192",
]

DEFAULT_MODEL: GroqModel = "llama-3.1-8b-instant"


def call_llm(system_prompt: str, user_message: str, model: GroqModel = DEFAULT_MODEL) -> str:
    """
    Simple helper that sends a system + user message to Groq
    and returns the assistant's text.
    """
    completion = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        temperature=0.7,
        max_tokens=512,
    )

    return completion.choices[0].message.content.strip()
