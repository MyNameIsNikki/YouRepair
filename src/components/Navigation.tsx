import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleCTAClick = () => {
    if (location.pathname === '/') {
      scrollToSection('cta');
    } else {
      navigate('/demo');
    }
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-[#ADC178] rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#6C584C]" style={{ fontSize: '20px', fontWeight: '700' }}>ВашРемонт</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Для Заказчиков */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 text-[#6C584C] hover:text-[#ADC178] transition-colors"
                onMouseEnter={() => setOpenDropdown('clients')}
              >
                Для Заказчиков
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === 'clients' && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#DDE5B6] py-2"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link to="/clients/advantages" className="block px-4 py-2 text-[#6C584C] hover:bg-[#F0EAD2] transition-colors">
                    Преимущества и Тарифы
                  </Link>
                  <Link to="/clients/gallery" className="block px-4 py-2 text-[#6C584C] hover:bg-[#F0EAD2] transition-colors">
                    Галерея и Отзывы
                  </Link>
                  <Link to="/clients/functionality" className="block px-4 py-2 text-[#6C584C] hover:bg-[#F0EAD2] transition-colors">
                    Функционал и Документация
                  </Link>
                  <Link to="/clients/training" className="block px-4 py-2 text-[#6C584C] hover:bg-[#F0EAD2] transition-colors">
                    Обучение
                  </Link>
                </div>
              )}
            </div>

            {/* Для Бригад */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 text-[#6C584C] hover:text-[#ADC178] transition-colors"
                onMouseEnter={() => setOpenDropdown('brigades')}
              >
                Для Бригад
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === 'brigades' && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#DDE5B6] py-2"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link to="/brigades/advantages" className="block px-4 py-2 text-[#6C584C] hover:bg-[#F0EAD2] transition-colors">
                    Преимущества и Тарифы
                  </Link>
                  <Link to="/brigades/reviews" className="block px-4 py-2 text-[#6C584C] hover:bg-[#F0EAD2] transition-colors">
                    Отзывы бригад
                  </Link>
                  <Link to="/brigades/functionality" className="block px-4 py-2 text-[#6C584C] hover:bg-[#F0EAD2] transition-colors">
                    Функционал и Документация
                  </Link>
                  <Link to="/brigades/training" className="block px-4 py-2 text-[#6C584C] hover:bg-[#F0EAD2] transition-colors">
                    Обучение для Бригад
                  </Link>
                </div>
              )}
            </div>

            <Link to="/about" className="text-[#6C584C] hover:text-[#ADC178] transition-colors">
              О компании
            </Link>
            <Link to="/support" className="text-[#6C584C] hover:text-[#ADC178] transition-colors">
              Поддержка
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              onClick={handleCTAClick}
              className="bg-[#ADC178] hover:bg-[#9BB167] text-white px-6"
            >
              Получить демо
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#6C584C]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#DDE5B6]">
            <nav className="flex flex-col gap-2">
              {/* Для Заказчиков Mobile */}
              <div className="border-b border-[#DDE5B6] pb-2">
                <button
                  onClick={() => toggleDropdown('clients-mobile')}
                  className="flex items-center justify-between w-full text-[#6C584C] py-2"
                >
                  <span>Для Заказчиков</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'clients-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'clients-mobile' && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link to="/clients/advantages" className="block text-[#6C584C] hover:text-[#ADC178] py-1">
                      Преимущества и Тарифы
                    </Link>
                    <Link to="/clients/gallery" className="block text-[#6C584C] hover:text-[#ADC178] py-1">
                      Галерея и Отзывы
                    </Link>
                    <Link to="/clients/functionality" className="block text-[#6C584C] hover:text-[#ADC178] py-1">
                      Функционал
                    </Link>
                    <Link to="/clients/training" className="block text-[#6C584C] hover:text-[#ADC178] py-1">
                      Обучение
                    </Link>
                  </div>
                )}
              </div>

              {/* Для Бригад Mobile */}
              <div className="border-b border-[#DDE5B6] pb-2">
                <button
                  onClick={() => toggleDropdown('brigades-mobile')}
                  className="flex items-center justify-between w-full text-[#6C584C] py-2"
                >
                  <span>Для Бригад</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'brigades-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'brigades-mobile' && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link to="/brigades/advantages" className="block text-[#6C584C] hover:text-[#ADC178] py-1">
                      Преимущества и Тарифы
                    </Link>
                    <Link to="/brigades/reviews" className="block text-[#6C584C] hover:text-[#ADC178] py-1">
                      Отзывы бригад
                    </Link>
                    <Link to="/brigades/functionality" className="block text-[#6C584C] hover:text-[#ADC178] py-1">
                      Функционал
                    </Link>
                    <Link to="/brigades/training" className="block text-[#6C584C] hover:text-[#ADC178] py-1">
                      Обучение
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/about" className="text-[#6C584C] hover:text-[#ADC178] py-2">
                О компании
              </Link>
              <Link to="/support" className="text-[#6C584C] hover:text-[#ADC178] py-2">
                Поддержка
              </Link>

              <Button
                onClick={handleCTAClick}
                className="bg-[#ADC178] hover:bg-[#9BB167] text-white w-full mt-4"
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