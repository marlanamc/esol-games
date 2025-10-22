// US English Localization System

// US English spelling patterns and vocabulary
export const usEnglishVocabulary = {
  // US vs UK spelling differences
  spellingCorrections: {
    // -or vs -our endings
    'colour': 'color',
    'favourite': 'favorite',
    'honour': 'honor',
    'flavour': 'flavor',
    'behaviour': 'behavior',
    'neighbour': 'neighbor',
    'rumour': 'rumor',
    
    // -ize vs -ise endings
    'realise': 'realize',
    'organise': 'organize',
    'recognise': 'recognize',
    'specialise': 'specialize',
    'analyse': 'analyze',
    'criticise': 'criticize',
    
    // -er vs -re endings
    'centre': 'center',
    'theatre': 'theater',
    'metre': 'meter',
    'litre': 'liter',
    
    // -ense vs -ence endings
    'defence': 'defense',
    'offence': 'offense',
    'licence': 'license', // (noun form)
    
    // Double l vs single l
    'travelling': 'traveling',
    'modelling': 'modeling',
    'cancelled': 'canceled',
    'labelled': 'labeled',
    
    // Other common differences
    'grey': 'gray',
    'tyre': 'tire',
    'kerb': 'curb',
    'draught': 'draft'
  },
  
  // US vocabulary vs UK vocabulary
  vocabularySubstitutions: {
    // Transportation
    'lorry': 'truck',
    'petrol': 'gas',
    'petrol station': 'gas station',
    'motorway': 'highway',
    'pavement': 'sidewalk',
    'zebra crossing': 'crosswalk',
    'roundabout': 'traffic circle',
    'car park': 'parking lot',
    'boot': 'trunk', // (of car)
    'bonnet': 'hood', // (of car)
    
    // Housing
    'flat': 'apartment',
    'bedsit': 'studio apartment',
    'terraced house': 'townhouse',
    'semi-detached': 'duplex',
    'garden': 'yard', // (when referring to backyard)
    'tap': 'faucet',
    'loo': 'bathroom',
    'toilet': 'bathroom', // (more common in US)
    'lift': 'elevator',
    'ground floor': 'first floor',
    'first floor': 'second floor',
    
    // Food and dining
    'biscuit': 'cookie',
    'chips': 'french fries',
    'crisps': 'chips',
    'aubergine': 'eggplant',
    'courgette': 'zucchini',
    'rocket': 'arugula',
    'takeaway': 'takeout',
    'bill': 'check', // (at restaurant)
    
    // Clothing
    'jumper': 'sweater',
    'trainers': 'sneakers',
    'trousers': 'pants',
    'pants': 'underwear', // (UK meaning)
    'waistcoat': 'vest',
    'vest': 'undershirt', // (UK meaning)
    'braces': 'suspenders',
    'suspenders': 'garters', // (UK meaning)
    
    // School and work
    'rubber': 'eraser',
    'timetable': 'schedule',
    'holiday': 'vacation',
    'term': 'semester',
    'mark': 'grade', // (academic)
    'revision': 'studying', // (for exams)
    'queue': 'line',
    'post': 'mail',
    'postman': 'mail carrier',
    
    // General items
    'torch': 'flashlight',
    'mobile phone': 'cell phone',
    'handbag': 'purse',
    'purse': 'wallet', // (UK meaning)
    'wallet': 'billfold', // (sometimes)
    'dustbin': 'trash can',
    'rubbish': 'trash',
    'bin': 'trash can'
  }
}

