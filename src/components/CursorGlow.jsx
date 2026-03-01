import { motion, useSpring, useTransform } from 'framer-motion'
import useCursor from '../hooks/useCursor'
import { useState, useEffect } from 'react'

/**
 * CursorGlow — a premium cursor follower effect.
 * Renders a soft radial glow that follows the mouse with spring physics.
 * Shows a ring spotlight when hovering interactive elements.
 */
export default function CursorGlow() {
    const { x, y } = useCursor()
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Spring-smoothed positions for the glow (slower, lagging feel)
    const springConfig = { stiffness: 100, damping: 20, mass: 0.5 }
    const glowX = useSpring(x, springConfig)
    const glowY = useSpring(y, springConfig)

    // Tighter spring for the ring (snappier)
    const ringSpring = { stiffness: 300, damping: 30 }
    const ringX = useSpring(x, ringSpring)
    const ringY = useSpring(y, ringSpring)

    const glowLeft = useTransform(glowX, (v) => v - 200)
    const glowTop = useTransform(glowY, (v) => v - 200)
    const ringLeft = useTransform(ringX, (v) => v - 20)
    const ringTop = useTransform(ringY, (v) => v - 20)

    useEffect(() => {
        const show = () => setIsVisible(true)
        const handleHover = (e) => {
            const el = e.target
            const isInteractive = el.closest('a, button, [data-hover], input, textarea')
            setIsHovering(!!isInteractive)
        }

        window.addEventListener('mousemove', show, { once: true })
        window.addEventListener('mouseover', handleHover, { passive: true })
        return () => {
            window.removeEventListener('mouseover', handleHover)
        }
    }, [])

    if (!isVisible) return null

    return (
        <>
            {/* Large ambient glow */}
            <motion.div
                className="fixed pointer-events-none z-[9998] rounded-full"
                style={{
                    left: glowLeft,
                    top: glowTop,
                    width: 400,
                    height: 400,
                    background: 'radial-gradient(circle, rgba(79,157,255,0.06) 0%, rgba(79,157,255,0.02) 40%, transparent 70%)',
                    filter: 'blur(8px)',
                }}
            />

            {/* Cursor ring */}
            <motion.div
                className="fixed pointer-events-none z-[9999] rounded-full border"
                style={{
                    left: ringLeft,
                    top: ringTop,
                    width: isHovering ? 44 : 40,
                    height: isHovering ? 44 : 40,
                    borderColor: isHovering ? 'rgba(79,157,255,0.8)' : 'rgba(79,157,255,0.35)',
                    backgroundColor: isHovering ? 'rgba(79,157,255,0.08)' : 'transparent',
                    transition: 'width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s',
                    mixBlendMode: 'screen',
                }}
            />
        </>
    )
}
