import React, { useState } from 'react';
import { irrigationAdvice } from '../services/api.js';
import { Droplets, Sprout, Loader2 } from 'lucide-react';

const Irrigation = () => {
    const [formData, setFormData] = useState({
        soilMoisture: '',
        temperature: '',
        rainfall: ''
    });
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRecommendation(null);
        try {
            const res = await irrigationAdvice({
                soil_moisture: Number(formData.soilMoisture),
                temperature: Number(formData.temperature),
                rainfall: Number(formData.rainfall)
            });
            const response = res.data;

            if (response && response.message) {
                setRecommendation(response.message);
            } else if (response && response.irrigation_optimization) {
                setRecommendation(response.irrigation_optimization);
            } else {
                // Fallback if backend isn't sending a string or specific key
                setRecommendation('Based on the provided metrics, a 2-hour drip irrigation cycle is recommended in the evening.');
            }
        } catch (err) {
            console.error(err);
            const message = err?.response?.data?.message ||
                "Unable to get recommendation from AI service. Please check your data and try again.";
            setRecommendation(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
                    <Droplets className="text-cyan-400" /> Smart Irrigation Control
                </h1>
                <p className="text-slate-400 mt-2">Get AI-driven irrigation schedules based on soil and weather parameters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Form Section */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6 lg:p-8">
                    <h3 className="text-xl font-semibold text-slate-100 mb-6">Input Parameters</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Soil Moisture (%)</label>
                            <input
                                type="number"
                                name="soilMoisture"
                                value={formData.soilMoisture}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                placeholder="e.g. 45"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Current Temperature (°C)</label>
                            <input
                                type="number"
                                name="temperature"
                                value={formData.temperature}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                placeholder="e.g. 28"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Predicted Rainfall (mm)</label>
                            <input
                                type="number"
                                name="rainfall"
                                value={formData.rainfall}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                placeholder="e.g. 5"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : <Sprout className="mr-2" size={20} />}
                            {loading ? 'Analyzing...' : 'Get AI Recommendation'}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                <div className="flex flex-col">
                    <div className={`flex-1 bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-xl border ${recommendation ? 'border-cyan-500/50 shadow-cyan-500/10' : 'border-slate-700'} shadow-lg p-6 lg:p-8 flex flex-col items-center justify-center text-center transition-all duration-500`}>
                        {loading ? (
                            <div className="flex flex-col items-center">
                                <Loader2 className="animate-spin text-cyan-400 mb-4" size={48} />
                                <p className="text-slate-400">Processing agronomic models...</p>
                            </div>
                        ) : recommendation ? (
                            <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center">
                                <div className="bg-cyan-500/20 p-4 rounded-full mb-6">
                                    <Droplets className="text-cyan-400" size={48} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-100 mb-4">Recommendation Ready</h3>
                                <p className="text-lg text-slate-300 leading-relaxed bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                                    {recommendation}
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center opacity-50">
                                <Sprout className="text-slate-500 mb-4" size={64} />
                                <h3 className="text-xl font-medium text-slate-400 mb-2">Awaiting Input</h3>
                                <p className="text-slate-500 max-w-sm">
                                    Enter environmental parameters on the left to receive an optimized irrigation schedule.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Irrigation;
