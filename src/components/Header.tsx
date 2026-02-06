import { useState, useEffect } from 'react';
import { Home, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'О продукте', href: 'about' },
    { label: 'Преимущества', href: 'advantages' },
    { label: 'Кейсы', href: 'cases' },
    { label: 'Демо', href: 'cta' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center justify-center w-10 h-10 bg-[#ADC178] rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#6C584C]" style={{ fontSize: '20px', fontWeight: '700' }}>ВашРемонт</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-[#6C584C] hover:text-[#ADC178] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('cta')}
              className="bg-[#ADC178] hover:bg-[#9BB167] text-white px-6"
            >
              Получить демо
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#6C584C]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#DDE5B6]">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-[#6C584C] hover:text-[#ADC178] transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('cta')}
                className="bg-[#ADC178] hover:bg-[#9BB167] text-white w-full"
              >
                Получить демо
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
