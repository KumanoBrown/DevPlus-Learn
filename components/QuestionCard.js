(function(){
  // QuestionCard component - uses Choices
  function QuestionCard({ question, selected, onSelect }) {
    return React.createElement(
      'article',
      { className: 'mocktest__question', 'data-testid': `question-${question.id}` },
      React.createElement('h3', { className: 'mocktest__question-text' }, question.question),
      React.createElement(window.Components.Choices, { questionId: question.id, options: question.options, selected, onChange: onSelect })
    );
  }

  window.Components = window.Components || {};
  window.Components.QuestionCard = QuestionCard;
})();