import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Code, Cpu, Database, Award, Shield, Zap, Terminal, Layers, BookOpen, Briefcase, GraduationCap, ChevronRight, ExternalLink, LayoutGrid } from 'lucide-react'
import { cvData } from '../data'
import ActivityFeed from './ActivityFeed'

// Icon Mapping
const ICON_MAP = {
    // AI & Data
    "PyTorch": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    "TensorFlow": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    "MindSpore": "https://www.mindspore.cn/favicon.ico",
    "Scikit-learn": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
    "MLOps (W&B)": "https://avatars.githubusercontent.com/u/37966774?s=200&v=4", // W&B Logo
    "Computer Vision (OCR)": "https://cdn-icons-png.flaticon.com/512/2103/2103633.png", // Generic CV Icon
    "NLP": "https://cdn-icons-png.flaticon.com/512/1693/1693746.png",
    "Spark": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg",
    "Hadoop": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg",

    // Systems
    "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    "Slurm": "https://slurm.schedmd.com/slurm_logo.png",
    "Ceph": "https://docs.ceph.com/en/latest/_static/logo.png",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "Linux/Unix": "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg",
    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",

    // Languages
    "Python (Advanced)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    "Rust (Basic)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
    "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    "JavaScript/TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",

    // Web
    "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    "Django": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    "Laravel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
}

