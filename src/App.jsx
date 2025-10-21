import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { Target, BookOpen, Hash, Home, GraduationCap } from 'lucide-react'
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
        borderRadius: 'clamp(12px, 3vw, 16px)',
        padding: 'clamp(16px, 4vw, 20px)',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        minHeight: 'clamp(200px, 40vw, 280px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
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
          width: 'clamp(40px, 8vw, 48px)',
          height: 'clamp(40px, 8vw, 48px)',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto clamp(8px, 2vw, 16px) auto',
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
        fontSize: 'clamp(16px, 3.5vw, 20px)', 
        fontWeight: '700', 
        marginBottom: 'clamp(6px, 1.5vw, 8px)', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        position: 'relative',
        zIndex: 1,
        lineHeight: '1.2'
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
        fontSize: 'clamp(12px, 2.5vw, 14px)', 
        lineHeight: '1.4', 
        textAlign: 'center',
        marginBottom: 'clamp(12px, 3vw, 16px)',
        fontWeight: '400',
        position: 'relative',
        zIndex: 1,
        flexGrow: 1
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
                  borderRadius: 'clamp(6px, 1.5vw, 8px)',
                  padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)',
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(4px, 1vw, 6px)',
                  width: '100%',
                  justifyContent: 'center'
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

const TeachingPage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: '#f1f5f9',
      padding: '20px'
    }}>
      <nav style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: 'clamp(12px, 3vw, 20px) clamp(16px, 4vw, 32px)',
        marginBottom: 'clamp(16px, 4vw, 32px)',
        borderRadius: '0 0 clamp(12px, 3vw, 24px) clamp(12px, 3vw, 24px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(18px, 4vw, 28px)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0
          }}>
            ESOL Games by Marlie
          </h1>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <Home size={16} />
            Back to Games
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(255, 245, 238, 0.9)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '24px',
          border: '1px solid rgba(255, 218, 185, 0.5)',
          boxShadow: '0 4px 20px rgba(255, 218, 185, 0.2)'
        }}>
          <h1 style={{
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #87CEEB 0%, #DDA0DD 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            <GraduationCap size={32} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
            Understanding Verb Forms
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 3vw, 20px)',
            textAlign: 'center',
            color: '#8B7355',
            marginBottom: '32px'
          }}>
            Learn the V1, V1-3rd, V1-ing, V2, V3 system used in our games
          </p>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.9)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '24px',
          border: '1px solid rgba(71, 85, 105, 0.3)'
        }}>
          <h2 style={{
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: '700',
            color: '#f1f5f9',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            The Five Verb Forms
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '12px', 
            marginBottom: '32px' 
          }}>
            {[
              {
                form: 'V1',
                name: 'Base Form',
                description: 'Basic form of the verb',
                example: 'walk, eat, go',
                usage: 'I walk, you walk, we walk, they walk'
              },
              {
                form: 'V1-3rd',
                name: 'Third Person Singular',
                description: 'Used with he, she, it',
                example: 'walks, eats, goes',
                usage: 'he walks, she eats, it goes'
              },
              {
                form: 'V1-ing',
                name: 'Present Participle',
                description: 'Continuous tenses',
                example: 'walking, eating, going',
                usage: 'I am walking, continuous tenses'
              },
              {
                form: 'V2',
                name: 'Past Simple',
                description: 'Completed past actions',
                example: 'walked, ate, went',
                usage: 'I walked yesterday'
              },
              {
                form: 'V3',
                name: 'Past Participle',
                description: 'Perfect tenses & passive',
                example: 'walked, eaten, gone',
                usage: 'I have walked, perfect tenses'
              }
            ].map((verbForm, index) => (
              <div key={index} style={{
                background: 'rgba(255, 248, 240, 0.9)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(255, 218, 185, 0.5)',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(255, 218, 185, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#DDA0DD'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 218, 185, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 218, 185, 0.5)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 218, 185, 0.2)'
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #DDA0DD 0%, #98FB98 100%)',
                    color: '#4A4A4A',
                    fontWeight: '700',
                    fontSize: '16px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    marginRight: '12px',
                    minWidth: '50px',
                    textAlign: 'center'
                  }}>
                    {verbForm.form}
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#5D4E37',
                    margin: 0
                  }}>
                    {verbForm.name}
                  </h3>
                </div>
                <p style={{
                  color: '#8B7355',
                  marginBottom: '6px',
                  fontSize: '14px'
                }}>
                  {verbForm.description}
                </p>
                <div style={{ marginBottom: '4px', fontSize: '13px' }}>
                  <strong style={{ color: '#DAA520' }}>Examples:</strong> <span style={{ color: '#5D4E37' }}>{verbForm.example}</span>
                </div>
                <div style={{ fontSize: '13px' }}>
                  <strong style={{ color: '#90EE90' }}>Usage:</strong> <span style={{ color: '#5D4E37' }}>{verbForm.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.9)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '24px',
          border: '1px solid rgba(71, 85, 105, 0.3)'
        }}>
          <h2 style={{
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: '700',
            color: '#f1f5f9',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Verb Tense Formulas
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            {[
              { name: 'Simple Tenses', color: 'rgba(34, 197, 94, 0.3)' },
              { name: 'Continuous Tenses', color: 'rgba(59, 130, 246, 0.3)' },
              { name: 'Perfect Tenses', color: 'rgba(168, 85, 247, 0.3)' },
              { name: 'Perfect Continuous Tenses', color: 'rgba(245, 158, 11, 0.3)' }
            ].map((category, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: 'rgba(51, 65, 85, 0.6)',
                borderRadius: '8px',
                border: `2px solid ${category.color}`
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: category.color,
                  borderRadius: '50%'
                }}></div>
                <span style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '500' }}>
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'rgba(51, 65, 85, 0.6)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#f1f5f9', fontWeight: '600' }}>Tense</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#f1f5f9', fontWeight: '600' }}>Affirmative</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#f1f5f9', fontWeight: '600' }}>Negative</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#f1f5f9', fontWeight: '600' }}>Question</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tense: 'Present Simple', affirmative: 'subject + V1/V1-3rd', negative: 'subject + do(es) + not + V1', question: 'Do(es) + subject + V1?', category: 'simple' },
                  { tense: 'Past Simple', affirmative: 'subject + V2', negative: 'subject + did + not + V1', question: 'Did + subject + V1?', category: 'simple' },
                  { tense: 'Future Simple', affirmative: 'subject + will + V1', negative: 'subject + will + not + V1', question: 'Will + subject + V1?', category: 'simple' },
                  { tense: 'Present Continuous', affirmative: 'subject + am/is/are + V1-ing', negative: 'subject + am/is/are + not + V1-ing', question: 'Am/Is/Are + subject + V1-ing?', category: 'continuous' },
                  { tense: 'Past Continuous', affirmative: 'subject + was/were + V1-ing', negative: 'subject + was/were + not + V1-ing', question: 'Was/Were + subject + V1-ing?', category: 'continuous' },
                  { tense: 'Future Continuous', affirmative: 'subject + will be + V1-ing', negative: 'subject + will not be + V1-ing', question: 'Will + subject + be + V1-ing?', category: 'continuous' },
                  { tense: 'Present Perfect', affirmative: 'subject + have/has + V3', negative: 'subject + have/has + not + V3', question: 'Have/Has + subject + V3?', category: 'perfect' },
                  { tense: 'Past Perfect', affirmative: 'subject + had + V3', negative: 'subject + had + not + V3', question: 'Had + subject + V3?', category: 'perfect' },
                  { tense: 'Future Perfect', affirmative: 'subject + will have + V3', negative: 'subject + will not have + V3', question: 'Will + subject + have + V3?', category: 'perfect' },
                  { tense: 'Present Perfect Continuous', affirmative: 'subject + have/has been + V1-ing', negative: 'subject + have/has not been + V1-ing', question: 'Have/Has + subject + been + V1-ing?', category: 'perfect-continuous' },
                  { tense: 'Past Perfect Continuous', affirmative: 'subject + had been + V1-ing', negative: 'subject + had not been + V1-ing', question: 'Had + subject + been + V1-ing?', category: 'perfect-continuous' },
                  { tense: 'Future Perfect Continuous', affirmative: 'subject + will have been + V1-ing', negative: 'subject + will not have been + V1-ing', question: 'Will + subject + have been + V1-ing?', category: 'perfect-continuous' }
                ].map((row, index) => {
                  const getCategoryColor = (category) => {
                    switch (category) {
                      case 'simple': return { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)' }
                      case 'continuous': return { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)' }
                      case 'perfect': return { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)' }
                      case 'perfect-continuous': return { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)' }
                      default: return { bg: 'rgba(51, 65, 85, 0.6)', border: 'rgba(71, 85, 105, 0.3)' }
                    }
                  }
                  
                  const colors = getCategoryColor(row.category)
                  
                  return (
                    <tr key={index} style={{ 
                      borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
                      backgroundColor: colors.bg
                    }}>
                      <td style={{ 
                        padding: '16px', 
                        color: '#f1f5f9', 
                        fontWeight: '600',
                        borderLeft: `4px solid ${colors.border}`
                      }}>{row.tense}</td>
                      <td style={{ padding: '16px', color: '#cbd5e1', fontFamily: 'monospace' }}>{row.affirmative}</td>
                      <td style={{ padding: '16px', color: '#cbd5e1', fontFamily: 'monospace' }}>{row.negative}</td>
                      <td style={{ padding: '16px', color: '#cbd5e1', fontFamily: 'monospace' }}>{row.question}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.9)',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid rgba(71, 85, 105, 0.3)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: '700',
            color: '#f1f5f9',
            marginBottom: '16px'
          }}>
            Ready to Practice?
          </h2>
          <p style={{
            color: '#cbd5e1',
            marginBottom: '24px',
            fontSize: '16px'
          }}>
            Now that you understand the verb forms, try our games to practice!
          </p>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            Start Playing Games
          </button>
        </div>
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
    <div className="game-container" style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: 'clamp(16px, 4vw, 24px)'
    }}>
      <nav className="nav" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 32px',
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
        marginBottom: '32px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        borderRadius: '0 0 24px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0
        }}>ESOL Games</h1>
        <a 
          href="https://marlanacreed.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            fontSize: '14px',
            padding: '8px 16px',
            background: 'rgba(71, 85, 105, 0.3)',
            color: '#cbd5e1',
            textDecoration: 'none',
            borderRadius: '6px',
            border: '1px solid rgba(71, 85, 105, 0.5)'
          }}
        >
          Created by Marlie
        </a>
      </nav>

      <div className="game-header" style={{
        textAlign: 'center',
        marginBottom: '32px',
        padding: '24px 16px'
      }}>
        <h1 className="game-title" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '16px',
          letterSpacing: '-0.025em',
          lineHeight: '1.1'
        }}>Master Your English Skills</h1>
        <p className="game-subtitle" style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: '#cbd5e1',
          marginBottom: '24px',
          maxWidth: '600px',
          margin: '0 auto 24px auto'
        }}>Interactive grammar games for ESOL students</p>
        
        <Link 
          to="/teaching" 
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s ease',
            marginBottom: '32px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'none'
          }}
        >
          <GraduationCap size={16} />
          Learn Verb Forms
        </Link>
      </div>

      <div className="games-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(16px, 4vw, 24px)',
        marginTop: '32px',
        padding: '0 clamp(16px, 4vw, 24px)'
      }}>
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
        <Route path="/teaching" element={<TeachingPage />} />
        <Route path="/game/:gameId" element={<GamePageWrapper />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

const GamePageWrapper = () => {
  const { gameId } = useParams()
  
  return <GamePage gameId={gameId} />
}

const NotFoundPage = () => {
  const navigate = useNavigate()
  
  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="game-container">
      <nav className="nav">
        <h1 className="nav-title">ESOL Games by Marlie</h1>
        <div></div>
      </nav>

      <div className="game-header">
        <div className="game-header-content">
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
            <Home size={40} />
          </div>
          <h1 className="game-title" style={{ fontSize: '48px', marginBottom: '16px' }}>404</h1>
          <p className="game-subtitle" style={{ fontSize: '20px', marginBottom: '32px' }}>
            Oops! This page doesn't exist.
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '16px', marginBottom: '32px' }}>
            The page you're looking for might have been moved, deleted, or doesn't exist.
          </p>
          
          <button 
            className="btn btn-primary" 
            onClick={handleGoHome}
            style={{
              fontSize: '18px',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto'
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
            <Home size={20} />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
