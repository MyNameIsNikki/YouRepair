// Database types for PostgreSQL schema

export interface Customer {
  customer_id: number;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  created_at: string;
}

export interface Foreman {
  foreman_id: number;
  email: string;
  phone: string;
  supervisor_phone: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  created_at: string;
}

export interface Project {
  project_id: number;
  project_name: string;
  customer_id: number;
  foreman_id: number;
  budget: number;
  spent_budget: number;
  start_date?: string;
  end_date?: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
  created_at: string;
}

export interface Room {
  room_id: number;
  project_id: number;
  room_name: string;
  status: 'pending' | 'in_progress' | 'completed';
  description?: string;
  created_at: string;
  completed_at?: string;
}

export interface Task {
  task_id: number;
  room_id: number;
  task_name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  completed_at?: string;
}

export interface Material {
  material_id: number;
  task_id: number;
  material_name: string;
  quantity: number;
  unit_price: number;
  receipt_photo_base64?: string;
  purchase_date: string;
  created_at: string;
}

export interface Media {
  media_id: number;
  task_id: number;
  file_name: string;
  file_data_base64: string;
  file_type: string;
  file_size: number;
  upload_date: string;
  description?: string;
  uploaded_by?: number;
}

export interface Report {
  report_id: number;
  task_id: number;
  file_name: string;
  file_data_base64: string;
  file_type: string;
  file_size: number;
  upload_date: string;
}

export interface Ticket {
  ticket_id: number;
  foreman_id?: number;
  customer_id?: number;
  foreman_phone?: string;
  supervisor_phone?: string;
  description?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
}

// Extended types with relations
export interface ProjectWithDetails extends Project {
  customer?: Customer;
  foreman?: Foreman;
  rooms?: Room[];
}

export interface RoomWithDetails extends Room {
  tasks?: Task[];
  project?: Project;
}

export interface TaskWithDetails extends Task {
  materials?: Material[];
  media?: Media[];
  reports?: Report[];
  room?: Room;
}

// Database table names
export const Tables = {
  CUSTOMERS: 'customers',
  FOREMEN: 'foremen',
  PROJECTS: 'projects',
  ROOMS: 'rooms',
  TASKS: 'tasks',
  MATERIALS: 'materials',
  MEDIA: 'media',
  REPORTS: 'reports',
  TICKETS: 'tickets',
} as const;
