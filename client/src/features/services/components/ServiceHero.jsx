import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../api/supabase';

const ServiceHero = ({ service }) => {
    // Helper to resolve image URL
    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/800x600?text=Service';
        if (path.startsWith('http')) return path;
        return supabase.storage.from('products').getPublicUrl(path).data.publicUrl;
    };

    const imageUrl = getImageUrl(service.image);
    const artistName = service.profiles?.full_name || 'KalaVPP Artist';
    const artistAvatar = service.profiles?.avatar_url || 'https://via.placeholder.com/150';
    const artistId = service.profiles?.id;

    return (
        <div className="flex-1 min-w-0 flex flex-col gap-10">
            {/* Hero Section */}
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
                    Commission a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Masterpiece</span>
                </h1>
                <p className="text-[#ab9cba] text-lg max-w-xl">
                    Transform your space with bespoke art. Collaborate with world-class artists to bring your unique vision to life.
                </p>
            </div>

            {/* Hero Image */}
            <div className="w-full aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative group">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                >
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/20">Featured Project</span>
                </div>
            </div>

            {/* Artist Bio Card */}
            <div className="glass-panel border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start transition-all hover:border-primary/50 bg-[#1e1e1e]/60 backdrop-blur-md">
                <div className="relative">
                    <div
                        className="w-24 h-24 rounded-full bg-cover bg-center border-2 border-primary shadow-lg shadow-primary/20"
                        style={{ backgroundImage: `url('${artistAvatar}')` }}
                    >
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-[#121212]">
                        <span className="material-symbols-outlined text-white text-[14px] font-bold block">check</span>
                    </div>
                </div>
                <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                        <Link to={`/artist/${artistId}`} className="hover:underline hover:text-primary transition-colors">
                            <h3 className="text-2xl font-bold text-white">{artistName}</h3>
                        </Link>
                        <span className="hidden sm:block text-white/20">•</span>
                        <div className="flex items-center gap-1 text-yellow-400 justify-center sm:justify-start">
                            <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                            <span className="text-sm font-bold text-white">4.9/5</span>
                        </div>
                    </div>
                    <p className="text-[#ab9cba] text-sm">Specializing in large-scale murals and abstract expressionism. Turning walls into windows since 2015.</p>
                    <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                        <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                            <span className="material-symbols-outlined text-primary text-[16px]">bolt</span>
                            <span className="text-xs font-bold text-primary tracking-wide">Response Time: &lt; 24 hrs</span>
                        </div>
                        {artistId && (
                            <Link
                                to={`/artist/${artistId}`}
                                className="inline-flex items-center gap-1 bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/10 transition-colors"
                            >
                                <span className="text-xs font-bold text-white tracking-wide">View Profile</span>
                                <span className="material-symbols-outlined text-[14px] text-white">arrow_forward</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Portfolio Grid - Mock Data for now */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Recent Works</h3>
                    <a className="text-primary text-sm font-medium hover:underline flex items-center gap-1" href="#">
                        View Portfolio <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }}></div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                    <div className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }}></div>
                    </div>
                    <div className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }}></div>
                    </div>
                    <div className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }}></div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-bold tracking-wider">+12 More</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceHero;
