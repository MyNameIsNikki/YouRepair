# 🚀 Начните здесь!

Добро пожаловать в проект **ВашРемонт** - платформу управления строительными проектами.

## ⚡ Что нового?

**🔥 PostgreSQL интеграция готова!** Проект теперь использует полноценную реляционную базу данных.

## 📖 Документация по разделам

### 🗄️ База данных (PostgreSQL)

| Файл | Описание | Для кого |
|------|----------|----------|
| **`POSTGRES_README.md`** | 👈 **НАЧНИТЕ ЗДЕСЬ!** Быстрый старт | Все |
| `DATABASE_SETUP.md` | SQL скрипт для создания таблиц | DevOps, Backend |
| `POSTGRES_INTEGRATION_GUIDE.md` | Полное API руководство (52 endpoints) | Backend, Frontend |
| `USAGE_EXAMPLES.md` | Примеры кода на TypeScript | Frontend |
| `MIGRATION_SUMMARY.md` | Что изменилось, детали миграции | Tech Lead |

### 📡 API & Backend

| Файл | Описание |
|------|----------|
| `BACKEND_README.md` | Обзор backend архитектуры |
| `API_DOCUMENTATION.md` | Старый KV-based API (для справки) |
| `ARCHITECTURE.md` | Архитектура проекта |

### 💻 Frontend

| Файл | Описание |
|------|----------|
| `INTEGRATION_EXAMPLES.md` | Примеры интеграции компонентов |
| `QUICK_START.md` | Быстрый старт для фронтенда |

## 🎯 Что делать дальше?

### Для Backend разработчика:

1. **Прочитайте:** `POSTGRES_README.md` - 5 минут
2. **Создайте таблицы:** Следуйте `DATABASE_SETUP.md`
3. **Протестируйте API:** Используйте примеры из `USAGE_EXAMPLES.md`
4. **Изучите детали:** `POSTGRES_INTEGRATION_GUIDE.md`

### Для Frontend разработчика:

1. **Прочитайте:** `POSTGRES_README.md` - раздел "React Hooks"
2. **Посмотрите примеры:** `USAGE_EXAMPLES.md`
3. **Начните кодить:** Используйте готовые hooks:
   ```typescript
   import { useProjects } from './hooks/useProjects';
   import { useTasks } from './hooks/useTasks';
   import { useMaterials } from './hooks/useMaterials';
   ```

### Для Tech Lead / Архитектора:

1. **Общая картина:** `MIGRATION_SUMMARY.md`
2. **Архитектура:** `ARCHITECTURE.md`
3. **Детали API:** `POSTGRES_INTEGRATION_GUIDE.md`

## 📊 Быстрый обзор структуры БД

```
customers (заказчики)
    ↓
  projects (проекты) ← foremen (бригадиры)
    ↓
  rooms (комнаты)
    ↓
  tasks (задачи)
    ↓
  ├── materials (материалы)
  ├── media (фото/видео)
  └── reports (отчеты)

tickets (тикеты поддержки)
```

**9 таблиц, 52 API endpoints, готово к использованию!**

## 🛠️ Быстрая настройка (3 шага)

### Шаг 1: Создайте БД

Откройте Supabase Dashboard → SQL Editor:

```sql
-- Скопируйте SQL из DATABASE_SETUP.md
```

### Шаг 2: Отключите RLS (для разработки)

```sql
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE foremen DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
-- ... остальные таблицы
```

### Шаг 3: Используйте в коде

```typescript
import { useProjects } from './hooks/useProjects';

function MyComponent() {
  const { projects, createProject } = useProjects(accessToken);
  // Готово! 🎉
}
```

## 🔑 Основные концепции

### User Types
- **Customer** (заказчик) - владелец проектов
- **Foreman** (бригадир) - исполнитель проектов

### Workflow
```
1. Регистрация → creates customer/foreman record
2. Создание проекта → requires customer + foreman
3. Добавление комнат → belongs to project
4. Создание задач → belongs to room
5. Добавление материалов/медиа → belongs to task
```

### Access Control
- Customer видит только СВОИ проекты
- Foreman видит только проекты, где ОН назначен
- API автоматически фильтрует данные

## 🎨 React Hooks (готовые!)

```typescript
// Projects
const { projects, createProject, updateProject, deleteProject } = 
  useProjects(accessToken);

// Rooms  
const { rooms, fetchRooms, createRoom, updateRoom, deleteRoom } = 
  useRooms(accessToken);

// Tasks
const { tasks, fetchTasks, createTask, updateTask, deleteTask } = 
  useTasks(accessToken);

// Materials
const { materials, fetchMaterials, createMaterial, deleteMaterial } = 
  useMaterials(accessToken);

// Tickets
const { tickets, createTicket, updateTicket, deleteTicket } = 
  useTickets(accessToken);
```

## 📂 Структура проекта

```
/
├── types/
│   └── database.ts          # ← TypeScript типы для БД
│
├── hooks/
│   ├── useProjects.ts       # ← Управление проектами
│   ├── useRooms.ts          # ← Управление комнатами
│   ├── useTasks.ts          # ← Управление задачами
│   ├── useMaterials.ts      # ← Управление материалами
│   └── useTickets.ts        # ← Система тикетов
│
├── supabase/functions/server/
│   └── index.tsx            # ← Backend API (52 endpoints)
│
└── pages/                   # React страницы
    ├── Home.tsx
    ├── About.tsx
    └── demo/
        ├── DemoClient.tsx
        └── DemoBrigade.tsx
```

## ✅ Чеклист для старта

- [ ] Прочитал `POSTGRES_README.md`
- [ ] Создал таблицы в Supabase
- [ ] Отключил RLS (для dev)
- [ ] Протестировал регистрацию
- [ ] Создал тестовый проект
- [ ] Изучил React hooks
- [ ] Готов к разработке! 🚀

## 🆘 Проблемы?

### "table does not exist"
→ Выполните SQL из `DATABASE_SETUP.md`

### "permission denied"
→ Отключите RLS или настройте policies

### "Unauthorized"
→ Проверьте accessToken

### Всё остальное
→ Проверьте логи в Supabase Dashboard → Edge Functions

## 📞 Поддержка

**Быстрые ссылки:**
- [PostgreSQL Quick Start](./POSTGRES_README.md)
- [Database Setup](./DATABASE_SETUP.md)  
- [Code Examples](./USAGE_EXAMPLES.md)
- [Full API Guide](./POSTGRES_INTEGRATION_GUIDE.md)

**Документация Supabase:**
- [Auth](https://supabase.com/docs/guides/auth)
- [Database](https://supabase.com/docs/guides/database)
- [Edge Functions](https://supabase.com/docs/guides/functions)

---

**Статус:** ✅ Готово к разработке  
**Версия:** 1.0 (PostgreSQL)  
**Дата:** 8 февраля 2025

**Приятной разработки! 🎉**
