
import React from 'react';
import { CheckCircle, XCircle, Calendar, DollarSign, MessageSquare, Briefcase, ChevronRight, FileText, Download } from 'lucide-react';

const ServiceDetail = ({ request, onUpdateStatus, onUpdateProgress }) => {

    if (!request) return <div className="flex-1 flex items-center justify-center text-gray-500">Select a request to view details</div>;

    const milestones = ['Sketch', 'Lineart', 'Color', 'Final'];
    const currentStepIndex = milestones.indexOf(request.currentPhase || 'Sketch');

    // Dynamic Phase handling
    const advancePhase = () => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < milestones.length) {
            onUpdateProgress(request.id, milestones[nextIndex], ((nextIndex / (milestones.length - 1)) * 100));
        } else {
            onUpdateStatus(request.id, 'CLOSED');
        }
    };

    return (
        <div className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-[#0a0a0a] relative">

            {/* Header */}
            <div className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1e1e1e] px-8 py-6 flex justify-between items-start">
                <div className="flex items-start gap-4">
                    <img src={request.avatar} alt={request.clientName} className="w-12 h-12 rounded-full border border-[#1e1e1e]" />
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-white">{request.clientName}</h1>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${request.status === 'NEW' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    request.status === 'IN_PROGRESS' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                }`}>
                                {request.serviceType}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Calendar size={12} /> Deadline: {request.deadline}</span>
                            <span className="flex items-center gap-1 text-green-400 font-bold"><DollarSign size={12} /> ${request.price.toFixed(2)} USD</span>
                        </div>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <MessageSquare size={20} />
                </button>
            </div>

            <div className="p-8 max-w-5xl mx-auto space-y-8">

                {/* Action Card: New Request Logic */}
                {request.status === 'NEW' && (
                    <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>

                        <div className="flex items-start gap-4 z-10">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                                <Briefcase size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">New Commission Request</h3>
                                <p className="text-sm text-gray-400 max-w-md">
                                    Review the project brief and references below before accepting.
                                    The deadline is firm.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 z-10">
                            <button
                                onClick={() => onUpdateStatus(request.id, 'DECLINED')}
                                className="px-6 py-2.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 font-bold text-sm transition-colors flex items-center gap-2"
                            >
                                <XCircle size={16} /> Decline
                            </button>
                            <button
                                onClick={() => onUpdateStatus(request.id, 'IN_PROGRESS')}
                                className="px-6 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-500/20 transition-all flex items-center gap-2"
                            >
                                <CheckCircle size={16} /> Accept Job
                            </button>
                        </div>
                    </div>
                )}

                {/* Tracker Logic: In Progress */}
                {request.status === 'IN_PROGRESS' && (
                    <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-2 text-purple-400">
                                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                                <h3 className="font-bold text-sm uppercase tracking-wider">Milestone Tracker</h3>
                            </div>
                            <button className="text-xs text-gray-500 hover:text-white transition-colors">View Detailed Schedule</button>
                        </div>

                        {/* Stepper */}
                        <div className="relative mb-12 px-4">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-[#2a2a2a] -translate-y-1/2 rounded-full"></div>
                            <div
                                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 rounded-full transition-all duration-700"
                                style={{ width: `${(currentStepIndex / (milestones.length - 1)) * 100}%` }}
                            ></div>

                            <div className="relative flex justify-between w-full">
                                {milestones.map((step, index) => {
                                    const active = index <= currentStepIndex;
                                    const current = index === currentStepIndex;

                                    return (
                                        <div key={index} className="flex flex-col items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border-2 z-10 transition-colors ${active ? 'bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-[#121212] border-gray-600'
                                                }`}></div>
                                            <span className={`text-xs font-bold uppercase transition-colors ${active ? 'text-white' : 'text-gray-600'}`}>
                                                {step}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">
                            <span className="text-sm text-gray-400">Current Phase: <strong className="text-white ml-2">{request.currentPhase}</strong></span>
                            <button
                                onClick={advancePhase}
                                className="bg-[#8c25f4] hover:bg-[#7015d0] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <CheckCircle size={14} /> Mark Milestone Complete
                            </button>
                        </div>
                    </div>
                )}

                {/* Project Brief */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2 text-white font-bold text-lg border-b border-[#1e1e1e] pb-4">
                            <FileText size={20} className="text-gray-400" />
                            <h3>Project Brief</h3>
                        </div>
                        <div className="bg-[#121212] rounded-2xl p-6 border border-[#1e1e1e] text-gray-300 text-sm leading-relaxed space-y-4">
                            <p className="font-medium text-white">{request.message}</p>

                            <div>
                                <h4 className="text-white font-bold mb-2">Key Details:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-gray-400 marker:text-gray-600">
                                    <li>Style: Realistic oil painting style, similar to your "Forest Guardian" piece.</li>
                                    <li>Pose: Standing confidently, holding a dagger in her left hand, looking over shoulder.</li>
                                    <li>Lighting: Moody, moonlight filtering through trees.</li>
                                    <li>Outfit: Dark leather armor with silver trim, hooded cloak.</li>
                                </ul>
                            </div>

                            <p className="italic text-gray-500 border-l-2 border-[#333] pl-4">
                                "I've attached some references for her hair color and the specific type of armor I'm imagining. Please let me know if the budget works."
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-white font-bold text-lg border-b border-[#1e1e1e] pb-4">
                            <span className="material-symbols-outlined text-gray-400">image</span>
                            <h3>References</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-[#1e1e1e] hover:border-white/20 transition-colors group relative cursor-pointer">
                                    <img src={`https://source.unsplash.com/random/200x200?fantasy,art&sig=${i + request.id}`} alt="Ref" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                            <div className="aspect-square rounded-xl border border-[#1e1e1e] bg-[#121212] flex flex-col items-center justify-center text-gray-500 hover:text-white hover:bg-[#1a1a1a] cursor-pointer transition-all">
                                <Download size={24} className="mb-1" />
                                <span className="text-[10px] font-bold">Download All</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ServiceDetail;
