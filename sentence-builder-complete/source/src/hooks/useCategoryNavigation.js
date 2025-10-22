import { useState, useEffect } from 'react'
import { grammarCategories, getCategoryByLevel, getUnlockedCategories, getNextRecommendedCategory } from '../data/grammarCategories.js'

export const useCategoryNavigation = (userStats = { points: 0, completedLevels: [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [navigationMode, setNavigationMode] = useState('categories') // 'categories' | 'levels'
  const [navigationHistory, setNavigationHistory] = useState([])
  
  // Initialize with first unlocked category
  useEffect(() => {
    if (!selectedCategory) {
      const unlockedCategories = getUnlockedCategories(userStats.points)
      if (unlockedCategories.length > 0) {
        setSelectedCategory(unlockedCategories[0].id)
      }
    }
  }, [userStats.points, selectedCategory])
  
  const navigateToCategory = (categoryId) => {
    setNavigationHistory(prev => [...prev, { type: 'category', id: categoryId }])
    setSelectedCategory(categoryId)
    setNavigationMode('levels')
  }
  
  const navigateToCategories = () => {
    setNavigationHistory(prev => [...prev, { type: 'categories' }])
    setNavigationMode('categories')
  }
  
  const navigateToLevel = (levelId) => {
    const category = getCategoryByLevel(levelId)
    if (category) {
      setSelectedCategory(category.id)
      setNavigationMode('level')
      setNavigationHistory(prev => [...prev, { type: 'level', id: levelId, categoryId: category.id }])
    }
  }
  
  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory]
      newHistory.pop() // Remove current
      const previous = newHistory[newHistory.length - 1]
      
      setNavigationHistory(newHistory)
      
      if (previous.type === 'categories') {
        setNavigationMode('categories')
      } else if (previous.type === 'category') {
        setSelectedCategory(previous.id)
        setNavigationMode('levels')
      } else if (previous.type === 'level') {
        setSelectedCategory(previous.categoryId)
        setNavigationMode('level')
      }
    } else {
      // Default back to categories
      setNavigationMode('categories')
    }
  }
  
  const getRecommendations = () => {
    const recommendedCategory = getNextRecommendedCategory(userStats.points, userStats.completedLevels)
    const unlockedCategories = getUnlockedCategories(userStats.points)
    
    return {
      category: recommendedCategory,
      unlockedCategories,
      totalCategories: grammarCategories.length
    }
  }
  
  const getCategoryStats = (categoryId) => {
    const category = grammarCategories.find(cat => cat.id === categoryId)
    if (!category) return null
    
    const completedLevels = category.levels.filter(levelId => 
      userStats.completedLevels.includes(levelId)
    ).length
    
    const totalLevels = category.levels.length
    const percentage = Math.round((completedLevels / totalLevels) * 100)
    
    return {
      completed: completedLevels,
      total: totalLevels,
      percentage,
      isComplete: percentage === 100,
      nextLevel: category.levels.find(levelId => 
        !userStats.completedLevels.includes(levelId)
      )
    }
  }
  
  const getOverallProgress = () => {
    const totalLevels = grammarCategories.reduce((sum, cat) => sum + cat.totalLevels, 0)
    const completedLevels = userStats.completedLevels.length
    const percentage = Math.round((completedLevels / totalLevels) * 100)
    
    const unlockedCategories = getUnlockedCategories(userStats.points)
    const completedCategories = grammarCategories.filter(category => {
      const stats = getCategoryStats(category.id)
      return stats?.isComplete
    }).length
    
    return {
      levels: {
        completed: completedLevels,
        total: totalLevels,
        percentage
      },
      categories: {
        unlocked: unlockedCategories.length,
        completed: completedCategories,
        total: grammarCategories.length
      },
      points: userStats.points
    }
  }
  
  const canAccessLevel = (levelId) => {
    const category = getCategoryByLevel(levelId)
    if (!category) return false
    
    const unlockedCategories = getUnlockedCategories(userStats.points)
    return unlockedCategories.some(cat => cat.id === category.id)
  }
  
  const getNavigationBreadcrumbs = () => {
    const breadcrumbs = []
    
    if (navigationMode === 'categories') {
      breadcrumbs.push({ label: 'Grammar Categories', active: true })
    } else if (navigationMode === 'levels' && selectedCategory) {
      const category = grammarCategories.find(cat => cat.id === selectedCategory)
      breadcrumbs.push(
        { label: 'Grammar Categories', onClick: navigateToCategories },
        { label: category?.name || 'Category', active: true }
      )
    } else if (navigationMode === 'level' && selectedCategory) {
      const category = grammarCategories.find(cat => cat.id === selectedCategory)
      const currentNav = navigationHistory[navigationHistory.length - 1]
      breadcrumbs.push(
        { label: 'Grammar Categories', onClick: navigateToCategories },
        { label: category?.name || 'Category', onClick: () => navigateToCategory(selectedCategory) },
        { label: `Level ${currentNav?.id}`, active: true }
      )
    }
    
    return breadcrumbs
  }
  
  return {
    // State
    selectedCategory,
    navigationMode,
    navigationHistory,
    
    // Navigation functions
    navigateToCategory,
    navigateToCategories,
    navigateToLevel,
    goBack,
    
    // Data functions
    getRecommendations,
    getCategoryStats,
    getOverallProgress,
    canAccessLevel,
    getNavigationBreadcrumbs,
    
    // Computed values
    canGoBack: navigationHistory.length > 1
  }
}

export default useCategoryNavigation

