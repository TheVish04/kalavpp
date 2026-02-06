const Sidebar = ({ filters, setFilters, categories = ['Paintings', '3D Models', 'Sculptures', 'NFTs'] }) => {
    const handleCategoryChange = (cat) => {
        setFilters(prev => ({ ...prev, category: cat === prev.category ? null : cat }));
    };

    const handleTypeChange = (type) => {
        setFilters(prev => {
            const types = prev.type.includes(type)
                ? prev.type.filter(t => t !== type)
                : [...prev.type, type];
            return { ...prev, type: types };
        });
    };

    const handlePriceChange = (e) => {
        setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }));
    };

    return (
        <aside className="w-80 flex-shrink-0 glass-panel border-r border-white/5 h-full overflow-y-auto p-6 hidden lg:flex flex-col gap-8 z-40 bg-[#121212]/50 backdrop-blur-md">
            {/* Categories */}
            <div>
                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-4">Categories</h3>
                <div className="flex flex-col gap-2">
                    <label
                        onClick={() => setFilters(prev => ({ ...prev, category: null }))}
                        className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${!filters.category ? 'bg-primary/10 border-primary/30' : 'hover:bg-white/5 border-transparent'
                            }`}
                    >
                        <span className="text-white font-medium">All Artworks</span>
                    </label>
                    {categories.map(cat => (
                        <div
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${filters.category === cat ? 'bg-primary/10 border-primary/30' : 'hover:bg-white/5 border-transparent'
                                }`}
                        >
                            <span className={filters.category === cat ? "text-white" : "text-gray-400 group-hover:text-white"}>{cat}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-4">Price Range</h3>
                <div className="px-2">
                    <input
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        type="range"
                        min="0"
                        max="5000"
                        value={filters.priceRange[1]}
                        onChange={handlePriceChange}
                    />
                    <div className="flex justify-between mt-4 text-sm font-medium text-gray-300">
                        <span>$0</span>
                        <span>${filters.priceRange[1].toLocaleString()}+</span>
                    </div>
                </div>
            </div>

            {/* Product Type */}
            <div>
                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-4">Product Type</h3>
                <div className="flex flex-col gap-3">
                    {['DIGITAL', 'PHYSICAL', 'LIMITED'].map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.type.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-600 bg-[#1E1E24] checked:border-primary checked:bg-primary transition-all"
                                />
                                <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                            </div>
                            <span className="text-gray-300 group-hover:text-white text-sm capitalize">{type.toLowerCase()}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating */}
            <div>
                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-4">Rating</h3>
                <div className="flex flex-col gap-2">
                    {[5, 4].map(stars => (
                        <label key={stars} className="flex items-center gap-2 cursor-pointer group hover:bg-white/5 p-2 -mx-2 rounded-lg">
                            <input
                                type="radio"
                                name="rating"
                                className="text-primary bg-transparent border-gray-600 focus:ring-0 focus:ring-offset-0"
                            />
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`material-symbols-outlined text-sm ${i < stars ? 'fill-current' : 'text-gray-600'}`}>star</span>
                                ))}
                            </div>
                            <span className="text-xs text-gray-400 ml-auto">& Up</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
                <button
                    onClick={() => setFilters({ category: null, priceRange: [0, 5000], type: [] })}
                    className="w-full py-3 rounded-full bg-white/5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                >
                    Reset Filters
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
