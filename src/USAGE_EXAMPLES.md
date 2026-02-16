# Примеры использования PostgreSQL API

## Регистрация и аутентификация

### Регистрация заказчика

```typescript
const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ee694789/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`
  },
  body: JSON.stringify({
    email: 'customer@example.com',
    password: 'securePassword123',
    userType: 'customer',
    firstName: 'Иван',
    lastName: 'Иванов',
    middleName: 'Иванович',
    phone: '+79991234567'
  })
});

const data = await response.json();
console.log(data.user);
```

### Регистрация бригадира

```typescript
const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ee694789/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`
  },
  body: JSON.stringify({
    email: 'foreman@example.com',
    password: 'securePassword123',
    userType: 'foreman',
    firstName: 'Петр',
    lastName: 'Петров',
    middleName: 'Петрович',
    phone: '+79991234568',
    supervisorPhone: '+79991234569' // обязательно для бригадиров!
  })
});

const data = await response.json();
console.log(data.user);
```

### Вход в систему (через Supabase client)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'customer@example.com',
  password: 'securePassword123'
});

const accessToken = data.session?.access_token;
```

### Получение профиля

```typescript
const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ee694789/profile`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
});

const { userType, profile } = await response.json();
console.log('User type:', userType);
console.log('Profile:', profile);
```

## Работа с проектами

### Создание проекта

```typescript
import { useProjects } from './hooks/useProjects';

function MyComponent() {
  const { createProject, loading, error } = useProjects(accessToken);
  
  const handleCreateProject = async () => {
    const newProject = await createProject({
      projectName: 'Ремонт квартиры на ул. Ленина, 10',
      customerId: 1,
      foremanId: 2,
      budget: 500000,
      startDate: '2025-03-01',
      endDate: '2025-06-01'
    });
    
    console.log('Created project:', newProject);
  };
  
  return (
    <button onClick={handleCreateProject} disabled={loading}>
      Создать проект
    </button>
  );
}
```

### Получение списка проектов

```typescript
import { useProjects } from './hooks/useProjects';

function ProjectsList() {
  const { projects, loading, error } = useProjects(accessToken);
  
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  
  return (
    <ul>
      {projects.map(project => (
        <li key={project.project_id}>
          {project.project_name} - Бюджет: {project.budget} ₽
          <br />
          Заказчик: {project.customer?.first_name} {project.customer?.last_name}
          <br />
          Бригадир: {project.foreman?.first_name} {project.foreman?.last_name}
          <br />
          Статус: {project.status}
        </li>
      ))}
    </ul>
  );
}
```

### Обновление статуса проекта

```typescript
const { updateProject } = useProjects(accessToken);

const markAsInProgress = async (projectId: number) => {
  await updateProject(projectId, {
    status: 'in_progress'
  });
};
```

## Работа с комнатами

### Добавление комнаты в проект

```typescript
import { useRooms } from './hooks/useRooms';

function AddRoomForm({ projectId }: { projectId: number }) {
  const { createRoom, loading } = useRooms(accessToken);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRoom = await createRoom(projectId, {
      roomName: 'Кухня',
      status: 'pending',
      description: 'Ремонт кухни 12 кв.м - поклейка обоев, укладка плитки'
    });
    
    console.log('Created room:', newRoom);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* форма */}
    </form>
  );
}
```

### Получение комнат проекта

```typescript
import { useRooms } from './hooks/useRooms';
import { useEffect } from 'react';

function RoomsList({ projectId }: { projectId: number }) {
  const { rooms, fetchRooms, loading, error } = useRooms(accessToken);
  
  useEffect(() => {
    fetchRooms(projectId);
  }, [projectId]);
  
  return (
    <div>
      {rooms.map(room => (
        <div key={room.room_id}>
          <h3>{room.room_name}</h3>
          <p>Статус: {room.status}</p>
          <p>{room.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Изменение статуса комнаты

```typescript
const { updateRoom } = useRooms(accessToken);

