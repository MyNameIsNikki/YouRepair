import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { TaskStatusBadge } from '../../components/demo/TaskStatusBadge';
import { PDFReport } from '../../components/demo/PDFReport';
import { 
  ChevronRight, 
  ChevronLeft,
  FileText,
  Package,
  Image as ImageIcon,
  Video,
  User,
  Calendar,
  MessageSquare,
  Download
} from 'lucide-react';
import { mockApartment } from '../../data/mockApartment';
import { Task } from '../../types/demo';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function DemoClientRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const room = mockApartment.rooms.find(r => r.id === roomId);

  if (!room) {
    return <div>Комната не найдена</div>;
  }

  const handleCreateTicket = (task: Task) => {
    alert(`Создание тикета для задачи "${task.name}"\n\nЭто демо-функция. В реальной версии здесь откроется форма создания тикета.`);
  };

  const handleGenerateReport = (task: Task) => {
    setSelectedTask(task);
    setIsReportOpen(true);
  };

  const getMediaImage = (url: string) => {
    // Map mock URLs to actual Unsplash images
    const imageMap: { [key: string]: string } = {
      'flooring installation': 'https://images.unsplash.com/photo-1731185752376-a4cf3e8556fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vcmluZyUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NjgzNzY0MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'wooden floor finish': 'https://images.unsplash.com/photo-1673924968581-c18b53d64e22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBmbG9vciUyMGZpbmlzaHxlbnwxfHx8fDE3Njg0MzA4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'wall painting progress': 'https://images.unsplash.com/photo-1717572416116-358e452f7f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwcGFpbnRpbmclMjBwcm9ncmVzc3xlbnwxfHx8fDE3Njg0MzA3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'kitchen tiles': 'https://images.unsplash.com/photo-1523350165414-082d792c4bcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdGlsZXN8ZW58MXx8fHwxNzY4NDMwNzU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'kitchen cabinet installation': 'https://images.unsplash.com/photo-1686023858213-9653d3248fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY2FiaW5ldCUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3Njg0MzA4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'bathroom tiles modern': 'https://images.unsplash.com/photo-1590880265945-6b43effeb599?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHRpbGVzJTIwbW9kZXJufGVufDF8fHx8MTc2ODQzMDc1OXww&ixlib=rb-4.1.0&q=80&w=1080',
      'bathroom renovation': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHJlbm92YXRpb258ZW58MXx8fHwxNzY4MzQyNDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'bedroom wallpaper': 'https://images.unsplash.com/photo-1672130515395-32583062f72b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwd2FsbHBhcGVyfGVufDF8fHx8MTc2ODQzMDg2Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    };
    return imageMap[url] || 'https://images.unsplash.com/photo-1731185752376-a4cf3e8556fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vcmluZyUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NjgzNzY0MzN8MA&ixlib=rb-4.1.0&q=80&w=1080';
  };

  return (
    <div className="min-h-screen bg-[#F0EAD2]/20">
      <Navigation />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-[#ADC178]">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/demo/client" className="hover:text-[#ADC178]">Демо для заказчика</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#6C584C]">{room.name}</span>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate('/demo/client')}
            className="mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Назад к квартире
          </Button>

          {/* Room Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[#6C584C] mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
                  {room.name}
                </h1>
                <p className="text-gray-600">Площадь: {room.area} м² • {room.tasks.length} задач</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Прогресс выполнения</p>
                <p className="text-[#ADC178]" style={{ fontSize: '24px', fontWeight: '700' }}>
                  {Math.round((room.tasks.filter(t => t.status === 'completed').length / room.tasks.length) * 100)}%
                </p>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-4">
            {room.tasks.map((task) => (
              <Card key={task.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[#6C584C]" style={{ fontSize: '20px', fontWeight: '600' }}>
                        {task.name}
                      </h3>
                      <TaskStatusBadge status={task.status} />
                    </div>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      {task.assignedTo && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4 text-[#ADC178]" />
                          <span>{task.assignedTo}</span>
                        </div>
                      )}
                      {task.dueDate && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-[#ADC178]" />
                          <span>{new Date(task.dueDate).toLocaleDateString('ru-RU')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCreateTicket(task)}
                      className="gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Создать тикет
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleGenerateReport(task)}
                      className="bg-[#ADC178] hover:bg-[#9BB167] text-white gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Отчет
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="materials" className="w-full">
                  <TabsList className="w-full justify-start border-b border-[#DDE5B6] bg-transparent rounded-none h-auto p-0">
                    <TabsTrigger 
                      value="materials" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ADC178] data-[state=active]:bg-transparent"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Материалы ({task.materials.length})
                    </TabsTrigger>
                    <TabsTrigger 
                      value="media"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ADC178] data-[state=active]:bg-transparent"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Медиа ({task.media.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="materials" className="mt-4">
                    {task.materials.length > 0 ? (
                      <div className="space-y-3">
                        {task.materials.map((material) => (
                          <div key={material.id} className="bg-[#F0EAD2]/20 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-[#6C584C]" style={{ fontWeight: '600' }}>
                                  {material.name}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  Количество: {material.quantity}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{material.receipt}</p>
                                <p className="text-xs text-gray-500">
                                  Дата закупки: {new Date(material.purchaseDate).toLocaleDateString('ru-RU')}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-[#ADC178]" style={{ fontSize: '18px', fontWeight: '700' }}>
                                  {material.price.toLocaleString('ru-RU')} ₽
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="bg-[#ADC178]/10 p-3 rounded-lg flex justify-between items-center border border-[#ADC178]">
                          <span className="text-[#6C584C]" style={{ fontWeight: '600' }}>
                            Итого:
                          </span>
                          <span className="text-[#ADC178]" style={{ fontSize: '18px', fontWeight: '700' }}>
                            {task.materials.reduce((sum, m) => sum + m.price, 0).toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>Материалы пока не добавлены</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="media" className="mt-4">
                    {task.media.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {task.media.map((media) => (
                          <div key={media.id} className="group relative">
                            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                              {media.type === 'photo' ? (
                                <ImageWithFallback 
                                  src={getMediaImage(media.url)}
                                  alt={`Media ${media.id}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                  <Video className="w-12 h-12 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="mt-2">
                              <p className="text-xs text-gray-600">
                                Загрузил: {media.uploadedBy}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(media.uploadDate).toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>Медиа-файлы пока не добавлены</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {selectedTask && (
        <PDFReport
          task={selectedTask}
          roomName={room.name}
          apartmentName={mockApartment.name}
          isOpen={isReportOpen}
          onClose={() => {
            setIsReportOpen(false);
            setSelectedTask(null);
          }}
        />
      )}

      <InternalFooter />
    </div>
  );
}
