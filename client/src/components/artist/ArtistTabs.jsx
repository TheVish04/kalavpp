
import React from 'react';

const ArtistTabs = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'shop', label: 'Shop' },
        { id: 'services', label: 'Services' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'about', label: 'About' },
    ];

    return (
        <div className="sticky top-[80px] z-40 bg-[#121212]/95 backdrop-blur border-b border-[#302839] mb-8">
            <div className="flex gap-8 overflow-x-auto no-scrollbar px-1">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative pb-3 pt-3 text-sm font-bold transition-colors ${activeTab === tab.id ? 'text-white' : 'text-[#a1a1aa] hover:text-white'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-t-full"></span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ArtistTabs;
