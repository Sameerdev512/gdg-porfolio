import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * ScrollProgress — a 2px progress bar at the top of the viewport
 * that fills left-to-right as the user scrolls the page.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[10000] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #4F9DFF, #7C5CFF, #22D3EE)',
                boxShadow: '0 0 8px rgba(79,157,255,0.8)',
            }}
        />
    )
}
