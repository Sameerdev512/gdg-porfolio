import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.0, 0.0, 0.2, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
    },
}

/**
 * PageTransition — wraps page content with smooth fade+lift enter/exit.
 * Wrap the <Routes> element with this in App.jsx.
 */
export default function PageTransition({ children }) {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
