import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';

// Pages
import Home from './pages/Home.jsx';
import Analytics from './pages/Analytics.jsx';
import Forecast from './pages/Forecast.jsx';
import Leaks from './pages/Leaks.jsx';
import Irrigation from './pages/Irrigation.jsx';
import AIAdvisor from './pages/AIAdvisor.jsx';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-slate-900 text-slate-50 font-sans">
                <Navbar />
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto bg-[#0f172a] p-6 lg:p-8">
                        <div className="max-w-7xl mx-auto">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/analytics" element={<Analytics />} />
                                <Route path="/forecast" element={<Forecast />} />
                                <Route path="/leaks" element={<Leaks />} />
                                <Route path="/irrigation" element={<Irrigation />} />
                                <Route path="/advisor" element={<AIAdvisor />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
