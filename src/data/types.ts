export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface Phase {
  id: number;
  name: string;
  description: string;
  icon: string;
  difficulty: string;
  color: string;
}

export const phases: Phase[] = [
  { id: 1, name: "Fase 1", description: "Nível Básico", icon: "🌱", difficulty: "Fácil", color: "from-green-400 to-green-600" },
  { id: 2, name: "Fase 2", description: "Nível Intermediário", icon: "🌿", difficulty: "Médio", color: "from-yellow-400 to-orange-500" },
  { id: 3, name: "Fase 3", description: "Nível Avançado", icon: "🌳", difficulty: "Difícil", color: "from-red-400 to-red-600" },
];

export const subjects: Subject[] = [
  { id: "matematica", name: "Matemática", icon: "🔢", color: "from-blue-500 to-blue-700", bgColor: "bg-blue-50 border-blue-200" },
  { id: "portugues", name: "Português", icon: "📚", color: "from-green-500 to-green-700", bgColor: "bg-green-50 border-green-200" },
  { id: "geografia", name: "Geografia", icon: "🌍", color: "from-emerald-500 to-emerald-700", bgColor: "bg-emerald-50 border-emerald-200" },
  { id: "historia", name: "História", icon: "📜", color: "from-amber-500 to-amber-700", bgColor: "bg-amber-50 border-amber-200" },
  { id: "ciencias", name: "Ciências", icon: "🔬", color: "from-purple-500 to-purple-700", bgColor: "bg-purple-50 border-purple-200" },
  { id: "ingles", name: "Inglês", icon: "🇬🇧", color: "from-red-500 to-red-700", bgColor: "bg-red-50 border-red-200" },
];
