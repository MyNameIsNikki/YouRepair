# Архитектура Backend API для "ВашРемонт"

## 📐 Общая архитектура

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React      │  │  React       │  │   Supabase   │      │
│  │  Components  │  │   Hooks      │  │  Auth Client │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │   API Client    │                        │
│                   │  (/utils/api.ts)│                        │
│                   └────────┬────────┘                        │
└────────────────────────────┼──────────────────────────────────┘
                             │
                    HTTP/REST API
                    Authorization Header
                             │
┌────────────────────────────▼──────────────────────────────────┐
│                      EDGE FUNCTION                            │
│  ┌──────────────────────────────────────────────────────────┐│
│  │              Hono Web Server                             ││
│  │         (/supabase/functions/server/index.tsx)           ││
│  │                                                           ││
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ ││
│  │  │  Auth    │  │ Business │  │ Storage  │  │  CORS   │ ││
│  │  │Middleware│  │  Logic   │  │ Manager  │  │  Logger │ ││
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ ││
│  └──────────────────────────────────────────────────────────┘│
│                            │                                  │
│                   ┌────────┴────────┐                         │
│                   │                 │                         │
└───────────────────┼─────────────────┼─────────────────────────┘
                    │                 │
                    ▼                 ▼
         ┌──────────────────┐  ┌──────────────────┐
         │   KV Store       │  │  Supabase        │
         │  (Postgres)      │  │  Storage         │
         │                  │  │  (S3-compatible) │
         └──────────────────┘  └──────────────────┘
```

## 🔄 Data Flow

### 1. Создание квартиры (Create Apartment)

```
User Action (Frontend)
         │
         ▼
┌─────────────────────┐
│ React Component     │
│ const { create } =  │
│   useApartments()   │
└──────────┬──────────┘
           │
           │ createApartment({ name, address })
           ▼
┌─────────────────────┐
│ React Hook          │
│ /hooks/             │
│ useApartments.ts    │
└──────────┬──────────┘
           │
           │ apartmentAPI.create(data)
           ▼
┌─────────────────────┐
│ API Client          │
│ /utils/api.ts       │
│                     │
│ POST /apartments    │
│ Authorization:      │
│   Bearer {token}    │
└──────────┬──────────┘
           │
           │ HTTP Request
           ▼
┌─────────────────────────────────────────┐
│ Edge Function                           │
│ /supabase/functions/server/index.tsx    │
│                                          │
│ 1. Verify Authorization                 │
│    const user = await getAuthUser(...)  │
│                                          │
│ 2. Validate Input                       │
│    if (!name || !address) return 400    │
│                                          │
│ 3. Create Apartment Object              │
│    const apartment = {                  │
│      id: 'apt_...',                     │
│      userId: user.id,                   │
│      name, address, ...                 │
│    }                                    │
│                                          │
│ 4. Save to KV Store                     │
│    await kv.set(`apartment:${id}`, ...)│
│    await kv.set(`user_apartments:...`) │
│                                          │
│ 5. Return Response                      │
│    return { success: true, apartment }  │
└──────────┬──────────────────────────────┘
           │
           │ JSON Response
           ▼
┌─────────────────────┐
│ API Client          │
│ Returns apartment   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ React Hook          │
│ Updates state       │
│ setApartments(...)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ React Component     │
│ Re-renders with     │
│ new apartment       │
└─────────────────────┘
```

### 2. Загрузка медиафайла (Upload Media)

```
User Action (File Selection)
         │
         ▼
┌──────────────────────────┐
│ React Component          │
│ <input type="file" />    │
└──────────┬───────────────┘
           │
           │ mediaAPI.upload(taskId, file, 'photo')
           ▼
┌──────────────────────────┐
│ API Client               │
│ /utils/api.ts            │
│                          │
│ 1. Create FormData       │
│    formData.append(...)  │
│                          │
│ 2. POST /tasks/:id/media │
│    Content-Type:         │
│      multipart/form-data │
└──────────┬───────────────┘
           │
           │ HTTP Request (FormData)
           ▼
