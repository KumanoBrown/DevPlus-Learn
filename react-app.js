(function () {
  const { useState, useEffect } = React;
  const rootEl = document.getElementById('questions-container');
  const loadingEl = document.getElementById('loading-state');
  const errorEl = document.getElementById('error-state');
  const emptyEl = document.getElementById('empty-state');

  function App() {
    const [questions, setQuestions] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [error, setError] = useState(null);

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

    function handleSelect(questionId, optionIndex) {
      setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    }

    if (error) {
      return React.createElement('div', { className: 'mocktest__state-message mocktest__state-message--error' }, 'Error loading questions.');
    }

    if (!questions) return React.createElement('div', null);

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(window.Components.NavBar, { onBack: () => window.location.href = 'index.html' }),
      questions.map(q => React.createElement(window.Components.QuestionCard, { key: q.id, question: q, selected: selectedAnswers[q.id], onSelect: idx => handleSelect(q.id, idx) })),
      React.createElement('div', { style: { marginTop: '1rem' } },
        React.createElement('strong', null, 'Selected answers:'),
        React.createElement('ul', { style: { marginTop: '0.5rem', paddingLeft: '1.25rem' } },
          questions.map((q, idx) => {
            const selectedIdx = selectedAnswers[q.id];
            if (typeof selectedIdx !== 'number') return null;
            const letters = q.options.map((_, i) => String.fromCharCode(65 + i));
            const selectedLetter = letters[selectedIdx];
            return React.createElement('li', { key: q.id },
              `Question ${idx + 1}: ${selectedLetter}`
            );
          })
        )
      )
    );
  }

  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(React.createElement(App));
  }
})();
