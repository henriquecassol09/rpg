/**
 * Definição da estrutura de um Personagem/NPC conforme o banco de dados PostgreSQL.
 */
export interface Character {
  id_personagem: number;
  nome: string;
  id_raca: number;
  id_classe: number;
  
  // Atributos de Status
  nivel: number;
  xp: number;
  vida_maxima: number;
  vida_atual: number;
  forca: number;
  resistencia: number;
  destreza: number;
  inteligencia: number;

  // Flags de Comportamento
  is_npc: boolean;
  id_cenario?: number; // Opcional, pois pode estar em trânsito
  
  // Diálogos (armazenados como ARRAY de strings no DB)
  falas?: string[];

  // Metadados
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Interface simplificada para o Inimigo (usada no BattleContext)
 */
export interface Enemy extends Character {
  recompensa_xp: number;
  recompensa_ouro: number;
  dano_base: number; // Dano fixo ou calculado para inimigos
}

/**
 * Tipo para criação de novos personagens (omitindo IDs gerados pelo DB)
 */
export type CreateCharacterDTO = Omit<Character, 'id_personagem' | 'created_at' | 'updated_at' | 'vida_atual' | 'xp'>;