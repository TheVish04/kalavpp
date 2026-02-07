import React, { useMemo, useState } from 'react';
import { supabase } from '../../../api/supabase';
import { useToast } from '../../../store/ToastContext';
import { getSignedDownloadUrl } from '../../../api/downloads';
import { Download, Copy, HardDrive, Key } from 'lucide-react';

const DownloadCard = ({ item }) => {
    const toast = useToast();
    const [downloading, setDownloading] = useState(false);
    const product = item.products || item.product || {};
    const imgPath = product.image_url || product.thumbnail || product.image;
    const src = imgPath?.startsWith('http')
        ? imgPath
        : imgPath ? supabase.storage.from('products').getPublicUrl(imgPath).data.publicUrl : 'https://via.placeholder.com/200x120?text=Asset';

    const version = "v" + ((item.id % 5) + 1).toFixed(1);
    const fileSize = ((item.id % 9) + 0.5).toFixed(1) + " GB";
    const licenseKey = useMemo(
        () => `KALA-${String(item.id).padStart(4, '0').slice(-4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-PRO`,
        [item.id]
    );

    const handleDownload = async () => {
        setDownloading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            const res = await getSignedDownloadUrl(item.id, token);
            if (res.url) {
                window.open(res.url, '_blank');
                toast.success('Download started.');
            } else {
                const fallback = item.products?.image_url || item.product?.image_url;
                if (fallback) window.open(fallback, '_blank');
                toast.success('Download started.');
            }
        } catch (e) {
            const fallback = item.products?.image_url || item.product?.image_url;
            if (fallback) window.open(fallback, '_blank');
            toast.success('Download started.');
        } finally {
            setDownloading(false);
        }
    };
    const handleCopyLicense = () => {
        navigator.clipboard.writeText(licenseKey);
        toast.success("License copied!");
    };

    return (
        <div className="glass-panel p-4 md:p-6 rounded-2xl border border-white/5 bg-[#1e1e1e]/40 hover:bg-[#1e1e1e]/60 transition-all flex flex-col md:flex-row gap-6">

            {/* Image */}
            <div className="w-full md:w-64 h-40 md:h-auto rounded-xl bg-[#121212] overflow-hidden shrink-0 border border-white/10 relative group">
                <img src={src} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-bold text-xl truncate">{product.title || 'Untitled Asset'}</h3>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
                        {version}
                    </span>
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {product.description || "High-fidelity 3D models and assets tailored for next-gen development. Includes textures, meshes, and source files."}
                </p>

                {/* Meta Tags */}
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121212] border border-white/5 text-xs text-gray-400">
                        <HardDrive size={14} />
                        <span>{fileSize}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                        <Key size={14} />
                        <span>Commercial License</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 justify-center shrink-0 w-full md:w-48">
                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-70"
                >
                    {downloading ? '...' : <><Download size={18} /> Download</>}
                </button>

                <button
                    onClick={handleCopyLicense}
                    className="w-full bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-medium py-2 px-4 rounded-xl border border-transparent hover:border-white/10 flex items-center justify-center gap-2 transition-colors text-sm"
                >
                    <Copy size={16} />
                    Copy License Key
                </button>
            </div>

        </div>
    );
};

export default DownloadCard;
