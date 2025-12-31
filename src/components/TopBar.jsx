import { Wifi, Battery, Clock, Minimize2, Maximize2, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cvData } from '../data'

const TopBar = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    }

    return (
        <header className="h-10 bg-background border-b border-primary/20 flex items-center justify-between px-4 select-none shrink-0 z-50">
            {/* LEFT: System Identity */}
            <div className="flex items-center gap-4 text-xs font-mono font-bold text-text-muted">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary"></div>
                    <span className="text-text-main tracking-widest">PORTFOLIO_OS</span>
                </div>
                <span className="hidden md:inline text-primary/40">|</span>
                <span className="hidden md:inline">USR: {cvData.personal.name.toUpperCase().replace(' ', '_')}</span>
            </div>

            {/* CENTER: Decorations (Mobile hidden) */}
            <div className="hidden md:flex items-center gap-1 opacity-30">
                <div className="w-16 h-1 bg-text-muted/50 rounded-full"></div>
                <div className="w-2 h-1 bg-text-muted/50 rounded-full"></div>
                <div className="w-2 h-1 bg-text-muted/50 rounded-full"></div>
                <div className="w-16 h-1 bg-text-muted/50 rounded-full"></div>
            </div>

            {/* RIGHT: Status Indicators */}
            <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-text-muted">
                    <Wifi size={14} className="text-secondary" />
                    <span className="hidden sm:inline">CONNECTED</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-text-muted">
                    <Battery size={14} className="text-secondary" />
                    <span>100%</span>
                </div>
                <div className="flex items-center gap-2 text-text-main font-bold bg-white/50 px-2 py-0.5 rounded border border-primary/10">
                    <Clock size={14} />
                    <span>{formatTime(time)}</span>
                </div>

                {/* Window Controls (Visual Only) */}
                <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-text-muted/20 text-text-muted">
                    <Minimize2 size={12} className="hover:text-text-main cursor-pointer" />
                    <Maximize2 size={12} className="hover:text-text-main cursor-pointer" />
                    <X size={14} className="hover:text-primary cursor-pointer" />
                </div>
            </div>
        </header>
    )
}

export default TopBar
