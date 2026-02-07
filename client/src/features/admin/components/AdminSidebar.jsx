
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutGrid,
    Users,
    Palette,
    DollarSign,
    Activity,
    Tag
} from 'lucide-react';
import { useAuth } from '../../../store/AuthContext';

const AdminSidebar = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Platform Overview', path: '/admin/dashboard', icon: LayoutGrid },
        { name: 'User Management', path: '/admin/users', icon: Users },
        { name: 'Categories', path: '/admin/categories', icon: Tag },
        { name: 'Art Moderation', path: '/admin/moderation', icon: Palette },
        { name: 'Financials', path: '/admin/financials', icon: DollarSign },
        { name: 'System Health', path: '/admin/system', icon: Activity },
    ];

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/auth');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <aside className="w-[280px] hidden md:flex flex-col h-screen fixed left-0 top-0 bg-[#0a0a0a] border-r border-[#1e1e1e] z-50">
            {/* Header */}
            <div className="p-6">
                <h1 className="text-xl font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-1">Admin Core</h1>
                <h2 className="text-base font-bold text-white tracking-wide">KALAVPP ADMIN</h2>
            </div>

            {/* Nav */}
            <nav className="flex-1 flex flex-col gap-1 p-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-[#8c25f4] text-white shadow-lg shadow-purple-900/20'
                                : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}
                        `}
                    >
                        <item.icon size={20} />
                        <span className="text-sm font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User Footer */}
            <div className="p-4 border-t border-[#1e1e1e] mt-auto">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#1a1a1a] cursor-pointer transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                        AD
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-white">Admin User</h4>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400">Super Admin</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full text-left text-xs text-red-500 hover:text-red-400 font-bold mt-2 pl-2"
                >
                    Log Out
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
