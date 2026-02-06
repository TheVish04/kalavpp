
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    Download,
    Briefcase,
    Settings,
    LogOut
} from 'lucide-react';

const DashboardSidebar = () => {
    const { user, signOut } = useAuth();

    // Default Avatar (Random abstract or initials)
    const avatarUrl = user?.user_metadata?.avatar_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.full_name || user?.email || 'User')}&background=random`;

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Orders', path: '/orders', icon: ShoppingBag },
        { name: 'My Downloads', path: '/downloads', icon: Download },
        { name: 'Commissions', path: '/commissions', icon: Briefcase },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <aside className="w-[280px] hidden md:flex flex-col h-screen fixed left-0 top-0 bg-[#121212]/95 backdrop-blur-xl border-r border-white/5 z-40">
            {/* Profile Section */}
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="relative group cursor-pointer">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-primary to-blue-500 opacity-75 blur group-hover:opacity-100 transition duration-200"></div>
                        <img
                            src={avatarUrl}
                            alt="User Profile"
                            className="relative h-12 w-12 rounded-full object-cover border-2 border-[#121212]"
                        />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h2 className="text-white text-base font-semibold leading-tight truncate">
                            {user?.user_metadata?.full_name || 'User'}
                        </h2>
                        <p className="text-gray-400 text-xs font-medium truncate">
                            {user?.email || '@user'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-primary/10 border border-primary/20 text-white'
                                : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'}
                        `}
                    >
                        <item.icon
                            size={20}
                            className={`transition-colors ${
                                // Actively handled by parent class text color rules, but explicit class logic helps
                                ''
                                }`}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 mt-auto border-t border-white/5">
                <button
                    onClick={async () => {
                        try {
                            await signOut();
                            window.location.href = '/login';
                        } catch (error) {
                            console.error('Logout failed:', error);
                        }
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors text-red-400 hover:text-red-300 group"
                >
                    <LogOut size={20} />
                    <span className="text-sm font-semibold">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
