// Game Engine for React Game Component
export class GameEngine {
  constructor() {
    this.currentQuestion = null;
    this.currentType = null;
    this.stats = this.loadStats();
    this.startTime = null;
    this.answerRevealed = false;
    this.currentDifficulty = 'easy'; // Track current difficulty level
    this.questionsInCurrentDifficulty = 0; // Track how many questions answered in current difficulty
    this.questionsPerDifficulty = 3; // Number of questions per difficulty before advancing
    this.askedQuestions = new Set(); // Track asked questions to prevent repetition
    this.currentCategory = null; // Track current category (frontend/backend)
  }
  
  // Load stats from localStorage
  loadStats() {
    try {
      const saved = localStorage.getItem('learnhub-game-stats');
      return saved ? JSON.parse(saved) : {
        score: 0,
        streak: 0,
        maxStreak: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        gamesPlayed: 0,
        lastPlayed: null
      };
    } catch (error) {
      console.error('Failed to load stats:', error);
      return {
        score: 0,
        streak: 0,
        maxStreak: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        gamesPlayed: 0,
        lastPlayed: null
      };
    }
  }
  
  // Save stats to localStorage
  saveStats() {
    try {
      this.stats.lastPlayed = new Date().toISOString();
      localStorage.setItem('learnhub-game-stats', JSON.stringify(this.stats));
    } catch (error) {
      console.error('Failed to save stats:', error);
    }
  }
  
  // Get random question of specified type with difficulty progression
  getRandomQuestion(type) {
    // Import questions dynamically
    const GAME_QUESTIONS = this.getGameQuestions();

    if (!GAME_QUESTIONS[type] || GAME_QUESTIONS[type].length === 0) {
      throw new Error(`No questions available for type: ${type}`);
    }

    const allQuestions = GAME_QUESTIONS[type];

    // Filter questions by current difficulty
    const questionsOfCurrentDifficulty = allQuestions.filter(q => q.difficulty === this.currentDifficulty);

    // If no questions of current difficulty, get any question
    const questions = questionsOfCurrentDifficulty.length > 0 ? questionsOfCurrentDifficulty : allQuestions;

    const randomIndex = Math.floor(Math.random() * questions.length);

    this.currentQuestion = { ...questions[randomIndex] };
    this.currentType = type;
    this.startTime = Date.now();
    this.answerRevealed = false;

    console.log(`Selected ${this.currentDifficulty} question:`, this.currentQuestion.title);

    return this.currentQuestion;
  }

  // Advance difficulty after correct answers
  advanceDifficulty() {
    this.questionsInCurrentDifficulty++;

    if (this.questionsInCurrentDifficulty >= this.questionsPerDifficulty) {
      if (this.currentDifficulty === 'easy') {
        this.currentDifficulty = 'medium';
        this.questionsInCurrentDifficulty = 0;
        console.log('🎯 Advanced to MEDIUM difficulty!');
        return 'medium';
      } else if (this.currentDifficulty === 'medium') {
        this.currentDifficulty = 'hard';
        this.questionsInCurrentDifficulty = 0;
        console.log('🔥 Advanced to HARD difficulty!');
        return 'hard';
      }
    }

    return this.currentDifficulty;
  }

  // Reset difficulty progression
  resetDifficulty() {
    this.currentDifficulty = 'easy';
    this.questionsInCurrentDifficulty = 0;
    console.log('🔄 Reset to EASY difficulty');
  }
  
  // Get daily challenge
  getDailyChallenge() {
    const today = new Date().toDateString();
    const savedDaily = this.loadFromStorage('daily-challenge', null);
    
    if (savedDaily && savedDaily.date === today) {
      this.currentQuestion = savedDaily.question;
      this.currentType = savedDaily.type;
      this.startTime = Date.now();
      this.answerRevealed = false;
      return this.currentQuestion;
    }
    
    // Generate new daily challenge
    const GAME_QUESTIONS = this.getGameQuestions();
    const types = Object.keys(GAME_QUESTIONS);
    const randomType = types[Math.floor(Math.random() * types.length)];
    const question = this.getRandomQuestion(randomType);
    
    this.saveToStorage('daily-challenge', {
      date: today,
      question: this.currentQuestion,
      type: this.currentType
    });
    
    return question;
  }
  
