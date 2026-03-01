import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, scrollRevealScale, EASE } from '../animations/animationVariants'

const achievements = [
    { title: 'Azure AI Fundamentals', issuer: 'Microsoft', year: '2024', description: 'Foundational certification in AI, ML, and Azure Cognitive Services.', icon: '☁️', color: '#4F9DFF', type: 'Certification' },
    { title: 'Agile Project Management', issuer: 'HP Life', year: '2024', description: 'Certified in Agile methodologies, Scrum frameworks, and project delivery.', icon: '🔄', color: '#7C5CFF', type: 'Certification' },
    { title: 'Advanced Java', issuer: 'Ypsilon Technologies', year: '2023', description: 'Advanced programming with OOP, collections, multithreading, and Spring.', icon: '☕', color: '#22D3EE', type: 'Certification' },
    { title: 'Meritorious Student Award', issuer: 'Piramal Pharma Solution', year: '2023', description: 'Awarded for outstanding academic performance and consistent excellence.', icon: '🏆', color: '#F59E0B', type: 'Award' },
    { title: 'GRID Community Co-Founder', issuer: 'Self-Founded', year: '2024', description: 'Co-founded a developer community for peer learning and collaboration.', icon: '🌐', color: '#4F9DFF', type: 'Leadership' },
    { title: '100+ LeetCode Problems', issuer: 'LeetCode', year: '2023', description: 'Solved 100+ algorithmic problems across arrays, trees, graphs, and DP.', icon: '🧩', color: '#22D3EE', type: 'Achievement' },
]

const typeColors = { Certification: '#4F9DFF', Award: '#F59E0B', Leadership: '#7C5CFF', Achievement: '#22D3EE' }

export default function ProofOfWork() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="proof" className="py-28 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(79,157,255,0.06) 0%, transparent 50%)' }} />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div {...scrollRevealScale(0)} className="text-center mb-16">
                    <span className="section-label mb-4 inline-flex font-mono text-xs">
                        <span className="text-brand-primary/60 mr-1">//</span>
                        proof.verified[ ]
                    </span>
                    <h2 className="font-display font-black text-5xl md:text-6xl text-brand-text mt-4">
                        Verified <span className="gradient-text">Achievements</span>
                    </h2>
                    <p className="text-brand-muted mt-4 max-w-xl mx-auto text-lg">
                        Certifications, awards, and milestones that validate the craft.
                    </p>
                </motion.div>

                {/* Achievement Unlock Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                    variants={staggerContainer(0.09)}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                >
                    {achievements.map((a, i) => (
                        <motion.div
                            key={a.title}
                            variants={{
                                hidden: { opacity: 0, y: 32, scale: 0.9 },
                                show: {
                                    opacity: 1, y: 0, scale: 1,
                                    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                                },
                            }}
                            className="glass-card rounded-2xl p-6 group relative overflow-hidden cursor-default"
                            whileHover={{
                                y: -6, scale: 1.02,
                                boxShadow: `0 20px 48px ${a.color}18`,
                                transition: { duration: 0.28 },
                            }}
                        >
                            {/* Color accent line */}
                            <div className="absolute top-0 left-0 w-full h-0.5"
                                style={{ background: `linear-gradient(90deg, ${a.color}, transparent)` }}
                            />

                            <div className="flex items-start gap-4 relative z-10">
                                <motion.div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                    style={{ background: `${a.color}15`, border: `1px solid ${a.color}30` }}
                                    whileHover={{ scale: 1.15, rotate: 10 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                                >
                                    {a.icon}
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                            style={{ background: `${typeColors[a.type]}15`, color: typeColors[a.type] }}>
                                            {a.type}
                                        </span>
                                        <span className="text-brand-muted text-xs">{a.year}</span>
                                    </div>
                                    <h3 className="font-display font-bold text-base text-brand-text mt-2">{a.title}</h3>
                                    <p style={{ color: a.color }} className="text-xs font-medium mt-0.5">{a.issuer}</p>
                                    <p className="text-brand-muted text-sm mt-2 leading-relaxed">{a.description}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-brand-border flex items-center gap-2 relative z-10">
                                <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                </div>
                                <span className="text-green-400 text-xs font-medium">Verified</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
