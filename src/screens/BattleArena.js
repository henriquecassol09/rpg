import React from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useBattle } from '../contexts/BattleContext';
import { useBattleLogic } from '../hooks/useBattleLogic';

// Componentes Customizados
import HealthBar from '../components/HealthBar';
import DiceRoller from '../components/DiceRoller';
import MenuButton from '../components/MenuButton';

const BattleArena = () => {
  const { playerStats, enemyStats, turn, logs } = useBattle();
  const { 
    showDice, 
    canInteract, 
    triggerAttackSequence, 
    onDiceRollComplete 
  } = useBattleLogic();

  if (!enemyStats || !playerStats) return null;

  return (
    <ImageBackground 
      source={require('../../assets/images/battle-bg.jpg')} // Sugestão de asset
      style={styles.backgroundImage}
      blurRadius={2}
    >
      <SafeAreaView style={styles.overlay}>
        
        {/* ÁREA DO INIMIGO */}
        <View style={styles.enemySection}>
          <View style={styles.monsterSpriteContainer}>
            {/* Aqui entraria a imagem do monstro baseada no id_inimigo */}
            <Text style={styles.monsterEmoji}>{enemyStats.vida_atual > 0 ? '👹' : '💀'}</Text>
          </View>
          <Text style={styles.nameTag}>{enemyStats.nome}</Text>
          <HealthBar 
            current={enemyStats.vida_atual} 
            max={enemyStats.vida_maxima} 
            label="HP INIMIGO" 
          />
        </View>

        {/* LOG DE COMBATE (NARRATIVA) */}
        <View style={styles.logContainer}>
          {logs.map((log, index) => (
            <Text key={index} style={[styles.logText, index === 0 && styles.latestLog]}>
              {index === 0 ? `> ${log}` : log}
            </Text>
          ))}
        </View>

        {/* ÁREA DO JOGADOR */}
        <View style={styles.playerSection}>
          <HealthBar 
            current={playerStats.vida_atual} 
            max={playerStats.vida_maxima} 
            label={playerStats.nome}
            color="#2ecc71"
          />
          
          <View style={styles.controls}>
            {showDice ? (
              <DiceRoller onRoll={onDiceRollComplete} />
            ) : (
              <View style={styles.buttonRow}>
                <MenuButton 
                  title={turn === 'PLAYER' ? "ATACAR" : "AGUARDANDO..."} 
                  icon="sword-cross"
                  onPress={triggerAttackSequence}
                  disabled={!canInteract}
                  style={!canInteract ? styles.disabledBtn : null}
                />
              </View>
            )}
          </View>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    padding: 20,
  },
  enemySection: {
    alignItems: 'center',
    marginTop: 20,
  },
  monsterSpriteContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  monsterEmoji: {
    fontSize: 80,
  },
  nameTag: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  logContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DAA520',
    height: 120,
  },
  logText: {
    color: '#AAA',
    fontSize: 13,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  latestLog: {
    color: '#DAA520',
    fontWeight: 'bold',
    fontSize: 14,
  },
  playerSection: {
    marginBottom: 20,
  },
  controls: {
    height: 150, // Espaço reservado para o dado não empurrar a UI
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonRow: {
    width: '100%',
  },
  disabledBtn: {
    opacity: 0.5,
    backgroundColor: '#444',
  }
});

export default BattleArena;