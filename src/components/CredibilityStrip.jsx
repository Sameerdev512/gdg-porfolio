import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import { staggerContainer, scaleIn, EASE } from '../animations/animationVariants'

const metrics = [
    { value: '100+', label: 'Algorithms Solved — LeetCode', icon: '🧠', color: 'from-brand-primary to-brand-secondary' },
    { value: '7+', label: 'Client Sites Shipped to Production', icon: '🚀', color: 'from-brand-secondary to-brand-glow' },
    { value: '1', label: 'Industry Internship — Datacode', icon: '💼', color: 'from-brand-glow to-brand-primary' },
    { value: '∞', label: 'Digital Agency & Community Founder', icon: '🌐', color: 'from-brand-primary to-brand-glow' },
]

export default function CredibilityStrip() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-50px' })

    return (
        <section className="py-16 border-y border-brand-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-dark opacity-80" />

            {/* Subtle scanning line */}
            <motion.div
                className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-brand-primary to-transparent opacity-20"
                animate={{ x: ['0vw', '100vw'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    variants={staggerContainer(0.12, 0)}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                >
                    {metrics.map((m, i) => (
                        <motion.div
                            key={m.label}
                            variants={{
                                hidden: { opacity: 0, y: 24, scale: 0.93 },
                                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE.out } },
                            }}
                            className="flex flex-col items-center text-center gap-2 group"
                        >
                            {/* Icon with hover rotation */}
                            <motion.span
                                className="text-3xl"
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                            >
                                {m.icon}
                            </motion.span>

                            {/* Counter with scale-pop on complete */}
                            <motion.div
                                className={`text-4xl md:text-5xl font-display font-black bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}
                                whileInView={{ scale: [1, 1.08, 1] }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 + 0.8, duration: 0.4, ease: 'easeOut' }}
                            >
                                <AnimatedCounter value={m.value} duration={1.6} />
                            </motion.div>

                            <p className="text-brand-muted text-sm font-medium leading-tight">{m.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
