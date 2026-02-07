
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../api/supabase';
import { LayoutGrid, Plus, Search, Loader2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import CategoryCard from '../components/CategoryCard';
import CategoryModal from '../components/CategoryModal';

const CategoryManagement = () => {
    // State
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // Null = Create Mode

    // Fetch Categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setCategories(data);
            } else if (!data || data.length === 0) {
                // Mock Data if empty
                setCategories([
                    { id: 1, name: 'Surrealism', slug: 'surrealism', image_url: 'https://source.unsplash.com/random/800x400?surreal', description: 'Unlock the power of dreams and the unconscious.' },
                    { id: 2, name: 'Digital Landscapes', slug: 'digital-landscapes', image_url: 'https://source.unsplash.com/random/800x400?landscape,digital', description: 'Breathtaking virtual worlds and environments.' },
                    { id: 3, name: 'Tribal Art', slug: 'tribal-art', image_url: 'https://source.unsplash.com/random/800x400?face,art', description: 'Traditional patterns meeting modern aesthetics.' },
                ]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handlers
    const handleOpenCreate = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleSave = async (categoryData, id) => {
        // Optimistic UI Update (or re-fetch)
        if (id) {
            // Update
            const { error } = await supabase
                .from('categories')
                .update(categoryData)
                .eq('id', id);
            if (error) alert('Error updating category');
        } else {
            // Insert
            const { error } = await supabase
                .from('categories')
                .insert([categoryData]);
            if (error) alert('Error creating category');
        }

        await fetchCategories(); // Refresh grid
    };

    // Filter
    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-display flex overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar />

            <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto custom-scrollbar p-6 md:p-10">

                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">
                            <span className="flex items-center gap-1"><LayoutGrid size={14} /> Admin</span>
                            <span>/</span>
                            <span>Taxonomy</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Category Management</h1>
                        <p className="text-gray-400 text-sm max-w-2xl">
                            Organize platform taxonomy, manage visual covers, and SEO settings for art categories.
                        </p>
                    </div>

                    <button
                        onClick={handleOpenCreate}
                        className="bg-[#2d1b4e] hover:bg-[#3c2363] text-[#a78bfa] border border-[#a78bfa]/20 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
                    >
                        <Plus size={18} />
                        Create Category
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md mb-8">
                    <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#121212] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8c25f4]/50 transition-colors placeholder-gray-600"
                    />
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-gray-500" size={32} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {filteredCategories.map(category => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onClick={handleOpenEdit}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Modal */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={selectedCategory}
                onSave={handleSave}
            />
        </div>
    );
};

export default CategoryManagement;
