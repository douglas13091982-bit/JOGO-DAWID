export interface Student {
  id: string;
  name: string;
  createdAt: number;
  totalPoints: number;
  totalCorrect: number;
  totalAnswered: number;
  bestStreak: number;
  trophies: Trophy[];
  stars: number;
  level: number;
  phaseProgress: {
    1: number;
    2: number;
    3: number;
  };
  subjectProgress: Record<string, number>;
  lastPlayed: number;
}

export interface Trophy {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt: number;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'master';
}

export interface GameResult {
  studentId: string;
  subjectId: string;
  phaseId: number;
  correct: number;
  wrong: number;
  total: number;
  pointsEarned: number;
  date: number;
}

export const TROPHY_DEFINITIONS = [
  { id: 'first_quiz', name: 'Primeiro Passo', icon: '🎯', description: 'Complete seu primeiro quiz', tier: 'bronze' as const, requirement: (s: Student) => s.totalAnswered > 0 },
  { id: 'ten_quizzes', name: 'Estudante Dedicado', icon: '📚', description: 'Complete 10 quizzes', tier: 'bronze' as const, requirement: (s: Student) => s.totalAnswered >= 400 },
  { id: 'fifty_correct', name: 'Mente Brilhante', icon: '🧠', description: 'Acerte 50 questões', tier: 'bronze' as const, requirement: (s: Student) => s.totalCorrect >= 50 },
  { id: 'hundred_correct', name: 'Gênio em Ascensão', icon: '⭐', description: 'Acerte 100 questões', tier: 'silver' as const, requirement: (s: Student) => s.totalCorrect >= 100 },
  { id: 'streak_5', name: 'Em Chamas!', icon: '🔥', description: 'Sequência de 5 acertos', tier: 'bronze' as const, requirement: (s: Student) => s.bestStreak >= 5 },
  { id: 'streak_10', name: 'Imparável!', icon: '💥', description: 'Sequência de 10 acertos', tier: 'silver' as const, requirement: (s: Student) => s.bestStreak >= 10 },
  { id: 'streak_20', name: 'Lendário!', icon: '⚡', description: 'Sequência de 20 acertos', tier: 'gold' as const, requirement: (s: Student) => s.bestStreak >= 20 },
  { id: 'points_100', name: 'Iniciante', icon: '🥉', description: 'Alcance 100 pontos', tier: 'bronze' as const, requirement: (s: Student) => s.totalPoints >= 100 },
  { id: 'points_500', name: 'Intermediário', icon: '🥈', description: 'Alcance 500 pontos', tier: 'silver' as const, requirement: (s: Student) => s.totalPoints >= 500 },
  { id: 'points_1000', name: 'Avançado', icon: '🥇', description: 'Alcance 1000 pontos', tier: 'gold' as const, requirement: (s: Student) => s.totalPoints >= 1000 },
  { id: 'points_2500', name: 'Mestre', icon: '💎', description: 'Alcance 2500 pontos', tier: 'diamond' as const, requirement: (s: Student) => s.totalPoints >= 2500 },
  { id: 'points_5000', name: 'Lenda', icon: '👑', description: 'Alcance 5000 pontos', tier: 'master' as const, requirement: (s: Student) => s.totalPoints >= 5000 },
  { id: 'all_subjects', name: 'Polímata', icon: '🎓', description: 'Jogue todas as matérias', tier: 'gold' as const, requirement: (s: Student) => Object.keys(s.subjectProgress).length >= 6 },
  { id: 'all_phases', name: 'Explorador', icon: '🗺️', description: 'Complete todas as fases', tier: 'diamond' as const, requirement: (s: Student) => s.phaseProgress[1] > 0 && s.phaseProgress[2] > 0 && s.phaseProgress[3] > 0 },
  { id: 'perfect_quiz', name: 'Perfeição', icon: '💯', description: 'Acerte todas as questões de um quiz', tier: 'gold' as const, requirement: (s: Student) => s.totalCorrect > 0 && s.totalCorrect === s.totalAnswered / 4 },
  { id: 'stars_10', name: 'Colecionador', icon: '🌟', description: 'Colete 10 estrelas', tier: 'silver' as const, requirement: (s: Student) => s.stars >= 10 },
  { id: 'stars_50', name: 'Constelação', icon: '✨', description: 'Colete 50 estrelas', tier: 'gold' as const, requirement: (s: Student) => s.stars >= 50 },
  { id: 'level_5', name: 'Nível 5', icon: '🏅', description: 'Alcance o nível 5', tier: 'silver' as const, requirement: (s: Student) => s.level >= 5 },
  { id: 'level_10', name: 'Nível 10', icon: '🏆', description: 'Alcance o nível 10', tier: 'gold' as const, requirement: (s: Student) => s.level >= 10 },
  { id: 'level_20', name: 'Nível 20', icon: '👑', description: 'Alcance o nível 20', tier: 'master' as const, requirement: (s: Student) => s.level >= 20 },
];

export const getLevelFromPoints = (points: number): number => {
  return Math.floor(Math.sqrt(points / 50)) + 1;
};

export const getPointsForNextLevel = (level: number): number => {
  return Math.pow(level, 2) * 50;
};

export const calculatePoints = (correct: number, streak: number, phaseId: number): number => {
  const basePoints = correct * 10;
  const streakBonus = Math.floor(streak / 3) * 5;
  const phaseMultiplier = phaseId;
  return (basePoints + streakBonus) * phaseMultiplier;
};

export const getStarsForQuiz = (correct: number, total: number): number => {
  const percentage = (correct / total) * 100;
  if (percentage >= 90) return 3;
  if (percentage >= 70) return 2;
  if (percentage >= 50) return 1;
  return 0;
};

export const getTierColor = (tier: Trophy['tier']): string => {
  switch (tier) {
    case 'bronze': return 'from-amber-600 to-amber-800';
    case 'silver': return 'from-gray-300 to-gray-500';
    case 'gold': return 'from-yellow-400 to-yellow-600';
    case 'diamond': return 'from-cyan-300 to-blue-500';
    case 'master': return 'from-purple-400 to-pink-600';
  }
};

export const getTierBorder = (tier: Trophy['tier']): string => {
  switch (tier) {
    case 'bronze': return 'border-amber-500';
    case 'silver': return 'border-gray-400';
    case 'gold': return 'border-yellow-400';
    case 'diamond': return 'border-cyan-400';
    case 'master': return 'border-purple-400';
  }
};
