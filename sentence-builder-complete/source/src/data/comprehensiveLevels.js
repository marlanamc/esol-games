// Comprehensive 20-Level Grammar Progression System
export const comprehensiveLevels = [
  // BEGINNER LEVELS (1-5)
  {
    id: 1,
    name: 'Basic Affirmative',
    shortDescription: 'Simple sentences with subject + verb + object',
    category: 'beginner',
    pattern: 'Subject + V1/V1-3rd + Object',
    formula: 'subject + verb + object',
    example: 'She eats pizza.',
    explanation: 'Use V1 (base form) with I, you, we, they. Use V1-3rd (adds -s/-es) with he, she, it.',
    requiredCategories: ['subjects', 'verbs', 'objects'],
    color: 'bg-green-50 border-green-200',
    points: 15,
    unlockRequirement: 0
  },
  {
    id: 2,
    name: 'Articles & Nouns',
    shortDescription: 'Using a, an, the with nouns',
    category: 'beginner',
    pattern: 'Subject + V1/V1-3rd + Article + Object',
    formula: 'subject + verb + a/an/the + object',
    example: 'She eats a pizza.',
    explanation: 'Use "a" or "an" with singular countable nouns. Use "the" for specific things. No article with plural or uncountable nouns.',
    requiredCategories: ['subjects', 'verbs', 'objects', 'articles'],
    color: 'bg-yellow-50 border-yellow-200',
    points: 20,
    unlockRequirement: 50
  },
  {
    id: 3,
    name: 'Negative Present',
    shortDescription: 'Making negative sentences with do/does not',
    category: 'beginner',
    pattern: 'Subject + do/does + not + V1 + Object',
    formula: 'subject + do(es) + not + verb + object',
    example: 'She does not eat pizza.',
    explanation: 'Use "do not" with I, you, we, they. Use "does not" with he, she, it. Always use V1 after do/does.',
    requiredCategories: ['subjects', 'verbs', 'objects', 'helpers', 'negatives'],
    color: 'bg-red-50 border-red-200',
    points: 25,
    unlockRequirement: 100
  },
  {
    id: 4,
    name: 'Yes/No Questions',
    shortDescription: 'Asking questions with do/does',
    category: 'beginner',
    pattern: 'Do/Does + Subject + V1 + Object?',
    formula: 'do(es) + subject + verb + object?',
    example: 'Does she eat pizza?',
    explanation: 'Use "Do" with I, you, we, they. Use "Does" with he, she, it. Always use V1 after do/does.',
    requiredCategories: ['helpers', 'subjects', 'verbs', 'objects'],
    color: 'bg-blue-50 border-blue-200',
    points: 30,
    unlockRequirement: 150
  },
  {
    id: 5,
    name: 'Question-Answer Pairs',
    shortDescription: 'Asking questions and giving answers',
    category: 'beginner',
    pattern: 'Question → Short Answer → Full Answer',
    formula: 'question + yes/no + full response',
    example: 'Does she eat pizza? → Yes, she does. → Yes, she eats pizza.',
    explanation: 'Practice complete conversation cycles with questions and responses.',
    requiredCategories: ['helpers', 'subjects', 'verbs', 'objects', 'responses'],
    color: 'bg-purple-50 border-purple-200',
    points: 35,
    unlockRequirement: 200
  },

  // ELEMENTARY LEVELS (6-10)
  {
    id: 6,
    name: 'Wh-Questions (What)',
    category: 'elementary',
    pattern: 'What + do/does + Subject + V1?',
    formula: 'what + do(es) + subject + verb?',
    example: 'What does she eat?',
    explanation: 'Use "What" to ask about things or actions. Follow question word order.',
    requiredCategories: ['questionWords', 'helpers', 'subjects', 'verbs'],
    color: 'bg-cyan-50 border-cyan-200',
    points: 40,
    unlockRequirement: 300
  },
  {
    id: 7,
    name: 'Wh-Questions (Who/Where/When)',
    category: 'elementary',
    pattern: 'Who/Where/When + do/does + Subject + V1?',
    formula: 'wh-word + do(es) + subject + verb?',
    example: 'Where does she eat pizza?',
    explanation: 'Use "Who" for people, "Where" for places, "When" for time.',
    requiredCategories: ['questionWords', 'helpers', 'subjects', 'verbs', 'objects', 'extras'],
    color: 'bg-indigo-50 border-indigo-200',
    points: 45,
    unlockRequirement: 400
  },
  {
    id: 8,
    name: 'Adjectives',
    category: 'elementary',
    pattern: 'Subject + V1/V1-3rd + Article + Adjective + Object',
    formula: 'subject + verb + article + adjective + object',
    example: 'She eats a delicious pizza.',
    explanation: 'Adjectives describe nouns. They go before the noun in English.',
    requiredCategories: ['subjects', 'verbs', 'articles', 'adjectives', 'objects'],
    color: 'bg-pink-50 border-pink-200',
    points: 50,
    unlockRequirement: 500
  },
  {
    id: 9,
    name: 'Adverbs of Frequency',
    category: 'elementary',
    pattern: 'Subject + Adverb + V1/V1-3rd + Object',
    formula: 'subject + adverb + verb + object',
    example: 'She always eats pizza.',
    explanation: 'Frequency adverbs (always, usually, often, sometimes, rarely, never) go before the main verb.',
    requiredCategories: ['subjects', 'adverbs', 'verbs', 'objects'],
    color: 'bg-amber-50 border-amber-200',
    points: 55,
    unlockRequirement: 600
  },
  {
    id: 10,
    name: 'Prepositions of Place',
    category: 'elementary',
    pattern: 'Subject + V1/V1-3rd + Object + Preposition + Place',
    formula: 'subject + verb + object + preposition + place',
    example: 'She eats pizza at school.',
    explanation: 'Prepositions show relationships between words. Common ones: at, in, on, with, for.',
    requiredCategories: ['subjects', 'verbs', 'objects', 'prepositions', 'extras'],
    color: 'bg-teal-50 border-teal-200',
    points: 60,
    unlockRequirement: 750
  },

  // INTERMEDIATE LEVELS (11-15)
  {
    id: 11,
    name: 'Past Simple Affirmative',
    category: 'intermediate',
    pattern: 'Subject + V2 + Object',
    formula: 'subject + past verb + object',
    example: 'She ate pizza.',
    explanation: 'Use V2 (past form) for completed actions in the past. Regular verbs add -ed, irregular verbs change form.',
    requiredCategories: ['subjects', 'verbs', 'objects'],
    color: 'bg-orange-50 border-orange-200',
    points: 65,
    unlockRequirement: 900,
    tense: 'past'
  },
  {
    id: 12,
    name: 'Past Simple Negative',
    category: 'intermediate',
    pattern: 'Subject + did + not + V1 + Object',
    formula: 'subject + did + not + verb + object',
    example: 'She did not eat pizza.',
    explanation: 'Use "did not" (didn\'t) for all subjects in past negative. Always use V1 after "did".',
    requiredCategories: ['subjects', 'helpers', 'negatives', 'verbs', 'objects'],
    color: 'bg-red-100 border-red-300',
    points: 70,
    unlockRequirement: 1050,
    tense: 'past'
  },
  {
    id: 13,
    name: 'Past Simple Questions',
    category: 'intermediate',
    pattern: 'Did + Subject + V1 + Object?',
    formula: 'did + subject + verb + object?',
    example: 'Did she eat pizza?',
    explanation: 'Use "Did" for all subjects in past questions. Always use V1 after "did".',
    requiredCategories: ['helpers', 'subjects', 'verbs', 'objects'],
    color: 'bg-blue-100 border-blue-300',
    points: 75,
    unlockRequirement: 1200,
    tense: 'past'
  },
  {
    id: 14,
    name: 'Future with "going to"',
    category: 'intermediate',
    pattern: 'Subject + am/is/are + going to + V1 + Object',
    formula: 'subject + be + going to + verb + object',
    example: 'She is going to eat pizza.',
    explanation: 'Use "going to" for planned future actions. Use correct form of "be" (am/is/are).',
    requiredCategories: ['subjects', 'helpers', 'futureMarkers', 'verbs', 'objects'],
    color: 'bg-green-100 border-green-300',
    points: 80,
    unlockRequirement: 1350,
    tense: 'future'
  },
  {
    id: 15,
    name: 'Future with "will"',
    category: 'intermediate',
    pattern: 'Subject + will + V1 + Object',
    formula: 'subject + will + verb + object',
    example: 'She will eat pizza.',
    explanation: 'Use "will" for predictions, promises, and spontaneous decisions. Same form for all subjects.',
    requiredCategories: ['subjects', 'helpers', 'verbs', 'objects'],
    color: 'bg-purple-100 border-purple-300',
    points: 85,
    unlockRequirement: 1500,
    tense: 'future'
  },

  // ADVANCED LEVELS (16-20)
  {
    id: 16,
    name: 'Present Continuous',
    category: 'advanced',
    pattern: 'Subject + am/is/are + V1-ing + Object',
    formula: 'subject + be + verb-ing + object',
    example: 'She is eating pizza.',
    explanation: 'Use present continuous for actions happening now or temporary situations.',
    requiredCategories: ['subjects', 'helpers', 'verbs', 'objects'],
    color: 'bg-emerald-50 border-emerald-200',
    points: 90,
    unlockRequirement: 1700,
    tense: 'continuous'
  },
  {
    id: 17,
    name: 'Past Continuous',
    category: 'advanced',
    pattern: 'Subject + was/were + V1-ing + Object',
    formula: 'subject + was/were + verb-ing + object',
    example: 'She was eating pizza.',
    explanation: 'Use past continuous for ongoing actions in the past. Use "was" with I/he/she/it, "were" with you/we/they.',
    requiredCategories: ['subjects', 'helpers', 'verbs', 'objects'],
    color: 'bg-orange-100 border-orange-300',
    points: 95,
    unlockRequirement: 1900,
    tense: 'continuous'
  },
  {
    id: 18,
    name: 'Present Perfect',
    category: 'advanced',
    pattern: 'Subject + have/has + V3 + Object',
    formula: 'subject + have/has + past participle + object',
    example: 'She has eaten pizza.',
    explanation: 'Use present perfect for experiences or completed actions with present relevance. Use "has" with he/she/it.',
    requiredCategories: ['subjects', 'helpers', 'verbs', 'objects'],
    color: 'bg-violet-50 border-violet-200',
    points: 100,
    unlockRequirement: 2100,
    tense: 'perfect'
  },
  {
    id: 19,
    name: 'Present Perfect Continuous',
    category: 'advanced',
    pattern: 'Subject + have/has + been + V1-ing + Object',
    formula: 'subject + have/has + been + verb-ing + object',
    example: 'She has been eating pizza.',
    explanation: 'Use present perfect continuous for actions that started in the past and continue to now.',
    requiredCategories: ['subjects', 'helpers', 'perfectMarkers', 'verbs', 'objects'],
    color: 'bg-indigo-100 border-indigo-300',
    points: 110,
    unlockRequirement: 2350,
    tense: 'perfect-continuous'
  },
  {
    id: 20,
    name: 'Future Perfect Continuous Questions',
    category: 'expert',
    pattern: 'Will + Subject + have been + V1-ing + Object?',
    formula: 'will + subject + have been + verb-ing + object?',
    example: 'Will she have been eating pizza?',
    explanation: 'The most complex tense! Use for actions that will be ongoing up to a point in the future.',
    requiredCategories: ['helpers', 'subjects', 'perfectMarkers', 'verbs', 'objects', 'timeMarkers'],
    color: 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300',
    points: 150,
    unlockRequirement: 2600,
    tense: 'future-perfect-continuous'
  }
]

