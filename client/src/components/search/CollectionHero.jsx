
import React from 'react';

const CollectionHero = ({ title, description, query }) => {
    // Logic to determine if we should show the "Cyberpunk" specific styling
    const isCyberpunk = query && query.toLowerCase().includes('cyberpunk');

    // Dynamic Content based on query
    const displayTitle = query ? `Results for '${query}'` : "Explore All Collections";
    const displayDesc = description || (query ? `Browsing matches for "${query}"` : "Discover the most unique art and artists on Kalavpp.");

    // Specific Cyberpunk Data
    const cyberpunkData = {
        bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYVjmdU5atf30MGhvaEAF7LW8Jc9DyjaE17BBB5nuo1AaHavw7GunJYf7QZs67FV7zNI8udwu7JBXGfsv7kkfVOFSIlpSZL8mJTgFo0ww_6ky3imCDqPNnzDZYgBNSRoqWZMdl08AhbqNc4QLjV2L311Pm9ny4SSLAv-Hvd5WqWoOcJxhPKaS0zgVC3h7p-Bt_Xd0XZJj5Jv7zAk8CSwy0astutc18PzChgHjnnEqAXSlg_pgpdmJixUkRNFUNh0eNqRgdJRiCLF4",
        title: "Cyberpunk Collection",
        desc: "Explore the synthesis of man and machine in this exclusive curated drop. Limited edition prints and 3D assets available now.",
        tag: "Featured Collection",
        artist: "NeonGod"
    };

    // Generic Data for other searches
    const genericData = {
        bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", // Abstract Dark Background
        title: displayTitle,
        desc: displayDesc,
        tag: "Search Results",
        artist: null
    };

    const currentData = isCyberpunk ? cyberpunkData : genericData;

    return (
        <section className="@container w-full">
            <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 group h-[340px]">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${currentData.bgImage}')` }}
                >
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center max-w-2xl px-8 sm:px-12 gap-4">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full">{currentData.tag}</span>
                        {currentData.artist && (
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>verified</span> {currentData.artist}
                            </span>
                        )}
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-white drop-shadow-lg">{currentData.title}</h2>
                    <p className="text-lg text-gray-300 max-w-lg leading-relaxed">{currentData.desc}</p>

                    {isCyberpunk && (
                        <div className="pt-4">
                            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold transition-all transform active:scale-95 shadow-[0_0_20px_rgba(140,37,244,0.3)] flex items-center gap-2">
                                View Collection
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CollectionHero;
