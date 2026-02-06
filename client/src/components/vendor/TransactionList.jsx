
import React from 'react';
import { ShoppingCart, ArrowUpRight, ArrowDownLeft, Heart } from 'lucide-react';

const TransactionList = ({ transactions }) => {

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-[#121212] border border-[#1e1e1e] rounded-3xl overflow-hidden mt-8">
            <div className="p-6 border-b border-[#1e1e1e] flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                <button className="bg-[#1a1a1a] hover:bg-[#252525] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                    All Transactions
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#1a1a1a]">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Transaction</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e1e1e]">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500 text-sm">
                                    No transaction history found.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((t, index) => {
                                const isPositive = t.amount >= 0;
                                const isPayout = t.type === 'payout';

                                return (
                                    <tr key={index} className="group hover:bg-[#1a1a1a] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isPayout ? 'bg-gray-800 text-gray-400' : 'bg-green-500/10 text-green-500'
                                                    }`}>
                                                    {isPayout ? <ArrowUpRight size={20} /> : <ShoppingCart size={20} />}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-white max-w-[200px] truncate">{t.description}</h4>
                                                    <p className="text-xs text-gray-500">{t.subtext || 'Sale'}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                                            {formatDate(t.created_at)}
                                        </td>

                                        <td className={`px-6 py-4 text-right text-sm font-bold whitespace-nowrap ${isPositive ? 'text-green-400' : 'text-white'
                                            }`}>
                                            {isPositive ? '+' : ''} {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(t.amount)}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${t.status === 'CLEARED' || t.status === 'COMPLETED'
                                                    ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                    : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                                }`}>
                                                {t.status === 'CLEARED' ? 'Cleared' : t.status === 'COMPLETED' ? 'Completed' : 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList;
