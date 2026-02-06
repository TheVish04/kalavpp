
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CheckoutSummary from '../../components/checkout/CheckoutSummary';
import ShippingForm from '../../components/checkout/ShippingForm';
import PaymentStep from '../../components/checkout/PaymentStep';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();

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

    // Calculate Final Total for Submission
    const taxRate = 0.08;
    const tax = cartTotal * taxRate;
    const shippingCost = cartTotal > 500 || cartTotal === 0 ? 0 : 20.00;
    const finalTotal = cartTotal + tax + shippingCost;

    const handlePaymentSubmit = async () => {
        if (!user) {
            // Should probably force login before checkout, but for now we proceed or alert
            console.warn("User not logged in, proceeding as guest might require more logic.");
        }

        setLoading(true);
        try {
            // 1. Create Order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert([
                    {
                        user_id: user?.id || null, // Handle guest checkout if allowed, or enforce auth
                        total_amount: finalTotal,
                        status: 'pending', // or 'paid'
                        shipping_details: shippingDetails
                    }
                ])
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create Order Items
            if (order) {
                const orderItems = cart.map(item => ({
                    order_id: order.id,
                    product_id: item.id,
                    quantity: item.quantity || 1,
                    price_at_purchase: item.price
                }));

                const { error: itemsError } = await supabase
                    .from('order_items')
                    .insert(orderItems);

                if (itemsError) throw itemsError;

                // 3. Success
                clearCart();
                navigate('/order-success');
            }

        } catch (error) {
            console.error('Checkout Error:', error);
            alert('Payment failed. Please try again.');
        } finally {
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
                                        onSubmit={handlePaymentSubmit}
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
