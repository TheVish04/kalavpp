import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Landing = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-black/60 z-10"></div>
                        <div className="absolute inset-0 bg-hero-gradient z-10 mix-blend-multiply pointer-events-none"></div>
                        <div
                            className="w-full h-full bg-cover bg-center animate-[pulse_10s_ease-in-out_infinite]"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUGoCLdDVpd0iTYX65RpXxlSGGPwWKrXNNqpF02WxUo15ODrPCX_u9HcpIj8sw751ZmikRBhCZtPEdqciLgjGNWwxvvunS3BYB6Z_iUdT1Okx55_0K6pNfnLmGzZqfXhDrVePzEfsFrFg_O97UqUmVroCLNCVPAn8lp8NMyLs_ZyolQINsmGs1abISZ893GXo4AR0mrwDKys3eEglwqZeDE-N1vJdrJQM8cXVQ7_TCgZAdHd4C4cg8vxyJHBpmAs475623NcJ12pc')",
                            }}
                        ></div>
                    </div>
                    {/* Content */}
                    <div className="relative z-20 max-w-[960px] mx-auto px-6 text-center flex flex-col items-center gap-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-2">
                            <span className="size-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">
                                Premium Art Ecosystem
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                            Where Art Meets{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent">
                                Utility
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
                            Discover premium physical pieces, digital assets, and commission
                            world-class creators in one unified ecosystem.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
                            <Link
                                to="/shop"
                                className="group relative flex items-center justify-center h-14 px-8 rounded-full bg-gradient-to-r from-primary to-purple-700 text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(140,37,244,0.4)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Market
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </Link>
                            <Link
                                to="/services"
                                className="group flex items-center justify-center h-14 px-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold text-lg transition-all hover:bg-white/10 hover:border-white/40"
                            >
                                Hire an Artist
                            </Link>
                        </div>
                    </div>
                    {/* Scroll Indicator */}
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
                        <div className="flex gap-2">
                            <button className="size-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-primary hover:border-transparent transition-all">
                                <span className="material-symbols-outlined text-white">
                                    chevron_left
                                </span>
                            </button>
                            <button className="size-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-primary hover:border-transparent transition-all">
                                <span className="material-symbols-outlined text-white">
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* Horizontal Scroll Container */}
                    <div className="flex overflow-x-auto gap-6 pb-8 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory">
                        {/* Card 1 */}
                        <div className="min-w-[300px] md:min-w-[340px] glass-panel rounded-2xl p-3 snap-center group hover:border-primary/50 transition-colors duration-300">
                            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4">
                                <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold text-accent border border-accent/20">
                                    HOT
                                </div>
                                <img
                                    alt="Neon cyberpunk city street at night with glowing signs"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiHoq1-o-0ktRHr3vD-igF2HVHUSKJctnJNjgOH3JHwes29S5JyIWzcXYB0kZzNYw7AJG5nX9G4PdlL0YBcchg0mRismJ0_cDQwbYvpr7GSV297rquI8O-ulXUg5J-YChikQ-7vh_TYvTxdAn6z_pCFyPhdWkge1CCqlfI5KiKwORVuL4kRsP775rrMvtDoYCSpDu7eBq_U2xE59ppjEry66sqM-4ULqKzkqQ3vBXKIvNk7-iB3PgZ3W0nhTWsZV7ZAwOS7gV6l4I"
                                />
                                <button className="absolute bottom-3 right-3 size-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                </button>
                            </div>
                            <div className="px-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-white truncate pr-4">
                                        Neon Solstice
                                    </h3>
                                    <span className="text-primary font-bold">0.8 ETH</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 rounded-full bg-gray-700 overflow-hidden">
                                            <img
                                                alt="Artist avatar"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL26EZG9hkQ-zhWk2Vrl3v7g51RMSf4Cu8NBJrhr0TJJKZrL7qknKkKDVZPaSGV_wxp49-H20iEiQnMdlvyF_KCAGohjpCPgJLeQGj8Cisxw3IeClGqpRXmRaAPPOdmiDbuDyYbvYfxkqeOCnqGPqDrVeDVI4oFvofJxGdLCa0HMbYEB85WWe-mNcAY5J6zoJjKoPrL1RWASzJD6RoUvjpx-U68Ms4-eYHGKBwqa3FfsG9-TvMnWPvnGO_ocS9SuyXW8_ivsXPqBk"
                                            />
                                        </div>
                                        <span className="text-gray-400">@cyber_davinci</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">12m left</span>
                                </div>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="min-w-[300px] md:min-w-[340px] glass-panel rounded-2xl p-3 snap-center group hover:border-primary/50 transition-colors duration-300">
                            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4">
                                <img
                                    alt="Abstract neon light sculpture in dark room"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaVGvYdhg0TgcbbWAQAcPr3S4wHYfzaLMKprGichgw7DOpgwMxBcwkOpBQ4Hw5oLBhQpcsm4W8ftZlWWdJCbdmMC9hDXktJkVQuUyIdsOXYpD62mFU5ercGv3iq_oRrs-bl-_XP5vuVHu0VNh6EXkNq1TdoHL7I7EC60HppkdDNPQNctrnIxNRLgoMjQvk4Bi1aBqlKT53bglkJ1yRopZj8KIFtfUNH47nq8L7IZX63eLhz7G9rTqeLUrN6hfj8doazzDF7TjX_eA"
                                />
                                <button className="absolute bottom-3 right-3 size-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                </button>
                            </div>
                            <div className="px-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-white truncate pr-4">
                                        Void Echoes
                                    </h3>
                                    <span className="text-primary font-bold">1.2 ETH</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 rounded-full bg-gray-700 overflow-hidden">
                                            <img
                                                alt="Artist avatar"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaE1kOnl9xzdBxEAkABtG70BuSm73SuPGDC9XurJa50D0r6ujbZY0777GSXOqQvpslGeAYMHAE2moeWeCYQHkq9Kfm303r_LhHcLVBApaPAt8Gc7UYgUluzI8V7BxhKUjyk9Beld37YFP5MHr0FsF_IfWDCXR6ElsZTU6tOKSDCgvxPAv86Jy8LPBgscu0P_TQ6BNHkTltrhSdnV2dOiOI3EvO2Tge4-l-Ph9KDdODVr0Us-X_n6Ut_AvPIyimVlBfGcNAeHk2rLg"
                                            />
                                        </div>
                                        <span className="text-gray-400">@aura_art</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">2h left</span>
                                </div>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="min-w-[300px] md:min-w-[340px] glass-panel rounded-2xl p-3 snap-center group hover:border-primary/50 transition-colors duration-300">
                            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4">
                                <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold text-white border border-white/20">
                                    Physical
                                </div>
                                <img
                                    alt="Classical marble bust sculpture with modern lighting"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARTvgxbpRTMlh_yVyZSaGz1fx_ww-5KNa6M4mC6gPccY2FZHtZ9dwWgIcrfGkdSxcYncGwTKbgj4yT5n2VDE9uiW8bwcom-rrf6GlohDWukTZgK4yuVCVTGGKaOaRq2yahEouZZ2YwTMBmrSvK3-a4pBe812Z9D-NN6nMpZ4vYqQ8rBzRznUBL8KWzPopUiLT271oOkJ-UBodxedxhJT5FKZpbr3wcmnfqBtbo_8PZBIm77NqvIQ5y9FU7Z-Hbv4f9-o_2kxqApl0"
                                />
                                <button className="absolute bottom-3 right-3 size-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                </button>
                            </div>
                            <div className="px-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-white truncate pr-4">
                                        Marble Bust v2
                                    </h3>
                                    <span className="text-primary font-bold">$1,200</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 rounded-full bg-gray-700 overflow-hidden">
                                            <img
                                                alt="Artist avatar"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5ekMY-_zCgaE3qVCMzNdfbloM4EoaeH8_YYe5CDwqUo7Ez1aZl3XXIYQPxa1cNDy0_CMDcwEvABD0aaJXGXePgtq8PC-NlhgwFP7yYsMkruTK0-Q8Q7EzgelS18blbBSSi5qkUPMD02eXFZBJhUKSluksxxk1o08UOha7lWrm89qUrrg6cETjdJZwGiKdZ0BWeItXriVdkOYcLv4BjT329EA5a32sJwDEbLQb5wzdve4swkSEUFmfsJ4GTbhjgJ7JzjmVArdUFnU"
                                            />
                                        </div>
                                        <span className="text-gray-400">@sculpt_god</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">In Stock</span>
                                </div>
                            </div>
                        </div>
                        {/* Card 4 */}
                        <div className="min-w-[300px] md:min-w-[340px] glass-panel rounded-2xl p-3 snap-center group hover:border-primary/50 transition-colors duration-300">
                            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4">
                                <img
                                    alt="Abstract fluid painting with blue and gold"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOmNtIg1bsCbCLqGu_suj9CW4MzmtjAAjapg6fq04-B7RwFYpxKcadZg_u_c5IXZfIIle4FTclnR3Z-kWbg10xrTUmJfcDuk5yfd-YW2pdB57pNb6kUgMkrpE0l02mZznoj1V_-9T-4ZmDqZMX2yZu730gzj-WLyYUs3c6EZztkl3umHqaue_irnZFujgBNtAHpfx7TUdXT7y5uI_EwrRSupnh_JTz54TjFGw1DmEzNEgGZW0bHzzz06miVCiUxIvZsxboU0G6wSE"
                                />
                                <button className="absolute bottom-3 right-3 size-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                </button>
                            </div>
                            <div className="px-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-white truncate pr-4">
                                        Golden Hour
                                    </h3>
                                    <span className="text-primary font-bold">0.5 ETH</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 rounded-full bg-gray-700 overflow-hidden">
                                            <img
                                                alt="Artist avatar"
                                                className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA52H3i7YEA26of-S1XRsCBLX0st0zUC_voWmr_yg9hHz-U454T13ocatapzPSAFnV1geq7v2PiwhUruclqbG7Fcu4CtmsWeP5i3Jc0tcm1IFZjpBaMsudGALfdZDBnI3dKW1TwIg9piE0jK4FDLhEONU6Ym1jMAdfwfsp4l19ITh7yOwa-dOtZKX52Cu2f5R2kGWdkgz0mlsyx-7hzoq7saf1pvJpjdE_uZ-hyyyhhagd9P3sSTxiHRao2IAr-gvnmYnpMk45Cr00"
                                            />
                                        </div>
                                        <span className="text-gray-400">@fluid_minds</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">1d left</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bento Grid Categories */}
                <section className="py-20 px-6 max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Explore Categories
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Dive into our diverse ecosystem of creativity. From tangible
                                masterpieces to digital assets.
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                        {/* Large Item (Physical Art) */}
                        <Link
                            to="/shop?category=physical"
                            className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                            <img
                                alt="Close up of an oil painting with rich textures"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-yxgxl0qOzG8WHBuFir5hZ-roFyfrlQE3CcpedOV5bcYoMs7wgK0BfSlfRctHgPPADkIVHSm8okdXJKL3y417e_BFituhMecEkv2s3t7o0PARl-mX6q91KSEIMEKmYsU7MiumADHZu_QOE2dR8nwCV9zfNxS2962HTYsbJWAr5SC_dBZY4F9XnvPE6QcYyvwCnKM9gB1dV5sdgB06qSsDRabK6bnBHLYeg9hHu4BKc6THh6dbFKIz9NeL28DqL0EtuFh1SXNVjeE"
                            />
                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/90 to-transparent">
                                <span className="material-symbols-outlined text-accent text-4xl mb-2">
                                    palette
                                </span>
                                <h3 className="text-3xl font-bold text-white mb-2">Physical Art</h3>
                                <p className="text-gray-300 max-w-md">
                                    Original paintings, sculptures, and prints delivered directly to
                                    your doorstep with certificate of authenticity.
                                </p>
                            </div>
                        </Link>
                        {/* Top Right (Digital Downloads) */}
                        <Link
                            to="/shop?category=digital"
                            className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-300 bg-surface-dark"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10"></div>
                            <img
                                alt="Abstract 3D rendered shapes in dark environment"
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
                                <p className="text-gray-400 text-sm">
                                    High-res textures, models & brushes.
                                </p>
                            </div>
                        </Link>
                        {/* Bottom Right split (Merch & Commissions) */}
                        <div className="grid grid-cols-2 gap-4 md:col-span-1">
                            {/* Merch */}
                            <Link
                                to="/shop?category=merch"
                                className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-300 bg-surface-dark"
                            >
                                <img
                                    alt="Streetwear t-shirt mockup"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNPMpoxiSBall8q-8fVeVUGuYpiPXNwG_jy-fx1I6hOSc0oEgfIAyGYhL-5_Yi17wRVB4CO3FguxD1PavEJbEd1kEN9_YP_idjxPJnw9vsrKgIYNMuVOILLP1D2C3OzNrr5p2KWkFF6Iwf5Or6VAXIi8oH64FtRWyn6jCeTJssPR6f4l3z1eWbF1egQTmEg_AltvXgav9LvJwcsK1VtQN_p0K6e8Rma2-RgjfqwnX7A2_vRenYmqXkctmoGaGYZwrzJDBgfMMiKoc"
                                />
                                <div className="absolute bottom-0 left-0 p-4 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-lg font-bold text-white">Merch</h3>
                                </div>
                            </Link>
                            {/* Commissions */}
                            <Link
                                to="/services"
                                className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-300 bg-surface-dark flex items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="z-10 text-center p-4">
                                    <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-2 border border-primary/30">
                                        <span className="material-symbols-outlined">brush</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-white">Hire Artist</h3>
                                    <p className="text-xs text-gray-400 mt-1">Commissions</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* How It Works (Minimalist) */}
                <section className="py-24 px-6 bg-[#0f0f0f]">
                    <div className="max-w-[1000px] mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-3">How It Works</h2>
                            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent z-0"></div>
                            {/* Step 1 */}
                            <div className="relative z-10 flex flex-col items-center text-center group">
                                <div className="size-24 rounded-full glass-panel flex items-center justify-center mb-6 border border-gray-700 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(140,37,244,0.2)] transition-all duration-300 bg-[#121212]">
                                    <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-primary transition-colors font-light">
                                        search
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    1. Browse or Brief
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-[240px]">
                                    Explore the curated market or post a specific commission brief to
                                    find your perfect artist.
                                </p>
                            </div>
                            {/* Step 2 */}
                            <div className="relative z-10 flex flex-col items-center text-center group">
                                <div className="size-24 rounded-full glass-panel flex items-center justify-center mb-6 border border-gray-700 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(140,37,244,0.2)] transition-all duration-300 bg-[#121212]">
                                    <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-primary transition-colors font-light">
                                        lock
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    2. Secure Transact
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-[240px]">
                                    Funds are held safely in escrow until you approve the final
                                    digital or physical delivery.
                                </p>
                            </div>
                            {/* Step 3 */}
                            <div className="relative z-10 flex flex-col items-center text-center group">
                                <div className="size-24 rounded-full glass-panel flex items-center justify-center mb-6 border border-gray-700 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(140,37,244,0.2)] transition-all duration-300 bg-[#121212]">
                                    <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-primary transition-colors font-light">
                                        download_done
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    3. Own or Download
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-[240px]">
                                    Receive high-res assets instantly or track your physical shipment
                                    with insured delivery.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Landing;
