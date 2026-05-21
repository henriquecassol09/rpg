/**
 * Constantes Globais do Projeto RPG
 */

export const APP_CONFIG = {
  NAME: "Legado dos Reinos",
  VERSION: "1.0.26",
  API_URL: "http://192.168.1.100:3000", // Altere para o IP do seu servidor Node.js
  STORAGE_USER_KEY: "@LegadoReinos:user",
  STORAGE_TOKEN_KEY: "@LegadoReinos:token",
};

export const GAME_RULES = {
  MAX_LEVEL: 50,
  BASE_XP_NEXT_LEVEL: 100, // XP inicial necessário
  XP_MULTIPLIER: 1.5,      // Curva de dificuldade de level up
  DICE_SIDES: 20,          // Dado padrão do sistema (D20)
  MAX_INVENTORY_SLOTS: 20,
  CRITICAL_HIT_THRESHOLD: 20,
  CRITICAL_FAIL_THRESHOLD: 1,
};

export const COLORS = {
  // Paleta Principal (Dark Fantasy)
  PRIMARY: "#DAA520",    // Dourado (Goldenrod)
  SECONDARY: "#2D1E17",  // Marrom Madeira Escura
  BACKGROUND: "#1a1a1a", // Preto Carvão
  
  // Status de Combate
  HEALTH_HIGH: "#2ecc71", // Verde
  HEALTH_LOW: "#e74c3c",  // Vermelho
  MANA: "#3498db",        // Azul
  
  // Raridades de Itens
  COMMON: "#bdc3c7",    // Cinza
  UNCOMMON: "#2ecc71",  // Verde
  RARE: "#3498db",      // Azul
  EPIC: "#9b59b6",      // Roxo
  LEGENDARY: "#f1c40f", // Ouro Brilhante
  
  // Texto
  TEXT_LIGHT: "#F5F5DC", // Bege/Marfim
  TEXT_DARK: "#2c3e50",
  TEXT_MUTED: "#666666",
};

export const UI_MESSAGES = {
  BATTLE_START: "Prepare-se para o combate!",
  VICTORY: "Você saiu vitorioso da batalha!",
  DEFEAT: "Sua jornada termina aqui... por enquanto.",
  INVENTORY_FULL: "Sua mochila está pesada demais!",
  LEVEL_UP: "As estrelas se alinham! Você subiu de nível!",
};

export const ITEM_TYPES = {
  WEAPON: "WEAPON",
  ARMOR: "ARMOR",
  CONSUMABLE: "CONSUMABLE",
  QUEST: "QUEST",
};