import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { Target, BookOpen, Hash } from 'lucide-react'
import VerbConjugationGame from './components/VerbConjugationGame'
import VerbFormsGame from './components/VerbFormsGame'
import NumbersGame from './components/NumbersGame'

const GameCard = ({ game }) => {
  const navigate = useNavigate()
  
  const handleGameClick = () => {
    navigate(`/game/${game.id}`)
  }

  // Get distinct styling for each game
  const getGameStyle = (gameId) => {
    switch (gameId) {
      case 'verb-conjugation':
        return {
          background: 'rgba(30, 41, 59, 0.9)',
          iconBg: '#ff6b6b',
          iconColor: '#ffffff',
          accentColor: '#ff4757',
          borderColor: 'rgba(71, 85, 105, 0.3)'
        }
      case 'verb-forms':
        return {
          background: 'rgba(30, 41, 59, 0.9)',
          iconBg: '#4facfe',
          iconColor: '#ffffff',
          accentColor: '#3742fa',
          borderColor: 'rgba(71, 85, 105, 0.3)'
        }
      case 'numbers':
        return {
          background: 'rgba(30, 41, 59, 0.9)',
          iconBg: '#667eea',
          iconColor: '#ffffff',
          accentColor: '#5f27cd',
          borderColor: 'rgba(71, 85, 105, 0.3)'
        }
      default:
        return {
          background: 'rgba(30, 41, 59, 0.9)',
          iconBg: '#667eea',
          iconColor: '#ffffff',
          accentColor: '#5f27cd',
          borderColor: 'rgba(71, 85, 105, 0.3)'
        }
    }
  }

  const gameStyle = getGameStyle(game.id)


  return (
    <div
      className="game-card"
      onClick={handleGameClick}
      style={{
        background: gameStyle.background,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${gameStyle.borderColor}`,
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.4)'
        e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.5)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)'
        e.currentTarget.style.borderColor = gameStyle.borderColor
      }}
    >
      {/* Animated top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 3s ease-in-out infinite'
      }} />
      
      {/* Play Button */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '32px',
        height: '32px',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
        opacity: 0,
        transform: 'scale(0.8)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1'
        e.currentTarget.style.transform = 'scale(1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0'
        e.currentTarget.style.transform = 'scale(0.8)'
      }}
      >
        <span style={{ color: 'white', fontSize: '10px', marginLeft: '1px' }}>▶</span>
      </div>

      {/* Game Icon */}
      <div 
        className="game-icon" 
        style={{ 
          background: gameStyle.iconBg,
          color: gameStyle.iconColor,
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)'
        }}
      >
        <game.icon size={24} />
      </div>

      {/* Game Title */}
      <h2 className="game-name" style={{ 
        color: '#f1f5f9', 
        fontSize: '20px', 
        fontWeight: '700', 
        marginBottom: '8px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        position: 'relative',
        zIndex: 1
      }}>{game.name}</h2>

      {/* Category Badge */}
      <div style={{
        color: '#cbd5e1',
        fontSize: '12px',
        fontWeight: '600',
        padding: '4px 12px',
        background: 'rgba(30, 41, 59, 0.8)',
        borderRadius: '8px',
        display: 'inline-block',
        border: '1px solid rgba(71, 85, 105, 0.3)',
        margin: '0 auto 12px auto',
        textAlign: 'center',
        width: 'fit-content'
      }}>
        {game.id === 'verb-conjugation' ? 'Verbs' : game.id === 'verb-forms' ? 'Verbs' : 'Numbers'}
      </div>

      {/* Game Description */}
      <p className="game-description" style={{ 
        color: '#cbd5e1', 
        fontSize: '14px', 
        lineHeight: '1.5', 
        textAlign: 'center',
        marginBottom: '16px',
        fontWeight: '400',
        position: 'relative',
        zIndex: 1
      }}>{game.description}</p>

      {/* Play Now Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '8px'
      }}>
        <button
          onClick={handleGameClick}
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
          }}
        >
          <span>▶</span>
          Play Now
        </button>
      </div>
    </div>
  )
}

const HomePage = () => {
  const games = [
    {
      id: 'verb-conjugation',
      name: 'Verb Conjugation Challenge',
      description: 'Practice conjugating verbs in different tenses',
      icon: Target,
      difficulty: 'intermediate',
      component: VerbConjugationGame
    },
    {
      id: 'verb-forms',
      name: 'All Verb Form Master',
      description: 'Master V1, V2, V3, V1-ing, and V1-3rd forms',
      icon: BookOpen,
      difficulty: 'advanced',
      component: VerbFormsGame
    },
    {
      id: 'numbers',
      name: 'Numbers to English Words',
      description: 'Convert numerical digits to written English',
      icon: Hash,
      difficulty: 'beginner',
      component: NumbersGame
    }
  ]

  return (
    <div className="game-container">
      <nav className="nav">
        <h1 className="nav-title">ESOL Games by Marlie</h1>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#" className="nav-link">About</a>
        </div>
      </nav>

      <div className="game-header">
        <h1 className="game-title">Master Your English Skills</h1>
        <p className="game-subtitle">Interactive grammar games for ESOL students</p>
        <a 
          href="https://marlanacreed.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="author-badge"
        >
          Created by Marlie
        </a>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

const GamePage = ({ gameId }) => {
  const navigate = useNavigate()
  
  const games = {
    'verb-conjugation': VerbConjugationGame,
    'verb-forms': VerbFormsGame,
    'numbers': NumbersGame
  }

  const GameComponent = games[gameId]
  
  if (!GameComponent) {
    navigate('/')
    return null
  }

  // Apply different background gradients based on game
  const getGameBackground = (gameId) => {
    switch (gameId) {
      case 'verb-conjugation':
        return {
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 25%, #ff6b6b 50%, #ff9ff3 75%, #f368e0 100%)',
          overlay: 'radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 159, 243, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(243, 104, 224, 0.3) 0%, transparent 50%)'
        }
      case 'verb-forms':
        return {
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #4facfe 50%, #43e97b 75%, #38d9a9 100%)',
          overlay: 'radial-gradient(circle at 20% 50%, rgba(79, 172, 254, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(67, 233, 123, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(56, 217, 169, 0.3) 0%, transparent 50%)'
        }
      case 'numbers':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #667eea 50%, #f093fb 75%, #f5576c 100%)',
          overlay: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(245, 87, 108, 0.3) 0%, transparent 50%)'
        }
      default:
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #667eea 50%, #4facfe 75%, #00f2fe 100%)',
          overlay: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(79, 172, 254, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(0, 242, 254, 0.3) 0%, transparent 50%)'
        }
    }
  }

  const gameTheme = getGameBackground(gameId)

  return (
    <div className="game-page-wrapper">
      <GameComponent onBack={() => navigate('/')} />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:gameId" element={<GamePageWrapper />} />
      </Routes>
    </Router>
  )
}

const GamePageWrapper = () => {
  const { gameId } = useParams()
  
  return <GamePage gameId={gameId} />
}

export default App
