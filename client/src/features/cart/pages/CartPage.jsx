
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../../shared/components/layout/Footer';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const isEmpty = cart.length === 0;

    return (
        <div className="bg-[#121212] min-h-screen flex flex-col text-white font-display overflow-x-hidden selection:bg-primary selection:text-white">
            <Navbar />

            <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Shopping Cart</h1>
                    <p className="text-[#a1a1aa]">
                        {isEmpty ? 'Your cart is looking a little empty.' : `You have ${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart.`}
                    </p>
                </header>

                {isEmpty ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-20 text-center border-t border-b border-white/5">
                        <div className="w-24 h-24 rounded-full bg-[#1e1e1e] flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-[40px] text-[#a1a1aa] opacity-50">shopping_cart_off</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
                        <p className="text-[#a1a1aa] max-w-md mb-8">
                            Looks like you haven't added any masterpieces yet.
                            Browse the market to find something unique.
                        </p>
                        <Link
                            to="/shop"
                            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary/25 transition-all"
                        >
                            Explore Market
                        </Link>
                    </div>
                ) : (
                    // Cart Content
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
                        {/* Cart Items List */}
                        <div className="flex-1 space-y-4">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    transition={{ duration: 0.2 }}
                                    layout
                                >
                                    <CartItem
                                        item={item}
                                        onRemove={removeFromCart}
                                        onUpdateQuantity={updateQuantity}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <div className="w-full lg:w-[380px] flex-shrink-0">
                            <OrderSummary subtotal={cartTotal} />
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
