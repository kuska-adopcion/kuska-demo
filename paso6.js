/* ===================== KUSKA · Paso 6: asociación (67–75), entorno índigo ===================== */
const IND='#333FB1';
const hint6=(h,t)=>{h.textContent=t;h.classList.toggle('on',!!t)};
function ORG(){if(!S.org)S.org={name:'Zona Pet',user:'Virginia Lago',ciudad:'Santa Fe',tel:'+54 342 154 6798',email:'zonapetsf@gmail.com',
  st:{simba:'P',mora:'P',batata:'R',porota:'R',rosa:'B',cloe:'B'},nuevos:[],req:{},news:[
   {t:'Jornada de adopción el sábado',s:'Costanera, de 10 a 13 hs. ¡Vení a conocer a Mora y Simba!',d:'Hace 2 días'},
   {t:'Necesitamos hogares de tránsito',s:'Para cachorros recién rescatados durante 2 o 3 semanas.',d:'Hace 5 días'}]};return S.org}
const ST_O={P:'Publicado',R:'Reservado',B:'Borrador'};
const orgLogo=(x,y,s)=>/zona\s*pet/i.test(ORG().name)?img('zp_big',x,y,s,s,'','Logo de '+esc(ORG().name)):`<div class="a avatar" style="${box(x,y,s,s)}"><span>${esc(ORG().name.charAt(0).toUpperCase())}</span></div>`;
/* el encabezado de la asociación: la campana lleva a Solicitudes */
const OH=(t,back=true)=>ANH(t,back).replace('data-go="notificaciones"','data-go="solicitudes"');

/* ---------- barra de la asociación (UI kit): Inicio · Solicitudes · logo · Novedades · Perfil ---------- */
const OBAR=[['Inicio','ic_inicio',22,22,80.5,'orgInicio'],['Solicitudes','ab_solic',22,15,141,'solicitudes'],['Novedades','ab_nov',19,21,259.75,'orgnov'],['Perfil','ic_perfil',17,22,318,'orgperfil']];
const _dB6=drawBar;
drawBar=function(on){const el=$('#bar');el.classList.toggle('org',!!(on&&typeof on==='object'&&on.o!=null));
  if(!(on&&typeof on==='object'&&on.o!=null))return _dB6(on);
  el.innerHTML=`<div class="nb-pill"></div>${OBAR.map((b,i)=>`<button class="nb-it ${i===on.o?'on':''}" style="left:${cq(b[4])}" data-go="${b[5]}" ${i===on.o?'aria-current="page"':''}><i style="-webkit-mask-image:url(img/${b[1]}.webp);mask-image:url(img/${b[1]}.webp);width:${cq(b[2])};height:${cq(b[3])}"></i><span>${b[0]}</span></button>`).join('')}
    <button class="nb-c" id="nbc" aria-label="Cargar animal"><img src="img/bar_logo_o.webp" alt=""></button><div class="nb-home"></div>`;
  el.classList.remove('hide');$('#nbc').onclick=()=>{snd('sel');go('carga?1')}};

/* ---------- 67 · Registro / ingreso de la asociación ---------- */
delete SOON.asociacion;
SCR.asociacion={bg:'#fff',sbg:'#F7F5FF',fit:true,html:()=>{const lg=S.orgMode==='login';return `<div class="orgt">
  <svg class="a" viewBox="0 0 402 344" preserveAspectRatio="none" style="${box(0,0,402,345)}" aria-hidden="true"><path fill="#F7F5FF" d="M0 0V275C60 268 100 300 140 328C170 344 232 344 262 328C302 300 342 268 402 275V0Z"/></svg>
  <h1 class="a ctr h-disp" style="${box(0,84,402)};margin:0;font-weight:700;font-size:${U(16)}">${lg?'Iniciar sesión':'Crear cuenta'}</h1>
  <p class="a ctr p" style="${box(0,110,402)};margin:0;font-size:${U(11.5)};color:${IND}">Organización</p>
  <img class="a kuska float" id="k67" src="img/k08.webp" alt="Kuska" style="${box(114,149,195.5,196.5)}">
  ${lg?'':`<input class="a field" id="on" placeholder="Nombre de la asociación" aria-label="Nombre de la asociación" value="${esc(S.org?.name||'')}" style="${box(38,388,325)}">
  <input class="a field" id="oc" placeholder="Ciudad" aria-label="Ciudad" value="${esc(S.org?.ciudad||'')}" style="${box(38,458,325)}">`}
  <input class="a field" id="oe" type="email" placeholder="Email" aria-label="Email" value="${esc(S.org?.email||'')}" style="${box(38,lg?388:528,325)}">
  <input class="a field" id="op" type="password" placeholder="Contraseña" aria-label="Contraseña" style="${box(38,lg?468:600,325)};padding-right:${U(40)}">
  <button class="a eye" id="oeye" aria-label="Mostrar contraseña" style="${box(337,lg?466:598,32,28)}">${ic('i_eye',23,19)}</button>
  ${lg?'':`<label class="a ochk" style="${box(108,664,200,24)}"><input type="checkbox" id="ot"><i></i><span>Acepto los <u>Términos de Uso</u></span></label>`}
  <p class="a hint" id="oh" style="${box(38,lg?520:700,325)};margin:0"></p>
  <button class="a btn" id="ogo" style="${box(37,lg?621:784,327,50)}">${lg?'Iniciar sesión':'Crear una cuenta'}</button>
  <div class="a ctr" style="${box(0,lg?688:852,402)}"><button class="lnk" id="omode">${lg?'¿No tenés cuenta? Creá una':'¿Ya tenés una? Iniciá sesión'}</button></div>
  <button class="a ib" data-go="registro" aria-label="Volver al ingreso de adoptantes" style="${box(20,76,30,30)}">${ic('i_back',17,14,'margin:auto')}</button></div>`},
  mount(el){const lg=S.orgMode==='login',pw=$('#op',el),eye=$('#oeye',el),h=$('#oh',el),k=$('#k67',el);
    eye.onclick=()=>{snd('toggle');const v=pw.type==='password';pw.type=v?'text':'password';eye.classList.toggle('on',v)};
    $$('.field',el).forEach(i=>{i.addEventListener('input',()=>{snd('type');hint6(h,'')});i.addEventListener('focus',()=>react(k,'wiggle'))});
    const t=$('#ot',el);if(t)t.onchange=()=>snd(t.checked?'ok':'toggle');
    $('#omode',el).onclick=()=>{snd('swipe');S.orgMode=lg?'reg':'login';save();rerender()};
    $('#ogo',el).onclick=()=>{const o=ORG(),em=$('#oe',el).value.trim();
      if(!lg){const n=$('#on',el).value.trim();if(!n){snd('error');hint6(h,'Escribí el nombre de la asociación.');return}
        if(!t.checked){snd('error');hint6(h,'Para crear la cuenta tenés que aceptar los Términos de Uso.');return}
        o.name=n;o.ciudad=$('#oc',el).value.trim()||o.ciudad}
      if(em)o.email=em;if(!pw.value){snd('error');hint6(h,'Escribí tu contraseña.');return}
      S.orgLogged=true;save();snd('login');go('orgInicio',{root:true})}}};

