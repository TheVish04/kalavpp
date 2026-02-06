
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Download, Loader2 } from 'lucide-react';
import VendorSidebar from '../../components/vendor/VendorSidebar';
import EarningsCard from '../../components/vendor/EarningsCard';
import PayoutPanel from '../../components/vendor/PayoutPanel';
import TransactionList from '../../components/vendor/TransactionList';

const Wallet = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    // Financial State
    const [transactions, setTransactions] = useState([]);
    const [availableBalance, setAvailableBalance] = useState(0);
    const [pendingClearance, setPendingClearance] = useState(0);
    const [lastPayout, setLastPayout] = useState(2100.00); // Mock default

    useEffect(() => {
        if (user) {
            fetchFinancialData();
        }
    }, [user]);

    const fetchFinancialData = async () => {
        try {
            setLoading(true);

            // Fetch Real Sales Data joined with Products/Orders
            const { data, error } = await supabase
                .from('order_items')
                .select(`
                    id,
                    price_at_purchase,
                    created_at,
                    products!inner (
                        title,
                        user_id
                    ),
                    orders (
                        status
                    )
                `)
                .eq('products.user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const sales = data || [];

            // Transform into Transaction Format
            const saleTransactions = sales.map(s => ({
                id: s.id,
                type: 'sale',
                description: s.products?.title || 'Unknown Item',
                subtext: `Sale #${s.id.toString().slice(0, 8)}`,
                amount: s.price_at_purchase || 0,
                created_at: s.created_at,
                status: 'CLEARED' // Assume cleared for demo immediate gratification
            }));

            // Mock Payout for History Visuals
            const mockPayout = {
                id: 'payout-1',
                type: 'payout',
                description: 'Payout to Chase Bank',
                subtext: 'Direct Deposit',
                amount: -2000.00,
                created_at: '2023-10-15T10:00:00Z',
                status: 'COMPLETED'
            };

            const allTransactions = [...saleTransactions, mockPayout].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setTransactions(allTransactions);

            // Calculate Totals
            const totalSales = sales.reduce((sum, s) => sum + (s.price_at_purchase || 0), 0);

            // Logic: 90% Available, 10% Pending (Mock rule)
            setAvailableBalance(totalSales * 0.9);
            setPendingClearance(totalSales * 0.1);

        } catch (error) {
            console.error('Error fetching wallet data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePayoutRequest = () => {
        // Here we would create a 'payout_requests' record in DB
        // For MVP frontend demo:
        alert('Payout request successfully sent to Admin!');
        setAvailableBalance(0); // Optimistic clear
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-display flex overflow-hidden">
            {/* Sidebar */}
            <VendorSidebar />

            {/* Main Content */}
            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto custom-scrollbar p-4 md:p-8 lg:p-12">

                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                            <span>Dashboard</span>
                            <span>›</span>
                            <span className="text-white">Earnings</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Earnings Overview</h1>
                        <p className="text-gray-400 text-sm">Manage your creative income and payouts securely.</p>
                    </div>

                    <button className="bg-[#121212] hover:bg-[#1a1a1a] border border-[#1e1e1e] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                        <Download size={16} />
                        Export Report
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="animate-spin text-green-500" size={32} />
                    </div>
                ) : (
                    <>
                        {/* Top Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* Main Balance - Spans 2 cols */}
                            <div className="lg:col-span-2 h-[320px]">
                                <EarningsCard
                                    availableBalance={availableBalance}
                                    pendingClearance={pendingClearance}
                                    lastPayout={lastPayout}
                                />
                            </div>

                            {/* Payout Actions - Spans 1 col */}
                            <div className="h-[320px]">
                                <PayoutPanel onPayoutRequest={handlePayoutRequest} />
                            </div>
                        </div>

                        {/* Recent Activity Table */}
                        <TransactionList transactions={transactions} />
                    </>
                )}

            </main>
        </div>
    );
};

export default Wallet;
