import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import useCursor from '../hooks/useCursor'
import { EASE } from '../animations/animationVariants'

const NAME_CHARS = 'SAMEER KHATRI'.split('')
const ROLES = ['Frontend Engineer', 'React Developer', 'Full-Stack Builder', 'Agency Founder']

const CHAR_ORIGINS = [
    // Each character gets a unique starting transform (direction + distance)
    { x: -80, y: -40 }, { x: -60, y: 60 }, { x: 40, y: -60 },
    { x: -70, y: 30 }, { x: 60, y: -50 }, { x: -40, y: 70 },
    { x: 0, y: 0 }, // space
    { x: 80, y: -30 }, { x: -50, y: -70 }, { x: 70, y: 40 },
    { x: -60, y: -40 }, { x: 50, y: 60 }, { x: -30, y: -80 },
]

// ── Floating ring that responds to cursor
function CursorRing({ cursorX, cursorY, depth = 1, size = 120, color = '#4F9DFF', opacity = 0.12 }) {
    const springX = useSpring(useTransform(cursorX, [-1, 1], [-30 * depth, 30 * depth]), { stiffness: 60, damping: 18 })
    const springY = useSpring(useTransform(cursorY, [-1, 1], [-20 * depth, 20 * depth]), { stiffness: 60, damping: 18 })

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size, height: size,
                border: `1px solid ${color}`,
                opacity,
                x: springX,
                y: springY,
                boxShadow: `0 0 40px ${color}30`,
            }}
        />
    )
}

