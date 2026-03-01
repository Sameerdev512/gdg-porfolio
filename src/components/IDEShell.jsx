import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── File tree: each entry maps to a section id and a "filename" visible in the IDE
const FILES = [
    { id: 'hero', name: 'index.tsx', icon: '⚛', lang: 'TypeScript React', color: '#61DAFB', folder: null },
    { id: 'about', name: 'about.ts', icon: '📄', lang: 'TypeScript', color: '#3178C6', folder: 'src' },
    { id: 'skills', name: 'skills.json', icon: '{}', lang: 'JSON', color: '#CBCB41', folder: 'src' },
    { id: 'projects', name: 'projects.tsx', icon: '⚛', lang: 'TypeScript React', color: '#61DAFB', folder: 'src' },
    { id: 'agency', name: 'agency.tsx', icon: '⚛', lang: 'TypeScript React', color: '#61DAFB', folder: 'src' },
    { id: 'founder', name: 'founder.md', icon: '📝', lang: 'Markdown', color: '#4F9DFF', folder: 'src' },
    { id: 'experience', name: 'experience.yml', icon: '⚙', lang: 'YAML', color: '#CB171E', folder: 'src' },
    { id: 'proof', name: 'achievements.json', icon: '{}', lang: 'JSON', color: '#CBCB41', folder: 'src' },
    { id: 'contact', name: 'contact.sh', icon: '$', lang: 'Shell', color: '#89D185', folder: 'src' },
]

const FOLDERS = ['src']

// Syntax-highlight color map for different token types
const TOKEN_COLORS = {
    keyword: '#569CD6',  // blue — const, function, export
    string: '#CE9178',  // orange-red — string values
    comment: '#6A9955',  // green — // comments
    property: '#9CDCFE',  // light blue — object keys
    value: '#B5CEA8',  // light green — numbers
    type: '#4EC9B0',  // teal — types
    punct: '#D4D4D4',  // white — punctuation
}

// ── Animated "compiling" status texts
const COMPILE_STATUSES = [
    { text: 'Lexing tokens...', color: '#CBCB41' },
    { text: 'Parsing AST...', color: '#4EC9B0' },
    { text: 'Type checking...', color: '#569CD6' },
    { text: 'Optimizing output...', color: '#7C5CFF' },
    { text: '✓ Build successful', color: '#89D185' },
]

