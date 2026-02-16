export interface Material {
  id: string;
  name: string;
  quantity: string;
  price: number;
  receipt: string;
  purchaseDate: string;
}

export interface Media {
  id: string;
  type: 'photo' | 'video';
  url: string;
  uploadedBy: string;
  uploadDate: string;
  taskId: string;
}

export interface Task {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'review';
  description: string;
  materials: Material[];
  media: Media[];
  assignedTo?: string;
  dueDate?: string;
}

export interface Room {
  id: string;
  name: string;
  area: number;
  tasks: Task[];
  image: string;
}

export interface Apartment {
  id: string;
  name: string;
  address: string;
  totalArea: number;
  rooms: Room[];
}
