import React, { useState, useEffect } from 'react';
import { supabase } from '../../../api/supabase';
import AdminSidebar from '../components/AdminSidebar';

const ModerationPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('products').select('id, title, image_url, category, user_id, created_at').order('created_at', { ascending: false })
            .then(({ data }) => { setItems(data || []); })
            .catch(() => setItems([]))
            .finally(() => setLoading(false));
    }, []);

    const handleApprove = (id) => {
        supabase.from('products').update({ status: 'approved' }).eq('id', id).then(() => {
            setItems(prev => prev.filter(p => p.id !== id));
        });
    };

    const handleReject = (id) => {
        supabase.from('products').update({ status: 'rejected' }).eq('id', id).then(() => {
            setItems(prev => prev.filter(p => p.id !== id));
        });
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-display flex overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto custom-scrollbar p-6 md:p-10">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Art Moderation</h1>
                <p className="text-gray-400 text-sm mb-8">Review and moderate submitted artwork.</p>
                {loading ? (
                    <div className="text-gray-500">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="glass-panel p-8 rounded-2xl border border-white/5"><p className="text-gray-500">No items in moderation queue.</p></div>
                ) : (
                    <div className="grid gap-4">
                        {items.slice(0, 20).map(p => (
                            <div key={p.id} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-4">
                                <img src={p.image_url || 'https://via.placeholder.com/80'} alt="" className="w-20 h-20 object-cover rounded-lg" />
                                <div className="flex-1"><p className="font-bold text-white">{p.title}</p><p className="text-gray-500 text-sm">{p.category}</p></div>
                                <button onClick={() => handleApprove(p.id)} className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-bold">Approve</button>
                                <button onClick={() => handleReject(p.id)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-bold">Reject</button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ModerationPage;
