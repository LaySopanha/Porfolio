import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Briefcase, Calendar, MapPin, ExternalLink, Target, AlertTriangle, 
    Lightbulb, Code, Trophy, Globe, Radio, Clock, Database, 
    ChevronRight, Github, FileText, Link2, Zap, ArrowRight,
    Image as ImageIcon
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SectionContainer from './SectionContainer'
import Modal from './Modal'
import { cvData } from '../data'
import { experiencePages } from '../pages/experience'

// Icon mapping for dynamic icons
const iconMap = {
    Target, AlertTriangle, Lightbulb, Code, Trophy, Globe, 
    Radio, Clock, Database, Zap
}

// Subcomponent: Narrative Text Block
const NarrativeBlock = ({ text }) => (
    <p className="text-gray-300 leading-relaxed text-lg mb-6">
        {text}
    </p>
)

// Subcomponent: Highlight Box
const HighlightBox = ({ title, items }) => (
    <div className="bg-gradient-to-r from-secondary/10 to-violet-600/10 border border-secondary/30 rounded-xl p-6 mb-6">
        <h4 className="text-secondary font-bold text-lg mb-4 flex items-center gap-2">
            <Zap size={20} />
            {title}
        </h4>
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                    <ChevronRight size={16} className="text-secondary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
)

// Subcomponent: Image with Caption
const ImageBlock = ({ src, alt, caption }) => (
    <div className="my-8 group">
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40">
            <div className="aspect-video bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                {/* Placeholder for actual image */}
                <div className="text-center p-8">
                    <ImageIcon size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm font-mono">{src}</p>
                    <p className="text-gray-600 text-xs mt-2">[ Image placeholder - add your image here ]</p>
                </div>
            </div>
            {/* Uncomment below and comment above when you have actual images */}
            {/* <img src={src} alt={alt} className="w-full object-cover" /> */}
        </div>
        {caption && (
            <p className="text-center text-gray-500 text-sm mt-3 italic">
                {caption}
            </p>
        )}
    </div>
)

// Subcomponent: Challenge Cards
const ChallengeCards = ({ challenges }) => (
    <div className="grid md:grid-cols-3 gap-4 my-6">
        {challenges.map((challenge, i) => {
            const Icon = iconMap[challenge.icon] || AlertTriangle
            return (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 hover:border-red-500/40 transition-colors"
                >
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                        <Icon size={20} className="text-red-400" />
                    </div>
                    <h5 className="font-bold text-white mb-2">{challenge.title}</h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{challenge.description}</p>
                </motion.div>
            )
        })}
    </div>
)

// Subcomponent: Code Concept Box
const CodeConceptBox = ({ title, description, formula }) => (
    <div className="bg-black/60 border border-violet-500/30 rounded-xl p-6 my-6 font-mono">
        <h4 className="text-violet-400 font-bold mb-3">{title}</h4>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        {formula && (
            <div className="bg-violet-500/10 rounded-lg p-4 overflow-x-auto">
                <code className="text-violet-300 text-sm whitespace-nowrap">{formula}</code>
            </div>
        )}
    </div>
)

