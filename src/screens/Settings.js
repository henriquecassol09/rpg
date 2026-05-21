import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import MenuButton from '../components/MenuButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Settings = ({ navigation }) => {
  const { user, signOut, isMaster } = useAuth();

  // Estados locais para preferências (poderiam ser salvos no AsyncStorage)
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const handleClearCache = () => {
    Alert.alert("Limpar Dados", "Isso removerá assets temporários. Continuar?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Confirmar", onPress: () => Alert.alert("Sucesso", "Cache limpo!") }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* SEÇÃO DA CONTA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil do Aventureiro</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <MaterialCommunityIcons name="shield-account" size={40} color="#DAA520" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.nome || 'Herói Desconhecido'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{isMaster ? 'MESTRE DO REINO' : 'JOGADOR'}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* SEÇÃO DE ÁUDIO */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Áudio e Som</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Música Ambiente</Text>
          <Switch 
            value={musicEnabled} 
            onValueChange={setMusicEnabled}
            trackColor={{ false: "#333", true: "#DAA520" }}
            thumbColor={musicEnabled ? "#FFF" : "#f4f3f4"}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Efeitos Sonoros (SFX)</Text>
          <Switch 
            value={sfxEnabled} 
            onValueChange={setSfxEnabled}
            trackColor={{ false: "#333", true: "#DAA520" }}
          />
        </View>
      </View>

      {/* SEÇÃO DO SISTEMA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sistema</Text>
        <TouchableOpacity style={styles.actionRow} onPress={handleClearCache}>
          <Text style={styles.settingLabel}>Limpar Cache do Jogo</Text>
          <MaterialCommunityIcons name="broom" size={20} color="#666" />
        </TouchableOpacity>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notificações de Eventos</Text>
          <Switch 
            value={notifications} 
            onValueChange={setNotifications}
            trackColor={{ false: "#333", true: "#DAA520" }}
          />
        </View>
      </View>

      {/* BOTÃO DE LOGOUT */}
      <View style={styles.footer}>
        <MenuButton 
          title="SAIR DA CONTA" 
          type="secondary" 
          icon="logout"
          onPress={signOut}
          style={styles.logoutButton}
        />
        <Text style={styles.versionText}>Legado dos Reinos - Build 2026.05.21</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#DAA520',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 15,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#2D1E17',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3E2723',
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DAA520',
  },
  profileInfo: {
    marginLeft: 15,
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#AAA',
    fontSize: 12,
  },
  roleBadge: {
    backgroundColor: '#DAA520',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#2D1E17',
    fontSize: 10,
    fontWeight: '900',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#262626',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#262626',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  settingLabel: {
    color: '#EEE',
    fontSize: 16,
  },
  footer: {
    marginVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    borderColor: '#e74c3c',
  },
  versionText: {
    color: '#555',
    marginTop: 15,
    fontSize: 12,
  }
});

export default Settings;