/* ===================== KUSKA · Paso 5: invitado, Aprender, Red, Calendario, Notificaciones y Perfil ===================== */

/* ---------- barra del invitado (pantalla 66): Inicio · Explorar · Aprender · Red ---------- */
const GBAR=[['Inicio','gb_inicio','invitado'],['Explorar','gb_explorar','catalogo'],['Aprender','gb_aprender','aprender'],['Red','gb_red','red']];
const _drawBar=drawBar;
drawBar=function(on){const el=$('#bar');
  if(S.guest&&on!=null){const gi=typeof on==='object'?on.g:({0:0,1:-1,2:-1,3:-1}[on]??-1);
    el.innerHTML=`<div class="gb-pill">${GBAR.map((b,i)=>`<button class="gb-it ${i===gi?'on':''}" data-gb="${b[2]}" ${i===gi?'aria-current="page"':''}><i style="-webkit-mask-image:url(img/${b[1]}.webp);mask-image:url(img/${b[1]}.webp)"></i><span>${b[0]}</span></button>`).join('')}</div>`;
    el.classList.remove('hide');$$('.gb-it',el).forEach(b=>b.onclick=()=>{snd('toggle');go(b.dataset.gb)});return}
  _drawBar(on&&typeof on==='object'?null:on)};
/* pantallas que muestran la barra del invitado */
const GUEST_BAR={invitado:0,catalogo:1,ficha:1,aprender:2,tema:2,contenido:2,red:3};
const _render=render;
render=function(name,dir){const k=String(name).split('?')[0],def=SCR[k];
  if(def&&S.guest&&GUEST_BAR[k]!=null){const b=def.bar;def.bar={g:GUEST_BAR[k]};_render(name,dir);def.bar=b;return}
  if(def&&!S.guest&&def.bar&&typeof def.bar==='object'&&def.bar.g!=null){const b=def.bar;def.bar=null;_render(name,dir);def.bar=b;return}
  _render(name,dir)};

/* ---------- 62 · Inicio del invitado ---------- */
delete SOON.invitado;
SCR.invitado={bg:'#F7F5FF',sbg:'#F7F5FF',bar:{g:0},html:()=>`<div class="fr" style="height:${U(1088)}">
  <p class="a ctr p" style="${box(0,84,402)};margin:0;font-size:${U(12)};color:var(--brand)">Modo invitado</p>
  ${img('k_hola',20,138,62,64,'kuska','Kuska te saluda')}
  <h1 class="a h-disp" style="${box(94,152)};margin:0;font-weight:500;font-size:${U(27)};color:var(--ink2)">¡Hola!</h1>
  <p class="a p" style="${box(21,224,350)};margin:0;font-size:${U(15)};line-height:${U(25)};color:var(--ink2)">Explorá Kuska, conocé a sus protagonistas y descubrí todo lo que hay detrás de una adopción responsable.</p>
  <div class="a gcard" style="${box(21,350,362,140)}"><p style="${box(20,18,160)};position:absolute;margin:0;font:600 ${U(15.5)}/1.3 var(--display);color:var(--ink2)">¡Tu próxima aventura puede empezar acá!</p>
    <button class="mini" id="gDemo" style="${box(20,98,100,25)};position:absolute">Iniciar Demo</button>${img('h11_kuska',220,4,125.5,129.5,'kuska float','Kuska festejando')}</div>
  <h2 class="a h-disp" style="${box(20,556)};margin:0;font-weight:600;font-size:${U(20)};color:var(--ink2)">¿Por dónde te gustaría empezar?</h2>
  ${[['Explorar','q_explorar',23,22.5,'catalogo'],['Aprender','q_aprender',19,18.5,'aprender'],['Red y<br>Comunidad','q_red',24,20,'red']].map((t,i)=>`<button class="a tile" data-go="${t[4]}" style="${box(20+i*113,609,81,80)};padding-top:${U(t[0].includes('<br>')?13:16)}">${ic(t[1],t[2],t[3])}<span style="margin-top:${U(t[0].includes('<br>')?6:10)}">${t[0]}</span></button>`).join('')}
  <h2 class="a h-disp" style="${box(20,756)};margin:0;font-weight:600;font-size:${U(20)};color:var(--ink2)">Amigos que buscan hogar</h2>
  <div class="a" id="gfr" style="${box(0,808,402,100)}"><div class="friends">${['pet0','pet1','pet2'].map((p,i)=>`<button aria-label="Amigo ${i+1}"><img src="img/${p}.webp" alt=""></button>`).join('')}</div></div>
  <div class="a ctr" style="${box(0,935,402)}"><button class="lnk" id="gReg">Crear mi cuenta para adoptar</button></div></div>`,
  mount(el){$('#gDemo',el).onclick=()=>{snd('sel');guestNeedsAccount('Para hacer la Demo de situaciones necesitás crear tu cuenta.')};
    $('#gReg',el).onclick=()=>{snd('sel');leaveGuest()};$$('#gfr button',el).forEach(b=>b.onclick=()=>{snd('tap');go('catalogo')});
    $$('.kuska',el).forEach(k=>k.onclick=()=>{snd('pop');react(k,'wiggle')})}};
