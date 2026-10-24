import { useState, useEffect, useCallback } from 'react';
import { subjects, phases, getQuestionsForPhaseAndSubject, getTotalQuestions, Question, Subject, Phase } from './data';
import { useStudents } from './hooks/useStudents';
import { TROPHY_DEFINITIONS, getLevelFromPoints, getPointsForNextLevel, getTierColor, getTierBorder } from './data/students';

type GameState = 'login' | 'select-student' | 'menu' | 'phase-select' | 'subject-select' | 'playing' | 'result' | 'ranking' | 'profile' | 'trophy-celebration';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const {
    students,
    currentStudent,
    registerStudent,
    selectStudent,
    logout,
    recordQuizResult,
    getRanking,
    deleteStudent,
    newTrophies,
    clearNewTrophies,
  } = useStudents();

  const [gameState, setGameState] = useState<GameState>('login');
  const [stats, setStats] = useState({ correct: 0, wrong: 0, total: 0, currentSubject: null as Subject | null, currentPhase: null as Phase | null });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [streak, setStreak] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [lastResult, setLastResult] = useState<{ pointsEarned: number; starsEarned: number } | null>(null);

  useEffect(() => {
    setAnimateIn(true);
  }, [gameState, currentQuestionIndex]);

  // Auto-login se já tem usuário
  useEffect(() => {
    if (currentStudent && gameState === 'login') {
      navigateTo('menu');
    }
  }, []);

  const navigateTo = (state: GameState) => {
    setAnimateIn(false);
    setTimeout(() => {
      setGameState(state);
      setAnimateIn(true);
    }, 150);
  };

  const handleRegister = () => {
    setLoginError('');
    if (!nameInput.trim()) {
      setLoginError('Digite seu nome!');
      return;
    }
    if (nameInput.trim().length < 2) {
      setLoginError('Nome muito curto!');
      return;
    }
    try {
      registerStudent(nameInput);
      setNameInput('');
      navigateTo('menu');
    } catch (e) {
      setLoginError('Erro ao cadastrar');
    }
  };

  const handleSelectStudent = (id: string) => {
    selectStudent(id);
    navigateTo('menu');
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

    const isCorrect = answerIndex === shuffledQuestions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      setStreak(prev => prev + 1);
    } else {
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 >= shuffledQuestions.length) {
      // Finalizar quiz
      const result = recordQuizResult(
        stats.currentSubject!.id,
        stats.currentPhase!.id,
        stats.correct,
        stats.wrong,
        streak
      );
      if (result) {
        setLastResult({ pointsEarned: result.pointsEarned, starsEarned: result.starsEarned });
      }
      if (newTrophies.length > 0) {
        navigateTo('trophy-celebration');
      } else {
        navigateTo('result');
      }
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

  const getRankPosition = (index: number): string => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getRankBg = (index: number, isCurrentUser: boolean): string => {
    if (isCurrentUser) return 'bg-yellow-500/20 border-yellow-400/50';
    if (index === 0) return 'bg-yellow-500/10 border-yellow-500/30';
    if (index === 1) return 'bg-gray-400/10 border-gray-400/30';
    if (index === 2) return 'bg-amber-600/10 border-amber-600/30';
    return 'bg-white/5 border-white/10';
  };

  // ============ LOGIN SCREEN ============
  if (gameState === 'login') {
    return (
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-2">
            Aprende Brincando
          </h1>
          <p className="text-purple-200 mb-6 text-sm sm:text-base">🎮 O jogo educativo mais divertido! 🎮</p>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 sm:p-8 border border-white/20 shadow-2xl">
            <div className="text-6xl mb-4">👋</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Bem-vindo!</h2>
            <p className="text-purple-200 text-xs sm:text-sm mb-6">Digite seu nome para começar a jogar e competir com seus amigos!</p>

            <input
              type="text"
              value={nameInput}
              onChange={(e) => { setNameInput(e.target.value); setLoginError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
              placeholder="Seu nome completo..."
              maxLength={30}
              className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors text-base sm:text-lg mb-2"
              autoFocus
            />
            {loginError && <p className="text-red-400 text-xs sm:text-sm mb-3">{loginError}</p>}

            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 font-bold text-base sm:text-lg py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 mt-2"
            >
              🚀 Entrar e Jogar!
            </button>

            {students.length > 0 && (
              <button
                onClick={() => navigateTo('select-student')}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl border border-white/20 transition-all duration-200 mt-3 text-sm sm:text-base"
              >
                👥 Entrar com perfil existente ({students.length})
              </button>
            )}
          </div>

          <p className="text-purple-300 text-xs mt-4">
            {getTotalQuestions()} questões • 6 matérias • 3 fases
          </p>
        </div>
      </div>
    );
  }

  // ============ SELECT STUDENT SCREEN ============
  if (gameState === 'select-student') {
    const ranking = getRanking();
    return (
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-3 sm:p-4 pt-6 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-2xl mx-auto">
          <button onClick={() => navigateTo('login')} className="mb-3 text-purple-200 hover:text-white text-sm">← Voltar</button>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">Quem está jogando?</h2>
          <p className="text-purple-300 text-center mb-6 text-sm">Selecione seu perfil</p>

          <div className="grid gap-3">
            {ranking.map((student, index) => (
              <button
                key={student.id}
                onClick={() => handleSelectStudent(student.id)}
                className={`bg-white/10 hover:bg-white/20 border-2 rounded-xl p-3 sm:p-4 flex items-center gap-3 transition-all active:scale-95 ${getRankBg(index, false)}`}
              >
                <div className="text-2xl sm:text-3xl shrink-0">{getRankPosition(index)}</div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-white font-bold text-sm sm:text-lg truncate">{student.name}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-yellow-300 text-xs sm:text-sm">⭐ {student.totalPoints} pts</span>
                    <span className="text-purple-300 text-xs">🏆 Nível {student.level}</span>
                    <span className="text-cyan-300 text-xs">🌟 {student.stars}</span>
                  </div>
                </div>
                <div className="text-xl shrink-0">→</div>
              </button>
            ))}
          </div>

          <button
            onClick={() => navigateTo('login')}
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl text-sm sm:text-base"
          >
            ➕ Cadastrar novo aluno
          </button>
        </div>
      </div>
    );
  }

  // ============ MENU SCREEN ============
  if (gameState === 'menu' && currentStudent) {
    const ranking = getRanking();
    const position = ranking.findIndex(s => s.id === currentStudent.id) + 1;
    const nextLevelPoints = getPointsForNextLevel(currentStudent.level + 1);
    const currentLevelPoints = getPointsForNextLevel(currentStudent.level);
    const progressToNext = ((currentStudent.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;

    return (
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-3 sm:p-4 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md mx-auto">
          {/* Header com perfil */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-2xl mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl sm:text-2xl font-bold text-white shrink-0">
                  {currentStudent.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-bold text-sm sm:text-base truncate">Olá, {currentStudent.name}!</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-yellow-300 text-xs">🏆 Nível {currentStudent.level}</span>
                    <span className="text-cyan-300 text-xs">🌟 {currentStudent.stars}</span>
                    <span className="text-purple-300 text-xs">🏅 #{position}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => navigateTo('profile')} className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors shrink-0">
                <span className="text-lg">⚙️</span>
              </button>
            </div>

            {/* Barra de progresso do nível */}
            <div className="bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500" style={{ width: `${Math.min(100, progressToNext)}%` }}></div>
            </div>
            <p className="text-purple-200 text-[10px] sm:text-xs mt-1 text-right">{currentStudent.totalPoints} / {nextLevelPoints} pts</p>
          </div>

          {/* Botões principais */}
          <div className="grid gap-3">
            <button
              onClick={() => navigateTo('phase-select')}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 font-bold text-base sm:text-xl py-4 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all active:scale-95"
            >
              🚀 Jogar Agora!
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigateTo('ranking')}
                className="bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all active:scale-95"
              >
                <div className="text-2xl mb-1">🏆</div>
                <div className="text-xs sm:text-sm">Ranking</div>
              </button>
              <button
                onClick={() => navigateTo('profile')}
                className="bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all active:scale-95"
              >
                <div className="text-2xl mb-1">👤</div>
                <div className="text-xs sm:text-sm">Meu Perfil</div>
              </button>
            </div>
          </div>

          {/* Mini ranking */}
          {ranking.length > 1 && (
            <div className="mt-4 bg-white/5 rounded-xl p-3 border border-white/10">
              <h3 className="text-white font-semibold text-xs sm:text-sm mb-2">🏆 Top 3 - Ranking Geral</h3>
              <div className="space-y-1.5">
                {ranking.slice(0, 3).map((student, idx) => (
                  <div key={student.id} className={`flex items-center gap-2 p-1.5 rounded-lg ${student.id === currentStudent.id ? 'bg-yellow-500/20' : ''}`}>
                    <span className="text-base sm:text-lg">{getRankPosition(idx)}</span>
                    <span className={`flex-1 text-xs sm:text-sm truncate ${student.id === currentStudent.id ? 'text-yellow-300 font-bold' : 'text-white/80'}`}>
                      {student.name} {student.id === currentStudent.id && '(você)'}
                    </span>
                    <span className="text-yellow-300 text-xs font-bold">{student.totalPoints}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={logout}
            className="w-full mt-4 text-purple-300 hover:text-white text-xs py-2 transition-colors"
          >
            🚪 Trocar de aluno
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE SELECT ============
  if (gameState === 'phase-select') {
    return (
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-3 sm:p-4 pt-6 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-2xl mx-auto">
          <button onClick={goToMenu} className="mb-3 text-purple-200 hover:text-white text-sm">← Voltar ao Menu</button>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">Escolha a Fase</h2>
          <p className="text-purple-300 text-center mb-6 text-sm">Selecione o nível de dificuldade</p>

          <div className="grid grid-cols-1 gap-3">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => { setSelectedPhase(phase); navigateTo('subject-select'); }}
                className={`relative overflow-hidden bg-gradient-to-r ${phase.color} p-4 sm:p-5 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all active:scale-95 text-left`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-4xl sm:text-5xl shrink-0">{phase.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white truncate">{phase.name}</h3>
                    <p className="text-white/80 text-xs sm:text-sm truncate">{phase.description}</p>
                    <span className={`inline-block mt-1 text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${
                      phase.difficulty === 'Fácil' ? 'bg-green-400/30 text-green-100' :
                      phase.difficulty === 'Médio' ? 'bg-yellow-400/30 text-yellow-100' :
                      'bg-red-400/30 text-red-100'
                    }`}>{phase.difficulty}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============ SUBJECT SELECT ============
  if (gameState === 'subject-select' && selectedPhase) {
    return (
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-3 sm:p-4 pt-6 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-2xl mx-auto">
          <button onClick={() => navigateTo('phase-select')} className="mb-3 text-purple-200 hover:text-white text-sm">← Voltar</button>
          <div className="text-center mb-4">
            <span className="text-3xl">{selectedPhase.icon}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">{selectedPhase.name}</h2>
            <p className="text-purple-300 text-xs sm:text-sm">Escolha a matéria</p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {subjects.map((subject) => {
              const questions = getQuestionsForPhaseAndSubject(selectedPhase.id, subject.id);
              return (
                <button
                  key={subject.id}
                  onClick={() => startQuiz(subject, selectedPhase)}
                  className={`relative overflow-hidden bg-gradient-to-br ${subject.color} p-3 sm:p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all active:scale-95 text-left`}
                >
                  <span className="text-2xl sm:text-3xl mb-1 block">{subject.icon}</span>
                  <h3 className="text-xs sm:text-base font-bold text-white truncate">{subject.name}</h3>
                  <p className="text-white/70 text-[10px] sm:text-xs">{questions.length} questões</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ============ PLAYING ============
  if (gameState === 'playing' && stats.currentSubject && stats.currentPhase) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

    return (
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-3 sm:p-4 pt-4 transition-opacity duration-300 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={goToMenu} className="text-purple-200 hover:text-white text-xs sm:text-sm">← Sair</button>
            <div className="flex items-center gap-2">
              {streak >= 3 && (
                <span className="bg-orange-500/30 text-orange-300 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold animate-pulse">🔥 {streak}</span>
              )}
              <span className="text-purple-200 text-xs sm:text-sm">{currentQuestionIndex + 1}/{shuffledQuestions.length}</span>
            </div>
          </div>

          <div className="w-full bg-white/10 rounded-full h-2 sm:h-2.5 mb-3 overflow-hidden">
            <div className={`h-full rounded-full bg-gradient-to-r ${stats.currentSubject.color} transition-all duration-500`} style={{ width: `${progress}%` }}></div>
          </div>

          <div className="flex items-center justify-between mb-3 gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-lg sm:text-xl shrink-0">{stats.currentSubject.icon}</span>
              <span className="text-white/80 text-xs sm:text-sm truncate">{stats.currentSubject.name}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full shrink-0">
              <span className="text-xs sm:text-sm">{stats.currentPhase.icon}</span>
              <span className="text-white/70 text-[10px] sm:text-xs">{stats.currentPhase.name}</span>
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs">✓ {stats.correct}</span>
            <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full text-xs">✗ {stats.wrong}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 sm:p-5 border border-white/20 shadow-2xl mb-3">
            <h3 className="text-sm sm:text-xl font-bold text-white mb-3 sm:mb-5 leading-relaxed">{currentQuestion.question}</h3>
            <div className="grid gap-2">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = 'bg-white/5 border-white/20 text-white';
                if (selectedAnswer !== null) {
                  if (index === currentQuestion.correctAnswer) buttonClass = 'bg-green-500/30 border-green-400 text-green-100 ring-2 ring-green-400/50';
                  else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) buttonClass = 'bg-red-500/30 border-red-400 text-red-100 ring-2 ring-red-400/50';
                  else buttonClass = 'bg-white/5 border-white/10 text-white/50';
                }
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-xl border-2 transition-all active:scale-[0.98] ${buttonClass} ${selectedAnswer === null ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium text-xs sm:text-sm break-words flex-1">{option}</span>
                      {selectedAnswer !== null && index === currentQuestion.correctAnswer && <span className="text-green-400 text-base sm:text-lg">✓</span>}
                      {selectedAnswer === index && index !== currentQuestion.correctAnswer && <span className="text-red-400 text-base sm:text-lg">✗</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <div className={`rounded-xl p-3 mb-3 border ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <p className={`font-medium text-xs sm:text-sm ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-300' : 'text-red-300'}`}>
                {selectedAnswer === currentQuestion.correctAnswer ? '🎉 Correto!' : '❌ Incorreto!'}
              </p>
              <p className="text-white/80 text-[11px] sm:text-sm mt-1">💡 {currentQuestion.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <button onClick={nextQuestion} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all text-sm sm:text-base">
              {currentQuestionIndex + 1 >= shuffledQuestions.length ? '🏁 Ver Resultado' : '→ Próxima Questão'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ TROPHY CELEBRATION ============
  if (gameState === 'trophy-celebration' && newTrophies.length > 0) {
    return (
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md mx-auto text-center">
          <div className="text-6xl sm:text-7xl mb-4 animate-bounce">🎊</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Novos Troféus!</h2>
          <p className="text-purple-200 text-sm mb-6">Você conquistou:</p>

          <div className="space-y-3 mb-6">
            {newTrophies.map((trophy) => (
              <div key={trophy.id} className={`bg-gradient-to-r ${getTierColor(trophy.tier)} p-[2px] rounded-2xl`}>
                <div className="bg-indigo-900/90 rounded-2xl p-4 flex items-center gap-3">
                  <div className="text-4xl sm:text-5xl">{trophy.icon}</div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-white font-bold text-sm sm:text-base truncate">{trophy.name}</p>
                    <p className="text-white/70 text-xs">{trophy.description}</p>
                    <p className="text-yellow-300 text-[10px] sm:text-xs mt-1 uppercase">{trophy.tier}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { clearNewTrophies(); navigateTo('result'); }}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 rounded-xl active:scale-95 transition-all"
          >
            ✨ Continuar
          </button>
        </div>
      </div>
    );
  }

  // ============ RESULT ============
  if (gameState === 'result') {
    const percentage = Math.round((stats.correct / stats.total) * 100);

    return (
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-3 sm:p-4 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-lg mx-auto text-center">
          <div className="text-6xl sm:text-7xl mb-3 animate-bounce">{getScoreEmoji()}</div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Resultado Final</h2>

            {lastResult && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-3 mb-4">
                <div className="flex justify-around items-center">
                  <div>
                    <p className="text-yellow-300 text-xl sm:text-2xl font-bold">+{lastResult.pointsEarned}</p>
                    <p className="text-white/60 text-[10px] sm:text-xs">pontos</p>
                  </div>
                  <div className="text-2xl">⭐</div>
                  <div>
                    <p className="text-cyan-300 text-xl sm:text-2xl font-bold">+{lastResult.starsEarned}</p>
                    <p className="text-white/60 text-[10px] sm:text-xs">estrelas</p>
                  </div>
                </div>
              </div>
            )}

            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none"
                  stroke={percentage >= 80 ? '#4ade80' : percentage >= 60 ? '#facc15' : '#f87171'}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${percentage * 2.83} 283`}
                  className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl sm:text-4xl font-bold ${getScoreColor()}`}>{percentage}%</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-white font-medium mb-3">{getScoreMessage()}</p>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/5 rounded-xl p-2">
                <p className="text-lg sm:text-xl font-bold text-green-400">{stats.correct}</p>
                <p className="text-[10px] sm:text-xs text-white/60">Acertos</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <p className="text-lg sm:text-xl font-bold text-red-400">{stats.wrong}</p>
                <p className="text-[10px] sm:text-xs text-white/60">Erros</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <p className="text-lg sm:text-xl font-bold text-yellow-400">{stats.total}</p>
                <p className="text-[10px] sm:text-xs text-white/60">Total</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button onClick={() => startQuiz(stats.currentSubject!, stats.currentPhase!)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl active:scale-95 transition-all text-sm sm:text-base">
              🔄 Jogar Novamente
            </button>
            <button onClick={() => navigateTo('subject-select')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl active:scale-95 transition-all text-sm sm:text-base">
              📚 Outra Matéria
            </button>
            <button onClick={goToMenu}
              className="bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-xl border border-white/20 transition-all text-sm sm:text-base">
              🏠 Menu Principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ RANKING ============
  if (gameState === 'ranking' && currentStudent) {
    const ranking = getRanking();
    return (
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-3 sm:p-4 pt-6 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-2xl mx-auto">
          <button onClick={goToMenu} className="mb-3 text-purple-200 hover:text-white text-sm">← Voltar</button>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">🏆 Ranking Geral</h2>
          <p className="text-purple-300 text-center mb-4 text-sm">Quem é o melhor aluno?</p>

          {ranking.length === 0 && (
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <p className="text-white">Nenhum aluno cadastrado ainda!</p>
            </div>
          )}

          <div className="space-y-2">
            {ranking.map((student, index) => {
              const isCurrentUser = student.id === currentStudent.id;
              return (
                <div key={student.id} className={`border-2 rounded-xl p-3 transition-all ${getRankBg(index, isCurrentUser)}`}>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl sm:text-3xl shrink-0 w-10 text-center">{getRankPosition(index)}</div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-base sm:text-lg font-bold text-white shrink-0">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm sm:text-base truncate ${isCurrentUser ? 'text-yellow-300' : 'text-white'}`}>
                        {student.name} {isCurrentUser && <span className="text-[10px] sm:text-xs">(você)</span>}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap text-[10px] sm:text-xs">
                        <span className="text-purple-300">🏆 Nível {student.level}</span>
                        <span className="text-cyan-300">🌟 {student.stars}</span>
                        <span className="text-green-300">✓ {student.totalCorrect}</span>
                        <span className="text-orange-300">🔥 {student.bestStreak}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-yellow-300 font-bold text-sm sm:text-lg">{student.totalPoints}</p>
                      <p className="text-white/50 text-[9px] sm:text-xs">pontos</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ============ PROFILE ============
  if (gameState === 'profile' && currentStudent) {
    const ranking = getRanking();
    const position = ranking.findIndex(s => s.id === currentStudent.id) + 1;
    const nextLevelPoints = getPointsForNextLevel(currentStudent.level + 1);
    const currentLevelPoints = getPointsForNextLevel(currentStudent.level);
    const progressToNext = ((currentStudent.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    const accuracy = currentStudent.totalAnswered > 0 ? Math.round((currentStudent.totalCorrect / currentStudent.totalAnswered) * 100) : 0;

    return (
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-3 sm:p-4 pt-6 transition-opacity duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-2xl mx-auto">
          <button onClick={goToMenu} className="mb-3 text-purple-200 hover:text-white text-sm">← Voltar</button>

          {/* Header do perfil */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl mb-4">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shrink-0">
                {currentStudent.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-white truncate">{currentStudent.name}</h2>
                <p className="text-purple-200 text-xs sm:text-sm">🏆 Nível {currentStudent.level} • 🏅 #{position} no ranking</p>
              </div>
            </div>

            {/* Barra de nível */}
            <div className="bg-white/10 rounded-full h-3 overflow-hidden mb-1">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500" style={{ width: `${Math.min(100, progressToNext)}%` }}></div>
            </div>
            <p className="text-purple-200 text-[10px] sm:text-xs text-right">{currentStudent.totalPoints} / {nextLevelPoints} pts para o próximo nível</p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <p className="text-xl sm:text-2xl font-bold text-yellow-300">{currentStudent.totalPoints}</p>
              <p className="text-[10px] sm:text-xs text-white/60">Pontos</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <p className="text-xl sm:text-2xl font-bold text-cyan-300">{currentStudent.stars}</p>
              <p className="text-[10px] sm:text-xs text-white/60">Estrelas</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <p className="text-xl sm:text-2xl font-bold text-green-300">{accuracy}%</p>
              <p className="text-[10px] sm:text-xs text-white/60">Precisão</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
              <p className="text-xl sm:text-2xl font-bold text-orange-300">🔥 {currentStudent.bestStreak}</p>
              <p className="text-[10px] sm:text-xs text-white/60">Melhor seq.</p>
            </div>
          </div>

          {/* Troféus */}
          <div className="bg-white/10 rounded-2xl p-3 sm:p-4 border border-white/10 mb-4">
            <h3 className="text-white font-bold text-sm sm:text-lg mb-3">🏆 Troféus ({currentStudent.trophies.length}/{TROPHY_DEFINITIONS.length})</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {TROPHY_DEFINITIONS.map((def) => {
                const unlocked = currentStudent.trophies.find(t => t.id === def.id);
                return (
                  <div key={def.id} className={`relative rounded-xl p-2 text-center border-2 transition-all ${
                    unlocked ? `${getTierBorder(def.tier)} bg-white/10` : 'border-white/10 bg-white/5 opacity-50'
                  }`}>
                    <div className={`text-2xl sm:text-3xl mb-1 ${unlocked ? '' : 'grayscale'}`}>{def.icon}</div>
                    <p className="text-[9px] sm:text-[10px] text-white/80 leading-tight truncate">{unlocked ? def.name : '???'}</p>
                    {unlocked && (
                      <div className={`absolute top-0 right-0 bg-gradient-to-r ${getTierColor(def.tier)} text-white text-[8px] px-1 rounded-bl rounded-tr-lg`}>
                        {def.tier.toUpperCase()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ações */}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => navigateTo('ranking')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl active:scale-95 transition-all text-xs sm:text-sm">
              🏆 Ver Ranking
            </button>
            <button onClick={logout}
              className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl border border-white/20 transition-all text-xs sm:text-sm">
              🚪 Trocar de Aluno
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
