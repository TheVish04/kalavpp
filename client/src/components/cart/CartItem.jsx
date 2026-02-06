
import React from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    // Image Helper
    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/150';
        if (path.startsWith('http')) return path;
        return supabase.storage.from('products').getPublicUrl(path).data.publicUrl;
    };

    const imageUrl = getImageUrl(item.image_url || item.image);

    return (
        <div className="group flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 rounded-xl bg-[#1e1e1e]/40 border border-white/5 hover:border-white/10 transition-all">
            {/* Thumbnail */}
            <Link to={`/product/${item.id}`} className="block relative w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#121212]">
                <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
            </Link>

            {/* Info */}
            <div className="flex-1 w-full text-center sm:text-left">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                    <div>
                        <Link to={`/product/${item.id}`} className="text-lg font-bold text-white hover:text-primary transition-colors line-clamp-1">
                            {item.title}
                        </Link>
                        <p className="text-sm text-[#a1a1aa] mt-1">
                            by <span className="text-white hover:underline cursor-pointer">@{item.profiles?.full_name || 'Generic Artist'}</span>
                        </p>
                    </div>
                </div>

                {/* Type Badge */}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium uppercase tracking-wide border ${item.category === 'Digital'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                    {item.category || 'Physical'}
                </span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 mt-2 sm:mt-0">
                {/* Quantity */}
                <div className="flex items-center gap-3 bg-[#121212] rounded-full px-3 py-1 border border-white/10">
                    <button
                        onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-colors"
                        disabled={(item.quantity || 1) <= 1}
                    >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="w-4 text-center text-sm font-bold text-white">{item.quantity || 1}</span>
                    <button
                        onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                </div>

                {/* Price */}
                <div className="text-right min-w-[80px]">
                    <div className="text-lg font-bold text-white">${(item.price * (item.quantity || 1)).toFixed(2)}</div>
                    {(item.quantity > 1) && (
                        <div className="text-xs text-[#a1a1aa]">${item.price.toFixed(2)} each</div>
                    )}
                </div>

                {/* Remove */}
                <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-[#a1a1aa] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Remove item"
                >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
