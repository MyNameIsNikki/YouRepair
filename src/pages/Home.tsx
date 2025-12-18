import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { StatsSection } from '../components/StatsSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { Users, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Home() {
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

  const scrollToDemo = () => {
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const advantagesGeneral = [
    'Полная прозрачность всех этапов работы',
    'Контроль бюджета и сроков в реальном времени',
    'Удобная коммуникация между всеми участниками',
    'Автоматизация документооборота',
    'Мобильное приложение для работы в любом месте',
    'Защита интересов обеих сторон',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection isVisible={isVisible['hero']} />
        <AboutSection isVisible={isVisible['about']} />

        {/* Общие преимущества */}
        <section
          id="advantages-general"
          data-section="advantages-general"
          className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div
              className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${
                isVisible['advantages-general'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '42px', fontWeight: '700' }}>
                Почему выбирают ВашРемонт?
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Современная платформа, которая делает процесс ремонта простым и понятным для всех
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {advantagesGeneral.map((advantage, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-xl border-2 border-[#DDE5B6] hover:border-[#ADC178] transition-all duration-300 hover:shadow-lg ${
                    isVisible['advantages-general'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#ADC178] flex-shrink-0 mt-1" />
                    <p className="text-[#6C584C]">{advantage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Секции для двух аудиторий */}
        <section className="py-20 bg-[#F0EAD2]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-[#6C584C] mb-12 text-center" style={{ fontSize: '42px', fontWeight: '700' }}>
                Решения для каждого
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Для Заказчиков */}
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#ADC178]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-14 h-14 bg-[#ADC178] rounded-xl">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-[#6C584C]" style={{ fontSize: '28px', fontWeight: '700' }}>
                      Для Заказчиков
                    </h3>
                  </div>

                  <p className="text-[#6C584C]/70 mb-6">
                    Полный контроль над вашим ремонтом: от планирования до сдачи объекта
                  </p>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Контроль бюджета и предотвращение перерасхода</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Отслеживание этапов работ в реальном времени</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Прямая коммуникация с бригадой</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Фото и видео отчеты о ходе работ</span>
                    </li>
                  </ul>

                  <div className="space-y-3">
                    <Link to="/clients/advantages">
                      <Button className="w-full bg-[#ADC178] hover:bg-[#9BB167] text-white">
                        Преимущества и Тарифы
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/clients/gallery">
                      <Button variant="outline" className="w-full border-[#ADC178] text-[#ADC178] hover:bg-[#ADC178] hover:text-white">
                        Галерея и Отзывы
                      </Button>
                    </Link>
                    <Link to="/clients/functionality">
                      <Button variant="outline" className="w-full border-[#ADC178] text-[#ADC178] hover:bg-[#ADC178] hover:text-white">
                        Функционал
                      </Button>
                    </Link>
                    <Link to="/clients/training">
                      <Button variant="outline" className="w-full border-[#ADC178] text-[#ADC178] hover:bg-[#ADC178] hover:text-white">
                        Обучение
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Для Бригад */}
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#A98467]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-14 h-14 bg-[#A98467] rounded-xl">
                      <Wrench className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-[#6C584C]" style={{ fontSize: '28px', fontWeight: '700' }}>
                      Для Бригад
                    </h3>
                  </div>

                  <p className="text-[#6C584C]/70 mb-6">
                    Профессиональные инструменты для эффективной работы и довольных клиентов
                  </p>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#A98467] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Постоянный поток заказов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#A98467] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Автоматический расчет смет и материалов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#A98467] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Защита от необоснованных претензий</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#A98467] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Удобное управление графиком работ</span>
                    </li>
                  </ul>

                  <div className="space-y-3">
                    <Link to="/brigades/advantages">
                      <Button className="w-full bg-[#A98467] hover:bg-[#8F7159] text-white">
                        Преимущества и Тарифы
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/brigades/reviews">
                      <Button variant="outline" className="w-full border-[#A98467] text-[#A98467] hover:bg-[#A98467] hover:text-white">
                        Отзывы бригад
                      </Button>
                    </Link>
                    <Link to="/brigades/functionality">
                      <Button variant="outline" className="w-full border-[#A98467] text-[#A98467] hover:bg-[#A98467] hover:text-white">
                        Функционал
                      </Button>
                    </Link>
                    <Link to="/brigades/training">
                      <Button variant="outline" className="w-full border-[#A98467] text-[#A98467] hover:bg-[#A98467] hover:text-white">
                        Обучение
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <StatsSection isVisible={isVisible['stats']} />
        <CTASection isVisible={isVisible['cta']} />
      </main>
      <Footer />
    </div>
  );
}
