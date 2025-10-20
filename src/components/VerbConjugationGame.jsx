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
    const verbType = settings.verbType === 'All Verbs' ? 
      (Math.random() > 0.5 ? 'regular' : 'irregular') :
      settings.verbType.toLowerCase().replace(' verbs', '')
    
    const verbList = verbs[verbType] || verbs.regular
    return verbList[Math.floor(Math.random() * verbList.length)]
  }

  const getRandomTense = () => {
    if (settings.tense === 'All Tenses') {
      const tenseKeys = Object.keys(tenses)
      return tenseKeys[Math.floor(Math.random() * tenseKeys.length)]
    }
    // Convert display name to key
    const tenseKey = Object.keys(tenses).find(key => tenses[key] === settings.tense)
    return tenseKey || 'present'
  }

  const getRandomPronoun = (tense) => {
    const pronounList = pronouns[tense] || pronouns.present
    return pronounList[Math.floor(Math.random() * pronounList.length)]
  }

  const getRandomForm = () => {
    if (settings.form === 'All Forms') {
      const formKeys = Object.keys(forms)
      return formKeys[Math.floor(Math.random() * formKeys.length)]
    }
    return settings.form.toLowerCase()
  }

  const conjugateVerb = (verb, pronoun, tense, form) => {
    const verbBase = verb.infinitive
    
    switch (tense) {
      case 'present':
        if (form === 'affirmative') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `${pronoun} ${verbBase}s`
          }
          return `${pronoun} ${verbBase}`
        } else if (form === 'negative') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `${pronoun} doesn't ${verbBase}`
          }
          return `${pronoun} don't ${verbBase}`
        } else if (form === 'question') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `Does ${pronoun.toLowerCase()} ${verbBase}?`
          }
          return `Do ${pronoun.toLowerCase()} ${verbBase}?`
        }
        break
        
      case 'past':
        if (form === 'affirmative') {
          return `${pronoun} ${verb.past}`
        } else if (form === 'negative') {
          return `${pronoun} didn't ${verbBase}`
        } else if (form === 'question') {
          return `Did ${pronoun.toLowerCase()} ${verbBase}?`
        }
        break
        
      case 'future':
        if (form === 'affirmative') {
          return `${pronoun} will ${verbBase}`
        } else if (form === 'negative') {
          return `${pronoun} won't ${verbBase}`
        } else if (form === 'question') {
          return `Will ${pronoun.toLowerCase()} ${verbBase}?`
        }
        break
        
      case 'present_continuous':
        if (form === 'affirmative') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `${pronoun} is ${verbBase}ing`
          } else if (['I'].includes(pronoun)) {
            return `${pronoun} am ${verbBase}ing`
          }
          return `${pronoun} are ${verbBase}ing`
        } else if (form === 'negative') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `${pronoun} isn't ${verbBase}ing`
          } else if (['I'].includes(pronoun)) {
            return `${pronoun} am not ${verbBase}ing`
          }
          return `${pronoun} aren't ${verbBase}ing`
        } else if (form === 'question') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `Is ${pronoun.toLowerCase()} ${verbBase}ing?`
          } else if (['I'].includes(pronoun)) {
            return `Am ${pronoun.toLowerCase()} ${verbBase}ing?`
          }
          return `Are ${pronoun.toLowerCase()} ${verbBase}ing?`
        }
        break
        
      case 'past_continuous':
        if (form === 'affirmative') {
          if (['I', 'he', 'she', 'it'].includes(pronoun)) {
            return `${pronoun} was ${verbBase}ing`
          }
          return `${pronoun} were ${verbBase}ing`
        } else if (form === 'negative') {
          if (['I', 'he', 'she', 'it'].includes(pronoun)) {
            return `${pronoun} wasn't ${verbBase}ing`
          }
          return `${pronoun} weren't ${verbBase}ing`
        } else if (form === 'question') {
          if (['I', 'he', 'she', 'it'].includes(pronoun)) {
            return `Was ${pronoun.toLowerCase()} ${verbBase}ing?`
          }
          return `Were ${pronoun.toLowerCase()} ${verbBase}ing?`
        }
        break
        
      case 'present_perfect':
        if (form === 'affirmative') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `${pronoun} has ${verb.participle}`
          }
          return `${pronoun} have ${verb.participle}`
        } else if (form === 'negative') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `${pronoun} hasn't ${verb.participle}`
          }
          return `${pronoun} haven't ${verb.participle}`
        } else if (form === 'question') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `Has ${pronoun.toLowerCase()} ${verb.participle}?`
          }
          return `Have ${pronoun.toLowerCase()} ${verb.participle}?`
        }
        break
        
      case 'past_perfect':
        if (form === 'affirmative') {
          return `${pronoun} had ${verb.participle}`
        } else if (form === 'negative') {
          return `${pronoun} hadn't ${verb.participle}`
        } else if (form === 'question') {
          return `Had ${pronoun.toLowerCase()} ${verb.participle}?`
        }
        break
        
      case 'future_perfect':
        if (form === 'affirmative') {
          return `${pronoun} will have ${verb.participle}`
        } else if (form === 'negative') {
          return `${pronoun} won't have ${verb.participle}`
        } else if (form === 'question') {
          return `Will ${pronoun.toLowerCase()} have ${verb.participle}?`
        }
        break
        
      case 'present_perfect_continuous':
        if (form === 'affirmative') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `${pronoun} has been ${verbBase}ing`
          }
          return `${pronoun} have been ${verbBase}ing`
        } else if (form === 'negative') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `${pronoun} hasn't been ${verbBase}ing`
          }
          return `${pronoun} haven't been ${verbBase}ing`
        } else if (form === 'question') {
          if (['he', 'she', 'it'].includes(pronoun)) {
            return `Has ${pronoun.toLowerCase()} been ${verbBase}ing?`
          }
          return `Have ${pronoun.toLowerCase()} been ${verbBase}ing?`
        }
        break
        
      case 'past_perfect_continuous':
        if (form === 'affirmative') {
          return `${pronoun} had been ${verbBase}ing`
        } else if (form === 'negative') {
          return `${pronoun} hadn't been ${verbBase}ing`
        } else if (form === 'question') {
          return `Had ${pronoun.toLowerCase()} been ${verbBase}ing?`
        }
        break
        
      case 'future_perfect_continuous':
        if (form === 'affirmative') {
          return `${pronoun} will have been ${verbBase}ing`
        } else if (form === 'negative') {
          return `${pronoun} won't have been ${verbBase}ing`
        } else if (form === 'question') {
          return `Will ${pronoun.toLowerCase()} have been ${verbBase}ing?`
        }
        break
    }
    
    return `${pronoun} ${verbBase}`
  }

  const generateQuestion = () => {
    const verb = getRandomVerb()
    const tense = getRandomTense()
    const pronoun = getRandomPronoun(tense)
    const form = getRandomForm()
    
    const correctAnswer = conjugateVerb(verb, pronoun, tense, form)
    
    setCurrentGame(prev => ({
      ...prev,
      currentVerb: verb,
      currentTense: tense,
      currentPronoun: pronoun,
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

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback('Please enter an answer!')
      setShowFeedback(true)
      return
    }

    const isCorrect = userAnswer.toLowerCase().trim() === currentGame.correctAnswer.toLowerCase()
    
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
      setFeedback(`Incorrect. The correct answer is "${currentGame.correctAnswer}"`)
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
      currentTense: 'present',
      currentPronoun: 'I'
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
            <li>Use Enter/Return to check your answer</li>
            <li>Use right arrow (→) for a new question</li>
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
            <li>Use Enter/Return to check your answer</li>
            <li>Use right arrow (→) for a new question</li>
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
              <span className="detail-badge" style={{ fontSize: '16px' }}>
                <strong>Pronoun:</strong> {currentGame.currentPronoun}
              </span>
              <span className="detail-badge" style={{ fontSize: '16px' }}>
                <strong>Tense:</strong> {tenses[currentGame.currentTense]}
              </span>
              <span className="detail-badge" style={{ fontSize: '16px' }}>
                <strong>Form:</strong> {forms[currentGame.currentForm]}
              </span>
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
            disabled={showFeedback}
          />
          
          <div className="question-actions">
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

export default VerbConjugationGame