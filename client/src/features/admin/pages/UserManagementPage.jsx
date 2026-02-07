
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../api/supabase';
import { Download, LayoutDashboard, Flag } from 'lucide-react';
import VendorApplicationCard from '../components/VendorApplicationCard';
import UserTable from '../components/UserTable';

const UserManagement = () => {

    // Tab State
    const [activeTab, setActiveTab] = useState('Applications'); // 'Applications' | 'Users'

    // Data State
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    // Mock Applications Data
    const [applications, setApplications] = useState([
        {
            id: 101,
            name: 'Elena Vance',
            avatar: 'https://ui-avatars.com/api/?name=Elena+Vance&background=random',
            location: 'Berlin, Germany',
            appliedTime: 'Applied 2 hours ago',
            portfolioLink: 'behance.net/elena',
            samples: [
                'https://source.unsplash.com/random/400x300?abstract,art&sig=1',
                'https://source.unsplash.com/random/400x300?painting&sig=2',
                'https://source.unsplash.com/random/400x300?sketch&sig=3'
            ]
        },
        {
            id: 102,
            name: 'Marcus Chen',
            avatar: 'https://ui-avatars.com/api/?name=Marcus+Chen&background=random',
            location: 'Toronto, Canada',
            appliedTime: 'Applied 5 hours ago',
            portfolioLink: 'artstation.com/marcus',
            samples: [
                'https://source.unsplash.com/random/400x300?3d,render&sig=4',
                'https://source.unsplash.com/random/400x300?landscape&sig=5',
                'https://source.unsplash.com/random/400x300?scifi&sig=6'
            ]
        }
    ]);

    // Fetch Users (Effect)
    useEffect(() => {
        if (activeTab === 'Users') {
            fetchUsers();
        }
    }, [activeTab]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Seed if empty for visualization during development
            if (!data || data.length === 0) {
                setUsers([
                    { id: 1, full_name: 'John Doe', email: 'john@example.com', role: 'customer', created_at: new Date(), banned: false },
                    { id: 2, full_name: 'Sarah Smith', email: 'sarah@art.com', role: 'vendor', created_at: new Date('2023-09-12'), banned: false },
                    { id: 3, full_name: 'Alex Admin', email: 'admin@kalavpp.com', role: 'admin', created_at: new Date('2023-01-01'), banned: false },
                ]);
            } else {
                setUsers(data);
            }

        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Actions
    const handleApprove = (id, name) => {
        alert(`Approved ${name} as a Vendor!`);
        setApplications(prev => prev.filter(app => app.id !== id));
    };

    const handleReject = (id) => {
        if (window.confirm('Reject this application?')) {
            setApplications(prev => prev.filter(app => app.id !== id));
        }
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-display p-6 md:p-12">

            {/* Header */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">
                        <span className="flex items-center gap-1"><LayoutDashboard size={14} /> Admin</span>
                        <span>/</span>
                        <span>Users</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">User Administration</h1>
                    <p className="text-gray-400 text-sm max-w-2xl">
                        Manage platform access, review creator applications, and oversee user roles within the ArtCommerce ecosystem.
                    </p>
                </div>

                <button className="bg-[#1a1a1a] border border-[#333] hover:bg-[#252525] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                    <Download size={16} />
                    Export Report
                </button>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto mb-8 border-b border-[#2a2a2a]">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('Applications')}
                        className={`pb-4 text-sm font-bold relative transition-colors ${activeTab === 'Applications' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        Vendor Applications
                        {applications.length > 0 && (
                            <span className="ml-2 bg-[#8c25f4] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                {applications.length}
                            </span>
                        )}
                        {activeTab === 'Applications' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8c25f4]"></div>
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab('Users')}
                        className={`pb-4 text-sm font-bold relative transition-colors ${activeTab === 'Users' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        All Users
                        {activeTab === 'Users' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8c25f4]"></div>
                        )}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                {activeTab === 'Applications' ? (
                    <div className="space-y-4">
                        {applications.length === 0 ? (
                            <div className="py-20 text-center text-gray-500 border border-dashed border-[#2a2a2a] rounded-2xl bg-[#121212]">
                                <Flag size={48} className="mx-auto mb-4 opacity-20" />
                                <p>All caught up! No pending applications.</p>
                            </div>
                        ) : (
                            applications.map(app => (
                                <VendorApplicationCard
                                    key={app.id}
                                    applicant={app}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                />
                            ))
                        )}
                    </div>
                ) : (
                    <UserTable
                        users={users}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                )}
            </div>

        </div>
    );
};

export default UserManagement;