const markRoomCompleted = async (roomId: number, projectId: number) => {
  await updateRoom(roomId, projectId, {
    status: 'completed'
  });
};
```

## Работа с задачами

### Создание задачи

```typescript
import { useTasks } from './hooks/useTasks';

function CreateTaskForm({ roomId }: { roomId: number }) {
  const { createTask, loading } = useTasks(accessToken);
  
  const handleCreate = async () => {
    const task = await createTask(roomId, {
      taskName: 'Поклейка обоев',
      description: 'Поклеить флизелиновые обои на стены кухни',
      startDate: '2025-03-01',
      endDate: '2025-03-05',
      status: 'pending'
    });
    
    console.log('Task created:', task);
  };
  
  return <button onClick={handleCreate}>Создать задачу</button>;
}
```

### Обновление статуса задачи

```typescript
const { updateTaskStatus } = useTasks(accessToken);

const startTask = async (taskId: number, roomId: number) => {
  await updateTaskStatus(taskId, roomId, 'in_progress');
};

const completeTask = async (taskId: number, roomId: number) => {
  await updateTaskStatus(taskId, roomId, 'completed');
};
```

### Получение задачи с деталями

```typescript
const { getTask } = useTasks(accessToken);

const loadTaskDetails = async (taskId: number) => {
  const task = await getTask(taskId);
  
  console.log('Task:', task);
  console.log('Materials:', task?.materials);
  console.log('Media:', task?.media);
  console.log('Reports:', task?.reports);
};
```

## Работа с материалами

### Добавление материала

```typescript
import { useMaterials } from './hooks/useMaterials';

function AddMaterial({ taskId }: { taskId: number }) {
  const { createMaterial, loading } = useMaterials(accessToken);
  
  const handleAdd = async () => {
    // Конвертируем фото чека в base64
    const receiptPhoto = await fileToBase64(receiptFile);
    
    const material = await createMaterial(taskId, {
      materialName: 'Обои виниловые "Палитра"',
      quantity: 10,
      unitPrice: 1500,
      purchaseDate: '2025-02-20',
      receiptPhoto: receiptPhoto // опционально
    });
    
    console.log('Material added:', material);
    console.log('Total cost:', material.quantity * material.unit_price);
  };
  
  return <button onClick={handleAdd}>Добавить материал</button>;
}

// Helper function
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
```

### Просмотр материалов задачи

```typescript
import { useMaterials } from './hooks/useMaterials';
import { useEffect } from 'react';

function MaterialsList({ taskId }: { taskId: number }) {
  const { materials, fetchMaterials, loading } = useMaterials(accessToken);
  
  useEffect(() => {
    fetchMaterials(taskId);
  }, [taskId]);
  
  const totalCost = materials.reduce(
    (sum, m) => sum + (m.quantity * m.unit_price), 
    0
  );
  
  return (
    <div>
      <h3>Материалы</h3>
      {materials.map(material => (
        <div key={material.material_id}>
          <p>{material.material_name}</p>
          <p>Количество: {material.quantity}</p>
          <p>Цена за ед.: {material.unit_price} ₽</p>
          <p>Итого: {material.quantity * material.unit_price} ₽</p>
          <p>Дата покупки: {material.purchase_date}</p>
          {material.receipt_photo_base64 && (
            <img src={material.receipt_photo_base64} alt="Чек" />
          )}
        </div>
      ))}
      <p><strong>Общая стоимость: {totalCost} ₽</strong></p>
    </div>
  );
}
```

## Работа с тикетами

### Создание тикета поддержки

```typescript
import { useTickets } from './hooks/useTickets';

function CreateTicketForm() {
  const { createTicket, loading } = useTickets(accessToken);
  
  const handleSubmit = async (description: string) => {
    const ticket = await createTicket({
      description: description,
      status: 'open',
      foremanPhone: '+79991234567',
      supervisorPhone: '+79991234568'
    });
    
    console.log('Ticket created:', ticket);
  };
  
  return (
    // форма
    <></>
  );
}
```

### Просмотр и обновление тикетов

```typescript
import { useTickets } from './hooks/useTickets';

