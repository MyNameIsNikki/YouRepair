import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MessageCircle } from 'lucide-react';

export function InternalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#6C584C] text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Slogan */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-[#ADC178] rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>ВашРемонт</span>
            </Link>
            <p className="text-white/70 mb-4">
              Ремонт без стресса и конфликтов
            </p>
            <p className="text-white/50 text-sm">
              Цифровая платформа для прозрачного управления строительными проектами
            </p>
          </div>

          {/* Для Заказчиков */}
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
              Для Заказчиков
            </h4>
            <div className="space-y-2">
              <Link to="/clients/advantages" className="block text-white/70 hover:text-white transition-colors">
                Преимущества и Тарифы
              </Link>
              <Link to="/clients/gallery" className="block text-white/70 hover:text-white transition-colors">
                Галерея и Отзывы
              </Link>
              <Link to="/clients/functionality" className="block text-white/70 hover:text-white transition-colors">
                Функционал
              </Link>
              <Link to="/clients/training" className="block text-white/70 hover:text-white transition-colors">
                Обучение
              </Link>
            </div>
          </div>

          {/* Для Бригад */}
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
              Для Бригад
            </h4>
            <div className="space-y-2">
              <Link to="/brigades/advantages" className="block text-white/70 hover:text-white transition-colors">
                Преимущества и Тарифы
              </Link>
              <Link to="/brigades/reviews" className="block text-white/70 hover:text-white transition-colors">
                Отзывы бригад
              </Link>
              <Link to="/brigades/functionality" className="block text-white/70 hover:text-white transition-colors">
                Функционал
              </Link>
              <Link to="/brigades/training" className="block text-white/70 hover:text-white transition-colors">
                Обучение
              </Link>
            </div>
          </div>

          {/* Техническая поддержка */}
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
              Техническая поддержка
            </h4>
            <div className="space-y-3 mb-4">
              <a
                href="tel:+79515192562"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+7 (951) 519-25-62</span>
              </a>
              <a
                href="mailto:masolove@sfedu.ru"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>masolove@sfedu.ru</span>
              </a>
              <Link
                to="/support"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Форма обращения</span>
              </Link>
            </div>
            <div className="space-y-2">
              <Link to="/about" className="block text-white/70 hover:text-white transition-colors text-sm">
                О компании
              </Link>
              <a href="#" className="block text-white/70 hover:text-white transition-colors text-sm">
                Политика конфиденциальности
              </a>
              <a href="#" className="block text-white/70 hover:text-white transition-colors text-sm">
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {currentYear} ВашРемонт. Все права защищены
            </p>
            <p className="text-white/50 text-sm text-center md:text-right">
              Платформа не предназначена для сбора персональных данных и конфиденциальной информации
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
