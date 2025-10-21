import React, { useState, useEffect } from 'react'
import { Hash, ArrowLeft, RotateCcw } from 'lucide-react'

const NumbersGame = ({ onBack }) => {
  const [currentGame, setCurrentGame] = useState({
    score: 0,
    streak: 0,
    questionCount: 0,
    totalQuestions: 10,
    currentNumber: null,
    correctAnswer: '',
    incorrect: 0
  })
  
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [settings, setSettings] = useState({
    category: 'Basic Numbers (0-99)'
  })

  const numberWords = {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
    11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
    16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty',
    21: 'twenty-one', 22: 'twenty-two', 23: 'twenty-three', 24: 'twenty-four', 25: 'twenty-five',
    26: 'twenty-six', 27: 'twenty-seven', 28: 'twenty-eight', 29: 'twenty-nine', 30: 'thirty',
    31: 'thirty-one', 32: 'thirty-two', 33: 'thirty-three', 34: 'thirty-four', 35: 'thirty-five',
    36: 'thirty-six', 37: 'thirty-seven', 38: 'thirty-eight', 39: 'thirty-nine', 40: 'forty',
    41: 'forty-one', 42: 'forty-two', 43: 'forty-three', 44: 'forty-four', 45: 'forty-five',
    46: 'forty-six', 47: 'forty-seven', 48: 'forty-eight', 49: 'forty-nine', 50: 'fifty',
    60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety', 100: 'one hundred',
    200: 'two hundred', 300: 'three hundred', 400: 'four hundred', 500: 'five hundred',
    600: 'six hundred', 700: 'seven hundred', 800: 'eight hundred', 900: 'nine hundred',
    1000: 'one thousand', 2000: 'two thousand', 3000: 'three thousand', 4000: 'four thousand',
    5000: 'five thousand', 6000: 'six thousand', 7000: 'seven thousand', 8000: 'eight thousand',
    9000: 'nine thousand', 10000: 'ten thousand', 100000: 'one hundred thousand',
    1000000: 'one million', 1000000000: 'one billion', 1000000000000: 'one trillion'
  }

  const categories = {
    'Basic Numbers (0-99)': { min: 0, max: 99 },
    'Hundreds (100-999)': { min: 100, max: 999 },
    'One Thousand to Ten Thousand (1,000-9,999)': { min: 1000, max: 9999 },
    'Ten Thousands (10,000-99,999)': { min: 10000, max: 99999 },
    'Hundred Thousands (100,000-999,999)': { min: 100000, max: 999999 },
    'Millions': { min: 1000000, max: 9999999 },
    'Billions': { min: 1000000000, max: 9999999999 },
    'Trillions': { min: 1000000000000, max: 9999999999999 },
    'Round Numbers (1,000 | 5 million | 1 billion)': 'round',
    'All Cardinal Numbers (Random Ranges)': 'all',
    'Ordinal Numbers (1st, 2nd, 3rd...)': 'ordinal',
    'Years (1100-2099)': 'years'
  }

  const ordinalNumbers = {
    1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth',
    6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth',
    11: 'eleventh', 12: 'twelfth', 13: 'thirteenth', 14: 'fourteenth', 15: 'fifteenth',
    16: 'sixteenth', 17: 'seventeenth', 18: 'eighteenth', 19: 'nineteenth', 20: 'twentieth',
    21: 'twenty-first', 22: 'twenty-second', 23: 'twenty-third', 24: 'twenty-fourth', 25: 'twenty-fifth',
    30: 'thirtieth', 40: 'fortieth', 50: 'fiftieth', 60: 'sixtieth', 70: 'seventieth',
    80: 'eightieth', 90: 'ninetieth', 100: 'one hundredth'
  }

  const roundNumbers = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 100000, 1000000, 1000000000, 1000000000000]

  const numberToWords = (num) => {
    if (num === 0) return 'zero'
    if (num <= 20) return numberWords[num]
    if (num < 100) {
      const tens = Math.floor(num / 10) * 10
      const ones = num % 10
      if (ones === 0) return numberWords[tens]
      return `${numberWords[tens]}-${numberWords[ones]}`
    }
    if (num < 1000) {
      const hundreds = Math.floor(num / 100)
      const remainder = num % 100
      if (remainder === 0) return `${numberWords[hundreds]} hundred`
      return `${numberWords[hundreds]} hundred ${numberToWords(remainder)}`
    }
    if (num < 1000000) {
      const thousands = Math.floor(num / 1000)
      const remainder = num % 1000
      if (remainder === 0) return `${numberToWords(thousands)} thousand`
      return `${numberToWords(thousands)} thousand ${numberToWords(remainder)}`
    }
    if (num < 1000000000) {
      const millions = Math.floor(num / 1000000)
      const remainder = num % 1000000
      if (remainder === 0) return `${numberToWords(millions)} million`
      return `${numberToWords(millions)} million ${numberToWords(remainder)}`
    }
    if (num < 1000000000000) {
      const billions = Math.floor(num / 1000000000)
      const remainder = num % 1000000000
      if (remainder === 0) return `${numberToWords(billions)} billion`
      return `${numberToWords(billions)} billion ${numberToWords(remainder)}`
    }
    const trillions = Math.floor(num / 1000000000000)
    const remainder = num % 1000000000000
    if (remainder === 0) return `${numberToWords(trillions)} trillion`
    return `${numberToWords(trillions)} trillion ${numberToWords(remainder)}`
  }

  const yearToWords = (year) => {
    // Special handling for years based on your HTML logic
    if (year >= 2000) {
      const lastTwo = year % 100

      // Format 1: "two thousand and nineteen"
      let format1 = 'two thousand' + (lastTwo > 0 ? ' and ' + numberToWords(lastTwo) : '')

      // Format 2: "twenty nineteen" (only for years 2010 and after)
      if (lastTwo < 10) {
        // For 2000-2009, only use "two thousand" format
        return [format1]
      } else {
        const firstTwo = Math.floor(year / 100)
        let firstPart = numberToWords(firstTwo)
        let secondPart = lastTwo <= 19 ? numberWords[lastTwo] : numberToWords(lastTwo)
        let format2 = firstPart + ' ' + secondPart

        return [format1, format2]
      }
    } else if (year < 2000) {
      const century = Math.floor(year / 100)
      const remainder = year % 100

      let centuryWord = ''
      if (century >= 20) {
        centuryWord = numberWords[Math.floor(century / 10) * 10] + '-' + numberWords[century % 10]
      } else if (century >= 10) {
        centuryWord = numberWords[century]
      } else {
        centuryWord = numberWords[century]
      }

      if (remainder === 0) {
        return [centuryWord + ' hundred']
      } else {
        if (remainder < 10) {
          return [centuryWord + ' oh ' + numberWords[remainder]]
        } else if (remainder >= 10 && remainder <= 19) {
          return [centuryWord + ' ' + numberWords[remainder]]
        } else {
          let remainderWord = numberWords[Math.floor(remainder / 10) * 10]
          if (remainder % 10 > 0) {
            remainderWord += '-' + numberWords[remainder % 10]
          }
          return [centuryWord + ' ' + remainderWord]
        }
      }
    }
    
    // Fallback to regular number conversion
    return [numberToWords(year)]
  }

  const formatNumber = (num, category) => {
    // Don't add commas for years
    if (category === 'years') {
      return num.toString()
    }
    
    // Add commas for all other numbers
    return num.toLocaleString()
  }

  const generateNumber = () => {
    const category = categories[settings.category]
    let number, correctAnswer, displayNumber

    if (category === 'round') {
      number = roundNumbers[Math.floor(Math.random() * roundNumbers.length)]
      correctAnswer = numberToWords(number)
      displayNumber = formatNumber(number, 'round')
    } else if (category === 'all') {
      const ranges = [
        { min: 0, max: 99 },
        { min: 100, max: 999 },
        { min: 1000, max: 9999 },
        { min: 10000, max: 99999 },
        { min: 100000, max: 999999 },
        { min: 1000000, max: 9999999 }
      ]
      const randomRange = ranges[Math.floor(Math.random() * ranges.length)]
      number = Math.floor(Math.random() * (randomRange.max - randomRange.min + 1)) + randomRange.min
      correctAnswer = numberToWords(number)
      displayNumber = formatNumber(number, 'all')
    } else if (category === 'ordinal') {
      const ordinalKeys = Object.keys(ordinalNumbers)
      number = parseInt(ordinalKeys[Math.floor(Math.random() * ordinalKeys.length)])
      correctAnswer = ordinalNumbers[number]
      displayNumber = formatNumber(number, 'ordinal')
    } else if (category === 'years') {
      number = Math.floor(Math.random() * (2099 - 1100 + 1)) + 1100
      const yearAnswers = yearToWords(number)
      correctAnswer = yearAnswers[0] // Use the first (standard) form as the primary answer
      displayNumber = formatNumber(number, 'years')
    } else {
      number = Math.floor(Math.random() * (category.max - category.min + 1)) + category.min
      correctAnswer = numberToWords(number)
      displayNumber = formatNumber(number, 'other')
    }

    setCurrentGame(prev => ({
      ...prev,
      currentNumber: number,
      displayNumber: displayNumber,
      correctAnswer: correctAnswer
    }))
    
    setUserAnswer('')
    setShowFeedback(false)
    setFeedback('')
  }

  const normalizeAnswer = (answer) => {
    return answer.toLowerCase()
      .replace(/[-,]/g, ' ')  // Remove commas and dashes
      .replace(/\s+/g, ' ')  // Normalize multiple spaces to single space
      .trim()
  }

  const startGame = () => {
    setGameStarted(true)
    generateNumber()
  }

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback('Please enter an answer!')
      setShowFeedback(true)
      return
    }

    let isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(currentGame.correctAnswer)
    
    // For years 2010 and later, also check alternative "twenty-XX" format
    if (!isCorrect && settings.category === 'Years (1100-2099)' && currentGame.currentNumber >= 2010) {
      const yearAnswers = yearToWords(currentGame.currentNumber)
      isCorrect = yearAnswers.some(answer => 
        normalizeAnswer(userAnswer) === normalizeAnswer(answer)
      )
    }
    
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
        questionCount: prev.questionCount + 1,
        incorrect: prev.incorrect + 1
      }))
      
      // Show all acceptable answers for years 2010+
      if (settings.category === 'Years (1100-2099)' && currentGame.currentNumber >= 2010) {
        const yearAnswers = yearToWords(currentGame.currentNumber)
        const allAnswers = yearAnswers.join('" or "')
        setFeedback(`Incorrect. The correct answer is "${allAnswers}"`)
      } else {
        setFeedback(`Incorrect. The correct answer is "${currentGame.correctAnswer}"`)
      }
    }
    
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    generateNumber()
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
      currentNumber: null,
      correctAnswer: '',
      incorrect: 0
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
          <h1 className="nav-title">Numbers to English Words</h1>
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
            <h3>Number Categories Explained</h3>
            <ul>
              <li><strong>Round Numbers:</strong> Common benchmark numbers (e.g., one thousand, five million, one billion)</li>
              <li><strong>All Cardinal Numbers:</strong> Any number from 0 to trillions</li>
              <li><strong>Basic Numbers:</strong> 0 to 99 (e.g., twenty-five)</li>
              <li><strong>Hundreds:</strong> 100 to 999 (e.g., three hundred and forty-five)</li>
              <li><strong>Ten Thousands:</strong> 10,000 to 99,999 (e.g., forty-five thousand)</li>
              <li><strong>Hundred Thousands:</strong> 100,000 to 999,999 (e.g., three hundred and forty-five thousand)</li>
              <li><strong>Millions/Billions/Trillions:</strong> Numbers in respective ranges</li>
              <li><strong>Ordinal Numbers:</strong> Numbers showing position or rank (1st → first, 2nd → second)</li>
              <li><strong>Years:</strong> 1100-2099 (e.g., nineteen oh five, two thousand and one)</li>
            </ul>
            
            <h4>Keyboard Shortcuts</h4>
            <ul>
              <li><strong>Enter:</strong> Check your answer</li>
              <li><strong>Right Arrow →:</strong> Get next number</li>
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
              <label className="control-label" style={{ color: '#4ECDC4' }}>🔢 NUMBER CATEGORY</label>
              <select 
                className="esol-select"
                style={{ backgroundColor: '#4ECDC420', borderColor: '#4ECDC4' }}
                value={settings.category}
                onChange={(e) => setSettings(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="Basic Numbers (0-99)">Basic Numbers (0-99)</option>
                <option value="Hundreds (100-999)">Hundreds (100-999)</option>
                <option value="One Thousand to Ten Thousand (1,000-9,999)">One Thousand to Ten Thousand (1,000-9,999)</option>
                <option value="Ten Thousands (10,000-99,999)">Ten Thousands (10,000-99,999)</option>
                <option value="Hundred Thousands (100,000-999,999)">Hundred Thousands (100,000-999,999)</option>
                <option value="Millions">Millions</option>
                <option value="Billions">Billions</option>
                <option value="Trillions">Trillions</option>
                <option value="Round Numbers (1,000 | 5 million | 1 billion)">Round Numbers (1,000 | 5 million | 1 billion)</option>
                <option value="All Cardinal Numbers (Random Ranges)">All Cardinal Numbers (Random Ranges)</option>
                <option value="Ordinal Numbers (1st, 2nd, 3rd...)">Ordinal Numbers (1st, 2nd, 3rd...)</option>
                <option value="Years (1100-2099)">Years (1100-2099)</option>
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
        <h1 className="nav-title">Numbers to English Words</h1>
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
              <span className="stat-label">Correct</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{currentGame.incorrect}</span>
              <span className="stat-label">Incorrect</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{Math.round((currentGame.score / Math.max(currentGame.questionCount, 1)) * 100)}%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{currentGame.streak}</span>
              <span className="stat-label">Streak</span>
            </div>
          </div>
        </div>

        {showInstructions && (
          <div className="game-instructions">
            <h3>Number Categories Explained</h3>
            <ul>
              <li><strong>Round Numbers:</strong> Common benchmark numbers (e.g., one thousand, five million, one billion)</li>
              <li><strong>All Cardinal Numbers:</strong> Any number from 0 to trillions</li>
              <li><strong>Basic Numbers:</strong> 0 to 99 (e.g., twenty-five)</li>
              <li><strong>Hundreds:</strong> 100 to 999 (e.g., three hundred and forty-five)</li>
              <li><strong>Ten Thousands:</strong> 10,000 to 99,999 (e.g., forty-five thousand)</li>
              <li><strong>Hundred Thousands:</strong> 100,000 to 999,999 (e.g., three hundred and forty-five thousand)</li>
              <li><strong>Millions/Billions/Trillions:</strong> Numbers in respective ranges</li>
              <li><strong>Ordinal Numbers:</strong> Numbers showing position or rank (1st → first, 2nd → second)</li>
              <li><strong>Years:</strong> 1100-2099 (e.g., nineteen oh five, two thousand and one)</li>
            </ul>
            
            <h4>Keyboard Shortcuts</h4>
            <ul>
              <li><strong>Enter:</strong> Check your answer</li>
              <li><strong>Right Arrow →:</strong> Get next number</li>
            </ul>
          </div>
        )}

      {showFeedback && (
        <div className={`feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`} style={{ fontSize: '18px', padding: '16px 24px', margin: '16px auto', maxWidth: '600px', borderRadius: '8px' }}>
          {feedback}
        </div>
      )}

      {currentGame.currentNumber !== null && (
        <div className="question-container">
          <div className="question-header">
            <h2 className="question-text" style={{ fontSize: '24px' }}>
              Write this number in words:
            </h2>
            <div className="number-display">
              <span className="number-value" style={{ fontSize: '20px' }}>{currentGame.displayNumber}</span>
            </div>
            <p className="question-description" style={{ fontSize: '16px' }}>
              Category: {settings.category}
            </p>
          </div>
          
          <input
            type="text"
            className="answer-input"
            style={{ fontSize: '18px', padding: '12px' }}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter the number in words..."
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
                Next Number →
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default NumbersGame