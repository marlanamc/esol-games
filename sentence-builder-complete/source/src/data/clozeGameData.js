// Cloze Game Data for Advanced Verb Form Practice
export const clozeGameTemplates = [
  // Present Simple Cloze
  {
    id: 'present-simple-1',
    level: 1,
    category: 'present-simple',
    template: 'She _____ (eat) pizza every day.',
    correctAnswer: 'eats',
    options: ['eat', 'eats', 'eating', 'ate'],
    explanation: 'Use V1-3rd form "eats" with "she" in present simple.',
    points: 20
  },
  {
    id: 'present-simple-2',
    level: 1,
    category: 'present-simple',
    template: 'They _____ (play) soccer on weekends.',
    correctAnswer: 'play',
    options: ['play', 'plays', 'playing', 'played'],
    explanation: 'Use V1 form "play" with "they" in present simple.',
    points: 20
  },

  // Past Simple Cloze
  {
    id: 'past-simple-1',
    level: 11,
    category: 'past-simple',
    template: 'She _____ (eat) pizza yesterday.',
    correctAnswer: 'ate',
    options: ['eat', 'eats', 'eating', 'ate'],
    explanation: 'Use V2 form "ate" for past simple.',
    points: 30
  },
  {
    id: 'past-simple-2',
    level: 11,
    category: 'past-simple',
    template: 'They _____ (go) to school last week.',
    correctAnswer: 'went',
    options: ['go', 'goes', 'going', 'went'],
    explanation: 'Use V2 form "went" for past simple (irregular verb).',
    points: 30
  },

  // Present Continuous Cloze
  {
    id: 'present-continuous-1',
    level: 16,
    category: 'present-continuous',
    template: 'She _____ (eat) pizza right now.',
    correctAnswer: 'is eating',
    options: ['eat', 'eats', 'is eating', 'ate'],
    explanation: 'Use "is" + V1-ing for present continuous with "she".',
    points: 40
  },
  {
    id: 'present-continuous-2',
    level: 16,
    category: 'present-continuous',
    template: 'They _____ (study) English at the moment.',
    correctAnswer: 'are studying',
    options: ['study', 'studies', 'are studying', 'studied'],
    explanation: 'Use "are" + V1-ing for present continuous with "they".',
    points: 40
  },

  // Present Perfect Cloze
  {
    id: 'present-perfect-1',
    level: 18,
    category: 'present-perfect',
    template: 'She _____ (eat) pizza before.',
    correctAnswer: 'has eaten',
    options: ['eat', 'eats', 'has eaten', 'ate'],
    explanation: 'Use "has" + V3 for present perfect with "she".',
    points: 50
  },
  {
    id: 'present-perfect-2',
    level: 18,
    category: 'present-perfect',
    template: 'They _____ (visit) Paris twice.',
    correctAnswer: 'have visited',
    options: ['visit', 'visits', 'have visited', 'visited'],
    explanation: 'Use "have" + V3 for present perfect with "they".',
    points: 50
  },

  // Mixed Tenses (Advanced)
  {
    id: 'mixed-1',
    level: 20,
    category: 'mixed-tenses',
    template: 'By next year, she _____ (study) English for five years.',
    correctAnswer: 'will have been studying',
    options: ['studies', 'has studied', 'will study', 'will have been studying'],
    explanation: 'Use future perfect continuous for actions continuing up to a future point.',
    points: 100
  },
  {
    id: 'mixed-2',
    level: 20,
    category: 'mixed-tenses',
    template: 'While I _____ (cook), the phone rang.',
    correctAnswer: 'was cooking',
    options: ['cook', 'cooked', 'was cooking', 'have cooked'],
    explanation: 'Use past continuous for ongoing action interrupted by another action.',
    points: 80
  }
]

// Cloze game modes
export const clozeGameModes = {
  MULTIPLE_CHOICE: 'multiple-choice',
  FILL_IN_BLANK: 'fill-in-blank',
  DRAG_AND_DROP: 'drag-and-drop',
  VOICE_INPUT: 'voice-input'
}

