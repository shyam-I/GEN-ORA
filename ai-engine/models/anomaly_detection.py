from sklearn.ensemble import IsolationForest
import pandas as pd


def _extract_usage(record):
    """Extract a numeric usage/flow value from a record."""
    if isinstance(record, (int, float)):
        return float(record)

    if isinstance(record, dict):
        for key in ("usage", "flowRate", "flow_rate", "value"):
            if key in record and isinstance(record[key], (int, float)):
                return float(record[key])

    return None


def _extract_time(record, index=None):
    """Extract a time label from a record."""
    if isinstance(record, dict):
        for key in ("time", "timestamp", "date", "datetime"):
            if key in record:
                return str(record[key])

    if index is not None:
        return f"t{index + 1}"

    return ""


def detect_anomaly(data):
    """Detect anomalies in a list of flow/usage readings.

    Input can be:
      - A list of dicts with keys like `usage`, `flowRate`, and optional timestamps.
      - A flat list of numbers.

    Returns a list of records with:
      - time
      - usage
      - isAnomaly (boolean)
      - message
    """
    if data is None:
        data = []

    if not isinstance(data, list):
        # Accept a single record as well
        data = [data]

    normalized = []
    for idx, record in enumerate(data):
        usage = _extract_usage(record)
        if usage is None:
            continue

        normalized.append({
            "time": _extract_time(record, idx),
            "usage": usage,
        })

    if not normalized:
        return []

    df = pd.DataFrame(normalized)
    X = df[["usage"]]

    # Use a fixed random state for deterministic behavior during development.
    model = IsolationForest(contamination=0.1, random_state=42)
    model.fit(X)

    df["isAnomaly"] = model.predict(X) == -1

    results = []
    for _, row in df.iterrows():
        is_anomaly = bool(row["isAnomaly"])
        usage = float(row["usage"])
        time = row.get("time") or ""
        message = (
            f"Anomaly detected at {time}: usage {usage}"
            if is_anomaly
            else f"Normal reading at {time}: usage {usage}"
        )

        results.append({
            "time": time,
            "usage": usage,
            "isAnomaly": is_anomaly,
            "message": message,
        })

    return results
