import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { scrollRevealScale, scrollRevealLeft, scrollRevealRight, staggerContainer, EASE } from '../animations/animationVariants'

const LINKS = [
    { label: 'Email', value: 'sameerkhatridev512@gmail.com', href: 'mailto:sameerkhatridev512@gmail.com', icon: '✉️' },
    { label: 'Phone', value: '+91 9111045198', href: 'tel:+919111045198', icon: '📱' },
    { label: 'LinkedIn', value: 'linkedin.com/in/sameerdev512', href: 'https://linkedin.com/in/sameerdev512', icon: '💼' },
    { label: 'GitHub', value: 'github.com/sameerdev512', href: 'https://github.com/sameerdev512', icon: '🐙' },
    { label: 'LeetCode', value: 'leetcode.com/u/HwDo9H6tXe/', href: 'https://leetcode.com/u/HwDo9H6tXe/', icon: '🧩' },
]

// Terminal-style input — looks like a command line
function TerminalInput({ label, prompt = '>', type = 'text', value, onChange, placeholder, required }) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">{label}</label>
            <motion.div
                className="flex items-center gap-2 rounded-lg px-3 py-2.5"
                style={{
                    background: 'rgba(79,157,255,0.03)',
                    border: '1px solid',
                    borderColor: focused ? 'rgba(79,157,255,0.5)' : 'rgba(255,255,255,0.07)',
                }}
                animate={{
                    boxShadow: focused ? '0 0 0 2px rgba(79,157,255,0.15), 0 0 24px rgba(79,157,255,0.08)' : 'none',
                }}
                transition={{ duration: 0.2 }}
            >
                {/* Terminal prompt */}
                <span className="text-brand-primary text-sm font-mono font-bold flex-shrink-0 select-none">{prompt}</span>
                <input
                    type={type}
                    required={required}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 bg-transparent text-brand-text text-sm font-mono placeholder-brand-muted/40 focus:outline-none"
                />
                {/* Blinking cursor when focused */}
                {focused && (
                    <motion.span
                        className="w-0.5 h-4 bg-brand-primary flex-shrink-0"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                    />
                )}
            </motion.div>
        </div>
    )
}

function TerminalTextarea({ label, prompt = '>', value, onChange, placeholder, required }) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">{label}</label>
            <motion.div
                className="rounded-lg px-3 py-2.5"
                style={{
                    background: 'rgba(79,157,255,0.03)',
                    border: '1px solid',
                    borderColor: focused ? 'rgba(79,157,255,0.5)' : 'rgba(255,255,255,0.07)',
                }}
                animate={{
                    boxShadow: focused ? '0 0 0 2px rgba(79,157,255,0.15), 0 0 24px rgba(79,157,255,0.08)' : 'none',
                }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex gap-2 items-start">
                    <span className="text-brand-primary text-sm font-mono font-bold flex-shrink-0 mt-0.5 select-none">{prompt}</span>
                    <textarea
                        required={required}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={4}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className="flex-1 bg-transparent text-brand-text text-sm font-mono placeholder-brand-muted/40 focus:outline-none resize-none"
                    />
                </div>
            </motion.div>
        </div>
    )
}

