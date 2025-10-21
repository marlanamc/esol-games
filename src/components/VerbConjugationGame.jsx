import React, { useState, useEffect } from 'react'
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
    time: 'All Times',
    tense: 'All Tenses', 
    form: 'All Forms',
    verbType: 'All Verbs'
  })
  const [googleVerbs, setGoogleVerbs] = useState([])
  const [isLoadingVerbs, setIsLoadingVerbs] = useState(true)

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

  const verbs = {
    regular: [
      { infinitive: 'play', past: 'played', participle: 'played' },
      { infinitive: 'work', past: 'worked', participle: 'worked' },
      { infinitive: 'study', past: 'studied', participle: 'studied' },
      { infinitive: 'help', past: 'helped', participle: 'helped' },
      { infinitive: 'talk', past: 'talked', participle: 'talked' },
      { infinitive: 'watch', past: 'watched', participle: 'watched' },
      { infinitive: 'listen', past: 'listened', participle: 'listened' },
      { infinitive: 'learn', past: 'learned', participle: 'learned' },
      { infinitive: 'teach', past: 'taught', participle: 'taught' }
    ],
    irregular: [
      { infinitive: 'go', past: 'went', participle: 'gone' },
      { infinitive: 'be', past: 'was/were', participle: 'been' },
      { infinitive: 'have', past: 'had', participle: 'had' },
      { infinitive: 'do', past: 'did', participle: 'done' },
      { infinitive: 'see', past: 'saw', participle: 'seen' },
      { infinitive: 'eat', past: 'ate', participle: 'eaten' },
      { infinitive: 'drink', past: 'drank', participle: 'drunk' },
      { infinitive: 'sleep', past: 'slept', participle: 'slept' },
      { infinitive: 'write', past: 'wrote', participle: 'written' },
      { infinitive: 'drive', past: 'drove', participle: 'driven' },
      { infinitive: 'take', past: 'took', participle: 'taken' },
      { infinitive: 'give', past: 'gave', participle: 'given' },
      { infinitive: 'make', past: 'made', participle: 'made' },
      { infinitive: 'know', past: 'knew', participle: 'known' },
      { infinitive: 'think', past: 'thought', participle: 'thought' }
    ]
  }

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
    // Use Google Sheets data if available, otherwise fall back to hardcoded data
    if (googleVerbs.length > 0) {
      return googleVerbs[Math.floor(Math.random() * googleVerbs.length)]
    }
    
    const verbType = settings.verbType === 'All Verbs' ? 
      (Math.random() > 0.5 ? 'regular' : 'irregular') :
      settings.verbType.toLowerCase().replace(' verbs', '')
    
    const verbList = verbs[verbType] || verbs.regular
    return verbList[Math.floor(Math.random() * verbList.length)]
  }

  const getRandomTime = () => {
    const times = ["present", "past", "future"]
    
    if (settings.time !== 'All Times') {
      const timeMap = {
        'Present': 'present',
        'Past': 'past', 
        'Future': 'future'
      }
      return timeMap[settings.time] || 'present'
    }
    
    return times[Math.floor(Math.random() * times.length)]
  }

  const getRandomVerbTense = () => {
    const verbTenses = ["simple", "continuous", "perfect", "perfect continuous"]
    
    if (settings.tense !== 'All Tenses') {
      const tenseMap = {
        'Present Simple': 'simple',
        'Past Simple': 'simple',
        'Future Simple': 'simple',
        'Present Continuous': 'continuous',
        'Past Continuous': 'continuous',
        'Future Continuous': 'continuous',
        'Present Perfect': 'perfect',
        'Past Perfect': 'perfect',
        'Future Perfect': 'perfect',
        'Present Perfect Continuous': 'perfect continuous',
        'Past Perfect Continuous': 'perfect continuous',
        'Future Perfect Continuous': 'perfect continuous'
      }
      return tenseMap[settings.tense] || 'simple'
    }
    
    return verbTenses[Math.floor(Math.random() * verbTenses.length)]
  }

  const getRandomPronoun = () => {
    const pronounList = ["he", "she", "it", "they", "we", "I", "you"]
    return pronounList[Math.floor(Math.random() * pronounList.length)]
  }

  const getRandomForm = () => {
    if (settings.form === 'All Forms') {
      const formKeys = Object.keys(forms)
      return formKeys[Math.floor(Math.random() * formKeys.length)]
    }
    return settings.form.toLowerCase()
  }

  const normalizeAnswer = (answer) => {
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

  const startGame = () => {
    setGameStarted(true)
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
    
    // Debug logging
    console.log('User answer:', userAnswer)
    console.log('Correct answer:', currentGame.correctAnswer)
    console.log('Normalized user:', normalizedUserAnswer)
    console.log('Normalized correct:', normalizedCorrectAnswer)
    
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer
    
    if (isCorrect) {
      setCurrentGame(prev => ({
        ...prev,
        score: prev.score + 1,
        streak: prev.streak + 1,
        questionCount: prev.questionCount + 1
      }))
      setFeedback(`Correct! Well done! +${currentGame.streak + 1} points`)
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
            <li>Select the options from the dropdown menus or challenge yourself to any time, tense, or form!</li>
            <li><strong>Time:</strong> Present, Past, or Future</li>
            <li><strong>Verb Tense:</strong> Simple, Continuous, Perfect, or Perfect Continuous</li>
            <li><strong>Form:</strong> Affirmative, Negative, or Question</li>
          </ol>
          
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
          </div>
          
          <div className="controls-row">
            <div className="control-group">
              <label className="control-label" style={{ color: '#FF6B6B' }}>⏰ TIME</label>
              <select 
                className="esol-select"
                style={{ backgroundColor: '#FF6B6B20', borderColor: '#FF6B6B' }}
                value={settings.time}
                onChange={(e) => setSettings(prev => ({ ...prev, time: e.target.value }))}
              >
                <option value="All Times">All Times</option>
                <option value="Present">Present</option>
                <option value="Past">Past</option>
                <option value="Future">Future</option>
              </select>
            </div>
            
            <div className="control-group">
              <label className="control-label" style={{ color: '#4ECDC4' }}>📚 TENSE</label>
              <select 
                className="esol-select"
                style={{ backgroundColor: '#4ECDC420', borderColor: '#4ECDC4' }}
                value={settings.tense}
                onChange={(e) => setSettings(prev => ({ ...prev, tense: e.target.value }))}
              >
                <option value="All Tenses">All Tenses</option>
                <option value="Present Simple">Present Simple</option>
                <option value="Past Simple">Past Simple</option>
                <option value="Future Simple">Future Simple</option>
                <option value="Present Continuous">Present Continuous</option>
                <option value="Past Continuous">Past Continuous</option>
                <option value="Present Perfect">Present Perfect</option>
                <option value="Past Perfect">Past Perfect</option>
                <option value="Future Perfect">Future Perfect</option>
                <option value="Present Perfect Continuous">Present Perfect Continuous</option>
                <option value="Past Perfect Continuous">Past Perfect Continuous</option>
                <option value="Future Perfect Continuous">Future Perfect Continuous</option>
              </select>
            </div>
          </div>
          
          <div className="controls-row">
            <div className="control-group">
              <label className="control-label" style={{ color: '#45B7D1' }}>📝 FORM</label>
              <select 
                className="esol-select"
                style={{ backgroundColor: '#45B7D120', borderColor: '#45B7D1' }}
                value={settings.form}
                onChange={(e) => setSettings(prev => ({ ...prev, form: e.target.value }))}
              >
                <option value="All Forms">All Forms</option>
                <option value="Affirmative">Affirmative</option>
                <option value="Negative">Negative</option>
                <option value="Question">Question</option>
              </select>
            </div>
            
            <div className="control-group">
              <label className="control-label" style={{ color: '#96CEB4' }}>🔤 VERB TYPE</label>
              <select 
                className="esol-select"
                style={{ backgroundColor: '#96CEB420', borderColor: '#96CEB4' }}
                value={settings.verbType}
                onChange={(e) => setSettings(prev => ({ ...prev, verbType: e.target.value }))}
              >
                <option value="All Verbs">All Verbs</option>
                <option value="Regular Verbs">Regular Verbs</option>
                <option value="Irregular Verbs">Irregular Verbs</option>
              </select>
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
          Reset Game
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
        </div>
      </div>

      {showInstructions && (
        <div className="game-instructions">
          <h3>How to Play</h3>
          <ol>
            <li>Select the options from the dropdown menus or challenge yourself to any time, tense, or form!</li>
            <li><strong>Time:</strong> Present, Past, or Future</li>
            <li><strong>Verb Tense:</strong> Simple, Continuous, Perfect, or Perfect Continuous</li>
            <li><strong>Form:</strong> Affirmative, Negative, or Question</li>
          </ol>
          
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

      {currentGame.currentVerb && (
        <div className="question-container">
          <div className="question-header">
            <h2 className="question-text" style={{ fontSize: '24px' }}>
              Conjugate: <strong>{currentGame.currentVerb.infinitive}</strong>
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
            {showFeedback && (
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