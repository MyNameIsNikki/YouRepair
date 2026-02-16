# Тестирование PostgreSQL API

## Быстрый тест через cURL

### 1. Health Check (без авторизации)

```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ee694789/health
```

**Ожидаемый ответ:**
```json
{"status":"ok","timestamp":"2025-02-08T..."}
```

### 2. Регистрация заказчика

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ee694789/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "customer@test.com",
    "password": "Test123!",
    "userType": "customer",
    "firstName": "Иван",
    "lastName": "Иванов",
    "middleName": "Иванович",
    "phone": "+79991234567"
  }'
```

### 3. Регистрация бригадира

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ee694789/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "foreman@test.com",
    "password": "Test123!",
    "userType": "foreman",
    "firstName": "Петр",
    "lastName": "Петров",
    "middleName": "Петрович",
    "phone": "+79991234568",
    "supervisorPhone": "+79991234569"
  }'
```

### 4. Вход (через Supabase SDK)

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://YOUR_PROJECT_ID.supabase.co',
  'YOUR_ANON_KEY'
);

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'customer@test.com',
  password: 'Test123!'
});

const accessToken = data.session?.access_token;
console.log('Access Token:', accessToken);
```

### 5. Получить профиль

```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ee694789/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 6. Создать проект

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ee694789/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "projectName": "Ремонт квартиры тест",
    "customerId": 1,
    "foremanId": 1,
    "budget": 500000,
    "startDate": "2025-03-01",
    "endDate": "2025-06-01"
  }'
```

### 7. Получить проекты

```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ee694789/projects \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 8. Создать комнату

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ee694789/projects/1/rooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "roomName": "Кухня",
    "status": "pending",
    "description": "Ремонт кухни 12 кв.м"
  }'
```

### 9. Создать задачу

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ee694789/rooms/1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "taskName": "Поклейка обоев",
    "description": "Поклеить флизелиновые обои",
    "status": "pending",
    "startDate": "2025-03-01",
    "endDate": "2025-03-05"
  }'
```

### 10. Добавить материал

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ee694789/tasks/1/materials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "materialName": "Обои виниловые",
    "quantity": 10,
    "unitPrice": 1500,
    "purchaseDate": "2025-02-20"
  }'
```

## Быстрый тест через JavaScript/TypeScript

Создайте файл `test-api.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
const API_BASE = `${SUPABASE_URL}/functions/v1/make-server-ee694789`;

async function testAPI() {
  console.log('🧪 Начинаем тестирование API...\n');

  // 1. Health Check
  console.log('1️⃣ Health Check...');
  const healthRes = await fetch(`${API_BASE}/health`);
  const health = await healthRes.json();
  console.log('✅ Health:', health);
  console.log('');

  // 2. Регистрация заказчика
  console.log('2️⃣ Регистрация заказчика...');
  const signupRes = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      email: `customer_${Date.now()}@test.com`,
      password: 'Test123!',
      userType: 'customer',
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
      phone: `+7999${Math.floor(Math.random() * 10000000)}`
    })
  });
  const signupData = await signupRes.json();
  console.log('✅ Signup:', signupData);
  console.log('');

  // 3. Вход
  console.log('3️⃣ Вход в систему...');
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: signupData.user.email,
    password: 'Test123!'
  });

  if (authError) {
    console.error('❌ Login error:', authError);
    return;
  }

  const accessToken = authData.session?.access_token;
  console.log('✅ Access token получен');
  console.log('');

  // 4. Получить профиль
  console.log('4️⃣ Получение профиля...');
  const profileRes = await fetch(`${API_BASE}/profile`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const profile = await profileRes.json();
  console.log('✅ Profile:', profile);
  console.log('');

  // 5. Создать проект (требуется foreman_id)
  console.log('5️⃣ Создание проекта...');
  // Для создания проекта нужен foreman_id, поэтому создадим бригадира
  const foremanSignupRes = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      email: `foreman_${Date.now()}@test.com`,
      password: 'Test123!',
      userType: 'foreman',
      firstName: 'Петр',
      lastName: 'Петров',
      middleName: 'Петрович',
      phone: `+7999${Math.floor(Math.random() * 10000000)}`,
      supervisorPhone: `+7999${Math.floor(Math.random() * 10000000)}`
    })
  });
  const foremanData = await foremanSignupRes.json();
  console.log('✅ Foreman created:', foremanData.user.dbRecord.foreman_id);

  const projectRes = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      projectName: 'Тестовый проект',
      customerId: profile.profile.customer_id,
      foremanId: foremanData.user.dbRecord.foreman_id,
      budget: 500000
    })
  });
  const project = await projectRes.json();
  console.log('✅ Project created:', project.project?.project_id);
  console.log('');

  // 6. Создать комнату
  console.log('6️⃣ Создание комнаты...');
  const roomRes = await fetch(`${API_BASE}/projects/${project.project.project_id}/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      roomName: 'Кухня',
      status: 'pending'
    })
  });
  const room = await roomRes.json();
  console.log('✅ Room created:', room.room?.room_id);
  console.log('');

  // 7. Создать задачу
  console.log('7️⃣ Создание задачи...');
  const taskRes = await fetch(`${API_BASE}/rooms/${room.room.room_id}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      taskName: 'Поклейка обоев',
      status: 'pending'
    })
  });
  const task = await taskRes.json();
  console.log('✅ Task created:', task.task?.task_id);
  console.log('');

  // 8. Добавить материал
  console.log('8️⃣ Добавление материала...');
  const materialRes = await fetch(`${API_BASE}/tasks/${task.task.task_id}/materials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      materialName: 'Обои',
      quantity: 10,
      unitPrice: 1500,
      purchaseDate: new Date().toISOString().split('T')[0]
    })
  });
  const material = await materialRes.json();
  console.log('✅ Material added:', material.material?.material_id);
  console.log('   Total cost:', material.material?.quantity * material.material?.unit_price, '₽');
  console.log('');

  // 9. Получить проекты
  console.log('9️⃣ Получение всех проектов...');
  const projectsRes = await fetch(`${API_BASE}/projects`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const projects = await projectsRes.json();
  console.log('✅ Projects count:', projects.projects?.length);
  console.log('');

  // 10. Создать тикет
  console.log('🔟 Создание тикета...');
  const ticketRes = await fetch(`${API_BASE}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      description: 'Тестовый тикет',
      status: 'open'
    })
  });
  const ticket = await ticketRes.json();
  console.log('✅ Ticket created:', ticket.ticket?.ticket_id);
  console.log('');

  console.log('🎉 Все тесты пройдены успешно!');
}

