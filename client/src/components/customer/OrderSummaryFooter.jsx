
import React from 'react';
import { supabase } from '../../lib/supabase';

const OrderSummaryFooter = ({ order }) => {
    // Items
    const items = order.order_items || [];

    // Totals logic
    // Usually order.total_amount is the final.
    // We can reverse calc subtotal if needed or sum items.
    const itemTotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const tax = itemTotal * 0.08;
    // Difference is shipping roughly
    const difference = (order.total_amount || 0) - itemTotal - tax;
    const shipping = difference > 0 ? difference : 0;

    // Or prefer stored total
    const grandTotal = order.total_amount || 0;

    return (
        <div className="glass-panel rounded-2xl border border-white/5 bg-[#1e1e1e]/40 overflow-hidden">
            {/* Header */}
            <div className="bg-[#1e1e1e]/60 px-6 py-4 flex items-center gap-2 border-b border-white/5">
                <span className="material-symbols-outlined text-primary text-sm">shopping_bag</span>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Order Items</h3>
            </div>

            {/* Table */}
            <div className="p-6">
                <div className="space-y-6 mb-8">
                    {items.map((item, index) => {
                        const product = item.products || item.product || {};
                        const imgPath = product.image_url || product.thumbnail || product.image;
                        const src = imgPath?.startsWith('http')
                            ? imgPath
                            : imgPath ? supabase.storage.from('products').getPublicUrl(imgPath).data.publicUrl : 'https://via.placeholder.com/80';

                        return (
                            <div key={item.id || index} className="flex items-center gap-4 sm:gap-6">
                                <div className="w-16 h-16 rounded-lg bg-[#121212] flex-shrink-0 border border-white/10 overflow-hidden">
                                    <img src={src} alt={product.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-bold text-sm sm:text-base truncate mb-1">{product.title || 'Product'}</h4>
                                    <p className="text-gray-500 text-xs sm:text-sm">ID: KV-LITE-{item.product_id?.slice(0, 4).toUpperCase()}</p>
                                    <p className="text-gray-500 text-xs sm:text-sm sm:hidden mt-1">Qty: {item.quantity || 1}</p>
                                </div>
                                <div className="hidden sm:block text-center w-20">
                                    <p className="text-gray-400 text-sm font-medium">{item.quantity || 1}</p>
                                </div>
                                <div className="text-right w-24">
                                    <p className="text-white font-bold">${item.price?.toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Totals Section */}
                <div className="border-t border-white/5 pt-6 flex flex-col items-end gap-3">
                    <div className="w-full sm:w-64 flex justify-between text-sm">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="text-white font-medium">${itemTotal.toFixed(2)}</span>
                    </div>
                    <div className="w-full sm:w-64 flex justify-between text-sm">
                        <span className="text-gray-400">Shipping (Standard)</span>
                        <span className="text-white font-medium">${shipping > 0 ? shipping.toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="w-full sm:w-64 flex justify-between text-sm">
                        <span className="text-gray-400">Tax</span>
                        <span className="text-white font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="w-full sm:w-64 h-px bg-white/10 my-1"></div>
                    <div className="w-full sm:w-64 flex justify-between items-baseline">
                        <span className="text-white font-bold text-lg">Grand Total</span>
                        <span className="text-primary font-black text-2xl">${grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummaryFooter;
