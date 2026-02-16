# Быстрая настройка PostgreSQL базы данных

## Шаг 1: Создание таблиц в Supabase

1. Откройте Supabase Dashboard
2. Перейдите в **SQL Editor**
3. Скопируйте и выполните SQL скрипт ниже:

```sql
BEGIN;

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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_customer ON projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_projects_foreman ON projects(foreman_id);
CREATE INDEX IF NOT EXISTS idx_rooms_project ON rooms(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_room ON tasks(room_id);
CREATE INDEX IF NOT EXISTS idx_materials_task ON materials(task_id);
CREATE INDEX IF NOT EXISTS idx_media_task ON media(task_id);
CREATE INDEX IF NOT EXISTS idx_reports_task ON reports(task_id);
CREATE INDEX IF NOT EXISTS idx_tickets_customer ON tickets(customer_id);
CREATE INDEX IF NOT EXISTS idx_tickets_foreman ON tickets(foreman_id);

COMMIT;
```

## Шаг 2: Настройка Row Level Security (RLS)

По умолчанию можно отключить RLS для быстрого тестирования:

```sql
-- Отключить RLS (только для разработки!)
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

**Важно:** Для production включите RLS и настройте policies!

## Шаг 3: Тестовые данные (опционально)

Добавьте тестовые данные для проверки:

```sql
-- Тестовый заказчик
INSERT INTO customers (email, phone, first_name, last_name, middle_name)
VALUES ('ivanov@example.com', '+79991234567', 'Иван', 'Иванов', 'Иванович')
ON CONFLICT (email) DO NOTHING;

-- Тестовый бригадир
INSERT INTO foremen (email, phone, supervisor_phone, first_name, last_name, middle_name)
VALUES ('petrov@example.com', '+79991234568', '+79991234569', 'Петр', 'Петров', 'Петрович')
ON CONFLICT (email) DO NOTHING;

-- Тестовый проект
INSERT INTO projects (project_name, customer_id, foreman_id, budget, spent_budget)
SELECT 'Ремонт квартиры на ул. Ленина', 1, 1, 500000, 0
WHERE EXISTS (SELECT 1 FROM customers WHERE customer_id = 1)
  AND EXISTS (SELECT 1 FROM foremen WHERE foreman_id = 1);
```

## Шаг 4: Проверка

Проверьте, что таблицы созданы:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('customers', 'foremen', 'projects', 'rooms', 'tasks', 'materials', 'media', 'reports', 'tickets');
```

Должны вернуться все 9 таблиц.

## Готово!

Теперь ваш backend готов к работе с PostgreSQL. Система автоматически:
- Создает записи customers/foremen при регистрации
- Фильтрует проекты по user type
- Управляет бюджетом проектов
- Каскадно удаляет связанные данные

## Следующие шаги

1. Протестируйте регистрацию через `/signup` endpoint
2. Создайте проект через API
3. Добавьте комнаты и задачи
4. Проверьте работу материалов и медиа

Полная документация в `/POSTGRES_INTEGRATION_GUIDE.md`
