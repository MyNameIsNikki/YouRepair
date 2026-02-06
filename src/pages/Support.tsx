import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { InternalFooter } from '../components/InternalFooter';
import { Mail, Phone, MessageCircle, Send, HelpCircle, FileQuestion, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Mock form submission
    toast.success('Ваше обращение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const faqItems = [
    {
      question: 'Как начать работу с платформой?',
      answer: 'Оставьте заявку на демо-доступ на главной странице, и наш специалист проведет вам персональную демонстрацию платформы и поможет с настройкой.',
    },
    {
      question: 'Какие устройства поддерживаются?',
      answer: 'Платформа работает на всех современных устройствах: компьютерах, планшетах и смартфонах. Доступны веб-версия и мобильное приложение для iOS и Android.',
    },
    {
      question: 'Как происходит оплата?',
      answer: 'Мы принимаем оплату банковскими картами, по счету для юридических лиц. Все тарифы включают 14 дней бесплатного пробного периода.',
    },
    {
      question: 'Можно ли сменить тариф?',
      answer: 'Да, вы можете в любой момент повысить или понизить свой тариф. При повышении доступ к новым функциям открывается моментально.',
    },
    {
      question: 'Как хранятся мои данные?',
      answer: 'Все данные хранятся на защищенных серверах с резервным копированием. Мы соблюдаем все требования по защите персональных данных.',
    },
    {
      question: 'Есть ли техническая поддержка?',
      answer: 'Да, наша техподдержка доступна по телефону, email и через форму обратной связи. Для премиум-пользователей - круглосуточная поддержка.',
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Телефон',
      value: '+7 (951) 519-25-62',
      href: 'tel:+79515192562',
      description: 'Пн-Пт, 9:00-18:00 МСК',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'masolove@sfedu.ru',
      href: 'mailto:masolove@sfedu.ru',
      description: 'Ответим в течение 24 часов',
    },
    {
      icon: MessageCircle,
      title: 'Онлайн-чат',
      value: 'Чат на сайте',
      href: '#',
      description: 'Быстрые ответы в рабочее время',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center pt-20"
        style={{
          background: 'linear-gradient(135deg, #ADC178 0%, #6C584C 100%)',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white mb-6" style={{ fontSize: '48px', fontWeight: '800' }}>
              Техническая поддержка
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
              Мы всегда готовы помочь вам с любыми вопросами по работе с платформой
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#6C584C] mb-12 text-center" style={{ fontSize: '38px', fontWeight: '700' }}>
              Свяжитесь с нами
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  className="bg-gradient-to-br from-[#F0EAD2] to-white p-8 rounded-2xl border-2 border-[#DDE5B6] hover:border-[#ADC178] transition-all duration-300 hover:shadow-xl text-center"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-[#ADC178] rounded-2xl mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-[#6C584C] mb-2" style={{ fontSize: '22px', fontWeight: '600' }}>
                    {method.title}
                  </h3>
                  <p className="text-[#ADC178] mb-2" style={{ fontSize: '18px', fontWeight: '600' }}>
                    {method.value}
                  </p>
                  <p className="text-[#6C584C]/60 text-sm">
                    {method.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Image */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl border-2 border-[#DDE5B6]">
                <h2 className="text-[#6C584C] mb-2" style={{ fontSize: '32px', fontWeight: '700' }}>
                  Форма обращения
                </h2>
                <p className="text-[#6C584C]/70 mb-8">
                  Заполните форму, и мы свяжемся с вами в ближайшее время
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[#6C584C] mb-2" style={{ fontWeight: '600' }}>
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#DDE5B6] rounded-lg focus:border-[#ADC178] focus:outline-none transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6C584C] mb-2" style={{ fontWeight: '600' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#DDE5B6] rounded-lg focus:border-[#ADC178] focus:outline-none transition-colors"
                      placeholder="example@mail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6C584C] mb-2" style={{ fontWeight: '600' }}>
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-[#DDE5B6] rounded-lg focus:border-[#ADC178] focus:outline-none transition-colors"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6C584C] mb-2" style={{ fontWeight: '600' }}>
                      Категория вопроса
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-[#DDE5B6] rounded-lg focus:border-[#ADC178] focus:outline-none transition-colors bg-white"
                    >
                      <option value="">Выберите категорию</option>
                      <option value="technical">Технический вопрос</option>
                      <option value="billing">Вопрос по оплате</option>
                      <option value="functionality">Вопрос по функционалу</option>
                      <option value="cooperation">Сотрудничество</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#6C584C] mb-2" style={{ fontWeight: '600' }}>
                      Ваше сообщение *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-[#DDE5B6] rounded-lg focus:border-[#ADC178] focus:outline-none transition-colors resize-none"
                      placeholder="Опишите ваш вопрос или проблему..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#ADC178] hover:bg-[#9BB167] text-white py-6 text-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Отправить обращение
                  </Button>

                  <p className="text-[#6C584C]/60 text-sm text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </div>

              {/* Image & Info */}
              <div className="space-y-8">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1653212883731-4d5bc66e0181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjB0ZWFtfGVufDF8fHx8MTc2NDI2ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Служба поддержки"
                    className="w-full h-[300px] object-cover"
                  />
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-[#ADC178] shadow-lg">
                  <Clock className="w-12 h-12 text-[#ADC178] mb-4" />
                  <h3 className="text-[#6C584C] mb-4" style={{ fontSize: '24px', fontWeight: '700' }}>
                    Время ответа
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Email: в течение 24 часов</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Телефон: моментально в рабочее время</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6C584C]">Премиум поддержка: 24/7</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#ADC178] to-[#6C584C] p-8 rounded-2xl text-white shadow-lg">
                  <HelpCircle className="w-12 h-12 mb-4" />
                  <h3 className="mb-3" style={{ fontSize: '22px', fontWeight: '700' }}>
                    Нужна срочная помощь?
                  </h3>
                  <p className="text-white/90 mb-4">
                    Позвоните нам напрямую, и мы поможем решить вашу проблему прямо сейчас
                  </p>
                  <a href="tel:+79515192562">
                    <Button className="w-full bg-white text-[#ADC178] hover:bg-[#F0EAD2]">
                      <Phone className="w-5 h-5 mr-2" />
                      Позвонить
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F0EAD2]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <FileQuestion className="w-16 h-16 text-[#ADC178] mx-auto mb-4" />
              <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '38px', fontWeight: '700' }}>
                Часто задаваемые вопросы
              </h2>
              <p className="text-[#6C584C]/70" style={{ fontSize: '18px' }}>
                Возможно, ответ на ваш вопрос уже есть здесь
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="bg-white p-6 rounded-xl border-2 border-[#DDE5B6] hover:border-[#ADC178] transition-all duration-300 group"
                >
                  <summary className="cursor-pointer text-[#6C584C] list-none flex items-center justify-between" style={{ fontSize: '18px', fontWeight: '600' }}>
                    <span>{item.question}</span>
                    <ChevronDown className="w-5 h-5 text-[#ADC178] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="text-[#6C584C]/70 mt-4 pl-2">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-[#6C584C]/70 mb-4">
                Не нашли ответ на свой вопрос?
              </p>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-[#ADC178] hover:bg-[#9BB167] text-white px-8"
              >
                Задать вопрос
              </Button>
            </div>
          </div>
        </div>
      </section>

      <InternalFooter />
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
