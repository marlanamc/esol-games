// Object Database with Singular/Plural Forms and Categories
export const objectDatabase = [
  // Food Items
  { singular: 'pizza', plural: 'pizzas', category: 'food', type: 'countable', article: 'a' },
  { singular: 'apple', plural: 'apples', category: 'food', type: 'countable', article: 'an' },
  { singular: 'banana', plural: 'bananas', category: 'food', type: 'countable', article: 'a' },
  { singular: 'sandwich', plural: 'sandwiches', category: 'food', type: 'countable', article: 'a' },
  { singular: 'cookie', plural: 'cookies', category: 'food', type: 'countable', article: 'a' },
  { singular: 'orange', plural: 'oranges', category: 'food', type: 'countable', article: 'an' },
  { singular: 'egg', plural: 'eggs', category: 'food', type: 'countable', article: 'an' },
  
  // Uncountable Food
  { singular: 'water', plural: null, category: 'food', type: 'uncountable', article: null },
  { singular: 'milk', plural: null, category: 'food', type: 'uncountable', article: null },
  { singular: 'rice', plural: null, category: 'food', type: 'uncountable', article: null },
  { singular: 'bread', plural: null, category: 'food', type: 'uncountable', article: null },
  
  // School Items
  { singular: 'book', plural: 'books', category: 'school', type: 'countable', article: 'a' },
  { singular: 'pen', plural: 'pens', category: 'school', type: 'countable', article: 'a' },
  { singular: 'pencil', plural: 'pencils', category: 'school', type: 'countable', article: 'a' },
  { singular: 'notebook', plural: 'notebooks', category: 'school', type: 'countable', article: 'a' },
  { singular: 'computer', plural: 'computers', category: 'school', type: 'countable', article: 'a' },
  { singular: 'desk', plural: 'desks', category: 'school', type: 'countable', article: 'a' },
  { singular: 'chair', plural: 'chairs', category: 'school', type: 'countable', article: 'a' },
  
  // Uncountable School
  { singular: 'homework', plural: null, category: 'school', type: 'uncountable', article: null },
  { singular: 'information', plural: null, category: 'school', type: 'uncountable', article: null },
  
  // Entertainment
  { singular: 'movie', plural: 'movies', category: 'entertainment', type: 'countable', article: 'a' },
  { singular: 'song', plural: 'songs', category: 'entertainment', type: 'countable', article: 'a' },
  { singular: 'game', plural: 'games', category: 'entertainment', type: 'countable', article: 'a' },
  { singular: 'video', plural: 'videos', category: 'entertainment', type: 'countable', article: 'a' },
  { singular: 'show', plural: 'shows', category: 'entertainment', type: 'countable', article: 'a' },
  
  // Uncountable Entertainment
  { singular: 'music', plural: null, category: 'entertainment', type: 'uncountable', article: null },
  { singular: 'television', plural: null, category: 'entertainment', type: 'uncountable', article: null },
  
  // People & Animals
  { singular: 'friend', plural: 'friends', category: 'people', type: 'countable', article: 'a' },
  { singular: 'teacher', plural: 'teachers', category: 'people', type: 'countable', article: 'a' },
  { singular: 'student', plural: 'students', category: 'people', type: 'countable', article: 'a' },
  { singular: 'cat', plural: 'cats', category: 'animals', type: 'countable', article: 'a' },
  { singular: 'dog', plural: 'dogs', category: 'animals', type: 'countable', article: 'a' },
  
  // Irregular Plurals
  { singular: 'child', plural: 'children', category: 'people', type: 'countable', article: 'a' },
  { singular: 'person', plural: 'people', category: 'people', type: 'countable', article: 'a' },
  { singular: 'man', plural: 'men', category: 'people', type: 'countable', article: 'a' },
  { singular: 'woman', plural: 'women', category: 'people', type: 'countable', article: 'a' },
  { singular: 'foot', plural: 'feet', category: 'body', type: 'countable', article: 'a' },
  { singular: 'tooth', plural: 'teeth', category: 'body', type: 'countable', article: 'a' },
  { singular: 'mouse', plural: 'mice', category: 'animals', type: 'countable', article: 'a' },
  
  // Sports & Activities
  { singular: 'sport', plural: 'sports', category: 'activities', type: 'countable', article: 'a' },
  { singular: 'ball', plural: 'balls', category: 'activities', type: 'countable', article: 'a' },
  { singular: 'bicycle', plural: 'bicycles', category: 'activities', type: 'countable', article: 'a' },
  
  // Uncountable Activities
  { singular: 'soccer', plural: null, category: 'activities', type: 'uncountable', article: null },
  { singular: 'basketball', plural: null, category: 'activities', type: 'uncountable', article: null },
  { singular: 'tennis', plural: null, category: 'activities', type: 'uncountable', article: null },
  
  // Clothing (some always plural)
  { singular: 'shirt', plural: 'shirts', category: 'clothing', type: 'countable', article: 'a' },
  { singular: 'shoe', plural: 'shoes', category: 'clothing', type: 'countable', article: 'a' },
  { singular: null, plural: 'glasses', category: 'clothing', type: 'always_plural', article: null },
  { singular: null, plural: 'pants', category: 'clothing', type: 'always_plural', article: null },
  { singular: null, plural: 'scissors', category: 'tools', type: 'always_plural', article: null },
  
  // Places
  { singular: 'school', plural: 'schools', category: 'places', type: 'countable', article: 'a' },
  { singular: 'park', plural: 'parks', category: 'places', type: 'countable', article: 'a' },
  { singular: 'store', plural: 'stores', category: 'places', type: 'countable', article: 'a' },
  { singular: 'library', plural: 'libraries', category: 'places', type: 'countable', article: 'a' },
  { singular: 'hospital', plural: 'hospitals', category: 'places', type: 'countable', article: 'a' },
  
  // Abstract Concepts
  { singular: 'idea', plural: 'ideas', category: 'abstract', type: 'countable', article: 'an' },
  { singular: 'problem', plural: 'problems', category: 'abstract', type: 'countable', article: 'a' },
  { singular: 'question', plural: 'questions', category: 'abstract', type: 'countable', article: 'a' },
  
  // Uncountable Abstract
  { singular: 'love', plural: null, category: 'abstract', type: 'uncountable', article: null },
  { singular: 'happiness', plural: null, category: 'abstract', type: 'uncountable', article: null },
  { singular: 'time', plural: null, category: 'abstract', type: 'uncountable', article: null },
  { singular: 'money', plural: null, category: 'abstract', type: 'uncountable', article: null }
]

