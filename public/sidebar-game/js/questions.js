// Game Questions Database
const GAME_QUESTIONS = {
    'fix-bug': [
        {
            id: 'bug-1',
            title: 'Missing Semicolon',
            description: 'Fix the syntax error in this JavaScript code:',
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
            id: 'bug-2',
            title: 'Variable Scope Issue',
            description: 'Fix the variable scope problem:',
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
            id: 'bug-3',
            title: 'Array Method Error',
            description: 'Fix the array filtering logic:',
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
            difficulty: 'easy',
            points: 15
        }
    ],
    
    'flexbox': [
        {
            id: 'flex-1',
            title: 'Center the Frog',
            description: 'Use flexbox to center the frog on the lily pad:',
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
            id: 'flex-2',
            title: 'Frog Line-up',
            description: 'Arrange three frogs in a row with equal spacing:',
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
            points: 15
        },
        {
            id: 'flex-3',
            title: 'Vertical Frog Stack',
            description: 'Stack the frogs vertically in the center:',
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
        }
    ],
    
    'selector': [
        {
            id: 'sel-1',
            title: 'Class Selector',
            description: 'Select all elements with class "highlight":',
            htmlSnippet: `<div class="container">
    <p class="highlight">Important text</p>
    <span class="highlight">Also important</span>
    <p>Normal text</p>
</div>`,
            options: [
                '.highlight',
                '#highlight',
                'highlight',
                'p.highlight'
            ],
            solution: '.highlight',
            explanation: 'Class selectors start with a dot (.) followed by the class name.',
            difficulty: 'easy',
            points: 10
        },
        {
            id: 'sel-2',
            title: 'Child Selector',
            description: 'Select direct children paragraphs of .container:',
            htmlSnippet: `<div class="container">
    <p>Direct child</p>
    <div>
        <p>Nested paragraph</p>
    </div>
    <p>Another direct child</p>
</div>`,
            options: [
                '.container p',
                '.container > p',
                '.container + p',
                'p .container'
            ],
            solution: '.container > p',
            explanation: 'The > combinator selects direct children only.',
            difficulty: 'medium',
            points: 15
        },
        {
            id: 'sel-3',
            title: 'Pseudo-class Selector',
            description: 'Select the first paragraph in each container:',
            htmlSnippet: `<div class="container">
    <p>First paragraph</p>
    <p>Second paragraph</p>
</div>`,
            options: [
                'p:first',
                'p:first-child',
                'p:first-of-type',
                '.container p:1'
            ],
            solution: 'p:first-child',
            explanation: ':first-child selects the first child element of its parent.',
            difficulty: 'medium',
            points: 20
        }
    ],
    
    'html-builder': [
        {
            id: 'html-1',
            title: 'Basic Article Structure',
            description: 'Build a basic article with heading and paragraph:',
            targetStructure: '<article><h1>Title</h1><p>Content</p></article>',
            availableElements: ['article', 'h1', 'p', 'div', 'span'],
            solution: 'article > h1 + p',
            explanation: 'Articles should contain a heading followed by content.',
            difficulty: 'easy',
            points: 10
        },
        {
            id: 'html-2',
            title: 'Navigation Menu',
            description: 'Create a navigation menu with links:',
            targetStructure: '<nav><ul><li><a>Home</a></li><li><a>About</a></li></ul></nav>',
            availableElements: ['nav', 'ul', 'li', 'a', 'div'],
            solution: 'nav > ul > li > a',
            explanation: 'Navigation menus use nav > ul > li > a structure.',
            difficulty: 'medium',
            points: 15
        }
    ]
};

// Game configuration
const GAME_CONFIG = {
    types: {
        'fix-bug': {
            name: 'Fix the Bug',
            icon: '🐛',
            description: 'Debug JavaScript code',
            color: 'blue'
        },
        'flexbox': {
            name: 'Flexbox Frog',
            icon: '🐸',
            description: 'Master CSS Flexbox',
            color: 'green'
        },
        'selector': {
            name: 'Selector Match',
            icon: '🎯',
            description: 'Practice CSS selectors',
            color: 'purple'
        },
        'html-builder': {
            name: 'HTML Builder',
            icon: '🏗️',
            description: 'Build HTML structures',
            color: 'orange'
        }
    },
    scoring: {
        correct: 10,
        streak_bonus: 5,
        time_bonus: 2,
        show_answer_penalty: -5
    }
};
