import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, signOut } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav h-16 shadow-lg' : 'bg-transparent h-20'
                }`}
        >
            <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center gap-3 text-white group">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                            className="size-8 text-primary group-hover:text-accent transition-colors duration-300"
                        >
                            <svg
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M24 4L6 14V34L24 44L42 34V14L24 4Z"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="4"
                                ></path>
                                <path
                                    d="M24 14V34"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="4"
                                ></path>
                                <path
                                    d="M6 14L42 34"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="4"
                                ></path>
                            </svg>
                        </motion.div>
                        <span className="text-xl font-bold tracking-tight">Kalavpp</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {['Market', 'Services', 'About', 'Blog'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Market' ? '/shop' : item === 'Services' ? '/services' : `/${item.toLowerCase()}`}
                                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                            >
                                {item}
                                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    {/* Search Bar */}
                    <div className={`hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 w-64 focus-within:border-primary/50 focus-within:bg-white/10 transition-all ${scrolled ? 'h-9' : 'h-10'}`}>
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">
                            search
                        </span>
                        <input
                            className="bg-transparent border-none text-sm text-white placeholder-gray-500 focus:ring-0 w-full h-full ml-2 outline-none"
                            placeholder="Search..."
                            type="text"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="hidden sm:flex items-center justify-center text-sm font-bold text-white hover:text-primary transition-colors px-4 h-10"
                                >
                                    Dashboard
                                </Link>
                                <Link to="/cart">
                                    <button className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10">
                                        <span className="material-symbols-outlined text-xl">shopping_cart</span>
                                    </button>
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className={`flex items-center justify-center px-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-all border border-white/10 ${scrolled ? 'h-9' : 'h-10'}`}
                                >
                                    Log Out
                                </button>
                                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30">
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/auth"
                                    className="hidden sm:flex items-center justify-center text-sm font-bold text-white hover:text-primary transition-colors px-4 h-10"
                                >
                                    Login
                                </Link>
                                <Link to="/auth?mode=signup">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center justify-center px-6 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(140,37,244,0.3)] hover:shadow-[0_0_25px_rgba(140,37,244,0.5)] ${scrolled ? 'h-9' : 'h-10'}`}
                                    >
                                        Sign Up
                                    </motion.button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
