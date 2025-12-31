import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const Navbar = () => {
    const [hidden, setHidden] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    const links = ['Experience', 'Projects', 'Publications', 'Skills']

    const scrollToSection = (id) => {
        const element = document.getElementById(id.toLowerCase())
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
        >
            <div className="glass-card px-8 py-3 rounded-full flex gap-8 items-center bg-black/50 backdrop-blur-xl border-white/10">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="font-bold text-xl tracking-tighter hover:text-secondary transition-colors"
                >
                    LS
                </button>
                <div className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <button
                            key={link}
                            onClick={() => scrollToSection(link)}
                            className="text-sm text-gray-400 hover:text-white transition-colors font-mono"
                        >
                            {link}
                        </button>
                    ))}
                </div>
                <a
                    href="mailto:panhalay69420@gmail.com"
                    className="hidden md:block px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
                >
                    Contact
                </a>
            </div>
        </motion.nav>
    )
}

export default Navbar
