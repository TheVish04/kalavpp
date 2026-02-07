
import React, { useState } from 'react';
import VendorSidebar from '../components/VendorSidebar';
import ServiceInbox from '../components/ServiceInbox';
import ServiceDetail from '../components/ServiceDetail';

const ServiceManager = () => {
    // 1. Initial Mock Data
    const [requests, setRequests] = useState([
        {
            id: 1,
            clientName: 'Alex Doe',
            avatar: 'https://ui-avatars.com/api/?name=Alex+Doe&background=random',
            serviceType: 'Oil Portrait',
            message: "Hi! I love your work. I was wondering if you could paint my D&D character, Elara. She is a High Elf rogue with a mysterious past...",
            status: 'NEW',
            price: 450.00,
            timeAgo: '2 mins ago',
            deadline: 'Oct 24, 2026',
            progress: 0,
            currentPhase: 'Initial Review'
        },
        {
            id: 2,
            clientName: 'Sarah J.',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+J&background=random',
            serviceType: 'Character Design',
            message: "Need a comprehensive character sheet for my upcoming graphic novel protagonist.",
            status: 'IN_PROGRESS',
            price: 800.00,
            timeAgo: '3 hrs ago',
            deadline: 'Nov 01, 2026',
            progress: 25,
            currentPhase: 'Sketch'
        },
        {
            id: 3,
            clientName: 'Mike T.',
            avatar: 'https://ui-avatars.com/api/?name=Mike+T&background=random',
            serviceType: 'Landscape Concept',
            message: "Looking for 3 variations of a sci-fi city skyline at sunset.",
            status: 'CLOSED',
            price: 300.00,
            timeAgo: '2 days ago',
            deadline: 'Oct 10, 2026',
            progress: 100,
            currentPhase: 'Delivered'
        }
    ]);

    const [selectedRequestId, setSelectedRequestId] = useState(1);

    // Derived State
    const selectedRequest = requests.find(r => r.id === selectedRequestId);

    // 2. Handlers
    const handleUpdateStatus = (id, newStatus) => {
        setRequests(prev => prev.map(req => {
            if (req.id === id) {
                // If accepting, set initial defaults for tracker
                const updates = { status: newStatus };
                if (newStatus === 'IN_PROGRESS') {
                    updates.currentPhase = 'Sketch';
                    updates.progress = 25;
                }
                return { ...req, ...updates };
            }
            return req;
        }));
    };

    const handleUpdateProgress = (id, phase, progressVal) => {
        setRequests(prev => prev.map(req => {
            if (req.id === id) {
                return { ...req, currentPhase: phase, progress: progressVal };
            }
            return req;
        }));
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-display flex overflow-hidden">
            {/* Sidebar (App Nav) */}
            <VendorSidebar />

            {/* Main Content Area (Split View) */}
            <main className="flex-1 md:ml-[280px] h-screen flex flex-col md:flex-row overflow-hidden relative z-10">

                {/* Left: Inbox List */}
                <ServiceInbox
                    requests={requests}
                    selectedId={selectedRequestId}
                    onSelect={setSelectedRequestId}
                />

                {/* Right: Detailed View */}
                {/* On mobile, we might toggle visibility, but for now stack or assume desktop focus for robust dashboard */}
                <div className="hidden md:block flex-1 border-l border-[#1e1e1e] h-full relative">
                    <ServiceDetail
                        request={selectedRequest}
                        onUpdateStatus={handleUpdateStatus}
                        onUpdateProgress={handleUpdateProgress}
                    />
                </div>

                {/* Mobile View Handling (Simplified overlay) */}
                <div className={`md:hidden fixed inset-0 z-50 bg-[#0a0a0a] transition-transform duration-300 ${selectedRequestId ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="h-full flex flex-col">
                        <button onClick={() => setSelectedRequestId(null)} className="p-4 text-gray-400 flex items-center gap-2 border-b border-[#1e1e1e]">
                            ← Back to Inbox
                        </button>
                        <ServiceDetail
                            request={selectedRequest}
                            onUpdateStatus={handleUpdateStatus}
                            onUpdateProgress={handleUpdateProgress}
                        />
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ServiceManager;
