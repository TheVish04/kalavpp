
import React from 'react';

const SearchFilters = ({ activeTab, onTabChange }) => {
    return (
        <section className="flex flex-col gap-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                <button className="glass-card px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-white/5 active:scale-95 transition-all text-white">
                    <span>Price Range</span>
                    <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>expand_more</span>
                </button>
                <button className="glass-card px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-white/5 active:scale-95 transition-all text-white">
                    <span>Medium</span>
                    <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>expand_more</span>
                </button>
                <button className="glass-card px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-white/5 active:scale-95 transition-all text-white">
                    <span>Color Palette</span>
                    <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>expand_more</span>
                </button>
                <button className="glass-card px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-white/5 active:scale-95 transition-all text-white">
                    <span>Availability</span>
                    <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>expand_more</span>
                </button>

                <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block"></div>

                <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>tune</span>
                    Advanced
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mt-2 overflow-x-auto scrollbar-hide">
                {['All Results', 'Physical Art', 'Digital Assets', 'Creators'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange && onTabChange(tab)}
                        className={`px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all ${activeTab === tab
                                ? 'border-primary text-white'
                                : 'border-transparent text-gray-400 hover:text-white hover:border-white/20'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default SearchFilters;
