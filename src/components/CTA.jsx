import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { scrollRevealScale, EASE } from '../animations/animationVariants'
import resumePDF from '../assets/Resume_Sameer_khatri.pdf'

// ── Judge Psychology: Emotional professional invitation — collaboration signal
export default function CTA() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="cta" className="py-32 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(79,157,255,0.1) 0%, transparent 70%)' }} />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                style={{ background: 'rgba(79,157,255,0.04)', filter: 'blur(100px)' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Status chip */}
                <motion.div {...scrollRevealScale(0)} className="flex justify-center mb-8">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-brand-border bg-brand-bg/60 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <span className="glow-dot" />
                            <span className="text-green-400 text-sm font-medium">Available for Hire</span>
                        </div>
                        <div className="w-px h-4 bg-brand-border" />
                        <span className="text-brand-muted text-sm">Open to full-time & freelance</span>
                    </div>
                </motion.div>

                {/* Main Headline */}
                <motion.h2
                    {...scrollRevealScale(0.1)}
                    className="font-display font-black text-5xl md:text-7xl text-brand-text leading-tight mb-6"
                >
                    Let's Build{' '}
                    <span className="gradient-text block">Something Meaningful.</span>
                </motion.h2>

                {/* Supporting copy */}
                <motion.p
                    {...scrollRevealScale(0.2)}
                    className="text-brand-muted text-xl max-w-2xl mx-auto leading-relaxed mb-10"
                >
                    Whether you're launching a product, scaling a business, or need a frontend engineer who thinks in outcomes — I'm ready to contribute from day one.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    {...scrollRevealScale(0.3)}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <motion.a
                        href="mailto:sameerkhatri5050@gmail.com"
                        className="btn-primary text-base px-8 py-4"
                        whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(79,157,255,0.4)' }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span>Start a Conversation</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </motion.a>
                    <motion.a
                        href={resumePDF}
                        download="Sameer_Khatri_Resume.pdf"
                        className="btn-outline text-base px-8 py-4"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span>Download Resume</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </motion.a>
                </motion.div>

                {/* Trust signals */}
                <motion.div
                    {...scrollRevealScale(0.4)}
                    className="flex flex-wrap justify-center gap-6 mt-12 text-brand-muted text-sm"
                >
                    {[
                        { icon: '⚡', label: 'Response within 24 hours' },
                        { icon: '🌏', label: 'Remote-first, Indore-based' },
                        { icon: '🏢', label: 'Open to Relocation' },
                    ].map((t) => (
                        <div key={t.label} className="flex items-center gap-2">
                            <span>{t.icon}</span>
                            <span>{t.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
