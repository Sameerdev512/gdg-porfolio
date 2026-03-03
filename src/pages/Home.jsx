import { Helmet } from 'react-helmet-async'
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
            <Helmet>
                <title>Sameer Khatri — Software Engineer &amp; React Developer | Indore, India</title>
                <meta name="description" content="Sameer Khatri is a Software Engineer, React Developer, and Agency Founder from Indore, India. Building scalable web experiences and intelligent digital products." />
                <meta name="keywords" content="Sameer Khatri, React Developer, Software Engineer, Frontend Developer, Web Developer Indore, Digital Agency, Full Stack Developer" />
                <meta name="author" content="Sameer Khatri" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://sameerkhatri.dev/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sameer Khatri — Software Engineer &amp; React Developer" />
                <meta property="og:description" content="React Developer, Agency Founder, and AI Enthusiast from Indore, India." />
                <meta property="og:url" content="https://sameerkhatri.dev/" />
                <meta property="og:site_name" content="Sameer Khatri Portfolio" />
                <meta property="og:image" content="https://sameerkhatri.dev/og-image.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@sameerkhatri" />
                <meta name="twitter:creator" content="@sameerkhatri" />
                <meta name="twitter:image" content="https://sameerkhatri.dev/og-image.png" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Sameer Khatri",
                    "jobTitle": "Software Engineer & React Developer",
                    "address": { "@type": "PostalAddress", "addressLocality": "Indore", "addressRegion": "Madhya Pradesh", "addressCountry": "IN" },
                    "url": "https://sameerkhatri.dev",
                    "description": "Software Engineer, React Developer, and Agency Founder building scalable web experiences from Indore, India.",
                })}</script>
            </Helmet>

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
