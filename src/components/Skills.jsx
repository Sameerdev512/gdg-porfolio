import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { scrollRevealScale, EASE } from '../animations/animationVariants'

// ── Node positions (percentage-based within the SVG canvas)
const NODES = [
    // Core (center)
    { id: 'react', label: 'React', x: 50, y: 42, cluster: 'frontend', r: 28, color: '#61DAFB' },

    // Frontend cluster (upper-left)
    { id: 'js', label: 'JavaScript', x: 24, y: 28, cluster: 'frontend', r: 22, color: '#F7DF1E' },
    { id: 'tailwind', label: 'Tailwind', x: 34, y: 60, cluster: 'frontend', r: 18, color: '#38BDF8' },
    { id: 'html', label: 'HTML5', x: 14, y: 50, cluster: 'frontend', r: 14, color: '#E34F26' },
    { id: 'css', label: 'CSS3', x: 22, y: 68, cluster: 'frontend', r: 13, color: '#264DE4' },
    { id: 'framer', label: 'Framer', x: 38, y: 75, cluster: 'frontend', r: 14, color: '#BB22FF' },

    // Backend cluster (upper-right)
    { id: 'java', label: 'Java', x: 72, y: 26, cluster: 'backend', r: 22, color: '#ED8B00' },
    { id: 'springboot', label: 'Spring Boot', x: 84, y: 44, cluster: 'backend', r: 20, color: '#6DB33F' },
    { id: 'restapi', label: 'REST API', x: 76, y: 62, cluster: 'backend', r: 16, color: '#7C5CFF' },
    { id: 'mysql', label: 'MySQL', x: 65, y: 74, cluster: 'backend', r: 15, color: '#4479A1' },

    // Tools cluster (top center)
    { id: 'git', label: 'Git', x: 50, y: 14, cluster: 'tools', r: 16, color: '#F05032' },
    { id: 'vite', label: 'Vite', x: 62, y: 22, cluster: 'tools', r: 13, color: '#646CFF' },
    { id: 'vercel', label: 'Vercel', x: 38, y: 18, cluster: 'tools', r: 13, color: '#CCCCCC' },
]

// Edges (connections between nodes)
const EDGES = [
    ['react', 'js'], ['react', 'tailwind'], ['react', 'framer'], ['react', 'restapi'],
    ['js', 'html'], ['js', 'css'], ['java', 'springboot'], ['springboot', 'restapi'],
    ['restapi', 'mysql'], ['react', 'vite'], ['git', 'react'], ['git', 'java'],
    ['vercel', 'react'], ['tailwind', 'html'], ['vite', 'js'],
]

const CLUSTER_LABEL = { frontend: 'Frontend', backend: 'Backend', tools: 'Dev Tools' }
const CLUSTER_COLOR = { frontend: '#61DAFB', backend: '#6DB33F', tools: '#F05032' }

