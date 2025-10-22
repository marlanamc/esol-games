// Enhanced US English Vocabulary Database

import { usCulturalContexts, usEnglishValidator } from './usEnglishLocalization.js'

// Comprehensive US English vocabulary organized by category and difficulty
export const usEnglishVocabularyDatabase = {
  subjects: {
    pronouns: {
      beginner: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
      intermediate: ['everyone', 'someone', 'anyone', 'no one', 'everybody', 'somebody'],
      advanced: ['whoever', 'whomever', 'each other', 'one another']
    },
    
    people: {
      beginner: [
        'mom', 'dad', 'sister', 'brother', 'friend', 'teacher', 'student',
        'doctor', 'nurse', 'police officer', 'firefighter'
      ],
      intermediate: [
        'neighbor', 'classmate', 'coworker', 'boss', 'employee', 'customer',
        'principal', 'counselor', 'librarian', 'coach'
      ],
      advanced: [
        'colleague', 'supervisor', 'administrator', 'representative',
        'specialist', 'coordinator', 'consultant', 'entrepreneur'
      ]
    },
    
    family: {
      beginner: [
        'family', 'parents', 'children', 'baby', 'kid', 'teenager',
        'grandma', 'grandpa', 'aunt', 'uncle', 'cousin'
      ],
      intermediate: [
        'grandmother', 'grandfather', 'stepmother', 'stepfather',
        'half-sister', 'half-brother', 'in-laws', 'relatives'
      ],
      advanced: [
        'extended family', 'immediate family', 'nuclear family',
        'foster family', 'adoptive parents', 'guardian'
      ]
    }
  },
  
  verbs: {
    daily_activities: {
      beginner: [
        'eat', 'drink', 'sleep', 'wake up', 'get up', 'go', 'come', 'walk', 'run',
        'sit', 'stand', 'look', 'see', 'listen', 'hear', 'talk', 'speak'
      ],
      intermediate: [
        'exercise', 'jog', 'commute', 'relax', 'rest', 'nap', 'shower', 'bathe',
        'brush', 'comb', 'dress', 'undress', 'pack', 'unpack'
      ],
      advanced: [
        'multitask', 'prioritize', 'schedule', 'coordinate', 'organize',
        'procrastinate', 'accomplish', 'achieve', 'maintain', 'sustain'
      ]
    },
    
    school_activities: {
      beginner: [
        'study', 'learn', 'read', 'write', 'draw', 'color', 'count', 'add',
        'subtract', 'spell', 'practice', 'review', 'memorize'
      ],
      intermediate: [
        'research', 'analyze', 'compare', 'contrast', 'summarize', 'explain',
        'demonstrate', 'present', 'discuss', 'debate', 'collaborate'
      ],
      advanced: [
        'synthesize', 'evaluate', 'critique', 'hypothesize', 'theorize',
        'conceptualize', 'implement', 'innovate', 'specialize'
      ]
    },
    
    work_activities: {
      beginner: [
        'work', 'help', 'make', 'build', 'fix', 'clean', 'organize', 'sort',
        'deliver', 'serve', 'sell', 'buy', 'pay', 'earn'
      ],
      intermediate: [
        'manage', 'supervise', 'coordinate', 'schedule', 'plan', 'design',
        'create', 'develop', 'improve', 'maintain', 'operate'
      ],
      advanced: [
        'strategize', 'implement', 'optimize', 'streamline', 'innovate',
        'negotiate', 'facilitate', 'delegate', 'mentor', 'collaborate'
      ]
    }
  },
  
  objects: {
    food_us: {
      beginner: [
        // US-specific foods and terms
        'burger', 'hot dog', 'french fries', 'chips', 'cookies', 'candy',
        'soda', 'juice box', 'sandwich', 'pizza', 'cereal', 'pancakes'
      ],
      intermediate: [
        'appetizer', 'entrée', 'dessert', 'takeout', 'leftovers', 'snacks',
        'beverages', 'smoothie', 'milkshake', 'bagel', 'muffin', 'donut'
      ],
      advanced: [
        'hors d\'oeuvres', 'cuisine', 'delicacies', 'specialties', 'comfort food',
        'fast food', 'organic food', 'processed food', 'whole foods'
      ]
    },
    
    school_us: {
      beginner: [
        'backpack', 'notebook', 'pencil', 'pen', 'eraser', 'ruler', 'calculator',
        'textbook', 'homework', 'test', 'quiz', 'grade', 'report card'
      ],
      intermediate: [
        'binder', 'highlighter', 'stapler', 'scissors', 'glue stick', 'markers',
        'assignment', 'project', 'presentation', 'semester', 'transcript'
      ],
      advanced: [
        'curriculum', 'syllabus', 'prerequisites', 'electives', 'extracurriculars',
        'scholarship', 'tuition', 'dormitory', 'campus', 'alumni'
      ]
    },
    
    home_us: {
      beginner: [
        'house', 'apartment', 'room', 'kitchen', 'bathroom', 'bedroom',
        'living room', 'garage', 'yard', 'door', 'window', 'stairs'
      ],
      intermediate: [
        'basement', 'attic', 'porch', 'deck', 'patio', 'driveway', 'mailbox',
        'fence', 'lawn', 'garden', 'utilities', 'appliances'
      ],
      advanced: [
        'mortgage', 'property', 'real estate', 'homeowner', 'tenant', 'landlord',
        'lease', 'deposit', 'maintenance', 'renovation', 'equity'
      ]
    },
    
    transportation_us: {
      beginner: [
        'car', 'bus', 'train', 'airplane', 'bicycle', 'motorcycle', 'truck',
        'taxi', 'subway', 'boat', 'ship', 'helicopter'
      ],
      intermediate: [
        'vehicle', 'automobile', 'sedan', 'SUV', 'pickup truck', 'van',
        'limousine', 'ambulance', 'fire truck', 'police car'
      ],
      advanced: [
        'transportation', 'infrastructure', 'public transit', 'commuter rail',
        'interstate', 'highway system', 'traffic congestion', 'carpooling'
      ]
    }
  },
  
  adjectives: {
    appearance: {
      beginner: [
        'big', 'small', 'tall', 'short', 'long', 'wide', 'thin', 'thick',
        'red', 'blue', 'green', 'yellow', 'black', 'white', 'brown'
      ],
      intermediate: [
        'enormous', 'tiny', 'gigantic', 'miniature', 'narrow', 'broad',
        'crimson', 'navy', 'emerald', 'golden', 'silver', 'purple'
      ],
      advanced: [
        'colossal', 'microscopic', 'substantial', 'negligible', 'expansive',
        'turquoise', 'burgundy', 'chartreuse', 'magenta', 'indigo'
      ]
    },
    
    personality: {
      beginner: [
        'nice', 'mean', 'funny', 'serious', 'happy', 'sad', 'angry', 'calm',
        'smart', 'kind', 'helpful', 'friendly', 'shy', 'brave'
      ],
      intermediate: [
        'generous', 'selfish', 'patient', 'impatient', 'confident', 'nervous',
        'outgoing', 'introverted', 'creative', 'logical', 'optimistic'
      ],
      advanced: [
        'charismatic', 'empathetic', 'resilient', 'ambitious', 'diplomatic',
        'analytical', 'innovative', 'pragmatic', 'conscientious'
      ]
    },
    
    quality: {
      beginner: [
        'good', 'bad', 'great', 'terrible', 'easy', 'hard', 'fast', 'slow',
        'hot', 'cold', 'new', 'old', 'clean', 'dirty', 'safe', 'dangerous'
      ],
      intermediate: [
        'excellent', 'awful', 'challenging', 'simple', 'rapid', 'gradual',
        'scorching', 'freezing', 'modern', 'ancient', 'spotless', 'filthy'
      ],
      advanced: [
        'exceptional', 'abysmal', 'formidable', 'effortless', 'instantaneous',
        'contemporary', 'antiquated', 'immaculate', 'pristine'
      ]
    }
  },
  
  adverbs: {
    frequency: {
      beginner: [
        'always', 'usually', 'often', 'sometimes', 'rarely', 'never',
        'every day', 'once a week', 'twice a month'
      ],
      intermediate: [
        'frequently', 'occasionally', 'seldom', 'regularly', 'constantly',
        'periodically', 'intermittently', 'consistently'
      ],
      advanced: [
        'perpetually', 'infrequently', 'sporadically', 'systematically',
        'habitually', 'routinely', 'invariably'
      ]
    },
    
    manner: {
      beginner: [
        'quickly', 'slowly', 'carefully', 'loudly', 'quietly', 'well', 'badly',
        'easily', 'hard', 'fast', 'late', 'early'
      ],
      intermediate: [
        'rapidly', 'gradually', 'cautiously', 'efficiently', 'effectively',
        'smoothly', 'roughly', 'gently', 'firmly'
      ],
      advanced: [
        'meticulously', 'systematically', 'spontaneously', 'deliberately',
        'inadvertently', 'conscientiously', 'methodically'
      ]
    },
    
    degree: {
      beginner: [
        'very', 'really', 'quite', 'pretty', 'so', 'too', 'enough',
        'a little', 'a lot', 'much', 'many'
      ],
      intermediate: [
        'extremely', 'incredibly', 'fairly', 'rather', 'somewhat', 'slightly',
        'considerably', 'substantially', 'moderately'
      ],
      advanced: [
        'exceptionally', 'remarkably', 'extraordinarily', 'tremendously',
        'immensely', 'profoundly', 'marginally', 'negligibly'
      ]
    }
  },
  
  prepositions: {
    location: {
      beginner: [
        'in', 'on', 'at', 'under', 'over', 'next to', 'behind', 'in front of',
        'between', 'near', 'far from', 'inside', 'outside'
      ],
      intermediate: [
        'beneath', 'above', 'below', 'beside', 'among', 'around', 'across',
        'through', 'along', 'against', 'within', 'beyond'
      ],
      advanced: [
        'adjacent to', 'parallel to', 'perpendicular to', 'throughout',
        'amidst', 'amid', 'alongside', 'underneath'
      ]
    },
    
    time: {
      beginner: [
        'at', 'in', 'on', 'before', 'after', 'during', 'for', 'since',
        'until', 'by', 'from', 'to'
      ],
      intermediate: [
        'throughout', 'within', 'prior to', 'following', 'amid', 'amidst',
        'pending', 'concerning', 'regarding'
      ],
      advanced: [
        'subsequent to', 'preceding', 'concurrent with', 'in accordance with',
        'in conjunction with', 'in lieu of'
      ]
    }
  }
}

