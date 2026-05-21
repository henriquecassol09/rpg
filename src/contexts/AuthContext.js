import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';

// Criamos o contexto como uma "Guilda de Autenticação"
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Dados do Mestre ou Jogador
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se já existe um herói logado no dispositivo ao iniciar o app
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@RPG:user');
      const storageToken = await AsyncStorage.getItem('@RPG:token');

      if (storageUser && storageToken) {
        // Configura o cabeçalho do Axios para as próximas batalhas (requisições)
        apiClient.defaults.headers.Authorization = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  /**
   * Função de Login (Abertura dos Portões)
   * @param {string} email 
   * @param {string} password 
   */
  const signIn = async (email, password) => {
    try {
      // Chamada para o seu backend Node.js
      const response = await apiClient.post('/auth/login', { email, password });
      
      const { user, token } = response.data;

      // Salva no estado e no disco rígido do dispositivo
      setUser(user);
      apiClient.defaults.headers.Authorization = `Bearer ${token}`;

      await AsyncStorage.setItem('@RPG:user', JSON.stringify(user));
      await AsyncStorage.setItem('@RPG:token', token);
      
    } catch (error) {
      console.error('Falha na autenticação. Verifique suas runas!', error);
      throw error;
    }
  };

  /**
   * Função de Logout (Retirada Estratégica)
   */
  const signOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      signed: !!user, // Booleano: está logado ou não?
      user, 
      loading, 
      signIn, 
      signOut,
      isMaster: user?.role === 'MASTER' // Útil para liberar a tela de Configuração de Mundo
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso nas telas
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}