// Enhanced word categories for advanced levels
export const enhancedWordTiles = {
  subjects: ['I', 'You', 'He', 'She', 'We', 'They', 'The cat', 'My sister', 'The students', 'Everyone', 'Someone', 'Nobody'],
  
  verbs: [], // Will be populated from live database
  
  objects: [], // Will be populated from object database
  
  articles: ['a', 'an', 'the', 'some', 'any', 'many', 'much', 'few', 'little'],
  
  adjectives: [
    'big', 'small', 'red', 'happy', 'good', 'new', 'old', 'beautiful', 'delicious', 'interesting',
    'difficult', 'easy', 'important', 'expensive', 'cheap', 'fast', 'slow', 'hot', 'cold', 'young'
  ],
  
  adverbs: [
    // Frequency
    'always', 'usually', 'often', 'sometimes', 'rarely', 'never',
    // Manner
    'quickly', 'slowly', 'carefully', 'loudly', 'quietly', 'well', 'badly',
    // Time
    'now', 'today', 'yesterday', 'tomorrow', 'recently', 'already', 'yet', 'still', 'just'
  ],
  
  prepositions: [
    'at', 'in', 'on', 'with', 'for', 'to', 'from', 'by', 'about', 'under', 'over', 'between', 'during', 'since'
  ],
  
  extras: [
    'at school', 'every day', 'with friends', 'in the park', 'at home', 'on weekends',
    'in the morning', 'at night', 'last week', 'next month', 'for two hours', 'since Monday'
  ],
  
  helpers: [
    // Present
    'do', 'does', 'am', 'is', 'are',
    // Past
    'did', 'was', 'were',
    // Future
    'will', 'shall',
    // Perfect
    'have', 'has', 'had'
  ],
  
  negatives: ['not', "don't", "doesn't", "didn't", "won't", "isn't", "aren't", "wasn't", "weren't", "haven't", "hasn't", "hadn't"],
  
  questionWords: ['What', 'Who', 'When', 'Where', 'Why', 'How', 'Which', 'Whose', 'How long', 'How often', 'How much', 'How many'],
  
  responses: ['Yes', 'No', 'Yes, I do', 'No, I don\'t', 'Yes, she does', 'No, she doesn\'t'],
  
  futureMarkers: ['going to', 'about to', 'planning to'],
  
  perfectMarkers: ['been', 'just', 'already', 'yet', 'ever', 'never', 'since', 'for'],
  
  timeMarkers: [
    'for 2 hours', 'since morning', 'all day', 'by tomorrow', 'until Friday', 'during lunch',
    'at 3 o\'clock', 'in the evening', 'on Monday', 'next week', 'last year'
  ]
}

