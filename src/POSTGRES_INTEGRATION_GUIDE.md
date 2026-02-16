# PostgreSQL Database Integration Guide

## Обзор

Проект ВашРемонт теперь использует полноценную реляционную PostgreSQL базу данных вместо KV store. Схема БД включает все необходимые таблицы для управления строительными проектами.

## Схема базы данных

### Основные таблицы:

1. **customers** - Заказчики
2. **foremen** - Бригадиры/прорабы  
3. **projects** - Строительные проекты
4. **rooms** - Комнаты в проектах
5. **tasks** - Задачи по комнатам
6. **materials** - Материалы для задач
7. **media** - Медиафайлы (фото/видео)
8. **reports** - Отчеты
9. **tickets** - Тикеты поддержки

### Диаграмма связей:

```
customers ──┐
            ├──> projects ──> rooms ──> tasks ──┬──> materials
foremen ────┘                                    ├──> media
                                                 └──> reports

customers ──┐
            ├──> tickets
foremen ────┘
```

## SQL Скрипт для создания таблиц

Выполните следующий SQL скрипт в Supabase SQL Editor:

```sql
-- Customers table
CREATE TABLE IF NOT EXISTS public.customers (
    customer_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.customers IS 'Таблица заказчиков строительных проектов';

-- Foremen table
CREATE TABLE IF NOT EXISTS public.foremen (
    foreman_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL UNIQUE,
    supervisor_phone VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.foremen IS 'Таблица бригадиров/прорабов';

-- Projects table
CREATE TABLE IF NOT EXISTS public.projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    customer_id INTEGER NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    foreman_id INTEGER NOT NULL REFERENCES foremen(foreman_id) ON DELETE CASCADE,
    budget NUMERIC(15, 2) NOT NULL,
    spent_budget NUMERIC(15, 2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.projects IS 'Таблица строительных проектов';

-- Rooms table
CREATE TABLE IF NOT EXISTS public.rooms (
    room_id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    room_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

COMMENT ON TABLE public.rooms IS 'Таблица комнат в проектах';

-- Tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    task_id SERIAL PRIMARY KEY,
    room_id INTEGER NOT NULL REFERENCES rooms(room_id) ON DELETE CASCADE,
    task_name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

COMMENT ON TABLE public.tasks IS 'Таблица задач по комнатам';

-- Materials table
CREATE TABLE IF NOT EXISTS public.materials (
    material_id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
    material_name VARCHAR(255) NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    receipt_photo_base64 TEXT,
    purchase_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.materials IS 'Таблица материалов для задач';

-- Media table
CREATE TABLE IF NOT EXISTS public.media (
    media_id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_data_base64 TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size INTEGER NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    uploaded_by INTEGER
);

COMMENT ON TABLE public.media IS 'Таблица медиафайлов задач';

-- Reports table
CREATE TABLE IF NOT EXISTS public.reports (
    report_id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_data_base64 TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size INTEGER NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.reports IS 'Таблица отчетов';

-- Tickets table
CREATE TABLE IF NOT EXISTS public.tickets (
    ticket_id SERIAL PRIMARY KEY,
    foreman_id INTEGER REFERENCES foremen(foreman_id) ON DELETE SET NULL,
    customer_id INTEGER REFERENCES customers(customer_id) ON DELETE SET NULL,
    foreman_phone VARCHAR(50),
    supervisor_phone VARCHAR(50),
    description TEXT,
    status VARCHAR(50) DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.tickets IS 'Таблица тикетов техподдержки';

-- Create indexes for better performance
CREATE INDEX idx_projects_customer ON projects(customer_id);
CREATE INDEX idx_projects_foreman ON projects(foreman_id);
CREATE INDEX idx_rooms_project ON rooms(project_id);
CREATE INDEX idx_tasks_room ON tasks(room_id);
CREATE INDEX idx_materials_task ON materials(task_id);
CREATE INDEX idx_media_task ON media(task_id);
CREATE INDEX idx_reports_task ON reports(task_id);
CREATE INDEX idx_tickets_customer ON tickets(customer_id);
CREATE INDEX idx_tickets_foreman ON tickets(foreman_id);
```

