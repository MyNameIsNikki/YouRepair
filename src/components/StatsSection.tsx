import { Users, Clock, TrendingDown } from 'lucide-react';

interface StatsSectionProps {
  isVisible?: boolean;
}

export function StatsSection({ isVisible }: StatsSectionProps) {
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'Довольных клиентов',
      description: 'Используют платформу для управления ремонтами',
    },
    {
      icon: Clock,
      value: '10 000+',
      label: 'Часов сэкономлено',
      description: 'На согласованиях и коммуникации с бригадами',
    },
    {
      icon: TrendingDown,
      value: '60 000₽',
      label: 'Средняя экономия',
      description: 'Благодаря прозрачному контролю бюджета',
    },
  ];

  return (
    <section
      id="stats"
      data-section="stats"
      className="py-20 lg:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #6C584C 0%, #A98467 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-white mb-4" style={{ fontSize: '42px', fontWeight: '700' }}>
            ВашРемонт в цифрах
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Результаты, которых достигли наши клиенты
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-white mb-2" style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1' }}>
                  {stat.value}
                </div>
                <div className="text-white mb-2" style={{ fontSize: '24px', fontWeight: '600' }}>
                  {stat.label}
                </div>
                <p className="text-white/70 max-w-xs mx-auto">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
