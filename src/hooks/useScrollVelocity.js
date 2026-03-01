import { useEffect } from 'react'
import { useScroll, useVelocity, useTransform, useMotionValue, useSpring } from 'framer-motion'

/**
 * useScrollVelocity — returns scroll velocity as a smoothed MotionValue.
 * Positive = scrolling down, negative = scrolling up.
 * velocityFactor: 0–1 magnitude of current scroll speed (clamped).
 */
export default function useScrollVelocity() {
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, { stiffness: 80, damping: 20 })

    // Normalized speed: 0 (still) → 1 (very fast)
    const velocityFactor = useTransform(smoothVelocity, [-3000, 0, 3000], [1, 0, 1])

    return { scrollY, scrollVelocity: smoothVelocity, velocityFactor }
}
