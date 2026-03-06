import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Clock, AlertTriangle, Droplets, MessageSquare } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
        { name: 'Forecast', path: '/forecast', icon: <Clock size={20} /> },
        { name: 'Leak Alerts', path: '/leaks', icon: <AlertTriangle size={20} /> },
        { name: 'Irrigation', path: '/irrigation', icon: <Droplets size={20} /> },
        { name: 'AI Advisor', path: '/advisor', icon: <MessageSquare size={20} /> }
    ];

    return (
        <aside className="w-64 bg-slate-800 border-r border-slate-700 hidden md:block">
            <div className="p-4">
                <h2 className="text-xs uppercase text-slate-400 font-semibold tracking-wider mb-4">Modules</h2>
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-md transition-colors ${isActive
                                    ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20'
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                }`
                            }
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
