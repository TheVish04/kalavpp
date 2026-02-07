import React, { useState } from 'react';
import { X, Send, Truck, Package, Info } from 'lucide-react';
import { useToast } from '../../../store/ToastContext';

const ShipmentModal = ({ isOpen, onClose, order, onConfirmShipment }) => {
    const toast = useToast();
    const [carrier, setCarrier] = useState('FedEx');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen || !order) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!trackingNumber.trim()) {
            toast.error('Please enter a tracking number.');
            return;
        }

        try {
            setSubmitting(true);

            // In a real app we'd save tracking info to metadata or a specific table
            // For MVP, we pass it up to update status
            await onConfirmShipment(order.id, carrier, trackingNumber);

            setCarrier('FedEx');
            setTrackingNumber('');
            onClose();

        } catch (error) {
            console.error('Shipment error:', error);
            toast.error('Failed to update shipment.');
        } finally {
            setSubmitting(false);
        }
    };

    // Parse Address
    const address = order.shipping_details || order.activeOrder?.shipping_details || {};
    const formattedAddress = `${address.address || ''}, ${address.city || ''}, ${address.state || ''} ${address.zip || ''}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#121212] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            Ship Order <span className="text-[#8c25f4]">#{order.id.toString().slice(0, 8)}</span>
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">Enter tracking details to notify customer.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Carrier */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shipping Carrier</label>
                        <div className="relative">
                            <select
                                value={carrier}
                                onChange={(e) => setCarrier(e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-[#333] text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-[#8c25f4] transition-colors"
                            >
                                <option value="FedEx">FedEx</option>
                                <option value="UPS">UPS</option>
                                <option value="DHL">DHL</option>
                                <option value="USPS">USPS</option>
                            </select>
                            <Truck size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Tracking */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tracking Number</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="e.g. 1Z999AA10123456784"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-[#333] text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#8c25f4] transition-colors font-mono tracking-wide"
                            />
                            <Package size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    {/* Shipping Info Box */}
                    <div className="bg-[#1e1e1e]/50 border border-white/5 rounded-xl p-4 flex gap-3">
                        <Info size={18} className="text-[#8c25f4] shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs text-gray-300 font-bold mb-1">Shipping Destination:</p>
                            <p className="text-xs text-gray-500 leading-relaxed font-mono">
                                {formattedAddress || 'No shipping address provided.'}
                            </p>
                            <p className="text-[10px] text-gray-600 mt-2 font-bold uppercase">Standard Shipping - Expected 3-5 Days</p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <Send size={18} /> Confirm & Notify Customer
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ShipmentModal;
