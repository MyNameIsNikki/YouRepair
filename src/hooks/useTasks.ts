import { useState, useCallback } from 'react';
import { projectId } from '../utils/supabase/info';
import type { Task, TaskWithDetails } from '../types/database';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ee694789`;

export function useTasks(accessToken: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (roomId: number) => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/rooms/${roomId}/tasks`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tasks');
      }

      setTasks(data.tasks || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const getTask = useCallback(async (id: number): Promise<TaskWithDetails | null> => {
    if (!accessToken) return null;

    try {
      const response = await fetch(`${API_BASE}/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch task');
      }

      return data.task;
    } catch (err) {
      console.error('Error fetching task:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch task');
      return null;
    }
  }, [accessToken]);

  const createTask = async (
    roomId: number,
    taskData: {
      taskName: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    }
  ) => {
    if (!accessToken) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/rooms/${roomId}/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create task');
      }

      await fetchTasks(roomId);
      return data.task;
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err instanceof Error ? err.message : 'Failed to create task');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (
    id: number,
    roomId: number,
    updates: Partial<{
      taskName: string;
      description: string;
      startDate: string;
      endDate: string;
      status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    }>
  ) => {
    if (!accessToken) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update task');
      }

      await fetchTasks(roomId);
      return data.task;
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err instanceof Error ? err.message : 'Failed to update task');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (
    id: number,
    roomId: number,
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  ) => {
    return updateTask(id, roomId, { status });
  };

  const deleteTask = async (id: number, roomId: number) => {
    if (!accessToken) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete task');
      }

      await fetchTasks(roomId);
      return true;
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    getTask,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };
}