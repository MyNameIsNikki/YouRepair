import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { CheckCircle, MessageSquare } from 'lucide-react';

interface TicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskName: string;
}

export function TicketsModal({ isOpen, onClose, taskName }: TicketsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#ADC178]" />
            <span>Тикеты по задаче</span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 bg-[#ADC178]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-[#ADC178]" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#ADC178] rounded-full flex items-center justify-center text-white" style={{ fontWeight: '700', fontSize: '18px' }}>
                0
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-[#6C584C]" style={{ fontSize: '18px', fontWeight: '600' }}>
                Нет активных тикетов
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                По задаче "{taskName}" нет замечаний или жалоб от заказчика. Работа выполняется отлично!
              </p>
            </div>

            <div className="w-full bg-[#F0EAD2]/30 p-4 rounded-lg mt-2">
              <p className="text-xs text-gray-600 text-center">
                В реальной версии здесь будет список тикетов с возможностью просмотра деталей и ответа на замечания
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
