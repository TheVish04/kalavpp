
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../../api/supabase';
import Header from '../../shop/components/Header';
import ServiceHero from '../components/ServiceHero';
import ServiceProcess from '../components/ServiceProcess';
import ServiceRequestForm from '../components/ServiceRequestForm';

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*, profiles(full_name, avatar_url, id)')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setService(data);
            } catch (err) {
                console.error('Error fetching service:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchService();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-[#121212] min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="bg-[#121212] min-h-screen flex flex-col items-center justify-center text-white gap-4">
                <span className="material-symbols-outlined text-6xl text-gray-500">broken_image</span>
                <h2 className="text-2xl font-bold">Service Not Found</h2>
                <Link to="/services" className="text-primary hover:underline">Return to Services</Link>
            </div>
        );
    }

    return (
        <div className="bg-[#121212] min-h-screen flex flex-col text-white overflow-x-hidden selection:bg-primary selection:text-white font-display">
            {/* Top Navigation */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24 relative">

                    {/* LEFT COLUMN: Visuals & Info & Process */}
                    <div className="flex-1 min-w-0 flex flex-col gap-10">
                        <ServiceHero service={service} />
                        <ServiceProcess />
                    </div>

                    {/* RIGHT COLUMN: Sticky Form */}
                    <ServiceRequestForm serviceId={service.id} serviceTitle={service.title} />

                </div>
            </main>
        </div>
    );
};

export default ServiceDetails;
