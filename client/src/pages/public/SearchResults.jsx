import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import Header from '../../components/shop/Header'; // Reusing Header
import ProductCard from '../../components/shop/ProductCard';
import CreatorCard from '../../components/search/CreatorCard';
import CollectionHero from '../../components/search/CollectionHero';
import SearchFilters from '../../components/search/SearchFilters';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || 'Cyberpunk'; // Default to Cyberpunk query for demo
    const [activeTab, setActiveTab] = useState('All Results');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock Data for "Cyberpunk" collection to match the image exactly
    // In a real scenario, this would be fetched from Supabase based on the query
    const MOCK_RESULTS = [
        { type: 'product', id: 1, title: 'Neon Rain', price: 1500, vertical: 'DIGITAL', creator: 'Vexx', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP5BSAj6UAh7Qf0Uw2k5BHVizdx7nu4wql7Fb3dKYL0S4CV2lSit8pHIHDFWQLfJflmgmHV1AKOYidwBxxw68_asOyvOj_YJ_6Hq0lngT1_jOPhfANbtB7hS3MFn0sReEy6dLthyrJo4Rj9srR-4Vv8f6ZHHBRP3bR-PSmjIOcjzjryHfEWRxA-faGljuP1dXMEKp0SIlwWGVj_P8UlEQOo7uzhcARviE2Gd-w2ZVzknKfgH73eQ0U4nAB4cn_T6314khkHp9eBwE' },
        { type: 'creator', id: 'c1', full_name: 'CyberDaVinci', specialty: '3D Artist', followers_count: 12000, avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuzsQDMEreMDPq9cdo_Jpum8FRNvjODdFs3FSso3u7tsCxfo9Tt69_HI0x4DOxIA1uvf1azEoQ-JxxqD4Ulpm7o0koAk-zh78fdCUMLVU6Ad_zThYAvIXf8hdqa_cyPJOZn6KsIfM4qAZ3bKSeeyS2SPmNfB013eNzGfoNqW59WyztwOl-nPjfh1FqTnbpdIcUK-gelsRumioBU6kxdSIQUeVM0Sm9LAH2izU99ZQ4zyLL7OkeaQFwsjHWqPI19KtPmJDOaW0K9go' },
        { type: 'product', id: 2, title: 'Circuit Soul', price: 1200, vertical: 'PHYSICAL', creator: 'TechNoir', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk4g65a6pa99UJR2nReF4e_MhfGqvn7S1uFCEIVYhsNnSTwbhmWWFcLIpcXYUe8Skq3KZRuIHt7Kg_a2nEA2whZTIpfFhsjm9kCBo6_QH4DGewQ-9RstokmkOZn14uO98mkFI-N0fV0zSbQGVXWTgEwg9DZR-AK_LKsFT3AM63WxeT4ghgxBp-JMDXHcxj5R4QSojG6jOSQHrcAUfPtLlWb48zQw4JD3X2cn9RvlH0WvVWWxu__j8yMl3Hdh4d5s3IleIOABCTlpg' },
        { type: 'product', id: 3, title: 'Glitch City Pack', price: 45, vertical: '3D ASSET', creator: 'PolyMaster', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBzUC6GLLzhBorNL95_BPSjqxBFzE0oK3mit0LCGcQI92s0pVbP16JlUvL5avmOdVR5Fh22ENqy5-AM5WChi718q1F7J3r_fE_CIRJL-WZUsrTKmqsZOdn7WfwoZaIYZJ1TOnGLTaYHbb1iZK-_yNqDw1RcYFu7f6C39vo5FaBmVN6CXN-cCCdbX3WpqxwGtqwJ6d2JFgG8e7gGFM629ZS-ifl5AXwURZr4Hjewi5w00wzlLzZR_96ncYn3SEWRttQnN1rKWWmXrA' },
        { type: 'product', id: 4, title: 'Sunset Grid', price: 300, vertical: 'DIGITAL', creator: 'RetroWave', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWnRZdYAepDnHfdqMy7WrYs4H1CibUd0f45ibhs0rFUy3eQJM0h8xFGAo6Wj1LCfF_3iYp91deG7HTTGF52jZnQguoE1cdny9UEOx9AOoDRQ_o13_eX_lzt8curkXMMBWx1EO1vTxiQfPC_wak792PDQezgAhqRO7hvRTBWhWti9qFNcNOOEAwdPWurs6RnYq1YwyieP7BB1wkAFcRrCBXKXKeqYxZWXrM5ubYF0IlHGBt18jk4NyQPP800o0eaUJc8tvhtGiT9d8' },
        { type: 'creator', id: 'c2', full_name: 'Elena Arts', specialty: 'Illustrator', followers_count: 8000, avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY55L9ZC3ofzP2Dcp3nEvkTvzSGd2LIumF8aW_jFmxTFBWTEamuWUpqocEd6Yzle5AELpeXNvKlw-d-mn887rdkDtEyIjykPAzqNklpA3BsAwRCDWIrGjY2KPx26Z-D5c0APT9MUKPxxLwVbG1L3guz0mlwfiHBSaSwxRQumsJC4qx3Lg4CmKQh5k5oKhE4bufDlL0b7B84TNKXGR_oBA7RoEqMbE6qXmlBIF_glZqBr9L5SM57HmIqGYv4K_yG6TtIEOg3tLKjlY' },
        { type: 'product', id: 5, title: 'Chaos Theory', price: 2500, vertical: 'PHYSICAL', creator: 'AbstractMind', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYEYy1VYOSTrdq9gOXxDEvh9r4PI_ccjcjKASXIJfdjHeUj2X3Vr1dS9bhrg0LuRaUI227mWL3U7uDFs1HqI-oICftlacyu6nTRnUGjsL3ozeNz5akrrHCrBWbZJq23E_1J31KKuvLLSNcm6LTkh9XpdFJNCl3mTYkDBZNWvSM48DP-NWI43nngSntr80hmjxTAAKpsQ_4gHdNzs0vQkRc3_uWjpxnrAfXYeTmzfBDjymkl28Fyf5fvHbsD5Y7BBUSq6UH_pfTdL8' },
        { type: 'product', id: 6, title: 'Liquid Dreams', price: 1800, vertical: 'DIGITAL', creator: 'Aura', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCotRxWkTZD8VEXprdsCH8LUn3W28ohu6ih5FMeiMzWCP9CkhHoLwexX3iqT0g58NDhP1qKOHFoUQXJcGCFB04GlTIvO1ra0MUsgVOBaB4ER4_iTmRXSbGuSg4w3MO0pzAI74Ikq9D2aCAmp2R7yKgJBuMLuEfp3Us6OZQTrUU_2gDhl9sUMqsH1sJu8IQ0ae6GB-ArQASm5zVNfrjBw1V3uFn_kdIELhLWENEFi_tXN-EsmXo50-M0kWCqteymy2IdLYZZADs4cTE' },
    ];

    useEffect(() => {
        // Simulating fetch - in production, mix fetching from 'products' and 'profiles'
        setLoading(true);
        setTimeout(() => {
            setResults(MOCK_RESULTS);
            setLoading(false);
        }, 800);
    }, [query]);

    return (
        <div className="bg-background-light dark:bg-[#121212] font-display text-white min-h-screen flex flex-col">
            <Header />

            <main className="layout-container max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

                {/* Filters & Search Header */}
                <SearchFilters activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Hero Banner (Conditionally rendered) */}
                <CollectionHero
                    isCollection={query === 'Cyberpunk'}
                    title="Cyberpunk Collection"
                    description="Explore the synthesis of man and machine in this exclusive curated drop. Limited edition prints and 3D assets available now."
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuBYVjmdU5atf30MGhvaEAF7LW8Jc9DyjaE17BBB5nuo1AaHavw7GunJYf7QZs67FV7zNI8udwu7JBXGfsv7kkfVOFSIlpSZL8mJTgFo0ww_6ky3imCDqPNnzDZYgBNSRoqWZMdl08AhbqNc4QLjV2L311Pm9ny4SSLAv-Hvd5WqWoOcJxhPKaS0zgVC3h7p-Bt_Xd0XZJj5Jv7zAk8CSwy0astutc18PzChgHjnnEqAXSlg_pgpdmJixUkRNFUNh0eNqRgdJRiCLF4"
                />

                {/* Results Grid */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                        {results.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {item.type === 'creator' ? (
                                    <CreatorCard creator={item} />
                                ) : (
                                    <ProductCard product={item} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <p className="text-gray-400 text-sm">Showing {results.length} results</p>
                    <div className="w-full max-w-md h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-primary rounded-full"></div>
                    </div>
                    <button className="glass-panel px-8 py-3 rounded-full font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2 mt-2">
                        Load More
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>refresh</span>
                    </button>
                </div>

            </main>
        </div>
    );
};

export default SearchResults;
