(function(){
  // NavBar component (UMD-style attach to window.Components)
  const NavBar = ({onBack}) => {
    return React.createElement(
      'header',
      { className: 'mocktest__header', role: 'banner' },
      React.createElement('div', { className: 'mocktest__container' },
        React.createElement('a', { href: '/', className: 'mocktest__logo', 'aria-label': 'MockTest Lite home' }, 'MockTest Lite'),
        React.createElement('div', { style: { marginLeft: 'auto' } },
          React.createElement('button', { className: 'mocktest__cta mocktest__cta--ghost', onClick: onBack }, 'Back to Home')
        )
      )
    );
  };

  window.Components = window.Components || {};
  window.Components.NavBar = NavBar;
})();