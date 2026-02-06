import { useState } from 'react';
import { motion } from 'framer-motion';

const CreatorCard = ({ creator }) => {
    const [following, setFollowing] = useState(false);

    return (
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
                <div className="size-24 rounded-full p-1 bg-gradient-to-tr from-primary to-blue-500">
                    <img
                        alt={creator.full_name || "Creator"}
                        className="w-full h-full object-cover rounded-full border-2 border-[#121212]"
                        src={creator.avatar_url || "https://via.placeholder.com/150"}
                    />
                </div>
                <div className="absolute bottom-0 right-0 bg-black rounded-full text-primary">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-xl text-white">{creator.full_name || "Anonymous Artist"}</h3>
                <p className="text-sm text-gray-400 mt-1">{creator.specialty || "Digital Artist"} • {creator.followers_count || Math.floor(Math.random() * 10000)} Followers</p>
            </div>
            <div className="flex gap-2 w-full mt-2">
                <button
                    onClick={(e) => { e.stopPropagation(); setFollowing(!following); }}
                    className={`flex-1 font-bold py-2 rounded-full text-sm transition-colors ${following ? 'bg-transparent border border-white/20 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                    {following ? 'Following' : 'Follow'}
                </button>
                <button className="size-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                </button>
            </div>
        </div>
    );
};

export default CreatorCard;
