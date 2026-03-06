from pathlib import Path

# Patch backend service to add flood prediction proxy
service_path = Path('backend/services/aiService.js')
service_text = service_path.read_text()
# Normalize newlines to make replacement deterministic across platforms
service_text_norm = service_text.replace('\r\n', '\n')
if 'const predictFlood' not in service_text_norm:
    old = """// AI Advisor Chat
const askAdvisor = async (data) => {
  const question = data?.question || data?.query || data?.message || "";
  const response = await axios.post(
    `${AI_BASE_URL}/advisor`,
    { question }
  );
  return response.data;
};

module.exports = {
  forecastDemand,
  detectLeak,
  irrigationAdvice,
  askAdvisor
};
"""
    new = """// Flood Prediction
const predictFlood = async (data) => {
  const response = await axios.post(AI_BASE_URL + \"/flood\", data);
  return response.data;
};

// AI Advisor Chat
const askAdvisor = async (data) => {
  const question = data?.question || data?.query || data?.message || "";
  const response = await axios.post(
    `${AI_BASE_URL}/advisor`,
    { question }
  );
  return response.data;
};

module.exports = {
  forecastDemand,
  detectLeak,
  irrigationAdvice,
  predictFlood,
  askAdvisor
};
"""
    # Apply replacement on normalized text then preserve original newline style
    service_text_updated = service_text_norm.replace(old, new)
    if '\r\n' in service_text:
        service_text_updated = service_text_updated.replace('\n', '\r\n')
    service_path.write_text(service_text_updated)

# Patch controller to add flood prediction handler
controller_path = Path('backend/controllers/aiController.js')
controller_text = controller_path.read_text()
if 'exports.floodPrediction' not in controller_text:
    marker = '// AI Advisor Controller'
    insert = """// Flood Prediction Controller
exports.floodPrediction = async (req, res) => {
  try {
    const result = await aiService.predictFlood(req.body);
    res.json(result);
  } catch (error) {
    console.error(\"Error in floodPrediction:\", error.message);
    res.status(500).json({ error: \"Failed to get flood prediction\" });
  }
};

"""
    controller_text = controller_text.replace(marker, insert + marker)
    controller_path.write_text(controller_text)

# Patch routes to register /flood
routes_path = Path('backend/routes/aiRoutes.js')
routes_text = routes_path.read_text()
if 'router.post("/flood"' not in routes_text:
    routes_text = routes_text.replace(
        'router.post("/leak", aiController.leakDetection);',
        'router.post("/leak", aiController.leakDetection);\nrouter.post("/flood", aiController.floodPrediction);'
    )
    routes_path.write_text(routes_text)

print('Patched backend AI flood endpoint support')
