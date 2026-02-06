
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ subtotal }) => {
    const navigate = useNavigate();

    // Dynamic Calculations
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const shipping = subtotal > 500 || subtotal === 0 ? 0 : 20.00;
    const total = subtotal + tax + shipping;

    const isCartEmpty = subtotal === 0;

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
                    <span className={shipping === 0 ? "text-green-400 font-bold" : "text-white font-medium"}>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between text-[#a1a1aa] text-sm">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-white font-medium">${tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="w-full h-px bg-[#302839] mb-6"></div>

            <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
            </div>

            <button
                onClick={() => navigate('/checkout')}
                disabled={isCartEmpty}
                className={`w-full font-bold py-3.5 rounded-xl shadow-lg transition-all transform mb-6 ${isCartEmpty
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary to-[#a855f7] hover:from-primary-dark hover:to-primary text-white shadow-primary/25 hover:-translate-y-0.5 active:scale-95'
                    }`}
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