  // Validate user answer
  validateAnswer(userAnswer, isRevealed = false) {
    if (!this.currentQuestion) {
      throw new Error('No current question to validate');
    }
    
    const timeSpent = Date.now() - this.startTime;
    const timeBonusThreshold = 30000; // 30 seconds
    
    let isCorrect = false;
    let feedback = '';
    let pointsEarned = 0;
    
    // Check answer based on question type
    const questionType = this.currentQuestion.type || this.currentType;

    console.log('Validating answer:', {
      type: questionType,
      currentType: this.currentType,
      userAnswer: userAnswer,
      solution: this.currentQuestion.solution,
      questionId: this.currentQuestion.id
    });

    switch (questionType) {
      case 'fix-bug':
        isCorrect = this.validateCodeAnswer(userAnswer);
        break;
      case 'flexbox':
        isCorrect = this.validateFlexboxAnswer(userAnswer);
        break;
      case 'selector':
        isCorrect = this.validateSelectorAnswer(userAnswer);
        break;
      case 'html-builder':
        isCorrect = this.validateHTMLAnswer(userAnswer);
        break;
      default:
        isCorrect = userAnswer.trim().toLowerCase() === this.currentQuestion.solution.toLowerCase();
    }

    console.log('Validation result:', isCorrect);
    
    // Handle revealed answers
    if (isRevealed) {
      isCorrect = false;
      pointsEarned = -5;
      feedback = `💡 Answer revealed: ${this.currentQuestion.explanation}`;
    } else if (isCorrect) {
      // Calculate points for correct answer
      pointsEarned = this.currentQuestion.points || 10;
      
      // Add streak bonus
      if (this.stats.streak > 0) {
        pointsEarned += 5;
      }
      
      // Add time bonus for quick answers
      if (timeSpent < timeBonusThreshold) {
        pointsEarned += 2;
      }
      
      feedback = `🎉 Correct! ${this.currentQuestion.explanation}`;
      
      // Update streak
      this.stats.streak++;
      this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.streak);

      // Advance difficulty on correct answers
      const newDifficulty = this.advanceDifficulty();
      if (newDifficulty !== this.currentDifficulty) {
        feedback += ` 🎉 Difficulty increased to ${newDifficulty.toUpperCase()}!`;
      }
    } else {
      feedback = `❌ Incorrect. ${this.currentQuestion.explanation}`;
      this.stats.streak = 0;
    }
    
    // Update stats
    this.stats.score += pointsEarned;
    this.stats.totalQuestions++;
    if (isCorrect && !isRevealed) {
      this.stats.correctAnswers++;
    }
    
    this.saveStats();
    
