import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useWorld } from '../contexts/WorldContext';
import { createScenario } from '../api/world';
import MenuButton from '../components/MenuButton';

const ScenarioEditor = ({ navigation }) => {
  const { refreshWorld } = useWorld();
  
  // Estado inicial baseado na estrutura da tabela 'cenarios'
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo_clima: 'Temperado',
    tipo_ambiente: 'Cidade', // Cidade, Masmorra, Floresta, Taverna
    dificuldade_geral: '1'
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.nome || !formData.descricao) {
      Alert.alert("Campos Vazios", "Mestre, todo cenário precisa de um nome e uma descrição para a imersão!");
      return;
    }

    setLoading(true);
    try {
      await createScenario(formData);
      
      Alert.alert(
        "Mundo Expandido", 
        `${formData.nome} foi adicionado ao mapa com sucesso!`,
        [{ text: "Ótimo", onPress: () => {
          refreshWorld(); // Atualiza a lista global no Contexto
          navigation.goBack();
        }}]
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "As runas falharam: não foi possível salvar o cenário no banco de dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.label}>Nome da Localidade</Text>
          <TextInput 
            style={styles.input}
            placeholder="Ex: Vila de Ravenwood"
            placeholderTextColor="#666"
            value={formData.nome}
            onChangeText={(txt) => setFormData({...formData, nome: txt})}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Tipo de Ambiente</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.tipo_ambiente}
                onValueChange={(val) => setFormData({...formData, tipo_ambiente: val})}
                style={styles.picker}
                dropdownIconColor="#DAA520"
              >
                <Picker.Item label="Cidade" value="Cidade" />
                <Picker.Item label="Masmorra" value="Masmorra" />
                <Picker.Item label="Floresta" value="Floresta" />
                <Picker.Item label="Taverna" value="Taverna" />
                <Picker.Item label="Ruínas" value="Ruinas" />
              </Picker>
            </View>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Nível de Perigo (1-10)</Text>
            <TextInput 
              style={styles.input}
              keyboardType="numeric"
              maxLength={2}
              value={formData.dificuldade_geral}
              onChangeText={(txt) => setFormData({...formData, dificuldade_geral: txt})}
            />
          </View>
        </View>

        <Text style={styles.label}>Descrição para o Jogador</Text>
        <TextInput 
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={5}
          placeholder="Descreva o que o jogador vê ao chegar aqui..."
          placeholderTextColor="#666"
          value={formData.descricao}
          onChangeText={(txt) => setFormData({...formData, descricao: txt})}
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Dica: Após criar o cenário, vá ao NPC Manager para povoar este local com habitantes.
          </Text>
        </View>

        <MenuButton 
          title={loading ? "Invocando Cenário..." : "Selar Localidade"} 
          onPress={handleSave}
          icon="map-marker-plus"
          style={styles.saveButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  content: { padding: 20 },
  headerSection: { marginBottom: 15 },
  label: { color: '#DAA520', marginBottom: 8, fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase' },
  input: {
    backgroundColor: '#2D1E17',
    color: '#FFF',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3E2723',
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  column: { width: '48%' },
  pickerContainer: { backgroundColor: '#2D1E17', borderRadius: 5, borderWidth: 1, borderColor: '#3E2723', marginBottom: 15 },
  picker: { color: '#FFF' },
  infoBox: {
    backgroundColor: 'rgba(218, 165, 32, 0.1)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(218, 165, 32, 0.3)',
    marginBottom: 20,
  },
  infoText: { color: '#AAA', fontSize: 13, fontStyle: 'italic', textAlign: 'center' },
  saveButton: { marginTop: 10 }
});

export default ScenarioEditor;