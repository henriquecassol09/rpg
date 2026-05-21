/**
 * Define as categorias possíveis de itens no sistema
 */
export type ItemType = 'WEAPON' | 'ARMOR' | 'CONSUMABLE' | 'QUEST' | 'MATERIAL';

/**
 * Interface principal do Item conforme a tabela 'itens' do PostgreSQL
 */
export interface Item {
  id_item: number;
  nome: string;
  descricao: string;
  tipo: ItemType;
  raridade: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  
  // Atributos de Combate (Podem ser nulos dependendo do tipo)
  bonus_ataque?: number;    // Para armas
  bonus_defesa?: number;    // Para armaduras
  cura?: number;            // Para poções/comida
  valor_venda: number;
  
  // Metadados
  peso: number;
  icon_name?: string;       // Nome do ícone do MaterialCommunityIcons
}

/**
 * Interface para representar o item dentro da mochila do jogador
 * Une dados da tabela 'itens' com a tabela 'inventarios'
 */
export interface InventoryItem extends Item {
  id_inventario: number;
  id_personagem: number;
  quantidade: number;
  esta_equipado: boolean;
}

/**
 * Tipo para criação de itens via Modo Builder
 */
export type CreateItemDTO = Omit<Item, 'id_item'>;

/**
 * Estrutura para atualização de quantidade ou estado de equipamento
 */
export interface UpdateInventoryDTO {
  quantidade?: number;
  esta_equipado?: boolean;
}