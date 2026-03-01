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
        <section id="about" className="py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-section" />
            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    {...scrollRevealScale(0)}
                    className="text-center mb-16"
                >
                    <span className="section-label mb-4 inline-flex font-mono text-xs">
                        <span className="text-brand-primary/60 mr-1">//</span>
                        about.journey
                    </span>
                    <h2 className="font-display font-black text-5xl md:text-6xl text-brand-text mt-4">
                        From{' '}
                        <span className="gradient-text">Foundations</span>
                        {' '}to{' '}
                        <span className="gradient-text-static">Production</span>
                    </h2>
                    <p className="text-brand-muted mt-4 max-w-xl mx-auto text-lg leading-relaxed">
                        A deliberate progression — not just accumulating skills, but building the judgment to apply them at scale.
                    </p>
                </motion.div>

                {/* Journey Spine Line */}
                <div className="absolute left-1/2 top-36 md:top-44 -translate-x-1/2 h-[500px] md:h-[650px] w-8 pointer-events-none z-0" ref={spineRef}>
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
                    className="grid md:grid-cols-2 gap-6 relative z-10"
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
                            className="glass-card rounded-2xl p-7 group relative overflow-hidden"
                            whileHover={{ y: -5, transition: { duration: 0.22 } }}
                        >
                            {/* Phase accent line */}
                            <div
                                className="absolute top-0 left-0 w-full h-0.5 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
                            />

                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                        style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                                    >
                                        {p.icon}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span
                                            className="text-xs font-bold uppercase tracking-widest"
                                            style={{ color: p.color }}
                                        >
                                            Phase {p.phase}
                                        </span>
                                        <span className="text-brand-border">·</span>
                                        <span className="text-brand-muted text-xs">{p.year}</span>
                                    </div>
                                    <h3 className="font-display font-bold text-xl text-brand-text mb-3">{p.title}</h3>
                                    <p className="text-brand-muted text-sm leading-relaxed mb-4">{p.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {p.tags.map((tag) => (
                                            <span key={tag} className="skill-tag">{tag}</span>
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
                    className="mt-12 glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8"
                >
                    <div className="w-24 h-24 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0 shadow-glow-primary">
                        <span className="font-display font-black text-3xl text-white">SK</span>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="font-display font-bold text-2xl text-brand-text">Sameer Khatri</h3>
                        <p className="text-brand-primary font-medium mt-1">Frontend Engineer · React Developer · Agency Founder</p>
                        <p className="text-brand-muted text-sm mt-2 max-w-lg leading-relaxed">
                            B.Tech CSE — IPS Academy, Indore. Currently on internship at Datacode. Building client-facing digital products through my web agency while co-building the GRID developer community.
                        </p>
                    </div>
                    <div className="flex gap-4 md:ml-auto">
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                            className="btn-primary text-sm px-5 py-2.5"
                        >
                            <span>Let's Connect</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
