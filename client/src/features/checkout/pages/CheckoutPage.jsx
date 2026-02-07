import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../cart/context/CartContext';
import { useAuth } from '../../../store/AuthContext';
import { useToast } from '../../../store/ToastContext';
import { supabase } from '../../../api/supabase';
import { createPaymentOrder, verifyPayment } from '../../../api/payment';
import { calculateOrderTotals } from '../../../shared/constants/order';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../../shared/components/layout/Footer';
import CheckoutSummary from '../components/CheckoutSummary';
import ShippingForm from '../components/ShippingForm';
import PaymentStep from '../components/PaymentStep';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const toast = useToast();

    const [currentStep, setCurrentStep] = useState(1);
    const [shippingDetails, setShippingDetails] = useState({
        firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: ''
    });
    const [loading, setLoading] = useState(false);

    // Redirect if cart empty
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/shop');
        }
    }, [cart, navigate]);

    const { total: finalTotal } = calculateOrderTotals(cartTotal);
    const amountInPaise = Math.round(finalTotal * 100);

    const handlePayWithRazorpay = async () => {
        setLoading(true);
        try {
            // 1. Create platform order (pending)
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert([
                    {
                        user_id: user?.id || null,
                        total_amount: finalTotal,
                        status: 'pending',
                        shipping_details: shippingDetails
                    }
                ])
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create Razorpay order via server
            const rzpOrder = await createPaymentOrder(amountInPaise, order.id, {
                user_id: user?.id,
                platform_order_id: order.id,
            });

            if (rzpOrder.error) throw new Error(rzpOrder.error || 'Failed to create payment order');

            // Mock mode: no Razorpay keys - complete order directly (dev only)
            if (rzpOrder.orderId?.startsWith('order_mock_')) {
                const orderItems = cart.map(item => ({
                    order_id: order.id,
                    product_id: item.id,
                    quantity: item.quantity ?? 1,
                    price_at_purchase: item.price ?? 0
                }));
                await supabase.from('order_items').insert(orderItems);
                await supabase.from('orders').update({ status: 'paid' }).eq('id', order.id);
                clearCart();
                navigate(`/order-success?orderId=${order.id}&status=success`);
                setLoading(false);
                return;
            }

            if (!window.Razorpay) throw new Error('Razorpay checkout not loaded. Refresh and try again.');

            // 3. Open Razorpay checkout
            const options = {
                key: rzpOrder.keyId,
                amount: amountInPaise,
                currency: 'INR',
                order_id: rzpOrder.orderId,
                name: 'KALAVPP',
                description: 'ArtCommerce & Creative Services',
                prefill: {
                    name: `${shippingDetails.firstName} ${shippingDetails.lastName}`.trim() || 'Customer',
                    email: shippingDetails.email || user?.email,
                },
                theme: { color: '#8c25f4' },
                handler: async (response) => {
                    try {
                        // 4. Verify payment on server
                        const verified = await verifyPayment(
                            response.razorpay_payment_id,
                            response.razorpay_signature,
                            response.razorpay_order_id
                        );

                        if (!verified) {
                            toast.error('Payment verification failed.');
                            return;
                        }

                        // 5. Insert order items and update order status
                        const orderItems = cart.map(item => ({
                            order_id: order.id,
                            product_id: item.id,
                            quantity: item.quantity ?? 1,
                            price_at_purchase: item.price ?? 0
                        }));

                        const { error: itemsError } = await supabase
                            .from('order_items')
                            .insert(orderItems);

                        if (itemsError) throw itemsError;

                        await supabase
                            .from('orders')
                            .update({ status: 'paid' })
                            .eq('id', order.id);

                        clearCart();
                        navigate(`/order-success?orderId=${order.id}&status=success`);
                    } catch (err) {
                        toast.error('Failed to complete order. Contact support.');
                    } finally {
                        setLoading(false);
                    }
                },
                modal: {
                    ondismiss: () => setLoading(false),
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', () => {
                toast.error('Payment failed. Please try again.');
                setLoading(false);
            });
            rzp.open();
        } catch (err) {
            toast.error(err.message || 'Payment failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen flex flex-col text-white font-display overflow-x-hidden selection:bg-primary selection:text-white">
            <Navbar />

            <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Secure Checkout</h1>
                    <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                        <span className={currentStep >= 1 ? "text-primary font-bold" : ""}>Shipping</span>
                        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                        <span className={currentStep >= 2 ? "text-primary font-bold" : ""}>Payment</span>
                        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                        <span className={currentStep >= 3 ? "text-primary font-bold" : ""}>Review</span>
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">

                    {/* Left Column: Steps */}
                    <div className="flex-1 space-y-6">

                        {/* Step 1: Shipping */}
                        <div className={`border rounded-2xl overflow-hidden transition-all ${currentStep === 1
                            ? 'border-primary/50 bg-[#1e1e1e]/20'
                            : 'border-white/10 bg-[#121212]'
                            }`}>
                            <div
                                className="p-6 flex items-center justify-between cursor-pointer"
                                onClick={() => currentStep > 1 && setCurrentStep(1)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep > 1 ? 'bg-green-500 text-white' : currentStep === 1 ? 'bg-primary text-white' : 'bg-white/10 text-[#a1a1aa]'
                                        }`}>
                                        {currentStep > 1 ? <span className="material-symbols-outlined text-[18px]">check</span> : '1'}
                                    </div>
                                    <h3 className={`font-bold text-lg ${currentStep === 1 ? 'text-white' : 'text-[#a1a1aa]'}`}>Shipping Information</h3>
                                </div>
                                {currentStep > 1 && (
                                    <button className="text-primary text-sm font-bold hover:underline">Edit</button>
                                )}
                            </div>

                            {currentStep === 1 && (
                                <div className="px-6 pb-8 animate-fade-in">
                                    <ShippingForm
                                        shippingDetails={shippingDetails}
                                        setShippingDetails={setShippingDetails}
                                        onNext={() => setCurrentStep(2)}
                                        user={user}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Step 2: Payment */}
                        <div className={`border rounded-2xl overflow-hidden transition-all ${currentStep === 2
                            ? 'border-primary/50 bg-[#1e1e1e]/20'
                            : 'border-white/10 bg-[#121212]'
                            }`}>
                            <div className="p-6 flex items-center gap-4">
                                <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep > 2 ? 'bg-green-500 text-white' : currentStep === 2 ? 'bg-primary text-white' : 'bg-white/10 text-[#a1a1aa]'
                                    }`}>
                                    2
                                </div>
                                <h3 className={`font-bold text-lg ${currentStep === 2 ? 'text-white' : 'text-[#a1a1aa]'}`}>Payment Method</h3>
                            </div>

                            {currentStep === 2 && (
                                <div className="px-6 pb-8 animate-fade-in">
                                    <PaymentStep
                                        total={finalTotal}
                                        onBack={() => setCurrentStep(1)}
                                        onPayWithRazorpay={handlePayWithRazorpay}
                                        loading={loading}
                                    />
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column: Summary */}
                    <div className="w-full lg:w-[400px] flex-shrink-0">
                        <CheckoutSummary />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;