export default function Skills() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [hoveredNode, setHoveredNode] = useState(null)

    const isConnected = useCallback((nodeId) => {
        if (!hoveredNode) return false
        return EDGES.some(([a, b]) => (a === hoveredNode && b === nodeId) || (b === hoveredNode && a === nodeId))
    }, [hoveredNode])

    const isEdgeActive = useCallback((a, b) => {
        if (!hoveredNode) return false
        return (a === hoveredNode || b === hoveredNode)
    }, [hoveredNode])

    const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]))

    return (
        <section id="skills" className="py-28 relative overflow-hidden">
            {/* Chapter atmosphere */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(97,218,251,0.04) 0%, transparent 70%)' }} />
            <div className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(79,157,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,157,255,1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div {...scrollRevealScale(0)} className="text-center mb-12">
                    <span className="section-label mb-4 inline-flex font-mono text-xs">
                        <span className="text-brand-primary/60 mr-1">//</span>
                        skills.constellation
                    </span>
                    <h2 className="font-display font-black text-5xl md:text-6xl text-brand-text mt-4">
                        Technology{' '}<span className="gradient-text">Map</span>
                    </h2>
                    <p className="text-brand-muted mt-4 max-w-xl mx-auto text-lg">
                        Every tool in my stack, and how they connect. Hover any node to explore the relationships.
                    </p>
                </motion.div>

                {/* SVG Constellation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, ease: EASE.out, delay: 0.2 }}
                    className="relative mx-auto"
                    style={{ maxWidth: 900, aspectRatio: '16/9' }}
                >
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid meet"
                        className="w-full h-full"
                        style={{ overflow: 'visible' }}
                    >
                        {/* Defs: animated glow filters */}
                        <defs>
                            {NODES.map(n => (
                                <filter key={`glow-${n.id}`} id={`glow-${n.id}`} x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" />
                                </filter>
                            ))}
                        </defs>

                        {/* Edges */}
                        {EDGES.map(([a, b], i) => {
                            const na = nodeMap[a]
                            const nb = nodeMap[b]
                            const active = isEdgeActive(a, b)
                            return (
                                <motion.line
                                    key={`${a}-${b}`}
                                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                                    stroke={active ? '#4F9DFF' : 'rgba(255,255,255,0.08)'}
                                    strokeWidth={active ? 0.4 : 0.2}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={inView ? {
                                        pathLength: 1,
                                        opacity: hoveredNode ? (active ? 1 : 0.15) : 0.6,
                                    } : {}}
                                    transition={{
                                        pathLength: { delay: i * 0.04 + 0.5, duration: 0.6, ease: 'easeOut' },
                                        opacity: { duration: 0.3 },
                                    }}
                                    style={{
                                        filter: active ? 'drop-shadow(0 0 2px #4F9DFF)' : 'none',
                                    }}
                                />
                            )
                        })}

                        {/* Nodes */}
                        {NODES.map((node, i) => {
                            const isHovered = hoveredNode === node.id
                            const connected = isConnected(node.id)
                            const dimmed = hoveredNode && !isHovered && !connected
                            // Fixed radius — don't animate r on SVG, animate scale on g instead
                            const baseR = node.r / 10

                            return (
                                <motion.g
                                    key={node.id}
                                    onHoverStart={() => setHoveredNode(node.id)}
                                    onHoverEnd={() => setHoveredNode(null)}
                                    style={{ cursor: 'pointer', transformOrigin: `${node.x}% ${node.y}%` }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={inView ? {
                                        scale: isHovered ? 1.18 : 1,
                                        opacity: dimmed ? 0.25 : 1,
                                    } : { scale: 0, opacity: 0 }}
                                    transition={{ delay: inView ? i * 0.05 + 0.3 : 0, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {/* Outer glow ring — shown on hover */}
                                    <circle
                                        cx={node.x} cy={node.y}
                                        r={baseR + 1.8}
                                        fill="none"
                                        stroke={node.color}
                                        strokeWidth={0.3}
                                        opacity={isHovered ? 0.8 : 0}
                                        style={{ transition: 'opacity 0.25s' }}
                                    />

                                    {/* Node circle */}
                                    <circle
                                        cx={node.x} cy={node.y}
                                        r={baseR}
                                        fill={isHovered ? `${node.color}22` : `${node.color}12`}
                                        stroke={node.color}
                                        strokeWidth={isHovered || connected ? 0.45 : 0.2}
                                        style={{
                                            filter: isHovered ? `drop-shadow(0 0 3px ${node.color})` : 'none',
                                            transition: 'fill 0.2s, stroke-width 0.2s, filter 0.2s',
                                        }}
                                    />

                                    {/* Label */}
                                    <text
                                        x={node.x} y={node.y}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fill={isHovered ? node.color : '#9CA3AF'}
                                        fontSize={node.r > 20 ? 2.2 : node.r > 15 ? 1.9 : 1.6}
                                        fontWeight={isHovered ? '700' : '500'}
                                        fontFamily="system-ui, sans-serif"
                                        style={{ pointerEvents: 'none', transition: 'fill 0.2s' }}
                                    >
                                        {node.label}
                                    </text>
                                </motion.g>
                            )
                        })}
                    </svg>

                    {/* Hovered node tooltip */}
                    {hoveredNode && (() => {
                        const n = nodeMap[hoveredNode]
                        return (
                            <motion.div
                                key={hoveredNode}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-3 left-3 glass rounded-xl px-4 py-2.5 pointer-events-none"
                                style={{ borderColor: `${n.color}40` }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: n.color, boxShadow: `0 0 8px ${n.color}` }} />
                                    <span className="font-display font-bold text-sm text-brand-text">{n.label}</span>
                                    <span className="text-xs text-brand-muted px-1.5 py-0.5 rounded" style={{ background: `${n.color}15`, color: n.color }}>
                                        {CLUSTER_LABEL[n.cluster]}
                                    </span>
                                </div>
                            </motion.div>
                        )
                    })()}
                </motion.div>

                {/* Legend */}
                <motion.div
                    {...scrollRevealScale(0.4)}
                    className="flex flex-wrap justify-center gap-5 mt-6"
                >
                    {Object.entries(CLUSTER_LABEL).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ background: CLUSTER_COLOR[key], boxShadow: `0 0 8px ${CLUSTER_COLOR[key]}80` }} />
                            <span className="text-brand-muted text-sm">{label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Applied Proficiency */}
                <motion.div {...scrollRevealScale(0.5)} className="mt-12 glass-card rounded-2xl p-8">
                    <h3 className="font-display font-bold text-xl text-brand-text mb-1">Applied Proficiency</h3>
                    <p className="text-brand-muted text-sm mb-6">Based on production usage across client and personal projects.</p>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { name: 'React & Frontend Architecture', pct: 88, color: '#4F9DFF' },
                            { name: 'Java & Backend Systems', pct: 78, color: '#7C5CFF' },
                            { name: 'Data Structures & Algorithms', pct: 82, color: '#22D3EE' },
                            { name: 'UI/UX & Product Design', pct: 75, color: '#4F9DFF' },
                        ].map((skill, i) => (
                            <div key={skill.name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-brand-text font-medium">{skill.name}</span>
                                    <motion.span style={{ color: skill.color }} className="font-bold"
                                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                                        transition={{ delay: 0.8 + i * 0.1 }}
                                    >{skill.pct}%</motion.span>
                                </div>
                                <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.pct}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + i * 0.12, duration: 1.1, ease: EASE.out }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
