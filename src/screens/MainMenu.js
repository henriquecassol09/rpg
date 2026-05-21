import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  SafeAreaView, 
  Alert 
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import MenuButton from '../components/MenuButton';

const MainMenu = ({ navigation }) => {
  const { user, signOut, isMaster } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Partida", 
      "Deseja realmente abandonar sua jornada por agora?", 
      [
        { text: "Ficar", style: "cancel" },
        { text: "Sair", onPress: signOut, style: "destructive" }
      ]
    );
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/main-menu-bg.jpg')} 
      style={styles.background}
    >
      <SafeAreaView style={styles.overlay}>
        
        {/* Cabeçalho de Boas-vindas */}
        <View style={styles.header}>
          <Text style={styles.gameTitle}>LEGADO DOS REINOS</Text>
          <View style={styles.userBadge}>
            <Text style={styles.welcomeText}>Bem-vindo, {user?.nome || 'Viajante'}</Text>
          </View>
        </View>

        {/* Opções de Jogo */}
        <View style={styles.menuContainer}>
          <MenuButton 
            title="CONTINUAR JORNADA" 
            icon="play-circle-outline" 
            onPress={() => navigation.navigate('GameWorld')} 
          />

          <MenuButton 
            title="PERSONAGEM" 
            icon="account-details" 
            type="secondary"
            onPress={() => navigation.navigate('Inventory')} 
          />

          {/* Acesso exclusivo ao Mestre (Builder) */}
          {isMaster && (
            <MenuButton 
              title="OFICINA DO MESTRE" 
              icon="hammer-wrench" 
              type="secondary"
              onPress={() => navigation.navigate('BuilderRoot')} 
              style={styles.masterButton}
            />
          )}

          <MenuButton 
            title="CONFIGURAÇÕES" 
            icon="cog-outline" 
            type="secondary"
            onPress={() => navigation.navigate('Settings')} 
          />
        </View>

        {/* Rodapé com Logout */}
        <View style={styles.footer}>
          <MenuButton 
            title="SAIR DO JOGO" 
            icon="logout" 
            type="secondary"
            onPress={handleLogout}
            style={styles.logoutBtn}
          />
          <Text style={styles.versionText}>v1.0.26 - Servidor Online</Text>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 25,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  gameTitle: {
    color: '#DAA520',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 4,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  userBadge: {
    marginTop: 10,
    backgroundColor: 'rgba(218, 165, 32, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DAA520',
  },
  welcomeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  menuContainer: {
    width: '100%',
    gap: 10,
  },
  masterButton: {
    borderWidth: 1,
    borderColor: '#2ecc71', // Um toque de verde para destacar o modo mestre
  },
  footer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoutBtn: {
    width: '100%',
    opacity: 0.8,
  },
  versionText: {
    color: '#666',
    fontSize: 10,
    marginTop: 15,
    letterSpacing: 1,
  }
});

export default Main