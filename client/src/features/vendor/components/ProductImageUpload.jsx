
import React, { useState } from 'react';
import { supabase } from '../../../api/supabase';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

const ProductImageUpload = ({ imageUrl, onUpload }) => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload directly to 'products' bucket (assuming this exists from previous context)
            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get Public URL
            const { data } = supabase.storage.from('products').getPublicUrl(filePath);
            onUpload(data.publicUrl);

        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Visual Assets</h3>

            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl border-2 border-dashed border-[#333] hover:border-[#555] bg-[#121212] transition-colors overflow-hidden group">

                {imageUrl ? (
                    <>
                        <img
                            src={imageUrl}
                            alt="Product Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm pointer-events-none">
                                Change Image
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 rounded-full bg-[#1e1e1e] flex items-center justify-center mb-4">
                            {uploading ? (
                                <Loader2 size={24} className="text-primary animate-spin" />
                            ) : (
                                <Upload size={24} className="text-gray-400" />
                            )}
                        </div>
                        <h4 className="text-white font-bold mb-1">Drag and drop main artwork</h4>
                        <p className="text-gray-500 text-xs">Supported formats: JPG, PNG, WEBP (Max 50MB)</p>

                        <div className="mt-6 bg-[#2a2a2a] hover:bg-[#333] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                            Browse Files
                        </div>
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            {/* Additional placeholders (Visual only for now) */}
            <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 aspect-square rounded-xl border border-dashed border-[#333] bg-[#121212] flex items-center justify-center text-gray-600 hover:border-[#555] transition-colors cursor-pointer">
                        <ImageIcon size={20} />
                    </div>
                ))}
            </div>
            <p className="text-right text-xs text-gray-500">Additional Views 0/3</p>
        </div>
    );
};

export default ProductImageUpload;
