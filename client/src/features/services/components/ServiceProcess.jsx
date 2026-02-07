
import React from 'react';

const ServiceProcess = () => {
    return (
        <div className="pt-4 pb-12">
            <h3 className="text-xl font-bold text-white mb-8">How It Works</h3>
            <div className="relative pl-4 space-y-12 border-l-2 border-dashed border-white/10 ml-3">
                {/* Step 1 */}
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-[#121212]"></div>
                    <h4 className="text-lg font-bold text-white">Consultation</h4>
                    <p className="text-sm text-[#ab9cba] mt-1">We discuss your vision, space, and budget to align on expectations.</p>
                </div>
                {/* Step 2 */}
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-[#1e1e1e] border-2 border-primary ring-4 ring-[#121212]"></div>
                    <h4 className="text-lg font-bold text-white">Concept & Sketch</h4>
                    <p className="text-sm text-[#ab9cba] mt-1">Receive digital sketches and mood boards for approval before work begins.</p>
                </div>
                {/* Step 3 */}
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-[#1e1e1e] border-2 border-primary/50 ring-4 ring-[#121212]"></div>
                    <h4 className="text-lg font-bold text-white">Creation</h4>
                    <p className="text-sm text-[#ab9cba] mt-1">The artist brings the masterpiece to life, providing regular updates.</p>
                </div>
                {/* Step 4 */}
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-[#1e1e1e] border-2 border-white/20 ring-4 ring-[#121212]"></div>
                    <h4 className="text-lg font-bold text-white">Delivery & Reveal</h4>
                    <p className="text-sm text-[#ab9cba] mt-1">Final touches and handover of your custom artwork.</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceProcess;
