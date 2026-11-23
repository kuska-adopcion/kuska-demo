/* ===================== KUSKA · Paso 4: catálogo, ficha, postulación y plan ===================== */
/* Catálogo: las 12 fotos, nombres, edades y distancias de tu pantalla 66.
   El labrador se llama Simba (como en todo el flujo de adopción 54–57 y 13–16). */
const ANI=[
 {id:'simba',n:'Simba',e:'perro',age:'4 años',sex:'Macho',size:'Grande',km:'1 km · Santa Fe',pc:99},
 {id:'mora',n:'Mora',e:'perro',age:'3 años',sex:'Hembra',size:'Mediana',km:'1,6 km · Santa Fe',pc:90},
 {id:'rocco',n:'Rocco',e:'perro',age:'5 meses',sex:'Macho',size:'Mediano',km:'1,6 km · Santa Fe',pc:63},
 {id:'canela',n:'Canela',e:'perro',age:'1 año',sex:'Hembra',size:'Mediana',km:'1 km · Santa Fe',pc:94},
 {id:'freddo',n:'Freddo',e:'perro',age:'2 años',sex:'Macho',size:'Mediano',km:'2 km · Santa Fe',pc:55},
 {id:'porota',n:'Porota',e:'perro',age:'3 años',sex:'Hembra',size:'Mediana',km:'0,3 km · Santa Fe',pc:85},
 {id:'milo',n:'Milo',e:'gato',age:'2 años',sex:'Macho',size:'Peque',km:'1,6 km · Santa Fe',pc:99},
 {id:'cloe',n:'Cloe',e:'gato',age:'2 años',sex:'Hembra',size:'Peque',km:'1,6 km · Santa Fe',pc:90},
 {id:'batata',n:'Batata',e:'gato',age:'6 meses',sex:'Hembra',size:'Peque',km:'0,6 km · Santa Fe',pc:96},
 {id:'simon',n:'Simón',e:'gato',age:'3 años',sex:'Macho',size:'Peque',km:'1 km · Santa Fe',pc:63},
 {id:'rosa',n:'Rosa',e:'gato',age:'3 años',sex:'Hembra',size:'Peque',km:'0,6 km · Santa Fe',pc:85},
 {id:'oliver',n:'Oliver',e:'gato',age:'9 meses',sex:'Macho',size:'Peque',km:'1 km · Santa Fe',pc:55}];
const AN=id=>ANI.find(a=>a.id===id)||ANI[0];
const HIST={simba:`fue rescatado junto a su mamá en Alto Verde, donde hay muchas camadas. La <b>asociación lo acompañó en sus primeros cuidados</b> y hoy espera encontrar un hogar donde seguir creciendo seguro.`};
const histOf=a=>`${a.n} ${HIST[a.id]||`llegó a la asociación ${a.e==='gato'?'después de vivir en la calle':'después de un rescate en Santa Fe'}. La <b>asociación ${a.sex==='Hembra'?'la':'lo'} acompañó en sus primeros cuidados</b> y hoy espera un hogar donde seguir creciendo ${a.sex==='Hembra'?'segura':'seguro'}.`}`;
const CUID={perro:'Paseos cortos, juegos y mucho afecto.',gato:'Un rincón tranquilo, rascador, juegos cortos y mucho afecto.'};
const SALUD=[['Vacuna múltiple','Al día'],['Castración','Realizada'],['Desparasitación','Realizada'],['Control veterinario','Reciente']];

/* estado del paso 4 */
const AD=()=>S.ad||(S.ad={saved:[],apps:{},adopted:null,tasks:[true,true,false,false,false,false],plan:{},seen:{}});
const isSaved=id=>AD().saved.includes(id);
function toggleSave(id,el){const a=AD();const on=!isSaved(id);a.saved=on?[...a.saved,id]:a.saved.filter(x=>x!==id);S.guardados=a.saved.length;save();snd(on?'pop':'tap');if(el){el.classList.toggle('on',on);react(el,'hop')}toast(on?`${AN(id).n} se guardó en Guardados`:`${AN(id).n} salió de Guardados`)}
const certOK=()=>!!(S.g&&S.g.done&&Math.round(S.g.res.reduce((s,x)=>s+x.pts,0)/12*100)>=80);
const prepPct=()=>S.g?Math.min(90,Math.round(S.g.res.reduce((s,x)=>s+x.pts,0)/12*100)):0;
const retosFaltan=()=>Math.max(0,12-((S.g&&S.g.prog)||0));
/* compatibilidad orientativa: parte de la ficha y se ajusta con tus respuestas del registro */
function compat(a){let p=a.pc;if(S.hogar===0&&a.size==='Grande')p-=6;if(S.rutina===1&&a.e==='perro')p-=4;if(S.salud===1)p-=5;return Math.max(40,Math.min(99,p))}

const ANH=(t,back=true)=>`${back?`<button class="a ib" data-go="back" aria-label="Volver" style="${box(20,76,30,30)}">${ic('i_back',17,14,'margin:auto')}</button>`:''}
  <h1 class="a ctr h-disp" style="${box(0,80,402)};margin:0;font-weight:700;font-size:${U(16)};color:var(--ink2);pointer-events:none">${t}</h1>
  <button class="a bell" data-go="notificaciones" aria-label="Notificaciones" style="${box(357,78,24,26)}">${ic('i_bell',19,21.5)}</button><i class="a bdot" style="${box(372,80,8,8)}"></i>`;
