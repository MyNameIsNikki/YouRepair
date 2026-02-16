# 🚀 Quick Start Guide - Backend API "ВашРемонт"

## ⚡ За 5 минут до первого запроса

### 1. Импорты

```typescript
// Аутентификация
import { signIn, signOut } from './utils/supabase/client';
import { useAuth } from './hooks/useAuth';

// API функции
import { 
  apartmentAPI, 
  roomAPI, 
  taskAPI,
  materialAPI,
  mediaAPI,
  ticketAPI,
  demoRequestAPI 
} from './utils/api';

// React Hooks
import { useApartments } from './hooks/useApartments';
import { useTasks } from './hooks/useTasks';
import { useTickets } from './hooks/useTickets';

// Готовые компоненты
import { DemoRequestForm } from './components/DemoRequestForm';
import { AuthModal } from './components/AuthModal';
```

### 2. Базовая аутентификация

```typescript
// Вход
await signIn('user@example.com', 'password');

// Выход
await signOut();

// Использование hook
function MyComponent() {
  const { user, loading, login, logout } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;
  
  return <div>Welcome, {user.name}!</div>;
}
```

### 3. Первый API запрос

```typescript
// Создать квартиру
const { apartment } = await apartmentAPI.create({
  name: 'Квартира №47',
  address: 'ул. Строителей, д. 12',
  totalArea: 85
});

console.log('Created:', apartment.id);
```

## 📋 Типичные сценарии

### Сценарий 1: Форма захвата лидов на лендинге

```tsx
import { DemoRequestForm } from './components/DemoRequestForm';

function LandingPage() {
  return (
    <section>
      <h2>Попробуйте бесплатно</h2>
      <DemoRequestForm 
        onSuccess={() => alert('Заявка отправлена!')} 
      />
    </section>
  );
}
```

### Сценарий 2: Регистрация и вход

```tsx
import { AuthModal } from './components/AuthModal';

function App() {
  const [showAuth, setShowAuth] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowAuth(true)}>Войти</button>
      <AuthModal 
        open={showAuth} 
        onClose={() => setShowAuth(false)} 
      />
    </>
  );
}
```

### Сценарий 3: Список квартир с loading

```tsx
import { useApartments } from './hooks/useApartments';

function Dashboard() {
  const { apartments, loading, error, createApartment } = useApartments();
  
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  
  return (
    <div>
      {apartments.map(apt => (
        <div key={apt.id}>{apt.name}</div>
      ))}
      <button onClick={() => createApartment({
        name: 'Новая квартира',
        address: 'Адрес'
      })}>
        Добавить
      </button>
    </div>
  );
}
```

### Сценарий 4: Задачи с обновлением статуса

```tsx
import { useTasks } from './hooks/useTasks';

function RoomTasks({ roomId }) {
  const { tasks, loading, updateTaskStatus } = useTasks(roomId);
  
  const markCompleted = async (taskId) => {
    await updateTaskStatus(taskId, 'completed');
  };
  
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.name}</h3>
          <span>Статус: {task.status}</span>
          <button onClick={() => markCompleted(task.id)}>
            Завершить
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Сценарий 5: Загрузка фото

```tsx
import { mediaAPI } from './utils/api';

function PhotoUpload({ taskId }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    
    try {
      const { media } = await mediaAPI.upload(taskId, file, 'photo');
      console.log('Uploaded:', media.url);
      alert('Фото загружено!');
    } catch (error) {
      alert('Ошибка загрузки');
    }
  };
  
  return <input type="file" accept="image/*" onChange={handleUpload} />;
}
```

### Сценарий 6: Создание тикета

```tsx
import { useTickets } from './hooks/useTickets';

function SupportForm() {
  const { createTicket } = useTickets();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    await createTicket({
      subject: formData.get('subject'),
      message: formData.get('message'),
      priority: 'medium'
    });
    
    alert('Обращение создано!');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="subject" placeholder="Тема" required />
      <textarea name="message" placeholder="Сообщение" required />
      <button type="submit">Отправить</button>
    </form>
  );
}
```

## 🎯 Cheat Sheet - API Calls

### Квартиры

```typescript
// Получить все
const { apartments } = await apartmentAPI.getAll();

// Получить одну
const { apartment } = await apartmentAPI.getById('apt_id');

// Создать
const { apartment } = await apartmentAPI.create({
  name: 'Квартира №1',
  address: 'Адрес',
  totalArea: 50
});

// Обновить
const { apartment } = await apartmentAPI.update('apt_id', {
  name: 'Новое название'
});

// Удалить
await apartmentAPI.delete('apt_id');
```

### Комнаты

```typescript
// Получить все комнаты квартиры
const { rooms } = await roomAPI.getAllByApartment('apt_id');

// Создать комнату
const { room } = await roomAPI.create('apt_id', {
  name: 'Гостиная',
  area: 25
});

// Обновить
const { room } = await roomAPI.update('room_id', {
  name: 'Новое название'
});

// Удалить
await roomAPI.delete('room_id');
```

### Задачи

```typescript
// Получить все задачи комнаты
const { tasks } = await taskAPI.getAllByRoom('room_id');

// Создать задачу
const { task } = await taskAPI.create('room_id', {
  name: 'Укладка плитки',
  status: 'pending',
  assignedTo: 'Иванов А.С.',
  dueDate: '2026-02-15'
});

// Обновить статус
const { task } = await taskAPI.update('task_id', {
  status: 'completed'
});

