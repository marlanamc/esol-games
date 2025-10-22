# 🛠️ VS Code Setup Guide - Sentence Builder Game

## 🚀 **Quick Setup for VS Code Development**

### **1. Extract and Open Project**
```bash
# Extract the zip file
unzip sentence-builder-complete.zip

# Navigate to source directory
cd sentence-builder-complete/source

# Open in VS Code
code .
```

### **2. Install Dependencies**
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### **3. Start Development Server**
```bash
# Start development server
pnpm run dev

# Or with npm
npm run dev
```

The application will open at `http://localhost:5173`

---

## 📁 **Key Files to Know**

### **Main Application**
- `src/App.jsx` - Main application component with all systems integrated

### **Grammar Systems** (Most Important!)
- `src/data/comprehensiveLevels45.js` - Complete 45-level system
- `src/data/enhancedGrammarEngine.js` - Grammar validation engine
- `src/data/timeExpressionSystem.js` - Time expression validation
- `src/data/enhancedVerbDatabase.js` - Comprehensive verb database
- `src/data/modalVerbsSystem.js` - Modal verbs and special constructions

### **Components**
- `src/components/CategorySelector.jsx` - Category navigation
- `src/components/GamificationSystem.jsx` - Points and achievements
- `src/components/RapidFireQuiz.jsx` - Speed practice mode
- `src/components/TooltipSystem.jsx` - Grammar help system

### **Configuration**
- `package.json` - Dependencies and scripts
- `vite.config.js` - Build configuration
- `tailwind.config.js` - Styling configuration

---

## 🎯 **Development Commands**

```bash
# Development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Lint code
pnpm run lint
```

---

## 🔧 **VS Code Extensions (Recommended)**

### **Essential Extensions**
- **ES7+ React/Redux/React-Native snippets** - React development
- **Tailwind CSS IntelliSense** - CSS class suggestions
- **Auto Rename Tag** - HTML/JSX tag management
- **Bracket Pair Colorizer** - Code readability
- **GitLens** - Git integration

### **Code Quality**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Auto Import - ES6, TS, JSX, TSX** - Import management

---

## 📊 **Project Structure Deep Dive**

```
source/
├── src/
│   ├── components/           # React components
│   │   ├── CategorySelector.jsx      # Main navigation
│   │   ├── CategoryLevelSelector.jsx # Level selection
│   │   ├── GamificationSystem.jsx    # Points/achievements
│   │   ├── RapidFireQuiz.jsx         # Speed practice
│   │   ├── SettingsPanel.jsx         # User preferences
│   │   ├── TooltipSystem.jsx         # Grammar help
│   │   └── ui/                       # UI components
│   ├── data/                # Grammar systems (CORE!)
│   │   ├── comprehensiveLevels45.js  # 45-level system
│   │   ├── enhancedGrammarEngine.js  # Validation engine
│   │   ├── timeExpressionSystem.js   # Time expressions
│   │   ├── enhancedVerbDatabase.js   # Verb database
│   │   ├── modalVerbsSystem.js       # Modal verbs
│   │   └── grammarCategories.js      # Category system
│   ├── hooks/               # Custom React hooks
│   │   └── useCategoryNavigation.js  # Navigation logic
│   ├── App.jsx             # Main application
│   ├── App.css             # Global styles
│   └── main.jsx            # React entry point
├── public/                 # Static assets
├── dist/                   # Built files (after build)
├── package.json           # Dependencies
├── vite.config.js         # Build config
└── tailwind.config.js     # Styling config
```

---

## 🎨 **Customization Guide**

### **Adding New Levels**
1. Edit `src/data/comprehensiveLevels45.js`
2. Add level object with required properties
3. Update grammar validation in `enhancedGrammarEngine.js`

### **Adding New Word Categories**
1. Update `getWordCategories()` in `App.jsx`
2. Add color coding in `getCategoryColor()`
3. Create tooltips in `TooltipSystem.jsx`

### **Modifying Grammar Rules**
1. Edit validation logic in `enhancedGrammarEngine.js`
2. Update time expression rules in `timeExpressionSystem.js`
3. Test with various sentence combinations

### **Styling Changes**
1. Global styles: `src/App.css`
2. Component styles: Tailwind classes in JSX
3. Theme colors: `tailwind.config.js`

---

## 🧪 **Testing Your Changes**

### **Manual Testing Checklist**
- [ ] Category navigation works
- [ ] Level selection functions
- [ ] Sentence building responds correctly
- [ ] Grammar validation provides accurate feedback
- [ ] Mobile interface is responsive
- [ ] Gamification system updates properly

### **Key Test Scenarios**
1. **Basic Sentence Building**
   - Try "She eats pizza" (should be correct)
   - Try "She eat pizza" (should show V1-3rd error)

2. **Present Perfect vs Past Simple**
   - "I ate pizza yesterday" (should be correct - finished time)
   - "I have eaten pizza today" (should be correct - unfinished time)
   - "I have eaten pizza yesterday" (should show error)

3. **Mobile Responsiveness**
   - Test on mobile viewport
   - Ensure touch targets are appropriate
   - Check navigation flow

---

## 🚀 **Deployment Options**

### **Static Hosting (Recommended)**
```bash
# Build for production
pnpm run build

# Deploy dist/ folder to:
# - Netlify (drag & drop)
# - Vercel (connect GitHub)
# - GitHub Pages
# - Any static host
```

### **Development Sharing**
```bash
# Start dev server with network access
pnpm run dev --host

# Share the network URL with students
```

---

## 🔍 **Debugging Tips**

### **Common Issues**
1. **Build Errors**: Check console for missing imports
2. **Grammar Validation**: Test with `console.log` in grammar engine
3. **Mobile Issues**: Use browser dev tools mobile view
4. **Performance**: Check React DevTools for re-renders

### **Browser Dev Tools**
- **Console**: Check for JavaScript errors
- **Network**: Monitor API calls and asset loading
- **Application**: Check localStorage for user data
- **Performance**: Monitor rendering performance

---

## 📚 **Learning the Codebase**

### **Start Here (Priority Order)**
1. **`App.jsx`** - Main application logic
2. **`comprehensiveLevels45.js`** - Grammar level definitions
3. **`enhancedGrammarEngine.js`** - Validation logic
4. **`CategorySelector.jsx`** - Navigation component
5. **`GamificationSystem.jsx`** - Rewards system

### **Key Concepts**
- **Level System**: Each level has pattern, rules, and validation
- **Grammar Engine**: Validates sentences based on level rules
- **Category Navigation**: Organizes levels by grammar concepts
- **Gamification**: Points, streaks, and achievements
- **Mobile-First**: Touch-optimized interface design

---

## 🤝 **Getting Help**

### **Documentation Available**
- **README.md** - Project overview
- **Phase 2 & 3 Completion Report** - Detailed feature list
- **Grammar Categories Guide** - Level progression details
- **Project Roadmap** - Development timeline

### **Code Comments**
- Comprehensive inline documentation
- Function-level explanations
- Complex logic breakdowns
- Grammar rule explanations

---

## 🎉 **You're Ready to Develop!**

This setup guide should get you up and running quickly in VS Code. The codebase is well-organized and documented, making it easy to understand and extend.

**Key Points:**
- Focus on the `src/data/` folder for grammar systems
- Test changes thoroughly with different sentence types
- Mobile-first approach is crucial for student success
- Grammar accuracy is the top priority

**Happy Coding! 🚀**

