
import React, { useState } from 'react';

const ServiceRequestForm = ({ serviceTitle }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 3000); // Reset after 3 seconds for demo
        }, 500);
    };

    return (
        <div className="w-full lg:w-[440px] flex-shrink-0 relative z-10">
            <div className="sticky top-24 glass-panel border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl bg-[#1e1e1e]/60 backdrop-blur-md">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Request a Quote</h2>
                    <p className="text-sm text-[#ab9cba] mt-1">Start your creative journey today.</p>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Service Type */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#ab9cba]">Service Type</label>
                        <div className="relative">
                            <select
                                defaultValue={serviceTitle}
                                className="w-full bg-[#121212] border border-[#302839] text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-3 appearance-none"
                            >
                                <option>{serviceTitle || 'General Commission'}</option>
                                <option>Wall Mural</option>
                                <option>Digital Illustration</option>
                                <option>Canvas Painting</option>
                                <option>Portrait Commission</option>
                                <option>Custom Installation</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#ab9cba]">
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                        </div>
                    </div>
                    {/* Vision */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#ab9cba]">Your Vision</label>
                        <textarea
                            className="w-full bg-[#121212] border border-[#302839] text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-3 resize-none"
                            placeholder="Describe your idea, themes, colors, or emotions you want to capture..."
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    {/* Drag & Drop Zone */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#ab9cba]">References</label>
                        <div className="w-full border-2 border-dashed border-[#302839] hover:border-primary/50 hover:bg-white/5 transition-colors rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer group">
                            <span className="material-symbols-outlined text-3xl text-[#ab9cba] group-hover:text-primary transition-colors mb-2">cloud_upload</span>
                            <p className="text-sm text-white font-medium">Click to upload or drag & drop</p>
                            <p className="text-xs text-[#ab9cba] mt-1">JPG, PNG up to 10MB</p>
                        </div>
                    </div>
                    {/* Deadline */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#ab9cba]">Desired Deadline</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-[#ab9cba]">
                                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                            </div>
                            <input
                                className="bg-[#121212] border border-[#302839] text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-3 placeholder-gray-400 [color-scheme:dark]"
                                type="date"
                            />
                        </div>
                    </div>
                    {/* Submit */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitted}
                            className={`w-full group relative overflow-hidden rounded-lg p-4 text-white font-bold text-lg shadow-lg transition-all ${isSubmitted ? 'bg-green-600' : 'bg-gradient-to-r from-primary to-[#a855f7] shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.01]'}`}
                        >
                            {!isSubmitted && <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>}
                            <span className="relative flex items-center justify-center gap-2">
                                {isSubmitted ? (
                                    <>
                                        Request Sent <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                    </>
                                ) : (
                                    <>
                                        Send Request <span className="material-symbols-outlined text-[20px]">send</span>
                                    </>
                                )}
                            </span>
                        </button>
                        <p className="text-center text-xs text-[#ab9cba] mt-3 flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">verified_user</span>
                            No payment required upfront.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceRequestForm;
