import { useState, useEffect, useCallback } from 'react';

/**
 * Hook Genérico para buscar dados da API REST
 * @param {Function} apiFunction - A função da API (ex: getAllCharacters de characters.js)
 * @param {Array} params - Parâmetros para a função da API (ex: [id])
 * @param {boolean} immediate - Se deve buscar assim que o componente montar
 */
export const useFetchData = (apiFunction, params = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Executa a função da API passando os parâmetros desestruturados
      const response = await apiFunction(...params);
      setData(response);
    } catch (err) {
      setError(err.message || 'Erro ao consultar o pergaminho de dados.');
      console.error("🔥 Erro no fetch:", err);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, JSON.stringify(params)]); // Memoiza baseado na função e nos parâmetros

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    refresh: execute // Permite recarregar manualmente (ex: Pull-to-refresh)
  };
};