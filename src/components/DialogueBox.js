import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

/**
 * Componente de Caixa de Diálogo estilo RPG
 * * @param {string} speakerName - Nome do NPC ou Personagem que está falando
 * @param {string[]} dialogues - Array contendo as frases do diálogo atual
 * @param {function} onComplete - Função disparada quando não houver mais falas
 */
const DialogueBox = ({ speakerName, dialogues, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Se não houver diálogos ou o array estiver vazio, não renderiza nada
  if (!dialogues || dialogues.length === 0) return null;

  const handleNextDialogue = () => {
    if (currentIndex < dialogues.length - 1) {
      // Avança para a próxima frase
      setCurrentIndex(currentIndex + 1);
    } else {
      // Se for a última frase, reseta o índice e avisa o componente pai que acabou
      setCurrentIndex(0);
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Nome do Personagem */}
      {speakerName && (
        <View style={styles.nameBadge}>
          <Text style={styles.nameText}>{speakerName}</Text>
        </View>
      )}

      {/* Caixa Principal de Texto */}
      <TouchableOpacity 
        style={styles.dialogueBox} 
        activeOpacity={0.8} 
        onPress={handleNextDialogue}
      >
        <Text style={styles.dialogueText}>
          {dialogues[currentIndex]}
        </Text>
        
        {/* Indicador de que há mais texto (o famoso triângulo piscando nos RPGs) */}
        <Text style={styles.indicatorText}>
          {currentIndex < dialogues.length - 1 ? '▼ toque para continuar' : '▼ fechar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    width: width,
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex: 100, // Garante que fique acima dos elementos do cenário
  },
  nameBadge: {
    backgroundColor: '#8B0000', // Um vermelho escuro medieval
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#DAA520', // Borda dourada
    borderBottomWidth: 0,
  },
  nameText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  dialogueBox: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Fundo escuro semi-transparente
    borderWidth: 2,
    borderColor: '#DAA520', // Borda dourada
    borderRadius: 10,
    borderTopLeftRadius: 0, // Encaixa com o nome
    padding: 20,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  dialogueText: {
    color: '#F5F5DC', // Tom de pergaminho claro ao invés de branco puro
    fontSize: 18,
    lineHeight: 26,
  },
  indicatorText: {
    color: '#DAA520',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default DialogueBox;