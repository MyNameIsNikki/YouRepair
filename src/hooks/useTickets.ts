import { useState, useEffect, useCallback } from 'react';
import { projectId } from '../utils/supabase/info';
import type { Ticket } from '../types/database';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ee694789`;

export function useTickets(accessToken: string | null) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/tickets`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tickets');
      }

      setTickets(data.tickets || []);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchTickets();
    }
  }, [accessToken, fetchTickets]);

  const getTicket = useCallback(async (id: number): Promise<Ticket | null> => {
    if (!accessToken) return null;

    try {
      const response = await fetch(`${API_BASE}/tickets/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch ticket');
      }

      return data.ticket;
    } catch (err) {
      console.error('Error fetching ticket:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch ticket');
      return null;
    }
  }, [accessToken]);

  const createTicket = async (ticketData: {
    description?: string;
    status?: 'open' | 'in_progress' | 'resolved' | 'closed';
    foremanId?: number;
    customerId?: number;
    foremanPhone?: string;
    supervisorPhone?: string;
  }) => {
    if (!accessToken) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/tickets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create ticket');
      }

      await fetchTickets();
      return data.ticket;
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError(err instanceof Error ? err.message : 'Failed to create ticket');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (
    id: number,
    updates: Partial<{
      description: string;
      status: 'open' | 'in_progress' | 'resolved' | 'closed';
      foremanPhone: string;
      supervisorPhone: string;
    }>
  ) => {
    if (!accessToken) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update ticket');
      }

      await fetchTickets();
      return data.ticket;
    } catch (err) {
      console.error('Error updating ticket:', err);
      setError(err instanceof Error ? err.message : 'Failed to update ticket');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteTicket = async (id: number) => {
    if (!accessToken) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/tickets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete ticket');
      }

      await fetchTickets();
      return true;
    } catch (err) {
      console.error('Error deleting ticket:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete ticket');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    tickets,
    loading,
    error,
    refresh: fetchTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
  };
}