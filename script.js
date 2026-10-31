const root=document.documentElement;
root.classList.add('js');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const motion=document.querySelector('.motion-toggle');
let paused=reducedMotion.matches;
function updateMotion(){document.body.classList.toggle('motion-paused',paused);document.body.dataset.visualMotion=paused?'paused':'playing';motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'Resume visual motion':'Pause visual motion');motion.innerHTML=paused?'<span aria-hidden="true">▷</span> Resume motion':'<span aria-hidden="true">Ⅱ</span> Pause motion'}
updateMotion();motion.addEventListener('click',()=>{paused=!paused;updateMotion()});
reducedMotion.addEventListener('change',event=>{paused=event.matches;updateMotion()});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='☰'}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'×':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}}),{rootMargin:'-20% 0px -65% 0px'});
document.querySelectorAll('section[id]').forEach(el=>sectionObserver.observe(el));
const topic=document.querySelector('#enquiryTopic'),message=document.querySelector('#enquiryMessage'),name=document.querySelector('#enquiryName'),status=document.querySelector('#formStatus');
const caseNames={'Avidicure — request a copy':'Avidicure','OneChain — request a copy':'OneChain Immunotherapeutics','Antion — request a copy':'Antion Biosciences','Lift Therapeutics — request a copy':'Lift Therapeutics','BioThrust — request a copy':'BioThrust'};
const messages=Object.fromEntries(Object.entries(caseNames).map(([topic,company])=>[topic,'Hello Soner,\n\nI would like to request a copy of the '+company+' case study. Please let me know its availability and a suitable time to discuss the analysis.']));
let lastSuggested='';
function suggestMessage(){const next=messages[topic.value]||'';if(!message.value||message.value===lastSuggested){message.value=next;lastSuggested=next}status.textContent=''}
topic.addEventListener('change',suggestMessage);
document.querySelectorAll('[data-topic]').forEach(a=>a.addEventListener('click',()=>{topic.value=a.dataset.topic;suggestMessage();status.textContent=caseNames[topic.value]?caseNames[topic.value]+' selected. Add any context, then open your email draft.':''}));
function enquiry(){return {subject:'Vivio enquiry: '+topic.value,body:(message.value.trim()||'Hello Soner,\n\nI would like to discuss: '+topic.value)+ (name.value.trim()?'\n\n'+name.value.trim():'')}}
document.querySelector('#contactForm').addEventListener('submit',e=>{e.preventDefault();const draft=enquiry();window.location.href='mailto:gundemir@vivioresearch.com?subject='+encodeURIComponent(draft.subject)+'&body='+encodeURIComponent(draft.body);status.textContent='Email draft prepared. If your email app does not open, use Copy enquiry and email Soner directly.'});
document.querySelector('#copyEnquiry').addEventListener('click',async()=>{const draft=enquiry();const text='To: gundemir@vivioresearch.com\nSubject: '+draft.subject+'\n\n'+draft.body;let copied=false;try{await navigator.clipboard.writeText(text);copied=true}catch{}if(!copied){const fallback=document.createElement('textarea');fallback.value=text;fallback.setAttribute('aria-label','Enquiry to copy');fallback.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(fallback);fallback.select();try{copied=document.execCommand('copy')}catch{}fallback.remove()}status.textContent=copied?'Enquiry copied. Paste it into your email app and send it to Soner.':'Please copy your message above and email gundemir@vivioresearch.com.'});

// Interactive expertise guide: one selected topic and its explanatory panel.
const expertiseTabs=[...document.querySelectorAll('.map-topic')];
function selectExpertise(tab,focus=false){
 expertiseTabs.forEach(button=>{const active=button===tab;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;document.getElementById(button.getAttribute('aria-controls')).hidden=!active});
 if(focus)tab.focus();
}
expertiseTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectExpertise(tab));
 tab.addEventListener('keydown',event=>{
 let next=null;
 if(event.key==='ArrowRight')next=(index+1)%expertiseTabs.length;
 if(event.key==='ArrowLeft')next=(index-1+expertiseTabs.length)%expertiseTabs.length;
 if(event.key==='Home')next=0;
 if(event.key==='End')next=expertiseTabs.length-1;
 if(next!==null){event.preventDefault();selectExpertise(expertiseTabs[next],true)}
 });
});
document.querySelectorAll('[data-open-service]').forEach(link=>link.addEventListener('click',()=>{const service=document.getElementById(link.dataset.openService);if(service){service.open=true;service.closest('.reveal')?.classList.add('visible')}}));
function openLinkedService(){
 let id;try{id=decodeURIComponent(window.location.hash.slice(1))}catch{return}
 const target=document.getElementById(id),service=target?.closest('details');
 if(!service||service.open)return;
 service.open=true;service.closest('.reveal')?.classList.add('visible');
 requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
}
window.addEventListener('hashchange',openLinkedService);openLinkedService();
