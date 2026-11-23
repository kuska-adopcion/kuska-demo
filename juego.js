/* ===================== KUSKA · Demo de situaciones (12 retos) ===================== */
const GA={
  ali:{n:'Alimentación',v:'Cuidar',c:'#8EC426',d:'#5E8A12',p:'#EEF6DD',t:'t_ali',ins:'ins_alim',g:['#FCFEF4','#DCEBA6'],tw:[23,20.5]},
  sal:{n:'Salud',v:'Comprender',c:'#E22CB4',d:'#B0158A',p:'#FCE8F6',t:'t_sal',ins:'ins_salud',g:['#FFF7FC','#F7CBEA'],tw:[21,20]},
  hig:{n:'Higiene',v:'Convivir',c:'#2E7BFF',d:'#1F5CC8',p:'#E4EDFF',t:'t_hig',ins:'ins_higiene',g:['#F7FAFF','#CFE0FF'],tw:[17.5,22.5]},
  com:{n:'Comportamiento',v:'Sostener',c:'#FF9F1C',d:'#C66F00',p:'#FFF0DE',t:'t_com',ins:'ins_comp',g:['#FFFBF5','#FFE1B8'],tw:[16,24]}};
const WA=['ali','sal','hig','com'];
const STG=['Cachorro','Adolescente','Adulto joven','Adulto'];
const KP=['g_k1','g_k2','g_k3','g_k4'];
const KS=['g_k1sad','g_k2sad','g_k3sad','g_k4sad']; // triste: misma forma, tono de cada etapa
const MOOD={5:'sad',6:'sad',7:'sad',8:'sad',11:'sad'}; // situaciones que no son buenas para Kuska

/* Retos: textos de la demo anterior; reto 1 en el orden de tu pantalla 22. c = opción correcta */
const RT=[
 {w:1,n:'Primera comida',b:'¡Tengo hambre y mi plato está vacío!',q:'Kuska se despierta con hambre y el plato está vacío. ¿Cómo lo alimentás?',
  o:['Le doy las sobras de la cena','Lleno el plato hasta arriba','Porción medida según edad y peso, en varias comidas'],c:2,
  bad:'Comió de más y se descompuso.',tone:'Casi: tengámoslo en cuenta',ok:'¡Lograste el objetivo, Kuska está lleno!',
  tip:'Los cachorros necesitan porciones medidas, repartidas en 3 o 4 comidas, y alimento balanceado para su edad.',
  g:{t:'medir',v:'plato',label:'Deslizá para servir la porción',unit:' g',min:0,max:300,lo:70,hi:110,start:20,help:'Cachorro de 8 kg: cada una de sus 3 comidas ronda los 90 g.',ends:['Plato vacío','Plato desbordado']}},
 {w:1,n:'Comida humana',b:'¿Me das un poquito de eso?',q:'Estás cenando y Kuska pide un pedazo de chocolate.',
  o:['Le doy un poquito','No le doy comida humana: algunos alimentos son tóxicos','Solo en ocasiones especiales'],c:1,
  bad:'El chocolate es tóxico: terminó en una consulta de urgencia.',tone:'Algo para ajustar juntos',ok:'¡Qué come también importa! Buen ojo.',
  tip:'Chocolate, uvas y cebolla, entre otros, intoxican. Los premios se eligen aparte.',
  g:{t:'herramienta',label:'Arrastrá a Kuska el premio que sí puede comer',items:['Un trocito de cebolla','Galletita para perros','Uvas'],ic:['it_cebolla','it_galleta','it_uvas'],c:1}},
 {w:1,n:'Cambio de alimento',b:'Este alimento huele distinto…',q:'Querés cambiar la marca de alimento de Kuska.',
  o:['Mezclo de a poco durante una semana','Cambio todo de golpe','Le doy ambos sin orden'],c:0,
  bad:'Tuvo diarrea por el cambio brusco.',tone:'Para repasar con calma',ok:'¡Así se hace! Cambio gradual y panza feliz.',
  tip:'Los cambios de alimento se hacen de forma gradual, durante 7 a 10 días.',
  g:{t:'medir',v:'mezcla',label:'Día 1: deslizá para mezclar el alimento nuevo',unit:' %',min:0,max:100,lo:15,hi:30,start:60,help:'El primer día, el nuevo es apenas una parte; el resto, el de siempre.',ends:['Todo el de siempre','Todo nuevo']}},
 {w:2,n:'Vacunas',b:'Ya pasó mi primera semana en casa',q:'Pasó su primera semana en casa. ¿Qué hacés con las vacunas?',
  o:['Espero a ver si se enferma','Le pongo una vacuna que sobró de otro animal','Consulto al veterinario y armo el plan de vacunación y desparasitación'],c:2,
  bad:'Quedó desprotegido frente a enfermedades evitables.',tone:'Casi: tengámoslo en cuenta',ok:'¡Plan armado! Kuska está protegido.',
  tip:'Un plan veterinario temprano previene enfermedades y es un gasto recurrente.',
  g:{t:'herramienta',label:'Arrastrá a Kuska lo que llevás a la consulta',items:['Su libreta sanitaria','Nada, ya se acuerdan','La vacuna sobrante'],ic:['sv_libreta','sv_nada','sv_jeringa'],c:0}},
 {w:2,n:'Castración',b:'El veterinario habló de castración',q:'El veterinario menciona la castración. ¿Qué decidís?',
  o:['No hace falta, la evito','Consulto cuándo conviene y la planifico','Me da miedo, nunca la hago'],c:1,
  bad:'Aparecieron escapes, marcaje y riesgo de camadas no deseadas.',tone:'Algo para ajustar juntos',ok:'¡Decisión responsable, con tiempos claros!',
  tip:'La castración se planifica con el veterinario: previene camadas no deseadas y problemas de salud.',
  g:{t:'sostener',label:'Mantené presionado para agendar el turno',ms:1400}},
 {w:2,n:'Imprevistos',b:'Me duele algo… necesito una cirugía',q:'Kuska necesita una cirugía inesperada.',
  o:['Ya veremos cómo hacemos','No se enferman de adultos','Tengo un fondo para imprevistos y control anual'],c:2,
  bad:'Sin ahorro previsto, la decisión se demoró y empeoró.',tone:'Para repasar con calma',ok:'¡Prever también es cuidar!',
  tip:'Un fondo para imprevistos y los controles anuales son parte del compromiso económico.',
  g:{t:'medir',v:'alcancia',label:'Deslizá para llenar el frasco: ¿qué parte de su gasto mensual guardás?',unit:' %',min:0,max:60,lo:10,hi:25,start:0,help:'Guardar entre 10 y 25 % por mes arma una reserva chica y constante.',ends:['Nada','Más de la mitad']}},
 {w:3,n:'Pis en casa',b:'Ups… hice pis en el living',q:'Kuska hizo pis en el living. ¿Qué hacés?',
  o:['Limpio con producto adecuado y lo llevo a su lugar después de comer y dormir','Lo reto y le muestro el charco','Lo ignoro, ya aprenderá solo'],c:0,
  bad:'Se asustó y aprendió a esconderse para hacer.',tone:'Casi: tengámoslo en cuenta',ok:'¡Aprendió dónde ir y vos lo acompañaste!',
  tip:'El reto no enseña; la constancia sí. Rutina de salidas y limpieza enzimática quitan el olor que lo atrae.',
  g:{t:'frotar',v:'charco',label:'Frotá el charco del piso con limpiador enzimático',help:'Pasá el dedo o el mouse sobre el charco del piso hasta dejarlo limpio.'}},
 {w:3,n:'Pelo y uñas',b:'Tengo nudos y las uñas largas',q:'Kuska tiene el pelo enredado y las uñas largas.',
  o:['Lo baño todos los días','Cepillado frecuente, baño solo si hace falta y uñas al día','Nunca lo baño'],c:1,
  bad:'Se le irritó la piel por exceso de baño.',tone:'Algo para ajustar juntos',ok:'¡Pelaje de estreno!',
  tip:'El cepillado regular y el baño ocasional con producto adecuado cuidan piel y pelaje.',
  g:{t:'herramienta',label:'Arrastrá a Kuska con qué empezás',items:['Secador al máximo','Cepillo de cerdas suaves','Tijera de cocina'],ic:['it_secador','it_cepillo','it_tijera'],c:1}},
 {w:3,n:'Dientes',b:'Haaa… tengo mal aliento',q:'Kuska tiene mal aliento.',
  o:['Lo ignoro','Le doy huesos duros','Cepillado dental periódico y control veterinario'],c:2,
  bad:'El sarro avanzó y le duelen los dientes.',tone:'Para repasar con calma',ok:'¡Sonrisa brillante!',
  tip:'La higiene dental previene dolor e infecciones: cepillado y revisión veterinaria.',
  g:{t:'frotar',v:'dientes',label:'Frotá con el cepillo para limpiarle los dientes',help:'Pasá el dedo o el mouse sobre los dientes, en la lupa, hasta dejarlos limpios.'}},
 {w:4,n:'Mordidas',b:'Mmm… estas zapatillas',q:'Kuska muerde tus zapatillas.',
  o:['Le ofrezco juguetes para morder y redirijo la conducta','Lo castigo','Dejo que muerda, ya se le pasará'],c:0,
  bad:'Se volvió más ansioso: el castigo no le explica qué sí puede morder.',tone:'Casi: tengámoslo en cuenta',ok:'¡Ahora sabe qué sí morder!',
  tip:'Morder es exploración. Se redirige con juguetes y refuerzo positivo.',
  g:{t:'herramienta',label:'Arrastrá a Kuska lo que le ofrecés',items:['Un mordillo de goma','Una zapatilla vieja','Un cable en desuso'],ic:['it_mordillo','it_zapatilla','it_cable'],c:0}},
 {w:4,n:'Energía',b:'¡Quiero jugar, quiero jugar!',q:'Kuska tiene mucha energía a la tarde.',
  o:['Lo dejo en el patio o el balcón','Un paseo largo el fin de semana','Armo una rutina diaria de paseo y juego'],c:2,
  bad:'Se aburrió y descargó la energía rompiendo cosas.',tone:'Algo para ajustar juntos',ok:'¡Energía bien canalizada!',
  tip:'Paseo y juego diarios son parte del cuidado: la energía acumulada se vuelve conducta problemática.',
  g:{t:'rango',label:'Tirale la pelota para mantener su energía en la zona verde durante 4 segundos',help:'Cada tiro suma energía y se marca en la barra. Si llega al tope, esperá a que baje.',lo:40,hi:70,ms:4000}},
 {w:4,n:'Quedarse solo',b:'¿Te vas? ¿Cuánto vas a tardar?',q:'Vas a estar 9 horas fuera por trabajo.',
  o:['Lo dejo solo y me voy','Armo rutina: paseo antes, juguetes y ausencias graduales','Si rompió algo, lo reto al volver'],c:1,
  bad:'Aulló durante horas: la ansiedad por separación empeoró.',tone:'Para repasar con calma',ok:'¡Kuska se siente acompañado aunque no estés!',
  tip:'Se prepara a los animales para la soledad: ausencias graduales, estímulos y rutina previsible.',
  g:{t:'medir',v:'reloj',label:'Primera práctica: deslizá cuánto tiempo salís sin él',unit:' min',min:0,max:120,lo:10,hi:30,start:90,help:'Para empezar, entre 10 y 30 minutos. Después se alargan de a poco.',ends:['0 min','2 horas'],fmt:v=>v>=60?`${Math.floor(v/60)} h ${v%60?v%60+' min':''}`.trim():v+' min'}},
];

