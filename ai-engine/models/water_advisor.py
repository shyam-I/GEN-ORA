import os
from pathlib import Path

import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from the workspace .env (backend/.env).
# This ensures GEMINI_API_KEY is available when running from ai-engine.
env_paths = [
    Path(__file__).resolve().parent / ".env",
    Path(__file__).resolve().parents[1] / ".env",
    Path(__file__).resolve().parents[2] / "backend" / ".env",
]
for env_path in env_paths:
    if env_path.exists():
        load_dotenv(env_path)
        break

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("Missing GEMINI_API_KEY environment variable")

genai.configure(api_key=api_key)

# Use a supported Gemini model name.
model = genai.GenerativeModel("models/gemini-2.5-flash")


def ask_llm(question: str) -> str:
    """Ask the Gemini model and return a text response."""

    if not question or not str(question).strip():
        return "I need a question to answer. Please ask about leak detection, irrigation, or usage forecasting."

    prompt = (
        "You are AquaSense AI, an assistant specialized in water usage forecasting, "
        "leak detection, and irrigation guidance. Provide a clear, concise answer.\n\n"
        f"Question: {question}"
    )

    response = model.generate_content(prompt)

    if hasattr(response, "text") and response.text:
        return response.text

    if hasattr(response, "candidates") and response.candidates:
        first = response.candidates[0]
        return getattr(first, "content", str(first))

    return str(response)
