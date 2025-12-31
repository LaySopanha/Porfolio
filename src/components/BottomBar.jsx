import { Activity } from 'lucide-react'

const BottomBar = () => {
    return (
        <footer className="h-8 bg-background border-t border-primary/20 flex items-center justify-between px-4 select-none shrink-0 z-50 text-[10px] sm:text-xs font-mono text-text-muted">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Activity size={12} className="text-secondary animate-pulse" />
                    <span>SYS.READY</span>
                </div>
                <span className="hidden sm:inline opacity-30">|</span>
                <span className="hidden sm:inline">MEM: 64TB OK</span>
                <span className="hidden sm:inline opacity-30">|</span>
                <span className="hidden sm:inline">LATENCY: 12ms</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="uppercase opacity-50">© {new Date().getFullYear()} LAY SOPANHA // RESEARCH</span>
                <div className="w-2 h-2 bg-primary/50 rounded-full animate-ping"></div>
                <span>v2.4.0</span>
            </div>
        </footer>
    )
}

export default BottomBar
