import { Task } from '../../types/demo';
import { X, Download, FileText, Calendar, User, Package, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { TaskStatusBadge } from './TaskStatusBadge';

interface PDFReportProps {
  task: Task;
  roomName: string;
  apartmentName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PDFReport({ task, roomName, apartmentName, isOpen, onClose }: PDFReportProps) {
  const totalMaterialsCost = task.materials.reduce((sum, mat) => sum + mat.price, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#ADC178]" />
              <span>Отчет по задаче</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                alert('В реальной версии здесь будет скачивание PDF-файла');
              }}
            >
              <Download className="w-4 h-4" />
              Скачать PDF
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4 bg-white">
          {/* Header */}
          <div className="border-b border-[#DDE5B6] pb-4">
            <div className="text-center mb-4">
              <h1 className="text-[#6C584C]" style={{ fontSize: '24px', fontWeight: '700' }}>
                ВашРемонт
              </h1>
              <p className="text-sm text-gray-600">Отчет по выполненной задаче</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Объект:</p>
                <p className="text-[#6C584C]">{apartmentName}</p>
              </div>
              <div>
                <p className="text-gray-600">Помещение:</p>
                <p className="text-[#6C584C]">{roomName}</p>
              </div>
              <div>
                <p className="text-gray-600">Дата формирования:</p>
                <p className="text-[#6C584C]">{new Date().toLocaleDateString('ru-RU')}</p>
              </div>
              <div>
                <p className="text-gray-600">Номер отчета:</p>
                <p className="text-[#6C584C]">#{task.id.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Task Info */}
          <div className="space-y-3">
            <h2 className="text-[#6C584C]" style={{ fontSize: '18px', fontWeight: '600' }}>
              Информация о задаче
            </h2>
            <div className="bg-[#F0EAD2]/30 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[#6C584C]" style={{ fontWeight: '600' }}>{task.name}</h3>
                <TaskStatusBadge status={task.status} />
              </div>
              <p className="text-sm text-gray-700">{task.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                {task.assignedTo && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#ADC178]" />
                    <span className="text-gray-600">Исполнитель:</span>
                    <span className="text-[#6C584C]">{task.assignedTo}</span>
                  </div>
                )}
                {task.dueDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#ADC178]" />
                    <span className="text-gray-600">Срок:</span>
                    <span className="text-[#6C584C]">
                      {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Materials */}
          {task.materials.length > 0 && (
            <div className="space-y-3">
              <h2 className="flex items-center gap-2 text-[#6C584C]" style={{ fontSize: '18px', fontWeight: '600' }}>
                <Package className="w-5 h-5" />
                Материалы
              </h2>
              <div className="space-y-2">
                {task.materials.map((material) => (
                  <div key={material.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[#6C584C]" style={{ fontWeight: '600' }}>{material.name}</p>
                        <p className="text-sm text-gray-600">Количество: {material.quantity}</p>
                      </div>
                      <p className="text-[#ADC178]" style={{ fontWeight: '600' }}>
                        {material.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">{material.receipt}</p>
                    <p className="text-xs text-gray-500">
                      Дата закупки: {new Date(material.purchaseDate).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                ))}
                <div className="bg-[#ADC178]/10 p-3 rounded-lg flex justify-between items-center border border-[#ADC178]">
                  <span className="text-[#6C584C]" style={{ fontWeight: '600' }}>Итого по материалам:</span>
                  <span className="text-[#ADC178]" style={{ fontSize: '18px', fontWeight: '700' }}>
                    {totalMaterialsCost.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Media */}
          {task.media.length > 0 && (
            <div className="space-y-3">
              <h2 className="flex items-center gap-2 text-[#6C584C]" style={{ fontSize: '18px', fontWeight: '600' }}>
                <ImageIcon className="w-5 h-5" />
                Медиа-материалы
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {task.media.map((media) => (
                  <div key={media.id} className="bg-gray-50 p-3 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#ADC178]"></div>
                      <span className="text-sm text-[#6C584C]" style={{ fontWeight: '600' }}>
                        {media.type === 'photo' ? 'Фотография' : 'Видео'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Загрузил: {media.uploadedBy}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(media.uploadDate).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-[#DDE5B6] pt-4 text-center text-sm text-gray-500">
            <p>Данный отчет создан автоматически платформой ВашРемонт</p>
            <p>© 2026 ВашРемонт. Все права защищены.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
