import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { StatsSection } from './components/StatsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export default function App() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.getAttribute('data-section');
        if (rect.top < window.innerHeight * 0.8 && sectionId) {
          setIsVisible((prev) => ({ ...prev, [sectionId]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection isVisible={isVisible['hero']} />
        <AboutSection isVisible={isVisible['about']} />
        <AdvantagesSection isVisible={isVisible['advantages']} />
        <CaseStudiesSection isVisible={isVisible['cases']} />
        <StatsSection isVisible={isVisible['stats']} />
        <CTASection isVisible={isVisible['cta']} />
      </main>
      <Footer />
    </div>
  );
}
