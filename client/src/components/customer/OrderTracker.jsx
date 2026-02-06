
import React from 'react';
import { Truck, Check, Package, Clock } from 'lucide-react';

const OrderTracker = ({ status }) => {
    const steps = [
        { id: 1, label: 'Ordered', icon: Clock },
        { id: 2, label: 'Processing', icon: Package },
        { id: 3, label: 'Shipped', icon: Truck },
        { id: 4, label: 'Delivered', icon: Check },
    ];

    const getStatusIndex = (s) => {
        const normalized = s?.toLowerCase() || 'pending';
        if (normalized === 'delivered') return 4;
        if (normalized === 'shipped') return 3;
        if (normalized === 'processing') return 2;
        // pending -> ordered/processing overlap often, but let's say step 2 for "Processing" view
        return 2;
    };

    const currentStep = getStatusIndex(status);

    return (
        <div className="w-full mb-12">
            <div className="relative flex justify-between">
                {/* Progress Bar Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-[#2a2a2a] -translate-y-1/2 rounded-full -z-10"></div>

                {/* Active Progress Bar */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full -z-10 transition-all duration-700 active-progress-bar"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step) => {
                    const isActive = step.id <= currentStep;
                    const isCompleted = step.id < currentStep;
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-3 bg-[#121212] px-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                                        ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(140,37,244,0.4)]'
                                        : 'bg-[#1e1e1e] border-[#333] text-gray-500'
                                    }`}
                            >
                                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span
                                className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600'
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Pulsing effect tip (only for visual flair on active step) */}
            <style jsx>{`
                .active-progress-bar {
                     box-shadow: 0 0 10px rgba(140, 37, 244, 0.5);
                }
            `}</style>
        </div>
    );
};

export default OrderTracker;
