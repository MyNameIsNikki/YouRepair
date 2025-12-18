import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { Play, FileText, Clock, Zap } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function BrigadesTraining() {
  const videos = [
    {
      title: 'Регистрация и настройка профиля бригады',
      duration: '6 минут',
      description: 'Как создать привлекательный профиль, который принесёт вам больше заказов',
      topics: ['Регистрация', 'Заполнение профиля', 'Портфолио', 'Настройка уведомлений'],
    },
    {
      title: 'Составление смет и расчёт материалов',
      duration: '15 минут',
      description: 'Подробное руководство по использованию калькулятора смет',
      topics: ['Калькулятор', 'База материалов', 'Работа с шаблонами', 'Отправка заказчику'],
    },
    {
      title: 'Управление проектами и командой',
      duration: '12 минут',
      description: 'Как эффективно координировать работу бригады через приложение',
      topics: ['Создание проекта', 'Добавление членов бригады', 'Распределение задач', 'Контроль выполнения'],
    },
    {
      title: 'Фото отчётность и коммуникация',
      duration: '8 минут',
      description: 'Как правильно документировать работы и общаться с заказчиками',
      topics: ['Загрузка фото', 'Комментарии', 'Чат с заказчиком', 'Видеозвонки'],
    },
    {
      title: 'Документы и электронная подпись',
      duration: '10 минут',
      description: 'Работа с договорами, актами и электронным документооборотом',
      topics: ['Создание актов', 'Электронная подпись', 'Хранение документов', 'Согласование'],
    },
    {
      title: 'Получение и увеличение заказов',
      duration: '14 минут',
      description: 'Стратегии повышения рейтинга и привлечения новых клиентов',
      topics: ['Работа с отзывами', 'Повышение рейтинга', 'Продвижение профиля', 'Работа с повторными клиентами'],
    },
  ];

  const guides = [
    {
      icon: FileText,
      title: 'Руководство для бригад',
      description: 'Полная инструкция по всем возможностям платформы',
      format: 'PDF, 38 страниц',
    },
    {
      icon: Zap,
      title: 'Быстрый старт',
      description: 'Как начать получать заказы в первую неделю',
      format: 'PDF, 4 страницы',
    },
    {
      icon: FileText,
      title: 'Шаблоны смет',
      description: 'Готовые шаблоны для разных видов работ',
      format: 'Excel, 12 шаблонов',
    },
  ];

  const tips = [
    {
      title: 'Заполните профиль полностью',
      description: 'Бригады с полным профилем получают на 70% больше заказов',
      icon: '📝',
    },
    {
      title: 'Загружайте фото регулярно',
      description: 'Это повышает доверие заказчиков и защищает от споров',
      icon: '📸',
    },
    {
      title: 'Отвечайте быстро',
      description: 'Среднее время ответа влияет на ваш рейтинг в системе',
      icon: '⚡',
    },
    {
      title: 'Просите отзывы',
      description: 'Довольные клиенты часто забывают оставить отзыв - напомните им',
      icon: '⭐',
    },
    {
      title: 'Используйте шаблоны',
      description: 'Создавайте шаблоны смет для типовых работ - это экономит время',
      icon: '🔧',
    },
    {
      title: 'Обучите бригаду',
      description: 'Все члены бригады должны уметь работать с приложением',
      icon: '👥',
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
              Обучение для Бригад
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
              Станьте профессионалом в использовании платформы
            </p>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Видеоуроки
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Пошаговые инструкции по работе с платформой
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-[#DDE5B6] overflow-hidden hover:border-[#A98467] hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-video bg-[#F0EAD2] group">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1758272421523-9b2a777083ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpZGVvfGVufDF8fHx8MTc2NDI3NjY4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-[#A98467] ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-[#6C584C] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[#6C584C] mb-3" style={{ fontSize: '18px', fontWeight: '600' }}>
                      {video.title}
                    </h3>
                    <p className="text-[#6C584C]/70 text-sm mb-4">
                      {video.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {video.topics.map((topic, tIndex) => (
                        <span
                          key={tIndex}
                          className="px-2 py-1 bg-[#F0EAD2] text-[#6C584C] rounded text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Документация
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Полезные материалы для скачивания
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {guides.map((guide, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#DDE5B6] hover:border-[#A98467] cursor-pointer"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A98467] rounded-2xl mb-6">
                    <guide.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-[#6C584C] mb-3" style={{ fontSize: '20px', fontWeight: '600' }}>
                    {guide.title}
                  </h3>
                  <p className="text-[#6C584C]/70 mb-4 text-sm">
                    {guide.description}
                  </p>
                  <p className="text-[#6C584C]/50 text-xs mb-4">
                    {guide.format}
                  </p>
                  <button className="w-full py-3 bg-[#A98467] hover:bg-[#8F7159] text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Скачать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 bg-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Советы профессионалов
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Как получить максимум от платформы
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border-2 border-[#DDE5B6] hover:border-[#A98467] transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h3 className="text-[#6C584C] mb-2" style={{ fontSize: '18px', fontWeight: '600' }}>
                    {tip.title}
                  </h3>
                  <p className="text-[#6C584C]/70 text-sm">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#A98467] to-[#6C584C] rounded-3xl p-12 text-center">
              <h2 className="text-white mb-4" style={{ fontSize: '32px', fontWeight: '700' }}>
                Нужна помощь?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Мы проводим бесплатные групповые вебинары и индивидуальные консультации для бригад
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/support">
                  <button className="px-8 py-4 bg-white text-[#A98467] hover:bg-[#F0EAD2] rounded-lg transition-colors">
                    Записаться на вебинар
                  </button>
                </a>
                <a href="tel:+79515192562">
                  <button className="px-8 py-4 bg-[#6C584C] hover:bg-[#5A4A40] text-white rounded-lg transition-colors">
                    Позвонить: +7 (951) 519-25-62
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
