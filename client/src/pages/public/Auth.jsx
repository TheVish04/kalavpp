import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

const Auth = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // State
    const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
    const [role, setRole] = useState('customer'); // 'customer' or 'vendor'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Toggle Mode
    const toggleMode = (newMode) => {
        setMode(newMode);
        setError(null);
    };


    // Mock Login Helper
    const fillMock = (mockEmail, mockPassword) => {
        setEmail(mockEmail);
        setPassword(mockPassword);
    };

    // Handle Authentication
    const handleAuth = async (e) => {
        e.preventDefault();
        console.log('handleAuth triggered', { mode, email: email.trim() }); // Debugging

        if (loading) return; // Prevent double submission
        setLoading(true);
        setError(null);

        // DEV: Mock Login Bypass
        const MOCK_BYPASS = {
            'customer@gmail.com': { role: 'customer', path: '/shop' },
            'creator@gmail.com': { role: 'vendor', path: '/vendor/dashboard' },
            'admin@gmail.com': { role: 'admin', path: '/shop' } // Defaulting admin to shop for now
        };

        if (mode === 'login' && MOCK_BYPASS[email.trim()]) {
            console.log('Using Mock Login Bypass');
            setTimeout(() => {
                navigate(MOCK_BYPASS[email.trim()].path);
                setLoading(false);
            }, 500); // Fake delay
            return;
        }

        try {
            if (mode === 'signup') {
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                const { data, error } = await supabase.auth.signUp({
                    email: email.trim(),
                    password,
                    options: {
                        data: { role: role },
                        emailRedirectTo: `${window.location.origin}/auth`, // Explicit redirect to prevent issues
                    },
                });
                if (error) throw error;
                // Check if session exists (auto-confirm enabled?) or alert user to check email
                if (data.session) {
                    navigate(role === 'vendor' ? '/vendor/dashboard' : '/shop');
                } else {
                    alert('Check your email for the confirmation link!');
                }

            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password,
                });
                if (error) throw error;

                // Redirect based on role
                // In a real app, you might fetch the user profile to confirm role
                // For now, we trust the metadata or default to shop
                const userRole = data.user?.user_metadata?.role || 'customer';
                navigate(userRole === 'vendor' ? '/vendor/dashboard' : '/shop');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden">
            {/* Left Side: Immersive Visual */}
            <div
                className="relative hidden lg:flex lg:w-1/2 h-full bg-cover bg-center items-end p-12 overflow-hidden group"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuALEUIjQ22gxUgESIV7kGKG34yb6wiY6RZ8tZUxj1kDq9ZDF5Com0iQihRPfFrxy4_Mlr1w0rV6UMIJSXsH5vWOziI7F5smb4dVyYXtyBY7FyYh1hH5O9elSJwGoNa8ijWlEPVfhP-zba4HgKSGMNDVuFBBMFi76pZj4DewsJi7bUmOtRXibowlJx87yLU095aANC2HlBIdWSM-WMlv0EBKcwRbzJKB3m3934W-xbnCowT8URdwqDQOUbvJWPJy9U0_fd-TwjmfZ3Q')",
                }}
            >
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 max-w-lg mb-8"
                >
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                        <span className="material-symbols-outlined text-2xl">palette</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
                        Join the{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-200">
                            Renaissance.
                        </span>
                    </h1>
                    <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-md">
                        Buy, Sell, and Commission exclusive digital and physical art in the
                        world's first premium creative marketplace.
                    </p>

                    <div className="flex gap-4 mt-8">
                        <div className="flex -space-x-3 rtl:space-x-reverse">
                            {[
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuDFgcDLPKSuBF-9CGcN7EFTu7uNISRTdoHTjt-lEL1cWU4cl2dfMtc344Q-rwSlywO0VgEcyeUNR5n4KF-Z0Tqj4M6RhEgDMM_m9DTYTujb8F2oxAirBOBA5B2zAveyL1lH4S_Kq5D_A8dnqvTX1UE7sbi79J0xnEAy_VCrBB_yMkAGRmBPwP_8DfUUcBFB5zgavqlTSvRQGHyp6hzXb2CqUj3oe8YsyV4aS8FYqX9BQlkHTOOAE751dDc8UVT_1CvMpWRwNtdVoqs',
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuAQrLBu9yZXNk2q3rJdok8f6A4wzZENKHAJ4csECbAfVqFgyEdBw19vIg6HxnsR19lPYjeCT9kJq7WyFZXAWJEh0yZU29XtwVM3m_OHYlsSE1a7MNfcyMHLxv80Pbg7-PI5CAxQsACRzdFMUptlZdzY_-WU9KCOeryqaGeAustErmWtbsaveaRX_GjFK8DW3UMUDXGRZQn-a2w_UL8nqzhIDdAAUlBEc0Ve9VP8-VK8hf_42qrpQV9jG9zZ2tplKsTASFTJSCAOVhw',
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuBMU1xQG9zaEuCqBWONNZwJmlnPFav5mtPftk2fSt7ccynVQ2LpG6L4U9oZCoDbvNbkOinpbKbK0byPang5O6U0MvzTZFN3sqRUFVbWKy7oooIrCUQ0z1BOfKZhOMiPy9HdAU3eD9epRp3auPdE0ZaBi78xyIJgzQ12Dbl1x2gzBi7knnJdxcscRBAWmt_pbkOSl447EsSZczhDnyZcUSF2f_okKLtXsCkTKrZ5gqge0jH-RmS5xeUI1jHzwygANKMosDq0prUycts',
                            ].map((src, i) => (
                                <img
                                    key={i}
                                    alt={`User avatar ${i + 1}`}
                                    className="w-10 h-10 border-2 border-black rounded-full object-cover"
                                    src={src}
                                />
                            ))}
                            <a
                                className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-800 border-2 border-black rounded-full hover:bg-gray-700"
                                href="#"
                            >
                                +99
                            </a>
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-white text-sm font-bold">
                                Creators joined today
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side: Functional Form */}
            <div className="flex-1 relative bg-[#121212] lg:bg-transparent h-full overflow-y-auto custom-scrollbar">
                {/* Mobile Background Image */}
                <div
                    className="absolute inset-0 z-0 lg:hidden opacity-20 bg-cover bg-center h-full"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCL97Bo9YEo2d6utAnkQo127cdySXWN60MEMxdnYEZCzySQtQOOSZ5bSxCVa6xWzXC5yrUxiniFna7bb6x5AhvvVzfzsRR8Fc5JKCcLcH7tzlLGNNkDfe4dieUXK2sADT75AzFab9f-EyqS4gsb74Sm0Qamism88PMQHjmd6QEEHNkAFVpW5p-Yu305Bmkl9vIL78ukJGoaoS2CfWCio2d7kklU_vUTUV7_ELc3Zs4mmTwiQrYKjXEgNjren365CH7pvp2V_6wIqig')",
                    }}
                ></div>

                <div className="min-h-full w-full flex flex-col justify-center items-center p-6 lg:p-12 relative z-10">
                    <div className="w-full max-w-md flex flex-col">
                        {/* Logo & Header */}
                        <div className="mb-8 text-center lg:text-left">
                            <div
                                className="flex items-center justify-center lg:justify-start gap-2 mb-6 cursor-pointer"
                                onClick={() => navigate('/')}
                            >
                                <span className="material-symbols-outlined text-primary text-3xl">
                                    diamond
                                </span>
                                <span className="text-2xl font-bold text-white tracking-wide">
                                    Kalavpp
                                </span>
                            </div>

                            {/* Toggle Switch */}
                            <div className="bg-[#1e1e1e] p-1.5 rounded-full inline-flex w-full mb-8 relative border border-[#333]">
                                <div
                                    className={`absolute top-1.5 bottom-1.5 rounded-full bg-[#121212] transition-all duration-300 w-[calc(50%-6px)] ${mode === 'login' ? 'left-1.5' : 'left-[calc(50%+3px)]'
                                        } shadow-md`}
                                ></div>
                                <button
                                    onClick={() => toggleMode('login')}
                                    className={`flex-1 relative z-10 py-2.5 px-6 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'login' ? 'text-white' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => toggleMode('signup')}
                                    className={`flex-1 relative z-10 py-2.5 px-6 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'signup'
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mode}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        {mode === 'login'
                                            ? 'Enter your details to access your creative dashboard.'
                                            : 'Join the community of creators and collectors.'}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Role Selector (Sign Up Only) */}
                        <AnimatePresence>
                            {mode === 'signup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="grid grid-cols-2 gap-4 mb-8 overflow-hidden"
                                >
                                    <div
                                        onClick={() => setRole('customer')}
                                        className={`cursor-pointer glass-panel rounded-2xl p-4 transition-all duration-300 border flex flex-col items-center text-center h-full hover:scale-105 ${role === 'customer'
                                            ? 'border-primary bg-primary/10'
                                            : 'border-transparent hover:border-gray-700'
                                            }`}
                                    >
                                        <div
                                            className={`size-10 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${role === 'customer'
                                                ? 'bg-primary text-white'
                                                : 'bg-[#2a2a2a] text-gray-400'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                shopping_bag
                                            </span>
                                        </div>
                                        <span className="text-white font-semibold text-sm">
                                            I am a Customer
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">Browse & Buy Art</span>
                                    </div>

                                    <div
                                        onClick={() => setRole('vendor')}
                                        className={`cursor-pointer glass-panel rounded-2xl p-4 transition-all duration-300 border flex flex-col items-center text-center h-full hover:scale-105 ${role === 'vendor'
                                            ? 'border-primary bg-primary/10'
                                            : 'border-transparent hover:border-gray-700'
                                            }`}
                                    >
                                        <div
                                            className={`size-10 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${role === 'vendor'
                                                ? 'bg-primary text-white'
                                                : 'bg-[#2a2a2a] text-gray-400'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-xl">brush</span>
                                        </div>
                                        <span className="text-white font-semibold text-sm">
                                            I am a Creator
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">
                                            Sell & Commission
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form Fields */}
                        <form onSubmit={handleAuth} className="flex flex-col gap-5">
                            {error && (
                                <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    {error}
                                </div>
                            )}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <input
                                    className="w-full bg-[#1e1e1e]/50 border border-[#333] text-white text-sm rounded-full focus:ring-1 focus:ring-primary focus:border-primary block pl-12 p-4 placeholder-gray-500 transition-all outline-none"
                                    placeholder="Email Address"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined">lock</span>
                                </div>
                                <input
                                    className="w-full bg-[#1e1e1e]/50 border border-[#333] text-white text-sm rounded-full focus:ring-1 focus:ring-primary focus:border-primary block pl-12 pr-12 p-4 placeholder-gray-500 transition-all outline-none"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>

                            <AnimatePresence>
                                {mode === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="relative group overflow-hidden"
                                    >
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                                            <span className="material-symbols-outlined">lock_reset</span>
                                        </div>
                                        <input
                                            className="w-full bg-[#1e1e1e]/50 border border-[#333] text-white text-sm rounded-full focus:ring-1 focus:ring-primary focus:border-primary block pl-12 p-4 placeholder-gray-500 transition-all outline-none"
                                            placeholder="Confirm Password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {mode === 'login' && (
                                <div className="flex justify-end">
                                    <a
                                        className="text-xs text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                        onClick={() => navigate('/forgot-password')}
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-secondary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-full shadow-[0_0_20px_rgba(140,37,244,0.3)] hover:shadow-[0_0_30px_rgba(140,37,244,0.5)] transition-all duration-300 transform mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : mode === 'login' ? 'Continue to Gallery' : 'Create Account'}
                            </motion.button>
                        </form>

                        {/* Mock Login Buttons (Dev Helper) */}
                        <div className="mt-8">
                            <div className="text-xs text-center text-gray-500 mb-2 font-bold uppercase tracking-wider">Mock Logins (Bypass Auth)</div>
                            <div className="flex gap-2 justify-center">
                                <button type="button" onClick={() => fillMock('customer@gmail.com', '12345678')} className="text-[10px] bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1 rounded border border-white/10">Customer</button>
                                <button type="button" onClick={() => fillMock('creator@gmail.com', '12345678')} className="text-[10px] bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1 rounded border border-white/10">Creator</button>
                                <button type="button" onClick={() => fillMock('admin@gmail.com', '12345678')} className="text-[10px] bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1 rounded border border-white/10">Admin</button>
                            </div>
                        </div>




                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#333]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-[#121212] text-gray-500">
                                    Or connect with
                                </span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="flex justify-center gap-4">
                            {['Google', 'Apple', 'Wallet Connect'].map((provider, i) => (
                                <button
                                    key={provider}
                                    className="glass-panel w-14 h-14 rounded-full flex items-center justify-center hover:bg-white/5 transition-all duration-300 group relative"
                                >
                                    {i === 0 && (
                                        <img className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7zSdoN58L9KuCpKfOf_tEbBcKNK8tjOzcf_lwAqT1HK5HI8qD5Xz5nRQf9fVcbkOcZL3sOnHw_998esEAvA3ectmWIaUcYodkS3xV0AxqUomD_aNpd3r4zML-T5-8WOI_6BpHH4YVnBlQfmE4Ctx1l2SLrjfb4o567R-naXDp8lbgHpfrpIFxwOO0kfqxVa8ikdjWcOw89fN4MrfY77Ifhu3xgMMIjLrpwfYmmleXfHVn0wdyzTysw9Jp9PlvgQhhrozuWEK_D5A" alt="Google" />
                                    )}
                                    {i === 1 && (
                                        <span className="material-symbols-outlined text-2xl text-white">
                                            ios
                                        </span>
                                    )}
                                    {i === 2 && (
                                        <span className="material-symbols-outlined text-2xl text-primary">
                                            account_balance_wallet
                                        </span>
                                    )}
                                    <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs text-gray-400 transition-opacity w-24 text-center pointer-events-none">
                                        {provider}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-center">
                            <p className="text-xs text-gray-600">
                                By continuing, you agree to Kalavpp's{' '}
                                <a
                                    className="text-gray-400 hover:text-white underline decoration-1 underline-offset-2"
                                    href="#"
                                >
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a
                                    className="text-gray-400 hover:text-white underline decoration-1 underline-offset-2"
                                    href="#"
                                >
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
