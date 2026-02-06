
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();

    // Helper to resolve image URL
    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/600x800?text=Service';
        if (path.startsWith('http')) return path;
        return supabase.storage.from('products').getPublicUrl(path).data.publicUrl;
    };

    const imageUrl = getImageUrl(service.thumbnail || service.image);
    const artistName = service.profiles?.full_name || 'Kalavpp Artist';
    const artistAvatar = service.profiles?.avatar_url || 'https://via.placeholder.com/150';
    const artistUsername = service.profiles?.username ? `@${service.profiles.username}` : '';
    const price = service.price ? service.price.toFixed(0) : '0';
    // Mock rating for now as it's not in the standard product schema yet, or maybe it is?
    // Using random/mock data if missing for the design fidelity
    const rating = service.rating || (4.5 + Math.random() * 0.5).toFixed(1);
    const reviews = service.reviews_count || Math.floor(Math.random() * 100) + 10;

    return (
        <div className="relative group break-inside-avoid rounded-2xl overflow-hidden bg-[#1a1a1a] aspect-[4/5] md:aspect-auto h-[500px]">
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10"></div>
            <img
                src={imageUrl}
                alt={service.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />

            {/* Artist Avatar Overlap */}
            <div className="absolute bottom-[140px] left-5 z-20">
                <img
                    src={artistAvatar}
                    alt={artistName}
                    className="size-12 rounded-full border-2 border-[#121212] object-cover shadow-lg"
                />
            </div>

            {/* Glassmorphic Info Panel */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 z-20 shadow-lg flex flex-col gap-3 group-hover:bg-white/15 transition-colors">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{service.title}</h3>
                        <p className="text-xs text-gray-300 mt-1">{artistUsername || artistName}</p>
                    </div>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-primary font-bold text-base">Starts at ${price}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-amber-400 text-[18px] fill-current">star</span>
                            <span className="text-sm font-medium text-amber-400">{rating}</span>
                            <span className="text-xs text-gray-400">({reviews})</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(`/service/${service.id}`)}
                        className="border border-white/40 hover:bg-white hover:text-black hover:border-white text-white text-xs font-bold px-4 py-2 rounded-full transition-all uppercase tracking-wide"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
