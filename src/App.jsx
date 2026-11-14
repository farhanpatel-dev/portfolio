import { LazyMotion, MotionConfig } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { BackToTop } from './components/BackToTop';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

// Animation features load in their own chunk after the first render.
const loadFeatures = () => import('./motionFeatures.js').then((mod) => mod.default);

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    // reducedMotion="user": framer-motion skips movement for visitors who
    // set "reduce motion" in their OS, keeping only gentle fades.
    <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-3 focus:text-cream"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
    </LazyMotion>
  );
}
