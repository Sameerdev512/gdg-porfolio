import { useRef,useState,useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, scrollRevealScale, EASE } from '../animations/animationVariants'

// ── Judge Psychology: Phases rewritten as outcome narratives, not student diary
const phases = [
    {
        phase: '01',
        title: 'Engineering Foundations',
        year: '2022',
        description: 'Built rigorous programming fundamentals from the ground up — C, Java, and core CS theory. Developed the analytical precision that separates engineers from coders.',
        tags: ['C', 'Java', 'Algorithms', 'CS Fundamentals'],
        icon: '📐',
        color: '#4F9DFF',
    },
    {
        phase: '02',
        title: 'Algorithmic Problem Solver',
        year: '2023',
        description: 'Solved 100+ LeetCode problems across arrays, trees, graphs, and dynamic programming. Trained a systematic approach to decomposing complexity into engineered solutions.',
        tags: ['DSA', 'LeetCode', 'System Thinking', 'Optimization'],
        icon: '🧠',
        color: '#7C5CFF',
    },
    {
        phase: '03',
        title: 'Production-Level Builder',
        year: '2024',
        description: 'Transitioned from learning to shipping. Mastered React, Spring Boot, and REST architectures — delivering seven client websites with real users, real deadlines, and real feedback.',
        tags: ['React', 'Spring Boot', 'REST APIs', 'Tailwind CSS', 'MySQL'],
        icon: '⚡',
        color: '#22D3EE',
    },
    {
        phase: '04',
        title: 'Digital Agency Founder',
        year: '2025',
        description: 'Founded a web agency delivering across fitness, design, F&B, and hardware industries. Wearing both engineer and product owner hats — from client discovery to final deployment.',
        tags: ['Digital Agency', 'Client Delivery', 'Product Design', 'Business Strategy'],
        icon: '🏗️',
        color: '#4F9DFF',
    },
]

export default function About() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    // Journey spine scroll animation
    const spineRef = useRef(null);
    const [spineProgress, setSpineProgress] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            if (!spineRef.current) return;
            const rect = spineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            let progress = 0;
            if (rect.top < windowHeight && rect.bottom > 0) {
                progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (rect.height + windowHeight)));
            }
            setSpineProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-section" />
            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6">
                {/* Header */}
                <motion.div {...scrollRevealScale(0)} className="text-center mb-10 sm:mb-12 md:mb-16 px-0">
                    <span className="section-label mb-2 sm:mb-3 inline-flex font-mono text-xs">
                        <span className="text-brand-primary/60 mr-1">//</span>
                        about.journey
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-text mt-2 sm:mt-3 md:mt-4">
                        From{' '}
                        <span className="gradient-text">Foundations</span>
                        {' '}to{' '}
                        <span className="gradient-text-static">Production</span>
                    </h2>
                    <p className="text-brand-muted mt-2 sm:mt-3 md:mt-4 max-w-lg mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-0">
                        A deliberate progression — not just accumulating skills, but building the judgment to apply them at scale.
                    </p>
                </motion.div>

                {/* Journey Spine Line */}
                <div className="hidden md:block absolute left-1/2 top-36 md:top-44 -translate-x-1/2 h-[500px] md:h-[650px] w-8 pointer-events-none z-0" ref={spineRef}>
                    <motion.div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '4px',
                            minHeight: '60px',
                            height: spineProgress === 0 ? '60px' : `calc(${spineProgress * 100}% )`,
                            background: 'linear-gradient(180deg, #4F9DFF, #7C5CFF, #22D3EE)',
                            borderRadius: '2px',
                        }}
                        initial={{ height: '60px' }}
                        animate={{ height: spineProgress === 0 ? '60px' : `${spineProgress * 100}%` }}
                        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                    />
                </div>

                {/* Journey Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 relative z-10"
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                >
                    {phases.map((p, i) => (
                        <motion.div
                            key={p.phase}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE.out } },
                            }}
                            className="glass-card rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 group relative overflow-hidden"
                            whileHover={{ y: -5, transition: { duration: 0.22 } }}
                        >
                            {/* Phase accent line */}
                            <div
                                className="absolute top-0 left-0 w-full h-0.5 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
                            />

                            <div className="flex items-start gap-2.5 sm:gap-3 md:gap-5">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-9 sm:w-10 md:w-12 h-9 sm:h-10 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl"
                                        style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                                    >
                                        {p.icon}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
                                        <span
                                            className="text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                                            style={{ color: p.color }}
                                        >
                                            Phase {p.phase}
                                        </span>
                                        <span className="text-brand-border text-xs sm:text-sm">·</span>
                                        <span className="text-brand-muted text-xs">{p.year}</span>
                                    </div>
                                    <h3 className="font-display font-bold text-sm sm:text-base md:text-lg lg:text-xl text-brand-text mb-1.5 sm:mb-2 md:mb-3 line-clamp-2">{p.title}</h3>
                                    <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-2.5 sm:mb-3 md:mb-4 line-clamp-3 sm:line-clamp-4">{p.description}</p>
                                    <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                                        {p.tags.map((tag) => (
                                            <span key={tag} className="skill-tag text-xs">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    {...scrollRevealScale(0.3)}
                    className="mt-12 sm:mt-14 md:mt-16 lg:mt-20 glass-card rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8"
                >
                    <div className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0 shadow-glow-primary">
                        <span className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white">SK</span>
                    </div>
                    <div className="text-center md:text-left flex-1 min-w-0">
                        <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-brand-text">Sameer Khatri</h3>
                        <p className="text-brand-primary font-medium text-xs sm:text-sm mt-1">Frontend Engineer · React Developer · Agency Founder</p>
                        <p className="text-brand-muted text-xs sm:text-sm mt-2 md:mt-3 max-w-lg leading-relaxed">
                            B.Tech CSE — IPS Academy, Indore. Currently on internship at Datacode. Building client-facing digital products through my web agency while co-building the GRID developer community.
                        </p>
                    </div>
                    <div className="flex gap-2.5 sm:gap-3 md:gap-4 md:ml-auto w-full md:w-auto justify-center md:justify-start flex-shrink-0">
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                            className="btn-primary text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 whitespace-nowrap"
                        >
                            <span>Let's Connect</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
