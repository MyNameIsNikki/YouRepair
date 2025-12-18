import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { BeforeAfterSlider } from '../../components/BeforeAfterSlider';
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function ClientsGallery() {
  const projects = [
    {
      title: 'Современная кухня',
      before: 'https://images.unsplash.com/photo-1753977725475-41b221add2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5vdmF0aW9uJTIwYmVmb3JlfGVufDF8fHx8MTc2NDMyOTMxMnww&ixlib=rb-4.1.0&q=80&w=1080',
      after: 'https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MzA1Mjk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Полная реконструкция кухни с заменой мебели и техники',
      duration: '45 дней',
      budget: '850 000 ₽',
    },
    {
      title: 'Ванная комната премиум-класса',
      before: 'https://images.unsplash.com/photo-1753977725475-41b221add2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5vdmF0aW9uJTIwYmVmb3JlfGVufDF8fHx8MTc2NDMyOTMxMnww&ixlib=rb-4.1.0&q=80&w=1080',
      after: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHJlbm92YXRpb258ZW58MXx8fHwxNzY0MjU1NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Капитальный ремонт с заменой всей сантехники и отделки',
      duration: '30 дней',
      budget: '620 000 ₽',
    },
    {
      title: 'Гостиная в современном стиле',
      before: 'https://images.unsplash.com/photo-1753977725475-41b221add2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5vdmF0aW9uJTIwYmVmb3JlfGVufDF8fHx8MTc2NDMyOTMxMnww&ixlib=rb-4.1.0&q=80&w=1080',
      after: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQzMTc0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Косметический ремонт с полной заменой отделки и освещения',
      duration: '25 дней',
      budget: '480 000 ₽',
    },
  ];

  const testimonials = [
    {
      name: 'Екатерина М.',
      project: 'Трёхкомнатная квартира',
      rating: 5,
      text: 'ВашРемонт стал для меня настоящим спасением! Я живу в другом городе, а квартира ремонтируется в Москве. Благодаря приложению я контролировала каждый этап, видела фото отчеты и общалась с бригадой. Ремонт завершился точно в срок и даже немного дешевле первоначальной сметы.',
      image: 'https://images.unsplash.com/photo-1758523670991-ee93bc48d81d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGhvbWVvd25lcnxlbnwxfHx8fDE3NjQyMzEzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Ноябрь 2024',
    },
    {
      name: 'Александр В.',
      project: 'Капитальный ремонт офиса',
      rating: 5,
      text: 'Использовали платформу для ремонта офисного помещения. Очень удобно контролировать бюджет - система сразу показывает перерасходы и помогает их избежать. Бригада была всегда на связи, все вопросы решались оперативно. Рекомендую всем, кто ценит своё время!',
      image: 'https://images.unsplash.com/photo-1758523670991-ee93bc48d81d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGhvbWVvd25lcnxlbnwxfHx8fDE3NjQyMzEzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Октябрь 2024',
    },
    {
      name: 'Мария С.',
      project: 'Ремонт загородного дома',
      rating: 5,
      text: 'Делали ремонт на даче, и я боялась, что это превратится в бесконечный процесс. С ВашРемонт всё было под контролем: чёткий график, еженедельные отчёты с фото, все договоренности зафиксированы. Особенно понравилась функция видеозвонков - можно было показать что нужно исправить прямо на месте.',
      image: 'https://images.unsplash.com/photo-1758523670991-ee93bc48d81d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGhvbWVvd25lcnxlbnwxfHx8fDE3NjQyMzEzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Сентябрь 2024',
    },
    {
      name: 'Дмитрий К.',
      project: 'Студия в новостройке',
      rating: 5,
      text: 'Первый раз делал ремонт и очень переживал. Платформа помогла организовать весь процесс. Особенно полезны были автоматические напоминания о следующих этапах и контроль расходов. Сэкономил около 15% бюджета благодаря прозрачности. Спасибо команде ВашРемонт!',
      image: 'https://images.unsplash.com/photo-1758523670991-ee93bc48d81d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGhvbWVvd25lcnxlbnwxfHx8fDE3NjQyMzEzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Август 2024',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center pt-20"
        style={{
          background: 'linear-gradient(135deg, #ADC178 0%, #DDE5B6 100%)',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white mb-6" style={{ fontSize: '48px', fontWeight: '800' }}>
              Галерея проектов и отзывы
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
              Реальные проекты наших клиентов и их истории успеха
            </p>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Наши проекты
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Переместите слайдер, чтобы увидеть результаты До и После
              </p>
            </div>

            <div className="space-y-16">
              {projects.map((project, index) => (
                <div key={index} className="space-y-6">
                  <div>
                    <h3 className="text-[#6C584C] mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
                      {project.title}
                    </h3>
                    <p className="text-[#6C584C]/70 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-[#6C584C]/60">
                      <span>⏱️ Срок: {project.duration}</span>
                      <span>💰 Бюджет: {project.budget}</span>
                    </div>
                  </div>
                  <BeforeAfterSlider
                    beforeImage={project.before}
                    afterImage={project.after}
                    alt={project.title}
                  />
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
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Отзывы клиентов
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Что говорят о нас наши заказчики
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#DDE5B6]"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#6C584C] mb-1" style={{ fontSize: '18px', fontWeight: '600' }}>
                        {testimonial.name}
                      </h4>
                      <p className="text-[#6C584C]/60 text-sm mb-2">{testimonial.project}</p>
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#ADC178] text-[#ADC178]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <Quote className="w-8 h-8 text-[#DDE5B6] mb-4" />
                  
                  <p className="text-[#6C584C]/80 mb-4">
                    {testimonial.text}
                  </p>

                  <p className="text-[#6C584C]/50 text-sm">
                    {testimonial.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-[#ADC178] mb-2" style={{ fontSize: '48px', fontWeight: '800' }}>
                  500+
                </div>
                <p className="text-[#6C584C]/70">Завершённых проектов</p>
              </div>
              <div>
                <div className="text-[#ADC178] mb-2" style={{ fontSize: '48px', fontWeight: '800' }}>
                  98%
                </div>
                <p className="text-[#6C584C]/70">Довольных клиентов</p>
              </div>
              <div>
                <div className="text-[#ADC178] mb-2" style={{ fontSize: '48px', fontWeight: '800' }}>
                  25%
                </div>
                <p className="text-[#6C584C]/70">Средняя экономия бюджета</p>
              </div>
              <div>
                <div className="text-[#ADC178] mb-2" style={{ fontSize: '48px', fontWeight: '800' }}>
                  4.9
                </div>
                <p className="text-[#6C584C]/70">Средняя оценка</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InternalFooter />
    </div>
  );
}