/* Objetos del reto 4 (no están en tus PNG): dibujados con el trazo y la paleta de tus ilustraciones */
const SV={
 sv_libreta:`<svg viewBox="0 0 64 64" fill="none" stroke="#2C2454" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><rect x="15" y="9" width="34" height="46" rx="6" fill="#D2E05A"/><path d="M22 9v46"/><rect x="28" y="19" width="15" height="15" rx="3" fill="#fff"/><path d="M35.5 22.5v8M31.5 26.5h8"/><path d="M28 43h14"/></svg>`,
 sv_nada:`<svg viewBox="0 0 64 64" fill="none" stroke="#2C2454" stroke-width="3" stroke-linecap="round"><circle cx="32" cy="32" r="20" stroke-dasharray="5 6" fill="#fff"/><path d="M26 27a6 6 0 1 1 8 6c-2 1-2 2-2 5M32 44v.5"/></svg>`,
 sv_jeringa:`<svg viewBox="0 0 64 64" fill="none" stroke="#2C2454" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M19 45l21-21 6 6-21 21z" fill="#E4EDFF"/><path d="M22 43l13-13 3.5 3.5-13 13z" fill="#E22CB4" stroke="none"/><path d="M43 21l6-6M46 12l6 6M16 48l-5 5M29 32l3 3M25 36l3 3"/></svg>`};
const itemImg=(n,cls='')=>SV[n]?`<span class="${cls}" style="display:block;height:calc(var(--u) * 42);width:calc(var(--u) * 42)">${SV[n]}</span>`:`<img class="${cls}" src="img/${n}.webp" alt="">`;

/* ---------- estado del juego ---------- */
const GDEF={prog:0,res:[],tries:{},done:false,skipped:false,sound:true,tab:'sit'};
if(!S.g)S.g={...GDEF};
const Gs=()=>S.g||(S.g={...GDEF});
let R=null;
const areaOf=i=>WA[RT[i].w-1];
const pts=()=>Gs().res.reduce((s,x)=>s+x.pts,0);
const pct=()=>Math.min(90,Math.round(pts()/12*100));  /* v27: Paula: el porcentaje nunca llega a 100, el máximo es 90 */
const isCert=()=>Gs().done&&pct()>=80;
const week=()=>Math.min(4,Math.floor(Gs().prog/3)+1);
const badges=()=>[1,2,3,4].filter(w=>Gs().prog>=w*3);
const stageIdx=()=>Gs().done?3:Math.min(3,Math.floor(Gs().prog/3));
function areaVals(){const v={ali:58,sal:60,hig:52,com:44};Gs().res.forEach(x=>{const k=areaOf(x.i);v[k]=Math.max(0,Math.min(100,v[k]+x.d))});return v}
function syncApp(){const g=Gs();S.retos=g.prog;S.insignias=badges().length;S.demoDone=g.done;save()}
function resetGame(){S.g={...GDEF,sound:Gs().sound};R=null;Object.assign(S,{retos:0,insignias:0,demoDone:false});save()}
function skipGame(){S.g={...Gs(),res:RT.map((_,i)=>({i,pts:1,d:10})),prog:12,done:true,skipped:true,tries:{}};R=null;syncApp()}
finishDemo=function(){skipGame();go('inicio',{replace:true})};

/* ---------- sonido ---------- */
function sfx(k){snd(k)}
const vib=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};

/* ---------- utilidades ---------- */
const gx=n=>`calc(var(--u) * ${n})`;
const icm=(n,w,h,col)=>`<i class="msk" style="-webkit-mask-image:url(img/${n}.webp);mask-image:url(img/${n}.webp);width:${gx(w)};height:${gx(h)};${col?`color:${col};`:''}"></i>`;
const PLAY='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6.2v11.6a1 1 0 0 0 1.5.9l9-5.8a1 1 0 0 0 0-1.8L11.5 6.6"/></svg>';
let GM=null,curT=433; // nodo del juego montado

/* ---------- 21 · Comienzo de la demo ---------- */
function sparks(n,seed=1,cols=['#fff','#C9BDF2','#D2E05A','#E22CB4','#2E7BFF']){let s=seed,h='';const r=()=>(s=(s*9301+49297)%233280)/233280;
  for(let i=0;i<n;i++){const z=2+r()*4;h+=`<i class="spark" style="left:${r()*100}%;top:${r()*60}%;width:${gx(z)};height:${gx(z)};background:${cols[i%cols.length]};animation-delay:${(r()*2).toFixed(2)}s"></i>`}return h}
SCR.demo={bg:'#34296D',sbg:'#34296D',dark:true,fit:true,html:()=>`
  <div class="a" style="inset:0">${sparks(22,3)}</div>
  ${img('d_k21',20,123.5,343.5,325,'kuska float pop-in','Kuska te saluda')}
  <h1 class="a ctr" style="${box(39,470,323)};margin:0;font:500 ${U(24)}/1.3 var(--display);color:#fff">Demo de situaciones</h1>
  <p class="a ctr" style="${box(56,530,290)};margin:0;font:300 ${U(13.5)}/1.6 var(--text);color:#E1DBFF">Durante 4 semanas vas a cuidar a Kuska en <b style="font-weight:600;color:#fff">12 situaciones reales</b>.<br><br><b style="font-weight:600;color:#fff">Con 80% o más te certificás como adoptante</b> y conocés a tus amigos.</p>
  <button class="a btn" id="go21" style="${box(37,704,327,50)}">${Gs().prog||Gs().done?'Seguir la demo':'Realizar Demo'}</button>
  ${Gs().prog||Gs().done?`<div class="a ctr" style="${box(0,772,402)}"><button class="lnk" id="rst21" style="color:#C9BDF2">Empezar de nuevo</button></div>`:''}`,
  mount(el){$('#go21',el).onclick=()=>{sfx('sel');if(!Gs().done&&!R&&Gs().prog===0)R=null;go('juego')};
    const r=$('#rst21',el);if(r)r.onclick=()=>{resetGame();go('juego')};
    const k=$('.kuska',el);k.onclick=()=>react(k,'wiggle')}};

/* ---------- el cuarto del juego ---------- */
SCR.juego={bg:'#fff',sbg:'transparent',nostatus:true,html:()=>`<div class="fr g390" id="gm" style="--navy:#2C2454">
  <div class="a room-wall"></div>
  <div class="a room-glow tr" id="glow"></div>
  <div class="a win tr" id="win"><i><b class="tr" id="sun"></b></i></div>
  <div class="a curtain l tr" id="cl" style="top:0"></div><div class="a curtain r tr" id="cr" style="top:0"></div>
  <div class="a tie l tr" id="tl"></div><div class="a tie r tr" id="tr"></div>
  <div class="a floorline tr" id="fl"></div><div class="a floor tr" id="flo"></div>
  <div class="a tr" id="prop" style="left:0;top:0;width:100%;height:100%;pointer-events:none"></div>
  <div class="a mat tr" id="mat"></div>
  <div class="a kwrap tr idle" id="kw"><img id="ki" alt="Kuska"></div>
  <div class="a bub" id="bub" hidden></div>
  <button class="a hbtn" id="hmenu" aria-label="Menú" style="${gb(10,10)}">${icm('h_menu',17.5,13.5)}</button>
  <div class="a pill" id="pill" style="${gb(96,12,197,39)}"></div>
  <button class="a hbtn" id="hsnd" aria-label="Sonido" style="${gb(334,10)}">${icm('h_sound',17,14.5)}</button>
  <div class="a scard tr" id="sc" style="${gb(10,60,308,90)}"></div>
  <div id="sides"></div>
  <div class="a panel tr" id="panel"><div class="tabs" id="tabs"></div><div class="pbody" id="pb"></div></div>
  <div class="scrim" id="scrim"></div><div class="sheet" id="sheet" role="dialog" aria-modal="true"></div>
</div>`,
  mount(el){GM=el;setupGame(el);return()=>{stopLoops();GM=null}}};
function gb(x,y,w,h){return `left:${gx(x)};top:${gx(y)};${w!=null?`width:${gx(w)};`:''}${h!=null?`height:${gx(h)};`:''}`}
const $g=s=>GM&&GM.querySelector(s);

function setupGame(el){
  $g('#hmenu').onclick=()=>{if(holdSkip)return;sfx('tap');menuSheet()};
  let lp;const hm=$g('#hmenu');holdSkip=false;
  hm.onpointerdown=null;
  hm.onpointerup=hm.onpointerleave=()=>clearTimeout(lp);
  $g('#hsnd').onclick=()=>{Gs().sound=!Gs().sound;save();$g('#hsnd').classList.toggle('off',!Gs().sound);if(Gs().sound)sfx('pop');toast(Gs().sound?'Sonido activado':'Sonido apagado')};
  $g('#hsnd').classList.toggle('off',!Gs().sound);
  $g('#ki').onclick=()=>pokeKuska();
  $g('#scrim').onclick=closeSheet;
  $g('#tabs').onclick=e=>{const t=e.target.closest('.tab');if(!t)return;const k=t.dataset.k;
    Gs().tab=k;save();sfx('tap');draw()};
  draw(true);
}
let holdSkip=false;

