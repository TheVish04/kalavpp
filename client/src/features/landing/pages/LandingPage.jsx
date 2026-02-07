import { Link } from 'react-router-dom';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../../shared/components/layout/Footer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabase';

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const Landing = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fallback Data
    const fallbackData = [
        {
            id: 1,
            title: 'Neon Solstice',
            price: '0.8 ETH',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBiHoq1-o-0ktRHr3vD-igF2HVHUSKJctnJNjgOH3JHwes29S5JyIWzcXYB0kZzNYw7AJG5nX9G4PdlL0YBcchg0mRismJ0_cDQwbYvpr7GSV297rquI8O-ulXUg5J-YChikQ-7vh_TYvTxdAn6z_pCFyPhdWkge1CCqlfI5KiKwORVuL4kRsP775rrMvtDoYCSpDu7eBq_U2xE59ppjEry66sqM-4ULqKzkqQ3vBXKIvNk7-iB3PgZ3W0nhTWsZV7ZAwOS7gV6l4I',
            artist: '@cyber_davinci',
            label: 'HOT',
        },
        {
            id: 2,
            title: 'Void Echoes',
            price: '1.2 ETH',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAaVGvYdhg0TgcbbWAQAcPr3S4wHYfzaLMKprGichgw7DOpgwMxBcwkOpBQ4Hw5oLBhQpcsm4W8ftZlWWdJCbdmMC9hDXktJkVQuUyIdsOXYpD62mFU5ercGv3iq_oRrs-bl-_XP5vuVHu0VNh6EXkNq1TdoHL7I7EC60HppkdDNPQNctrnIxNRLgoMjQvk4Bi1aBqlKT53bglkJ1yRopZj8KIFtfUNH47nq8L7IZX63eLhz7G9rTqeLUrN6hfj8doazzDF7TjX_eA',
            artist: '@aura_art',
        },
        {
            id: 3,
            title: 'Marble Bust v2',
            price: '₹1,200',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuARTvgxbpRTMlh_yVyZSaGz1fx_ww-5KNa6M4mC6gPccY2FZHtZ9dwWgIcrfGkdSxcYncGwTKbgj4yT5n2VDE9uiW8bwcom-rrf6GlohDWukTZgK4yuVCVTGGKaOaRq2yahEouZZ2YwTMBmrSvK3-a4pBe812Z9D-NN6nMpZ4vYqQ8rBzRznUBL8KWzPopUiLT271oOkJ-UBodxedxhJT5FKZpbr3wcmnfqBtbo_8PZBIm77NqvIQ5y9FU7Z-Hbv4f9-o_2kxqApl0',
            artist: '@sculpt_god',
            label: 'Physical',
        },
        {
            id: 4,
            title: 'Golden Hour',
            price: '0.5 ETH',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAOmNtIg1bsCbCLqGu_suj9CW4MzmtjAAjapg6fq04-B7RwFYpxKcadZg_u_c5IXZfIIle4FTclnR3Z-kWbg10xrTUmJfcDuk5yfd-YW2pdB57pNb6kUgMkrpE0l02mZznoj1V_-9T-4ZmDqZMX2yZu730gzj-WLyYUs3c6EZztkl3umHqaue_irnZFujgBNtAHpfx7TUdXT7y5uI_EwrRSupnh_JTz54TjFGw1DmEzNEgGZW0bHzzz06miVCiUxIvZsxboU0G6wSE',
            artist: '@fluid_minds',
        },
    ];

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .limit(4); // Fetch 4 items

                if (error || !data || data.length === 0) {
                    setTrendingProducts(fallbackData);
                } else {
                    // Map backend data to frontend structure if necessary
                    // Assuming DB columns match or partially match
                    setTrendingProducts(data);
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setTrendingProducts(fallbackData);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-black/60 z-10"></div>
                        <div className="absolute inset-0 bg-hero-gradient z-10 mix-blend-multiply pointer-events-none"></div>
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUGoCLdDVpd0iTYX65RpXxlSGGPwWKrXNNqpF02WxUo15ODrPCX_u9HcpIj8sw751ZmikRBhCZtPEdqciLgjGNWwxvvunS3BYB6Z_iUdT1Okx55_0K6pNfnLmGzZqfXhDrVePzEfsFrFg_O97UqUmVroCLNCVPAn8lp8NMyLs_ZyolQINsmGs1abISZ893GXo4AR0mrwDKys3eEglwqZeDE-N1vJdrJQM8cXVQ7_TCgZAdHd4C4cg8vxyJHBpmAs475623NcJ12pc')",
                            }}
                        ></motion.div>
                    </div>

                    <div className="relative z-20 max-w-[960px] mx-auto px-6 text-center flex flex-col items-center gap-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-2"
                        >
                            <span className="size-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">
                                Premium Art Ecosystem
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl"
                        >
                            Where Art Meets{' '}
                            <motion.span
                                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent bg-[length:200%_auto]"
                            >
                                Utility
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed"
                        >
                            Discover premium physical pieces, digital assets, and commission
                            world-class creators in one unified ecosystem.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center"
                        >
                            <Link to="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative flex items-center justify-center h-14 px-8 rounded-full bg-gradient-to-r from-primary to-purple-700 text-white font-bold text-lg overflow-hidden transition-all shadow-[0_0_20px_rgba(140,37,244,0.3)] hover:shadow-[0_0_40px_rgba(140,37,244,0.6)]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Explore Market
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                            arrow_forward
                                        </span>
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </motion.button>
                            </Link>
                            <Link to="/services">
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group flex items-center justify-center h-14 px-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold text-lg transition-all"
                                >
                                    Hire an Artist
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                        <span className="material-symbols-outlined text-gray-400">
                            keyboard_arrow_down
                        </span>
                    </div>
                </section>

                {/* Trending Artworks Carousel */}
                <section className="py-20 px-6 max-w-[1440px] mx-auto overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Trending This Week
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Curated selection of top-performing assets
                            </p>
                        </div>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex overflow-x-auto gap-6 pb-8 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory"
                    >
                        {trendingProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={fadeInUp}
                                className="min-w-[300px] md:min-w-[340px] glass-panel rounded-2xl p-3 snap-center group hover:border-primary/50 transition-colors duration-300"
                            >
                                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4">
                                    {(product.label || product.is_hot) && (
                                        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold text-accent border border-accent/20">
                                            {product.label || 'HOT'}
                                        </div>
                                    )}
                                    <img
                                        alt={product.title || product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        src={product.image || product.image_url} // Handle different DB naming
                                    />
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        whileHover={{ scale: 1.1 }}
                                        className="absolute bottom-3 right-3 size-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                                    >
                                        <span className="material-symbols-outlined">
                                            shopping_bag
                                        </span>
                                    </motion.button>
                                </div>
                                <div className="px-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-white truncate pr-4">
                                            {product.title || product.name}
                                        </h3>
                                        <span className="text-primary font-bold">
                                            {product.price || '0.5 ETH'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">
                                            {product.artist || '@kalavpp_artist'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Bento Grid Categories */}
                <section className="py-20 px-6 max-w-[1200px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                    >
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Explore Categories
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Dive into our diverse ecosystem of creativity.
                            </p>
                        </div>
                        <Link
                            to="/shop"
                            className="text-primary font-bold hover:text-white transition-colors flex items-center gap-1 group"
                        >
                            View All Categories
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                        {/* Physical Art */}
                        <Link to="/shop?category=physical" className="contents">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 0.98 }}
                                viewport={{ once: true }}
                                className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                                <img
                                    alt="Physical Art"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-yxgxl0qOzG8WHBuFir5hZ-roFyfrlQE3CcpedOV5bcYoMs7wgK0BfSlfRctHgPPADkIVHSm8okdXJKL3y417e_BFituhMecEkv2s3t7o0PARl-mX6q91KSEIMEKmYsU7MiumADHZu_QOE2dR8nwCV9zfNxS2962HTYsbJWAr5SC_dBZY4F9XnvPE6QcYyvwCnKM9gB1dV5sdgB06qSsDRabK6bnBHLYeg9hHu4BKc6THh6dbFKIz9NeL28DqL0EtuFh1SXNVjeE"
                                />
                                <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/90 to-transparent">
                                    <span className="material-symbols-outlined text-accent text-4xl mb-2">
                                        palette
                                    </span>
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                        Physical Art
                                    </h3>
                                    <p className="text-gray-300 max-w-md">
                                        Original paintings, sculptures, and prints.
                                    </p>
                                </div>
                            </motion.div>
                        </Link>

                        {/* Digital Assets */}
                        <Link
                            to="/shop?category=digital"
                            className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-300 bg-surface-dark"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 0.98 }}
                                viewport={{ once: true }}
                                className="w-full h-full"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10"></div>
                                <img
                                    alt="Digital Assets"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3LMxr8Et3V3j4x0-ncGN0vulNpmwg0cILIsEyL7wZnina6XrNO-P15RGow2xHrx7eMMdbp5gLMmg9-PxFQbhA6kwHqTQMu3cXRlSfEeE2rVWN9-i2J_fzOezrd-NiMl0AjUY4JeJxLN2cl76KNIukCzrPTlGoN9XpoPLdlUJoSmIrM5xXLsvKwRmxMfZdqkmg4ZMqfIVGrArsoQ3wp9N9LLotOUKhI6FzA0vKq64ml5a-FE9OYjMg2dhXuC50ZDDsRRxsR0QDd4E"
                                />
                                <div className="absolute bottom-0 left-0 p-6 z-20">
                                    <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                                        Digital Assets
                                        <span className="material-symbols-outlined text-sm">
                                            download
                                        </span>
                                    </h3>
                                </div>
                            </motion.div>
                        </Link>

                        {/* Merch */}
                        <Link
                            to="/shop?category=merch"
                            className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-300 bg-surface-dark"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 0.98 }}
                                viewport={{ once: true }}
                                className="w-full h-full"
                            >
                                <img
                                    alt="Merch"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNPMpoxiSBall8q-8fVeVUGuYpiPXNwG_jy-fx1I6hOSc0oEgfIAyGYhL-5_Yi17wRVB4CO3FguxD1PavEJbEd1kEN9_YP_idjxPJnw9vsrKgIYNMuVOILLP1D2C3OzNrr5p2KWkFF6Iwf5Or6VAXIi8oH64FtRWyn6jCeTJssPR6f4l3z1eWbF1egQTmEg_AltvXgav9LvJwcsK1VtQN_p0K6e8Rma2-RgjfqwnX7A2_vRenYmqXkctmoGaGYZwrzJDBgfMMiKoc"
                                />
                                <div className="absolute bottom-0 left-0 p-4 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-lg font-bold text-white">Merch</h3>
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-24 px-6 bg-[#0f0f0f]">
                    <div className="max-w-[1000px] mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl font-bold text-white mb-3">
                                How It Works
                            </h2>
                            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent z-0"></div>
                            {[
                                {
                                    icon: 'search',
                                    title: '1. Browse or Brief',
                                    desc: 'Explore the curated market or post a specific commission brief.',
                                },
                                {
                                    icon: 'lock',
                                    title: '2. Secure Transact',
                                    desc: 'Funds are held safely in escrow until you approve delivery.',
                                },
                                {
                                    icon: 'download_done',
                                    title: '3. Own or Download',
                                    desc: 'Receive high-res assets instantly or track physical shipment.',
                                },
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="relative z-10 flex flex-col items-center text-center group"
                                >
                                    <div className="size-24 rounded-full glass-panel flex items-center justify-center mb-6 border border-gray-700 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(140,37,244,0.2)] transition-all duration-300 bg-[#121212]">
                                        <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-primary transition-colors font-light">
                                            {step.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-[240px]">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Landing;
