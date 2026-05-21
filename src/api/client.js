import axios from 'axios';

/**
 * ⚠️ ATENÇÃO: No React Native com Expo, não use 'localhost' para requisições ao backend
 * se estiver testando em um dispositivo físico ou emulador Android, pois 'localhost' 
 * apontará para o próprio celular. 
 * Substitua pelo IP da sua máquina na sua rede Wi-Fi (ex: 192.168.1.15).
 */
const BASE_URL = 'http://SEU_IP_AQUI:3000/api';

// Criação da instância base do cliente HTTP
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Timeout de 10 segundos. Ninguém quer o app travado esperando o turno do inimigo!
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// =======================================================
// INTERCEPTADOR DE REQUISIÇÃO
// =======================================================
apiClient.interceptors.request.use(
  async (config) => {
    // Aqui você pode adicionar lógica antes da requisição ser enviada.
    // Exemplo: Pegar o token de autenticação (se o Mestre ou Jogador precisarem de login).
    /*
      const token = await AsyncStorage.getItem('@rpg_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    */
    return config;
  },
  (error) => {
    // Se a requisição falhar antes de sair (ex: erro de rede)
    return Promise.reject(error);
  }
);

// =======================================================
// INTERCEPTADOR DE RESPOSTA
// =======================================================
apiClient.interceptors.response.use(
  (response) => {
    // Qualquer status de código no escopo de 2xx faz com que essa função seja acionada
    // Retorna apenas a carga útil (data) para facilitar o uso no frontend
    return response;
  },
  (error) => {
    // Qualquer código de status fora do escopo de 2xx aciona essa função
    if (error.response) {
      // O servidor Node.js respondeu com um status de erro (ex: 400, 404, 500)
      console.error('🔥 Dano crítico na API:', error.response.status, error.response.data);
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta do Node.js (Servidor offline?)
      console.error('🛡️ O servidor esquivou do ataque (Sem resposta):', error.request);
    } else {
      // Algo aconteceu na configuração da requisição que acionou um erro
      console.error('Erro na conjuração da API:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;