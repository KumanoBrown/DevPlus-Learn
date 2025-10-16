// Minimal behavior: demo key and open test placeholder
document.getElementById('demo-btn').addEventListener('click', function(){
    document.getElementById('test-key').value = 'DEMO-READ-01';
    document.getElementById('hero-cta').scrollIntoView({behavior:'smooth'});
  });
  
  function openTest(e){
    e.preventDefault();
    const key = document.getElementById('test-key').value.trim();
    // In a real app, validate key via API and redirect to the test page
    if(!key){
      alert('Please enter a test key');
      return;
    }
    // Placeholder navigation
    alert('Test key accepted: ' + key + '. Redirecting to reading test...');
    // window.location.href = '/test?key=' + encodeURIComponent(key);
  }
  