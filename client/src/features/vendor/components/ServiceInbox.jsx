
import React from 'react';
import { Search, Filter } from 'lucide-react';

const ServiceInbox = ({ requests, selectedId, onSelect }) => {

    // Helper Styles
    const getBadgeStyle = (status) => {
        switch (status) {
            case 'NEW': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
            case 'IN_PROGRESS': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
            case 'CLOSED': return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
            default: return 'bg-gray-500/10 text-gray-400';
        }
    };

    return (
        <div className="w-full md:w-[350px] border-b md:border-b-0 md:border-r border-[#1e1e1e] bg-[#0a0a0a] flex flex-col h-full z-10">
            {/* Header */}
            <div className="p-4 border-b border-[#1e1e1e]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Inbox</h2>
                    <span className="bg-[#1e1e1e] text-gray-400 text-xs font-bold px-2 py-1 rounded-md border border-[#333]">1 New</span>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search requests..."
                        className="w-full bg-[#121212] border border-[#1e1e1e] rounded-lg pl-9 pr-8 py-2 text-sm text-white focus:outline-none focus:border-primary/50 placeholder-gray-600"
                    />
                    <Filter className="absolute right-3 top-2.5 text-gray-500 cursor-pointer hover:text-white" size={16} />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                {requests.map((request) => {
                    const isSelected = request.id === selectedId;
                    const badgeClass = getBadgeStyle(request.status);

                    return (
                        <div
                            key={request.id}
                            onClick={() => onSelect(request.id)}
                            className={`p-4 rounded-xl cursor-pointer border transition-all ${isSelected
                                    ? 'bg-[#121212] border-primary/50 relative shadow-[inset_4px_0_0_0_#8b5cf6]'
                                    : 'bg-transparent border-transparent hover:bg-[#121212]'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img src={request.avatar} alt={request.clientName} className="w-10 h-10 rounded-full object-cover bg-[#1e1e1e]" />
                                        {request.status === 'NEW' && <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#0a0a0a]"></span>}
                                    </div>
                                    <div>
                                        <h3 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-200'}`}>{request.clientName}</h3>
                                        <p className="text-xs text-gray-500">{request.serviceType}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeClass}`}>
                                    {request.status.replace('_', ' ')}
                                </span>
                            </div>

                            <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                                {request.message}
                            </p>

                            <div className="flex justify-between items-end">
                                <span className="text-xs text-gray-600">{request.timeAgo}</span>
                                <span className={`text-sm font-bold ${request.status === 'NEW' ? 'text-green-400' : 'text-gray-400'}`}>
                                    ${request.price.toFixed(2)}
                                </span>
                            </div>

                            {/* Progress Bar for In Progress */}
                            {request.status === 'IN_PROGRESS' && (
                                <div className="mt-3 w-full bg-[#1e1e1e] h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${request.progress}%` }}></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServiceInbox;