/* ---------- datos de solicitudes ---------- */
const REQ=[{id:'r1',who:'Juan Pérez',an:'mora',t:'Hace 5 min.',p:90,b:[1,3,2],ph:'ap_photo',tel:'+54 342 154 6798',mail:'juanperez@gmail.com'},
  {id:'r2',who:'Juana Díaz',an:'mora',t:'Hace 5 min.',p:86,b:[1,2],tel:'+54 342 155 2210',mail:'juanadiaz@gmail.com'}];
const SEG=[{an:'batata',who:'Agustina Sanchez'},{an:'porota',who:'Marlene Stricker'}];
function reqList(){const o=ORG(),own=Object.keys((S.ad&&S.ad.apps)||{}).map(id=>({id:'own_'+id,who:S.fullname||S.name||'Adoptante',an:id,t:'Recién',own:true}));
  return [...own,...REQ].map(r=>({...r,st:r.own?S.ad.apps[r.an].st:(o.req[r.id]??0)}))}
const RST=['Nueva','En revisión','Entrevista','Aprobada','No avanzó'];

/* ---------- 68 · Inicio de la asociación ---------- */
SCR.orgInicio={bg:'#F7F8FD',sbg:'#262F85',dark:true,bar:{o:0},html:()=>{const o=ORG(),rl=reqList(),pub=Object.values(o.st).filter(v=>v==='P').length+o.nuevos.filter(n=>n.st==='P').length,ad=rl.filter(r=>r.st===3).length;
  const segs=[...rl.filter(r=>r.st>=1&&r.st<=3).map(r=>({an:r.an,who:r.who,st:r.st})),...SEG.map(s=>({...s,st:1}))].slice(0,4);
  return `<div class="fr orgt" style="height:${U(Math.max(1088,795+Math.ceil(segs.length/2)*262+60))}">
  <svg class="a" viewBox="0 0 402 310" preserveAspectRatio="none" style="${box(0,0,402,310)}" aria-hidden="true"><path fill="#262F85" d="M0 0H402V308C330 296 260 292 201 292S72 296 0 308Z"/></svg>
  <h1 class="a h-disp" style="${box(20,135,362)};margin:0;font-weight:500;font-size:${U(27)};color:#fff">¡Hola! ${esc(o.name)}</h1>
  <div class="a ores" style="${box(21,223,361,193)}">${img('k_org68',20,20,62.5,71.5,'kuska','Kuska')}
    <b style="${box(98,48)};position:absolute">Resumen de tus actividades</b>
    <div class="ores-c" style="${box(0,100,361,76)};position:absolute">${[['Publicados',pub],['Solicitudes',rl.filter(r=>r.st<3).length],['Adopciones',ad]].map(x=>`<div><em>${x[1]}</em><span>${x[0]}</span></div>`).join('')}</div></div>
  <h2 class="a h-disp" style="${box(22,470)};margin:0;font-weight:600;font-size:${U(20)};color:var(--ink2)">¿Qué te gustaría hacer hoy?</h2>
  <button class="a otile" data-go="carga?1" style="${box(20,518,170,150)}"><img src="img/o_cargar.webp" alt=""><span>Cargar animales</span></button>
  <button class="a otile" data-go="solicitudes" style="${box(211,518,170,150)}"><img src="img/o_solic.webp" alt=""><span>Solicitudes pendientes</span>${rl.some(r=>r.st===0)?`<i class="odot"></i>`:''}</button>
  <h2 class="a h-disp" style="${box(20,731)};margin:0;font-weight:600;font-size:${U(20)};color:var(--ink2)">Seguimiento de adopciones</h2>
  <button class="a lnk" data-go="solicitudes" style="${box(321,737)};font:600 ${U(11)}/1 var(--display);color:${IND}">Ver más</button>
  ${segs.map((s,i)=>ocard(s.an,i%2?211:20,779+Math.floor(i/2)*262,RST[s.st],`<small>Solicitada por:</small>${esc(s.who)}`)).join('')}</div>`},
  mount(el){$$('.kuska',el).forEach(k=>k.onclick=()=>{snd('pop');react(k,'wiggle')});$$('.ocard',el).forEach(c=>c.onclick=()=>{snd('tap');go('solicitudes')})}};
