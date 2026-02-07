
import React, { useState } from 'react';

const PaymentStep = ({ onBack, onSubmit, loading, total }) => {
    const [cardDetails, setCardDetails] = useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvc: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Simple formatting logic could be added here
        setCardDetails(prev => ({ ...prev, [name]: value }));
    };

    const handlePay = (e) => {
        e.preventDefault();
        onSubmit(cardDetails);
    };

    return (
        <form onSubmit={handlePay} className="space-y-6">

            {/* Review Section Brief */}
            <div className="bg-[#1E1E24] border border-white/5 rounded-lg p-4 mb-6">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                    Payment Method
                </h4>
                <p className="text-sm text-[#a1a1aa]">All transactions are encrypted and secured.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#a1a1aa]">Name on Card</label>
                    <input
                        type="text"
                        name="cardName"
                        required
                        value={cardDetails.cardName}
                        onChange={handleChange}
                        className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#a1a1aa]">Card Number</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="cardNumber"
                            required
                            value={cardDetails.cardNumber}
                            onChange={handleChange}
                            className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 pr-12 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="0000 0000 0000 0000"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#a1a1aa]">credit_card</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#a1a1aa]">Expiration Date</label>
                        <input
                            type="text"
                            name="expDate"
                            required
                            value={cardDetails.expDate}
                            onChange={handleChange}
                            className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#a1a1aa]">CVC</label>
                        <input
                            type="text"
                            name="cvc"
                            required
                            value={cardDetails.cvc}
                            onChange={handleChange}
                            className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="123"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 flex gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 bg-[#1E1E24] border border-white/10 hover:bg-white/5 text-white font-bold py-3.5 rounded-xl transition-all"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] bg-gradient-to-r from-primary to-[#a855f7] hover:from-primary-dark hover:to-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                        <>
                            Pay ₹{total.toFixed(2)}
                            <span className="material-symbols-outlined">lock</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default PaymentStep;
