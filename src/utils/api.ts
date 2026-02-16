import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ee694789`;

// Helper function to get auth token from localStorage
function getAuthToken(): string {
  return localStorage.getItem('access_token') || publicAnonKey;
}

// Helper function to make API requests
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`API error on ${endpoint}:`, data);
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

// Helper function for FormData requests (file uploads)
async function apiFormDataRequest<T>(
  endpoint: string,
  formData: FormData
): Promise<T> {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`API error on ${endpoint}:`, data);
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

// ============================================
// AUTHENTICATION API
// ============================================

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  userType: 'client' | 'brigade';
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  userType: 'client' | 'brigade';
  phone?: string;
  company?: string;
}

export const authAPI = {
  signUp: async (data: SignUpData) => {
    return apiRequest<{ success: boolean; user: UserProfile }>('/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getProfile: async () => {
    return apiRequest<UserProfile>('/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (data: { name?: string; phone?: string; company?: string }) => {
    return apiRequest<{ success: boolean; profile: UserProfile }>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// ============================================
// DEMO REQUEST API
// ============================================

export interface DemoRequestData {
  name: string;
  email: string;
  phone?: string;
  userType: 'client' | 'brigade';
  message?: string;
}

export const demoRequestAPI = {
  create: async (data: DemoRequestData) => {
    return apiRequest<{ success: boolean; message: string; requestId: string }>('/demo-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async () => {
    return apiRequest<{ success: boolean; requests: any[]; total: number }>('/demo-requests', {
      method: 'GET',
    });
  },
};

// ============================================
// APARTMENT API
// ============================================

export interface Apartment {
  id: string;
  userId: string;
  name: string;
  address: string;
  totalArea: number;
  rooms: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateApartmentData {
  name: string;
  address: string;
  totalArea?: number;
}

export const apartmentAPI = {
  getAll: async () => {
    return apiRequest<{ success: boolean; apartments: Apartment[] }>('/apartments', {
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return apiRequest<{ success: boolean; apartment: Apartment }>(`/apartments/${id}`, {
      method: 'GET',
    });
  },

  create: async (data: CreateApartmentData) => {
    return apiRequest<{ success: boolean; apartment: Apartment }>('/apartments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<CreateApartmentData>) => {
    return apiRequest<{ success: boolean; apartment: Apartment }>(`/apartments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest<{ success: boolean; message: string }>(`/apartments/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================
// ROOM API
// ============================================

export interface Room {
  id: string;
  apartmentId: string;
  name: string;
  area: number;
  image: string;
  tasks: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomData {
  name: string;
  area?: number;
  image?: string;
}

export const roomAPI = {
  getAllByApartment: async (apartmentId: string) => {
    return apiRequest<{ success: boolean; rooms: Room[] }>(
      `/apartments/${apartmentId}/rooms`,
      { method: 'GET' }
    );
  },

  getById: async (id: string) => {
    return apiRequest<{ success: boolean; room: Room }>(`/rooms/${id}`, {
      method: 'GET',
    });
  },

  create: async (apartmentId: string, data: CreateRoomData) => {
    return apiRequest<{ success: boolean; room: Room }>(
      `/apartments/${apartmentId}/rooms`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  },

  update: async (id: string, data: Partial<CreateRoomData>) => {
    return apiRequest<{ success: boolean; room: Room }>(`/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest<{ success: boolean; message: string }>(`/rooms/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================
// TASK API
// ============================================

export interface Task {
  id: string;
  roomId: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'review';
  assignedTo: string;
  dueDate: string;
  materials: string[];
  media: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  name: string;
  description?: string;
  assignedTo?: string;
  dueDate?: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'review';
}

export const taskAPI = {
  getAllByRoom: async (roomId: string) => {
    return apiRequest<{ success: boolean; tasks: Task[] }>(
      `/rooms/${roomId}/tasks`,
      { method: 'GET' }
    );
  },

  getById: async (id: string) => {
    return apiRequest<{ success: boolean; task: Task }>(`/tasks/${id}`, {
      method: 'GET',
    });
  },

  create: async (roomId: string, data: CreateTaskData) => {
    return apiRequest<{ success: boolean; task: Task }>(
      `/rooms/${roomId}/tasks`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  },

  update: async (id: string, data: Partial<CreateTaskData>) => {
    return apiRequest<{ success: boolean; task: Task }>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest<{ success: boolean; message: string }>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================
// MATERIAL API
// ============================================

export interface Material {
  id: string;
  taskId: string;
  name: string;
  quantity: string;
  price: number;
  receipt: string;
  purchaseDate: string;
  createdAt: string;
}

export interface CreateMaterialData {
  name: string;
  quantity?: string;
  price?: number;
  receipt?: string;
  purchaseDate?: string;
}

export const materialAPI = {
  getAllByTask: async (taskId: string) => {
    return apiRequest<{ success: boolean; materials: Material[] }>(
      `/tasks/${taskId}/materials`,
      { method: 'GET' }
    );
  },

  create: async (taskId: string, data: CreateMaterialData) => {
    return apiRequest<{ success: boolean; material: Material }>(
      `/tasks/${taskId}/materials`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  },

  update: async (id: string, data: Partial<CreateMaterialData>) => {
    return apiRequest<{ success: boolean; material: Material }>(
      `/materials/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );
  },

  delete: async (id: string) => {
    return apiRequest<{ success: boolean; message: string }>(
      `/materials/${id}`,
      {
        method: 'DELETE',
      }
    );
  },
};

// ============================================
// MEDIA API
// ============================================

export interface Media {
  id: string;
  taskId: string;
  type: 'photo' | 'video';
  url: string;
  storagePath?: string;
  uploadedBy: string;
  uploadDate: string;
  createdAt: string;
}

export const mediaAPI = {
  getAllByTask: async (taskId: string) => {
    return apiRequest<{ success: boolean; media: Media[] }>(
      `/tasks/${taskId}/media`,
      { method: 'GET' }
    );
  },

  upload: async (taskId: string, file: File, type: 'photo' | 'video') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return apiFormDataRequest<{ success: boolean; media: Media }>(
      `/tasks/${taskId}/media/upload`,
      formData
    );
  },

  delete: async (id: string) => {
    return apiRequest<{ success: boolean; message: string }>(
      `/media/${id}`,
      {
        method: 'DELETE',
      }
    );
  },
};

// ============================================
// TICKET API
// ============================================

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  sender: string;
  senderId: string;
  message: string;
  timestamp: string;
}

export interface CreateTicketData {
  subject: string;
  message: string;
  priority?: 'low' | 'medium' | 'high';
}

export const ticketAPI = {
  getAll: async () => {
    return apiRequest<{ success: boolean; tickets: Ticket[] }>('/tickets', {
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return apiRequest<{ success: boolean; ticket: Ticket }>(`/tickets/${id}`, {
      method: 'GET',
    });
  },

  create: async (data: CreateTicketData) => {
    return apiRequest<{ success: boolean; ticket: Ticket }>('/tickets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: { status?: string; priority?: string }) => {
    return apiRequest<{ success: boolean; ticket: Ticket }>(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  addMessage: async (id: string, message: string) => {
    return apiRequest<{ success: boolean; ticket: Ticket }>(
      `/tickets/${id}/messages`,
      {
        method: 'POST',
        body: JSON.stringify({ message }),
      }
    );
  },
};

// ============================================
// HEALTH CHECK
// ============================================

export const healthAPI = {
  check: async () => {
    return apiRequest<{ status: string; timestamp: string }>('/health', {
      method: 'GET',
    });
  },
};
