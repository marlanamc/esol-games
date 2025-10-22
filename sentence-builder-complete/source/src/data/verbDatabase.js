// Comprehensive verb database with difficulty and frequency ratings
export const verbDatabase = {
  // Beginner Level - Most common, simple verbs (Frequency: Very High, Difficulty: Easy)
  beginner: [
    { V1: 'be', 'V1-3rd': 'is', 'V1-ing': 'being', V2: 'was', V3: 'been', frequency: 100, difficulty: 1, category: 'irregular' },
    { V1: 'have', 'V1-3rd': 'has', 'V1-ing': 'having', V2: 'had', V3: 'had', frequency: 95, difficulty: 1, category: 'irregular' },
    { V1: 'do', 'V1-3rd': 'does', 'V1-ing': 'doing', V2: 'did', V3: 'done', frequency: 90, difficulty: 1, category: 'irregular' },
    { V1: 'go', 'V1-3rd': 'goes', 'V1-ing': 'going', V2: 'went', V3: 'gone', frequency: 85, difficulty: 1, category: 'irregular' },
    { V1: 'get', 'V1-3rd': 'gets', 'V1-ing': 'getting', V2: 'got', V3: 'gotten', frequency: 80, difficulty: 1, category: 'irregular' },
    { V1: 'make', 'V1-3rd': 'makes', 'V1-ing': 'making', V2: 'made', V3: 'made', frequency: 75, difficulty: 1, category: 'irregular' },
    { V1: 'know', 'V1-3rd': 'knows', 'V1-ing': 'knowing', V2: 'knew', V3: 'known', frequency: 70, difficulty: 1, category: 'irregular' },
    { V1: 'take', 'V1-3rd': 'takes', 'V1-ing': 'taking', V2: 'took', V3: 'taken', frequency: 65, difficulty: 1, category: 'irregular' },
    { V1: 'see', 'V1-3rd': 'sees', 'V1-ing': 'seeing', V2: 'saw', V3: 'seen', frequency: 60, difficulty: 1, category: 'irregular' },
    { V1: 'come', 'V1-3rd': 'comes', 'V1-ing': 'coming', V2: 'came', V3: 'come', frequency: 55, difficulty: 1, category: 'irregular' },
    { V1: 'like', 'V1-3rd': 'likes', 'V1-ing': 'liking', V2: 'liked', V3: 'liked', frequency: 50, difficulty: 1, category: 'regular' },
    { V1: 'eat', 'V1-3rd': 'eats', 'V1-ing': 'eating', V2: 'ate', V3: 'eaten', frequency: 45, difficulty: 1, category: 'irregular' },
    { V1: 'play', 'V1-3rd': 'plays', 'V1-ing': 'playing', V2: 'played', V3: 'played', frequency: 40, difficulty: 1, category: 'regular' },
    { V1: 'work', 'V1-3rd': 'works', 'V1-ing': 'working', V2: 'worked', V3: 'worked', frequency: 35, difficulty: 1, category: 'regular' },
    { V1: 'live', 'V1-3rd': 'lives', 'V1-ing': 'living', V2: 'lived', V3: 'lived', frequency: 30, difficulty: 1, category: 'regular' }
  ],

  // Elementary Level - Common verbs with some complexity (Frequency: High, Difficulty: Easy-Medium)
  elementary: [
    { V1: 'study', 'V1-3rd': 'studies', 'V1-ing': 'studying', V2: 'studied', V3: 'studied', frequency: 25, difficulty: 2, category: 'regular' },
    { V1: 'watch', 'V1-3rd': 'watches', 'V1-ing': 'watching', V2: 'watched', V3: 'watched', frequency: 20, difficulty: 2, category: 'regular' },
    { V1: 'listen', 'V1-3rd': 'listens', 'V1-ing': 'listening', V2: 'listened', V3: 'listened', frequency: 18, difficulty: 2, category: 'regular' },
    { V1: 'read', 'V1-3rd': 'reads', 'V1-ing': 'reading', V2: 'read', V3: 'read', frequency: 16, difficulty: 2, category: 'irregular' },
    { V1: 'write', 'V1-3rd': 'writes', 'V1-ing': 'writing', V2: 'wrote', V3: 'written', frequency: 14, difficulty: 2, category: 'irregular' },
    { V1: 'speak', 'V1-3rd': 'speaks', 'V1-ing': 'speaking', V2: 'spoke', V3: 'spoken', frequency: 12, difficulty: 2, category: 'irregular' },
    { V1: 'learn', 'V1-3rd': 'learns', 'V1-ing': 'learning', V2: 'learned', V3: 'learned', frequency: 10, difficulty: 2, category: 'regular' },
    { V1: 'teach', 'V1-3rd': 'teaches', 'V1-ing': 'teaching', V2: 'taught', V3: 'taught', frequency: 8, difficulty: 2, category: 'irregular' },
    { V1: 'buy', 'V1-3rd': 'buys', 'V1-ing': 'buying', V2: 'bought', V3: 'bought', frequency: 6, difficulty: 2, category: 'irregular' },
    { V1: 'sell', 'V1-3rd': 'sells', 'V1-ing': 'selling', V2: 'sold', V3: 'sold', frequency: 4, difficulty: 2, category: 'irregular' }
  ],

  // Intermediate Level - Less common but important verbs (Frequency: Medium, Difficulty: Medium)
  intermediate: [
    { V1: 'achieve', 'V1-3rd': 'achieves', 'V1-ing': 'achieving', V2: 'achieved', V3: 'achieved', frequency: 3, difficulty: 3, category: 'regular' },
    { V1: 'develop', 'V1-3rd': 'develops', 'V1-ing': 'developing', V2: 'developed', V3: 'developed', frequency: 2, difficulty: 3, category: 'regular' },
    { V1: 'improve', 'V1-3rd': 'improves', 'V1-ing': 'improving', V2: 'improved', V3: 'improved', frequency: 1, difficulty: 3, category: 'regular' },
    { V1: 'organize', 'V1-3rd': 'organizes', 'V1-ing': 'organizing', V2: 'organized', V3: 'organized', frequency: 1, difficulty: 3, category: 'regular' },
    { V1: 'participate', 'V1-3rd': 'participates', 'V1-ing': 'participating', V2: 'participated', V3: 'participated', frequency: 1, difficulty: 3, category: 'regular' }
  ],

  // Advanced Level - Complex, academic verbs (Frequency: Low, Difficulty: Hard)
  advanced: [
    { V1: 'analyze', 'V1-3rd': 'analyzes', 'V1-ing': 'analyzing', V2: 'analyzed', V3: 'analyzed', frequency: 1, difficulty: 4, category: 'regular' },
    { V1: 'synthesize', 'V1-3rd': 'synthesizes', 'V1-ing': 'synthesizing', V2: 'synthesized', V3: 'synthesized', frequency: 1, difficulty: 4, category: 'regular' },
    { V1: 'demonstrate', 'V1-3rd': 'demonstrates', 'V1-ing': 'demonstrating', V2: 'demonstrated', V3: 'demonstrated', frequency: 1, difficulty: 4, category: 'regular' },
    { V1: 'investigate', 'V1-3rd': 'investigates', 'V1-ing': 'investigating', V2: 'investigated', V3: 'investigated', frequency: 1, difficulty: 4, category: 'regular' },
    { V1: 'accommodate', 'V1-3rd': 'accommodates', 'V1-ing': 'accommodating', V2: 'accommodated', V3: 'accommodated', frequency: 1, difficulty: 4, category: 'regular' }
  ]
};

