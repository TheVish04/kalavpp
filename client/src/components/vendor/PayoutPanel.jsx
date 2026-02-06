
import React, { useState } from 'react';
import { Landmark, ArrowRight, Loader2, Lock } from 'lucide-react';

const PayoutPanel = ({ onPayoutRequest }) => {
    const [requesting, setRequesting] = useState(false);

    const handleRequest = async () => {
        if (requesting) return;
        setRequesting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        onPayoutRequest();
        setRequesting(false);
    };

    return (
        <div className="flex flex-col gap-6 h-full">

            {/* Request Payout Button - Big Green Action */}
            <button
                onClick={handleRequest}
                disabled={requesting}
                className="bg-green-500 hover:bg-green-400 active:scale-95 transition-all duration-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:shadow-[0_0_60px_rgba(16,185,129,0.3)] group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {requesting ? (
                    <Loader2 size={32} className="text-white animate-spin" />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center text-white mb-1">
                        <span className="material-symbols-outlined">payments</span>
                    </div>
                )}

                <h3 className="text-xl font-bold text-white text-center">
                    {requesting ? 'Processing...' : 'Request Payout'}
                </h3>
            </button>

            {/* Bank Method Card */}
            <div className="bg-[#121212] border border-[#1e1e1e] rounded-3xl p-6 flex flex-col justify-between flex-1">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Primary Method</span>
                    <Lock size={12} className="text-green-500" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                        <Landmark size={20} className="text-black" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm">Chase Bank</h4>
                        <p className="text-xs text-gray-500">Direct Deposit **** 8821</p>
                    </div>
                </div>

                <button className="mt-6 flex items-center justify-end text-green-500 text-xs font-bold hover:text-green-400 transition-colors gap-1 group">
                    Manage Accounts <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default PayoutPanel;
