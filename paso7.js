/* ===================== KUSKA · Ajustes de la prueba final (arquitectura: ingreso, invitado y animales bloqueados) ===================== */

/* después del onboarding y el nombre: elegir Demo o navegar como invitado */
function chooseStart(){const nm=esc(S.name||'');
  openSheet(`<img src="img/k04.webp" alt="Kuska" class="kuska" style="display:block;width:${U(110)};margin:0 auto ${U(6)}">
    <h2 class="sh-t">¿Cómo querés empezar${nm?`, ${nm}`:''}?</h2>
    <p class="sh-p">La Demo de situaciones es el camino para conocer a los animales y postularte. Como invitado podés mirar Aprender, Red y el catálogo, sin hacer la Demo.</p>
    <button class="btn sh-b" id="csDemo">Realizar la Demo</button><button class="lnk sh-c" id="csGuest">Navegar como invitado</button>`,
    w=>{$('#csDemo',w).onclick=()=>{closeSheetA(true);Object.assign(S,{created:true,logged:true,guest:false,firstHome:false});if(typeof resetGame==='function')resetGame();save();snd('sel');go('demo',{root:true})};
       $('#csGuest',w).onclick=()=>{closeSheetA(true);Object.assign(S,{guest:true,logged:false,firstHome:false});save();snd('swipe');go('invitado',{root:true})}})}

/* «Animales que buscan hogar» queda bloqueado para el adoptante hasta terminar la Demo con 80 % o más */
const ORG_ROUTES=/^#(orgperfil|orgInicio|orgnov|solicitudes|postulante|carga)/;
function animalsLocked(n){const k=String(n).split('?')[0];return (k==='catalogo'||k==='ficha')&&!S.guest&&!certOK()&&!ORG_ROUTES.test(location.hash)}
function lockSheet(){const done=S.g&&S.g.done;snd('error');
  openSheet(`<img class="shl" src="img/lock_sheet.webp" alt="">
    <h2 class="sh-t" style="margin-top:${U(12)}">Tus amigos te esperan…</h2>
    <p class="sh-p">Los animales se desbloquean al terminar la Demo de situaciones con 80 % o más. ${done?`Llegaste a ${prepPct()} %: repasá y volvé a intentarlo.`:`Te ${retosFaltan()===1?'falta 1 reto':`faltan ${retosFaltan()} retos`}.`}</p>
    <button class="btn sh-b" id="lkGo">${done?'Repetir la Demo':'Ir a la Demo'}</button><button class="lnk sh-c" data-cancel>Ahora no</button>`,
    w=>{$('#lkGo',w).onclick=()=>{closeSheetA(true);snd('sel');go('demo')}})}
const _go7=go;go=function(n,o){if(animalsLocked(n)){lockSheet();return}return _go7(n,o)};
const _render7=render;render=function(n,d){if(animalsLocked(n)){n=S.logged?'inicio':'registro';history.replaceState({s:n,i:typeof idx==='number'?idx:0},'','#'+n)}return _render7(n,d)};

/* Splash (v29, pantalla nueva de Paula): fondo blanco; el logo se dibuja siguiendo su propia línea con sus colores originales
   (img/s01_logo2.webp = recorte exacto del PNG; img/s01_logo2_t.png = orden a lo largo de la línea, R·256+G) y el texto aparece en conjunto */
