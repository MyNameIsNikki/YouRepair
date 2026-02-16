import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import { InternalFooter } from '../../components/InternalFooter';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Home, 
  ChevronRight, 
  MapPin, 
  Maximize2,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Wrench
} from 'lucide-react';
import { mockApartment } from '../../data/mockApartment';
import { Room } from '../../types/demo';

export function DemoBrigade() {
  const navigate = useNavigate();
  const apartment = mockApartment;

  const getTasksStats = (room: Room) => {
    const completed = room.tasks.filter(t => t.status === 'completed').length;
    const inProgress = room.tasks.filter(t => t.status === 'in-progress').length;
    const pending = room.tasks.filter(t => t.status === 'pending').length;
    const review = room.tasks.filter(t => t.status === 'review').length;
    
    return { completed, inProgress, pending, review, total: room.tasks.length };
  };

  return (
    <div className="min-h-screen bg-[#F0EAD2]/20">
      <Navigation />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link to="/" className="hover:text-[#ADC178]">Главная</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#6C584C]">Демо для бригадира</span>
            </div>
            
            <div className="bg-gradient-to-r from-[#A98467] to-[#6C584C] rounded-2xl p-8 text-white mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <Wrench className="w-8 h-8" />
                    </div>
                    <div>
                      <h1 style={{ fontSize: '28px', fontWeight: '700' }}>{apartment.name}</h1>
                      <div className="flex items-center gap-2 text-white/90 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{apartment.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                    <Maximize2 className="w-4 h-4" />
                    <span style={{ fontWeight: '600' }}>{apartment.totalArea} м²</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Выполнено</span>
                  </div>
                  <p style={{ fontSize: '24px', fontWeight: '700' }}>
                    {apartment.rooms.reduce((sum, room) => 
                      sum + room.tasks.filter(t => t.status === 'completed').length, 0
                    )}
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm">В работе</span>
                  </div>
                  <p style={{ fontSize: '24px', fontWeight: '700' }}>
                    {apartment.rooms.reduce((sum, room) => 
                      sum + room.tasks.filter(t => t.status === 'in-progress').length, 0
                    )}
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">Ожидает</span>
                  </div>
                  <p style={{ fontSize: '24px', fontWeight: '700' }}>
                    {apartment.rooms.reduce((sum, room) => 
                      sum + room.tasks.filter(t => t.status === 'pending').length, 0
                    )}
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-5 h-5" />
                    <span className="text-sm">На проверке</span>
                  </div>
                  <p style={{ fontSize: '24px', fontWeight: '700' }}>
                    {apartment.rooms.reduce((sum, room) => 
                      sum + room.tasks.filter(t => t.status === 'review').length, 0
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800">
                <span style={{ fontWeight: '600' }}>Демо-режим для бригадира:</span> Вы можете просматривать комнаты, 
                задачи, загружать материалы и медиа-файлы, просматривать тикеты (демо).
              </p>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {apartment.rooms.map((room) => {
              const stats = getTasksStats(room);
              const progress = (stats.completed / stats.total) * 100;

              return (
                <Card 
                  key={room.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => navigate(`/demo/brigade/room/${room.id}`)}
                >
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-[#6C584C] mb-1" style={{ fontSize: '20px', fontWeight: '600' }}>
                          {room.name}
                        </h3>
                        <p className="text-sm text-gray-600">{room.area} м²</p>
                      </div>
                      <Badge className="bg-[#A98467] text-white">
                        {stats.total} задач
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Прогресс</span>
                        <span className="text-[#A98467]" style={{ fontWeight: '600' }}>
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#A98467] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Task Stats */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-green-700 text-xs" style={{ fontWeight: '600' }}>
                            {stats.completed}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">Готово</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-blue-700 text-xs" style={{ fontWeight: '600' }}>
                            {stats.inProgress}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">В работе</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-yellow-700 text-xs" style={{ fontWeight: '600' }}>
                            {stats.review}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">Проверка</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-gray-700 text-xs" style={{ fontWeight: '600' }}>
                            {stats.pending}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">Ожидает</p>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#A98467] hover:bg-[#8B6D57] text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/demo/brigade/room/${room.id}`);
                      }}
                    >
                      Открыть комнату
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <InternalFooter />
    </div>
  );
}
