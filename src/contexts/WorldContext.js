import React, { createContext, useState, useContext, useEffect } from 'react';
import * as worldApi from '../api/world';

const WorldContext = createContext({});

export const WorldProvider = ({ children }) => {
  const [scenarios, setScenarios] = useState([]);
  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  
  // Estado da Exploração
  const [currentScenario, setCurrentScenario] = useState(null);
  const [localNpcs, setLocalNpcs] = useState([]);
  const [localEvents, setLocalEvents] = useState([]);
  
  const [loading, setLoading] = useState(true);

  // Carrega os dados fundamentais ao iniciar o App (Metadata)
  useEffect(() => {
    loadWorldMetadata();
  }, []);

  const loadWorldMetadata = async () => {
    try {
      setLoading(true);
      const [racesRes, classesRes, scenariosRes] = await Promise.all([
        worldApi.getRaces(),
        worldApi.getClasses(),
        worldApi.getAllScenarios()
      ]);

      setRaces(racesRes);
      setClasses(classesRes);
      setScenarios(scenariosRes);
    } catch (error) {
      console.error("Erro ao carregar pergaminhos do mundo:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Viaja para um novo cenário e carrega seus habitantes e segredos
   * @param {number} scenarioId 
   */
  const travelToScenario = async (scenarioId) => {
    setLoading(true);
    try {
      const [scenario, npcs, events] = await Promise.all([
        worldApi.getScenarioById(scenarioId),
        worldApi.getNPCsByScenario(scenarioId),
        worldApi.getEventsByScenario(scenarioId)
      ]);

      setCurrentScenario(scenario);
      setLocalNpcs(npcs);
      setLocalEvents(events);
    } catch (error) {
      console.error("Erro ao viajar pelo mapa:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Função para o Modo Builder: Adiciona novo cenário à lista global
   */
  const addScenarioToList = (newScenario) => {
    setScenarios(prev => [...prev, newScenario]);
  };

  return (
    <WorldContext.Provider value={{
      scenarios,
      races,
      classes,
      currentScenario,
      localNpcs,
      localEvents,
      loading,
      travelToScenario,
      addScenarioToList,
      refreshWorld: loadWorldMetadata
    }}>
      {children}
    </WorldContext.Provider>
  );
};

export function useWorld() {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error('useWorld deve ser utilizado dentro de um WorldProvider');
  }
  return context;
}