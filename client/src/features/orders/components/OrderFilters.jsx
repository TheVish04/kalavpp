
import React from 'react';

const OrderFilters = ({ activeFilter, setActiveFilter }) => {
    const filters = ['All Orders', 'Processing', 'Shipped', 'Delivered'];

    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${isActive
                                ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(140,37,244,0.3)]'
                                : 'bg-[#1e1e1e] text-gray-400 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {filter}
                    </button>
                );
            })}
        </div>
    );
};

export default OrderFilters;
