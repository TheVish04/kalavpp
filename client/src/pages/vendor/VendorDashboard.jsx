
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import VendorSidebar from '../../components/vendor/VendorSidebar';
import DashboardStats from '../../components/vendor/DashboardStats';
import RevenueChart from '../../components/vendor/RevenueChart';
import RecentSales from '../../components/vendor/RecentSales';
import { Calendar } from 'lucide-react';

const VendorDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [sales, setSales] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        if (user) {
            fetchVendorData();
        }
    }, [user]);

    const fetchVendorData = async () => {
        try {
            setLoading(true);

            // Fetch Order Items where the PRODUCT belongs to the current user (Vendor)
            // Join with Orders to get timestamp & buyer info
            const { data, error } = await supabase
                .from('order_items')
                .select(`
                    id, 
                    price_at_purchase,
                    created_at,
                    products!inner(
                        id,
                        title,
                        user_id
                    ),
                    orders!inner(
                        id,
                        user_id,
                        created_at
                    )
                `)
                .eq('products.user_id', user.id) // Only my products
                .order('created_at', { ascending: false });

            if (error) throw error;

            const fetchedSales = data || [];
            setSales(fetchedSales);

            // Calculate Total Revenue
            const revenue = fetchedSales.reduce((sum, item) => sum + (item.price_at_purchase || 0), 0);
            setTotalRevenue(revenue);

        } catch (error) {
            console.error('Error fetching vendor data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-display flex overflow-hidden">
            {/* Sidebar */}
            <VendorSidebar />

            {/* Main Content */}
            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto custom-scrollbar p-4 md:p-8 lg:p-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Dashboard Overview</h1>
                        <p className="text-gray-400 text-sm">Welcome back, Creative. Here's what's happening today.</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="bg-[#121212] border border-[#1e1e1e] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1a1a1a] transition-colors">
                            <Calendar size={16} className="text-gray-400" />
                            Last 30 Days
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {/* 1. Stats Row */}
                        <DashboardStats totalRevenue={totalRevenue} />

                        {/* 2. Chart Section */}
                        <RevenueChart salesData={sales} />

                        {/* 3. Recent Transactions */}
                        <RecentSales transactions={sales.slice(0, 5)} />
                    </>
                )}

            </main>
        </div>
    );
};

export default VendorDashboard;
