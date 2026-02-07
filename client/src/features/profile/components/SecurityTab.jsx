import React from 'react';
import { useAuth } from '../../../store/AuthContext';
import { useToast } from '../../../store/ToastContext';
import { Lock, Shield, Key } from 'lucide-react';

const SecurityTab = () => {
    const { user } = useAuth();
    const toast = useToast();

    const handleChangePassword = () => {
        toast.info('Use the Forgot Password link on the login page to reset your password.');
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6 max-w-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><Shield size={20} /> Security</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#1a1a1a] border border-white/5">
                    <div className="flex items-center gap-3">
                        <Lock size={20} className="text-gray-400" />
                        <div>
                            <p className="text-white font-medium">Password</p>
                            <p className="text-gray-500 text-sm">Last updated via email link</p>
                        </div>
                    </div>
                    <button onClick={handleChangePassword} className="text-primary hover:text-white text-sm font-bold">Change</button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#1a1a1a] border border-white/5">
                    <div className="flex items-center gap-3">
                        <Key size={20} className="text-gray-400" />
                        <div>
                            <p className="text-white font-medium">Email</p>
                            <p className="text-gray-500 text-sm">{user?.email}</p>
                        </div>
                    </div>
                    <span className="text-gray-600 text-xs">Contact support to change</span>
                </div>
            </div>
        </div>
    );
};

export default SecurityTab;
