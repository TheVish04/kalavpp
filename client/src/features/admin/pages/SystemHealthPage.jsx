
import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

const SystemHealthPage = () => (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-display flex overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto custom-scrollbar p-6 md:p-10">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">System Health</h1>
            <p className="text-gray-400 text-sm">API status, database, and service health.</p>
            <div className="mt-8 glass-panel p-8 rounded-2xl border border-white/5">
                <p className="text-gray-500">System health dashboard coming soon.</p>
            </div>
        </main>
    </div>
);

export default SystemHealthPage;