/* posición del cuarto según la altura del panel (como en tus pantallas: el cuarto se estira) */
function layout(T,mode,pose){
  curT=T;const F=Math.round(T*.71),set=(id,css)=>{const e=$g(id);if(e)e.style.cssText+=';'+css};
  set('#cl',`height:${gx(F-10)}`);set('#cr',`height:${gx(F-10)}`);
  set('#tl',`top:${gx(F*.535)};height:${gx(F*.07)}`);set('#tr',`top:${gx(F*.535)};height:${gx(F*.07)}`);
  set('#win',`top:${gx(-10)};height:${gx(F*.717+10)}`);set('#sun',`top:${gx(F*.30-5)}`);
  set('#fl',`top:${gx(F)}`);set('#flo',`top:${gx(F+3)};height:${gx(T-F)}`);
  set('#panel',`top:${gx(T)}`);
  const kh=Math.round(T*.43*RK_K),cx=mode==='side'?112:200;
  const feet=T-27;
  set('#kw',`left:${gx(cx)};top:${gx(feet-kh*(1-RK_B))};height:${gx(kh)}`);
  set('#mat',`left:${gx(cx+(pose==='rk_111'?-12:0))};top:${gx(T-62)};width:${gx(pose==='rk_111'?170:136)}`);
  set('#glow',`left:${gx(cx)};top:${gx(feet-kh*.55)}`);
  return {F,kh,cx,feet,top:feet-kh};
}

/* imágenes normalizadas: misma escala, pies a 40/580 del borde inferior */
const RK_K=.656*580/300,RK_B=40/580,G2=[3,5,7,8,10,11];
const rkp=(i,p)=>`rk_${Math.floor(i/3)+1}${i%3+1}${p}`;
function curStage(){return R?Math.floor(R.i/3):stageIdx()}
function curArea(){return R?areaOf(R.i):Gs().done?'com':WA[week()-1]}

function draw(first){
  if(!GM)return;stopLoops();
  const g=Gs(),k=curArea(),A=GA[k],st=curStage();
  GM.style.setProperty('--ac',A.c);
  const phase=R?R.phase:'hub',tab=g.tab||'sit';
  /* Kuska de cada reto (PNG de Paula): 1 = situación, 2 = momento intermedio, 3 = resultado */
  let mode='center',pose=g.done?'rk_433':g.prog?rkp(Math.min(g.prog,12)-1,3):rkp(0,1),T=433,sadA=false;
  if(tab!=='sit'){T=500}
  else if(phase==='hub'){T=600;pose=g.done?'rk_433':rkp(Math.min(g.prog,11),1)}
  else if(phase==='ask'){T=433;pose=rkp(R.i,1);sadA=MOOD[R.i]==='sad'}
  else if(phase==='gesture'){mode='side';T={medir:476,herramienta:484,sostener:560,frotar:600,rango:513}[RT[R.i].g.t];pose=rkp(R.i,G2.includes(R.i)?2:1)}
  else if(phase==='fb'){T=433;pose=R.ok?rkp(R.i,3):rkp(R.i,G2.includes(R.i)?1:2);sadA=!R.ok}
  if(mode==='sidefar')mode='side';
  const L=layout(T,mode,pose);
  // Kuska
  const ki=$g('#ki');if(!ki.src.endsWith(pose+'.webp'))ki.src=`img/${pose}.webp`;
  const kw=$g('#kw');kw.classList.remove('idle','sad','hop','no','enter');void kw.offsetWidth;
  kw.classList.add(sadA?'sad':'idle');
  if(first||(R&&R.enter)){if(R)R.enter=false;kw.classList.add('enter')}
  // burbuja
  const bub=$g('#bub');let bt='';
  if(tab==='sit'){if(phase==='ask')bt=RT[R.i].b;else if(phase==='fb')bt=R.ok?'¡Gracias!':'Ay…';else if(phase==='hub'&&g.done)bt='¡Crecí con vos!';else if(phase==='hub')bt=g.prog?'¡Sigamos!':'¡Hola! ¿Me cuidás?'}
  if(bt&&mode==='center'){bub.hidden=false;bub.textContent=bt;bub.style.cssText=`left:${gx(10)};top:${gx(Math.max(160,L.top+L.kh*.12))}`;bub.classList.remove('pop');void bub.offsetWidth;bub.classList.add('pop')}else bub.hidden=true;
  drawHUD(phase,tab);drawTabs(tab);drawProp(phase,tab,L);drawPanel(phase,tab,first);
}

function drawHUD(phase,tab){
  const g=Gs(),k=curArea(),A=GA[k],st=curStage(),v=areaVals(),p=pct();
  $g('#pill').innerHTML=g.done&&!R?`<i style="background:#D2E05A"></i>Demo completa`:`<i style="background:${A.c}"></i>Semana ${R?RT[R.i].w:week()} · Reto ${(R?R.i:Math.min(g.prog,11))+1}/12`;
  const compact=phase==='gesture'&&tab==='sit';
  const sc=$g('#sc');sc.style.height=gx(compact?53:90);
  sc.innerHTML=`<img class="hd" src="img/g_k${st+1}.webp" alt=""><span class="et">ETAPA ${st+1}</span><span class="nm">${STG[st]}</span>
    <div class="pp" style="left:${gx(st===0?131:st===3?120:152)}"><span>Preparación</span><b id="ppn">${p} %</b></div>
    ${compact?'':`<div class="pb" style="background:${A.p}"><i style="width:${p}%;background:${A.c}"></i><s></s></div>
    ${WA.map((a,i)=>`<span class="ar" style="left:${gx(13+i*27)};background:${GA[a].p}">${icm(GA[a].t,GA[a].tw[0]*.5,GA[a].tw[1]*.5,GA[a].c)}</span><span class="ab" style="left:${gx(13+i*27)}"><i style="width:${v[a]}%;background:${GA[a].c}"></i></span>`).join('')}`}`;
  const sides=$g('#sides');
  if(compact){sides.innerHTML='';return}
  const b=badges(),lastB=b.length?GA[WA[b.length-1]].ins:'ins_alim';
  sides.innerHTML=`<button class="a side" id="sDiario" aria-label="Diario" style="${gb(330,60)}">${icm('h_diario',22.5,22.5,'#2C2454')}${g.res.length?`<span class="cnt">${g.res.length}</span>`:''}</button><span class="a slab" style="${gb(353.5,109)}">Diario</span>
    <button class="a side" id="sIns" aria-label="Insignias" style="${gb(330,130)}"><img src="img/${lastB}.webp" alt="" style="${b.length?'':'filter:grayscale(1);opacity:.4'}"></button><span class="a slab" style="${gb(353.5,180)}">Insignias</span>
    <button class="a side" id="sSello" aria-label="Sello" style="${gb(330,202)}"><img src="img/k45_star.webp" alt="" style="${isCert()?'':'filter:grayscale(.85);opacity:.55'}"></button><span class="a slab" style="${gb(353.5,251)}">Sello</span>`;
  $g('#sDiario').onclick=diarioSheet;$g('#sIns').onclick=insigniasSheet;$g('#sSello').onclick=selloSheet;
}

function drawTabs(tab){
  const wk=week(),g=Gs();
  const x=[10,85.5,161,236.5];
  $g('#tabs').innerHTML=WA.map((a,i)=>{const lock=!g.done&&i+1>wk,cur=!g.done&&i+1===wk;
    return `<button class="tab ${tab===a?'on':''} ${lock?'lk0':''}" data-k="${a}" aria-label="${GA[a].n}${lock?' (bloqueada)':''}" style="left:${gx(x[i])}">${icm(GA[a].t,GA[a].tw[0],GA[a].tw[1])}${lock?`<span class="lk">${icm('t_lock',9,12)}</span>`:cur&&tab!==a?'<span class="dt"></span>':''}</button>`}).join('')+
    `<button class="tab ${tab==='sit'?'on':''}" data-k="sit" aria-label="Situación" style="left:${gx(312)};width:${gx(66)}">${icm('t_chat',23.5,21)}</button>`;
}