function leaveGuest(){S.guest=false;save();go('registro',{root:true})}
/* 65 · al invitado le pedimos registrarse para adoptar o hacer la demo */
function guestNeedsAccount(txt){openSheet(`<img class="shl" src="img/lock_sheet.webp" alt="">
  <h2 class="sh-t" style="margin-top:${U(12)}">Para adoptar debés registrarte y completar la demo de situaciones</h2>
  <p class="sh-p">${txt||'La Demo te muestra situaciones reales antes de decidir. Con 80 % o más desbloqueás la postulación.'}</p>
  <button class="btn sh-b" id="shReg">Crear mi cuenta</button><button class="lnk sh-c" data-cancel>Seguir mirando</button>`,w=>{$('#shReg',w).onclick=()=>{closeSheetA(true);leaveGuest()}})}
/* el registro (05–07) lleva al modo invitado; las acciones de adoptar piden cuenta */
const _qa=quieroAdoptar;quieroAdoptar=function(id){if(S.guest)return guestNeedsAccount();return _qa(id)};
const _ts=toggleSave;toggleSave=function(id,el){if(S.guest)return guestNeedsAccount('Para guardar animales necesitás tu cuenta.');return _ts(id,el)};
document.addEventListener('click',e=>{const g=e.target.closest('[data-go="invitado"]');if(g){S.guest=true;save()}},true);
/* catálogo del invitado: aviso «Solo visualización» (66) */
(function(){const h=SCR.catalogo.html;SCR.catalogo.html=()=>{if(!S.guest)return h();const d=AD(),t=d.tipC;d.tipC=true;let s=h();d.tipC=t;
  const hd=ANH('Animales en adopción'),i=s.indexOf(hd);if(i<0)return s;
  const orb=s.includes('id="orb"'),off=orb?0:60;
  s=s.replace(/height:calc\(var\(--u\) \* (\d+)\)/,(m,n)=>`height:${U(+n+off)}`);
  let body=s.slice(i+hd.length,s.lastIndexOf('</div>'));if(orb)body=body.replace('top:calc(var(--u) * 140)','top:'+U(212))
  body=body.replace('¿Listo para cambiar<br>una vida?','¡Hola! ¿Listo para<br>cambiar una vida?').replace('font-size:'+U(26),'font-size:'+U(21)).replace('font-weight:500;font-size','font-weight:600;font-size');
  return s.slice(0,i)+`<h1 class="a h-disp" style="${box(20,74)};margin:0;font-weight:600;font-size:${U(26)};color:var(--ink2)">Animales</h1>
  <div class="a gnote" style="${box(20,128,362,62)}">${ic('f_info',16.5,16.5,'color:var(--ink2);flex:none')}<span><b>Solo visualización del catálogo.</b> Creá tu cuenta para hacer la demo y adoptar.</span></div>
  <div class="a" style="${box(0,off,402,10)};overflow:visible">${body}</div></div>`};
  const m=SCR.catalogo.mount;SCR.catalogo.mount=el=>{const d=AD(),t=d.seenLock;if(S.guest)d.seenLock=true;const r=m(el);d.seenLock=t;return r}})();

/* ---------- 59 · Aprender ---------- */
const TEMAS=[
 {k:'ali',n:'Alimentación',ic:'tema_0',bg:'#EBF3D9',dato:'Cada etapa de su vida tiene necesidades nutricionales diferentes.',tip:'Una buena alimentación es clave para su salud y energía diaria.',k2:'k_come',
  c:[{t:'Porciones a medida',s:'Cada etapa come distinto. Los cachorros, más veces al día.',r:0,tx:'Cada etapa viene con necesidades diferentes. Las porciones se ajustan a su peso, edad y nivel de actividad.',tabla:true},
     {t:'Alimentos que intoxican',s:'Chocolate, uvas, pasas, cebolla…',r:1,tx:'Chocolate, uvas, pasas y cebolla, entre otros, intoxican. Los premios se eligen aparte y en poca cantidad.'},
     {t:'Cambiar de alimento sin problemas',s:'Un cambio brusco descompone.',r:2,tx:'Los cambios de alimento se hacen de forma gradual, durante 7 a 10 días, mezclando de a poco el nuevo con el de siempre.'}]},
 {k:'sal',n:'Salud',ic:'tema_1',bg:'#FBE4F4',dato:'La prevención es más simple y más barata que un tratamiento.',tip:'Un plan veterinario temprano lo protege toda la vida.',
  c:[{t:'Plan de vacunación',s:'Vacunas y desparasitación al día.',r:3,tx:'Un plan veterinario temprano previene enfermedades evitables. Vacunas y desparasitación son un gasto recurrente que conviene prever.'},
     {t:'Castración',s:'Se planifica con el veterinario.',r:4,tx:'La castración previene camadas no deseadas y problemas de salud. Se consulta cuándo conviene y se agenda.'},
     {t:'Fondo para imprevistos',s:'Una reserva chica y constante.',r:5,tx:'Guardar entre 10 y 25 % de su gasto mensual arma una reserva para cirugías o urgencias, junto con el control anual.'}]},
 {k:'hig',n:'Higiene',ic:'tema_2',bg:'#E1ECFF',dato:'La constancia enseña; el reto no.',tip:'Rutinas cortas y frecuentes hacen la higiene más fácil para los dos.',
  c:[{t:'Dónde hacer sus necesidades',s:'Rutina de salidas y limpieza enzimática.',r:6,tx:'El reto no enseña; la constancia sí. Llevalo a su lugar después de comer y dormir, y limpiá con producto enzimático para quitar el olor.'},
     {t:'Pelo, baño y uñas',s:'Cepillado frecuente, baño solo si hace falta.',r:7,tx:'El cepillado regular y el baño ocasional con producto adecuado cuidan piel y pelaje. Las uñas se mantienen cortas.'},
     {t:'Higiene dental',s:'Cepillado y control veterinario.',r:8,tx:'El mal aliento es una señal. El cepillado dental periódico y la revisión veterinaria previenen dolor e infecciones.'}]},
 {k:'com',n:'Comportamiento',ic:'tema_3',bg:'#FFEBD3',dato:'Cada conducta comunica algo: se acompaña, no se castiga.',tip:'Paseo, juego y rutina previsible son parte del cuidado.',
  c:[{t:'Morder y redirigir',s:'Juguetes y refuerzo positivo.',r:9,tx:'Morder es exploración. Se redirige ofreciendo juguetes para morder y premiando cuando los usa.'},
     {t:'Energía y juego diario',s:'Una rutina diaria de paseo y juego.',r:10,tx:'La energía acumulada se vuelve conducta problemática. Paseo y juego todos los días, con pausas.'},
     {t:'Quedarse solo',s:'Ausencias cortas que se alargan de a poco.',r:11,tx:'Se prepara a los animales para la soledad: ausencias graduales de 10 a 30 minutos al principio, estímulos y rutina previsible.'}]},
 {k:'faq',n:'Preguntas frecuentes',ic:'tema_4',bg:'#EFEBFC',dato:'Adoptar empieza antes de elegir.',tip:'Si tenés dudas, la asociación también te acompaña.',
  c:[{t:'¿Por qué hacer la Demo?',s:'Es el requisito para adoptar.',tx:'La Demo te muestra 12 situaciones reales durante 4 semanas. Con 80 % o más te certificás y podés postularte.'},
     {t:'¿Qué pasa si no llego al 80 %?',s:'Repasás y repetís la demo.',tx:'Recibís un resultado orientativo con los temas a repasar. Podés repetir la demo las veces que necesites.'},
     {t:'¿Cómo sigue después de postularme?',s:'La asociación evalúa y decide.',tx:'Tu solicitud llega con tu certificación y tu nivel de preparación. La asociación sigue su propio protocolo: revisión, entrevista y, si avanza, la adopción.'}]}];
