
import React from 'react';

const PaymentStep = ({ onBack, onPayWithRazorpay, loading, total }) => {
    return (
        <div className="space-y-6">
            {/* Razorpay Info */}
            <div className="bg-[#1E1E24] border border-white/5 rounded-lg p-4 mb-6">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                    Pay with Razorpay
                </h4>
                <p className="text-sm text-[#a1a1aa]">
                    Secured by Razorpay. Cards, UPI, Netbanking & more.
                </p>
            </div>

            {/* Razorpay Brand */}
            <div className="flex items-center justify-center gap-2 py-4 text-[#a1a1aa] text-xs">
                <span>Powered by Razorpay</span>
            </div>

            <div className="pt-6 flex gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 bg-[#1E1E24] border border-white/10 hover:bg-white/5 text-white font-bold py-3.5 rounded-xl transition-all"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={onPayWithRazorpay}
                    disabled={loading}
                    className="flex-[2] bg-gradient-to-r from-primary to-[#a855f7] hover:from-primary-dark hover:to-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                        <>
                            Pay ₹{total.toFixed(2)}
                            <span className="material-symbols-outlined">lock</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default PaymentStep;
