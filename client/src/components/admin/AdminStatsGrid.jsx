
import React from 'react';
import { IndianRupee, Users, Palette, AlertOctagon, TrendingUp, TrendingDown } from 'lucide-react';

const AdminStatsGrid = ({ gmv, userCount }) => {

    // Helper to format large numbers (e.g., 1.2M, 12.4k)
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">

            {/* Card 1: Total GMV */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <IndianRupee size={48} className="text-white" />
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total GMV</p>
                <div className="flex items-end gap-2 mb-4">
                    <h3 className="text-3xl font-bold text-white">₹{formatNumber(gmv)}</h3>
                    <span className="text-[#10b981] text-xs font-bold mb-1 flex items-center">
                        <TrendingUp size={12} className="mr-0.5" /> 5.2%
                    </span>
                </div>
                <div className="h-1 w-full bg-[#333] rounded-full overflow-hidden">
                    <div className="h-full bg-[#8c25f4] w-[65%] rounded-full shadow-[0_0_10px_#8c25f4]"></div>
                </div>
            </div>

            {/* Card 2: Active Users */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Users size={48} className="text-white" />
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Active Users</p>
                <div className="flex items-end gap-2 mb-4">
                    <h3 className="text-3xl font-bold text-white">{formatNumber(userCount)}</h3>
                    <span className="text-[#10b981] text-xs font-bold mb-1 flex items-center">
                        <TrendingUp size={12} className="mr-0.5" /> 1.1%
                    </span>
                </div>
                <div className="h-1 w-full bg-[#333] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[45%] rounded-full"></div>
                </div>
            </div>

            {/* Card 3: New Artists */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Palette size={48} className="text-white" />
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">New Artists</p>
                <div className="flex items-end gap-2 mb-4">
                    <h3 className="text-3xl font-bold text-white">+142</h3>
                    <span className="text-[#10b981] text-xs font-bold mb-1 flex items-center">
                        <TrendingUp size={12} className="mr-0.5" /> 8.4%
                    </span>
                </div>
                <div className="h-1 w-full bg-[#333] rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[20%] rounded-full"></div>
                </div>
            </div>

            {/* Card 4: Pending Verifications (Alert Style) */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 relative overflow-hidden group shadow-[inset_0_0_0_1px_rgba(234,179,8,0.2)]">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Pending Verifications</p>
                    <span className="bg-yellow-500/20 text-yellow-500 text-[10px] font-bold px-1.5 py-0.5 rounded border border-yellow-500/20">
                        ATTN NEEDED
                    </span>
                </div>

                <div className="mb-4">
                    <h3 className="text-3xl font-bold text-white">18</h3>
                    <p className="text-xs text-yellow-600 font-bold mt-1">Amber Alert</p>
                </div>

                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a1a1a] bg-gray-700 overflow-hidden">
                            <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="User" />
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-[#1a1a1a] bg-[#333] flex items-center justify-center text-[10px] text-white font-bold">
                        +15
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminStatsGrid;
