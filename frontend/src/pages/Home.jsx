import React from 'react';
import Dashboard from '../components/Dashboard.jsx';

const Home = () => {
    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
                    Water Management Dashboard
                </h1>
                <p className="text-slate-400 mt-2">Welcome back. Here is what is happening with your water system today.</p>
            </div>
            <Dashboard />
        </div>
    );
};

export default Home;
