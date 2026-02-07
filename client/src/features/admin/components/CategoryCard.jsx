
import React from 'react';
import { Edit2, Image as ImageIcon } from 'lucide-react';

const CategoryCard = ({ category, onClick }) => {
    return (
        <div
            onClick={() => onClick(category)}
            className="group relative h-[200px] bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#8c25f4]/50 cursor-pointer transition-all duration-300"
        >
            {/* Background Image */}
            {category.image_url ? (
                <img
                    src={category.image_url}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#202020]">
                    <ImageIcon size={32} className="text-gray-700" />
                </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#e0e0e0] transition-colors">
                    {category.name}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-1">{category.description || 'No description provided'}</p>
            </div>

            {/* Hover Icon */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-white">
                <Edit2 size={12} />
            </div>

            {/* Active Dot */}
            <div className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
        </div>
    );
};

export default CategoryCard;
