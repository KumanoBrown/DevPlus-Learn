// Accessible interactions: mobile menu toggle, demo key, form submit, Escape handling

// Menu toggle management
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.hidden = expanded;
    if (!expanded) {
      const firstLink = primaryNav.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      menuToggle.focus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (primaryNav && !primaryNav.hidden) {
        primaryNav.hidden = true;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    }
  });
}

// Demo key behavior and live region updates
const demoBtn = document.getElementById('demo-btn');
const input = document.getElementById('test-key');
const formMessage = document.getElementById('form-message');

if (demoBtn && input) {
  demoBtn.addEventListener('click', () => {
    input.value = 'DEMO-READ-01';
    input.focus();
    if (formMessage) formMessage.textContent = 'Demo key populated. Press Enter or click Enter key to submit.';
  });
}

// Form submission with ARIA announcements and focus management
function openTest(e) {
  e.preventDefault();
  const key = input.value.trim();
  if (!key) {
    if (formMessage) formMessage.textContent = 'Please enter a test key.';
    input.focus();
    return;
  }
  if (formMessage) formMessage.textContent = 'Test key accepted: ' + key + '. Redirecting to reading test.';
  const main = document.getElementById('main');
  if (main) main.focus();
  // Navigate to test page
  setTimeout(() => {
    window.location.href = 'test.html?key=' + encodeURIComponent(key);
  }, 600);
}

// Handle back navigation and form reset
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

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderQuestion,
    showState,
    fetchAndRenderQuestions
  };
}

// Preserve natural tab order by using native controls and avoiding tabindex > 0