
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../api/supabase';
import { Lock, User, Mail, Globe, Save } from 'lucide-react';

const ProfileForm = ({ user, profile, setProfile }) => {
    const [loading, setLoading] = useState(false);
    const [originalProfile, setOriginalProfile] = useState(null);

    useEffect(() => {
        if (profile) setOriginalProfile(profile);
    }, [profile]); // Set original once profile loads, update if it changes from outside

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const updates = {
                id: user.id,
                full_name: profile.full_name,
                username: profile.username,
                bio: profile.bio,
                website: profile.website,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;

            setOriginalProfile(profile); // Sync state on success
            alert('Profile updated successfully!'); // Mock toast
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile!');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (originalProfile) {
            setProfile(originalProfile);
        }
    };

    if (!profile) return null;

    return (
        <div className="w-full max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative flex items-center">
                        <User size={18} className="absolute left-3.5 text-gray-500 z-10" />
                        <input
                            type="text"
                            name="full_name"
                            value={profile.full_name || ''}
                            onChange={handleChange}
                            className="w-full bg-[#1a1a1a] text-white text-sm rounded-xl pl-10 pr-4 py-3 border border-white/5 focus:border-primary/50 focus:bg-[#1e1e1e] focus:outline-none transition-all placeholder-gray-600"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Username</label>
                    <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-gray-500 text-sm font-bold">@</span>
                        <input
                            type="text"
                            name="username"
                            value={profile.username || ''}
                            onChange={handleChange}
                            className="w-full bg-[#1a1a1a] text-white text-sm rounded-xl pl-8 pr-4 py-3 border border-white/5 focus:border-primary/50 focus:bg-[#1e1e1e] focus:outline-none transition-all placeholder-gray-600"
                            placeholder="username"
                        />
                    </div>
                </div>
            </div>

            {/* Email - Locked */}
            <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <span className="px-1.5 py-0.5 rounded-sm bg-yellow-500/20 text-yellow-500 text-[9px] font-bold border border-yellow-500/30">VERIFIED</span>
                </div>

                <div className="relative flex items-center opacity-60">
                    <Lock size={16} className="absolute left-3.5 text-gray-500 z-10" />
                    <input
                        type="text"
                        value={user?.email || ''}
                        disabled
                        className="w-full bg-[#1a1a1a] text-gray-400 text-sm rounded-xl pl-10 pr-16 py-3 border border-white/5 cursor-not-allowed"
                    />
                    <span className="absolute right-4 text-xs font-bold text-gray-600 uppercase tracking-wide">Locked</span>
                </div>
                <p className="text-[10px] text-gray-600 pl-1">Contact support to update your email address.</p>
            </div>

            {/* Bio */}
            <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bio</label>
                <div className="relative">
                    <textarea
                        name="bio"
                        value={profile.bio || ''}
                        onChange={(e) => {
                            if (e.target.value.length <= 300) handleChange(e);
                        }}
                        rows={4}
                        className="w-full bg-[#1a1a1a] text-white text-sm rounded-xl p-4 border border-white/5 focus:border-primary/50 focus:bg-[#1e1e1e] focus:outline-none transition-all placeholder-gray-600 resize-none"
                        placeholder="Tell us a little about yourself..."
                    ></textarea>
                    <div className="absolute bottom-3 right-3 text-[10px] text-gray-500 font-mono">
                        {(profile.bio || '').length}/300 characters
                    </div>
                </div>
                <p className="text-[10px] text-gray-600 pl-1">Markdown supported</p>
            </div>

            {/* Portfolio URL */}
            <div className="space-y-2 mb-10">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Portfolio URL</label>
                <div className="relative flex items-center">
                    <Globe size={18} className="absolute left-3.5 text-gray-500 z-10" />
                    <input
                        type="url"
                        name="website"
                        value={profile.website || ''}
                        onChange={handleChange}
                        className="w-full bg-[#1a1a1a] text-white text-sm rounded-xl pl-10 pr-4 py-3 border border-white/5 focus:border-primary/50 focus:bg-[#1e1e1e] focus:outline-none transition-all placeholder-gray-600"
                        placeholder="https://your-portfolio.com"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-8">
                <button
                    onClick={handleCancel}
                    className="text-sm font-bold text-gray-400 hover:text-white px-4 py-2 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-[#8c25f4] hover:bg-[#7015d0] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    <span>Save Changes</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileForm;
