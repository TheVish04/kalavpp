import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-white/10 pb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full cursor-pointer items-center justify-between text-base font-bold text-white hover:text-primary transition-colors py-2"
            >
                {title}
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="material-symbols-outlined"
                >
                    expand_more
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 pb-2 text-base leading-relaxed text-white/70 font-body">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProductInfo = ({ product, addToCart, buyNow }) => {
    const {
        title,
        price,
        description,
        profiles, // Joined artist data
        dimensions,
        medium,
        weight,
        category
    } = product;

    const artistName = profiles?.full_name || profiles?.username || 'Kalavpp Verified';
    const artistAvatar = profiles?.avatar_url || 'https://via.placeholder.com/150';
    const artistId = profiles?.id;

    return (
        <section className="w-full lg:w-[40%] bg-[#121212] flex flex-col p-6 lg:p-10 xl:p-14 overflow-y-auto relative border-l border-white/5 h-full">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap gap-2 items-center text-sm font-medium mb-8">
                <Link className="text-white/40 hover:text-primary transition-colors" to="/">Home</Link>
                <span className="text-white/20">/</span>
                <Link className="text-white/40 hover:text-primary transition-colors" to="/shop">Marketplace</Link>
                <span className="text-white/20">/</span>
                <Link className="text-white/40 hover:text-primary transition-colors" to={`/shop?category=${category || 'All'}`}>{category || 'Art'}</Link>
            </nav>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                {title} <br />
            </h1>

            {/* Artist Card */}
            <Link to={artistId ? `/artist/${artistId}` : '#'} className="flex items-center justify-between p-4 rounded-2xl bg-[#1E1E1E]/50 border border-white/5 hover:bg-[#1E1E1E] transition-colors cursor-pointer mb-10 group">
                <div className="flex items-center gap-4">
                    <div
                        className="h-12 w-12 rounded-full bg-cover bg-center border border-white/10"
                        style={{ backgroundImage: `url('${artistAvatar}')` }}
                    >
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-lg leading-none mb-1 group-hover:text-primary transition-colors">{artistName}</span>
                        <div className="flex items-center gap-1 text-xs text-white/50 font-medium tracking-wide uppercase">
                            <span className="material-symbols-outlined text-[14px] text-blue-400 filled">verified</span> Verified Artist
                        </div>
                    </div>
                </div>
                <button className="text-white/60 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">person_add</span>
                </button>
            </Link>

            {/* Price Block */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
                <span className="text-5xl lg:text-6xl font-bold text-white tracking-tight">${price?.toFixed(2)}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 text-sm font-semibold text-primary">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Only 1 left
                </span>
            </div>

            {/* Glass Specs Box */}
            <div className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm mb-10 overflow-hidden">
                <div className="p-4 flex flex-col items-center justify-center text-center gap-1">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Dimensions</span>
                    <span className="text-white font-medium">{dimensions || '24" x 36"'}</span>
                </div>
                <div className="p-4 flex flex-col items-center justify-center text-center gap-1">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Medium</span>
                    <span className="text-white font-medium">{medium || 'Oil on Canvas'}</span>
                </div>
                <div className="p-4 flex flex-col items-center justify-center text-center gap-1">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Weight</span>
                    <span className="text-white font-medium">{weight || '2.5 lbs'}</span>
                </div>
            </div>

            {/* Action Stack */}
            <div className="flex flex-col gap-3 mb-10">
                <button
                    onClick={addToCart}
                    className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#7a1bd1] to-primary py-4 px-8 text-lg font-bold text-white transition-all hover:shadow-[0_0_40px_-10px_rgba(140,37,244,0.6)] active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined">shopping_bag</span>
                    Add to Cart
                </button>
                <button
                    onClick={buyNow}
                    className="group flex w-full items-center justify-center gap-3 rounded-full border-2 border-white/10 bg-transparent py-4 px-8 text-lg font-bold text-white transition-all hover:bg-white hover:text-black hover:border-white active:scale-[0.98]"
                >
                    Buy Now
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>
            </div>

            {/* Minimalist Accordions with Framer Motion */}
            <div className="mt-auto space-y-2">
                <AccordionItem title="Description" defaultOpen={true}>
                    <p>{description || 'No description available for this masterpiece.'}</p>
                </AccordionItem>
                <AccordionItem title="Shipping Policy">
                    <p>Ships within 3-5 business days in a custom-built wooden crate to ensure maximum protection. Includes a Certificate of Authenticity signed by the artist.</p>
                    <p className="mt-2 text-sm text-white/50">Free worldwide shipping with insurance included.</p>
                </AccordionItem>
            </div>
        </section>
    );
};

export default ProductInfo;