SCR.splash={bg:'#fff',sbg:'#fff',fit:true,html:()=>`
  <canvas class="a" id="spLogo" width="386" height="348" role="img" aria-label="Kuska" style="${box(103.1,305,198.9,179.4)}"></canvas>
  <p class="a ctr" id="spTag" style="${box(0,500.3,402)};margin:0;font-family:Quicksand,sans-serif;font-weight:700;font-size:${U(19)};line-height:${U(27)};color:#C15DE5;--p:0;-webkit-mask-image:linear-gradient(90deg,#000 calc(var(--p) * 130% - 30%),transparent calc(var(--p) * 130%));mask-image:linear-gradient(90deg,#000 calc(var(--p) * 130% - 30%),transparent calc(var(--p) * 130%))">Juntos hacia una<br>adopción responsable</p>`,
  mount(el){let raf=0,t0=0,tm=[],dead=false;
    const cv=$('#spLogo',el),cx=cv.getContext('2d'),tag=$('#spTag',el),W=386,H=348,n=W*H;
    const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const col=new Image(),ord=new Image();col.src='img/s01_logo2.webp';ord.src='img/s01_logo2_t.png';
    const full=()=>{cx.clearRect(0,0,W,H);cx.drawImage(col,0,0);tag.style.setProperty('--p',1)};
    const next=()=>{dead=true;cancelAnimationFrame(raf);tm.forEach(clearTimeout);go('bienvenida',{replace:true})};
    el.onclick=next;
    const DELAY=400,DUR=2300,E=.012;
    let ok=0;const ready=()=>{if(++ok<2||dead)return;
      if(reduce){full();return}
      const g=document.createElement('canvas');g.width=W;g.height=H;const gx=g.getContext('2d');
      gx.drawImage(col,0,0);const cd=gx.getImageData(0,0,W,H).data;gx.clearRect(0,0,W,H);gx.drawImage(ord,0,0);const sd=gx.getImageData(0,0,W,H).data;
      const T=new Float32Array(n),on=new Uint8Array(n);for(let i=0;i<n;i++){on[i]=sd[i*4+3]>0;T[i]=(sd[i*4]*256+sd[i*4+1])/65535}
      const out=cx.createImageData(W,H),od=out.data;for(let i=0;i<n*4;i++)od[i]=cd[i];
      const frame=now=>{if(dead)return;if(!t0)t0=now;
        const p=Math.min(1,Math.max(0,(now-t0-DELAY)/DUR)),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2,head=e*(1+E);
        for(let i=0;i<n;i++)od[i*4+3]=on[i]?255*Math.min(1,Math.max(0,(head-T[i])/E)):0;
        cx.putImageData(out,0,0);tag.style.setProperty('--p',e.toFixed(4));
        if(p<1)raf=requestAnimationFrame(frame);else full()};
      raf=requestAnimationFrame(frame)};
    col.onload=ord.onload=ready;col.onerror=ord.onerror=()=>{tag.style.setProperty('--p',1)};
    tm.push(setTimeout(next,reduce?2600:DELAY+DUR+1300));
    return()=>{dead=true;cancelAnimationFrame(raf);tm.forEach(clearTimeout)}}};

/* una demo «completada» por los atajos viejos (ya quitados) no cuenta: vuelve al reto 1 */
if(S.g&&S.g.skipped&&typeof resetGame==='function')resetGame();

/* ===== Navegación del adoptante certificado (como en la demo anterior: cada bloque lleva a su pantalla) ===== */
function afterMount7(k,f){const d=SCR[k];if(!d)return;const m=d.mount;d.mount=function(el){const r=m?m.call(this,el):undefined;try{f(el)}catch(e){console.error(e)}return r}}
const FRIENDS7=['simba','porota','batata'];
/* 11 · Inicio: amigos → su ficha; tarjeta de Kuska → la Demo */
afterMount7('inicio',el=>{
  const fr=$('#fr',el);if(fr&&certOK()){
    $$('.friends button',fr).forEach((b,i)=>{const id=FRIENDS7[i];if(!id)return;const im=$('img',b);if(im){im.src=`img/an/${id}.webp`;im.alt=AN(id).n}b.setAttribute('aria-label',AN(id).n)});
    fr.onclick=e=>{const b=e.target.closest('.friends button');if(!b)return;const i=$$('.friends button',fr).indexOf(b);snd('tap');AD().ftab='perfil';save();go('ficha?'+FRIENDS7[i])}}
  const kc=$('.kcard',el);if(kc&&S.demoDone){kc.style.cursor='pointer';kc.setAttribute('role','button');kc.setAttribute('aria-label','Ver la Demo');kc.onclick=()=>{snd('sel');go('juego')}}
});
/* 49 · Notificaciones: certificado → Mi progreso; insignias → Mi progreso · Insignias */
afterMount7('notificaciones',el=>{
  $$('.nt2:not(.new)',el).forEach(n=>{const s=($('img',n)||{}).src||'';const to=/n_1\.webp/.test(s)?'progreso':/n_2\.webp/.test(s)?'progreso?ins':null;if(!to)return;
    n.style.cursor='pointer';n.setAttribute('role','button');n.onclick=()=>{snd('tap');go(to)}})});
