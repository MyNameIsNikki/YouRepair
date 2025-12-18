import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { 
  TrendingUp, 
  Calculator, 
  Shield, 
  Users, 
  FileCheck, 
  Star,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function BrigadesAdvantages() {
  const scrollToDemo = () => {
    window.location.href = '/#cta';
  };

  const advantages = [
    {
      icon: TrendingUp,
      title: 'Постоянный поток заказов',
      description: 'Получайте новые заказы через платформу. Наша система автоматически подбирает подходящие проекты в вашем регионе.',
    },
    {
      icon: Calculator,
      title: 'Автоматический расчёт смет',
      description: 'Встроенный калькулятор материалов и работ. Формируйте профессиональные сметы за минуты, а не часы.',
    },
    {
      icon: Shield,
      title: 'Защита от необоснованных претензий',
      description: 'Все договоренности и этапы работ фиксируются в системе. Фото отчёты защищают от несправедливых требований.',
    },
    {
      icon: Users,
      title: 'Удобное управление командой',
      description: 'Координируйте работу бригады, распределяйте задачи и контролируйте выполнение прямо в приложении.',
    },
    {
      icon: FileCheck,
      title: 'Упрощённый документооборот',
      description: 'Автоматическое формирование актов и документов. Электронная подпись ускоряет согласование.',
    },
    {
      icon: Star,
      title: 'Репутация и отзывы',
      description: 'Довольные клиенты оставляют положительные отзывы. Высокий рейтинг привлекает новых заказчиков.',
    },
  ];

  const tariffs = [
    {
      name: 'Стартовый',
      price: 'Бесплатно',
      period: 'навсегда',
      features: [
        'До 2 активных проектов',
        'Базовый чат с заказчиком',
        'Загрузка фото отчётов',
        'Простой калькулятор смет',
        'Профиль бригады',
      ],
      color: '#DDE5B6',
      recommended: false,
    },
    {
      name: 'Профессиональный',
      price: '699 ₽',
      period: 'в месяц',
      features: [
        'Неограниченное число проектов',
        'Расширенный калькулятор смет',
        'Автоформирование документов',
        'Управление командой',
        'Статистика и аналитика',
        'Приоритет в заказах',
        'Видеозвонки с заказчиками',
      ],
      color: '#A98467',
      recommended: true,
    },
    {
      name: 'Бизнес',
      price: '1 499 ₽',
      period: 'в месяц',
      features: [
        'Всё из тарифа Профессиональный',
        'API для интеграций',
        'Белая метка (свой брендинг)',
        'Расширенная аналитика',
        'Персональный менеджер',
        'Обучение команды',
        'Реклама на платформе',
        'Гарантированные заказы',
      ],
      color: '#6C584C',
      recommended: false,
    },
  ];

  const benefits = [
    {
      title: 'Экономия времени',
      value: 'до 40%',
      description: 'на административных задачах',
    },
    {
      title: 'Рост доходов',
      value: '+35%',
      description: 'благодаря новым заказам',
    },
    {
      title: 'Меньше конфликтов',
      value: '-70%',
      description: 'споров с заказчиками',
    },
    {
      title: 'Больше проектов',
      value: 'x2.5',
      description: 'в среднем за год',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center pt-20"
        style={{
          background: 'linear-gradient(135deg, #A98467 0%, #6C584C 100%)',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white mb-6" style={{ fontSize: '48px', fontWeight: '800' }}>
              Преимущества для Бригад
            </h1>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
              Профессиональные инструменты для роста вашего бизнеса. Больше заказов, меньше проблем.
            </p>
            <Button
              onClick={scrollToDemo}
              size="lg"
              className="bg-white text-[#A98467] hover:bg-[#F0EAD2] text-lg px-8 py-6 h-auto"
            >
              Присоединиться бесплатно
            </Button>
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#6C584C] mb-12 text-center" style={{ fontSize: '38px', fontWeight: '700' }}>
              Почему бригады работают с нами?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#F0EAD2] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#DDE5B6] hover:border-[#A98467]"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A98467] rounded-2xl mb-6">
                    <advantage.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-[#6C584C] mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                    {advantage.title}
                  </h3>
                  <p className="text-[#6C584C]/70">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#6C584C] mb-12 text-center" style={{ fontSize: '38px', fontWeight: '700' }}>
              Результаты наших бригад
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center border-2 border-[#DDE5B6]"
                >
                  <div className="text-[#A98467] mb-2" style={{ fontSize: '48px', fontWeight: '800' }}>
                    {benefit.value}
                  </div>
                  <h3 className="text-[#6C584C] mb-2" style={{ fontSize: '20px', fontWeight: '600' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-[#6C584C]/60 text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20 bg-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1636414722386-a73bd3fc368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjB0ZWFtfGVufDF8fHx8MTc2NDI1ODg4MXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Строительная бригада"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-[#6C584C] mb-6" style={{ fontSize: '36px', fontWeight: '700' }}>
                  Работайте профессионально
                </h2>
                <p className="text-[#6C584C]/70 mb-6" style={{ fontSize: '18px' }}>
                  ВашРемонт — это не просто приложение, это ваш партнёр в развитии строительного бизнеса. Мы помогаем бригадам работать эффективнее и зарабатывать больше.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#A98467] flex-shrink-0 mt-1" />
                    <span className="text-[#6C584C]">Получайте оплату быстрее благодаря прозрачности</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#A98467] flex-shrink-0 mt-1" />
                    <span className="text-[#6C584C]">Выделяйтесь на фоне конкурентов с профессиональным подходом</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#A98467] flex-shrink-0 mt-1" />
                    <span className="text-[#6C584C]">Стройте репутацию и получайте рекомендации</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tariffs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Выберите свой тариф
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Начните бесплатно и масштабируйте по мере роста
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {tariffs.map((tariff, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                    tariff.recommended
                      ? 'border-[#A98467] shadow-xl scale-105'
                      : 'border-[#DDE5B6] hover:border-[#A98467]'
                  }`}
                >
                  {tariff.recommended && (
                    <div className="flex items-center justify-center gap-2 bg-[#A98467] text-white px-4 py-2 rounded-full mb-4 -mt-4">
                      <Star className="w-4 h-4 fill-white" />
                      <span>Популярный</span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-[#6C584C] mb-2" style={{ fontSize: '24px', fontWeight: '700' }}>
                      {tariff.name}
                    </h3>
                    <div className="mb-2">
                      <span className="text-[#6C584C]" style={{ fontSize: '40px', fontWeight: '800' }}>
                        {tariff.price}
                      </span>
                    </div>
                    <p className="text-[#6C584C]/60">{tariff.period}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tariff.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: tariff.color }}
                        />
                        <span className="text-[#6C584C] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={scrollToDemo}
                    className={`w-full ${
                      tariff.recommended
                        ? 'bg-[#A98467] hover:bg-[#8F7159] text-white'
                        : 'bg-white border-2 border-[#A98467] text-[#A98467] hover:bg-[#A98467] hover:text-white'
                    }`}
                  >
                    Начать
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-[#6C584C]/60 mb-4">
                Первые 30 дней тарифа Профессиональный — бесплатно
              </p>
              <Button
                onClick={scrollToDemo}
                variant="outline"
                className="border-[#A98467] text-[#A98467] hover:bg-[#A98467] hover:text-white"
              >
                Связаться с отделом продаж
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#A98467] to-[#6C584C] rounded-3xl p-12 text-center">
              <Zap className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-white mb-4" style={{ fontSize: '32px', fontWeight: '700' }}>
                Готовы начать?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Присоединяйтесь к сотням профессиональных бригад, которые уже используют ВашРемонт для роста своего бизнеса
              </p>
              <Button
                onClick={scrollToDemo}
                size="lg"
                className="bg-white text-[#A98467] hover:bg-[#F0EAD2] text-lg px-8 py-6 h-auto"
              >
                Зарегистрироваться бесплатно
              </Button>
            </div>
          </div>
        </div>
      </section>

      <InternalFooter />
    </div>
  );
}