┌────────────────────────────────────────┐
│ Edge Function                          │
│                                         │
│ 1. Verify Authorization & Access       │
│    const user = await getAuthUser(...) │
│    const task = await kv.get(...)     │
│    Verify user owns apartment          │
│                                         │
│ 2. Extract File from FormData          │
│    const file = formData.get('file')   │
│                                         │
│ 3. Generate Unique Filename            │
│    const fileName =                    │
│      `${userId}/${taskId}/...`         │
│                                         │
│ 4. Upload to Supabase Storage          │
│    await supabaseAdmin.storage         │
│      .from('make-ee694789-media')      │
│      .upload(fileName, fileBuffer)     │
│                                         │
│ 5. Create Media Record in KV           │
│    const media = {                     │
│      id, taskId, type, storagePath,    │
│      uploadedBy, uploadDate            │
│    }                                   │
│    await kv.set(`media:${id}`, media)  │
│                                         │
│ 6. Update Task's Media Array           │
│    task.media.push(mediaId)            │
│    await kv.set(`task:${taskId}`, ...) │
│                                         │
│ 7. Generate Signed URL                 │
│    const { signedUrl } =               │
│      await storage.createSignedUrl()   │
│                                         │
│ 8. Return Response                     │
│    return {                            │
│      success: true,                    │
│      media: { ...media, url: signedUrl}│
│    }                                   │
└────────────┬───────────────────────────┘
             │
             │ JSON Response
             ▼
┌────────────────────────┐
│ API Client             │
│ Returns media with URL │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│ React Component        │
│ Displays uploaded      │
│ image using URL        │
└────────────────────────┘
```

### 3. Аутентификация (Sign In)

```
User Login
    │
    ▼
┌──────────────────────┐
│ React Component      │
│ <AuthModal />        │
└──────────┬───────────┘
           │
           │ useAuth hook
           │ login(email, password)
           ▼
┌──────────────────────┐
│ /hooks/useAuth.ts    │
│                      │
│ signIn(email, pwd)   │
└──────────┬───────────┘
           │
           │
           ▼
┌───────────────────────────────┐
│ Supabase Auth Client          │
│ /utils/supabase/client.ts     │
│                               │
│ supabase.auth                 │
│   .signInWithPassword({...})  │
└──────────┬────────────────────┘
           │
           │ Direct to Supabase Auth Service
           ▼
┌───────────────────────────────┐
│ Supabase Auth Service         │
│ (Managed by Supabase)         │
│                               │
│ 1. Verify credentials         │
│ 2. Generate access_token      │
│ 3. Generate refresh_token     │
└──────────┬────────────────────┘
           │
           │ Returns { session, user }
           ▼
┌───────────────────────────────┐
│ Supabase Auth Client          │
│                               │
│ 1. Store tokens               │
│ 2. Setup auto-refresh         │
│ 3. Save to localStorage       │
│    - access_token             │
└──────────┬────────────────────┘
           │
           │ session.access_token
           ▼
┌───────────────────────────────┐
│ useAuth hook                  │
│                               │
│ 1. Fetch user profile from API│
│    authAPI.getProfile()       │
│                               │
│ 2. Update state               │
│    setUser(profile)           │
└──────────┬────────────────────┘
           │
           ▼
┌───────────────────────────────┐
│ React Component               │
│ User is logged in             │
│ Redirect to dashboard         │
└───────────────────────────────┘

All subsequent API calls:
┌─────────────────────────────┐
│ API Request                 │
│ Authorization:              │
│   Bearer {access_token}     │
└─────────────────────────────┘
```

## 🗄️ Data Models

### KV Store Schema

```typescript
// User Profile
profile:{userId} = {
  id: string,
  email: string,
  name: string,
  userType: 'client' | 'brigade',
  phone: string,
  company: string,
  updatedAt: timestamp
}

// User's Apartments Index
user_apartments:{userId} = [
  'apt_1234567890_abc',
  'apt_9876543210_xyz',
  ...
]

// Apartment
apartment:{apartmentId} = {
  id: string,
  userId: string,
  name: string,
  address: string,
  totalArea: number,
  rooms: ['room_id_1', 'room_id_2', ...],
  createdAt: timestamp,
  updatedAt: timestamp
}

// Room
room:{roomId} = {
  id: string,
  apartmentId: string,
  name: string,
  area: number,
  image: string,
  tasks: ['task_id_1', 'task_id_2', ...],
  createdAt: timestamp,
  updatedAt: timestamp
}