    return {
      isCorrect,
      feedback,
      pointsEarned,
      timeSpent,
      explanation: this.currentQuestion.explanation
    };
  }
  
  // Validate code answer (fix-bug type)
  validateCodeAnswer(userAnswer) {
    const solution = this.currentQuestion.solution.replace(/\s+/g, ' ').trim().toLowerCase();
    const answer = userAnswer.replace(/\s+/g, ' ').trim().toLowerCase();

    // For simple fixes, check if the key changes are present
    // Look for semicolons, let vs var, === vs =, etc.

    // Check for exact match first
    if (answer === solution) {
      return true;
    }

    // Check for key fixes based on common patterns
    if (solution.includes(';') && !this.currentQuestion.code.includes(';')) {
      // Missing semicolon fix
      return answer.includes(';');
    }

    if (solution.includes('let ') && this.currentQuestion.code.includes('var ')) {
      // var to let fix
      return answer.includes('let ') && !answer.includes('var ');
    }

    if (solution.includes('===') && this.currentQuestion.code.includes('=')) {
      // Assignment to comparison fix
      return answer.includes('===') || answer.includes('==');
    }

    if (solution.includes('async ') && !this.currentQuestion.code.includes('async ')) {
      // Missing async fix
      return answer.includes('async ');
    }

    // Check if essential keywords are present
    const solutionKeywords = solution.match(/[a-zA-Z_$][a-zA-Z0-9_$]*|[{}();=<>!&|+\-*/]/g) || [];
    const answerKeywords = answer.match(/[a-zA-Z_$][a-zA-Z0-9_$]*|[{}();=<>!&|+\-*/]/g) || [];

    // At least 80% of solution keywords should be present
    const matchingKeywords = solutionKeywords.filter(keyword => answerKeywords.includes(keyword));
    return matchingKeywords.length >= solutionKeywords.length * 0.8;
  }
  
  // Validate flexbox answer
  validateFlexboxAnswer(userAnswer) {
    const solution = this.currentQuestion.solution.toLowerCase().replace(/\s+/g, '');
    const answer = userAnswer.toLowerCase().replace(/\s+/g, '');

    // Check for exact match first
    if (answer === solution) {
      return true;
    }

    // Split solution into individual CSS properties
    const requiredProps = solution.split(';').filter(prop => prop.trim());

    // Check if all required CSS properties are present (more flexible)
    const foundProps = requiredProps.filter(prop => {
      const cleanProp = prop.trim();
      if (!cleanProp) return true;

      // Handle different ways of writing the same property
      if (cleanProp.includes('justify-content')) {
        return answer.includes('justify-content');
      }
      if (cleanProp.includes('align-items')) {
        return answer.includes('align-items');
      }
      if (cleanProp.includes('flex-direction')) {
        return answer.includes('flex-direction');
      }
      if (cleanProp.includes('flex-wrap')) {
        return answer.includes('flex-wrap');
      }
      if (cleanProp.includes('align-content')) {
        return answer.includes('align-content');
      }
      if (cleanProp.includes('flex-grow')) {
        return answer.includes('flex-grow');
      }

      return answer.includes(cleanProp);
    });

    // At least 80% of properties should be present
    return foundProps.length >= requiredProps.length * 0.8;
  }
  
  // Validate CSS selector answer
  validateSelectorAnswer(userAnswer) {
    const solution = this.currentQuestion.solution.trim();
    const answer = userAnswer.trim();

    // Check for exact match first
    if (answer === solution) {
      return true;
    }

    // For selector questions with options, check if it's one of the correct answers
    if (this.currentQuestion.options && this.currentQuestion.options.includes(answer)) {
      return answer === solution;
    }

    // Case insensitive match for simple selectors
    return answer.toLowerCase() === solution.toLowerCase();
  }
  
  // Validate HTML structure answer
  validateHTMLAnswer(userAnswer) {
    const solution = this.currentQuestion.solution.toLowerCase().replace(/\s+/g, '');
    const answer = userAnswer.toLowerCase().replace(/\s+/g, '');

    // Check for exact match first
    if (answer === solution) {
      return true;
    }

    // Check if the answer contains the solution
    if (answer.includes(solution)) {
      return true;
    }

    // Extract key elements from solution and check if they're present
    const solutionTags = solution.match(/<[^>]+>/g) || [];
    const answerTags = answer.match(/<[^>]+>/g) || [];

    // Check if all required tags are present
    const foundTags = solutionTags.filter(tag => {
      const tagName = tag.match(/<\/?([a-z]+)/);
      if (tagName) {
        return answerTags.some(answerTag => answerTag.includes(tagName[1]));
      }
      return answerTags.includes(tag);
    });

    // At least 80% of tags should be present
    return foundTags.length >= solutionTags.length * 0.8;
  }
  
  // Record answer (for revealed answers)
  recordAnswer(isCorrect, question) {
    this.stats.totalQuestions++;
    if (isCorrect) {
      this.stats.correctAnswers++;
      this.stats.streak++;
      this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.streak);
    } else {
      this.stats.streak = 0;
    }
    this.saveStats();
  }
  
  // Get current stats
  getStats() {
    const accuracy = this.stats.totalQuestions > 0
      ? Math.round((this.stats.correctAnswers / this.stats.totalQuestions) * 100)
      : 0;

    return {
      ...this.stats,
      accuracy,
      currentDifficulty: this.currentDifficulty,
      questionsInCurrentDifficulty: this.questionsInCurrentDifficulty,
      questionsPerDifficulty: this.questionsPerDifficulty,
      progressToNextDifficulty: Math.round((this.questionsInCurrentDifficulty / this.questionsPerDifficulty) * 100)
    };
  }
  
  // Helper methods
  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }
  
  loadFromStorage(key, defaultValue) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from storage:', error);
      return defaultValue;
    }
  }
  
  // Get game questions (inline data)
  getGameQuestions() {
    return {
      'fix-bug': [
        // EASY QUESTIONS
        {
          id: 'bug-easy-1',
          title: 'Missing Semicolon',
          question: 'Fix the syntax error in this JavaScript code:',
          code: `function greetUser(name) {
    console.log("Hello, " + name)
    return "Welcome!"
}`,
          expectedOutput: 'Should log "Hello, John" and return "Welcome!"',
          solution: `function greetUser(name) {
    console.log("Hello, " + name);
    return "Welcome!";
}`,
          explanation: 'JavaScript statements should end with semicolons for clarity and to avoid potential issues.',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'bug-easy-2',
          title: 'Missing Quotes',
          question: 'Fix the string syntax error:',
          code: `function showMessage() {
    let message = Hello World;
    console.log(message);
}`,
          expectedOutput: 'Should log "Hello World"',
          solution: `function showMessage() {
    let message = "Hello World";
    console.log(message);
}`,
          explanation: 'Strings must be wrapped in quotes (single or double).',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'bug-easy-3',
          title: 'Wrong Operator',
          question: 'Fix the assignment vs comparison error:',
          code: `function checkAge(age) {
    if (age = 18) {
        return "Adult";
    }
    return "Minor";
}`,
          expectedOutput: 'Should return "Adult" for age 18',
          solution: `function checkAge(age) {
    if (age === 18) {
        return "Adult";
    }
    return "Minor";
}`,
          explanation: 'Use === for comparison, = is for assignment.',
          difficulty: 'easy',
          points: 10
        },

        // MEDIUM QUESTIONS
        {
          id: 'bug-medium-1',
          title: 'Variable Scope Issue',
          question: 'Fix the variable scope problem:',
          code: `function calculateTotal() {
    for (var i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 100);
    }
}`,
          expectedOutput: 'Should log 0, 1, 2',
          solution: `function calculateTotal() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 100);
    }
}`,
          explanation: 'Use "let" instead of "var" to create block scope and capture the correct value of i.',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'bug-medium-2',
          title: 'Array Method Error',
          question: 'Fix the array filtering logic:',
          code: `const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => {
    return num % 2 = 0;
});`,
          expectedOutput: 'Should return [2, 4]',
          solution: `const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => {
    return num % 2 === 0;
});`,
          explanation: 'Use === for comparison, not = which is assignment.',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'bug-medium-3',
          title: 'Undefined Function',
          question: 'Fix the function call error:',
          code: `function calculator() {
    let result = add(5, 3);
    console.log(result);
}

function Add(a, b) {
    return a + b;
}`,
          expectedOutput: 'Should log 8',
          solution: `function calculator() {
    let result = Add(5, 3);
    console.log(result);
}

function Add(a, b) {
    return a + b;
}`,
          explanation: 'JavaScript is case-sensitive. Function name "Add" must match the call exactly.',
          difficulty: 'medium',
          points: 20
        },

        // HARD QUESTIONS
        {
          id: 'bug-hard-1',
          title: 'Closure Problem',
          question: 'Fix the closure issue in this event handler:',
          code: `function setupButtons() {
    for (var i = 0; i < 3; i++) {
        document.getElementById('btn' + i).onclick = function() {
            alert('Button ' + i + ' clicked');
        };
    }
}`,
          expectedOutput: 'Should alert "Button 0", "Button 1", "Button 2" respectively',
          solution: `function setupButtons() {
    for (let i = 0; i < 3; i++) {
        document.getElementById('btn' + i).onclick = function() {
            alert('Button ' + i + ' clicked');
        };
    }
}`,
          explanation: 'Use "let" to create block scope, or use an IIFE to capture the variable value.',
          difficulty: 'hard',
          points: 30
        },
        {
          id: 'bug-hard-2',
          title: 'Async/Await Error',
          question: 'Fix the async function error:',
          code: `function fetchData() {
    const data = await fetch('/api/data');
    return data.json();
}`,
          expectedOutput: 'Should properly handle async operation',
          solution: `async function fetchData() {
    const data = await fetch('/api/data');
    return data.json();
}`,
          explanation: 'Functions using "await" must be declared as "async".',
          difficulty: 'hard',
          points: 30
        },
        {
          id: 'bug-hard-3',
          title: 'This Binding Issue',
          question: 'Fix the "this" context problem:',
          code: `class Counter {
    constructor() {
        this.count = 0;
    }

    increment() {
        this.count++;
    }

    start() {
        setInterval(this.increment, 1000);
    }
}`,
          expectedOutput: 'Should properly increment the counter',
          solution: `class Counter {
    constructor() {
        this.count = 0;
    }

    increment() {
        this.count++;
    }

    start() {
        setInterval(() => this.increment(), 1000);
    }
}`,
          explanation: 'Use arrow function to preserve "this" context, or bind the method.',
          difficulty: 'hard',
          points: 30
        }
      ],
      'flexbox': [
        // EASY QUESTIONS
        {
          id: 'flex-easy-1',
          title: 'Center the Frog',
          question: 'Use flexbox to center the frog on the lily pad:',
          htmlStructure: '<div class="pond"><div class="frog">🐸</div></div>',
          cssTemplate: `.pond {
    display: flex;
    width: 200px;
    height: 100px;
    background: #4ade80;
    border-radius: 10px;
    /* Add your CSS here */
}
.frog { font-size: 24px; }`,
          solution: 'justify-content: center; align-items: center;',
          explanation: 'justify-content centers horizontally, align-items centers vertically.',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'flex-easy-2',
          title: 'Align to Right',
          question: 'Move the frog to the right side of the pond:',
          htmlStructure: '<div class="pond"><div class="frog">🐸</div></div>',
          cssTemplate: `.pond {
    display: flex;
    width: 250px;
    height: 80px;
    background: #4ade80;
    border-radius: 10px;
    /* Add your CSS here */
}
.frog { font-size: 20px; }`,
          solution: 'justify-content: flex-end; align-items: center;',
          explanation: 'justify-content: flex-end moves items to the right side.',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'flex-easy-3',
          title: 'Bottom Center',
          question: 'Place the frog at the bottom center:',
          htmlStructure: '<div class="pond"><div class="frog">🐸</div></div>',
          cssTemplate: `.pond {
    display: flex;
    width: 200px;
    height: 120px;
    background: #4ade80;
    border-radius: 10px;
    /* Add your CSS here */
}
.frog { font-size: 20px; }`,
          solution: 'justify-content: center; align-items: flex-end;',
          explanation: 'align-items: flex-end moves items to the bottom.',
          difficulty: 'easy',
          points: 10
        },

        // MEDIUM QUESTIONS
        {
          id: 'flex-medium-1',
          title: 'Frog Line-up',
          question: 'Arrange three frogs in a row with equal spacing:',
          htmlStructure: '<div class="pond"><div class="frog">🐸</div><div class="frog">🐸</div><div class="frog">🐸</div></div>',
          cssTemplate: `.pond {
    display: flex;
    width: 300px;
    height: 80px;
    background: #4ade80;
    border-radius: 10px;
    /* Add your CSS here */
}
.frog { font-size: 20px; }`,
          solution: 'justify-content: space-between; align-items: center;',
          explanation: 'space-between distributes items evenly with space between them.',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'flex-medium-2',
          title: 'Vertical Frog Stack',
          question: 'Stack the frogs vertically in the center:',
          htmlStructure: '<div class="pond"><div class="frog">🐸</div><div class="frog">🐸</div></div>',
          cssTemplate: `.pond {
    display: flex;
    width: 100px;
    height: 200px;
    background: #4ade80;
    border-radius: 10px;
    /* Add your CSS here */
}
.frog { font-size: 20px; }`,
          solution: 'flex-direction: column; justify-content: center; align-items: center;',
          explanation: 'flex-direction: column stacks items vertically.',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'flex-medium-3',
          title: 'Space Around',
          question: 'Distribute frogs with space around each one:',
          htmlStructure: '<div class="pond"><div class="frog">🐸</div><div class="frog">🐸</div><div class="frog">🐸</div></div>',
          cssTemplate: `.pond {
    display: flex;
    width: 350px;
    height: 80px;
    background: #4ade80;
    border-radius: 10px;
    /* Add your CSS here */
}
.frog { font-size: 18px; }`,
          solution: 'justify-content: space-around; align-items: center;',
          explanation: 'space-around adds equal space around each item.',
          difficulty: 'medium',
          points: 20
        },

        // HARD QUESTIONS
        {
          id: 'flex-hard-1',
          title: 'Flex Wrap Challenge',
          question: 'Make frogs wrap to next line when needed:',
          htmlStructure: '<div class="pond"><div class="frog">🐸</div><div class="frog">🐸</div><div class="frog">🐸</div><div class="frog">🐸</div></div>',
          cssTemplate: `.pond {
    display: flex;
    width: 150px;
    height: 120px;
    background: #4ade80;
    border-radius: 10px;
    /* Add your CSS here */
}
.frog { font-size: 16px; margin: 5px; }`,
          solution: 'flex-wrap: wrap; justify-content: center; align-content: center;',
          explanation: 'flex-wrap: wrap allows items to wrap, align-content aligns wrapped lines.',
          difficulty: 'hard',
          points: 30
        },
        {
          id: 'flex-hard-2',
          title: 'Flex Grow Challenge',
          question: 'Make the middle frog take up remaining space:',
          htmlStructure: '<div class="pond"><div class="frog small">🐸</div><div class="frog big">🐸</div><div class="frog small">🐸</div></div>',
          cssTemplate: `.pond {
    display: flex;
    width: 300px;
    height: 80px;
    background: #4ade80;
    border-radius: 10px;
    align-items: center;
}
.frog { font-size: 16px; }
/* Add your CSS here for .big */`,
          solution: '.big { flex-grow: 1; }',
          explanation: 'flex-grow: 1 makes the element take up remaining space.',
          difficulty: 'hard',
          points: 30
        },
        {
          id: 'flex-hard-3',
          title: 'Complex Layout',
          question: 'Create a complex layout with reverse column direction:',
          htmlStructure: '<div class="pond"><div class="frog">🐸</div><div class="frog">🐸</div><div class="frog">🐸</div></div>',
          cssTemplate: `.pond {
    display: flex;
    width: 120px;
    height: 250px;
    background: #4ade80;
    border-radius: 10px;
    /* Add your CSS here */
}
.frog { font-size: 18px; margin: 5px; }`,
          solution: 'flex-direction: column-reverse; justify-content: space-evenly; align-items: center;',
          explanation: 'column-reverse stacks vertically in reverse order, space-evenly distributes evenly.',
          difficulty: 'hard',
          points: 30
        }
      ],
      'selector': [
        // EASY QUESTIONS
        {
          id: 'sel-easy-1',
          title: 'Class Selector',
          question: 'Select all elements with class "highlight":',
          htmlSnippet: `<div class="container">
    <p class="highlight">Important text</p>
    <span class="highlight">Also important</span>
    <p>Normal text</p>
</div>`,
          options: ['.highlight', '#highlight', 'highlight', 'p.highlight'],
          solution: '.highlight',
          explanation: 'Class selectors start with a dot (.) followed by the class name.',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'sel-easy-2',
          title: 'ID Selector',
          question: 'Select the element with ID "header":',
          htmlSnippet: `<div>
    <h1 id="header">Main Title</h1>
    <p class="header">Subtitle</p>
</div>`,
          options: ['#header', '.header', 'header', 'h1#header'],
          solution: '#header',
          explanation: 'ID selectors start with a hash (#) followed by the ID name.',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'sel-easy-3',
          title: 'Element Selector',
          question: 'Select all paragraph elements:',
          htmlSnippet: `<div>
    <h1>Title</h1>
    <p>First paragraph</p>
    <p>Second paragraph</p>
    <span>Not a paragraph</span>
</div>`,
          options: ['p', '.p', '#p', 'paragraph'],
          solution: 'p',
          explanation: 'Element selectors use just the tag name without any prefix.',
          difficulty: 'easy',
          points: 10
        },

        // MEDIUM QUESTIONS
        {
          id: 'sel-medium-1',
          title: 'Child Selector',
          question: 'Select direct children paragraphs of .container:',
          htmlSnippet: `<div class="container">
    <p>Direct child</p>
    <div>
        <p>Nested paragraph</p>
    </div>
    <p>Another direct child</p>
</div>`,
          options: ['.container p', '.container > p', '.container + p', 'p .container'],
          solution: '.container > p',
          explanation: 'The > combinator selects direct children only.',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'sel-medium-2',
          title: 'Descendant Selector',
          question: 'Select all paragraphs inside .article (including nested):',
          htmlSnippet: `<div class="article">
    <p>Direct paragraph</p>
    <div class="section">
        <p>Nested paragraph</p>
        <div>
            <p>Deeply nested</p>
        </div>
    </div>
</div>`,
          options: ['.article > p', '.article p', '.article + p', 'p.article'],
          solution: '.article p',
          explanation: 'Space between selectors selects all descendants, not just direct children.',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'sel-medium-3',
          title: 'Adjacent Sibling',
          question: 'Select the paragraph that immediately follows h1:',
          htmlSnippet: `<div>
    <h1>Title</h1>
    <p>This paragraph follows h1</p>
    <div>Some content</div>
    <p>This paragraph does not</p>
</div>`,
          options: ['h1 + p', 'h1 > p', 'h1 ~ p', 'h1 p'],
          solution: 'h1 + p',
          explanation: 'The + combinator selects the immediately following sibling.',
          difficulty: 'medium',
          points: 20
        },

        // HARD QUESTIONS
        {
          id: 'sel-hard-1',
          title: 'Pseudo-class Selector',
          question: 'Select the first paragraph in each container:',
          htmlSnippet: `<div class="container">
    <p>First paragraph</p>
    <p>Second paragraph</p>
</div>
<div class="container">
    <p>Another first paragraph</p>
</div>`,
          options: ['p:first', 'p:first-child', 'p:first-of-type', '.container p:1'],
          solution: 'p:first-child',
          explanation: ':first-child selects the first child element of its parent.',
          difficulty: 'hard',
          points: 30
        },
        {
          id: 'sel-hard-2',
          title: 'Attribute Selector',
          question: 'Select all input elements with type="email":',
          htmlSnippet: `<form>
    <input type="text" name="username">
    <input type="email" name="email">
    <input type="password" name="password">
    <input type="email" name="confirm-email">
</form>`,
          options: ['input[type="email"]', 'input.email', 'input#email', 'input:email'],
          solution: 'input[type="email"]',
          explanation: 'Attribute selectors use square brackets: [attribute="value"].',
          difficulty: 'hard',
          points: 30
        },
        {
          id: 'sel-hard-3',
          title: 'Complex Selector',
          question: 'Select odd-numbered list items in .menu:',
          htmlSnippet: `<ul class="menu">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
    <li>Item 5</li>
</ul>`,
          options: ['.menu li:odd', '.menu li:nth-child(odd)', '.menu li:nth-of-type(2n+1)', 'Both B and C'],
          solution: 'Both B and C',
          explanation: 'Both :nth-child(odd) and :nth-of-type(2n+1) select odd-numbered elements.',
          difficulty: 'hard',
          points: 30
        }
      ],
      'html-builder': [
        // EASY QUESTIONS
        {
          id: 'html-easy-1',
          title: 'Basic Paragraph',
          question: 'Create a paragraph element with the text "Hello World":',
          expectedStructure: '<p>Hello World</p>',
          solution: '<p>Hello World</p>',
          explanation: 'Use the <p> tag to create paragraphs in HTML.',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'html-easy-2',
          title: 'Heading Element',
          question: 'Create a main heading (h1) with the text "Welcome":',
          expectedStructure: '<h1>Welcome</h1>',
          solution: '<h1>Welcome</h1>',
          explanation: 'Use <h1> for the main heading on a page.',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'html-easy-3',
          title: 'Simple Link',
          question: 'Create a link to "https://example.com" with text "Click here":',
          expectedStructure: '<a href="https://example.com">Click here</a>',
          solution: '<a href="https://example.com">Click here</a>',
          explanation: 'Use the <a> tag with href attribute to create links.',
          difficulty: 'easy',
          points: 10
        },

        // MEDIUM QUESTIONS
        {
          id: 'html-medium-1',
          title: 'Image with Alt Text',
          question: 'Create an image element with src "logo.png" and alt text "Company Logo":',
          expectedStructure: '<img src="logo.png" alt="Company Logo">',
          solution: '<img src="logo.png" alt="Company Logo">',
          explanation: 'Always include alt text for accessibility.',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'html-medium-2',
          title: 'Unordered List',
          question: 'Create a list with items "Apple", "Banana", "Orange":',
          expectedStructure: '<ul><li>Apple</li><li>Banana</li><li>Orange</li></ul>',
          solution: '<ul><li>Apple</li><li>Banana</li><li>Orange</li></ul>',
          explanation: 'Use <ul> for unordered lists and <li> for list items.',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'html-medium-3',
          title: 'Form Input',
          question: 'Create a text input with name "username" and placeholder "Enter username":',
          expectedStructure: '<input type="text" name="username" placeholder="Enter username">',
          solution: '<input type="text" name="username" placeholder="Enter username">',
          explanation: 'Use input elements with appropriate type and attributes.',
          difficulty: 'medium',
          points: 20
        },

        // HARD QUESTIONS
        {
          id: 'html-hard-1',
          title: 'Table Structure',
          question: 'Create a table with headers "Name" and "Age", and one row with "John" and "25":',
          expectedStructure: '<table><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>John</td><td>25</td></tr></tbody></table>',
          solution: '<table><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>John</td><td>25</td></tr></tbody></table>',
          explanation: 'Use proper table structure with thead, tbody, th, and td elements.',
          difficulty: 'hard',
          points: 30
        },
        {
          id: 'html-hard-2',
          title: 'Form with Validation',
          question: 'Create a form with email input (required) and submit button:',
          expectedStructure: '<form><input type="email" required><button type="submit">Submit</button></form>',
          solution: '<form><input type="email" required><button type="submit">Submit</button></form>',
          explanation: 'Use form elements with proper input types and validation attributes.',
          difficulty: 'hard',
          points: 30
        },
        {
          id: 'html-hard-3',
          title: 'Semantic Article',
          question: 'Create an article with header containing h2 "News Title" and paragraph "Article content":',
          expectedStructure: '<article><header><h2>News Title</h2></header><p>Article content</p></article>',
          solution: '<article><header><h2>News Title</h2></header><p>Article content</p></article>',
          explanation: 'Use semantic HTML5 elements like article and header for better structure.',
          difficulty: 'hard',
          points: 30
        }
      ],
      'mixed': [
        // Mix of all question types with progressive difficulty
        // Easy questions from all categories
        {
          id: 'mixed-easy-1',
          title: 'Missing Semicolon',
          question: 'Fix the syntax error in this JavaScript code:',
          code: `function sayHello() {
    console.log("Hello")
}`,
          expectedOutput: 'Should log "Hello"',
          solution: `function sayHello() {
    console.log("Hello");
}`,
          explanation: 'JavaScript statements should end with semicolons.',
          difficulty: 'easy',
          points: 10,
          type: 'fix-bug'
        },
        {
          id: 'mixed-easy-2',
          title: 'Center with Flexbox',
          question: 'Center the content using flexbox:',
          htmlStructure: '<div class="container"><div class="item">📦</div></div>',
          cssTemplate: `.container {
    display: flex;
    width: 200px;
    height: 100px;
    background: #e5e7eb;
    /* Add your CSS here */
}
.item { font-size: 24px; }`,
          solution: 'justify-content: center; align-items: center;',
          explanation: 'Use justify-content and align-items to center content.',
          difficulty: 'easy',
          points: 10,
          type: 'flexbox'
        },
        {
          id: 'mixed-easy-3',
          title: 'Basic HTML',
          question: 'Create a heading with text "Welcome":',
          expectedStructure: '<h1>Welcome</h1>',
          solution: '<h1>Welcome</h1>',
          explanation: 'Use <h1> for main headings.',
          difficulty: 'easy',
          points: 10,
          type: 'html-builder'
        },

        // Medium difficulty mix
        {
          id: 'mixed-medium-1',
          title: 'Variable Scope',
          question: 'Fix the closure issue:',
          code: `for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}`,
          expectedOutput: 'Should log 0, 1, 2',
          solution: `for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}`,
          explanation: 'Use "let" for block scope.',
          difficulty: 'medium',
          points: 20,
          type: 'fix-bug'
        },
        {
          id: 'mixed-medium-2',
          title: 'Child Selector',
          question: 'Select direct children paragraphs of .content:',
          htmlSnippet: `<div class="content">
    <p>Direct child</p>
    <div><p>Nested</p></div>
</div>`,
          options: ['.content p', '.content > p', '.content + p', 'p.content'],
          solution: '.content > p',
          explanation: 'The > combinator selects direct children.',
          difficulty: 'medium',
          points: 20,
          type: 'selector'
        },

        // Hard difficulty mix
        {
          id: 'mixed-hard-1',
          title: 'Complex Flexbox',
          question: 'Create a column layout with reverse order:',
          htmlStructure: '<div class="container"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div>',
          cssTemplate: `.container {
    display: flex;
    width: 100px;
    height: 200px;
    background: #e5e7eb;
    /* Add your CSS here */
}
.item { margin: 5px; padding: 10px; background: #3b82f6; color: white; }`,
          solution: 'flex-direction: column-reverse; align-items: center;',
          explanation: 'Use column-reverse to stack vertically in reverse order.',
          difficulty: 'hard',
          points: 30,
          type: 'flexbox'
        }
      ]
    };
  }
}
