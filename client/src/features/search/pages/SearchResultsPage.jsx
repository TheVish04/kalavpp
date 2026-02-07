
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../api/supabase';
import CollectionHero from '../components/CollectionHero';
import CreatorCard from '../components/CreatorCard';
import ProductCard from '../../shop/components/ProductCard';
import SearchFilters from '../components/SearchFilters';

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All Results');
    const [inputQuery, setInputQuery] = useState(query); // Local state for input

    // Sync input with URL query
    useEffect(() => {
        setInputQuery(query);
    }, [query]);

    // Handle Search Submission
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ q: inputQuery });
    };

    // Data Fetching Logic
    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                // 1. Fetch Products
                // Filter products by title or description using .or() syntax for inclusive search
                let productQuery = supabase
                    .from('products')
                    .select('*') // Simplified selection to match Shop.jsx and avoid relation errors
                    .or(`title.ilike.%${query}%,description.ilike.%${query}%`); // Search in both title and description

                // 2. Fetch Creators (Profiles) if needed (for All Results or Creators tab)
                let creatorQuery = supabase
                    .from('profiles')
                    .select('*')
                    .ilike('full_name', `%${query}%`); // Adjust field name based on schema

                const [productsRes, creatorsRes] = await Promise.all([
                    productQuery,
                    creatorQuery
                ]);

                if (productsRes.error) console.error('Product fetch error:', productsRes.error);
                if (creatorsRes.error) console.error('Creator fetch error:', creatorsRes.error);

                const products = productsRes.data || [];
                // Tag products so we know how to render them
                const taggedProducts = products.map(p => ({ ...p, type_interaction: 'PRODUCT' }));

                const creators = creatorsRes.data || [];
                // Tag creators
                const taggedCreators = creators.map(c => ({ ...c, type_interaction: 'CREATOR' }));

                // Combine and Filter based on Active Tab
                let combined = [];

                if (activeTab === 'All Results') {
                    combined = [...taggedProducts, ...taggedCreators];
                    // Simple shuffle or sort to mix them? Or just append. 
                    // For "Mixed Grid", ideally we mix them.
                    // Let's sort created_at to mix? Or just interleave?
                    // For now, let's just combine.
                } else if (activeTab === 'Creators') {
                    combined = [...taggedCreators];
                } else if (activeTab === 'Physical Art') {
                    combined = taggedProducts.filter(p => (p.vertical || p.type) === 'PHYSICAL');
                } else if (activeTab === 'Digital Assets') {
                    combined = taggedProducts.filter(p => (p.vertical || p.type) !== 'PHYSICAL');
                }

                setResults(combined);

            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query, activeTab]);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-white overflow-x-hidden selection:bg-primary selection:text-white">

            <main className="flex-1 layout-container max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

                {/* Search & Filter Area */}
                <section className="flex flex-col gap-6">
                    {/* Search Bar */}
                    <div className="w-full max-w-3xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <form onSubmit={handleSearch}>
                            <input
                                className="w-full h-14 bg-[#1e1e1e] border border-white/10 rounded-full pl-12 pr-14 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-lg"
                                placeholder="Search for art, collections, or creators..."
                                type="text"
                                value={inputQuery}
                                onChange={(e) => setInputQuery(e.target.value)}
                            />
                        </form>
                        {inputQuery && (
                            <button
                                onClick={() => {
                                    setInputQuery('');
                                    setSearchParams({ q: '' });
                                }}
                                className="absolute inset-y-0 right-3 my-auto size-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
                            </button>
                        )}
                    </div>

                    {/* Filters and Tabs */}
                    <SearchFilters activeTab={activeTab} onTabChange={setActiveTab} />
                </section>

                {/* Dynamic Hero Section */}
                <CollectionHero title="Search Results" description="" query={query} />

                {/* Results Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                    {loading ? (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                            <p>Searching for masterpieces...</p>
                        </div>
                    ) : results.length > 0 ? (
                        results.map((item) => {
                            if (item.type_interaction === 'CREATOR') {
                                return <CreatorCard key={`creator-${item.id}`} creator={item} />;
                            } else {
                                return <ProductCard key={`product-${item.id}`} product={item} />;
                            }
                        })
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">search_off</span>
                            <p className="text-xl">No results found for "{query}"</p>
                            <p className="text-sm mt-2">Try checking your spelling or use different keywords.</p>
                        </div>
                    )}
                </section>

                {/* Pagination / Load More (Static for now) */}
                {!loading && results.length > 0 && (
                    <section className="flex flex-col items-center justify-center gap-4 py-8">
                        <p className="text-gray-400 text-sm">Showing {results.length} results</p>
                        <div className="w-full max-w-md h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-primary rounded-full"></div>
                        </div>
                        {/* <button className="glass-panel px-8 py-3 rounded-full font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2 mt-2">
                            Load More
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>refresh</span>
                        </button> */}
                    </section>
                )}

            </main>
        </div>
    );
};

export default SearchResults;
