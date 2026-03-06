import React, { useEffect, useState } from 'react';
import { getForecastPrediction } from '../services/api.js';
import { ForecastChart } from '../components/Charts.jsx';
import { Sparkles, Calendar } from 'lucide-react';

const Forecast = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const payload = {
                    historicalData: [100, 110, 120, 115, 130],
                    weatherForecast: { temperature: 30, rainfall: 5 }
                };
                const res = await getForecastPrediction(payload);
                const response = res.data;

                if (response && response.forecast) {
                    // Suppose backend returns an array of predictions
                    setData(response.forecast);
                } else {
                    setData([
                        { date: 'Day 1', actual: 120, predicted: 125 },
                        { date: 'Day 2', actual: 130, predicted: 135 },
                        { date: 'Day 3', actual: null, predicted: 140 },
                        { date: 'Day 4', actual: null, predicted: 142 },
                        { date: 'Day 5', actual: null, predicted: 138 }
                    ]);
                }
            } catch (err) {
                console.error(err);
                setData([
                    { date: 'Mon', actual: 120, predicted: 125 },
                    { date: 'Tue', actual: 130, predicted: 135 },
                    { date: 'Wed', actual: null, predicted: 140 },
                    { date: 'Thu', actual: null, predicted: 142 },
                    { date: 'Fri', actual: null, predicted: 138 }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
                        <Sparkles className="text-fuchsia-400" /> AI Demand Forecast
                    </h1>
                    <p className="text-slate-400 mt-2">Machine learning predictions for future water requirements.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors border border-slate-700">
                    <Calendar size={16} /> This Week
                </button>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
                <div className="mb-4 space-y-2">
                    <h3 className="text-lg font-semibold text-slate-100">7-Day Prediction Outlook</h3>
                    <p className="text-sm text-slate-400">Comparing actual usage vs AI projected demand based on weather patterns.</p>
                </div>
                {loading ? (
                    <div className="h-80 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fuchsia-500"></div>
                    </div>
                ) : (
                    <ForecastChart data={data} />
                )}
            </div>
        </div>
    );
};

export default Forecast;
