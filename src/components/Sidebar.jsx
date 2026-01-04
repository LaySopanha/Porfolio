import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown, User, FileCode, Award, ExternalLink } from 'lucide-react'
import { cvData } from '../data'

// Map icons to file types
const FileIcon = ({ name }) => {
    if (name.includes('.sys')) return <User size={16} className="text-secondary" />
    if (name.includes('.log')) return <FileText size={16} className="text-primary" />
    if (name.includes('.exe')) return <FileCode size={16} className="text-accent-dark" /> // Adjusted color usage
    return <FileText size={16} />
}

const FileItem = ({ name, id, activeId, icon, onClick, depth = 0 }) => {
    return (
        <motion.button
            whileHover={{ x: 4, backgroundColor: 'rgba(201, 104, 104, 0.1)' }}
            onClick={onClick}
            className={`
        w-full flex items-center md:justify-start gap-4 md:gap-2 py-4 md:py-1.5 px-4 md:px-2 
        text-lg md:text-sm font-mono transition-all rounded-none md:rounded
        ${activeId === id
                    ? 'text-primary font-bold bg-primary/10 border-l-4 md:border-l-0 border-primary'
                    : 'text-text-muted hover:text-text-main hover:bg-white/5'}
      `}
            style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
        >
            {icon || <FileIcon name={name} />}
            <span>{name}</span>
        </motion.button>
    )
}

const FolderItem = ({ name, children, defaultOpen = false, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div>
            <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center md:justify-start gap-4 md:gap-2 py-4 md:py-1.5 px-4 md:px-2 text-lg md:text-sm font-bold text-text-main hover:text-primary transition-colors"
                style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
            >
                <span className="text-primary/70">
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
                <span className="text-secondary">
                    {isOpen ? <FolderOpen size={16} /> : <Folder size={16} />}
                </span>
                <span>{name}</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const Sidebar = ({ currentFile, onFileSelect }) => {
    return (
        <div className="h-full bg-white/50 backdrop-blur-sm border-r border-primary/20 flex flex-col">
            <div className="p-4 border-b border-primary/20 bg-background/50">
                <h2 className="font-bold text-primary flex items-center gap-2">
                    <ChevronDown size={18} />
                    Portfolio
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                {/* ROOT FOLDER */}
                <div className="mb-2 pl-2 font-mono text-xs text-secondary/70">/mnt/user/lay_sopanha/</div>

                {/* PROFILE */}
                <FileItem
                    name="character_profile.sys"
                    id="profile"
                    activeId={currentFile}
                    onClick={() => onFileSelect('profile')}
                />

                {/* EXPERIENCE FOLDER */}
                <FolderItem name="experience" defaultOpen={true}>
                    {cvData.experience.map((exp, idx) => {
                        const defaultLabel = `${exp.company.split(' ')[0].toLowerCase()}.md`
                        const label = exp.sidebarLabel || defaultLabel

                        return (
                            <FileItem
                                key={`exp-${idx}`}
                                name={label}
                                id={`exp-${idx}`}
                                activeId={currentFile}
                                onClick={() => onFileSelect(`exp-${idx}`)}
                                depth={1}
                            />
                        )
                    })}
                </FolderItem>

                {/* PROJECTS FOLDER */}
                <FolderItem name="projects" defaultOpen={true}>
                    {cvData.projects.map((proj, idx) => (
                        <FileItem
                            key={`proj-${idx}`}
                            name={`${proj.name.split(' ')[0].toLowerCase()}.ts`}
                            id={`proj-${idx}`}
                            activeId={currentFile}
                            onClick={() => onFileSelect(`proj-${idx}`)}
                            depth={1}
                        />
                    ))}
                </FolderItem>

                {/* PUBLICATIONS FOLDER */}
                <FolderItem name="publications">
                    <FileItem
                        name="publications_index.md"
                        id="publications"
                        activeId={currentFile}
                        onClick={() => onFileSelect('publications')}
                        depth={1}
                    />
                    {cvData.publications.map((pub, idx) => (
                        <FileItem
                            key={`pub-${idx}`}
                            name={`paper_${2025 + idx}.pdf`}
                            id={`pub-${idx}`}
                            activeId={currentFile}
                            onClick={() => onFileSelect(`pub-${idx}`)}
                            depth={1}
                        />
                    ))}
                </FolderItem>

                {/* HONORS & AWARDS */}
                <FolderItem name="awards">
                    {cvData.honors.map((honor, idx) => (
                        <FileItem
                            key={`honor-${idx}`}
                            name={idx === 0 ? 'bmc_ireland_2025.award' : 'techo_scholarship.cert'}
                            id={`honor-${idx}`}
                            activeId={currentFile}
                            onClick={() => onFileSelect(`honor-${idx}`)}
                            depth={1}
                        />
                    ))}
                </FolderItem>

                {/* EXTERNAL LINKS */}
                <div className="mt-8 pt-4 border-t border-primary/10">
                    <a href={cvData.personal.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm text-text-muted hover:text-primary transition-colors">
                        <ExternalLink size={14} /> github.com
                    </a>
                    <a href={cvData.personal.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm text-text-muted hover:text-primary transition-colors">
                        <ExternalLink size={14} /> linkedin.com
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
