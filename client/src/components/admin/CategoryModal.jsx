
import React, { useState, useEffect } from 'react';
import { X, Lock, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const CategoryModal = ({ isOpen, onClose, category, onSave }) => {
    // Form State
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // File object
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);

    // Initialize/Reset State when modal opens or category changes
    useEffect(() => {
        if (isOpen) {
            if (category) {
                // Edit Mode
                setName(category.name || '');
                setSlug(category.slug || '');
                setDescription(category.description || '');
                setPreviewUrl(category.image_url || '');
                setImage(null);
            } else {
                // Create Mode
                setName('');
                setSlug('');
                setDescription('');
                setPreviewUrl('');
                setImage(null);
            }
        }
    }, [isOpen, category]);

    // Sluggify Logic
    const handleNameChange = (e) => {
        const val = e.target.value;
        setName(val);
        // Only auto-update slug if not in strict edit mode (or usually acceptable to update both)
        // Here we behave like a CMS: title drives slug
        const newSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setSlug(newSlug);
    };

    // Image Upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalImageUrl = previewUrl;

            // 1. Upload new image if selected
            if (image) {
                const fileExt = image.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('categories')
                    .upload(fileName, image);

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage
                    .from('categories')
                    .getPublicUrl(fileName);

                finalImageUrl = publicUrlData.publicUrl;
            }

            // 2. Add/Update logic
            const categoryData = {
                name,
                slug,
                description,
                image_url: finalImageUrl
            };

            await onSave(categoryData, category?.id);
            onClose();

        } catch (error) {
            console.error('Error saving category:', error);
            alert('Failed to save category. See console for details.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-[#121212] w-full max-w-lg rounded-2xl border border-[#333] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-[#2a2a2a]">
                    <h2 className="text-xl font-bold text-white">
                        {category ? 'Edit Category' : 'New Category'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Category Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="e.g. Neo-Futurism"
                            className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-lg p-3 text-sm focus:border-[#8c25f4] outline-none transition-colors"
                            required
                        />
                    </div>

                    {/* Slug (Read Only) */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">URL Slug (Auto-Filled)</label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={slug}
                                readOnly
                                className="w-full bg-[#0a0a0a] border border-[#333] text-gray-400 rounded-lg p-3 text-sm font-mono outline-none cursor-not-allowed"
                            />
                            <Lock size={14} className="absolute right-3 top-3.5 text-gray-600" />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Cover Image</label>
                        <div className="relative border border-dashed border-[#333] bg-[#1a1a1a] rounded-xl hover:bg-[#202020] transition-colors group h-40 flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />

                            {previewUrl ? (
                                <>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-0">
                                        <Upload size={24} className="mb-2" />
                                        <span className="text-xs font-bold">Change Image</span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center text-gray-500">
                                    <div className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center mb-3 text-gray-400">
                                        <Upload size={20} />
                                    </div>
                                    <p className="text-xs font-bold text-white mb-1">Click to upload or drag and drop</p>
                                    <p className="text-[10px]">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">SEO Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a short description for search engines..."
                            className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-lg p-3 text-sm focus:border-[#8c25f4] outline-none transition-colors h-24 resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-gradient-to-r from-violet-600 to-[#8c25f4] hover:from-violet-500 hover:to-[#9d4bf6] text-white text-xs font-bold rounded-lg shadow-lg shadow-purple-900/20 transition-all flex items-center gap-2"
                        >
                            {loading && <Loader2 size={14} className="animate-spin" />}
                            Save Category
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CategoryModal;
