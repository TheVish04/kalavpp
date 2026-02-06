import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[#0a0a0a] pt-16 pb-8">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-white mb-6">
                            <div className="size-6 text-primary">
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
                                </svg>
                            </div>
                            <span className="text-lg font-bold">Kalavpp</span>
                        </Link>
                        <p className="text-gray-500 text-sm mb-6">
                            Empowering creators and collectors in the digital renaissance.
                        </p>
                        <div className="flex gap-4">
                            <span className="text-gray-400 cursor-pointer hover:text-white text-sm font-medium">
                                Twitter
                            </span>
                            <span className="text-gray-400 cursor-pointer hover:text-white text-sm font-medium">
                                Instagram
                            </span>
                            <span className="text-gray-400 cursor-pointer hover:text-white text-sm font-medium">
                                Discord
                            </span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Marketplace</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link to="/shop?sort=trending" className="hover:text-primary transition-colors">
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shop?category=physical"
                                    className="hover:text-primary transition-colors"
                                >
                                    Physical Art
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shop?category=digital"
                                    className="hover:text-primary transition-colors"
                                >
                                    Digital Assets
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shop?category=photography"
                                    className="hover:text-primary transition-colors"
                                >
                                    Photography
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link to="/services" className="hover:text-primary transition-colors">
                                    Commissions
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:text-primary transition-colors">
                                    Artist Hire
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:text-primary transition-colors">
                                    Bulk Licensing
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Stay Updated</h4>
                        <p className="text-gray-500 text-sm mb-4">
                            Join our newsletter for weekly drops.
                        </p>
                        <div className="flex">
                            <input
                                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm text-white w-full focus:ring-0 focus:border-primary outline-none"
                                placeholder="Email address"
                                type="email"
                            />
                            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-lg text-sm font-bold transition-colors">
                                <span className="material-symbols-outlined text-[20px]">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>© 2024 Kalavpp Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-gray-400">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="hover:text-gray-400">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
