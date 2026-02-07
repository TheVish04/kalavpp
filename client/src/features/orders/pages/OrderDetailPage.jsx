import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../../api/supabase';
import { useToast } from '../../../store/ToastContext';
import { downloadInvoice, generateInvoiceHTML } from '../../../shared/utils/invoice';
import { Download, Printer, HelpCircle, ArrowLeft } from 'lucide-react';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../../shared/components/layout/Footer';
import OrderTracker from '../components/OrderTracker';
import OrderInfoGrid from '../components/OrderInfoGrid';
import OrderSummaryFooter from '../components/OrderSummaryFooter';

const OrderDetails = () => {
    const { id } = useParams();
    const toast = useToast();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    order_items (
                        *,
                        products (
                            title,
                            image_url
                        )
                    )
                `)
                .eq('id', id)
                .single();

            if (error) throw error;
            setOrder(data);

        } catch (error) {
            console.error('Error fetching order details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadInvoice = () => {
        try {
            downloadInvoice(order);
            toast.success('Invoice downloaded.');
        } catch (e) {
            toast.error('Failed to download invoice.');
        }
    };

    const handlePrintInvoice = () => {
        const html = generateInvoiceHTML(order);
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
        win.print();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white gap-4">
                <h2 className="text-2xl font-bold">Order Not Found</h2>
                <Link to="/orders" className="text-primary hover:underline">Return to Orders</Link>
            </div>
        );
    }

    const date = new Date(order.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    return (
        <div className="bg-[#0a0a0a] min-h-screen font-display text-white selection:bg-primary selection:text-white flex flex-col">
            <Navbar />

            <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* Back Link */}
                <Link
                    to="/orders"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm font-medium transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Order History
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Order Details</h1>
                        <p className="text-gray-400">View and manage your recent purchase.</p>
                        <div className="mt-4 flex flex-wrap items-baseline gap-2">
                            <span className="font-mono text-2xl font-bold text-white tracking-wide">#{order.id.slice(0, 8).toUpperCase()}</span>
                            <span className="text-sm text-gray-500">Placed on {date}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDownloadInvoice}
                            className="bg-[#1e1e1e] border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                        >
                            <Download size={16} /> <span className="hidden sm:inline">Download Invoice</span>
                        </button>
                        <button
                            onClick={handlePrintInvoice}
                            className="bg-[#1e1e1e] border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                        >
                            <Printer size={16} /> <span className="hidden sm:inline">Print</span>
                        </button>
                        <button className="bg-[#1e1e1e] border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
                            <HelpCircle size={16} /> <span className="hidden sm:inline">Need Help?</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-[#121212] rounded-3xl border border-white/5 p-6 md:p-8 lg:p-10 shadow-2xl">
                    <OrderTracker status={order.status} />
                    <OrderInfoGrid order={order} />
                    <OrderSummaryFooter order={order} />

                    <div className="mt-8 text-center sm:text-left text-xs text-gray-500">
                        <p>Need to return an item? <a href="#" className="text-white hover:underline">View our Return Policy</a>. Questions? Email us at <span className="text-white">support@KalaVPP.com</span></p>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default OrderDetails;
