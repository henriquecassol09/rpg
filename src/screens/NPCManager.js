import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useWorld } from '../contexts/WorldContext';
import MenuButton from '../components/MenuButton';
import apiClient from '../api/client';

const NPCManager = () => {
  const { scenarios, refreshWorld } = useWorld();
  
  // Estados para gerenciar a criação/edição de falas e vínculos
  const [selectedCharId, setSelectedCharId] = useState(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0]?.id_cenario);
  const [dialogueLines, setDialogueLines] = useState(''); // Texto bruto que virará Array
  const [loading, setLoading] = useState(false);

  const handleUpdateNPC = async () => {
    if (!selectedCharId || !dialogueLines) {
      Alert.alert("Aviso", "Selecione um personagem e escreva suas falas.");
      return;
    }

    setLoading(true);
    try {
      // No Node.js/PostgreSQL, o campo 'falas' é um ARRAY de strings ou JSON
      // Aqui transformamos o texto quebrado por linhas em um Array
      const falasArray = dialogueLines.split('\n').filter(line => line.trim() !== '');

      await apiClient.patch(`/personagens/${selectedCharId}`, {
        is_npc: true,
        id_cenario: selectedScenarioId,
        falas: falasArray
      });

      Alert.alert("Sucesso", "NPC configurado com sucesso!");
      refreshWorld();
      setDialogueLines('');
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar o NPC.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Configurar Habitante</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Onde este NPC reside?</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedScenarioId}
            onValueChange={(itemValue) => setSelectedScenarioId(itemValue)}
            style={styles.picker}
          >
            {scenarios.map(s => (
              <Picker.Item key={s.id_cenario} label={s.nome} value={s.id_cenario} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Diálogo (Uma frase por linha):</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={6}
          placeholder="Ex: Olá, viajante!&#10;Pode me ajudar com os lobos?&#10;Obrigado!"
          placeholderTextColor="#666"
          value={dialogueLines}
          onChangeText={setDialogueLines}
        />

        <MenuButton 
          title={loading ? "Gravando..." : "Vincular ao Mundo"} 
          onPress={handleUpdateNPC}
          icon="account-tie-voice"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Dica do Mestre:</Text>
        <Text style={styles.infoText}>
          Ao marcar "is_npc" como verdadeiro, este personagem deixará de ser um avatar de jogador
          e passará a ser controlado pelo cenário.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 20 },
  sectionTitle: { color: '#DAA520', fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#2D1E17',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3E2723',
  },
  label: { color: '#FFF', marginBottom: 8, marginTop: 10, fontWeight: '600' },
  pickerContainer: { backgroundColor: '#1a1a1a', borderRadius: 5, marginBottom: 15 },
  picker: { color: '#DAA520' },
  textArea: {
    backgroundColor: '#1a1a1a',
    color: '#F5F5DC',
    padding: 15,
    borderRadius: 5,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3E2723',
    minHeight: 120
  },
  infoBox: {
    marginTop: 30,
    padding: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#DAA520',
    borderRadius: 5
  },
  infoTitle: { color: '#DAA520', fontWeight: 'bold', marginBottom: 5 },
  infoText: { color: '#AAA', fontSize: 13, lineHeight: 18 }
});

export default NPCManager;