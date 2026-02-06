
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../context/AuthContext';

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const status = searchParams.get('status') || 'success';
    const orderId = searchParams.get('orderId') || `#KV-${Math.floor(10000 + Math.random() * 90000)}`;

    // Calculate Delivery Date (Today + 5 days)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const formattedDate = deliveryDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const isSuccess = status === 'success';

    return (
        <div className="bg-[#121212] min-h-screen flex flex-col font-display selection:bg-primary selection:text-white overflow-hidden relative">
            {/* Background Glow Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none ${isSuccess ? 'bg-green-500/10' : 'bg-red-500/10'}`}></div>

            <Navbar />

            <main className="flex-grow flex items-center justify-center p-4 z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-[#1e1e1e]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
                >
                    {/* Content */}
                    <div className="flex flex-col items-center text-center">

                        {/* Icon Animation */}
                        <div className="mb-6 relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.1
                                }}
                                className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,0,0,0.5)] ${isSuccess
                                        ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-500/30'
                                        : 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/30'
                                    }`}
                            >
                                {isSuccess ? (
                                    <Check size={48} strokeWidth={3} />
                                ) : (
                                    <X size={48} strokeWidth={3} />
                                )}
                            </motion.div>

                            {/* Pulse rings */}
                            <motion.div
                                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className={`absolute inset-0 rounded-full border-2 ${isSuccess ? 'border-green-500' : 'border-red-500'}`}
                            ></motion.div>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-2">
                            {isSuccess ? 'Payment Successful!' : 'Payment Unsuccessful'}
                        </h1>

                        <p className="text-[#a1a1aa] mb-8 leading-relaxed">
                            {isSuccess
                                ? <>Thank you for your purchase. Your order <span className="text-white font-bold underline decoration-white/30 underline-offset-4">{orderId}</span> has been confirmed.</>
                                : <>We couldn't process your transaction. This might be due to insufficient funds or a connection error.</>
                            }
                        </p>

                        {/* Order Details Box (Only on Success) */}
                        {isSuccess && (
                            <div className="w-full bg-[#121212]/50 rounded-xl p-5 border border-white/5 mb-8 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#a1a1aa]">Confirmation email sent to</span>
                                    <span className="text-white font-medium truncate max-w-[150px]">{user?.email || 'user@email.com'}</span>
                                </div>
                                <div className="w-full h-px bg-white/5"></div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#a1a1aa]">Estimated Delivery</span>
                                    <span className="text-white font-medium">{formattedDate}</span>
                                </div>
                            </div>
                        )}

                        {/* Error Details Box (Only on Failure) */}
                        {!isSuccess && (
                            <div className="w-full bg-[#121212]/50 rounded-xl p-5 border border-red-500/20 mb-8 space-y-3">
                                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                                    <span className="text-[#a1a1aa]">Error Code</span>
                                    <span className="text-red-400 font-mono bg-red-400/10 px-2 py-1 rounded">KV-ERR-402</span>
                                </div>
                                <div className="w-full h-px bg-white/5"></div>
                                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                                    <span className="text-[#a1a1aa]">Transaction ID</span>
                                    <span className="text-white font-mono">7829-X-201</span>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            {isSuccess ? (
                                <>
                                    <Link
                                        to="/orders"
                                        className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        View Order Status
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </Link>
                                    <Link
                                        to="/shop"
                                        className="flex-1 bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center"
                                    >
                                        Continue Shopping
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('/checkout')}
                                        className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        Try Again
                                        <span className="material-symbols-outlined text-[18px]">refresh</span>
                                    </button>
                                    <button
                                        className="flex-1 bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center"
                                    >
                                        Contact Support
                                    </button>
                                </>
                            )}
                        </div>

                        {!isSuccess && (
                            <p className="mt-6 text-xs text-[#a1a1aa] hover:text-white cursor-pointer transition-colors">
                                Visit Help Center for more details
                            </p>
                        )}

                        {isSuccess && (
                            <Link to="/contact" className="mt-6 text-xs text-[#a1a1aa] hover:text-primary transition-colors">
                                Need help? Contact Support
                            </Link>
                        )}

                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default OrderSuccess;
