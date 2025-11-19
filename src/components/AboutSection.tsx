import { CheckCircle, DollarSign, Camera, ClipboardList } from 'lucide-react';
import { Progress } from './ui/progress';
import { Card } from './ui/card';

interface AboutSectionProps {
  isVisible?: boolean;
}

export function AboutSection({ isVisible }: AboutSectionProps) {
  const features = [
    {
      icon: ClipboardList,
      title: 'Планирование и задачи',
      description: 'Четкий план работ с автоматическим контролем сроков',
    },
    {
      icon: DollarSign,
      title: 'Финансовый контроль',
      description: 'Прозрачный учет всех расходов и платежей',
    },
    {
      icon: Camera,
      title: 'Фотоотчеты',
      description: 'Документирование каждого этапа работ с геолокацией',
    },
  ];

  return (
    <section
      id="about"
      data-section="about"
      className="py-20 lg:py-32 bg-[#F0EAD2]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '42px', fontWeight: '700' }}>
            Как работает ВашРемонт?
          </h2>
          <p className="text-[#6C584C]/70 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Платформа, которая заменяет десятки чатов, таблиц и звонков одним удобным решением
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Features */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#ADC178]/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#ADC178]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[#6C584C] mb-2" style={{ fontSize: '20px', fontWeight: '600' }}>
                      {feature.title}
                    </h3>
                    <p className="text-[#6C584C]/70">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Dashboard Card */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <Card className="p-8 bg-white shadow-xl border-none">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[#6C584C]" style={{ fontSize: '24px', fontWeight: '600' }}>
                    Дашборд проекта
                  </h3>
                  <span className="px-3 py-1 bg-[#ADC178]/10 text-[#ADC178] rounded-full text-sm">
                    В процессе
                  </span>
                </div>
                <p className="text-[#6C584C]/60 text-sm">Ремонт кухни и гостиной</p>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#6C584C]/70">Общий прогресс</span>
                  <span className="text-[#ADC178]" style={{ fontSize: '24px', fontWeight: '700' }}>65%</span>
                </div>
                <Progress value={65} className="h-3" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#F0EAD2] rounded-xl">
                  <div className="text-[#6C584C]/60 text-sm mb-1">Бюджет</div>
                  <div className="text-[#6C584C]" style={{ fontSize: '20px', fontWeight: '600' }}>450 000 ₽</div>
                </div>
                <div className="p-4 bg-[#DDE5B6] rounded-xl">
                  <div className="text-[#6C584C]/60 text-sm mb-1">Потрачено</div>
                  <div className="text-[#6C584C]" style={{ fontSize: '20px', fontWeight: '600' }}>292 500 ₽</div>
                </div>
                <div className="p-4 bg-[#ADC178]/10 rounded-xl">
                  <div className="text-[#6C584C]/60 text-sm mb-1">Задач завершено</div>
                  <div className="text-[#6C584C]" style={{ fontSize: '20px', fontWeight: '600' }}>18 из 28</div>
                </div>
                <div className="p-4 bg-[#A98467]/10 rounded-xl">
                  <div className="text-[#6C584C]/60 text-sm mb-1">Дней осталось</div>
                  <div className="text-[#6C584C]" style={{ fontSize: '20px', fontWeight: '600' }}>12</div>
                </div>
              </div>

              {/* Recent activity */}
              <div className="mt-6 pt-6 border-t border-[#DDE5B6]">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ADC178] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#6C584C] text-sm">Последнее обновление</p>
                    <p className="text-[#6C584C]/60 text-sm">Укладка плитки завершена • 2 часа назад</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
