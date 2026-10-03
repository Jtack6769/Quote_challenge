(() => {
  'use strict';
  let deferredPrompt = null;
  let busy = false;
  const standalone = window.matchMedia('(display-mode: standalone)');
  const installed = () => standalone.matches || navigator.standalone === true;
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'qc-install-button';
  button.title = 'Install Quote Challenge';
  button.setAttribute('aria-label', 'Install Quote Challenge');
  const icon = document.createElement('img');
  icon.src = 'qc-icons/qc-192.png';
  icon.alt = '';
  icon.width = icon.height = 48;
  button.append(icon);
  const label = document.createElement('span');
  label.textContent = 'Install';
  button.append(label);
  button.hidden = installed();
  const dock = document.createElement('div');
  dock.id = 'qc-install-dock';
  dock.append(button);
  (document.querySelector('main') || document.body).append(dock);

  const dialog = document.createElement('dialog');
  dialog.id = 'qc-install-help';
  dialog.setAttribute('aria-labelledby', 'qc-install-heading');
  const heading = document.createElement('h2');
  heading.id = 'qc-install-heading';
  heading.textContent = 'Keep Quote Challenge handy';
  const instructions = document.createElement('p');
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Got it';
  close.addEventListener('click', () => dialog.close());
  dialog.append(heading, instructions, close);
  document.body.append(dialog);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    }
  });

  function showHelp() {
    const ua = navigator.userAgent;
    if (location.protocol === 'file:') {
      instructions.textContent = 'Open the online Quote Challenge website in your browser to add its icon to your home screen or desktop.';
    } else if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      instructions.textContent = 'In your browser, tap Share, then Add to Home Screen, then Add. If that option is missing, open this page in Safari.';
    } else if (/Android/.test(ua)) {
      instructions.textContent = 'Open your browser menu (⋮), choose Add to home screen or Install, then confirm. If you are viewing this inside another app, first open it in Chrome.';
    } else {
      instructions.textContent = 'Use your browser’s install icon in the address bar or its menu option to install this site as an app. On Mac Safari, choose File → Add to Dock. If installation is unavailable, bookmark this page or drag its address-bar site icon onto your desktop.';
    }
    if (!dialog.open) dialog.showModal();
  }
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    if (!installed()) button.hidden = false;
  });
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    button.hidden = true;
    if (dialog.open) dialog.close();
  });
  standalone.addEventListener('change', () => { button.hidden = installed(); });
  button.addEventListener('click', async () => {
    if (busy) return;
    if (!deferredPrompt) { showHelp(); return; }
    busy = true;
    button.disabled = true;
    const prompt = deferredPrompt;
    deferredPrompt = null;
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === 'accepted') button.hidden = true;
    } catch (_) { showHelp(); }
    finally { busy = false; button.disabled = false; }
  });
})();