// Subcomponent: Implementation Steps
const ImplementationSteps = ({ steps }) => (
    <div className="space-y-6 my-6">
        {steps.map((step, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-8 border-l-2 border-secondary/30 hover:border-secondary transition-colors"
            >
                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center">
                    <span className="text-secondary font-bold text-xs">{step.number}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-6 ml-4">
                    <h5 className="text-white font-bold text-lg mb-2">{step.title}</h5>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                            <ArrowRight size={14} />
                            <span className="font-medium">{step.result}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {step.tech.map((t, j) => (
                            <span key={j} className="text-xs px-2 py-1 rounded bg-white/10 text-gray-400">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        ))}
    </div>
)

// Subcomponent: Stats Grid
const StatsGrid = ({ stats }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {stats.map((stat, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-secondary/10 to-violet-600/5 border border-secondary/20 rounded-xl p-5 text-center hover:border-secondary/50 transition-colors"
            >
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">{stat.value}</div>
                <div className="text-white font-medium text-sm">{stat.label}</div>
                {stat.subtitle && (
                    <div className="text-gray-500 text-xs mt-1">{stat.subtitle}</div>
                )}
            </motion.div>
        ))}
    </div>
)

// Subcomponent: Insight Box
const InsightBox = ({ title, text }) => (
    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 my-6">
        <h4 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
            <Lightbulb size={20} />
            {title}
        </h4>
        <p className="text-gray-300 leading-relaxed">{text}</p>
    </div>
)

// Subcomponent: Image Gallery
const ImageGallery = ({ images }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {images.map((img, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-secondary/50 transition-all cursor-pointer"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                    <ImageIcon size={24} className="text-gray-600" />
                </div>
                {/* Uncomment when you have actual images */}
                {/* <img src={img.src} alt={img.alt} className="w-full h-full object-cover" /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-xs font-medium">{img.caption}</span>
                </div>
            </motion.div>
        ))}
    </div>
)

// Subcomponent: Experience Highlights
const ExperienceHighlights = ({ highlights }) => (
    <div className="grid md:grid-cols-3 gap-4 my-6">
        {highlights.map((h, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h5 className="text-secondary font-bold mb-3">{h.category}</h5>
                <ul className="space-y-2">
                    {h.items.map((item, j) => (
                        <li key={j} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-secondary">•</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
)

// Main content renderer for detailed sections
const renderContent = (content) => {
    return content.map((block, index) => {
        switch (block.type) {
            case 'narrative':
                return <NarrativeBlock key={index} text={block.text} />
            case 'highlight-box':
                return <HighlightBox key={index} title={block.title} items={block.items} />
            case 'image':
                return <ImageBlock key={index} src={block.src} alt={block.alt} caption={block.caption} />
            case 'challenge-cards':
                return <ChallengeCards key={index} challenges={block.challenges} />
            case 'code-concept':
                return <CodeConceptBox key={index} title={block.title} description={block.description} formula={block.formula} />
            case 'implementation-steps':
                return <ImplementationSteps key={index} steps={block.steps} />
            case 'stats-grid':
                return <StatsGrid key={index} stats={block.stats} />
            case 'insight-box':
                return <InsightBox key={index} title={block.title} text={block.text} />
            case 'image-gallery':
                return <ImageGallery key={index} images={block.images} />
            case 'experience-highlights':
                return <ExperienceHighlights key={index} highlights={block.highlights} />
            default:
                return null
        }
    })
}

// Detailed Experience View Component
const DetailedExperienceView = ({ exp }) => {
    const [activeSection, setActiveSection] = useState(exp.detailed?.sections?.[0]?.id || null)

    if (!exp.detailed) {
        // Fallback for experiences without detailed content
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Meta Data Bar */}
                <div className="flex flex-wrap gap-6 text-sm md:text-base border-b border-white/10 pb-6">
                    <div className="flex items-center gap-2 text-secondary">
                        <Briefcase size={18} />
                        <span className="font-semibold">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={18} />
                        <span className="font-mono">{exp.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <MapPin size={18} />
                        <span>{exp.location}</span>
                    </div>
                </div>

                {/* Description content */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-secondary">/</span> Key Responsibilities
                    </h3>
                    <ul className="space-y-4">
                        {exp.description.map((item, i) => (
                            <li key={i} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                <span className="text-secondary font-mono mt-1">0{i + 1}</span>
                                <p className="text-gray-300 leading-relaxed">{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Placeholder for "Demo/Images" */}
                <div className="p-6 rounded-xl border border-dashed border-white/10 bg-black/20 text-center">
                    <p className="text-gray-500 text-sm font-mono">
                        [ NO_VISUAL_DATA_ATTACHED ]
                    </p>
                </div>
            </div>
        )
    }

    // Rich detailed view
    const { detailed } = exp

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Hero Section with Full Image */}
            <div className="relative -mx-6 md:-mx-10 -mt-6 md:-mt-10">
                {/* Hero Image Container */}
                <div className="relative h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
                    {/* Background Image */}
                    {detailed.heroImage && (
                        <img 
                            src={detailed.heroImage} 
                            alt={exp.role}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                    )}
                    
                    {/* Gradient Overlay - fades from transparent to dark at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/50 to-transparent"></div>
                    
                    {/* Additional top gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/30 via-transparent to-transparent"></div>
                    
                    {/* Content Overlay at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                        <p className="text-secondary font-mono text-xs md:text-sm mb-3 tracking-wider">
                            {detailed.tagline}
                        </p>
                        
                        {/* Title */}
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                            {exp.role}
                        </h2>

                        {/* Meta Data Bar */}
                        <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm">
                            <div className="flex items-center gap-2 text-secondary">
                                <Briefcase size={16} />
                                <span className="font-semibold">{exp.company}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <Calendar size={16} />
                                <span className="font-mono">{exp.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <MapPin size={16} />
                                <span>{exp.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overview - below hero */}
            <div className="pt-2">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed border-l-4 border-secondary pl-6">
                    {detailed.overview}
                </p>
            </div>

            {/* Section Navigation */}
            <div className="sticky top-0 z-10 bg-[#0a0a0c]/95 backdrop-blur-sm py-4 -mx-6 md:-mx-10 px-6 md:px-10 border-b border-white/10">
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    {detailed.sections.map((section) => {
                        const Icon = iconMap[section.icon] || Briefcase
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                                    activeSection === section.id
                                        ? 'bg-secondary text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Icon size={16} />
                                {section.title}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Active Section Content */}
            <AnimatePresence mode="wait">
                {detailed.sections.map((section) => {
                    if (section.id !== activeSection) return null
                    const Icon = iconMap[section.icon] || Briefcase

                    return (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="min-h-[400px]"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                                    <Icon size={20} className="text-secondary" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                            </div>

                            {renderContent(section.content)}
                        </motion.div>
                    )
                })}
            </AnimatePresence>

            {/* Tech Stack Footer */}
            {detailed.techStack && (
                <div className="pt-6 border-t border-white/10">
                    <h4 className="text-sm font-mono text-gray-500 mb-3">TECH_STACK</h4>
                    <div className="flex flex-wrap gap-2">
                        {detailed.techStack.map((tech, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 rounded-full bg-white/5 text-secondary text-sm border border-secondary/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Links Footer */}
            {detailed.links && (
                <div className="flex flex-wrap gap-4 pt-4">
                    {detailed.links.github && detailed.links.github !== '#' && (
                        <a
                            href={detailed.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <Github size={18} />
                            <span>View Code</span>
                        </a>
                    )}
                    {detailed.links.paper && detailed.links.paper !== '#' && (
                        <a
                            href={detailed.links.paper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <FileText size={18} />
                            <span>Read Paper</span>
                        </a>
                    )}
                    {detailed.links.challenge && (
                        <a
                            href={detailed.links.challenge}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                        >
                            <Link2 size={18} />
                            <span>CHES 2025 Challenge</span>
                        </a>
                    )}
                </div>
            )}
        </div>
    )
}

const Experience = () => {
    const [selectedExp, setSelectedExp] = useState(null)
    const navigate = useNavigate()

    return (
        <SectionContainer id="experience" title="Experience">
            {/* Grid of "Item Cards" */}
            <div className="grid md:grid-cols-2 gap-6">
                {cvData.experience.map((exp, index) => {
                    const key = String(index)
                    const hasDedicatedRoute = Boolean(experiencePages[key])
                    const hasDetailedView = hasDedicatedRoute || Boolean(exp.detailed)

                    const handleClick = () => {
                        if (hasDedicatedRoute) {
                            navigate(`/experience/${key}`)
                        } else {
                            setSelectedExp(exp)
                        }
                    }

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={handleClick}
                            className="group cursor-pointer"
                        >
                            <div className="glass-card p-6 h-full border border-white/5 hover:border-secondary/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-secondary/10 to-transparent -mr-8 -mt-8 rounded-full blur-xl group-hover:from-secondary/20 transition-all"></div>

                                {/* Badge for detailed experiences */}
                                {hasDetailedView && (
                                    <div className="absolute top-4 right-4">
                                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-secondary/20 text-secondary border border-secondary/30">
                                            DETAILED
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 rounded-lg bg-white/5 text-secondary group-hover:scale-110 transition-transform">
                                        <Briefcase size={24} />
                                    </div>
                                    <span className="text-xs font-mono py-1 px-2 rounded bg-white/5 text-gray-400">
                                        #{index + 1}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                                    {exp.role}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-1">
                                    {exp.company}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-violet-400 font-mono">
                                    <span>{hasDetailedView ? 'View Details →' : 'Learn More →'}</span>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Detail Modal */}
            <Modal
                isOpen={!!selectedExp}
                onClose={() => setSelectedExp(null)}
                title={selectedExp?.role || "Experience"}
            >
                {selectedExp && <DetailedExperienceView exp={selectedExp} />}
            </Modal>
        </SectionContainer>
    )
}

export default Experience
