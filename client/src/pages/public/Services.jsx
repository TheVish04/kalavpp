
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Header from '../../components/shop/Header';
import ServiceCard from '../../components/services/ServiceCard';
import ServiceFilters from '../../components/services/ServiceFilters';

const Services = () => {
    const [activeCategory, setActiveCategory] = useState('All Services');
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                // Fetch all products that are 'Service' category (or type)
                // Note: The prompt says category 'Service', but based on previous context/ProductCard, it might be in 'type' or mixed.
                // Assuming 'category' column holds 'Service' or 'type' holds it.
                // Let's assume a generic filter first. If your DB uses 'type'='SERVICE', adjust accordingly.
                // Based on previous ProductDetails, we have 'vertical', 'type', 'category'.
                // I'll query for category='Service' as requested, but also be flexible if needed.

                let query = supabase
                    .from('products')
                    .select('*, profiles(full_name, avatar_url, id)')
                    .eq('category', 'Service');

                const { data, error } = await query;

                if (error) throw error;

                // Client-side filtering for specific service sub-types (Verticals)
                let filteredData = data || [];

                if (activeCategory !== 'All Services') {
                    filteredData = filteredData.filter(item =>
                        (item.vertical === activeCategory) ||
                        (item.category === activeCategory) ||
                        (item.title && item.title.includes(activeCategory)) // Fallback for loose matching
                    );
                }

                setServices(filteredData);
            } catch (err) {
                console.error('Error fetching services:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [activeCategory]);

    return (
        <div className="bg-[#121212] min-h-screen flex flex-col text-white overflow-x-hidden selection:bg-primary selection:text-white font-display">
            {/* Top Navigation */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-12 flex flex-col gap-10">

                {/* Hero Section */}
                <section className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4 max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
                            Commission the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-300">Extraordinary</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                            Connect with world-class artists to bring your unique vision to life, from custom portraits to large-scale murals.
                        </p>
                    </div>

                    {/* Scrollable Filter Pills */}
                    <ServiceFilters activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
                </section>

                {/* Services Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {loading ? (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                            <p>Curating exceptional talent...</p>
                        </div>
                    ) : services.length > 0 ? (
                        services.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">palette</span>
                            <p className="text-xl">No services found for "{activeCategory}"</p>
                            <p className="text-sm mt-2">Try "All Services" to see our full roster.</p>
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
};

export default Services;
