import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-nav transition-all duration-300">
            <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center gap-3 text-white group">
                        <div className="size-8 text-primary group-hover:text-accent transition-colors duration-300">
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
                        </div>
                        <span className="text-xl font-bold tracking-tight">Kalavpp</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link
                            to="/shop"
                            className="text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all"
                        >
                            Market
                        </Link>
                        <Link
                            to="/services"
                            className="text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all"
                        >
                            Commissions
                        </Link>
                        <Link
                            to="/about"
                            className="text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all"
                        >
                            About
                        </Link>
                        <Link
                            to="/blog"
                            className="text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all"
                        >
                            Blog
                        </Link>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full h-10 px-4 w-64 focus-within:border-primary/50 focus-within:bg-white/10 transition-all">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">
                            search
                        </span>
                        <input
                            className="bg-transparent border-none text-sm text-white placeholder-gray-500 focus:ring-0 w-full h-full ml-2 outline-none"
                            placeholder="Search creators, assets..."
                            type="text"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/auth"
                            className="hidden sm:flex items-center justify-center text-sm font-bold text-white hover:text-primary transition-colors px-4 h-10"
                        >
                            Login
                        </Link>
                        <Link
                            to="/auth?mode=signup"
                            className="flex items-center justify-center h-10 px-6 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(140,37,244,0.3)] hover:shadow-[0_0_25px_rgba(140,37,244,0.5)]"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
