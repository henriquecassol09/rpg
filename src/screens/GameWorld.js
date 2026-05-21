import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  FlatList, 
  ActivityIndicator 
} from 'react-native';
import { useWorld } from '../contexts/WorldContext';
import { useBattle } from '../contexts/BattleContext';
import MenuButton from '../components/MenuButton';

const GameWorld = ({ navigation }) => {
  const { 
    currentScenario, 
    localNpcs, 
    loading, 
    travelToScenario 
  } = useWorld();

  const { startBattle, playerStats } = useBattle();

  // Se não houver cenário carregado (ex: primeiro login), viaja para o cenário inicial (ID 1)
  useEffect(() => {
    if (!currentScenario) {
      travelToScenario(1); 
    }
  }, []);

  const handleInteraction = (npc) => {
    // Se o NPC tiver falas e não for hostil, abre diálogo
    if (npc.is_npc && npc.falas && npc.falas.length > 0) {
      navigation.navigate('DialogueView', {
        npcName: npc.nome,
        dialogues: npc.falas
      });
    } 
    // Se for um inimigo (não marcado como NPC amigável no seu critério de design)
    else {
      startBattle(playerStats, npc);
      navigation.navigate('BattleArena');
    }
  };

  if (loading || !currentScenario) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DAA520" />
        <Text style={styles.loadingText}>Carregando Território...</Text>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('../../assets/images/world-bg.jpg')} // Imagem genérica de cenário
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Cabeçalho do Cenário */}
        <View style={styles.header}>
          <Text style={styles.scenarioType}>{currentScenario.tipo_ambiente}</Text>
          <Text style={styles.scenarioName}>{currentScenario.nome}</Text>
          <Text style={styles.description}>{currentScenario.descricao}</Text>
        </View>

        {/* Lista de Habitantes/Interações */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Presentes neste local:</Text>
          <FlatList
            data={localNpcs}
            keyExtractor={(item) => item.id_personagem.toString()}
            renderItem={({ item }) => (
              <MenuButton 
                title={item.nome}
                icon={item.is_npc ? "account-voice" : "sword-cross"}
                type={item.is_npc ? "secondary" : "primary"}
                onPress={() => handleInteraction(item)}
              />
            )}
            contentContainerStyle={styles.list}
          />
        </View>

        {/* Menu Inferior de Navegação */}
        <View style={styles.footer}>
          <MenuButton 
            title="Inventário" 
            icon="bag-personal" 
            onPress={() => navigation.navigate('Inventory')}
            style={styles.footerBtn}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', padding: 20 },
  loadingContainer: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#DAA520', marginTop: 10, letterSpacing: 2 },
  header: { marginTop: 40, marginBottom: 30 },
  scenarioType: { color: '#DAA520', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 },
  scenarioName: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  description: { color: '#CCC', fontSize: 16, fontStyle: 'italic', marginTop: 10, lineHeight: 22 },
  content: { flex: 1 },
  sectionTitle: { color: '#AAA', fontSize: 14, marginBottom: 15, textTransform: 'uppercase' },
  list: { paddingBottom: 20 },
  footer: { borderTopWidth: 1, borderTopColor: '#333', paddingTop: 10 },
  footerBtn: { height: 50 }
});

export default GameWorld;