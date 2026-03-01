import { motion } from 'framer-motion'

const footerLinks = {
    Navigation: [
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Agency', href: '#agency' },
        { label: 'Contact', href: '#contact' },
    ],
    Connect: [
        { label: 'GitHub', href: 'https://github.com/sameerdev512', icon: <span className="text-xl">🐙</span> },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/sameerdev512', icon: <span className="text-xl">💼</span> },
        { label: 'LeetCode', href: 'https://leetcode.com/u/HwDo9H6tXe/', icon: <span className="text-xl">🧩</span> },
        { label: 'Email', href: 'mailto:sameerkhatridev@gmail.com', icon: <span className="text-xl">✉️</span> },
    ],
}

export default function Footer() {
    const scrollTo = (href) => {
        if (href.startsWith('#')) {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <footer className="border-t border-brand-border pt-16 pb-8 relative">
            <div className="absolute inset-0 bg-gradient-dark opacity-50" />
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-glow-primary">
                                <span className="text-white font-bold text-sm font-display">SK</span>
                            </div>
                            <span className="font-display font-bold text-brand-text text-lg flex items-center gap-1">
                                <span className="inline-block align-middle">Sameer</span>
                                <span className="gradient-text-static">.</span>
                                <span className="inline-block align-middle text-xl" title="Web Engineer">⚡</span>
                            </span>
                        </div>
                        <p className="text-brand-muted text-sm leading-relaxed max-w-xs">
                            Software Engineer, React Developer & Agency Founder building scalable web experiences and intelligent digital products from Indore, India.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-brand-muted">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span>Available for opportunities</span>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h4 className="text-brand-text font-semibold text-sm uppercase tracking-wider mb-4">{group}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        {link.href.startsWith('#') ? (
                                            <motion.button
                                                onClick={() => scrollTo(link.href)}
                                                className="text-brand-muted text-sm flex items-center gap-2"
                                                whileHover={{ x: 12, color: '#4F9DFF' }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                            >
                                                {group === 'Connect' && link.icon}
                                                {link.label}
                                            </motion.button>
                                        ) : (
                                            <motion.a
                                                href={link.href}
                                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                                rel="noopener noreferrer"
                                                className="text-brand-muted text-sm flex items-center gap-2"
                                                whileHover={{ x: 12, color: '#4F9DFF' }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                            >
                                                {group === 'Connect' && link.icon}
                                                {link.label}
                                            </motion.a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-brand-muted text-sm">
                        © {new Date().getFullYear()} Sameer Khatri. Crafted with ⚡ & React.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-brand-muted">
                        <span>Built with Vite + React + Tailwind</span>
                        <span className="w-px h-4 bg-brand-border" />
                        <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                            className="hover:text-brand-primary transition-colors flex items-center gap-1">
                            Back to top ↑
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
