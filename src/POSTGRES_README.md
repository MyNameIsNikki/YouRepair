# PostgreSQL Integration - Quick Start

## 🎯 Готово к использованию!

Проект ВашРемонт теперь использует полноценную PostgreSQL базу данных вместо KV store.

## 🚀 Быстрый старт (3 шага)

### Шаг 1: Создайте таблицы

Откройте [Supabase Dashboard](https://app.supabase.com) → SQL Editor и выполните:

```sql
-- Скопируйте весь SQL из файла DATABASE_SETUP.md
```

Или откройте файл `/DATABASE_SETUP.md` и скопируйте SQL скрипт.

### Шаг 2: Отключите RLS (для разработки)

```sql
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE foremen DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE rooms DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE materials DISABLE ROW LEVEL SECURITY;
ALTER TABLE media DISABLE ROW LEVEL SECURITY;
ALTER TABLE reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE tickets DISABLE ROW LEVEL SECURITY;
```

⚠️ **Для production включите RLS обратно!**

### Шаг 3: Используйте в коде

```typescript
import { useProjects } from './hooks/useProjects';
import { useTasks } from './hooks/useTasks';
import { useTickets } from './hooks/useTickets';

function MyComponent() {
  const { projects, createProject } = useProjects(accessToken);
  const { tasks, createTask } = useTasks(accessToken);
  const { tickets, createTicket } = useTickets(accessToken);
  
  // Готово к использованию!
}
```

## 📊 Структура БД

```
customers → projects ← foremen
              ↓
            rooms
              ↓
            tasks
        ┌─────┼─────┬────────┐
        ↓     ↓     ↓        ↓
    materials media reports (...)
```

**9 таблиц, 52 API endpoints**

## 📚 Документация

| Файл | Описание |
|------|----------|
| `DATABASE_SETUP.md` | SQL скрипт и настройка |
| `POSTGRES_INTEGRATION_GUIDE.md` | Полное API руководство |
| `USAGE_EXAMPLES.md` | Примеры кода |
| `MIGRATION_SUMMARY.md` | Детали миграции |

## 🔑 Основные эндпоинты

### Регистрация
```typescript
POST /make-server-ee694789/signup
{
  email, password, userType: "customer" | "foreman",
  firstName, lastName, phone, supervisorPhone?
}
```

### Проекты
```typescript
GET    /make-server-ee694789/projects
POST   /make-server-ee694789/projects
PUT    /make-server-ee694789/projects/:id
DELETE /make-server-ee694789/projects/:id
```

### Комнаты, Задачи, Материалы...
См. `POSTGRES_INTEGRATION_GUIDE.md`

## 🎨 React Hooks

### useProjects
```typescript
const { 
  projects,        // ProjectWithDetails[]
  loading,         // boolean
  error,           // string | null
  createProject,   // (data) => Promise<Project>
  updateProject,   // (id, data) => Promise<Project>
  deleteProject    // (id) => Promise<boolean>
} = useProjects(accessToken);
```

### useRooms
```typescript
const { 
  rooms, 
  fetchRooms,     // (projectId) => Promise<void>
  createRoom,     // (projectId, data) => Promise<Room>
  updateRoom, 
  deleteRoom 
} = useRooms(accessToken);
```

### useTasks
```typescript
const { 
  tasks, 
  fetchTasks,     // (roomId) => Promise<void>
  createTask,     // (roomId, data) => Promise<Task>
  updateTask,
  updateTaskStatus, 
  deleteTask 
} = useTasks(accessToken);
```

### useMaterials
```typescript
const { 
  materials, 
  fetchMaterials, // (taskId) => Promise<void>
  createMaterial, // (taskId, data) => Promise<Material>
  updateMaterial, 
  deleteMaterial 
} = useMaterials(accessToken);
```

### useTickets
```typescript
const { 
  tickets,        // загружаются автоматически
  createTicket,   // (data) => Promise<Ticket>
  updateTicket,   // (id, data) => Promise<Ticket>
  deleteTicket    // (id) => Promise<boolean>
} = useTickets(accessToken);
```

## 💡 Примеры использования

### Создать проект
```typescript
const project = await createProject({
  projectName: 'Ремонт квартиры',
  customerId: 1,
  foremanId: 2,
  budget: 500000
});
```

### Добавить комнату
```typescript
await fetchRooms(projectId); // загрузить существующие
const room = await createRoom(projectId, {
  roomName: 'Кухня',
  status: 'pending'
});
```

### Создать задачу
```typescript
await fetchTasks(roomId);
const task = await createTask(roomId, {
  taskName: 'Поклейка обоев',
  status: 'pending'
});
```

### Добавить материал
```typescript
const material = await createMaterial(taskId, {
  materialName: 'Обои',
  quantity: 10,
  unitPrice: 1500,
  purchaseDate: '2025-02-20'
});
// Автоматически обновляет spent_budget проекта!
```

## ✨ Фичи

✅ **Auto-increment IDs** - Не нужно генерировать UUID  
✅ **Foreign Keys** - Реляционная целостность  
✅ **Cascading Deletes** - Удаление связанных данных  
✅ **Budget Tracking** - Автоматический подсчет  
✅ **Access Control** - Фильтрация по user type  
✅ **Nested Data** - JOINs в одном запросе  
✅ **TypeScript Types** - Полная типобезопасность  

## 🔒 Безопасность

- Authentication через Supabase Auth
- Authorization на уровне API
- User mapping в KV store
- RLS policies (настраиваются отдельно)

## 📦 Типы данных

Все типы в `/types/database.ts`:

```typescript
import type { 
  Customer, 
  Foreman, 
  Project, 
  ProjectWithDetails,
  Room, 
  RoomWithDetails,
  Task, 
  TaskWithDetails,
  Material, 
  Media, 
  Report, 
  Ticket 
} from './types/database';
```

## 🐛 Troubleshooting

### Ошибка "table does not exist"
→ Выполните SQL скрипт из DATABASE_SETUP.md

### Ошибка "permission denied"
→ Отключите RLS или настройте policies

### Ошибка "foreign key constraint"
→ Проверьте существование customer_id и foreman_id

### Ошибка "Unauthorized"
→ Проверьте accessToken

## 📞 Поддержка

Проблемы? Проверьте:
1. ✅ Таблицы созданы в Supabase
2. ✅ RLS отключен (для разработки)
3. ✅ Access token валиден
4. ✅ User mapping существует

Детали в документации:
- `POSTGRES_INTEGRATION_GUIDE.md` - полное API
- `USAGE_EXAMPLES.md` - больше примеров
- `MIGRATION_SUMMARY.md` - что изменилось

---

**Версия:** 1.0  
**Дата:** 8 февраля 2025  
**Статус:** ✅ Готово к использованию
