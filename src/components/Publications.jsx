import { motion } from 'framer-motion'
import { ExternalLink, BookOpen } from 'lucide-react'
import SectionContainer from './SectionContainer'
import { cvData } from '../data'

const Publications = () => {
    return (
        <SectionContainer id="publications" title="Publications">
            <div className="grid gap-6">
                {cvData.publications.map((pub, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6 md:p-8 hover:bg-white/10 transition-colors group"
                    >
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-grow">
                                <div className="flex items-start gap-3 mb-2">
                                    <BookOpen className="text-secondary shrink-0 mt-1" size={20} />
                                    <h3 className="text-xl font-bold group-hover:text-secondary transition-colors">
                                        {pub.title}
                                    </h3>
                                </div>
                                <p className="text-gray-400 mb-2 pl-8">{pub.authors}</p>
                                <div className="flex flex-wrap items-center gap-2 pl-8 text-sm">
                                    <span className="text-violet-400">{pub.venue}</span>
                                    <span className="text-gray-600">•</span>
                                    <span className="text-gray-400">{pub.year}</span>
                                </div>
                            </div>
                            <div className="shrink-0 pl-8 md:pl-0">
                                <a
                                    href={pub.link}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/20 transition-all"
                                >
                                    View Paper <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    )
}

export default Publications
