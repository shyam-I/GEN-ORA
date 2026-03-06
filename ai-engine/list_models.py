import os
from pathlib import Path

import google.generativeai as genai
from dotenv import load_dotenv

# Load the key from the backend .env for the current workspace.
for env_path in [
    Path(__file__).resolve().parent / ".env",
    Path(__file__).resolve().parents[1] / ".env",
    Path(__file__).resolve().parents[2] / "backend" / ".env",
]:
    if env_path.exists():
        load_dotenv(env_path)
        break

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise SystemExit("Missing GEMINI_API_KEY")

genai.configure(api_key=api_key)

models = genai.list_models()

# list_models may return a generator; iterate through a few entries
from itertools import islice
for m in islice(models, 30):
    print(m)
