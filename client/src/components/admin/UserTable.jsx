
import React from 'react';
import { Search, MoreVertical, Shield, User, Sparkles } from 'lucide-react';

const UserTable = ({ users, searchQuery, setSearchQuery }) => {

    // Status Dot logic
    const getStatusColor = (status) => {
        return status === 'Banned' ? 'bg-red-500' : 'bg-green-500';
    };

    // Role Pill logic
    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin':
                return { label: 'Admin', icon: Shield, style: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' };
            case 'vendor':
            case 'creator':
                return { label: 'Creator', icon: Sparkles, style: 'bg-purple-500/10 text-purple-500 border-purple-500/20' };
            default:
                return { label: 'Customer', icon: User, style: 'bg-blue-500/10 text-blue-500 border-blue-500/20' };
        }
    };

    // Filter Logic
    const filteredUsers = users.filter(u =>
        (u.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden mt-6">

            {/* Toolbar */}
            <div className="p-4 border-b border-[#2a2a2a] flex justify-between items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search by email, name, or UUID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#121212] border border-[#333] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 placeholder-gray-600"
                    />
                </div>

                <div className="flex gap-2">
                    <select className="bg-[#121212] text-gray-400 text-xs font-bold border border-[#333] rounded-lg px-3 py-2 outline-none cursor-pointer">
                        <option>All Roles</option>
                        <option>Creators</option>
                        <option>Customers</option>
                    </select>
                    <select className="bg-[#121212] text-gray-400 text-xs font-bold border border-[#333] rounded-lg px-3 py-2 outline-none cursor-pointer">
                        <option>Status: All</option>
                        <option>Active</option>
                        <option>Banned</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#151515]">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Joined Date</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2a2a]">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500 text-sm">
                                    No users found matching query.
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => {
                                const role = getRoleBadge(user.role); // Assuming role column exists or metadata matches
                                const joined = new Date(user.created_at).toLocaleDateString();
                                const status = user.banned ? 'Banned' : 'Active';

                                return (
                                    <tr key={user.id} className="group hover:bg-[#202020] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                                    {(user.full_name?.[0] || 'U').toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white">{user.full_name || 'Anonymous'}</p>
                                                    <p className="text-xs text-gray-500">{user.email || 'No Email'}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${role.style}`}>
                                                <role.icon size={10} /> {role.label}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(status)}`}></span>
                                                <span className="text-xs text-gray-300 font-medium">{status}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                                            {joined}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1.5 hover:bg-[#333] rounded-lg text-gray-500 hover:text-white transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
