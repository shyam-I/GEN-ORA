from pathlib import Path

path = Path('backend/services/aiService.js')
text = path.read_text()
print('--- BEGIN aiService.js repr ---')
print(repr(text))
print('--- END aiService.js repr ---')
