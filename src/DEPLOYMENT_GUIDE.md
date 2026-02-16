# 🚀 Deployment Guide - Backend API "ВашРемонт"

## 📋 Предварительные требования

### Что уже настроено

✅ Supabase проект подключен  
✅ Edge Function сервер развернут  
✅ KV Store готов к использованию  
✅ Supabase Auth настроен  
✅ Storage bucket будет создан автоматически при первом запуске  

### Что нужно для продакшена

- [ ] Настроить OAuth провайдеры (опционально)
- [ ] Настроить email провайдер (опционально)
- [ ] Настроить кастомный домен (опционально)
- [ ] Настроить мониторинг и алерты

---

## 🔧 Первоначальная настройка

### Шаг 1: Проверка подключения

```typescript
import { healthAPI } from './utils/api';

// Проверить, что API работает
const { status, timestamp } = await healthAPI.check();
console.log('API Status:', status); // должно быть "ok"
```

### Шаг 2: Проверка аутентификации

```typescript
import { authAPI } from './utils/api';

// Создать тестового пользователя
const { user } = await authAPI.signUp({
  email: 'test@example.com',
  password: 'test123',
  name: 'Test User',
  userType: 'client'
});

console.log('User created:', user);
```

### Шаг 3: Проверка Storage

```typescript
import { mediaAPI } from './utils/api';

// Создать тестовую задачу и загрузить файл
const { task } = await taskAPI.create(roomId, {
  name: 'Test Task',
  status: 'pending'
});

const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
const { media } = await mediaAPI.upload(task.id, testFile, 'photo');

console.log('Media uploaded:', media.url);
```

---

## 🔐 Настройка OAuth провайдеров (Опционально)

### Google OAuth

1. **Создайте OAuth приложение в Google Cloud Console:**
   - Перейдите в https://console.cloud.google.com
   - Создайте новый проект или выберите существующий
   - Включите Google+ API
   - Создайте OAuth 2.0 Client ID
   - Добавьте Authorized redirect URIs:
     ```
     https://{your-project-ref}.supabase.co/auth/v1/callback
     ```

2. **Настройте в Supabase Dashboard:**
   - Откройте Supabase Dashboard
   - Перейдите в Authentication → Providers
   - Включите Google
   - Введите Client ID и Client Secret
   - Сохраните изменения

3. **Используйте в коде:**
   ```typescript
   import { signInWithProvider } from './utils/supabase/client';
   
   await signInWithProvider('google');
   ```

**Документация:** https://supabase.com/docs/guides/auth/social-login/auth-google

### Github OAuth

1. **Создайте OAuth приложение на Github:**
   - Перейдите в Settings → Developer settings → OAuth Apps
   - Создайте New OAuth App
   - Authorization callback URL:
     ```
     https://{your-project-ref}.supabase.co/auth/v1/callback
     ```

2. **Настройте в Supabase Dashboard:**
   - Authentication → Providers → Github
   - Введите Client ID и Client Secret

3. **Используйте в коде:**
   ```typescript
   await signInWithProvider('github');
   ```

**Документация:** https://supabase.com/docs/guides/auth/social-login/auth-github

---

## 📧 Настройка Email (Опционально)

По умолчанию email автоматически подтверждается (`email_confirm: true`), так как email-провайдер не настроен.

### Для продакшена с email-провайдером:

1. **Настройте SMTP в Supabase Dashboard:**
   - Settings → Auth → SMTP Settings
   - Введите SMTP credentials

2. **Обновите signup эндпоинт:**
   ```typescript
   // В /supabase/functions/server/index.tsx
   // Удалите email_confirm: true
   const { data, error } = await supabaseAdmin.auth.admin.createUser({
     email,
     password,
     user_metadata: { name, user_type: userType },
     // email_confirm: true, // <- Удалите эту строку
   });
   ```

3. **Настройте email templates:**
   - Authentication → Email Templates
   - Кастомизируйте шаблоны для:
     - Confirmation email
     - Reset password email
     - Magic link email

---

## 🌐 Настройка кастомного домена (Опционально)

### Для API эндпоинтов:

1. **Настройте домен в Supabase:**
   - Settings → API → Custom Domains
   - Добавьте ваш домен

2. **Обновите API_BASE_URL:**
   ```typescript
   // В /utils/api.ts
   const API_BASE_URL = 'https://api.вашремонт.рф/functions/v1/make-server-ee694789';
   ```

### Для фронтенда:

Используйте любой hosting (Vercel, Netlify, etc.)

---

## 📊 Мониторинг и логирование

### Просмотр логов Edge Function

1. Откройте Supabase Dashboard
2. Edge Functions → make-server-ee694789 → Logs
3. Фильтруйте по уровню (Info, Warning, Error)