/* ---------- objetos en el cuarto ---------- */
function drawProp(phase,tab,L){
  const P=$g('#prop');P.innerHTML='';P.style.pointerEvents='none';
  if(R&&R.i===6&&tab==='sit'&&(phase==='ask'||(phase==='fb'&&!R.ok))){P.innerHTML=`<img class="a pud-in" src="img/p_puddle.webp" alt="Charco de pis" style="${gb(266,curT-58,64,45)}">`;return}
  if(!(R&&phase==='gesture'&&tab==='sit'))return;
  const r=RT[R.i],g=r.g,T=curT;
  const pos=(x,bottom,w,h)=>gb(x,T-bottom-h,w,h);
  let h='';
  if(g.v==='plato')h=`<img class="a" src="img/p_bowl.webp" alt="" style="${pos(225.5,87,126,65)}"><img class="a" id="pmix" src="img/p_bowlmix.webp" alt="" style="${pos(225.5,89,125.5,70.5)};opacity:0;transition:opacity .2s,transform .3s"><b class="a" id="pval" style="${pos(262,170,90,26)};font:700 ${gx(18)}/1 var(--display);color:var(--ink2);text-align:center"></b>`;
  if(g.v==='mezcla')h=`<img class="a" src="img/p_bowlmix.webp" alt="" style="${pos(225.5,81,125.5,70.5)}">
    <div class="a" id="tagS" style="left:${gx(202)};bottom:${gx(844-T+159)};width:${gx(50)};height:${gx(60)};background:#C4895D;border:${gx(2.5)} solid #2C2454;border-radius:${gx(7)};display:grid;place-items:center;font:600 ${gx(10)}/1 var(--display);color:#fff;transition:height .2s">Siempre</div>
    <div class="a" id="tagN" style="left:${gx(325)};bottom:${gx(844-T+159)};width:${gx(50)};height:${gx(60)};background:#8EC426;border:${gx(2.5)} solid #2C2454;border-radius:${gx(7)};display:grid;place-items:center;font:600 ${gx(10)}/1 var(--display);color:#fff;transition:height .2s">Nuevo</div>
    <b class="a" id="pval" style="${pos(254,190,70,24)};font:700 ${gx(18)}/1 var(--display);color:var(--ink2);text-align:center"></b>`;
  if(g.v==='alcancia'){const J='M29 40H180Q200 60 203 82V250Q203 264 185 264H25Q7 264 7 250V82Q10 60 29 40Z';let co='';for(let r=0;r<15;r++)for(let c=-1;c<5;c++)co+=`<ellipse cx="${c*48+(r%2?24:0)+8}" cy="${270-r*13}" rx="26" ry="8.5"/>`;
    h=`<div class="a" id="jar" style="${pos(236,72,105.5,136.5)}"><img src="img/p_jar0.webp" alt="" style="position:absolute;inset:0;width:100%;height:100%">
      <svg viewBox="0 0 211 273" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible"><defs><clipPath id="jclip"><path d="${J}"/></clipPath></defs>
      <rect x="211" y="${264-g.lo/g.max*182}" width="9" height="${(g.hi-g.lo)/g.max*182}" rx="4.5" fill="#D2E05A" stroke="#9DAE2A" stroke-width="2"/>
      <g clip-path="url(#jclip)"><g id="pcoins" style="transform:translateY(197.5px);transition:transform .18s ease-out"><g fill="#F8E098" stroke="#908888" stroke-width="2.5">${co}</g></g>
      <line id="plev" x1="0" x2="211" y1="264" y2="264" stroke="#2C2454" stroke-width="3" stroke-dasharray="7 6" style="transition:transform .18s ease-out"/></g></svg>
      <img src="img/p_jarlabel.webp" alt="" style="position:absolute;left:${51/2*100/105.5}%;top:${112/273*100}%;width:${112/211*100}%"></div>
      <b class="a" id="pval" style="left:${gx(260.75)};width:${gx(56)};top:${gx(T-88.5)};height:${gx(24)};display:grid;place-items:center;border-radius:999px;background:#2C2454;color:#fff;font:700 ${gx(12.5)}/1 var(--display);transition:transform .18s ease-out;z-index:2"></b>`}
  if(g.v==='reloj')h=`<img class="a" src="img/p_door.webp" alt="" style="${pos(279,60,93,160)}">
    <svg class="a" viewBox="-50 -50 100 100" style="${gb(204,T-237,94,94)}"><circle r="44" fill="#fff" stroke="#2C2454" stroke-width="3.5"/><path d="M0 0L${(Math.sin(10/120*6.2832)*44).toFixed(2)} ${(-Math.cos(10/120*6.2832)*44).toFixed(2)}A44 44 0 0 1 ${(Math.sin(30/120*6.2832)*44).toFixed(2)} ${(-Math.cos(30/120*6.2832)*44).toFixed(2)}Z" fill="#D2E05A" opacity=".75"/><path id="wedge" fill="#1E1A3A" opacity=".85"/><g stroke="#2C2454" stroke-width="3" stroke-linecap="round"><path d="M0-40v6M40 0h-6M0 40v-6M-40 0h6"/></g><circle r="4" fill="#2C2454"/></svg>
    <b class="a" id="pval" style="${gb(196,T-136,110,24)};font:700 ${gx(18)}/1 var(--display);color:var(--ink2);text-align:center"></b>`;
  if(g.t==='sostener')h=`<div class="a" style="${pos(212.5,97,155.5,163)}"><img src="img/p_cal.webp" alt="" style="width:100%;height:100%"><svg id="calring" viewBox="0 0 40 40" style="position:absolute;left:39%;top:46%;width:22%;height:22%;transform:rotate(-90deg)"><circle cx="20" cy="20" r="17" fill="none" stroke="#D2E05A" stroke-width="5" stroke-dasharray="107" stroke-dashoffset="107" stroke-linecap="round" id="calarc"/></svg></div>`;
  if(g.v==='charco')h=`<canvas class="a rub" id="rubc" style="${pos(198,24,149.5,104.5)};touch-action:none;cursor:crosshair"></canvas>`;
  if(g.v==='dientes')h=`<div class="a" style="${pos(199,100,189,179)}"><img src="img/p_mouth_clean.webp" alt="" style="position:absolute;left:${gx(24)};top:${gx(46.5)};width:${gx(131)};height:${gx(104)}"><canvas id="rubc" style="position:absolute;left:${gx(24)};top:${gx(46.5)};width:${gx(131)};height:${gx(104)};touch-action:none;cursor:crosshair"></canvas></div>`;
  if(g.t==='rango'){const mh=T-206-12;
    h=`<span class="a slab" style="${gb(317,190)}">Energía</span>
    <div class="a" id="meter" style="${gb(292,206,50,mh)};border:${gx(3)} solid #2C2454;border-radius:999px;background:#fff;overflow:hidden">
      <div style="position:absolute;left:0;right:0;bottom:${g.lo}%;height:${g.hi-g.lo}%;background:#E3EAA6;border-top:${gx(2)} solid #9DAE2A;border-bottom:${gx(2)} solid #9DAE2A"></div>
      <div id="lvl" style="position:absolute;left:${gx(6)};right:${gx(6)};bottom:${gx(5)};height:12%;border-radius:999px;background:#FF9F1C;transition:height .12s linear"></div></div>
    <div class="a" id="mscale" style="${gb(250,206+3,40,mh-6)}">${[0,25,50,75,100].map(n=>`<span class="mtk" style="bottom:${n}%"><b>${n===100?'Tope':n}</b><i></i></span>`).join('')}</div><div class="a" id="mmarks" style="${gb(344,206+3,44,mh-6)}"></div>`}
  P.innerHTML=h;
  if(g.t==='frotar'){P.style.pointerEvents='auto';setupRub(g.v)}
}