const TM=k=>TEMAS.find(t=>t.k===k)||TEMAS[0];
SCR.aprender={bg:'#fff',sbg:'#F7F5FF',bar:0,html:()=>`<div class="fr" style="height:${U(1174)}">
  <div class="a" style="${box(0,0,402,370)};background:#F7F5FF;border-radius:0 0 ${U(70)} ${U(140)} / 0 0 ${U(70)} ${U(110)}"></div>
  ${ANH('Aprender')}
  <div class="a ktip" style="${box(0,138,402,120)}"><button class="a x" data-x aria-label="Cerrar" style="${box(20,0,15,15)}"><svg width="55%" height="55%" viewBox="0 0 10 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg></button>
    ${img('k_lentes',28,0,97,117,'kuska','Kuska con anteojos')}<div class="a bubble tail" style="${box(137,34,176,46)}"><span>¡Aprendamos juntos!</span></div></div>
  <h2 class="a h-disp" style="${box(67,310)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">Explorá por temas</h2>
  <p class="a p" style="${box(20,412,330)};margin:0;font-size:${U(15)};line-height:${U(25)};color:var(--ink2)">Contenidos simples para acompañarte en cada etapa de la convivencia.</p>
  ${TEMAS.map((t,i)=>`<button class="a tema" data-k="${t.k}" style="${box(20,493+i*98,362,80)};background:${t.bg}"><img src="img/${t.ic}.webp" alt=""><span><b>${t.n}</b>${t.c.length} contenidos</span>${ic('f_chev',7,11,'color:var(--acc);margin-left:auto;margin-right:'+U(20))}</button>`).join('')}</div>`,
  mount(el){tipClose(el);$$('.tema',el).forEach(b=>b.onclick=()=>{snd('tap');go('tema?'+b.dataset.k)})}};

