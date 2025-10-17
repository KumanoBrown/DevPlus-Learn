// State elements
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');
const questionsContainer = document.getElementById('questions-container');

// Function to show state
function showState(stateElement) {
  // Hide all states first
  [loadingState, errorState, emptyState].forEach(el => el.hidden = true);
  if (stateElement) {
    stateElement.hidden = false;
  }
}

// Function to render a question
function renderQuestion(question) {
  const questionElement = document.createElement('div');
  questionElement.className = 'mocktest__question';
  questionElement.setAttribute('data-testid', `question-${question.id}`);

  questionElement.innerHTML = `
    <h3 class="mocktest__question-text">${question.question}</h3>
    <ul class="mocktest__options">
      ${question.options.map((option, index) => `
        <li class="mocktest__option">
          <label>
            <input type="radio" name="question${question.id}" value="${index}">
            ${option}
          </label>
        </li>
      `).join('')}
    </ul>
  `;

  return questionElement;
}

// Function to get test key from URL parameters
function getTestKey() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('key');
}

// Function to fetch and render questions
async function fetchAndRenderQuestions() {
  try {
    showState(loadingState);
    questionsContainer.innerHTML = '';

    const response = await fetch('questions.json');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const data = await response.json();
    
    if (!data.questions || data.questions.length === 0) {
      showState(emptyState);
      return;
    }

    showState(null);
    data.questions.forEach(question => {
      questionsContainer.appendChild(renderQuestion(question));
    });

  } catch (error) {
    console.error('Error fetching questions:', error);
    showState(errorState);
  }
}

// Check if we have a test key and load questions
document.addEventListener('DOMContentLoaded', () => {
  const testKey = getTestKey();
  if (!testKey) {
    showState(errorState);
    errorState.textContent = 'No test key provided. Please return to the home page and enter a test key.';
    return;
  }
  fetchAndRenderQuestions();
});