import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

/**
 * Componente DiceRoller
 * @param {number} sides - Quantidade de lados do dado (D6, D12, D20...). Padrão 20.
 * @param {function} onRoll - Callback disparado após o dado parar de girar.
 */
const DiceRoller = ({ sides = 20, onRoll }) => {
  const [currentValue, setCurrentValue] = useState(sides);
  const [isRolling, setIsRolling] = useState(false);
  
  // Valor para animação de rotação e escala
  const rollAnim = useRef(new Animated.Value(0)).current;

  const rollDie = () => {
    if (isRolling) return; // Evita múltiplos cliques durante a rolagem

    setIsRolling(true);
    
    // Inicia animação visual (rotação rápida)
    Animated.timing(rollAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).current.start(() => {
      // Cálculo do resultado baseado em RNG
      const result = Math.floor(Math.random() * sides) + 1;
      
      setCurrentValue(result);
      setIsRolling(false);
      rollAnim.setValue(0); // Reseta para a próxima rolagem

      // Dispara o evento para o sistema de batalha/teste de perícia
      if (onRoll) {
        onRoll(result);
      }
    });

    // Efeito de "sorteio" visual mudando números rapidamente
    let interval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * sides) + 1);
    }, 80);

    setTimeout(() => clearInterval(interval), 550);
  };

  // Interpolação para girar o dado no eixo Z
  const spin = rollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.dieFrame, 
        { transform: [{ rotate: spin }, { scale: isRolling ? 1.2 : 1 }] }
      ]}>
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={rollDie} 
          style={[
            styles.dieSurface,
            currentValue === 20 && sides === 20 ? styles.criticalHit : null,
            currentValue === 1 && sides === 20 ? styles.criticalFail : null
          ]}
        >
          <Text style={styles.dieText}>{currentValue}</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <Text style={styles.label}>Toque para rolar D{sides}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dieFrame: {
    width: 80,
    height: 80,
  },
  dieSurface: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333', // Cor de pedra/ferro
    borderWidth: 3,
    borderColor: '#DAA520', // Dourado
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombra para profundidade
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dieText: {
    color: '#DAA520',
    fontSize: 32,
    fontWeight: 'bold',
  },
  criticalHit: {
    backgroundColor: '#ffd700', // Dourado brilhante para Crítico
    borderColor: '#FFF',
  },
  criticalFail: {
    backgroundColor: '#8B0000', // Vermelho escuro para Falha Crítica
    borderColor: '#000',
  },
  label: {
    marginTop: 10,
    color: '#FFF',
    fontSize: 14,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default DiceRoller;