### Типы логов:

```typescript
// Все запросы логируются автоматически
app.use('*', logger(console.log));

// Ошибки логируются с контекстом
console.error('Create apartment error:', error);
console.error('Authorization error while signing in:', error);
```

### Настройка алертов:

В Supabase Dashboard можно настроить:
- Email уведомления при ошибках
- Webhook при превышении лимитов
- Slack интеграция

---

## 🧪 Тестирование API

### Ручное тестирование через curl

```bash
# Health check
curl https://{projectId}.supabase.co/functions/v1/make-server-ee694789/health

# Создать demo request (без авторизации)
curl -X POST https://{projectId}.supabase.co/functions/v1/make-server-ee694789/demo-requests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {publicAnonKey}" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "userType": "client"
  }'

# Получить квартиры (с авторизацией)
curl https://{projectId}.supabase.co/functions/v1/make-server-ee694789/apartments \
  -H "Authorization: Bearer {access_token}"
```

### Автоматизированное тестирование

Создайте файл `/tests/api.test.ts`:

```typescript
import { authAPI, apartmentAPI, taskAPI } from '../utils/api';
import { signIn } from '../utils/supabase/client';

describe('API Tests', () => {
  let accessToken: string;
  
  beforeAll(async () => {
    // Создать тестового пользователя
    await authAPI.signUp({
      email: 'test@example.com',
      password: 'test123',
      name: 'Test User',
      userType: 'client'
    });
    
    // Войти
    const { session } = await signIn('test@example.com', 'test123');
    accessToken = session.access_token;
  });
  
  test('should create apartment', async () => {
    const { apartment } = await apartmentAPI.create({
      name: 'Test Apartment',
      address: 'Test Address',
      totalArea: 50
    });
    
    expect(apartment.name).toBe('Test Apartment');
    expect(apartment.userId).toBeDefined();
  });
  
  test('should get apartments', async () => {
    const { apartments } = await apartmentAPI.getAll();
    expect(apartments).toBeInstanceOf(Array);
    expect(apartments.length).toBeGreaterThan(0);
  });
  
  // Добавьте больше тестов...
});
```

---

## 🔒 Безопасность в продакшене

### Checklist безопасности:

- [x] CORS настроен корректно
- [x] SUPABASE_SERVICE_ROLE_KEY используется только на сервере
- [x] Access tokens с auto-refresh
- [x] Row Level Security (проверка userId)
- [x] Приватные Storage buckets
- [x] Подписанные URLs с ограниченным временем жизни
- [ ] Rate limiting (добавьте при необходимости)
- [ ] Input validation (расширьте при необходимости)
- [ ] SQL injection защита (KV Store безопасен по умолчанию)

### Рекомендации:

1. **Не храните чувствительные данные в localStorage**
   - Access token хранится, но это допустимо для прототипа
   - Для продакшена рассмотрите httpOnly cookies

2. **Валидируйте input на сервере**
   ```typescript
   if (!email || !email.includes('@')) {
     return c.json({ error: 'Invalid email' }, 400);
   }
   ```

3. **Ограничьте размер файлов**
   ```typescript
   // В Storage bucket настройках
   fileSizeLimit: 52428800, // 50MB
   ```

4. **Используйте HTTPS везде**
   - Supabase использует HTTPS по умолчанию
   - Убедитесь, что фронтенд тоже на HTTPS

---

## 📈 Performance оптимизации

### Database оптимизации:

1. **Используйте batch операции:**
   ```typescript
   // ❌ Bad
   for (const id of ids) {
     await kv.get(`apartment:${id}`);
   }
   
   // ✅ Good
   await kv.mget(ids.map(id => `apartment:${id}`));
   ```

2. **Денормализуйте данные при необходимости:**
   ```typescript
   // Храните часто используемые данные вместе
   const apartment = {
     id: 'apt_123',
     name: 'Квартира',
     roomsCount: 4, // Денормализованное значение
     rooms: ['room_1', 'room_2', ...] // Ссылки
   };
   ```

### Storage оптимизации:

1. **Генерируйте thumbnails:**
   ```typescript
   // Создавайте миниатюры для изображений
   // Храните в отдельной папке thumbnails/
   ```

2. **Используйте CDN:**
   - Supabase Storage использует CDN по умолчанию
   - Подписанные URLs кэшируются

### React оптимизации:

1. **Используйте React.memo:**
   ```typescript
   export const TaskItem = React.memo(({ task }) => {
     // Component code
   });
   ```

2. **Debounce частые обновления:**
   ```typescript
   import { debounce } from 'lodash';
   
   const debouncedUpdate = debounce(async (data) => {
     await taskAPI.update(taskId, data);
   }, 500);
   ```

