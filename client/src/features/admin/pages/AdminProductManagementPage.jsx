import React, { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabase';
import AdminSidebar from '../components/AdminSidebar';
import ProductTable from '../../vendor/components/ProductTable';

const AdminProductManagementPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*, profiles(full_name)')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setProducts((data || []).map(p => ({ ...p, sales_count: 0 })));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = (p.title || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'All' ? true : (p.status || 'Active') === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-display flex overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto custom-scrollbar p-4 md:p-8 lg:p-12">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Product Management</h1>
                <p className="text-gray-400 text-sm mb-8">Manage all products across the platform.</p>
                <div className="flex flex-wrap gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white text-sm w-64"
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    >
                        <option>All</option>
                        <option>Active</option>
                        <option>Draft</option>
                    </select>
                </div>
                {loading ? (
                    <div className="py-20 text-center text-gray-500">Loading...</div>
                ) : (
                    <ProductTable products={filteredProducts} onDelete={(id) => setProducts(prev => prev.filter(p => p.id !== id))} />
                )}
            </main>
        </div>
    );
};

export default AdminProductManagementPage;
