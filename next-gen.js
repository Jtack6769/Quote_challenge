// EDIT THESE THREE TEXT VALUES to change the top marquee messages.
const slides=[
  {text:"WELCOME TO QUOTE CHALLENGE 7.5 IT'S A NEW DAY!",direction:'right',hold:3000},
  {text:'THE QUOTES ARE OVERFLOWING AND WE WISH YOU A HAPPY HOLIDAY SEASON',direction:'left',hold:2500},
  {text:'QC IS ALWAYS DREAMING UP FUN FOR YOU SO TUNE UP YOUR MIND AND ENJOY THE TRIP DOWN MEMORY LANE!',direction:'right',hold:4000}
];
const waveMessage=document.getElementById('waveMessage');
const wave=document.getElementById('wave');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function start(){
  let index=0;
  while(true){
    const slide=slides[index];
    wave.className='wave';
    void wave.offsetWidth;
    wave.classList.add(slide.direction==='right'?'run-right':'run-left');
    await sleep(900);
    waveMessage.classList.add('hide');
    await sleep(150);
    waveMessage.textContent=slide.text;
    waveMessage.classList.remove('hide');
    await sleep(1150);
    await sleep(slide.hold);
    index=(index+1)%slides.length;
  }
}
start();
const backdrop=document.getElementById('backdrop');
const openBtn=document.getElementById('openSuggestions');
const typeBug=document.getElementById('typeBug');
const typeSuggestion=document.getElementById('typeSuggestion');
function chooseType(type){
  const bug=type==='Bug Report';
  document.getElementById('subject').value=type;
  typeBug.setAttribute('aria-pressed',String(bug));
  typeSuggestion.setAttribute('aria-pressed',String(type==='Suggestions'));
  document.getElementById('typeComplaint').setAttribute('aria-pressed',String(type==='Complaint'));
}
document.getElementById('typeComplaint').addEventListener('click',()=>chooseType('Complaint'));
typeBug.addEventListener('click',()=>chooseType('Bug Report'));
typeSuggestion.addEventListener('click',()=>chooseType('Suggestions'));
function openSuggestions(){backdrop.classList.add('open');document.getElementById('message').focus();}
function closeSuggestions(){backdrop.classList.remove('open');}
openBtn.addEventListener('click',openSuggestions);
document.getElementById('suggestionsLink').addEventListener('click',openSuggestions);
document.getElementById('closeSuggestions').addEventListener('click',closeSuggestions);
backdrop.addEventListener('click',event=>{if(event.target===backdrop)closeSuggestions();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSuggestions();});
document.getElementById('suggestionForm').addEventListener('submit',event=>{
 event.preventDefault();
 const subject=document.getElementById('subject').value;
 const message=document.getElementById('message').value;
 window.location.href='mailto:qcchallenger67@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(message);
});
const viewer=document.querySelector('dialog.viewer');
const enlarged=viewer.querySelector('img');
function enlarge(frame){
 const picture=frame.querySelector('img');
 enlarged.src=picture.currentSrc||picture.src;
 enlarged.alt=picture.alt;
 if(!viewer.open)viewer.showModal();
}
document.querySelectorAll('.hanging-frame').forEach(frame=>{
 frame.addEventListener('click',()=>enlarge(frame));
 frame.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();enlarge(frame);}});
});
viewer.querySelector('.close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
