import { DollarSign, Clock, Handshake } from 'lucide-react';

interface AdvantagesSectionProps {
  isVisible?: boolean;
}

export function AdvantagesSection({ isVisible }: AdvantagesSectionProps) {
  const advantages = [
    {
      icon: DollarSign,
      title: 'Экономия денег',
      description: 'Прозрачный контроль расходов и защита от необоснованных трат. В среднем клиенты экономят до 15% бюджета.',
      color: '#ADC178',
    },
    {
      icon: Clock,
      title: 'Экономия времени',
      description: 'Автоматизация рутинных процессов и коммуникации. Меньше времени на согласования и больше на важные решения.',
      color: '#A98467',
    },
    {
      icon: Handshake,
      title: 'Защита от конфликтов',
      description: 'Все договоренности фиксируются в системе. Четкие правила взаимодействия для заказчиков и бригад.',
      color: '#6C584C',
    },
  ];

  return (
    <section
      id="advantages"
      data-section="advantages"
      className="py-20 lg:py-32 bg-white"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '42px', fontWeight: '700' }}>
            Почему выбирают ВашРемонт?
          </h2>
          <p className="text-[#6C584C]/70 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Платформа создана для решения реальных проблем строительных проектов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className={`relative group transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
              >
                <div className="h-full p-8 bg-[#F0EAD2] rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: advantage.color }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-[#6C584C] mb-4" style={{ fontSize: '24px', fontWeight: '600' }}>
                    {advantage.title}
                  </h3>
                  <p className="text-[#6C584C]/70" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    {advantage.description}
                  </p>

                  {/* Decorative element */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-5"
                    style={{ backgroundColor: advantage.color }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
