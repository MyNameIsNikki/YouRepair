import { MapPin, Calendar, TrendingDown } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Avatar } from './ui/avatar';

interface CaseStudiesSectionProps {
  isVisible?: boolean;
}

export function CaseStudiesSection({ isVisible }: CaseStudiesSectionProps) {
  const cases = [
    {
      id: 1,
      title: 'Современная квартира в центре',
      beforeImage: 'https://images.unsplash.com/photo-1655727255440-9c0ea75ea30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBkYW1hZ2VkJTIwYXBhcnRtZW50JTIwYmVmb3JlJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3NjM1NDc3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      afterImage: 'https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjM1MzkxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Москва, Арбат',
      duration: '45 дней',
      budgetSaved: '78 000 ₽',
      testimonial: 'Впервые ремонт прошел без стресса и конфликтов. Всё под контролем, бюджет не превышен.',
      clientName: 'Анна Петрова',
      clientInitials: 'АП',
    },
    {
      id: 2,
      title: 'Кухня мечты',
      beforeImage: 'https://images.unsplash.com/photo-1578177154072-bbbd429d496f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcmVub3ZhdGlvbiUyMGJlZm9yZXxlbnwxfHx8fDE3NjM0Njk2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      afterImage: 'https://images.unsplash.com/photo-1722649957265-372809976610?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcmVub3ZhdGlvbiUyMGFmdGVyfGVufDF8fHx8MTc2MzU0NjQxMnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Санкт-Петербург',
      duration: '30 дней',
      budgetSaved: '52 000 ₽',
      testimonial: 'Платформа помогла четко организовать работу бригады. Рекомендую всем, кто планирует ремонт!',
      clientName: 'Михаил Соколов',
      clientInitials: 'МС',
    },
  ];

  return (
    <section
      id="cases"
      data-section="cases"
      className="py-20 lg:py-32 bg-[#DDE5B6]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '42px', fontWeight: '700' }}>
            Реальные кейсы
          </h2>
          <p className="text-[#6C584C]/70 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Истории успешных проектов наших клиентов
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {cases.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-1000 hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 2) * 200}ms` }}
            >
              {/* Before/After Slider */}
              <BeforeAfterSlider
                beforeImage={caseItem.beforeImage}
                afterImage={caseItem.afterImage}
                alt={caseItem.title}
              />

              {/* Content */}
              <div className="p-6">
                <h3 className="text-[#6C584C] mb-4" style={{ fontSize: '24px', fontWeight: '600' }}>
                  {caseItem.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-[#6C584C]/70 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{caseItem.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#6C584C]/70 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{caseItem.duration}</span>
                  </div>
                </div>

                {/* Budget Saved */}
                <div className="flex items-center gap-2 mb-6 p-4 bg-[#ADC178]/10 rounded-xl">
                  <TrendingDown className="w-5 h-5 text-[#ADC178]" />
                  <div>
                    <div className="text-[#6C584C]/60 text-sm">Экономия бюджета</div>
                    <div className="text-[#ADC178]" style={{ fontSize: '20px', fontWeight: '600' }}>
                      {caseItem.budgetSaved}
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="border-t border-[#DDE5B6] pt-6">
                  <p className="text-[#6C584C]/80 mb-4 italic">
                    "{caseItem.testimonial}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 bg-[#A98467] text-white flex items-center justify-center">
                      <span>{caseItem.clientInitials}</span>
                    </Avatar>
                    <div>
                      <div className="text-[#6C584C]" style={{ fontWeight: '600' }}>
                        {caseItem.clientName}
                      </div>
                      <div className="text-[#6C584C]/60 text-sm">Заказчик</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}