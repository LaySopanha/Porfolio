import { motion } from 'framer-motion'
import { cvData } from '../data'
import { FileText, Calendar, MapPin, Tag, ExternalLink } from 'lucide-react'
import RichExperienceView from './RichExperienceView'

const FileViewer = ({ fileId }) => {
    // Determine Type & Index from ID (e.g., "exp-0", "proj-1", "honors")
    const [type, indexStr] = fileId.split('-')
    const index = parseInt(indexStr)

    let data = null
    let categoryLabel = ""

    if (type === 'exp') {
        data = cvData.experience[index]
        categoryLabel = "MISSION_LOG"
    } else if (type === 'proj') {
        data = cvData.projects[index]
        categoryLabel = "PROJECT_PROTOCOL"
    } else if (type === 'pub') {
        data = cvData.publications[index]
        categoryLabel = "RESEARCH_PAPER"
    } else if (type === 'honor') {
        data = cvData.honors[index]
        categoryLabel = "HALL_OF_FAME"
    } else if (fileId === 'publications') {
        categoryLabel = "PUBLICATIONS"
    }

    // Handle publications list view
    if (fileId === 'publications') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                key={fileId}
                className="max-w-4xl mx-auto h-full p-4 md:p-8 overflow-y-auto custom-scrollbar"
            >
                <div className="border-b-2 border-primary mb-8 pb-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="bg-primary text-white text-xs font-mono px-2 py-1 rounded">{categoryLabel}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-text-main">Research Publications</h1>
                </div>

                <div className="space-y-6">
                    {cvData.publications.map((pub, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/50 p-6 rounded-lg border border-primary/20"
                        >
                            <h3 className="text-xl font-bold text-text-main mb-2">{pub.title}</h3>
                            <p className="text-sm text-text-muted italic mb-2">{pub.authors}</p>
                            <p className="text-sm text-secondary font-bold mb-3">{pub.venue}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-text-muted bg-white/60 px-2 py-1 rounded">
                                    {pub.year}
                                </span>
                                {pub.link && pub.link !== '#' && (
                                    <a
                                        href={pub.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                    >
                                        View Paper <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        )
    }

    if (!data) return <div className="p-8 text-center text-text-muted">FILE_CORRUPTED_OR_NOT_FOUND</div>

    // Check for Rich Detailed View (Storytelling Mode)
    if (data.detailed) {
        return (
            <div className="h-full w-full overflow-y-auto custom-scrollbar bg-white/40">
                <RichExperienceView data={{ ...data.detailed, title: data.role, company: data.company }} />
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            key={fileId} // Force re-render on file change for animation
            className="max-w-4xl mx-auto h-full p-4 md:p-8 overflow-y-auto custom-scrollbar"
        >
            {/* FILE HEADER */}
            <div className="border-b-2 border-primary mb-8 pb-4">
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-primary text-white text-xs font-mono px-2 py-1 rounded">{categoryLabel}</span>
                    <span className="font-mono text-xs text-text-muted">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <h1 className="text-3xl font-bold text-text-main">
                    {data.role || data.name || data.title}
                </h1>
                {data.company && <h2 className="text-xl text-secondary mt-1">{data.company}</h2>}
                {data.authors && <p className="text-text-muted mt-1 italic">{data.authors}</p>}
            </div>

            {/* META DATA GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm">
                {data.date && (
                    <div className="flex items-center gap-2 bg-white/50 p-3 rounded border border-primary/10">
                        <Calendar size={16} className="text-primary" />
                        <span className="font-mono">{data.date}</span>
                    </div>
                )}
                {data.year && (
                    <div className="flex items-center gap-2 bg-white/50 p-3 rounded border border-primary/10">
                        <Calendar size={16} className="text-primary" />
                        <span className="font-mono">{data.year}</span>
                    </div>
                )}
                {data.issuer && (
                    <div className="flex items-center gap-2 bg-white/50 p-3 rounded border border-primary/10">
                        <Tag size={16} className="text-accent" />
                        <span className="font-bold">{data.issuer}</span>
                    </div>
                )}
                {data.location && (
                    <div className="flex items-center gap-2 bg-white/50 p-3 rounded border border-primary/10">
                        <MapPin size={16} className="text-secondary" />
                        <span>{data.location}</span>
                    </div>
                )}
                {data.venue && (
                    <div className="flex items-center gap-2 bg-white/50 p-3 rounded border border-primary/10 col-span-2">
                        <ExternalLink size={16} className="text-accent-dark" />
                        <span>{data.venue}</span>
                    </div>
                )}
                {data.tech && (
                    <div className="flex items-center gap-2 bg-white/50 p-3 rounded border border-primary/10 col-span-2">
                        <Tag size={16} className="text-secondary" />
                        <span className="font-mono">{data.tech}</span>
                    </div>
                )}
            </div>

            {/* MAIN TYPEWRITER CONTENT */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/10 font-mono text-sm md:text-base leading-relaxed text-text-muted relative overflow-hidden">
                {/* Decorative watermark */}
                <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl font-black text-primary rotate-12 pointer-events-none">CONFIDENTIAL</div>

                {type === 'exp' && (
                    <ul className="space-y-4">
                        {data.description.map((item, i) => (
                            <li key={i} className="flex gap-3">
                                <span className="text-primary select-none mt-1">&gt;&gt;</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {type === 'honor' && (
                    <div>
                        <p className="mb-4 text-justify text-lg">{data.description}</p>
                    </div>
                )}

                {(type === 'proj' || type === 'pub') && (
                    <div>
                        <p className="mb-4 text-justify">{data.description || "No further data available."}</p>
                        {data.link && (
                            <a href={data.link} className="inline-block mt-4 text-primary underline hover:text-primary/80">
                                ACCESS_EXTERNAL_RESOURCE_LINK
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default FileViewer
