import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { AlertCircle, CheckCircle, BookOpen, RotateCcw, Trophy, Palette, Lock, Star, Zap, Shield, Home, ChevronRight } from 'lucide-react'

// Import all Phase 2 & 3 systems
import { comprehensiveLevels45, getLevelById } from './data/comprehensiveLevels45.js'
import { grammarEngine } from './data/enhancedGrammarEngine.js'
import { timeExpressionSystem, timeExpressionVocabulary } from './data/timeExpressionSystem.js'
import { enhancedVerbDatabase, verbSelector } from './data/enhancedVerbDatabase.js'
import { modalVerbsSystem, modalValidator, modalVerbVocabulary } from './data/modalVerbsSystem.js'

// Import components
import { GamificationSystem, useGameStats } from './components/GameificationSystem.jsx'
import { SettingsPanel, useSettings } from './components/SettingsPanel.jsx'
import { GrammarTooltip, CategoryHelpButton, WordButtonWithTooltip } from './components/TooltipSystem.jsx'
import { RapidFireQuiz } from './components/RapidFireQuiz.jsx'
import { CategorySelector } from './components/CategorySelector.jsx'
import { CategoryLevelSelector } from './components/CategoryLevelSelector.jsx'
import { useCategoryNavigation } from './hooks/useCategoryNavigation.js'
import './App.css'

