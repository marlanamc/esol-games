import React, { useState, useEffect, useRef } from 'react'
import { Target, ArrowLeft, RotateCcw } from 'lucide-react'

const VerbConjugationGame = ({ onBack }) => {
  const [currentGame, setCurrentGame] = useState({
    score: 0,
    streak: 0,
    questionCount: 0,
    totalQuestions: 10,
    currentVerb: null,
    currentTense: 'present',
    currentPronoun: 'I'
  })

  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [settings, setSettings] = useState({
    time: ['present', 'past', 'future'],
    tense: ['simple', 'continuous', 'perfect', 'perfect continuous'],
    form: ['affirmative', 'negative', 'question'],
    verbType: ['regular', 'irregular'],
    gameMode: 'practice' // 'practice' or 'timed'
  })
  const [googleVerbs, setGoogleVerbs] = useState([])
  const [isLoadingVerbs, setIsLoadingVerbs] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [timerActive, setTimerActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  
  const inputRef = useRef(null)

  // Load verbs from Google Sheets
  useEffect(() => {
    const loadVerbsFromGoogleSheets = async () => {
      try {
        const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS00jGWq5Xx7IOU9CNxZQ0AB7MV_DPbdre346fHSHidzzdD-yCuZP2Lklq1RvQdF5HdjM3woNPufJOH/pub?gid=0&single=true&output=csv'
        const response = await fetch(googleSheetUrl)
        
        if (!response.ok) {
          throw new Error('Failed to fetch verbs from Google Sheets')
        }
        
        const csvText = await response.text()
        const lines = csvText.split('\n')
        const verbsData = []
        
        // Skip header row and process data
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (line) {
            const columns = line.split(',')
            if (columns.length >= 6) {
              verbsData.push({
                infinitive: columns[0].trim().replace(/"/g, ''),
                base: columns[1].trim().replace(/"/g, ''),
                third: columns[2].trim().replace(/"/g, ''),
                gerund: columns[3].trim().replace(/"/g, ''),
                past: columns[4].trim().replace(/"/g, ''),
                participle: columns[5].trim().replace(/"/g, '')
              })
            }
          }
        }
        
        setGoogleVerbs(verbsData)
        setIsLoadingVerbs(false)
      } catch (error) {
        console.error('Error loading verbs from Google Sheets:', error)
        setIsLoadingVerbs(false)
      }
    }
    
    loadVerbsFromGoogleSheets()
  }, [])

  // Timer effect for timed mode
  useEffect(() => {
    if (timerActive && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timerActive && timeRemaining === 0) {
      setTimerActive(false)
      setGameOver(true)
      setShowFeedback(false)
    }
  }, [timerActive, timeRemaining])

  // Verbs now come exclusively from Google Sheets

  const pronouns = {
    present: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    past: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    future: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    present_continuous: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    past_continuous: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    present_perfect: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    past_perfect: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    future_perfect: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    present_perfect_continuous: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    past_perfect_continuous: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    future_perfect_continuous: ['I', 'you', 'he', 'she', 'it', 'we', 'they']
  }

  const tenses = {
    present: 'Present Simple',
    past: 'Past Simple', 
    future: 'Future Simple',
    present_continuous: 'Present Continuous',
    past_continuous: 'Past Continuous',
    present_perfect: 'Present Perfect',
    past_perfect: 'Past Perfect',
    future_perfect: 'Future Perfect',
    present_perfect_continuous: 'Present Perfect Continuous',
    past_perfect_continuous: 'Past Perfect Continuous',
    future_perfect_continuous: 'Future Perfect Continuous'
  }

  const forms = {
    affirmative: 'Affirmative',
    negative: 'Negative',
    question: 'Question'
  }

  const getRandomVerb = () => {
    // Only use Google Sheets data
    if (googleVerbs.length > 0) {
      return googleVerbs[Math.floor(Math.random() * googleVerbs.length)]
    }
    
    // If no Google Sheets data is available, return null to prevent errors
    console.warn('No Google Sheets verbs loaded yet')
    return null
  }

  const getRandomTime = () => {
    return settings.time[Math.floor(Math.random() * settings.time.length)]
  }

  const getRandomVerbTense = () => {
    return settings.tense[Math.floor(Math.random() * settings.tense.length)]
  }

  const getRandomPronoun = () => {
    const pronounList = ["he", "she", "it", "they", "we", "I", "you"]
    return pronounList[Math.floor(Math.random() * pronounList.length)]
  }

  const getRandomForm = () => {
    return settings.form[Math.floor(Math.random() * settings.form.length)]
  }

  const toggleSetting = (category, value) => {
    setSettings(prev => {
      const currentArray = prev[category]
      const isSelected = currentArray.includes(value)
      
      if (isSelected) {
        // Don't allow removing the last item
        if (currentArray.length === 1) return prev
        return {
          ...prev,
          [category]: currentArray.filter(item => item !== value)
        }
      } else {
        return {
          ...prev,
          [category]: [...currentArray, value]
        }
      }
    })
  }

  const toggleAll = (category, allOptions) => {
    setSettings(prev => {
      const currentArray = prev[category]
      const isAllSelected = allOptions.every(option => currentArray.includes(option))
      
      if (isAllSelected) {
        // If all are selected, deselect all (but keep at least one)
        return {
          ...prev,
          [category]: [allOptions[0]] // Keep the first option
        }
      } else {
        // If not all are selected, select all
        return {
          ...prev,
          [category]: [...allOptions]
        }
      }
    })
  }

  const normalizeAnswer = (answer) => {
    if (!answer) return ''
    return answer.toLowerCase()
      .trim()
      .replace(/\s+/g, ' ') // normalize multiple spaces
      .replace(/don't/g, 'do not')
      .replace(/doesn't/g, 'does not')
      .replace(/didn't/g, 'did not')
      .replace(/won't/g, 'will not')
      .replace(/haven't/g, 'have not')
      .replace(/hasn't/g, 'has not')
      .replace(/hadn't/g, 'had not')
      .replace(/isn't/g, 'is not')
      .replace(/aren't/g, 'are not')
      .replace(/wasn't/g, 'was not')
      .replace(/weren't/g, 'were not')
      .replace(/can't/g, 'cannot')
      .replace(/couldn't/g, 'could not')
      .replace(/shouldn't/g, 'should not')
      .replace(/wouldn't/g, 'would not')
  }

  // Helper functions for conjugation
  const getHaveHas = (pronoun) => {
    return (pronoun === "he" || pronoun === "she" || pronoun === "it") ? "has" : "have"
  }

  const getDoDoes = (pronoun) => {
    return (pronoun === "he" || pronoun === "she" || pronoun === "it") ? "does" : "do"
  }

  const getBeForm = (pronoun, time) => {
    if (time === "present") {
      if (pronoun === "I") return "am"
      if (pronoun === "he" || pronoun === "she" || pronoun === "it") return "is"
      return "are"
    } else { // past
      if (pronoun === "I" || pronoun === "he" || pronoun === "she" || pronoun === "it") return "was"
      return "were"
    }
  }

  const conjugateVerb = (verb, pronoun, time, verbTense, form) => {
    // Use Google Sheets data structure: V1, V1_3rd, V1_ing, V2, V3
    const verbForms = {
      V1: verb.base || verb.infinitive,
      V1_3rd: verb.third || verb.base || verb.infinitive,
      V1_ing: verb.gerund || `${verb.base || verb.infinitive}ing`,
      V2: verb.past || verb.base || verb.infinitive,
      V3: verb.participle || verb.base || verb.infinitive
    }

    // Helper function to get the base verb for negatives and questions
    const getBaseVerb = () => verbForms.V1

    // Affirmative sentences
    if (form === "affirmative") {
      switch(verbTense) {
        case "simple":
          if (time === "present") {
            return `${pronoun} ${(pronoun === "he" || pronoun === "she" || pronoun === "it") ? verbForms.V1_3rd : verbForms.V1}`
          } else if (time === "past") {
            return `${pronoun} ${verbForms.V2}`
          } else { // future
            return `${pronoun} will ${getBaseVerb()}`
          }

        case "continuous":
          if (time === "present") {
            return `${pronoun} ${getBeForm(pronoun, "present")} ${verbForms.V1_ing}`
          } else if (time === "past") {
            return `${pronoun} ${getBeForm(pronoun, "past")} ${verbForms.V1_ing}`
          } else { // future
            return `${pronoun} will be ${verbForms.V1_ing}`
          }

        case "perfect":
          if (time === "present") {
            return `${pronoun} ${getHaveHas(pronoun)} ${verbForms.V3}`
          } else if (time === "past") {
            return `${pronoun} had ${verbForms.V3}`
          } else { // future
            return `${pronoun} will have ${verbForms.V3}`
          }

        case "perfect continuous":
          if (time === "present") {
            return `${pronoun} ${getHaveHas(pronoun)} been ${verbForms.V1_ing}`
          } else if (time === "past") {
            return `${pronoun} had been ${verbForms.V1_ing}`
          } else { // future
            return `${pronoun} will have been ${verbForms.V1_ing}`
          }
      }
    }

    // Negative sentences
    else if (form === "negative") {
      switch(verbTense) {
        case "simple":
          if (time === "present") {
            return `${pronoun} ${getDoDoes(pronoun)} not ${getBaseVerb()}`
          } else if (time === "past") {
            return `${pronoun} did not ${getBaseVerb()}`
          } else { // future
            return `${pronoun} will not ${getBaseVerb()}`
          }

        case "continuous":
          if (time === "present") {
            return `${pronoun} ${getBeForm(pronoun, "present")} not ${verbForms.V1_ing}`
          } else if (time === "past") {
            return `${pronoun} ${getBeForm(pronoun, "past")} not ${verbForms.V1_ing}`
          } else { // future
            return `${pronoun} will not be ${verbForms.V1_ing}`
          }

        case "perfect":
          if (time === "present") {
            return `${pronoun} ${getHaveHas(pronoun)} not ${verbForms.V3}`
          } else if (time === "past") {
            return `${pronoun} had not ${verbForms.V3}`
          } else { // future
            return `${pronoun} will not have ${verbForms.V3}`
          }

        case "perfect continuous":
          if (time === "present") {
            return `${pronoun} ${getHaveHas(pronoun)} not been ${verbForms.V1_ing}`
          } else if (time === "past") {
            return `${pronoun} had not been ${verbForms.V1_ing}`
          } else { // future
            return `${pronoun} will not have been ${verbForms.V1_ing}`
          }
      }
    }

    // Questions
    else if (form === "question") {
      switch(verbTense) {
        case "simple":
          if (time === "present") {
            return `${getDoDoes(pronoun)} ${pronoun} ${getBaseVerb()}?`
          } else if (time === "past") {
            return `Did ${pronoun} ${getBaseVerb()}?`
          } else { // future
            return `Will ${pronoun} ${getBaseVerb()}?`
          }

        case "continuous":
          if (time === "present") {
            return `${getBeForm(pronoun, "present").charAt(0).toUpperCase() + getBeForm(pronoun, "present").slice(1)} ${pronoun} ${verbForms.V1_ing}?`
          } else if (time === "past") {
            return `${getBeForm(pronoun, "past").charAt(0).toUpperCase() + getBeForm(pronoun, "past").slice(1)} ${pronoun} ${verbForms.V1_ing}?`
          } else { // future
            return `Will ${pronoun} be ${verbForms.V1_ing}?`
          }

        case "perfect":
          if (time === "present") {
            return `${getHaveHas(pronoun).charAt(0).toUpperCase() + getHaveHas(pronoun).slice(1)} ${pronoun} ${verbForms.V3}?`
          } else if (time === "past") {
            return `Had ${pronoun} ${verbForms.V3}?`
          } else { // future
            return `Will ${pronoun} have ${verbForms.V3}?`
          }

        case "perfect continuous":
          if (time === "present") {
            return `${getHaveHas(pronoun).charAt(0).toUpperCase() + getHaveHas(pronoun).slice(1)} ${pronoun} been ${verbForms.V1_ing}?`
          } else if (time === "past") {
            return `Had ${pronoun} been ${verbForms.V1_ing}?`
          } else { // future
            return `Will ${pronoun} have been ${verbForms.V1_ing}?`
          }
      }
    }
  }

  const generateQuestion = () => {
    const verb = getRandomVerb()
    
    // Don't generate questions if no verbs are loaded
    if (!verb) {
      console.warn('Cannot generate question: no verbs loaded from Google Sheets')
      return
    }
    
    const pronoun = getRandomPronoun()
    const time = getRandomTime()
    const verbTense = getRandomVerbTense()
    const form = getRandomForm()
    
    const correctAnswer = conjugateVerb(verb, pronoun, time, verbTense, form)
    
    setCurrentGame(prev => ({
      ...prev,
      currentVerb: verb,
      currentPronoun: pronoun,
      currentTime: time,
      currentVerbTense: verbTense,
      currentForm: form,
      correctAnswer: correctAnswer
    }))
    
    setUserAnswer('')
    setShowFeedback(false)
    setFeedback('')
  }
  
  // Auto-focus the input when a new question is generated
  useEffect(() => {
    if (currentGame.currentVerb && !showFeedback && inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentGame.currentVerb, showFeedback])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    if (settings.gameMode === 'timed') {
      setTimeRemaining(60)
      setTimerActive(true)
    }
    generateQuestion()
  }

  const getEnhancedFeedback = (userAnswer, correctAnswer, combination) => {
    const { currentTime, currentVerbTense, currentForm } = combination
    
    // Form-specific guidance that accounts for sentence type
    if (currentForm === 'question') {
      if (currentVerbTense === 'perfect continuous') {
        if (currentTime === 'present') {
          return `Remember: Present Perfect Continuous Question = "Have/Has + pronoun + been + -ing?"`
        } else if (currentTime === 'past') {
          return `Remember: Past Perfect Continuous Question = "Had + pronoun + been + -ing?"`
        } else if (currentTime === 'future') {
          return `Remember: Future Perfect Continuous Question = "Will + pronoun + have + been + -ing?"`
        }
      }
      
      if (currentVerbTense === 'perfect') {
        if (currentTime === 'present') {
          return `Remember: Present Perfect Question = "Have/Has + pronoun + past participle?"`
        } else if (currentTime === 'past') {
          return `Remember: Past Perfect Question = "Had + pronoun + past participle?"`
        } else if (currentTime === 'future') {
          return `Remember: Future Perfect Question = "Will + pronoun + have + past participle?"`
        }
      }
      
      if (currentVerbTense === 'continuous') {
        if (currentTime === 'present') {
          return `Remember: Present Continuous Question = "Am/Is/Are + pronoun + -ing?"`
        } else if (currentTime === 'past') {
          return `Remember: Past Continuous Question = "Was/Were + pronoun + -ing?"`
        } else if (currentTime === 'future') {
          return `Remember: Future Continuous Question = "Will + pronoun + be + -ing?"`
        }
      }
      
      if (currentVerbTense === 'simple') {
        if (currentTime === 'present') {
          return `Remember: Present Simple Question = "Do/Does + pronoun + base form?"`
        } else if (currentTime === 'past') {
          return `Remember: Past Simple Question = "Did + pronoun + base form?"`
        } else if (currentTime === 'future') {
          return `Remember: Future Simple Question = "Will + pronoun + base form?"`
        }
      }
    }
    
    if (currentForm === 'negative') {
      if (currentVerbTense === 'perfect continuous') {
        if (currentTime === 'present') {
          return `Remember: Present Perfect Continuous Negative = "pronoun + have/has + not + been + -ing"`
        } else if (currentTime === 'past') {
          return `Remember: Past Perfect Continuous Negative = "pronoun + had + not + been + -ing"`
        } else if (currentTime === 'future') {
          return `Remember: Future Perfect Continuous Negative = "pronoun + will + not + have + been + -ing"`
        }
      }
      
      if (currentVerbTense === 'perfect') {
        if (currentTime === 'present') {
          return `Remember: Present Perfect Negative = "pronoun + have/has + not + past participle"`
        } else if (currentTime === 'past') {
          return `Remember: Past Perfect Negative = "pronoun + had + not + past participle"`
        } else if (currentTime === 'future') {
          return `Remember: Future Perfect Negative = "pronoun + will + not + have + past participle"`
        }
      }
      
      if (currentVerbTense === 'continuous') {
        if (currentTime === 'present') {
          return `Remember: Present Continuous Negative = "pronoun + am/is/are + not + -ing"`
        } else if (currentTime === 'past') {
          return `Remember: Past Continuous Negative = "pronoun + was/were + not + -ing"`
        } else if (currentTime === 'future') {
          return `Remember: Future Continuous Negative = "pronoun + will + not + be + -ing"`
        }
      }
      
      if (currentVerbTense === 'simple') {
        if (currentTime === 'present') {
          return `Remember: Present Simple Negative = "pronoun + do/does + not + base form"`
        } else if (currentTime === 'past') {
          return `Remember: Past Simple Negative = "pronoun + did + not + base form"`
        } else if (currentTime === 'future') {
          return `Remember: Future Simple Negative = "pronoun + will + not + base form"`
        }
      }
    }
    
    // Affirmative guidance
    if (currentForm === 'affirmative') {
      if (currentVerbTense === 'perfect continuous') {
        if (currentTime === 'present') {
          return `Remember: Present Perfect Continuous = "pronoun + have/has + been + -ing"`
        } else if (currentTime === 'past') {
          return `Remember: Past Perfect Continuous = "pronoun + had + been + -ing"`
        } else if (currentTime === 'future') {
          return `Remember: Future Perfect Continuous = "pronoun + will + have + been + -ing"`
        }
      }
      
      if (currentVerbTense === 'perfect') {
        if (currentTime === 'present') {
          return `Remember: Present Perfect = "pronoun + have/has + past participle"`
        } else if (currentTime === 'past') {
          return `Remember: Past Perfect = "pronoun + had + past participle"`
        } else if (currentTime === 'future') {
          return `Remember: Future Perfect = "pronoun + will + have + past participle"`
        }
      }
      
      if (currentVerbTense === 'continuous') {
        if (currentTime === 'present') {
          return `Remember: Present Continuous = "pronoun + am/is/are + -ing"`
        } else if (currentTime === 'past') {
          return `Remember: Past Continuous = "pronoun + was/were + -ing"`
        } else if (currentTime === 'future') {
          return `Remember: Future Continuous = "pronoun + will + be + -ing"`
        }
      }
      
      if (currentVerbTense === 'simple') {
        if (currentTime === 'present') {
          return `Remember: Present Simple = "pronoun + base form" (add -s for he/she/it)`
        } else if (currentTime === 'past') {
          return `Remember: Past Simple = "pronoun + past tense form"`
        } else if (currentTime === 'future') {
          return `Remember: Future Simple = "pronoun + will + base form"`
        }
      }
    }
    
    return `Incorrect. The correct answer is: "${correctAnswer}"`
  }

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback('Please enter an answer!')
      setShowFeedback(true)
      return
    }

    // Normalize both user answer and correct answer to handle contractions
    const normalizedUserAnswer = normalizeAnswer(userAnswer)
    const normalizedCorrectAnswer = normalizeAnswer(currentGame.correctAnswer)
    
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer
    
    if (isCorrect) {
      setCurrentGame(prev => ({
        ...prev,
        score: prev.score + 1,
        streak: prev.streak + 1,
        questionCount: prev.questionCount + 1
      }))
      setFeedback(`Correct! Well done! +${currentGame.streak + 1} points`)

      // Auto-advance to next question in timed mode
      if (settings.gameMode === 'timed') {
        setTimeout(() => {
          nextQuestion()
        }, 2000)
      }
    } else {
      setCurrentGame(prev => ({
        ...prev,
        streak: 0,
        questionCount: prev.questionCount + 1
      }))

      // Enhanced feedback with specific guidance
      const enhancedFeedback = getEnhancedFeedback(
        userAnswer,
        currentGame.correctAnswer,
        {
          currentTime: currentGame.currentTime,
          currentVerbTense: currentGame.currentVerbTense,
          currentForm: currentGame.currentForm
        }
      )

      setFeedback(`Incorrect. ${enhancedFeedback}`)
    }

    setShowFeedback(true)
  }

  const nextQuestion = () => {
    generateQuestion()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (showFeedback) {
        nextQuestion()
      } else {
        checkAnswer()
      }
    }
  }

  const resetGame = () => {
    setCurrentGame({
      score: 0,
      streak: 0,
      questionCount: 0,
      totalQuestions: 10,
      currentVerb: null,
      currentTense: 'present',
      currentPronoun: 'I'
    })
    setUserAnswer('')
    setFeedback('')
    setShowFeedback(false)
    setGameStarted(false)
    setTimerActive(false)
    setTimeRemaining(60)
    setGameOver(false)
  }

  if (isLoadingVerbs) {
    return (
      <div className="game-container">
        <nav className="nav">
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back to Games
          </button>
          <h1 className="nav-title">Verb Conjugation Game</h1>
          <div></div>
        </nav>
        <div className="game-header">
          <div className="game-header-content" style={{ textAlign: 'center' }}>
            <div className="game-icon" style={{ 
              background: '#ff6b6b',
              color: '#ffffff',
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)'
            }}>
              <Target size={40} />
            </div>
            <h1 className="game-title" style={{ fontSize: '48px', marginBottom: '16px' }}>Loading...</h1>
            <p className="game-subtitle" style={{ fontSize: '20px', marginBottom: '32px' }}>
              Loading verbs from Google Sheets...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className="game-container">
        <nav className="nav">
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back to Games
          </button>
          <h1 className="nav-title">Verb Conjugation Challenge</h1>
          <div></div>
        </nav>

      <div className="game-header">
        <div className="game-header-content">
          <div className="game-icon">
            <Target size={64} />
          </div>
          <p className="game-subtitle">Test your knowledge of English verb tenses</p>
          
          <div className="instructions-toggle">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
            </button>
          </div>
        </div>
      </div>

      {showInstructions && (
        <div className="game-instructions">
          <h3>How to Play</h3>
          <ol>
            <li>Click the buttons below to select which times, tenses, forms, and verb types you want to practice!</li>
            <li><strong>Time:</strong> Present, Past, or Future</li>
            <li><strong>Verb Tense:</strong> Simple, Continuous, Perfect, or Perfect Continuous</li>
            <li><strong>Form:</strong> Affirmative, Negative, or Question</li>
            <li><strong>Verb Type:</strong> Regular or Irregular verbs</li>
          </ol>
          
          <h4>Game Settings:</h4>
          <ul>
            <li>Click any button to select/deselect that option</li>
            <li>You can choose multiple options in each category</li>
            <li>Use "✓ All" buttons to quickly select everything</li>
            <li>At least one option must be selected in each category</li>
          </ul>
          
          <h4>Examples:</h4>
          <ul>
            <li><strong>Present Simple Affirmative:</strong> "he plays"</li>
            <li><strong>Past Continuous Negative:</strong> "they weren't playing" or "they were not playing"</li>
            <li><strong>Future Perfect Question:</strong> "Will she have played?"</li>
          </ul>
          
          <h4>Tips:</h4>
          <ul>
            <li>Both full forms (will not, is not) and contractions (won't, isn't) are accepted</li>
            <li>Don't forget the question mark (?) for questions</li>
            <li>Answers are not case sensitive</li>
            <li>Use Enter/Return to check your answer or go to next question</li>
          </ul>
        </div>
      )}

        <div className="game-controls">
          <div className="controls-header">
            <h2 className="controls-title">Game Settings</h2>
            <p className="controls-subtitle">Customize your practice session</p>
            <p className="controls-instructions">Click buttons to select/deselect options. You can choose multiple options in each category.</p>
          </div>

          {/* Challenge Presets */}
          <div className="controls-row" style={{ marginBottom: '24px' }}>
            <div className="control-group" style={{ width: '100%' }}>
              <label className="control-label">🎯 CHALLENGE PRESETS</label>
              <div className="button-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                <button
                  className="setting-button"
                  onClick={() => setSettings(prev => ({ ...prev, time: ['present'], tense: ['simple'], form: ['affirmative', 'negative', 'question'], gameMode: 'timed' }))}
                  style={{ fontSize: '14px', padding: '12px' }}
                >
                  Round 1: Present Simple<br /><span style={{ fontSize: '12px', opacity: 0.8 }}>⏱️ 1 min</span>
                </button>
                <button
                  className="setting-button"
                  onClick={() => setSettings(prev => ({ ...prev, time: ['past'], tense: ['simple'], form: ['affirmative', 'negative', 'question'], gameMode: 'timed' }))}
                  style={{ fontSize: '14px', padding: '12px' }}
                >
                  Round 2: Past Simple<br /><span style={{ fontSize: '12px', opacity: 0.8 }}>⏱️ 1 min</span>
                </button>
                <button
                  className="setting-button"
                  onClick={() => setSettings(prev => ({ ...prev, time: ['future'], tense: ['simple'], form: ['affirmative', 'negative', 'question'], gameMode: 'timed' }))}
                  style={{ fontSize: '14px', padding: '12px' }}
                >
                  Round 3: Future Simple<br /><span style={{ fontSize: '12px', opacity: 0.8 }}>⏱️ 1 min</span>
                </button>
                <button
                  className="setting-button"
                  onClick={() => setSettings(prev => ({ ...prev, time: ['present', 'past', 'future'], tense: ['simple'], form: ['affirmative', 'negative', 'question'], gameMode: 'timed' }))}
                  style={{ fontSize: '14px', padding: '12px' }}
                >
                  Round 4: All Simple<br /><span style={{ fontSize: '12px', opacity: 0.8 }}>⏱️ 1 min</span>
                </button>
                <button
                  className="setting-button"
                  onClick={() => setSettings(prev => ({ ...prev, time: ['present', 'past', 'future'], tense: ['continuous'], form: ['affirmative', 'negative', 'question'], gameMode: 'timed' }))}
                  style={{ fontSize: '14px', padding: '12px' }}
                >
                  Round 5: All Continuous<br /><span style={{ fontSize: '12px', opacity: 0.8 }}>⏱️ 1 min</span>
                </button>
                <button
                  className="setting-button"
                  onClick={() => setSettings(prev => ({ ...prev, time: ['present', 'past', 'future'], tense: ['perfect'], form: ['affirmative', 'negative', 'question'], gameMode: 'timed' }))}
                  style={{ fontSize: '14px', padding: '12px' }}
                >
                  Round 6: All Perfect<br /><span style={{ fontSize: '12px', opacity: 0.8 }}>⏱️ 1 min</span>
                </button>
                <button
                  className="setting-button"
                  onClick={() => setSettings(prev => ({ ...prev, time: ['present', 'past', 'future'], tense: ['simple', 'continuous', 'perfect', 'perfect continuous'], form: ['affirmative', 'negative', 'question'], gameMode: 'timed' }))}
                  style={{ fontSize: '14px', padding: '12px' }}
                >
                  Round 7: Master Challenge<br /><span style={{ fontSize: '12px', opacity: 0.8 }}>⏱️ 1 min</span>
                </button>
              </div>
            </div>
          </div>

          {/* Game Mode Selection */}
          <div className="controls-row" style={{ marginBottom: '24px' }}>
            <div className="control-group" style={{ width: '100%' }}>
              <label className="control-label">🎮 GAME MODE</label>
              <div className="button-group" style={{ display: 'flex', gap: '12px' }}>
                <button
                  className={`setting-button ${settings.gameMode === 'practice' ? 'active' : ''}`}
                  onClick={() => setSettings(prev => ({ ...prev, gameMode: 'practice' }))}
                  style={{ flex: 1, fontSize: '18px', padding: '16px' }}
                >
                  {settings.gameMode === 'practice' && '✓ '}Practice Mode
                  <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>Take your time, get detailed feedback</div>
                </button>
                <button
                  className={`setting-button ${settings.gameMode === 'timed' ? 'active' : ''}`}
                  onClick={() => setSettings(prev => ({ ...prev, gameMode: 'timed' }))}
                  style={{ flex: 1, fontSize: '18px', padding: '16px' }}
                >
                  {settings.gameMode === 'timed' && '✓ '}⏱️ Timed Mode (60s)
                  <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>Race the clock! Auto-advance after correct answers</div>
                </button>
              </div>
            </div>
          </div>

          <div className="controls-row">
            <div className="control-group">
              <label className="control-label">⏰ TIME</label>
              <div className="button-group">
                <button
                  className={`setting-button all-button ${['present', 'past', 'future'].every(time => settings.time.includes(time)) ? 'active' : ''}`}
                  onClick={() => toggleAll('time', ['present', 'past', 'future'])}
                >
                  ✓ All Times
                </button>
                {['present', 'past', 'future'].map(time => (
                  <button
                    key={time}
                    className={`setting-button ${settings.time.includes(time) ? 'active' : ''}`}
                    onClick={() => toggleSetting('time', time)}
                  >
                    {settings.time.includes(time) && '✓ '}{time}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="control-group">
              <label className="control-label">📚 TENSE</label>
              <div className="button-group">
                <button
                  className={`setting-button all-button ${['simple', 'continuous', 'perfect', 'perfect continuous'].every(tense => settings.tense.includes(tense)) ? 'active' : ''}`}
                  onClick={() => toggleAll('tense', ['simple', 'continuous', 'perfect', 'perfect continuous'])}
                >
                  ✓ All Tenses
                </button>
                {['simple', 'continuous', 'perfect', 'perfect continuous'].map(tense => (
                  <button
                    key={tense}
                    className={`setting-button ${settings.tense.includes(tense) ? 'active' : ''}`}
                    onClick={() => toggleSetting('tense', tense)}
                  >
                    {settings.tense.includes(tense) && '✓ '}{tense}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="controls-row">
            <div className="control-group">
              <label className="control-label">📝 FORM</label>
              <div className="button-group">
                <button
                  className={`setting-button all-button ${['affirmative', 'negative', 'question'].every(form => settings.form.includes(form)) ? 'active' : ''}`}
                  onClick={() => toggleAll('form', ['affirmative', 'negative', 'question'])}
                >
                  ✓ All Forms
                </button>
                {['affirmative', 'negative', 'question'].map(form => (
                  <button
                    key={form}
                    className={`setting-button ${settings.form.includes(form) ? 'active' : ''}`}
                    onClick={() => toggleSetting('form', form)}
                  >
                    {settings.form.includes(form) && '✓ '}{form}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="control-group">
              <label className="control-label">🔤 VERB TYPE</label>
              <div className="button-group">
                <button
                  className={`setting-button all-button ${['regular', 'irregular'].every(type => settings.verbType.includes(type)) ? 'active' : ''}`}
                  onClick={() => toggleAll('verbType', ['regular', 'irregular'])}
                >
                  ✓ All Types
                </button>
                {['regular', 'irregular'].map(type => (
                  <button
                    key={type}
                    className={`setting-button ${settings.verbType.includes(type) ? 'active' : ''}`}
                    onClick={() => toggleSetting('verbType', type)}
                  >
                    {settings.verbType.includes(type) && '✓ '}{type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button className="btn btn-primary" onClick={startGame}>
              Start Game
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="game-container">
      <nav className="nav">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Games
        </button>
        <h1 className="nav-title">Verb Conjugation Challenge</h1>
        <button className="btn btn-secondary" onClick={resetGame}>
          <RotateCcw size={20} />
          Change Game Settings
        </button>
      </nav>

      <div className="game-header" style={{ padding: '8px 0' }}>
        <div className="game-header-content" style={{ textAlign: 'center' }}>
          <div className="instructions-toggle">
            <button 
              className="btn btn-secondary"
              style={{ fontSize: '16px', padding: '12px 24px' }}
              onClick={() => setShowInstructions(!showInstructions)}
            >
              {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
            </button>
          </div>
        </div>
        
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-number">{currentGame.score}</span>
            <span className="stat-label">Score</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{currentGame.questionCount}</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{currentGame.streak}</span>
            <span className="stat-label">Streak</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{Math.round((currentGame.score / Math.max(currentGame.questionCount, 1)) * 100)}%</span>
            <span className="stat-label">Accuracy</span>
          </div>
          {settings.gameMode === 'timed' && (
            <div className="stat-item" style={{
              backgroundColor: timeRemaining <= 10 ? '#ff6b6b' : '#6366f1',
              color: 'white',
              transform: timeRemaining <= 10 ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}>
              <span className="stat-number" style={{ fontSize: timeRemaining <= 10 ? '36px' : '32px' }}>
                {timeRemaining}s
              </span>
              <span className="stat-label">Time Left</span>
            </div>
          )}
        </div>
      </div>

      {showInstructions && (
        <div className="game-instructions">
          <h3>How to Play</h3>
          <ol>
            <li>Click the buttons below to select which times, tenses, forms, and verb types you want to practice!</li>
            <li><strong>Time:</strong> Present, Past, or Future</li>
            <li><strong>Verb Tense:</strong> Simple, Continuous, Perfect, or Perfect Continuous</li>
            <li><strong>Form:</strong> Affirmative, Negative, or Question</li>
            <li><strong>Verb Type:</strong> Regular or Irregular verbs</li>
          </ol>
          
          <h4>Game Settings:</h4>
          <ul>
            <li>Click any button to select/deselect that option</li>
            <li>You can choose multiple options in each category</li>
            <li>Use "✓ All" buttons to quickly select everything</li>
            <li>At least one option must be selected in each category</li>
          </ul>
          
          <h4>Examples:</h4>
          <ul>
            <li><strong>Present Simple Affirmative:</strong> "he plays"</li>
            <li><strong>Past Continuous Negative:</strong> "they weren't playing" or "they were not playing"</li>
            <li><strong>Future Perfect Question:</strong> "Will she have played?"</li>
          </ul>
          
          <h4>Tips:</h4>
          <ul>
            <li>Both full forms (will not, is not) and contractions (won't, isn't) are accepted</li>
            <li>Don't forget the question mark (?) for questions</li>
            <li>Answers are not case sensitive</li>
            <li>Use Enter/Return to check your answer or go to next question</li>
          </ul>
        </div>
      )}

      {showFeedback && (
        <div className={`feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`} style={{ fontSize: '18px', padding: '16px 24px', margin: '16px auto', maxWidth: '600px', borderRadius: '8px' }}>
          {feedback}
        </div>
      )}

      {gameOver && settings.gameMode === 'timed' && (
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          maxWidth: '600px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(71, 85, 105, 0.3)',
          animation: 'fadeInScale 0.5s ease-out',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{ 
            fontSize: '48px', 
            marginBottom: '16px', 
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'slideDown 0.6s ease-out'
          }}>⏰ Time's Up!</h2>
          <div style={{ fontSize: '24px', marginBottom: '32px' }}>
            <div style={{ marginBottom: '16px', animation: 'fadeInUp 0.7s ease-out' }}>
              <span style={{ 
                fontSize: '64px', 
                fontWeight: 'bold', 
                color: '#10b981',
                textShadow: '0 4px 8px rgba(16, 185, 129, 0.3)',
                display: 'inline-block',
                animation: 'pulse 2s ease-in-out infinite'
              }}>{currentGame.score}</span>
              <div style={{ fontSize: '18px', color: '#cbd5e1', marginTop: '8px', fontWeight: '500' }}>Correct Answers</div>
            </div>
            <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', marginTop: '24px' }}>
              <div style={{ animation: 'fadeInLeft 0.8s ease-out' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f1f5f9' }}>{currentGame.questionCount}</div>
                <div style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>Total Questions</div>
              </div>
              <div style={{ animation: 'fadeInRight 0.8s ease-out' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f1f5f9' }}>{Math.round((currentGame.score / Math.max(currentGame.questionCount, 1)) * 100)}%</div>
                <div style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>Accuracy</div>
              </div>
            </div>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={resetGame} 
            style={{ 
              fontSize: '20px', 
              padding: '16px 32px',
              animation: 'fadeInUp 1s ease-out',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
            }}
          >
            Play Again
          </button>
        </div>
      )}

      {currentGame.currentVerb && !gameOver && (
        <div className="question-container">
          <div className="question-header">
            <h2 className="question-text" style={{ fontSize: '24px' }}>
              Conjugate: <strong style={{ textDecoration: 'underline', textDecorationColor: '#6366f1', textDecorationThickness: '3px' }}>{currentGame.currentVerb.infinitive}</strong>
            </h2>
            <div className="question-details">
              <div className="concept-group" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px',
                marginBottom: '12px'
              }}>
            <div className="tense-group" style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              <span className="detail-badge" style={{ 
                fontSize: '16px',
                backgroundColor: currentGame.currentTime === 'past' ? '#FFCDD2' : 
                                currentGame.currentTime === 'present' ? '#C8E6C9' : '#B3E5FC',
                color: '#333333',
                padding: '6px 12px',
                borderRadius: '8px',
                border: currentGame.currentTime === 'past' ? '1px solid #EF9A9A' : 
                        currentGame.currentTime === 'present' ? '1px solid #A5D6A7' : '1px solid #81D4FA',
                fontWeight: '700',
                textAlign: 'center',
                display: 'block',
                width: '100%'
              }}>
                {currentGame.currentTime.charAt(0).toUpperCase() + currentGame.currentTime.slice(1)} {currentGame.currentVerbTense.charAt(0).toUpperCase() + currentGame.currentVerbTense.slice(1)}
              </span>
            </div>
            <div className="form-group" style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              <span className="detail-badge" style={{ 
                fontSize: '16px',
                backgroundColor: '#E1BEE7',
                color: '#333333',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CE93D8',
                fontWeight: '500'
              }}>
                <strong>Pronoun:</strong> {currentGame.currentPronoun}
              </span>
              <span className="detail-badge" style={{ 
                fontSize: '16px',
                backgroundColor: currentGame.currentForm === 'affirmative' ? '#FFF9C4' : 
                                currentGame.currentForm === 'negative' ? '#FFCDD2' : '#FFE0B2',
                color: '#333333',
                padding: '6px 12px',
                borderRadius: '8px',
                border: currentGame.currentForm === 'affirmative' ? '1px solid #FFECB3' : 
                        currentGame.currentForm === 'negative' ? '1px solid #EF9A9A' : '1px solid #FFCC80',
                fontWeight: '500'
              }}>
                <strong>Form:</strong> {forms[currentGame.currentForm]}
              </span>
            </div>
              </div>
            </div>
          </div>
          
          <input
            ref={inputRef}
            type="text"
            className="answer-input"
            style={{ fontSize: '18px', padding: '12px' }}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your answer..."
            disabled={showFeedback && feedback.includes('Correct')}
          />
          
          <div className="question-actions">
            <button
              className="btn btn-primary"
              style={{ fontSize: '16px', padding: '12px 24px' }}
              onClick={checkAnswer}
              disabled={showFeedback && feedback.includes('Correct')}
            >
              Check Answer
            </button>
            {showFeedback && settings.gameMode === 'practice' && (
              <button className="btn btn-secondary" style={{ fontSize: '16px', padding: '12px 24px' }} onClick={nextQuestion}>
                Next Question →
              </button>
            )}
            {showFeedback && settings.gameMode === 'timed' && feedback.includes('Correct') && (
              <div style={{ fontSize: '16px', color: '#666', padding: '12px 24px' }}>
                Next question in 3 seconds...
              </div>
            )}
            {showFeedback && settings.gameMode === 'timed' && !feedback.includes('Correct') && (
              <button className="btn btn-secondary" style={{ fontSize: '16px', padding: '12px 24px' }} onClick={nextQuestion}>
                Next Question →
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default VerbConjugationGame