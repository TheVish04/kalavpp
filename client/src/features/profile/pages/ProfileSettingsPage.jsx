
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../api/supabase';
import { useAuth } from '../../../store/AuthContext';
import DashboardSidebar from '../components/DashboardSidebar';
import AvatarUpload from '../components/AvatarUpload';
import ProfileForm from '../components/ProfileForm';

const ProfileSettings = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('Profile');

    useEffect(() => {
        let ignore = false;
        async function getProfile() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select(`username, website, avatar_url, full_name, bio`)
                    .eq('id', user.id)
                    .single();

                if (!ignore && data) {
                    setProfile(data);
                } else if (error && error.code !== 'PGRST116') {
                    // Ignore "Row not found" (first login)
                    console.warn(error);
                }
            } catch (error) {
                console.error('Error loading user data!', error);
            } finally {
                setLoading(false);
            }
        }

        if (user) getProfile();

        return () => {
            ignore = true;
        };
    }, [user]);

    // Handle Upload Completion
    const handleAvatarUpload = async (event, filePath) => {
        const { error } = await supabase.from('profiles').upsert({
            id: user.id,
            avatar_url: filePath,
            updated_at: new Date(),
        });

        if (error) {
            alert(error.message);
        } else {
            // Get public URL to update local state immediately
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            setProfile(prev => ({ ...prev, avatar_url: filePath }));
            alert('Avatar updated!');
        }
    };

    // Helper to get image source
    const getAvatarSrc = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl;
    };

    const tabs = ['Profile', 'Security', 'Addresses', 'Notifications'];

    if (loading) {
        return (
            <div className="bg-[#121212] min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#121212] min-h-screen text-white font-display flex overflow-hidden">
            {/* Sidebar */}
            <DashboardSidebar />

            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto relative z-10 px-4 md:px-12 py-12 custom-scrollbar">

                {/* Header & Tabs */}
                <div className="max-w-4xl mx-auto mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Account Settings</h1>
                    <p className="text-[#a1a1aa] mb-8">Manage your profile details and personal preferences.</p>

                    <div className="flex items-center gap-8 border-b border-white/10">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab
                                        ? 'text-white'
                                        : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8c25f4] rounded-t-full shadow-[0_-2px_10px_rgba(140,37,244,0.5)]"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-4xl mx-auto relative">

                    {activeTab === 'Profile' && (
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 animate-in fade-in duration-500 slide-in-from-bottom-2">

                            {/* Left: Avatar */}
                            <div className="shrink-0 flex justify-center lg:justify-start">
                                <AvatarUpload
                                    url={getAvatarSrc(profile?.avatar_url)}
                                    onUpload={handleAvatarUpload}
                                    fullName={profile?.full_name}
                                    username={profile?.username}
                                />
                            </div>

                            {/* Right: Form */}
                            <div className="flex-1">
                                <ProfileForm
                                    user={user}
                                    profile={profile || {}}
                                    setProfile={setProfile}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab !== 'Profile' && (
                        <div className="py-20 text-center text-gray-500 border border-dashed border-white/10 rounded-3xl bg-[#1e1e1e]/20">
                            <h3 className="text-xl font-bold text-gray-400">Coming Soon</h3>
                            <p className="text-sm">The {activeTab} settings are under development.</p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default ProfileSettings;
