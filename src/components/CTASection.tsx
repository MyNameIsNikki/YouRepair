import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Send, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface CTASectionProps {
  isVisible?: boolean;
}

export function CTASection({ isVisible }: CTASectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Заявка отправлена! Ольга свяжется с вами в ближайшее время.');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="cta"
      data-section="cta"
      className="py-20 lg:py-32 bg-[#F0EAD2]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-[#6C584C] mb-4" style={{ fontSize: '42px', fontWeight: '700' }}>
            Готовы начать?
          </h2>
          <p className="text-[#6C584C]/70 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Получите бесплатный демо-доступ и персональную консультацию
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-[#6C584C] mb-6" style={{ fontSize: '24px', fontWeight: '600' }}>
                Заполните форму
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[#6C584C] mb-2 block">
                    Имя *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Как вас зовут?"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-[#DDE5B6] focus:border-[#ADC178] focus:ring-[#ADC178]"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#6C584C] mb-2 block">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ваш@email.ru"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-[#DDE5B6] focus:border-[#ADC178] focus:ring-[#ADC178]"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#6C584C] mb-2 block">
                    Телефон *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border-[#DDE5B6] focus:border-[#ADC178] focus:ring-[#ADC178]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-[#ADC178] hover:bg-[#9BB167] text-white h-12"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="mr-2 w-5 h-5" />
                      Отправлено!
                    </>
                  ) : isSubmitting ? (
                    'Отправка...'
                  ) : (
                    <>
                      Получить демо-доступ
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                <p className="text-[#6C584C]/60 text-sm text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </div>
          </div>

          {/* Manager Info */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col justify-center">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#ADC178]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1612116144300-1714b6fa528a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGNvbnN1bHRhbnR8ZW58MXx8fHwxNzYzNDQ5MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Ольга, консультант"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-[#6C584C] mb-2" style={{ fontSize: '24px', fontWeight: '600' }}>
                  Ольга
                </h4>
                <p className="text-[#ADC178]" style={{ fontWeight: '600' }}>
                  Ваш персональный консультант
                </p>
              </div>

              <div className="space-y-4 text-[#6C584C]/70">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#ADC178] mt-0.5 flex-shrink-0" />
                  <span>Проведу демонстрацию всех возможностей платформы</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#ADC178] mt-0.5 flex-shrink-0" />
                  <span>Помогу настроить первый проект под ваши задачи</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#ADC178] mt-0.5 flex-shrink-0" />
                  <span>Отвечу на все вопросы по работе с системой</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#ADC178] mt-0.5 flex-shrink-0" />
                  <span>Подберу оптимальный тарифный план</span>
                </p>
              </div>

              <div className="mt-8 p-4 bg-[#F0EAD2] rounded-xl">
                <p className="text-[#6C584C] text-center text-sm">
                  Обычно отвечаю в течение <span style={{ fontWeight: '600' }}>15 минут</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
