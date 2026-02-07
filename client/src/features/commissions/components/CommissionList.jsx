
import React from 'react';
import { Circle, User } from 'lucide-react';

const CommissionList = ({ projects, activeProjectId, onSelectProject }) => {

    const getStatusStyle = (status) => {
        // Simplified mapping assuming steps map to general statuses
        if (status === 'Delivery' || status === 'Completed') return 'bg-green-500/10 text-green-400 border-green-500/20';
        if (status.includes('Review')) return 'bg-purple-500/10 text-primary border-purple-500/20';
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    };

    return (
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/5 bg-[#121212] flex flex-col md:h-full">
            <div className="p-4 md:p-6 border-b border-white/5">
                <h2 className="text-white font-bold text-lg">Active Requests</h2>
                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Filter projects..."
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-x-auto md:overflow-y-auto custom-scrollbar flex md:flex-col p-2 gap-2">
                {projects.map((project) => {
                    const isActive = project.id === activeProjectId;
                    const style = getStatusStyle(project.status);

                    return (
                        <div
                            key={project.id}
                            onClick={() => onSelectProject(project.id)}
                            className={`
                                min-w-[260px] md:min-w-0 p-3 rounded-xl cursor-pointer border transition-all duration-200
                                ${isActive
                                    ? 'bg-[#1e1e1e] border-primary/30 shadow-[inset_0_0_20px_rgba(140,37,244,0.05)]'
                                    : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'}
                            `}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative shrink-0">
                                    <img
                                        src={project.artistAvatar}
                                        alt={project.artistName}
                                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                                    />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121212]"></div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h3 className={`font-bold text-sm truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                            {project.title}
                                        </h3>
                                        {/* Status Badge */}
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${style}`}>
                                            {project.status === 'Sketch Review' ? 'REVIEW' : 'ACTIVE'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate mb-2">Artist: {project.artistName}</p>
                                    <p className="text-[10px] text-gray-600">Last updated: {project.lastUpdate}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CommissionList;
