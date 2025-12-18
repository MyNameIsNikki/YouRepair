import { Navigation } from '../components/Navigation';
import { InternalFooter } from '../components/InternalFooter';
import { Target, Users, TrendingUp, Heart, Award, Zap } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
  const stats = [
    { value: '5000+', label: 'Пользователей платформы' },
    { value: '1200+', label: 'Профессиональных бригад' },
    { value: '500+', label: 'Завершённых проектов' },
    { value: '98%', label: 'Довольных клиентов' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Прозрачность',
      description: 'Мы верим, что честность и открытость - основа доверия между заказчиком и исполнителем.',
    },
    {
      icon: Users,
      title: 'Забота о людях',
      description: 'Создаём решения, которые делают жизнь проще как для заказчиков, так и для бригад.',
    },
    {
      icon: TrendingUp,
      title: 'Постоянное развитие',
      description: 'Регулярно добавляем новые функции на основе отзывов наших пользователей.',
    },
    {
      icon: Heart,
      title: 'Качество',
      description: 'Стремимся к совершенству во всём - от кода приложения до клиентского сервиса.',
    },
  ];

  const team = [
    {
      role: 'Основатель и CEO',
      description: 'Опыт в строительстве и IT позволил создать идеальное решение для рынка ремонтов',
    },
    {
      role: 'Технический директор',
      description: 'Отвечает за разработку и техническую реализацию платформы',
    },
    {
      role: 'Руководитель поддержки',
      description: 'Помогает пользователям решать вопросы и улучшает сервис',
    },
    {
      role: 'Команда разработки',
      description: 'Профессионалы, которые ежедневно делают платформу лучше',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center pt-20"
        style={{
          background: 'linear-gradient(135deg, #6C584C 0%, #A98467 50%, #ADC178 100%)',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white mb-6" style={{ fontSize: '48px', fontWeight: '800' }}>
              О компании ВашРемонт
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
              Мы создаём технологии, которые делают ремонт понятным, прозрачным и комфортным для всех участников процесса
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#6C584C] mb-12 text-center" style={{ fontSize: '38px', fontWeight: '700' }}>
              ВашРемонт в цифрах
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-[#F0EAD2] to-white rounded-2xl border-2 border-[#DDE5B6]">
                  <div className="text-[#ADC178] mb-2" style={{ fontSize: '48px', fontWeight: '800' }}>
                    {stat.value}
                  </div>
                  <p className="text-[#6C584C]/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[#6C584C] mb-6" style={{ fontSize: '38px', fontWeight: '700' }}>
                  Наша миссия
                </h2>
                <p className="text-[#6C584C]/80 mb-6" style={{ fontSize: '18px', lineHeight: '1.7' }}>
                  Мы создали ВашРемонт, потому что сами сталкивались с проблемами при ремонте. Недопонимания с бригадой, перерасход бюджета, нарушение сроков - всё это можно избежать с помощью правильных инструментов.
                </p>
                <p className="text-[#6C584C]/80 mb-6" style={{ fontSize: '18px', lineHeight: '1.7' }}>
                  Наша цель - сделать ремонт предсказуемым процессом, где каждая сторона знает свои обязательства и выполняет их. Мы хотим, чтобы ремонт перестал быть стрессом и стал интересным процессом создания дома мечты.
                </p>
                <div className="flex items-center gap-3 p-6 bg-white rounded-xl border-2 border-[#ADC178]">
                  <Award className="w-12 h-12 text-[#ADC178] flex-shrink-0" />
                  <p className="text-[#6C584C]">
                    <strong>Наше достижение:</strong> Платформа помогла сэкономить более 50 млн рублей нашим пользователям
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc2NDI4NTU2NHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Команда ВашРемонт"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#6C584C] mb-12 text-center" style={{ fontSize: '38px', fontWeight: '700' }}>
              Наши ценности
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#DDE5B6]"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-[#ADC178] rounded-2xl mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-[#6C584C] mb-3" style={{ fontSize: '20px', fontWeight: '600' }}>
                    {value.title}
                  </h3>
                  <p className="text-[#6C584C]/70 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#6C584C] mb-6 text-center" style={{ fontSize: '38px', fontWeight: '700' }}>
              Наша команда
            </h2>
            <p className="text-[#6C584C]/70 mb-12 text-center max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
              Профессионалы с опытом в строительстве, IT и клиентском сервисе
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#F0EAD2] to-white p-6 rounded-xl border-2 border-[#DDE5B6] hover:border-[#ADC178] transition-all duration-300"
                >
                  <h3 className="text-[#6C584C] mb-3" style={{ fontSize: '18px', fontWeight: '600' }}>
                    {member.role}
                  </h3>
                  <p className="text-[#6C584C]/70 text-sm">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#ADC178] to-[#6C584C] rounded-3xl p-12 text-center">
              <Zap className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-white mb-4" style={{ fontSize: '32px', fontWeight: '700' }}>
                Присоединяйтесь к нам
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Станьте частью сообщества, которое меняет индустрию ремонтов к лучшему
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#cta">
                  <button className="px-8 py-4 bg-white text-[#ADC178] hover:bg-[#F0EAD2] rounded-lg transition-colors">
                    Начать использовать
                  </button>
                </a>
                <a href="/support">
                  <button className="px-8 py-4 bg-[#6C584C] hover:bg-[#5A4A40] text-white rounded-lg transition-colors">
                    Связаться с нами
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InternalFooter />
    </div>
  );
}
