import { useState } from 'react';

const Header = ({ resultCount, sort, setSort }) => {
    const [isSortOpen, setIsSortOpen] = useState(false);

    return (
        <React.Fragment> {/* Using Fragment to avoid extra div wrapper if needed, but structure requires specific hierarchy */}
            {/* Top Navigation Bar */}
            <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#121212] z-50 relative">
                <div className="flex items-center gap-4 text-white">
                    <div className="text-primary">
                        <span className="material-symbols-outlined text-4xl">pentagon</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Kalavpp</h1>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl mx-12 hidden md:block">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            className="w-full bg-[#1E1E24] border-none rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-[#25252c] transition-all"
                            placeholder="Search artists, artworks, collections..."
                            type="text"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-gray-400 hover:text-white transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
                    </button>
                    <button className="flex items-center gap-2 bg-[#1E1E24] hover:bg-primary/20 text-white px-4 py-2 rounded-full transition-all border border-white/5">
                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                        <span className="text-sm font-bold">2</span>
                    </button>
                    <div
                        className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary/30"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK-LCKokphbApqUjf7ns1I6b3SYt7XUskTQGLphfjkdxFbWPOmox7D5Yc1Q9gXJ_bpOM9g5wYvAk_ocXVzwvl2Txggup0faylmK--MO3BFQz95X5WbqeEkXa86iMj7sgLfNgMReqQCSMma5vxv-6nNZkfPG-KP4uNqJ-7zHALSGFbv2UKNcaeah_j3MQAIm5eGY1woN4LtbRwWO8py2kJDrJpdiX8yFayKhkTHou7ZiVYiy4oXYGABUxwOAFeQ51k--jP_6QSe3uI')" }}
                    ></div>
                </div>
            </header>
        </React.Fragment>
    );
};

// Controls component specifically for the Shop main content area (Result count + Sort)
export const ShopControls = ({ count, sort, setSort }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h2 className="text-3xl font-bold mb-1">Explore Artworks</h2>
                <p className="text-gray-400 text-sm">Showing <span className="text-white font-bold">{count}</span> Results</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative group" tabIndex={0}>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1E1E24] border border-white/10 rounded-full text-sm font-medium hover:border-primary/50 transition-all">
                        <span>Sort by: {sort === 'newest' ? 'Newest' : sort === 'price_asc' ? 'Price: Low to High' : sort === 'price_desc' ? 'Price: High to Low' : 'Top Rated'}</span>
                        <span className="material-symbols-outlined text-lg">expand_more</span>
                    </button>
                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-xl py-2 hidden group-focus-within:block group-hover:block shadow-xl z-50 bg-[#1E1E24]">
                        <button onClick={() => setSort('newest')} className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5">Newest</button>
                        <button onClick={() => setSort('price_asc')} className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5">Price: Low to High</button>
                        <button onClick={() => setSort('price_desc')} className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5">Price: High to Low</button>
                        <button onClick={() => setSort('rating')} className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5">Top Rated</button>
                    </div>
                </div>
                <button className="lg:hidden p-2.5 bg-[#1E1E24] border border-white/10 rounded-full text-white">
                    <span className="material-symbols-outlined">filter_list</span>
                </button>
            </div>
        </div>
    );
};

import React from 'react';
export default Header;
