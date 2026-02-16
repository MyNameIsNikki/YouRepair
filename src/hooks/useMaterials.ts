import { useState, useCallback } from 'react';
import { projectId } from '../utils/supabase/info';
import type { Material } from '../types/database';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ee694789`;

export function useMaterials(accessToken: string | null) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMaterials = useCallback(async (taskId: number) => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}/materials`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch materials');
      }

      setMaterials(data.materials || []);
    } catch (err) {
      console.error('Error fetching materials:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const createMaterial = useCallback(async (
    taskId: number,
    materialData: {
      materialName: string;
      quantity: number;
      unitPrice: number;
      purchaseDate: string;
      receiptPhoto?: string;
    }
  ) => {
    if (!accessToken) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}/materials`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(materialData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create material');
      }

      await fetchMaterials(taskId);
      return data.material;
    } catch (err) {
      console.error('Error creating material:', err);
      setError(err instanceof Error ? err.message : 'Failed to create material');
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchMaterials]);

  const updateMaterial = useCallback(async (
    id: number,
    taskId: number,
    updates: Partial<{
      materialName: string;
      quantity: number;
      unitPrice: number;
      purchaseDate: string;
      receiptPhoto: string;
    }>
  ) => {
    if (!accessToken) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/materials/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update material');
      }

      await fetchMaterials(taskId);
      return data.material;
    } catch (err) {
      console.error('Error updating material:', err);
      setError(err instanceof Error ? err.message : 'Failed to update material');
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchMaterials]);

  const deleteMaterial = useCallback(async (id: number, taskId: number) => {
    if (!accessToken) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/materials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete material');
      }

      await fetchMaterials(taskId);
      return true;
    } catch (err) {
      console.error('Error deleting material:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete material');
      return false;
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchMaterials]);

  return {
    materials,
    loading,
    error,
    fetchMaterials,
    createMaterial,
    updateMaterial,
    deleteMaterial,
  };
}
