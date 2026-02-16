import { Button } from './ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  isVisible?: boolean;
}

export function HeroSection({ isVisible }: HeroSectionProps) {
  const scrollToDemo = () => {
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #6C584C 0%, #A98467 50%, #ADC178 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-white mb-6" style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.1' }}>
              Управляйте ремонтом без стресса
            </h1>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Единая платформа для заказчиков и строительных бригад. Контролируйте бюджет, сроки и качество работ в режиме реального времени
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={scrollToDemo}
                size="lg"
                className="bg-white text-[#6C584C] hover:bg-[#F0EAD2] text-lg px-8 py-6 h-auto"
              >
                Попробовать бесплатно
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => {
                  const element = document.getElementById('about');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
              >
                Узнать больше
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Бесплатный пробный период</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Без привязки карты</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Поддержка 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="#F0EAD2"
          />
        </svg>
      </div>
    </section>
  );
}
