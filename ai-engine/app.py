from flask import Flask, request, jsonify

from models.demand_forecast import forecast_water_usage
from models.anomaly_detection import detect_anomaly
from models.flood_prediction import predict_flood
from models.irrigation_rl import IrrigationAgent
from models.water_advisor import ask_llm

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "AI Water Optimization API running"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    result = forecast_water_usage(data)
    return jsonify({"prediction": result})

@app.route("/anomalies", methods=["POST"])
def anomalies():
    data = request.json
    result = detect_anomaly(data)
    return jsonify({"anomalies": result})

@app.route("/detect-leak", methods=["POST"])
def detect_leak():
    if request.method == "POST":
        data = request.json
    else:
        # For GET, use default demo data
        data = [{"date": "2026-03-01", "usage": 100}]
    result = detect_anomaly(data)
    return jsonify({"leak_detection": result})

@app.route("/flood", methods=["POST"])
def flood():
    data = request.json
    result = predict_flood(data)
    return jsonify({"flood_prediction": result})

@app.route("/irrigation", methods=["POST"])
def irrigation():
    data = request.json or {}
    print(f"Flask received irrigation req: {data}", flush=True)
    soil_moisture = data.get("soil_moisture", 0)
    temperature = data.get("temperature", 25)
    rainfall = data.get("rainfall", 0)
    
    agent = IrrigationAgent()
    result = agent.recommend(soil_moisture, temperature, rainfall)
    print(f"Flask irrigation result: {result}", flush=True)
    
    # Send the result in the exact format expected by frontend or allow fallback
    if isinstance(result, dict) and "message" in result:
        return jsonify(result)
    else:
        return jsonify({"irrigation": "UNKNOWN", "message": result if isinstance(result, str) else str(result)})

@app.route("/advisor", methods=["POST"])
def advisor():
    data = request.json or {}
    question = data.get("question") or data.get("message") or data.get("query")

    if not question:
        return jsonify({"answer": "Please provide a question (e.g., 'How do I detect a leak?')."}), 400

    answer = ask_llm(question)

    return jsonify({
        "answer": answer
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
