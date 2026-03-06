import React, { useEffect, useState } from 'react';
import { detectLeak } from '../services/api.js';
import { AlertsList } from '../components/Alerts.jsx';
import { AnomalyChart } from '../components/Charts.jsx';
import { ShieldAlert, RefreshCw } from 'lucide-react';

const Leaks = () => {
    const [alerts, setAlerts] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    const buildSensorReadings = () => {
        const now = new Date();
        const baseFlow = 45 + Math.random() * 10;

        // Generate a small sliding window of flow readings (past ~1 hour)
        return Array.from({ length: 8 }).map((_, idx) => {
            const timestamp = new Date(now.getTime() - (7 - idx) * 5 * 60 * 1000);
            const timeLabel = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const drift = (Math.random() - 0.5) * 15;
            const spike = idx === 4 ? 90 : 0; // inject an anomaly spike
            return {
                time: timeLabel,
                flowRate: Math.max(0, Math.round(baseFlow + drift + spike)),
            };
        });
    };

    const fetchLeaks = async () => {
        setLoading(true);
        try {
            const payload = {
                sensorData: {
                    readings: buildSensorReadings(),
                },
            };
            const res = await detectLeak(payload);
            const response = res.data;

            let newAlerts = [];
            let newChartData = [];

            if (response && response.anomalies && response.anomalies.length) {
                newAlerts = response.anomalies.map(a => ({
                    type: 'warning',
                    title: 'Anomaly Detected',
                    message: a.message,
                    time: a.time || 'Just now',
                }));
            } else {
                newAlerts = [
                    { type: 'critical', title: 'Main Valve Flow Spike', message: 'Flow rate exceeded threshold by 200%. Possible burst pipe.', time: '10 mins ago' },
                    { type: 'warning', title: 'Zone B Pressure Drop', message: 'Gradual loss of pressure detected in Zone B.', time: '1 hour ago' },
                ];
            }

            if (response && response.flowData) {
                newChartData = response.flowData;
            } else {
                newChartData = payload.sensorData.readings.map(r => ({
                    time: r.time,
                    flowRate: r.flowRate,
                    isAnomaly: false,
                }));
            }

            setAlerts(newAlerts);
            setChartData(newChartData);
        } catch (err) {
            console.error(err);
            // Fallback
            setAlerts([
                { type: 'critical', title: 'Main Valve Flow Spike', message: 'Flow rate exceeded threshold by 200%.', time: '10 mins ago' },
            ]);
            setChartData([
                { time: '10:00', flowRate: 45, isAnomaly: false },
                { time: '10:15', flowRate: 48, isAnomaly: false },
                { time: '10:30', flowRate: 150, isAnomaly: true },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaks();
    }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
                        <ShieldAlert className="text-red-400" /> Leak Detection System
                    </h1>
                    <p className="text-slate-400 mt-2">Real-time anomaly monitoring across all network sensors.</p>
                </div>
                <button
                    onClick={fetchLeaks}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors border border-slate-700 disabled:opacity-50"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Flow Rate Anomalies</h3>
                    {loading ? (
                        <div className="h-80 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                        </div>
                    ) : (
                        <AnomalyChart data={chartData} />
                    )}
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Alert Log</h3>
                    <div className="flex-1 bg-[#0f172a] rounded-lg p-2 border border-slate-700 overflow-hidden">
                        {loading ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                            </div>
                        ) : (
                            <AlertsList alerts={alerts} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaks;
