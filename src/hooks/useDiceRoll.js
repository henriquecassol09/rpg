import { useState, useCallback } from 'react';

/**
 * Hook para gerenciar a lógica matemática de rolagem de dados.
 */
export const useDiceRoll = () => {
  const [lastResult, setLastResult] = useState(null);
  const [isCriticalHit, setIsCriticalHit] = useState(false);
  const [isCriticalFail, setIsCriticalFail] = useState(false);

  /**
   * Calcula o resultado bruto e verifica críticos
   * @param {number} sides - Lados do dado (D20, D6...)
   */
  const roll = useCallback((sides = 20) => {
    const result = Math.floor(Math.random() * sides) + 1;
    
    setLastResult(result);

    // Lógica de Críticos (Padrão D&D 5e no D20)
    if (sides === 20) {
      setIsCriticalHit(result === 20);
      setIsCriticalFail(result === 1);
    } else {
      setIsCriticalHit(false);
      setIsCriticalFail(false);
    }

    return result;
  }, []);

  /**
   * Aplica modificadores de personagem (Força, Destreza, etc.)
   * @param {number} baseRoll - Resultado do roll()
   * @param {number} modifier - Atributo do DB
   */
  const applyModifiers = (baseRoll, modifier = 0) => {
    return baseRoll + modifier;
  };

  /**
   * Verifica sucesso contra uma Classe de Armadura (AC) ou Dificuldade (DC)
   */
  const checkSuccess = (totalValue, difficulty) => {
    return totalValue >= difficulty;
  };

  return {
    lastResult,
    isCriticalHit,
    isCriticalFail,
    roll,
    applyModifiers,
    checkSuccess,
  };
};