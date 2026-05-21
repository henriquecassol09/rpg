import apiClient from './client';

// =======================================================
// CENÁRIOS (Scenarios)
// =======================================================
const CENARIOS_ENDPOINT = '/cenarios';

export const getAllScenarios = async () => {
  const response = await apiClient.get(CENARIOS_ENDPOINT);
  return response.data;
};

export const getScenarioById = async (id) => {
  const response = await apiClient.get(`${CENARIOS_ENDPOINT}/${id}`);
  return response.data;
};

export const createScenario = async (scenarioData) => {
  const response = await apiClient.post(CENARIOS_ENDPOINT, scenarioData);
  return response.data;
};

// =======================================================
// EVENTOS (Events)
// =======================================================
const EVENTOS_ENDPOINT = '/eventos';

export const getEventsByScenario = async (scenarioId) => {
  // Busca os eventos amarrados a um cenário específico
  const response = await apiClient.get(`${CENARIOS_ENDPOINT}/${scenarioId}/eventos`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await apiClient.post(EVENTOS_ENDPOINT, eventData);
  return response.data;
};

// =======================================================
// NPCs E INIMIGOS (Habitantes do Mundo)
// =======================================================

export const getAllNPCs = async () => {
  const response = await apiClient.get('/npcs');
  return response.data;
};

export const getNPCsByScenario = async (scenarioId) => {
  const response = await apiClient.get(`${CENARIOS_ENDPOINT}/${scenarioId}/npcs`);
  return response.data;
};

export const getAllEnemies = async () => {
  const response = await apiClient.get('/inimigos');
  return response.data;
};

// =======================================================
// LOJAS E ECONOMIA (Shops)
// =======================================================
const LOJAS_ENDPOINT = '/lojas';

export const getShopsByScenario = async (scenarioId) => {
  const response = await apiClient.get(`${CENARIOS_ENDPOINT}/${scenarioId}/lojas`);
  return response.data;
};

export const getShopInventory = async (shopId) => {
  // Traz os itens disponíveis na loja, cruzando a tabela 'loja_estoque' com 'itens'
  const response = await apiClient.get(`${LOJAS_ENDPOINT}/${shopId}/estoque`);
  return response.data;
};

// =======================================================
// REGRAS BASE DO MUNDO (Lore / Static Data)
// =======================================================
// Ideal para carregar os menus de seleção na criação de personagens/NPCs

export const getRaces = async () => {
  const response = await apiClient.get('/racas');
  return response.data;
};

export const getClasses = async () => {
  const response = await apiClient.get('/classes');
  return response.data;
};