/* ---------- panel inferior ---------- */
function drawPanel(phase,tab,first){
  const pb=$g('#pb'),g=Gs();let h='';
  if(tab!=='sit')h=areaPanel(tab);
  else if(phase==='hub'){
    if(g.done)h=`<p class="eyb" style="color:#5E8A12">Demo completa</p><p class="qt">Kuska ya es adulto</p><p class="help" style="margin-top:${gx(8)}">Llegaste a ${pct()} % de preparación${isCert()?': ya podés postularte para adoptar.':'. Con 80 % o más te certificás.'}</p>
      <button class="gbtn" id="bRes" style="bottom:${gx(66)}">Ver resultado</button><button class="lnk a" id="bRep" style="left:0;right:0;bottom:${gx(24)};text-align:center;font-size:${gx(13)}">Repetir la demo</button>`;
    else{const i=g.prog,k=areaOf(i);h=`<p class="eyb" style="color:${GA[k].d}">Semana ${RT[i].w} · ${GA[k].v}</p><p class="qt">Kuska te necesita</p><p class="help" style="margin-top:${gx(6)}">Reto ${i+1} de 12: ${RT[i].n.toLowerCase()}.</p>
      <button class="gbtn" id="bPlay">${PLAY} Jugar reto ${i+1}</button>`}
  }
  else if(phase==='ask'){const r=RT[R.i],k=areaOf(R.i);
    h=`<p class="eyb" style="color:${GA[k].d}">${GA[k].n}</p><p class="qt">${r.q}</p><div class="opts" role="radiogroup">${r.o.map((o,j)=>`<button class="opt ${R.sel===j?'on':''}" role="radio" aria-checked="${R.sel===j}" data-j="${j}"><b>${'ABC'[j]}</b><span>${o}</span></button>`).join('')}</div>
      <button class="gbtn ${R.sel==null?'off':''}" id="bDec">Decidir</button>`}
  else if(phase==='gesture')h=gesturePanel();
  else if(phase==='fb'){const r=RT[R.i],k=areaOf(R.i);
    h=R.ok?`<div class="banner ok"><span class="bstar">${icm('f_star',20.5,19.5)}</span><h3>${r.ok}</h3><p>${R.pts===1?'+1 punto':'+0,5 punto'} de preparación · ${GA[k].n} +${R.d}</p></div>`
      :`<div class="banner bad">${icm('f_warn',21.5,20)}<h3>${r.tone}</h3><p>${R.why||r.bad}</p></div>`;
    h+=`<details class="disc"><summary>${icm('f_info',16.5,16.5,'#5E8A12')}Descubrí${icm('f_chev',7,11,'#2C2454').replace('class="msk"','class="msk ch"')}</summary><p class="eyb" style="color:var(--acc)">Para tener en cuenta</p><p>${r.tip}</p></details>`;
    h+=R.ok?`<button class="gbtn" id="bNext">${R.i===11?'Ver mi resultado':(R.i+1)%3===0?'Cerrar la semana':'Siguiente reto'} ${icm('f_arrow',15.5,11)}</button>`:`<button class="gbtn" id="bFix">${icm('f_repeat',15,15)} Repasar y corregir</button>`;
  }
  pb.innerHTML=h;pb.classList.remove('swap');if(!first){void pb.offsetWidth;pb.classList.add('swap')}
  // acciones
  const on=(id,f)=>{const e=pb.querySelector(id);if(e)e.onclick=f};
  on('#bPlay',()=>{sfx('sel');startReto(Gs().prog)});
  on('#bRes',()=>go(isCert()?'certificado':'resultado'));
  on('#bRep',()=>{resetGame();sfx('sel');R=null;draw()});
  pb.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{R.sel=+b.dataset.j;sfx('tap');pb.querySelectorAll('.opt').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-checked',x===b)});$g('#bDec').classList.remove('off');pokeKuska(true)});
  on('#bDec',()=>{if(R.sel==null){toast('Elegí una respuesta');return}const r=RT[R.i];if(R.sel!==r.c){finishReto(false);return}sfx('sel');R.phase='gesture';draw()});
  on('#bNext',afterOk);
  on('#bFix',()=>{sfx('sel');go('reintentar',{replace:true})});
  pb.querySelectorAll('.rc[data-i]').forEach(c=>c.onclick=()=>{const i=+c.dataset.i;if(c.classList.contains('lock')){sfx('tap');react(c,'shake');return}if(c.classList.contains('now')){Gs().tab='sit';startReto(i);return}tipSheet(i)});
  if(phase==='gesture'&&tab==='sit')setupGesture();
}

function areaPanel(k){const A=GA[k],w=WA.indexOf(k)+1,g=Gs(),v=areaVals()[k],has=badges().includes(w);
  const fut=!g.done&&w>week();
  return `<p class="eyb" style="color:${A.d}">Semana ${w} · ${A.v}</p><div class="wk"><h3>${A.n}</h3><span class="chip" style="background:${A.p};color:${A.d}">${v}/100</span>${has?`<img src="img/${A.ins}.webp" alt="Insignia ganada" style="height:${gx(40)}">`:''}</div>
    <div class="rcards" style="--pastel:${A.p}">${[0,1,2].map(j=>{const i=(w-1)*3+j,done=g.prog>i,now=!g.done&&g.prog===i;
      return `<button class="rc ${done?'':now?'now':'lock'}" data-i="${i}"><span class="tg" style="${done?'':'display:none'}">✓ Hecho</span><img src="img/${rkp(i,done?3:1)}.webp" alt="" style="${done||now?'':'filter:grayscale(1);opacity:.5'}"><span>${RT[i].n}</span></button>`}).join('')}</div>
    <p class="help" style="margin-top:${gx(10)}">${fut?`Estos son los 3 retos de ${A.n.toLowerCase()} que te esperan.`:'Tocá un reto hecho para releer qué tener en cuenta.'}</p>`}

function startReto(i){R={i,phase:'ask',sel:null,first:!Gs().tries[i],enter:true};Gs().tab='sit';save();draw()}

function finishReto(ok,why){
  const first=R.first,p=ok?(first?1:.5):0,d=ok?(first?10:5):(first?-20:-10),g=Gs();
  g.res.push({i:R.i,pts:p,d});
  if(ok){g.prog=Math.max(g.prog,R.i+1);delete g.tries[R.i];if(R.i===11)g.done=true}
  else g.tries[R.i]=(g.tries[R.i]||0)+1;
  Object.assign(R,{phase:'fb',ok,why,d,pts:p});g.tab='sit';syncApp();
  sfx(ok?'ok':'casi');vib(ok?[12,50,12]:30);
  if(ok){go('carta',{replace:true});return}
  draw();floatN(d);
}
function afterOk(){const i=R.i;sfx('sel');
  if((i+1)%3===0){go('semana',{replace:true});return}
  startReto(i+1)}
function floatN(d){const sc=$g('#sc');if(!sc)return;const f=document.createElement('span');f.className='float-n';f.textContent=(d>0?'+':'')+d;f.style.cssText+=`left:${gx(22)};top:${gx(88)};color:${d>0?'#5E8A12':'#E22CB4'}`;GM.appendChild(f);setTimeout(()=>f.remove(),1700)}
function hearts(){const kw=$g('#kw');if(!kw)return;const r=kw.getBoundingClientRect(),gr=GM.querySelector('#gm').getBoundingClientRect(),u=gr.width/390;
  for(let i=0;i<6;i++)setTimeout(()=>{const h=document.createElement('div');h.className='heart';h.style.left=((r.left-gr.left)/u+(r.width/u)*(.25+Math.random()*.5)-11)*u+'px';h.style.top=((r.top-gr.top)/u+r.height/u*.25)*u+'px';h.style.setProperty('--dx',(Math.random()*60-30)+'px');h.style.setProperty('--rot',(Math.random()*40-20)+'deg');
    h.innerHTML=`<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 20s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7.3 4.2 4.2 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z" fill="${['#C15DE5','#D2E05A','#735BF2'][i%3]}" stroke="#2C2454" stroke-width="2"/></svg>`;GM.querySelector('#gm').appendChild(h);setTimeout(()=>h.remove(),1300)},i*110)}
function kAnim(c){const kw=$g('#kw');if(!kw)return;kw.classList.remove('idle','hop','no','yum','sad');void kw.offsetWidth;kw.classList.add(c);setTimeout(()=>{if(kw.classList.contains(c)){kw.classList.remove(c);const ki=$g('#ki');kw.classList.add(ki&&/sad\.webp$/.test(ki.src)?'sad':'idle')}},c==='yum'?1400:750)}
function cheer(a='hop'){const ki=$g('#ki');if(ki&&R){ki.src=`img/${rkp(R.i,3)}.webp`}kAnim(a);hearts()}
function pokeKuska(quiet){if(!GM)return;kAnim(Math.random()<.6?'hop':'yum');if(!quiet){sfx('pop');hearts()}}

/* ---------- gestos ---------- */
let loops=[];function stopLoops(){loops.forEach(f=>f());loops=[]}
function gesturePanel(){const r=RT[R.i],g=r.g;let h=`<p class="eyb">Ahora, hacelo</p><p class="qt">${g.label}</p>`;
  if(g.t==='medir')h+=`<div class="gs" id="gs" role="slider" tabindex="0" aria-label="${g.label}" aria-valuemin="${g.min}" aria-valuemax="${g.max}"><div class="fl"></div><div class="zn" style="left:calc(${gx(23)} + (100% - ${gx(46)}) * ${(g.lo-g.min)/(g.max-g.min)});width:calc((100% - ${gx(46)}) * ${(g.hi-g.lo)/(g.max-g.min)})"></div><div class="th">${icm('f_paw',16,18)}</div></div>
    <div class="gends"><span>${g.ends[0]}</span><span class="zlab"><i></i>Lo recomendado</span><span>${g.ends[1]}</span></div><div class="gval"><b id="gv"></b><span>${g.help}</span></div><button class="gbtn" id="gok">Confirmar</button>`;
  if(g.t==='herramienta')h+=`<div class="items" style="--pastel:${GA[areaOf(R.i)].p}">${g.items.map((t,j)=>`<div class="item" data-j="${j}" role="button" tabindex="0" aria-label="${t}"><span class="x1">x1</span>${itemImg(g.ic[j])}<span>${t}</span></div>`).join('')}</div><button class="gbtn" id="ggive">${icm('f_hand',13.5,16)} Dárselo a Kuska</button>`;
  if(g.t==='sostener')h+=`<button class="gbtn" id="ghold" style="position:relative;left:auto;right:auto;bottom:auto;width:100%;margin-top:${gx(18)};height:${gx(52)};overflow:hidden"><span class="fillp" id="hf"></span>${icm('f_clock',12.5,15)} Mantener presionado</button><p class="help" style="margin-top:${gx(14)}">Si soltás antes de tiempo, el turno no se guarda y empezás de nuevo.</p>`;
  if(g.t==='frotar')h+=`<div class="ptrack"><i id="rp"></i></div><p class="help" style="margin-top:${gx(14)}">${g.help}</p>`;
  if(g.t==='rango')h+=`<div class="ptrack"><i id="rp" style="background:#8EC426"></i></div><button class="gbtn lime" id="gball" style="position:relative;left:auto;right:auto;bottom:auto;width:100%;margin-top:${gx(14)}">${icm('f_ball',13.5,15)} Tirar la pelota</button><p class="help" style="margin-top:${gx(14)}">${g.help}</p>`;
  return h}

function setupGesture(){const g=RT[R.i].g;
  if(g.t==='medir'){let v=g.start;const gs=$g('#gs'),th=gs.querySelector('.th'),fl=gs.querySelector('.fl');
    const fmt=x=>g.fmt?g.fmt(x):x+g.unit;
    const upd=()=>{const f=(v-g.min)/(g.max-g.min);gs.classList.toggle('inz',v>=g.lo&&v<=g.hi);th.style.left=`calc(${gx(23)} + (100% - ${gx(46)}) * ${f})`;fl.style.width=`calc(${gx(46)} + (100% - ${gx(46)}) * ${f})`;$g('#gv').textContent=fmt(v);gs.setAttribute('aria-valuenow',v);gs.setAttribute('aria-valuetext',fmt(v));propVal(g,v)};
    const step=g.v==='reloj'?5:g.max>=200?5:1;
    const at=e=>{const r=gs.getBoundingClientRect(),u=r.height/46;const f=Math.max(0,Math.min(1,(e.clientX-r.left-23*u)/(r.width-46*u)));v=Math.round((g.min+f*(g.max-g.min))/step)*step;upd()};
    let lastT=0;
    gs.onpointerdown=e=>{e.preventDefault();try{getSelection().removeAllRanges()}catch(x){}gs.setPointerCapture(e.pointerId);gs.classList.add('drag');gs.focus({preventScroll:true});at(e)};gs.ondragstart=e=>e.preventDefault();
    gs.onpointermove=e=>{if(gs.classList.contains('drag')){at(e);const n=Date.now();if(n-lastT>70){sfx('slide');lastT=n}}};
    gs.onpointerup=gs.onpointercancel=gs.onlostpointercapture=()=>gs.classList.remove('drag');
    gs.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowUp'){v=Math.min(g.max,v+step);upd();e.preventDefault()}if(e.key==='ArrowLeft'||e.key==='ArrowDown'){v=Math.max(g.min,v-step);upd();e.preventDefault()}};
    upd();
    $g('#gok').onclick=()=>{const ok=v>=g.lo&&v<=g.hi;if(ok){cheer('yum')}else kAnim('no');setTimeout(()=>finishReto(ok,ok?null:`La medida no fue la adecuada (${fmt(v)}). ${g.help}`),ok?650:500)};
  }
  if(g.t==='herramienta'){let sel=null;const items=[...GM.querySelectorAll('.item')];
    const choose=j=>{sel=j;items.forEach((x,k)=>x.classList.toggle('on',k===j));sfx('tap')};
    const give=j=>{if(j==null){toast('Elegí un objeto o arrastralo hasta Kuska');return}const ok=j===g.c;items[j].classList.add('used');
      if(ok){cheer();sfx('give')}else kAnim('no');setTimeout(()=>finishReto(ok,ok?null:`${g.items[j]} no es lo indicado. ${RT[R.i].tip}`),700)};
    items.forEach((it,j)=>{
      it.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(j)}};
      it.onpointerdown=e=>{e.preventDefault();const sx=e.clientX,sy=e.clientY;let gh=null;it.setPointerCapture(e.pointerId);
        it.onpointermove=m=>{if(!gh&&Math.hypot(m.clientX-sx,m.clientY-sy)>8){gh=document.createElement('div');gh.className='dragghost';gh.innerHTML=itemImg(g.ic[j]);const im=gh.firstElementChild;im.style.height=gx(54);im.style.width=SV[g.ic[j]]?gx(54):'auto';GM.querySelector('#gm').appendChild(gh);choose(j);sfx('drag')}
          if(gh){const gr=GM.querySelector('#gm').getBoundingClientRect();gh.style.left=(m.clientX-gr.left)+'px';gh.style.top=(m.clientY-gr.top)+'px';
            const kr=$g('#ki').getBoundingClientRect();$g('#kw').style.filter=(m.clientX>kr.left&&m.clientX<kr.right&&m.clientY>kr.top&&m.clientY<kr.bottom)?'drop-shadow(0 0 10px #D2E05A)':''}};
        it.onpointerup=u=>{it.onpointermove=null;$g('#kw').style.filter='';if(gh){gh.remove();const kr=$g('#ki').getBoundingClientRect();if(u.clientX>kr.left&&u.clientX<kr.right&&u.clientY>kr.top&&u.clientY<kr.bottom)give(j);else toast('Soltalo sobre Kuska')}else choose(j)}}});
    $g('#ggive').onclick=()=>give(sel);
  }
  if(g.t==='sostener'){const b=$g('#ghold'),hf=$g('#hf'),arc=$g('#calarc');let t0=0,raf=0,done=false;
    const tick=()=>{const f=Math.min(1,(performance.now()-t0)/g.ms);hf.style.width=f*100+'%';if(arc)arc.style.strokeDashoffset=107*(1-f);
      if(f>=1){done=true;sfx('ok');cheer();setTimeout(()=>finishReto(true),650);return}raf=requestAnimationFrame(tick)};
    const start=e=>{if(done)return;e.preventDefault();t0=performance.now();sfx('hold');raf=requestAnimationFrame(tick)};
    const stop=()=>{if(done||!t0)return;cancelAnimationFrame(raf);t0=0;hf.style.width='0';if(arc)arc.style.strokeDashoffset=107;toast('Soltaste antes de tiempo: probá de nuevo');kAnim('no')};
    b.onpointerdown=start;b.onpointerup=b.onpointerleave=b.onpointercancel=stop;
    b.onkeydown=e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat)start(e)};b.onkeyup=stop;
    loops.push(()=>cancelAnimationFrame(raf));
  }
  if(g.t==='rango'){let lvl=12,inZone=0,started=false,last=performance.now(),raf,ended=false,n=0,topT=0;const L=$g('#lvl'),rp=$g('#rp'),sc=$g('#mmarks');
    const end=ok=>{ended=true;cancelAnimationFrame(raf);cheer();setTimeout(()=>finishReto(true),600)};
    const tick=now=>{const dt=(now-last)/1000;last=now;if(started){lvl=Math.max(0,lvl-dt*9);if(lvl>=g.lo&&lvl<=g.hi)inZone+=dt*1000;else inZone=Math.max(0,inZone-dt*1500)}
      L.style.height=Math.max(4,lvl)+'%';L.style.background=lvl>=g.lo&&lvl<=g.hi?'#8EC426':'#FF9F1C';rp.style.width=Math.min(100,inZone/g.ms*100)+'%';
      if(inZone>=g.ms)return end(true);
      raf=requestAnimationFrame(tick)};
    raf=requestAnimationFrame(tick);loops.push(()=>cancelAnimationFrame(raf));
    $g('#gball').onclick=()=>{if(ended)return;started=true;n++;
      if(lvl>=99){const t=Date.now();if(t-topT>1200){toast('Llegó al tope: esperá a que baje un poco');topT=t}kAnim('no');return}
      lvl=Math.min(100,lvl+15);sfx('ball');throwBall();kAnim('hop');
      const m=document.createElement('span');m.className='mark';m.style.bottom=lvl+'%';m.innerHTML=`<b>${n}</b>`;sc.appendChild(m);
      [...sc.querySelectorAll('.mark')].reverse().forEach((x,j)=>{x.style.opacity=j===0?1:j<3?.45:0;if(j>=3)setTimeout(()=>x.remove(),400)})};
  }
}
function propVal(g,v){const pv=$g('#pval');const fmt=x=>g.fmt?g.fmt(x):x+g.unit;if(pv)pv.textContent=fmt(v);
  if(g.v==='plato'){const m=$g('#pmix');m.style.opacity=Math.min(1,v/90);m.style.transform=v>g.hi?`scale(${1+Math.min(.12,(v-g.hi)/1500)})`:''}
  if(g.v==='mezcla'){$g('#tagS').style.height=gx(26+34*(100-v)/100);$g('#tagN').style.height=gx(26+34*v/100)}
  if(g.v==='alcancia'){const f=Math.min(1,v/g.max),dy=197.5-f*182;$g('#pcoins').style.transform=`translateY(${dy}px)`;$g('#plev').style.transform=`translateY(${-f*182}px)`;const pv=$g('#pval');pv.style.transform=`translateY(${gx(-f*91)})`;pv.style.background=v>=g.lo&&v<=g.hi?'#5E8A12':'#2C2454'}
  if(g.v==='reloj'){const a=Math.min(.9999,v/120)*2*Math.PI,x=Math.sin(a)*40,y=-Math.cos(a)*40;$g('#wedge').setAttribute('d',v<=0?'':`M0 0L0 -40A40 40 0 ${a>Math.PI?1:0} 1 ${x.toFixed(2)} ${y.toFixed(2)}Z`)}}
