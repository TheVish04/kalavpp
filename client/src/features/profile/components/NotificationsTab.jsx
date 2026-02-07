import React, { useState } from 'react';
import { supabase } from '../../../api/supabase';
import { useAuth } from '../../../store/AuthContext';
import { useToast } from '../../../store/ToastContext';
import { Bell, Mail } from 'lucide-react';

const NotificationsTab = () => {
    const { user } = useAuth();
    const toast = useToast();
    const [emailOrders, setEmailOrders] = useState(true);
    const [emailMarketing, setEmailMarketing] = useState(false);

    const handleSave = async () => {
        try {
            const { error } = await supabase.from('profiles').upsert({
                id: user.id,
                notify_orders: emailOrders,
                notify_marketing: emailMarketing,
                updated_at: new Date(),
            });
            if (error) throw error;
            toast.success('Notification preferences saved.');
        } catch (err) {
            toast.error('Failed to save.');
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6 max-w-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><Bell size={20} /> Notifications</h3>
            <div className="space-y-4">
                <label className="flex items-center justify-between p-4 rounded-xl bg-[#1a1a1a] border border-white/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <Mail size={20} className="text-gray-400" />
                        <div>
                            <p className="text-white font-medium">Order updates</p>
                            <p className="text-gray-500 text-sm">Shipping and delivery notifications</p>
                        </div>
                    </div>
                    <input type="checkbox" checked={emailOrders} onChange={(e) => setEmailOrders(e.target.checked)} className="rounded" />
                </label>
                <label className="flex items-center justify-between p-4 rounded-xl bg-[#1a1a1a] border border-white/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <Bell size={20} className="text-gray-400" />
                        <div>
                            <p className="text-white font-medium">Marketing</p>
                            <p className="text-gray-500 text-sm">Promotions and new arrivals</p>
                        </div>
                    </div>
                    <input type="checkbox" checked={emailMarketing} onChange={(e) => setEmailMarketing(e.target.checked)} className="rounded" />
                </label>
            </div>
            <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm">Save preferences</button>
        </div>
    );
};

export default NotificationsTab;