testAPI().catch(console.error);
```

## Запуск тестов

### Через Node.js:

```bash
npm install @supabase/supabase-js
npx ts-node test-api.ts
```

### Через Deno:

```bash
deno run --allow-net test-api.ts
```

## Проверка данных в БД

### Через SQL Editor в Supabase:

```sql
-- Проверить заказчиков
SELECT * FROM customers ORDER BY created_at DESC LIMIT 5;

-- Проверить бригадиров
SELECT * FROM foremen ORDER BY created_at DESC LIMIT 5;

-- Проверить проекты с деталями
SELECT 
  p.*,
  c.first_name || ' ' || c.last_name as customer_name,
  f.first_name || ' ' || f.last_name as foreman_name
FROM projects p
JOIN customers c ON p.customer_id = c.customer_id
JOIN foremen f ON p.foreman_id = f.foreman_id
ORDER BY p.created_at DESC
LIMIT 5;

-- Проверить комнаты проекта
SELECT * FROM rooms WHERE project_id = 1;

-- Проверить задачи комнаты
SELECT * FROM tasks WHERE room_id = 1;

-- Проверить материалы задачи
SELECT 
  m.*,
  (m.quantity * m.unit_price) as total_cost
FROM materials m
WHERE task_id = 1;

-- Проверить общую стоимость материалов проекта
SELECT 
  p.project_name,
  p.budget,
  p.spent_budget,
  SUM(m.quantity * m.unit_price) as calculated_spent
FROM projects p
JOIN rooms r ON r.project_id = p.project_id
JOIN tasks t ON t.room_id = r.room_id
JOIN materials m ON m.task_id = t.task_id
WHERE p.project_id = 1
GROUP BY p.project_id;
```

## Ожидаемые результаты

### ✅ Успешные тесты должны показать:

1. Health check вернул `status: "ok"`
2. Заказчик зарегистрирован (customer_id создан)
3. Бригадир зарегистрирован (foreman_id создан)
4. Профиль получен с правильным userType
5. Проект создан с обоими участниками
6. Комната создана и привязана к проекту
7. Задача создана и привязана к комнате
8. Материал добавлен (spent_budget обновлен)
9. Тикет создан

### ❌ Если что-то пошло не так:

1. **"table does not exist"** → Создайте таблицы (DATABASE_SETUP.md)
2. **"permission denied"** → Отключите RLS
3. **"foreign key constraint"** → Проверьте customer_id/foreman_id
4. **401/403** → Проверьте access token

## Полезные команды SQL

### Очистить тестовые данные:

```sql
-- ВНИМАНИЕ: Удалит все данные!
TRUNCATE TABLE 
  tickets,
  reports,
  media,
  materials,
  tasks,
  rooms,
  projects,
  foremen,
  customers
RESTART IDENTITY CASCADE;
```

### Проверить целостность:

```sql
-- Проекты без заказчика или бригадира (не должно быть)
SELECT * FROM projects p
WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.customer_id = p.customer_id)
   OR NOT EXISTS (SELECT 1 FROM foremen f WHERE f.foreman_id = p.foreman_id);

-- Orphaned rooms (не должно быть)
SELECT * FROM rooms r
WHERE NOT EXISTS (SELECT 1 FROM projects p WHERE p.project_id = r.project_id);
```

---

**Готово к тестированию! 🧪**

Замените `YOUR_PROJECT_ID` и `YOUR_ANON_KEY` на реальные значения из Supabase Dashboard.