const TechMarquee = ({ skills }) => {
    // Flatten skills object values into a single array
    const allSkills = Object.values(skills).flat()
    // Duplicate list for seamless loop
    const marqueeList = [...allSkills, ...allSkills]

    return (
        <div className="w-full overflow-hidden bg-white/40 border-y border-primary/10 py-4 mb-4 lg:mb-8 max-w-[100vw]">
            <div className="flex items-center gap-2 mb-2 px-4">
                <Zap size={14} className="text-secondary animate-pulse" />
                <span className="text-xs font-bold text-text-muted uppercase">Equipped Technologies</span>
            </div>
            <motion.div
                className="flex gap-8 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30 // Adjust speed here
                }}
            >
                {marqueeList.map((skill, i) => (
                    <div key={i} className="flex flex-col items-center justify-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-help">
                        <img
                            src={ICON_MAP[skill] || "https://cdn-icons-png.flaticon.com/512/1089/1089129.png"}
                            alt={skill}
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-[10px] font-mono whitespace-nowrap">{skill}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

const MetricCard = ({ label, value, icon: Icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`bg-white/40 border border-${color}/20 p-4 rounded-xl flex items-center gap-4 shadow-sm backdrop-blur-sm`}
    >
        <div className={`p-3 rounded-full bg-${color}/10 text-${color}`}>
            <Icon size={24} />
        </div>
        <div>
            <div className="text-2xl font-black text-text-main">{value}</div>
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider">{label}</div>
        </div>
    </motion.div>
)

const DesktopIcon = ({ label, type, onClick, delay }) => (
    <motion.button
        onClick={onClick}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay * 0.1, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-2 group w-24"
    >
        <div className="relative">
            {/* SKEUMORPHIC FOLDER ICON */}
            <div className={`w-14 h-12 ${type === 'PROJECT' ? 'bg-[#FFD700]' : 'bg-[#7EACB5]'} rounded-t-sm rounded-r-md border-2 border-black/20 shadow-sm relative overflow-visible`}>
                {/* Folder Tab */}
                <div className={`absolute -top-2 left-0 w-6 h-3 ${type === 'PROJECT' ? 'bg-[#FFD700]' : 'bg-[#7EACB5]'} rounded-t-sm border-t-2 border-l-2 border-r-2 border-black/20 z-0`}></div>
                {/* Front Flap */}
                <div className={`absolute top-1 left-0 right-0 bottom-0 ${type === 'PROJECT' ? 'bg-[#FFEB3B]' : 'bg-[#A0D2DB]'} border-t border-white/50 z-10 shadow-inner`}></div>

                {/* Type Badge */}
                <div className="absolute -bottom-2 -right-2 bg-white border border-black/10 text-[8px] font-bold px-1 rounded shadow-sm z-20">
                    {type === 'PROJECT' ? 'PROJ' : 'EXP'}
                </div>
            </div>
        </div>

        {/* Label with Windows 95 style text shadow/bg on selection */}
        <span className="text-[10px] font-mono leading-tight text-center bg-white/50 px-1 rounded group-hover:bg-[#000080] group-hover:text-white transition-colors line-clamp-2">
            {label}
        </span>
    </motion.button>
)

const CharacterProfile = ({ onNavigate }) => {
    return (
        <div className="h-full flex flex-col relative overflow-y-auto xl:overflow-hidden custom-scrollbar xl:custom-scrollbar-none">

            {/* CONTENT AREA */}
            <div className="flex-1 flex flex-col xl:flex-row max-w-7xl mx-auto w-full xl:h-full xl:overflow-hidden">

                {/* LEFT COLUMN: AVATAR & BIO */}
                <div className="w-full xl:w-[30%] p-4 lg:p-8 xl:p-6 flex-col bg-white/30 backdrop-blur-md xl:border-r border-primary/10 overflow-visible xl:overflow-y-auto custom-scrollbar shadow-xl z-10 shrink-0 flex">

                    {/* AVATAR FRAME - Compact on Mobile */}
                    <motion.div
                        // Removed initial opacity=0 to ensure visibility on load
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="relative mx-auto mb-4 lg:mb-6 xl:mb-4"
                    >
                        <div className="w-32 h-40 lg:w-56 lg:h-72 xl:w-48 xl:h-60 bg-gradient-to-b from-primary/5 to-primary/10 border-4 border-white/50 rounded-xl flex items-center justify-center relative shadow-lg overflow-hidden group">
                            <div className="absolute inset-0 opacity-20"
                                style={{ backgroundImage: 'radial-gradient(#C96868 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                            </div>

                            {/* Character Image */}
                            <img
                                src="/profile.png"
                                alt="Avatar"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Level Badge */}
                            <div className="absolute top-2 right-2 lg:top-4 lg:right-4 bg-black/80 text-white text-[10px] lg:text-xs font-bold px-1.5 py-0.5 lg:px-2 lg:py-1 rounded border border-white/20">
                                LVL. 21
                            </div>
                        </div>
                    </motion.div>

                    {/* NAME & TITLE */}
                    <div className="text-center mb-4 lg:mb-6 xl:mb-4">
                        <h1 className="text-xl lg:text-3xl xl:text-2xl font-black text-text-main uppercase tracking-tight mb-1">
                            {cvData.personal.name}
                        </h1>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] lg:text-xs font-bold rounded-full border border-primary/20">
                            <Shield size={12} />
                            {cvData.personal.title}
                        </div>
                    </div>

                    {/* BIO / SUMMARY - Compact grid on mobile */}
                    <div className="bg-white/50 p-3 lg:p-6 xl:p-4 rounded-xl border border-primary/10 shadow-sm mb-4 lg:mb-6 xl:mb-4">
                        <h3 className="text-[10px] lg:text-xs font-bold text-text-muted mb-2 lg:mb-3 uppercase flex items-center gap-2">
                            <User size={14} /> Character Info
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3 text-xs lg:text-sm">
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                <span className="text-text-muted font-mono text-[10px] lg:text-xs">Date of Birth:</span>
                                <span className="text-text-main font-bold">July 24, 2005</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                <span className="text-text-muted font-mono text-[10px] lg:text-xs">Degree:</span>
                                <span className="text-text-main font-bold lg:text-right">B. Comp. Sci</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                <span className="text-text-muted font-mono text-[10px] lg:text-xs">Major:</span>
                                <span className="text-text-main font-bold">Data Science</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                <span className="text-text-muted font-mono text-[10px] lg:text-xs">Grad:</span>
                                <span className="text-text-main font-bold">Dec 2026</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                <span className="text-text-muted font-mono text-[10px] lg:text-xs">GPA:</span>
                                <span className="text-primary font-black">4.0</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center pt-1 lg:pt-2 lg:border-t border-primary/10 col-span-2 lg:col-span-1">
                                <span className="text-text-muted font-mono text-[10px] lg:text-xs">Location:</span>
                                <span className="text-text-main font-bold">{cvData.personal.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* SOCIAL LINKS - COMPACT */}
                    <div className="grid grid-cols-2 gap-2 xl:gap-3 mt-auto pb-0">
                        <a href={cvData.personal.links.github} target="_blank" className="flex items-center justify-center gap-2 py-1.5 xl:py-2 bg-text-main text-white rounded-lg text-[10px] xl:text-xs font-bold hover:bg-primary transition-colors">
                            GITHUB
                        </a>
                        <a href={cvData.personal.links.linkedin} target="_blank" className="flex items-center justify-center gap-2 py-1.5 xl:py-2 bg-[#0077b5] text-white rounded-lg text-[10px] xl:text-xs font-bold hover:opacity-90 transition-opacity">
                            LINKEDIN
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMN: DESKTOP WORKSPACE */}
                <div className="flex-1 p-0 overflow-visible xl:overflow-y-auto custom-scrollbar bg-background relative block">

                    {/* TECH CAROUSEL */}
                    <TechMarquee skills={cvData.skills} />

                    <div className="px-4 text-sm md:px-6 xl:px-10 pb-10">
                        {/* DESKTOP AREA: FOLDERS */}
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-6 border-b-2 border-primary/10 pb-2">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <h2 className="text-sm font-bold ml-2 font-mono text-text-muted">~/USER/DESKTOP</h2>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-y-6 gap-x-2 md:gap-y-8 md:gap-x-4 place-items-center">
                                {/* Experience Folders */}
                                {cvData.experience.map((exp, i) => (
                                    <DesktopIcon
                                        key={`exp-${i}`}
                                        label={exp.role}
                                        type="EXP"
                                        onClick={() => onNavigate(`exp-${i}`)}
                                        delay={i}
                                    />
                                ))}

                                {/* Project Folders */}
                                {cvData.projects.map((proj, i) => (
                                    <DesktopIcon
                                        key={`proj-${i}`}
                                        label={proj.name}
                                        type="PROJECT"
                                        onClick={() => onNavigate(`proj-${i}`)}
                                        delay={i + 3}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* RECENT DROPS (Awards) - WINDOW STYLE */}
                        <div className="bg-[#FFF8E7] border border-black/10 rounded shadow-md p-1 mt-8">
                            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 text-xs font-bold flex justify-between items-center">
                                <span>TROPHY_CASE.exe</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 bg-[#c0c0c0] border border-white border-b-black border-r-black"></div>
                                    <div className="w-3 h-3 bg-[#c0c0c0] border border-white border-b-black border-r-black"></div>
                                </div>
                            </div>
                            <div className="p-3 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                {cvData.honors.map((honor, i) => (
                                    <div key={i} className="flex gap-3 items-center p-2 hover:bg-black/5 rounded cursor-default border border-transparent hover:border-black/5">
                                        <Award size={24} className="text-[#FFD700] drop-shadow-sm shrink-0" />
                                        <div>
                                            <div className="text-xs font-bold text-black">{honor.title}</div>
                                            <div className="text-[10px] text-gray-500">{honor.issuer}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RECENT ACTIVITY FEED */}
                        <div className="mt-8">
                            <ActivityFeed onNavigate={onNavigate} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterProfile
