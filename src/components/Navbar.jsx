import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Agency', href: '#agency' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [active, setActive] = useState('')

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNavClick = (href) => {
        setActive(href)
        setMobileOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'glass shadow-glass py-3'
                        : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#hero"
                        onClick={() => handleNavClick('#hero')}
                        className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-glow-primary">
                            <span className="text-white font-bold text-xs sm:text-sm font-display">SK</span>
                        </div>
                        <span className="font-display font-bold text-brand-text text-base sm:text-lg tracking-tight">
                            Sameer<span className="gradient-text-static">.</span>
                        </span>
                    </motion.a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                onClick={() => handleNavClick(link.href)}
                                className={`text-sm font-medium transition-colors relative group ${active === link.href
                                        ? 'text-brand-primary'
                                        : 'text-brand-muted hover:text-brand-text'
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 h-px bg-brand-primary transition-all duration-300 ${active === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                            </motion.button>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <motion.a
                            href="mailto:sameerkhatridev512@gmail.com"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="btn-primary text-sm px-5 py-2.5"
                        >
                            <span>Hire Me</span>
                        </motion.a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2 group"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-brand-text transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-4 h-0.5 bg-brand-text transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-brand-text transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-16 left-4 right-4 z-40 glass rounded-2xl p-6 md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-left text-brand-muted hover:text-brand-primary transition-colors font-medium py-1"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <a
                                href="mailto:sameerkhatridev512@gmail.com"
                                className="btn-primary text-sm mt-2"
                            >
                                <span>Hire Me</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
