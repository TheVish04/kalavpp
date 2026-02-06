
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../../components/customer/DashboardSidebar';
import OrderFilters from '../../components/customer/OrderFilters';
import OrderHistoryCard from '../../components/customer/OrderHistoryCard';
import { PackageX } from 'lucide-react';

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All Orders');

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    id, 
                    created_at, 
                    status,
                    total_amount,
                    order_items (
                        id,
                        price,
                        products (
                            title,
                            image_url
                        )
                    )
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    const filteredOrders = orders.filter(order => {
        if (activeFilter === 'All Orders') return true;

        const status = order.status?.toLowerCase() || 'pending';
        const filter = activeFilter.toLowerCase();

        if (filter === 'processing') return status === 'pending' || status === 'processing';
        return status === filter; // shipped, delivered
    });

    return (
        <div className="bg-[#121212] min-h-screen text-white font-display flex overflow-hidden">

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content */}
            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto relative z-10 p-4 md:p-8 lg:p-10 custom-scrollbar">

                {/* Background Glow */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-[-20%] right-[20%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px] opacity-30"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Order History</h1>
                        <p className="text-[#a1a1aa]">Track your past orders, download invoices, and buy again.</p>
                    </div>

                    {/* Filters */}
                    <OrderFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

                    {/* Content */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredOrders.length > 0 ? (
                        <div className="flex flex-col gap-6 pb-20">
                            {filteredOrders.map(order => (
                                <OrderHistoryCard key={order.id} order={order} />
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-3xl border border-white/5 bg-[#1e1e1e]/20">
                            <div className="w-24 h-24 rounded-full bg-[#1e1e1e] flex items-center justify-center mb-6">
                                <PackageX size={48} className="text-[#a1a1aa] opacity-50" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">No orders found</h2>
                            <p className="text-[#a1a1aa] max-w-md mb-8">
                                {activeFilter === 'All Orders'
                                    ? "Looks like you haven't placed any orders yet."
                                    : `You have no ${activeFilter.toLowerCase()} orders.`}
                            </p>
                            <Link
                                to="/shop"
                                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default OrderHistory;
