
import React from 'react';
import { Check, ClipboardList, PenTool, Image as ImageIcon, Box } from 'lucide-react';

const MilestoneTracker = ({ currentStepIndex }) => {
    const steps = [
        { id: 'Request Sent', icon: ClipboardList, label: 'Request' },
        { id: 'Deposit Paid', icon: Check, label: 'Deposit' },
        { id: 'Sketch Review', icon: PenTool, label: 'Sketch' },
        { id: 'Final Polish', icon: ImageIcon, label: 'Final' },
        { id: 'Delivery', icon: Box, label: 'Delivery' }
    ];

    return (
        <div className="w-full mb-8 px-4">
            <div className="relative flex justify-between">
                {/* Progress Bar Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-[#2a2a2a] -translate-y-1/2 rounded-full -z-10"></div>

                {/* Active Progress Bar */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 -translate-y-1/2 rounded-full -z-10 transition-all duration-500 ease-out"
                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isActive = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const Icon = step.icon;

                    return (
                        <div key={index} className="flex flex-col items-center gap-2 group">
                            <div
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative bg-[#121212] ${isActive
                                        ? 'border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                        : 'border-[#333] text-gray-600'
                                    }`}
                            >
                                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />

                                {isCurrent && (
                                    <span className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping opacity-30"></span>
                                )}
                            </div>
                            <span
                                className={`text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600'
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MilestoneTracker;
