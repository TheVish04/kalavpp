
import React from 'react';
import { AlertTriangle, AlertOctagon, User, Gavel } from 'lucide-react';

const CriticalAlerts = () => {
    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Critical Alerts</h3>
                <button className="text-xs font-bold text-[#8c25f4] hover:text-[#7015d0] tracking-wider">VIEW ALL LOGS</button>
            </div>

            <div className="space-y-4">

                {/* Alert 1: High Value Tx */}
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 group hover:border-[#333] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20">
                        <AlertTriangle size={20} />
                    </div>

                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-white">High-value Flagged Transaction</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <span className="font-mono">TX-ID: #88392-AK</span>
                            <span>•</span>
                            <span className="text-gray-400">Value: ₹15,000.00</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e1e] rounded-lg border border-[#333]">
                            <User size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-300">User_X99</span>
                        </div>
                        <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20 uppercase">Needs Review</span>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0 pl-0 md:pl-4 md:border-l border-[#333]">
                        <button className="px-4 py-2 bg-[#252525] hover:bg-[#333] text-gray-300 text-xs font-bold rounded-lg transition-colors">Details</button>
                        <button className="px-4 py-2 bg-[#8c25f4] hover:bg-[#7015d0] text-white text-xs font-bold rounded-lg shadow-lg shadow-purple-900/20 transition-colors">Investigate</button>
                    </div>
                </div>

                {/* Alert 2: Copyright Dispute */}
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 group hover:border-[#333] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0 border border-yellow-500/20">
                        <Gavel size={20} />
                    </div>

                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-white">Copyright Dispute</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Claimant: <span className="text-white">NeonGod</span> vs. Defendant: <span className="text-white">UserX</span></p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                        <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gray-500 border border-[#1a1a1a]"></div>
                            <div className="w-6 h-6 rounded-full bg-gray-600 border border-[#1a1a1a]"></div>
                        </div>
                        <span className="text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20 uppercase">Urgent</span>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0 pl-0 md:pl-4 md:border-l border-[#333]">
                        <button className="px-4 py-2 bg-[#252525] hover:bg-[#333] text-gray-300 text-xs font-bold rounded-lg transition-colors">Evidence</button>
                        <button className="px-4 py-2 bg-[#8c25f4] hover:bg-[#7015d0] text-white text-xs font-bold rounded-lg shadow-lg shadow-purple-900/20 transition-colors">Resolutions</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CriticalAlerts;
