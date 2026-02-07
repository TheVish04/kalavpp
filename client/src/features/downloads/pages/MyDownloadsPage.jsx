
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabase';
import { useAuth } from '../../../store/AuthContext';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../../profile/components/DashboardSidebar';
import DownloadCard from '../components/DownloadCard';
import { Search, FolderX } from 'lucide-react';

const MyDownloads = () => {
    const { user } = useAuth();
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (user) {
            fetchDownloads();
        }
    }, [user]);

    const fetchDownloads = async () => {
        try {
            setLoading(true);

            // Fetch order items where the product is digital
            // Note: Supabase postgrest inner join filtering syntax
            const { data, error } = await supabase
                .from('order_items')
                .select(`
                    *,
                    orders!inner(user_id),
                    products!inner(
                        title,
                        description,
                        image_url,
                        vertical
                    )
                `)
                .eq('orders.user_id', user.id)
                // Assuming 'vertical' is the column for Digital/Physical. 
                // If it relies on 'category', swap 'vertical' for 'category'.
                // Using 'vertical' based on previous context.
                .eq('products.category', 'Digital');

            if (error) throw error;
            setDownloads(data || []);

        } catch (error) {
            console.error('Error fetching downloads:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    const filteredDownloads = downloads.filter(item =>
        item.products?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#121212] min-h-screen text-white font-display flex overflow-hidden">

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content */}
            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto relative z-10 p-4 md:p-8 lg:p-10 custom-scrollbar">

                {/* Background Glow */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                    <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] opacity-30"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col">

                    {/* Header & Controls */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">My Digital Library</h1>
                            <p className="text-[#a1a1aa]">Manage your premium assets, licenses, and downloads.</p>
                        </div>

                        <div className="w-full md:w-80 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-[#1e1e1e] border border-white/10 rounded-xl flex items-center px-4 py-3 focus-within:border-primary/50 transition-colors">
                                <Search size={18} className="text-gray-500 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Search assets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredDownloads.length > 0 ? (
                        <div className="flex flex-col gap-4 pb-20">
                            {filteredDownloads.map((item, index) => (
                                <DownloadCard key={item.id || index} item={item} />
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className="flex flex-col items-center justify-center py-24 text-center glass-panel rounded-3xl border border-white/5 bg-[#1e1e1e]/20">
                            <div className="w-24 h-24 rounded-full bg-[#1e1e1e] flex items-center justify-center mb-6 shadow-inner">
                                <FolderX size={48} className="text-[#a1a1aa] opacity-50" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Vault Empty</h2>
                            <p className="text-[#a1a1aa] max-w-md mb-8">
                                You haven't purchased any digital assets yet. Explore our marketplace to start building your collection.
                            </p>
                            <Link
                                to="/shop?category=Digital"
                                className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-xl transition-all transform hover:-translate-y-0.5"
                            >
                                Browse Marketplace
                            </Link>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default MyDownloads;