/* ---------- 60 · Tema ---------- */
SCR.tema={bg:'#fff',sbg:'#F7F5FF',bar:0,html:()=>{const t=TM(location.hash.split('?')[1]);
  return `<div class="fr" style="height:${U(Math.max(939,618+t.c.length*76+180))}">
  <div class="a" style="${box(0,0,402,555)};background:#F7F5FF;border-radius:0 0 ${U(70)} ${U(140)} / 0 0 ${U(70)} ${U(110)}"></div>
  ${ANH(t.n)}
  <div class="a dato" style="${box(20,135,362,108)}"><img src="img/i_dato.webp" alt="" style="${box(14,33,42,42)};position:absolute"><b style="${box(80,22)};position:absolute">Dato clave</b><span style="${box(80,52,250)};position:absolute">${t.dato}</span></div>
  ${kTip(287,t.tip,'k_talk')}${t.k2?`<style>#tk2 .kuska{display:none}</style>`:''}
  ${t.k2?img(t.k2,26,283,104,123,'kuska','Kuska comiendo'):''}
  <h2 class="a h-disp" style="${box(68,484)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">Explorá los contenidos</h2>
  ${t.c.map((c,i)=>`<button class="a cnt" data-i="${i}" style="${box(20,594+i*76,382,64)}"><img src="img/${t.k==='sal'?'c_salud':t.k==='ali'?'c_alim':t.ic}.webp" alt=""><span><b>${c.t}</b>${c.s}</span>${ic('f_chev',7,11,'color:var(--acc);margin-left:auto;margin-right:'+U(48))}</button>`).join('')}</div>`},
  mount(el){const k=location.hash.split('?')[1];tipClose(el);if(TM(k).k2){const t=$('.ktip',el);$('.kuska',t).style.visibility='hidden';const kk=$$('.kuska',el).pop();kk.onclick=()=>{snd('pop');react(kk,'wiggle')};$('[data-x]',t).addEventListener('click',()=>kk.classList.add('gone'))}
    $$('.cnt',el).forEach(b=>b.onclick=()=>{snd('tap');go(`contenido?${TM(k).k}.${b.dataset.i}`)})}};

/* ---------- 61 · Contenido ---------- */
SCR.contenido={bg:'#fff',sbg:'#F7F5FF',bar:0,html:()=>{const [k,ix]=(location.hash.split('?')[1]||'ali.0').split('.'),t=TM(k),c=t.c[+ix]||t.c[0];
  const rel=[...t.c.filter(x=>x!==c).map(x=>[x,t]),...(k==='ali'?[[TM('sal').c[0],TM('sal')]]:[[TEMAS[(TEMAS.indexOf(t)+1)%5].c[0],TEMAS[(TEMAS.indexOf(t)+1)%5]]])];
  const yT=c.tabla?405:300,yD=c.tabla?595:(c.r!=null?420:300),yR=(c.r!=null||c.tabla)?yD+175:yD+40;const wk=c.r!=null?RT[c.r].w:0;
  return `<div class="fr" style="height:${U(yR+230+rel.length*78+130)}">
  <div class="a" style="${box(0,0,402,232)};background:#F7F5FF;border-radius:0 0 0 ${U(110)}"></div>
  ${ANH(t.n)}
  <h2 class="a h-disp" style="${box(67,170,300)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">${c.t}</h2>
  <p class="a p" style="${box(24,280,356)};margin:0;font-size:${U(15)};line-height:${U(25)};color:var(--ink2)">${c.tx}</p>
  ${c.tabla?`<p class="a h-disp" style="${box(24,yT)};margin:0;font-weight:600;font-size:${U(14.5)};color:var(--ink2)">¿Cuántas porciones darles por día?</p>
    <div class="a ptab" style="${box(20,yT+42,362,100)}">${[['Cachorro','3-4 comidas'],['Adulto','2 comidas'],['Senior','1-2 comidas']].map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>`:''}
  ${c.r!=null?`<div class="a demo-c" style="${box(20,yD,362,130)}">${img('k_piensa',16,10,90,112,'kuska','Kuska pensando')}<b style="${box(130,22)};position:absolute">¡Esto ya lo viste en la demo!</b><span style="${box(130,46,210)};position:absolute">Repasalo y ponelo en práctica.<br>Lo aprendiste en la semana ${wk}.</span><button class="mini" id="rep" style="${box(242,92,100,25)};position:absolute">Repasar Demo</button></div>`:''}
  <div class="a" style="${box(0,yR,402,165)};background:#F7F5FF;border-radius:${U(70)} 0 0 ${U(110)}"></div>
  <h2 class="a h-disp" style="${box(67,yR+100)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">Contenidos relacionados</h2>
  ${rel.map(([x,tt],i)=>`<button class="a cnt" data-to="${tt.k}.${tt.c.indexOf(x)}" style="${box(20,yR+220+i*78,382,64)}"><img src="img/${tt.k==='sal'?'c_salud':tt.k==='ali'?'c_alim':tt.ic}.webp" alt=""><span><b>${x.t}</b>${tt.n}</span>${ic('f_chev',7,11,'color:var(--acc);margin-left:auto;margin-right:'+U(28))}</button>`).join('')}</div>`},
  mount(el){const r=$('#rep',el);if(r)r.onclick=()=>{snd('sel');if(S.guest)guestNeedsAccount('Para hacer la Demo de situaciones necesitás crear tu cuenta.');else go('demo')};
    $$('.cnt',el).forEach(b=>b.onclick=()=>{snd('tap');go('contenido?'+b.dataset.to)});$$('.kuska',el).forEach(k=>k.onclick=()=>{snd('pop');react(k,'wiggle')})}};

/* ---------- Red y comunidad (sin pantalla en Figma: armada con los componentes de 54, 59 y 16) ---------- */
const AYUDA=[['s55_house','Transitar','Recibí a un animal en tu casa mientras espera su familia.'],['s16_4','Donar','Alimento, medicamentos o un aporte para tratamientos.'],['s16_3','Voluntariado','Paseos, jornadas de adopción y traslados.'],['n_0','Difusión','Compartí los animales que buscan hogar.']];
SCR.red={bg:'#fff',sbg:'#F7F5FF',bar:0,html:()=>`<div class="fr" style="height:${U(1120)}">
  <div class="a" style="${box(0,0,402,370)};background:#F7F5FF;border-radius:0 0 ${U(70)} ${U(140)} / 0 0 ${U(70)} ${U(110)}"></div>
  ${ANH('Red y comunidad')}
  ${kTip(140,'Adoptar es una forma de ayudar. <b>Hay muchas más.</b>','k_talk')}
  <h2 class="a h-disp" style="${box(67,300)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">Asociaciones</h2>
  <div class="a org" style="${box(20,400,362,118)}"><img src="img/zonapet.webp" alt="Zona Pet" style="${box(15,23,38,38)};position:absolute;border-radius:50%"><b style="${box(78,24)};position:absolute">zonapetsf</b><span style="${box(78,42)};position:absolute">Zona Pet - Animales en adopción Santa Fe</span><button class="lnk vp" data-go="org" style="${box(268,78)};position:absolute">Ver perfil</button></div>
  <h2 class="a h-disp" style="${box(20,570)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">Otras formas de ayudar</h2>
  ${AYUDA.map((a,i)=>`<button class="a cnt" data-a="${i}" style="${box(20,620+i*78,382,64)}"><img src="img/${a[0]}.webp" alt=""><span><b>${a[1]}</b>${a[2]}</span>${ic('f_chev',7,11,'color:var(--acc);margin-left:auto;margin-right:'+U(28))}</button>`).join('')}</div>`,
  mount(el){tipClose(el);$$('[data-a]',el).forEach(b=>b.onclick=()=>{snd('tap');const a=AYUDA[+b.dataset.a];openSheet(`<h2 class="sh-t">${a[1]}</h2><p class="sh-p">${a[2]} Zona Pet te cuenta cómo sumarte y qué necesita esta semana.</p><button class="btn sh-b" id="shOk">Quiero sumarme</button><button class="lnk sh-c" data-cancel>Ahora no</button>`,w=>{$('#shOk',w).onclick=()=>{closeSheetA();snd('ok');toast('¡Gracias! Zona Pet se va a contactar con vos')}})})}};

/* ---------- 19 / 20 · Calendario (Hoy / Calendario) ---------- */
const MES=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const EVT=[[3,'Jornada de adopción','Costanera - 10 a 13 hs.'],[6,'Charla “Los primeros días en casa”','Meet - 19 hs'],[9,'Recordatorio: desparasitación',''],[13,'Feria de Rescatistas','Plaza central']];
function calPet(){const d=AD();return AN(d.adopted||d.cur||d.saved[0]||'simba').n}
SCR.calendario={bg:'#fff',sbg:'#F7F5FF',bar:0,html:()=>{const d=AD(),tab=d.ctab||0,now=new Date(),y=now.getFullYear(),m=now.getMonth(),td=now.getDate(),pet=calPet();
  const dow=(now.getDay()+6)%7,mon=new Date(y,m,td-dow);const week=[...Array(7)].map((_,i)=>new Date(mon.getFullYear(),mon.getMonth(),mon.getDate()+i));
  const ev=EVT.map(e=>[new Date(y,m,td+e[0]),e[1],e[2]]);const tk=d.ctasks||[true,true,false,false];
  const TK=[['cal_0',`Consultar vacunas de ${pet}`],['cal_1',`Llevar a ${pet} al veterinario`],['cal_2','Leer “Porciones a medida”'],['cal_3','Paseo y juegos por 30 min.']];
  const head=`<div class="a" style="${box(0,0,402,tab?250:420)};background:#F7F5FF;border-radius:0 0 ${U(90)} 0"></div>${ANH('Calendario')}
    <div class="a seg" id="seg" style="${box(52,151,300,42)}"><i></i><button class="${tab===0?'on':''}" style="width:${U(150)}">Hoy</button><button class="${tab===1?'on':''}" style="width:${U(150)}">Calendario</button></div>`;
  const dnames=['Lun','Mar','Mie','Jue','Vie','Sab','Dom'];
  if(tab===0)return `<div class="fr" style="height:${U(1174)}">${head}
    ${kTip(240,'<b>¡Un día a la vez!</b><br>Cada pequeño cuidado ayuda a construir una gran convivencia.','k_hands')}
    <div class="a" style="${box(0,400,402,355)};background:#F1EEFC;border-radius:${U(90)} ${U(70)} ${U(80)} ${U(110)}"></div>
    <button class="a cplus" id="cp" aria-label="Agregar recordatorio" style="${box(34,462,42,42)}"><img src="img/c_plus.webp" alt=""></button>
    <p class="a ctr h-disp" style="${box(0,517,402)};margin:0;font-weight:600;font-size:${U(15)};color:var(--ink2)">${MES[mon.getMonth()]}<br><small style="font:400 ${U(9.5)}/1 var(--text);color:#8B84A8">${y}</small></p>
    <div class="a wk" style="${box(24,590,354,62)}">${week.map((w,i)=>`<div class="${w.getDate()===td&&w.getMonth()===m?'on':''}"><span>${dnames[i]}</span><b>${w.getDate()}</b></div>`).join('')}</div>
    <h2 class="a h-disp" style="${box(67,700)};margin:0;font-weight:600;font-size:${U(17)};color:var(--ink2)">Tu día con ${pet}</h2>
    ${TK.map((t,i)=>`<button class="a tk2 ${tk[i]?'done':''}" data-i="${i}" style="${box(20,812+i*67,382,44)}"><img src="img/${t[0]}.webp" alt=""><span>${t[1]}</span><i class="ck"></i></button>`).join('')}</div>`;
  const co=d.coff||0,vm=new Date(y,m+co,1),Y=vm.getFullYear(),M=vm.getMonth(),off=(vm.getDay()+6)%7,days=new Date(Y,M+1,0).getDate(),rows=Math.ceil((off+days)/7);
  const cells=[...Array(rows*7)].map((_,i)=>new Date(Y,M,i-off+1));const same=(a,b)=>a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
  const gT=405,yA=gT+34+rows*44+40,yL=yA+105,arr=(dir,x)=>`<button class="a carr" data-m="${dir}" aria-label="${dir<0?'Mes anterior':'Mes siguiente'}" style="${box(x,350,20,20)}"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="9"/><path d="${dir<0?'M11.5 6.5 8 10l3.5 3.5':'M8.5 6.5 12 10l-3.5 3.5'}"/></svg></button>`;
  return `<div class="fr" style="height:${U(Math.max(1213,yL+ev.length*77+140))}">${head}
    <div class="a" style="${box(0,240,402,yA+60-240)};background:#F1EEFC;border-radius:${U(90)} ${U(70)} ${U(80)} ${U(110)}"></div>
    <button class="a cplus" id="cp" aria-label="Agregar recordatorio" style="${box(34,267,42,42)}"><img src="img/c_plus.webp" alt=""></button>
    ${arr(-1,24)}${arr(1,358)}
    <p class="a ctr h-disp" style="${box(0,343,402)};margin:0;font-weight:600;font-size:${U(16)};color:var(--ink2)">${MES[M]}<br><small style="font:400 ${U(9.5)}/1 var(--text);color:#8B84A8">${Y}</small></p>
    <div class="a mgrid" style="${box(24,gT,354,34+rows*44)}">${dnames.map((n,i)=>`<span class="dn ${co===0&&i===dow?'on':''}">${n}</span>`).join('')}${cells.map(c=>`<b class="${same(c,now)?'on':ev.some(e=>same(e[0],c))?'ev':''} ${c.getMonth()!==M?'out':''}">${c.getDate()}</b>`).join('')}</div>
    <h2 class="a h-disp" style="${box(67,yA)};margin:0;font-weight:600;font-size:${U(17)};color:var(--ink2)">Próximas actividades</h2>
    ${ev.map((e,i)=>`<div class="a act" style="${box(28,yL+i*77,374,62)}"><b>${e[0].getDate()}</b><span><em>${e[1]}</em>${e[2]||(e[0].getMonth()!==m?MES[e[0].getMonth()]:'')}</span></div>`).join('')}</div>`},
  mount(el){const d=AD();tipClose(el);const seg=$('#seg',el),i=$('i',seg),bs=$$('button',seg);const set=n=>{i.style.width=bs[n].offsetWidth+'px';i.style.transform=`translateX(${bs[n].offsetLeft}px)`};
    requestAnimationFrame(()=>set(d.ctab||0));bs.forEach((b,n)=>b.onclick=()=>{if((d.ctab||0)===n)return;d.ctab=n;d.coff=0;save();snd('toggle');set(n);setTimeout(rerender,250)});
    $$('.tk2',el).forEach(b=>b.onclick=()=>{const k=+b.dataset.i;d.ctasks=d.ctasks||[true,true,false,false];d.ctasks[k]=!d.ctasks[k];save();snd(d.ctasks[k]?'ok':'tap');b.classList.toggle('done',d.ctasks[k])});
    $$('.carr',el).forEach(b=>b.onclick=()=>{d.coff=Math.max(-6,Math.min(6,(d.coff||0)+ +b.dataset.m));save();snd('swipe');rerender()});
    $('#cp',el).onclick=()=>{snd('sel');openSheet(`<h2 class="sh-t">Nuevo recordatorio</h2><p class="sh-p">Elegí qué querés que te recordemos.</p>${['Vacuna o control','Desparasitación','Baño y cepillado'].map((t,i)=>`<button class="btn2 sh-o" data-r="${i}">${t}</button>`).join('')}<button class="lnk sh-c" data-cancel>Cancelar</button>`,w=>$$('[data-r]',w).forEach(b=>b.onclick=()=>{closeSheetA();snd('ok');toast(`Listo: «${b.textContent}» quedó en tu calendario`)}))}}};

/* ---------- 49 · Notificaciones ---------- */
SCR.notificaciones={bg:'#fff',sbg:'#F7F5FF',bar:null,html:()=>{const d=AD(),ap=Object.keys(d.apps),g=S.g||{},b=(typeof badges==='function')?badges():[];
  const nuevas=ap.map(id=>['n_0',`Tu solicitud por ${AN(id).n}: ${ST_L[d.apps[id].st]}`,d.apps[id].st>=3?'¡La asociación aprobó la adopción!':'La asociación está revisando tu perfil.',id]);
  const ant=[...b.map(w=>['n_2',`Insignia de ${GA[WA[w-1]].n}`,`Completaste la semana ${w}.${w<4?' Kuska sigue creciendo.':''}`]),...(certOK()?[['n_1','Adoptante certificado',`Llegaste a ${prepPct()} %. Ya podés postularte.`]]:[])];
  const yA=230+Math.max(1,nuevas.length)*94+30;
  return `<div class="fr" style="height:${U(Math.max(844,yA+140+ant.length*85))}">
  <div class="a" style="${box(0,0,402,yA+60)};background:#F7F5FF;border-radius:0 0 0 ${U(110)}"></div>${ANH('Notificaciones')}
  <h3 class="a h-disp" style="${box(20,150)};margin:0;font-weight:600;font-size:${U(17)};color:var(--ink2)">Nuevas</h3>
  ${nuevas.length?nuevas.map((n,i)=>`<button class="a nt2 new" data-id="${n[3]}" style="${box(0,195+i*94,402,94)}"><img src="img/${n[0]}.webp" alt=""><span><b>${n[1]}</b>${n[2]}</span></button>`).join(''):`<p class="a p" style="${box(20,200,362)};margin:0;font-size:${U(13)};color:#6B6496">No tenés notificaciones nuevas.</p>`}
  <h3 class="a h-disp" style="${box(64,yA)};margin:0;font-weight:600;font-size:${U(17)};color:var(--ink2)">Anteriores</h3>
  ${ant.length?ant.map((n,i)=>`<div class="a nt2" style="${box(20,yA+100+i*85,382,72)}"><img src="img/${n[0]}.webp" alt=""><span><b>${n[1]}</b>${n[2]}</span></div>`).join(''):`<p class="a p" style="${box(20,yA+100,362)};margin:0;font-size:${U(13)};color:#6B6496">Acá vas a ver tus insignias y tu certificación.</p>`}</div>`},
  mount(el){const d=AD();$$('.nt2.new',el).forEach(n=>n.onclick=()=>{snd('tap');d.cur=n.dataset.id;save();go('proceso')})}};

/* ---------- 50 · Perfil ---------- */
delete SOON.perfil;
SCR.perfil={bg:'#fff',sbg:'#F7F5FF',bar:3,html:()=>{const c=certOK(),dn=S.g&&S.g.done,b=(typeof badges==='function')?badges():[],nm=S.name||'Emma',p=prepPct();
  const datos=[['p_0',S.fullname||nm],['p_1',S.ciudad||'Santa Fe'],['p_2',S.tel||'Agregá tu teléfono'],['p_3',S.email||'Agregá tu email']];
  return `<div class="fr" style="height:${U(1723)}">
  <div class="a" style="${box(0,0,402,330)};background:#F7F5FF;border-radius:0 0 ${U(90)} ${U(90)}"></div>
  ${ANH('Perfil')}
  <button class="a ib" id="lo" aria-label="Cerrar sesión" style="${box(19,132,40,40)}"><img src="img/p_logout.webp" alt="" style="width:100%"></button>
  <button class="a ib" data-go="miinfo" aria-label="Editar" style="${box(341,132,40,40)}"><img src="img/p_edit.webp" alt="" style="width:100%"></button>
  <div class="a avatar" style="${box(125,135,152,152)}"><span>${esc(nm.charAt(0).toUpperCase())}</span></div>
  <h2 class="a ctr h-disp" style="${box(0,308,402)};margin:0;font-weight:600;font-size:${U(25)};color:var(--ink2)">${esc(nm)}</h2>
  <span class="a chipc ${c?'':'off'}" style="${box(c?121:146,362,c?160:110,26)}">${c?'Adoptante certificado':'Adoptante'}</span>
  <h3 class="a h-disp" style="${box(24,433)};margin:0;font-weight:600;font-size:${U(17)};color:var(--ink2)">Datos personales</h3>
  ${datos.map((x,i)=>`<div class="a sr" style="${box(20,478+i*60,382,44)}"><img src="img/${x[0]}.webp" alt=""><span>${esc(x[1])}</span></div>`).join('')}
  <div class="a gcard" style="${box(20,748,352,180)}"><b style="${box(22,30,200)};position:absolute;font:600 ${U(14.5)}/1.3 var(--display);color:var(--ink2)">${dn?'¡Completaste la Demo!':'Tu Demo de situaciones'}</b>
    <span style="${box(22,60,190)};position:absolute;font:300 ${U(11.5)}/1.5 var(--text);color:#5644B6">${dn?`Conociste los cuidados y la convivencia responsable. <b style="font-weight:600;color:var(--ink2)">Obtuviste ${b.length} de 4 insignias.</b>`:`Vas ${(S.g&&S.g.prog)||0} de 12 retos. Con 80 % o más te certificás y podés adoptar.`}</span>
    <button class="mini" data-go="${dn?'progreso':'demo'}" style="${box(24,134,98,22)};position:absolute">${dn?'Ver mi progreso':'Seguir la Demo'}</button>${img('h11_kuska',222,26,118,122,'kuska float','Kuska')}</div>
  <div class="a" style="${box(0,965,402,480)};background:#F7F5FF;border-radius:${U(80)} ${U(80)} 0 0"></div>
  <h3 class="a h-disp" style="${box(44,985)};margin:0;font-weight:600;font-size:${U(17)};color:var(--ink2)">Resumen de tu preparación</h3>
  <div class="a pring" style="${box(32,1062)}">${ring(p,94,false)}</div>
  <p class="a p" style="${box(145,1088,215)};margin:0;font-size:${U(11.5)};line-height:1.5;color:#5644B6"><b style="font-weight:600;color:var(--ink2)">Progreso general</b><br>${p>=80?'Demostraste un alto nivel de conocimiento y compromiso.':p>0?'Vas por buen camino: repasá los temas que te faltan.':'Hacé la Demo para ver tu preparación.'}</p>
  <h3 class="a h-disp" style="${box(18,1214)};margin:0;font-weight:600;font-size:${U(14.5)};color:var(--ink2)">Insignias obtenidas</h3>
  ${b.length?b.map((w,i)=>{const A=GA[WA[w-1]];return `<img class="a" src="img/${A.ins}.webp" alt="Insignia de ${A.n}" style="${box(18+i*90,1255,88,88)}"><span class="a bigpill" style="${box(18+i*90+2,1365,84,18)};background:${A.c};font-size:${U(8.5)};box-shadow:none">${A.n.toUpperCase()}</span>`}).join(''):`<p class="a p" style="${box(18,1258,360)};margin:0;font-size:${U(13)};color:#6B6496">Todavía no ganaste insignias: se ganan en la Demo.</p>`}
  <div class="a" style="${box(0,1445,402,278)};background:#fff"></div>
  <h3 class="a h-disp" style="${box(18,1484)};margin:0;font-weight:600;font-size:${U(18)};color:var(--ink2)">Un poco más sobre vos</h3>
  ${[['Mis datos','pt_0','miinfo'],['Mi progreso','pt_1','progreso'],['Calendario','pt_2','calendario']].map((t,i)=>`<button class="a tile" data-go="${t[2]}" style="${box(18+i*135,1538,78,78)};padding-top:${U(16)}">${ic(t[1],20,20)}<span style="margin-top:${U(8)}">${t[0]}</span></button>`).join('')}</div>`},
  mount(el){const s=animRing(el);$('#lo',el).onclick=()=>{snd('sel');openSheet(`<h2 class="sh-t">¿Cerrar sesión?</h2><p class="sh-p">Tu progreso queda guardado en este dispositivo.</p><button class="btn sh-b" id="shOut">Cerrar sesión</button><button class="lnk sh-c" data-cancel>Cancelar</button>`,w=>{$('#shOut',w).onclick=()=>{closeSheetA(true);S.logged=false;save();go('login',{root:true})}})};
    $$('.kuska',el).forEach(k=>k.onclick=()=>{snd('pop');react(k,'wiggle')});return()=>{s();closeSheetA(true)}}};

/* ---------- 51 · Mi información ---------- */
SCR.miinfo={bg:'#fff',sbg:'#F7F5FF',bar:null,html:()=>{const nm=S.fullname||S.name||'';
  const f=(id,v,ph,ico,y)=>`<div class="a sr" style="${box(20,y,382,44)}"><img src="img/${ico}.webp" alt=""><input class="fld" id="${id}" value="${esc(v||'')}" placeholder="${ph}" aria-label="${ph}"></div>`;
  const opt=(k,lab,a,b2,y,inv)=>`<p class="a p" style="${box(20,y)};margin:0;font-size:${U(13)};font-weight:500;color:var(--ink2)">${lab}</p><div class="a" style="${box(20,y+25,328,40)}"><button class="opt2 ${(S[k]??0)===(inv?1:0)?'on':''}" data-k="${k}" data-v="${inv?1:0}">${a}</button><button class="opt2 ${(S[k]??0)===(inv?0:1)?'on':''}" data-k="${k}" data-v="${inv?0:1}">${b2}</button></div>`;
  return `<div class="fr" style="height:${U(1229)}">
  <div class="a" style="${box(0,0,402,200)};background:#F7F5FF;border-radius:0 0 ${U(70)} 0"></div>${ANH('Mi información')}
  <h3 class="a h-disp" style="${box(54,140)};margin:0;font-weight:600;font-size:${U(19)};color:var(--ink2)">Datos personales</h3><span class="a" aria-hidden="true" style="${box(341,143,40,40)}"><img src="img/p_edit.webp" alt="" style="width:100%"></span>
  ${f('fn',nm,'Nombre y apellido','p_0',237)}${f('fc',S.ciudad||'Santa Fe','Ciudad','p_1',297)}${f('ft',S.tel,'Teléfono','p_2',357)}${f('fe',S.email,'Email','p_3',417)}
  <div class="a" style="${box(0,520,402,110)};background:#F7F5FF;border-radius:0 ${U(80)} 0 0"></div>
  <h3 class="a h-disp" style="${box(54,555)};margin:0;font-weight:600;font-size:${U(19)};color:var(--ink2)">Tu hogar</h3>
  <p class="a p" style="${box(20,655,280)};margin:0;font-size:${U(12)};line-height:1.6;color:#6B6496">Estos datos calculan la compatibilidad con cada animal.</p>
  ${opt('estilo','Estilo de vida','Activo','Tranquilo',717)}${opt('hogar','Hogar','Departamento','Casa',829)}${opt('rutina','Horas fuera de casa','De 3 a 6 hs','Más de 6 hs',941)}
  <button class="a btn" id="gc" style="${box(38,1062,327,48)}">Guardar cambios</button></div>`},
  mount(el){const tmp={};$$('.opt2',el).forEach(b=>b.onclick=()=>{snd('sel');tmp[b.dataset.k]=+b.dataset.v;$$(`.opt2[data-k="${b.dataset.k}"]`,el).forEach(x=>x.classList.toggle('on',x===b))});
    $$('.fld',el).forEach(i=>i.addEventListener('input',()=>snd('type')));
    $('#gc',el).onclick=()=>{Object.assign(S,tmp);S.fullname=$('#fn',el).value.trim();S.ciudad=$('#fc',el).value.trim();S.tel=$('#ft',el).value.trim();S.email=$('#fe',el).value.trim();if(S.fullname&&!S.name)S.name=S.fullname.split(' ')[0];save();snd('ok');toast('Cambios guardados: la compatibilidad se actualizó');go('back')}}};

/* ---------- accesos desde el Inicio (Aprender, Red, notificaciones) ---------- */
(function(){const ih=SCR.inicio.html;SCR.inicio.html=()=>ih().replace('data-toast="Aprender se arma en el paso 5"','data-go="aprender"').replace('data-toast="Red y Comunidad se arma en el paso 5"','data-go="red"').replace(/data-toast="Tus notificaciones llegan en el paso 5"/g,'data-go="notificaciones"')})();
document.addEventListener('click',e=>{const t=e.target.closest('[data-toast="Tus notificaciones llegan en el paso 5"]');if(t){e.stopImmediatePropagation();go('notificaciones')}},true);
