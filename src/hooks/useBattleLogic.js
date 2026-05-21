import { useState, useCallback } from 'react';
import { useBattle } from '../contexts/BattleContext';

/**
 * Hook para gerenciar a coreografia e estados visuais do combate.
 */
export const useBattleLogic = () => {
  const { performPlayerAttack, turn, inBattle } = useBattle();
  
  // Estados locais de interface (UI)
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [showDice, setShowDice] = useState(false);
  const [damageDisplay, setDamageDisplay] = useState(null); // Para mostrar o número subindo na tela

  /**
   * Inicia a sequência de ataque do jogador
   */
  const triggerAttackSequence = useCallback(() => {
    if (turn !== 'PLAYER' || isActionLoading || !inBattle) return;
    
    setIsActionLoading(true);
    setShowDice(true); // Faz o componente DiceRoller aparecer
  }, [turn, isActionLoading, inBattle]);

  /**
   * Processa o resultado do dado vindo do componente DiceRoller
   * @param {number} diceResult 
   */
  const onDiceRollComplete = async (diceResult) => {
    // 1. Esconde o dado após um breve delay para o jogador ver o número
    setTimeout(() => setShowDice(false), 800);

    // 2. Executa a lógica matemática no Contexto
    // Aqui a mágica acontece: o Contexto calcula o dano e atualiza o DB
    await performPlayerAttack(diceResult);

    // 3. Libera a interface após a animação do inimigo (gerenciada pelo Contexto)
    // O turno mudará para 'ENEMY' dentro do Contexto, o que travará o botão via CSS/Disabled
    setIsActionLoading(false);
  };

  /**
   * Helper para determinar se o botão de ataque deve estar ativo
   */
  const canInteract = turn === 'PLAYER' && !isActionLoading && inBattle;

  return {
    showDice,
    isActionLoading,
    canInteract,
    triggerAttackSequence,
    onDiceRollComplete,
    damageDisplay,
  };
};