
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const NotFound = () => {
    return (
        <div className="bg-[#121212] min-h-screen flex flex-col text-white font-display overflow-x-hidden selection:bg-primary selection:text-white">
            <Navbar />

            {/* Main Content */}
            <main className="relative flex-grow flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full px-4 overflow-hidden pt-20">
                {/* Background Giant 404 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                    <h1 className="text-[18rem] md:text-[30rem] font-bold text-white/[0.02] select-none leading-none tracking-tighter">
                        404
                    </h1>
                </div>

                {/* Central Visual & Content */}
                <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">

                    {/* CSS Easel & Canvas Illustration */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-64 h-80 mb-12"
                    >
                        {/* Back Leg */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-80 bg-[#1e1e1e] rounded-full origin-top transform -rotate-6 -z-10"></div>
                        {/* Front Legs */}
                        <div className="absolute bottom-0 left-8 w-2 h-96 bg-neutral-800 rounded-full origin-bottom transform -rotate-12"></div>
                        <div className="absolute bottom-0 right-8 w-2 h-96 bg-neutral-800 rounded-full origin-bottom transform rotate-12"></div>
                        {/* Shelf */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 h-3 bg-neutral-700 rounded shadow-lg"></div>

                        {/* The "Empty" Canvas */}
                        <motion.div
                            animate={{ opacity: [1, 0.9, 1], boxShadow: ['0 0 30px #8c25f4', '0 0 60px #8c25f4', '0 0 30px #8c25f4'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-56 bg-[#0a0a0a] border border-primary/50 rounded-lg flex items-center justify-center"
                        >
                            {/* Glitchy Screen Effect inside canvas */}
                            <div className="w-full h-full rounded-lg overflow-hidden relative opacity-60">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                                <motion.div
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30"
                                ></motion.div>
                                <motion.div
                                    animate={{ x: [-2, 2, -1, 1, 0], y: [1, -1, 0] }}
                                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                                    className="absolute top-1/3 left-0 w-full h-[2px] bg-primary/20"
                                ></motion.div>

                                {/* Icon in center of canvas */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary/80 text-6xl drop-shadow-[0_0_10px_rgba(140,37,244,0.8)]">
                                        broken_image
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Typography */}
                    <div className="text-center space-y-6 max-w-lg mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-xl">
                            Masterpiece Not Found
                        </h2>
                        <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md mx-auto">
                            The page you are looking for has been moved, deleted, or never existed in this dimension.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full justify-center">
                        <Link
                            to="/"
                            className="group relative flex items-center justify-center h-12 px-8 rounded-lg bg-gradient-to-r from-[#8c25f4] to-[#6a1cb5] text-white font-bold tracking-wide overflow-hidden transition-transform active:scale-95 hover:shadow-[0_0_30px_rgba(140,37,244,0.4)]"
                        >
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">home</span>
                                Return to Home
                            </span>
                        </Link>
                        <Link
                            to="/shop"
                            className="glass-panel group flex items-center justify-center h-12 px-8 rounded-lg text-white font-medium tracking-wide transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 border border-white/10"
                        >
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px] text-primary group-hover:text-white transition-colors">storefront</span>
                                Browse Market
                            </span>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFound;
