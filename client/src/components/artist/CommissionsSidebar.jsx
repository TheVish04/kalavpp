
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommissionsSidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Commission Card */}
            <div className="glass-panel sticky top-24 rounded-xl p-6 border border-primary/30 relative overflow-hidden bg-[#1e1e1e]/40 backdrop-blur-md">
                {/* Decorative glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                        <span className="material-symbols-outlined">palette</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">Open for Commissions</h3>
                </div>

                <p className="text-sm text-[#a1a1aa] mb-6 leading-relaxed">
                    Want something unique? I create custom cyberpunk portraits and sci-fi landscapes tailored to your vision.
                </p>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-white">Portraits</span>
                        <span className="text-primary font-bold">from $150</span>
                    </div>
                    <div className="w-full h-px bg-[#302839]"></div>
                    <div className="flex justify-between text-sm">
                        <span className="text-white">Full Scene</span>
                        <span className="text-primary font-bold">from $400</span>
                    </div>
                    <div className="w-full h-px bg-[#302839]"></div>
                    <div className="flex justify-between text-sm">
                        <span className="text-white">Turnaround</span>
                        <span className="text-[#a1a1aa]">3-5 Days</span>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/services')}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5"
                >
                    Book a Commission
                </button>
            </div>

            {/* Social Links */}
            <div className="glass-panel rounded-xl p-6 bg-[#1e1e1e]/40 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4">Socials</h3>
                <div className="grid grid-cols-2 gap-3">
                    <a className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#302839] transition-colors text-sm text-[#a1a1aa] hover:text-white" href="#">
                        <img alt="Twitter" className="w-4 h-4 opacity-70" src="https://cdn.simpleicons.org/twitter/white" /> Twitter
                    </a>
                    <a className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#302839] transition-colors text-sm text-[#a1a1aa] hover:text-white" href="#">
                        <img alt="Instagram" className="w-4 h-4 opacity-70" src="https://cdn.simpleicons.org/instagram/white" /> Instagram
                    </a>
                    <a className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#302839] transition-colors text-sm text-[#a1a1aa] hover:text-white" href="#">
                        <img alt="ArtStation" className="w-4 h-4 opacity-70" src="https://cdn.simpleicons.org/artstation/white" /> ArtStation
                    </a>
                    <a className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#302839] transition-colors text-sm text-[#a1a1aa] hover:text-white" href="#">
                        <img alt="Discord" className="w-4 h-4 opacity-70" src="https://cdn.simpleicons.org/discord/white" /> Discord
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CommissionsSidebar;
