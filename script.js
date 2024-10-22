// Sample questions array
const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: "Paris" },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the capital of Germany?", options: ["Berlin", "Madrid", "Rome", "Paris"], answer: "Berlin" },
  { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], answer: "4" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" }
];

// Retrieve the user's progress from session storage (if any)
let userProgress = JSON.parse(sessionStorage.getItem('progress')) || {};

// Generate the quiz questions inside the correct div
const questionsContainer = document.getElementById('questions'); // Changed the ID to 'questions'
questions.forEach((q, index) => {
  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.innerHTML = `<p>${q.question}</p>`;

  q.options.forEach((option, i) => {
    const isChecked = userProgress[index] === option ? 'checked' : '';
    questionDiv.innerHTML += `
      <label>
        <input type="radio" name="question${index}" value="${option}" ${isChecked}>
        ${option}
      </label><br>`;
  });

  questionsContainer.appendChild(questionDiv);
});

// Save progress to session storage when an option is selected
document.querySelectorAll('input[type="radio"]').forEach(input => {
  input.addEventListener('change', (e) => {
    const questionIndex = e.target.name.replace('question', '');
    userProgress[questionIndex] = e.target.value;
    sessionStorage.setItem('progress', JSON.stringify(userProgress));
  });
});

// Calculate the score and display it
document.getElementById('submit-btn').addEventListener('click', () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (userProgress[index] === q.answer) {
      score += 1;
    }
  });

  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `Your score is ${score} out of 5.`;

  // Save score to local storage
  localStorage.setItem('score', score);
});

// Display stored score on page load (if any)
window.addEventListener('load', () => {
  const storedScore = localStorage.getItem('score');
  if (storedScore) {
    document.getElementById('result').textContent = `Your last score was ${storedScore} out of 5.`;
  }
});

