
import React, { useState } from 'react';

const ProductGallery = ({ mainImage, thumbnails = [], video }) => {
    // If no thumbnails provided, create a fallback array including the main image
    const effectiveThumbnails = thumbnails.length > 0
        ? thumbnails
        : [mainImage, mainImage, mainImage].filter(Boolean); // Fallback to replicate main image for UI completeness if missing

    // Ensure we have at least one image to show
    const displayImage = mainImage || 'https://via.placeholder.com/800x600?text=No+Image';

    const [activeImage, setActiveImage] = useState(displayImage);

    return (
        <section className="w-full lg:w-[60%] relative h-[60vh] lg:h-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden group">
            {/* Main Artwork */}
            <div className="relative w-full h-full p-4 lg:p-12 flex items-center justify-center">
                <img
                    alt="Main Artwork"
                    className="w-full h-full object-contain drop-shadow-2xl shadow-primary/20 transition-transform duration-700 group-hover:scale-[1.02]"
                    src={activeImage}
                />
            </div>

            {/* Floating Glassmorphic Thumbnail Strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 p-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg z-10 max-w-[90%] overflow-x-auto no-scrollbar">
                {effectiveThumbnails.map((thumb, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(thumb)}
                        className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${activeImage === thumb ? 'border-primary ring-2 ring-primary/30' : 'border-transparent hover:border-white/50 opacity-70 hover:opacity-100'}`}
                    >
                        <img
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            src={thumb}
                        />
                    </button>
                ))}

                {video && (
                    <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                        <span className="material-symbols-outlined text-xl">play_arrow</span>
                    </button>
                )}
            </div>

            {/* Ambient Glow Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-40 pointer-events-none"></div>
        </section>
    );
};

export default ProductGallery;
