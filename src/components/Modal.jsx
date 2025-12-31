import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, title, children, fullScreen = false }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content - Full Screen Panel */}
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="absolute top-0 right-0 bottom-0 w-full md:w-[calc(100%-280px)] bg-[#0a0a0c] overflow-hidden flex flex-col"
                    >
                        {/* Header / HUD Bar */}
                        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/10 bg-[#0f0f13]">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-secondary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
                                <h2 className="text-xl md:text-2xl font-bold font-mono tracking-tight text-white uppercase">
                                    {title}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#050507]">
                            <div className="p-6 md:p-10">
                                {children}
                            </div>
                        </div>

                        {/* Footer / Decorative HUD elements */}
                        <div className="px-6 md:px-10 py-3 border-t border-white/10 bg-[#0f0f13] flex justify-between items-center text-xs text-gray-500 font-mono">
                            <span>ARCHIVE.VIEWER_V2.0</span>
                            <span className="hidden md:block">PRESS ESC TO CLOSE</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default Modal
