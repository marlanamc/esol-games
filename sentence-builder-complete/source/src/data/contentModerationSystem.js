// Content Moderation and Cultural Sensitivity System

// Prohibited words and phrases that should never appear
export const prohibitedContent = {
  // Hate speech and slurs (partial list - would need comprehensive database)
  hateTerms: [
    // Note: In production, this would be a comprehensive, regularly updated database
    // managed by content moderation specialists
  ],
  
  // Inappropriate topics for educational setting
  inappropriateTopics: [
    'violence', 'weapons', 'drugs', 'alcohol', 'gambling', 'adult content'
  ],
  
  // Discriminatory language patterns
  discriminatoryPatterns: [
    'all [group] are',
    '[group] people are',
    'I hate [group]',
    '[group] should not',
    'no [group] allowed'
  ]
}

// Positive, inclusive vocabulary for sentence building
export const culturallyAppropriateVocabulary = {
  subjects: {
    people: [
      'I', 'You', 'We', 'They', 'Everyone', 'Someone', 'People',
      'My friend', 'My teacher', 'My classmate', 'My neighbor',
      'The student', 'The teacher', 'The doctor', 'The artist',
      'My family', 'My parents', 'My children', 'My siblings'
    ],
    neutral: [
      'The cat', 'The dog', 'The bird', 'The plant', 'The book',
      'The computer', 'The phone', 'The car', 'The house'
    ]
  },
  
  verbs: {
    positive: [
      'help', 'learn', 'teach', 'share', 'create', 'build', 'grow',
      'study', 'read', 'write', 'listen', 'speak', 'understand',
      'enjoy', 'appreciate', 'respect', 'support', 'encourage'
    ],
    neutral: [
      'eat', 'drink', 'sleep', 'walk', 'run', 'play', 'work',
      'live', 'travel', 'visit', 'cook', 'clean', 'drive'
    ]
  },
  
  objects: {
    educational: [
      'books', 'lessons', 'homework', 'projects', 'presentations',
      'languages', 'skills', 'knowledge', 'information'
    ],
    cultural: [
      'music', 'art', 'stories', 'traditions', 'festivals',
      'food', 'recipes', 'games', 'sports', 'hobbies'
    ],
    everyday: [
      'breakfast', 'lunch', 'dinner', 'water', 'tea', 'coffee',
      'clothes', 'shoes', 'bags', 'phones', 'computers'
    ]
  },
  
  adjectives: {
    positive: [
      'good', 'great', 'wonderful', 'amazing', 'beautiful', 'helpful',
      'kind', 'friendly', 'smart', 'creative', 'talented', 'hardworking'
    ],
    neutral: [
      'big', 'small', 'new', 'old', 'red', 'blue', 'green', 'yellow',
      'hot', 'cold', 'fast', 'slow', 'easy', 'difficult'
    ]
  }
}

// Cultural context guidelines for different situations
export const culturalContexts = {
  classroom: {
    name: "In the Classroom",
    description: "Appropriate language for educational settings",
    encouragedTopics: [
      'learning', 'studying', 'asking questions', 'helping classmates',
      'sharing ideas', 'working together', 'showing respect'
    ],
    sampleSentences: [
      "I ask questions when I don't understand.",
      "We help each other with homework.",
      "My teacher explains things clearly.",
      "Students share their ideas in class."
    ],
    culturalNotes: [
      "In many cultures, asking questions shows engagement, not disrespect",
      "Group work and collaboration are valued in most educational systems",
      "Showing respect for teachers and classmates is universal"
    ]
  },
  
  workplace: {
    name: "At Work",
    description: "Professional and respectful workplace communication",
    encouragedTopics: [
      'teamwork', 'projects', 'meetings', 'helping colleagues',
      'learning new skills', 'professional development'
    ],
    sampleSentences: [
      "I work with my team on projects.",
      "We have meetings every Monday.",
      "My colleagues help me learn new skills.",
      "Everyone contributes to our success."
    ],
    culturalNotes: [
      "Professional communication varies by culture but respect is universal",
      "Teamwork and collaboration are valued in most workplaces",
      "Learning and growth mindset is appreciated globally"
    ]
  },
  
  community: {
    name: "In the Community",
    description: "Respectful interaction with neighbors and community members",
    encouragedTopics: [
      'helping neighbors', 'community events', 'local traditions',
      'volunteering', 'making friends', 'cultural exchange'
    ],
    sampleSentences: [
      "I help my neighbors when they need assistance.",
      "We celebrate different cultural festivals together.",
      "People in my community are friendly and welcoming.",
      "Everyone contributes to making our neighborhood better."
    ],
    culturalNotes: [
      "Community involvement looks different across cultures",
      "Respect for diversity strengthens communities",
      "Small acts of kindness are universally appreciated"
    ]
  },
  
  family: {
    name: "With Family",
    description: "Expressing family relationships and activities respectfully",
    encouragedTopics: [
      'family activities', 'traditions', 'celebrations', 'support',
      'learning from elders', 'teaching children'
    ],
    sampleSentences: [
      "My family teaches me about our traditions.",
      "We celebrate special occasions together.",
      "I learn important values from my parents.",
      "Family members support each other."
    ],
    culturalNotes: [
      "Family structures vary greatly across cultures",
      "All family types deserve respect and recognition",
      "Intergenerational learning is valued in many cultures"
    ]
  }
}

// Content filtering system
export class ContentModerationFilter {
  constructor() {
    this.flaggedPatterns = new Set()
    this.approvedSentences = new Set()
    this.warningCount = new Map()
  }
  
