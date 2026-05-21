import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Importação das Telas de Gameplay
import GameWorld from '../screens/GameWorld';
import BattleArena from '../screens/BattleArena';
import InventoryMenu from '../screens/InventoryMenu';
import DialogueView from '../screens/DialogueView';

const Stack = createStackNavigator();

const GameStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GameWorld"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1A1A1A', // Preto profundo para foco na arte do jogo
          borderBottomWidth: 1,
          borderBottomColor: '#DAA520',
        },
        headerTintColor: '#DAA520',
        headerTitleStyle: {
          fontFamily: 'serif', // Ou uma fonte customizada de assets/fonts
          fontWeight: 'bold',
        },
        // Efeito de transição padrão: Deslizar de baixo para cima (estilo RPG clássico)
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    >
      <Stack.Screen 
        name="GameWorld" 
        component={GameWorld} 
        options={{ 
          title: 'Exploração',
          headerShown: true 
        }} 
      />

      <Stack.Screen 
        name="BattleArena" 
        component={BattleArena} 
        options={{ 
          title: 'Em Combate!',
          headerShown: false, // Ocultamos o header para usar a HealthBar e HUD própria
          cardStyleInterpolator: CardStyleInterpolators.forFadeThrough, // Efeito de "flash" para batalha
        }} 
      />

      <Stack.Screen 
        name="Inventory" 
        component={InventoryMenu} 
        options={{ 
          title: 'Alforje e Equipamentos',
          presentation: 'modal', // Abre como uma sobreposição
        }} 
      />

      <Stack.Screen 
        name="DialogueView" 
        component={DialogueView} 
        options={{ 
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' }, // Permite ver o cenário ao fundo
          presentation: 'transparentModal',
        }} 
      />
    </Stack.Navigator>
  );
};

export default GameStack;