/* 50 · Perfil: insignias obtenidas → Mi progreso · Insignias */
afterMount7('perfil',el=>{
  const hs=$$('h3',el).filter(h=>/Insignias obtenidas/.test(h.textContent)),ims=$$('img[alt^="Insignia de"]',el);
  [...hs,...ims].forEach(x=>{x.style.cursor='pointer';x.style.pointerEvents='auto';x.onclick=()=>{snd('tap');go('progreso?ins')}})});
/* 14 · Plan de cada animal: la 1.ª vez aparece «¡Tu plan está listo!» (09); Evaluar compatibilidad → ficha, pestaña Cuidados (55) */
afterMount7('planAnimal',el=>{
  const id=location.hash.split('?')[1]||'simba',d=AD(),b=$('#eval',el);if(!b)return;const showPlan=b.onclick;
  b.onclick=()=>{snd('sel');d.ftab='cuidados';save();go('ficha?'+id)};
  d.seen=d.seen||{};if(!d.seen['plan_'+id]&&showPlan){d.seen['plan_'+id]=1;save();setTimeout(()=>{if(document.body.contains(b))showPlan()},450)}});
/* 16 · Seguimiento: tareas → Calendario (19) */
afterMount7('seguimiento',el=>{const c=$('.sgcard',el);if(!c)return;
  const l=document.createElement('button');l.className='a lnk';l.textContent='Ver en el calendario';l.style.cssText=`${box(222,553,160,26)};text-align:right;font-size:${U(12.5)}`;
  l.onclick=()=>{snd('tap');go('calendario')};c.parentNode.insertBefore(l,c.nextSibling)});

/* ===== v13 · estilos ===== */
(function(){const st=document.createElement('style');st.textContent=`
#orb .oc{transition:transform .28s cubic-bezier(.3,1.4,.5,1),filter .35s,opacity .35s,box-shadow .28s;touch-action:none}
#orb .oc.hl{transform:scale(1.15);z-index:3;box-shadow:0 0 0 calc(var(--u)*3) #fff,0 calc(var(--u)*12) calc(var(--u)*24) rgba(52,41,109,.32)}
#orb.snap .oc{transition:left .38s cubic-bezier(.3,1.2,.5,1),top .38s cubic-bezier(.3,1.2,.5,1),transform .28s,filter .35s,opacity .35s}
#orb.picked .oc:not(.sel){filter:grayscale(1);opacity:.55;transform:scale(.94)}
#orb.picked .oc.sel{transform:scale(1.18);z-index:4;box-shadow:0 0 0 calc(var(--u)*3.5) var(--lime),0 calc(var(--u)*12) calc(var(--u)*26) rgba(52,41,109,.35)}
.orbzone{touch-action:none}
.rtw{position:absolute}.rtw img{position:absolute;inset:0;width:100%;height:100%}
.rtw .rta{transform-origin:44.5% 50.6%;animation:rtspin 1s linear infinite}
@keyframes rtspin{to{transform:rotate(360deg)}}
@property --cang{syntax:'<angle>';inherits:false;initial-value:0deg}
@keyframes cload{from{--cang:0deg}to{--cang:360deg}}
.cseal{-webkit-mask-image:conic-gradient(#000 var(--cang),transparent 0);mask-image:conic-gradient(#000 var(--cang),transparent 0);animation:cload 1.7s .35s cubic-bezier(.45,.05,.3,1) both}
.cflash{border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.95),rgba(255,255,255,0));opacity:0;animation:cflash .9s 2.05s ease-out both;pointer-events:none}
@keyframes cflash{0%{opacity:0;transform:scale(.6)}35%{opacity:1}100%{opacity:0;transform:scale(1.25)}}
.cshine{overflow:hidden;pointer-events:none}.cshine i{position:absolute;top:-20%;bottom:-20%;width:35%;left:-40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);animation:cshine .9s ease-out both}
@keyframes cshine{to{left:110%}}
.cpill{overflow:hidden}.cpill .pf{position:absolute;inset:0;border-radius:inherit;background:#C15DE5;clip-path:inset(0 100% 0 0);animation:pfill 1.1s 2.2s cubic-bezier(.45,.05,.3,1) both}
.cpill .pt{position:relative;color:#A77CC4;animation:ptc .4s 3s both}
@keyframes ptc{to{color:#fff}}
@keyframes pfill{to{clip-path:inset(0 0 0 0)}}
.lnk.start7{color:#6B6496;font-size:calc(var(--u)*13)}
`;document.head.appendChild(st)})();

