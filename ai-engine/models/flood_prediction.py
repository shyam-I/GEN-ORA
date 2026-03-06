import pandas as pd

def predict_flood(data):
    # Dummy implementation: predict flood risk based on rainfall > 50
    df = pd.DataFrame(data)
    df['flood_risk'] = df['rainfall'].apply(lambda x: 'High' if x > 50 else 'Low')
    return df[['date', 'flood_risk']].to_dict(orient="records")