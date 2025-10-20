import React, { useState, useEffect } from 'react'
import { BookOpen, ArrowLeft, RotateCcw } from 'lucide-react'

const VerbFormsGame = ({ onBack }) => {
  const [currentGame, setCurrentGame] = useState({
    score: 0,
    streak: 0,
    questionCount: 0,
    totalQuestions: 10,
    currentVerb: null,
    currentQuestionType: 'base'
  })
  
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [settings, setSettings] = useState({
    difficulty: 'Easy',
    verbType: 'All Verbs'
  })
  const [verbsData, setVerbsData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load verbs from Google Sheets
  useEffect(() => {
    const loadVerbsFromGoogleSheets = async () => {
      try {
        const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSnWBs92Jmx16VHpbXQECyZ5gK6G-oHSQpsGNB569Hh5PPTGgx4_6U-27ScOmJMdl2XRNifF_FClBqC/pub?output=csv'
        const response = await fetch(googleSheetUrl)
        const csvText = await response.text()
        
        // Parse CSV
        const lines = csvText.split('\n')
        const headers = lines[0].split(',')
        const verbs = []
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (line) {
            const values = line.split(',')
            if (values.length >= 5) {
              verbs.push({
                base: values[0].trim(),
                third: values[1].trim(),
                gerund: values[2].trim(),
                past: values[3].trim(),
                participle: values[4].trim(),
                infinitive: `to ${values[0].trim()}`
              })
            }
          }
        }
        
        setVerbsData(verbs)
        setLoading(false)
      } catch (error) {
        console.error('Error loading verbs from Google Sheets:', error)
        setLoading(false)
      }
    }
    
    loadVerbsFromGoogleSheets()
  }, [])

  const verbs = {
    regular: [
      { base: 'play', third: 'plays', past: 'played', participle: 'played', gerund: 'playing', infinitive: 'to play' },
      { base: 'work', third: 'works', past: 'worked', participle: 'worked', gerund: 'working', infinitive: 'to work' },
      { base: 'study', third: 'studies', past: 'studied', participle: 'studied', gerund: 'studying', infinitive: 'to study' },
      { base: 'help', third: 'helps', past: 'helped', participle: 'helped', gerund: 'helping', infinitive: 'to help' },
      { base: 'talk', third: 'talks', past: 'talked', participle: 'talked', gerund: 'talking', infinitive: 'to talk' },
      { base: 'watch', third: 'watches', past: 'watched', participle: 'watched', gerund: 'watching', infinitive: 'to watch' },
      { base: 'listen', third: 'listens', past: 'listened', participle: 'listened', gerund: 'listening', infinitive: 'to listen' },
      { base: 'learn', third: 'learns', past: 'learned', participle: 'learned', gerund: 'learning', infinitive: 'to learn' }
    ],
    irregular: [
      { base: 'go', third: 'goes', past: 'went', participle: 'gone', gerund: 'going', infinitive: 'to go' },
      { base: 'be', third: 'is', past: 'was/were', participle: 'been', gerund: 'being', infinitive: 'to be' },
      { base: 'have', third: 'has', past: 'had', participle: 'had', gerund: 'having', infinitive: 'to have' },
      { base: 'do', third: 'does', past: 'did', participle: 'done', gerund: 'doing', infinitive: 'to do' },
      { base: 'see', third: 'sees', past: 'saw', participle: 'seen', gerund: 'seeing', infinitive: 'to see' },
      { base: 'eat', third: 'eats', past: 'ate', participle: 'eaten', gerund: 'eating', infinitive: 'to eat' },
      { base: 'drink', third: 'drinks', past: 'drank', participle: 'drunk', gerund: 'drinking', infinitive: 'to drink' },
      { base: 'sleep', third: 'sleeps', past: 'slept', participle: 'slept', gerund: 'sleeping', infinitive: 'to sleep' },
      { base: 'write', third: 'writes', past: 'wrote', participle: 'written', gerund: 'writing', infinitive: 'to write' },
      { base: 'drive', third: 'drives', past: 'drove', participle: 'driven', gerund: 'driving', infinitive: 'to drive' },
      { base: 'take', third: 'takes', past: 'took', participle: 'taken', gerund: 'taking', infinitive: 'to take' },
      { base: 'give', third: 'gives', past: 'gave', participle: 'given', gerund: 'giving', infinitive: 'to give' },
      { base: 'make', third: 'makes', past: 'made', participle: 'made', gerund: 'making', infinitive: 'to make' },
      { base: 'know', third: 'knows', past: 'knew', participle: 'known', gerund: 'knowing', infinitive: 'to know' },
      { base: 'think', third: 'thinks', past: 'thought', participle: 'thought', gerund: 'thinking', infinitive: 'to think' }
    ]
  }

  const questionTypes = {
    base: { display: 'Base Form (V1)', field: 'base', description: 'The basic form of the verb' },
    past: { display: 'Past Simple (V2)', field: 'past', description: 'Used for completed actions in the past' },
    participle: { display: 'Past Participle (V3)', field: 'participle', description: 'Used with have/has/had' },
    gerund: { display: 'Gerund (-ing)', field: 'gerund', description: 'Used as noun or with be + -ing' },
    infinitive: { display: 'Infinitive (to +)', field: 'infinitive', description: 'Used after modal verbs or as noun' }
  }

  const getRandomVerb = () => {
    // Use Google Sheets data if available, otherwise fall back to hardcoded data
    if (verbsData && verbsData.length > 0) {
      return verbsData[Math.floor(Math.random() * verbsData.length)]
    }
    
    // Fallback to hardcoded data
    const verbType = settings.verbType === 'All Verbs' ? 
      (Math.random() > 0.5 ? 'regular' : 'irregular') :
      settings.verbType.toLowerCase().replace(' verbs', '')
    
    const verbList = verbs[verbType] || verbs.regular
    return verbList[Math.floor(Math.random() * verbList.length)]
  }

  const getRandomQuestionType = () => {
    // Check difficulty setting first
    if (settings.difficulty === 'Only V1') return 'base'
    if (settings.difficulty === 'Only V1-3rd') return 'base' // We'll handle 3rd person in the question display
    if (settings.difficulty === 'Only V1-ing') return 'gerund'
    if (settings.difficulty === 'Only V2') return 'past'
    if (settings.difficulty === 'Only V3') return 'participle'
    
    // Default: random question type
    const typeKeys = Object.keys(questionTypes)
    return typeKeys[Math.floor(Math.random() * typeKeys.length)]
  }

  const generateQuestion = () => {
    const verb = getRandomVerb()
    
    // Determine which forms to show based on difficulty
    let formsToShow = []
    let formsToHide = []
    
    if (settings.difficulty === 'Easy') {
      // Show 4 forms, hide 1 random form
      formsToShow = ['base', 'third', 'past', 'participle', 'gerund']
      const randomIndex = Math.floor(Math.random() * formsToShow.length)
      formsToHide = [formsToShow[randomIndex]]
      formsToShow.splice(randomIndex, 1)
    } else if (settings.difficulty === 'Medium') {
      // Show 3 forms, hide 2 random forms
      formsToShow = ['base', 'third', 'past', 'participle', 'gerund']
      const shuffled = formsToShow.sort(() => 0.5 - Math.random())
      formsToShow = shuffled.slice(0, 3)
      formsToHide = shuffled.slice(3)
    } else if (settings.difficulty === 'Hard') {
      // Show 2 forms, hide 3 random forms
      formsToShow = ['base', 'third', 'past', 'participle', 'gerund']
      const shuffled = formsToShow.sort(() => 0.5 - Math.random())
      formsToShow = shuffled.slice(0, 2)
      formsToHide = shuffled.slice(2)
    } else if (settings.difficulty === 'Only V1' || settings.difficulty === 'Only V1-3rd' || settings.difficulty === 'Only V1-ing' || settings.difficulty === 'Only V2' || settings.difficulty === 'Only V3') {
      // Specific form focus - show all forms EXCEPT the selected one
      const formFocusMap = {
        'Only V1': ['third', 'past', 'participle', 'gerund'], // Hide V1, show others
        'Only V1-3rd': ['base', 'past', 'participle', 'gerund'], // Hide V1-3rd, show others
        'Only V1-ing': ['base', 'third', 'past', 'participle'], // Hide V1-ing, show others
        'Only V2': ['base', 'third', 'participle', 'gerund'], // Hide V2, show others
        'Only V3': ['base', 'third', 'past', 'gerund'] // Hide V3, show others
      }
      formsToShow = formFocusMap[settings.difficulty] || ['base', 'third', 'past', 'participle', 'gerund']
      formsToHide = ['base', 'third', 'past', 'participle', 'gerund'].filter(f => !formsToShow.includes(f))
    } else {
      // Default: show all forms
      formsToShow = ['base', 'third', 'past', 'participle', 'gerund']
      formsToHide = []
    }
    
    // Generate correct answers for hidden forms
    const correctAnswers = {}
    formsToHide.forEach(form => {
      if (form === 'base') {
        correctAnswers[form] = verb.base
      } else if (form === 'third') {
        // Use the correct V1-3rd form from verb data
        correctAnswers[form] = verb.third || verb.base + 's'
      } else if (form === 'past') {
        correctAnswers[form] = verb.past
      } else if (form === 'participle') {
        correctAnswers[form] = verb.participle
      } else if (form === 'gerund') {
        correctAnswers[form] = verb.gerund
      } else if (form === 'infinitive') {
        correctAnswers[form] = verb.infinitive
      }
    })
    
    setCurrentGame(prev => ({
      ...prev,
      currentVerb: verb,
      formsToShow: formsToShow,
      formsToHide: formsToHide,
      correctAnswers: correctAnswers,
      userAnswers: {}
    }))
    
    setUserAnswer('')
    setShowFeedback(false)
    setFeedback('')
  }

  const startGame = () => {
    setGameStarted(true)
    generateQuestion()
  }

  const checkAnswer = () => {
    const userAnswers = currentGame.userAnswers || {}
    const correctAnswers = currentGame.correctAnswers || {}
    
    // Check if all required fields are filled
    const requiredFields = currentGame.formsToHide || []
    const emptyFields = requiredFields.filter(field => !userAnswers[field] || !userAnswers[field].trim())
    
    // Debug logging
    console.log('Required fields:', requiredFields)
    console.log('User answers:', userAnswers)
    console.log('Empty fields:', emptyFields)
    
    if (emptyFields.length > 0) {
      setFeedback(`Please fill in all the missing forms! Missing: ${emptyFields.join(', ')}`)
      setShowFeedback(true)
      return
    }

    // Check each answer
    let correctCount = 0
    let totalCount = requiredFields.length
    let incorrectAnswers = []
    
    requiredFields.forEach(field => {
      const userAnswer = userAnswers[field].toLowerCase().trim()
      const correctAnswer = correctAnswers[field].toLowerCase().trim()
      
      if (userAnswer === correctAnswer) {
        correctCount++
      } else {
        incorrectAnswers.push(`${field}: "${correctAnswers[field]}"`)
      }
    })
    
    const isFullyCorrect = correctCount === totalCount
    
    if (isFullyCorrect) {
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
      setFeedback(`Incorrect. Correct answers: ${incorrectAnswers.join(', ')}`)
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
    } else if (e.key === 'ArrowRight') {
      nextQuestion()
    }
  }

  const resetGame = () => {
    setCurrentGame({
      score: 0,
      streak: 0,
      questionCount: 0,
      totalQuestions: 10,
      currentVerb: null,
      currentQuestionType: 'base'
    })
    setUserAnswer('')
    setFeedback('')
    setShowFeedback(false)
    setGameStarted(false)
  }

  if (!gameStarted) {
    return (
      <div className="game-container">
        <nav className="nav">
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back to Games
          </button>
          <h1 className="nav-title">All Verb Form Master</h1>
          <div></div>
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
        </div>

        {showInstructions && (
          <div className="game-instructions">
            <h3>How to Play</h3>
            <ol>
              <li>Select the <strong>Difficulty</strong> level:
                <ul>
                  <li><strong>Easy:</strong> Only one blank space</li>
                  <li><strong>Medium:</strong> Three blanks</li>
                  <li><strong>Hard:</strong> Four blanks</li>
                  <li>Or choose to focus on one specific verb form</li>
                </ul>
              </li>
            </ol>
            
            <h4>Verb Forms Explained</h4>
            <ul>
              <li><strong>V1:</strong> Base form (e.g., "accept")</li>
              <li><strong>V1-3rd:</strong> Third person singular (e.g., "accepts")</li>
              <li><strong>V1-ing:</strong> Present participle (e.g., "accepting")</li>
              <li><strong>V2:</strong> Past simple (e.g., "accepted")</li>
              <li><strong>V3:</strong> Past participle (e.g., "accepted")</li>
            </ul>
            
            <div className="verb-forms-table">
              <h3>Verb Forms Reference</h3>
              <table className="esol-table">
                <thead>
                  <tr>
                    <th>Form</th>
                    <th>Example</th>
                    <th>Usage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>V1 (Base Form)</strong></td>
                    <td>play</td>
                    <td>I play, you play, we play, they play</td>
                  </tr>
                  <tr>
                    <td><strong>V1-3rd (3rd Person Singular)</strong></td>
                    <td>plays</td>
                    <td>he plays, she plays, it plays</td>
                  </tr>
                  <tr>
                    <td><strong>V1-ing (Present Participle)</strong></td>
                    <td>playing</td>
                    <td>I am playing, continuous tenses</td>
                  </tr>
                  <tr>
                    <td><strong>V2 (Past Simple)</strong></td>
                    <td>played</td>
                    <td>I played yesterday</td>
                  </tr>
                  <tr>
                    <td><strong>V3 (Past Participle)</strong></td>
                    <td>played</td>
                    <td>I have played, perfect tenses</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="game-controls">
          <div className="controls-header">
            <h2 className="controls-title">Game Settings</h2>
            <p className="controls-subtitle">Customize your practice session</p>
          </div>
          
          <div className="controls-row">
            <div className="control-group">
              <label className="control-label" style={{ color: '#FF6B6B' }}>🎯 DIFFICULTY</label>
              <select 
                className="esol-select"
                style={{ backgroundColor: '#FF6B6B20', borderColor: '#FF6B6B' }}
                value={settings.difficulty}
                onChange={(e) => setSettings(prev => ({ ...prev, difficulty: e.target.value }))}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Only V1">Only V1</option>
                <option value="Only V1-3rd">Only V1-3rd</option>
                <option value="Only V1-ing">Only V1-ing</option>
                <option value="Only V2">Only V2</option>
                <option value="Only V3">Only V3</option>
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

  if (loading) {
    return (
      <div className="game-container">
        <nav className="nav">
          <button className="btn btn-secondary" onClick={onBack}>
            <ArrowLeft size={20} />
            Back to Games
          </button>
          <h1 className="nav-title">All Verb Form Master</h1>
        </nav>
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
          Loading verbs from Google Sheets...
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
        <h1 className="nav-title">All Verb Form Master</h1>
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
              <li>Select the <strong>Difficulty</strong> level:
                <ul>
                  <li><strong>Easy:</strong> Only one blank space</li>
                  <li><strong>Medium:</strong> Three blanks</li>
                  <li><strong>Hard:</strong> Four blanks</li>
                  <li>Or choose to focus on one specific verb form</li>
                </ul>
              </li>
            </ol>
            
            <h4>Verb Forms Explained</h4>
            <ul>
              <li><strong>V1:</strong> Base form (e.g., "accept")</li>
              <li><strong>V1-3rd:</strong> Third person singular (e.g., "accepts")</li>
              <li><strong>V1-ing:</strong> Present participle (e.g., "accepting")</li>
              <li><strong>V2:</strong> Past simple (e.g., "accepted")</li>
              <li><strong>V3:</strong> Past participle (e.g., "accepted")</li>
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
            <h2 className="question-text" style={{ fontSize: '24px', textAlign: 'center', marginBottom: '24px' }}>
              Complete the verb forms for: <strong>{currentGame.currentVerb.base}</strong>
            </h2>
          </div>
          
          <div className="verb-forms-grid">
            {/* V1 (Base Form) */}
            <div className="form-card" style={{ textAlign: 'center', padding: '16px', backgroundColor: '#E9B2AC', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px', fontWeight: 'bold' }}>V1</div>
              {currentGame.formsToShow.includes('base') ? (
                <div style={{ fontSize: '18px', color: '#000000' }}>{currentGame.currentVerb.base}</div>
              ) : (
                <input
                  type="text"
                  style={{ fontSize: '16px', padding: '8px', width: '100%', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '4px', color: '#000000' }}
                  value={currentGame.userAnswers?.base || ''}
                  onChange={(e) => setCurrentGame(prev => ({
                    ...prev,
                    userAnswers: { ...prev.userAnswers, base: e.target.value }
                  }))}
                  onKeyPress={handleKeyPress}
                  placeholder="V1"
                  disabled={showFeedback}
                />
              )}
            </div>

            {/* V1-3rd (Third Person Singular) */}
            <div className="form-card" style={{ textAlign: 'center', padding: '16px', backgroundColor: '#E8C498', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px', fontWeight: 'bold' }}>V1-3rd</div>
              {currentGame.formsToShow.includes('third') ? (
                <div style={{ fontSize: '18px', color: '#000000' }}>
                  {currentGame.currentVerb.third}
                </div>
              ) : (
                <input
                  type="text"
                  style={{ fontSize: '16px', padding: '8px', width: '100%', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '4px', color: '#000000' }}
                  value={currentGame.userAnswers?.third || ''}
                  onChange={(e) => setCurrentGame(prev => ({
                    ...prev,
                    userAnswers: { ...prev.userAnswers, third: e.target.value }
                  }))}
                  onKeyPress={handleKeyPress}
                  placeholder="V1-3rd"
                  disabled={showFeedback}
                />
              )}
            </div>

            {/* V1-ing (Gerund) */}
            <div className="form-card" style={{ textAlign: 'center', padding: '16px', backgroundColor: '#E5E097', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px', fontWeight: 'bold' }}>V1-ing</div>
              {currentGame.formsToShow.includes('gerund') ? (
                <div style={{ fontSize: '18px', color: '#000000' }}>{currentGame.currentVerb.gerund}</div>
              ) : (
                <input
                  type="text"
                  style={{ fontSize: '16px', padding: '8px', width: '100%', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '4px', color: '#000000' }}
                  value={currentGame.userAnswers?.gerund || ''}
                  onChange={(e) => setCurrentGame(prev => ({
                    ...prev,
                    userAnswers: { ...prev.userAnswers, gerund: e.target.value }
                  }))}
                  onKeyPress={handleKeyPress}
                  placeholder="V1-ing"
                  disabled={showFeedback}
                />
              )}
            </div>

            {/* V2 (Past Simple) */}
            <div className="form-card" style={{ textAlign: 'center', padding: '16px', backgroundColor: '#B0CF96', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px', fontWeight: 'bold' }}>V2</div>
              {currentGame.formsToShow.includes('past') ? (
                <div style={{ fontSize: '18px', color: '#000000' }}>{currentGame.currentVerb.past}</div>
              ) : (
                <input
                  type="text"
                  style={{ fontSize: '16px', padding: '8px', width: '100%', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '4px', color: '#000000' }}
                  value={currentGame.userAnswers?.past || ''}
                  onChange={(e) => setCurrentGame(prev => ({
                    ...prev,
                    userAnswers: { ...prev.userAnswers, past: e.target.value }
                  }))}
                  onKeyPress={handleKeyPress}
                  placeholder="V2"
                  disabled={showFeedback}
                />
              )}
            </div>

            {/* V3 (Past Participle) */}
            <div className="form-card" style={{ textAlign: 'center', padding: '16px', backgroundColor: '#9EC9AC', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: '#000000', marginBottom: '8px', fontWeight: 'bold' }}>V3</div>
              {currentGame.formsToShow.includes('participle') ? (
                <div style={{ fontSize: '18px', color: '#000000' }}>{currentGame.currentVerb.participle}</div>
              ) : (
                <input
                  type="text"
                  style={{ fontSize: '16px', padding: '8px', width: '100%', textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '4px', color: '#000000' }}
                  value={currentGame.userAnswers?.participle || ''}
                  onChange={(e) => setCurrentGame(prev => ({
                    ...prev,
                    userAnswers: { ...prev.userAnswers, participle: e.target.value }
                  }))}
                  onKeyPress={handleKeyPress}
                  placeholder="V3"
                  disabled={showFeedback}
                />
              )}
            </div>
          </div>
          
          <div className="question-actions" style={{ textAlign: 'center' }}>
            <button 
              className="btn btn-primary" 
              style={{ fontSize: '16px', padding: '12px 24px' }}
              onClick={checkAnswer}
              disabled={showFeedback}
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

export default VerbFormsGame