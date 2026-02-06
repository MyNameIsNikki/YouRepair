import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { Star, Quote, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function BrigadesReviews() {
  const testimonials = [
    {
      brigadeName: 'Мастер Строй',
      leader: 'Сергей П., прораб',
      specialization: 'Капитальный ремонт квартир',
      rating: 5,
      projectsCount: 47,
      text: 'Работаем с ВашРемонт уже больше года. Платформа значительно упростила работу с клиентами - больше нет недопониманий, все договоренности зафиксированы. За это время количество наших заказов выросло в 2 раза благодаря хорошим отзывам в системе.',
      image: 'https://images.unsplash.com/photo-1636414722386-a73bd3fc368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjB0ZWFtfGVufDF8fHx8MTc2NDI1ODg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      results: ['Рост заказов на 100%', 'Средний чек +25%', 'Рейтинг 4.9/5'],
    },
    {
      brigadeName: 'Профи Ремонт',
      leader: 'Андрей М., бригадир',
      specialization: 'Отделочные работы',
      rating: 5,
      projectsCount: 63,
      text: 'Калькулятор смет - просто спасение! Раньше на составление сметы уходил целый день, теперь - 30 минут. Клиентам нравится прозрачность, они видят куда идут их деньги. Конфликтов стало в разы меньше, а довольных заказчиков больше.',
      image: 'https://images.unsplash.com/photo-1636414722386-a73bd3fc368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjB0ZWFtfGVufDF8fHx8MTc2NDI1ODg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      results: ['Экономия времени 40%', 'Споров -80%', '100% повторных клиентов'],
    },
    {
      brigadeName: 'СтройЭксперт',
      leader: 'Дмитрий К., руководитель',
      specialization: 'Комплексный ремонт',
      rating: 5,
      projectsCount: 89,
      text: 'Используем платформу для управления 3 бригадами одновременно. Очень удобно координировать работу, распределять заказы и контролировать качество. Фото отчёты защищают нас от необоснованных претензий - всегда можем доказать качество выполненных работ.',
      image: 'https://images.unsplash.com/photo-1636414722386-a73bd3fc368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjB0ZWFtfGVufDF8fHx8MTc2NDI1ODg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      results: ['3 бригады под контролем', 'Претензий -70%', 'Доход +150%'],
    },
    {
      brigadeName: 'РемонтПрофи',
      leader: 'Михаил В., мастер',
      specialization: 'Электрика и сантехника',
      rating: 5,
      projectsCount: 34,
      text: 'Молодая бригада, начали работать через платформу с нуля. Система помогла быстро набрать портфолио и получить первые отзывы. Клиенты доверяют больше, когда видят что мы работаем через официальную платформу с документами и гарантиями.',
      image: 'https://images.unsplash.com/photo-1636414722386-a73bd3fc368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjB0ZWFtfGVufDF8fHx8MTc2NDI1ODg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      results: ['Старт с нуля', '34 проекта за 6 месяцев', 'Стабильный поток заказов'],
    },
  ];

  const stats = [
    { value: '1200+', label: 'Активных бригад' },
    { value: '4.8', label: 'Средний рейтинг' },
    { value: '92%', label: 'Повторно работают с клиентами' },
    { value: '+45%', label: 'Средний рост дохода' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center pt-20"
        style={{
          background: 'linear-gradient(135deg, #A98467 0%, #6C584C 100%)',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white mb-6" style={{ fontSize: '48px', fontWeight: '800' }}>
              Истории успеха бригад
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
              Реальный опыт профессионалов, которые выбрали ВашРемонт
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-[#A98467] mb-2" style={{ fontSize: '42px', fontWeight: '800' }}>
                    {stat.value}
                  </div>
                  <p className="text-[#6C584C]/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-12">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#DDE5B6] hover:border-[#A98467] transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="aspect-square rounded-xl overflow-hidden mb-4">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.brigadeName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-[#6C584C] mb-2" style={{ fontSize: '22px', fontWeight: '700' }}>
                        {testimonial.brigadeName}
                      </h3>
                      <p className="text-[#6C584C]/70 mb-2">{testimonial.leader}</p>
                      <p className="text-[#6C584C]/60 text-sm mb-3">{testimonial.specialization}</p>
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#A98467] text-[#A98467]" />
                        ))}
                      </div>
                      <p className="text-[#6C584C]/60 text-sm">
                        {testimonial.projectsCount} завершённых проектов
                      </p>
                    </div>

                    <div className="lg:col-span-2">
                      <Quote className="w-10 h-10 text-[#DDE5B6] mb-4" />
                      <p className="text-[#6C584C] mb-6" style={{ fontSize: '16px', lineHeight: '1.7' }}>
                        {testimonial.text}
                      </p>

                      <div className="bg-[#F0EAD2] rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-[#A98467]" />
                          <h4 className="text-[#6C584C]" style={{ fontSize: '16px', fontWeight: '600' }}>
                            Достигнутые результаты:
                          </h4>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          {testimonial.results.map((result, rIndex) => (
                            <div key={rIndex} className="flex items-start gap-2">
                              <Star className="w-4 h-4 text-[#A98467] mt-1 flex-shrink-0" />
                              <span className="text-[#6C584C] text-sm">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[#6C584C] mb-6" style={{ fontSize: '36px', fontWeight: '700' }}>
              Станьте следующей историей успеха
            </h2>
            <p className="text-[#6C584C]/70 mb-8" style={{ fontSize: '18px' }}>
              Присоединяйтесь к профессионалам, которые уже растут вместе с ВашРемонт
            </p>
            <a href="/#cta">
              <button className="px-8 py-4 bg-[#A98467] hover:bg-[#8F7159] text-white rounded-lg transition-colors">
                Начать работу бесплатно
              </button>
            </a>
          </div>
        </div>
      </section>

      <InternalFooter />
    </div>
  );
}