function ocard(id,x,y,pill,foot,cls=''){const a=ANO(id)||{};const ph=a.photo||`img/an/${id}.webp`;
  return `<div class="a ocard ${cls}" data-id="${id}" role="button" tabindex="0" style="${box(x,y,171,245)}"><div class="ph"><img src="${ph}" alt="">${pill?`<b class="pc">${pill}</b>`:''}</div><div class="nm">${esc(a.n||'')}</div><div class="ft">${foot}</div></div>`}
/* los animales que carga la asociación también se pueden mostrar */
const ANO=id=>(S.org&&S.org.nuevos||[]).find(x=>x.id===id)||AN(id);

/* ---------- 69 · Perfil de la asociación (y perfil público para el adoptante) ---------- */
function orgPerfil(pub){const o=ORG(),tab=pub?0:(o.ptab||0);
  const list=[...o.nuevos.map(n=>[n.id,n.st]),...Object.entries(o.st)].filter(x=>!pub||x[1]!=='B');
  const datos=[['p_0',o.user],['p_1',o.ciudad],['p_2',o.tel],['p_3',o.email]];const yG=990,H=tab===0?yG+Math.ceil(list.length/2)*254+80:yG+o.news.length*110+200;
  return `<div class="fr orgt" style="height:${U(Math.max(1100,H))}">
  <svg class="a" viewBox="0 0 402 332" preserveAspectRatio="none" style="${box(0,0,402,332)}" aria-hidden="true"><path fill="#F7F5FF" d="M0 0H402V332C330 322 312 290 296 220C282 160 250 118 201 118S120 160 106 220C90 290 72 322 0 332Z"/></svg>
  ${OH(pub?'Asociación':'Perfil')}
  ${pub?'':`<button class="a ib" id="olo" aria-label="Cerrar sesión" style="${box(19,132,40,40)}"><img src="img/p_logout.webp" alt="" style="width:100%"></button>
  <button class="a ib" id="oed" aria-label="Editar" style="${box(341,132,40,40)}"><img src="img/p_edit.webp" alt="" style="width:100%"></button>`}
  <div class="a" style="${box(121,143,160,160)};border-radius:50%;background:#E9E4FB"></div>${orgLogo(133,155,136)}
  <h2 class="a ctr h-disp" style="${box(0,322,402)};margin:0;font-weight:600;font-size:${U(25)};color:${IND}">${esc(o.name)}</h2>
  <h3 class="a h-disp" style="${box(25,448)};margin:0;font-weight:500;font-size:${U(18)};color:var(--ink2)">Datos de contacto</h3>
  ${datos.map((x,i)=>`<div class="a sr" style="${box(20,490+i*62,382,44)}"><img src="img/${x[0]}.webp" alt=""><span>${esc(x[1])}</span></div>`).join('')}
  <div class="a" style="${box(0,760,402,124)};background:#F7F5FF;border-radius:0 0 ${U(110)} ${U(80)}"></div>
  <div class="a seg oseg" id="oseg" style="${box(46,805,310,42)}"><i></i><button class="${tab===0?'on':''}" style="width:${U(168)}">Publicaciones</button><button class="${tab===1?'on':''}" style="width:${U(142)}">Novedades</button></div>
  ${tab===0?list.map(([id,st],i)=>ocard(id,i%2?211:20,yG+Math.floor(i/2)*254,ST_O[st],tags(ANO(id)||{age:'',sex:'',size:''},'o'),'st'+st)).join('')
   :`${o.news.map((n,i)=>`<div class="a nv" style="${box(20,yG-80+i*110,362,96)}"><img src="img/${/zona\s*pet/i.test(o.name)?'zonapet':'n_0'}.webp" alt=""><span><b>${esc(n.t)}</b>${esc(n.s)}<em class="nd">${n.d}</em></span></div>`).join('')}
     ${pub?'':`<button class="a btn" id="onew" style="${box(38,yG-60+o.news.length*110,327,48)}">Publicar novedad</button>`}`}</div>`}
