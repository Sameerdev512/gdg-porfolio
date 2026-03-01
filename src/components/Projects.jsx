import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { staggerContainer, scrollRevealScale, EASE } from '../animations/animationVariants'

// ── Asymmetric layout: each card has individual size + rotation personality
const PROJECTS = [
    {
        id: 1,
        name: 'YatraSetu',
        tagline: 'Travel-Tech Connection Platform',
        challenge: 'Travelers in unfamiliar destinations lack a reliable, unified channel to discover trusted local guides without friction.',
        approach: 'Designed a matching-engine architecture linking travelers with vetted guides, with real-time booking flows and destination intelligence.',
        outcome: 'Full-stack platform that reduces discovery-to-booking friction, demonstrating end-to-end product thinking from schema design to UI polish.',
        stack: ['React', 'Spring Boot', 'MySQL', 'REST API', 'Tailwind CSS'],
        type: 'Full Stack',
        color: '#4F9DFF',
        gradient: 'from-blue-500/20 to-violet-500/20',
        emoji: '🧭',
        github: 'https://github.com/',
        live: '#',
        // Panel layout personality
        size: 'large',   // large | medium
        rotate: -1.2,
    },
    {
        id: 2,
        name: 'Lost & Found',
        tagline: 'Civic-Tech Recovery System',
        challenge: 'Public spaces have no digital infrastructure for lost item recovery — people rely on physical notice boards.',
        approach: 'Community-powered platform with location-tagged reports, image uploads, and a matching system that notifies owners.',
        outcome: 'Proved civic-tech product thinking — designing for real societal utility, not just technical demonstration.',
        stack: ['ReactJS', 'Java', 'MySQL', 'REST API', 'CSS3'],
        type: 'Full Stack',
        color: '#7C5CFF',
        gradient: 'from-violet-500/20 to-cyan-500/20',
        emoji: '🔍',
        github: 'https://github.com/',
        live: '#',
        size: 'medium',
        rotate: 1.4,
    },
]

function ProjectPanel({ project, index, inView }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 60, rotate: project.rotate * 2 }}
                animate={inView ? { opacity: 1, y: 0, rotate: project.rotate } : {}}
                transition={{ delay: index * 0.22, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                    y: -12,
                    rotate: 0,
                    scale: 1.02,
                    zIndex: 10,
                    boxShadow: `0 32px 80px ${project.color}25`,
                    transition: { duration: 0.35, ease: EASE.out },
                }}
                className={`
          glass-card rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer relative
          ${project.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}
        `}
                style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
                onClick={() => setExpanded(true)}
                data-hover="true"
            >
                {/* Color accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

                {/* Top banner area */}
                <div
                    className={`bg-gradient-to-br ${project.gradient} flex items-center justify-between p-3 sm:p-5 md:p-8 relative overflow-hidden`}
                    style={{ minHeight: project.size === 'large' ? 110 : 100 }}
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                        }}
                    />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <motion.span
                                className="text-3xl sm:text-4xl md:text-5xl"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                                {project.emoji}
                            </motion.span>
                            <div>
                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                                    style={{ background: `${project.color}20`, color: project.color }}>
                                    {project.type}
                                </span>
                            </div>
                        </div>
                        <h3 className="font-display font-black text-base sm:text-xl md:text-2xl lg:text-3xl text-white">{project.name}</h3>
                        <p className="text-white/60 text-xs sm:text-sm mt-0.5 sm:mt-1">{project.tagline}</p>
                    </div>

                    {/* "Expand" hint */}
                    <motion.div
                        className="absolute bottom-4 right-4 flex items-center gap-2 text-white/40 text-xs"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    >
                        <span>View Case Study</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4M4 20l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    </motion.div>
                </div>

                {/* Stack tags */}
                <div className="px-3 sm:px-5 md:px-8 py-3 sm:py-4 md:py-5 flex flex-wrap gap-1.5 sm:gap-2">
                    {project.stack.map(s => (
                        <span key={s} className="skill-tag text-xs">{s}</span>
                    ))}
                </div>
            </motion.div>

            {/* ── Expanded Spotlight Modal */}
            <AnimatePresence>
                {expanded && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setExpanded(false)}
                        />
                        <motion.div
                            className="fixed inset-1 sm:inset-2 md:inset-4 lg:inset-16 z-50 glass-card rounded-xl sm:rounded-2xl md:rounded-3xl overflow-auto"
                            initial={{ opacity: 0, scale: 0.92, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 20 }}
                            transition={{ type: 'spring', stiffness: 250, damping: 28 }}
                            style={{ borderColor: `${project.color}30` }}
                        >
                            {/* Close */}
                            <button
                                onClick={() => setExpanded(false)}
                                className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 w-8 sm:w-10 h-8 sm:h-10 glass rounded-full flex items-center justify-center text-brand-muted hover:text-brand-text transition-colors z-10 text-sm sm:text-base"
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div className={`bg-gradient-to-br ${project.gradient} p-6 sm:p-10 relative overflow-hidden`}>
                                <div className="absolute inset-0 opacity-5"
                                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                                />
                                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                                    <span className="text-5xl sm:text-6xl">{project.emoji}</span>
                                    <div>
                                        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white">{project.name}</h2>
                                        <p className="text-white/60 text-base sm:text-lg mt-1">{project.tagline}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Case study details */}
                            <div className="p-6 sm:p-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                    {[
                                        { label: '🎯 Challenge', text: project.challenge },
                                        { label: '⚙️ Approach', text: project.approach },
                                        { label: '📈 Outcome', text: project.outcome },
                                    ].map(item => (
                                        <div key={item.label} className="p-5 rounded-2xl"
                                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <p className="text-xs font-bold text-brand-muted mb-2 uppercase tracking-widest">{item.label}</p>
                                            <p className="text-brand-text text-sm leading-relaxed">{item.text}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                                    {project.stack.map(s => (<span key={s} className="skill-tag">{s}</span>))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline px-6 py-2.5 text-sm">Source Code</a>
                                    <a href={project.live} className="btn-primary px-6 py-2.5 text-sm">Live Demo</a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default function Projects() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
            {/* Chapter atmosphere */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(79,157,255,0.06) 0%, transparent 60%)' }} />

            <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-5 md:px-6">
                <motion.div {...scrollRevealScale(0)} className="mb-10 sm:mb-12 md:mb-14 px-0">
                    <span className="section-label mb-2 sm:mb-3 inline-flex font-mono text-xs">
                        <span className="text-brand-primary/60 mr-1">//</span>
                        projects.caseStudies
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-text mt-2 sm:mt-3 md:mt-4">
                        Problems{' '}<span className="gradient-text">Solved.</span>
                    </h2>
                    <p className="text-brand-muted mt-2 sm:mt-3 md:mt-4 max-w-lg text-sm sm:text-base md:text-lg">
                        Click any panel to enter spotlight mode — full Challenge / Approach / Outcome breakdown.
                    </p>
                </motion.div>

                {/* Asymmetric gallery grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 items-start">
                    {PROJECTS.map((p, i) => (
                        <ProjectPanel key={p.id} project={p} index={i} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    )
}