// Settings for minimal interface
export const interfaceSettings = {
  showGamification: false,
  showColorLegend: true,
  showGrammarExplanation: true,
  showWordHints: true,
  showProgressBar: false,
  compactMode: true,
  focusMode: false, // Hides everything except current level
  autoAdvance: false, // Automatically advance to next level when mastered
  maxWordsPerCategory: 12, // Limit words shown to reduce clutter
  hideUnusedCategories: true
}

// Level unlocking logic
export const getLevelAccess = (userStats) => {
  const unlockedLevels = []
  
  comprehensiveLevels.forEach(level => {
    if (userStats.totalPoints >= level.unlockRequirement) {
      unlockedLevels.push(level.id)
    }
  })
  
  // Always unlock first 3 levels
  if (!unlockedLevels.includes(1)) unlockedLevels.push(1)
  if (!unlockedLevels.includes(2)) unlockedLevels.push(2)
  if (!unlockedLevels.includes(3)) unlockedLevels.push(3)
  
  return unlockedLevels
}

// Get required categories for current level
export const getRequiredCategories = (levelId, settings = interfaceSettings) => {
  const level = comprehensiveLevels.find(l => l.id === levelId)
  if (!level) return []
  
  if (settings.hideUnusedCategories) {
    return level.requiredCategories
  }
  
  return Object.keys(enhancedWordTiles)
}