// Task
task:{taskId} = {
  id: string,
  roomId: string,
  name: string,
  description: string,
  status: 'pending' | 'in-progress' | 'completed' | 'review',
  assignedTo: string,
  dueDate: string,
  materials: ['mat_id_1', 'mat_id_2', ...],
  media: ['media_id_1', 'media_id_2', ...],
  createdAt: timestamp,
  updatedAt: timestamp
}

// Material
material:{materialId} = {
  id: string,
  taskId: string,
  name: string,
  quantity: string,
  price: number,
  receipt: string,
  purchaseDate: string,
  createdAt: timestamp
}

// Media
media:{mediaId} = {
  id: string,
  taskId: string,
  type: 'photo' | 'video',
  url: string,              // Empty in DB
  storagePath: string,      // Path in Supabase Storage
  uploadedBy: string,
  uploadDate: string,
  createdAt: timestamp
}

// Ticket
ticket:{ticketId} = {
  id: string,
  userId: string,
  subject: string,
  message: string,
  priority: 'low' | 'medium' | 'high',
  status: 'open' | 'in-progress' | 'resolved' | 'closed',
  messages: [
    {
      id: string,
      sender: string,
      senderId: string,
      message: string,
      timestamp: timestamp
    }
  ],
  createdAt: timestamp,
  updatedAt: timestamp
}

// User's Tickets Index
user_tickets:{userId} = [
  'ticket_1234567890_abc',
  ...
]

// Demo Request
demo_request:{requestId} = {
  id: string,
  name: string,
  email: string,
  phone: string,
  userType: 'client' | 'brigade',
  message: string,
  status: 'new',
  createdAt: timestamp
}

// Demo Requests Index
demo_requests_index = [
  'demo_1234567890_abc',
  ...
]
```

### Supabase Storage Structure

```
make-ee694789-media/
├── {userId}/
│   ├── {taskId}/
│   │   ├── 1234567890_abc123.jpg
│   │   ├── 1234567890_def456.png
│   │   └── 1234567890_ghi789.mp4
│   └── {taskId}/
│       └── ...
└── {userId}/
    └── ...
```

## 🔐 Security Model

### Authentication Flow

```
┌──────────────┐
│  Frontend    │
│              │
│  User enters │
│  credentials │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────┐
│  Supabase Auth               │
│                              │
│  1. Validates credentials    │
│  2. Generates JWT tokens     │
│     - access_token (1h)      │
│     - refresh_token (30d)    │
└──────┬───────────────────────┘
       │
       │ tokens
       ▼
┌──────────────────────────────┐
│  Frontend                    │
│                              │
│  localStorage.setItem(       │
│    'access_token', token     │
│  )                           │
└──────┬───────────────────────┘
       │
       │ All API calls include:
       │ Authorization: Bearer {access_token}
       ▼
┌──────────────────────────────┐
│  Edge Function               │
│                              │
│  1. Extract token            │
│  2. Verify with Supabase     │
│     supabaseAdmin.auth       │
│       .getUser(token)        │
│  3. Get user.id              │
│  4. Check resource ownership │
└──────────────────────────────┘
```

### Authorization Checks

```typescript
// Example: Update Task
app.put("/tasks/:id", async (c) => {
  // 1. Get authenticated user
  const user = await getAuthenticatedUser(authHeader);
  if (!user) return 401;

  // 2. Get task
  const task = await kv.get(`task:${taskId}`);
  if (!task) return 404;

  // 3. Get room (parent)
  const room = await kv.get(`room:${task.roomId}`);

  // 4. Get apartment (grandparent)
  const apartment = await kv.get(`apartment:${room.apartmentId}`);

  // 5. Check ownership
  if (apartment.userId !== user.id) return 403;

  // 6. Proceed with update
  // ...
});
```

### Storage Security

```
┌──────────────────────────────────┐
│  Private Bucket                  │
│  make-ee694789-media             │
│                                  │
│  • Public access: DISABLED       │
│  • Access via signed URLs only   │
│  • URL expiry: 1 hour            │
│  • File size limit: 50 MB        │
└──────────────────────────────────┘

