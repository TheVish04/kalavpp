
import React from 'react';
import { useCart } from '../../context/CartContext';

const CheckoutSummary = () => {
    const { cart, cartTotal } = useCart();

    // Calculations
    const taxRate = 0.08;
    const tax = cartTotal * taxRate;
    const shipping = cartTotal > 500 || cartTotal === 0 ? 0 : 20.00;
    const total = cartTotal + tax + shipping;

    return (
        <div className="glass-panel p-6 rounded-2xl bg-[#1e1e1e]/40 border border-white/5 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

            {/* Scrollable Item List */}
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start">
                        <div className="w-16 h-16 rounded-lg bg-[#121212] overflow-hidden flex-shrink-0 border border-white/5">
                            <img
                                src={item.image_url || item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                            <p className="text-xs text-[#a1a1aa] truncate">@{item.profiles?.full_name || 'Artist'}</p>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-[#a1a1aa]">Qty: {item.quantity}</span>
                                <span className="text-sm font-medium text-white">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full h-px bg-[#302839] mb-6"></div>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#a1a1aa] text-sm">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${cartTotal.toFixed(2)}</span>
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

            <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[#a1a1aa] text-xs">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>Encrypted & Secure</span>
            </div>
        </div>
    );
};

export default CheckoutSummary;
