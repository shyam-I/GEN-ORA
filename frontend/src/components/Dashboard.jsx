import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUsageAnalytics, getForecastPrediction, detectLeak } from '../services/api.js';
import { UsageChart } from './Charts.jsx';
import { AlertsList } from './Alerts.jsx';
import { ArrowUpRight, Droplets, Activity, CloudRain, ShieldAlert } from 'lucide-react';

const StatCard = ({ title, value, unit, trend, icon: Icon, colorClass }) => (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Icon size={100} className={colorClass} />
        </div>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg ${colorClass.replace('text-', 'bg-').replace('400', '500/20')} backdrop-blur-md`}>
                <Icon className={colorClass} size={24} />
            </div>
            {trend && (
                <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${trend > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {trend > 0 ? '+' : ''}{trend}% <ArrowUpRight size={12} className={`ml-1 ${trend < 0 ? 'rotate-90' : ''}`} />
                </span>
            )}
        </div>
        <div>
            <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
            <div className="mt-1 flex items-baseline">
                <span className="text-3xl font-bold text-slate-100">{value}</span>
                <span className="ml-2 text-sm text-slate-500">{unit}</span>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const [usageData, setUsageData] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fallback dummy data in case API is not active
                const dummyUsage = [
                    { date: 'Mon', usage: 120 }, { date: 'Tue', usage: 150 },
                    { date: 'Wed', usage: 110 }, { date: 'Thu', usage: 180 },
                    { date: 'Fri', usage: 140 }, { date: 'Sat', usage: 160 }, { date: 'Sun', usage: 130 }
                ];

                const dummyAlerts = [
                    { type: 'critical', title: 'High Flow Anomaly', message: 'Detected unusual water flow in Zone B.', time: '10 mins ago' },
                    { type: 'warning', title: 'Pressure Drop', message: 'Pressure dropped by 15% in Main Line.', time: '1 hour ago' }
                ];

                try {
                    // Attempt real API call
                    const analyticsRes = await getUsageAnalytics();
                    const leakRes = await detectLeak({ sensorData: {} });

                    const analyticsResponse = analyticsRes.data;
                    const leakResponse = leakRes.data;

                    // Map backend format depending on exact structure, here we use assumed array
                    if (analyticsResponse && Array.isArray(analyticsResponse)) {
                        setUsageData(analyticsResponse);
                    } else {
                        setUsageData(dummyUsage);
                    }

                    if (leakResponse && leakResponse.anomalies) {
                        setAlerts(leakResponse.anomalies.map(a => ({ type: 'warning', title: 'Leak Detected', message: a.message || 'Anomaly detected' })));
                    } else {
                        setAlerts(dummyAlerts);
                    }

                } catch (apiError) {
                    console.log('API not available, using dummy data for preview.');
                    setUsageData(dummyUsage);
                    setAlerts(dummyAlerts);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">Overview</h2>
                    <p className="text-slate-400 text-sm">System status and key metrics at a glance.</p>
                </div>
                <div className="flex gap-3">
                    <NavLink to="/advisor" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
                        Ask AI Advisor
                    </NavLink>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Water Usage" value="1,245" unit="kL" trend={5.2} icon={Droplets} colorClass="text-blue-400" />
                <StatCard title="Predicted Demand" value="1,400" unit="kL" trend={12.5} icon={Activity} colorClass="text-fuchsia-400" />
                <StatCard title="Total Rainfall" value="45" unit="mm" icon={CloudRain} colorClass="text-cyan-400" />
                <StatCard title="Active Alerts" value={alerts.length} unit="issues" icon={ShieldAlert} colorClass="text-red-400" />
            </div>

            {/* Charts & Alerts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-slate-100">Usage Trends</h3>
                        <NavLink to="/analytics" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View Details</NavLink>
                    </div>
                    {loading ? (
                        <div className="h-72 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
                    ) : (
                        <UsageChart data={usageData} />
                    )}
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-slate-100">System Alerts</h3>
                        <NavLink to="/leaks" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">All Alerts</NavLink>
                    </div>
                    {loading ? (
                        <div className="h-40 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div></div>
                    ) : (
                        <AlertsList alerts={alerts} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