---

## 🔄 Миграция данных

### Из демо в продакшен:

Если вы тестировали на демо-данных и хотите перейти на продакшен:

1. **Экспорт данных:**
   ```typescript
   // Получить все данные пользователя
   const { apartments } = await apartmentAPI.getAll();
   
   // Сохранить в JSON
   const backup = JSON.stringify(apartments);
   localStorage.setItem('backup', backup);
   ```

2. **Импорт данных:**
   ```typescript
   // Восстановить из JSON
   const backup = JSON.parse(localStorage.getItem('backup'));
   
   for (const apt of backup) {
     await apartmentAPI.create(apt);
   }
   ```

### ВАЖНО: 
KV Store НЕ поддерживает SQL миграции. Все изменения структуры делаются через код.

---

## 🌍 Scaling рекомендации

### Когда масштабировать:

1. **Больше 1000 пользователей:**
   - Добавьте pagination для списков
   - Внедрите поиск и фильтрацию
   - Рассмотрите Redis для кэширования

2. **Больше 10,000 запросов/день:**
   - Добавьте rate limiting
   - Оптимизируйте частые запросы
   - Рассмотрите read replicas

3. **Больше 100GB данных:**
   - Переходите с KV Store на полноценную Postgres схему
   - Используйте партиционирование таблиц
   - Настройте архивирование старых данных

### Рекомендованная архитектура для scale:

```
Frontend → Load Balancer → Edge Functions → Redis → Postgres
                                           ↓
                                      S3/Storage
```

---

## 🐛 Debugging в продакшене

### Включите verbose логирование:

```typescript
// В /supabase/functions/server/index.tsx
console.log('[INFO] Processing request:', {
  method: c.req.method,
  path: c.req.path,
  userId: user?.id,
  timestamp: new Date().toISOString()
});
```

### Мониторьте ключевые метрики:

1. **Response time:**
   ```typescript
   const start = Date.now();
   // ... обработка запроса
   const duration = Date.now() - start;
   console.log(`[PERF] Request took ${duration}ms`);
   ```

2. **Error rate:**
   - Отслеживайте количество 500 ошибок
   - Настройте алерты при превышении порога

3. **Storage usage:**
   - Мониторьте размер Storage bucket
   - Настройте алерты при достижении лимита

### Debugging tools:

- **Supabase Dashboard Logs** - для просмотра логов
- **Browser DevTools Network** - для анализа запросов
- **React DevTools Profiler** - для оптимизации React
- **Lighthouse** - для анализа производительности

---

## ✅ Production Checklist

Перед запуском в продакшен убедитесь:

### Backend:
- [ ] Edge Function развернута и доступна
- [ ] Storage bucket создан и настроен
- [ ] Все эндпоинты протестированы
- [ ] Логирование настроено
- [ ] Error handling работает
- [ ] CORS настроен корректно

### Auth:
- [ ] Signup/Signin работают
- [ ] Access tokens обновляются автоматически
- [ ] OAuth провайдеры настроены (если нужно)
- [ ] Email провайдер настроен (если нужно)

### Security:
- [ ] Row Level Security работает
- [ ] Storage buckets приватные
- [ ] Input validation достаточна
- [ ] Rate limiting настроен (если нужно)

### Frontend:
- [ ] Все hooks работают корректно
- [ ] Компоненты отображаются правильно
- [ ] Loading states показываются
- [ ] Errors обрабатываются и отображаются
- [ ] Toast notifications работают

### Performance:
- [ ] Batch операции используются
- [ ] React.memo применяется где нужно
- [ ] Debounce для частых операций
- [ ] Images оптимизированы

### Monitoring:
- [ ] Логи доступны в Dashboard
- [ ] Алерты настроены
- [ ] Метрики отслеживаются
- [ ] Backup стратегия определена

---

## 📞 Поддержка

### При возникновении проблем:

1. **Проверьте логи:**
   - Supabase Dashboard → Edge Functions → Logs

2. **Проверьте документацию:**
   - [QUICK_START.md](./QUICK_START.md)
   - [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
   - [INTEGRATION_EXAMPLES.md](./INTEGRATION_EXAMPLES.md)

3. **Проверьте примеры:**
   - 17 готовых примеров в INTEGRATION_EXAMPLES.md

4. **Обратитесь к Supabase Docs:**
   - https://supabase.com/docs

---

## 🎉 Готово!

Ваш backend API готов к развертыванию в продакшен!

**Next Steps:**
1. Пройдите Production Checklist
2. Протестируйте все критичные сценарии
3. Настройте мониторинг
4. Запускайте! 🚀

---

**Last Updated:** 7 февраля 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
