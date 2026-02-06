import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Key, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:5173/update-password',
            });

            if (error) throw error;
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-display bg-[#121212] text-white min-h-screen flex flex-col overflow-hidden relative selection:bg-[#8c25f4] selection:text-white">
            {/* Top Navigation */}
            <header className="absolute top-0 w-full z-20 flex items-center justify-between px-8 py-6">
                <div className="flex items-center gap-3">
                    {/* Kalavpp Logo Icon */}
                    <div className="size-8 text-[#8c25f4]">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                            <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <span className="text-white text-xl font-bold tracking-tight">Kalavpp</span>
                </div>
            </header>

            {/* Background Vignette Effect */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(140,37,244,0.15)_0%,rgba(18,18,18,0)_60%)] pointer-events-none"></div>

            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center relative z-10 px-4 py-10">
                {/* Glassmorphic Card */}
                <div
                    className="w-full max-w-[480px] rounded-[32px] p-8 md:p-12 flex flex-col items-center text-center shadow-[0_0_50px_-12px_rgba(140,37,244,0.5)]"
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <AnimatePresence mode="wait">
                        {!success ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full flex flex-col items-center"
                            >
                                {/* Glowing Key Icon */}
                                <div className="mb-8 rounded-full p-4 bg-[#FFB84C]/10 shadow-[0_0_30px_-5px_rgba(255,184,76,0.4)]">
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <Key className="w-12 h-12 text-[#FFB84C]" />
                                    </motion.div>
                                </div>

                                {/* Headlines */}
                                <h1 className="text-white text-3xl font-bold mb-4 tracking-tight">Forgot Password?</h1>
                                <p className="text-slate-300 text-base font-medium leading-relaxed mb-10 max-w-[320px]">
                                    Don't worry, it happens. Please enter the email address associated with your account.
                                </p>

                                {/* Form */}
                                <form className="w-full flex flex-col gap-8 mb-8" onSubmit={handleReset}>
                                    {error && (
                                        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            {error}
                                        </div>
                                    )}
                                    <div className="group relative">
                                        <label htmlFor="email" className="sr-only">Email Address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="block w-full px-0 py-3 text-lg text-white bg-transparent border-0 border-b border-white/30 appearance-none focus:outline-none focus:ring-0 peer transition-colors placeholder:text-slate-500"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[#8c25f4] scale-x-0 transition-transform duration-300 peer-focus:scale-x-100 origin-left"></div>
                                    </div>

                                    {/* Primary CTA Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative w-full h-14 rounded-full bg-gradient-to-r from-[#8c25f4] to-[#a74bf9] text-white font-bold text-lg shadow-lg hover:shadow-[#8c25f4]/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10">{loading ? 'Sending...' : 'Send Reset Link'}</span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-full flex flex-col items-center"
                            >
                                <div className="mb-8 rounded-full p-4 bg-green-500/10 shadow-[0_0_30px_-5px_rgba(34,197,94,0.4)]">
                                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                                </div>
                                <h1 className="text-white text-3xl font-bold mb-4 tracking-tight">Check your email</h1>
                                <p className="text-slate-300 text-base font-medium leading-relaxed mb-10 max-w-[320px]">
                                    We've sent a password reset link to <br /> <span className="text-white font-semibold">{email}</span>.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Back to Login Link */}
                    <Link to="/auth" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium group mt-2">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        Back to Login
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="absolute bottom-6 w-full text-center z-10">
                <p className="text-slate-600 text-xs">© 2024 Kalavpp Inc. Secure ArtCommerce.</p>
            </footer>
        </div>
    );
};

export default ForgotPassword;