## API Endpoints

### Authentication

#### POST /make-server-ee694789/signup
Регистрация нового пользователя (заказчика или бригадира)

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "userType": "customer", // or "foreman"
  "firstName": "Иван",
  "lastName": "Иванов",
  "middleName": "Иванович",
  "phone": "+79991234567",
  "supervisorPhone": "+79991234568" // required for foreman
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "auth-uuid",
    "email": "user@example.com",
    "userType": "customer",
    "dbRecord": { /* customer or foreman record */ }
  }
}
```

#### GET /make-server-ee694789/profile
Получить профиль текущего пользователя

**Headers:** `Authorization: Bearer <access_token>`

**Response:**
```json
{
  "success": true,
  "userType": "customer",
  "profile": {
    "customer_id": 1,
    "email": "user@example.com",
    "phone": "+79991234567",
    "first_name": "Иван",
    "last_name": "Иванов",
    "middle_name": "Иванович",
    "created_at": "2025-02-08T10:00:00Z"
  }
}
```

### Projects

#### GET /make-server-ee694789/projects
Получить все проекты пользователя (с фильтрацией по типу)

#### GET /make-server-ee694789/projects/:id
Получить детали проекта с комнатами

#### POST /make-server-ee694789/projects
Создать новый проект

**Request:**
```json
{
  "projectName": "Ремонт квартиры",
  "customerId": 1,
  "foremanId": 2,
  "budget": 500000,
  "startDate": "2025-03-01",
  "endDate": "2025-06-01"
}
```

#### PUT /make-server-ee694789/projects/:id
Обновить проект

#### DELETE /make-server-ee694789/projects/:id
Удалить проект

### Rooms

#### GET /make-server-ee694789/projects/:projectId/rooms
Получить все комнаты проекта

#### GET /make-server-ee694789/rooms/:id
Получить детали комнаты с задачами

#### POST /make-server-ee694789/projects/:projectId/rooms
Создать новую комнату

**Request:**
```json
{
  "roomName": "Кухня",
  "status": "pending",
  "description": "Ремонт кухни 12 кв.м"
}
```

#### PUT /make-server-ee694789/rooms/:id
Обновить комнату

#### DELETE /make-server-ee694789/rooms/:id
Удалить комнату

### Tasks

#### GET /make-server-ee694789/rooms/:roomId/tasks
Получить все задачи комнаты

#### GET /make-server-ee694789/tasks/:id
Получить детали задачи с материалами, медиа и отчетами

#### POST /make-server-ee694789/rooms/:roomId/tasks
Создать новую задачу

**Request:**
```json
{
  "taskName": "Поклейка обоев",
  "description": "Поклеить обои в кухне",
  "startDate": "2025-03-01",
  "endDate": "2025-03-05",
  "status": "pending"
}
```

#### PUT /make-server-ee694789/tasks/:id
Обновить задачу

#### DELETE /make-server-ee694789/tasks/:id
Удалить задачу

### Materials

#### GET /make-server-ee694789/tasks/:taskId/materials
Получить все материалы задачи

#### POST /make-server-ee694789/tasks/:taskId/materials
Создать запись о материале

**Request:**
```json
{
  "materialName": "Обои виниловые",
  "quantity": 10,
  "unitPrice": 1500,
  "purchaseDate": "2025-02-20",
  "receiptPhoto": "base64..." // optional
}
```

#### PUT /make-server-ee694789/materials/:id
Обновить материал

#### DELETE /make-server-ee694789/materials/:id
Удалить материал

### Media

#### GET /make-server-ee694789/tasks/:taskId/media
Получить все медиафайлы задачи

#### POST /make-server-ee694789/tasks/:taskId/media
Загрузить медиафайл

**Request:**
```json
{
  "fileName": "photo.jpg",
  "fileData": "base64...",
  "fileType": "image/jpeg",
  "fileSize": 1024000,
  "description": "Результат работы"
}
```

#### DELETE /make-server-ee694789/media/:id
Удалить медиафайл

### Reports

#### GET /make-server-ee694789/tasks/:taskId/reports
Получить все отчеты задачи

#### POST /make-server-ee694789/tasks/:taskId/reports
Создать отчет

#### DELETE /make-server-ee694789/reports/:id
Удалить отчет

### Tickets

#### GET /make-server-ee694789/tickets
Получить все тикеты пользователя

#### GET /make-server-ee694789/tickets/:id
Получить детали тикета

#### POST /make-server-ee694789/tickets
Создать тикет

**Request:**
```json
{
  "description": "Проблема с доступом",
  "status": "open",
  "foremanPhone": "+79991234567",
  "supervisorPhone": "+79991234568"
}
```

#### PUT /make-server-ee694789/tickets/:id
Обновить тикет

#### DELETE /make-server-ee694789/tickets/:id
Удалить тикет

## React Hooks

### useProjects

```typescript
import { useProjects } from './hooks/useProjects';

