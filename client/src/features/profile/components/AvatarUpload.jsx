import React, { useState } from 'react';
import { supabase } from '../../../api/supabase';
import { useToast } from '../../../store/ToastContext';
import { Camera, User, Loader2 } from 'lucide-react';

const AvatarUpload = ({ url, onUpload, fullName, username }) => {
    const toast = useToast();
    const [uploading, setUploading] = useState(false);

    const uploadAvatar = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            onUpload(event, filePath);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    // Derived Display Logic
    const displayText = fullName || 'User';
    const displayHandle = username ? `@${username}` : '@username';

    return (
        <div className="flex flex-col items-center">
            <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#1e1e1e] shadow-2xl bg-[#121212] relative">
                    {uploading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                            <Loader2 size={32} className="animate-spin text-white" />
                        </div>
                    ) : null}

                    {url ? (
                        <img
                            src={url}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1e1e1e] text-gray-600">
                            <User size={48} />
                        </div>
                    )}
                </div>

                {/* Hover Edit Overlay (Optional Polish) */}
                <div className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full border-4 border-[#0a0a0a] shadow-lg">
                    <Camera size={16} />
                </div>
            </div>

            <div className="text-center mt-4 mb-6">
                <h2 className="text-xl font-bold text-white">{displayText}</h2>
                <p className="text-sm text-gray-500">{displayHandle}</p>
            </div>

            <div className="relative overflow-hidden w-full max-w-[150px]">
                <button
                    disabled={uploading}
                    className="w-full bg-[#1e1e1e] hover:bg-[#2a2a2a] text-white text-xs font-bold py-2 px-4 rounded-lg border border-white/10 transition-colors disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Change Picture'}
                </button>
                <input
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default AvatarUpload;