export default function IDEShell({ children, sections }) {
    const [activeFile, setActiveFile] = useState('hero')
    const [openTabs, setOpenTabs] = useState(['hero', 'about', 'skills'])
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [expandedFolders, setExpandedFolders] = useState({ src: true })
    const [compileStatus, setCompileStatus] = useState(4) // index into COMPILE_STATUSES
    const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 })
    const scrollRef = useRef(null)

    // Rotate compile status periodically
    useEffect(() => {
        const rotate = () => {
            setCompileStatus(prev => (prev + 1) % COMPILE_STATUSES.length)
        }
        const interval = setInterval(rotate, 4000)
        return () => clearInterval(interval)
    }, [])

    // Track active section by IntersectionObserver scoped to the IDE's scroll container
    useEffect(() => {
        // Small delay to ensure scrollRef.current is set and sections are in DOM
        const timer = setTimeout(() => {
            const container = scrollRef.current
            const observers = []
            FILES.forEach(file => {
                const el = document.getElementById(file.id)
                if (!el) return
                const obs = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setActiveFile(file.id)
                            setOpenTabs(prev => prev.includes(file.id) ? prev : [...prev.slice(-4), file.id])
                            setCursorPos({ line: Math.floor(Math.random() * 80) + 1, col: Math.floor(Math.random() * 40) + 1 })
                        }
                    },
                    {
                        root: container, // ← observe within IDE scroll container, not window
                        threshold: 0.15,
                    }
                )
                obs.observe(el)
                observers.push(obs)
            })
            return () => observers.forEach(o => o.disconnect())
        }, 300)
        return () => clearTimeout(timer)
    }, [])

    // Scroll to a section by id — explicitly scrolls the IDE editor container
    const scrollToSection = (id) => {
        const container = scrollRef.current
        const el = document.getElementById(id)
        if (!container || !el) return

        // Calculate el's top relative to the scroll container
        const containerTop = container.getBoundingClientRect().top
        const elTop = el.getBoundingClientRect().top
        const scrollOffset = container.scrollTop + (elTop - containerTop)

        container.scrollTo({ top: scrollOffset, behavior: 'smooth' })
        setOpenTabs(prev => prev.includes(id) ? prev : [...prev.slice(-4), id])
        setActiveFile(id)
    }

    const closeTab = (e, id) => {
        e.stopPropagation()
        setOpenTabs(prev => {
            const next = prev.filter(t => t !== id)
            if (activeFile === id && next.length > 0) setActiveFile(next[next.length - 1])
            return next
        })
    }

    const activeFileObj = FILES.find(f => f.id === activeFile) || FILES[0]
    const status = COMPILE_STATUSES[compileStatus]

    return (
        <div
            className="flex flex-col bg-[#1E1E1E] text-[#D4D4D4] font-mono"
            style={{ height: '100vh', overflow: 'hidden' }}
        >

            {/* ── Title Bar (macOS-style) */}
            <div
                className="flex items-center gap-0 h-9 border-b border-[#2D2D2D] flex-shrink-0 select-none"
                style={{ background: '#1E1E1E' }}
            >
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 px-4">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-110 cursor-pointer" />
                </div>

                {/* File title centered */}
                <div className="flex-1 flex items-center justify-center">
                    <span className="text-[#858585] text-xs">
                        {activeFileObj.name} — sameer-khatri · Portfolio
                    </span>
                </div>

                {/* Git branch indicator */}
                <div className="flex items-center gap-1.5 px-4">
                    <span className="text-[#858585] text-[11px]">⎇  main</span>
                </div>
            </div>

            {/* ── Tab Bar */}
            <div
                className="flex items-center flex-shrink-0 overflow-x-auto hide-scrollbar border-b border-[#2D2D2D]"
                style={{ background: '#2D2D2D', minHeight: 35 }}
            >
                {openTabs.map(tabId => {
                    const file = FILES.find(f => f.id === tabId)
                    if (!file) return null
                    const isActive = tabId === activeFile
                    return (
                        <motion.div
                            key={tabId}
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            onClick={() => { scrollToSection(tabId) }}
                            className={`
                flex items-center gap-2 h-[35px] px-4 cursor-pointer flex-shrink-0 border-r border-[#252525] relative group
                ${isActive ? 'bg-[#1E1E1E] text-[#D4D4D4]' : 'bg-[#2D2D2D] text-[#858585] hover:text-[#D4D4D4] hover:bg-[#282828]'}
              `}
                            style={{ minWidth: 120 }}
                        >
                            {/* Active tab indicator */}
                            {isActive && (
                                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: '#4F9DFF' }} />
                            )}
                            <span className="text-[11px]" style={{ color: isActive ? file.color : undefined }}>
                                {file.icon}
                            </span>
                            <span className="text-xs whitespace-nowrap">{file.name}</span>
                            <button
                                onClick={e => closeTab(e, tabId)}
                                className="ml-1 w-4 h-4 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#404040] transition-opacity text-[#858585] hover:text-[#D4D4D4]"
                            >
                                ×
                            </button>
                        </motion.div>
                    )
                })}
            </div>

            {/* ── Main Area: Sidebar + Content */}
            <div className="flex flex-1 min-h-0 overflow-hidden">

                {/* ── Activity Bar (far left icons — VS Code's leftmost panel) */}
                <div
                    className="flex flex-col items-center gap-5 py-4 flex-shrink-0 border-r border-[#2D2D2D]"
                    style={{ width: 48, background: '#333333' }}
                >
                    {[
                        { icon: '📁', title: 'Explorer', onClick: () => setSidebarOpen(p => !p), active: sidebarOpen },
                        { icon: '🔍', title: 'Search' },
                        { icon: '⎇', title: 'Source Control' },
                        { icon: '⚙', title: 'Settings' },
                    ].map((item, i) => (
                        <button
                            key={i}
                            title={item.title}
                            onClick={item.onClick}
                            className={`w-8 h-8 flex items-center justify-center text-sm rounded transition-colors
                ${item.active ? 'text-[#D4D4D4]' : 'text-[#858585] hover:text-[#D4D4D4]'}`}
                            style={item.active ? { borderLeft: '2px solid #4F9DFF' } : {}}
                        >
                            <span className="text-base">{item.icon}</span>
                        </button>
                    ))}

                    {/* Bottom: avatar */}
                    <div className="mt-auto w-7 h-7 rounded-full bg-gradient-to-br from-[#4F9DFF] to-[#7C5CFF] flex items-center justify-center text-xs font-bold text-white">
                        SK
                    </div>
                </div>

                {/* ── Sidebar — File Explorer */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 220, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0 overflow-hidden border-r border-[#2D2D2D] flex flex-col"
                            style={{ background: '#252526' }}
                        >
                            {/* Explorer header */}
                            <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#BDBDBD]">
                                Explorer
                            </div>
                            <div className="px-2 text-[11px] font-bold text-[#CCCCCC] mb-1 px-4">
                                📁 SAMEER-KHATRI
                            </div>

                            {/* Files without folders */}
                            {FILES.filter(f => !f.folder).map(file => (
                                <FileTreeItem
                                    key={file.id}
                                    file={file}
                                    depth={1}
                                    isActive={activeFile === file.id}
                                    onClick={() => scrollToSection(file.id)}
                                />
                            ))}

                            {/* Folders */}
                            {FOLDERS.map(folder => (
                                <div key={folder}>
                                    <button
                                        onClick={() => setExpandedFolders(p => ({ ...p, [folder]: !p[folder] }))}
                                        className="w-full flex items-center gap-1.5 px-3 py-0.5 text-[#CCCCCC] hover:bg-[#37373D] text-xs"
                                        style={{ paddingLeft: 20 }}
                                    >
                                        <span className="text-[10px]">{expandedFolders[folder] ? '▾' : '▸'}</span>
                                        <span className="text-sm">📂</span>
                                        <span className="font-medium">{folder}/</span>
                                    </button>
                                    <AnimatePresence>
                                        {expandedFolders[folder] && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {FILES.filter(f => f.folder === folder).map(file => (
                                                    <FileTreeItem
                                                        key={file.id}
                                                        file={file}
                                                        depth={2}
                                                        isActive={activeFile === file.id}
                                                        onClick={() => scrollToSection(file.id)}
                                                    />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            {/* Outline section */}
                            <div className="mt-4 px-4 text-[10px] font-bold uppercase tracking-widest text-[#BDBDBD] border-t border-[#3F3F3F] pt-3">
                                Outline
                            </div>
                            <div className="px-4 space-y-0.5 mt-1">
                                {['export default', 'const skills', 'const projects', 'const experience'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 py-0.5 text-[11px] text-[#858585] hover:text-[#D4D4D4] cursor-pointer">
                                        <span style={{ color: TOKEN_COLORS.keyword }}>ƒ</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Editor / Main Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative" ref={scrollRef}>
                    {/* Breadcrumb */}
                    <div
                        className="sticky top-0 z-20 flex items-center gap-1 px-4 py-1.5 text-[11px] text-[#858585] border-b border-[#2D2D2D] flex-shrink-0"
                        style={{ background: '#1E1E1E' }}
                    >
                        <span>sameer-khatri</span>
                        <span className="text-[#555]">›</span>
                        {activeFileObj.folder && (
                            <>
                                <span>{activeFileObj.folder}</span>
                                <span className="text-[#555]">›</span>
                            </>
                        )}
                        <span style={{ color: activeFileObj.color }}>{activeFileObj.name}</span>
                        <span className="ml-auto text-[10px] text-[#555]">{activeFileObj.lang}</span>
                    </div>

                    {/* Line-number gutter is via the children themselves — they render inside here */}
                    <div className="relative">
                        {children}
                    </div>
                </div>
            </div>

            {/* ── Status Bar */}
            <div
                className="flex items-center justify-between px-3 h-[22px] text-white text-[11px] flex-shrink-0 flex-wrap gap-2"
                style={{ background: '#007ACC' }}
            >
                {/* Left items */}
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <span>⎇</span>
                        <span>main</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <span>⚠</span>
                        <span>0</span>
                        <span className="ml-1">🔴</span>
                        <span>0</span>
                    </span>
                </div>

                {/* Center: compile status */}
                <motion.span
                    key={compileStatus}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-[10px] font-medium"
                    style={{ color: status.color }}
                >
                    {status.text}
                </motion.span>

                {/* Right: cursor position + lang */}
                <div className="flex items-center gap-4">
                    <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
                    <span>{activeFileObj.lang}</span>
                    <span>UTF-8</span>
                    <span>Prettier</span>
                </div>
            </div>
        </div>
    )
}

// ── File Tree Single Item
function FileTreeItem({ file, depth, isActive, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            className={`w-full flex items-center gap-2 py-0.5 text-xs transition-colors cursor-pointer text-left group relative
        ${isActive
                    ? 'bg-[#37373D] text-[#D4D4D4]'
                    : 'text-[#858585] hover:bg-[#2A2D2E] hover:text-[#D4D4D4]'
                }`}
            style={{ paddingLeft: depth * 12 }}
            whileHover={{ x: 1 }}
            transition={{ duration: 0.1 }}
        >
            {/* Active indicator */}
            {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: '#4F9DFF' }} />
            )}
            <span className="text-[11px] font-mono" style={{ color: file.color }}>
                {file.icon}
            </span>
            <span className={`text-[11px] ${isActive ? 'text-[#D4D4D4]' : ''}`}>{file.name}</span>
        </motion.button>
    )
}