export default function Contact() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [sent, setSent] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        setTimeout(() => {
            window.location.href = `mailto:sameerkhatri5050@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
            setSent(true)
            setSubmitting(false)
            setTimeout(() => setSent(false), 5000)
        }, 700)
    }

    return (
        <section id="contact" className="py-28 relative overflow-hidden">
            {/* Chapter atmosphere — darkest, most immersive */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(124,92,255,0.07) 0%, transparent 60%), radial-gradient(ellipse at 30% 50%, rgba(79,157,255,0.05) 0%, transparent 60%)' }} />

            {/* Ambient particle dots */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        background: i % 2 === 0 ? '#4F9DFF' : '#7C5CFF',
                        left: `${8 + i * 8}%`,
                        top: `${20 + (i % 4) * 20}%`,
                        opacity: 0.2,
                    }}
                    animate={{ y: [0, -15, 0], opacity: [0.15, 0.35, 0.15] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                />
            ))}

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div {...scrollRevealScale(0)} className="text-center mb-16">
                    <span className="section-label mb-4 inline-flex font-mono text-xs">
                        <span className="text-brand-primary/60 mr-1">//</span>
                        contact.init()
                    </span>
                    <h2 className="font-display font-black text-5xl md:text-6xl text-brand-text mt-4">
                        Say <span className="gradient-text">Hello.</span>
                    </h2>
                    <p className="text-brand-muted mt-4 max-w-xl mx-auto text-lg">
                        Whether you have a project, an opportunity, or just want to connect — the terminal is open.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact links */}
                    <div>
                        <motion.h3 {...scrollRevealLeft(0.1)} className="font-display font-bold text-xl text-brand-text mb-6">
                            Find Me Here
                        </motion.h3>
                        <motion.div
                            className="space-y-3"
                            variants={staggerContainer(0.08)}
                            initial="hidden"
                            animate={inView ? 'show' : 'hidden'}
                        >
                            {LINKS.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    variants={{
                                        hidden: { opacity: 0, x: -24 },
                                        show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE.out } },
                                    }}
                                    className="flex items-center gap-4 p-4 glass-card rounded-xl group"
                                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                                    data-hover="true"
                                >
                                    <motion.div
                                        className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-xl flex-shrink-0"
                                        whileHover={{ scale: 1.15, rotate: 8 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {link.icon}
                                    </motion.div>
                                    <div>
                                        <p className="text-brand-muted text-xs uppercase tracking-wider font-medium">{link.label}</p>
                                        <p className="text-brand-text text-sm font-medium mt-0.5 group-hover:text-brand-primary transition-colors duration-200 font-mono">
                                            {link.value}
                                        </p>
                                    </div>
                                    <motion.svg
                                        className="w-4 h-4 text-brand-muted ml-auto"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        initial={{ opacity: 0, x: -4 }}
                                        whileHover={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </motion.svg>
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Terminal Form */}
                    <motion.div {...scrollRevealRight(0.2)}>
                        <form onSubmit={handleSubmit}
                            className="rounded-2xl overflow-hidden"
                            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(79,157,255,0.15)', backdropFilter: 'blur(16px)' }}
                        >
                            {/* Terminal title bar */}
                            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]"
                                style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                                <span className="ml-3 text-brand-muted text-xs font-mono">contact.sh</span>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Greeting line */}
                                <div className="flex items-center gap-2 text-xs font-mono text-brand-muted mb-2">
                                    <span className="text-brand-primary">$</span>
                                    <span>init_conversation --mode=professional</span>
                                    <motion.span
                                        className="w-1.5 h-3.5 bg-brand-primary inline-block ml-1"
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 1, repeat: 3 }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <TerminalInput label="Your Name" required value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                                    <TerminalInput label="Email" type="email" required value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
                                </div>
                                <TerminalInput label="Subject" required value={form.subject}
                                    onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Project inquiry..." />
                                <TerminalTextarea label="Message" required value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." />

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    className="w-full py-3 rounded-lg font-mono text-sm font-bold relative overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(79,157,255,0.15), rgba(124,92,255,0.15))',
                                        border: '1px solid rgba(79,157,255,0.3)',
                                        color: '#4F9DFF',
                                    }}
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(79,157,255,0.3)', borderColor: 'rgba(79,157,255,0.6)' }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={submitting}
                                    data-hover="true"
                                >
                                    {/* Gradient sweep */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                                        whileHover={{ translateX: '200%' }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <span className="relative z-10">
                                        {sent ? '// message transmitted ✓' : submitting ? '// sending...' : '$ send_message --async'}
                                    </span>
                                </motion.button>

                                {sent && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center text-green-400 text-xs font-mono"
                                    >
                    // email_client.open() → success. Looking forward to connecting 🙌
                                    </motion.p>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
