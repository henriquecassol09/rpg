import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import MenuButton from '../components/MenuButton';
import { useAuth } from '../contexts/AuthContext';

const BuilderDashboard = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Cabeçalho de Boas-vindas */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>Saudações, Mestre</Text>
          <Text style={styles.title}>{user?.nome || 'Arquiteto de Mundos'}</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.sectionTitle}>Criação e Gestão</Text>
        
        {/* Grade de Botões de Ação */}
        <View style={styles.grid}>
          <View style={styles.column}>
            <MenuButton 
              title="Cenários" 
              icon="map-legend" 
              onPress={() => navigation.navigate('ScenarioEditor')}
            />
            <MenuButton 
              title="Inimigos" 
              icon="skull-outline" 
              type="secondary"
              onPress={() => console.log('Navegar para Inimigos')} 
            />
          </View>

          <View style={styles.column}>
            <MenuButton 
              title="NPCs" 
              icon="account-group" 
              onPress={() => navigation.navigate('NPCManager')}
            />
            <MenuButton 
              title="Missões" 
              icon="scroll-treasure-outline" 
              type="secondary"
              onPress={() => console.log('Navegar para Quests')} 
            />
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Estatísticas do Reino</Text>
          <Text style={styles.infoText}>• Itens cadastrados: 124</Text>
          <Text style={styles.infoText}>• Criaturas no Bestiário: 45</Text>
          <Text style={styles.infoText}>• Cenários ativos: 12</Text>
        </View>

        <MenuButton 
          title="Voltar ao Menu Principal" 
          icon="home" 
          type="secondary"
          onPress={() => navigation.navigate('MainMenu')}
          style={styles.backButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  subtitle: {
    color: '#DAA520',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 5,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#DAA520',
    marginTop: 15,
    borderRadius: 2,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginBottom: 15,
    fontWeight: '600',
    opacity: 0.8,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    width: '48%', // Cria o efeito de duas colunas
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#2D1E17',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#DAA520',
  },
  infoTitle: {
    color: '#DAA520',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  infoText: {
    color: '#F5F5DC',
    fontSize: 14,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  backButton: {
    marginTop: 40,
    opacity: 0.7,
  }
});

export default BuilderDashboard;