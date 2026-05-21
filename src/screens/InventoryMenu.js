import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apiClient from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import MenuButton from '../components/MenuButton';

const InventoryMenu = ({ navigation }) => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, WEAPON, CONSUMABLE, QUEST

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      // Busca os itens vinculados ao id_personagem no PostgreSQL
      const response = await apiClient.get(`/inventarios/${user.id_personagem}`);
      setInventory(response.data);
    } catch (error) {
      console.error("Erro ao carregar mochila:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = inventory.filter(item => 
    filter === 'ALL' ? true : item.tipo === filter
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemCard}>
      <View style={styles.itemIconContainer}>
        <MaterialCommunityIcons 
          name={item.tipo === 'WEAPON' ? 'sword' : 'flask-outline'} 
          size={30} 
          color="#DAA520" 
        />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.nome}</Text>
        <Text style={styles.itemEffect}>
          {item.bonus_ataque ? `Atk: +${item.bonus_ataque} ` : ''}
          {item.cura ? `Cura: ${item.cura} HP` : ''}
        </Text>
      </View>
      <Text style={styles.itemQty}>x{item.quantidade || 1}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#DAA520" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mochila do Aventureiro</Text>
        <View style={styles.filterBar}>
          <FilterTab label="Tudo" active={filter === 'ALL'} onPress={() => setFilter('ALL')} />
          <FilterTab label="Armas" active={filter === 'WEAPON'} onPress={() => setFilter('WEAPON')} />
          <FilterTab label="Poções" active={filter === 'CONSUMABLE'} onPress={() => setFilter('CONSUMABLE')} />
        </View>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id_item.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Sua mochila está vazia...</Text>
        }
      />

      <View style={styles.footer}>
        <MenuButton 
          title="Fechar Mochila" 
          type="secondary" 
          onPress={() => navigation.goBack()} 
        />
      </View>
    </SafeAreaView>
  );
};

const FilterTab = ({ label, active, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.tab, active && styles.activeTab]}>
    <Text style={[styles.tabText, active && styles.activeTabText]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  center: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, backgroundColor: '#2D1E17', borderBottomWidth: 2, borderBottomColor: '#DAA520' },
  title: { color: '#FFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  filterBar: { flexDirection: 'row', justifyContent: 'space-around' },
  tab: { paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 },
  activeTab: { backgroundColor: '#DAA520' },
  tabText: { color: '#AAA', fontWeight: 'bold' },
  activeTabText: { color: '#2D1E17' },
  list: { padding: 15 },
  itemCard: { 
    flexDirection: 'row', 
    backgroundColor: '#262626', 
    marginBottom: 10, 
    borderRadius: 8, 
    padding: 12, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333'
  },
  itemIconContainer: { width: 50, height: 50, backgroundColor: '#1a1a1a', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  itemInfo: { flex: 1 },
  itemName: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  itemEffect: { color: '#2ecc71', fontSize: 12, marginTop: 2 },
  itemQty: { color: '#DAA520', fontWeight: 'bold', fontSize: 16 },
  emptyText: { color: '#666', textAlign: 'center', marginTop: 50, fontStyle: 'italic' },
  footer: { padding: 20 }
});

export default InventoryMenu;