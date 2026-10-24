import { useState, useEffect, useCallback } from 'react';
import { subjects, phases, getQuestionsForPhaseAndSubject, getTotalQuestions, Question, Subject, Phase } from './data';

type GameState = 'menu' | 'phase-select' | 'subject-select' | 'playing' | 'result';

interface GameStats {
  correct: number;
  wrong: number;
  total: number;
  currentSubject: Subject | null;
  currentPhase: Phase | null;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [stats, setStats] = useState<GameStats>({ correct: 0, wrong: 0, total: 0, currentSubject: null, currentPhase: null });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [questionsPerPhase, setQuestionsPerPhase] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0 });
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);

  useEffect(() => {
    setAnimateIn(true);
  }, [gameState, currentQuestionIndex]);

  const navigateTo = (state: GameState) => {
    setAnimateIn(false);
    setTimeout(() => {
      setGameState(state);
      setAnimateIn(true);
    }, 150);
  };

  const startQuiz = useCallback((subject: Subject, phase: Phase) => {
    const questions = getQuestionsForPhaseAndSubject(phase.id, subject.id);
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
    setStats({ correct: 0, wrong: 0, total: shuffled.length, currentSubject: subject, currentPhase: phase });
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setStreak(0);
    setGameState('playing');
    setAnimateIn(false);
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    setTotalQuestionsAnswered(prev => prev + 1);
    
    const isCorrect = answerIndex === shuffledQuestions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) setBestStreak(newStreak);
        return newStreak;
      });
    } else {
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
      setStreak(0);
    }

    if (stats.currentPhase) {
      setQuestionsPerPhase(prev => ({
        ...prev,
        [stats.currentPhase!.id]: (prev[stats.currentPhase!.id] || 0) + 1
      }));
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 >= shuffledQuestions.length) {
      navigateTo('result');
    } else {
      setAnimateIn(false);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setAnimateIn(true);
      }, 200);
    }
  };

  const goToMenu = () => navigateTo('menu');

  const getScoreColor = () => {
    const percentage = (stats.correct / stats.total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreEmoji = () => {
    const percentage = (stats.correct / stats.total) * 100;
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 60) return '👍';
    if (percentage >= 40) return '💪';
    return '📚';
  };

  const getScoreMessage = () => {
    const percentage = (stats.correct / stats.total) * 100;
    if (percentage >= 90) return 'Incrível! Você é um gênio!';
    if (percentage >= 80) return 'Muito bem! Excelente desempenho!';
    if (percentage >= 60) return 'Bom trabalho! Continue estudando!';
    if (percentage >= 40) return 'Não desista! Pratique mais!';
    return 'Continue tentando! A prática leva à perfeição!';
  };

  const getPhaseIcon = (phaseId: number) => {
    const phase = phases.find(p => p.id === phaseId);
    return phase?.icon || '📝';
  };

  // ============ MENU SCREEN ============
  if (gameState === 'menu') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-20">📚</div>
          <div className="absolute top-20 right-20 text-5xl animate-pulse opacity-20">🎓</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-bounce opacity-20" style={{animationDelay: '0.5s'}}>🧠</div>
          <div className="absolute bottom-10 right-10 text-6xl animate-pulse opacity-20" style={{animationDelay: '1s'}}>⭐</div>
          <div className="absolute top-1/2 left-5 text-4xl animate-bounce opacity-15" style={{animationDelay: '0.3s'}}>🎯</div>
          <div className="absolute top-1/3 right-10 text-4xl animate-pulse opacity-15" style={{animationDelay: '0.7s'}}>💡</div>
        </div>

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-4 drop-shadow-lg">
              Aprende Brincando
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 font-medium">
              🎮 O jogo educativo mais divertido! 🎮
            </p>
            <p className="text-sm text-purple-300 mt-2">
              {getTotalQuestions()} questões • 6 matérias • 3 fases
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-xl font-bold text-yellow-300">{totalQuestionsAnswered}</p>
                <p className="text-xs text-purple-200">Respondidas</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-xl font-bold text-green-300">🔥 {bestStreak}</p>
                <p className="text-xs text-purple-200">Sequência</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-xl font-bold text-cyan-300">{getTotalQuestions()}</p>
                <p className="text-xs text-purple-200">Total</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('phase-select')}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 font-bold text-xl py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              🚀 Começar a Jogar!
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-3 text-3xl">
            <span className="animate-bounce" style={{animationDelay: '0s'}}>🔢</span>
            <span className="animate-bounce" style={{animationDelay: '0.1s'}}>📚</span>
            <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🌍</span>
            <span className="animate-bounce" style={{animationDelay: '0.3s'}}>📜</span>
            <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🔬</span>
            <span className="animate-bounce" style={{animationDelay: '0.5s'}}>🇬🇧</span>
          </div>
        </div>
      </div>
    );
  }

  // ============ PHASE SELECT SCREEN ============
  if (gameState === 'phase-select') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-4 pt-8 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-2xl mx-auto">
          <button onClick={goToMenu} className="mb-4 text-purple-200 hover:text-white flex items-center gap-2 transition-colors">
            ← Voltar ao Menu
          </button>

          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
            Escolha a Fase
          </h2>
          <p className="text-purple-300 text-center mb-8">
            Selecione o nível de dificuldade
          </p>

          <div className="grid grid-cols-1 gap-4">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => { setSelectedPhase(phase); navigateTo('subject-select'); }}
                className={`relative overflow-hidden bg-gradient-to-r ${phase.color} p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 active:scale-95 text-left group`}
              >
                <div className="absolute top-2 right-4 text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                  {phase.icon}
                </div>
                <div className="relative z-10 flex items-center gap-4">
                  <span className="text-5xl">{phase.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{phase.name}</h3>
                    <p className="text-white/80">{phase.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        phase.difficulty === 'Fácil' ? 'bg-green-400/30 text-green-100' :
                        phase.difficulty === 'Médio' ? 'bg-yellow-400/30 text-yellow-100' :
                        'bg-red-400/30 text-red-100'
                      }`}>
                        {phase.difficulty}
                      </span>
                      <span className="text-white/60 text-sm">
                        {questionsPerPhase[phase.id] || 0} questões respondidas
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div className="h-full bg-white/60 w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-semibold mb-3 text-center">📊 Progresso por Fase</h3>
            <div className="grid grid-cols-3 gap-3">
              {phases.map(phase => (
                <div key={phase.id} className="bg-white/5 rounded-lg p-3 text-center">
                  <span className="text-2xl">{phase.icon}</span>
                  <p className="text-white font-medium text-sm mt-1">{phase.name}</p>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${phase.color}`}
                      style={{ width: `${Math.min(100, ((questionsPerPhase[phase.id] || 0) / 240) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-white/60 text-xs mt-1">{questionsPerPhase[phase.id] || 0}/240</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ SUBJECT SELECT SCREEN ============
  if (gameState === 'subject-select' && selectedPhase) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-4 pt-8 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-2xl mx-auto">
          <button
            onClick={() => navigateTo('phase-select')}
            className="mb-4 text-purple-200 hover:text-white flex items-center gap-2 transition-colors"
          >
            ← Voltar às Fases
          </button>

          <div className="text-center mb-6">
            <span className="text-4xl">{selectedPhase.icon}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              {selectedPhase.name}
            </h2>
            <p className="text-purple-300">{selectedPhase.description} • Escolha a matéria</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject) => {
              const questions = getQuestionsForPhaseAndSubject(selectedPhase.id, subject.id);
              return (
                <button
                  key={subject.id}
                  onClick={() => startQuiz(subject, selectedPhase)}
                  className={`relative overflow-hidden bg-gradient-to-br ${subject.color} p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 active:scale-95 text-left group`}
                >
                  <div className="absolute top-2 right-2 text-5xl opacity-30 group-hover:opacity-50 transition-opacity">
                    {subject.icon}
                  </div>
                  <div className="relative z-10">
                    <span className="text-4xl mb-2 block">{subject.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{subject.name}</h3>
                    <p className="text-white/70 text-sm">{questions.length} questões</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full bg-white/60 w-0 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ============ PLAYING SCREEN ============
  if (gameState === 'playing' && stats.currentSubject && stats.currentPhase) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

    return (
      <div className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-4 pt-6 transition-opacity duration-300 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={goToMenu} className="text-purple-200 hover:text-white text-sm flex items-center gap-1 transition-colors">
              ← Sair
            </button>
            <div className="flex items-center gap-3">
              {streak >= 3 && (
                <span className="bg-orange-500/30 text-orange-300 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                  🔥 {streak}
                </span>
              )}
              <span className="text-purple-200 text-sm">
                {currentQuestionIndex + 1}/{shuffledQuestions.length}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${stats.currentSubject.color} transition-all duration-500 ease-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Subject & Phase badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{stats.currentSubject.icon}</span>
              <span className="text-white/80 font-medium">{stats.currentSubject.name}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <span>{stats.currentPhase.icon}</span>
              <span className="text-white/70 text-sm">{stats.currentPhase.name}</span>
            </div>
          </div>

          {/* Score */}
          <div className="flex gap-4 mb-6">
            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
              ✓ {stats.correct}
            </span>
            <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
              ✗ {stats.wrong}
            </span>
          </div>

          {/* Question Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
              {currentQuestion.question}
            </h3>

            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = 'bg-white/5 border-white/20 hover:bg-white/15 hover:border-white/40 text-white';
                
                if (selectedAnswer !== null) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass = 'bg-green-500/30 border-green-400 text-green-100 ring-2 ring-green-400/50';
                  } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                    buttonClass = 'bg-red-500/30 border-red-400 text-red-100 ring-2 ring-red-400/50';
                  } else {
                    buttonClass = 'bg-white/5 border-white/10 text-white/50';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${buttonClass} ${selectedAnswer === null ? 'active:scale-[0.98] cursor-pointer' : 'cursor-default'}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium">{option}</span>
                      {selectedAnswer !== null && index === currentQuestion.correctAnswer && (
                        <span className="ml-auto text-green-400 text-xl">✓</span>
                      )}
                      {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                        <span className="ml-auto text-red-400 text-xl">✗</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`rounded-xl p-4 mb-6 border ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <p className={`font-medium ${
                selectedAnswer === currentQuestion.correctAnswer ? 'text-green-300' : 'text-red-300'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer ? '🎉 Correto!' : '❌ Incorreto!'}
              </p>
              <p className="text-white/80 text-sm mt-1">
                💡 {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Next button */}
          {selectedAnswer !== null && (
            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 active:scale-95"
            >
              {currentQuestionIndex + 1 >= shuffledQuestions.length ? '🏁 Ver Resultado' : '→ Próxima Questão'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ RESULT SCREEN ============
  if (gameState === 'result') {
    const percentage = Math.round((stats.correct / stats.total) * 100);

    return (
      <div className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-lg mx-auto text-center">
          <div className="text-8xl mb-6 animate-bounce">
            {getScoreEmoji()}
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">Resultado Final</h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl">{stats.currentSubject?.icon}</span>
              <span className="text-purple-200">{stats.currentSubject?.name}</span>
              <span className="text-white/40">|</span>
              <span className="text-2xl">{stats.currentPhase?.icon}</span>
              <span className="text-purple-200">{stats.currentPhase?.name}</span>
            </div>

            {/* Score circle */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="45" fill="none"
                  stroke={percentage >= 80 ? '#4ade80' : percentage >= 60 ? '#facc15' : '#f87171'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${percentage * 2.83} 283`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-4xl font-bold ${getScoreColor()}`}>{percentage}%</span>
              </div>
            </div>

            <p className="text-xl text-white font-medium mb-4">{getScoreMessage()}</p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-2xl font-bold text-green-400">{stats.correct}</p>
                <p className="text-xs text-white/60">Acertos</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-2xl font-bold text-red-400">{stats.wrong}</p>
                <p className="text-xs text-white/60">Erros</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-2xl font-bold text-yellow-400">{stats.total}</p>
                <p className="text-xs text-white/60">Total</p>
              </div>
            </div>

            {bestStreak >= 3 && (
              <div className="mt-4 bg-orange-500/10 border border-orange-500/30 rounded-xl p-3">
                <p className="text-orange-300 font-medium">🔥 Melhor sequência: {bestStreak} acertos seguidos!</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => startQuiz(stats.currentSubject!, stats.currentPhase!)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              🔄 Jogar Novamente
            </button>
            <button
              onClick={() => navigateTo('subject-select')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              📚 Outra Matéria
            </button>
            <button
              onClick={() => navigateTo('phase-select')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              🎯 Outra Fase
            </button>
            <button
              onClick={goToMenu}
              className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-xl border border-white/20 transition-all duration-200"
            >
              🏠 Menu Principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
