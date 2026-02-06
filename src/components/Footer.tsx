import { Home, Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#6C584C] text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Slogan */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-[#ADC178] rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>ВашРемонт</span>
            </div>
            <p className="text-white/70 mb-4">
              Ремонт без стресса и конфликтов
            </p>
            <p className="text-white/50 text-sm">
              Цифровая платформа для прозрачного управления строительными проектами
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
              Контакты
            </h4>
            <div className="space-y-3">
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
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
              Информация
            </h4>
            <div className="space-y-2">
              <p className="text-white/50 text-sm">
                © {currentYear} ВашРемонт
              </p>
              <p className="text-white/50 text-sm">
                Все права защищены
              </p>
              <div className="pt-2">
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm block mb-1">
                  Политика конфиденциальности
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm block">
                  Пользовательское соглашение
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            Платформа не предназначена для сбора персональных данных и конфиденциальной информации
          </p>
        </div>
      </div>
    </footer>
  );
}
