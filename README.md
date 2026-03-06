 # AquaSense AI -- Smart Water Management Platform

## 📌 Project Overview

AquaSense AI is an AI-powered water management platform designed to
monitor, analyze, and optimize water usage. The system integrates data
analytics, machine learning models, and an AI assistant to provide
intelligent insights such as water demand forecasting, leak detection,
irrigation recommendations, and interactive advisory support.

The platform combines **React frontend, Node.js backend, Flask AI
services, and external APIs** to deliver a scalable and intelligent
water management solution.

------------------------------------------------------------------------

# 🚀 Features

### 1. Water Usage Analytics

-   Visualizes historical and real-time water consumption
-   Displays trends and insights using interactive charts

### 2. Demand Forecasting

-   Uses AI models to predict future water demand
-   Helps in planning water distribution efficiently

### 3. Leak Detection

-   Detects abnormal water usage patterns
-   Alerts users about possible pipeline leaks

### 4. Smart Irrigation Recommendation

-   Suggests irrigation levels based on:
    -   Soil moisture
    -   Temperature
    -   Rainfall

### 5. AI Water Advisor

-   AI chatbot powered by *Gemini API*
-   Answers questions about water usage, leaks, and irrigation

------------------------------------------------------------------------

# 🏗 System Architecture

React Frontend ↓ Node.js Backend API ↓ MongoDB Database ↓ Flask AI
Engine ↓ Machine Learning Models ↓ External APIs (Weather, Gemini AI)

------------------------------------------------------------------------

# 📂 Project Structure

AquaSense/ │ ├── frontend/ \# React Frontend │ ├── src/ │ │ ├──
components/ │ │ ├── pages/ │ │ ├── services/ │ │ └── App.js │ ├──
backend/ \# Node.js Backend │ ├── controllers/ │ ├── models/ │ ├──
routes/ │ ├── services/ │ └── server.js │ ├── ai-engine/ \# Flask AI
Services │ ├── models/ │ │ ├── demand_forecast.py │ │ ├──
anomaly_detection.py │ │ ├── irrigation_rl.py │ │ └── water_advisor.py │
│ │ └── app.py │ ├── data/ \# Dataset files ├── docs/ \# Documentation
└── README.md

------------------------------------------------------------------------

# ⚙️ Technologies Used

### Frontend

-   React.js
-   Chart.js / Recharts
-   Axios

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   REST APIs

### AI Engine

-   Python
-   Flask
-   Scikit-learn
-   Prophet
-   Reinforcement Learning (Irrigation)

### External APIs

-   Gemini AI API
-   Weather APIs
-   NASA Power Data

------------------------------------------------------------------------

# 🔧 Installation

## Clone Repository

git clone https://github.com/yourusername/aquasense-ai.git cd
aquasense-ai

------------------------------------------------------------------------

# Backend Setup

cd backend npm install

Run backend:

node server.js

Server runs on:

http://localhost:5000

------------------------------------------------------------------------

# AI Engine Setup

cd ai-engine pip install -r requirements.txt

Run AI service:

python app.py

Server runs on:

http://localhost:8000

------------------------------------------------------------------------

# Frontend Setup

cd frontend npm install npm start

Frontend runs on:

http://localhost:3000

------------------------------------------------------------------------

# 🔑 Environment Variables

Create .env file inside *backend*:

MONGO_URI=your_mongodb_connection PORT=5000

Create .env inside *ai-engine*:

GEMINI_API_KEY=your_gemini_api_key

------------------------------------------------------------------------

# 📊 Example API Endpoints

Analytics GET /api/analytics/usage

Demand Forecast POST /api/ai/forecast

Leak Detection POST /api/ai/leak

Irrigation Recommendation POST /api/ai/irrigation

AI Advisor POST /api/ai/advisor

------------------------------------------------------------------------

# 📈 Future Enhancements

-   Real-time IoT sensor integration
-   Flood risk prediction
-   Smart city water distribution
-   Mobile application support

------------------------------------------------------------------------

# 👨‍💻 Authors

AquaSense AI Development Team

------------------------------------------------------------------------

# 📜 License

This project is licensed under the MIT License.