function TicketsList() {
  const { tickets, updateTicket, loading } = useTickets(accessToken);
  
  const resolveTicket = async (ticketId: number) => {
    await updateTicket(ticketId, {
      status: 'resolved'
    });
  };
  
  const closeTicket = async (ticketId: number) => {
    await updateTicket(ticketId, {
      status: 'closed'
    });
  };
  
  return (
    <div>
      {tickets.map(ticket => (
        <div key={ticket.ticket_id}>
          <p>Статус: {ticket.status}</p>
          <p>{ticket.description}</p>
          <button onClick={() => resolveTicket(ticket.ticket_id)}>
            Решить
          </button>
          <button onClick={() => closeTicket(ticket.ticket_id)}>
            Закрыть
          </button>
        </div>
      ))}
    </div>
  );
}
```

## Загрузка медиафайлов

### Загрузка фото для задачи

```typescript
const uploadPhoto = async (taskId: number, file: File) => {
  // Конвертируем в base64
  const base64 = await fileToBase64(file);
  
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-ee694789/tasks/${taskId}/media`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: file.name,
        fileData: base64,
        fileType: file.type,
        fileSize: file.size,
        description: 'Фото результата работы'
      })
    }
  );
  
  const data = await response.json();
  return data.media;
};
```

## Комплексный пример: Полный цикл работы

```typescript
import { useProjects } from './hooks/useProjects';
import { useRooms } from './hooks/useRooms';
import { useTasks } from './hooks/useTasks';
import { useMaterials } from './hooks/useMaterials';

function FullWorkflow() {
  const { createProject } = useProjects(accessToken);
  const { createRoom } = useRooms(accessToken);
  const { createTask } = useTasks(accessToken);
  const { createMaterial } = useMaterials(accessToken);
  
  const createFullProject = async () => {
    // 1. Создаем проект
    const project = await createProject({
      projectName: 'Ремонт квартиры',
      customerId: 1,
      foremanId: 2,
      budget: 500000
    });
    
    console.log('Project created:', project.project_id);
    
    // 2. Добавляем комнату
    const room = await createRoom(project.project_id, {
      roomName: 'Кухня',
      status: 'pending'
    });
    
    console.log('Room created:', room.room_id);
    
    // 3. Создаем задачу
    const task = await createTask(room.room_id, {
      taskName: 'Поклейка обоев',
      status: 'pending'
    });
    
    console.log('Task created:', task.task_id);
    
    // 4. Добавляем материалы
    const material = await createMaterial(task.task_id, {
      materialName: 'Обои',
      quantity: 10,
      unitPrice: 1500,
      purchaseDate: new Date().toISOString().split('T')[0]
    });
    
    console.log('Material added:', material);
    console.log('Spent so far:', material.quantity * material.unit_price);
  };
  
  return (
    <button onClick={createFullProject}>
      Создать полный проект
    </button>
  );
}
```

## Error Handling

```typescript
const { createProject, error } = useProjects(accessToken);

const handleCreate = async () => {
  try {
    const project = await createProject({
      projectName: 'Test',
      customerId: 1,
      foremanId: 2,
      budget: 100000
    });
    
    if (!project) {
      console.error('Failed to create project:', error);
      alert('Ошибка создания проекта');
      return;
    }
    
    console.log('Success!', project);
  } catch (err) {
    console.error('Exception:', err);
    alert('Произошла ошибка');
  }
};
```

## Проверка доступа

```typescript
// API автоматически фильтрует данные по типу пользователя

// Для customer - видны только проекты где он заказчик
const { projects } = useProjects(customerAccessToken);

// Для foreman - видны только проекты где он бригадир
const { projects } = useProjects(foremanAccessToken);
```