// Noun categories with countable/uncountable classification
export const nounDatabase = {
  // Basic countable nouns
  countable: [
    { word: 'book', plural: 'books', article: 'a', difficulty: 1 },
    { word: 'pizza', plural: 'pizzas', article: 'a', difficulty: 1 },
    { word: 'movie', plural: 'movies', article: 'a', difficulty: 1 },
    { word: 'friend', plural: 'friends', article: 'a', difficulty: 1 },
    { word: 'student', plural: 'students', article: 'a', difficulty: 1 },
    { word: 'teacher', plural: 'teachers', article: 'a', difficulty: 1 },
    { word: 'apple', plural: 'apples', article: 'an', difficulty: 1 },
    { word: 'orange', plural: 'oranges', article: 'an', difficulty: 1 },
    { word: 'idea', plural: 'ideas', article: 'an', difficulty: 2 },
    { word: 'opportunity', plural: 'opportunities', article: 'an', difficulty: 3 }
  ],

  // Uncountable nouns
  uncountable: [
    { word: 'music', article: null, difficulty: 1 },
    { word: 'homework', article: null, difficulty: 1 },
    { word: 'English', article: null, difficulty: 1 },
    { word: 'soccer', article: null, difficulty: 1 },
    { word: 'information', article: null, difficulty: 2 },
    { word: 'knowledge', article: null, difficulty: 2 },
    { word: 'advice', article: null, difficulty: 2 },
    { word: 'research', article: null, difficulty: 3 },
    { word: 'equipment', article: null, difficulty: 3 }
  ]
};

