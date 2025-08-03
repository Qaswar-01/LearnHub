// Sample data for the learning app

export const lessons = [
  {
    id: 'lesson-1',
    title: 'JavaScript Introduction & Setup',
    description: 'Learn what JavaScript is, its history, and how to set up your development environment.',
    content: `
      <h2>Welcome to JavaScript Programming</h2>
      <p>JavaScript is a versatile, high-level programming language that powers the modern web. Originally created for web browsers, it now runs everywhere - from servers to mobile apps to desktop applications.</p>

      <h3>What is JavaScript?</h3>
      <p>JavaScript is a dynamic, interpreted programming language that enables interactive web pages. It's an essential part of web applications alongside HTML and CSS.</p>

      <h3>JavaScript History</h3>
      <p>Created by Brendan Eich in 1995 at Netscape, JavaScript has evolved from a simple scripting language to a powerful programming language used for:</p>
      <ul>
        <li><strong>Frontend Development</strong>: Interactive user interfaces</li>
        <li><strong>Backend Development</strong>: Server-side applications with Node.js</li>
        <li><strong>Mobile Apps</strong>: React Native, Ionic</li>
        <li><strong>Desktop Apps</strong>: Electron</li>
        <li><strong>Game Development</strong>: Browser and mobile games</li>
      </ul>

      <h3>Setting Up Your Environment</h3>
      <p>To start coding in JavaScript, you need:</p>
      <ul>
        <li>A web browser (Chrome, Firefox, Safari, Edge)</li>
        <li>A code editor (VS Code, Sublime Text, Atom)</li>
        <li>Basic HTML knowledge</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '15 minutes',
    difficulty: 1,
  },
  {
    id: 'lesson-2',
    title: 'JavaScript Basics & Syntax',
    description: 'Learn JavaScript fundamentals including variables, data types, and basic operations.',
    content: `
      <h2>JavaScript Basics & Syntax</h2>
      <p>In this lesson, we'll cover the fundamental building blocks of JavaScript programming including variables, data types, and basic syntax.</p>

      <h3>Variables in JavaScript</h3>
      <p>Variables are containers for storing data values. JavaScript has three ways to declare variables:</p>
      <pre><code>// Modern JavaScript (ES6+)
let name = "John";        // Can be reassigned
const age = 25;           // Cannot be reassigned
var country = "USA";      // Old way (avoid in modern code)

// Variable naming rules
let firstName = "Jane";   // camelCase (recommended)
let user_name = "bob";    // snake_case (less common)
let $element = document;  // Can start with $
let _private = "secret";  // Can start with _</code></pre>

      <h3>Data Types</h3>
      <p>JavaScript has several built-in data types:</p>
      <pre><code>// Primitive types
let text = "Hello World";     // String
let number = 42;              // Number
let decimal = 3.14;           // Number (no separate float type)
let isActive = true;          // Boolean
let nothing = null;           // Null
let notDefined;               // Undefined

// Complex types
let colors = ["red", "blue"]; // Array
let person = {                // Object
  name: "Alice",
  age: 30
};</code></pre>

      <h3>Basic Operations</h3>
      <pre><code>// Arithmetic operators
let sum = 10 + 5;        // Addition: 15
let difference = 10 - 5; // Subtraction: 5
let product = 10 * 5;    // Multiplication: 50
let quotient = 10 / 5;   // Division: 2
let remainder = 10 % 3;  // Modulus: 1

// String operations
let greeting = "Hello" + " " + "World"; // Concatenation
let template = \`Hello \${name}\`;        // Template literals</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '20 minutes',
    difficulty: 1,
  },
  {
    id: 'lesson-3',
    title: 'Functions & Control Flow',
    description: 'Master JavaScript functions, conditionals, and loops for program control.',
    content: `
      <h2>Functions & Control Flow</h2>
      <p>Functions are reusable blocks of code that perform specific tasks. Control flow statements help you make decisions and repeat actions in your programs.</p>



      <h3>Functions</h3>
      <p>Functions are fundamental building blocks in JavaScript:</p>
      <pre><code>// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Function expression
const add = function(a, b) {
  return a + b;
};

// Arrow function (ES6+)
const multiply = (a, b) => a * b;

// Arrow function with block body
const divide = (a, b) => {
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
};</code></pre>

      <h3>Conditional Statements</h3>
      <pre><code>// if...else statement
let age = 18;
if (age >= 18) {
  console.log("You are an adult");
} else if (age >= 13) {
  console.log("You are a teenager");
} else {
  console.log("You are a child");
}

// Switch statement
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of work week");
    break;
  case "Friday":
    console.log("TGIF!");
    break;
  default:
    console.log("Regular day");
}</code></pre>

      <h3>Loops</h3>
      <pre><code>// For loop
for (let i = 0; i < 5; i++) {
  console.log("Count: " + i);
}

// While loop
let count = 0;
while (count < 3) {
  console.log("While count: " + count);
  count++;
}

// For...of loop (arrays)
let fruits = ["apple", "banana", "orange"];
for (let fruit of fruits) {
  console.log(fruit);
}

// For...in loop (objects)
let person = {name: "John", age: 30};
for (let key in person) {
  console.log(key + ": " + person[key]);
}</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '25 minutes',
    difficulty: 2,  },
  {
    id: 'lesson-4',
    title: 'Arrays & Objects',
    description: 'Learn to work with JavaScript arrays and objects for data storage and manipulation.',
    content: `
      <h2>Arrays & Objects</h2>
      <p>Arrays and objects are essential data structures in JavaScript that allow you to store and organize multiple values efficiently.</p>



      <h3>Arrays</h3>
      <p>Arrays are ordered lists of values, indexed starting from 0:</p>
      <pre><code>// Creating arrays
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["hello", 42, true, null];

// Accessing elements
console.log(fruits[0]);        // "apple"
console.log(fruits.length);    // 3

// Adding elements
fruits.push("grape");          // Add to end
fruits.unshift("mango");       // Add to beginning

// Removing elements
let lastFruit = fruits.pop();  // Remove from end
let firstFruit = fruits.shift(); // Remove from beginning

// Array methods
let doubled = numbers.map(n => n * 2);     // [2, 4, 6, 8, 10]
let evens = numbers.filter(n => n % 2 === 0); // [2, 4]
let sum = numbers.reduce((acc, n) => acc + n, 0); // 15</code></pre>

      <h3>Objects</h3>
      <p>Objects store data as key-value pairs:</p>
      <pre><code>// Creating objects
let person = {
  name: "John Doe",
  age: 30,
  city: "New York",
  isEmployed: true
};

// Accessing properties
console.log(person.name);        // "John Doe"
console.log(person["age"]);      // 30

// Adding/modifying properties
person.email = "john@email.com";
person.age = 31;

// Deleting properties
delete person.city;

// Object methods
let car = {
  brand: "Toyota",
  model: "Camry",
  year: 2020,
  start: function() {
    console.log("Car started!");
  },
  getInfo() {
    return \`\${this.brand} \${this.model} (\${this.year})\`;
  }
};</code></pre>

      <h3>Destructuring</h3>
      <pre><code>// Array destructuring
let [first, second, ...rest] = fruits;

// Object destructuring
let {name, age, city = "Unknown"} = person;

// Function parameter destructuring
function greetPerson({name, age}) {
  console.log(\`Hello \${name}, you are \${age} years old\`);
}</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '30 minutes',
    difficulty: 2,  },
  {
    id: 'lesson-5',
    title: 'DOM Manipulation',
    description: 'Learn to interact with HTML elements using JavaScript and the Document Object Model.',
    content: `
      <h2>DOM Manipulation</h2>
      <p>The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page so that programs can change the document structure, style, and content.</p>



      <h3>Selecting Elements</h3>
      <pre><code>// By ID
const element = document.getElementById("myId");

// By class name
const elements = document.getElementsByClassName("myClass");
const element = document.querySelector(".myClass");
const allElements = document.querySelectorAll(".myClass");

// By tag name
const paragraphs = document.getElementsByTagName("p");

// By CSS selector
const firstButton = document.querySelector("button");
const allButtons = document.querySelectorAll("button");</code></pre>

      <h3>Modifying Content</h3>
      <pre><code>// Change text content
element.textContent = "New text content";

// Change HTML content
element.innerHTML = "&lt;strong&gt;Bold text&lt;/strong&gt;";

// Change attributes
element.setAttribute("src", "new-image.jpg");
element.id = "newId";
element.className = "newClass";

// Change styles
element.style.color = "red";
element.style.backgroundColor = "yellow";
element.style.display = "none";</code></pre>

      <h3>Creating and Adding Elements</h3>
      <pre><code>// Create new element
const newDiv = document.createElement("div");
newDiv.textContent = "I'm a new div!";
newDiv.className = "new-element";

// Add to DOM
document.body.appendChild(newDiv);

// Insert before another element
const parent = document.getElementById("parent");
const referenceNode = document.getElementById("reference");
parent.insertBefore(newDiv, referenceNode);</code></pre>

      <h3>Event Handling</h3>
      <pre><code>// Add event listener
button.addEventListener("click", function() {
  console.log("Button clicked!");
});

// Arrow function event handler
button.addEventListener("click", () => {
  alert("Hello World!");
});

// Event object
input.addEventListener("input", (event) => {
  console.log("Input value:", event.target.value);
});

// Remove event listener
function handleClick() {
  console.log("Clicked!");
}
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '35 minutes',
    difficulty: 3,  },
  {
    id: 'lesson-6',
    title: 'Events & Event Handling',
    description: 'Master JavaScript events, event listeners, and interactive user interfaces.',
    content: `
      <h2>Events & Event Handling</h2>
      <p>Events are actions that happen in the browser - like clicks, key presses, or page loads. Event handling allows you to respond to these actions and create interactive web applications.</p>



      <h3>Common Event Types</h3>
      <pre><code>// Mouse events
button.addEventListener("click", handleClick);
element.addEventListener("mouseenter", handleMouseEnter);
element.addEventListener("mouseleave", handleMouseLeave);

// Keyboard events
input.addEventListener("keydown", handleKeyDown);
input.addEventListener("keyup", handleKeyUp);
document.addEventListener("keypress", handleKeyPress);

// Form events
form.addEventListener("submit", handleSubmit);
input.addEventListener("change", handleChange);
input.addEventListener("input", handleInput);

// Window events
window.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize);
window.addEventListener("scroll", handleScroll);</code></pre>

      <h3>Event Object</h3>
      <p>Event handlers receive an event object with information about the event:</p>
      <pre><code>function handleClick(event) {
  console.log("Event type:", event.type);
  console.log("Target element:", event.target);
  console.log("Mouse position:", event.clientX, event.clientY);

  // Prevent default behavior
  event.preventDefault();

  // Stop event propagation
  event.stopPropagation();
}

// Arrow function with event
const handleInput = (e) => {
  console.log("Input value:", e.target.value);
  console.log("Key pressed:", e.key);
};</code></pre>

      <h3>Event Delegation</h3>
      <p>Handle events on multiple elements efficiently using event delegation:</p>
      <pre><code>// Instead of adding listeners to each button
const container = document.getElementById("button-container");

container.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    console.log("Button clicked:", event.target.textContent);
  }
});

// Dynamic content handling
document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    event.target.parentElement.remove();
  }
});</code></pre>

      <h3>Creating Interactive Elements</h3>
      <pre><code>// Toggle visibility
const toggleButton = document.getElementById("toggle");
const content = document.getElementById("content");

toggleButton.addEventListener("click", () => {
  content.style.display = content.style.display === "none" ? "block" : "none";
});

// Form validation
const emailInput = document.getElementById("email");
const errorMessage = document.getElementById("error");

emailInput.addEventListener("blur", () => {
  const email = emailInput.value;
  const isValid = email.includes("@") && email.includes(".");

  if (!isValid) {
    errorMessage.textContent = "Please enter a valid email";
    emailInput.style.borderColor = "red";
  } else {
    errorMessage.textContent = "";
    emailInput.style.borderColor = "green";
  }
});</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '30 minutes',
    difficulty: 3,  },
  {
    id: 'lesson-7',
    title: 'Error Handling & Debugging',
    description: 'Learn to handle errors gracefully and debug JavaScript code effectively.',
    content: `
      <h2>Error Handling & Debugging</h2>
      <p>Error handling and debugging are crucial skills for any JavaScript developer. Learn to anticipate, catch, and fix errors in your code.</p>



      <h3>Types of Errors</h3>
      <pre><code>// Syntax Error - code won't run
// console.log("Hello World"  // Missing closing parenthesis

// Reference Error - variable doesn't exist
console.log(undefinedVariable);

// Type Error - wrong data type operation
let number = 42;
number.toUpperCase(); // Numbers don't have toUpperCase method

// Range Error - value out of range
let arr = new Array(-1); // Negative array length</code></pre>

      <h3>Try-Catch-Finally</h3>
      <p>Handle errors gracefully with try-catch blocks:</p>
      <pre><code>try {
  // Code that might throw an error
  let result = riskyOperation();
  console.log("Success:", result);
} catch (error) {
  // Handle the error
  console.error("An error occurred:", error.message);
} finally {
  // This always runs
  console.log("Cleanup operations");
}

// Specific error handling
try {
  JSON.parse("invalid json");
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log("Invalid JSON format");
  } else {
    console.log("Unknown error:", error);
  }
}</code></pre>

      <h3>Throwing Custom Errors</h3>
      <pre><code>function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