// Generate cloze exercises based on current level
export const generateClozeExercises = (level, verbDatabase) => {
  const exercises = []
  
  // Get appropriate templates for the level
  const levelTemplates = clozeGameTemplates.filter(template => 
    template.level <= level
  )
  
  // Generate exercises using live verb database
  verbDatabase.forEach(verb => {
    if (level >= 1) {
      // Present simple exercises
      exercises.push({
        id: `present-${verb.V1}`,
        template: `She _____ (${verb.V1}) every day.`,
        correctAnswer: verb['V1-3rd'],
        options: [verb.V1, verb['V1-3rd'], verb['V1-ing'], verb.V2],
        explanation: `Use V1-3rd form "${verb['V1-3rd']}" with "she" in present simple.`,
        points: 20,
        category: 'present-simple'
      })
    }
    
    if (level >= 11) {
      // Past simple exercises
      exercises.push({
        id: `past-${verb.V1}`,
        template: `They _____ (${verb.V1}) yesterday.`,
        correctAnswer: verb.V2,
        options: [verb.V1, verb['V1-3rd'], verb['V1-ing'], verb.V2],
        explanation: `Use V2 form "${verb.V2}" for past simple.`,
        points: 30,
        category: 'past-simple'
      })
    }
    
    if (level >= 16) {
      // Present continuous exercises
      exercises.push({
        id: `continuous-${verb.V1}`,
        template: `She is _____ (${verb.V1}) right now.`,
        correctAnswer: verb['V1-ing'],
        options: [verb.V1, verb['V1-3rd'], verb['V1-ing'], verb.V2],
        explanation: `Use V1-ing form "${verb['V1-ing']}" for present continuous.`,
        points: 40,
        category: 'present-continuous'
      })
    }
    
    if (level >= 18) {
      // Present perfect exercises
      exercises.push({
        id: `perfect-${verb.V1}`,
        template: `They have _____ (${verb.V1}) before.`,
        correctAnswer: verb.V3,
        options: [verb.V1, verb.V2, verb['V1-ing'], verb.V3],
        explanation: `Use V3 form "${verb.V3}" for present perfect.`,
        points: 50,
        category: 'present-perfect'
      })
    }
  })
  
  return exercises.slice(0, 20) // Limit to 20 exercises per session
}

// Cloze game component data
export const clozeGameSettings = {
  showHints: true,
  allowMultipleAttempts: true,
  showExplanationAfterAnswer: true,
  randomizeOptions: true,
  timeLimit: null, // No time limit by default
  pointsForCorrect: 20,
  pointsForIncorrect: -5,
  streakBonus: 5 // Extra points for consecutive correct answers
}

// Future enhancement: Adaptive difficulty
export const adaptiveClozeSettings = {
  increaseOptionsOnError: true, // Add more distractors if student gets it wrong
  decreaseOptionsOnSuccess: true, // Fewer options if student is doing well
  personalizeToWeaknesses: true, // Focus on verb forms student struggles with
  contextualClues: true, // Add context clues for difficult items
  scaffoldedSupport: true // Provide step-by-step hints
}

// Integration points for main game
export const clozeGameIntegration = {
  // When to trigger cloze games
  triggers: {
    afterLevelCompletion: true,
    onStreakMilestone: true, // After 10 correct sentences
    asWarmupActivity: true,
    onTeacherRequest: true
  },
  
  // How to integrate with main game
  integration: {
    shareVerbDatabase: true,
    shareUserProgress: true,
    sharePointsSystem: true,
    shareColorCoding: true
  },
  
  // Future game modes
  futureEnhancements: [
    'Sentence completion (multiple blanks)',
    'Error correction (find and fix mistakes)',
    'Transformation exercises (change tense)',
    'Dialogue completion',
    'Story building with blanks',
    'Audio-based cloze (listen and fill)',
    'Picture-prompted cloze exercises'
  ]
}