// US English cultural references and contexts
export const usCulturalContexts = {
  school: {
    vocabulary: [
      'elementary school', 'middle school', 'high school', 'college', 'university',
      'kindergarten', 'grade', 'semester', 'spring break', 'summer vacation',
      'homeroom', 'cafeteria', 'gymnasium', 'principal', 'counselor',
      'backpack', 'locker', 'notebook', 'pencil', 'eraser', 'calculator'
    ],
    culturalNotes: [
      'Students typically attend elementary (K-5), middle (6-8), and high school (9-12)',
      'College and university are often used interchangeably in the US',
      'The school year typically runs from August/September to May/June'
    ],
    sampleSentences: [
      'I go to elementary school.',
      'My teacher gives us homework every day.',
      'We eat lunch in the cafeteria.',
      'I keep my books in my locker.',
      'Students take the school bus to school.'
    ]
  },
  
  food: {
    vocabulary: [
      'breakfast', 'lunch', 'dinner', 'snack', 'appetizer', 'entrée', 'dessert',
      'sandwich', 'burger', 'pizza', 'hot dog', 'french fries', 'chips',
      'soda', 'juice', 'coffee', 'milk', 'water', 'cookie', 'candy',
      'restaurant', 'fast food', 'takeout', 'drive-through', 'tip'
    ],
    culturalNotes: [
      'Dinner is the main evening meal (not lunch as in some cultures)',
      'Tipping 15-20% is customary at restaurants',
      'Fast food and takeout are very common',
      'Many Americans eat lunch around 12 PM and dinner around 6-7 PM'
    ],
    sampleSentences: [
      'I eat breakfast at 7 AM.',
      'We order pizza for dinner.',
      'My favorite snack is cookies.',
      'The restaurant serves delicious burgers.',
      'I drink coffee every morning.'
    ]
  },
  
  transportation: {
    vocabulary: [
      'car', 'truck', 'bus', 'subway', 'train', 'airplane', 'bicycle', 'motorcycle',
      'highway', 'street', 'avenue', 'boulevard', 'intersection', 'traffic light',
      'parking lot', 'gas station', 'driver\'s license', 'traffic', 'commute'
    ],
    culturalNotes: [
      'Most Americans drive cars as primary transportation',
      'Public transportation varies greatly by city',
      'You can get a driver\'s license at 16 in most states',
      'Gas prices are typically lower than in many other countries'
    ],
    sampleSentences: [
      'I drive my car to work.',
      'The bus stops at the corner.',
      'We take the subway downtown.',
      'I need to buy gas for my car.',
      'Traffic is heavy during rush hour.'
    ]
  },
  
  housing: {
    vocabulary: [
      'house', 'apartment', 'condo', 'townhouse', 'mobile home', 'dorm',
      'bedroom', 'bathroom', 'kitchen', 'living room', 'dining room', 'garage',
      'yard', 'backyard', 'front yard', 'porch', 'deck', 'basement', 'attic',
      'rent', 'mortgage', 'landlord', 'tenant', 'lease', 'utilities'
    ],
    culturalNotes: [
      'Many Americans aspire to own their own home',
      'Apartments are common in cities, houses in suburbs',
      'Most homes have central heating and air conditioning',
      'Yards and outdoor space are highly valued'
    ],
    sampleSentences: [
      'I live in a two-bedroom apartment.',
      'Our house has a big backyard.',
      'I pay rent every month.',
      'The kitchen has new appliances.',
      'We park our car in the garage.'
    ]
  },
  
  work: {
    vocabulary: [
      'job', 'work', 'career', 'office', 'company', 'business', 'employer', 'employee',
      'boss', 'manager', 'coworker', 'colleague', 'meeting', 'project', 'deadline',
      'salary', 'paycheck', 'benefits', 'vacation days', 'sick leave', 'overtime',
      'resume', 'interview', 'promotion', 'retirement'
    ],
    culturalNotes: [
      'Full-time work is typically 40 hours per week',
      'Most employees get 2 weeks paid vacation to start',
      'Health insurance is often provided by employers',
      'Networking and professional relationships are important'
    ],
    sampleSentences: [
      'I work in an office downtown.',
      'My boss is very helpful.',
      'We have a team meeting every Monday.',
      'I get paid every two weeks.',
      'I take vacation days in the summer.'
    ]
  }
}

// US English grammar patterns and preferences
export const usGrammarPatterns = {
  // Collective nouns (US treats as singular, UK often plural)
  collectiveNouns: {
    'team': 'singular', // "The team is winning" (US) vs "The team are winning" (UK)
    'family': 'singular',
    'government': 'singular',
    'company': 'singular',
    'class': 'singular',
    'group': 'singular'
  },
  
  // Preposition preferences
  prepositionPreferences: {
    'different from': 'different than', // US preference
    'at the weekend': 'on the weekend', // US preference
    'in hospital': 'in the hospital', // US includes article
    'at university': 'at the university', // US includes article
    'in future': 'in the future', // US includes article
    'write to me': 'write me', // US often omits 'to'
  },
  
  // Past participle preferences
  pastParticiplePreferences: {
    'got': 'gotten', // US: "I have gotten" vs UK: "I have got"
    'learnt': 'learned',
    'burnt': 'burned',
    'dreamt': 'dreamed',
    'leapt': 'leaped',
    'spelt': 'spelled'
  },
  
  // Date and time formats
  dateTimeFormats: {
    dateFormat: 'MM/DD/YYYY', // US format
    timeFormat: '12-hour', // 12-hour with AM/PM
    examples: [
      '12/25/2023 (December 25, 2023)',
      '3:30 PM (not 15:30)',
      'Monday, January 1st',
      'Fall semester (not Autumn term)'
    ]
  }
}

// US English measurement and number systems
export const usMeasurements = {
  units: {
    // Imperial system (US standard)
    length: ['inch', 'foot', 'yard', 'mile'],
    weight: ['ounce', 'pound', 'ton'],
    volume: ['cup', 'pint', 'quart', 'gallon'],
    temperature: 'Fahrenheit',
    
    // Common conversions for reference
    conversions: {
      '1 foot': '12 inches',
      '1 yard': '3 feet',
      '1 mile': '5,280 feet',
      '1 pound': '16 ounces',
      '1 gallon': '4 quarts'
    }
  },
  
  // Number formatting
  numberFormats: {
    decimal: '.', // period for decimal point
    thousands: ',', // comma for thousands separator
    examples: [
      '1,000 (one thousand)',
      '1,000.50 (one thousand and fifty cents)',
      '$19.99 (nineteen dollars and ninety-nine cents)'
    ]
  }
}

