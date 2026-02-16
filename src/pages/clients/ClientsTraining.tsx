import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { Play, FileText, MessageCircle, CheckCircle2, Clock, Users } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function ClientsTraining() {
  const videos = [
    {
      title: 'Начало работы: Создание первого проекта',
      duration: '8 минут',
      description: 'Пошаговая инструкция по созданию проекта, настройке основных параметров и приглашению бригады.',
      thumbnail: 'https://images.unsplash.com/photo-1758272421523-9b2a777083ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpZGVvfGVufDF8fHx8MTc2NDI3NjY4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      topics: ['Регистрация', 'Создание проекта', 'Настройка параметров', 'Приглашение команды'],
    },
    {
      title: 'Управление бюджетом и контроль расходов',
      duration: '12 минут',
      description: 'Как настроить бюджет, отслеживать расходы и получать уведомления о перерасходах.',
      thumbnail: 'https://images.unsplash.com/photo-1758272421523-9b2a777083ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpZGVvfGVufDF8fHx8MTc2NDI3NjY4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      topics: ['Планирование бюджета', 'Учёт расходов', 'Финансовые отчёты', 'Оптимизация затрат'],
    },
    {
      title: 'Коммуникация с бригадой',
      duration: '10 минут',
      description: 'Эффективное общение через чат, обмен документами и организация видеозвонков.',
      thumbnail: 'https://images.unsplash.com/photo-1758272421523-9b2a777083ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpZGVvfGVufDF8fHx8MTc2NDI3NjY4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      topics: ['Чат и сообщения', 'Отправка файлов', 'Видеозвонки', 'Управление уведомлениями'],
    },
    {
      title: 'Контроль качества через фото отчёты',
      duration: '7 минут',
      description: 'Как просматривать фото отчёты, оставлять комментарии и запрашивать исправления.',
      thumbnail: 'https://images.unsplash.com/photo-1758272421523-9b2a777083ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpZGVvfGVufDF8fHx8MTc2NDI3NjY4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      topics: ['Просмотр отчётов', 'Комментирование', 'Запрос доработок', 'Архив фотографий'],
    },
    {
      title: 'Работа с документами и подписание актов',
      duration: '9 минут',
      description: 'Управление документооборотом, электронная подпись и хранение договоров.',
      thumbnail: 'https://images.unsplash.com/photo-1758272421523-9b2a777083ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpZGVvfGVufDF8fHx8MTc2NDI3NjY4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      topics: ['Загрузка документов', 'Электронная подпись', 'Хранение файлов', 'Экспорт отчётов'],
    },
    {
      title: 'Завершение проекта и приёмка работ',
      duration: '11 минут',
      description: 'Финальная проверка, подписание актов и оценка работы бригады.',
      thumbnail: 'https://images.unsplash.com/photo-1758272421523-9b2a777083ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpZGVvfGVufDF8fHx8MTc2NDI3NjY4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      topics: ['Финальный осмотр', 'Подписание актов', 'Оценка бригады', 'Закрытие проекта'],
    },
  ];

  const guides = [
    {
      icon: FileText,
      title: 'Полное руководство пользователя',
      description: 'Детальная документация по всем функциям приложения',
      format: 'PDF, 45 страниц',
    },
    {
      icon: MessageCircle,
      title: 'Шпаргалка по быстрому старту',
      description: 'Краткий гайд для моментального погружения',
      format: 'PDF, 5 страниц',
    },
    {
      icon: CheckCircle2,
      title: 'Чек-лист успешного ремонта',
      description: 'Пошаговый план действий для идеального результата',
      format: 'PDF, 3 страницы',
    },
  ];

  const tips = [
    {
      title: 'Настройте уведомления',
      description: 'Включите push-уведомления, чтобы не пропустить важные обновления от бригады.',
      icon: '🔔',
    },
    {
      title: 'Еженедельные отчёты',
      description: 'Запросите у бригады еженедельные фото отчёты для лучшего контроля.',
      icon: '📸',
    },
    {
      title: 'Фиксируйте договоренности',
      description: 'Все важные решения обсуждайте в чате приложения - это создаст историю переписки.',
      icon: '💬',
    },
    {
      title: 'Используйте календарь',
      description: 'Отмечайте в календаре важные этапы и контрольные точки проекта.',
      icon: '📅',
    },
    {
      title: 'Контролируйте смету',
      description: 'Регулярно сверяйте плановые и фактические расходы.',
      icon: '💰',
    },
    {
      title: 'Задавайте вопросы',
      description: 'Не стесняйтесь обращаться в поддержку - мы всегда готовы помочь.',
      icon: '❓',
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
              Обучение для Заказчиков
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
              Научитесь эффективно использовать платформу для контроля вашего ремонта
            </p>
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Видеоуроки
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Пошаговые инструкции по работе с приложением
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-[#DDE5B6] overflow-hidden hover:border-[#ADC178] hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-video bg-[#F0EAD2] group">
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-[#ADC178] ml-1" />
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

      {/* Downloadable Guides */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Документация для скачивания
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Полезные материалы в формате PDF
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {guides.map((guide, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#DDE5B6] hover:border-[#ADC178] cursor-pointer"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-[#ADC178] rounded-2xl mb-6">
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
                  <button className="w-full py-3 bg-[#ADC178] hover:bg-[#9BB167] text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Скачать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Советы для эффективной работы
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Рекомендации от опытных пользователей
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border-2 border-[#DDE5B6] hover:border-[#ADC178] transition-all duration-300"
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

      {/* Support CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#ADC178] to-[#DDE5B6] rounded-3xl p-12 text-center">
              <Users className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-white mb-4" style={{ fontSize: '32px', fontWeight: '700' }}>
                Нужна персональная консультация?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Наши эксперты готовы провести индивидуальное обучение и ответить на все ваши вопросы
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/support">
                  <button className="px-8 py-4 bg-white text-[#ADC178] hover:bg-[#F0EAD2] rounded-lg transition-colors">
                    Записаться на консультацию
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
