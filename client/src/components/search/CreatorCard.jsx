
import React from 'react';

const CreatorCard = ({ creator }) => {
    // Fallback data if some fields are missing
    const name = creator?.full_name || creator?.username || 'Unknown Artist';
    const profession = creator?.profession || 'Artist';
    const followers = creator?.followers_count || 0;
    const avatar = creator?.avatar_url || 'https://via.placeholder.com/150';
    const isVerified = creator?.is_verified || false;

    return (
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
                <div className="size-24 rounded-full p-1 bg-gradient-to-tr from-primary to-blue-500">
                    <img
                        alt={`Portrait of ${name}`}
                        className="w-full h-full object-cover rounded-full border-2 border-[#121212]"
                        src={avatar}
                    />
                </div>
                {isVerified && (
                    <div className="absolute bottom-0 right-0 bg-black rounded-full text-primary">
                        <span className="material-symbols-outlined text-[24px]">verified</span>
                    </div>
                )}
            </div>
            <div>
                <h3 className="font-bold text-xl text-white">{name}</h3>
                <p className="text-sm text-gray-400 mt-1">{profession} • {followers.toLocaleString()} Followers</p>
            </div>
            <div className="flex gap-2 w-full mt-2">
                <button className="flex-1 bg-white text-black font-bold py-2 rounded-full text-sm hover:bg-gray-200 transition-colors">Follow</button>
                <button className="size-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                </button>
            </div>
        </div>
    );
};

export default CreatorCard;
