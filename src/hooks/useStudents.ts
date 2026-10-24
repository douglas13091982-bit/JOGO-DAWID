import { useState, useEffect, useCallback } from 'react';
import {
  Student,
  Trophy,
  TROPHY_DEFINITIONS,
  getLevelFromPoints,
  calculatePoints,
  getStarsForQuiz,
} from '../data/students';

const STORAGE_KEY = 'aprende_brincando_students';
const CURRENT_USER_KEY = 'aprende_brincando_current_user';

const loadStudents = (): Student[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveStudents = (students: Student[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

const loadCurrentUser = (): string | null => {
  try {
    return localStorage.getItem(CURRENT_USER_KEY);
  } catch {
    return null;
  }
};

const saveCurrentUser = (id: string | null) => {
  if (id) {
    localStorage.setItem(CURRENT_USER_KEY, id);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);
  const [newTrophies, setNewTrophies] = useState<Trophy[]>([]);

  useEffect(() => {
    setStudents(loadStudents());
    setCurrentStudentId(loadCurrentUser());
  }, []);

  const currentStudent = students.find(s => s.id === currentStudentId) || null;

  const registerStudent = useCallback((name: string): Student => {
    const trimmedName = name.trim();
    if (!trimmedName) throw new Error('Nome é obrigatório');

    const existing = students.find(s => s.name.toLowerCase() === trimmedName.toLowerCase());
    if (existing) {
      setCurrentStudentId(existing.id);
      saveCurrentUser(existing.id);
      return existing;
    }

    const newStudent: Student = {
      id: `student_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      name: trimmedName,
      createdAt: Date.now(),
      totalPoints: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      bestStreak: 0,
      trophies: [],
      stars: 0,
      level: 1,
      phaseProgress: { 1: 0, 2: 0, 3: 0 },
      subjectProgress: {},
      lastPlayed: Date.now(),
    };

    const updated = [...students, newStudent];
    setStudents(updated);
    saveStudents(updated);
    setCurrentStudentId(newStudent.id);
    saveCurrentUser(newStudent.id);
    return newStudent;
  }, [students]);

  const selectStudent = useCallback((id: string) => {
    setCurrentStudentId(id);
    saveCurrentUser(id);
  }, []);

  const logout = useCallback(() => {
    setCurrentStudentId(null);
    saveCurrentUser(null);
  }, []);

  const recordQuizResult = useCallback((
    subjectId: string,
    phaseId: number,
    correct: number,
    wrong: number,
    streak: number
  ) => {
    if (!currentStudentId) return;

    const total = correct + wrong;
    const pointsEarned = calculatePoints(correct, streak, phaseId);
    const starsEarned = getStarsForQuiz(correct, total);

    const updatedStudents = students.map(s => {
      if (s.id !== currentStudentId) return s;

      const newStudent = { ...s };
      newStudent.totalCorrect += correct;
      newStudent.totalAnswered += total;
      newStudent.totalPoints += pointsEarned;
      newStudent.bestStreak = Math.max(newStudent.bestStreak, streak);
      newStudent.stars += starsEarned;
      newStudent.level = getLevelFromPoints(newStudent.totalPoints);
      newStudent.lastPlayed = Date.now();

      newStudent.phaseProgress = {
        ...newStudent.phaseProgress,
        [phaseId]: (newStudent.phaseProgress[phaseId as 1 | 2 | 3] || 0) + 1,
      };

      newStudent.subjectProgress = {
        ...newStudent.subjectProgress,
        [subjectId]: (newStudent.subjectProgress[subjectId] || 0) + 1,
      };

      // Check for new trophies
      const earnedTrophies: Trophy[] = [];
      TROPHY_DEFINITIONS.forEach(def => {
        const alreadyHas = newStudent.trophies.some(t => t.id === def.id);
        if (!alreadyHas && def.requirement(newStudent)) {
          earnedTrophies.push({
            id: def.id,
            name: def.name,
            icon: def.icon,
            description: def.description,
            unlockedAt: Date.now(),
            tier: def.tier,
          });
        }
      });

      if (earnedTrophies.length > 0) {
        newStudent.trophies = [...newStudent.trophies, ...earnedTrophies];
        setNewTrophies(earnedTrophies);
      }

      return newStudent;
    });

    setStudents(updatedStudents);
    saveStudents(updatedStudents);

    return {
      pointsEarned,
      starsEarned,
      currentStudent: updatedStudents.find(s => s.id === currentStudentId),
    };
  }, [currentStudentId, students]);

  const clearNewTrophies = useCallback(() => {
    setNewTrophies([]);
  }, []);

  const getRanking = useCallback((): Student[] => {
    return [...students].sort((a, b) => b.totalPoints - a.totalPoints);
  }, [students]);

  const deleteStudent = useCallback((id: string) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    saveStudents(updated);
    if (currentStudentId === id) {
      setCurrentStudentId(null);
      saveCurrentUser(null);
    }
  }, [students, currentStudentId]);

  return {
    students,
    currentStudent,
    currentStudentId,
    registerStudent,
    selectStudent,
    logout,
    recordQuizResult,
    getRanking,
    deleteStudent,
    newTrophies,
    clearNewTrophies,
  };
}