// Language validation and correction system
export class USEnglishValidator {
  constructor() {
    this.corrections = new Map()
    this.suggestions = new Map()
  }
  
  // Check and correct spelling to US English
  correctSpelling(text) {
    let correctedText = text
    
    for (const [ukSpelling, usSpelling] of Object.entries(usEnglishVocabulary.spellingCorrections)) {
      const regex = new RegExp(`\\b${ukSpelling}\\b`, 'gi')
      correctedText = correctedText.replace(regex, usSpelling)
    }
    
    return correctedText
  }
  
  // Check and suggest US vocabulary
  suggestUSVocabulary(text) {
    const suggestions = []
    
    for (const [ukWord, usWord] of Object.entries(usEnglishVocabulary.vocabularySubstitutions)) {
      if (text.toLowerCase().includes(ukWord.toLowerCase())) {
        suggestions.push({
          original: ukWord,
          suggestion: usWord,
          note: `In US English, we say "${usWord}" instead of "${ukWord}"`
        })
      }
    }
    
    return suggestions
  }
  
  // Validate grammar patterns for US English
  validateGrammar(sentence) {
    const issues = []
    
    // Check collective noun usage
    for (const [noun, usage] of Object.entries(usGrammarPatterns.collectiveNouns)) {
      const regex = new RegExp(`\\b${noun}\\s+are\\b`, 'i')
      if (regex.test(sentence) && usage === 'singular') {
        issues.push({
          type: 'collective_noun',
          message: `In US English, "${noun}" takes a singular verb`,
          suggestion: sentence.replace(regex, `${noun} is`)
        })
      }
    }
    
    return issues
  }
  
  // Get culturally appropriate examples
  getCulturalExamples(context) {
    if (usCulturalContexts[context]) {
      return {
        vocabulary: usCulturalContexts[context].vocabulary.slice(0, 10),
        sentences: usCulturalContexts[context].sampleSentences,
        notes: usCulturalContexts[context].culturalNotes
      }
    }
    
    return null
  }
}

// Integration with word database
export const usEnglishWordDatabase = {
  // Filter vocabulary to US English only
  filterToUSEnglish: (wordList) => {
    return wordList.map(word => {
      // Apply spelling corrections
      let usWord = word
      for (const [ukSpelling, usSpelling] of Object.entries(usEnglishVocabulary.spellingCorrections)) {
        if (word.toLowerCase() === ukSpelling.toLowerCase()) {
          usWord = usSpelling
        }
      }
      
      // Apply vocabulary substitutions
      for (const [ukWord, usWord_sub] of Object.entries(usEnglishVocabulary.vocabularySubstitutions)) {
        if (word.toLowerCase() === ukWord.toLowerCase()) {
          usWord = usWord_sub
        }
      }
      
      return usWord
    })
  },
  
  // Add US cultural context tags
  addCulturalTags: (word) => {
    for (const [context, data] of Object.entries(usCulturalContexts)) {
      if (data.vocabulary.includes(word.toLowerCase())) {
        return {
          word,
          context,
          culturallyRelevant: true,
          usageNotes: data.culturalNotes[0]
        }
      }
    }
    
    return { word, culturallyRelevant: false }
  }
}

// Teacher settings for US English
export const usEnglishTeacherSettings = {
  enforceUSSpelling: true,
  showUKAlternatives: false, // Can be enabled later
  includeCulturalContext: true,
  useImperialMeasurements: true,
  use12HourTime: true,
  useUSDateFormat: true,
  
  // Customizable for different regions within US
  regionalVariations: {
    general: 'Standard US English',
    southern: 'Southern US variations',
    northeastern: 'Northeastern US variations',
    western: 'Western US variations',
    midwest: 'Midwestern US variations'
  }
}

// Export main validator instance
export const usEnglishValidator = new USEnglishValidator()

// Quick reference for common US English patterns
export const usEnglishQuickReference = {
  commonPhrases: [
    "How are you doing?", // (vs "How are you getting on?")
    "I'm good, thanks", // (vs "I'm well, thank you")
    "You're welcome", // (vs "You're quite welcome")
    "No problem", // (very common in US)
    "Have a good day", // (standard farewell)
    "Take care", // (casual farewell)
  ],
  
  timeExpressions: [
    "It's 3:30 PM", // (not 15:30)
    "See you Monday", // (not "See you on Monday" - both acceptable)
    "I'll call you later", // (very common)
    "Let's meet at 7", // (context usually clear)
  ],
  
  schoolExpressions: [
    "I'm in 5th grade", // (not "I'm in year 5")
    "I go to college", // (includes university)
    "I major in English", // (not "I read English")
    "I have class at 9", // (not "I have lessons")
  ]
}

