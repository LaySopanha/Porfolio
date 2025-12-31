import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Globe, Target, Cpu, Database, Radio, Clock, EyeOff, Layout, Terminal, Zap, Download } from 'lucide-react';

const ICON_MAP = {
    Globe, Target, Cpu, Database, Radio, Clock, EyeOff, Layout, Building: Layout
};

const RetroWindow = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`bg-[#FFF4EA] border-t-2 border-l-2 border-[#FFF8E7] border-b-2 border-r-2 border-[#C96868] shadow-[4px_4px_0px_0px_rgba(201,104,104,0.3)] p-1 ${className}`}>
        <div className="bg-[#C96868] text-white px-2 py-1 flex justify-between items-center mb-1 border border-[#C96868]">
            <div className="flex items-center gap-2 font-bold text-sm tracking-wider font-mono">
                {Icon && <Icon size={14} />}
                <span className="truncate">{title}</span>
            </div>
            <div className="flex gap-1">
                <button className="w-4 h-4 bg-[#FFF4EA] border border-[#C96868] flex items-center justify-center hover:bg-[#FFE4C4]">
                    <Minus size={10} className="text-[#C96868]" />
                </button>
                <button className="w-4 h-4 bg-[#FFF4EA] border border-[#C96868] flex items-center justify-center hover:bg-[#FFE4C4]">
                    <Square size={8} className="text-[#C96868]" />
                </button>
                <button className="w-4 h-4 bg-[#FFF4EA] border border-[#C96868] flex items-center justify-center hover:bg-[#FFE4C4]">
                    <X size={10} className="text-[#C96868]" />
                </button>
            </div>
        </div>
        <div className="bg-white border-2 border-[#C96868]/30 p-4 text-[#4A4A4A] font-sans">
            {children}
        </div>
    </div>
);

