import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { demoRequestAPI } from '../utils/api';
import { toast } from 'sonner@2.0.3';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface DemoRequestFormProps {
  onSuccess?: () => void;
}

export function DemoRequestForm({ onSuccess }: DemoRequestFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: 'client' as 'client' | 'brigade',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      setLoading(true);
      const response = await demoRequestAPI.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        userType: formData.userType,
        message: formData.message,
      });

      toast.success(response.message);
      setSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        userType: 'client',
        message: '',
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting demo request:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте снова.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#6C584C] mb-2">
          Спасибо за вашу заявку!
        </h3>
        <p className="text-[#6C584C]/70 mb-4">
          Мы свяжемся с вами в ближайшее время для предоставления доступа к демо.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="border-[#ADC178] text-[#ADC178] hover:bg-[#ADC178] hover:text-white"
        >
          Отправить еще одну заявку
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[#6C584C]">
          Ваше имя <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Иван Иванов"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="border-[#DDE5B6] focus:border-[#ADC178]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#6C584C]">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="border-[#DDE5B6] focus:border-[#ADC178]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-[#6C584C]">
          Телефон
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+7 (999) 123-45-67"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="border-[#DDE5B6] focus:border-[#ADC178]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[#6C584C]">
          Вы являетесь <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.userType}
          onValueChange={(value) => 
            setFormData({ ...formData, userType: value as 'client' | 'brigade' })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="client" id="client" />
            <Label htmlFor="client" className="font-normal cursor-pointer">
              Заказчиком (владелец квартиры/дома)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="brigade" id="brigade" />
            <Label htmlFor="brigade" className="font-normal cursor-pointer">
              Бригадиром (строительная бригада)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-[#6C584C]">
          Сообщение (опционально)
        </Label>
        <Textarea
          id="message"
          placeholder="Расскажите о вашем проекте..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="border-[#DDE5B6] focus:border-[#ADC178]"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ADC178] hover:bg-[#9BB167] text-white"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Отправка...
          </>
        ) : (
          'Получить доступ к демо'
        )}
      </Button>

      <p className="text-xs text-[#6C584C]/60 text-center">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
}
