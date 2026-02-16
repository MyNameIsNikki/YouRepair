import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { User, Wrench, ChevronRight, CheckCircle, FileText, Image as ImageIcon } from 'lucide-react';

export function DemoSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F0EAD2]/20">
      <Navigation />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
              <Link to="/" className="hover:text-[#ADC178]">Главная</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#6C584C]">Демо-доступ</span>
            </div>
            
            <h1 className="text-[#6C584C] mb-4" style={{ fontSize: '36px', fontWeight: '700' }}>
              Выберите режим демонстрации
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Познакомьтесь с возможностями платформы ВашРемонт в роли заказчика или бригадира
            </p>
          </div>

          {/* Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Client Demo */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-[#ADC178] to-[#DDE5B6] p-8 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8" />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: '700' }} className="mb-2">
                  Демо для заказчика
                </h2>
                <p className="text-white/90">
                  Управляйте ремонтом вашей квартиры
                </p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Просматривайте все комнаты и задачи в режиме реального времени
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Формируйте детальные отчеты по каждой задаче с материалами и медиа
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ImageIcon className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Смотрите фото и видео хода работ, отслеживайте расходы
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ADC178] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Создавайте тикеты для общения с бригадой
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/demo/client')}
                  className="w-full bg-[#ADC178] hover:bg-[#9BB167] text-white mt-4"
                  size="lg"
                >
                  Открыть демо заказчика
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Brigade Demo */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-[#A98467] to-[#6C584C] p-8 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Wrench className="w-8 h-8" />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: '700' }} className="mb-2">
                  Демо для бригадира
                </h2>
                <p className="text-white/90">
                  Управляйте рабочими процессами и задачами
                </p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#A98467] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Просматривайте все задачи и их статусы по комнатам
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ImageIcon className="w-5 h-5 text-[#A98467] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Загружайте фото и видео выполненных работ
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#A98467] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Добавляйте информацию о материалах с чеками
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#A98467] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Просматривайте тикеты и замечания от заказчика
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/demo/brigade')}
                  className="w-full bg-[#A98467] hover:bg-[#8B6D57] text-white mt-4"
                  size="lg"
                >
                  Открыть демо бригадира
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-[#F0EAD2] to-[#DDE5B6] rounded-2xl p-8 text-center">
            <h3 className="text-[#6C584C] mb-3" style={{ fontSize: '20px', fontWeight: '600' }}>
              Это демонстрационная версия
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Все данные в демо являются примерными и служат для демонстрации возможностей платформы. 
              В реальной версии вся информация сохраняется в защищенной базе данных, 
              а пользователи получают доступ через личный кабинет с полноценной аутентификацией.
            </p>
          </div>
        </div>
      </main>

      <InternalFooter />
    </div>
  );
}