// Color coding for different word categories
export const wordColors = {
  subjects: {
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-800',
    hover: 'hover:bg-blue-200'
  },
  verbs: {
    bg: 'bg-green-100',
    border: 'border-green-300', 
    text: 'text-green-800',
    hover: 'hover:bg-green-200'
  },
  objects: {
    bg: 'bg-orange-100',
    border: 'border-orange-300',
    text: 'text-orange-800', 
    hover: 'hover:bg-orange-200'
  },
  articles: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-300',
    text: 'text-yellow-800',
    hover: 'hover:bg-yellow-200'
  },
  adjectives: {
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    text: 'text-purple-800',
    hover: 'hover:bg-purple-200'
  },
  adverbs: {
    bg: 'bg-amber-100',
    border: 'border-amber-300',
    text: 'text-amber-800',
    hover: 'hover:bg-amber-200'
  },
  prepositions: {
    bg: 'bg-red-100',
    border: 'border-red-300',
    text: 'text-red-800',
    hover: 'hover:bg-red-200'
  },
  questionWords: {
    bg: 'bg-cyan-100',
    border: 'border-cyan-300',
    text: 'text-cyan-800',
    hover: 'hover:bg-cyan-200'
  },
  helpers: {
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    text: 'text-gray-800',
    hover: 'hover:bg-gray-200'
  },
  negatives: {
    bg: 'bg-slate-100',
    border: 'border-slate-300',
    text: 'text-slate-800',
    hover: 'hover:bg-slate-200'
  },
  extras: {
    bg: 'bg-teal-100',
    border: 'border-teal-300',
    text: 'text-teal-800',
    hover: 'hover:bg-teal-200'
  }
}

// Helper functions for object management
export const getObjectByForm = (word) => {
  return objectDatabase.find(obj => 
    obj.singular === word || obj.plural === word
  )
}

export const toggleObjectForm = (word) => {
  const obj = getObjectByForm(word)
  if (!obj) return word
  
  if (obj.type === 'uncountable' || obj.type === 'always_plural') {
    return word // Cannot toggle
  }
  
  if (obj.singular === word) {
    return obj.plural
  } else {
    return obj.singular
  }
}

export const getCorrectArticle = (objectWord, subjectWord) => {
  const obj = getObjectByForm(objectWord)
  if (!obj) return null
  
  // No article needed for uncountable or plural
  if (obj.type === 'uncountable' || obj.type === 'always_plural') {
    return null
  }
  
  // If it's plural form, no article
  if (objectWord === obj.plural) {
    return null
  }
  
  // If it's singular, return appropriate article
  return obj.article
}

export const isObjectCountable = (word) => {
  const obj = getObjectByForm(word)
  return obj && obj.type === 'countable'
}

export const isObjectUncountable = (word) => {
  const obj = getObjectByForm(word)
  return obj && obj.type === 'uncountable'
}

export const isObjectAlwaysPlural = (word) => {
  const obj = getObjectByForm(word)
  return obj && obj.type === 'always_plural'
}