const tags=(a,cls='')=>`<span class="tg ${cls}">${a.age}</span><span class="tg ${cls}">${a.sex}</span><span class="tg ${cls}">${a.size}</span>`;
const kTip=(y,txt,k='k_talk',id='')=>`<div class="a ktip" ${id?`id="${id}"`:''} style="${box(0,y,402,95)}">
  <button class="a x" data-x aria-label="Cerrar" style="${box(20,0,15,15)}"><svg width="55%" height="55%" viewBox="0 0 10 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg></button>
  ${img(k,k==='k_talk'?34:18,k==='k_talk'?1.5:2,k==='k_talk'?78:85.5,k==='k_talk'?86.5:106,'kuska','Kuska')}
  <div class="a bubble tail" style="${box(k==='k_talk'?117:112,k==='k_talk'?24:30,k==='k_talk'?265:268,k==='k_talk'?49:72)}"><span>${txt}</span></div></div>`;
function tipClose(el){$$('.ktip [data-x]',el).forEach(b=>b.onclick=e=>{e.stopPropagation();const t=b.closest('.ktip');t.classList.add('gone');snd('tap')});$$('.ktip .kuska',el).forEach(k=>k.onclick=()=>{snd('pop');react(k,'wiggle')})}

/* tarjeta de animal (pantallas 13, 17, 53, 64) */
const card=(a,x,y,extra='')=>`<div class="a acard" data-id="${a.id}" role="button" tabindex="0" aria-label="${a.n}, ${a.age}, ${compat(a)}% de compatibilidad" style="${box(x,y,172,232)}">
  <div class="ph"><img src="img/an/${a.id}.webp" alt=""><button class="hrt ${isSaved(a.id)?'on':''}" data-save="${a.id}" aria-label="Guardar a ${a.n}"><svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7.3 4.2 4.2 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/></svg></button><b class="pc">${compat(a)}%</b>${extra}</div>
  <div class="nm">${a.n}</div><div class="tgs">${tags(a)}</div></div>`;
function cardEvents(el,onOpen){$$('.acard',el).forEach(c=>{c.onclick=e=>{const s=e.target.closest('[data-save]');if(s){e.stopPropagation();toggleSave(s.dataset.save,s);return}snd('tap');onOpen(c.dataset.id)};c.onkeydown=e=>{if(e.key==='Enter')onOpen(c.dataset.id)}})}

/* hoja inferior sobre la pantalla (57, 58, 65) y modal (09) */
let SH=null;
function openSheet(html,onMount){closeSheetA(true);const w=document.createElement('div');w.className='ash';w.innerHTML=`<div class="ash-dim"></div><div class="ash-box" role="dialog" aria-modal="true"><i class="grab"></i>${html}</div>`;
  phone.appendChild(w);SH=w;requestAnimationFrame(()=>w.classList.add('on'));w.querySelector('.ash-dim').onclick=()=>closeSheetA();$$('[data-cancel]',w).forEach(b=>b.onclick=()=>{snd('back');closeSheetA()});if(onMount)onMount(w);snd('card')}
function closeSheetA(now){const w=SH;if(!w)return;SH=null;if(now){w.remove();return}w.classList.remove('on');setTimeout(()=>w.remove(),350)}
function openModal(html,onMount){closeSheetA(true);const w=document.createElement('div');w.className='ash modal';w.innerHTML=`<div class="ash-dim"></div><div class="amod" role="dialog" aria-modal="true">${html}</div>`;
  phone.appendChild(w);SH=w;requestAnimationFrame(()=>w.classList.add('on'));w.querySelector('.ash-dim').onclick=()=>closeSheetA();$$('[data-cancel]',w).forEach(b=>b.onclick=()=>{snd('back');closeSheetA()});if(onMount)onMount(w);snd('flip')}

/* «Quiero adoptar»: 57 si estás certificado, 58 si te faltan retos */
function quieroAdoptar(id){const a=AN(id);
  if(AD().apps[id]){go('proceso');S.ad.cur=id;save();return}
  if(!certOK()){openSheet(`<img class="shl" src="img/lock_sheet.webp" alt="">
      <h2 class="sh-t" style="margin-top:${U(12)}">Tus amigos te esperan…</h2>
      <p class="sh-p">Completá la Demo de situaciones para conocerlos y postularte. ${S.g&&S.g.done?`Llegaste a ${prepPct()} %: con 80 % o más desbloqueás la postulación.`:`Te faltan ${retosFaltan()} ${retosFaltan()===1?'reto':'retos'}.`}</p>
      <button class="btn sh-b" id="shGo">${S.g&&S.g.done?'Repetir la Demo':'Ir a la Demo'}</button><button class="lnk sh-c" data-cancel>Cancelar</button>`,
      w=>{$('#shGo',w).onclick=()=>{closeSheetA(true);snd('sel');go('demo')}});return}
  openSheet(`<h2 class="sh-t">¿Querés postularte para<br>adoptar a ${a.n}?</h2>
    <p class="sh-p">Zona Pet recibe tu perfil, tu hogar y tu resultado (${prepPct()} %).<br>Te avisarán cuando haya novedades.</p>
    <button class="btn sh-b" id="shGo">Enviar solicitud</button><button class="lnk sh-c" data-cancel>Cancelar</button>`,
    w=>{$('#shGo',w).onclick=()=>{const d=AD();d.apps[id]={st:1,t:Date.now()};d.cur=id;save();closeSheetA(true);snd('login');go('proceso')}})}

