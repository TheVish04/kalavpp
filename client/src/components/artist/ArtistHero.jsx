
import React from 'react';

const ArtistHero = ({ profile, stats }) => {
    // Determine profile image and banner with fallbacks
    // Use the fetched profile data or default to generic placeholders
    const bannerUrl = profile.avatar_url ? `https://source.unsplash.com/random/1600x900/?cyberpunk,city&sig=${profile.id}` : 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';
    // Using a consistent random image for a user if no banner, but for now fixed placeholder is safer if unsplash source is flaky
    const bannerImage = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80';

    // Check if avatar_url is a full link or a path
    const getAvatar = (path) => {
        if (!path) return 'https://via.placeholder.com/150';
        if (path.startsWith('http')) return path;
        // In a real app we would use supabase storage getPublicUrl here, but for now passing simple URL
        return path;
    };

    const avatarUrl = getAvatar(profile.avatar_url);

    return (
        <div className="relative w-full">
            {/* Banner Image */}
            <div className="h-64 md:h-80 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10"></div>
                <img
                    src={bannerImage}
                    alt="Banner"
                    className="h-full w-full object-cover object-center"
                />
            </div>

            {/* Profile Info Container */}
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-20 -mt-20 md:-mt-24">
                <div className="flex flex-col md:flex-row items-end md:items-end gap-6 pb-6">

                    {/* Avatar */}
                    <div className="relative group">
                        <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-[#121212] bg-[#121212] overflow-hidden shadow-2xl">
                            <img
                                src={avatarUrl}
                                alt={profile.full_name}
                                className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white border-4 border-[#121212]" title="Verified Artist">
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                        </div>
                    </div>

                    {/* Name & Identity */}
                    <div className="flex-1 mb-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                                    {profile.full_name || 'Artist Name'}
                                </h1>
                                <p className="text-[#a1a1aa] text-lg font-medium">@{profile.username || 'username'}</p>
                                <p className="mt-2 text-sm text-[#a1a1aa] max-w-lg">
                                    {profile.bio || "Digital Alchemist fusing cyberpunk aesthetics with renaissance composition. Creating worlds you can buy, one pixel at a time."}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 mt-2 md:mt-0">
                                <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all font-semibold text-sm tracking-wide group">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Follow
                                </button>
                                <button className="border border-white/10 flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold text-sm tracking-wide transition-all hover:bg-white/10 hover:border-primary/50">
                                    <span className="material-symbols-outlined text-[18px]">mail</span>
                                    Contact
                                </button>
                                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#473b54] text-[#a1a1aa] hover:text-white hover:border-white transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="glass-panel mt-2 flex flex-wrap items-center justify-between rounded-xl px-6 py-4 mb-8 bg-[#1e1e1e]/40 border border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-8 md:gap-12">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white">{stats.followers}</span>
                            <span className="text-xs uppercase tracking-wider text-[#a1a1aa]">Followers</span>
                        </div>
                        <div className="h-8 w-px bg-[#473b54]"></div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white">{stats.sales}+</span>
                            <span className="text-xs uppercase tracking-wider text-[#a1a1aa]">Sales</span>
                        </div>
                        <div className="h-8 w-px bg-[#473b54]"></div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white flex items-center gap-1">
                                {stats.rating} <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">star</span>
                            </span>
                            <span className="text-xs uppercase tracking-wider text-[#a1a1aa]">Rating</span>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-sm text-[#a1a1aa]">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Tokyo, JP</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_month</span> Joined 2021</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistHero;
