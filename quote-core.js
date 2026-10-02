'use strict';

window.QC = (() => {
  const CUSTOM_KEY = 'qc_demo_custom_quotes_v1';
  const LEDGER_KEY = 'qc_demo_ledger_v1';
  const DAILY_KEY = 'qc_demo_daily_v1';
  const SOLO_KEY = 'qc_demo_solo_v1';

  const builtInQuotes = [
    {q:'May the Force be with you.',show:['Star Wars','Star Wars Episode IV A New Hope','A New Hope'],char:['Han Solo'],d:'Easy',c:'Movie'},
    {q:"I'll be back.",show:['The Terminator','Terminator'],char:['T-800','The Terminator','Terminator'],d:'Easy',c:'Movie'},
    {q:"Here's looking at you, kid.",show:['Casablanca'],char:['Rick Blaine','Rick'],d:'Easy',c:'Movie'},
    {q:'E.T. phone home.',show:['E.T.','ET','E.T. the Extra-Terrestrial'],char:['E.T.','ET'],d:'Easy',c:'Movie'},
    {q:"There's no place like home.",show:['The Wizard of Oz','Wizard of Oz'],char:['Dorothy Gale','Dorothy'],d:'Easy',c:'Movie'},
    {q:'Why so serious?',show:['The Dark Knight','Dark Knight'],char:['The Joker','Joker'],d:'Easy',c:'Movie'},
    {q:'I see dead people.',show:['The Sixth Sense','Sixth Sense'],char:['Cole Sear','Cole'],d:'Easy',c:'Movie'},
    {q:"You can't handle the truth!",show:['A Few Good Men'],char:['Colonel Jessup','Col. Jessup','Nathan Jessup','Jessup'],d:'Easy',c:'Movie'},
    {q:"I'm the king of the world!",show:['Titanic'],char:['Jack Dawson','Jack'],d:'Easy',c:'Movie'},
    {q:'Houston, we have a problem.',show:['Apollo 13'],char:['Jim Lovell','Lovell'],d:'Easy',c:'Movie'},
    {q:'Wax on, wax off.',show:['The Karate Kid','Karate Kid'],char:['Mr. Miyagi','Miyagi'],d:'Easy',c:'Movie'},
    {q:'Nobody puts Baby in a corner.',show:['Dirty Dancing'],char:['Johnny Castle','Johnny'],d:'Easy',c:'Movie'},
    {q:'To infinity and beyond!',show:['Toy Story'],char:['Buzz Lightyear','Buzz'],d:'Easy',c:'Movie'},
    {q:'Just keep swimming.',show:['Finding Nemo'],char:['Dory'],d:'Easy',c:'Movie'},
    {q:'You had me at hello.',show:['Jerry Maguire'],char:['Dorothy Boyd','Dorothy'],d:'Medium',c:'Movie'},
    {q:'Life is like a box of chocolates.',show:['Forrest Gump'],char:['Forrest Gump','Forrest'],d:'Easy',c:'Movie'},
    {q:'No, I am your father.',show:['The Empire Strikes Back','Star Wars The Empire Strikes Back','Empire Strikes Back'],char:['Darth Vader','Vader'],d:'Easy',c:'Movie'},
    {q:'Hasta la vista, baby.',show:['Terminator 2 Judgment Day','Terminator 2','T2'],char:['T-800','The Terminator','Terminator'],d:'Easy',c:'Movie'},
    {q:"I'm gonna make him an offer he can't refuse.",show:['The Godfather','Godfather'],char:['Vito Corleone','Don Corleone','Vito'],d:'Easy',c:'Movie'},
    {q:'Show me the money!',show:['Jerry Maguire'],char:['Rod Tidwell','Rod'],d:'Easy',c:'Movie'},
    {q:"How you doin'?",show:['Friends'],char:['Joey Tribbiani','Joey'],d:'Easy',c:'TV'},
    {q:"D'oh!",show:['The Simpsons','Simpsons'],char:['Homer Simpson','Homer'],d:'Easy',c:'TV'},
    {q:'Bazinga!',show:['The Big Bang Theory','Big Bang Theory'],char:['Sheldon Cooper','Sheldon'],d:'Easy',c:'TV'},
    {q:'No soup for you!',show:['Seinfeld'],char:['Soup Nazi','The Soup Nazi','Yev Kassem'],d:'Medium',c:'TV'},
    {q:'Suit up!',show:['How I Met Your Mother','HIMYM'],char:['Barney Stinson','Barney'],d:'Medium',c:'TV'},
    {q:'Winter is coming.',show:['Game of Thrones','GOT'],char:['Ned Stark','Eddard Stark','Ned'],d:'Medium',c:'TV'},
    {q:'I am the one who knocks.',show:['Breaking Bad'],char:['Walter White','Walt','Heisenberg'],d:'Medium',c:'TV'},
    {q:"That's what she said.",show:['The Office','The Office US'],char:['Michael Scott','Michael'],d:'Easy',c:'TV'},
    {q:'Live long and prosper.',show:['Star Trek','Star Trek The Original Series','TOS'],char:['Spock','Mr. Spock'],d:'Easy',c:'TV'},
    {q:'Make it so.',show:['Star Trek The Next Generation','The Next Generation','TNG'],char:['Jean-Luc Picard','Picard','Captain Picard'],d:'Easy',c:'TV'},
    {q:'Resistance is futile.',show:['Star Trek The Next Generation','The Next Generation','TNG','Star Trek'],char:['The Borg','Borg'],d:'Medium',c:'TV'},
    {q:"I'm a doctor, not a bricklayer.",show:['Star Trek','Star Trek The Original Series','TOS'],char:['Leonard McCoy','McCoy','Dr. McCoy','Bones'],d:'Hard',c:'TV'},
    {q:'Please state the nature of the medical emergency.',show:['Star Trek Voyager','Voyager'],char:['The Doctor','EMH','Emergency Medical Hologram','Doctor'],d:'Medium',c:'TV'},
    {q:'Danger, Will Robinson!',show:['Lost in Space'],char:['Robot','The Robot'],d:'Medium',c:'TV'},
    {q:'Missed it by that much.',show:['Get Smart'],char:['Maxwell Smart','Max Smart','Agent 86'],d:'Medium',c:'TV'},
    {q:'Kiss my grits!',show:['Alice'],char:['Flo','Florence Jean Castleberry'],d:'Hard',c:'TV'},
    {q:'Dy-no-mite!',show:['Good Times'],char:['J.J. Evans','JJ Evans','J.J.','JJ'],d:'Medium',c:'TV'},
    {q:"Whatchu talkin' 'bout, Willis?",show:["Diff'rent Strokes",'Different Strokes'],char:['Arnold Jackson','Arnold'],d:'Medium',c:'TV'},
    {q:'Nanu nanu.',show:['Mork & Mindy','Mork and Mindy'],char:['Mork'],d:'Medium',c:'TV'},
    {q:"Book 'em, Danno.",show:['Hawaii Five-O','Hawaii Five O'],char:['Steve McGarrett','McGarrett'],d:'Hard',c:'TV'},
    {q:'Who loves ya, baby?',show:['Kojak'],char:['Theo Kojak','Kojak'],d:'Hard',c:'TV'},
    {q:'Good grief!',show:['Peanuts','A Charlie Brown Christmas','Charlie Brown'],char:['Charlie Brown'],d:'Medium',c:'TV'},
    {q:'Bite my shiny metal ass.',show:['Futurama'],char:['Bender','Bender Bending Rodriguez'],d:'Medium',c:'TV'},
    {q:'Good news, everyone!',show:['Futurama'],char:['Professor Farnsworth','Hubert Farnsworth','Farnsworth'],d:'Medium',c:'TV'},
    {q:'What the deuce?',show:['Family Guy'],char:['Stewie Griffin','Stewie'],d:'Easy',c:'TV'},
    {q:'Giggity.',show:['Family Guy'],char:['Glenn Quagmire','Quagmire'],d:'Easy',c:'TV'},
    {q:'Ay, caramba!',show:['The Simpsons','Simpsons'],char:['Bart Simpson','Bart'],d:'Easy',c:'TV'},
    {q:'Ricky Spanish.',show:['American Dad','American Dad!'],char:['Roger','Roger Smith'],d:'Hard',c:'TV'},
    {q:'Yada, yada, yada.',show:['Seinfeld'],char:['Elaine Benes','Elaine'],d:'Medium',c:'TV'},
    {q:"Clear eyes, full hearts, can't lose.",show:['Friday Night Lights'],char:['Eric Taylor','Coach Taylor'],d:'Hard',c:'TV'},
    {q:'The tribe has spoken.',show:['Survivor'],char:['Jeff Probst','Probst'],d:'Medium',c:'TV'}
  ];

  const blockedWords = ['fuck','shit','bitch','cunt','nigger','faggot'];

  function loadJSON(key, fallback){
    try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; }
    catch { return fallback; }
  }
  function saveJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
  function normalize(value){
    return String(value ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').trim().replace(/^(the|a|an)\s+/, '');
  }
  function esc(value){
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function matches(input, accepted){
    const n = normalize(input);
    if(!n) return false;
    return accepted.some(answer => {
      const x = normalize(answer);
      return n === x || (n.length >= 5 && x.length >= 5 && (n.includes(x) || x.includes(n)));
    });
  }
  function quoteKey(q){ return normalize(q.q); }
  function getCustomQuotes(){ return loadJSON(CUSTOM_KEY, []); }
  function allQuotes(){
    const seen = new Set();
    return [...builtInQuotes, ...getCustomQuotes()].filter(q => {
      const key = quoteKey(q);
      if(seen.has(key)) return false;
      seen.add(key); return true;
    });
  }
  function hasBlockedText(value){
    const n = ` ${normalize(value)} `;
    return blockedWords.some(word => n.includes(` ${word} `));
  }
  function convertQuote(raw){
    if(!raw || typeof raw !== 'object') throw new Error('Each quote must be an object.');
    const q = String(raw.q ?? raw.quote ?? '').trim();
    const showRaw = raw.show ?? raw.s ?? raw.title ?? raw.source ?? '';
    const charRaw = raw.char ?? raw.sp ?? raw.character ?? raw.speaker ?? '';
    const show = Array.isArray(showRaw) ? showRaw.map(String).map(s=>s.trim()).filter(Boolean) : String(showRaw).split('|').map(s=>s.trim()).filter(Boolean);
    const char = Array.isArray(charRaw) ? charRaw.map(String).map(s=>s.trim()).filter(Boolean) : String(charRaw).split('|').map(s=>s.trim()).filter(Boolean);
    const d = ['Easy','Medium','Hard'].includes(raw.d ?? raw.difficulty) ? (raw.d ?? raw.difficulty) : 'Medium';
    const before = String(raw.before ?? raw.b ?? '').trim();
    const after = String(raw.after ?? raw.a ?? '').trim();
    const c = String(raw.c ?? raw.category ?? 'Custom').trim() || 'Custom';
    if(!q || !show[0] || !char[0]) throw new Error('Quote, show/movie, and character are required.');
    if(hasBlockedText([q,...show,...char].join(' '))) throw new Error('That entry was blocked by the profanity filter.');
    return {q,show,char,d,c,before,after};
  }
  function addCustomQuote(raw){
    const quote = convertQuote(raw);
    const current = getCustomQuotes();
    if(allQuotes().some(q => quoteKey(q) === quoteKey(quote))) return {added:false, reason:'That quote is already in the collection.'};
    current.push(quote); saveJSON(CUSTOM_KEY, current);
    return {added:true, quote};
  }
  function importQuotes(payload){
    const rows = Array.isArray(payload) ? payload : Array.isArray(payload?.quotes) ? payload.quotes : [];
    if(!rows.length) throw new Error('No quotes found in that JSON file.');
    const existing = new Set(allQuotes().map(quoteKey));
    const current = getCustomQuotes();
    let added = 0, skipped = 0;
    for(const raw of rows){
      try{
        const quote = convertQuote(raw);
        const key = quoteKey(quote);
        if(existing.has(key)){ skipped++; continue; }
        existing.add(key); current.push(quote); added++;
      }catch{ skipped++; }
    }
    saveJSON(CUSTOM_KEY, current);
    return {added, skipped};
  }
  function exportQuotes(){
    return {app:'Quote Challenge',format:'QuoteChallengeQuotes',version:1,exported:new Date().toISOString(),quotes:allQuotes()};
  }
  function downloadJSON(value, filename){
    const blob = new Blob([JSON.stringify(value,null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 1200);
  }
  function ledger(){
    const fallback = {profiles:[],games:[],firstWinners:{new:[],classic:[]}};
    const value = loadJSON(LEDGER_KEY, fallback);
    value.profiles = Array.isArray(value.profiles) ? value.profiles : [];
    value.games = Array.isArray(value.games) ? value.games : [];
    value.firstWinners = value.firstWinners && typeof value.firstWinners === 'object' ? value.firstWinners : {new:[],classic:[]};
    value.firstWinners.new = Array.isArray(value.firstWinners.new) ? value.firstWinners.new : [];
    value.firstWinners.classic = Array.isArray(value.firstWinners.classic) ? value.firstWinners.classic : [];
    return value;
  }
  function saveLedger(value){ saveJSON(LEDGER_KEY, value); }
  function daily(){ return loadJSON(DAILY_KEY, {attempts:{},points:{}}); }
  function saveDaily(value){ saveJSON(DAILY_KEY, value); }
  function solo(){ return loadJSON(SOLO_KEY, {games:0,wins:0,best:0,points:0}); }
  function saveSolo(value){ saveJSON(SOLO_KEY, value); }
  function ensureProfile(ledgerValue, name){
    const key = normalize(name);
    let p = ledgerValue.profiles.find(x=>normalize(x.name)===key);
    if(!p){ p={id:(crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`),name}; ledgerValue.profiles.push(p); }
    return p;
  }
  function recordGame({mode,players,scores,winner}){
    const L = ledger();
    const p = players.map(name=>ensureProfile(L,name));
    const rec = {id:(crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`),mode,players:p.map(x=>x.id),scores:[...scores],winner:winner===null?null:p[winner].id,completed:new Date().toISOString()};
    L.games.push(rec);
    if(winner!==null && !L.firstWinners[mode].includes(p[winner].id)) L.firstWinners[mode].push(p[winner].id);
    saveLedger(L); return rec;
  }
  function leaderboard(mode){
    const L = ledger();
    const games = L.games.filter(g=>g.mode===mode);
    return L.firstWinners[mode].slice(0,10).map((id,index)=>{
      const profile = L.profiles.find(p=>p.id===id);
      const played = games.filter(g=>g.players.includes(id));
      const won = played.filter(g=>g.winner===id);
      const firstWin = won[0];
      return {
        slot:index+1,
        name:profile?.name || 'Unknown',
        firstScore:firstWin ? firstWin.scores[firstWin.players.indexOf(id)] : 0,
        wins:won.length,
        games:played.length,
        career:played.reduce((sum,g)=>sum+g.scores[g.players.indexOf(id)],0)
      };
    });
  }
  function fullBackup(){
    return {app:'Quote Challenge',format:'QuoteChallengeDemoFull',version:1,exported:new Date().toISOString(),customQuotes:getCustomQuotes(),ledger:ledger(),daily:daily(),solo:solo()};
  }
  function restoreFullBackup(value){
    if(value?.format!=='QuoteChallengeDemoFull' || value?.version!==1) throw new Error('Choose a Quote Challenge demo full backup.');
    if(!Array.isArray(value.customQuotes) || !value.ledger || !value.daily) throw new Error('Backup is missing required data.');
    const clean = [];
    for(const q of value.customQuotes) clean.push(convertQuote(q));
    saveJSON(CUSTOM_KEY, clean);
    saveLedger(value.ledger);
    saveDaily(value.daily);
    if(value.solo) saveSolo(value.solo);
  }
  function dayKey(){
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function dailyQuote(){
    const q = allQuotes();
    const key = dayKey(); let seed=0; for(const ch of key) seed += ch.charCodeAt(0);
    return q[seed % q.length];
  }
  function randomQuote(difficulty='Mixed', exclude=''){
    const pool = allQuotes().filter(q => difficulty==='Mixed' || q.d===difficulty);
    const usable = pool.length>1 ? pool.filter(q=>q.q!==exclude) : pool;
    return usable[Math.floor(Math.random()*usable.length)];
  }
  return {
    CUSTOM_KEY, LEDGER_KEY, DAILY_KEY, SOLO_KEY,
    builtInQuotes, allQuotes, normalize, esc, matches, randomQuote,
    addCustomQuote, importQuotes, exportQuotes, downloadJSON,
    ledger, saveLedger, daily, saveDaily, solo, saveSolo, ensureProfile, recordGame, leaderboard,
    fullBackup, restoreFullBackup, dayKey, dailyQuote, convertQuote
  };
})();
