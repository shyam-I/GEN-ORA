import numpy as np

class IrrigationAgent:

    def __init__(self):
        self.water_levels = ["low","medium","high"]

    def recommend(self, soil_moisture, temperature, rainfall):

        if soil_moisture < 30:
            return {
                "irrigation": "HIGH",
                "message": "Soil very dry, increase irrigation"
            }

        elif soil_moisture < 60:
            return {
                "irrigation": "MEDIUM",
                "message": "Moderate irrigation recommended"
            }

        else:
            return {
                "irrigation": "LOW",
                "message": "Soil moisture sufficient"
            }