import { useState, useCallback } from 'react';
import { projectId } from '../utils/supabase/info';
import type { Room, RoomWithDetails } from '../types/database';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ee694789`;

export function useRooms(accessToken: string | null) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async (projectId: number) => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/projects/${projectId}/rooms`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch rooms');
      }

      setRooms(data.rooms || []);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const getRoom = useCallback(async (id: number): Promise<RoomWithDetails | null> => {
    if (!accessToken) return null;

    try {
      const response = await fetch(`${API_BASE}/rooms/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch room');
      }

      return data.room;
    } catch (err) {
      console.error('Error fetching room:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch room');
      return null;
    }
  }, [accessToken]);

  const createRoom = useCallback(async (
    projectId: number,
    roomData: {
      roomName: string;
      status?: 'pending' | 'in_progress' | 'completed';
      description?: string;
    }
  ) => {
    if (!accessToken) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/projects/${projectId}/rooms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create room');
      }

      await fetchRooms(projectId);
      return data.room;
    } catch (err) {
      console.error('Error creating room:', err);
      setError(err instanceof Error ? err.message : 'Failed to create room');
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchRooms]);

  const updateRoom = useCallback(async (
    id: number,
    projectId: number,
    updates: Partial<{
      roomName: string;
      status: 'pending' | 'in_progress' | 'completed';
      description: string;
    }>
  ) => {
    if (!accessToken) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/rooms/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update room');
      }

      await fetchRooms(projectId);
      return data.room;
    } catch (err) {
      console.error('Error updating room:', err);
      setError(err instanceof Error ? err.message : 'Failed to update room');
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchRooms]);

  const deleteRoom = useCallback(async (id: number, projectId: number) => {
    if (!accessToken) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/rooms/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete room');
      }

      await fetchRooms(projectId);
      return true;
    } catch (err) {
      console.error('Error deleting room:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete room');
      return false;
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchRooms]);

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
  };
}
