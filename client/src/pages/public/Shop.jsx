import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import Header, { ShopControls } from '../../components/shop/Header';
import Sidebar from '../../components/shop/Sidebar';
import ProductCard from '../../components/shop/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters State
    const [filters, setFilters] = useState({
        category: null,
        priceRange: [0, 5000],
        type: [], // 'DIGITAL', 'PHYSICAL', etc.
        rating: 0
    });

    // Sort State
    const [sort, setSort] = useState('newest');

    // Fetch Data
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Fetch products with profile information if available (using select with join if relation exists, else just products)
                // Assuming simple products table for now based on prompt context
                const { data, error } = await supabase
                    .from('products')
                    .select('*');

                if (error) throw error;
                setProducts(data || []);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter & Sort Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // 1. Filter by Category (Assuming category mapping or vertical)
        if (filters.category) {
            // Adjust logic based on actual DB schema. prompt implies categories like 'Paintings', '3D Models'
            // If DB uses 'vertical' or 'category' column:
            result = result.filter(p =>
                p.category === filters.category ||
                p.vertical === filters.category ||
                (filters.category === 'Price' && false) // placeholder correction
            );
        }

        // 2. Filter by Price
        result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

        // 3. Filter by Type
        if (filters.type.length > 0) {
            result = result.filter(p => {
                const pType = p.type || p.vertical || 'DIGITAL';
                return filters.type.includes(pType.toUpperCase());
            });
        }

        // 4. Sort
        switch (sort) {
            case 'price_asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                // Assuming rating field exists, else ignore
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'newest':
            default:
                result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
        }

        return result;
    }, [products, filters, sort]);

    return (
        <div className="bg-background-light dark:bg-[#121212] font-display text-white min-h-screen flex flex-col overflow-hidden">
            <Header resultCount={filteredProducts.length} sort={sort} setSort={setSort} />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar filters={filters} setFilters={setFilters} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto relative z-0 custom-scrollbar">
                    <div className="p-8 pb-20">
                        <ShopControls count={filteredProducts.length} sort={sort} setSort={setSort} />

                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-400 py-10">
                                <p>Error loading products: {error}</p>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center text-gray-400 py-20">
                                <span className="material-symbols-outlined text-6xl mb-4 opacity-50">search_off</span>
                                <p className="text-xl">No products found matching your criteria.</p>
                                <button
                                    onClick={() => setFilters({ category: null, priceRange: [0, 5000], type: [], rating: 0 })}
                                    className="mt-4 text-primary hover:text-white underline"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}

                        {!loading && filteredProducts.length > 0 && (
                            <div className="flex justify-center mt-16">
                                <button className="group flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                    <span>Load More Artworks</span>
                                    <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">expand_more</span>
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <style>{`
                /* Custom scrollbar to match design */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #121212; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333; 
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #8c25f4; 
                }
            `}</style>
        </div>
    );
};

export default Shop;
