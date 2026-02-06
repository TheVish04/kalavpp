
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Briefcase,
    DollarSign,
    Settings,
    Plus
} from 'lucide-react';

const VendorSidebar = () => {
    const navItems = [
        { name: 'Overview', path: '/vendor/dashboard', icon: LayoutDashboard },
        { name: 'My Products', path: '/vendor/products', icon: Package },
        { name: 'Commissions', path: '/vendor/commissions', icon: Briefcase, badge: 1 },
        { name: 'Payouts', path: '/vendor/payouts', icon: DollarSign },
        { name: 'Settings', path: '/vendor/settings', icon: Settings },
    ];

    return (
        <aside className="w-[280px] hidden md:flex flex-col h-screen fixed left-0 top-0 bg-[#0a0a0a] border-r border-[#1e1e1e] z-40">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(140,37,244,0.3)]">
                    <span className="material-symbols-outlined text-white text-lg font-bold">palette</span>
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">Kalavpp</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2 p-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-[#1a1a1a] text-white border border-[#2a2a2a]'
                                : 'text-gray-500 hover:text-white hover:bg-[#121212] border border-transparent'}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={20} className="group-hover:text-primary transition-colors" />
                            <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        {item.badge && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {item.badge}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* CTA */}
            <div className="p-4 mt-auto border-t border-[#1e1e1e]">
                <Link
                    to="/vendor/add-product"
                    className="flex w-full items-center justify-center gap-2 bg-[#8c25f4] hover:bg-[#7015d0] text-white px-4 py-3 rounded-xl font-bold shadow-lg shadow-purple-900/20 transition-all active:scale-95"
                >
                    <Plus size={20} />
                    <span>Upload New</span>
                </Link>
            </div>
        </aside>
    );
};

export default VendorSidebar;