export default function Hero() {
    const { normX, normY } = useCursor()
    const [roleIndex, setRoleIndex] = useState(0)
    const [displayText, setDisplayText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const intervalRef = useRef(null)
    const heroRef = useRef(null)

    // Scroll-out parallax: name letters drift up as user scrolls away
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
    const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -80])

    // Background parallax driven by cursor
    const bgX = useSpring(useTransform(normX, [-1, 1], ['-3%', '3%']), { stiffness: 40, damping: 20 })
    const bgY = useSpring(useTransform(normY, [-1, 1], ['-3%', '3%']), { stiffness: 40, damping: 20 })

    // Typewriter
    useEffect(() => {
        const current = ROLES[roleIndex]
        const speed = isDeleting ? 40 : 80
        intervalRef.current = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(current.slice(0, displayText.length + 1))
                if (displayText.length === current.length - 1) setTimeout(() => setIsDeleting(true), 1800)
            } else {
                setDisplayText(current.slice(0, displayText.length - 1))
                if (displayText.length === 0) { setIsDeleting(false); setRoleIndex(p => (p + 1) % ROLES.length) }
            }
        }, speed)
        return () => clearTimeout(intervalRef.current)
    }, [displayText, isDeleting, roleIndex])

    // Name letter container variants
    const nameContainer = {
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: 0.3 } },
    }

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative py-12 sm:py-16 md:py-20 lg:py-28 flex items-center justify-center overflow-hidden"
        >
            {/* ── Noise texture overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-[0.025]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
            />

            {/* ── Background with cursor parallax */}
            <motion.div className="absolute inset-0" style={{ x: bgX, y: bgY, scale: 1.08 }}>
                <div className="absolute inset-0 bg-[#0B0B0F]" />
                {/* Radial gradient lighting */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(79,157,255,0.13) 0%, transparent 70%)' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(124,92,255,0.08) 0%, transparent 60%)' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(34,211,238,0.06) 0%, transparent 60%)' }} />

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(79,157,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,157,255,1) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </motion.div>

            {/* ── Floating depth rings (cursor-parallax) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {/* Outer rings */}
                <div className="absolute" style={{ top: '15%', left: '10%' }}>
                    <CursorRing cursorX={normX} cursorY={normY} depth={0.4} size={180} color="#4F9DFF" opacity={0.08} />
                </div>
                <div className="absolute" style={{ top: '60%', right: '8%' }}>
                    <CursorRing cursorX={normX} cursorY={normY} depth={0.7} size={120} color="#7C5CFF" opacity={0.1} />
                </div>
                <div className="absolute" style={{ bottom: '20%', left: '20%' }}>
                    <CursorRing cursorX={normX} cursorY={normY} depth={0.5} size={90} color="#22D3EE" opacity={0.09} />
                </div>
                <div className="absolute" style={{ top: '25%', right: '15%' }}>
                    <CursorRing cursorX={normX} cursorY={normY} depth={1.0} size={60} color="#4F9DFF" opacity={0.15} />
                </div>

                {/* Ambient glowing orbs */}
                {[
                    { top: '20%', left: '8%', size: 4, color: '#4F9DFF', delay: 0 },
                    { top: '65%', right: '6%', size: 3, color: '#7C5CFF', delay: 1.5 },
                    { top: '35%', right: '22%', size: 5, color: '#22D3EE', delay: 2.8 },
                    { bottom: '30%', left: '15%', size: 3, color: '#4F9DFF', delay: 1.0 },
                ].map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 ${p.size * 5}px ${p.color}`, ...p }}
                        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 5 + p.delay, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
                    />
                ))}
            </div>

            {/* ── Content */}
            <motion.div
                className="relative z-20 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 pt-0 sm:pt-0 text-center flex flex-col items-center gap-5 sm:gap-6 md:gap-7"
                style={{ opacity: heroOpacity, y: heroY }}
            >
                {/* Authority badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
                    <motion.span className="section-label" whileHover={{ scale: 1.04 }}>
                        <span className="glow-dot" />
                        Open to Engineering Roles &amp; Freelance
                    </motion.span>
                </motion.div>

                {/* ── Assembled Name — each letter from a different direction */}
                <motion.div
                    variants={nameContainer}
                    initial="hidden"
                    animate="show"
                    className="flex flex-wrap justify-center items-center leading-none px-2 sm:px-4"
                >
                    {NAME_CHARS.map((char, i) => {
                        const origin = CHAR_ORIGINS[i] || { x: 0, y: 0 }
                        const isSpace = char === ' '
                        const isSecondWord = i >= 7 // 'KHATRI' starts at index 7

                        return (
                            <motion.span
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, x: origin.x, y: origin.y, scale: 0.6, filter: 'blur(8px)' },
                                    show: {
                                        opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)',
                                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                                    },
                                }}
                                className={`
                  font-display font-black
                  text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7.5rem]
                  tracking-tight
                  ${isSpace ? 'mx-1 sm:mx-2 md:mx-4' : ''}
                  ${isSecondWord ? 'gradient-text' : 'text-brand-text'}
                  inline-block
                `}
                                style={{ display: 'inline-block' }}
                            >
                                {isSpace ? '\u00A0' : char}
                            </motion.span>
                        )
                    })}
                </motion.div>

                {/* Role line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="flex items-center gap-2 h-8 sm:h-10 px-2 sm:px-4"
                >
                    <span className="text-sm sm:text-lg md:text-xl text-brand-muted font-light tracking-wide">
                        {displayText}
                    </span>
                    <motion.span
                        className="w-0.5 h-6 bg-brand-primary inline-block"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                    />
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6, ease: EASE.out }}
                    className="text-xs sm:text-sm md:text-base lg:text-lg text-brand-muted max-w-2xl leading-relaxed font-light px-2 sm:px-4"
                >
                    Architecting{' '}
                    <span className="text-brand-primary font-medium">scalable web systems</span>
                    {' '}and delivering{' '}
                    <span className="text-brand-secondary font-medium">digital products that drive real outcomes.</span>
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.6, ease: EASE.out }}
                    className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 w-full sm:w-auto px-2 sm:px-4"
                >
                    <motion.a
                        href="#projects"
                        onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                        className="btn-primary text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5"
                        whileHover={{ scale: 1.04, y: -2, boxShadow: '0 0 32px rgba(79,157,255,0.4)' }}
                        whileTap={{ scale: 0.97 }}
                        data-hover="true"
                    >
                        <span>See Case Studies</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                    <motion.a
                        href="mailto:sameerkhatridev512@gmail.com"
                        className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 mb-2 md:mb-0"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        data-hover="true"
                    >
                        <span>Start a Conversation</span>
                    </motion.a>
                </motion.div>

                {/* Social row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.9, duration: 0.6 }}
                    className="flex items-center gap-6 mt-2"
                >
                    {[
                        { label: 'GitHub', href: 'https://github.com/', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
                        { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                    ].map(s => (
                        <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                            className="text-brand-muted hover:text-brand-primary transition-colors"
                            whileHover={{ scale: 1.2, rotate: 5 }} data-hover="true"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
                        </motion.a>
                    ))}
                    <div className="w-px h-4 bg-brand-border" />
                    <span className="text-brand-muted text-sm">Indore, India</span>
                </motion.div>
            </motion.div>

            {/* ── Scroll nudge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.8 }}
                className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-brand-muted text-[10px] uppercase tracking-[0.25em]">Explore</span>
                <div className="w-5 h-8 border border-brand-border/50 rounded-full flex items-start justify-center p-1">
                    <motion.div
                        className="w-1 h-2 bg-brand-primary rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