SCR.orgperfil={bg:'#fff',sbg:'#F7F5FF',bar:{o:3},html:()=>orgPerfil(false),
  mount(el){const o=ORG();segInit(el,o.ptab||0,n=>{o.ptab=n;save()});
    $('#olo',el).onclick=()=>{snd('sel');openSheet(`<h2 class="sh-t">¿Cerrar sesión?</h2><p class="sh-p">Tus publicaciones quedan guardadas.</p><button class="btn sh-b obtn" id="shOut">Cerrar sesión</button><button class="lnk sh-c" data-cancel>Cancelar</button>`,w=>{$('#shOut',w).onclick=()=>{closeSheetA(true);S.orgLogged=false;S.orgMode='login';save();go('asociacion',{root:true})}})};
    $('#oed',el).onclick=()=>{snd('sel');openSheet(`<h2 class="sh-t">Datos de contacto</h2>${[['ou','Responsable',o.user],['ot2','Teléfono',o.tel],['om','Email',o.email]].map(f=>`<input class="field shf" id="${f[0]}" placeholder="${f[1]}" aria-label="${f[1]}" value="${esc(f[2])}">`).join('')}<button class="btn sh-b obtn" id="shSv">Guardar cambios</button><button class="lnk sh-c" data-cancel>Cancelar</button>`,w=>{$('#shSv',w).onclick=()=>{o.user=$('#ou',w).value.trim()||o.user;o.tel=$('#ot2',w).value.trim()||o.tel;o.email=$('#om',w).value.trim()||o.email;save();closeSheetA(true);snd('ok');toast('Datos actualizados');rerender()}})};
    $$('.ocard',el).forEach(c=>c.onclick=()=>{snd('tap');pubSheet(c.dataset.id)});
    const nw=$('#onew',el);if(nw)nw.onclick=newsSheet}};
SCR.org={bg:'#fff',sbg:'#F7F5FF',bar:null,html:()=>orgPerfil(true),
  mount(el){$$('.ocard',el).forEach(c=>c.onclick=()=>{snd('tap');go('ficha?'+c.dataset.id)});$('.oseg',el).style.display='none'}};
function segInit(el,cur,on){const seg=$('.seg',el);if(!seg)return;const i=$('i',seg),bs=$$('button',seg);const set=n=>{i.style.width=bs[n].offsetWidth+'px';i.style.transform=`translateX(${bs[n].offsetLeft}px)`};
  requestAnimationFrame(()=>set(cur));bs.forEach((b,n)=>b.onclick=()=>{if(cur===n)return;cur=n;on(n);snd('toggle');set(n);setTimeout(rerender,250)})}
function pubSheet(id){const o=ORG(),a=ANO(id),nu=o.nuevos.find(x=>x.id===id),st=nu?nu.st:o.st[id];const setS=v=>{if(nu)nu.st=v;else o.st[id]=v;save()};
  const opts=st==='B'?[['P','Publicar ahora']]:st==='P'?[['R','Marcar como reservado'],['B','Pasar a borrador']]:[['P','Volver a publicar']];
  openSheet(`<h2 class="sh-t">${esc(a.n)} · ${ST_O[st]}</h2><p class="sh-p">${st==='P'?'Lo ven los adoptantes en el catálogo.':st==='R'?'Tiene un proceso de adopción en curso.':'Solo lo ves vos hasta que lo publiques.'}</p>
   ${opts.map(x=>`<button class="btn2 sh-o osh" data-v="${x[0]}">${x[1]}</button>`).join('')}${nu?'':`<button class="btn2 sh-o osh" data-f>Ver la ficha</button>`}<button class="lnk sh-c" data-cancel>Cancelar</button>`,
   w=>{$$('[data-v]',w).forEach(b=>b.onclick=()=>{setS(b.dataset.v);closeSheetA();snd('ok');toast(`${a.n}: ${ST_O[b.dataset.v].toLowerCase()}`);rerender()});const f=$('[data-f]',w);if(f)f.onclick=()=>{closeSheetA(true);go('ficha?'+id)}})}
function newsSheet(){const o=ORG();snd('sel');openSheet(`<h2 class="sh-t">Nueva novedad</h2><input class="field shf" id="nt" placeholder="Título" aria-label="Título"><textarea class="otxt shf" id="ns" placeholder="Contá la novedad a tu comunidad" aria-label="Texto"></textarea><button class="btn sh-b obtn" id="shP">Publicar</button><button class="lnk sh-c" data-cancel>Cancelar</button>`,
  w=>{$('#shP',w).onclick=()=>{const t=$('#nt',w).value.trim();if(!t){snd('error');$('#nt',w).focus();return}o.news.unshift({t,s:$('#ns',w).value.trim(),d:'Recién'});save();closeSheetA();snd('ok');toast('Novedad publicada');rerender()}})}

/* ---------- Novedades (barra) ---------- */
SCR.orgnov={bg:'#fff',sbg:'#F7F5FF',bar:{o:2},html:()=>{const o=ORG();return `<div class="fr orgt" style="height:${U(Math.max(874,330+o.news.length*110+200))}">
  <div class="a" style="${box(0,0,402,300)};background:#F7F5FF;border-radius:0 0 ${U(70)} ${U(140)} / 0 0 ${U(70)} ${U(110)}"></div>${OH('Novedades')}
  ${kTip(140,'Contale a tu comunidad qué está pasando: jornadas, rescates y pedidos de ayuda.','k_talk')}
  ${o.news.map((n,i)=>`<div class="a nv" style="${box(20,330+i*110,362,96)}"><img src="img/${/zona\s*pet/i.test(o.name)?'zonapet':'n_0'}.webp" alt=""><span><b>${esc(n.t)}</b>${esc(n.s)}<em class="nd">${n.d}</em></span></div>`).join('')}
  <button class="a btn" id="onew" style="${box(38,350+o.news.length*110,327,48)}">Publicar novedad</button></div>`},
  mount(el){tipClose(el);$('#onew',el).onclick=newsSheet}};