/* ---------- 63 / 64 · Animales en adopción (órbita o lista; 52 / 53 sin certificar) ---------- */
const ORB=[[128,500],[277,497],[77,640],[320,640],[200,730]];
SCR.catalogo={bg:'#F7F5FF',sbg:'#F7F5FF',html:()=>{const d=AD(),esp=d.esp||'gato',view=d.view||'orb',list=ANI.filter(a=>a.e===esp),orb=view==='orb';
  const top=orb?0:-99,rows=Math.ceil(list.length/2),H=orb?844:Math.max(844,323+rows*254+30);
  return `<div class="fr" style="height:${U(H)}">${ANH('Animales en adopción')}
  <h2 class="a h-disp" style="${box(19,140,300)};margin:0;font-weight:500;font-size:${U(26)};line-height:${U(30)};color:var(--ink2)">¿Listo para cambiar<br>una vida?</h2>
  ${orb&&!d.tipC?kTip(214,'Elegí una categoría y descubrí compañeros que buscan un hogar.','k_talk','ctip'):''}
  <div class="a" style="${box(0,346+top,402,42)}">
    <button class="a pill2 ${esp==='gato'?'on':''}" data-esp="gato" style="${box(19,0,110,40)}">Gatos</button>
    <button class="a pill2 ${esp==='perro'?'on':''}" data-esp="perro" style="${box(145,0,110,40)}">Perros</button>
    <button class="a vbtn ${orb?'on':''}" data-view="orb" aria-label="Vista en órbita" style="${box(286,-1,42,42)}">${ic('i_grid',21.5,21.5)}</button>
    <button class="a vbtn ${orb?'':'on'}" data-view="list" aria-label="Vista en lista" style="${box(339,-1,42,42)}">${ic('i_list',21,19)}</button></div>
  ${orb?`<svg class="a orbbg" viewBox="0 0 402 844" style="${box(0,0,402,844)}" aria-hidden="true"><g fill="#ECE8FD">${ORB.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="66"/>`).join('')}<circle cx="200" cy="607" r="112"/></g></svg>
    <div id="orb">${orbHTML(list)}</div>
    <button class="a refresh" id="rf" aria-label="Ver otros animales" style="${box(155,562,90,90)}">${ic('i_refresh',31,33)}</button>`
  :`<div id="grid">${list.map((a,i)=>card(a,i%2?211:20,323+Math.floor(i/2)*254)).join('')}</div>`}
  </div>`},
  mount(el){const d=AD();tipClose(el);const tp=$('#ctip',el);if(tp)$('[data-x]',tp).addEventListener('click',()=>{d.tipC=true;save()});
    $$('[data-esp]',el).forEach(b=>b.onclick=()=>{if(d.esp===b.dataset.esp)return;d.esp=b.dataset.esp;d.off=0;save();snd('toggle');rerender()});
    $$('[data-view]',el).forEach(b=>b.onclick=()=>{if((d.view||'orb')===b.dataset.view)return;d.view=b.dataset.view;save();snd('swipe');rerender()});
    const open=id=>{snd('tap');go('ficha?'+id)};
    $$('#orb .oc',el).forEach(o=>o.onclick=()=>open(o.dataset.id));
    const rf=$('#rf',el);if(rf)rf.onclick=()=>{d.off=(d.off||0)+1;save();snd('swipe');rf.classList.remove('spin');void rf.offsetWidth;rf.classList.add('spin');const o=$('#orb',el);o.classList.add('swap');
      setTimeout(()=>{o.innerHTML=orbHTML(ANI.filter(a=>a.e===(d.esp||'gato')));o.classList.remove('swap');$$('#orb .oc',el).forEach(x=>x.onclick=()=>open(x.dataset.id))},260)};
    cardEvents(el,open);
    if(!certOK()&&!d.seenLock){d.seenLock=true;save();setTimeout(()=>toast('Podés mirar a todos. Para postularte, completá la Demo con 80 % o más'),700)}
  }};
function orbHTML(list){const d=AD(),off=(d.off||0)%list.length;const pick=ORB.map((_,i)=>list[(i+off)%list.length]);
  return pick.map((a,i)=>`<button class="a oc" data-id="${a.id}" aria-label="${a.n}, ${compat(a)}%" style="${box(ORB[i][0]-53,ORB[i][1]-53,106,106)};animation-delay:${i*70}ms"><img src="img/an/${a.id}.webp" alt=""><b>${compat(a)}%</b></button>`).join('')}
function rerender(){const n=(location.hash.slice(1)||'splash');render(n,0)}

/* ---------- 54 / 55 / 56 · Ficha del animal ---------- */
const FT={perfil:0,cuidados:1,salud:2};
SCR.ficha={bg:'#fff',sbg:'#F7F5FF',html:()=>{const id=(location.hash.split('?')[1]||'simba'),a=AN(id),d=AD(),tab=d.ftab||'perfil',p=compat(a);
  const body={perfil:`<h3 class="a fh" style="${box(20,750)}">Sobre su historia</h3>
      <p class="a fp" style="${box(20,792,340)}">${histOf(a)}</p>
      <div class="a org" style="${box(20,926,362,118)}"><img src="img/zonapet.webp" alt="Zona Pet" style="${box(15,23,38,38)};position:absolute;border-radius:50%"><b style="${box(78,24)};position:absolute">zonapetsf</b><span style="${box(78,42)};position:absolute">Zona Pet - Animales en adopción Santa Fe</span><button class="lnk vp" data-go="org" style="${box(268,78)};position:absolute">Ver perfil</button></div>`,
    cuidados:`<h3 class="a fh" style="${box(20,750)}">Necesidades y cuidados</h3><p class="a fp" style="${box(20,797,340)}">${CUID[a.e]}</p>
      <h3 class="a fh" style="${box(23,878)}">Convivencia en tu hogar</h3>
      <div class="a conv" style="${box(20,923,362,315)}"><span class="cv-n" style="${box(21,30)}">${p}%</span><div class="cv-bar" style="${box(21,55,318,6)}"><i style="width:${p}%"></i><s style="left:${p}%"></s></div>
        ${convRows(a).map((r,i)=>`<div class="cv-r" style="${box(21,102+i*67,320,44)}"><img src="img/${r[0]}.webp" alt=""><span>${r[1]}</span>${i<2?'':''}</div>`).join('')}</div>`,
    salud:`<h3 class="a fh" style="${box(20,750)}">Ficha sanitaria</h3>${SALUD.map((s,i)=>`<div class="a sr" style="${box(24,805+i*67,358,44)}"><img src="img/s56_heart.webp" alt=""><span>${s[0]}</span><b>${s[1]}</b></div>`).join('')}`}[tab];
  const by={perfil:1091,cuidados:1320,salud:1144}[tab],oy=by+97,H=oy+214,others=ANI.filter(x=>x.id!==a.id).sort((x,y)=>(x.e===a.e?0:1)-(y.e===a.e?0:1)).slice(0,6);
  const st=d.apps[a.id];
  return `<div class="fr" style="height:${U(H)}">
  <div class="a" style="${box(0,0,402,215)};background:#F7F5FF"></div><div class="a" style="${box(0,200,402,250)};background:#fff;border-radius:${U(40)} ${U(40)} 0 0"></div>
  ${ANH('Animales en adopción')}
  <div class="a fphoto" style="${box(121,127,160,160)}"><img src="img/an/${a.id}.webp" alt="${a.n}"></div>
  <b class="a pcl" style="${box(316,225,46,20)}">${p}%</b>
  <button class="a hrt big ${isSaved(a.id)?'on':''}" data-save="${a.id}" aria-label="Guardar a ${a.n}" style="${box(60,215,32,32)}"><svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7.3 4.2 4.2 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/></svg></button>
  <h2 class="a ctr h-disp" style="${box(0,293,402)};margin:0;font-weight:600;font-size:${U(26)};color:var(--ink2)">${a.n}</h2>
  <div class="a ftags" style="${box(0,356,402,28)}">${tags(a,'lg')}</div>
  <p class="a p" style="${box(0,405,402)};margin:0;font-size:${U(13)};color:#6B6496;display:flex;justify-content:center;align-items:center;gap:${U(7)}">${ic('i_pin',10.5,13.5,'color:#6B6496;position:static')}${a.km}</p>
  <div class="a" style="${box(0,448,402,264)};background:#F7F5FF;border-radius:0 0 0 ${U(180)} / 0 0 0 ${U(150)}"></div>
  <div class="a" style="${box(240,700,162,90)};background:#F7F5FF"></div>
  ${kTip(472,'Este resultado es orientativo: la asociación confirma la compatibilidad.')}
  <div class="a ftabs" id="ft" style="${box(20,627,362,42)}"><i style="transform:translateX(${U(FT[tab]*121.5)})"></i>${['Perfil','Cuidados','Salud'].map(t=>`<button class="${tab===t.toLowerCase()?'on':''}" data-t="${t.toLowerCase()}">${t}</button>`).join('')}</div>
  <div class="a" style="${box(0,712,402,H-712)};background:#fff;border-radius:0 ${U(75)} 0 0"></div>
  <div class="fbody" id="fb">${body}</div>
  <button class="a btn" id="qa" style="${box(38,by,327,50)}">${st?'Ver mi solicitud':'Quiero adoptar'}</button>
  <div class="a" style="${box(0,oy,402,214)};background:#F7F5FF"></div>
  <h3 class="a h-disp" style="${box(20,oy+27)};margin:0;font-weight:500;font-size:${U(19)};color:var(--ink2)">Otros amigos que buscan hogar</h3>
  <div class="a" style="${box(0,oy+77,402,100)}"><div class="friends">${others.map(o=>`<button data-id="${o.id}" aria-label="${o.n}"><img src="img/an/${o.id}.webp" alt="" style="object-fit:cover"></button>`).join('')}</div></div>
  </div>`},
  mount(el){const id=(location.hash.split('?')[1]||'simba'),d=AD();tipClose(el);
    $$('#ft button',el).forEach(b=>b.onclick=()=>{if((d.ftab||'perfil')===b.dataset.t)return;d.ftab=b.dataset.t;save();snd('toggle');const y=el.scrollTop;rerender();curEl.scrollTop=y});
    $('#qa',el).onclick=()=>{snd('sel');quieroAdoptar(id)};
    $$('[data-save]',el).forEach(b=>b.onclick=()=>toggleSave(b.dataset.save,b));
    $$('.friends button',el).forEach(b=>b.onclick=()=>{snd('tap');d.ftab='perfil';save();go('ficha?'+b.dataset.id)});
    $('.fphoto',el).onclick=e=>react(e.currentTarget,'hop');
    return()=>closeSheetA(true)}};
function convRows(a){return [['s55_house',S.rutina===1&&a.e==='perro'?'Tu disponibilidad es justa: sumá paseos diarios':'Tu disponibilidad alcanza'],
  ['s55_house',S.hogar===0&&a.size==='Grande'?'Departamento: necesita salidas largas':'Tu entorno es el adecuado'],
  ['s55_batt',a.e==='perro'?'Tiene mucha energía para un estilo de vida tranquilo':'Necesita juego diario para no aburrirse']]}

/* ---------- 15 · Mi proceso de adopción (línea de tiempo) ---------- */
const STEPS=[['Solicitud enviada','La asociación recibió tu solicitud.'],['En revisión','Están leyendo tu perfil y tus respuestas.'],['Entrevista','Podrían contactarte para coordinar un encuentro.'],['Adopción aprobada','¡Una nueva historia está por comenzar!']];
const ST_L=['Enviada','En revisión','Entrevista','Aprobada'];
SCR.proceso={bg:'#fff',sbg:'#F7F5FF',bar:0,html:()=>{const d=AD(),id=d.cur||Object.keys(d.apps)[0];
  if(!id)return `<div class="fr fit">${ANH('Mi proceso de adopción')}${img('k12',125.5,215,150.5,186.5,'kuska float','Kuska')}<p class="a ctr h-disp" style="${box(40,440,322)};margin:0;font-weight:600;font-size:${U(17)};color:var(--ink2)">Todavía no te postulaste</p><p class="a ctr p" style="${box(50,480,302)};margin:0;font-size:${U(13.5)};color:#6B6496">Cuando envíes una solicitud, acá vas a ver en qué etapa está.</p><button class="a btn" data-go="catalogo" style="${box(38,560,327,50)}">Explorar animales</button></div>`;
  const a=AN(id),s=d.apps[id].st;
  return `<div class="fr" style="height:${U(1021)}">
  <div class="a" style="${box(0,0,402,345)};background:#F7F5FF;border-radius:0 0 ${U(60)} ${U(60)}"></div><div class="a" style="${box(100,120,202,240)};background:#fff;border-radius:${U(100)} ${U(100)} 0 0"></div>
  ${ANH('Mi proceso de adopción')}
  <div class="a fphoto" style="${box(121,143,160,160)}"><img src="img/an/${a.id}.webp" alt="${a.n}"></div>
  <span class="a stp ${s>=3?'ok':''}" style="${box(297,148,85,26)}">${ST_L[s]}</span>
  <h2 class="a ctr h-disp" style="${box(0,313,402)};margin:0;font-weight:500;font-size:${U(26)};color:var(--ink2)">${a.n}</h2>
  ${kTip(372,s>=3?`<b>¡Adopción aprobada!</b><br>Zona Pet aceptó tu solicitud. ¡Empieza el primer mes con ${a.n}!`:`<b>¡Tu solicitud ya está en camino!</b><br>La asociación está revisando tu perfil.<br>¡Te avisaremos cuando haya novedades!`,'k_hands')}
  <div class="a tl" style="${box(44,556,330,300)}">${STEPS.map((t,i)=>`<div class="tl-r ${i<=s?'on':''} ${i===s?'cur':''}" style="top:${U([0,72,144,234][i])}">${i<=s?ic('i_check',21.5,21.5):'<i class="tl-o"></i>'}<b>${t[0]}</b><span>${t[1]}</span></div>`).join('')}
    ${[0,1,2].map(i=>`<i class="tl-l ${i<s?'on':''}" style="top:${U([26,98,170][i])};height:${U([38,38,56][i])}"></i>`).join('')}</div>
  <div class="a ctr" style="${box(0,880,402)}">${s<3?`<button class="lnk adv" id="adv">Ver cómo sigue (simulación de la demo)</button>`:`<button class="btn" id="seg16" style="width:${U(327)};height:${U(50)}">Ir al seguimiento</button>`}</div>
  </div>`},
  mount(el){const d=AD(),id=d.cur||Object.keys(d.apps)[0];tipClose(el);
    const adv=$('#adv',el);if(adv)adv.onclick=()=>{const ap=d.apps[id];ap.st=Math.min(3,ap.st+1);if(ap.st===3){d.adopted=id;snd('cert')}else snd('ok');save();rerender()};
    const sg=$('#seg16',el);if(sg)sg.onclick=()=>{snd('sel');go('seguimiento')}}};

/* ---------- 13 · Mi plan (en evaluación / adopción confirmada) ---------- */
const planEmpty=SCR.plan;
const planIsEmpty=()=>!Object.keys(AD().apps).length&&(AD().ptab||0)===0;
SCR.plan={bg:'#F7F5FF',sbg:'#F7F5FF',bar:1,get fit(){return planIsEmpty()},html:()=>{const d=AD(),tab=d.ptab||0,ev=Object.keys(d.apps).filter(k=>d.apps[k].st<3),conf=d.adopted?[d.adopted]:[];
  const list=tab===0?ev:conf;
  if(planIsEmpty())return planEmpty.html().replace('Tu plan se arma<br>después de la demo',certOK()?'Sumá animales<br>a tu plan':'Tu plan se arma<br>después de la demo').replace('Cuando termines los 12 retos vas a poder sumar animales y armar un plan de cuidados para cada uno.',certOK()?'Cuando te postules para adoptar, cada animal aparece acá con su plan de cuidados.':'Cuando termines los 12 retos vas a poder sumar animales y armar un plan de cuidados para cada uno.').replace('data-go="demo"',certOK()?'data-go="catalogo"':'data-go="demo"').replace('>Ir a la Demo<',certOK()?'>Explorar animales<':'>Ir a la Demo<');
  return `<div class="fr" style="height:${U(Math.max(874,281+Math.ceil(Math.max(1,list.length)/2)*254+60))}">
  <div class="a" style="${box(0,0,402,240)};background:#F1EEFC;border-radius:0 0 ${U(90)} 0"></div>
  ${ANH('Mi Plan')}
  <div class="a seg" id="seg" style="${box(24,156,345,44)}"><i></i><button class="${tab===0?'on':''}" style="width:${U(172)}">En evaluación</button><button class="${tab===1?'on':''}" style="width:${U(173)}">Adopción confirmada</button></div>
  ${list.length?list.map((id,i)=>card(AN(id),i%2?211:20,281+Math.floor(i/2)*254,`<span class="cst">${ST_L[d.apps[id].st]}</span>`)).join('')
   :`${img('k12',125.5,265.5,150.5,186.5,'kuska float','Kuska')}<h2 class="a ctr h-disp" style="${box(0,484,402)};margin:0;font-weight:600;font-size:${U(17)};line-height:${U(21)};color:var(--ink2)">${tab===0?'Sumá animales a tu plan':'Todavía no hay una adopción confirmada'}</h2>
     <p class="a ctr p" style="${box(50,538,302)};margin:0;font-size:${U(14)};line-height:${U(19.5)};color:#6B6496">${tab===0?'Cuando te postules para adoptar, cada animal aparece acá con su plan de cuidados.':'Cuando la asociación apruebe tu solicitud, vas a ver acá el seguimiento del primer mes.'}</p>
     <button class="a btn" data-go="catalogo" style="${box(38,679,327,50)}">Explorar animales</button>`}
  </div>`},
  mount(el){const d=AD();if(planIsEmpty()){planEmpty.mount(el);const bs=$$('#seg button',el);if(bs[1])bs[1].addEventListener('click',()=>{d.ptab=1;save();setTimeout(rerender,300)});return}
    const seg=$('#seg',el),i=$('i',seg),bs=$$('button',seg);const set=n=>{i.style.width=bs[n].offsetWidth+'px';i.style.transform=`translateX(${bs[n].offsetLeft}px)`};
    requestAnimationFrame(()=>set(d.ptab||0));bs.forEach((b,n)=>b.onclick=()=>{if((d.ptab||0)===n)return;d.ptab=n;save();snd('toggle');set(n);setTimeout(rerender,260)});
    cardEvents(el,id=>go(d.adopted===id?'seguimiento':'planAnimal?'+id))}};

/* ---------- 14 · Plan del animal + 09 · ¡Tu plan está listo! ---------- */
const PEND=[['s56_heart','Vacuna múltiple','Salud'],['s56_heart','Castración','Salud'],['s56_heart','Desparasitación','Salud'],['s55_batt','Rutina de paseo y juegos','Rutina'],['s55_house','Espacio propio en casa','Hogar']];
SCR.planAnimal={bg:'#fff',sbg:'#F7F5FF',html:()=>{const id=location.hash.split('?')[1]||'simba',a=AN(id),d=AD(),pl=d.plan[id]||[],left=PEND.filter((_,i)=>!pl.includes(i));
  const cnt=k=>left.filter(p=>p[2]===k).length;
  return `<div class="fr" style="height:${U(1344)}">
  <div class="a" style="${box(0,0,402,560)};background:#F7F5FF"></div>
  ${ANH(`Plan de ${a.n}`)}
  <div class="a" style="${box(20,203,362,248)};background:#fff;border-radius:${U(8)} ${U(8)} 0 0"></div>
  <div class="a fphoto" style="${box(121,130,160,160)}"><img src="img/an/${a.id}.webp" alt="${a.n}"></div>
  <h2 class="a ctr h-disp" style="${box(0,296,402)};margin:0;font-weight:600;font-size:${U(24)};color:var(--ink2)">${a.n}</h2>
  <div class="a ftags" style="${box(0,346,402,28)}">${tags(a,'lg')}</div>
  <div class="a pband" style="${box(20,391,362,60)}">${['Salud','Hogar','Rutina'].map(k=>`<div><span>${k}</span><b>${cnt(k)}</b></div>`).join('')}</div>
  <div class="a" style="${box(0,460,402,120)};background:#fff;border-radius:0 0 0 ${U(70)}"></div>
  <h3 class="a h-disp" style="${box(67,520)};margin:0;font-weight:500;font-size:${U(17)};color:var(--ink2)">Pendientes</h3>
  <div class="a" style="${box(0,578,402,766)};background:#fff;border-radius:0 ${U(80)} 0 0"></div>
  ${PEND.map((p,i)=>`<button class="a pr ${pl.includes(i)?'done':''}" data-i="${i}" style="${box(20,625+i*67,382,44)}"><img src="img/${p[0]}.webp" alt=""><span>${p[1]}</span><i class="ck"></i></button>`).join('')}
  <button class="a btn" id="eval" style="${box(38,984,327,50)}">Evaluar compatibilidad</button>
  <div class="a ctr" style="${box(0,1052,402)}"><button class="lnk" data-go="catalogo">Seguir explorando</button></div></div>`},
  mount(el){const id=location.hash.split('?')[1]||'simba',d=AD();
    $$('.pr',el).forEach(b=>b.onclick=()=>{const i=+b.dataset.i,pl=d.plan[id]||(d.plan[id]=[]);const on=!pl.includes(i);d.plan[id]=on?[...pl,i]:pl.filter(x=>x!==i);save();snd(on?'ok':'tap');b.classList.toggle('done',on);
      const left=PEND.filter((_,k)=>!d.plan[id].includes(k));$$('.pband b',el).forEach((x,k)=>x.textContent=left.filter(p=>p[2]===['Salud','Hogar','Rutina'][k]).length)});
    $('#eval',el).onclick=()=>{snd('sel');openModal(`<button class="a x" data-cancel aria-label="Cerrar" style="${box(322,40,15,15)}"><svg width="55%" height="55%" viewBox="0 0 10 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg></button>
      <p class="a ctr" style="${box(0,62,362)};margin:0;font:500 ${U(10)}/1 var(--text);letter-spacing:.04em;color:var(--brand)">PLAN PERSONALIZADO</p>
      ${img('k_plan',126,92,109.5,129,'kuska pop-in','Kuska')}
      <h2 class="a ctr h-disp" style="${box(0,262,362)};margin:0;font-weight:600;font-size:${U(19)};color:var(--ink2)">¡Tu plan está listo!</h2>
      <p class="a ctr p" style="${box(0,296,362)};margin:0;font-size:${U(12.5)};color:var(--ink2)">Según su ficha y tu hogar: ${compat(AN(id))} % de compatibilidad.</p>`)};
    return()=>closeSheetA(true)}};

/* ---------- 16 · Seguimiento (primer mes) ---------- */
const TASKS=[['s16_0','Chapita QR con tus datos'],['s16_1','Plan de vacunas agendado'],['s16_2','Alimento adecuado para su edad'],['s16_3','Rutina de paseo y juego'],['s16_4','Fondo para imprevistos'],['s16_5','Espacio propio en casa']];
SCR.seguimiento={bg:'#fff',sbg:'#F7F5FF',bar:1,html:()=>{const d=AD(),tab=d.stab||0,a=AN(d.adopted||d.cur||'simba'),done=d.tasks.filter(Boolean).length;
  const body=tab===0?`<div class="a sgcard" style="${box(20,415,362,128)}"><b style="${box(22,32)};position:absolute">${done} de 6 tareas completadas</b><span style="${box(279,34)};position:absolute">Primer mes</span>
      <div class="cv-bar" style="${box(22,85,318,6)}"><i style="width:${done/6*100}%"></i><s style="left:${done/6*100}%"></s></div></div>
    ${TASKS.map((t,i)=>`<button class="a tk2 ${d.tasks[i]?'done':''}" data-i="${i}" style="${box(21,592+i*67,381,44)}"><img src="img/${t[0]}.webp" alt=""><span>${t[1]}</span><i class="ck"></i></button>`).join('')}`
   :tab===1?`<div class="a hist" style="${box(20,420,362)}">${[['Adopción aprobada',`Zona Pet confirmó la adopción de ${a.n}.`,'Hoy'],['Entrevista','Charla con la asociación y visita al hogar.','Hace 3 días'],['En revisión','La asociación revisó tu perfil y tu resultado.','Hace 6 días'],['Solicitud enviada',`Te postulaste para adoptar a ${a.n}.`,'Hace 8 días']].map(h=>`<div class="hi"><i></i><div><b>${h[0]}</b><span>${h[1]}</span></div><em>${h[2]}</em></div>`).join('')}</div>`
   :`<div class="a hist" style="${box(20,420,362)}">${[['Zona Pet','Jornada de adopción este sábado en Plaza Central, de 10 a 15 h.'],['Zona Pet',`Contanos cómo fue la primera semana de ${a.n}: nos ayuda a acompañarte.`],['Red y comunidad','Buscamos hogares de tránsito para gatitos durante diciembre.']].map(h=>`<div class="nv"><img src="img/zonapet.webp" alt=""><div><b>${h[0]}</b><span>${h[1]}</span></div></div>`).join('')}</div>`;
  return `<div class="fr" style="height:${U(1166)}">
  <div class="a" style="${box(0,0,402,240)};background:#F1EEFC;border-radius:0 0 ${U(90)} 0"></div>
  ${ANH('Seguimiento')}
  <div class="a seg sg3" id="seg" style="${box(20,156,362,42)}"><i></i>${['Seguimiento','Historial','Novedades'].map((t,i)=>`<button class="${tab===i?'on':''}" style="width:${U(i===0?120:121)}">${t}</button>`).join('')}</div>
  ${kTip(258,`<b>¡Vamos por buen camino!</b><br>Cada pequeño paso cuenta para construir una convivencia feliz y responsable con ${a.n}.`,'k_wave')}
  ${body}</div>`},
  mount(el){const d=AD();tipClose(el);const seg=$('#seg',el),i=$('i',seg),bs=$$('button',seg);const set=n=>{i.style.width=bs[n].offsetWidth+'px';i.style.transform=`translateX(${bs[n].offsetLeft}px)`};
    requestAnimationFrame(()=>set(d.stab||0));bs.forEach((b,n)=>b.onclick=()=>{if((d.stab||0)===n)return;d.stab=n;save();snd('toggle');set(n);setTimeout(rerender,250)});
    $$('.tk2',el).forEach(b=>b.onclick=()=>{const k=+b.dataset.i;d.tasks[k]=!d.tasks[k];save();snd(d.tasks[k]?'ok':'tap');b.classList.toggle('done',d.tasks[k]);const n=d.tasks.filter(Boolean).length;
      const c=$('.sgcard',el);$('b',c).textContent=`${n} de 6 tareas completadas`;$('.cv-bar i',c).style.width=n/6*100+'%';$('.cv-bar s',c).style.left=n/6*100+'%';if(n===6)toast('¡Primer mes completo! 🎉')})}};

/* ---------- 17 · Guardados ---------- */
delete SOON.guardado;delete SOON.catalogo;
SCR.guardado={bg:'#F7F5FF',sbg:'#F7F5FF',bar:2,html:()=>{const list=AD().saved.map(AN);
  return `<div class="fr" style="height:${U(Math.max(874,155+Math.ceil(list.length/2)*254+120))}">${ANH('Guardados')}
  ${list.length?list.map((a,i)=>card(a,i%2?211:20,155+Math.floor(i/2)*254)).join('')
   :`${img('k12',125.5,215,150.5,186.5,'kuska float','Kuska')}<p class="a ctr h-disp" style="${box(40,440,322)};margin:0;font-weight:600;font-size:${U(17)};color:var(--ink2)">Todavía no guardaste animales</p>
     <p class="a ctr p" style="${box(50,478,302)};margin:0;font-size:${U(13.5)};line-height:1.45;color:#6B6496">Tocá el corazón de una ficha para guardarla y volver a verla cuando quieras.</p><button class="a btn" data-go="catalogo" style="${box(38,560,327,50)}">Explorar animales</button>`}</div>`},
  mount(el){cardEvents(el,id=>go('ficha?'+id));$$('[data-save]',el).forEach(b=>b.addEventListener('click',()=>setTimeout(rerender,350)))}};

/* notificaciones (49) y perfil de la asociación: se arman en los pasos 5 y 6 */
SCR.notificaciones={bg:'#F7F5FF',sbg:'#F7F5FF',fit:true,html:()=>{const d=AD(),ap=Object.keys(d.apps);
  const items=[...ap.map(id=>[`Tu solicitud por ${AN(id).n}: ${ST_L[d.apps[id].st]}`,d.apps[id].st>=3?'¡Zona Pet aprobó la adopción!':'La asociación está revisando tu perfil.'])];
  return `${ANH('Notificaciones')}<h3 class="a h-disp" style="${box(20,190)};margin:0;font-weight:500;font-size:${U(17)};color:var(--ink2)">Nuevas</h3>
  ${items.length?items.map((t,i)=>`<div class="a nt" style="${box(0,230+i*80,402,74)}"><b>${t[0]}</b><span>${t[1]}</span></div>`).join(''):`<p class="a p" style="${box(20,232,362)};margin:0;font-size:${U(13)};color:#6B6496">No tenés notificaciones nuevas.</p>`}
  <p class="a ctr p" style="${box(30,700,342)};margin:0;font-size:${U(12)};color:#8B84A8">La pantalla completa de notificaciones se arma en el paso 5.</p>`},
  mount(el){const d=AD();$$('.nt',el).forEach((n,i)=>n.onclick=()=>{const id=Object.keys(d.apps)[i];d.cur=id;save();go('proceso')})}};
SCR.org={...SCR.asociacion};

/* enlaces del Inicio y del resultado hacia el catálogo */
(function(){const ih=SCR.inicio.html,im=SCR.inicio.mount;
  SCR.inicio.html=()=>ih().replace(/data-toast="El catálogo se arma en el paso 4"/g,'data-go="catalogo"');
  SCR.inicio.mount=el=>{const r=im(el);
    /* ¿Qué querés hacer? (arquitectura, punto 4): al completar el perfil se elige empezar la Demo o explorar */
    if(S.firstHome&&!S.demoDone){S.firstHome=false;save();setTimeout(()=>{if(curEl!==el)return;openSheet(`<img src="img/k04.webp" alt="Kuska" class="kuska" style="display:block;width:${U(110)};margin:0 auto ${U(10)}">
      <h2 class="sh-t">¿Qué querés hacer, ${esc(S.name||'')}?</h2>
      <p class="sh-p">La <b style="font-weight:600">Demo de situaciones</b> es el requisito para adoptar: 4 semanas y 12 retos cuidando a Kuska. Con 80 % o más te certificás.</p>
      <button class="btn sh-b" id="shDemo">Realizar la Demo</button><button class="lnk sh-c" id="shExp">Explorar la app primero</button>`,
      w=>{$('#shDemo',w).onclick=()=>{closeSheetA(true);snd('sel');go('demo')};$('#shExp',w).onclick=()=>{snd('tap');closeSheetA();toast('Podés empezar la Demo cuando quieras desde el Inicio o el botón central')}})},650)}const fr=$('#fr',el);if(fr)fr.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(S.demoDone){snd('tap');go('catalogo')}else{react($('#lock',el),'shake');snd('error');toast('Se desbloquea al terminar la Demo')}};
    const nb=$('.bell',el);if(nb){nb.removeAttribute('data-toast');nb.dataset.go='notificaciones'}return r}})();
