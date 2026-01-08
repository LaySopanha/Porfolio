import React from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Minus, Square, Globe, Target, Cpu, Database, Radio, Clock, EyeOff, Layout, Terminal as PlatformIcon, Zap, Download, Swords } from 'lucide-react';

const ICON_MAP = {
    Globe, Target, Cpu, Database, Radio, Clock, EyeOff, Layout, Building: Layout, Trophy: PlatformIcon, Swords, Zap
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

    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsNavOpen(false);
        }
    };

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
                                <div key={i} className="group relative cursor-zoom-in" onClick={() => setSelectedImage(img)}>
                                    <div className="bg-[#FFF8E7] border-2 border-[#C96868]/30 p-1 shadow-sm hover:shadow-[4px_4px_0px_0px_rgba(201,104,104,0.3)] transition-all">
                                        <div className="aspect-square overflow-hidden bg-[#C96868]/10">
                                            <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async" />
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
                        {item.link && (
                            <div className="mt-4">
                                {item.link.startsWith('/') ? (
                                    <Link to={item.link} className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#7EACB5] hover:text-[#C96868] transition-colors tracking-wider border-b border-[#7EACB5]/30 pb-0.5 hover:border-[#C96868]">
                                        <Globe size={12} /> {item.linkText || "Learn More"}
                                    </Link>
                                ) : (
                                    <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#7EACB5] hover:text-[#C96868] transition-colors tracking-wider border-b border-[#7EACB5]/30 pb-0.5 hover:border-[#C96868]">
                                        <Globe size={12} /> {item.linkText || "Learn More"}
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                );

            case 'image':
                return (
                    <div key={index} className="mb-8 group cursor-zoom-in" onClick={() => setSelectedImage(item)}>
                        <div className="bg-[#FFF8E7] border-2 border-[#C96868] p-1 shadow-[4px_4px_0px_0px_rgba(201,104,104,0.3)] transition-all transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(201,104,104,0.4)]">
                            <div className="overflow-hidden bg-[#C96868]/10 relative">
                                <div className="absolute inset-0 bg-[#C96868]/10 mix-blend-multiply pointer-events-none" />
                                <img src={item.src} alt={item.alt} className="w-full h-auto object-cover transition-all duration-500" loading="lazy" decoding="async" />
                            </div>
                            <div className="text-center mt-1 bg-white border border-[#C96868]/10 py-1">
                                <span className="text-[10px] font-mono font-bold uppercase truncate block px-1 text-[#7EACB5]">
                                    FIG_{index + 1}: {item.caption}
                                </span>
                            </div>
                        </div>
                    </div>
                );

            case 'split-content':
                const imageWidth = item.isLarge ? 'md:w-[65%]' : 'md:w-1/2';
                const textWidth = item.isLarge ? 'md:w-[35%]' : 'md:w-1/2';

                return (
                    <div key={index} className="flex flex-col md:flex-row gap-6 mb-8 items-center">
                        <div className={`w-full ${imageWidth} ${item.reverse ? 'md:order-2' : 'md:order-1'}`}>
                            <div className="bg-[#FFF8E7] border-2 border-[#C96868] p-1 shadow-[4px_4px_0px_0px_rgba(201,104,104,0.3)] rotate-1 hover:rotate-0 transition-transform duration-300 w-fit mx-auto max-w-full">
                                <div className="overflow-hidden bg-white relative flex items-center justify-center">
                                    <img src={item.src} alt={item.alt} className={`w-auto max-w-full h-auto ${item.isLarge ? 'max-h-[600px]' : 'max-h-[400px]'} object-contain transition-all duration-500`} loading="lazy" decoding="async" />
                                </div>
                                <div className="text-center mt-1 bg-white border border-[#C96868]/10 py-1">
                                    <span className="text-[10px] font-mono font-bold uppercase truncate block px-1 text-[#7EACB5]">
                                        {item.caption}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={`w-full ${textWidth} ${item.reverse ? 'md:order-1' : 'md:order-2'}`}>
                            {item.title && <h4 className="font-bold text-[#7EACB5] text-lg mb-4 uppercase inline-block border-b-2 border-[#C96868]">{item.title}</h4>}
                            <p className="text-base leading-relaxed text-[#4A4A4A] font-medium text-justify">
                                {item.text}
                            </p>
                        </div>
                    </div>
                );

            case 'table':
                return (
                    <div key={index} className="overflow-x-auto mb-8 bg-white border-2 border-[#C96868] shadow-[4px_4px_0px_0px_rgba(201,104,104,0.3)]">
                        <div className="bg-[#FFF4EA] p-3 border-b-2 border-[#C96868] flex items-center justify-between">
                            <h4 className="font-black text-[#C96868] uppercase tracking-widest text-xs flex items-center gap-2 font-mono">
                                <PlatformIcon size={16} /> {item.title}
                            </h4>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#ff5f56] border border-[#e0453e]" />
                                <div className="w-2 h-2 rounded-full bg-[#ffbd2e] border border-[#dfa123]" />
                                <div className="w-2 h-2 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                            </div>
                        </div>
                        <table className="w-full text-xs font-mono text-left border-collapse">
                            <thead>
                                <tr className="bg-[#C96868]/5 text-[#C96868]">
                                    {item.headers.map((h, i) => (
                                        <th key={i} className="p-3 border-b-2 border-[#C96868] border-r border-[#C96868]/20 last:border-r-0 font-bold uppercase tracking-wider whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#C96868]/20">
                                {item.rows.map((row, i) => (
                                    <tr key={i} className="hover:bg-[#FFF8E7] transition-colors group">
                                        {row.map((cell, j) => {
                                            // Simple logic to highlight success/fail based on cell content if it's a number-like string
                                            const isScore = j > 1; // Assuming first 2 cols are ID/Type
                                            let cellColor = "text-[#4A4A4A]";
                                            let cellBg = "";

                                            // Check if cell is a score (contains numbers and comma, no letters basically)
                                            if (isScore && /^[0-9,.]+$/.test(cell)) {
                                                const val = parseFloat(cell.replace(/,/g, ''));
                                                if (val < 100000) {
                                                    cellColor = "text-green-600 font-bold";
                                                    cellBg = "bg-green-50/50";
                                                } else if (val > 200000) {
                                                    cellColor = "text-red-400 opacity-60";
                                                }
                                            }

                                            return (
                                                <td key={j} className={`p-3 border-r border-[#C96868]/10 last:border-r-0 ${cellColor} ${cellBg}`}>
                                                    {cell}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {item.caption && (
                            <div className="p-3 text-[10px] text-[#888888] font-mono bg-[#FAFAFA] border-t border-[#C96868]/20 uppercase tracking-wide flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full inline-block" /> Success (&lt;100k)
                                <span className="w-2 h-2 bg-red-400 rounded-full inline-block ml-2 opacity-60" /> Fail (&gt;200k)
                                <span className="ml-auto opacity-70">{item.caption}</span>
                            </div>
                        )}
                    </div>
                );

                return null;
        }
    };

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [selectedImage, setSelectedImage] = React.useState(null);

    return (
        <div className="w-full pb-20 bg-[#FFF4EA] min-h-screen font-sans relative">
            {/* LIGHTBOX OVERLAY */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-[90vh] object-contain border-4 border-white shadow-2xl"
                        />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 font-mono text-sm">
                            {selectedImage.caption}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-2 bg-[#C96868] origin-left z-50 border-b border-white/20"
                style={{ scaleX }}
            />

            {/* Quick Nav Button */}
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 pointer-events-none">
                {/* Pointer events none on container so it doesn't block clicks, re-enable on children */}
                <AnimatePresence>
                    {isNavOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="bg-[#C96868] text-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] border-2 border-[#FFF8E7] min-w-[200px] pointer-events-auto"
                        >
                            <div className="text-xs font-mono font-bold border-b border-white/20 pb-2 mb-2 uppercase tracking-wider flex justify-between items-center">
                                <span>Jump To Section</span>
                                <span className="text-[10px] opacity-70">NAV.SYS</span>
                            </div>
                            <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto custom-scrollbar">
                                {data.sections?.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => scrollToSection(s.id)}
                                        className="text-left text-xs font-bold py-2 px-3 hover:bg-[#FFF4EA] hover:text-[#C96868] transition-colors uppercase tracking-wide flex items-center gap-2 group w-full"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">►</span>
                                        <span className="truncate">{s.title.split(":")[0]}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="pointer-events-auto bg-[#C96868] text-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] border-2 border-[#FFF8E7] hover:bg-[#b05555] transition-colors group flex items-center justify-center rounded-sm"
                >
                    <Layout size={24} className="group-hover:rotate-180 transition-transform duration-500" />
                </button>
            </div>

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
                            {data.links?.publication && (
                                data.links.publication.startsWith('/') ? (
                                    <Link to={data.links.publication} className="flex items-center gap-2 bg-white text-[#C96868] border-2 border-white px-4 py-2 text-xs font-bold uppercase hover:bg-white/90 transition-all tracking-wider">
                                        <Globe size={14} /> Read Publication
                                    </Link>
                                ) : (
                                    <a href={data.links.publication} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white text-[#C96868] border-2 border-white px-4 py-2 text-xs font-bold uppercase hover:bg-white/90 transition-all tracking-wider">
                                        <Globe size={14} /> Read Publication
                                    </a>
                                )
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
                            id={section.id}
                            key={section.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 scroll-mt-24"
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
                {(data.footerText || data.company) && (
                    <p className="opacity-70 mb-2">{data.footerText || data.company}</p>
                )}
                <p className="font-bold tracking-widest">/// END OF REPORT ///</p>
            </div>
        </div>
    );
};

export default RichExperienceView;
