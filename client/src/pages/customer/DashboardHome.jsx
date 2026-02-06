
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../../components/customer/DashboardSidebar';
import StatCard from '../../components/customer/StatCard';
import RecentOrders from '../../components/customer/RecentOrders';
import {
    ShoppingBag,
    FolderOpen,
    Wallet,
    Menu
} from 'lucide-react';

const DashboardHome = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        activeOrders: 0,
        digitalItems: 0,
        walletBalance: 0.00
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateString, setDateString] = useState('');

    useEffect(() => {
        // Set Date
        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'short' };
        setDateString(`Today is ${date.toLocaleDateString('en-US', options)}`);

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // 1. Fetch Orders (Recent & Stats)
            // We need order_items and product info to display nicely and calculate stats
            const { data: orders, error: ordersError } = await supabase
                .from('orders')
                .select(`
                    id, 
                    created_at, 
                    status,
                    total_amount,
                    order_items (
                        id,
                        product:products (
                            title,
                            thumbnail,
                            image,
                            vertical
                        )
                    )
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (ordersError) throw ordersError;

            // 2. Fetch Profile (Wallet)
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('wallet_balance')
                .eq('id', user.id)
                .single();

            // if profileError, purely optional in some setups, but we accept it.

            // Calculations
            const active = orders.filter(o => o.status === 'pending' || o.status === 'shipped').length;

            // Count items where vertical is 'DIGITAL' or type implies digital
            // Flat map all items
            const allItems = orders.flatMap(o => o.order_items || []);
            const digitalCount = allItems.filter(item => {
                const type = item.product?.vertical || 'PHYSICAL'; // default?
                return type === 'DIGITAL' || type === 'NFT';
            }).length;

            const balance = profile?.wallet_balance || 0.00;

            setStats({
                activeOrders: active,
                digitalItems: digitalCount,
                walletBalance: balance
            });

            setRecentOrders(orders.slice(0, 3)); // Top 3

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen text-white font-display flex overflow-hidden">

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content */}
            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto relative z-10 p-4 md:p-8 lg:p-10">
                {/* Background Glow */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] opacity-20"></div>
                </div>

                <div className="relative z-10 flex flex-col gap-8 max-w-7xl mx-auto h-full">

                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-1">{dateString}</p>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                                Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}
                            </h1>
                        </div>
                        {/* Mobile Menu Trigger would go here if needed, but sidebar is hidden on md */}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <StatCard
                            title="Active Orders"
                            value={stats.activeOrders}
                            icon={ShoppingBag}
                            colorClass="text-blue-400"
                            bgClass="bg-blue-500/20"
                            secondaryIcon="shopping_cart"
                        />
                        <StatCard
                            title="Digital Library"
                            value={stats.digitalItems}
                            icon={FolderOpen}
                            colorClass="text-purple-400"
                            bgClass="bg-purple-500/20"
                            secondaryIcon="folder_open"
                        />
                        <StatCard
                            title="Wallet Balance"
                            value={`$${stats.walletBalance.toFixed(2)}`}
                            icon={Wallet}
                            colorClass="text-primary"
                            bgClass="bg-primary/20"
                        />
                    </div>

                    {/* Recent Orders */}
                    <RecentOrders orders={recentOrders} />

                    {/* Footer Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                        <Link to="/shop" className="relative overflow-hidden group rounded-xl p-[1px] focus:outline-none">
                            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#121212_0%,#8c25f4_50%,#121212_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                            <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-[#1a1a1a] px-8 py-5 transition-all group-hover:bg-[#151515]">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative flex items-center gap-3 z-10">
                                    <ShoppingBag size={20} className="text-white" />
                                    <span className="text-white font-bold text-lg">Browse Market</span>
                                </div>
                            </div>
                        </Link>

                        <button className="glass-panel group rounded-xl px-8 py-5 flex items-center justify-center gap-3 hover:bg-white/10 transition-all border border-white/5 hover:border-white/20">
                            <span className="material-symbols-outlined text-white/80 group-hover:text-white transition-colors">mail</span>
                            <span className="text-white font-bold text-lg">Check Messages</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardHome;
