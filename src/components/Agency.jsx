import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, scrollRevealScale, EASE } from '../animations/animationVariants'

const categories = ['All', 'Fitness', 'Design', 'Eyewear', 'Hardware']

const agencyProjects = [
    { name: 'Zeenith Fitness', category: 'Fitness', description: 'A premium gym & fitness center website with animated class schedules, membership plans, and trainer profiles.', tags: ['React', 'Tailwind', 'Framer Motion'], emoji: '💪', color: '#4F9DFF', gradient: 'from-blue-500/20 to-indigo-500/20', demoLink: 'https://zeenith-fitness.netlify.app' },
    { name: 'Navrang Design Studio', category: 'Design', description: 'A creative portfolio website for an interior design studio with gallery, project showcases, and client testimonials.', tags: ['React', 'GSAP', 'CSS Grid'], emoji: '🎨', color: '#7C5CFF', gradient: 'from-violet-500/20 to-purple-500/20', demoLink: 'https://navrangstudio.netlify.app/' },
    // { name: 'Modern Kitchen Co.', category: 'Food', description: 'E-commerce landing for a modular kitchen brand featuring 3D-style configurator UI, gallery, and quote calculator.', tags: ['React', 'Tailwind', 'Framer Motion'], emoji: '🍳', color: '#22D3EE', gradient: 'from-cyan-500/20 to-teal-500/20' },
    { name: 'Lensium', category: 'Eyewear', description: 'An elegant photography portfolio with fullscreen gallery, cinematic transitions, and booking integration.', tags: ['React', 'CSS Animations', 'Lightbox'], emoji: '📸', color: '#4F9DFF', gradient: 'from-sky-500/20 to-blue-500/20', demoLink: 'https://lensium.netlify.app/' },
    { name: 'Iron Core Fitness', category: 'Fitness', description: 'Bold fitness brand website with class booking, nutrition plans, transformation stories, and live chat support.', tags: ['React', 'Tailwind', 'REST API'], emoji: '🏋️', color: '#7C5CFF', gradient: 'from-purple-500/20 to-pink-500/20', demoLink: 'https://iron-core-fitness.netlify.app' },
    { name: 'Alpha Fitness Gym', category: 'Fitness', description: 'High-energy gym website with animated hero, membership tiers, trainer cards, and Google Maps integration.', tags: ['React', 'Tailwind', 'Google Maps'], emoji: '🔥', color: '#22D3EE', gradient: 'from-orange-500/20 to-red-500/20', demoLink: 'https://alpha-fitness-gym.netlify.app/' },
    { name: 'Hardware Pro', category: 'Hardware', description: 'B2B product catalog website for hardware tools with category filters, bulk quote requests, and dealer locator.', tags: ['React', 'MySQL', 'REST API'], emoji: '🔩', color: '#4F9DFF', gradient: 'from-gray-500/20 to-slate-500/20', demoLink: 'https://hardware-pro.netlify.app' },
]

export default function Agency() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [activeFilter, setActiveFilter] = useState('All')
    const [flipped, setFlipped] = useState({})

    const filtered = activeFilter === 'All'
        ? agencyProjects
        : agencyProjects.filter((p) => p.category === activeFilter)

    const toggleFlip = (projectName) => {
        setFlipped(prev => ({
            ...prev,
            [projectName]: !prev[projectName]
        }))
    }

    return (
        <section id="agency" className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
            <div
                className="absolute inset-0"
                style={{ backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(79,157,255,0.06) 0%, transparent 60%)' }}
            />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6">
                {/* Header */}
                <motion.div {...scrollRevealScale(0)} className="text-center mb-10 sm:mb-12 md:mb-16 px-0">
                    <span className="section-label mb-2 sm:mb-3 inline-flex font-mono text-xs">
                        <span className="text-brand-primary/60 mr-1">//</span>
                        agency.portfolioDemos
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-text mt-2 sm:mt-3 md:mt-4">
                        Portfolio <span className="gradient-text">Demos & Concepts</span>
                    </h2>
                    <p className="text-brand-muted mt-2 sm:mt-3 md:mt-4 max-w-xl mx-auto text-sm sm:text-base md:text-lg px-0">
                        Custom demo projects showcasing design, engineering, and full-stack capabilities.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10"
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${activeFilter === cat
                                ? 'bg-brand-primary text-white shadow-glow-primary'
                                : 'glass text-brand-muted hover:text-brand-text'
                                }`}
                            whileHover={{ scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Project Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
                    variants={staggerContainer(0.07)}
                    initial="hidden"
                    animate="show"
                >
                    {filtered.map((proj, i) => {
                        const isFlipped = flipped[proj.name] || false

                        return (
                        <motion.div
                            key={proj.name}
                            layout
                            initial={{ opacity: 0, y: 32, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.45, ease: EASE.out }}
                            className="glass-card rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer relative"
                            style={{ perspective: 1000, willChange: 'transform', height: 'auto' }}
                            onHoverStart={() => toggleFlip(proj.name)}
                            onHoverEnd={() => toggleFlip(proj.name)}
                        >
                            {/* Front - Card Visual */}
                            <motion.div
                                className={`h-32 sm:h-40 md:h-44 bg-gradient-to-br ${proj.gradient} flex items-center justify-center relative overflow-hidden`}
                                animate={{
                                    rotateY: isFlipped ? 180 : 0,
                                }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                {/* Subtle shimmer on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                                    animate={{ translateX: isFlipped ? '-100%' : '-100%' }}
                                    transition={{ duration: 0.7, ease: 'easeOut' }}
                                />

                                <motion.span
                                    className="text-6xl relative z-10"
                                    animate={{
                                        scale: isFlipped ? 1 : 1,
                                        rotate: isFlipped ? 0 : 0,
                                    }}
                                    transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                                >
                                    {proj.emoji}
                                </motion.span>
                            </motion.div>

                            {/* Back - View Demo Button */}
                            <motion.div
                                className="absolute inset-0 h-32 sm:h-40 md:h-44 bg-gradient-to-br flex items-center justify-center rounded-xl sm:rounded-2xl"
                                style={{
                                    background: 'rgba(79, 157, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    rotateY: isFlipped ? 0 : 180,
                                    backfaceVisibility: 'hidden',
                                }}
                                animate={{
                                    rotateY: isFlipped ? 0 : 180,
                                }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            >
                                <a
                                    href={proj.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary text-xs sm:text-sm px-4 sm:px-6 py-1.5 sm:py-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span>View Demo</span>
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </motion.div>

                            {/* Content section */}
                            <div className="p-4 sm:p-5">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <h3 className="font-display font-bold text-sm sm:text-lg text-brand-text line-clamp-1">{proj.name}</h3>
                                    <span
                                        className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                                        style={{ background: `${proj.color}15`, color: proj.color }}
                                    >
                                        {proj.category}
                                    </span>
                                </div>
                                <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{proj.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {proj.tags.map((tag) => (
                                        <motion.span
                                            key={tag}
                                            className="skill-tag text-xs"
                                            whileHover={{ scale: 1.06 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}