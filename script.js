// Accessibility and keyboard-friendly behaviors for MockTest Lite

// Demo button fills key and moves focus to Enter key button
document.getElementById('demo-btn').addEventListener('click', function(){
    const input = document.getElementById('test-key');
    input.value = 'DEMO-READ-01';
    input.focus();
    // update live message for assistive tech
    const msg = document.getElementById('form-message');
    msg.textContent = 'Demo key populated. Press Enter to submit.';
  });
  
  // When form submits, validate and announce result to screen readers
  function openTest(e){
    e.preventDefault();
    const input = document.getElementById('test-key');
    const key = input.value.trim();
    const msg = document.getElementById('form-message');
  
    if(!key){
      msg.textContent = 'Please enter a test key.';
      input.focus();
      return;
    }
  
    msg.textContent = 'Test key accepted: ' + key + '. Redirecting to reading test.';
    // move focus to main so screen reader user hears the message
    document.getElementById('main').focus();
  
    // replace with actual navigation in production
    setTimeout(function(){
      // window.location.href = '/test?key=' + encodeURIComponent(key);
    }, 600);
  }
  
  // Keyboard support: Enter on focused CTA behaves like click (anchors do by default)
  // Ensure links and buttons are reachable with Tab naturally; avoid tabindex > 0
  // Add a small handler to close any potential modal or dialogs with Escape in future
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      // Placeholder for closing overlays if implemented later
    }
  });
  