  // Check if a sentence contains inappropriate content
  checkSentence(sentence, context = 'general') {
    const result = {
      isAppropriate: true,
      issues: [],
      suggestions: [],
      culturalContext: null
    }
    
    const lowerSentence = sentence.toLowerCase()
    
    // Check for prohibited content
    for (const term of prohibitedContent.hateTerms) {
      if (lowerSentence.includes(term.toLowerCase())) {
        result.isAppropriate = false
        result.issues.push({
          type: 'prohibited_content',
          message: 'This sentence contains inappropriate language.',
          suggestion: 'Please choose different words to express your idea.'
        })
      }
    }
    
    // Check for discriminatory patterns
    for (const pattern of prohibitedContent.discriminatoryPatterns) {
      const regex = new RegExp(pattern.replace('[group]', '\\w+'), 'i')
      if (regex.test(sentence)) {
        result.isAppropriate = false
        result.issues.push({
          type: 'discriminatory_pattern',
          message: 'This sentence could be hurtful to others.',
          suggestion: 'Try expressing your idea in a more positive way.'
        })
      }
    }
    
    // Provide cultural context if appropriate
    if (result.isAppropriate && context !== 'general') {
      result.culturalContext = culturalContexts[context]
    }
    
    return result
  }
  
  // Get alternative suggestions for inappropriate content
  getSuggestions(originalSentence, context = 'general') {
    const suggestions = []
    
    // Provide context-appropriate alternatives
    if (culturalContexts[context]) {
      suggestions.push(...culturalContexts[context].sampleSentences.slice(0, 3))
    }
    
    // General positive alternatives
    suggestions.push(
      "I enjoy learning new things.",
      "People in my community are helpful.",
      "We work together to solve problems.",
      "Everyone deserves respect and kindness."
    )
    
    return suggestions
  }
  
  // Report inappropriate content for review
  reportContent(sentence, userId, reason) {
    // In production, this would log to a moderation system
    console.log('Content reported:', {
      sentence,
      userId,
      reason,
      timestamp: new Date().toISOString()
    })
    
    // Track user warnings
    const currentWarnings = this.warningCount.get(userId) || 0
    this.warningCount.set(userId, currentWarnings + 1)
    
    return {
      reported: true,
      warningCount: currentWarnings + 1,
      message: 'Thank you for reporting. Our team will review this content.'
    }
  }
}

// Positive reinforcement system
export const positiveReinforcementMessages = {
  inclusive: [
    "Great! Your sentence shows respect for others.",
    "Excellent! This is a positive way to express your idea.",
    "Perfect! Your sentence promotes understanding and kindness."
  ],
  
  cultural: [
    "Wonderful! Your sentence shows cultural awareness.",
    "Great job! This sentence would be appropriate in many cultures.",
    "Excellent! You're using respectful language."
  ],
  
  educational: [
    "Perfect! This sentence is great for learning.",
    "Excellent! This shows good communication skills.",
    "Great work! This sentence is clear and respectful."
  ]
}

// Safe word combinations that are pre-approved
export const safeWordCombinations = {
  subjects: culturallyAppropriateVocabulary.subjects.people.concat(
    culturallyAppropriateVocabulary.subjects.neutral
  ),
  
  verbs: culturallyAppropriateVocabulary.verbs.positive.concat(
    culturallyAppropriateVocabulary.verbs.neutral
  ),
  
  objects: culturallyAppropriateVocabulary.objects.educational.concat(
    culturallyAppropriateVocabulary.objects.cultural,
    culturallyAppropriateVocabulary.objects.everyday
  ),
  
  adjectives: culturallyAppropriateVocabulary.adjectives.positive.concat(
    culturallyAppropriateVocabulary.adjectives.neutral
  )
}

// Teacher moderation tools
export const teacherModerationTools = {
  // Pre-approve word lists for specific classes
  createClassWordList: (className, approvedWords) => {
    return {
      className,
      approvedWords,
      createdDate: new Date().toISOString(),
      status: 'active'
    }
  },
  
  // Review flagged content
  reviewFlaggedContent: (contentId, decision, notes) => {
    return {
      contentId,
      decision, // 'approve', 'reject', 'modify'
      notes,
      reviewedBy: 'teacher',
      reviewDate: new Date().toISOString()
    }
  },
  
  // Set classroom guidelines
  setClassroomGuidelines: (guidelines) => {
    return {
      guidelines,
      enforcementLevel: 'strict', // 'strict', 'moderate', 'lenient'
      culturalContexts: ['classroom', 'community'],
      updatedDate: new Date().toISOString()
    }
  }
}

// Integration with main game
export const moderationIntegration = {
  // Check sentence before allowing submission
  validateSentence: (sentence, userId, context) => {
    const filter = new ContentModerationFilter()
    const result = filter.checkSentence(sentence, context)
    
    if (!result.isAppropriate) {
      return {
        allowed: false,
        feedback: result.issues[0].message,
        suggestions: filter.getSuggestions(sentence, context),
        educationalNote: "Let's practice building positive, respectful sentences that help us communicate effectively."
      }
    }
    
    return {
      allowed: true,
      feedback: getPositiveFeedback(sentence, context),
      culturalContext: result.culturalContext
    }
  },
  
  // Provide educational feedback
  getEducationalFeedback: (sentence, context) => {
    if (culturalContexts[context]) {
      return {
        contextInfo: culturalContexts[context].description,
        culturalNotes: culturalContexts[context].culturalNotes[0],
        encouragement: "You're learning to communicate respectfully across cultures!"
      }
    }
    
    return {
      encouragement: "Great job building a respectful sentence!"
    }
  }
}

// Helper function for positive feedback
function getPositiveFeedback(sentence, context) {
  const contextMessages = positiveReinforcementMessages[context] || positiveReinforcementMessages.educational
  return contextMessages[Math.floor(Math.random() * contextMessages.length)]
}

// Export the main filter instance
export const contentFilter = new ContentModerationFilter()