// Subject pronouns and nouns
export const subjectDatabase = [
  { word: 'I', type: 'pronoun', person: 'first', number: 'singular', verbForm: 'V1', difficulty: 1 },
  { word: 'You', type: 'pronoun', person: 'second', number: 'singular', verbForm: 'V1', difficulty: 1 },
  { word: 'He', type: 'pronoun', person: 'third', number: 'singular', verbForm: 'V1-3rd', difficulty: 1 },
  { word: 'She', type: 'pronoun', person: 'third', number: 'singular', verbForm: 'V1-3rd', difficulty: 1 },
  { word: 'It', type: 'pronoun', person: 'third', number: 'singular', verbForm: 'V1-3rd', difficulty: 1 },
  { word: 'We', type: 'pronoun', person: 'first', number: 'plural', verbForm: 'V1', difficulty: 1 },
  { word: 'They', type: 'pronoun', person: 'third', number: 'plural', verbForm: 'V1', difficulty: 1 },
  { word: 'The cat', type: 'noun', person: 'third', number: 'singular', verbForm: 'V1-3rd', difficulty: 1 },
  { word: 'My sister', type: 'noun', person: 'third', number: 'singular', verbForm: 'V1-3rd', difficulty: 1 },
  { word: 'The students', type: 'noun', person: 'third', number: 'plural', verbForm: 'V1', difficulty: 1 },
  { word: 'My family', type: 'noun', person: 'third', number: 'singular', verbForm: 'V1-3rd', difficulty: 2 }
];

// Achievement system
export const achievementSystem = {
  badges: [
    { id: 'first_sentence', name: 'First Steps', description: 'Built your first sentence!', icon: '🎯', requirement: 'complete_1_sentence' },
    { id: 'grammar_master', name: 'Grammar Master', description: 'Got 10 sentences correct in a row!', icon: '🏆', requirement: 'streak_10' },
    { id: 'verb_expert', name: 'Verb Expert', description: 'Mastered all beginner verbs!', icon: '⚡', requirement: 'master_beginner_verbs' },
    { id: 'question_king', name: 'Question King', description: 'Built 50 questions!', icon: '👑', requirement: 'build_50_questions' },
    { id: 'level_jumper', name: 'Level Jumper', description: 'Tried 5 different levels!', icon: '🚀', requirement: 'try_5_levels' },
    { id: 'daily_learner', name: 'Daily Learner', description: 'Practiced for 7 days in a row!', icon: '📅', requirement: 'daily_streak_7' },
    { id: 'sentence_builder', name: 'Sentence Builder', description: 'Built 100 sentences!', icon: '🏗️', requirement: 'build_100_sentences' },
    { id: 'perfect_score', name: 'Perfect Score', description: 'Got 20 sentences perfect!', icon: '💯', requirement: 'perfect_20' }
  ],

  levels: [
    { id: 1, name: 'Beginner Builder', minPoints: 0, maxPoints: 100, color: '#22c55e' },
    { id: 2, name: 'Sentence Crafter', minPoints: 101, maxPoints: 300, color: '#3b82f6' },
    { id: 3, name: 'Grammar Guardian', minPoints: 301, maxPoints: 600, color: '#8b5cf6' },
    { id: 4, name: 'Language Leader', minPoints: 601, maxPoints: 1000, color: '#f59e0b' },
    { id: 5, name: 'Master Builder', minPoints: 1001, maxPoints: 9999, color: '#ef4444' }
  ]
};

// Points system
export const pointsSystem = {
  correct_sentence: 10,
  perfect_grammar: 15,
  first_try: 20,
  streak_bonus: 5, // per streak count
  level_completion: 50,
  daily_practice: 25,
  new_verb_used: 30,
  complex_sentence: 40
};

