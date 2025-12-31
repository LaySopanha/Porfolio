import { motion } from 'framer-motion'
import { Folder, Github } from 'lucide-react'
import SectionContainer from './SectionContainer'
import { cvData } from '../data'

const Projects = () => {
    return (
        <SectionContainer id="projects" title="Selected Projects">
            <div className="grid md:grid-cols-2 gap-6">
                {cvData.projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6 h-full flex flex-col hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Folder className="text-secondary" size={40} />
                            <div className="flex gap-4">
                                {/* Assuming github link would be here if available, using placeholder */}
                                <Github size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                        <p className="text-gray-400 mb-4 text-sm flex-grow">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech.split(', ').map((tech, i) => (
                                <span
                                    key={i}
                                    className="text-xs font-mono text-violet-300 bg-violet-500/10 px-2 py-1 rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    )
}

export default Projects
