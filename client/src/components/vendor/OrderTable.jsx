
import React from 'react';
import { Truck, Package, Eye, MapPin, Calendar, CheckCircle } from 'lucide-react';

const OrderTable = ({ orders, onOpenShipment }) => {

    // Helper for Status Badge
    const getStatusBadge = (status) => {
        const s = status?.toLowerCase() || 'pending';
        if (s === 'shipped' || s === 'completed' || s === 'delivered') {
            return {
                label: 'Shipped',
                className: 'bg-green-500/10 text-green-500 border-green-500/20 icon-green'
            };
        }
        return {
            label: 'Pending',
            className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 icon-yellow'
        };
    };

    return (
        <div className="bg-[#121212] border border-[#1e1e1e] rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#1a1a1a] border-b border-[#1e1e1e]">
                            <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Item Details</th>
                            <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Customer Info</th>
                            <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Order Date</th>
                            <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e1e1e]">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <Package size={48} className="mb-4 opacity-20" />
                                        <p className="text-sm font-medium">All caught up! No new orders.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => {
                                const status = getStatusBadge(order.activeOrder?.status); // Using activeOrder from join structure
                                const productImg = order.products?.image_url || order.products?.thumbnail;
                                const customer = order.activeOrder?.shipping_details || {};

                                return (
                                    <tr key={order.id} className="group hover:bg-[#181818] transition-colors">
                                        {/* Product */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-14 rounded-lg bg-[#2a2a2a] border border-[#333] overflow-hidden shrink-0">
                                                    {productImg ? (
                                                        <img src={productImg} alt="Product" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-600"><Package size={20} /></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-white max-w-[180px] truncate">{order.products?.title || 'Unknown Product'}</h4>
                                                    <p className="text-xs text-gray-500 font-mono mt-0.5">#{order.id.toString().slice(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Customer */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                                    {(customer.full_name?.[0] || 'G').toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-200">{customer.full_name || 'Guest Customer'}</p>
                                                    <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                                        <MapPin size={10} /> Shipping to {customer.city || 'Unknown City'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <Calendar size={14} />
                                                <span>{new Date(order.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border capitalize ${status.className}`}>
                                                {status.label === 'Shipped' ? <CheckCircle size={12} /> : <Truck size={12} />}
                                                {status.label}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-5 text-right">
                                            {status.label === 'Pending' ? (
                                                <button
                                                    onClick={() => onOpenShipment(order)}
                                                    className="inline-flex items-center gap-2 bg-[#8c25f4] hover:bg-[#7015d0] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg shadow-purple-900/20 transition-all active:scale-95"
                                                >
                                                    <Truck size={14} /> Mark as Shipped
                                                </button>
                                            ) : (
                                                <button className="inline-flex items-center gap-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] text-gray-300 text-xs font-bold px-4 py-2 rounded-lg border border-[#333] transition-colors">
                                                    <Eye size={14} /> View Details
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;