// Custom error class
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email format");
  }
  return true;
}</code></pre>

      <h3>Debugging Techniques</h3>
      <pre><code>// Console methods
console.log("Basic logging");
console.error("Error message");
console.warn("Warning message");
console.info("Information");
console.table([{name: "John", age: 30}, {name: "Jane", age: 25}]);

// Debugging with breakpoints
debugger; // Pauses execution in browser dev tools

// Conditional logging
const DEBUG = true;
if (DEBUG) {
  console.log("Debug info:", variable);
}

// Performance timing
console.time("operation");
// ... some code
console.timeEnd("operation");</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '25 minutes',
    difficulty: 3,  },
  {
    id: 'lesson-8',
    title: 'Asynchronous JavaScript',
    description: 'Master callbacks, promises, and async/await for handling asynchronous operations.',
    content: `
      <h2>Asynchronous JavaScript</h2>
      <p>JavaScript is single-threaded, but it can handle asynchronous operations efficiently. Learn about callbacks, promises, and async/await to manage asynchronous code.</p>



      <h3>Callbacks</h3>
      <p>Callbacks are functions passed as arguments to other functions:</p>
      <pre><code>// Basic callback
function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

greet("John", function() {
  console.log("Greeting completed!");
});

// Asynchronous callback
setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);

// Callback hell (avoid this!)
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      // This gets messy quickly
    });
  });
});</code></pre>

      <h3>Promises</h3>
      <p>Promises provide a cleaner way to handle asynchronous operations:</p>
      <pre><code>// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve("Operation successful!");
    } else {
      reject("Operation failed!");
    }
  }, 1000);
});

// Using promises
myPromise
  .then(result => {
    console.log(result);
    return "Next step";
  })
  .then(nextResult => {
    console.log(nextResult);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log("Promise completed");
  });</code></pre>

      <h3>Async/Await</h3>
      <p>Async/await makes asynchronous code look and behave more like synchronous code:</p>
      <pre><code>// Async function
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Using async function
async function main() {
  try {
    const data = await fetchData();
    console.log('Data received:', data);
  } catch (error) {
    console.log('Failed to fetch data');
  }
}

// Promise.all for multiple async operations
async function fetchMultipleData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);

    return { users, posts, comments };
  } catch (error) {
    console.error('One or more requests failed:', error);
  }
}</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '35 minutes',
    difficulty: 4,  },
  {
    id: 'lesson-9',
    title: 'Working with APIs & Fetch',
    description: 'Learn to fetch data from APIs, handle responses, and integrate external data into your applications.',
    content: `
      <h2>Working with APIs & Fetch</h2>
      <p>APIs (Application Programming Interfaces) allow different software applications to communicate. Learn to fetch data from REST APIs and integrate external data into your applications.</p>



      <h3>What is an API?</h3>
      <p>An API is a set of protocols and tools for building software applications. REST APIs use HTTP methods to perform operations on resources.</p>

      <h3>The Fetch API</h3>
      <pre><code>// Basic GET request
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using async/await
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}</code></pre>

      <h3>HTTP Methods</h3>
      <pre><code>// GET - Retrieve data
