const entranceMenu=document.getElementById('entranceMenu');
document.getElementById('portraitEntry').addEventListener('click',()=>entranceMenu.showModal());
document.getElementById('closeEntrance').addEventListener('click',()=>entranceMenu.close());
document.getElementById('complaintEntry').addEventListener('click',()=>{entranceMenu.close();chooseType('Complaint');openSuggestions();});
entranceMenu.addEventListener('click',event=>{if(event.target===entranceMenu)entranceMenu.close();});
