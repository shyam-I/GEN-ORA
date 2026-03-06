import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { askAdvisor } from '../services/api';

const ChatAssistant = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Hello! I am AquaSense AI. I can help you with leak detection, demand prediction, and irrigation advice.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            // Typically backend expects { message: "xxx" } or { query: "xxx" }
            const axiosRes = await askAdvisor({ message: userMsg, query: userMsg });
            const res = axiosRes.data;

            let botReply = '';
            if (typeof res === 'string') {
                botReply = res;
            } else if (res && res.response) {
                botReply = res.response;
            } else if (res && res.answer) {
                botReply = res.answer;
            } else {
                botReply = JSON.stringify(res);
            }

            setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error connecting to the AI service.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[500px] max-h-[70vh] bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
            <div className="bg-slate-800/80 backdrop-blur-md p-4 border-b border-slate-700 flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-full">
                    <Bot className="text-blue-400" size={20} />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-100">AquaSense AI Advisor</h3>
                    <p className="text-xs text-slate-400">Ask about usage, leaks, or irrigation</p>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0f172a]">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-600' : 'bg-blue-600'
                            }`}>
                            {msg.role === 'user' ? <User size={16} className="text-slate-200" /> : <Bot size={16} className="text-white" />}
                        </div>
                        <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-slate-700 text-slate-200 rounded-tl-none border border-slate-600'
                            }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-600">
                            <Bot size={16} className="text-white" />
                        </div>
                        <div className="max-w-[75%] bg-slate-700 text-slate-200 border border-slate-600 rounded-2xl rounded-tl-none p-3 shadow-sm">
                            <Loader2 size={16} className="animate-spin text-blue-400" />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-slate-800 border-t border-slate-700">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full bg-slate-900 border border-slate-600 rounded-full py-3 pl-4 pr-12 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500 transition-all"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white rounded-full transition-colors flex items-center justify-center"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatAssistant;
