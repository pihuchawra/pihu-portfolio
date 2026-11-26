const dialog=document.querySelector('dialog');
const links=[...document.querySelectorAll('.gallery-image')];
let selected=0,opener;
function show(index){selected=(index+links.length)%links.length;const link=links[selected];const image=dialog.querySelector('figure img');image.src=link.href;image.alt=link.querySelector('img').alt;dialog.querySelector('figcaption').textContent=link.dataset.caption;dialog.querySelector('.original').href=link.href;dialog.querySelector('.prev').hidden=dialog.querySelector('.next').hidden=links.length<2;}
links.forEach((link,index)=>link.addEventListener('click',event=>{event.preventDefault();opener=link;show(index);dialog.showModal();}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.querySelector('.prev').addEventListener('click',()=>show(selected-1));
dialog.querySelector('.next').addEventListener('click',()=>show(selected+1));
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();show(selected-1);}if(event.key==='ArrowRight'){event.preventDefault();show(selected+1);}});
dialog.addEventListener('close',()=>opener?.focus());
