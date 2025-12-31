import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import ThreeBackground from './ThreeBackground'
import { cvData } from '../data'

const Hero = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl md:text-2xl text-secondary font-mono mb-4">
                        Hello, I am
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white neon-text text-white">
                        {cvData.personal.name}
                    </h1>
                    <p className="text-xl md:text-3xl text-gray-400 font-light mb-8 max-w-2xl mx-auto">
                        {cvData.personal.title}
                    </p>

                    <div className="flex justify-center gap-6 mb-12">
                        <a
                            href={cvData.personal.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-card hover:bg-white/10 transition-colors text-white"
                        >
                            <Github size={24} />
                        </a>
                        <a
                            href={cvData.personal.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-card hover:bg-white/10 transition-colors text-blue-400"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href={`mailto:${cvData.personal.email}`}
                            className="p-3 glass-card hover:bg-white/10 transition-colors text-violet-400"
                        >
                            <Mail size={24} />
                        </a>
                    </div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ArrowDown className="mx-auto text-gray-500" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero
