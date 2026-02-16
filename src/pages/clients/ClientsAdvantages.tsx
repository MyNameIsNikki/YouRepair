import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { CheckCircle2, Shield, Clock, Wallet, Camera, Users, FileText, Star } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function ClientsAdvantages() {
  const scrollToDemo = () => {
    window.location.href = '/#cta';
  };

  const advantages = [
    {
      icon: Wallet,
      title: 'Контроль бюджета',
      description: 'Отслеживайте расходы в режиме реального времени. Система предупредит о возможных перерасходах и поможет оптимизировать затраты.',
    },
    {
      icon: Clock,
      title: 'Соблюдение сроков',
      description: 'Прозрачный график работ с автоматическими напоминаниями. Вы всегда будете знать, на каком этапе находится ваш ремонт.',
    },
    {
      icon: Shield,
      title: 'Защита интересов',
      description: 'Все договоренности фиксируются в системе. Полная история переписки и согласований для защиты от споров.',
    },
    {
      icon: Camera,
      title: 'Визуальный контроль',
      description: 'Бригада загружает фото и видео отчеты после каждого этапа. Вы можете контролировать качество работ удаленно.',
    },
    {
      icon: Users,
      title: 'Прямая коммуникация',
      description: 'Встроенный чат с бригадой, возможность видеозвонков. Все обсуждения хранятся в одном месте.',
    },
    {
      icon: FileText,
      title: 'Цифровой документооборот',
      description: 'Все документы, акты и сметы хранятся в системе. Быстрый доступ к любым бумагам в любое время.',
    },
  ];

  const tariffs = [
    {
      name: 'Базовый',
      price: 'Бесплатно',
      period: 'навсегда',
      features: [
        'Управление 1 проектом',
        'Базовый чат с бригадой',
        'Просмотр фото отчетов',
        'Контроль бюджета',
        'Мобильное приложение',
      ],
      color: '#DDE5B6',
      recommended: false,
    },
    {
      name: 'Стандарт',
      price: '499 ₽',
      period: 'в месяц',
      features: [
        'До 3 проектов одновременно',
        'Видео отчеты и видеозвонки',
        'Расширенная аналитика',
        'Автоматические напоминания',
        'Приоритетная поддержка',
        'История изменений',
        'Экспорт отчетов',
      ],
      color: '#ADC178',
      recommended: true,
    },
    {
      name: 'Премиум',
      price: '999 ₽',
      period: 'в месяц',
      features: [
        'Неограниченное количество проектов',
        'Личный менеджер проекта',
        'Консультации дизайнера',
        'Расширенное хранилище (100 ГБ)',
        'API интеграции',
        'Юридическая поддержка',
        'VIP поддержка 24/7',
        'Индивидуальные отчеты',
      ],
      color: '#A98467',
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center pt-20"
        style={{
          background: 'linear-gradient(135deg, #ADC178 0%, #DDE5B6 100%)',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white mb-6" style={{ fontSize: '48px', fontWeight: '800' }}>
              Преимущества для Заказчиков
            </h1>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
              Полный контроль над вашим ремонтом. Прозрачность, экономия времени и денег.
            </p>
            <Button
              onClick={scrollToDemo}
              size="lg"
              className="bg-white text-[#ADC178] hover:bg-[#F0EAD2] text-lg px-8 py-6 h-auto"
            >
              Начать бесплатно
            </Button>
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#6C584C] mb-12 text-center" style={{ fontSize: '38px', fontWeight: '700' }}>
              Почему заказчики выбирают нас?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#F0EAD2] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#DDE5B6] hover:border-[#ADC178]"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-[#ADC178] rounded-2xl mb-6">
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

      {/* Image Section */}
      <section className="py-20 bg-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[#6C584C] mb-6" style={{ fontSize: '36px', fontWeight: '700' }}>
                  Всё под контролем
                </h2>
                <p className="text-[#6C584C]/70 mb-6" style={{ fontSize: '18px' }}>
                  С ВашРемонт вы получаете полную прозрачность процесса. Система автоматически контролирует выполнение работ, соблюдение сроков и бюджета.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#ADC178] flex-shrink-0 mt-1" />
                    <span className="text-[#6C584C]">Получайте уведомления о каждом важном событии</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#ADC178] flex-shrink-0 mt-1" />
                    <span className="text-[#6C584C]">Контролируйте качество работ через фото и видео отчеты</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#ADC178] flex-shrink-0 mt-1" />
                    <span className="text-[#6C584C]">Экономьте до 30% бюджета благодаря прозрачности</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQzMTc0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Современный интерьер"
                  className="w-full h-full object-cover"
                />
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
                Гибкие условия для любого проекта. Начните бесплатно и обновитесь когда захотите.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {tariffs.map((tariff, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                    tariff.recommended
                      ? 'border-[#ADC178] shadow-xl scale-105'
                      : 'border-[#DDE5B6] hover:border-[#ADC178]'
                  }`}
                >
                  {tariff.recommended && (
                    <div className="flex items-center justify-center gap-2 bg-[#ADC178] text-white px-4 py-2 rounded-full mb-4 -mt-4">
                      <Star className="w-4 h-4 fill-white" />
                      <span>Рекомендуем</span>
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
                        ? 'bg-[#ADC178] hover:bg-[#9BB167] text-white'
                        : 'bg-white border-2 border-[#ADC178] text-[#ADC178] hover:bg-[#ADC178] hover:text-white'
                    }`}
                  >
                    Начать
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-[#6C584C]/60 mb-4">
                Все тарифы включают 14 дней бесплатного пробного периода
              </p>
              <Button
                onClick={scrollToDemo}
                variant="outline"
                className="border-[#ADC178] text-[#ADC178] hover:bg-[#ADC178] hover:text-white"
              >
                Связаться с отделом продаж
              </Button>
            </div>
          </div>
        </div>
      </section>

      <InternalFooter />
    </div>
  );
}
