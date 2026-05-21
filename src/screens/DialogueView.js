import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import DialogueBox from '../components/DialogueBox';

/**
 * Screen de Diálogo
 * Recebe via parâmetros de navegação (route.params):
 * @param {string} npcName - Nome do NPC
 * @param {string[]} dialogues - Array de falas (vinda do campo 'falas' no DB)
 */
const DialogueView = ({ route, navigation }) => {
  const { npcName, dialogues } = route.params;

  // Função disparada quando o componente DialogueBox avisa que as falas acabaram
  const handleDialogueComplete = () => {
    navigation.goBack(); // Retorna para o mapa (GameWorld)
  };

  return (
    <View style={styles.overlay}>
      {/* TouchableWithoutFeedback no fundo permite que, 
          se o jogador clicar fora da caixa, nada aconteça 
          (forçando-o a ler ou clicar na própria caixa para avançar).
      */}
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.container}>
          
          <DialogueBox 
            speakerName={npcName}
            dialogues={dialogues}
            onComplete={handleDialogueComplete}
          />
          
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Escurece levemente o cenário de fundo
    justifyContent: 'flex-end', // Garante que a caixa fique na parte inferior
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40, // Espaçamento para não encostar na borda da tela
  },
});

export default DialogueView;