
import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const EarningsCard = ({ availableBalance, pendingClearance, lastPayout }) => {

    // Formatting Helper
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount || 0);
    };

    return (
        <div className="bg-[#121212] rounded-3xl p-8 border border-[#1e1e1e] relative overflow-hidden group h-full flex flex-col justify-between">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-green-500/20 transition-all duration-700"></div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start mb-4">
                <span className="bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-1 rounded-md border border-green-500/20 tracking-wider">
                    ACTIVE BALANCE
                </span>
            </div>

            {/* Main Balance */}
            <div className="relative z-10 mb-8">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Available for Payout</p>
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                    {formatCurrency(availableBalance)}
                </h1>
            </div>

            {/* Footer Stats */}
            <div className="relative z-10 grid grid-cols-2 gap-8 border-t border-[#1e1e1e] pt-6 mt-auto">
                <div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Last Payout</p>
                    <div className="flex items-center gap-1">
                        <span className="text-white font-bold">{formatCurrency(lastPayout)}</span>
                        <span className="text-xs text-gray-500">on Oct 15</span>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Pending Clearance</p>
                    <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{formatCurrency(pendingClearance)}</span>
                        {pendingClearance > 0 && <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EarningsCard;
