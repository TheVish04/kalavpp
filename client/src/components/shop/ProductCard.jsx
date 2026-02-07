import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Determine badge color/text based on vertical/type
    const getBadge = () => {
        const type = product.vertical || product.type || 'DIGITAL';
        switch (type.toUpperCase()) {
            case 'PHYSICAL':
                return { color: 'text-orange-300', bg: 'bg-orange-400', label: 'Physical' };
            case 'NFT':
                return { color: 'text-purple-300', bg: 'bg-purple-400', label: 'NFT' };
            default:
                return { color: 'text-blue-300', bg: 'bg-blue-400', label: 'Digital' };
        }
    };

    const badge = getBadge();

    // Helper to resolve image URL
    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/400';
        if (path.startsWith('http')) return path;
        return supabase.storage.from('products').getPublicUrl(path).data.publicUrl;
    };

    const imageUrl = getImageUrl(product.thumbnail || product.image);

    return (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer w-full"
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${imageUrl}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
                <span className={`glass-badge px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badge.color} rounded-full flex items-center gap-1 backdrop-blur-sm border border-white/10 bg-black/50`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.bg}`}></span> {badge.label}
                </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                    <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors text-white">{product.title || 'Untitled Artwork'}</h3>
                    <p className="text-gray-400 text-xs mb-2">by <span className="text-white">{product.profiles?.full_name || product.creator || 'Unknown'}</span></p>
                    <p className="text-xl font-bold text-white">₹{product.price?.toFixed(2) || '0.00'}</p>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 transition-all shadow-lg"
                >
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
