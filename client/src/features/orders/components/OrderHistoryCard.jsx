import React from 'react';
import { supabase } from '../../../api/supabase';
import { useToast } from '../../../store/ToastContext';
import { Link } from 'react-router-dom';
import { Truck, FileText, ArrowRight, RefreshCw, Package } from 'lucide-react';

const OrderHistoryCard = ({ order }) => {
    const toast = useToast();

    // Status Styles
    const getStatusInfo = (status) => {
        const normalized = status?.toLowerCase() || 'pending';
        switch (normalized) {
            case 'delivered':
                return {
                    label: 'Delivered',
                    bg: 'bg-green-500/10',
                    text: 'text-green-400',
                    dot: 'bg-green-400',
                    mainAction: 'invoice'
                };
            case 'shipped':
                return {
                    label: 'In Transit',
                    bg: 'bg-blue-500/10',
                    text: 'text-blue-400',
                    dot: 'bg-blue-400',
                    mainAction: 'track'
                };
            default:
                return {
                    label: 'Processing',
                    bg: 'bg-yellow-500/10',
                    text: 'text-yellow-400',
                    dot: 'bg-yellow-400',
                    mainAction: 'track'
                };
        }
    };

    const statusInfo = getStatusInfo(order.status);
    const date = new Date(order.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Arrival Date (Mock logic: +5 days from creation)
    const arrivalDate = new Date(order.created_at);
    arrivalDate.setDate(arrivalDate.getDate() + 5);
    const arrivalString = arrivalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const handleAction = (action) => {
        if (action === 'track') {
            toast.info(`Tracking # generated for Order #${order.id.slice(0, 8).toUpperCase()}`);
        } else if (action === 'invoice') {
            toast.info(`Downloading Invoice for Order #${order.id.slice(0, 8).toUpperCase()}`);
        }
    };

    // Images
    const items = order.order_items || [];
    const itemCount = items.length;

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#1e1e1e]/40 hover:bg-[#1e1e1e]/60 transition-all group">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                {/* Thumbnails */}
                <div className="flex -space-x-4 overflow-hidden shrink-0">
                    {items.slice(0, 3).map((item, index) => {
                        const product = item.products || item.product || {};
                        const imgPath = product.image_url || product.thumbnail || product.image;
                        const src = imgPath?.startsWith('http')
                            ? imgPath
                            : imgPath ? supabase.storage.from('products').getPublicUrl(imgPath).data.publicUrl : 'https://via.placeholder.com/80';

                        return (
                            <div key={item.id || index} className="w-20 h-20 rounded-xl border-2 border-[#121212] bg-[#2a2a2a] overflow-hidden relative shadow-lg transition-transform hover:z-10 hover:scale-105">
                                <img src={src} alt={product.title} className="w-full h-full object-cover" />
                            </div>
                        );
                    })}
                    {itemCount > 3 && (
                        <div className="w-20 h-20 rounded-xl border-2 border-[#121212] bg-[#2a2a2a] flex items-center justify-center text-white font-bold text-sm relative z-0">
                            +{itemCount - 3}
                        </div>
                    )}
                </div>

                {/* Info Container */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-bold text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusInfo.bg} ${statusInfo.text} border border-white/5`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`}></span>
                            {statusInfo.label}
                        </span>
                    </div>
                    <p className="text-[#a1a1aa] text-sm mb-1">Placed on {date}</p>
                    <p className="text-[#a1a1aa] text-sm">
                        {itemCount} Item{itemCount !== 1 ? 's' : ''} • Total: <span className="text-white font-medium">₹{order.total_amount?.toFixed(2)}</span>
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                        <Link
                            to={`/order/${order.id}`}
                            className="text-primary hover:text-white text-sm font-semibold flex items-center gap-1 transition-colors"
                        >
                            View Order Details
                            <ArrowRight size={14} />
                        </Link>
                        {statusInfo.label === 'Delivered' && (
                            <button className="text-[#a1a1aa] hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
                                <RefreshCw size={14} /> Buy Again
                            </button>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2 w-full md:w-auto mt-4 md:mt-0">
                    {statusInfo.mainAction === 'track' ? (
                        <>
                            <button
                                onClick={() => handleAction('track')}
                                className="w-full md:w-auto bg-[#8c25f4] hover:bg-[#7015d0] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                            >
                                <Truck size={16} /> Track Package
                            </button>
                            <span className="text-xs text-[#a1a1aa] mt-1">Arriving by {arrivalString}</span>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleAction('invoice')}
                                className="w-full md:w-auto bg-[#1e1e1e] hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all"
                            >
                                <FileText size={16} /> Invoice
                            </button>
                            <span className="text-xs text-[#a1a1aa] mt-1">Delivered on {arrivalString}</span>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default OrderHistoryCard;
