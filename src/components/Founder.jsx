import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { scrollRevealScale, scrollRevealLeft, scrollRevealRight, staggerContainer, EASE } from '../animations/animationVariants'

// ── Judge Psychology: Creator not participant — agency framing signals initiative
export default function Founder() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const pillars = [
        { icon: '💡', title: 'Product-First Engineering', text: 'Every decision is made with business outcome in mind — not just technology. Code serves the product, not the other way around.' },
        { icon: '🤝', title: 'End-to-End Ownership', text: 'Full-stack thinking: from client discovery to deployment. Design, code, performance, polish — complete accountability with no gaps.' },
        { icon: '🏗️', title: 'Building Infrastructure', text: 'Creating scalable systems and processes before taking on clients. Strong foundations ensure sustainable growth and consistent quality.' },
        { icon: '🚀', title: 'Builder Mindset', text: 'Founded a digital agency while in college. Not waiting for permission — building systems, learning fast, and preparing to deliver real impact.' },
    ]

    return (
        <section id="founder" className="py-28 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,92,255,0.07) 0%, transparent 60%)' }} />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div>
                        <motion.div
                            {...scrollRevealLeft(0)}
                            className="space-y-6"
                        >
                            <span className="section-label">🏗️ Founder's Perspective</span>
                            <h2 className="font-display font-black text-5xl md:text-6xl text-brand-text leading-tight mt-4">
                                Creating{' '}
                                <span className="gradient-text">Real Value</span>
                                {' '}Through Code
                            </h2>
                            <p className="text-brand-muted text-lg leading-relaxed">
                                Engineering skills without business thinking builds features, not products. I founded a digital agency to bridge that gap — building infrastructure and processes to deliver outcomes that matter.
                            </p>
                            <p className="text-brand-muted leading-relaxed">
                                Currently building the foundation: developing case studies, refining service delivery, and creating systems for scalable growth. Ready to partner with forward-thinking brands that need a builder, not just a developer.
                            </p>

                            <div className="flex items-center gap-6 pt-4">
                                <div className="text-center">
                                    <div className="font-display font-black text-4xl gradient-text-static">1</div>
                                    <div className="text-brand-muted text-sm mt-1">Agency Founded</div>
                                </div>
                                <div className="w-px h-12 bg-brand-border" />
                                <div className="text-center">
                                    <div className="font-display font-black text-4xl gradient-text-static">Private</div>
                                    <div className="text-brand-muted text-sm mt-1">By Invitation</div>
                                </div>
                                <div className="w-px h-12 bg-brand-border" />
                                <div className="text-center">
                                    <div className="font-display font-black text-4xl gradient-text-static">Custom</div>
                                    <div className="text-brand-muted text-sm mt-1">Providing Solutions</div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <motion.a
                                    href="#contact"
                                    onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                                    className="btn-primary"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span>Let's Work Together</span>
                                </motion.a>
                                <motion.a
                                    href="#cta"
                                    onClick={(e) => { e.preventDefault(); document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' }) }}
                                    className="btn-outline"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span>Learn More</span>
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Pillars */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                        variants={staggerContainer(0.1)}
                        initial="hidden"
                        animate={inView ? 'show' : 'hidden'}
                    >
                        {pillars.map((p, i) => (
                            <motion.div
                                key={p.title}
                                variants={{
                                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE.out } },
                                }}
                                className="glass-card rounded-2xl p-6"
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            >
                                <motion.span
                                    className="text-3xl inline-block"
                                    whileHover={{ rotate: 8, scale: 1.15 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {p.icon}
                                </motion.span>
                                <h3 className="font-display font-bold text-base text-brand-text mt-3 mb-2">{p.title}</h3>
                                <p className="text-brand-muted text-sm leading-relaxed">{p.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
