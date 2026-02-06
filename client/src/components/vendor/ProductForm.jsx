
import React, { useState } from 'react';
import { Box, FileCode, Check, ChevronDown, X } from 'lucide-react';

const ProductForm = ({ formState, setFormState, productType, setProductType }) => {
    const [tagInput, setTagInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formState.tags.includes(tagInput.trim())) {
                setFormState(prev => ({
                    ...prev,
                    tags: [...(prev.tags || []), tagInput.trim()]
                }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormState(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    return (
        <div className="space-y-8">
            {/* Toggle Type */}
            <div className="flex bg-[#1e1e1e] p-1 rounded-xl">
                <button
                    type="button"
                    onClick={() => setProductType('Physical')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${productType === 'Physical'
                            ? 'bg-[#8c25f4] text-white shadow-lg'
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    <Box size={16} /> Physical Item
                </button>
                <button
                    type="button"
                    onClick={() => setProductType('Digital')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${productType === 'Digital'
                            ? 'bg-[#8c25f4] text-white shadow-lg'
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    <FileCode size={16} /> Digital Asset
                </button>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Product Name</label>
                    <input
                        type="text"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        className="w-full bg-white text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={formState.price}
                        onChange={handleChange}
                        className="w-full bg-white text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell the story behind your art..."
                    className="w-full bg-[#1e1e1e] text-gray-200 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none border border-[#333] placeholder-gray-600"
                ></textarea>
            </div>

            <div className="h-px bg-[#1e1e1e] my-2"></div>

            {/* Conditional Details */}
            {productType === 'Physical' ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <Box size={18} />
                        <h3>Physical Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Stock Quantity</label>
                            <input
                                type="number"
                                name="stock"
                                value={formState.stock}
                                onChange={handleChange}
                                className="w-full bg-white text-black px-3 py-2.5 rounded-lg font-medium focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Dimensions</label>
                            <input
                                type="text"
                                name="dimensions"
                                placeholder="e.g. 12x16 in"
                                value={formState.dimensions}
                                onChange={handleChange}
                                className="w-full bg-white text-black px-3 py-2.5 rounded-lg font-medium focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Weight</label>
                            <input
                                type="text"
                                name="weight"
                                placeholder="e.g. 2 lbs"
                                value={formState.weight}
                                onChange={handleChange}
                                className="w-full bg-white text-black px-3 py-2.5 rounded-lg font-medium focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <FileCode size={18} />
                        <h3>Digital Assets</h3>
                    </div>
                    <div className="p-6 border border-dashed border-[#333] rounded-xl bg-[#121212] flex flex-col items-center justify-center text-center">
                        <p className="text-gray-400 text-sm mb-4">Upload your high-res source files, brushes, or models here.</p>
                        <button type="button" className="bg-[#1e1e1e] hover:bg-[#2a2a2a] text-white px-6 py-2 rounded-lg font-bold text-xs transition-colors border border-[#333]">
                            Upload Asset File (ZIP/RAR)
                        </button>
                    </div>
                </div>
            )}

            <div className="h-px bg-[#1e1e1e] my-2"></div>

            {/* Categorization */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold">
                    <span className="material-symbols-outlined text-lg">category</span>
                    <h3>Categorization</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</label>
                        <div className="relative">
                            <select
                                name="category"
                                value={formState.category}
                                onChange={handleChange}
                                className="w-full bg-[#1e1e1e] text-white px-4 py-3 rounded-lg appearance-none border border-[#333] focus:border-primary/50 focus:outline-none cursor-pointer"
                            >
                                <option value="Oil Painting">Oil Painting</option>
                                <option value="3D Model">3D Model</option>
                                <option value="Print">Print</option>
                                <option value="Audio">Audio</option>
                                <option value="Template">Template</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tags</label>
                        <div className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg p-2 flex flex-wrap gap-2 focus-within:border-primary/50 transition-colors">
                            {(formState.tags || []).map((tag, i) => (
                                <span key={i} className="bg-[#8c25f4]/20 text-purple-300 text-xs px-2 py-1 rounded-md flex items-center gap-1 border border-purple-500/20">
                                    #{tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-white"><X size={12} /></button>
                                </span>
                            ))}
                            <input
                                type="text"
                                placeholder="Add tag..."
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                className="bg-transparent text-white text-sm outline-none placeholder-gray-600 flex-1 min-w-[80px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductForm;
