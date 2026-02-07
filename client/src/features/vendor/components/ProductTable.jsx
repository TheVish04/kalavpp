import React from 'react';
import { supabase } from '../../../api/supabase';
import { useToast } from '../../../store/ToastContext';
import { Edit2, Eye, Trash, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductTable = ({ products, onDelete }) => {
    const toast = useToast();

    // Helper for Type Pill
    const getTypeStyles = (category) => {
        if (category === 'Digital') return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
        return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
    };

    // Helper for Status Pill (Mock logic since DB might lack 'status' column yet)
    // Assuming if no explicit status, it's Active. 
    const getStatusInfo = (product) => {
        // Mock status logic based on quantity for demo
        if (product.quantity === 0) return { label: 'Out of Stock', color: 'text-red-500', dot: 'bg-red-500' };
        // Assuming status column functionality or default to Active
        const status = product.status || 'Active';

        switch (status) {
            case 'Draft': return { label: 'Draft', color: 'text-gray-400', dot: 'bg-gray-400' };
            default: return { label: 'Active', color: 'text-green-400', dot: 'bg-green-400' };
        }
    };

    const handleDelete = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            try {
                const { error } = await supabase.from('products').delete().eq('id', id);
                if (error) throw error;
                onDelete(id);
                toast.success('Product deleted successfully');
            } catch (error) {
                console.error('Error deleting:', error);
                toast.error('Failed to delete product.');
            }
        }
    };

    return (
        <div className="bg-[#121212] rounded-2xl border border-[#1e1e1e] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#1a1a1a] border-b border-[#1e1e1e]">
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Price</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Sales</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e1e1e]">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    No products found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => {
                                const statusInfo = getStatusInfo(product);
                                const imgPath = product.image_url || product.thumbnail || product.image;
                                const src = imgPath?.startsWith('http')
                                    ? imgPath
                                    : imgPath ? supabase.storage.from('products').getPublicUrl(imgPath).data.publicUrl : 'https://via.placeholder.com/80';

                                return (
                                    <tr key={product.id} className="group hover:bg-[#1a1a1a] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-[#2a2a2a] border border-[#333] overflow-hidden shrink-0">
                                                    <img src={src} alt={product.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-sm font-bold text-white truncate max-w-[200px]">{product.title}</h4>
                                                    <p className="text-[10px] text-gray-500 font-mono">SKU: KLV-{product.id.toString().slice(0, 4)}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getTypeStyles(product.category)}`}>
                                                {product.category || 'Physical'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-medium text-white">₹{(product.price || 0).toFixed(2)}</span>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm text-gray-400">{product.sales_count || 0}</span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`}></span>
                                                <span className={`text-xs font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 text-gray-500">
                                                <Link to={`/vendor/edit-product/${product.id}`} className="p-2 hover:bg-white/10 rounded-lg hover:text-white transition-colors" title="Edit">
                                                    <Edit2 size={16} />
                                                </Link>
                                                <Link to={`/product/${product.id}`} className="p-2 hover:bg-white/10 rounded-lg hover:text-white transition-colors" title="View Public Page">
                                                    <Eye size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.title)}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Mock Text */}
            <div className="p-4 border-t border-[#1e1e1e] flex justify-between items-center text-xs text-gray-500">
                <span>Showing 1 to {Math.min(products.length, 10)} of {products.length} results</span>
                <div className="flex gap-2">
                    <button disabled className="px-3 py-1 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] opacity-50 cursor-not-allowed">Previous</button>
                    <button disabled className="px-3 py-1 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] opacity-50 cursor-not-allowed">Next</button>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
