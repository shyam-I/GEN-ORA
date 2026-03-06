import React, { useEffect, useState } from 'react';
import { getUsageAnalytics } from '../services/api.js';
import { UsageChart } from '../components/Charts.jsx';
import { Download, Filter } from 'lucide-react';

const Analytics = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsage = async () => {
            try {
                const response = await getUsageAnalytics();
                // Extract datay since api.js now returns the full Axios response object
                const resData = response.data;
                if (resData && Array.isArray(resData)) {
                    setData(resData);
                } else {
                    // Fallback data
                    setData([
                        { date: 'Jan', usage: 4000 }, { date: 'Feb', usage: 3000 },
                        { date: 'Mar', usage: 2000 }, { date: 'Apr', usage: 2780 },
                        { date: 'May', usage: 1890 }, { date: 'Jun', usage: 2390 },
                    ]);
                }
            } catch (err) {
                console.error(err);
                setData([
                    { date: 'Mon', usage: 120 }, { date: 'Tue', usage: 150 },
                    { date: 'Wed', usage: 110 }, { date: 'Thu', usage: 180 },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchUsage();
    }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-100">Water Usage Analytics</h1>
                    <p className="text-slate-400 mt-2">Historical trends and detailed consumption breakdown.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors border border-slate-700">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors shadow-lg shadow-blue-500/20">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-6">Monthly Consumption (kL)</h3>
                {loading ? (
                    <div className="h-80 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <UsageChart data={data} />
                )}
            </div>
        </div>
    );
};

export default Analytics;
