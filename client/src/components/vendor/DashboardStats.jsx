
import React from 'react';
import { DollarSign, Eye, Zap, ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, trend }) => {
    return (
        <div className="bg-[#121212] p-6 rounded-2xl border border-[#1e1e1e] relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent blur-2xl -mr-6 -mt-6 group-hover:from-primary/20 transition-all duration-500"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-gray-400 text-sm font-medium">{title}</span>
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-primary">
                    <Icon size={16} />
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{value}</h3>
                <div className="flex items-center gap-2 text-xs">
                    {trend ? (
                        <span className={`flex items-center gap-1 font-bold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {trend > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                            {Math.abs(trend)}%
                        </span>
                    ) : (
                        <span className="text-gray-500">--</span>
                    )}
                    <span className="text-gray-600">{subtext}</span>
                </div>
            </div>
        </div>
    );
};

const DashboardStats = ({ totalRevenue }) => {
    // Other stats are mocked for UI completeness as requested, but Revenue is REAL prop
    const formattedRevenue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(totalRevenue || 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                title="Total Revenue"
                value={formattedRevenue}
                subtext="vs last month"
                icon={DollarSign}
                trend={12}
            />
            <StatCard
                title="Total Views"
                value="45.2k"
                subtext="vs last month"
                icon={Eye}
                trend={-0.8}
            />
            <StatCard
                title="Conversion Rate"
                value="3.4%"
                subtext="vs last month"
                icon={Zap}
                trend={2.1}
            />
        </div>
    );
};

export default DashboardStats;
