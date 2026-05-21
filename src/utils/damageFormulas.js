import { GAME_RULES } from './constants';

/**
 * Calcula o dano final baseado no ataque do atacante e defesa do defensor.
 * Fórmula: Dano = (Ataque + Roll) - (Defesa / 2)
 */
export const calculateDamage = (attacker, defender, diceRoll) => {
  // Cálculo de modificadores baseados nos atributos do banco de dados
  const baseAttack = attacker.forca + (attacker.bonus_ataque || 0);
  const baseDefense = defender.resistencia + (defender.bonus_defesa || 0);

  // Verificação de Crítico
  const isCritical = diceRoll >= GAME_RULES.CRITICAL_HIT_THRESHOLD;
  const isFumble = diceRoll <= GAME_RULES.CRITICAL_FAIL_THRESHOLD;

  if (isFumble) return { totalDamage: 0, isCritical: false, isFumble: true };

  // O dado D20 adiciona variabilidade ao dano
  let damageDealt = (baseAttack + diceRoll) - (baseDefense / 2);

  // Multiplicador de crítico (2x)
  if (isCritical) {
    damageDealt *= 2;
  }

  // Garante que o dano mínimo seja sempre 1 (a menos que seja falha crítica)
  const totalDamage = Math.max(1, Math.floor(damageDealt));

  return {
    totalDamage,
    isCritical,
    isFumble: false
  };
};

/**
 * Calcula a chance de esquiva (Evasion)
 * Baseada na Destreza
 */
export const calculateEvasion = (dexterity) => {
  const baseEvasion = 0.05; // 5% base
  const bonusEvasion = (dexterity * 0.01); // +1% por ponto de destreza
  return Math.min(0.40, baseEvasion + bonusEvasion); // Cap de 40% de esquiva
};

/**
 * Calcula o XP necessário para o próximo nível (Curva Exponencial)
 * $$XP_{next} = BASE \times (LEVEL^{MULTIPLIER})$$
 */
export const calculateXPNextLevel = (currentLevel) => {
  return Math.floor(
    GAME_RULES.BASE_XP_NEXT_LEVEL * Math.pow(currentLevel, GAME_RULES.XP_MULTIPLIER)
  );
};

/**
 * Verifica se o personagem subiu de nível
 */
export const checkLevelUp = (currentXP, currentLevel) => {
  const xpNeeded = calculateXPNextLevel(currentLevel);
  return currentXP >= xpNeeded;
};