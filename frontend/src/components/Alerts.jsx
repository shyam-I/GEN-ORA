import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const AlertItem = ({ type, title, message, time }) => {
    const getAlertStyles = () => {
        switch (type) {
            case 'critical':
                return {
                    bg: 'bg-red-500/10',
                    border: 'border-red-500/20',
                    icon: <AlertCircle className="text-red-500" size={20} />,
                    titleColor: 'text-red-400',
                };
            case 'warning':
                return {
                    bg: 'bg-amber-500/10',
                    border: 'border-amber-500/20',
                    icon: <AlertTriangle className="text-amber-500" size={20} />,
                    titleColor: 'text-amber-400',
                };
            case 'success':
                return {
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/20',
                    icon: <CheckCircle className="text-emerald-500" size={20} />,
                    titleColor: 'text-emerald-400',
                };
            default:
                return {
                    bg: 'bg-blue-500/10',
                    border: 'border-blue-500/20',
                    icon: <Info className="text-blue-500" size={20} />,
                    titleColor: 'text-blue-400',
                };
        }
    };

    const styles = getAlertStyles();

    return (
        <div className={`flex items-start p-4 mb-3 rounded-lg border ${styles.bg} ${styles.border} backdrop-blur-sm transition-all hover:bg-opacity-80`}>
            <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
            <div className="ml-3 flex-1">
                <h4 className={`text-sm font-semibold ${styles.titleColor}`}>{title}</h4>
                <p className="mt-1 text-sm text-slate-300">{message}</p>
                {time && <p className="mt-2 text-xs text-slate-500">{time}</p>}
            </div>
        </div>
    );
};

export const AlertsList = ({ alerts = [] }) => {
    if (!alerts.length) {
        return (
            <div className="p-6 text-center text-slate-400 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <CheckCircle className="mx-auto h-8 w-8 text-emerald-500/50 mb-2" />
                <p>No active alerts. System is running normally.</p>
            </div>
        );
    }

    return (
        <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {alerts.map((alert, index) => (
                <AlertItem key={index} {...alert} />
            ))}
        </div>
    );
};
