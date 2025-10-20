(function(){
  // Choices component - renders options and calls onChange(index)
  function Choices({ questionId, options, selected, onChange }) {
    return React.createElement(
      'ul',
      { className: 'mocktest__options', role: 'list' },
      options.map((opt, idx) => {
        const id = `q${questionId}-opt${idx}`;
        return React.createElement(
          'li',
          { key: id, className: 'mocktest__option' },
          React.createElement('label', { htmlFor: id },
            React.createElement('input', {
              id,
              type: 'radio',
              name: `question-${questionId}`,
              value: idx,
              checked: selected === idx,
              onChange: () => onChange(idx)
            }),
            ' ',
            opt
          )
        );
      })
    );
  }

  window.Components = window.Components || {};
  window.Components.Choices = Choices;
})();