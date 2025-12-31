import { motion } from 'framer-motion'

const SectionContainer = ({ id, title, children, className = "" }) => {
    return (
        <section id={id} className={`py-20 relative ${className}`}>
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4"
                >
                    <span className="text-secondary font-mono">/</span>
                    {title}
                    <div className="h-px bg-white/10 flex-grow ml-4"></div>
                </motion.h2>
                {children}
            </div>
        </section>
    )
}

export default SectionContainer
