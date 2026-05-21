import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importação das Telas do Builder
import BuilderDashboard from '../screens/BuilderDashboard';
import CharacterEditor from '../screens/CharacterEditor';
import ScenarioEditor from '../screens/ScenarioEditor';
import NPCManager from '../screens/NPCManager';

const Stack = createStackNavigator();

const BuilderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BuilderDashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3E2723', // Marrom mais escuro (estilo escritório do mestre)
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#DAA520',
        headerTitleStyle: {
          fontWeight: 'bold',
          letterSpacing: 1,
        },
        // Transição suave lateral entre as configurações
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen 
        name="BuilderDashboard" 
        component={BuilderDashboard} 
        options={{ title: 'Oficina do Mestre' }} 
      />
      <Stack.Screen 
        name="CharacterEditor" 
        component={CharacterEditor} 
        options={{ title: 'Forjar Personagem' }} 
      />
      <Stack.Screen 
        name="ScenarioEditor" 
        component={ScenarioEditor} 
        options={{ title: 'Modelar Mundo' }} 
      />
      <Stack.Screen 
        name="NPCManager" 
        component={NPCManager} 
        options={{ title: 'Gestão de NPCs' }} 
      />
    </Stack.Navigator>
  );
};

export default BuilderStack;