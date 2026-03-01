// ============================================================
// CENTRALIZED ANIMATION VARIANTS — SAMEER KHATRI PORTFOLIO
// Premium motion system inspired by Apple, Vercel, Linear.app
// ============================================================

// ─── TIMING CONSTANTS ───────────────────────────────────────
export const DURATION = {
    fast: 0.35,
    base: 0.5,
    slow: 0.7,
    xslow: 1.0,
}

export const EASE = {
    out: [0.0, 0.0, 0.2, 1],           // Material-style decelerate
    inOut: [0.4, 0.0, 0.2, 1],         // Symmetric ease
    spring: { type: 'spring', stiffness: 300, damping: 30 },
    softSpring: { type: 'spring', stiffness: 180, damping: 24 },
    gentle: { type: 'spring', stiffness: 120, damping: 20 },
}

// ─── FADE VARIANTS ──────────────────────────────────────────
export const fadeIn = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: DURATION.base, ease: EASE.out },
    },
}

export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.base, ease: EASE.out },
    },
}

export const fadeDown = {
    hidden: { opacity: 0, y: -20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.base, ease: EASE.out },
    },
}

export const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: DURATION.slow, ease: EASE.out },
    },
}

export const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: DURATION.slow, ease: EASE.out },
    },
}

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: DURATION.base, ease: EASE.out },
    },
}

// ─── STAGGER CONTAINERS ─────────────────────────────────────
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
})

export const staggerFast = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.06, delayChildren: 0 },
    },
}

export const staggerSlow = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
}

// ─── PAGE TRANSITION ────────────────────────────────────────
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.slow, ease: EASE.out },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: DURATION.fast, ease: EASE.inOut },
    },
}

// ─── HERO ANIMATION SEQUENCE ────────────────────────────────
export const heroContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        },
    },
}

export const heroItem = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE.out },
    },
}

// ─── CARD HOVER ─────────────────────────────────────────────
export const cardHover = {
    rest: {
        y: 0,
        scale: 1,
        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        transition: { duration: 0.3, ease: EASE.out },
    },
    hover: {
        y: -8,
        scale: 1.01,
        boxShadow: '0 16px 48px rgba(79,157,255,0.15)',
        transition: { duration: 0.3, ease: EASE.out },
    },
}

export const cardHoverSubtle = {
    rest: {
        y: 0,
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        transition: { duration: 0.25, ease: EASE.out },
    },
    hover: {
        y: -4,
        boxShadow: '0 12px 40px rgba(79,157,255,0.12)',
        transition: { duration: 0.25, ease: EASE.out },
    },
}

// ─── IMAGE ZOOM ─────────────────────────────────────────────
export const imageZoom = {
    rest: { scale: 1, transition: { duration: 0.5, ease: EASE.out } },
    hover: { scale: 1.06, transition: { duration: 0.5, ease: EASE.out } },
}

// ─── OVERLAY REVEAL ─────────────────────────────────────────
export const overlayReveal = {
    rest: { opacity: 0, transition: { duration: 0.3 } },
    hover: { opacity: 1, transition: { duration: 0.3 } },
}

// ─── BUTTON HOVER ───────────────────────────────────────────
export const buttonHover = {
    rest: { scale: 1 },
    hover: {
        scale: 1.04,
        transition: EASE.spring,
    },
    tap: { scale: 0.97 },
}

// ─── ICON HOVER ─────────────────────────────────────────────
export const iconHover = {
    rest: { rotate: 0, scale: 1 },
    hover: {
        rotate: 8,
        scale: 1.15,
        transition: { duration: 0.25, ease: EASE.out },
    },
}

// ─── UNDERLINE SLIDE ────────────────────────────────────────
export const underlineSlide = {
    rest: { scaleX: 0, originX: 0 },
    hover: {
        scaleX: 1,
        transition: { duration: 0.25, ease: EASE.out },
    },
}

// ─── WORD-BY-WORD REVEAL ────────────────────────────────────
export const wordReveal = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE.out },
    },
}

export const wordContainer = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08 },
    },
}

// ─── TIMELINE LINE GROW ─────────────────────────────────────
export const timelineLineGrow = {
    hidden: { scaleY: 0, originY: 0 },
    show: {
        scaleY: 1,
        transition: { duration: 1.2, ease: EASE.out },
    },
}

// ─── TIMELINE DOT ───────────────────────────────────────────
export const timelineDot = {
    hidden: { scale: 0, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: { type: 'spring', stiffness: 400, damping: 20 },
    },
}

// ─── BADGE TILT ─────────────────────────────────────────────
export const badgeTilt = {
    rest: {
        rotateX: 0,
        rotateY: 0,
        transition: { duration: 0.3, ease: EASE.out },
    },
    hover: {
        rotateX: -5,
        rotateY: 8,
        scale: 1.03,
        transition: { duration: 0.3, ease: EASE.out },
    },
}

// ─── INPUT FOCUS ────────────────────────────────────────────
export const inputFocus = {
    rest: { boxShadow: 'none' },
    focus: {
        boxShadow: '0 0 0 2px rgba(79,157,255,0.3), 0 0 20px rgba(79,157,255,0.1)',
        transition: { duration: 0.2 },
    },
}

// ─── AMBIENT FLOAT ──────────────────────────────────────────
export const ambientFloat = (delay = 0) => ({
    animate: {
        y: [0, -18, 0],
        x: [0, 6, 0],
        opacity: [0.4, 0.7, 0.4],
        transition: {
            duration: 7 + delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
        },
    },
})

// ─── GRADIENT SHIFT ─────────────────────────────────────────
export const gradientShift = {
    animate: {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: { duration: 10, repeat: Infinity, ease: 'linear' },
    },
}

// ─── scroll reveal helper (used with whileInView) ─────────────
export const scrollReveal = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, ease: EASE.out, delay },
})

export const scrollRevealLeft = (delay = 0) => ({
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, ease: EASE.out, delay },
})

export const scrollRevealRight = (delay = 0) => ({
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, ease: EASE.out, delay },
})

export const scrollRevealScale = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.92, y: 20 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, ease: EASE.out, delay },
})
