
import React from 'react';

const ShippingForm = ({ shippingDetails, setShippingDetails, onNext }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation could go here
        onNext();
    };

    return (
        <form id="shipping-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#a1a1aa]">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        value={shippingDetails.firstName}
                        onChange={handleChange}
                        className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="John"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#a1a1aa]">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        required
                        value={shippingDetails.lastName}
                        onChange={handleChange}
                        className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Doe"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-[#a1a1aa]">Email Address</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={shippingDetails.email}
                    onChange={handleChange}
                    className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-[#a1a1aa]">Street Address</label>
                <input
                    type="text"
                    name="address"
                    required
                    value={shippingDetails.address}
                    onChange={handleChange}
                    className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="123 Cyberpunk Avenue"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#a1a1aa]">City</label>
                    <input
                        type="text"
                        name="city"
                        required
                        value={shippingDetails.city}
                        onChange={handleChange}
                        className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Neo Tokyo"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#a1a1aa]">State / Province</label>
                    <input
                        type="text"
                        name="state"
                        required
                        value={shippingDetails.state}
                        onChange={handleChange}
                        className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="District 9"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#a1a1aa]">Postal Code</label>
                    <input
                        type="text"
                        name="zip"
                        required
                        value={shippingDetails.zip}
                        onChange={handleChange}
                        className="w-full h-[50px] bg-[#1E1E24] border border-white/10 rounded-lg px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="10110"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                    Continue to Payment
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </form>
    );
};

export default ShippingForm;
