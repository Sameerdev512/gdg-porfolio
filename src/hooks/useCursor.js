import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

/**
 * useCursor — tracks mouse position as Framer Motion MotionValues.
 * Returns { x, y } (raw px) and { normX, normY } (-1 to +1 from center).
 */
export default function useCursor() {
    const x = useMotionValue(-1000)
    const y = useMotionValue(-1000)
    const normX = useMotionValue(0)
    const normY = useMotionValue(0)

    useEffect(() => {
        const handleMove = (e) => {
            x.set(e.clientX)
            y.set(e.clientY)
            normX.set((e.clientX / window.innerWidth - 0.5) * 2)
            normY.set((e.clientY / window.innerHeight - 0.5) * 2)
        }

        window.addEventListener('mousemove', handleMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMove)
    }, [x, y, normX, normY])

    return { x, y, normX, normY }
}
