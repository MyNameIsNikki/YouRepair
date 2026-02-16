import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Camera, 
  FileText, 
  Calendar, 
  Wallet,
  Bell,
  BarChart3,
  Users,
  Shield,
  Download,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function ClientsFunctionality() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const features = [
    {
      icon: LayoutDashboard,
      title: 'Дашборд проекта',
      description: 'Единое место для контроля всего проекта. Отслеживайте прогресс, бюджет и сроки в режиме реального времени.',
      details: [
        'Визуализация прогресса по этапам',
        'График выполнения работ',
        'Контроль бюджета с детализацией',
        'Календарь предстоящих работ',
      ],
    },
    {
      icon: MessageSquare,
      title: 'Встроенный чат',
      description: 'Общайтесь с бригадой напрямую в приложении. Все сообщения сохраняются и доступны в любое время.',
      details: [
        'Текстовые сообщения и голосовые',
        'Отправка фото и документов',
        'Видеозвонки (тариф Стандарт+)',
        'История всех переписок',
      ],
    },
    {
      icon: Camera,
      title: 'Фото и видео отчёты',
      description: 'Бригада загружает фотографии после каждого этапа работ. Вы видите результат не выходя из дома.',
      details: [
        'Фото до/после каждого этапа',
        'Возможность оставлять комментарии',
        'Автоматическая группировка по датам',
        'Экспорт отчётов в PDF',
      ],
    },
    {
      icon: FileText,
      title: 'Управление документами',
      description: 'Все документы, сметы и акты в одном месте. Цифровая подпись и автоматическое формирование актов.',
      details: [
        'Договоры и акты приёмки работ',
        'Сметы с детализацией',
        'Чеки и накладные',
        'Электронная подпись документов',
      ],
    },
    {
      icon: Calendar,
      title: 'Календарь и график',
      description: 'Планируйте работы и отслеживайте выполнение. Система автоматически напомнит о важных событиях.',
      details: [
        'График работ по дням',
        'Автоматические напоминания',
        'Отметка о выполнении этапов',
        'Синхронизация с календарём телефона',
      ],
    },
    {
      icon: Wallet,
      title: 'Контроль финансов',
      description: 'Полная прозрачность расходов. Система предупредит о перерасходе и поможет оптимизировать бюджет.',
      details: [
        'Планирование бюджета по статьям',
        'Отслеживание фактических расходов',
        'Уведомления о превышении',
        'Финансовые отчёты и аналитика',
      ],
    },
    {
      icon: Bell,
      title: 'Умные уведомления',
      description: 'Получайте важные обновления моментально. Настройте оповещения под себя.',
      details: [
        'Push-уведомления о важных событиях',
        'Email дайджесты',
        'SMS о критичных изменениях',
        'Гибкие настройки уведомлений',
      ],
    },
    {
      icon: BarChart3,
      title: 'Аналитика и отчёты',
      description: 'Детальная статистика по проекту. Понимайте, куда уходят деньги и время.',
      details: [
        'Графики расходов по категориям',
        'Анализ соблюдения сроков',
        'Сравнение плана и факта',
        'Экспорт данных в Excel',
      ],
    },
  ];

  const faq = [
    {
      question: 'Как создать новый проект?',
      answer: 'Нажмите кнопку "Создать проект" на главном экране приложения. Заполните основную информацию: название, адрес объекта, предполагаемый бюджет и сроки. После этого вы сможете пригласить бригаду к проекту или найти исполнителей через платформу.',
    },
    {
      question: 'Как добавить бригаду к проекту?',
      answer: 'В разделе "Команда" вашего проекта нажмите "Пригласить бригаду". Вы можете отправить приглашение по email или номеру телефона. Бригада получит уведомление и сможет принять приглашение через своё приложение.',
    },
    {
      question: 'Как контролировать расходы?',
      answer: 'В разделе "Финансы" вы увидите все расходы по проекту. Система автоматически сравнивает плановый и фактический бюджет. При превышении лимита по любой статье вы получите уведомление. Можно установить лимиты на отдельные категории расходов.',
    },
    {
      question: 'Что делать если возникла проблема с работами?',
      answer: 'Свяжитесь с бригадой через встроенный чат и опишите проблему. Все сообщения фиксируются в системе. Если проблема не решается, обратитесь в нашу поддержку через раздел "Помощь" - мы поможем найти решение.',
    },
    {
      question: 'Как подписать акт выполненных работ?',
      answer: 'После завершения этапа бригада сформирует акт в приложении. Вы получите уведомление для проверки и подписания. Можно использовать электронную подпись прямо в приложении или запросить бумажную версию документа.',
    },
    {
      question: 'Можно ли работать без интернета?',
      answer: 'Большинство функций требует подключения к интернету. Однако, вы можете просматривать ранее загруженную информацию офлайн. Фото и сообщения будут отправлены автоматически при восстановлении соединения.',
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
              Функционал для Заказчиков
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
              Все инструменты для эффективного управления ремонтом в одном приложении
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
                    <div className="flex items-center justify-center w-14 h-14 bg-[#ADC178] rounded-xl flex-shrink-0">
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
                        <span className="text-[#ADC178] mt-1">•</span>
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

      {/* App Screenshot Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[#6C584C] mb-6" style={{ fontSize: '36px', fontWeight: '700' }}>
                  Удобный интерфейс
                </h2>
                <p className="text-[#6C584C]/70 mb-6" style={{ fontSize: '18px' }}>
                  Интуитивно понятное приложение, которым легко пользоваться. Все важные функции под рукой на главном экране.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#ADC178] rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#6C584C]">Доступно на iOS и Android</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#ADC178] rounded-lg">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#6C584C]">Защищённое хранение данных</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#ADC178] rounded-lg">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#6C584C]">Работает без интернета (частично)</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY0MjQ1MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Интерфейс приложения"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Часто задаваемые вопросы
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Ответы на популярные вопросы о работе с приложением
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
                      className={`w-5 h-5 text-[#ADC178] transition-transform flex-shrink-0 ml-4 ${
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

      {/* Documentation CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[#6C584C] mb-6" style={{ fontSize: '36px', fontWeight: '700' }}>
              Нужна дополнительная помощь?
            </h2>
            <p className="text-[#6C584C]/70 mb-8" style={{ fontSize: '18px' }}>
              Посмотрите наши обучающие материалы или свяжитесь с поддержкой
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/clients/training">
                <button className="px-8 py-4 bg-[#ADC178] hover:bg-[#9BB167] text-white rounded-lg transition-colors">
                  Перейти к обучению
                </button>
              </a>
              <a href="/support">
                <button className="px-8 py-4 bg-white border-2 border-[#ADC178] text-[#ADC178] hover:bg-[#ADC178] hover:text-white rounded-lg transition-colors">
                  Написать в поддержку
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
