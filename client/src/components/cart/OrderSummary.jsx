
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ subtotal }) => {
    const navigate = useNavigate();
    const shipping = 0; // Calculated at next step
    const tax = subtotal * 0.08; // Estimated tax (mock) or 0
    // user requirement says "Calculated at next step" or 0.00
    // I will stick to 0.00 for tax/shipping to match "Calculated at next step" vibe or keep it simple.

    // Actually prompt says: Display "Calculated at next step" or "$0.00" for Tax/Shipping.

    const total = subtotal; // For now excluding tax/shipping until checkout

    return (
        <div className="glass-panel p-6 rounded-2xl bg-[#1e1e1e]/40 border border-white/5 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#a1a1aa] text-sm">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#a1a1aa] text-sm">
                    <span>Shipping</span>
                    <span className="text-white font-medium">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-[#a1a1aa] text-sm">
                    <span>Estimated Tax</span>
                    <span className="text-white font-medium">$0.00</span>
                </div>
            </div>

            <div className="w-full h-px bg-[#302839] mb-6"></div>

            <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
            </div>

            <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-primary to-[#a855f7] hover:from-primary-dark hover:to-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:scale-95 mb-6"
            >
                Proceed to Checkout
            </button>

            {/* Trust Badges */}
            <div className="text-center">
                <p className="text-xs text-[#a1a1aa] flex items-center justify-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    Secure Checkout
                </p>
                <div className="flex justify-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                    <img src="https://cdn.simpleicons.org/visa/white" alt="Visa" className="h-5" />
                    <img src="https://cdn.simpleicons.org/mastercard/white" alt="Mastercard" className="h-5" />
                    <img src="https://cdn.simpleicons.org/paypal/white" alt="PayPal" className="h-5" />
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