/* ---------- 70–73 · Carga animal (4 pasos) ---------- */
const CK=[['k_arms','<b>¡Comencemos!</b><br>Contanos los datos principales del animal para presentarlo en la app.','Información básica'],
  ['k_cam','<b>¡Sumá sus fotos!</b><br>Elegí imágenes claras y recientes para que más personas puedan conocerlo.','Fotos'],
  ['k_botiq','Compartí la información de su estado de salud y los cuidados que necesita.','Cuidados y salud'],
  ['k_perro','Completá algunos detalles más para ayudar a encontrarle un hogar ideal.','Convivencia']];
function DR(){const o=ORG();if(!o.draft)o.draft={esp:'perro',sexo:'',ph:[],vr:0,vm:0,ca:1,tr:1,ne:1,ca1:0,ca2:0};return o.draft}
SCR.carga={bg:'#fff',sbg:'#F7F5FF',bar:null,html:()=>{const p=Math.min(4,Math.max(1,+(location.hash.split('?')[1]||1))),d=DR(),k=CK[p-1];
  const stp=[1,2,3,4].map(n=>`<span class="cs ${n<p?'done':n===p?'cur':''}">${n}</span>`).join('<i class="cl"></i>');
  const tip=`<div class="a ktip" style="${box(0,190,402,140)}"><button class="a x" data-x aria-label="Cerrar" style="${box(20,p===1?4:32,15,15)}"><svg width="55%" height="55%" viewBox="0 0 10 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg></button>
    ${p===1?img('k_arms',19.5,23.5,107.5,117,'kuska','Kuska festejando'):img(k[0],24.5,37.5,87.5,108.5,'kuska','Kuska')}<div class="a bubble tail" style="${box(130,64,252,70)}"><span>${k[1]}</span></div></div>`;
  const tog=(f,y,opts,w=100)=>`<div class="a otg" data-f="${f}" style="${box(20,y,362,30)}">${opts.map((t,i)=>`<button class="${d[f]===i?'on':''}" data-v="${i}" style="width:${U(w)}">${t}</button>`).join('')}</div>`;
  const ln=(id,ph,y,v,extra='')=>`<input class="a field ofl" id="${id}" placeholder="${ph}" aria-label="${ph}" value="${esc(v||'')}" style="${box(20,y,362)}" ${extra}>`;
  let body='',H=1249;
  if(p===1){H=1249;body=`${ln('cn','Nombre del animal',508,d.n)}
    <div class="a otg big" data-f="esp" style="${box(20,586,252,42)}"><button class="${d.esp==='perro'?'on':''}" data-v="perro">Perro</button><button class="${d.esp==='gato'?'on':''}" data-v="gato">Gato</button></div>
    <button class="a osx ${d.sexo==='Hembra'?'on':''}" data-sx="Hembra" aria-label="Hembra" style="${box(286,586,42,42)}">${ic('m_fem',15.5,22.5)}</button>
    <button class="a osx ${d.sexo==='Macho'?'on':''}" data-sx="Macho" aria-label="Macho" style="${box(340,586,42,42)}">${ic('m_mas',19.5,19.5)}</button>
    <select class="a field osel" id="ce" aria-label="Edad estimada" style="${box(20,670,176)}"><option value="">Edad estimada</option>${['Menos de 6 meses','6 a 12 meses','1 a 3 años','3 a 7 años','Más de 7 años'].map(t=>`<option ${d.edad===t?'selected':''}>${t}</option>`).join('')}</select>
    <select class="a field osel" id="ct" aria-label="Tamaño" style="${box(206,670,176)}"><option value="">Tamaño</option>${['Pequeño','Mediano','Grande'].map(t=>`<option ${d.tam===t?'selected':''}>${t}</option>`).join('')}</select>
    ${ln('cu','Ubicación',746,d.ubic)}
    <textarea class="a otxt" id="cp1" placeholder="Describe brevemente su personalidad" aria-label="Personalidad" style="${box(20,824,362,70)}">${esc(d.pers||'')}</textarea>
    <textarea class="a otxt" id="ch" placeholder="Cuentanos sobre su historia" aria-label="Historia" style="${box(20,938,362,114)}">${esc(d.hist||'')}</textarea>
    <p class="a hint" id="chh" style="${box(20,1080,300)};margin:0"></p>`}
  if(p===2){H=1249;body=`<p class="a p" style="${box(21,505)};margin:0;font-size:${U(15)};color:var(--ink2)"><b style="font-weight:600">Foto principal</b> (Portada)</p>
    ${phBox(0,20,545,362,148)}
    <p class="a p" style="${box(20,759)};margin:0;font-size:${U(15)};color:var(--ink2)"><b style="font-weight:600">Fotos adicionales</b> (2-3 recomendadas)</p>
    ${phBox(1,20,798,123,108)}${phBox(2,159,798,123,108)}${d.ph[2]||d.extra?phBox(3,299,798,83,108):`<button class="a ophb plus" id="cpl" style="${box(299,798,83,108)}" aria-label="Agregar otra foto"><img src="img/o_plus.webp" alt=""></button>`}`}
  if(p===3){H=1538;const q=(t,y)=>`<p class="a h-disp" style="${box(20,y)};margin:0;font-weight:600;font-size:${U(15)};color:var(--ink2)">${t}</p>`;
    body=`${q('Vacuna antirrábica',518)}${tog('vr',558,['Al día','Pendiente','Sin realizar'])}${ln('cf1','Última aplicación',610,d.f1,'type="text" onfocus="this.type=\'date\'"')}${ic('i_calf',21.5,22.5,`position:absolute;left:${U(356)};top:${U(612)};color:#C9BDF2;pointer-events:none`)}
    ${q('Vacuna múltiple',704)}${tog('vm',744,['Al día','Pendiente','Sin realizar'])}${ln('cf2','Última aplicación',796,d.f2,'type="text" onfocus="this.type=\'date\'"')}${ic('i_calf',21.5,22.5,`position:absolute;left:${U(356)};top:${U(798)};color:#C9BDF2;pointer-events:none`)}
    ${q('Castración',890)}${tog('ca',938,['Si','No'])}
    ${q('Tratamiento actual',1027)}${tog('tr',1067,['Si','No'])}${ln('ctr','Ej: Antibióticos por 7 días',1120,d.trt)}
    ${q('Necesidades especiales',1213)}${tog('ne',1253,['Si','No'])}${ln('cne','Ej: Dieta especial o medicación diaria',1306,d.nec)}`}
  if(p===4){H=1161;const q=(t,y)=>`<p class="a h-disp" style="${box(20,y)};margin:0;font-weight:600;font-size:${U(15)};color:var(--ink2)">${t}</p>`;
    body=`${q('¿Puede convivir con otros animales?',518)}${tog('ca1',566,['Si','No'])}${q('¿Puede convivir con niños?',655)}${tog('ca2',703,['Si','No'])}
    <textarea class="a otxt" id="cob" placeholder="Escribe observaciones que consideres relevantes.." aria-label="Observaciones" style="${box(6,793,362,114)}">${esc(d.obs||'')}</textarea>
    <button class="a btn" id="cpub" style="${box(38,993,327,50)}">Publicar</button>
    <div class="a ctr" style="${box(0,1066,402)}"><button class="lnk" id="cbor" style="font-family:var(--display);font-weight:500;color:${IND}">Guardar en borrador</button></div>`}
  return `<div class="fr orgt" style="height:${U(H)}">
  <div class="a" style="${box(0,0,402,470)};background:#F7F5FF;border-radius:0 0 ${U(90)} ${U(140)} / 0 0 ${U(70)} ${U(110)}"></div>${OH('Carga animal')}
  <div class="a cstep" style="${box(84,145,234,24)}">${stp}</div>${tip}
  <h2 class="a h-disp" style="${box(67,396)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">${k[2]}</h2>${body}
  ${p<4?`<button class="a onext" id="cnx" aria-label="Siguiente" style="${box(332,p===2?995:H-108,50,50)}"><img src="img/b_next.webp" alt=""></button>`:''}</div>`},
  mount(el){const p=Math.min(4,Math.max(1,+(location.hash.split('?')[1]||1))),d=DR(),o=ORG();tipClose(el);
    $$('.kuska',el).forEach(k=>k.onclick=()=>{snd('pop');react(k,'wiggle')});
    const keep=()=>{const v=id=>{const e=$('#'+id,el);return e?e.value:undefined};
      [['n','cn'],['edad','ce'],['tam','ct'],['ubic','cu'],['pers','cp1'],['hist','ch'],['f1','cf1'],['f2','cf2'],['trt','ctr'],['nec','cne'],['obs','cob']].forEach(([k,id])=>{const x=v(id);if(x!==undefined)d[k]=x.trim()});save()};
    $$('input,textarea,select',el).forEach(i=>{i.addEventListener('input',()=>{snd('type');keep()});i.addEventListener('change',keep)});
    $$('.otg',el).forEach(g=>$$('button',g).forEach(b=>b.onclick=()=>{const f=g.dataset.f;d[f]=f==='esp'?b.dataset.v:+b.dataset.v;save();snd('sel');$$('button',g).forEach(x=>x.classList.toggle('on',x===b))}));
    $$('.osx',el).forEach(b=>b.onclick=()=>{d.sexo=b.dataset.sx;save();snd('sel');$$('.osx',el).forEach(x=>x.classList.toggle('on',x===b))});
    $$('.ophb input',el).forEach(inp=>inp.onchange=()=>{const f=inp.files&&inp.files[0];if(!f)return;shrink(f,u=>{d.ph[+inp.dataset.i]=u;save();snd('pop');rerender()})});
    const pl=$('#cpl',el);if(pl)pl.onclick=()=>{d.extra=true;save();snd('tap');rerender()};
    const nx=$('#cnx',el);if(nx)nx.onclick=()=>{keep();if(p===1&&!d.n){snd('error');hint6($('#chh',el),'Escribí el nombre del animal para seguir.');$('#cn',el).focus();return}snd('slide');go('carga?'+(p+1))};
    const fin=st=>{keep();if(!d.n){snd('error');toast('Falta el nombre del animal (paso 1)');go('carga?1');return}
      const id='n'+Date.now().toString(36);o.nuevos.unshift({id,n:d.n,e:d.esp,age:d.edad||'Edad a confirmar',sex:d.sexo||'Sin dato',size:d.tam||'Sin dato',photo:d.ph[0]||'',st});
      o.draft=null;o.ptab=0;save();snd(st==='P'?'cert':'ok');toast(st==='P'?`¡${d.n} ya está publicado! Lo ven los adoptantes certificados`:`${d.n} quedó guardado en borrador`);go('orgperfil',{root:true})};
    const pb=$('#cpub',el);if(pb){pb.onclick=()=>fin('P');$('#cbor',el).onclick=()=>fin('B')}}};
function phBox(i,x,y,w,h){const d=DR(),u=d.ph[i];return `<label class="a ophb ${u?'has':''}" style="${box(x,y,w,h)}${u?`;background-image:url(${u})`:''}"><input type="file" accept="image/*" data-i="${i}" hidden>${u?'':`${ic('i_cam',20.5,19.5,'color:#9A93B8')}<span>Agregar Foto</span>`}</label>`}
function shrink(file,cb){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,420/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.78))};im.src=r.result};r.readAsDataURL(file)}

/* ---------- 74 · Solicitudes de adopción ---------- */
SCR.solicitudes={bg:'#fff',sbg:'#F7F5FF',bar:{o:1},html:()=>{const rl=reqList(),nu=rl.filter(r=>r.st===0),seg=[...rl.filter(r=>r.st>=1).map(r=>({an:r.an,who:r.who,st:r.st,id:r.id})),...SEG.map(s=>({...s,st:1}))];
  const yS=200+Math.max(1,nu.length)*94+60;
  return `<div class="fr orgt" style="height:${U(Math.max(1058,yS+170+seg.length*120+80))}">
  <div class="a" style="${box(0,0,402,yS+70)};background:#F7F5FF;border-radius:0 0 0 ${U(110)}"></div>${OH('Solicitudes de adopción')}
  <h3 class="a h-disp" style="${box(20,155)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">Nuevas</h3>
  ${nu.length?nu.map((r,i)=>`<button class="a nreq" data-r="${r.id}" style="${box(0,202+i*94,402,94)}"><img src="${ANO(r.an).photo||`img/an/${r.an}.webp`}" alt=""><span><b>Nueva solicitud de adopción</b>${esc(r.who)} quiere adoptar a ${esc(ANO(r.an).n)}<small>${r.t}</small></span><i></i></button>`).join(''):`<p class="a p" style="${box(20,210,362)};margin:0;font-size:${U(13)};color:#6B6496">No hay solicitudes nuevas.</p>`}
  <h3 class="a h-disp" style="${box(67,yS)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">Seguimiento de adopciones</h3>
  ${seg.map((s,i)=>`<button class="a sreq" ${s.id?`data-r="${s.id}"`:''} style="${box(20,yS+108+i*120,362,100)}"><img src="${ANO(s.an).photo||`img/an/${s.an}.webp`}" alt=""><b>${esc(ANO(s.an).n)}</b><em class="${s.st===3?'ok':s.st===4?'no':''}">${RST[s.st]}</em><span>Solicitada por: <i>${esc(s.who)}</i></span></button>`).join('')}</div>`},
  mount(el){$$('[data-r]',el).forEach(b=>b.onclick=()=>{snd('tap');go('postulante?'+b.dataset.r)});$$('.sreq:not([data-r])',el).forEach(b=>b.onclick=()=>{snd('tap');toast('La asociación sigue su propio protocolo de entrevista y contrato')})}};

/* ---------- 75 · Resumen del postulante ---------- */
SCR.postulante={bg:'#fff',sbg:'#F7F5FF',bar:null,html:()=>{const id=location.hash.split('?')[1],r=reqList().find(x=>x.id===id)||reqList().find(x=>!x.own);
  const own=!!r.own,p=own?prepPct():r.p,b=own?badges():r.b,a=ANO(r.an);
  const datos=[['p_0',own?(S.fullname||S.name||'Adoptante'):r.who],['p_1',own?(S.ciudad||'Santa Fe'):'Santa Fe'],['p_2',own?(S.tel||'Sin teléfono'):r.tel],['p_3',own?(S.email||'Sin email'):r.mail]];
  const act=r.st<=1?['Coordinar entrevista','Solicitar más datos']:r.st===2?['Aprobar adopción','No avanzar']:null;
  return `<div class="fr orgt" style="height:${U(1723)}">
  <div class="a" style="${box(0,0,402,120)};background:#F7F5FF"></div>${OH('Solicitudes de adopción')}
  <div class="a" style="${box(0,475,402,110)};background:#F7F5FF;border-radius:${U(110)} 0 0 ${U(0)}"></div>
  <div class="a pcard" style="${box(20,213,362,248)}"></div>
  <div class="a" style="${box(121,142,162,162)};border-radius:50%;background:#E9E4FB"></div>
  ${r.ph?img(r.ph,133,154,138,138,'','Foto de '+esc(r.who)):`<div class="a avatar" style="${box(133,154,138,138)}"><span>${esc(datos[0][1].charAt(0).toUpperCase())}</span></div>`}
  <h2 class="a ctr h-disp" style="${box(0,306,402)};margin:0;font-weight:600;font-size:${U(25)};color:var(--ink2)">${esc(datos[0][1])}</h2>
  <span class="a chipc ${p>=80?'':'off'}" style="${box(121,356,160,26)}">${p>=80?'Adoptante certificado':'En preparación'}</span>
  <img class="a" src="${a.photo||`img/an/${r.an}.webp`}" alt="" style="${box(42,399,34,34)};border-radius:50%;object-fit:cover">
  <p class="a p" style="${box(88,408)};margin:0;font-size:${U(12.5)};color:#8B84A8">Interés por ${esc(a.n)}</p>
  <p class="a p" style="${box(300,416)};margin:0;font-size:${U(9.5)};color:#8B84A8">${r.t}</p>
  <span class="a ostat st${Math.max(1,r.st)}" style="${box(30,228,88,22)}">${RST[Math.max(1,r.st)]}</span>
  <h2 class="a h-disp" style="${box(67,528)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">Resúmen del postulante</h2>
  <h3 class="a h-disp" style="${box(20,630)};margin:0;font-weight:500;font-size:${U(16)};color:var(--ink2)">Datos personales</h3>
  ${datos.map((x,i)=>`<div class="a sr" style="${box(20,672+i*62,382,44)}"><img src="img/${x[0]}.webp" alt=""><span>${esc(x[1])}</span></div>`).join('')}
  <h3 class="a h-disp" style="${box(20,970)};margin:0;font-weight:500;font-size:${U(16)};color:var(--ink2)">Datos de su preparación</h3>
  <div class="a pring" style="${box(34,1020)}">${ring(p,94,false)}</div>
  <p class="a p" style="${box(150,1048,215)};margin:0;font-size:${U(12.5)};line-height:1.45;color:#5644B6"><b style="font-weight:600;color:var(--ink2)">Progreso general</b><br>${p>=80?'Demostró un alto nivel de conocimiento y compromiso.':'Todavía está completando la Demo.'}</p>
  <div class="a" style="${box(20,1148,382,1)};background:#ECE9F6"></div>
  <h3 class="a h-disp" style="${box(20,1176)};margin:0;font-weight:500;font-size:${U(16)};color:var(--ink2)">Insignias obtenidas</h3>
  ${b.length?b.map((w,i)=>{const A=GA[WA[w-1]];return `<img class="a" src="img/${A.ins}.webp" alt="Insignia de ${A.n}" style="${box(20+i*(b.length>3?92:138),1216,88,88)}"><span class="a bigpill" style="${box(22+i*(b.length>3?92:138),1328,84,18)};background:${A.c};font-size:${U(8.5)};box-shadow:none">${A.n.toUpperCase()}</span>`}).join(''):`<p class="a p" style="${box(20,1220,360)};margin:0;font-size:${U(13)};color:#6B6496">Todavía no tiene insignias.</p>`}
  ${act?`<button class="a btn" id="pa" style="${box(38,1425,327,50)}">${act[0]}</button><div class="a ctr" style="${box(0,1500,402)}"><button class="lnk" id="pb" style="font-family:var(--display);font-weight:500;font-size:${U(15)};color:${IND}">${act[1]}</button></div>`
   :`<p class="a ctr p" style="${box(30,1440,342)};margin:0;font-size:${U(13)};line-height:1.6;color:${r.st===3?'#5E8A12':'#6B6496'}">${r.st===3?`¡Adopción aprobada! ${esc(a.n)} ya tiene familia.`:'La solicitud no avanzó. Se le avisó al adoptante y puede seguir explorando.'}</p>`}</div>`},
  mount(el){const id=location.hash.split('?')[1],r=reqList().find(x=>x.id===id)||reqList().find(x=>!x.own),o=ORG(),s=animRing(el);
    const set=st=>{if(r.own){const ap=S.ad.apps[r.an];ap.st=st;if(st===3)S.ad.adopted=r.an}else o.req[r.id]=st;
      if(st===3){if(o.st[r.an])o.st[r.an]='R'}save()};
    if(r.st===0){set(1)}
    const nm=r.own?(S.fullname||S.name||'el adoptante'):r.who.split(' ')[0],a=ANO(r.an);
    const pa=$('#pa',el);if(pa)pa.onclick=()=>{snd('sel');const st=r.st<=1?2:3;
      openSheet(`<h2 class="sh-t">${st===2?`¿Coordinar entrevista con ${esc(nm)}?`:`¿Aprobar la adopción de ${esc(a.n)}?`}</h2><p class="sh-p">${st===2?'Le llega una notificación y lo ve en la línea de tiempo de su solicitud.':'Se cierra el proceso y el adoptante empieza el seguimiento del primer mes.'}</p><button class="btn sh-b obtn" id="shY">${st===2?'Coordinar':'Aprobar'}</button><button class="lnk sh-c" data-cancel>Cancelar</button>`,
        w=>{$('#shY',w).onclick=()=>{set(st);closeSheetA();snd(st===3?'cert':'ok');toast(st===2?`Entrevista coordinada con ${nm}`:`¡${a.n} fue adoptado!`);rerender()}})};
    const pb=$('#pb',el);if(pb)pb.onclick=()=>{if(r.st<=1){snd('tap');toast(`Le pedimos más datos a ${nm}`)}else{snd('sad');if(r.own){delete S.ad.apps[r.an];save();toast('Se le avisó al adoptante: puede seguir explorando');go('solicitudes',{replace:true})}else{set(4);toast('Se le avisó al adoptante');rerender()}}};
    return()=>{s();closeSheetA(true)}}};

/* ninguna hoja vieja queda debajo de una nueva */
const _oS6=openSheet;openSheet=function(h,m){$$('.ash:not(.on)').forEach(x=>x.parentNode&&x.parentNode.removeChild(x));return _oS6(h,m)};