// US cultural context integration
export const usVocabularyWithContext = {
  // Add cultural tags to vocabulary
  tagVocabulary: (word, category) => {
    const culturalTags = []
    
    // Check if word appears in US cultural contexts
    for (const [context, data] of Object.entries(usCulturalContexts)) {
      if (data.vocabulary.includes(word.toLowerCase())) {
        culturalTags.push(context)
      }
    }
    
    return {
      word,
      category,
      culturalTags,
      isUSSpecific: culturalTags.length > 0,
      difficulty: getDifficultyLevel(word, category)
    }
  },
  
  // Get vocabulary by cultural context
  getContextVocabulary: (context, difficulty = 'beginner') => {
    if (!usCulturalContexts[context]) return []
    
    const contextWords = usCulturalContexts[context].vocabulary
    const filteredWords = []
    
    // Filter by difficulty if specified
    for (const [category, levels] of Object.entries(usEnglishVocabularyDatabase)) {
      if (typeof levels === 'object' && levels[difficulty]) {
        const words = levels[difficulty].filter(word => 
          contextWords.includes(word.toLowerCase())
        )
        filteredWords.push(...words)
      }
    }
    
    return filteredWords
  }
}

// Helper function to determine difficulty level
function getDifficultyLevel(word, category) {
  for (const [cat, levels] of Object.entries(usEnglishVocabularyDatabase)) {
    if (cat === category) {
      for (const [level, words] of Object.entries(levels)) {
        if (typeof words === 'object') {
          for (const [subcat, wordList] of Object.entries(words)) {
            if (wordList.includes(word)) {
              return level
            }
          }
        } else if (words.includes(word)) {
          return level
        }
      }
    }
  }
  return 'beginner' // default
}

// US English sentence patterns and structures
export const usSentencePatterns = {
  beginner: [
    'I [verb] [object]',
    'She [verb] [object]',
    'We [verb] [object]',
    'The [noun] [verb] [object]',
    'My [noun] [verb] [object]'
  ],
  
  intermediate: [
    'I [adverb] [verb] [adjective] [object]',
    'She [verb] [object] [preposition] [location]',
    'We [verb] [object] [time expression]',
    'The [adjective] [noun] [verb] [adverb]'
  ],
  
  advanced: [
    'I [verb] [object] [preposition] [location] [time expression]',
    'She [adverb] [verb] [adjective] [object] [preposition] [reason]',
    'We [verb] [object] [conjunction] [verb] [object]'
  ]
}

// Export enhanced vocabulary with US English validation
export const enhancedUSVocabulary = {
  ...usEnglishVocabularyDatabase,
  validator: usEnglishValidator,
  contextIntegration: usVocabularyWithContext,
  sentencePatterns: usSentencePatterns
}