const SectionDivider = ({ title }) => (
    <div className="flex items-center gap-4 my-12">
        <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-[#C96868]/50" />
        <h2 className="text-xl md:text-2xl font-black text-[#C96868] uppercase tracking-widest bg-[#FFF4EA] px-6 py-2 border-2 border-[#C96868] shadow-sm font-mono">
            {title}
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-[#C96868]/50 to-transparent" />
    </div>
);

const RichExperienceView = ({ data }) => {

    const renderContentItem = (item, index) => {
        switch (item.type) {
            case 'narrative':
                return (
                    <p key={index} className="mb-6 text-base md:text-lg leading-relaxed text-[#4A4A4A] font-medium border-l-4 border-[#7EACB5] pl-4 bg-[#7EACB5]/5 py-2">
                        {item.text}
                    </p>
                );

            case 'image-gallery':
                return (
                    <div key={index} className="mb-8">
                        {item.title && <h4 className="font-bold text-[#7EACB5] mb-4 uppercase text-sm border-b-2 border-[#7EACB5]/30 inline-block tracking-wider font-mono">{item.title}</h4>}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {item.images.map((img, i) => (
                                <div key={i} className="group relative">
                                    <div className="bg-[#FFF8E7] border-2 border-[#C96868]/30 p-1 shadow-sm hover:shadow-[4px_4px_0px_0px_rgba(201,104,104,0.3)] transition-all">
                                        <div className="aspect-square overflow-hidden bg-[#C96868]/10">
                                            <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        </div>
                                        <div className="text-center mt-1 bg-white border border-[#C96868]/10 py-1">
                                            <span className="text-[10px] font-mono font-bold uppercase truncate block px-1 text-[#7EACB5]">{img.caption}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'highlight-box':
                return (
                    <div key={index} className="bg-[#FFF8E7] border-2 border-[#C96868] p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(201,104,104,0.3)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                            <Zap size={80} className="text-[#C96868]" />
                        </div>
                        <h4 className="text-[#C96868] font-black uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-[#C96868]/20 pb-2">
                            <Zap size={16} /> {item.title}
                        </h4>
                        <ul className="space-y-2 relative z-10">
                            {item.items.map((it, i) => (
                                <li key={i} className="text-sm font-medium text-[#4A4A4A] flex items-start gap-2">
                                    <span className="mt-1 text-[#7EACB5] font-black">➜</span> {it}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'challenge-cards':
                return (
                    <div key={index} className="grid md:grid-cols-3 gap-4 mb-8">
                        {item.challenges.map((c, i) => {
                            const Icon = ICON_MAP[c.icon] || Target;
                            return (
                                <div key={i} className="bg-white border-2 border-[#C96868]/20 p-4 shadow-sm hover:border-[#C96868] transition-colors group">
                                    <div className="text-[#C96868] mb-3 group-hover:scale-110 transition-transform"><Icon size={24} /></div>
                                    <h5 className="font-bold text-sm mb-2 text-[#4A4A4A] uppercase tracking-wide">{c.title}</h5>
                                    <p className="text-xs text-[#888888] leading-relaxed group-hover:text-[#4A4A4A] transition-colors">{c.description}</p>
                                </div>
                            )
                        })}
                    </div>
                );

            case 'process-diagram':
                return (
                    <div key={index} className="mb-8 p-6 bg-[#FFF4EA] border-2 border-dashed border-[#C96868]/40 rounded-lg">
                        <h4 className="font-bold text-center mb-6 uppercase text-xs tracking-[0.2em] text-[#C96868]">{item.title}</h4>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {item.steps.map((step, i) => (
                                <React.Fragment key={i}>
                                    <div className="bg-white border-2 border-[#C96868] px-4 py-3 shadow-[4px_4px_0px_0px_rgba(201,104,104,0.2)] text-center w-full md:w-auto relative group hover:-translate-y-1 transition-transform">
                                        <span className="font-bold text-xs uppercase text-[#4A4A4A] font-mono">{step}</span>
                                        <div className="absolute inset-0 border border-white/50 pointer-events-none" />
                                    </div>
                                    {i < item.steps.length - 1 && (
                                        <div className="text-[#7EACB5] font-black transform rotate-90 md:rotate-0 flex-shrink-0">➜</div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                );

            case 'chart-bar':
                const maxValue = Math.max(...item.data.map(d => d.value));
                return (
                    <div key={index} className="mb-8 border-2 border-[#C96868]/20 bg-white p-6 shadow-sm">
                        <h4 className="font-bold mb-6 flex items-center gap-2 uppercase text-sm text-[#4A4A4A]">
                            <Database size={16} className="text-[#7EACB5]" /> {item.title}
                        </h4>
                        <div className="space-y-4">
                            {item.data.map((d, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between text-xs font-mono mb-1 text-[#4A4A4A]">
                                        <span className="font-bold">{d.label}</span>
                                        <span className="text-[#888888]">{d.value.toLocaleString()}</span>
                                    </div>
                                    <div className="h-6 bg-[#FFF4EA] w-full border border-[#C96868]/10 relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(d.value / maxValue) * 100}%` }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                            className="h-full absolute left-0 top-0 flex items-center justify-end px-2"
                                            style={{ backgroundColor: d.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-center mt-6 text-[#888888] italic border-t border-[#C96868]/10 pt-4">{item.caption}</p>
                    </div>
                );

            case 'insight-box':
                return (
                    <div key={index} className="bg-[#7EACB5]/10 p-6 border-l-4 border-[#7EACB5] mb-6 rounded-r-lg">
                        <h4 className="font-bold text-[#7EACB5] text-sm mb-2 uppercase tracking-wider">{item.title}</h4>
                        <p className="text-sm italic text-[#4A4A4A] font-medium leading-relaxed">"{item.text}"</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full pb-20 bg-[#FFF4EA] min-h-screen font-sans">
            {/* HERO SECTION */}
            <div className="relative">
                {/* Cover Image - Full Width Banner */}
                <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                    <img
                        src={data.heroImage || "/images/placeholder.jpg"}
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Text Overlay - Bottom Left */}
                    <div className="absolute bottom-8 left-4 md:left-8 z-20 max-w-2xl">
                        <span className="inline-block bg-[#C96868] text-white px-3 py-1.5 text-xs font-mono tracking-widest uppercase shadow-lg mb-4">
                            Confidential • Intern Report
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black font-mono tracking-tighter uppercase text-white leading-none drop-shadow-lg mb-3">
                            {data.title || "DGIST Internship"}
                        </h1>
                        <p className="text-sm md:text-lg font-medium text-white/90 leading-relaxed drop-shadow-md mb-6">
                            {data.tagline}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {data.links?.company && (
                                <a href={data.links.company} target="_blank" rel="noreferrer" className="bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white px-4 py-2 hover:bg-white hover:text-[#C96868] transition-all text-xs font-bold uppercase tracking-wider">
                                    Visit Lab
                                </a>
                            )}
                            {data.links?.paper && (
                                <a href={data.links.paper} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#C96868] text-white border-2 border-[#C96868] px-4 py-2 text-xs font-bold uppercase hover:bg-[#C96868]/80 transition-all tracking-wider">
                                    <Download size={14} /> Download Report
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTIONS */}
            <div className="px-4 md:px-8 py-12 space-y-16 bg-[#FFF4EA] relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#C96868 2px, transparent 2px)',
                        backgroundSize: '30px 30px'
                    }}
                />

                {data.sections?.map((section) => {
                    const SectionIcon = ICON_MAP[section.icon] || Globe;

                    return (
                        <motion.section
                            key={section.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10"
                        >
                            <SectionDivider title={section.title} />

                            <div className="w-full">
                                <RetroWindow title={section.title} icon={SectionIcon}>
                                    <div className="space-y-4">
                                        {section.content.map((item, i) => renderContentItem(item, i))}
                                    </div>
                                </RetroWindow>
                            </div>
                        </motion.section>
                    );
                })}
            </div>

            {/* FOOTER */}
            <div className="bg-[#C96868] text-white py-8 text-center font-mono text-xs border-t-8 border-[#FFF8E7]">
                <p className="opacity-70 mb-2">DGIST PRIVACY & APPLIED CRYPTOGRAPHY LAB</p>
                <p className="font-bold tracking-widest">/// END OF REPORT ///</p>
            </div>
        </div>
    );
};

export default RichExperienceView;
