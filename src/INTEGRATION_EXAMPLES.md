# Примеры интеграции API для "ВашРемонт"

## Содержание

1. [Базовая настройка](#базовая-настройка)
2. [Аутентификация пользователей](#аутентификация-пользователей)
3. [Работа с квартирами и комнатами](#работа-с-квартирами-и-комнатами)
4. [Управление задачами и материалами](#управление-задачами-и-материалами)
5. [Загрузка медиафайлов](#загрузка-медиафайлов)
6. [Система тикетов](#система-тикетов)
7. [Форма захвата лидов](#форма-захвата-лидов)

---

## Базовая настройка

### 1. Добавление Supabase клиента в приложение

Суппабейс клиент уже настроен в `/utils/supabase/client.ts`. Используйте его для работы с аутентификацией:

```typescript
import { supabase } from './utils/supabase/client';
```

### 2. Использование API утилит

Все API функции доступны через `/utils/api.ts`:

```typescript
import { 
  authAPI, 
  apartmentAPI, 
  taskAPI, 
  demoRequestAPI 
} from './utils/api';
```

### 3. Использование React Hooks

Готовые hooks для работы с данными:

```typescript
import { useAuth } from './hooks/useAuth';
import { useApartments } from './hooks/useApartments';
import { useTasks } from './hooks/useTasks';
import { useTickets } from './hooks/useTickets';
```

---

## Аутентификация пользователей

### Пример 1: Регистрация нового пользователя

```tsx
import { useState } from 'react';
import { authAPI } from './utils/api';
import { signIn } from './utils/supabase/client';

function SignUpComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'client' as 'client' | 'brigade',
  });

  const handleSignUp = async () => {
    try {
      // 1. Создать пользователя через API
      const { user } = await authAPI.signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
      });

      console.log('User created:', user);

      // 2. Автоматически войти после регистрации
      await signIn(formData.email, formData.password);

      // 3. Перенаправить на дашборд
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Sign up error:', error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
      <input
        type="text"
        placeholder="Имя"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <select
        value={formData.userType}
        onChange={(e) => setFormData({ ...formData, userType: e.target.value as 'client' | 'brigade' })}
      >
        <option value="client">Заказчик</option>
        <option value="brigade">Бригадир</option>
      </select>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
```

### Пример 2: Вход пользователя

```tsx
import { signIn } from './utils/supabase/client';

async function handleLogin(email: string, password: string) {
  try {
    const data = await signIn(email, password);
    console.log('Logged in:', data.user);
    
    // Access token сохранен в localStorage автоматически
    const token = localStorage.getItem('access_token');
    console.log('Access token:', token);
  } catch (error) {
    console.error('Login error:', error);
  }
}
```

### Пример 3: Использование useAuth hook

```tsx
import { useAuth } from './hooks/useAuth';

function Dashboard() {
  const { user, loading, error, logout } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <div>Пожалуйста, войдите в систему</div>;
  }

  return (
    <div>
      <h1>Добро пожаловать, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Тип: {user.userType === 'client' ? 'Заказчик' : 'Бригадир'}</p>
      <button onClick={logout}>Выйти</button>
    </div>
  );
}
```

### Пример 4: Вход через Google OAuth

```tsx
import { signInWithProvider } from './utils/supabase/client';

async function handleGoogleLogin() {
  try {
    // ВАЖНО: Перед использованием настройте Google OAuth в Supabase Dashboard
    // https://supabase.com/docs/guides/auth/social-login/auth-google
    await signInWithProvider('google');
  } catch (error) {
    console.error('Google login error:', error);
  }
}
```

---

## Работа с квартирами и комнатами

### Пример 5: Создание квартиры с комнатами

```tsx
import { useApartments } from './hooks/useApartments';
import { roomAPI } from './utils/api';

function CreateApartmentFlow() {
  const { createApartment } = useApartments();

  const handleCreateProject = async () => {
    try {
      // 1. Создать квартиру
      const apartment = await createApartment({
        name: 'Квартира №47',
        address: 'ул. Строителей, д. 12, кв. 47',
        totalArea: 85,
      });

      console.log('Apartment created:', apartment);

      // 2. Добавить комнаты
      const livingRoom = await roomAPI.create(apartment.id, {
        name: 'Гостиная',
        area: 25,
        image: 'https://example.com/living-room.jpg',
      });

      const kitchen = await roomAPI.create(apartment.id, {
        name: 'Кухня',
        area: 12,
        image: 'https://example.com/kitchen.jpg',
      });

      console.log('Rooms created:', livingRoom, kitchen);

      // 3. Перенаправить на страницу квартиры
      window.location.href = `/apartments/${apartment.id}`;
    } catch (error) {
      console.error('Error creating apartment:', error);
    }
  };

  return (
    <button onClick={handleCreateProject}>
      Создать новый проект
    </button>
  );
}
```

### Пример 6: Отображение списка квартир

```tsx
import { useApartments } from './hooks/useApartments';

function ApartmentsList() {
  const { apartments, loading, error } = useApartments();

  if (loading) return <div>Загрузка квартир...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h2>Мои квартиры</h2>
      {apartments.length === 0 ? (
        <p>У вас пока нет квартир</p>
      ) : (
        <ul>
          {apartments.map((apt) => (
            <li key={apt.id}>
              <h3>{apt.name}</h3>
              <p>{apt.address}</p>
              <p>Площадь: {apt.totalArea} м²</p>
              <p>Комнат: {apt.rooms.length}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## Управление задачами и материалами

### Пример 7: Создание задачи с материалами

```tsx
import { useTasks } from './hooks/useTasks';
import { materialAPI } from './utils/api';

function CreateTaskWithMaterials({ roomId }: { roomId: string }) {
  const { createTask } = useTasks(roomId);

  const handleCreateTask = async () => {
    try {
      // 1. Создать задачу
      const task = await createTask({
        name: 'Укладка ламината',
        description: 'Укладка ламината 33 класса, площадь 25 кв.м.',
        assignedTo: 'Иванов А.С.',
        dueDate: '2026-01-10',
        status: 'pending',
      });

      console.log('Task created:', task);

      // 2. Добавить материалы
      const laminate = await materialAPI.create(task.id, {
        name: 'Ламинат 33 класс, дуб',
        quantity: '27 кв.м',
        price: 45900,
        receipt: 'Чек №12345 от 05.01.2026',
        purchaseDate: '2026-01-05',
      });

      const underlayment = await materialAPI.create(task.id, {
        name: 'Подложка под ламинат',
        quantity: '30 кв.м',
        price: 3600,
        receipt: 'Чек №12346 от 05.01.2026',
        purchaseDate: '2026-01-05',
      });

      console.log('Materials added:', laminate, underlayment);

      alert('Задача создана успешно!');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <button onClick={handleCreateTask}>
      Создать задачу
    </button>
  );
}
```

### Пример 8: Обновление статуса задачи

```tsx
import { useTasks } from './hooks/useTasks';

function TaskStatusUpdater({ roomId, taskId }: { roomId: string; taskId: string }) {
  const { updateTaskStatus } = useTasks(roomId);

  const handleStatusChange = async (status: 'pending' | 'in-progress' | 'completed' | 'review') => {
    try {
      await updateTaskStatus(taskId, status);
      alert('Статус обновлен!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleStatusChange('pending')}>В ожидании</button>
      <button onClick={() => handleStatusChange('in-progress')}>В работе</button>
      <button onClick={() => handleStatusChange('review')}>На проверке</button>
      <button onClick={() => handleStatusChange('completed')}>Завершено</button>
    </div>
  );
}
```

### Пример 9: Отображение задач с материалами

```tsx
import { useTasks } from './hooks/useTasks';
import { materialAPI } from './utils/api';
import { useEffect, useState } from 'react';

function TasksWithMaterials({ roomId }: { roomId: string }) {
  const { tasks, loading } = useTasks(roomId);
  const [materialsMap, setMaterialsMap] = useState<Record<string, any[]>>({});

  useEffect(() => {
    // Загрузить материалы для каждой задачи
    const loadMaterials = async () => {
      const map: Record<string, any[]> = {};
      
      for (const task of tasks) {
        try {
          const { materials } = await materialAPI.getAllByTask(task.id);
          map[task.id] = materials;
        } catch (error) {
          console.error(`Error loading materials for task ${task.id}:`, error);
        }
      }
      
      setMaterialsMap(map);
    };

    if (tasks.length > 0) {
      loadMaterials();
    }
  }, [tasks]);

  if (loading) return <div>Загрузка задач...</div>;

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <p>Статус: {task.status}</p>
          <p>Исполнитель: {task.assignedTo}</p>
          
          <h4>Материалы:</h4>
          {materialsMap[task.id] ? (
            <ul>
              {materialsMap[task.id].map((material) => (
                <li key={material.id}>
                  {material.name} - {material.quantity} - {material.price} ₽
                </li>
              ))}
            </ul>
          ) : (
            <p>Загрузка материалов...</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## Загрузка медиафайлов

### Пример 10: Загрузка фотографии к задаче

```tsx
import { mediaAPI } from './utils/api';
import { useState } from 'react';

function PhotoUploader({ taskId }: { taskId: string }) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      const { media } = await mediaAPI.upload(taskId, file, 'photo');
      
      console.log('Photo uploaded:', media);
      console.log('Signed URL:', media.url);
      
      alert('Фото успешно загружено!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка загрузки фото');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        disabled={uploading}
      />
      {uploading && <p>Загрузка...</p>}
    </div>
  );
}
```

### Пример 11: Отображение медиафайлов задачи

```tsx
import { mediaAPI } from './utils/api';
import { useEffect, useState } from 'react';

function TaskMediaGallery({ taskId }: { taskId: string }) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const { media: mediaFiles } = await mediaAPI.getAllByTask(taskId);
        setMedia(mediaFiles);
      } catch (error) {
        console.error('Error loading media:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [taskId]);

  if (loading) return <div>Загрузка медиафайлов...</div>;

  return (
    <div>
      <h3>Фото и видео</h3>
      {media.length === 0 ? (
        <p>Нет загруженных файлов</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {media.map((item) => (
            <div key={item.id}>
              {item.type === 'photo' ? (
                <img src={item.url} alt={item.uploadedBy} className="w-full h-auto" />
              ) : (
                <video src={item.url} controls className="w-full h-auto" />
              )}
              <p>Загрузил: {item.uploadedBy}</p>
              <p>Дата: {item.uploadDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Пример 12: Drag & Drop загрузка файлов

```tsx
import { mediaAPI } from './utils/api';
import { useState } from 'react';

function DragDropUploader({ taskId }: { taskId: string }) {
  const [uploading, setUploading] = useState(false);

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    
    const files = Array.from(event.dataTransfer.files);
    
    try {
      setUploading(true);
      
      for (const file of files) {
        const type = file.type.startsWith('video/') ? 'video' : 'photo';
        await mediaAPI.upload(taskId, file, type);
      }
      
      alert(`${files.length} файлов успешно загружено!`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка загрузки файлов');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed p-8 text-center"
    >
      {uploading ? (
        <p>Загрузка...</p>
      ) : (
        <p>Перетащите файлы сюда</p>
      )}
    </div>
  );
}
```

---

## Система тикетов

### Пример 13: Создание тикета поддержки

```tsx
import { useTickets } from './hooks/useTickets';

function CreateSupportTicket() {
  const { createTicket } = useTickets();

  const handleSubmit = async (formData: any) => {
    try {
      const ticket = await createTicket({
        subject: formData.subject,
        message: formData.message,
        priority: formData.priority || 'medium',
      });

      console.log('Ticket created:', ticket);
      alert('Обращение создано! Номер тикета: ' + ticket.id);
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Ошибка создания обращения');
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleSubmit({
        subject: formData.get('subject'),
        message: formData.get('message'),
        priority: formData.get('priority'),
      });
    }}>
      <input name="subject" placeholder="Тема обращения" required />
      <textarea name="message" placeholder="Описание проблемы" required />
      <select name="priority">
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>
      <button type="submit">Отправить</button>
    </form>
  );
}
```

### Пример 14: Список тикетов с сообщениями

```tsx
import { useTickets } from './hooks/useTickets';

function TicketsList() {
  const { tickets, loading, addMessage } = useTickets();

  const handleReply = async (ticketId: string, message: string) => {
    try {
      await addMessage(ticketId, message);
      alert('Сообщение добавлено!');
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  if (loading) return <div>Загрузка тикетов...</div>;

  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <h3>{ticket.subject}</h3>
          <p>Статус: {ticket.status}</p>
          <p>Приоритет: {ticket.priority}</p>
          
          <h4>Сообщения:</h4>
          <div>
            <p><strong>Начальное сообщение:</strong> {ticket.message}</p>
            {ticket.messages?.map((msg) => (
              <div key={msg.id}>
                <p><strong>{msg.sender}:</strong> {msg.message}</p>
                <p><small>{new Date(msg.timestamp).toLocaleString()}</small></p>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const message = (e.currentTarget.elements.namedItem('message') as HTMLInputElement).value;
            handleReply(ticket.id, message);
            e.currentTarget.reset();
          }}>
            <input name="message" placeholder="Добавить сообщение..." />
            <button type="submit">Отправить</button>
          </form>
        </div>
      ))}
    </div>
  );
}
```

---

## Форма захвата лидов

### Пример 15: Форма заявки на демо

Готовый компонент уже создан в `/components/DemoRequestForm.tsx`. Пример использования:

```tsx
import { DemoRequestForm } from './components/DemoRequestForm';

function LandingPage() {
  return (
    <div>
      <h1>Попробуйте ВашРемонт бесплатно</h1>
      
      <DemoRequestForm 
        onSuccess={() => {
          console.log('Demo request submitted successfully!');
          // Можно перенаправить на страницу благодарности
          window.location.href = '/thank-you';
        }}
      />
    </div>
  );
}
```

### Пример 16: Прямое использование API для демо-заявки

```tsx
import { demoRequestAPI } from './utils/api';

async function submitDemoRequest(data: any) {
  try {
    const response = await demoRequestAPI.create({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      userType: data.userType,
      message: data.message || '',
    });

    console.log('Demo request ID:', response.requestId);
    console.log('Message:', response.message);
    
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
  } catch (error) {
    console.error('Error submitting demo request:', error);
    alert('Ошибка отправки заявки. Пожалуйста, попробуйте снова.');
  }
}
```

---

## Полный пример: Создание проекта ремонта

### Пример 17: Комплексный сценарий

```tsx
import { useApartments } from './hooks/useApartments';
import { roomAPI, taskAPI, materialAPI, mediaAPI } from './utils/api';

async function createCompleteRenovationProject() {
  try {
    // 1. Создать квартиру
    const apartment = await apartmentAPI.create({
      name: 'Квартира №47',
      address: 'ул. Строителей, д. 12, кв. 47',
      totalArea: 85,
    });

    // 2. Создать комнату
    const room = await roomAPI.create(apartment.id, {
      name: 'Гостиная',
      area: 25,
      image: 'https://example.com/living-room.jpg',
    });

    // 3. Создать задачу
    const task = await taskAPI.create(room.id, {
      name: 'Укладка ламината',
      description: 'Укладка ламината 33 класса, площадь 25 кв.м.',
      assignedTo: 'Иванов А.С.',
      dueDate: '2026-01-10',
      status: 'pending',
    });

    // 4. Добавить материалы
    await materialAPI.create(task.id, {
      name: 'Ламинат 33 класс, дуб',
      quantity: '27 кв.м',
      price: 45900,
      receipt: 'Чек №12345 от 05.01.2026',
      purchaseDate: '2026-01-05',
    });

    // 5. Загрузить фото (если есть файл)
    // const file = /* получить File объект */;
    // await mediaAPI.upload(task.id, file, 'photo');

    // 6. Обновить статус задачи
    await taskAPI.update(task.id, { status: 'in-progress' });

    console.log('Project created successfully!');
    return { apartment, room, task };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}
```

---

## Заметки по использованию

### Обработка ошибок

Все API функции выбрасывают исключения при ошибках. Рекомендуется использовать try-catch:

```tsx
try {
  await apartmentAPI.create(data);
} catch (error) {
  if (error instanceof Error) {
    console.error('Error message:', error.message);
    alert(error.message);
  }
}
```

### Access Token

Access token автоматически сохраняется в `localStorage` при входе и используется всеми API запросами. Не нужно передавать его вручную.

### Signed URLs для медиафайлов

Signed URLs действительны 1 час. После истечения срока необходимо обновить список медиа, чтобы получить новые URL.

### Real-time обновления

Для real-time обновлений используйте функцию `refresh()` из hooks:

```tsx
const { apartments, refresh } = useApartments();

// Обновить данные
await refresh();
```

---

## Дополнительные ресурсы

- [API Документация](/API_DOCUMENTATION.md)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
