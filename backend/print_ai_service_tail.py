from pathlib import Path

t = Path('backend/services/aiService.js').read_text().splitlines()
print('\n'.join(t[-20:]))
