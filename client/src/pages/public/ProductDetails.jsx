
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';
import ProductGallery from '../../components/product/ProductGallery';
import ProductInfo from '../../components/product/ProductInfo';
import Header from '../../components/shop/Header'; // Reusing Header for consistency

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // Fetch the product data joined with the profiles table
                const { data, error } = await supabase
                    .from('products')
                    .select('*, profiles(full_name, avatar_url, id)')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    // Handlers
    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            // Show toast (mock for now, or use a toast library if added later)
            alert(`${product.title} added to cart!`);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addToCart(product);
            navigate('/checkout');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white gap-4">
                <span className="material-symbols-outlined text-6xl opacity-50">broken_image</span>
                <h2 className="text-2xl font-bold">Product Not Found</h2>
                <button onClick={() => navigate('/shop')} className="text-primary hover:underline">Return to Shop</button>
            </div>
        );
    }

    // Helper to resolve image URL
    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/800x600?text=No+Image';
        if (path.startsWith('http')) return path;
        return supabase.storage.from('products').getPublicUrl(path).data.publicUrl;
    };

    const mainImageResolved = getImageUrl(product.image || product.thumbnail);

    // Resolve thumbnails
    // If product.images exists, map it. Else create fallback array using resolved main image
    let thumbnailsResolved = [];
    if (product.images && product.images.length > 0) {
        thumbnailsResolved = product.images.map(img => getImageUrl(img));
    } else {
        thumbnailsResolved = [
            mainImageResolved,
            "https://via.placeholder.com/800x600?text=Detail",
            "https://via.placeholder.com/800x600?text=Context"
        ];
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
            <Header />

            {/* Immersive Split Layout */}
            <main className="flex-1 flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-80px)]">
                <ProductGallery
                    mainImage={mainImageResolved}
                    thumbnails={thumbnailsResolved}
                />

                <ProductInfo
                    product={product}
                    addToCart={handleAddToCart}
                    buyNow={handleBuyNow}
                />
            </main>
        </div>
    );
};

export default ProductDetails;
