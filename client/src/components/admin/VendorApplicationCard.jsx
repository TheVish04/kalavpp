
import React from 'react';
import { MapPin, Clock, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

const VendorApplicationCard = ({ applicant, onApprove, onReject }) => {
    return (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col lg:flex-row gap-8 items-start hover:border-white/10 transition-colors">

            {/* 1. User Info (Left) */}
            <div className="flex gap-4 shrink-0 min-w-[240px]">
                <img
                    src={applicant.avatar}
                    alt={applicant.name}
                    className="w-16 h-16 rounded-xl object-cover bg-[#252525]"
                />
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">{applicant.name}</h3>
                    <div className="flex flex-col gap-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                            <MapPin size={12} /> {applicant.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={12} /> {applicant.appliedTime}
                        </span>
                    </div>
                    <a
                        href={`https://${applicant.portfolioLink}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 mt-3 inline-flex items-center gap-1"
                    >
                        {applicant.portfolioLink} <ExternalLink size={10} />
                    </a>
                </div>
            </div>

            {/* 2. Samples (Middle) - Flexible grow */}
            <div className="flex-1 w-full">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Sample Works</p>
                <div className="grid grid-cols-3 gap-3">
                    {applicant.samples.map((sample, idx) => (
                        <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-[#333] bg-[#0a0a0a] group relative">
                            <img
                                src={sample}
                                alt="Sample"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Actions (Right) */}
            <div className="flex lg:flex-col gap-3 shrink-0 w-full lg:w-32 justify-end lg:justify-start">
                <button
                    onClick={() => onApprove(applicant.id, applicant.name)}
                    className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-lg py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <CheckCircle size={14} /> Approve
                </button>
                <button
                    onClick={() => onReject(applicant.id)}
                    className="flex-1 bg-[#252525] hover:bg-[#333] text-gray-400 hover:text-white border border-[#333] rounded-lg py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <XCircle size={14} /> Reject
                </button>
            </div>
        </div>
    );
};

export default VendorApplicationCard;
