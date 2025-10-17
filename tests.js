// tests.js
describe('Question Rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="questions-container"></div>
      <div id="loading-state" hidden>Loading...</div>
      <div id="error-state" hidden>Error</div>
      <div id="empty-state" hidden>No questions</div>
    `;
  });

  test('renders a question correctly', () => {
    const question = {
      id: 1,
      question: 'What is JavaScript?',
      options: ['A programming language', 'A markup language'],
      correctAnswer: 0
    };

    const element = renderQuestion(question);
    expect(element.getAttribute('data-testid')).toBe('question-1');
    expect(element.querySelector('.mocktest__question-text').textContent).toBe(question.question);
    expect(element.querySelectorAll('.mocktest__option').length).toBe(2);
  });

  test('shows loading state while fetching', async () => {
    global.fetch = jest.fn(() => new Promise(resolve => {})); // Never resolves
    fetchAndRenderQuestions();
    expect(document.getElementById('loading-state').hidden).toBe(false);
    expect(document.getElementById('error-state').hidden).toBe(true);
    expect(document.getElementById('empty-state').hidden).toBe(true);
  });

  test('shows error state when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject('Network error'));
    await fetchAndRenderQuestions();
    expect(document.getElementById('error-state').hidden).toBe(false);
    expect(document.getElementById('loading-state').hidden).toBe(true);
    expect(document.getElementById('empty-state').hidden).toBe(true);
  });
});