import { GAME_RULES } from './constants';

/**
 * Utilitários de Geração Aleatória (RNG)
 */

export const rngCalculator = {
  
  /**
   * Rola um dado genérico de N lados.
   * @param {number} sides - Número de lados (padrão definido nas constantes)
   * @returns {number} Resultado da rolagem
   */
  rollDice: (sides = GAME_RULES.DICE_SIDES) => {
    return Math.floor(Math.random() * sides) + 1;
  },

  /**
   * Verifica se uma chance (0 a 100) foi bem sucedida.
   * Útil para Drops de itens ou chances de Esquiva.
   * @param {number} percentage - Probabilidade de 0 a 100
   */
  checkSuccess: (percentage) => {
    const roll = Math.random() * 100;
    return roll <= percentage;
  },

  /**
   * Retorna um valor aleatório dentro de um intervalo.
   * Útil para variação de cura em poções ou dano de armas.
   */
  getRandomInRange: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Determina a raridade de um loot baseado em pesos.
   * @returns {string} COMMON, UNCOMMON, RARE, EPIC, LEGENDARY
   */
  rollLootRarity: () => {
    const roll = Math.random() * 100;

    if (roll <= 0.5) return 'LEGENDARY'; // 0.5% chance
    if (roll <= 5)   return 'EPIC';      // 4.5% chance
    if (roll <= 15)  return 'RARE';      // 10% chance
    if (roll <= 40)  return 'UNCOMMON';  // 25% chance
    return 'COMMON';                     // 60% chance
  },

  /**
   * Aplica uma pequena variação (jitter) a um valor base.
   * Evita que o dano seja sempre o mesmo número exato.
   * Ex: 10 de dano com 10% de variação pode resultar em 9, 10 ou 11.
   */
  applyVariation: (baseValue, variationPercent = 0.1) => {
    const margin = baseValue * variationPercent;
    return rngCalculator.getRandomInRange(baseValue - margin, baseValue + margin);
  }
};

export default rngCalculator;