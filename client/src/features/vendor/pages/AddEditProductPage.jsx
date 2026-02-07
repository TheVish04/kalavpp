
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../../api/supabase';
import { useAuth } from '../../../store/AuthContext';
import { X, ArrowRight, Loader2 } from 'lucide-react';
import ProductImageUpload from '../components/ProductImageUpload';
import ProductForm from '../components/ProductForm';

const AddEditProduct = () => {
    const { id } = useParams(); // If ID exists, we are in Edit mode
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(!!id); // True if editing, to load data
    const [productType, setProductType] = useState('Physical');

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Oil Painting',
        tags: [],
        imageUrl: '',
        stock: '',
        dimensions: '',
        weight: ''
    });

    useEffect(() => {
        if (id && user) {
            fetchProductData();
        }
    }, [id, user]);

    const fetchProductData = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            if (data) {
                setFormState({
                    title: data.title || '',
                    description: data.description || '',
                    price: data.price || '',
                    category: data.category || 'Oil Painting',
                    tags: data.tags || [], // Assuming tags column exists or JSONB
                    imageUrl: data.image_url || '',
                    stock: data.quantity || '', // Mapping to stock input
                    dimensions: '', // Mock if column doesn't exist
                    weight: ''      // Mock if column doesn't exist
                });

                // Infer type (Category based inference)
                const digitalCats = ['Digital', '3D Model', 'Audio', 'Template'];
                if (digitalCats.includes(data.category)) {
                    setProductType('Digital');
                } else if (data.vertical === 'Digital') {
                    setProductType('Digital');
                } else {
                    setProductType('Physical');
                }
            }
        } catch (error) {
            console.error('Error loading product:', error);
            alert('Failed to load product data.');
            navigate('/vendor/products');
        } finally {
            setInitializing(false);
        }
    };

    const handleImageUpload = (url) => {
        setFormState(prev => ({ ...prev, imageUrl: url }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!formState.title || !formState.price) {
                alert('Please fill in required fields (Name, Price).');
                setLoading(false);
                return;
            }

            const productData = {
                user_id: user.id,
                title: formState.title,
                description: formState.description,
                price: parseFloat(formState.price),
                category: productType === 'Digital' ? 'Digital' : formState.category, // Simplify logic or adjust
                // We use explicit 'Digital' category for digital goods generally, or the specific sub-category
                // Let's stick to the form category value, but force vertical if needed.
                vertical: productType === 'Digital' ? 'Digital' : 'Physical',
                image_url: formState.imageUrl,
                quantity: formState.stock ? parseInt(formState.stock) : (productType === 'Digital' ? 999 : 0),
                updated_at: new Date()
            };

            // If ID exists, add it to upsert to update
            if (id) {
                productData.id = id;
            }

            const { error } = await supabase
                .from('products')
                .upsert(productData);

            if (error) throw error;

            alert('Product Published Successfully!');
            navigate('/vendor/products');

        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error saving product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (initializing) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-display overflow-y-auto custom-scrollbar">

            {/* Header / Navbar */}
            <div className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1e1e1e] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/vendor/products')} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                    <h1 className="text-xl font-bold">{id ? 'Edit Product' : 'Add New Product'}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/vendor/products')} className="text-sm font-bold text-gray-500 hover:text-white transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 size={16} className="animate-spin" />}
                        <span>{id ? 'Save Changes' : 'Publish Product'}</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Main Form Content */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left: Image Upload - takes 1/3 width approx on desktop */}
                    <div className="w-full lg:w-[350px] shrink-0">
                        <div className="sticky top-24">
                            <ProductImageUpload
                                imageUrl={formState.imageUrl}
                                onUpload={handleImageUpload}
                            />
                        </div>
                    </div>

                    {/* Right: Input Fields */}
                    <div className="flex-1">
                        <ProductForm
                            formState={formState}
                            setFormState={setFormState}
                            productType={productType}
                            setProductType={setProductType}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddEditProduct;
