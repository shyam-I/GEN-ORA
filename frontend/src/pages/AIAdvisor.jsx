import React from 'react';
import ChatAssistant from '../components/ChatAssistant.jsx';
import { MessageSquare, Sparkles } from 'lucide-react';

const AIAdvisor = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-140px)] flex flex-col">
            <div className="mb-6 flex-shrink-0">
                <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
                    <MessageSquare className="text-blue-400" /> AI Water Advisor
                </h1>
                <p className="text-slate-400 mt-2">Interact with our specialized LLM to query data, detect leaks, or ask for operational advice.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-lg">
                        <h3 className="text-md font-semibold text-slate-100 mb-3 flex items-center">
                            <Sparkles className="mr-2 text-fuchsia-400" size={16} /> Example Prompts
                        </h3>
                        <ul className="space-y-3">
                            {['"detect leak"', '"predict water demand"', '"irrigation advice"'].map((prompt, i) => (
                                <li key={i} className="text-sm text-slate-300 bg-slate-900 border border-slate-700 p-3 rounded-lg hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors cursor-pointer">
                                    {prompt}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-5 shadow-lg">
                        <p className="text-sm text-blue-200/80">
                            The advisor can connect to your live sensor data and historical usage databases to give contextual answers.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-3 min-h-[500px]">
                    <ChatAssistant />
                </div>
            </div>
        </div>
    );
};

export default AIAdvisor;
