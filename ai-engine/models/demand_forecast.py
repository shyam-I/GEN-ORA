import datetime
import pandas as pd
from prophet import Prophet


def _normalize_historical_data(historical_data):
    """Convert the incoming API payload into a list of {'date','usage'} dicts."""
    if not historical_data:
        return None

    # If payload is a dict wrapper
    if isinstance(historical_data, dict):
        if "historicalData" in historical_data and isinstance(historical_data["historicalData"], list):
            historical_data = historical_data["historicalData"]
        elif "data" in historical_data and isinstance(historical_data["data"], list):
            historical_data = historical_data["data"]

    if not isinstance(historical_data, list) or len(historical_data) == 0:
        return None

    first = historical_data[0]
    # A simple list of numeric values
    if isinstance(first, (int, float)):
        today = datetime.date.today()
        start = today - datetime.timedelta(days=len(historical_data) - 1)
        return [
            {"date": (start + datetime.timedelta(days=i)).isoformat(), "usage": float(v)}
            for i, v in enumerate(historical_data)
        ]

    # A list of dicts with date/usage keys
    if isinstance(first, dict):
        if "date" in first and "usage" in first:
            return historical_data
        if "ds" in first and "y" in first:
            return [{"date": r["ds"], "usage": r["y"]} for r in historical_data]
        if "timestamp" in first and "value" in first:
            return [{"date": r["timestamp"], "usage": r["value"]} for r in historical_data]

    return None


def forecast_water_usage(historical_data=None, periods=7):
    """Return a 7-day forecast for water usage.

    The response is an array of objects:
      - date: formatted date string (e.g. "Mon 03/06")
      - day: weekday abbreviation (e.g. "Mon")
      - actual: actual usage if known
      - predicted: predicted usage

    If historical_data is provided, it is used to train the model; otherwise we fall back to the bundled dataset.
    """

    normalized = _normalize_historical_data(historical_data)

    if normalized:
        df = pd.DataFrame(normalized)
        df["ds"] = pd.to_datetime(df["date"])
        df["y"] = pd.to_numeric(df["usage"], errors="coerce")
        df = df.dropna(subset=["ds", "y"]).sort_values("ds")
        last_date = df["ds"].max().date() if not df.empty else datetime.date.today()
    else:
        df = pd.read_csv("../data/large_historical_water_usage_dataset11.csv")
        df = df.rename(columns={"date": "ds", "usage": "y"})
        df["ds"] = pd.to_datetime(df["ds"])
        df["y"] = pd.to_numeric(df["y"], errors="coerce")
        df = df.dropna(subset=["ds", "y"]).sort_values("ds")
        last_date = df["ds"].max().date() if not df.empty else datetime.date.today()

    if len(df) < 2:
        # Fallback simple rolling forecast when there is not enough history for Prophet
        last_val = float(df["y"].iloc[-1]) if len(df) == 1 else 0.0
        start = last_date
        return [
            {
                "date": (start + datetime.timedelta(days=i + 1)).strftime("%a %m/%d"),
                "day": (start + datetime.timedelta(days=i + 1)).strftime("%a"),
                "actual": None,
                "predicted": last_val,
            }
            for i in range(periods)
        ]

    model = Prophet()
    model.fit(df[["ds", "y"]])

    future = model.make_future_dataframe(periods=periods, freq="D")
    forecast = model.predict(future)

    # Only keep forecast for future dates (after last known date)
    forecast_period = forecast[forecast["ds"].dt.date > last_date].head(periods)

    output = []
    for _, row in forecast_period.iterrows():
        dt = row["ds"].date()
        output.append(
            {
                "date": dt.strftime("%a %m/%d"),
                "day": dt.strftime("%a"),
                "actual": None,
                "predicted": float(row["yhat"]),
            }
        )

    return output
