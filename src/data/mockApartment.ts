import { Apartment } from '../types/demo';

export const mockApartment: Apartment = {
  id: 'apt-001',
  name: 'Квартира №47',
  address: 'ул. Строителей, д. 12, кв. 47',
  totalArea: 85,
  rooms: [
    {
      id: 'room-001',
      name: 'Гостиная',
      area: 25,
      image: 'https://images.unsplash.com/photo-1724582586529-62622e50c0b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4NDIxMTM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tasks: [
        {
          id: 'task-001',
          name: 'Укладка ламината',
          status: 'completed',
          description: 'Укладка ламината 33 класса, площадь 25 кв.м.',
          assignedTo: 'Иванов А.С.',
          dueDate: '2026-01-10',
          materials: [
            {
              id: 'mat-001',
              name: 'Ламинат 33 класс, дуб',
              quantity: '27 кв.м',
              price: 45900,
              receipt: 'Чек №12345 от 05.01.2026',
              purchaseDate: '2026-01-05'
            },
            {
              id: 'mat-002',
              name: 'Подложка под ламинат',
              quantity: '30 кв.м',
              price: 3600,
              receipt: 'Чек №12346 от 05.01.2026',
              purchaseDate: '2026-01-05'
            }
          ],
          media: [
            {
              id: 'media-001',
              type: 'photo',
              url: 'flooring installation',
              uploadedBy: 'Иванов А.С.',
              uploadDate: '2026-01-08',
              taskId: 'task-001'
            },
            {
              id: 'media-002',
              type: 'photo',
              url: 'wooden floor finish',
              uploadedBy: 'Иванов А.С.',
              uploadDate: '2026-01-10',
              taskId: 'task-001'
            }
          ]
        },
        {
          id: 'task-002',
          name: 'Покраска стен',
          status: 'in-progress',
          description: 'Покраска стен в гостиной краской премиум-класса',
          assignedTo: 'Петров В.И.',
          dueDate: '2026-01-18',
          materials: [
            {
              id: 'mat-003',
              name: 'Краска интерьерная, белая',
              quantity: '15 л',
              price: 12750,
              receipt: 'Чек №12350 от 08.01.2026',
              purchaseDate: '2026-01-08'
            }
          ],
          media: [
            {
              id: 'media-003',
              type: 'photo',
              url: 'wall painting progress',
              uploadedBy: 'Петров В.И.',
              uploadDate: '2026-01-12',
              taskId: 'task-002'
            }
          ]
        },
        {
          id: 'task-003',
          name: 'Установка потолочного освещения',
          status: 'pending',
          description: 'Монтаж светодиодных светильников и люстры',
          assignedTo: 'Сидоров Д.М.',
          dueDate: '2026-01-20',
          materials: [],
          media: []
        }
      ]
    },
    {
      id: 'room-002',
      name: 'Кухня',
      area: 12,
      image: 'https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4Mzc2MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tasks: [
        {
          id: 'task-004',
          name: 'Укладка плитки',
          status: 'completed',
          description: 'Укладка керамической плитки на пол и фартук',
          assignedTo: 'Михайлов К.П.',
          dueDate: '2026-01-07',
          materials: [
            {
              id: 'mat-004',
              name: 'Керамическая плитка для пола',
              quantity: '14 кв.м',
              price: 22400,
              receipt: 'Чек №12340 от 02.01.2026',
              purchaseDate: '2026-01-02'
            },
            {
              id: 'mat-005',
              name: 'Плитка для фартука',
              quantity: '6 кв.м',
              price: 9600,
              receipt: 'Чек №12341 от 02.01.2026',
              purchaseDate: '2026-01-02'
            }
          ],
          media: [
            {
              id: 'media-004',
              type: 'photo',
              url: 'kitchen tiles',
              uploadedBy: 'Михайлов К.П.',
              uploadDate: '2026-01-06',
              taskId: 'task-004'
            }
          ]
        },
        {
          id: 'task-005',
          name: 'Установка кухонного гарнитура',
          status: 'review',
          description: 'Сборка и установка кухонной мебели',
          assignedTo: 'Васильев Н.Н.',
          dueDate: '2026-01-15',
          materials: [
            {
              id: 'mat-006',
              name: 'Кухонный гарнитур',
              quantity: '1 компл.',
              price: 125000,
              receipt: 'Чек №12355 от 10.01.2026',
              purchaseDate: '2026-01-10'
            }
          ],
          media: [
            {
              id: 'media-005',
              type: 'photo',
              url: 'kitchen cabinet installation',
              uploadedBy: 'Васильев Н.Н.',
              uploadDate: '2026-01-14',
              taskId: 'task-005'
            }
          ]
        }
      ]
    },
    {
      id: 'room-003',
      name: 'Спальня',
      area: 18,
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4Mzk5NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tasks: [
        {
          id: 'task-006',
          name: 'Поклейка обоев',
          status: 'completed',
          description: 'Поклейка виниловых обоев',
          assignedTo: 'Федоров Л.А.',
          dueDate: '2026-01-12',
          materials: [
            {
              id: 'mat-007',
              name: 'Обои виниловые',
              quantity: '8 рулонов',
              price: 16000,
              receipt: 'Чек №12348 от 06.01.2026',
              purchaseDate: '2026-01-06'
            }
          ],
          media: [
            {
              id: 'media-006',
              type: 'photo',
              url: 'bedroom wallpaper',
              uploadedBy: 'Федоров Л.А.',
              uploadDate: '2026-01-11',
              taskId: 'task-006'
            }
          ]
        },
        {
          id: 'task-007',
          name: 'Укладка паркетной доски',
          status: 'in-progress',
          description: 'Укладка паркетной доски премиум класса',
          assignedTo: 'Иванов А.С.',
          dueDate: '2026-01-19',
          materials: [
            {
              id: 'mat-008',
              name: 'Паркетная доска, ясень',
              quantity: '20 кв.м',
              price: 56000,
              receipt: 'Чек №12360 от 12.01.2026',
              purchaseDate: '2026-01-12'
            }
          ],
          media: []
        }
      ]
    },
    {
      id: 'room-004',
      name: 'Ванная',
      area: 8,
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2ODQyMTE0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      tasks: [
        {
          id: 'task-008',
          name: 'Укладка плитки в ванной',
          status: 'completed',
          description: 'Полная облицовка стен и пола керамогранитом',
          assignedTo: 'Михайлов К.П.',
          dueDate: '2026-01-09',
          materials: [
            {
              id: 'mat-009',
              name: 'Керамогранит для стен',
              quantity: '25 кв.м',
              price: 37500,
              receipt: 'Чек №12343 от 03.01.2026',
              purchaseDate: '2026-01-03'
            },
            {
              id: 'mat-010',
              name: 'Напольная плитка',
              quantity: '9 кв.м',
              price: 18000,
              receipt: 'Чек №12344 от 03.01.2026',
              purchaseDate: '2026-01-03'
            }
          ],
          media: [
            {
              id: 'media-007',
              type: 'photo',
              url: 'bathroom tiles modern',
              uploadedBy: 'Михайлов К.П.',
              uploadDate: '2026-01-08',
              taskId: 'task-008'
            },
            {
              id: 'media-008',
              type: 'video',
              url: 'bathroom renovation',
              uploadedBy: 'Михайлов К.П.',
              uploadDate: '2026-01-09',
              taskId: 'task-008'
            }
          ]
        },
        {
          id: 'task-009',
          name: 'Установка сантехники',
          status: 'pending',
          description: 'Установка унитаза, ванны, раковины',
          assignedTo: 'Козлов Р.В.',
          dueDate: '2026-01-22',
          materials: [],
          media: []
        }
      ]
    }
  ]
};