/* ===== Catálogo en órbita: el animal que señalás se destaca; al elegir, queda a color y el resto sin color; arrastrá para hacer girar ===== */
afterMount7('catalogo',el=>{const orb=$('#orb',el);if(!orb)return;const fr=orb.closest('.fr')||el,d=AD();
  const C=[200,607],slots=ORB.map(([x,y])=>({a:Math.atan2(y-C[1],x-C[0]),r:Math.hypot(x-C[0],y-C[1])}));
  const ring=slots.map((s,i)=>i).sort((p,q)=>slots[p].a-slots[q].a);   /* orden angular de los 5 lugares */
  const zone=document.createElement('div');zone.className='a orbzone';zone.style.cssText=box(0,440,402,400);orb.parentNode.insertBefore(zone,orb);
  let th=0,drag=null,moved=0,picked=false;
  const U2=e=>{const r=fr.getBoundingClientRect(),k=r.width/402;return [(e.clientX-r.left)/k,(e.clientY-r.top)/k]};
  const ocs=()=>$$('.oc',orb);
  const place=()=>{ocs().forEach((o,i)=>{const pos=ring.indexOf(i),n=ring.length;let f=pos+th/(2*Math.PI/n);f=((f%n)+n)%n;const i0=Math.floor(f),t=f-i0,s0=slots[ring[i0]],s1=slots[ring[(i0+1)%n]];
      let a1=s1.a;if(a1<s0.a)a1+=2*Math.PI;const a=s0.a+(a1-s0.a)*t,r=s0.r+(s1.r-s0.r)*t;o.style.left=U(C[0]+Math.cos(a)*r-53);o.style.top=U(C[1]+Math.sin(a)*r-53)})};
  const nearest=p=>{let b=null,bd=1e9;ocs().forEach(o=>{const r=o.getBoundingClientRect(),f=fr.getBoundingClientRect(),k=f.width/402,cx=(r.left+r.width/2-f.left)/k,cy=(r.top+r.height/2-f.top)/k,dd=Math.hypot(p[0]-cx,p[1]-cy);if(dd<bd){bd=dd;b=o}});return bd<80?b:null};
  const hl=o=>{if(picked)return;ocs().forEach(x=>x.classList.toggle('hl',x===o))};
  const pick=o=>{if(!o||picked)return;picked=true;ocs().forEach(x=>{x.classList.remove('hl');x.classList.toggle('sel',x===o)});orb.classList.add('picked');d.orbSel=o.dataset.id;save();snd('sel');
    setTimeout(()=>{if(document.body.contains(o)){snd('tap');go('ficha?'+o.dataset.id)}},650)};
  const inRing=p=>Math.hypot(p[0]-C[0],p[1]-C[1])<200;
  const down=e=>{const p=U2(e);if(!inRing(p))return;picked&&(picked=false,orb.classList.remove('picked'));drag={a:Math.atan2(p[1]-C[1],p[0]-C[0]),th0:th,x:p[0],y:p[1]};moved=0;orb.classList.remove('snap');hl(nearest(p));try{e.target.setPointerCapture&&e.target.setPointerCapture(e.pointerId)}catch(_){}};
  const move=e=>{const p=U2(e);if(!drag){if(e.pointerType==='mouse'&&inRing(p))hl(nearest(p));return}
    moved=Math.max(moved,Math.hypot(p[0]-drag.x,p[1]-drag.y));if(moved>8){let da=Math.atan2(p[1]-C[1],p[0]-C[0])-drag.a;da=Math.atan2(Math.sin(da),Math.cos(da));th=drag.th0+da;place()}hl(nearest(p))};
  const up=e=>{if(!drag)return;const p=U2(e);const was=drag;drag=null;
    if(moved<=8){pick(nearest(p));return}
    const st=2*Math.PI/ring.length,k=Math.round(th/st);if(k!==Math.round(was.th0/st))snd('swipe');th=k*st;orb.classList.add('snap');place();hl(nearest(p))};
  [zone,orb].forEach(t=>{t.addEventListener('pointerdown',down)});
  el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',()=>{drag=null});
  orb.addEventListener('pointerleave',e=>{if(!drag&&e.pointerType==='mouse')hl(null)});
  orb.addEventListener('click',e=>{if(e.target.closest('.oc')){e.stopPropagation();e.preventDefault()}},true);
  orb.addEventListener('keydown',e=>{const o=e.target.closest('.oc');if(o&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(o)}});
  new MutationObserver(()=>{th=0;picked=false;orb.classList.remove('picked','snap')}).observe(orb,{childList:true});
  /* al volver de la ficha, la foto elegida sigue a color y el resto sin color */
  if(d.orbSel){const o=ocs().find(x=>x.dataset.id===d.orbSel);if(o){o.classList.add('sel');orb.classList.add('picked');picked=true;setTimeout(()=>{picked=false},50)}}
});

/* ===== Volvé a intentar: la flecha gira como cargando hasta volver al reto ===== */
SCR.reintentar={bg:'#34296D',sbg:'#34296D',dark:true,fit:true,html:()=>`<div class="a" style="inset:0">${sparks(16,11)}</div>
  <div class="a rtw medal" style="${box(76.5,224.5,250,255.5)}"><img src="img/d_retry_base.webp" alt=""><img class="rta" src="img/d_retry_arrow.webp" alt="Cargando"></div>
  <h1 class="a" style="${box(39,530,323)};margin:0;font:500 ${U(24)}/1.3 var(--display);color:#fff;text-align:center">Volvé a intentar</h1>
  <p class="a" style="${box(92,586,217)};margin:0;font:300 ${U(12)}/1.6 var(--text);color:#E1DBFF;text-align:center">La carta se gana corrigiendo. Mirá qué tenés que tener en cuenta.</p>`,
  mount(el){sfx('casi');const nx=()=>{clearTimeout(t);if(R)startReto(R.i);go('juego',{replace:true})};const t=setTimeout(nx,2200);el.onclick=nx;return()=>clearTimeout(t)}};

/* ===== Adoptante certificado: el círculo se carga con un destello, y el botón «Adoptante certificado» también ===== */
afterMount7('certificado',el=>{
  const seal=$$('img',el).find(i=>/k45_star/.test(i.src)&&i.classList.contains('rv'));
  if(seal){seal.classList.remove('rv','rv-up');seal.classList.add('cseal');const w=seal.parentNode;
    const f=document.createElement('i');f.className='a cflash';f.style.cssText='inset:-6%';w.appendChild(f);
    const sh=document.createElement('div');sh.className='a cshine';sh.style.cssText=`inset:0;-webkit-mask-image:url(img/k45_star.webp);mask-image:url(img/k45_star.webp);-webkit-mask-size:100% 100%;mask-size:100% 100%`;w.appendChild(sh);
    setTimeout(()=>{if(document.body.contains(sh)){sh.innerHTML='<i></i>';snd('ok')}},2050)}
  const pill=$$('.bigpill',el).find(p=>/ADOPTANTE CERTIFICADO/.test(p.textContent));
  if(pill){pill.classList.add('cpill');const txt=pill.textContent;pill.style.background='#E7D2F3';pill.innerHTML=`<span class="pf"></span><span class="pt">${txt}</span>`;
    const ps=document.createElement('div');ps.className='a cshine';ps.style.cssText='inset:0;border-radius:inherit';pill.appendChild(ps);
    setTimeout(()=>{if(document.body.contains(ps))ps.innerHTML='<i></i>'},3300)}
});

/* ===== Volver al comienzo (para elegir adoptante, invitado o asociación) ===== */
function startOver(){Object.assign(S,{logged:false,guest:false,orgLogged:false,firstHome:false});save();closeSheetA(true);snd('back');go('splash',{root:true})}
function startOverSheet(){snd('sel');openSheet(`<h2 class="sh-t">¿Volver al comienzo?</h2><p class="sh-p">Vas a ver de nuevo la bienvenida y podés elegir cómo entrar: como adoptante, como invitado o como asociación. Tu progreso queda guardado.</p>
  <button class="btn sh-b" id="soGo">Volver al comienzo</button><button class="lnk sh-c" data-cancel>Cancelar</button>`,w=>{$('#soGo',w).onclick=startOver})}
/* la hoja «¿Cómo querés empezar?» suma la entrada de la asociación */
const _cs7=chooseStart;chooseStart=function(){_cs7();const sh=SH;if(!sh)return;const g=$('#csGuest',sh);if(!g)return;
  const a=document.createElement('button');a.className='lnk sh-c';a.id='csOrg';a.textContent='Soy asociación';a.onclick=()=>{closeSheetA(true);Object.assign(S,{firstHome:false,orgMode:'reg'});save();snd('sel');go('asociacion',{root:true})};g.after(a)};
/* cerrar sesión (adoptante y asociación) ofrece también volver al comienzo */
function addStartBtn(){setTimeout(()=>{const sh=SH;if(!sh||$('#soGo2',sh))return;const c=$('[data-cancel]',sh);if(!c)return;const b=document.createElement('button');b.className='lnk sh-c start7';b.id='soGo2';b.textContent='Volver al comienzo';b.onclick=startOver;c.before(b)},0)}
afterMount7('perfil',el=>{const lo=$('#lo',el);if(lo){const f=lo.onclick;lo.onclick=()=>{f&&f();addStartBtn()}}});
afterMount7('orgperfil',el=>{const lo=$('#olo',el);if(lo){const f=lo.onclick;lo.onclick=()=>{f&&f();addStartBtn()}}});
/* invitado: flecha para volver al comienzo */
afterMount7('invitado',el=>{const fr=$('.fr',el)||el;if($('#gst0',fr))return;const b=document.createElement('button');b.className='a ib';b.id='gst0';b.setAttribute('aria-label','Volver al comienzo');b.style.cssText=box(20,76,30,30);b.innerHTML=ic('i_back',17,14,'margin:auto');b.onclick=startOverSheet;fr.appendChild(b)});
/* registro de la asociación: la flecha vuelve al comienzo */
afterMount7('asociacion',el=>{const b=$('[data-go="registro"]',el);if(b&&S.orgMode!=='login'){b.removeAttribute('data-go');b.setAttribute('aria-label','Volver al comienzo');b.onclick=e=>{e.stopPropagation();snd('back');go(S.logged||S.guest?'registro':'splash',{root:true})}}
  /* al crear la cuenta se completa el perfil antes del Inicio */
  const g=$('#ogo',el);if(g&&S.orgMode!=='login'){const f=g.onclick;g.onclick=()=>{f&&f();if(S.orgLogged&&location.hash==='#orgInicio'){ORG().setup=0;save();go('orgPerfilAlta',{root:true})}}}});

/* ===== Alta de la asociación · Completá el perfil (paso 2 de 2) ===== */
SCR.orgPerfilAlta={bg:'#fff',sbg:'#F7F5FF',html:()=>{const o=ORG(),zp=/zona\s*pet/i.test(o.name);return `<div class="fr orgt" style="height:${U(900)}">
  <svg class="a" viewBox="0 0 402 300" preserveAspectRatio="none" style="${box(0,0,402,300)}" aria-hidden="true"><path fill="#F7F5FF" d="M0 0V235C60 228 100 260 140 288C170 304 232 304 262 288C302 260 342 228 402 235V0Z"/></svg>
  <h1 class="a ctr h-disp" style="${box(0,84,402)};margin:0;font-weight:700;font-size:${U(16)}">Completá tu perfil</h1>
  <p class="a ctr p" style="${box(0,110,402)};margin:0;font-size:${U(11.5)};color:${IND}">Paso 2 de 2 · ${esc(o.name)}</p>
  <div class="a" style="${box(141,150,120,120)};border-radius:50%;background:#E9E4FB"></div>${orgLogo(151,160,100)}
  <p class="a ctr p" style="${box(40,328,322)};margin:0;font-size:${U(12.5)};line-height:1.5;color:var(--ink2)">Estos datos los ven los adoptantes en el perfil de la asociación y en cada animal que publiques.</p>
  <input class="a field" id="pu" placeholder="Responsable" aria-label="Responsable" value="${zp?esc(o.user||''):''}" style="${box(38,398,325)}">
  <input class="a field" id="pt" type="tel" placeholder="Teléfono" aria-label="Teléfono" value="${zp?esc(o.tel||''):''}" style="${box(38,468,325)}">
  <input class="a field" id="pc" placeholder="Ciudad" aria-label="Ciudad" value="${esc(o.ciudad||'')}" style="${box(38,538,325)}">
  <input class="a field" id="pe" type="email" placeholder="Email de contacto" aria-label="Email de contacto" value="${esc(o.email||'')}" style="${box(38,608,325)}">
  <p class="a hint" id="ph" style="${box(38,660,325)};margin:0"></p>
  <button class="a btn obtn" id="pgo" style="${box(37,712,327,50)}">Guardar y continuar</button>
  <div class="a ctr" style="${box(0,780,402)}"><button class="lnk" id="pskip">Completar después</button></div></div>`},
  mount(el){const o=ORG(),h=$('#ph',el);$$('.field',el).forEach(i=>i.addEventListener('input',()=>{snd('type');hint6(h,'')}));
    const fin=()=>{o.setup=1;save();go('orgInicio',{root:true});setTimeout(orgNextSteps,700)};
    $('#pgo',el).onclick=()=>{const u=$('#pu',el).value.trim(),t=$('#pt',el).value.trim();if(!u||!t){snd('error');hint6(h,!u?'Escribí el nombre de quien responde las solicitudes.':'Escribí un teléfono de contacto.');return}
      o.user=u;o.tel=t;o.ciudad=$('#pc',el).value.trim()||o.ciudad;o.email=$('#pe',el).value.trim()||o.email;snd('ok');toast('Perfil completo');fin()};
    $('#pskip',el).onclick=()=>{snd('tap');fin()}}};
function orgNextSteps(){if(!/^#orgInicio/.test(location.hash))return;snd('flip');openSheet(`<h2 class="sh-t">¡Tu asociación ya está en KUSKA!</h2><p class="sh-p">El recorrido sigue así: cargá un animal, recibí las postulaciones de adoptantes certificados y aceptá la que mejor encaje.</p>
  <button class="btn sh-b obtn" id="nsC">Cargar mi primer animal</button><button class="lnk sh-c" id="nsS">Ver solicitudes</button><button class="lnk sh-c" data-cancel>Ir al inicio</button>`,
  w=>{$('#nsC',w).onclick=()=>{closeSheetA(true);snd('sel');go('carga?1')};$('#nsS',w).onclick=()=>{closeSheetA(true);snd('tap');go('solicitudes')}})}

/* ===== La barra de navegación nunca tapa el contenido: si lo último de la pantalla queda debajo, se agrega espacio al final ===== */
function clearBar7(){const el=curEl,bar=$('#bar');if(!el||!bar||bar.classList.contains('hide')||!bar.innerHTML.trim())return;
  const fr=$('.fr',el);if(!fr||fr.classList.contains('fit'))return;
  const u=fr.getBoundingClientRect().width/402,top0=fr.getBoundingClientRect().top;let maxB=0;
  fr.querySelectorAll('button,a,input,p,h1,h2,h3,img,label,.tk2,.card,.oc,.sgcard,.hist,.nv,.nt2').forEach(e=>{const r=e.getBoundingClientRect();if(r.width<4||r.height<4)return;maxB=Math.max(maxB,r.bottom-top0)});
  const need=maxB+18*u;if(fr.getBoundingClientRect().height<need)fr.style.height=need+'px'}
/* con barra: la pantalla termina arriba de la barra (nada pasa por debajo) y la barra tiene el fondo de la pantalla */
(function(){const st=document.createElement('style');st.textContent=`
#phone.hasbar .scr{bottom:calc(100cqw / 402 * 104)}
#phone.hasbar .scr.fitbar{overflow:hidden}
#phone.hasbar #bar{background:linear-gradient(to bottom,transparent calc(100cqw / 402 * 30),var(--barbg,#fff) calc(100cqw / 402 * 30))}`;document.head.appendChild(st)})();
function barState7(n){const bar=$('#bar'),on=bar&&!bar.classList.contains('hide')&&bar.innerHTML.trim()!=='';const def=SCR[String(n).split('?')[0]]||{};
  phone.classList.toggle('hasbar',!!on);phone.style.setProperty('--barbg',(bar&&bar.classList.contains('org'))?(def.bg||'#fff'):(def.bg||'#fff'));
  if(curEl&&on&&$('.fr.fit',curEl))curEl.classList.add('fitbar')}
const _render7b=render;render=function(n,d){const r=_render7b(n,d);barState7(n);requestAnimationFrame(()=>requestAnimationFrame(clearBar7));setTimeout(clearBar7,700);return r};

/* Perfil: el círculo que rodea la inicial se carga de a poco hasta completarse, con un degradé leve (sin saltos) */
afterMount7('perfil',el=>{const av=$('.avatar',el);if(!av||$('.avring',av))return;
  const ns='http://www.w3.org/2000/svg',R=69,C=2*Math.PI*R;
  av.insertAdjacentHTML('afterbegin',`<svg class="avring" viewBox="0 0 152 152" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg);pointer-events:none">
    <defs><linearGradient id="avg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E2C6F6"/><stop offset=".55" stop-color="#C9A6F4"/><stop offset="1" stop-color="#A88CF5"/></linearGradient></defs>
    <circle cx="76" cy="76" r="${R}" fill="none" stroke="url(#avg)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg>`);
  const c=$('.avring circle',av);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){c.style.strokeDashoffset=0;return}
  requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.transition='stroke-dashoffset 3.2s cubic-bezier(.45,.05,.35,1) .35s';c.style.strokeDashoffset=0}))});

