import { useState, useEffect, useCallback } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import type { Project, ProjectWithDetails } from '../types/database';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ee694789`;

export function useProjects(accessToken: string | null) {
  const [projects, setProjects] = useState<ProjectWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/projects`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects');
      }

      setProjects(data.projects || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const getProject = useCallback(async (id: number): Promise<ProjectWithDetails | null> => {
    if (!accessToken) return null;

    try {
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch project');
      }

      return data.project;
    } catch (err) {
      console.error('Error fetching project:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch project');
      return null;
    }
  }, [accessToken]);

  const createProject = useCallback(async (projectData: {
    projectName: string;
    customerId: number;
    foremanId: number;
    budget: number;
    startDate?: string;
    endDate?: string;
  }) => {
    if (!accessToken) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      await fetchProjects();
      return data.project;
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err instanceof Error ? err.message : 'Failed to create project');
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchProjects]);

  const updateProject = useCallback(async (
    id: number,
    updates: Partial<{
      projectName: string;
      budget: number;
      spentBudget: number;
      startDate: string;
      endDate: string;
      status: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
    }>
  ) => {
    if (!accessToken) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update project');
      }

      await fetchProjects();
      return data.project;
    } catch (err) {
      console.error('Error updating project:', err);
      setError(err instanceof Error ? err.message : 'Failed to update project');
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchProjects]);

  const deleteProject = useCallback(async (id: number) => {
    if (!accessToken) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete project');
      }

      await fetchProjects();
      return true;
    } catch (err) {
      console.error('Error deleting project:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      return false;
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchProjects]);

  useEffect(() => {
    if (accessToken) {
      fetchProjects();
    }
  }, [accessToken, fetchProjects]);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  };
}
