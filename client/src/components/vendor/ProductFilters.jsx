
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductFilters = ({ searchQuery, setSearchQuery, filterStatus, setFilterStatus }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                <div className="relative bg-[#121212] border border-[#1e1e1e] rounded-xl flex items-center px-4 py-3 focus-within:border-primary/50 transition-colors">
                    <Search size={18} className="text-gray-500 mr-3" />
                    <input
                        type="text"
                        placeholder="Search by name or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-500"
                    />
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="flex gap-4">
                <div className="relative min-w-[140px]">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Filter size={16} className="text-gray-500" />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full bg-[#121212] border border-[#1e1e1e] text-white text-sm rounded-xl pl-10 pr-4 py-3 appearance-none focus:outline-none focus:border-primary/50 cursor-pointer hover:bg-[#1a1a1a] transition-colors"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                        <option value="Stock Low">Low Stock</option>
                    </select>
                </div>

                <Link
                    to="/vendor/add-product"
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold font-sm flex items-center shadow-lg shadow-purple-900/20 whitespace-nowrap transition-all active:scale-95"
                >
                    + Add New Product
                </Link>
            </div>
        </div>
    );
};

export default ProductFilters;
