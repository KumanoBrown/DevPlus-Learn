
(function () {
  const { useState, useEffect } = React;
  const rootEl = document.getElementById('questions-container');
  const loadingEl = document.getElementById('loading-state');
  const errorEl = document.getElementById('error-state');
  const emptyEl = document.getElementById('empty-state');

  function ScoreView({ questions, selectedAnswers, onRestart }) {
    // Calculate score
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct++;
    });
    return React.createElement('div', { className: 'mocktest__score-view', style: { textAlign: 'center', marginTop: '2rem' } },
      React.createElement('h2', null, 'Your Score'),
      React.createElement('div', { style: { fontSize: '2rem', fontWeight: 700, margin: '1rem 0' } }, `${correct} / ${questions.length}`),
      React.createElement('ul', { style: { textAlign: 'left', display: 'inline-block', margin: '1rem auto', paddingLeft: '1.25rem' } },
        questions.map((q, idx) => {
          const selectedIdx = selectedAnswers[q.id];
          const letters = q.options.map((_, i) => String.fromCharCode(65 + i));
          const selectedLetter = typeof selectedIdx === 'number' ? letters[selectedIdx] : '-';
          const correctLetter = letters[q.correctAnswer];
          const isCorrect = selectedIdx === q.correctAnswer;
          return React.createElement('li', { key: q.id, style: { color: isCorrect ? '#10b981' : '#ef4444', marginBottom: 4 } },
            `Question ${idx + 1}: `,
            selectedLetter,
            isCorrect ? ' ✓' : ` ✗ (Correct: ${correctLetter})`
          );
        })
      ),
      React.createElement('button', {
        className: 'mocktest__cta mocktest__cta--primary',
        style: { marginTop: '1.5rem' },
        onClick: onRestart
      }, 'Restart')
    );
  }

  function App() {
    const [questions, setQuestions] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

    useEffect(() => {
      if (loadingEl) loadingEl.hidden = false;
      if (errorEl) errorEl.hidden = true;
      if (emptyEl) emptyEl.hidden = true;

      fetch('questions.json')
        .then(res => { if (!res.ok) throw new Error('Network response not ok'); return res.json(); })
        .then(data => {
          const qs = data.questions || [];
          setQuestions(qs);
          if (qs.length === 0 && emptyEl) emptyEl.hidden = false;
        })
        .catch(err => {
          console.error('Error fetching questions (react):', err);
          setError(err.message || String(err));
          if (errorEl) { errorEl.textContent = 'Error loading questions. Please try again.'; errorEl.hidden = false; }
        })
        .finally(() => { if (loadingEl) loadingEl.hidden = true; });
    }, []);

    // Reset to first question when questions load
    useEffect(() => {
      if (questions && questions.length > 0) {
        setCurrent(0);
      }
    }, [questions]);

    function handleSelect(questionId, optionIndex) {
      setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    }
  function handlePrev() { setCurrent(c => Math.max(0, c - 1)); }
  function handleNext() { setCurrent(c => Math.min(questions.length - 1, c + 1)); }
    function handleSubmit() { setSubmitted(true); }
    function handleRestart() {
      setSelectedAnswers({});
      setSubmitted(false);
      setCurrent(0);
    }

    if (error) {
      return React.createElement('div', { className: 'mocktest__state-message mocktest__state-message--error' }, 'Error loading questions.');
    }
  if (!questions) return React.createElement('div', null);

    if (submitted) {
      return React.createElement(React.Fragment, null,
        React.createElement(ScoreView, { questions, selectedAnswers, onRestart: handleRestart })
      );
    }

  const q = questions[current];
    const total = questions.length;
    const letters = q.options.map((_, i) => String.fromCharCode(65 + i));
    const selectedIdx = selectedAnswers[q.id];
    const selectedLetter = typeof selectedIdx === 'number' ? letters[selectedIdx] : null;

    return React.createElement(
      React.Fragment,
      null,
      React.createElement('div', { className: 'mocktest__reading-app', style: { maxWidth: 520, margin: '2rem auto' } },
  React.createElement('div', { style: { marginBottom: 16, fontWeight: 600 } }, `Question ${current + 1} of ${total}`),
        React.createElement(window.Components.QuestionCard, {
          question: q,
          selected: selectedIdx,
          onSelect: idx => handleSelect(q.id, idx)
        }),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 24, justifyContent: 'center' } },
          React.createElement('button', {
            className: 'mocktest__cta',
            onClick: handlePrev,
            disabled: current <= 0
          }, 'Prev'),
          current < total - 1 && React.createElement('button', {
            className: 'mocktest__cta',
            onClick: handleNext,
            disabled: current >= total - 1
          }, 'Next'),
          current === total - 1 && React.createElement('button', {
            className: 'mocktest__cta mocktest__cta--primary',
            onClick: handleSubmit,
            disabled: Object.keys(selectedAnswers).length !== total
          }, 'Submit')
        ),
        React.createElement('div', { style: { marginTop: 24, textAlign: 'center', color: '#6b7280', fontSize: '1rem' } },
          selectedLetter ? `Selected: ${selectedLetter}` : 'No answer selected.'
        )
      )
    );
  }

  if (rootEl) {
    // Mount NavBar into its own root so it's not duplicated when App re-renders
    const navRootEl = document.getElementById('nav-root');
    if (navRootEl && window.Components && window.Components.NavBar) {
      const navRoot = ReactDOM.createRoot(navRootEl);
      navRoot.render(React.createElement(window.Components.NavBar, { onBack: () => window.location.href = 'index.html' }));
    }

    const root = ReactDOM.createRoot(rootEl);
    root.render(React.createElement(App));
  }
})();