// Удалить
await taskAPI.delete('task_id');
```

### Материалы

```typescript
// Получить материалы задачи
const { materials } = await materialAPI.getAllByTask('task_id');

// Добавить материал
const { material } = await materialAPI.create('task_id', {
  name: 'Плитка керамическая',
  quantity: '20 кв.м',
  price: 25000,
  purchaseDate: '2026-02-07'
});

// Обновить
const { material } = await materialAPI.update('mat_id', {
  price: 26000
});

// Удалить
await materialAPI.delete('mat_id');
```

### Медиафайлы

```typescript
// Получить медиа задачи
const { media } = await mediaAPI.getAllByTask('task_id');

// Загрузить файл
const file = /* File object */;
const { media } = await mediaAPI.upload('task_id', file, 'photo');

// Удалить
await mediaAPI.delete('media_id');
```

### Тикеты

```typescript
// Получить все тикеты
const { tickets } = await ticketAPI.getAll();

// Создать тикет
const { ticket } = await ticketAPI.create({
  subject: 'Проблема',
  message: 'Описание',
  priority: 'medium'
});

// Добавить сообщение
const { ticket } = await ticketAPI.addMessage('ticket_id', 'Ответ');

// Обновить статус
const { ticket } = await ticketAPI.update('ticket_id', {
  status: 'resolved'
});
```

### Демо-заявки

```typescript
// Создать заявку (не требует авторизации)
const response = await demoRequestAPI.create({
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  phone: '+7 999 123-45-67',
  userType: 'client',
  message: 'Хочу попробовать'
});

console.log(response.message); // "Заявка на демо успешно отправлена!"
```

## 🔑 Шпаргалка по статусам

### Статусы задач
- `pending` - В ожидании
- `in-progress` - В работе
- `review` - На проверке
- `completed` - Завершено

### Приоритеты тикетов
- `low` - Низкий
- `medium` - Средний
- `high` - Высокий

### Статусы тикетов
- `open` - Открыт
- `in-progress` - В работе
- `resolved` - Решен
- `closed` - Закрыт

### Типы пользователей
- `client` - Заказчик
- `brigade` - Бригадир

### Типы медиа
- `photo` - Фотография
- `video` - Видео

## ⚠️ Частые ошибки

### 1. 401 Unauthorized

```typescript
// ❌ Забыли войти
await apartmentAPI.getAll(); // 401

// ✅ Сначала войдите
await signIn('user@example.com', 'password');
await apartmentAPI.getAll(); // OK
```

### 2. 403 Forbidden

```typescript
// ❌ Пытаетесь получить чужую квартиру
await apartmentAPI.getById('someone_else_apt'); // 403

// ✅ Работайте только со своими данными
const { apartments } = await apartmentAPI.getAll();
await apartmentAPI.getById(apartments[0].id); // OK
```

### 3. 404 Not Found

```typescript
// ❌ Неверный ID
await roomAPI.getById('wrong_id'); // 404

// ✅ Проверяйте ID
const { rooms } = await roomAPI.getAllByApartment('apt_id');
await roomAPI.getById(rooms[0].id); // OK
```

### 4. Забыли await

```typescript
// ❌ Без await
const result = apartmentAPI.create({ ... }); // Promise<...>
console.log(result); // Promise { <pending> }

// ✅ С await
const result = await apartmentAPI.create({ ... });
console.log(result); // { success: true, apartment: {...} }
```

## 🛠️ Debugging Tips

### Проверка состояния API

```typescript
import { healthAPI } from './utils/api';

const { status } = await healthAPI.check();
console.log(status); // "ok"
```

### Проверка авторизации

```typescript
const token = localStorage.getItem('access_token');
console.log('Token:', token);

const { user } = useAuth();
console.log('User:', user);
```

### Логирование ошибок

```typescript
try {
  await apartmentAPI.create({ ... });
} catch (error) {
  console.error('Full error:', error);
  console.error('Message:', error.message);
}
```

## 📚 Полезные ссылки

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Полная документация API
- **[INTEGRATION_EXAMPLES.md](./INTEGRATION_EXAMPLES.md)** - 17 примеров интеграции
- **[BACKEND_README.md](./BACKEND_README.md)** - Обзор backend
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Архитектура системы

## 💡 Лучшие практики

### 1. Используйте hooks для состояния

```typescript
// ✅ Good
const { apartments, loading, error } = useApartments();

// ❌ Bad
const [apartments, setApartments] = useState([]);
useEffect(() => {
  apartmentAPI.getAll().then(data => setApartments(data.apartments));
}, []);
```

### 2. Обрабатывайте ошибки

```typescript
// ✅ Good
try {
  await apartmentAPI.create(data);
  toast.success('Создано!');
} catch (error) {
  toast.error(error.message);
}

// ❌ Bad
await apartmentAPI.create(data);
// Нет обработки ошибок
```

### 3. Показывайте loading состояния

```typescript
// ✅ Good
if (loading) return <Spinner />;
if (error) return <Error message={error} />;
return <Data items={apartments} />;

// ❌ Bad
return <Data items={apartments} />; // Может быть пустым
```

### 4. Используйте TypeScript типы

```typescript
// ✅ Good
import { Apartment, CreateApartmentData } from './utils/api';

const data: CreateApartmentData = {
  name: 'Test',
  address: 'Address'
};

// ❌ Bad
const data = { name: 'Test' }; // Забыли address
```

---

**Готово!** Теперь вы можете начать работу с API 🎉
