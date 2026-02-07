
import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, bgClass, secondaryIcon }) => {
    return (
        <div className={`glass-panel p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group hover:bg-white/5 transition-colors border border-white/5 ${title === 'Wallet Balance' ? 'border-primary/30 shadow-[0_0_15px_rgba(140,37,244,0.1)]' : ''}`}>

            {/* Background Icon Watermark */}
            {secondaryIcon && (
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <span className="material-symbols-outlined text-5xl">{secondaryIcon}</span>
                </div>
            )}

            {/* Glow for Wallet */}
            {title === 'Wallet Balance' && (
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/20 blur-2xl rounded-full"></div>
            )}

            <div className="flex items-center gap-3 relative z-10">
                <div className={`p-2 rounded-lg ${bgClass} ${colorClass}`}>
                    <Icon size={24} />
                </div>
                <p className="text-gray-400 font-medium text-sm">{title}</p>
            </div>

            <p className={`text-4xl font-bold tracking-tight relative z-10 ${title === 'Wallet Balance' ? 'text-primary' : 'text-white'}`}>
                {value}
            </p>
        </div>
    );
};

export default StatCard;
