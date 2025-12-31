import { motion } from 'framer-motion'
import { Sparkles, Book, Target, Zap, ChevronRight, Calendar, Star, Trophy, Crown } from 'lucide-react'

const TrophyCabinet = ({ onNavigate }) => (
    <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded uppercase tracking-wider flex items-center gap-1">
                <Crown size={12} /> HALL_OF_FAME
            </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            {/* 1. DGIST Research */}
            <motion.div
                whileHover={{ y: -5 }}
                onClick={() => onNavigate('exp-0')}
                className="bg-gradient-to-br from-[#FFF8E7] to-[#FFF4EA] p-5 rounded-xl border border-accent/20 shadow-sm relative overflow-hidden group cursor-pointer"
            >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap size={60} className="text-accent" />
                </div>
                <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 text-accent-dark">
                    <Zap size={20} />
                </div>
                <h3 className="font-black text-text-main leading-tight mb-2">DGIST Research Fellow</h3>
                <p className="text-xs text-text-muted leading-relaxed mb-3">
                    Selected for intensive crypto research at PACL Lab, South Korea. Trained CNNs for side-channel attacks.
                </p>
                <div className="text-[10px] font-bold uppercase text-accent-dark/70 tracking-wide">
                    Global Research • 2025
                </div>
            </motion.div>

            {/* 2. BMC Ireland */}
            <motion.div
                whileHover={{ y: -5 }}
                onClick={() => onNavigate('honor-0')}
                className="bg-gradient-to-br from-[#FFF8E7] to-[#FFF4EA] p-5 rounded-xl border border-accent/20 shadow-sm relative overflow-hidden group cursor-pointer"
            >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy size={60} className="text-yellow-600" />
                </div>
                <div className="p-3 bg-yellow-100 rounded-full w-fit mb-3 text-yellow-700">
                    <Trophy size={20} />
                </div>
                <h3 className="font-black text-text-main leading-tight mb-2">Social Impact Award</h3>
                <p className="text-xs text-text-muted leading-relaxed mb-3">
                    BMC 2025 Winner. Awarded fully funded study trip to Dublin, Ireland by the Embassy of Ireland.
                </p>
                <div className="text-[10px] font-bold uppercase text-yellow-700/70 tracking-wide">
                    International Award • 2025
                </div>
            </motion.div>

            {/* 3. CADT Scholarship */}
            <motion.div
                whileHover={{ y: -5 }}
                onClick={() => onNavigate('honor-1')}
                className="bg-gradient-to-br from-[#FFF8E7] to-[#FFF4EA] p-5 rounded-xl border border-accent/20 shadow-sm relative overflow-hidden group cursor-pointer"
            >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Star size={60} className="text-indigo-500" />
                </div>
                <div className="p-3 bg-indigo-100 rounded-full w-fit mb-3 text-indigo-600">
                    <Star size={20} />
                </div>
                <h3 className="font-black text-text-main leading-tight mb-2">Techo Scholarship</h3>
                <p className="text-xs text-text-muted leading-relaxed mb-3">
                    Full 4-year government scholarship at CADT. Awarded to top-tier engineering students.
                </p>
                <div className="text-[10px] font-bold uppercase text-indigo-600/70 tracking-wide">
                    Academic Merit • 2023-Present
                </div>
            </motion.div>
        </div>
    </div>
)

const UpdateCard = ({ date, title, desc, icon: Icon, type, delay, onClick }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.1 }}
        onClick={onClick}
        className="flex gap-4 p-4 rounded-lg bg-white/60 border border-primary/10 hover:border-primary/30 transition-all hover:shadow-sm group cursor-pointer"
    >
        <div className={`p-2 h-fit rounded-lg bg-${type === 'PUB' ? 'accent' : 'secondary'}/10 text-${type === 'PUB' ? 'accent' : 'secondary'}`}>
            <Icon size={18} />
        </div>

        <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-text-main text-sm group-hover:text-primary transition-colors">{title}</h4>
                <span className="text-[10px] font-mono text-text-muted bg-white/50 px-2 py-1 rounded">{date}</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed mb-2">
                {desc}
            </p>
            <div className="flex gap-2">
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase">
                    {type === 'PUB' ? 'PUBLICATION' : 'PROJECT'}
                </span>
            </div>
        </div>
    </motion.div>
)

const ActivityFeed = ({ onNavigate }) => {
    return (
        <div className="mt-8">
            {/* FEATURED SECTION */}
            <TrophyCabinet onNavigate={onNavigate} />

            <div className="grid md:grid-cols-3 gap-8">
                {/* RECENT UPDATES FEED */}
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-6 border-b-2 border-primary/10 pb-2">
                        <Sparkles size={16} className="text-secondary" />
                        <h2 className="text-sm font-bold font-mono text-text-muted">RECENT_LOGS</h2>
                    </div>

                    <div className="space-y-3">
                        <UpdateCard
                            date="DEC 2025"
                            type="PUB"
                            icon={Book}
                            title="ACET 2025 Paper Accepted"
                            desc="Paper 'Efficient OCR Pipeline for Khmer Documents' successfully compiled and accepted for publication."
                            delay={1}
                            onClick={() => onNavigate('publications')}
                        />
                        <UpdateCard
                            date="DEC 2025"
                            type="PROJ"
                            icon={Zap}
                            title="Capstone Project II Complete"
                            desc="Transformer-based OCR model achieved 0.87 CER. Outperformed legacy Tesseract systems. Optimization complete."
                            delay={2}
                            onClick={() => onNavigate('exp-2')}
                        />
                    </div>
                </div>

                {/* SIDEBAR: LEARNING */}
                <div>
                    <div className="flex items-center gap-2 mb-6 border-b-2 border-primary/10 pb-2">
                        <Target size={16} className="text-primary" />
                        <h2 className="text-sm font-bold font-mono text-text-muted">Currently Learning</h2>
                    </div>

                    <div className="bg-white/40 p-5 rounded-xl border border-white/60 shadow-sm space-y-6">
                        {/* SKILL BARS */}
                        <div>
                            <div className="flex justify-between text-xs mb-1 font-bold text-text-main">
                                <span>EEG Signal Proc</span>
                                <span className="text-primary">65%</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '65%' }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-1 font-bold text-text-main">
                                <span>Adv. Crypto</span>
                                <span className="text-primary">80%</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '80%' }}
                                    className="h-full bg-secondary"
                                />
                            </div>
                        </div>

                        {/* TAGS */}
                        <div className="pt-4 border-t border-primary/10">
                            <span className="text-[10px] font-bold text-text-muted uppercase mb-2 block">Research Focus</span>
                            <div className="flex flex-wrap gap-2">
                                {['Biosignals', 'Edge AI', 'Side-Channel'].map((tag, i) => (
                                    <span key={i} className="text-[10px] px-2 py-1 bg-white border border-primary/10 rounded-md text-text-main">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityFeed
