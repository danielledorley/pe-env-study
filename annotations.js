(function(){
  const KEY='pe-study-annotations-v1';
  let A=(()=>{try{return JSON.parse(localStorage.getItem(KEY))||{highlights:[],notes:[]}}catch(e){return{highlights:[],notes:[]}}})();
  let applying=false;
  let pendingSelection=null;
  let toolbarActive=false;
  const save=()=>localStorage.setItem(KEY,JSON.stringify(A));
  const article=()=>document.querySelector('.guide-article');
  const topic=()=>{let h=document.querySelector('#app>h1.hero');return h?h.textContent.trim():''};
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function nodes(r){let w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT),a=[],n;while(n=w.nextNode())a.push(n);return a}
  function rangeFor(root,q){
    let txt=root.textContent,i=txt.indexOf(q);
    if(i<0){let t=txt.replace(/\s+/g,' ').trim(),qq=q.replace(/\s+/g,' ').trim();i=t.indexOf(qq);if(i<0)return null;return rangeFor(root,qq)}
    let p=0,s,e,so,eo;
    for(const n of nodes(root)){let z=p+n.nodeValue.length;if(s==null&&i>=p&&i<=z){s=n;so=i-p}if(i+q.length>=p&&i+q.length<=z){e=n;eo=i+q.length-p;break}p=z}
    if(!s||!e)return null;let r=document.createRange();r.setStart(s,so);r.setEnd(e,eo);return r
  }
  function apply(){
    let r=article();if(!r||applying)return;applying=true;
    try{r.querySelectorAll('.sb-highlight').forEach(x=>x.replaceWith(...x.childNodes));A.highlights.filter(x=>x.topic===topic()).forEach(x=>{let z=rangeFor(r,x.text);if(z)try{let m=document.createElement('mark');m.className='sb-highlight';m.dataset.id=x.id;m.append(z.extractContents());z.insertNode(m)}catch(e){}})}
    finally{applying=false}
  }
  function render(){
    let r=article(),f=document.getElementById('sb-fab'),p=document.getElementById('sb-panel');
    if(!r){if(f)f.style.display='none';if(p)p.classList.remove('open');return}
    f.style.display='block';if(!p.classList.contains('open'))return;
    let ns=A.notes.slice().reverse(),hs=A.highlights.slice().reverse();
    p.innerHTML=`<div class="sb-head"><div><div class="sb-title">My Notes & Highlights</div><div class="sb-count">${hs.length} highlights · ${ns.length} notes</div></div><button class="sb-btn" id="sb-close">Close</button></div><div class="sb-box"><button class="sb-btn" id="sb-general">＋ New general note</button><div class="sb-actions"><button class="sb-btn" id="sb-export">Export</button><button class="sb-btn" id="sb-import">Import</button><input id="sb-file" type="file" accept="application/json" hidden></div></div><h4>Notes</h4>${ns.length?ns.map(n=>`<div class="sb-item"><div class="sb-quote">${n.quote?'“'+esc(n.quote.slice(0,180))+'”':'General note'}</div><div class="sb-text">${esc(n.text)}</div><div class="sb-meta">${esc(n.topic||'All topics')}</div><div class="sb-actions">${n.quote?`<button data-go="${n.id}">Go to passage</button>`:''}<button data-dn="${n.id}">Delete</button></div></div>`).join(''):'<div class="sb-count">No notes yet. Select text and choose Note.</div>'}<h4>Highlights</h4>${hs.length?hs.map(h=>`<div class="sb-item"><div class="sb-quote">“${esc(h.text.slice(0,180))}”</div><div class="sb-meta">${esc(h.topic)}</div><div class="sb-actions"><button data-go="${h.id}">Go to passage</button><button data-dh="${h.id}">Remove</button></div></div>`).join(''):'<div class="sb-count">No highlights yet. Select text and choose Highlight.</div>'}`;
    p.querySelector('#sb-close').onclick=()=>p.classList.remove('open');
    p.querySelector('#sb-general').onclick=()=>{let n=prompt('New study note:','');if(n&&n.trim()){A.notes.push({id:'n'+Date.now(),topic:null,quote:'',text:n.trim()});save();render()}};
    p.querySelector('#sb-export').onclick=()=>{let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(A,null,2)],{type:'application/json'}));a.download='study-bench-notes-highlights.json';a.click()};
    p.querySelector('#sb-import').onclick=()=>p.querySelector('#sb-file').click();
    p.querySelector('#sb-file').onchange=e=>{let rd=new FileReader();rd.onload=()=>{try{let x=JSON.parse(rd.result);if(!Array.isArray(x.notes)||!Array.isArray(x.highlights))throw 0;A=x;save();apply();render();alert('Study data imported.')}catch(_){alert('Invalid Study Bench export.')}};rd.readAsText(e.target.files[0])};
    p.querySelectorAll('[data-dn]').forEach(b=>b.onclick=()=>{A.notes=A.notes.filter(x=>x.id!==b.dataset.dn);save();render()});
    p.querySelectorAll('[data-dh]').forEach(b=>b.onclick=()=>{A.highlights=A.highlights.filter(x=>x.id!==b.dataset.dh);save();apply();render()});
    p.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{let x=[...A.notes,...A.highlights].find(x=>x.id===b.dataset.go);if(x&&topic()===x.topic){let z=rangeFor(article(),x.quote||x.text);if(z)z.startContainer.parentElement?.scrollIntoView({behavior:'smooth',block:'center'})}})
  }
  function init(){
    if(document.getElementById('sb-panel'))return;
    let st=document.createElement('style');
    st.textContent='.sb-toolbar{position:fixed;z-index:2000;display:none;gap:4px;background:#263746;color:#fff;padding:6px;border-radius:10px;box-shadow:0 8px 24px #26374633;font:600 12px var(--mono);-webkit-user-select:none;user-select:none}.sb-toolbar button{border:0;background:transparent;color:#fff;padding:7px 9px;border-radius:7px;font:inherit;touch-action:manipulation}.sb-toolbar button:hover{background:#ffffff1f}.sb-highlight{background:#fff0a8;border-radius:3px;box-decoration-break:clone;-webkit-box-decoration-break:clone;cursor:pointer}.sb-fab{position:fixed;right:16px;bottom:16px;z-index:1999;border:1px solid #d8cbd3;background:#263746;color:#fff;border-radius:999px;padding:11px 14px;box-shadow:0 8px 22px #26374633;font:600 12px var(--mono);cursor:pointer;display:none}.sb-panel{position:fixed;z-index:1998;right:16px;top:90px;width:min(390px,calc(100vw - 32px));max-height:calc(100vh - 110px);overflow:auto;background:#fff;border:1px solid var(--line);border-radius:16px;padding:18px;box-shadow:0 18px 50px #322a362e;display:none}.sb-panel.open{display:block}.sb-head{display:flex;justify-content:space-between;align-items:center}.sb-title{font:650 20px var(--serif)}.sb-count{font:10px var(--mono);color:#8995a2;margin-top:3px}.sb-box{margin-top:14px;padding:12px;background:#faf7fc;border:1px solid #e8dfef;border-radius:11px}.sb-item{padding:12px 0;border-top:1px solid #eee7ef}.sb-quote{font:14px var(--serif);line-height:1.45;color:#526270}.sb-text{font:13px var(--sans);line-height:1.5;color:#5f6c78;margin:5px 0}.sb-meta{font:9px var(--mono);color:#9aa3ac}.sb-actions{display:flex;gap:6px;margin-top:7px}.sb-actions button,.sb-panel .sb-btn{font:10px var(--mono);border:1px solid var(--line);background:#fff;padding:6px 8px;border-radius:7px;color:var(--ink)}@media(max-width:700px){.sb-panel{left:10px;right:10px;top:auto;bottom:10px;max-height:72vh}.sb-fab{right:12px;bottom:12px}}';
    document.head.append(st);
    let t=document.createElement('div');t.id='sb-toolbar';t.className='sb-toolbar';t.innerHTML='<button data-a="h">💛 Highlight</button><button data-a="n">📝 Note</button>';document.body.append(t);
    let p=document.createElement('aside');p.id='sb-panel';p.className='sb-panel';document.body.append(p);
    let f=document.createElement('button');f.id='sb-fab';f.className='sb-fab';f.textContent='📝 My Notes';document.body.append(f);
    function getSelectionData(){
      let s=window.getSelection(),z=s&&s.rangeCount?s.getRangeAt(0):null,r=article();
      if(!z||z.collapsed||!r||!r.contains(z.commonAncestorContainer))return null;
      let text=s.toString().trim();
      if(!text||text.length>=1200)return null;
      let saved=z.cloneRange();
      return {text,z:saved,topic:topic()};
    }
    function showToolbar(x){
      pendingSelection=x;
      let b=x.z.getBoundingClientRect();
      t.style.display='flex';
      t.style.left=Math.max(8,Math.min(innerWidth-220,b.left+b.width/2-110))+'px';
      t.style.top=Math.max(8,b.top-48)+'px';
    }
    document.addEventListener('selectionchange',()=>{
      if(toolbarActive)return;
      let x=getSelectionData();
      if(x)showToolbar(x);
      else if(t.style.display!=='flex')t.style.display='none';
    });
    const preserve=e=>{toolbarActive=true;e.preventDefault()};
    t.addEventListener('pointerdown',preserve,{passive:false});
    t.addEventListener('touchstart',preserve,{passive:false});
    t.addEventListener('pointerup',e=>{
      e.preventDefault();
      let a=e.target.closest('[data-a]')?.dataset.a,x=pendingSelection;
      if(!x)return;
      if(a==='h'){
        A.highlights.push({id:'h'+Date.now(),topic:x.topic,text:x.text});save();
        t.style.display='none';pendingSelection=null;apply();
      }else{
        let n=prompt('Add a note for this passage:','');
        if(n&&n.trim()){A.notes.push({id:'n'+Date.now(),topic:x.topic,quote:x.text,text:n.trim()});save();render()}
        t.style.display='none';pendingSelection=null;
      }
      window.getSelection()?.removeAllRanges();
      setTimeout(()=>{toolbarActive=false},80);
    },{passive:false});
    t.addEventListener('click',e=>e.preventDefault());
    f.onclick=()=>{p.classList.toggle('open');render()};
    let app=document.getElementById('app');
    if(app)new MutationObserver(()=>{clearTimeout(window.sbTimer);window.sbTimer=setTimeout(()=>{if(!applying){apply();render()}},120)}).observe(app,{childList:true,subtree:true});
    apply();render();
  }
  init();
})();
