import { useState, useEffect, useCallback } from 'react';
import { apartmentAPI, Apartment, CreateApartmentData } from '../utils/api';

export function useApartments() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApartments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { apartments: data } = await apartmentAPI.getAll();
      setApartments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch apartments');
      console.error('Error fetching apartments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  const createApartment = async (data: CreateApartmentData) => {
    try {
      setError(null);
      const { apartment } = await apartmentAPI.create(data);
      setApartments(prev => [...prev, apartment]);
      return apartment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create apartment');
      throw err;
    }
  };

  const updateApartment = async (id: string, data: Partial<CreateApartmentData>) => {
    try {
      setError(null);
      const { apartment } = await apartmentAPI.update(id, data);
      setApartments(prev => prev.map(apt => apt.id === id ? apartment : apt));
      return apartment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update apartment');
      throw err;
    }
  };

  const deleteApartment = async (id: string) => {
    try {
      setError(null);
      await apartmentAPI.delete(id);
      setApartments(prev => prev.filter(apt => apt.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete apartment');
      throw err;
    }
  };

  const getApartmentById = async (id: string) => {
    try {
      setError(null);
      const { apartment } = await apartmentAPI.getById(id);
      return apartment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch apartment');
      throw err;
    }
  };

  return {
    apartments,
    loading,
    error,
    refresh: fetchApartments,
    createApartment,
    updateApartment,
    deleteApartment,
    getApartmentById,
  };
}
