import React, { useState, useEffect } from 'react';
import { supabase } from '../../../api/supabase';
import AdminSidebar from '../components/AdminSidebar';

const SystemHealthPage = () => {
    const [dbOk, setDbOk] = useState(false);

    useEffect(() => {
        supabase.from('profiles').select('id').limit(1).then(({ error }) => setDbOk(!error)).catch(() => setDbOk(false));
    }, []);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-display flex overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto custom-scrollbar p-6 md:p-10">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">System Health</h1>
                <p className="text-gray-400 text-sm mb-8">API status, database, and service health.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${dbOk ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                            <p className="font-bold text-white">Database</p>
                            <p className="text-gray-500 text-sm">{dbOk ? 'Connected' : 'Disconnected'}</p>
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full bg-green-500" />
                        <div>
                            <p className="font-bold text-white">Supabase</p>
                            <p className="text-gray-500 text-sm">Connected</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SystemHealthPage;
