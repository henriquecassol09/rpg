import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Componente MenuButton
 * @param {string} title - Texto que aparecerá no botão
 * @param {function} onPress - Ação ao clicar
 * @param {string} icon - Nome do ícone (MaterialCommunityIcons)
 * @param {string} type - 'primary' (dourado/medieval) ou 'secondary' (madeira/escuro)
 * @param {object} style - Estilos adicionais para o container
 */
const MenuButton = ({ title, onPress, icon, type = 'primary', style }) => {
  const isPrimary = type === 'primary';

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onPress} 
      style={[
        styles.button, 
        isPrimary ? styles.buttonPrimary : styles.buttonSecondary,
        style
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <MaterialCommunityIcons 
            name={icon} 
            size={24} 
            color={isPrimary ? '#5D4037' : '#DAA520'} 
            style={styles.icon} 
          />
        )}
        <Text style={[
          styles.text, 
          isPrimary ? styles.textPrimary : styles.textSecondary
        ]}>
          {title}
        </Text>
      </View>
      
      {/* Detalhe estético: cantos reforçados (estilo moldura) */}
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 55,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Para posicionar os cantos
    // Sombra para dar profundidade
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonPrimary: {
    backgroundColor: '#DAA520', // Dourado Envelhecido
    borderColor: '#8B4513', // Marrom Couro
  },
  buttonSecondary: {
    backgroundColor: '#2D1E17', // Madeira Escura
    borderColor: '#DAA520',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  textPrimary: {
    color: '#5D4037', // Marrom escuro para contraste no dourado
  },
  textSecondary: {
    color: '#DAA520', // Dourado para contraste na madeira
  },
  // Estética de Cantos (Ornamentos)
  corner: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#3E2723',
    borderRadius: 1,
  },
  topLeft: { top: 2, left: 2 },
  topRight: { top: 2, right: 2 },
  bottomLeft: { bottom: 2, left: 2 },
  bottomRight: { bottom: 2, right: 2 },
});

export default MenuButton;