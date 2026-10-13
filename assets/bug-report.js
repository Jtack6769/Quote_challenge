(() => {
  'use strict';
  const key = 'qc6_bug_events', limit = 10;
  let events = [];
  try { const saved = JSON.parse(sessionStorage.getItem(key)); if (Array.isArray(saved)) events = saved.slice(-limit); } catch {}
  const text = value => String(value ?? '').slice(0, 1200);
  function state() {
    try { return window.qcBugState ? window.qcBugState() : {page: location.pathname}; }
    catch { return {page: location.pathname}; }
  }
  function log(event, detail) {
    events.push({time: new Date().toISOString(), page: location.pathname, event: text(event), detail: text(detail), state: state()});
    events = events.slice(-limit);
    try { sessionStorage.setItem(key, JSON.stringify(events)); } catch {}
  }
  window.QCBug = {log, report: () => report()};
  addEventListener('error', e => log('Error', `${e.message || 'Resource failed'} ${e.filename || e.target?.src || ''}:${e.lineno || ''}`), true);
  addEventListener('unhandledrejection', e => log('Promise error', e.reason?.message || e.reason));
  document.addEventListener('click', e => {
    const el = e.target.closest('button, a');
    if (!el || el.closest('#qc-bug-dialog')) return;
    if (el.matches('.bug, [aria-label="Report a bug"]') || el.getAttribute('href')?.startsWith('mailto:')) {
      e.preventDefault(); e.stopImmediatePropagation(); report(); return;
    }
    log('Click', el.id || el.dataset.egg || el.getAttribute('href') || el.textContent.trim());
  }, true);
  document.addEventListener('submit', e => {
    if (e.target.id === 'answers') {
      log('Answers submitted', JSON.stringify({source: document.getElementById('titleGuess')?.value, character: document.getElementById('characterGuess')?.value, line: document.getElementById('lineGuess')?.value}));
    } else log('Form submitted', e.target.id);
  }, true);
  log('Page opened', document.title);
  function report() {
    if (document.getElementById('qc-bug-dialog')) return;
    // Freeze evidence before report controls generate further activity.
    const captured = events.slice();
    const snapshot = state();
    const dialog = document.createElement('dialog');
    dialog.id = 'qc-bug-dialog';
    dialog.style.cssText = 'max-width:560px;width:calc(100% - 32px);box-sizing:border-box;background:#141414;color:#fff;border:2px solid #ffe36a;border-radius:16px;padding:22px;font:16px/1.5 system-ui';
    dialog.innerHTML = '<h2 style="color:#ffe36a">Report a bug</h2><p>Your last ten game events and current game state are included.</p><label>What happened?<textarea id="qc-bug-note" style="box-sizing:border-box;width:100%;min-height:100px" placeholder="What went wrong, and what should have happened?"></textarea></label><p style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" id="qc-bug-share">Share report</button><button type="button" id="qc-bug-download">Save text file</button><a id="qc-bug-email">Open email</a><button type="button" id="qc-bug-close">Close</button></p><p id="qc-bug-status" role="status"></p>';
    document.body.append(dialog);
    const status = dialog.querySelector('#qc-bug-status');
    const note = dialog.querySelector('#qc-bug-note');
    const filename = 'Quote_Challenge_Bug_' + new Date().toISOString().replace(/[:.]/g, '-') + '.txt';
    function body() {
      return ['Quote Challenge 6.0 bug report', 'To: QcChallenger67@gmail.com', 'Created: ' + new Date().toISOString(), 'Browser: ' + navigator.userAgent, 'Page: ' + location.origin + location.pathname, 'Description: ' + note.value, 'Current game state: ' + JSON.stringify(snapshot), '', 'Last ten game events (oldest first):', ...captured.map(x => `${x.time} | ${x.page} | ${x.event} | ${x.detail} | ${JSON.stringify(x.state)}`)].join('\n');
    }
    function updateEmail() { dialog.querySelector('#qc-bug-email').href = 'mailto:QcChallenger67@gmail.com?subject=Quote%20Challenge%206.0%20bug%20report&body=' + encodeURIComponent(body()); }
    note.addEventListener('input', updateEmail); updateEmail();
    dialog.querySelector('#qc-bug-download').onclick = () => {
      const url = URL.createObjectURL(new Blob([body()], {type:'text/plain'}));
      const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      status.textContent = 'Text file saved. Attach it to your email to QcChallenger67@gmail.com.';
    };
    dialog.querySelector('#qc-bug-share').onclick = async () => {
      try {
        const file = new File([body()], filename, {type:'text/plain'});
        if (!navigator.share || !navigator.canShare?.({files:[file]})) { status.textContent = 'File sharing is unavailable here. Save the text file and attach it, or use Open email to include the report in the message.'; return; }
        await navigator.share({files:[file], title:'Quote Challenge bug report', text:'Please send this report to QcChallenger67@gmail.com.'});
        status.textContent = 'Report shared.';
      } catch (err) { status.textContent = err.name === 'AbortError' ? 'Sharing canceled. Your report is still here.' : 'Could not share. Save the text file or use Open email.'; }
    };
    dialog.querySelector('#qc-bug-close').onclick = () => dialog.close();
    dialog.addEventListener('close', () => dialog.remove());
    dialog.showModal();
  }
})();
