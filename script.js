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
  // Replace with real navigation in production
  setTimeout(() => {
    // window.location.href = '/test?key=' + encodeURIComponent(key);
  }, 600);
}

// Preserve natural tab order by using native controls and avoiding tabindex > 0