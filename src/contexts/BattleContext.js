import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api/client';
import { updateCharacterStats } from '../api/characters';

const BattleContext = createContext({});

export const BattleProvider = ({ children }) => {
  const [inBattle, setInBattle] = useState(false);
  const [battleData, setBattleData] = useState(null); // Dados da tabela 'combates'
  const [playerStats, setPlayerStats] = useState(null); // Cópia local para UI rápida
  const [enemyStats, setEnemyStats] = useState(null); // Cópia local do inimigo
  const [turn, setTurn] = useState('PLAYER'); // 'PLAYER' ou 'ENEMY'
  const [logs, setLogs] = useState([]); // Histórico de turnos

  /**
   * Inicia um novo combate
   * @param {object} player - Objeto do personagem vindo do DB
   * @param {object} enemy - Objeto do inimigo vindo do DB
   */
  const startBattle = async (player, enemy) => {
    try {
      // 1. Registra o início do combate no Backend
      const response = await apiClient.post('/combates', {
        id_personagem: player.id_personagem,
        id_inimigo: enemy.id_inimigo,
      });

      setBattleData(response.data);
      setPlayerStats({ ...player });
      setEnemyStats({ ...enemy, vida_atual: enemy.vida_maxima });
      setLogs([`Um ${enemy.nome} selvagem apareceu!`]);
      setInBattle(true);
      setTurn('PLAYER');
    } catch (error) {
      console.error("Erro ao iniciar combate:", error);
    }
  };

  /**
   * Executa um ataque do Jogador
   * @param {number} diceResult - Resultado vindo do DiceRoller.js
   */
  const performPlayerAttack = async (diceResult) => {
    if (turn !== 'PLAYER' || !inBattle) return;

    // Lógica de Dano: (Dado + Força) - Resistência do Inimigo
    // Dano mínimo de 1 para não travar a batalha
    const rawDamage = (diceResult + playerStats.forca) - enemyStats.resistencia;
    const finalDamage = Math.max(1, rawDamage);
    
    const newEnemyHP = Math.max(0, enemyStats.vida_atual - finalDamage);
    setEnemyStats(prev => ({ ...prev, vida_atual: newEnemyHP }));
    
    addLog(`Você rolou ${diceResult} e causou ${finalDamage} de dano!`);

    if (newEnemyHP <= 0) {
      endBattle('VICTORY');
    } else {
      setTurn('ENEMY');
      // Pequeno delay para o inimigo reagir
      setTimeout(performEnemyTurn, 1500);
    }
  };

  /**
   * Lógica simples de IA para o turno do Inimigo
   */
  const performEnemyTurn = async () => {
    const enemyDamage = Math.max(1, enemyStats.dano - playerStats.resistencia);
    const newPlayerHP = Math.max(0, playerStats.vida_atual - enemyDamage);

    setPlayerStats(prev => ({ ...prev, vida_atual: newPlayerHP }));
    addLog(`${enemyStats.nome} atacou e causou ${enemyDamage} de dano!`);

    // Sincroniza vida do personagem com o DB para persistência
    await updateCharacterStats(playerStats.id_personagem, { vida_atual: newPlayerHP });

    if (newPlayerHP <= 0) {
      endBattle('DEFEAT');
    } else {
      setTurn('PLAYER');
    }
  };

  const addLog = (message) => {
    setLogs(prev => [message, ...prev].slice(0, 5)); // Mantém apenas os últimos 5 logs
  };

  const endBattle = async (result) => {
    setInBattle(false);
    addLog(result === 'VICTORY' ? "Vitória gloriosa!" : "Você foi derrotado...");
    
    // Atualiza o status do combate no banco de dados
    await apiClient.patch(`/combates/${battleData.id_combate}`, {
      status: result,
      data_fim: new Date()
    });
  };

  return (
    <BattleContext.Provider value={{
      inBattle,
      playerStats,
      enemyStats,
      turn,
      logs,
      startBattle,
      performPlayerAttack
    }}>
      {children}
    </BattleContext.Provider>
  );
};

export function useBattle() {
  return useContext(BattleContext);
}