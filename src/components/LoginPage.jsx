import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Key, ArrowRight, Terminal, Loader } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [bootText, setBootText] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate boot sequence
        const sequences = [
            "INITIALIZING_KERNEL...",
            "MOUNTING_VIRTUAL_DRIVES...",
            "LOADING_UI_FRAMEWORK...",
            "ESTABLISHING_SECURE_LINK...",
            "ACCESS_GRANTED"
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < sequences.length) {
                setBootText(prev => [...prev, sequences[i]]);
                setProgress(prev => Math.min(prev + 20, 100));
                i++;
            } else {
                clearInterval(interval);
                setTimeout(onLogin, 500);
            }
        }, 300);
    };

    return (
        <div className="min-h-screen bg-[#FFF4EA] flex items-center justify-center relative overflow-hidden font-mono">
            {/* Retro background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#C96868 2px, transparent 2px)',
                    backgroundSize: '30px 30px'
                }}
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md relative z-10 p-4"
            >
                {/* 90s Window Style Container */}
                <div className="bg-[#FFF8E7] border-2 border-[#C96868] shadow-[8px_8px_0px_0px_rgba(201,104,104,0.3)]">

                    {/* Window Header */}
                    <div className="bg-[#C96868] p-2 flex items-center justify-between border-b-2 border-[#C96868]">
                        <div className="flex items-center gap-2 text-white">
                            <Terminal size={16} />
                            <span className="font-bold text-sm tracking-widest">SYSTEM_LOGIN.EXE</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-[#FFF4EA] border border-black/20" />
                            <div className="w-3 h-3 bg-[#FFF4EA] border border-black/20" />
                        </div>
                    </div>

                    {/* Window Content */}
                    <div className="p-8">
                        {!loading ? (
                            <>
                                <div className="text-center mb-8">
                                    <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#C96868] border-dashed p-1 bg-white/60 shadow-inner">
                                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md">
                                            <img
                                                src="/profile.png"
                                                alt="Laysopanha portrait"
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-black text-[#7EACB5] mb-2 uppercase tracking-tighter">Welcome to my Portfolio</h2>
                                    <p className="text-[#C96868]/70 text-xs">Please click the button below to access the portfolio mainframe.</p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-4">

                                    <button
                                        type="submit"
                                        className="w-full bg-[#C96868] text-white font-bold py-3 mt-6 border-2 border-[#C96868] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 group active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                                    >
                                        GET TO KNOW ME MORE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="font-mono text-sm space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold text-[#7EACB5] uppercase">
                                        <span>System Boot</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-4 bg-[#FFF4EA] border-2 border-[#C96868] p-0.5">
                                        <motion.div
                                            className="h-full bg-[#C96868]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>
                                <div className="h-32 bg-black/5 border border-[#C96868]/20 p-2 font-mono text-[10px] text-[#C96868] overflow-hidden flex flex-col justify-end">
                                    {bootText.map((text, i) => (
                                        <div key={i} className="flex gap-2">
                                            <span className="opacity-50">&gt;</span>
                                            <span>{text}</span>
                                        </div>
                                    ))}
                                    <div className="flex gap-2 animate-pulse">
                                        <span className="opacity-50">&gt;</span>
                                        <span className="w-2 h-4 bg-[#C96868]" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Window Footer */}
                    <div className="bg-[#C96868]/10 p-2 border-t border-[#C96868]/20 flex justify-between items-center text-[10px] text-[#C96868]">
                        <span>v2.0.25 [STABLE]</span>
                        <span>{loading ? 'READING_DISK...' : 'SECURE_CONNECTION'}</span>
                    </div>
                </div>

                <p className="text-center mt-4 text-[#C96868]/40 text-xs font-mono">© 2025 Laysopanha. All rights reserved.</p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
