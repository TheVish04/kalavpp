import { motion } from 'framer-motion';

const CollectionHero = ({ title, description, image, isCollection }) => {
    if (!isCollection) {
        return (
            <div className="py-4">
                <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
                <p className="text-gray-400">Showing results for "<span className="text-primary font-bold">{title}</span>"</p>
            </div>
        );
    }

    return (
        <section className="@container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full rounded-3xl overflow-hidden border border-white/10 group h-[340px]"
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBYVjmdU5atf30MGhvaEAF7LW8Jc9DyjaE17BBB5nuo1AaHavw7GunJYf7QZs67FV7zNI8udwu7JBXGfsv7kkfVOFSIlpSZL8mJTgFo0ww_6ky3imCDqPNnzDZYgBNSRoqWZMdl08AhbqNc4QLjV2L311Pm9ny4SSLAv-Hvd5WqWoOcJxhPKaS0zgVC3h7p-Bt_Xd0XZJj5Jv7zAk8CSwy0astutc18PzChgHjnnEqAXSlg_pgpdmJixUkRNFUNh0eNqRgdJRiCLF4"}')` }}
                >
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center max-w-2xl px-8 sm:px-12 gap-4">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full">Featured Collection</span>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>verified</span> NeonGod
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-white drop-shadow-lg">{title}</h2>
                    <p className="text-lg text-gray-300 max-w-lg leading-relaxed">{description}</p>
                    <div className="pt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold transition-all transform shadow-[0_0_20px_rgba(140,37,244,0.3)] flex items-center gap-2"
                        >
                            View Collection
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default CollectionHero;