function throwBall(){const gm=GM.querySelector('#gm'),b=document.createElement('div');b.style.cssText=`position:absolute;left:${gx(180)};top:${gx(560)};width:${gx(22)};height:${gx(22)};border-radius:50%;background:#D2E05A;border:${gx(2.5)} solid #2C2454;z-index:8;transition:transform .55s cubic-bezier(.3,.8,.4,1),opacity .2s .45s`;
  gm.appendChild(b);requestAnimationFrame(()=>{b.style.transform=`translate(${gx(-60)},${gx(-240)}) rotate(320deg)`;b.style.opacity='0'});setTimeout(()=>b.remove(),800)}

function setupRub(kind){const cv=$g('#rubc'),src=kind==='charco'?'img/p_puddle.webp':'img/p_mouth.webp';const im=new Image();
  im.onload=()=>{cv.width=im.naturalWidth;cv.height=im.naturalHeight;const c=cv.getContext('2d');c.drawImage(im,0,0);
    const total=alphaSum(c,cv);let done=false,n=0,down=false,lastS=0,lp=null;
    const rub=e=>{if(done)return;const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*cv.width,y=(e.clientY-r.top)/r.height*cv.height,rad=cv.width*.13;
      c.globalCompositeOperation='destination-out';c.strokeStyle='rgba(0,0,0,1)';c.lineCap='round';c.lineWidth=rad*2;c.beginPath();
      if(lp){c.moveTo(lp[0],lp[1]);c.lineTo(x,y)}else{c.moveTo(x,y);c.lineTo(x+.1,y)}c.stroke();c.globalCompositeOperation='source-over';lp=[x,y];
      if(++n%4===0){const left=alphaSum(c,cv)/total,f=Math.min(1,(1-left)/.88);const rp=$g('#rp');if(rp)rp.style.width=f*100+'%';
        const t=Date.now();if(t-lastS>110){sfx('rub');lastS=t}
        if(f>=1){done=true;c.clearRect(0,0,cv.width,cv.height);cheer();sfx('ok');setTimeout(()=>finishReto(true),700)}}};
    cv.onpointerdown=e=>{e.preventDefault();down=true;lp=null;cv.setPointerCapture(e.pointerId);rub(e)};cv.onpointerup=cv.onpointercancel=()=>{down=false;lp=null};cv.onpointerleave=()=>{lp=null};
    cv.onpointermove=e=>{if(down||e.pointerType==='mouse')rub(e)}};
  im.src=src}
function alphaSum(c,cv){const d=c.getImageData(0,0,cv.width,cv.height).data;let s=0;for(let i=3;i<d.length;i+=16)s+=d[i];return s||1}

/* ---------- hojas ---------- */
function sheet(h){$g('#sheet').innerHTML=h;$g('#sheet').classList.add('on');$g('#scrim').classList.add('on');const c=$g('#sheet [data-close]');if(c)c.onclick=closeSheet}
function closeSheet(){if(!GM)return;$g('#sheet').classList.remove('on');$g('#scrim').classList.remove('on')}
function diarioSheet(){sfx('tap');const list=[...Gs().res].sort((x,y)=>x.i-y.i);
  sheet(`<h2>Diario de Kuska</h2><p class="sub">Cada decisión que tomaste y cómo movió su preparación.</p>
    ${list.length?list.map(x=>{const r=RT[x.i],k=areaOf(x.i);return `<div class="li"><span class="ic" style="background:${GA[k].p}">${icm(x.pts?'f_star':'f_warn',15,15,GA[k].d)}</span><div class="tx"><b>${r.n}</b><span>Semana ${r.w} · ${x.pts?(x.pts===1?'Logrado a la primera':'Logrado en el repaso'):'A repasar'}</span></div><span class="v" style="color:${x.d>0?'#5E8A12':GA[k].d}">${x.d>0?'+':''}${x.d}</span></div>`}).join(''):'<p class="sub">Todavía no hay registros. Jugá el primer reto para empezar el diario.</p>'}
    <button class="sbtn ghost" data-close>Cerrar</button>`)}
function insigniasSheet(){sfx('tap');const b=badges();
  sheet(`<h2>Insignias</h2><p class="sub">Una por semana completa. Con las cuatro, Kuska llega a adulto.</p><div class="b4">${WA.map((k,i)=>`<div class="${b.includes(i+1)?'':'off'}"><img src="img/${GA[k].ins}.webp" alt=""><span class="bigpill" style="background:${GA[k].c};font-size:${gx(7)};padding:${gx(3)} ${gx(6)};box-shadow:none">${GA[k].n.toUpperCase()}</span>${GA[k].n}</div>`).join('')}</div><button class="sbtn ghost" data-close>Cerrar</button>`)}
function selloSheet(){sfx('tap');sheet(`<div style="display:flex;gap:${gx(16)};align-items:center"><img src="img/k45_star.webp" alt="" style="width:${gx(90)};${isCert()?'':'filter:grayscale(.6);opacity:.7'}"><div><h2>Sello de adoptante</h2><p class="sub" style="margin:${gx(6)} 0 0">${isCert()?`¡Lo ganaste con ${pct()} % de preparación!`:`Se desbloquea al terminar los 12 retos con 80 % o más de preparación. Vas ${pct()} %.`}</p></div></div><button class="sbtn ghost" data-close>Cerrar</button>`)}
function tipSheet(i){const r=RT[i],k=areaOf(i);sheet(`<p class="eyb" style="color:${GA[k].d}">${GA[k].n} · Semana ${r.w}</p><h2 style="margin-top:${gx(4)}">${r.n}</h2><p class="sub" style="font-size:${gx(14.5)};color:var(--ink2)">${r.tip}</p><button class="sbtn ghost" data-close>Cerrar</button>`)}
function menuSheet(){sheet(`<h2>Menú</h2><div class="menu">
  <button data-m="app">${icm('f_arrow',15.5,11)} Volver a la app</button><button data-m="how">${icm('f_info',16.5,16.5)} Cómo se juega</button><button data-m="reset">${icm('f_repeat',15,15)} Reiniciar la demo</button></div>
  <button class="sbtn" data-close>Seguir jugando</button>`);
  $g('#sheet').querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const m=b.dataset.m;
    if(m==='app'){closeSheet();go('inicio')}
    if(m==='how')howSheet();
    if(m==='reset'){resetGame();closeSheet();draw();toast('Demo reiniciada')}})}
function howSheet(){sheet(`<h2>Cómo se juega</h2><p class="sub" style="color:var(--ink2);font-size:${gx(14)}">Son 4 semanas, una por tema: alimentación, salud, higiene y comportamiento. Cada semana tiene 3 retos.</p>
  <p class="sub" style="color:var(--ink2);font-size:${gx(14)}">En cada reto elegís qué hacer y después lo hacés con un gesto: deslizar, arrastrar, mantener presionado o frotar.</p>
  <p class="sub" style="color:var(--ink2);font-size:${gx(14)}">Si acertás a la primera sumás 1 punto; si lo corregís, medio. Con 80 % o más te certificás como adoptante.</p><button class="sbtn" data-close>Entendido</button>`)}

