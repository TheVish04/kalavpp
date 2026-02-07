import React, { useState, useEffect } from 'react';
import { supabase } from '../../../api/supabase';
import AdminSidebar from '../components/AdminSidebar';

const FinancialsPage = () => {
    const [revenue, setRevenue] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);

    useEffect(() => {
        supabase.from('order_items').select('price_at_purchase').then(({ data }) => {
            const total = (data || []).reduce((s, r) => s + (Number(r.price_at_purchase) || 0), 0);
            setRevenue(total);
        });
        supabase.from('orders').select('*', { count: 'exact', head: true }).then(({ count }) => setOrdersCount(count || 0));
    }, []);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-display flex overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto custom-scrollbar p-6 md:p-10">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Financials</h1>
                <p className="text-gray-400 text-sm mb-8">Platform revenue, commissions, and payouts.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5">
                        <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
                        <p className="text-3xl font-bold text-white">₹{revenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border border-white/5">
                        <p className="text-gray-500 text-sm mb-1">Total Orders</p>
                        <p className="text-3xl font-bold text-white">{ordersCount}</p>
                    </div>
                </div>
                <div className="glass-panel p-8 rounded-2xl border border-white/5">
                    <p className="text-gray-500">Detailed financial reports and payouts can be exported from the dashboard.</p>
                </div>
            </main>
        </div>
    );
};

export default FinancialsPage;
