
import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../api/supabase';

const RecentOrders = ({ orders }) => {

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return {
                    bg: 'bg-blue-500/10',
                    text: 'text-blue-400',
                    border: 'border-blue-500/20',
                    dot: 'bg-blue-400',
                    label: 'Delivered'
                };
            case 'shipped':
                return {
                    bg: 'bg-green-500/10',
                    text: 'text-green-400',
                    border: 'border-green-500/20',
                    dot: 'bg-green-400',
                    label: 'Shipped'
                };
            default: // processing, pending
                return {
                    bg: 'bg-orange-500/10',
                    text: 'text-orange-400',
                    border: 'border-orange-500/20',
                    dot: 'bg-orange-400',
                    label: 'Processing'
                };
        }
    };

    // Helper to get first item info (since orders have multiple)
    // We assume 'order_items' are joined, or we fetch them separately.
    // For this list view, often backend sends a summary or the first item.
    // If we only have order details, we'll genericize.

    return (
        <div className="flex flex-col gap-4 flex-1 min-h-0">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                <Link to="/orders" className="text-sm text-primary hover:text-primary-dark font-semibold transition-colors">
                    View All
                </Link>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden flex flex-col flex-1 border border-white/5 bg-[#121212]/50">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-full">Item</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                        No recent activity to show.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => {
                                    const style = getStatusStyle(order.status);
                                    const date = new Date(order.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                                    // Robust handling for item display
                                    const firstItem = order.order_items?.[0] || {};
                                    const product = firstItem.product || {};
                                    const title = product.title || `Order #${order.id.slice(0, 8)}`;
                                    // Use a fallback image if none provided
                                    const image = product.thumbnail || product.image || 'https://via.placeholder.com/40';
                                    const imageUrl = image.startsWith('http') ? image : supabase.storage.from('products').getPublicUrl(image).data.publicUrl;

                                    return (
                                        <tr key={order.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="h-10 w-10 rounded-lg bg-[#1e1e1e] bg-cover bg-center border border-white/10"
                                                        style={{ backgroundImage: `url('${imageUrl}')` }}
                                                    ></div>
                                                    <span className="text-white font-medium max-w-[200px] truncate block">{title}</span>
                                                    {order.order_items?.length > 1 && (
                                                        <span className="text-xs text-gray-500">+{order.order_items.length - 1} more</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                                                    {style.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <Link
                                                    to={`/order/${order.id}`}
                                                    className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded text-xs font-semibold transition-all inline-block"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RecentOrders;