/* «Comenzar aventura»: misma interacción (tocar), pero el paso al registro es un fundido suave, sin salto lateral */
(function(){const st=document.createElement('style');st.textContent=`
#phone.soft .scr.in{animation:sinsoft .75s .28s cubic-bezier(.33,0,.2,1) both}
#phone.soft .scr.out{animation:soutsoft .3s ease-out both}
@keyframes sinsoft{from{opacity:0;transform:translateY(calc(var(--u) * 8))}to{opacity:1;transform:none}}
@keyframes soutsoft{to{opacity:0}}`;document.head.appendChild(st)})();
afterMount7('intro2',el=>{const b=$('.btn.go',el);if(!b)return;
  b.addEventListener('pointerdown',()=>{const ph=$('#phone');ph.classList.add('soft');setTimeout(()=>ph.classList.remove("soft"),2600)},true)});

/* v30 · «Comenzar aventura»: al tocar (o arrastrar) el círculo de la flecha, se desliza por el botón hasta el otro extremo;
   después botón y flecha desaparecen juntos y pasa a la siguiente pantalla */
afterMount7('intro2',el=>{const b=$('.btn.go',el);if(!b)return;const c=$('.c',b);b.removeAttribute('data-go');b.setAttribute('aria-label','Comenzar aventura');
  let done=false,x0=null,dx=0,moved=false;
  const max=()=>b.clientWidth-c.offsetWidth-2*c.offsetLeft;
  const label=[...b.childNodes].filter(n=>n.nodeType===3);const lab=document.createElement('span');lab.className='glab';label.forEach(n=>lab.appendChild(n));b.appendChild(lab);
  const set=(x,anim)=>{lab.style.transition=anim?'opacity .3s':'none';c.style.transition=anim?'transform .45s cubic-bezier(.5,0,.2,1)':'none';c.style.transform=`translateX(${x}px)`;lab.style.opacity=Math.max(0,1-1.6*x/max())};
  const finish=()=>{if(done)return;done=true;snd('swipe');set(max(),true);
    setTimeout(()=>{b.style.transition='opacity .35s ease,transform .35s ease';b.style.opacity=0;b.style.transform='scale(.96)'},430);
    setTimeout(()=>go('registro'),800)};
  b.addEventListener('pointerdown',e=>{e.stopPropagation();if(done)return;x0=e.clientX;dx=0;moved=false;try{b.setPointerCapture(e.pointerId)}catch(_){}});
  b.addEventListener('pointermove',e=>{if(x0==null||done)return;dx=Math.max(0,Math.min(max(),e.clientX-x0));if(dx>4)moved=true;if(moved)set(dx,false)});
  const up=e=>{e.stopPropagation();if(x0==null||done)return;x0=null;if(!moved||dx>max()*.45)finish();else set(0,true)};
  b.addEventListener('pointerup',up);b.addEventListener('pointercancel',e=>{x0=null;if(!done)set(0,true)});
  b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation()});
  b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();finish()}})});

