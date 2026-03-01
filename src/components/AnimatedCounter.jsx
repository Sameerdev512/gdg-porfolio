import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * AnimatedCounter — counts from 0 to a target value when scrolled into view.
 * Renders special characters like '+', '∞', '%' as-is.
 */
export default function AnimatedCounter({ value, duration = 1.8, className = '' }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const [count, setCount] = useState('0')

    useEffect(() => {
        if (!inView) return

        // Handle special non-numeric values
        const numeric = parseInt(value.replace(/\D/g, ''), 10)
        const suffix = value.replace(/[0-9]/g, '')

        if (isNaN(numeric) || value === '∞') {
            setCount(value)
            return
        }

        const start = Date.now()
        const end = start + duration * 1000

        const step = () => {
            const now = Date.now()
            const progress = Math.min((now - start) / (duration * 1000), 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(eased * numeric)
            setCount(`${current}${suffix}`)

            if (progress < 1) {
                requestAnimationFrame(step)
            }
        }

        requestAnimationFrame(step)
    }, [inView, value, duration])

    return (
        <span ref={ref} className={className}>
            {count}
        </span>
    )
}
