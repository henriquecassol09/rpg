import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

/**
 * Componente HealthBar
 * @param {number} current - Vida atual (vida_atual do DB)
 * @param {number} max - Vida máxima (vida do DB ou soma de atributos)
 * @param {string} label - Nome do personagem ou tipo (HP, Mana, etc.)
 * @param {string} color - Cor customizada (opcional, padrão vermelho/verde)
 */
const HealthBar = ({ current, max, label = 'HP', color }) => {
  // Cálculo da porcentagem de preenchimento
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  // Lógica de cor dinâmica baseada na saúde restante
  const getBarColor = () => {
    if (color) return color;
    if (percentage > 50) return '#2ecc71'; // Verde (Saudável)
    if (percentage > 20) return '#f1c40f'; // Amarelo (Ferido)
    return '#e74c3c'; // Vermelho (Crítico)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.valueText}>{current} / {max}</Text>
      </View>

      <View style={styles.barBackground}>
        <View 
          style={[
            styles.barFill, 
            { 
              width: `${percentage}%`, 
              backgroundColor: getBarColor() 
            }
          ]} 
        />
        {/* Brilho interno para dar efeito 3D medieval */}
        <View style={styles.innerGlow} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  labelText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  valueText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  barBackground: {
    height: 18,
    width: '100%',
    backgroundColor: '#2c3e50', // Fundo escuro da barra
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#34495e',
    overflow: 'hidden', // Garante que o preenchimento não saia das bordas
    position: 'relative',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  innerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%', // Brilho na parte superior da barra
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
});

export default HealthBar;