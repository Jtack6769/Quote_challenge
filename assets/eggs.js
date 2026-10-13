/* Small, local Easter egg rewards. Pending entrance finds join the next game. */
window.QCEggs=(()=>{
  let fallback={points:0,claimed:[]};
  function read(){try{return JSON.parse(sessionStorage.getItem('qc6_pending_eggs'))||fallback}catch{return fallback}}
  function write(v){fallback=v;try{sessionStorage.setItem('qc6_pending_eggs',JSON.stringify(v))}catch{}}
  let toastTimer;
  function notice(message,link){let box=document.getElementById('qcEggToast');if(!box){box=document.createElement('div');box.id='qcEggToast';box.className='qc-egg-toast';box.setAttribute('role','status');document.body.append(box)}box.replaceChildren(document.createTextNode(message));if(link){const a=document.createElement('a');a.href=link;a.textContent='MEET THE CREATOR · BONUS WALL';box.append(a)}box.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.hidden=true,link?20000:6000)}
  function award(id,points,label,creator=false){
    if(typeof window.qcAwardEgg==='function'){const outcome=window.qcAwardEgg(id,points,label);if(outcome!==null){notice(outcome,creator&&outcome.startsWith('+')?'bonus.html?egg=portrait':null);return}}
    const state=read();if(state.claimed.includes(id)){notice('You already found this bonus for your next game.');return}state.claimed.push(id);state.points+=points;write(state);notice('+'+points+' · '+label+' Saved for your next game.',creator?'bonus.html?egg=portrait':null)
  }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-egg]');if(b){e.preventDefault();award(b.dataset.egg,Number(b.dataset.points),b.dataset.label,b.dataset.egg==='creator')}});
  return {notice,begin(){const state=read();write({points:0,claimed:[]});return state}};
})();
