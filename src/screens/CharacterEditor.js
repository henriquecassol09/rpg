import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Alert,
  TouchableOpacity 
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Necessário instalar: expo install @react-native-picker/picker
import { useWorld } from '../contexts/WorldContext';
import { createCharacter } from '../api/characters';
import MenuButton from '../components/MenuButton';

const CharacterEditor = ({ navigation }) => {
  const { races, classes, refreshWorld } = useWorld();
  
  // Estado do Formulário baseado nas colunas do DB
  const [formData, setFormData] = useState({
    nome: '',
    id_raca: races[0]?.id_raca || '',
    id_classe: classes[0]?.id_classe || '',
    vida_maxima: '100',
    forca: '10',
    resistencia: '10',
    nivel: '1',
    is_npc: false
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.nome) {
      Alert.alert("Erro", "O personagem precisa de um nome digno!");
      return;
    }

    setLoading(true);
    try {
      // Converte strings de input para números antes de enviar ao Node.js
      const payload = {
        ...formData,
        vida_maxima: parseInt(formData.vida_maxima),
        forca: parseInt(formData.forca),
        resistencia: parseInt(formData.resistencia),
        nivel: parseInt(formData.nivel),
      };

      await createCharacter(payload);
      Alert.alert("Sucesso", `${formData.nome} foi adicionado ao reino!`);
      refreshWorld(); // Atualiza a lista global
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Falha ao persistir no banco de dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Nome do Personagem</Text>
      <TextInput 
        style={styles.input}
        placeholder="Ex: Alistair, o Bravo"
        placeholderTextColor="#666"
        value={formData.nome}
        onChangeText={(txt) => setFormData({...formData, nome: txt})}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Raça</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.id_raca}
              onValueChange={(val) => setFormData({...formData, id_raca: val})}
              style={styles.picker}
              dropdownIconColor="#DAA520"
            >
              {races.map(r => (
                <Picker.Item key={r.id_raca} label={r.nome} value={r.id_raca} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Classe</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.id_classe}
              onValueChange={(val) => setFormData({...formData, id_classe: val})}
              style={styles.picker}
            >
              {classes.map(c => (
                <Picker.Item key={c.id_classe} label={c.nome} value={c.id_classe} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Atributos Base</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Vida</Text>
          <TextInput 
            style={styles.statInput}
            keyboardType="numeric"
            value={formData.vida_maxima}
            onChangeText={(txt) => setFormData({...formData, vida_maxima: txt})}
          />
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Força</Text>
          <TextInput 
            style={styles.statInput}
            keyboardType="numeric"
            value={formData.forca}
            onChangeText={(txt) => setFormData({...formData, forca: txt})}
          />
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Resist.</Text>
          <TextInput 
            style={styles.statInput}
            keyboardType="numeric"
            value={formData.resistencia}
            onChangeText={(txt) => setFormData({...formData, resistencia: txt})}
          />
        </View>
      </View>

      <MenuButton 
        title={loading ? "Salvando..." : "Finalizar Personagem"} 
        onPress={handleSave}
        icon="sword-cross"
        style={styles.saveButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  content: { padding: 20 },
  label: { color: '#DAA520', marginBottom: 5, fontWeight: 'bold', fontSize: 14 },
  sectionTitle: { color: '#FFF', fontSize: 18, marginTop: 25, marginBottom: 15, textAlign: 'center', letterSpacing: 2 },
  input: {
    backgroundColor: '#2D1E17',
    color: '#FFF',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3E2723',
    marginBottom: 20,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  column: { width: '48%' },
  pickerContainer: { backgroundColor: '#2D1E17', borderRadius: 5, borderWidth: 1, borderColor: '#3E2723' },
  picker: { color: '#FFF' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  statBox: { alignItems: 'center', width: '25%' },
  statLabel: { color: '#AAA', fontSize: 12, marginBottom: 5 },
  statInput: {
    backgroundColor: '#2D1E17',
    color: '#DAA520',
    textAlign: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#DAA520'
  },
  saveButton: { marginTop: 10 }
});

export default CharacterEditor;