const getUser = async (id) => {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  return response.json();
};

// POST - Create new data
const createUser = async (userData) => {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// PUT - Update existing data
const updateUser = async (id, userData) => {
  const response = await fetch(\`https://api.example.com/users/\${id}\`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// DELETE - Remove data
const deleteUser = async (id) => {
  const response = await fetch(\`https://api.example.com/users/\${id}\`, {
    method: 'DELETE'
  });
  return response.ok;
};</code></pre>

      <h3>Handling Different Response Types</h3>
      <pre><code>// JSON response
const jsonData = await response.json();

// Text response
const textData = await response.text();

// Blob response (for files)
const blobData = await response.blob();

// Check response status
if (response.ok) {
  // Success (status 200-299)
  const data = await response.json();
} else {
  // Error
  console.error('Request failed:', response.status, response.statusText);
}</code></pre>

      <h3>Real-world Example</h3>
      <pre><code>// Weather API integration
async function getWeather(city) {
  const API_KEY = 'your-api-key';
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    const weatherData = await response.json();

    return {
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    duration: '30 minutes',
    difficulty: 3,  },
  {
    id: 'lesson-10',
    title: 'Object-Oriented Programming',
    description: 'Learn OOP concepts in JavaScript including classes, inheritance, and encapsulation.',
    content: `
      <h2>Object-Oriented Programming in JavaScript</h2>
      <p>Object-Oriented Programming (OOP) is a programming paradigm that organizes code into objects and classes. JavaScript supports OOP through prototypes and ES6 classes.</p>



      <h3>Classes and Objects</h3>
      <pre><code>// ES6 Class syntax
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, my name is \${this.name}\`;
  }

  getAge() {
    return this.age;
  }

  // Static method
  static species() {
    return "Homo sapiens";
  }
}

// Creating objects
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

console.log(person1.greet()); // "Hello, my name is Alice"
console.log(Person.species()); // "Homo sapiens"</code></pre>

      <h3>Inheritance</h3>
      <pre><code>// Parent class
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }

  makeSound() {
    return "Some generic animal sound";
  }

  info() {
    return \`\${this.name} is a \${this.species}\`;
  }
}

// Child class
class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Dog"); // Call parent constructor
    this.breed = breed;
  }

  makeSound() {
    return "Woof! Woof!";
  }

  fetch() {
    return \`\${this.name} is fetching the ball!\`;
  }
}

const myDog = new Dog("Buddy", "Golden Retriever");
console.log(myDog.makeSound()); // "Woof! Woof!"
console.log(myDog.info()); // "Buddy is a Dog"</code></pre>

      <h3>Encapsulation (Private Fields)</h3>
      <pre><code>class BankAccount {
  #balance = 0; // Private field
  #accountNumber;

  constructor(accountNumber, initialBalance = 0) {
    this.#accountNumber = accountNumber;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }

  getBalance() {
    return this.#balance;
  }

  // Private method
  #validateTransaction(amount) {
    return amount > 0 && amount <= this.#balance;
  }
}

const account = new BankAccount("123456", 1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // Error: Private field</code></pre>

      <h3>Prototypes (Alternative to Classes)</h3>
      <pre><code>// Constructor function
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

// Adding methods to prototype
Car.prototype.start = function() {
  return \`\${this.make} \${this.model} is starting...\`;
};

Car.prototype.getAge = function() {
  return new Date().getFullYear() - this.year;
};

const myCar = new Car("Toyota", "Camry", 2020);
console.log(myCar.start()); // "Toyota Camry is starting..."</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '40 minutes',
    difficulty: 4,  },
  {
    id: 'lesson-11',
    title: 'ES6+ Modern Features',
    description: 'Master modern JavaScript features including arrow functions, destructuring, modules, and more.',
    content: `
      <h2>ES6+ Modern JavaScript Features</h2>
      <p>ES6 (ECMAScript 2015) and later versions introduced many powerful features that make JavaScript more expressive and easier to work with.</p>



      <h3>Arrow Functions</h3>
      <pre><code>// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Arrow function with block body
const multiply = (a, b) => {
  const result = a * b;
  console.log(\`Result: \${result}\`);
  return result;
};

// Arrow functions and 'this'
const obj = {
  name: "John",
  greet: function() {
    // Regular function - 'this' refers to obj
    setTimeout(() => {
      // Arrow function - 'this' inherited from parent scope
      console.log(\`Hello, \${this.name}\`);
    }, 1000);
  }
};</code></pre>

      <h3>Template Literals</h3>
      <pre><code>const name = 'Alice';
const age = 30;

// Template literal with expressions
const message = \`Hello, my name is \${name} and I am \${age} years old.\`;

// Multi-line strings
const html = \`
  &lt;div class="user-card"&gt;
    &lt;h2&gt;\${name}&lt;/h2&gt;
    &lt;p&gt;Age: \${age}&lt;/p&gt;
    &lt;p&gt;Status: \${age >= 18 ? 'Adult' : 'Minor'}&lt;/p&gt;
  &lt;/div&gt;
\`;

// Tagged template literals
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? \`&lt;mark&gt;\${values[i]}&lt;/mark&gt;\` : '';
    return result + string + value;
  }, '');
}

const highlighted = highlight\`Hello \${name}, you are \${age} years old!\`;</code></pre>

      <h3>Destructuring Assignment</h3>
      <pre><code>// Array destructuring
const colors = ['red', 'green', 'blue', 'yellow'];
const [primary, secondary, ...others] = colors;
console.log(primary); // 'red'
console.log(others); // ['blue', 'yellow']

// Object destructuring
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  address: {
    city: 'New York',
    country: 'USA'
  }
};

const { name, email, address: { city } } = user;
const { age = 25 } = user; // Default value

// Function parameter destructuring
function createUser({ name, email, age = 18 }) {
  return {
    id: Date.now(),
    name,
    email,
    age,
    createdAt: new Date()
  };
}</code></pre>

      <h3>Spread and Rest Operators</h3>
      <pre><code>// Spread operator with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Spread operator with objects
const person = { name: 'John', age: 30 };
const employee = { ...person, jobTitle: 'Developer', salary: 50000 };

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15</code></pre>

      <h3>Modules (Import/Export)</h3>
      <pre><code>// math.js - Named exports
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export function multiply(a, b) {
  return a * b;
}

// calculator.js - Default export
export default class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}

// main.js - Importing
import Calculator, { PI, add, multiply } from './math.js';
import * as MathUtils from './math.js';

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
console.log(PI); // 3.14159</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    duration: '35 minutes',
    difficulty: 4,  },
  {
    id: 'lesson-12',
    title: 'Local Storage & Session Storage',
    description: 'Learn to store data in the browser using localStorage and sessionStorage APIs.',
    content: `
      <h2>Local Storage & Session Storage</h2>
      <p>Web Storage APIs allow you to store data locally in the user's browser. Learn the differences between localStorage and sessionStorage and how to use them effectively.</p>



      <h3>localStorage vs sessionStorage</h3>
      <p>Both provide similar APIs but differ in persistence:</p>
      <ul>
        <li><strong>localStorage</strong>: Data persists until explicitly cleared</li>
        <li><strong>sessionStorage</strong>: Data persists only for the browser session</li>
      </ul>

      <h3>Basic Operations</h3>
      <pre><code>// Storing data
localStorage.setItem('username', 'john_doe');
sessionStorage.setItem('sessionId', '12345');

// Retrieving data
const username = localStorage.getItem('username');
const sessionId = sessionStorage.getItem('sessionId');

// Removing specific item
localStorage.removeItem('username');
sessionStorage.removeItem('sessionId');

// Clearing all data
localStorage.clear();
sessionStorage.clear();

// Check if item exists
if (localStorage.getItem('username') !== null) {
  console.log('Username exists');
}</code></pre>

      <h3>Storing Complex Data</h3>
      <pre><code>// Storing objects and arrays (must be stringified)
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    language: 'en'
  }
};

// Store object
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse object
const storedUser = JSON.parse(localStorage.getItem('user'));

// Helper functions for easier usage
function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}</code></pre>

      <h3>Storage Events</h3>
      <pre><code>// Listen for storage changes (only works across tabs/windows)
window.addEventListener('storage', (event) => {
  console.log('Storage changed:');
  console.log('Key:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('URL:', event.url);
});

// Custom storage event for same-tab updates
function setItemWithEvent(key, value) {
  const oldValue = localStorage.getItem(key);
  localStorage.setItem(key, value);

  // Dispatch custom event
  window.dispatchEvent(new CustomEvent('localStorageChange', {
    detail: { key, oldValue, newValue: value }
  }));
}

window.addEventListener('localStorageChange', (event) => {
  console.log('Local storage updated:', event.detail);
});</code></pre>

      <h3>Practical Examples</h3>
      <pre><code>// User preferences
class UserPreferences {
  constructor() {
    this.preferences = getLocalStorage('userPreferences', {
      theme: 'light',
      language: 'en',
      notifications: true
    });
  }

  setTheme(theme) {
    this.preferences.theme = theme;
    this.save();
    document.body.className = \`theme-\${theme}\`;
  }

  setLanguage(language) {
    this.preferences.language = language;
    this.save();
  }

  save() {
    setLocalStorage('userPreferences', this.preferences);
  }
}

// Shopping cart
class ShoppingCart {
  constructor() {
    this.items = getLocalStorage('cartItems', []);
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.save();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
  }

  save() {
    setLocalStorage('cartItems', this.items);
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
}</code></pre>

      <h3>Storage Limitations and Best Practices</h3>
      <pre><code>// Check storage quota (approximate)
function getStorageSize() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
}

// Error handling for storage limits
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.warn('Storage quota exceeded');
      // Handle quota exceeded (clear old data, notify user, etc.)
      return false;
    }
    throw error;
  }
}</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '25 minutes',
    difficulty: 3,  },
  {
    id: 'lesson-13',
    title: 'JavaScript Projects & Best Practices',
    description: 'Build real-world projects and learn JavaScript best practices for professional development.',
    content: `
      <h2>JavaScript Projects & Best Practices</h2>
      <p>Apply everything you've learned by building real-world projects and following JavaScript best practices for clean, maintainable code.</p>



      <h3>Code Organization Best Practices</h3>
      <pre><code>// Use meaningful variable and function names
// Bad
const d = new Date();
const u = users.filter(x => x.a > 18);

// Good
const currentDate = new Date();
const adultUsers = users.filter(user => user.age > 18);

// Use const for values that don't change
const API_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// Use descriptive function names
function calculateTotalPrice(items, taxRate) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0) * (1 + taxRate);
}</code></pre>

      <h3>Error Handling Best Practices</h3>
      <pre><code>// Always handle errors appropriately
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);

    if (!response.ok) {
      throw new Error(\`Failed to fetch user: \${response.status}\`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);

    // Return a default value or rethrow based on context
    return null;
  }
}

// Create custom error classes
class ValidationError extends Error {
  constructor(field, message) {
    super(\`Validation failed for \${field}: \${message}\`);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateEmail(email) {
  if (!email || !email.includes('@')) {
    throw new ValidationError('email', 'Invalid email format');
  }
}</code></pre>

      <h3>Performance Best Practices</h3>
      <pre><code>// Debounce expensive operations
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage: debounce search as user types
const searchInput = document.getElementById('search');
const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

// Use efficient DOM manipulation
// Bad: Multiple DOM queries
function updateUserList(users) {
  const list = document.getElementById('user-list');
  list.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.name;
    list.appendChild(li);
  });
}

// Good: Batch DOM updates
function updateUserList(users) {
  const list = document.getElementById('user-list');
  const fragment = document.createDocumentFragment();

  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.name;
    fragment.appendChild(li);
  });

  list.innerHTML = '';
  list.appendChild(fragment);
}</code></pre>

      <h3>Project: Todo List Application</h3>
      <pre><code>class TodoApp {
  constructor() {
    this.todos = this.loadTodos();
    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodo(input.value.trim());
      input.value = '';
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = parseInt(e.target.dataset.id);
        this.deleteTodo(id);
      }

      if (e.target.classList.contains('toggle-btn')) {
        const id = parseInt(e.target.dataset.id);
        this.toggleTodo(id);
      }
    });
  }

  addTodo(text) {
    if (!text) return;

    const todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.todos.push(todo);
    this.saveTodos();
    this.render();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.render();
    }
  }

  render() {
    const container = document.getElementById('todo-list');
    container.innerHTML = this.todos.map(todo => \`
      &lt;div class="todo-item \${todo.completed ? 'completed' : ''}"&gt;
        &lt;span&gt;\${todo.text}&lt;/span&gt;
        &lt;button class="toggle-btn" data-id="\${todo.id}"&gt;
          \${todo.completed ? 'Undo' : 'Complete'}
        &lt;/button&gt;
        &lt;button class="delete-btn" data-id="\${todo.id}"&gt;Delete&lt;/button&gt;
      &lt;/div&gt;
    \`).join('');
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadTodos() {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});</code></pre>

      <h3>Testing Your Code</h3>
      <pre><code>// Simple testing function
function test(description, fn) {
  try {
    fn();
    console.log(\`✅ \${description}\`);
  } catch (error) {
    console.error(\`❌ \${description}: \${error.message}\`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test examples
test('calculateTotalPrice should calculate correctly', () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 1 }
  ];
  const result = calculateTotalPrice(items, 0.1);
  assert(result === 27.5, \`Expected 27.5, got \${result}\`);
});

test('validateEmail should throw for invalid email', () => {
  try {
    validateEmail('invalid-email');
    assert(false, 'Should have thrown an error');
  } catch (error) {
    assert(error instanceof ValidationError, 'Should throw ValidationError');
  }
});</code></pre>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    duration: '50 minutes',
    difficulty: 5,  },
];

export const quizzes = [
  {
    id: 'quiz-1',
    title: 'Web Development Basics',
    description: 'Test your knowledge of web development fundamentals.',
    lessonId: 'lesson-1',
    questions: [
      {
        id: 'q1-1',
        type: 'multiple-choice',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language',
        ],
        correctAnswer: 'Hyper Text Markup Language',
        explanation: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.',
      },
      {
        id: 'q1-2',
        type: 'multiple-choice',
        question: 'Which of the following is NOT a front-end technology?',
        options: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        correctAnswer: 'PHP',
        explanation: 'PHP is a server-side scripting language used for back-end development.',
      },
      {
        id: 'q1-3',
        type: 'fill-in-blank',
        question: 'The ________ is responsible for hosting websites and serving them to users.',
        correctAnswer: 'server',
        explanation: 'A server is a computer that hosts websites and serves them to users when requested.',
      },
      {
        id: 'q1-4',
        type: 'multiple-choice',
        question: 'What is the main purpose of a domain name?',
        options: [
          'To provide a human-readable address for a website',
          'To store website files',
          'To process server-side code',
          'To style web pages',
        ],
        correctAnswer: 'To provide a human-readable address for a website',
        explanation: 'Domain names provide a human-readable address (like example.com) that points to the IP address where a website is hosted.',
      },
      {
        id: 'q1-5',
        type: 'fill-in-blank',
        question: 'Front-end development focuses on what users ________ and interact with.',
        correctAnswer: 'see',
        explanation: 'Front-end development deals with the visual aspects of a website - what users see and interact with.',
      },
    ],
  },
  {
    id: 'quiz-2',
    title: 'HTML Essentials',
    description: 'Test your knowledge of HTML elements and structure.',
    lessonId: 'lesson-2',
    questions: [
      {
        id: 'q2-1',
        type: 'multiple-choice',
        question: 'Which HTML element is used to define the main heading?',
        options: ['<head>', '<heading>', '<h1>', '<main>'],
        correctAnswer: '<h1>',
        explanation: 'The <h1> element is used to define the main heading on a webpage.',
      },
      {
        id: 'q2-2',
        type: 'multiple-choice',
        question: 'Which tag is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correctAnswer: '<a>',
        explanation: 'The <a> (anchor) tag is used to create hyperlinks in HTML.',
      },
      {
        id: 'q2-3',
        type: 'fill-in-blank',
        question: 'The ________ tag is used to insert an image in HTML.',
        correctAnswer: 'img',
        explanation: 'The <img> tag is used to embed images in an HTML document.',
      },
      {
        id: 'q2-4',
        type: 'multiple-choice',
        question: 'Which of the following is a self-closing tag?',
        options: ['<div>', '<p>', '<span>', '<br>'],
        correctAnswer: '<br>',
        explanation: 'The <br> tag is a self-closing tag used to insert a line break.',
      },
      {
        id: 'q2-5',
        type: 'fill-in-blank',
        question: 'The ________ section contains metadata about the HTML document.',
        correctAnswer: 'head',
        explanation: 'The <head> section contains metadata about the document, such as title, styles, scripts, and other meta information.',
      },
    ],
  },
  {
    id: 'quiz-3',
    title: 'CSS Styling Quiz',
    description: 'Test your knowledge of CSS properties and selectors.',
    lessonId: 'lesson-3',
    questions: [
      {
        id: 'q3-1',
        type: 'multiple-choice',
        question: 'Which CSS property is used to change the text color?',
        options: ['text-color', 'font-color', 'color', 'text-style'],
        correctAnswer: 'color',
        explanation: 'The color property is used to set the color of text in CSS.',
      },
      {
        id: 'q3-2',
        type: 'multiple-choice',
        question: 'Which selector targets elements with a specific class?',
        options: ['#', '.', '*', '>'],
        correctAnswer: '.',
        explanation: 'The dot (.) selector is used to target elements with a specific class in CSS.',
      },
      {
        id: 'q3-3',
        type: 'fill-in-blank',
        question: 'The CSS property ________ is used to add space outside an element.',
        correctAnswer: 'margin',
        explanation: 'The margin property is used to create space outside an element, outside of any defined borders.',
      },
      {
        id: 'q3-4',
        type: 'multiple-choice',
        question: 'Which CSS property is used to make text bold?',
        options: ['font-style', 'text-decoration', 'font-weight', 'text-transform'],
        correctAnswer: 'font-weight',
        explanation: 'The font-weight property is used to specify the weight (boldness) of text.',
      },
      {
        id: 'q3-5',
        type: 'fill-in-blank',
        question: 'The CSS property ________ is used to change the background color of an element.',
        correctAnswer: 'background-color',
        explanation: 'The background-color property sets the background color of an element.',
      },
    ],
  },
  {
    id: 'quiz-4',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics.',
    lessonId: 'lesson-4',
    questions: [
      {
        id: 'q4-1',
        type: 'multiple-choice',
        question: 'Which keyword is used to declare a variable that cannot be reassigned?',
        options: ['var', 'let', 'const', 'static'],
        correctAnswer: 'const',
        explanation: 'The const keyword is used to declare a variable that cannot be reassigned after initialization.',
      },
      {
        id: 'q4-2',
        type: 'multiple-choice',
        question: 'What will console.log(typeof []) output?',
        options: ['array', 'object', 'undefined', 'null'],
        correctAnswer: 'object',
        explanation: 'In JavaScript, arrays are a type of object, so typeof [] returns "object".',
      },
      {
        id: 'q4-3',
        type: 'fill-in-blank',
        question: 'The ________ method is used to add an event listener to an HTML element in JavaScript.',
        correctAnswer: 'addEventListener',
        explanation: 'The addEventListener() method attaches an event handler to an element.',
      },
      {
        id: 'q4-4',
        type: 'multiple-choice',
        question: 'Which of the following is NOT a JavaScript data type?',
        options: ['String', 'Boolean', 'Float', 'Undefined'],
        correctAnswer: 'Float',
        explanation: 'Float is not a separate data type in JavaScript. Numbers in JavaScript can be integers or floating-point, but they are all of type "number".',
      },
      {
        id: 'q4-5',
        type: 'fill-in-blank',
        question: 'The ________ method is used to select an HTML element by its ID in JavaScript.',
        correctAnswer: 'getElementById',
        explanation: 'The getElementById() method returns the element that has the ID attribute with the specified value.',
      },
    ],
  },
  {
    id: 'quiz-5',
    title: 'Responsive Design Quiz',
    description: 'Test your knowledge of responsive web design principles.',
    lessonId: 'lesson-5',
    questions: [
      {
        id: 'q5-1',
        type: 'multiple-choice',
        question: 'What is the purpose of the viewport meta tag?',
        options: [
          'To set the background color of the page',
          'To control the page width and scaling on different devices',
          'To define the character encoding for the HTML document',
          'To improve SEO rankings',
        ],
        correctAnswer: 'To control the page width and scaling on different devices',
        explanation: 'The viewport meta tag gives the browser instructions on how to control the page dimensions and scaling for different devices.',
      },
      {
        id: 'q5-2',
        type: 'multiple-choice',
        question: 'Which CSS unit is best for creating fluid layouts?',
        options: ['px', 'pt', '%', 'cm'],
        correctAnswer: '%',
        explanation: 'Percentage (%) is a relative unit that helps create fluid layouts that adapt to different screen sizes.',
      },
      {
        id: 'q5-3',
        type: 'fill-in-blank',
        question: 'CSS ________ queries allow you to apply different styles based on device characteristics.',
        correctAnswer: 'media',
        explanation: 'CSS media queries allow you to apply different styles depending on device characteristics like screen width, height, or orientation.',
      },
      {
        id: 'q5-4',
        type: 'multiple-choice',
        question: 'What does the "mobile-first" approach mean?',
        options: [
          'Designing only for mobile devices',
          'Designing for mobile devices first, then enhancing for larger screens',
          'Testing on mobile devices before desktop',
          'Creating separate websites for mobile and desktop',
        ],
        correctAnswer: 'Designing for mobile devices first, then enhancing for larger screens',
        explanation: 'The mobile-first approach means designing for mobile devices first, then progressively enhancing the design for larger screens.',
      },
      {
        id: 'q5-5',
        type: 'fill-in-blank',
        question: 'The CSS property max-width: 100% is commonly used to make ________ responsive.',
        correctAnswer: 'images',
        explanation: 'Setting max-width: 100% on images ensures they scale down if their container is narrower than their intrinsic width, making them responsive.',
      },
    ],
  },
];

export const badges = {
  'first-quiz': {
    id: 'first-quiz',
    name: 'First Steps',
    description: 'Completed your first quiz',
    icon: '🎓',
  },
  'perfect-score': {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Achieved 100% on a quiz',
    icon: '🏆',
  },
  'quiz-master': {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Completed 5 or more quizzes',
    icon: '🧠',
  },
  'lesson-complete': {
    id: 'lesson-complete',
    name: 'Knowledge Seeker',
    description: 'Completed all lessons',
    icon: '📚',
  },
  'night-owl': {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Enabled dark mode',
    icon: '🌙',
  },
};