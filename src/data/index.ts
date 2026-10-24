import { Question } from './types';
import {
  matematica_fase1, portugues_fase1, geografia_fase1,
  historia_fase1, ciencias_fase1, ingles_fase1
} from './phase1';
import {
  matematica_fase2, portugues_fase2, geografia_fase2,
  historia_fase2, ciencias_fase2, ingles_fase2
} from './phase2';
import {
  matematica_fase3, portugues_fase3, geografia_fase3,
  historia_fase3, ciencias_fase3, ingles_fase3
} from './phase3';

export { phases, subjects } from './types';
export type { Question, Subject, Phase } from './types';

export const questionsByPhaseAndSubject: Record<number, Record<string, Question[]>> = {
  1: {
    matematica: matematica_fase1,
    portugues: portugues_fase1,
    geografia: geografia_fase1,
    historia: historia_fase1,
    ciencias: ciencias_fase1,
    ingles: ingles_fase1,
  },
  2: {
    matematica: matematica_fase2,
    portugues: portugues_fase2,
    geografia: geografia_fase2,
    historia: historia_fase2,
    ciencias: ciencias_fase2,
    ingles: ingles_fase2,
  },
  3: {
    matematica: matematica_fase3,
    portugues: portugues_fase3,
    geografia: geografia_fase3,
    historia: historia_fase3,
    ciencias: ciencias_fase3,
    ingles: ingles_fase3,
  },
};

export const getQuestionsForPhaseAndSubject = (phaseId: number, subjectId: string): Question[] => {
  return questionsByPhaseAndSubject[phaseId]?.[subjectId] || [];
};

export const getTotalQuestions = (): number => {
  let total = 0;
  Object.values(questionsByPhaseAndSubject).forEach(phase => {
    Object.values(phase).forEach(questions => {
      total += questions.length;
    });
  });
  return total;
};
