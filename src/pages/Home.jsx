import IDEShell from '../components/IDEShell'
import Hero from '../components/Hero'
import CredibilityStrip from '../components/CredibilityStrip'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Agency from '../components/Agency'
import Experience from '../components/Experience'
import ProofOfWork from '../components/ProofOfWork'
import Founder from '../components/Founder'
import CTA from '../components/CTA'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
    return (
        <>
            {/*
              IDEShell wraps all content.
              Each section component already has its own id="..." on the root <section> element.
              DO NOT add extra wrapper divs with the same id — that creates duplicate IDs
              which break scrollIntoView targeting.
            */}
            <IDEShell>
                <Hero />
                <CredibilityStrip />
                <About />
                <Skills />
                <Projects />
                <Agency />
                <Founder />
                <Experience />
                <ProofOfWork />
                <CTA />
                <Contact />
                <Footer />
            </IDEShell>
        </>
    )
}
