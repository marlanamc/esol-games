import React, { useState, useEffect, useRef } from 'react'
import { 
  Target,
  ArrowLeft,
  RotateCcw,
  Gamepad2,
  Timer,
  BookOpen,
  Settings,
  Clock,
  FileText,
  Type,
  PartyPopper,
  AlarmClock,
  Lock
} from 'lucide-react'

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
    gameMode: 'practice' // 'practice', 'timed', or 'challenge'
  })
  // UI settings model for redesigned Game Settings
  const makeDefaultUISettings = () => ({
    mode: 'practice',
    timedSeconds: 60,
    time: { all: true, items: [] },
    tense: { all: true, items: [] },
    form: { all: true, items: [] },
    verbType: { all: true, items: [] },
    challengePresetId: null
  })
  const [uiSettings, setUiSettings] = useState(makeDefaultUISettings())

  // Persist/restore per-mode custom settings
  const storageKeyForMode = (mode) => `vcg_settings_${mode}`
  const saveModeState = (mode, state) => {
    try {
      const payload = JSON.stringify({
        timedSeconds: state.timedSeconds,
        time: state.time,
        tense: state.tense,
        form: state.form,
        verbType: state.verbType
      })
      localStorage.setItem(storageKeyForMode(mode), payload)
    } catch {}
  }
  const loadModeState = (mode) => {
    try {
      const raw = localStorage.getItem(storageKeyForMode(mode))
      if (!raw) return null
      const parsed = JSON.parse(raw)
      return parsed
    } catch { return null }
  }

  useEffect(() => {
    // On mount, attempt restore for practice
    const restored = loadModeState('practice')
    if (restored) setUiSettings((s) => ({ ...s, ...restored }))
  }, [])

  // Helper to update a group with All vs specific logic
  const updateGroupAll = (group) => {
    setUiSettings((s) => {
      const next = { ...s, [group]: { all: true, items: [] }, challengePresetId: s.mode === 'challenge' ? s.challengePresetId : s.challengePresetId }
      if (s.mode !== 'challenge') saveModeState(s.mode, next)
      return next
    })
  }
  const updateGroupItem = (group, item) => {
    setUiSettings((s) => {
      const current = s[group]
      if (current.all) {
        const nextSet = { all: false, items: [item] }
        const next = { ...s, [group]: nextSet }
        if (s.mode !== 'challenge') saveModeState(s.mode, next)
        return next
      }
      const exists = current.items.includes(item)
      let items = exists ? current.items.filter((i) => i !== item) : [...current.items, item]
      if (items.length === 0) {
        items = []
        const next = { ...s, [group]: { all: true, items } }
        if (s.mode !== 'challenge') saveModeState(s.mode, next)
        return next
      }
      const next = { ...s, [group]: { all: false, items } }
      if (s.mode !== 'challenge') saveModeState(s.mode, next)
      return next
    })
  }

  const applyPreset = (preset) => {
    setUiSettings((s) => ({
      ...s,
      mode: 'challenge',
      challengePresetId: preset.id,
      time: preset.time,
      tense: preset.tense,
      form: preset.form,
      verbType: preset.verbType
    }))
  }

  const summarizeSelection = (state) => {
    const part = (ms, allLabel, labels) => ms.all ? allLabel : (ms.items.length ? ms.items.map((k) => labels[k] || k).join(', ') : allLabel)
    const timeStr = part(state.time, 'All Times', { present: 'Present', past: 'Past', future: 'Future' })
    const tenseStr = part(state.tense, 'All Tenses', { simple: 'Simple', continuous: 'Continuous', perfect: 'Perfect', perfectContinuous: 'Perfect Continuous' })
    const formStr = part(state.form, 'All Forms', { affirmative: 'Affirmative', negative: 'Negative', question: 'Question' })
    const typeStr = part(state.verbType, 'All Types', { regular: 'Regular', irregular: 'Irregular' })
    return `${timeStr} • ${tenseStr} • ${formStr} • ${typeStr}`
  }
  const [googleVerbs, setGoogleVerbs] = useState([])
  const [isLoadingVerbs, setIsLoadingVerbs] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [timerActive, setTimerActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [challengeRound, setChallengeRound] = useState(1)
  const [roundScores, setRoundScores] = useState({})
  const [readyForNextRound, setReadyForNextRound] = useState(false)
  
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

  // Timer effect for timed and challenge modes
  useEffect(() => {
    if (timerActive && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timerActive && timeRemaining === 0) {
      setTimerActive(false)
      if (settings.gameMode === 'challenge') {
        // Save round score
        setRoundScores(prev => ({
          ...prev,
          [challengeRound]: {
            score: currentGame.score,
            questions: currentGame.questionCount
          }
        }))
        setReadyForNextRound(true)
      } else {
        setGameOver(true)
        setShowFeedback(false)
      }
    }
  }, [timerActive, timeRemaining, settings.gameMode, challengeRound, currentGame.score, currentGame.questionCount])

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
    // In challenge mode, time is constrained by the current round
    if (settings.gameMode === 'challenge') {
      const roundConfig = getChallengeRoundConfig(challengeRound)
      const options = roundConfig.time
      return options[Math.floor(Math.random() * options.length)]
    }
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
    // In challenge mode, form is constrained by the current round
    if (settings.gameMode === 'challenge') {
      const roundConfig = getChallengeRoundConfig(challengeRound)
      const options = roundConfig.form
      return options[Math.floor(Math.random() * options.length)]
    }
    return settings.form[Math.floor(Math.random() * settings.form.length)]
  }

  // Legacy controls: keep for any remaining UI, but new flow uses uiSettings above
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

  // Challenge presets definition (UI state model)
  const challengePresets = [
    {
      id: 'simple_all',
      title: 'Simple, All Times, All Forms',
      desc: 'Focus on Simple tense across all times and forms.',
      time: { all: true, items: [] },
      tense: { all: false, items: ['simple'] },
      form: { all: true, items: [] },
      verbType: { all: true, items: [] }
    },
    {
      id: 'continuous_all',
      title: 'Continuous, All Times, All Forms',
      desc: 'Train Continuous tense with every time and form.',
      time: { all: true, items: [] },
      tense: { all: false, items: ['continuous'] },
      form: { all: true, items: [] },
      verbType: { all: true, items: [] }
    },
    {
      id: 'perfect_all',
      title: 'Perfect, All Times, All Forms',
      desc: 'Practice Perfect across times and forms.',
      time: { all: true, items: [] },
      tense: { all: false, items: ['perfect'] },
      form: { all: true, items: [] },
      verbType: { all: true, items: [] }
    },
    {
      id: 'mixed_all',
      title: 'Mixed Tenses, All Times, All Forms',
      desc: 'Simple, Continuous, and Perfect included.',
      time: { all: true, items: [] },
      tense: { all: false, items: ['simple', 'continuous', 'perfect'] },
      form: { all: true, items: [] },
      verbType: { all: true, items: [] }
    },
    {
      id: 'questions_focus',
      title: 'Question Forms Focus',
      desc: 'Question form only with Simple tense.',
      time: { all: true, items: [] },
      tense: { all: false, items: ['simple'] },
      form: { all: false, items: ['question'] },
      verbType: { all: true, items: [] }
    },
    {
      id: 'irregular_only',
      title: 'Irregular Only Sampler',
      desc: 'Irregular verbs only, Simple tense.',
      time: { all: true, items: [] },
      tense: { all: false, items: ['simple'] },
      form: { all: true, items: [] },
      verbType: { all: false, items: ['irregular'] }
    }
  ]

  const resetSettingsToDefaults = () => {
    setSettings(prev => ({
      ...prev,
      time: ['present', 'past', 'future'],
      tense: ['simple', 'continuous', 'perfect', 'perfect continuous'],
      form: ['affirmative', 'negative', 'question'],
      verbType: ['regular', 'irregular']
    }))
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

  const getChallengeRoundConfig = (round) => {
    const selectedTenses = settings.tense
    switch(round) {
      case 1:
        return { time: ['present'], form: ['affirmative', 'negative', 'question'] }
      case 2:
        return { time: ['past'], form: ['affirmative', 'negative', 'question'] }
      case 3:
        return { time: ['future'], form: ['affirmative', 'negative', 'question'] }
      case 4:
        return { time: ['present', 'past', 'future'], form: ['affirmative'] }
      case 5:
        return { time: ['present', 'past', 'future'], form: ['negative'] }
      case 6:
        return { time: ['present', 'past', 'future'], form: ['question'] }
      case 7:
        return { time: ['present', 'past', 'future'], form: ['affirmative', 'negative', 'question'] }
      default:
        return { time: ['present', 'past', 'future'], form: ['affirmative', 'negative', 'question'] }
    }
  }

  const getRoundName = (round) => {
    switch (round) {
      case 1:
        return 'Present Only'
      case 2:
        return 'Past Only'
      case 3:
        return 'Future Only'
      case 4:
        return 'Affirmative Only'
      case 5:
        return 'Negative Only'
      case 6:
        return 'Question Only'
      case 7:
        return 'All Times/All Forms'
      default:
        return `Round ${round}`
    }
  }

  const startGame = () => {
    // Map uiSettings to engine settings
    const toArray = (ms, allArray) => (ms.all || !ms.items || ms.items.length === 0 ? allArray : ms.items)
    const timeArr = toArray(uiSettings.time, ['present', 'past', 'future'])
    const tenseArr = toArray(uiSettings.tense, ['simple', 'continuous', 'perfect', 'perfectContinuous']).map(t => t === 'perfectContinuous' ? 'perfect continuous' : t)
    const formArr = toArray(uiSettings.form, ['affirmative', 'negative', 'question'])
    const typeArr = toArray(uiSettings.verbType, ['regular', 'irregular'])

    setSettings(prev => ({
      ...prev,
      gameMode: uiSettings.mode,
      time: timeArr,
      tense: tenseArr,
      form: formArr,
      verbType: typeArr
    }))

    setGameStarted(true)
    setGameOver(false)
    setChallengeRound(1)
    setRoundScores({})
    setReadyForNextRound(false)
    
    if (uiSettings.mode === 'timed' || uiSettings.mode === 'challenge') {
      setTimeRemaining(uiSettings.timedSeconds || 60)
      setTimerActive(true)
    }
    
    // Apply challenge round config if in challenge mode
    if (uiSettings.mode === 'challenge') {
      const roundConfig = getChallengeRoundConfig(1)
      setSettings(prev => ({
        ...prev,
        time: roundConfig.time,
        form: roundConfig.form
      }))
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

      // Auto-advance to next question in timed and challenge modes
      if (settings.gameMode === 'timed' || settings.gameMode === 'challenge') {
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

  // Skip current question in challenge mode and count as incorrect
  const skipQuestion = () => {
    // Increment questions, reset streak; do not change score
    setCurrentGame(prev => ({
      ...prev,
      streak: 0,
      questionCount: prev.questionCount + 1
    }))

    // Immediately advance to next question in challenge mode
    nextQuestion()
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

  const nextChallengeRound = () => {
    if (challengeRound < 7) {
      const nextRound = challengeRound + 1
      setChallengeRound(nextRound)
      setReadyForNextRound(false)
      
      // Reset game state but keep round scores
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
      
      // Apply next round config
      const roundConfig = getChallengeRoundConfig(nextRound)
      setSettings(prev => ({
        ...prev,
        time: roundConfig.time,
        form: roundConfig.form
      }))
      
      // Start timer for next round
      setTimeRemaining(60)
      setTimerActive(true)
    } else {
      // All rounds complete
      setGameOver(true)
    }
  }

  // Ensure the first question of each challenge round uses the new round config
  useEffect(() => {
    if (
      gameStarted &&
      settings.gameMode === 'challenge' &&
      !readyForNextRound &&
      currentGame.currentVerb === null
    ) {
      generateQuestion()
    }
  }, [challengeRound])

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
    setChallengeRound(1)
    setRoundScores({})
    setReadyForNextRound(false)
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

        {/* Redesigned Game Settings */}
        <div className="game-controls">
          <div className="controls-header">
            <h2 className="controls-title">Game Settings</h2>
            <p className="controls-subtitle">Pick a mode, choose what to practice, then start.</p>
          </div>

          <div className="settings-grid">
            <div className="settings-left">
          {/* Mode select */}
          <div className="controls-row">
            <div className="control-group" style={{ width: '100%' }}>
              <label className="control-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Gamepad2 size={18} /> GAME MODE
              </label>
              <div role="radiogroup" aria-label="Game mode" className="game-mode-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { id: 'practice', title: 'Practice', desc: 'Take your time. Get feedback after each answer.' },
                  { id: 'timed', title: 'Timed (60s)', desc: 'Race the clock. Auto-advance on correct answers.' },
                  { id: 'challenge', title: 'Challenge', desc: 'Preset rounds that follow our curriculum.' }
                ].map((m) => (
                  <button
                    key={m.id}
                    role="radio"
                    aria-checked={uiSettings.mode === m.id}
                    className={`setting-button ${uiSettings.mode === m.id ? 'active' : ''}`}
                    style={{ flex: '1 1 260px', minWidth: '220px', textAlign: 'left' }}
                    onClick={() => {
                      setUiSettings((s) => {
                        const base = { ...s, mode: m.id, challengePresetId: m.id === 'challenge' ? s.challengePresetId : null }
                        const restored = loadModeState(m.id)
                        const next = restored ? { ...base, ...restored, mode: m.id } : base
                        if (m.id !== 'challenge') saveModeState(m.id, next)
                        return next
                      })
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{m.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.85 }}>{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Timed options */}
          {uiSettings.mode === 'timed' && (
            <div className="controls-row">
              <div className="control-group" style={{ width: '100%' }}>
                <label className="control-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Timer size={16}/> Round length
                </label>
                <div className="button-group">
                  {[30, 60, 90].map((sec) => (
                    <button
                      key={sec}
                      className={`setting-button ${uiSettings.timedSeconds === sec ? 'active' : ''}`}
                      onClick={() => {
                        setUiSettings((s) => { const next = { ...s, timedSeconds: sec }; saveModeState('timed', next); return next })
                      }}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Challenge presets */}
          {uiSettings.mode === 'challenge' && (
            <div className="controls-row">
              <div className="control-group" style={{ width: '100%' }}>
                <label className="control-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Target size={16}/> Challenge Presets
                </label>
                <div className="button-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {challengePresets.map((p) => (
                    <button
                      key={p.id}
                      className={`setting-button ${uiSettings.challengePresetId === p.id ? 'active' : ''}`}
                      onClick={() => { applyPreset(p) }}
                      aria-pressed={uiSettings.challengePresetId === p.id}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.title}</div>
                      <div style={{ fontSize: 12, opacity: 0.85 }}>{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
            </div>{/* /.settings-left */}

            <div className="settings-right">
          {/* Setting groups */}
          {[
            { key: 'time', icon: <Clock size={16}/>, title: 'TIME', allLabel: 'All Times', items: [
              { id: 'present', label: 'present' }, { id: 'past', label: 'past' }, { id: 'future', label: 'future' }
            ]},
            { key: 'tense', icon: <BookOpen size={16}/>, title: 'TENSE', allLabel: 'All Tenses', items: [
              { id: 'simple', label: 'simple' }, { id: 'continuous', label: 'continuous' }, { id: 'perfect', label: 'perfect' }, { id: 'perfectContinuous', label: 'perfect continuous' }
            ]},
            { key: 'form', icon: <FileText size={16}/>, title: 'FORM', allLabel: 'All Forms', items: [
              { id: 'affirmative', label: 'affirmative' }, { id: 'negative', label: 'negative' }, { id: 'question', label: 'question' }
            ]},
            { key: 'verbType', icon: <Type size={16}/>, title: 'VERB TYPE', allLabel: 'All Types', items: [
              { id: 'regular', label: 'regular' }, { id: 'irregular', label: 'irregular' }
            ]}
          ].map((group) => {
            const locked = uiSettings.mode === 'challenge' && uiSettings.challengePresetId
            const state = uiSettings[group.key]
            return (
              <div key={group.key} className="controls-row">
                <div className="control-group">
                  <label className="control-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    {group.icon} {group.title} {locked && (<Lock size={14} style={{ opacity: 0.7 }} />)}
                  </label>
                  <div className="button-group">
                    <button
                      className={`setting-button all-button ${state.all ? 'active' : ''}`}
                      aria-pressed={state.all}
                      onClick={() => !locked && updateGroupAll(group.key)}
                    >
                      ✓ {group.allLabel}
                    </button>
                    {group.items.map((opt) => (
                      <button
                        key={opt.id}
                        className={`setting-button ${!state.all && state.items.includes(opt.id) ? 'active' : ''}`}
                        aria-pressed={!state.all && state.items.includes(opt.id)}
                        onClick={() => !locked && updateGroupItem(group.key, opt.id)}
                      >
                        {!state.all && state.items.includes(opt.id) && '✓ '}{opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Summary */}
          <div className="controls-row" style={{ marginTop: '8px' }}>
            <div className="control-group" style={{ width: '100%' }}>
              <label className="control-label">Your Round</label>
              <div aria-live="polite" style={{
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.4)',
                borderRadius: 8,
                padding: '12px 16px',
                color: '#e5e7eb'
              }}>
                {summarizeSelection(uiSettings)}
              </div>
            </div>
          </div>
            </div>{/* /.settings-right */}
          </div>{/* /.settings-grid */}

          {/* Footer */}
          <div className="controls-row" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
            <button className="btn btn-secondary" onClick={() => {
              const def = makeDefaultUISettings(); setUiSettings(def); saveModeState('practice', def)
            }}>
              Reset to Defaults
            </button>
            <button className="btn btn-primary" onClick={startGame}>
              {uiSettings.mode === 'practice' ? 'Start Practice' : uiSettings.mode === 'timed' ? 'Start Timed Round' : 'Start Challenge'}
            </button>
          </div>
        </div>

        {/* Hide legacy controls below (kept for reference) */}
        <div className="game-controls" style={{ display: 'none' }}>
          <div className="controls-header">
            <h2 className="controls-title">Game Settings</h2>
            <p className="controls-subtitle">Customize your practice session</p>
            <p className="controls-instructions">Click buttons to select/deselect options. You can choose multiple options in each category.</p>
          </div>


          {/* Game Mode Selection */}
          <div className="controls-row" style={{ marginBottom: '24px' }}>
            <div className="control-group" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
              <label className="control-label" style={{ textAlign: 'center', fontSize: '16px', marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Gamepad2 size={18} /> GAME MODE
              </label>
              <div className="game-mode-buttons" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                <button
                  className={`setting-button ${settings.gameMode === 'practice' ? 'active' : ''}`}
                  onClick={() => setSettings(prev => ({ ...prev, gameMode: 'practice' }))}
                  style={{ flex: '1 1 200px', fontSize: '15px', padding: '14px 12px', minWidth: '200px', maxWidth: '300px' }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    {settings.gameMode === 'practice' && '✓ '}Practice Mode
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.85, lineHeight: '1.3' }}>Take your time, get detailed feedback</div>
                </button>
                <button
                  className={`setting-button ${settings.gameMode === 'timed' ? 'active' : ''}`}
                  onClick={() => setSettings(prev => ({ ...prev, gameMode: 'timed' }))}
                  style={{ flex: '1 1 200px', fontSize: '15px', padding: '14px 12px', minWidth: '200px', maxWidth: '300px' }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {settings.gameMode === 'timed' && '✓ '}
                    <Timer size={16} /> Timed Mode (60s)
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.85, lineHeight: '1.3' }}>Race the clock! Auto-advance after correct answers</div>
                </button>
                <button
                  className={`setting-button ${settings.gameMode === 'challenge' ? 'active' : ''}`}
                  onClick={() => setSettings(prev => ({ ...prev, gameMode: 'challenge' }))}
                  style={{ flex: '1 1 200px', fontSize: '15px', padding: '14px 12px', minWidth: '200px', maxWidth: '300px', position: 'relative' }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {settings.gameMode === 'challenge' && '✓ '}
                    <Target size={16} /> Challenge Mode
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.85, lineHeight: '1.3' }}>Structured curriculum rounds (see info)</div>
                  <div style={{ position: 'absolute', top: '6px', right: '6px' }}>
                    <button
                      style={{
                        background: 'rgba(99, 102, 241, 0.3)',
                        border: '1px solid rgba(99, 102, 241, 0.5)',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '11px',
                        color: '#cbd5e1',
                        padding: 0
                      }}
                      onMouseEnter={(e) => {
                        const tooltip = e.target.nextSibling
                        if (tooltip) tooltip.style.display = 'block'
                      }}
                      onMouseLeave={(e) => {
                        const tooltip = e.target.nextSibling
                        if (tooltip) tooltip.style.display = 'none'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      i
                    </button>
                    <div
                      style={{
                        display: 'none',
                        position: 'absolute',
                        top: '24px',
                        right: '0',
                        background: 'rgba(30, 41, 59, 0.98)',
                        border: '1px solid rgba(71, 85, 105, 0.5)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        width: '380px',
                        fontSize: '13px',
                        color: '#cbd5e1',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                        zIndex: 1000,
                        whiteSpace: 'normal',
                        lineHeight: '1.5'
                      }}
                    >
                      <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Target size={12}/> Challenge Rounds:</strong><br />
                      Select tense(s) below, then configure:<br />
                      1: Present Only<br />
                      2: Past Only<br />
                      3: Future Only<br />
                      4: Affirmative Only<br />
                      5: Negative Only<br />
                      6: Question Only<br />
                      7: All Times/All Forms<br />
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Timer size={12}/> 1 minute timed</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Challenge Mode - Only TENSE selection */}
          {settings.gameMode === 'challenge' && (
            <div className="controls-row" style={{ marginTop: '32px', borderTop: '1px solid rgba(71, 85, 105, 0.3)', paddingTop: '24px' }}>
              <div className="control-group" style={{ width: '100%' }}>
                <label className="control-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={16}/> SELECT TENSE(S) FOR CHALLENGE
                </label>
                <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '16px', marginTop: '8px' }}>
                  Choose one or multiple tenses. Time, form, and verb type are preset for each round.
                </p>
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
          )}

          {/* Regular Mode - All Settings */}
          {settings.gameMode !== 'challenge' && (
            <>
              <div className="controls-row" style={{ marginTop: '32px', borderTop: '1px solid rgba(71, 85, 105, 0.3)', paddingTop: '24px' }}>
                <div className="control-group" style={{ width: '100%' }}>
                  <label className="control-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Settings size={16}/> GAME SETTINGS
                  </label>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '16px', marginTop: '8px' }}>
                    Customize time, tense, form, and verb type settings below.
                  </p>
                </div>
              </div>

              <div className="controls-row">
                <div className="control-group">
                  <label className="control-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16}/> TIME
                  </label>
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
                  <label className="control-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={16}/> TENSE
                  </label>
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
                  <label className="control-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16}/> FORM
                  </label>
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
                  <label className="control-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Type size={16}/> VERB TYPE
                  </label>
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

              <div className="controls-row" style={{ marginTop: 12 }}>
                <div className="control-group" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={resetSettingsToDefaults}
                    style={{ fontSize: '14px', padding: '10px 16px' }}
                    title="Reset all selections to default"
                  >
                    Reset to Defaults
                  </button>
                </div>
              </div>
            </>
          )}
          
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
        {settings.gameMode === 'challenge' && (
          <div
            className="round-banner"
            style={{
              maxWidth: '900px',
              margin: '12px auto 0 auto',
              padding: '16px 20px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(139, 92, 246, 0.18))',
              border: '2px solid rgba(99, 102, 241, 0.5)',
              borderRadius: '16px',
              textAlign: 'left'
            }}
          >
            <div style={{ fontSize: 'clamp(20px, 3.2vw, 28px)', fontWeight: 800, color: '#c7d2fe', lineHeight: 1.2 }}>
              Round {challengeRound}: {getRoundName(challengeRound)}
            </div>
            <div style={{ fontSize: '12px', letterSpacing: '0.12em', color: '#cbd5e1', opacity: 0.9, marginTop: '4px' }}>
              CHALLENGE
            </div>
          </div>
        )}
        
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
          {(settings.gameMode === 'timed' || settings.gameMode === 'challenge') && (
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

        {settings.gameMode === 'challenge' && (
          (() => {
            const rounds = Object.values(roundScores || {})
            const prevCorrect = rounds.reduce((sum, r) => sum + (r?.score || 0), 0)
            const prevQuestions = rounds.reduce((sum, r) => sum + (r?.questions || 0), 0)
            const includeCurrent = !readyForNextRound && !gameOver
            const totalCorrect = prevCorrect + (includeCurrent ? currentGame.score : 0)
            const totalQuestions = prevQuestions + (includeCurrent ? currentGame.questionCount : 0)
            const overallAccuracy = Math.round((totalCorrect / Math.max(totalQuestions || 1, 1)) * 100)
            return (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '12px',
                marginTop: '12px'
              }}>
                <div className="stat-item" style={{ background: 'rgba(71, 85, 105, 0.25)' }}>
                  <span className="stat-number">{totalCorrect}</span>
                  <span className="stat-label">All Rounds Correct</span>
                </div>
                <div className="stat-item" style={{ background: 'rgba(71, 85, 105, 0.25)' }}>
                  <span className="stat-number">{totalQuestions}</span>
                  <span className="stat-label">All Rounds Questions</span>
                </div>
                <div className="stat-item" style={{ background: 'rgba(71, 85, 105, 0.25)' }}>
                  <span className="stat-number">{overallAccuracy}%</span>
                  <span className="stat-label">All Rounds Accuracy</span>
                </div>
              </div>
            )
          })()
        )}
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

      {/* Ready for Next Round Screen - Challenge Mode */}
      {readyForNextRound && settings.gameMode === 'challenge' && challengeRound < 7 && (
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
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'slideDown 0.6s ease-out'
          }}>Round {challengeRound}: {getRoundName(challengeRound)} Complete!</h2>
          <div style={{ fontSize: '24px', marginBottom: '32px' }}>
            <div style={{ marginBottom: '16px', animation: 'fadeInUp 0.7s ease-out' }}>
              <span style={{ 
                fontSize: '64px', 
                fontWeight: 'bold', 
                color: '#10b981',
                textShadow: '0 4px 8px rgba(16, 185, 129, 0.3)',
                display: 'inline-block'
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
            onClick={nextChallengeRound} 
            style={{ 
              fontSize: '20px', 
              padding: '16px 32px',
              animation: 'fadeInUp 1s ease-out',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
            }}
          >
            Ready for Round {challengeRound + 1}: {getRoundName(challengeRound + 1)} →
          </button>
        </div>
      )}

      {/* Final Results - Challenge Mode */}
      {gameOver && settings.gameMode === 'challenge' && (
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          maxWidth: '800px',
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
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <PartyPopper size={36}/> Challenge Complete!
            </span>
          </h2>
          {(() => {
            const rounds = Object.values(roundScores || {})
            const totalCorrect = rounds.reduce((sum, r) => sum + (r?.score || 0), 0)
            const totalQuestions = rounds.reduce((sum, r) => sum + (r?.questions || 0), 0)
            const overallAccuracy = Math.round((totalCorrect / Math.max(totalQuestions || 1, 1)) * 100)
            return (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px',
                marginBottom: '28px'
              }}>
                <div style={{ background: 'rgba(71, 85, 105, 0.3)', border: '1px solid rgba(71, 85, 105, 0.5)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Total Correct</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>{totalCorrect}</div>
                </div>
                <div style={{ background: 'rgba(71, 85, 105, 0.3)', border: '1px solid rgba(71, 85, 105, 0.5)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Total Questions</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f1f5f9' }}>{totalQuestions}</div>
                </div>
                <div style={{ background: 'rgba(71, 85, 105, 0.3)', border: '1px solid rgba(71, 85, 105, 0.5)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '6px' }}>Overall Accuracy</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>{overallAccuracy}%</div>
                </div>
              </div>
            )
          })()}

          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '20px', color: '#cbd5e1', marginBottom: '24px' }}>
              Round Scores Summary
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
              {Object.keys(roundScores).map(round => (
                <div key={round} style={{
                  background: 'rgba(71, 85, 105, 0.3)',
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid rgba(71, 85, 105, 0.5)'
                }}>
                  <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '4px' }}>Round {round}</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{roundScores[round].score}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>/{roundScores[round].questions}</div>
                </div>
              ))}
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
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <AlarmClock size={36}/> Time's Up!
            </span>
          </h2>
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

      {currentGame.currentVerb && !gameOver && !readyForNextRound && (
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
            autoComplete="off"
            name="verb-answer"
            id="verb-answer"
            inputMode="text"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            data-lpignore="true"
            data-1p-ignore
            data-bwignore
            data-form-type="other"
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
            {settings.gameMode === 'challenge' && !showFeedback && (
              <button
                className="btn btn-secondary"
                style={{ fontSize: '16px', padding: '12px 24px' }}
                onClick={skipQuestion}
              >
                Skip (Count Incorrect)
              </button>
            )}
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
