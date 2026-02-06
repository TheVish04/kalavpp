
const SearchFilters = ({ activeTab, setActiveTab }) => {
    return (
        <section className="flex flex-col gap-6">
            {/* Search Bar matching the design */}
            <div className="w-full max-w-3xl mx-auto relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined">search</span>
                </div>
                <input
                    className="w-full h-14 bg-[#1e1e1e] border border-white/10 rounded-full pl-12 pr-14 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-lg"
                    placeholder="Search for art, collections, or creators..."
                    type="text"
                    defaultValue="Cyberpunk"
                />
                <button className="absolute inset-y-0 right-3 my-auto size-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
                </button>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                {['Price Range', 'Medium', 'Color Palette', 'Availability'].map((filter) => (
                    <button key={filter} className="glass-card px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium text-white hover:bg-white/5 active:scale-95 transition-all">
                        <span>{filter}</span>
                        <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>expand_more</span>
                    </button>
                ))}
                <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block"></div>
                <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>tune</span>
                    Advanced
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mt-2 overflow-x-auto scrollbar-hide justify-center">
                {['All Results', 'Physical Art', 'Digital Assets', 'Creators'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
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
