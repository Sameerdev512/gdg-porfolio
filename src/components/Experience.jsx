import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { scrollRevealScale, EASE } from '../animations/animationVariants'

const EVENTS = [
    { year: '2022', title: 'Engineering Foundations', description: 'Built rigorous programming fundamentals from the ground up — C, Java, and core CS theory. Developed the analytical precision that separates engineers from coders.', icon: '📐', color: '#4F9DFF', side: 'left' },
    { year: '2023', title: 'Algorithmic Problem Solver', description: 'Solved 100+ LeetCode problems across arrays, trees, graphs, and DP. Trained a systematic approach to decomposing complexity into engineered solutions.', icon: '🧠', color: '#7C5CFF', side: 'right' },
    { year: '2024', title: 'Production-Level Builder', description: 'Transitioned from learning to shipping. Mastered React, Spring Boot, REST architectures — delivering seven client websites with real users, real deadlines, and real feedback.', icon: '⚡', color: '#22D3EE', side: 'left' },
    { year: '2025 Jan', title: 'Industry Internship — Datacode', description: 'Secured Frontend Developer internship at Datacode. Working on real-world production projects in a professional engineering team.', icon: '💼', color: '#4F9DFF', side: 'right' },
    { year: '2025', title: 'Digital Agency Founder', description: 'Founded a web agency delivering across fitness, design, F&B, and hardware industries. Wearing both engineer and product owner hats — from client discovery to final deployment.', icon: '🏗️', color: '#7C5CFF', side: 'left' },
]

function TimelineItem({ event, index, totalHeight }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <div
            ref={ref}
            className={`relative flex items-center gap-0 ${event.side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
        >
            {/* Content card */}
            <div className={`w-full md:flex-1 ${event.side === 'right' ? 'md:pl-6 lg:pl-12' : 'md:pr-6 lg:pr-12'}`}>
                <motion.div
                    initial={{ opacity: 0, x: event.side === 'left' ? -50 : 50, y: 20 }}
                    animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="glass-card rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 group relative overflow-hidden"
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    style={{ willChange: 'transform' }}
                >
                    {/* Color accent */}
                    <div className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: `linear-gradient(90deg, ${event.color}, transparent)` }}
                    />

                    <div className="flex items-start gap-2.5 sm:gap-3 md:gap-3.5 mb-2.5 sm:mb-3 md:mb-4">
                        <motion.span className="text-xl sm:text-2xl md:text-3xl flex-shrink-0 mt-0.5" whileHover={{ scale: 1.2, rotate: 8 }} transition={{ duration: 0.2 }}>
                            {event.icon}
                        </motion.span>
                        <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: event.color }}>
                                {event.year}
                            </span>
                            <h3 className="font-display font-bold text-sm sm:text-base md:text-lg lg:text-xl text-brand-text leading-snug">{event.title}</h3>
                        </div>
                    </div>
                    <p className="text-brand-muted text-xs sm:text-sm md:text-base leading-relaxed">{event.description}</p>
                </motion.div>
            </div>

            {/* Center spine dot with ripple */}
            <div className="relative flex-shrink-0 hidden md:flex" style={{ width: 40, display: 'flex', justifyContent: 'center' }}>
                <motion.div
                    className="w-4 h-4 rounded-full relative z-10"
                    style={{ background: event.color, boxShadow: `0 0 16px ${event.color}80` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.05, type: 'spring', stiffness: 400, damping: 20 }}
                />
                {/* Ripple */}
                <motion.div
                    className="absolute inset-0 m-auto w-4 h-4 rounded-full"
                    style={{ border: `1px solid ${event.color}` }}
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={inView ? { scale: 3.5, opacity: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.8 }}
                />
            </div>

            {/* Spacer side */}
            <div className="hidden md:flex md:flex-1" />
        </div>
    )
}

export default function Experience() {
    const sectionRef = useRef(null)
    const spineRef = useRef(null)
    const inView = useInView(sectionRef, { once: true, margin: '-80px' })

    // Scroll-driven spine growth
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 80%', 'end 20%'] })
    const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <section id="experience" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
            {/* Chapter atmosphere */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(79,157,255,0.05) 0%, transparent 50%)' }} />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-5 md:px-6">
                <motion.div {...scrollRevealScale(0)} className="text-center mb-10 sm:mb-12 md:mb-16">
                    <span className="section-label mb-2 sm:mb-3 inline-flex font-mono text-xs">
                        <span className="text-brand-primary/60 mr-1">//</span>
                        experience.timeline
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-text mt-2 sm:mt-3 md:mt-4">
                        My <span className="gradient-text">Journey</span>
                    </h2>
                    <p className="text-brand-muted mt-2 sm:mt-3 md:mt-4 max-w-xl mx-auto text-sm sm:text-base md:text-lg">
                        A chronological path from first principles to production systems.
                    </p>
                </motion.div>

                {/* Timeline container */}
                <div className="relative">
                    {/* Scroll-driven spine that GROWS with scroll */}
                    <div
                        ref={spineRef}
                        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top"
                        style={{ overflow: 'hidden' }}
                    >
                        <motion.div
                            className="absolute top-0 left-0 w-full"
                            initial={{ scaleY: 1 }}
                            style={{
                                height: '100%',
                                scaleY: spineScaleY,
                                transformOrigin: 'top',
                                background: 'linear-gradient(180deg, #4F9DFF 0%, #7C5CFF 50%, #22D3EE 100%)',
                                boxShadow: '0 0 8px rgba(79,157,255,0.4)',
                            }}
                        />
                    </div>

                    {/* Timeline items */}
                    <div className="space-y-14 py-4">
                        {EVENTS.map((event, i) => (
                            <TimelineItem key={event.year + event.title} event={event} index={i} />
                        ))}
                    </div>

                    {/* End marker */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                        className="flex justify-center mt-8"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-brand-primary shadow-glow-primary" />
                            <span className="text-brand-muted text-xs tracking-widest uppercase">Present</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
