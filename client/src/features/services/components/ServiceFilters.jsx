
import React from 'react';

const ServiceFilters = ({ activeCategory, onCategoryChange }) => {
    const categories = [
        { id: 'All Services', label: 'All Services', icon: 'star' },
        { id: 'Custom Portraits', label: 'Custom Portraits', icon: 'person' },
        { id: 'Wall Murals', label: 'Wall Murals', icon: 'wallpaper' },
        { id: 'Digital Art', label: 'Digital Art', icon: 'monitor' },
        { id: 'Oil Painting', label: 'Oil Painting', icon: 'palette' },
        { id: 'Character Design', label: 'Character Design', icon: 'ink_pen' },
        { id: 'Photography', label: 'Photography', icon: 'camera_alt' },
    ];

    return (
        <div className="w-full overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center gap-3 min-w-max">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className={`group flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all border ${activeCategory === cat.id
                                ? 'bg-white text-black border-white'
                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-white backdrop-blur-md'
                            }`}
                    >
                        <span className={`material-symbols-outlined text-[20px] ${activeCategory === cat.id ? 'text-black' : 'text-primary'}`}>
                            {cat.icon}
                        </span>
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ServiceFilters;
