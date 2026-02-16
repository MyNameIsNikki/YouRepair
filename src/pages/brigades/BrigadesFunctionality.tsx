import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { 
  Calculator, 
  MessageSquare, 
  Camera, 
  Users, 
  FileText, 
  BarChart3,
  Clock,
  Wallet,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

export function BrigadesFunctionality() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const features = [
    {
      icon: Calculator,
      title: 'Калькулятор смет',
      description: 'Быстрое и точное составление смет',
      details: [
        'База материалов с актуальными ценами',
        'Автоматический расчёт стоимости работ',
        'Шаблоны для типовых проектов',
        'Экспорт в PDF и Excel',
      ],
    },
    {
      icon: Users,
      title: 'Управление командой',
      description: 'Координация работы бригады в одном месте',
      details: [
        'Распределение задач между членами бригады',
        'Контроль выполнения работ',
        'График смен и отработанных часов',
        'Учёт производительности',
      ],
    },
    {
      icon: Camera,
      title: 'Фото отчётность',
      description: 'Документирование каждого этапа работ',
      details: [
        'Загрузка фото до/после',
        'Автоматическая привязка к этапам',
        'Комментарии к фотографиям',
        'Защита от спорных ситуаций',
      ],
    },
    {
      icon: MessageSquare,
      title: 'Коммуникация с заказчиком',
      description: 'Прямая связь без посредников',
      details: [
        'Встроенный чат',
        'Видеозвонки для согласований',
        'Уведомления о сообщениях',
        'История всех обсуждений',
      ],
    },
    {
      icon: FileText,
      title: 'Документооборот',
      description: 'Автоматизация бумажной работы',
      details: [
        'Формирование актов выполненных работ',
        'Электронная подпись документов',
        'Хранение договоров и смет',
        'Быстрое согласование с заказчиком',
      ],
    },
    {
      icon: Clock,
      title: 'Планирование работ',
      description: 'Эффективное управление временем',
      details: [
        'График выполнения этапов',
        'Напоминания о важных датах',
        'Контроль сроков',
        'Синхронизация с календарём',
      ],
    },
    {
      icon: Wallet,
      title: 'Финансовый учёт',
      description: 'Прозрачность доходов и расходов',
      details: [
        'Учёт всех финансовых операций',
        'Отчёты по прибыльности',
        'Контроль дебиторской задолженности',
        'Аналитика по проектам',
      ],
    },
    {
      icon: BarChart3,
      title: 'Аналитика и статистика',
      description: 'Данные для роста бизнеса',
      details: [
        'Статистика выполненных проектов',
        'Анализ рентабельности',
        'Отчёты по клиентам',
        'Прогнозирование загрузки',
      ],
    },
  ];

  const faq = [
    {
      question: 'Как получать новые заказы через платформу?',
      answer: 'После регистрации заполните профиль бригады, укажите специализацию и регионы работы. Система автоматически будет предлагать вам подходящие заказы. Чем выше ваш рейтинг и больше положительных отзывов, тем больше заказов вы получите.',
    },
    {
      question: 'Как составить смету в приложении?',
      answer: 'Перейдите в раздел проекта и выберите "Создать смету". Добавьте необходимые виды работ из каталога или создайте свои. Укажите объёмы работ, система автоматически рассчитает стоимость. Отправьте смету заказчику на согласование прямо через приложение.',
    },
    {
      question: 'Как управлять несколькими проектами одновременно?',
      answer: 'На главном экране вы видите все активные проекты. Можно переключаться между ними одним кликом. Для каждого проекта отображается статус, ближайшие задачи и финансовые показатели. Настройте уведомления, чтобы не пропустить важные события.',
    },
    {
      question: 'Можно ли работать с приложением всей бригадой?',
      answer: 'Да, на тарифе Профессиональный вы можете добавить членов бригады как участников. Каждый получит доступ к проектам с определёнными правами. Вы сможете распределять задачи и контролировать их выполнение.',
    },
    {
      question: 'Как защититься от недобросовестных заказчиков?',
      answer: 'Все договоренности фиксируйте в чате приложения. Загружайте фото отчёты после каждого этапа - это доказательство выполненных работ. Используйте электронную подпись для актов. В случае спора наша поддержка поможет разобраться, опираясь на историю в системе.',
    },
    {
      question: 'Сколько стоит использование платформы?',
      answer: 'Базовый тариф бесплатный навсегда. Для профессионального использования рекомендуем тариф Профессиональный за 699₽/месяц с первым месяцем бесплатно. Для крупных бригад есть тариф Бизнес с расширенными возможностями.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center pt-20"
        style={{
          background: 'linear-gradient(135deg, #A98467 0%, #6C584C 100%)',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white mb-6" style={{ fontSize: '48px', fontWeight: '800' }}>
              Функционал для Бригад
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
              Профессиональные инструменты для эффективной работы
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#F0EAD2] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#DDE5B6]"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex items-center justify-center w-14 h-14 bg-[#A98467] rounded-xl flex-shrink-0">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[#6C584C] mb-2" style={{ fontSize: '22px', fontWeight: '600' }}>
                        {feature.title}
                      </h3>
                      <p className="text-[#6C584C]/70 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-[72px]">
                    {feature.details.map((detail, dIndex) => (
                      <li key={dIndex} className="flex items-start gap-2 text-sm text-[#6C584C]/80">
                        <span className="text-[#A98467] mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Часто задаваемые вопросы
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Ответы на вопросы бригад
              </p>
            </div>

            <div className="space-y-4">
              {faq.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border-2 border-[#DDE5B6] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#F0EAD2] transition-colors"
                  >
                    <span className="text-[#6C584C] text-left" style={{ fontWeight: '600' }}>
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#A98467] transition-transform flex-shrink-0 ml-4 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 py-5 border-t border-[#DDE5B6] bg-[#F0EAD2]/30">
                      <p className="text-[#6C584C]/80">
                        {item.answer}
                      </p>
                    </div>
                  )}
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
              Готовы попробовать?
            </h2>
            <p className="text-[#6C584C]/70 mb-8" style={{ fontSize: '18px' }}>
              Начните использовать профессиональные инструменты уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/brigades/training">
                <button className="px-8 py-4 bg-[#A98467] hover:bg-[#8F7159] text-white rounded-lg transition-colors">
                  Посмотреть обучение
                </button>
              </a>
              <a href="/support">
                <button className="px-8 py-4 bg-white border-2 border-[#A98467] text-[#A98467] hover:bg-[#A98467] hover:text-white rounded-lg transition-colors">
                  Связаться с поддержкой
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <InternalFooter />
    </div>
  );
}