/* ---------- pantallas intermedias ---------- */
SCR.carta={bg:'#34296D',sbg:'#34296D',dark:true,fit:true,html:()=>{const r=R?RT[R.i]:RT[0],k=R?areaOf(R.i):'ali';return `<div class="a" style="inset:0">${sparks(16,7)}</div>
  <div class="a cglow" style="${box(61,204,280,300)}"></div>
  <div class="a cslot" style="${box(101,768,200,14)};--sc:${GA[k].c}"><i></i></div><div class="a cchev" style="${box(186,722,30,30)}"><i></i><i></i></div>
  <div class="a cflip" style="${box(83.5,226.5,239.5,258.5)};overflow:visible"><div class="cdr"><img src="img/d_card.webp" alt="" style="width:100%;height:100%"><i class="cshine"></i></div></div>
  <h1 class="a ttl cin" style="${box(39,530,323)};margin:0;font:500 ${U(24)}/1.3 var(--display);color:#fff;text-align:center;animation-delay:1.25s">Carta desbloqueada</h1>
  <p class="a cin" style="${box(40,574,322)};margin:0;font:600 ${U(13)}/1.4 var(--display);color:${GA[k].c};text-align:center;animation-delay:1.45s">${GA[k].n} · ${r.n}</p>
  <p class="a cin" style="${box(60,606,282)};margin:0;font:300 ${U(12.5)}/1.6 var(--text);color:#E1DBFF;text-align:center;animation-delay:1.6s">Tocá para ver qué aprendiste</p>`},
  mount(el){sfx('flip');setTimeout(()=>sfx('badge'),1150);return cartaDrop(el)}};
/* v20: la carta se arrastra hacia abajo hasta la ranura (o se toca) y se va */
function cartaDrop(el){const cd=el.querySelector('.cdr'),fl=el.querySelector('.cflip'),sl=el.querySelector('.cslot'),gl=el.querySelector('.cglow'),ch=el.querySelector('.cchev');
  let ready=false,gone=false,drag=null,t0=setTimeout(()=>{ready=true;fl.style.animation='none';fl.style.opacity=1;el.classList.add('cready')},1250);
  const need=()=>{const a=fl.getBoundingClientRect(),b=sl.getBoundingClientRect();return b.top+b.height/2-(a.top+a.height/2)};
  const setP=(dx,dy)=>{const p=Math.max(0,Math.min(1,dy/need()));cd.style.transform=`translate(${dx*.35}px,${dy}px) rotate(${dx*.04}deg) scale(${1-p*.18})`;sl.style.setProperty('--p',p);if(gl)gl.style.opacity=1-p;if(ch)ch.style.opacity=1-p*2};
  const leave=()=>{if(gone)return;gone=true;clearTimeout(t0);el.classList.add('cready');fl.style.animation='none';fl.style.opacity=1;sfx('slide');
    const d=need();cd.style.transition='transform .55s cubic-bezier(.5,0,.75,0),opacity .2s .4s';cd.style.transform=`translate(0,${d}px) scale(.42)`;cd.style.opacity=0;if(gl)gl.style.opacity=0;if(ch)ch.style.opacity=0;
    setTimeout(()=>{sl.classList.add('in');sfx('badge');vib&&vib(20)},500);setTimeout(()=>go('juego',{replace:true}),1150)};
  fl.addEventListener('pointerdown',e=>{if(!ready||gone)return;e.preventDefault();e.stopPropagation();drag={x:e.clientX,y:e.clientY,m:0};cd.style.transition='none';fl.setPointerCapture&&fl.setPointerCapture(e.pointerId);sfx('drag')});
  fl.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=Math.max(0,e.clientY-drag.y)+Math.min(0,e.clientY-drag.y)*.15;drag.m=Math.max(drag.m,Math.hypot(dx,dy));setP(dx,dy)});
  const up=e=>{if(!drag)return;const dy=e.clientY-drag.y,m=drag.m;drag=null;if(m<8||dy>need()*.45){leave();return}
    cd.style.transition='transform .45s cubic-bezier(.3,1.5,.5,1)';cd.style.transform='';sl.style.setProperty('--p',0);if(gl)gl.style.opacity='';if(ch)ch.style.opacity=''};
  fl.addEventListener('pointerup',up);fl.addEventListener('pointercancel',up);
  el.addEventListener('click',e=>{if(!ready||e.target.closest('.cflip'))return;leave()});
  return()=>clearTimeout(t0)}
SCR.reintentar={bg:'#34296D',sbg:'#34296D',dark:true,fit:true,html:()=>`<div class="a" style="inset:0">${sparks(16,11)}</div>
  ${img('d_retry',76.5,224.5,250,255.5,'medal','')}<h1 class="a" style="${box(39,530,323)};margin:0;font:500 ${U(24)}/1.3 var(--display);color:#fff;text-align:center">Volvé a intentar</h1>
  <p class="a" style="${box(92,586,217)};margin:0;font:300 ${U(12)}/1.6 var(--text);color:#E1DBFF;text-align:center">La carta se gana corrigiendo. Mirá qué tenés que tener en cuenta.</p>`,
  mount(el){sfx('casi');const nx=()=>{clearTimeout(t);if(R)startReto(R.i);go('juego',{replace:true})};const t=setTimeout(nx,2200);el.onclick=nx;return()=>clearTimeout(t)}};
SCR.semana={bg:'#fff',fit:true,html:()=>{const w=R?RT[R.i].w:Math.max(1,badges().length),k=WA[w-1],A=GA[k],stage=STG[w-1];
  return `<div class="a" style="inset:0;background:linear-gradient(${A.g[0]},${A.g[1]})"></div><div class="a" style="inset:0">${sparks(14,w*5,[A.c,'#fff',A.c])}</div>
  <p class="a ctr" style="${box(0,96,402)};margin:0;font:500 ${U(11)}/1 var(--text);color:${A.c};letter-spacing:.04em">SEMANA ${w} COMPLETA</p>
  <div class="a" style="${box(76,150,250,250)}"><img src="img/${A.ins}.webp" alt="" style="position:absolute;inset:0;width:100%;filter:grayscale(1);opacity:.16"><img class="rv rv-up" src="img/${A.ins}.webp" alt="Insignia de ${A.n}" style="position:absolute;inset:0;width:100%"><i class="a rvglow" style="inset:0"></i></div>
  <div class="a bigpill cin" style="${box(97,512,208,44)};background:${A.c};animation-delay:1.9s">${A.n.toUpperCase()}</div>
  <h1 class="a ctr rv rv-lr" style="${box(40,616,323)};margin:0;font:500 ${U(25)}/1.3 var(--display);color:var(--ink)">${w<4?'¡Bien, Kuska<br>sigue creciendo!':'¡Kuska ya es adulto!'}</h1>
  <p class="a ctr cin" style="${box(40,700,323)};margin:0;font:300 ${U(12)}/1.4 var(--text);color:var(--ink);animation-delay:2.2s">Etapa superada: ${stage} - Preparación ${pct()}%</p>
  <button class="a btn cin" id="wk" style="${box(38,753,327,50)};animation-delay:2.4s">${w<4?`Seguir con la semana ${w+1}`:'Ver mi resultado'}</button>`},
  mount(el){sfx('hold');setTimeout(()=>sfx('badge'),1900);vib([15,60,15]);$('#wk',el).onclick=()=>{const w=R?RT[R.i].w:4;if(w<4){startReto(w*3);go('juego',{replace:true})}else{R=null;go(isCert()?'certificado':'resultado',{replace:true})}}}};
SCR.certificado={bg:'#fff',fit:true,html:()=>`<div class="a" style="inset:0;background:linear-gradient(#fff 0%,#F6E9FD 60%,#EBD3F8 100%)"></div>
  <div class="a" style="inset:0">${sparks(18,21,['#C15DE5','#2E7BFF','#FF9F1C','#8EC426','#E22CB4'])}</div>
  <div class="a" style="${box(66,120,270,270)}"><img src="img/k45_star.webp" alt="" style="position:absolute;inset:0;width:100%;filter:grayscale(1);opacity:.16"><img class="rv rv-up" src="img/k45_star.webp" alt="Sello de adoptante certificado" style="position:absolute;inset:0;width:100%"></div>
  <div class="a bigpill" style="${box(57,512,288,44)};background:#C15DE5">ADOPTANTE CERTIFICADO</div>
  <h1 class="a ctr rv rv-lr" style="${box(40,628,323)};margin:0;font:500 ${U(25)}/1.3 var(--display);color:var(--ink)">¡Lo lograste!</h1>
  <p class="a ctr" style="${box(80,678,242)};margin:0;font:300 ${U(12.5)}/1.6 var(--text);color:var(--ink)">Llegaste a un ${pct()}% de preparación.<br><b style="font-weight:600">Ya podés postularte para adoptar</b>.</p>
  <button class="a btn" id="vr" style="${box(38,753,327,50)}">Ver resultados</button>`,
  mount(el){sfx('cert');vib([20,80,20,80,60]);$('#vr',el).onclick=()=>go('resultado',{replace:true})}};

/* anillo de progreso con los 4 colores de área */
function ring(p,size,dark){const r=42,C=2*Math.PI*r,seg=p/100*C/4,cols=['#8EC426','#E22CB4','#2E7BFF','#FF9F1C'];let h='';
  cols.forEach((c,i)=>{h+=`<circle class="rs" data-len="${seg}" cx="50" cy="50" r="${r}" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="butt" stroke-dasharray="0 ${C}" stroke-dashoffset="${-i*seg}" transform="rotate(-90 50 50)"/>`});
  const knob=t=>{const ang=-Math.PI/2+t/C*2*Math.PI;return [50+Math.cos(ang)*r,50+Math.sin(ang)*r]};
  cols.forEach((c,i)=>{const [x,y]=knob((i+1)*seg);h+=`<circle class="rk" cx="${x}" cy="${y}" r="6" fill="${c}" stroke="#fff" stroke-width="2.5" style="opacity:0;transform-origin:${x}px ${y}px;transform:scale(.3)"/>`});
  return `<div class="ring" data-p="${p}" style="width:${U(size)};height:${U(size)}"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="${r}" fill="none" stroke="${dark?'rgba(255,255,255,.08)':'#F1EFF8'}" stroke-width="6"/>${h}</svg><div class="n" style="color:${dark?'#fff':'var(--ink)'};opacity:0"><span>0</span><sup>%</sup></div></div>`}