Access Flow:
1. User requests media
2. API verifies ownership
3. Generate signed URL
4. Return URL to client
5. Client uses URL (valid 1h)
```

## ⚡ Performance Optimizations

### 1. Batch Reads

```typescript
// ❌ Bad: Multiple individual reads
for (const roomId of apartment.rooms) {
  const room = await kv.get(`room:${roomId}`);
  rooms.push(room);
}

// ✅ Good: Single batch read
const roomKeys = apartment.rooms.map(id => `room:${id}`);
const rooms = await kv.mget(roomKeys);
```

### 2. React Hooks Caching

```typescript
// useApartments hook caches apartments list
const { apartments } = useApartments();
// No re-fetch unless explicitly refreshed

// Manual refresh when needed
await refresh();
```

### 3. Lazy Loading

```typescript
// Load apartment details only when needed
const apartment = await getApartmentById(id);

// Load rooms only for current apartment
const rooms = await roomAPI.getAllByApartment(apartmentId);
```

### 4. Signed URL Caching

```typescript
// Media URLs cached in state for 1 hour
const [mediaUrls, setMediaUrls] = useState<Map<string, string>>();

// Refresh URLs before expiry
useEffect(() => {
  const timer = setTimeout(() => {
    refreshMediaUrls();
  }, 50 * 60 * 1000); // 50 minutes

  return () => clearTimeout(timer);
}, []);
```

## 🔄 Error Handling

### Error Flow

```
┌─────────────────────┐
│  API Request        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Edge Function      │
│                     │
│  try {              │
│    // Logic         │
│  } catch (error) {  │
│    console.error()  │
│    return {         │
│      error: msg     │
│    }                │
│  }                  │
└──────────┬──────────┘
           │
           │ { error: "..." }
           ▼
┌─────────────────────┐
│  API Client         │
│                     │
│  if (!response.ok) {│
│    throw new Error()│
│  }                  │
└──────────┬──────────┘
           │
           │ Exception
           ▼
┌─────────────────────┐
│  React Hook/Comp    │
│                     │
│  try {              │
│    await api.call() │
│  } catch (error) {  │
│    setError(...)    │
│    toast.error(...) │
│  }                  │
└─────────────────────┘
```

### Error Types

```typescript
// 400 Bad Request
return c.json({ error: 'Missing required field: name' }, 400);

// 401 Unauthorized
return c.json({ error: 'Unauthorized: Please sign in' }, 401);

// 403 Forbidden
return c.json({ error: 'Forbidden: Access denied' }, 403);

// 404 Not Found
return c.json({ error: 'Apartment not found' }, 404);

// 500 Internal Server Error
return c.json({ error: `Failed to create: ${error.message}` }, 500);
```

## 📊 Monitoring & Logging

### Server-Side Logging

```typescript
// All routes log via Hono logger
app.use('*', logger(console.log));

// Error logging
console.error('Create apartment error:', error);

// Logs available in:
// Supabase Dashboard → Edge Functions → Logs
```

### Client-Side Logging

```typescript
// API errors logged to console
console.error('API error on /apartments:', data);

// User-facing errors via toast
toast.error('Failed to create apartment');
```

## 🚀 Deployment

### Edge Function Deployment

```bash
# Automatically deployed to:
https://{projectId}.supabase.co/functions/v1/make-server-ee694789

# All routes prefixed with /make-server-ee694789
```

### Environment Variables

```
SUPABASE_URL              # Auto-provided
SUPABASE_ANON_KEY        # Auto-provided
SUPABASE_SERVICE_ROLE_KEY # Auto-provided
```

### Bucket Creation

```typescript
// Auto-created on first function invocation
initializeStorage();
// Creates: make-ee694789-media (private bucket)
```

## 📈 Scalability Considerations

### Current Limitations

1. **KV Store** - Suitable for prototyping, limited by Postgres performance
2. **No pagination** - All lists returned in full
3. **No search/filtering** - Client-side filtering required
4. **No caching layer** - Direct KV reads on every request

### Future Improvements

1. **Add pagination** - Implement offset/limit for large lists
2. **Add search** - Implement full-text search via Postgres
3. **Add caching** - Redis/Memcached for frequently accessed data
4. **Add indexing** - Create secondary indexes for common queries
5. **Optimize reads** - Denormalize data for faster reads
6. **Add real-time** - Supabase Realtime for live updates

---

**Last Updated:** February 7, 2026  
**Architecture Version:** 1.0
