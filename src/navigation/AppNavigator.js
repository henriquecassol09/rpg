import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

// Contextos
import { useAuth } from '../contexts/AuthContext';

// Telas (Screens) - Importações presumidas conforme nossa estrutura
import LoginScreen from '../screens/LoginScreen';
import MainMenu from '../screens/MainMenu';
import Settings from '../screens/Settings';

// Telas de Gameplay
import GameWorld from '../screens/GameWorld';
import BattleArena from '../screens/BattleArena';
import InventoryMenu from '../screens/InventoryMenu';

// Telas de Builder (Configuração de Mundo)
import BuilderDashboard from '../screens/BuilderDashboard';
import ScenarioEditor from '../screens/ScenarioEditor';
import NPCManager from '../screens/NPCManager';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { signed, loading, isMaster } = useAuth();

  // Enquanto verifica o pergaminho de autenticação (Token no AsyncStorage)
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
        <ActivityIndicator size="large" color="#DAA520" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2D1E17' }, // Cor de madeira escura
          headerTintColor: '#DAA520', // Dourado
          headerTitleStyle: { fontWeight: 'bold', textTransform: 'uppercase' },
          cardStyle: { backgroundColor: '#1a1a1a' }
        }}
      >
        {!signed ? (
          // Rota de Autenticação
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
        ) : (
          // Rotas Protegidas (Logado)
          <>
            <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Menu Principal' }} />
            
            {/* Fluxo de Gameplay */}
            <Stack.Screen name="GameWorld" component={GameWorld} options={{ title: 'Exploração' }} />
            <Stack.Screen name="BattleArena" component={BattleArena} options={{ title: 'Combate' }} />
            <Stack.Screen name="Inventory" component={InventoryMenu} options={{ title: 'Mochila' }} />
            
            {/* Fluxo de Configuração de Mundo (Apenas se for Mestre) */}
            {isMaster && (
              <>
                <Stack.Screen name="BuilderDashboard" component={BuilderDashboard} options={{ title: 'Modo Mestre' }} />
                <Stack.Screen name="ScenarioEditor" component={ScenarioEditor} options={{ title: 'Criar Cenários' }} />
                <Stack.Screen name="NPCManager" component={NPCManager} options={{ title: 'Gestão de NPCs' }} />
              </>
            )}

            <Stack.Screen name="Settings" component={Settings} options={{ title: 'Configurações' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;