function App() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [userStats, setUserStats] = useState({
    points: 0,
    completedLevels: [],
    currentStreak: 0,
    bestStreak: 0,
    totalSentences: 0,
    perfectSentences: 0,
    levelsAttempted: [],
    unlockedCategories: ['present-basics'], // Start with basic category unlocked
    categoryProgress: {}
  })
  
  const [selectedTiles, setSelectedTiles] = useState([])
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [enhancedVerbs, setEnhancedVerbs] = useState([])
  const [showGamification, setShowGamification] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  
  // Category navigation system
  const categoryNavigation = useCategoryNavigation(userStats)
  const [currentView, setCurrentView] = useState('category-selector') // 'category-selector', 'level-selector', 'game'
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Enhanced settings
  const { settings, updateSettings } = useSettings()
  const { gameStats, updateGameStats } = useGameStats()

  // Initialize enhanced verb system
  useEffect(() => {
    // Load verbs based on current level difficulty
    const levelDifficulty = currentLevel <= 8 ? 'beginner' : 
                           currentLevel <= 17 ? 'elementary' : 
                           currentLevel <= 28 ? 'intermediate' : 'advanced'
    
    const levelVerbs = verbSelector.getVerbsForLevel(currentLevel)
    setEnhancedVerbs(levelVerbs)
  }, [currentLevel])

  // Get current level data
  const getCurrentLevel = () => {
    return getLevelById(currentLevel) || comprehensiveLevels45[0]
  }

  const level = getCurrentLevel()

  // Enhanced word categories with comprehensive vocabulary
  const getWordCategories = () => {
    const baseCategories = {
      subjects: [
        { word: 'I', category: 'pronoun', person: 'first', number: 'singular' },
        { word: 'you', category: 'pronoun', person: 'second', number: 'singular/plural' },
        { word: 'he', category: 'pronoun', person: 'third', number: 'singular' },
        { word: 'she', category: 'pronoun', person: 'third', number: 'singular' },
        { word: 'it', category: 'pronoun', person: 'third', number: 'singular' },
        { word: 'we', category: 'pronoun', person: 'first', number: 'plural' },
        { word: 'they', category: 'pronoun', person: 'third', number: 'plural' },
        { word: 'the student', category: 'noun', person: 'third', number: 'singular' },
        { word: 'my friend', category: 'noun', person: 'third', number: 'singular' },
        { word: 'the teacher', category: 'noun', person: 'third', number: 'singular' }
      ],
      
      verbs: enhancedVerbs.slice(0, 12).map(verb => ({
        word: `${verb.V1}/${verb.V1_3rd}`,
        baseForm: verb.V1,
        thirdPersonForm: verb.V1_3rd,
        category: 'verb',
        type: verb.type,
        difficulty: verb.difficulty,
        toggleable: true
      })),
      
      objects: [
        { word: 'pizza/pizzas', singular: 'pizza', plural: 'pizzas', category: 'countable-noun', toggleable: true },
        { word: 'book/books', singular: 'book', plural: 'books', category: 'countable-noun', toggleable: true },
        { word: 'movie/movies', singular: 'movie', plural: 'movies', category: 'countable-noun', toggleable: true },
        { word: 'car/cars', singular: 'car', plural: 'cars', category: 'countable-noun', toggleable: true },
        { word: 'house/houses', singular: 'house', plural: 'houses', category: 'countable-noun', toggleable: true },
        { word: 'music', category: 'uncountable-noun', toggleable: false },
        { word: 'water', category: 'uncountable-noun', toggleable: false },
        { word: 'coffee', category: 'uncountable-noun', toggleable: false }
      ],
      
      articles: [
        { word: 'a', category: 'indefinite-article', usage: 'singular countable nouns starting with consonant' },
        { word: 'an', category: 'indefinite-article', usage: 'singular countable nouns starting with vowel' },
        { word: 'the', category: 'definite-article', usage: 'specific nouns' }
      ],
      
      helpers: [
        { word: 'do', category: 'auxiliary', usage: 'I, you, we, they' },
        { word: 'does', category: 'auxiliary', usage: 'he, she, it' },
        { word: 'did', category: 'auxiliary', usage: 'past tense questions/negatives' },
        { word: 'am', category: 'be-verb', usage: 'I' },
        { word: 'is', category: 'be-verb', usage: 'he, she, it' },
        { word: 'are', category: 'be-verb', usage: 'you, we, they' },
        { word: 'was', category: 'be-verb', usage: 'I, he, she, it (past)' },
        { word: 'were', category: 'be-verb', usage: 'you, we, they (past)' },
        { word: 'have', category: 'perfect-auxiliary', usage: 'I, you, we, they' },
        { word: 'has', category: 'perfect-auxiliary', usage: 'he, she, it' },
        { word: 'will', category: 'future-auxiliary', usage: 'all subjects' }
      ],
      
      negatives: [
        { word: 'not', category: 'negation' },
        { word: "don't", category: 'negative-contraction', expansion: 'do not' },
        { word: "doesn't", category: 'negative-contraction', expansion: 'does not' },
        { word: "didn't", category: 'negative-contraction', expansion: 'did not' },
        { word: "isn't", category: 'negative-contraction', expansion: 'is not' },
        { word: "aren't", category: 'negative-contraction', expansion: 'are not' },
        { word: "wasn't", category: 'negative-contraction', expansion: 'was not' },
        { word: "weren't", category: 'negative-contraction', expansion: 'were not' },
        { word: "haven't", category: 'negative-contraction', expansion: 'have not' },
        { word: "hasn't", category: 'negative-contraction', expansion: 'has not' },
        { word: "won't", category: 'negative-contraction', expansion: 'will not' }
      ],
      
      'question-words': [
        { word: 'what', category: 'wh-question', asks: 'things, actions, information' },
        { word: 'who', category: 'wh-question', asks: 'people' },
        { word: 'where', category: 'wh-question', asks: 'places' },
        { word: 'when', category: 'wh-question', asks: 'time' },
        { word: 'why', category: 'wh-question', asks: 'reasons' },
        { word: 'how', category: 'wh-question', asks: 'manner, method' },
        { word: 'which', category: 'wh-question', asks: 'choice between options' }
      ]
    }

    // Add time expressions based on level
    if (level.requiredCategories?.includes('time-expressions')) {
      baseCategories['time-expressions'] = timeExpressionVocabulary['time-markers']
    }

    // Add modal verbs for advanced levels
    if (currentLevel >= 25) {
      baseCategories['modal-verbs'] = modalVerbVocabulary['modal-verbs']
    }

    return baseCategories
  }

  const wordCategories = getWordCategories()

  // Enhanced tile click handler with toggle functionality
  const handleTileClick = (word, category) => {
    const wordObj = { word, category, originalWord: word }
    
    // Handle toggleable words (verbs and objects)
    if (category === 'verb' && word.includes('/')) {
      const [form1, form2] = word.split('/')
      const currentForm = selectedTiles.find(tile => tile.originalWord === word)?.word || form1
      const newForm = currentForm === form1 ? form2 : form1
      
      // Update existing tile or add new one
      const existingIndex = selectedTiles.findIndex(tile => tile.originalWord === word)
      if (existingIndex !== -1) {
        const newTiles = [...selectedTiles]
        newTiles[existingIndex] = { ...wordObj, word: newForm }
        setSelectedTiles(newTiles)
      } else {
        setSelectedTiles([...selectedTiles, { ...wordObj, word: form1 }])
      }
    } else if (category === 'object' && word.includes('/')) {
      const [singular, plural] = word.split('/')
      const currentForm = selectedTiles.find(tile => tile.originalWord === word)?.word || singular
      const newForm = currentForm === singular ? plural : singular
      
      const existingIndex = selectedTiles.findIndex(tile => tile.originalWord === word)
      if (existingIndex !== -1) {
        const newTiles = [...selectedTiles]
        newTiles[existingIndex] = { ...wordObj, word: newForm }
        setSelectedTiles(newTiles)
      } else {
        setSelectedTiles([...selectedTiles, { ...wordObj, word: singular }])
      }
    } else {
      setSelectedTiles([...selectedTiles, wordObj])
    }
  }

  // Enhanced grammar checking with comprehensive validation
  const checkSentence = () => {
    if (selectedTiles.length === 0) {
      setFeedback('Please build a sentence first!')
      setShowFeedback(true)
      return
    }

    // Use enhanced grammar engine for validation
    const validation = grammarEngine.validateSentence(selectedTiles, currentLevel)
    
    setFeedback(validation.feedback)
    setShowFeedback(true)

    // Update stats based on validation result
    const newStats = { ...userStats }
    newStats.totalSentences += 1

    if (validation.isCorrect) {
      newStats.points += validation.points
      newStats.perfectSentences += 1
      newStats.currentStreak += 1
      newStats.bestStreak = Math.max(newStats.bestStreak, newStats.currentStreak)
      
      if (!newStats.completedLevels.includes(currentLevel)) {
        newStats.completedLevels.push(currentLevel)
      }
      
      // Update category progress
      const categoryId = level.category
      if (!newStats.categoryProgress[categoryId]) {
        newStats.categoryProgress[categoryId] = { completed: 0, total: 0 }
      }
      newStats.categoryProgress[categoryId].completed += 1
      
      // Unlock new categories based on progress
      if (newStats.points >= 500 && !newStats.unlockedCategories.includes('time-expressions')) {
        newStats.unlockedCategories.push('time-expressions')
      }
      if (newStats.points >= 1000 && !newStats.unlockedCategories.includes('past-tense')) {
        newStats.unlockedCategories.push('past-tense')
      }
      if (newStats.points >= 1500 && !newStats.unlockedCategories.includes('present-perfect')) {
        newStats.unlockedCategories.push('present-perfect')
      }
    } else {
      newStats.currentStreak = 0
    }

    if (!newStats.levelsAttempted.includes(currentLevel)) {
      newStats.levelsAttempted.push(currentLevel)
    }

    setUserStats(newStats)
    updateGameStats(validation.isCorrect, validation.points || 0)
  }

  const clearSentence = () => {
    setSelectedTiles([])
    setFeedback('')
    setShowFeedback(false)
  }

  const removeTile = (index) => {
    const newTiles = selectedTiles.filter((_, i) => i !== index)
    setSelectedTiles(newTiles)
  }

  // Category navigation handlers
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentView('level-selector')
  }

  const handleLevelSelect = (levelId) => {
    setCurrentLevel(levelId)
    setCurrentView('game')
    clearSentence()
  }

  const handleBackToCategories = () => {
    setCurrentView('category-selector')
    setSelectedCategory(null)
  }

  const handleBackToLevels = () => {
    setCurrentView('level-selector')
  }

  // Color coding for word categories
  const getCategoryColor = (category) => {
    const colors = {
      'pronoun': 'bg-blue-100 border-blue-300 text-blue-800',
      'noun': 'bg-green-100 border-green-300 text-green-800',
      'verb': 'bg-purple-100 border-purple-300 text-purple-800',
      'object': 'bg-orange-100 border-orange-300 text-orange-800',
      'countable-noun': 'bg-orange-100 border-orange-300 text-orange-800',
      'uncountable-noun': 'bg-yellow-100 border-yellow-300 text-yellow-800',
      'article': 'bg-pink-100 border-pink-300 text-pink-800',
      'auxiliary': 'bg-indigo-100 border-indigo-300 text-indigo-800',
      'be-verb': 'bg-indigo-100 border-indigo-300 text-indigo-800',
      'perfect-auxiliary': 'bg-indigo-100 border-indigo-300 text-indigo-800',
      'future-auxiliary': 'bg-indigo-100 border-indigo-300 text-indigo-800',
      'negation': 'bg-red-100 border-red-300 text-red-800',
      'negative-contraction': 'bg-red-100 border-red-300 text-red-800',
      'wh-question': 'bg-cyan-100 border-cyan-300 text-cyan-800',
      'time-marker': 'bg-amber-100 border-amber-300 text-amber-800',
      'modal': 'bg-violet-100 border-violet-300 text-violet-800'
    }
    return colors[category] || 'bg-gray-100 border-gray-300 text-gray-800'
  }

  // Render category selector
  if (currentView === 'category-selector') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <CategorySelector 
            userStats={userStats}
            onCategorySelect={handleCategorySelect}
            onShowGamification={() => setShowGamification(true)}
          />
          
          {showGamification && (
            <GamificationSystem 
              userStats={userStats}
              onClose={() => setShowGamification(false)}
            />
          )}
        </div>
      </div>
    )
  }

  // Render level selector
  if (currentView === 'level-selector' && selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <CategoryLevelSelector 
            categoryId={selectedCategory}
            userStats={userStats}
            onLevelSelect={handleLevelSelect}
            onBack={handleBackToCategories}
          />
        </div>
      </div>
    )
  }

  // Main game interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header with navigation */}
        <Card className="border-2 border-blue-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleBackToLevels}
                  className="flex items-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to Levels</span>
                </Button>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{selectedCategory?.replace('-', ' ').toUpperCase()}</span>
                  <ChevronRight className="w-4 h-4" />
                  <span>Level {currentLevel}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4" />
                  <span>{userStats.points} points</span>
                </Badge>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowGamification(true)}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Stats
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {level.name}
                {level.isChallengingLevel && (
                  <Badge variant="destructive" className="ml-2">Challenge</Badge>
                )}
                {level.isCriticalLevel && (
                  <Badge variant="destructive" className="ml-2">Critical</Badge>
                )}
              </CardTitle>
              
              <div className="flex items-center space-x-4 text-sm">
                <Badge variant="outline">{level.formula}</Badge>
                <span className="text-gray-600">{level.shortDescription}</span>
              </div>
              
              <GrammarTooltip content={level.explanation}>
                <p className="text-gray-700 cursor-help hover:text-blue-600">
                  {level.explanation}
                </p>
              </GrammarTooltip>
              
              <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                <strong>Example:</strong> {level.example}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Sentence Building Area */}
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Build Your Sentence</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Current Sentence Display */}
            <div className="min-h-[80px] p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white">
              {selectedTiles.length === 0 ? (
                <p className="text-gray-500 text-center">Click word tiles below to build your sentence...</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedTiles.map((tile, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={`${getCategoryColor(tile.category)} cursor-pointer hover:opacity-80 text-lg px-3 py-2`}
                      onClick={() => removeTile(index)}
                    >
                      {tile.word}
                      <span className="ml-2 text-xs">×</span>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button 
                onClick={checkSentence}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                disabled={selectedTiles.length === 0}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Check Sentence</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearSentence}
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setShowQuiz(true)}
                className="flex items-center space-x-2"
                disabled={userStats.completedLevels.length < 3}
              >
                <Zap className="w-4 h-4" />
                <span>Rapid Quiz</span>
              </Button>
            </div>

            {/* Feedback Display */}
            {showFeedback && (
              <div className={`p-4 rounded-lg border-2 ${
                feedback.includes('Perfect') || feedback.includes('Correct') || feedback.includes('Excellent')
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-start space-x-2">
                  {feedback.includes('Perfect') || feedback.includes('Correct') || feedback.includes('Excellent') ? (
                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mt-0.5 text-red-600" />
                  )}
                  <p className="font-medium">{feedback}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Word Categories */}
        <div className="grid gap-4">
          {level.requiredCategories?.map(categoryName => {
            const categoryWords = wordCategories[categoryName] || []
            if (categoryWords.length === 0) return null

            return (
              <Card key={categoryName} className="border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${getCategoryColor(categoryWords[0]?.category).split(' ')[0]}`}></div>
                      <span>{categoryName.replace('-', ' ')}</span>
                    </CardTitle>
                    <CategoryHelpButton category={categoryName} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {categoryWords.map((wordObj, index) => (
                      <WordButtonWithTooltip
                        key={index}
                        word={wordObj.word}
                        category={wordObj.category}
                        tooltip={wordObj.usage || wordObj.meaning || wordObj.asks}
                        onClick={() => handleTileClick(wordObj.word, wordObj.category)}
                        className={`${getCategoryColor(wordObj.category)} hover:opacity-80 transition-opacity`}
                        toggleable={wordObj.toggleable}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Gamification System Modal */}
        {showGamification && (
          <GamificationSystem 
            userStats={userStats}
            gameStats={gameStats}
            onClose={() => setShowGamification(false)}
          />
        )}

        {/* Rapid Fire Quiz Modal */}
        {showQuiz && (
          <RapidFireQuiz 
            currentLevel={currentLevel}
            userStats={userStats}
            onClose={() => setShowQuiz(false)}
            onUpdateStats={setUserStats}
          />
        )}

        {/* Settings Panel */}
        <SettingsPanel 
          settings={settings}
          onUpdateSettings={updateSettings}
        />
      </div>
    </div>
  )
}

export default App

