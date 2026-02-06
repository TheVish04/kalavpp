
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Header from '../../components/shop/Header';
import ArtistHero from '../../components/artist/ArtistHero';
import ArtistTabs from '../../components/artist/ArtistTabs';
import CommissionsSidebar from '../../components/artist/CommissionsSidebar';
import ProductCard from '../../components/shop/ProductCard';

const ArtistProfile = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('shop');
    const [profile, setProfile] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ followers: 1200, sales: 50, rating: 4.9 });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Profile
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (profileError) {
                    console.error("Error fetching profile", profileError);
                    // For demo purposes, we might continue if profile not found strictly, or handle it UI wise
                    // But in strict mode, we might throw or return.
                    // If no profile (e.g. mock ID), we might just mock it for the design check if strictly requested?
                    // But standard approach is to use what we get.
                }

                if (profileData) {
                    setProfile(profileData);
                }

                // Fetch Products for this artist
                const { data: productsData, error: productsError } = await supabase
                    .from('products')
                    .select('*, profiles(full_name, avatar_url)')
                    .eq('user_id', id);

                if (productsError) console.error("Error fetching products", productsError);

                if (productsData) {
                    setProducts(productsData);
                }

                // Set pseudo-random stats for now
                setStats({
                    followers: Math.floor(Math.random() * 2000) + 500,
                    sales: Math.floor(Math.random() * 500) + 50,
                    rating: (4.5 + Math.random() * 0.5).toFixed(1)
                });

            } catch (err) {
                console.error("Error loading Artist Profile:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    // Loading State
    if (loading) {
        return (
            <div className="bg-[#121212] min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Fallback if no profile found (though we should handle this better)
    if (!profile) {
        return (
            <div className="bg-[#121212] min-h-screen flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold">Artist not found</h2>
            </div>
        );
    }

    return (
        <div className="bg-[#121212] min-h-screen flex flex-col text-white overflow-x-hidden selection:bg-primary selection:text-white font-display">
            {/* Navigation */}
            <Header />

            <main className="flex-1 pb-20">
                {/* Hero Section */}
                <ArtistHero profile={profile} stats={stats} />

                <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
                    {/* Sticky Tabs */}
                    <ArtistTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Products / Content */}
                        <div className="lg:col-span-8 flex flex-col gap-8">

                            {/* Featured Drop Card (Static Visual for now) */}
                            {activeTab === 'shop' && (
                                <div className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-[#1e1e1e]/40 border border-white/5">
                                    <div className="absolute inset-0 z-0">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')` }}
                                        ></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent"></div>
                                    </div>
                                    <div className="relative z-10 flex flex-col justify-center h-full max-w-lg">
                                        <span className="mb-2 inline-flex w-fit items-center gap-1 rounded bg-primary/20 px-2 py-1 text-xs font-bold text-primary uppercase tracking-wider backdrop-blur-sm border border-primary/20">
                                            <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Newest Drop
                                        </span>
                                        <h3 className="mb-2 text-3xl md:text-4xl font-bold leading-tight text-white">Cyberpunk City 2077</h3>
                                        <p className="mb-6 text-[#d1d1d1]">Limited edition holographic print. Only 50 copies available worldwide. Signed and numbered by {profile.full_name?.split(' ')[0] || 'Artist'}.</p>
                                        <div className="flex items-center gap-4">
                                            <button className="bg-white text-black hover:bg-gray-200 font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                                                Buy Now <span className="text-primary font-black">$80.00</span>
                                            </button>
                                            <button className="text-white hover:text-primary transition-colors flex items-center gap-2 text-sm font-semibold">
                                                View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Content based on Active Tab */}
                            {activeTab === 'shop' ? (
                                <>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white">Latest Works</h3>
                                        <div className="flex gap-2">
                                            <button className="p-1 text-white"><span className="material-symbols-outlined">grid_view</span></button>
                                            <button className="p-1 text-[#473b54] hover:text-white"><span className="material-symbols-outlined">view_list</span></button>
                                        </div>
                                    </div>

                                    {products.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                            {products.map(product => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-20 text-center text-gray-500 bg-[#1e1e1e]/20 rounded-xl border border-white/5">
                                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">shopping_bag</span>
                                            <p>No products available yet.</p>
                                        </div>
                                    )}
                                </>
                            ) : activeTab === 'services' ? (
                                <div className="py-32 text-center text-gray-500 bg-[#1e1e1e]/20 rounded-xl border border-white/5">
                                    <span className="material-symbols-outlined text-6xl mb-4 opacity-50">construction</span>
                                    <h3 className="text-xl font-bold text-white mb-2">Services Coming Soon</h3>
                                    <p>The artist is setting up their service menu.</p>
                                </div>
                            ) : (
                                <div className="py-32 text-center text-gray-500 bg-[#1e1e1e]/20 rounded-xl border border-white/5">
                                    <span className="material-symbols-outlined text-6xl mb-4 opacity-50">folder_open</span>
                                    <h3 className="text-xl font-bold text-white mb-2">Portfolio Empty</h3>
                                    <p>No items to display here.</p>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <CommissionsSidebar />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ArtistProfile;
