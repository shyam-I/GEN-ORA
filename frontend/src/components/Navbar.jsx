import React from 'react';
import { Droplets, Bell, User } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="bg-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-3 text-blue-400">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Droplets className="h-6 w-6" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    AquaSense AI
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-300 hover:bg-slate-700 rounded-full transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-2 pl-4 border-l border-slate-700 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-sm font-medium">
                        <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium hidden sm:block">Admin</span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
