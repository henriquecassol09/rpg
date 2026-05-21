import apiClient from './client';

// O endpoint base configurado no seu backend Node.js
const ENDPOINT = '/personagens';

// =======================================================
// CRUD BÁSICO (Modo Criação de Mundo / Builder)
// =======================================================

export const getAllCharacters = async () => {
  const response = await apiClient.get(ENDPOINT);
  return response.data;
};

export const getCharacterById = async (id) => {
  const response = await apiClient.get(`${ENDPOINT}/${id}`);
  return response.data;
};

export const createCharacter = async (characterData) => {
  // characterData deve refletir as colunas NOT NULL da tabela 'personagens'
  // Ex: id_raca, id_classe, nome, vida_atual, vigor_atual, etc.
  const response = await apiClient.post(ENDPOINT, characterData);
  return response.data;
};

export const updateCharacter = async (id, characterData) => {
  // O método PUT geralmente substitui o objeto inteiro (edição completa no Builder)
  const response = await apiClient.put(`${ENDPOINT}/${id}`, characterData);
  return response.data;
};

export const deleteCharacter = async (id) => {
  const response = await apiClient.delete(`${ENDPOINT}/${id}`);
  return response.data;
};

// =======================================================
// FUNÇÕES DE GAMEPLAY (Atualizações Rápidas e Consultas)
// =======================================================

export const updateCharacterStats = async (id, statsToUpdate) => {
  // O método PATCH é perfeito para atualizar apenas campos específicos 
  // durante a gameplay (ex: perder vida, gastar mana, alterar sanidade).
  const response = await apiClient.patch(`${ENDPOINT}/${id}/status`, statsToUpdate);
  return response.data;
};

// =======================================================
// CONSULTAS COM RELACIONAMENTOS (Joins feitos no Backend)
// =======================================================

export const getCharacterInventory = async (id) => {
  // O backend Node.js deve ter essa rota configurada para fazer o JOIN
  // entre a tabela 'inventario' e a tabela 'itens'.
  const response = await apiClient.get(`${ENDPOINT}/${id}/inventario`);
  return response.data;
};

export const getCharacterPets = async (id) => {
  // Consulta a tabela associativa 'personagem_pet' e junta com 'pets'.
  const response = await apiClient.get(`${ENDPOINT}/${id}/pets`);
  return response.data;
};