/* el anillo se carga color por color y después aparece el número */
function animRing(el){const R_=el.querySelector('.ring');if(!R_)return()=>{};const segs=[...R_.querySelectorAll('.rs')],ks=[...R_.querySelectorAll('.rk')],n=R_.querySelector('.n'),p=+R_.dataset.p,C=2*Math.PI*42,D=520,T0=350;let tm=[],rf=[];const loud=/^#resultado/.test(location.hash);
  segs.forEach((c,i)=>tm.push(setTimeout(()=>{c.style.transition=`stroke-dasharray ${D}ms cubic-bezier(.4,.1,.4,1)`;c.setAttribute('stroke-dasharray',`${c.dataset.len} ${C}`);if(loud)sfx('ring');
    tm.push(setTimeout(()=>{const k=ks[i];k.style.transition='opacity .2s,transform .35s cubic-bezier(.3,1.6,.5,1)';k.style.opacity=1;k.style.transform='scale(1)'},D-40))},T0+i*D)));
  tm.push(setTimeout(()=>{n.style.transition='opacity .4s,transform .5s cubic-bezier(.3,1.4,.5,1)';n.style.transform='scale(.85)';requestAnimationFrame(()=>{n.style.opacity=1;n.style.transform='scale(1)'});
    const sp=n.querySelector('span'),t0=performance.now();const step=t=>{const f=Math.min(1,(t-t0)/700);sp.textContent=Math.round(p*(1-Math.pow(1-f,3)));if(f<1)rf.push(requestAnimationFrame(step))};rf.push(requestAnimationFrame(step));
    if(p&&loud)sfx('ok')},T0+4*D+80));
  return()=>{tm.forEach(clearTimeout);rf.forEach(cancelAnimationFrame)}}
function areaRows(y0,dark){const v=areaVals(),order=['com','sal','hig','ali'];return order.map((k,i)=>`<div class="arow" style="top:${U(y0+i*55)}"><span class="ic" style="background:${GA[k].p}">${ic(GA[k].t,GA[k].tw[0]*.5,GA[k].tw[1]*.5,`color:${GA[k].c}`)}</span><span style="color:${dark?'#fff':'var(--ink)'}">${GA[k].n}</span><div class="tk" style="${dark?'':'background:#EEEAF5'}"><i data-w="${v[k]}" style="background:${GA[k].c}"></i><b data-w="${v[k]}" style="background:${GA[k].c}"></b></div></div>`).join('')}
function animRows(el){requestAnimationFrame(()=>requestAnimationFrame(()=>el.querySelectorAll('.tk [data-w]').forEach(x=>{if(x.tagName==='I')x.style.width=x.dataset.w+'%';else x.style.left=x.dataset.w+'%'})))}
const tipKuska=(y,dark)=>`<div class="a tipin" style="inset:0;pointer-events:none"><div style="pointer-events:auto"><img class="a kuska ktipin" src="img/rk_313.webp" alt="Kuska" style="left:${U(4)};top:${U(y-6)};height:${U(120)};width:auto"></div><div class="a lcard" style="${box(92,y+22,282,56)};background:var(--lime);border-radius:${U(8)};padding:${U(9)} ${U(14)};font:300 ${U(11.5)}/1.4 var(--text);color:var(--ink2);box-shadow:0 ${U(4)} 0 rgba(0,0,0,.12)"><b style="font-weight:600">¡Mirá todo lo que aprendiste!</b><br>Cada tema completado te acerca a una convivencia más responsable.</div></div>`;
SCR.resultado={bg:'#34296D',sbg:'#34296D',dark:true,html:()=>{const c=isCert(),v=areaVals(),weak=RT.map((r,i)=>i).filter(i=>Gs().res.some(x=>x.i===i&&x.pts<1));
  const H=weak.length?1000+weak.length*84+320:1264;
  return `<div class="fr" style="height:${U(H)};background:#3D2F86">
  <div class="a" style="${box(0,0,402,330)};background:#34296D;clip-path:polygon(0 0,100% 0,100% 72%,50% 100%,0 72%)"></div><div class="a" style="${box(0,0,402,330)}">${sparks(16,31)}</div>
  <h1 class="a ctr" style="${box(20,96,362)};margin:0;font:500 ${U(22)}/1.3 var(--display);color:#fff">${c?'¡Adopción desbloqueada!':Gs().done?'Resultado orientativo':'Todavía en camino'}</h1>
  <div class="a" style="${box(126,140)}">${ring(pct(),150,true)}</div>
  ${c?'':`<p class="a ctr" style="${box(40,302,322)};margin:0;font:300 ${U(12.5)}/1.5 var(--text);color:#E1DBFF">Con 80 % o más desbloqueás la adopción.</p>`}
  ${tipKuska(445,true)}
  ${areaRows(620,true)}
  ${weak.length?`<div class="a" style="${box(0,930,402,H-930)};background:#34296D;border-radius:${U(60)} ${U(60)} 0 0"></div><h2 class="a" style="${box(44,960)};margin:0;font:600 ${U(17)}/1 var(--display);color:#fff">Para repasar</h2>
    <div class="a" style="${box(20,1000,362)}">${weak.map(i=>`<div class="rev"><span class="ic">${ic(GA[areaOf(i)].t,GA[areaOf(i)].tw[0]*.55,GA[areaOf(i)].tw[1]*.55)}</span><div><b>${RT[i].n}</b><span>${RT[i].tip}</span></div></div>`).join('')}</div>`:''}
  <button class="a btn" id="rA" style="${box(38,H-270,327,46)}">${c?'Conocer a mis amigos':'Repetir la demo'}</button>
  <button class="a btn2" id="rC" style="${box(38,H-210,157,44)}">${c?'Mi progreso':'Ver animales'}</button><button class="a btn2" id="rD" style="${box(208,H-210,157,44)}">Ir al inicio</button>
  <div class="a ctr" style="${box(0,H-140,402)}"><button class="lnk" id="rB" style="color:#9A8CFF">Volver a la Demo</button></div></div>`},
  mount(el){const stop=animRing(el);setTimeout(()=>animRows(el),2300);$('#rA',el).onclick=()=>{sfx('sel');if(isCert())go('catalogo');else{resetGame();go('juego',{replace:true})}};
    $('#rC',el).onclick=()=>{sfx('tap');go(isCert()?'progreso':'catalogo')};$('#rD',el).onclick=()=>{sfx('tap');R=null;go('inicio',{root:true})};
    $('#rB',el).onclick=()=>{R=null;go('juego',{replace:true})};$$('.kuska',el).forEach(k=>k.onclick=()=>react(k,'wiggle'));return stop}};

/* ---------- 18 · Mi progreso (Progreso / Insignias) ---------- */
SCR.progreso={bg:'#F7F5FF',sbg:'#F7F5FF',bar:null,html:()=>{const b=badges(),g=Gs(),wk=week();
  return `<div class="fr" style="height:${U(1000)}">
  <button class="a ib" data-go="back" aria-label="Volver" style="${box(20,76,30,30)}">${ic('i_back',17,14,'margin:auto')}</button>
  <h1 class="a ctr h-disp" style="${box(0,80,402)};margin:0;font-weight:700;font-size:${U(16)};color:var(--ink2);pointer-events:none">Mi progreso</h1>
  <button class="a bell" data-toast="Tus notificaciones llegan en el paso 5" aria-label="Notificaciones" style="${box(357,78,24,26)}">${ic('i_bell',19,21.5)}</button>
  <div class="a seg" id="pseg" style="${box(20,156,362,50)};background:#EEEAFB;border-radius:999px;padding:${U(4)}"><i style="top:${U(4)};height:calc(100% - ${U(8)});left:${U(4)}"></i><button class="on" style="width:50%">Progreso</button><button style="width:50%">Insignias</button></div>
  <div id="pv1"><div class="a" style="${box(0,206,402,360)};background:#fff;clip-path:ellipse(75% 100% at 50% 0)"></div>
    <div class="a" style="${box(126,240)}">${ring(pct(),150,false)}</div>
    ${tipKuska(430,false)}${areaRows(560,false)}</div>
  <div id="pv2" hidden>${WA.map((k,i)=>{const done=b.includes(i+1),cur=!g.done&&wk===i+1,A=GA[k],n=Math.max(0,Math.min(3,g.prog-i*3));
    return `<div class="a" style="${box(i%2?212:20,232+Math.floor(i/2)*240,170,220)};background:${done?A.p:'#fff'};border-radius:${U(6)};${cur?`border:2px solid ${A.c};`:''}box-shadow:0 ${U(4)} ${U(14)} ${U(-8)} rgba(40,32,85,.25)">
      <img src="img/${A.ins}.webp" alt="" style="position:absolute;left:${U(25)};top:${U(16)};width:${U(120)};${done||cur?'':'filter:grayscale(1);opacity:.25'}">${!done&&!cur?`<img src="img/lockc.webp" alt="" style="position:absolute;left:${U(68)};top:${U(64)};width:${U(34)}">`:''}
      <div class="bigpill" style="position:absolute;left:${U(18)};right:${U(18)};top:${U(150)};height:${U(26)};background:${A.c};font-size:${U(10)};${done||cur?'':'opacity:.25'}">${A.n.toUpperCase()}</div>
      <p class="p ctr" style="position:absolute;left:0;right:0;top:${U(184)};margin:0;font-size:${U(10.5)};color:${done?A.d:'#8B8B8B'}">${done?'Completada':cur?`En curso · ${n} de 3`:'Bloqueada'}</p></div>`}).join('')}</div></div>`},
  mount(el){const stop=animRing(el);setTimeout(()=>animRows(el),2300);const seg=$('#pseg',el),i=$('i',seg),bs=$$('button',seg);
    const set=n=>{bs.forEach((b,j)=>b.classList.toggle('on',j===n));i.style.width=bs[n].offsetWidth+'px';i.style.transform=`translateX(${bs[n].offsetLeft-bs[0].offsetLeft}px)`;$('#pv1',el).hidden=n!==0;$('#pv2',el).hidden=n!==1;sfx('toggle')};
    requestAnimationFrame(()=>{set(/[?&]ins\b/.test(location.hash)?1:0)});bs.forEach((b,n)=>b.onclick=()=>set(n));$$('.kuska',el).forEach(k=>k.onclick=()=>react(k,'wiggle'));return stop}};
delete SOON.demo;delete SOON.progreso;

/* v19: la tarjeta «Descubrí» primero gira y después se despliega */
document.addEventListener('click',e=>{
  const sm=e.target.closest('.disc summary');if(!sm)return;
  const d=sm.parentElement;e.preventDefault();
  if(d.classList.contains('flip'))return;
  if(d.open){d.open=false;return}
  d.classList.add('flip');
  setTimeout(()=>{d.open=true},560);
  setTimeout(()=>d.classList.remove('flip'),720);
},true);