const { 
  projects, 
  loading, 
  error, 
  createProject, 
  updateProject, 
  deleteProject 
} = useProjects(accessToken);

// Создать проект
const newProject = await createProject({
  projectName: "Ремонт",
  customerId: 1,
  foremanId: 2,
  budget: 500000
});

// Обновить проект
await updateProject(projectId, { 
  status: 'in_progress' 
});
```

### useRooms

```typescript
import { useRooms } from './hooks/useRooms';

const { 
  rooms, 
  loading, 
  error, 
  fetchRooms, 
  createRoom, 
  updateRoom, 
  deleteRoom 
} = useRooms(accessToken);

// Загрузить комнаты проекта
await fetchRooms(projectId);

// Создать комнату
const newRoom = await createRoom(projectId, {
  roomName: "Кухня",
  status: "pending"
});
```

### useTasks

```typescript
import { useTasks } from './hooks/useTasks';

const { 
  tasks, 
  loading, 
  error, 
  fetchTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} = useTasks(accessToken);

// Загрузить задачи комнаты
await fetchTasks(roomId);

// Создать задачу
const newTask = await createTask(roomId, {
  taskName: "Поклейка обоев",
  status: "pending"
});
```

### useMaterials

```typescript
import { useMaterials } from './hooks/useMaterials';

const { 
  materials, 
  loading, 
  error, 
  fetchMaterials, 
  createMaterial 
} = useMaterials(accessToken);

// Загрузить материалы задачи
await fetchMaterials(taskId);

// Добавить материал
const newMaterial = await createMaterial(taskId, {
  materialName: "Обои",
  quantity: 10,
  unitPrice: 1500,
  purchaseDate: "2025-02-20"
});
```

### useTickets

```typescript
import { useTickets } from './hooks/useTickets';

const { 
  tickets, 
  loading, 
  error, 
  createTicket, 
  updateTicket 
} = useTickets(accessToken);

// Создать тикет
const newTicket = await createTicket({
  description: "Проблема",
  status: "open"
});

// Обновить статус
await updateTicket(ticketId, { 
  status: 'resolved' 
});
```

## TypeScript Types

Все типы определены в `/types/database.ts`:

```typescript
import type { 
  Customer, 
  Foreman, 
  Project, 
  Room, 
  Task, 
  Material, 
  Media, 
  Report, 
  Ticket,
  ProjectWithDetails,
  RoomWithDetails,
  TaskWithDetails
} from './types/database';
```

## Важные замечания

1. **User Mapping**: Система использует KV store для маппинга между Auth users и database records (customers/foremen)

2. **Access Control**: API автоматически фильтрует данные по user type:
   - Customers видят только свои проекты
   - Foremen видят только проекты, где они назначены

3. **Cascading Deletes**: При удалении проекта автоматически удаляются все связанные комнаты, задачи, материалы и медиа

4. **Budget Tracking**: При добавлении материала автоматически обновляется `spent_budget` проекта

5. **Base64 Files**: Медиафайлы, отчеты и чеки хранятся в Base64 формате прямо в БД

## Миграция данных

Если у вас есть существующие данные в KV store, их нужно будет мигрировать вручную в новую БД структуру.

## Поддержка

При возникновении проблем проверьте:
1. Таблицы созданы в Supabase
2. RLS policies настроены (или отключены для тестирования)
3. Access token передается корректно
4. User mapping существует в KV store
