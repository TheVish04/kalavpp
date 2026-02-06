
import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/customer/DashboardSidebar';
import CommissionList from '../../components/commissions/CommissionList';
import CommissionChat from '../../components/commissions/CommissionChat';

const MyCommissions = () => {
    // 1. Initial State Data
    const [projects, setProjects] = useState([
        {
            id: 4829,
            title: 'Cyberpunk Portrait for Alex',
            artistName: 'Vex',
            artistAvatar: 'https://ui-avatars.com/api/?name=Vex&background=random',
            status: 'Sketch Review',
            lastUpdate: '2m ago'
        },
        {
            id: 4830,
            title: 'Fantasy Landscape',
            artistName: 'Sol',
            artistAvatar: 'https://ui-avatars.com/api/?name=Sol&background=random',
            status: 'Request Sent',
            lastUpdate: '1d ago'
        },
        {
            id: 4831,
            title: 'Mecha Concept Art',
            artistName: 'Kai',
            artistAvatar: 'https://ui-avatars.com/api/?name=Kai&background=random',
            status: 'Final Polish',
            lastUpdate: '3d ago'
        }
    ]);

    const [activeProjectId, setActiveProjectId] = useState(4829);

    const [messages, setMessages] = useState({
        4829: [
            { id: 1, sender: 'artist', text: "Hey Alex! 👋 I've put together the initial sketch based on your references. I focused on getting that gritty cyberpunk atmosphere you mentioned. Let me know if the composition works for you!", timestamp: '10:24 AM', image: 'https://images.unsplash.com/photo-1620641785892-4919a79051fb?auto=format&fit=crop&w=800&q=80' },
        ],
        4830: [
            { id: 1, sender: 'me', text: "Hi Sol, looking for a high-fantasy landscape with floating islands. Attached some moodboards.", timestamp: 'Yesterday' }
        ],
        4831: [
            { id: 1, sender: 'artist', text: "Polishing the textures now. Should be ready for final handover tomorrow.", timestamp: 'Monday' }
        ]
    });

    const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

    // 2. Actions
    const handleSendMessage = (projectId, text) => {
        const newMessage = {
            id: Date.now(),
            sender: 'me',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => ({
            ...prev,
            [projectId]: [...(prev[projectId] || []), newMessage]
        }));

        // Mock Auto-Reply
        setTimeout(() => {
            const reply = {
                id: Date.now() + 1,
                sender: 'artist',
                text: "Thanks! I'll get to work on that right away.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => ({
                ...prev,
                [projectId]: [...(prev[projectId] || []), reply]
            }));
        }, 1500);
    };

    const handleApprove = (projectId) => {
        // Logic: Move to next status step
        const steps = ['Request Sent', 'Deposit Paid', 'Sketch Review', 'Final Polish', 'Delivery'];

        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const currentIndex = steps.indexOf(p.status);
                const nextStatus = steps[currentIndex + 1] || 'Completed';

                // Add system message about approval
                const systemMsg = {
                    id: Date.now(),
                    sender: 'artist', // functionally acting as system/artist feedback
                    text: `✅ Milestone Approved! Moving to ${nextStatus}.`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                setMessages(m => ({
                    ...m,
                    [projectId]: [...(m[projectId] || []), systemMsg]
                }));

                return { ...p, status: nextStatus, lastUpdate: 'Just now' };
            }
            return p;
        }));

        alert("Milestone Approved! Project status updated."); // Simple feedback
    };

    const handleRequestRevision = (projectId) => {
        const feedback = window.prompt("What needs fixing?");
        if (feedback) {
            handleSendMessage(projectId, `[Revision Request]: ${feedback}`);
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen text-white font-display flex overflow-hidden">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <main className="flex-1 md:ml-[280px] h-screen flex flex-col md:flex-row overflow-hidden relative z-10">

                {/* List Sidebar (Mobile: Top Scroll, Desktop: Left Col) */}
                <CommissionList
                    projects={projects}
                    activeProjectId={activeProjectId}
                    onSelectProject={setActiveProjectId}
                />

                {/* Chat Interface */}
                <CommissionChat
                    project={activeProject}
                    messages={messages[activeProjectId] || []}
                    onSendMessage={handleSendMessage}
                    onApprove={handleApprove}
                    onRequestRevision={handleRequestRevision}
                />

            </main>
        </div>
    );
};

export default MyCommissions;
