
import React from 'react';
import { MapPin, CreditCard, ExternalLink } from 'lucide-react';

const OrderInfoGrid = ({ order }) => {
    const shipping = order.shipping_details || order.shipping_address || {}; // Based on schema
    // Fallback if data structure slightly differs
    const name = shipping.firstName ? `${shipping.firstName} ${shipping.lastName}` : (shipping.fullName || 'User');
    const address = shipping.address || '123 Cyber Lane';
    const cityState = shipping.city && shipping.state ? `${shipping.city}, ${shipping.state} ${shipping.zip || ''}` : 'Neo Tokyo, NT 90210';

    // Tracking Mock
    const trackingNumber = `KV-${order.id.slice(0, 8).toUpperCase()}`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Shipping Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#1e1e1e]/40">
                <div className="flex items-center gap-2 mb-4 text-primary">
                    <MapPin size={20} />
                    <h3 className="text-white font-bold">Shipped To</h3>
                </div>

                <div className="space-y-1 mb-6">
                    <p className="text-lg font-bold text-white">{name}</p>
                    <p className="text-gray-400 text-sm">{address}</p>
                    <p className="text-gray-400 text-sm">{cityState}</p>
                    <p className="text-gray-400 text-sm">{shipping.country || 'United Territories'}</p>
                </div>

                <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Tracking Number</p>
                    <div className="flex justify-between items-center">
                        <p className="text-white font-mono">{trackingNumber}</p>
                        <a href="#" className="flex items-center gap-1 text-primary hover:text-primary-dark text-xs font-bold transition-colors">
                            Track with FedEx <ExternalLink size={10} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Payment Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#1e1e1e]/40">
                <div className="flex items-center gap-2 mb-4 text-purple-400">
                    <CreditCard size={20} />
                    <h3 className="text-white font-bold">Payment Method</h3>
                </div>

                <div className="flex items-center gap-4 mb-6 bg-[#121212] p-4 rounded-xl border border-white/5">
                    <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                        <img src="https://cdn.simpleicons.org/visa/white" alt="Visa" className="h-4 opacity-80" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">Visa ending in 4242</p>
                        <p className="text-xs text-gray-400">Expires 12/28</p>
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Billing Address</p>
                    <p className="text-gray-400 text-sm">Same as shipping address</p>
                </div>
            </div>
        </div>
    );
};

export default OrderInfoGrid;
