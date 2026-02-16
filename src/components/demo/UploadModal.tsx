import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Upload, Package, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'material' | 'media';
  taskName: string;
}

export function UploadModal({ isOpen, onClose, type, taskName }: UploadModalProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);
    // Симуляция загрузки
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsUploading(false);
    
    const message = type === 'material' 
      ? 'Материал успешно добавлен' 
      : 'Медиа успешно загружено';
    
    toast.success(message);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'material' ? (
              <Package className="w-5 h-5 text-[#ADC178]" />
            ) : (
              <ImageIcon className="w-5 h-5 text-[#ADC178]" />
            )}
            <span>
              {type === 'material' ? 'Добавить материал' : 'Загрузить медиа'}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-[#F0EAD2]/30 p-3 rounded-lg">
            <p className="text-sm text-[#6C584C]">
              Задача: <span style={{ fontWeight: '600' }}>{taskName}</span>
            </p>
          </div>

          {type === 'material' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="material-name">Название материала</Label>
                <Input
                  id="material-name"
                  placeholder="Например: Краска интерьерная"
                  className="border-[#DDE5B6] focus:border-[#ADC178]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Количество</Label>
                  <Input
                    id="quantity"
                    placeholder="10 л"
                    className="border-[#DDE5B6] focus:border-[#ADC178]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Цена (₽)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="5000"
                    className="border-[#DDE5B6] focus:border-[#ADC178]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt">Чек</Label>
                <Input
                  id="receipt"
                  placeholder="Чек №12345 от 14.01.2026"
                  className="border-[#DDE5B6] focus:border-[#ADC178]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt-file">Фото чека</Label>
                <div className="border-2 border-dashed border-[#DDE5B6] rounded-lg p-6 text-center hover:border-[#ADC178] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-[#ADC178] mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Нажмите или перетащите файл</p>
                  <input
                    id="receipt-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="media-type">Тип медиа</Label>
                <select
                  id="media-type"
                  className="w-full border border-[#DDE5B6] rounded-md p-2 focus:border-[#ADC178] focus:outline-none"
                >
                  <option>Фотография</option>
                  <option>Видео</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="media-file">Файл</Label>
                <div className="border-2 border-dashed border-[#DDE5B6] rounded-lg p-8 text-center hover:border-[#ADC178] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-[#ADC178] mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Нажмите или перетащите файл</p>
                  <p className="text-xs text-gray-400">JPG, PNG или MP4 до 50MB</p>
                  <input
                    id="media-file"
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isUploading}
            >
              Отмена
            </Button>
            <Button
              onClick={handleUpload}
              className="flex-1 bg-[#ADC178] hover:bg-[#9BB167] text-white"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Загрузить
                </>
              )}
            </Button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <span style={{ fontWeight: '600' }}>Демо-режим:</span> Данные не будут сохранены. 
              В реальной версии все материалы и медиа сохраняются в системе.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
