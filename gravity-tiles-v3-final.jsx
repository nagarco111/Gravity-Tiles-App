// ╔══════════════════════════════════════════════════════════════╗
// ║   GRAVITY TILES — Final Production v3.0                     ║
// ║   بلاط الجاذبية — النسخة النهائية الاحترافية                ║
// ║                                                              ║
// ║   << ADMOB >> ابحث عن هذا التعليق لأماكن ربط الإعلانات     ║
// ╚══════════════════════════════════════════════════════════════╝

import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// ══════════════════════════════════════════════════════
//  §1  LOCALIZATION  — كل النصوص في مكان واحد
// ══════════════════════════════════════════════════════
const STRINGS = {
  ar: {
    appName:      "بلاط الجاذبية",
    appSub:       "GRAVITY TILES",
    tagline:      "وجّه الكرة · فكّر · انتصر",
    play:         "🎮   العب الآن",
    shop:         "🛍   المتجر",
    stats:        "📊   إحصائياتي",
    levelLabel:   "مستوى",
    star:         "نجمة",
    hint:         "تلميح",
    back:         "← رجوع",
    chooseLvl:    "اختر المستوى",
    par:          "PAR",
    moves:        "تحركاتك",
    launch:       "🚀 أطلق!",
    reset:        "🔄",
    hintBtn:      "💡",
    win:          "مبروك!",
    winSub:       "تحرك — PAR",
    next:         "التالي →",
    complete:     "🏆 اكتمل!",
    fail_loop:    "🔄 حلقة لا نهاية لها!",
    fail_oob:     "💨 خرجت من الحدود!",
    tryAgain:     "حاول مجدداً",
    prevRecord:   "🏆 سجلك السابق",
    statsTitle:   "📊 إحصائياتي",
    totalStars:   "من أصل",
    starLabel:    "نجمة",
    doneLabel:    "مكتمل",
    threeLabel:   "٣ نجوم",
    leftLabel:    "متبقي",
    shopTitle:    "🛍 المتجر",
    removeAds:    "إزالة الإعلانات",
    removeAdsSub: "استمتع باللعب بدون انقطاع إلى الأبد",
    activated:    "✅ مفعّل",
    hints5:       "حزمة ٥ تلميحات",
    hints5Sub:    "تلميح يظهر الخطوة الصحيحة",
    freeHint:     "تلميح مجاني 🎁",
    freeHintSub:  "شاهد إعلاناً قصيراً ← تلميح مجاني",
    free:         "مجاناً",
    demoNote:     "المشتريات تجريبية — اربطها بـ Google Play Billing",
    hintsNow:     "💡 تلميحاتك الحالية",
    adTitle:      "📢 إعلان",
    adSub:        "شاهد هذا الإعلان لمدة ٥ ثوانٍ للمتابعة",
    adBtn:        "متابعة →",
    adSkip:       "تخطي بعد",
    groupBeginner:"مبتدئ",
    groupMedium:  "متوسط",
    groupAdvanced:"متقدم",
    groupExpert:  "خبير",
    lang:         "EN",
  },
  en: {
    appName:      "Gravity Tiles",
    appSub:       "بلاط الجاذبية",
    tagline:      "Guide the ball · Think · Win",
    play:         "🎮   Play Now",
    shop:         "🛍   Shop",
    stats:        "📊   My Stats",
    levelLabel:   "Level",
    star:         "Stars",
    hint:         "Hints",
    back:         "← Back",
    chooseLvl:    "Choose Level",
    par:          "PAR",
    moves:        "Moves",
    launch:       "🚀 Launch!",
    reset:        "🔄",
    hintBtn:      "💡",
    win:          "Congrats!",
    winSub:       "moves — PAR",
    next:         "Next →",
    complete:     "🏆 Complete!",
    fail_loop:    "🔄 Infinite loop!",
    fail_oob:     "💨 Out of bounds!",
    tryAgain:     "Try Again",
    prevRecord:   "🏆 Your record",
    statsTitle:   "📊 My Stats",
    totalStars:   "out of",
    starLabel:    "stars",
    doneLabel:    "Done",
    threeLabel:   "3-Star",
    leftLabel:    "Left",
    shopTitle:    "🛍 Shop",
    removeAds:    "Remove Ads",
    removeAdsSub: "Play uninterrupted forever",
    activated:    "✅ Active",
    hints5:       "5-Hint Pack",
    hints5Sub:    "A hint reveals the next correct move",
    freeHint:     "Free Hint 🎁",
    freeHintSub:  "Watch a short ad ← get a free hint",
    free:         "Free",
    demoNote:     "Purchases are demo — connect Google Play Billing before publishing",
    hintsNow:     "💡 Your hints",
    adTitle:      "📢 Advertisement",
    adSub:        "Watch this ad for 5 seconds to continue",
    adBtn:        "Continue →",
    adSkip:       "Skip in",
    groupBeginner:"Beginner",
    groupMedium:  "Medium",
    groupAdvanced:"Advanced",
    groupExpert:  "Expert",
    lang:         "عر",
  },
};

// ══════════════════════════════════════════════════════
//  §2  LEVELS DATA
// ══════════════════════════════════════════════════════
const LEVELS = [
  {id:1,  group:"groupBeginner", title:{ar:"البداية",  en:"Starter"},   rows:3,cols:3, start:[0,0],exit:[2,2],par:1,
   cells:[{d:1,l:1},{d:2,l:0},{d:2,l:1},{d:0,l:1},{d:1,l:1},{d:2,l:1},{d:1,l:1},{d:1,l:1},{d:0,l:1}]},
  {id:2,  group:"groupBeginner", title:{ar:"الدفة",    en:"The Rudder"}, rows:3,cols:3, start:[0,0],exit:[0,2],par:2,
   cells:[{d:1,l:1},{d:1,l:0},{d:0,l:1},{d:0,l:1},{d:2,l:1},{d:0,l:1},{d:1,l:1},{d:3,l:0},{d:3,l:1}]},
  {id:3,  group:"groupBeginner", title:{ar:"الزاوية",  en:"Corner"},     rows:3,cols:3, start:[0,0],exit:[2,0],par:1,
   cells:[{d:2,l:1},{d:3,l:0},{d:2,l:1},{d:2,l:1},{d:0,l:1},{d:2,l:1},{d:0,l:1},{d:1,l:0},{d:3,l:1}]},
  {id:4,  group:"groupBeginner", title:{ar:"الجسر",    en:"Bridge"},     rows:3,cols:4, start:[0,0],exit:[2,3],par:1,
   cells:[{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:2,l:1},{d:0,l:1},{d:0,l:0},{d:0,l:1},{d:2,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:0,l:1}]},
  {id:5,  group:"groupMedium",   title:{ar:"المتاهة",  en:"Maze"},       rows:4,cols:4, start:[0,0],exit:[3,3],par:2,
   cells:[{d:1,l:1},{d:0,l:0},{d:0,l:0},{d:2,l:1},{d:2,l:1},{d:3,l:1},{d:3,l:1},{d:2,l:1},{d:1,l:1},{d:1,l:1},{d:0,l:0},{d:2,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:0,l:1}]},
  {id:6,  group:"groupMedium",   title:{ar:"الدوامة",  en:"Vortex"},     rows:4,cols:4, start:[0,3],exit:[3,0],par:3,
   cells:[{d:3,l:1},{d:3,l:0},{d:3,l:1},{d:2,l:1},{d:2,l:1},{d:0,l:1},{d:0,l:0},{d:2,l:1},{d:2,l:1},{d:1,l:0},{d:3,l:1},{d:2,l:1},{d:0,l:1},{d:0,l:1},{d:3,l:0},{d:3,l:1}]},
  {id:7,  group:"groupMedium",   title:{ar:"الأفق",    en:"Horizon"},    rows:4,cols:4, start:[1,0],exit:[1,3],par:2,
   cells:[{d:2,l:1},{d:0,l:1},{d:0,l:1},{d:3,l:1},{d:1,l:1},{d:0,l:0},{d:1,l:0},{d:0,l:1},{d:0,l:1},{d:1,l:1},{d:3,l:0},{d:3,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:0,l:1}]},
  {id:8,  group:"groupMedium",   title:{ar:"الصليب",   en:"Cross"},      rows:5,cols:5, start:[2,0],exit:[2,4],par:2,
   cells:[{d:0,l:1},{d:0,l:1},{d:0,l:1},{d:0,l:1},{d:0,l:1},{d:2,l:1},{d:0,l:0},{d:0,l:0},{d:0,l:0},{d:2,l:1},{d:1,l:1},{d:1,l:0},{d:1,l:1},{d:1,l:0},{d:0,l:1},{d:2,l:1},{d:0,l:0},{d:0,l:0},{d:0,l:0},{d:2,l:1},{d:2,l:1},{d:2,l:1},{d:2,l:1},{d:2,l:1},{d:2,l:1}]},
  {id:9,  group:"groupAdvanced", title:{ar:"الشبكة",   en:"Grid"},       rows:5,cols:5, start:[0,0],exit:[4,4],par:3,
   cells:[{d:1,l:1},{d:0,l:0},{d:2,l:1},{d:0,l:1},{d:3,l:1},{d:2,l:1},{d:0,l:0},{d:0,l:0},{d:1,l:0},{d:2,l:1},{d:1,l:1},{d:3,l:1},{d:1,l:1},{d:2,l:1},{d:3,l:1},{d:1,l:1},{d:3,l:1},{d:1,l:1},{d:0,l:0},{d:2,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:0,l:1}]},
  {id:10, group:"groupAdvanced", title:{ar:"الحلزون",  en:"Spiral"},     rows:5,cols:5, start:[2,2],exit:[0,4],par:4,
   cells:[{d:1,l:1},{d:1,l:0},{d:1,l:1},{d:1,l:1},{d:0,l:1},{d:0,l:1},{d:2,l:1},{d:3,l:0},{d:2,l:1},{d:0,l:1},{d:0,l:0},{d:0,l:1},{d:0,l:1},{d:0,l:1},{d:0,l:1},{d:1,l:1},{d:3,l:0},{d:3,l:1},{d:2,l:0},{d:3,l:1},{d:1,l:1},{d:1,l:1},{d:3,l:1},{d:3,l:1},{d:3,l:1}]},
  {id:11, group:"groupAdvanced", title:{ar:"الكهف",    en:"Cave"},       rows:5,cols:5, start:[4,0],exit:[0,4],par:4,
   cells:[{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:0,l:1},{d:0,l:1},{d:2,l:0},{d:3,l:1},{d:2,l:1},{d:0,l:1},{d:0,l:1},{d:0,l:1},{d:0,l:0},{d:0,l:1},{d:0,l:1},{d:0,l:1},{d:2,l:1},{d:1,l:0},{d:2,l:0},{d:3,l:1},{d:0,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1}]},
  {id:12, group:"groupAdvanced", title:{ar:"الوادي",   en:"Valley"},     rows:5,cols:6, start:[0,0],exit:[4,5],par:4,
   cells:[{d:1,l:1},{d:0,l:0},{d:0,l:1},{d:2,l:1},{d:0,l:0},{d:3,l:1},{d:2,l:1},{d:0,l:0},{d:1,l:0},{d:0,l:1},{d:1,l:0},{d:2,l:1},{d:1,l:1},{d:3,l:1},{d:2,l:1},{d:3,l:1},{d:2,l:0},{d:2,l:1},{d:1,l:1},{d:3,l:1},{d:0,l:0},{d:0,l:1},{d:0,l:0},{d:2,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:0,l:1}]},
  {id:13, group:"groupExpert",   title:{ar:"العملاق",  en:"Giant"},      rows:6,cols:6, start:[0,0],exit:[5,5],par:5,
   cells:[{d:1,l:1},{d:0,l:0},{d:2,l:1},{d:0,l:1},{d:2,l:1},{d:3,l:1},{d:2,l:1},{d:0,l:0},{d:0,l:0},{d:1,l:0},{d:0,l:0},{d:2,l:1},{d:1,l:1},{d:3,l:1},{d:1,l:1},{d:2,l:1},{d:3,l:0},{d:2,l:1},{d:1,l:1},{d:3,l:1},{d:1,l:1},{d:0,l:0},{d:1,l:1},{d:2,l:1},{d:1,l:1},{d:3,l:0},{d:0,l:1},{d:1,l:1},{d:0,l:0},{d:2,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:1,l:1},{d:0,l:1}]},
  {id:14, group:"groupExpert",   title:{ar:"الأسطورة", en:"Legend"},     rows:6,cols:6, start:[0,5],exit:[5,0],par:6,
   cells:[{d:2,l:1},{d:3,l:0},{d:3,l:1},{d:3,l:1},{d:3,l:1},{d:2,l:1},{d:2,l:1},{d:0,l:1},{d:1,l:0},{d:1,l:1},{d:0,l:0},{d:2,l:1},{d:2,l:1},{d:0,l:1},{d:2,l:1},{d:3,l:0},{d:3,l:1},{d:2,l:1},{d:2,l:1},{d:0,l:0},{d:0,l:0},{d:0,l:1},{d:3,l:1},{d:3,l:1},{d:2,l:1},{d:2,l:1},{d:1,l:1},{d:0,l:1},{d:1,l:0},{d:1,l:1},{d:0,l:1},{d:1,l:1},{d:1,l:0},{d:3,l:1},{d:0,l:1},{d:3,l:1}]},
  {id:15, group:"groupExpert",   title:{ar:"النهاية",  en:"The End"},    rows:6,cols:6, start:[5,5],exit:[0,0],par:7,
   cells:[{d:0,l:1},{d:3,l:1},{d:3,l:0},{d:3,l:1},{d:3,l:1},{d:3,l:1},{d:0,l:1},{d:0,l:1},{d:0,l:0},{d:2,l:1},{d:0,l:0},{d:2,l:1},{d:0,l:1},{d:2,l:0},{d:0,l:1},{d:0,l:1},{d:1,l:0},{d:2,l:1},{d:0,l:0},{d:0,l:1},{d:3,l:1},{d:2,l:1},{d:2,l:0},{d:2,l:1},{d:0,l:1},{d:0,l:1},{d:0,l:0},{d:0,l:1},{d:1,l:1},{d:2,l:1},{d:1,l:1},{d:1,l:0},{d:1,l:1},{d:0,l:0},{d:3,l:1},{d:0,l:1}]},
];

const ARROWS = ["↑","→","↓","←"];
const DR=[-1,0,1,0], DC=[0,1,0,-1];

// ══════════════════════════════════════════════════════
//  §3  CONTEXT
// ══════════════════════════════════════════════════════
const LangCtx  = createContext("ar");
const AudioCtx = createContext(null);
function useLang()  { return useContext(LangCtx);  }
function useAudio() { return useContext(AudioCtx); }
function T(s, key)  { return STRINGS[s][key] ?? STRINGS.ar[key]; }

// ══════════════════════════════════════════════════════
//  §4  AUDIO ENGINE
// ══════════════════════════════════════════════════════
function buildAudio(muted) {
  let ctx = null;
  const getCtx = () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  };
  const tone = (freq, dur, type="sine", vol=0.18) => {
    if (muted.current) return;
    try {
      const c=getCtx(), o=c.createOscillator(), g=c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type=type; o.frequency.value=freq;
      g.gain.setValueAtTime(vol, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime+dur);
      o.start(); o.stop(c.currentTime+dur);
    } catch {}
  };
  return {
    click:  ()=>tone(520,0.06,"square",0.1),
    step:   ()=>tone(680,0.04,"sine",0.07),
    hint:   ()=>{ tone(440,0.1); setTimeout(()=>tone(660,0.15),110); },
    launch: ()=>tone(320,0.12,"sawtooth",0.14),
    win:    ()=>{ tone(523,0.15); setTimeout(()=>tone(659,0.15),160); setTimeout(()=>tone(784,0.35),320); },
    fail:   ()=>{ tone(220,0.1,"sawtooth",0.18); setTimeout(()=>tone(180,0.25,"sawtooth",0.15),110); },
  };
}

// ══════════════════════════════════════════════════════
//  §5  GAME LOGIC
// ══════════════════════════════════════════════════════
function simulate(cells, cols, rows, start, exit_) {
  const path=[[...start]], seen=new Set([`${start[0]},${start[1]}`]);
  let [r,c]=start;
  for (let s=0;s<600;s++) {
    const cell=cells[r*cols+c];
    const nr=r+DR[cell.d], nc=c+DC[cell.d];
    if (nr<0||nr>=rows||nc<0||nc>=cols) return {path,result:"oob"};
    r=nr; c=nc; path.push([r,c]);
    if (r===exit_[0]&&c===exit_[1]) return {path,result:"win"};
    const key=`${r},${c}`;
    if (seen.has(key)) return {path,result:"loop"};
    seen.add(key);
  }
  return {path,result:"loop"};
}
const calcStars=(moves,par)=>moves<=par?3:moves<=par+2?2:1;

// ══════════════════════════════════════════════════════
//  §6  STORAGE
// ══════════════════════════════════════════════════════
const LS = {
  load: (k,def) => { try{const v=localStorage.getItem(k); return v?JSON.parse(v):def;}catch{return def;} },
  save: (k,v)   => { try{localStorage.setItem(k,JSON.stringify(v));}catch{} },
};

// ══════════════════════════════════════════════════════
//  §7  HAPTIC
// ══════════════════════════════════════════════════════
const haptic = {
  light: ()=>{ try{navigator.vibrate&&navigator.vibrate(16);}catch{} },
  win:   ()=>{ try{navigator.vibrate&&navigator.vibrate([40,20,80,20,120]);}catch{} },
  fail:  ()=>{ try{navigator.vibrate&&navigator.vibrate([70,40,70]);}catch{} },
};

// ══════════════════════════════════════════════════════
//  §8  WIN PARTICLES
// ══════════════════════════════════════════════════════
const PCOLS=["#00f0ff","#ff00c8","#ffe600","#7fff00","#fff","#ff9900"];
function Particles({active}){
  if(!active) return null;
  const pts=Array.from({length:36},(_,i)=>({
    x:10+Math.random()*80, delay:Math.random()*0.5,
    dur:0.8+Math.random()*0.7, size:4+Math.random()*8,
    color:PCOLS[i%PCOLS.length],
    tx:(Math.random()-0.5)*160, ty:-(60+Math.random()*100),
  }));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:1000,overflow:"hidden"}}>
      <style>{`@keyframes pfly{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0.1)}}`}</style>
      {pts.map((p,i)=>(
        <div key={i} style={{
          position:"absolute",left:`${p.x}%`,top:"48%",
          width:p.size,height:p.size,borderRadius:"50%",background:p.color,
          "--tx":`${p.tx}px`,"--ty":`${p.ty}px`,
          animation:`pfly ${p.dur}s ${p.delay}s ease-out forwards`,
        }}/>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════
//  §9  INTERSTITIAL AD MOCK
//  << ADMOB INTERSTITIAL >> replace contents of AdInterstitial
//  with AdMob.showInterstitialAd(adUnitId) when integrating
// ══════════════════════════════════════════════════════
function AdInterstitial({onClose, lang}){
  const s=STRINGS[lang];
  const [sec,setSec]=useState(5);
  useEffect(()=>{
    if(sec<=0) return;
    const t=setTimeout(()=>setSec(n=>n-1),1000);
    return()=>clearTimeout(t);
  },[sec]);
  return (
    <div style={{position:"fixed",inset:0,background:"#000000ee",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#0d0d20",border:"1.5px solid #333",borderRadius:20,padding:"32px 24px",textAlign:"center",maxWidth:300,width:"90%"}}>
        <div style={{fontSize:42,marginBottom:8}}>📢</div>
        <div style={{color:"#888",fontSize:14,fontWeight:700,marginBottom:6}}>{s.adTitle}</div>
        <div style={{background:"#1a1a2e",borderRadius:12,height:120,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,border:"1px solid #2a2a3a"}}>
          {/* << ADMOB INTERSTITIAL >> ضع هنا AdMob Banner/Interstitial Component */}
          <span style={{color:"#333",fontSize:12}}>[ AdMob Ad Unit ]<br/>ca-app-pub-XXXXX/YYYYY</span>
        </div>
        <div style={{color:"#555",fontSize:12,marginBottom:16}}>{s.adSub}</div>
        <button
          onClick={sec<=0?onClose:undefined}
          style={{
            background:sec<=0?"#00f0ff":"#1a1a2e",
            color:sec<=0?"#060612":"#444",
            border:`1px solid ${sec<=0?"#00f0ff":"#2a2a3a"}`,
            borderRadius:12,padding:"12px 28px",fontSize:14,fontWeight:700,
            cursor:sec<=0?"pointer":"not-allowed",width:"100%",transition:"all 0.3s",
          }}
        >
          {sec>0?`${s.adSkip} ${sec}s…`:s.adBtn}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
//  §10  SHARED STYLES
// ══════════════════════════════════════════════════════
const C={
  bg:"#060612", card:"#0d0d20", border:"#1a1a2e",
  cyan:"#00f0ff", pink:"#ff00c8", gold:"#ffe600", green:"#7fff00",
};
const pg =(dir="rtl")=>({
  minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column",
  fontFamily:"'Courier New',monospace",direction:dir,color:"#fff",overflow:"hidden",
});
const topBarStyle={
  display:"flex",justifyContent:"space-between",alignItems:"center",
  padding:"10px 14px 8px",borderBottom:`1px solid ${C.border}`,
  flexShrink:0,
};
const backBtnStyle=(lang)=>({
  background:"transparent",border:`1px solid ${C.border}`,color:"#555",
  padding:"6px 10px",borderRadius:8,cursor:"pointer",fontSize:13,
  fontFamily:"inherit",direction:lang==="ar"?"rtl":"ltr",
});
const bigBtn=(color,disabled=false)=>({
  background:disabled?`${color}10`:`${color}18`,border:`1.5px solid ${disabled?"#222":color}`,
  color:disabled?"#333":color,padding:"15px 20px",borderRadius:16,
  fontSize:15,fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",
  width:"100%",maxWidth:300,letterSpacing:0.5,
});

// ══════════════════════════════════════════════════════
//  §11  MENU SCREEN
// ══════════════════════════════════════════════════════
function MenuScreen({navigate,progress,hints,lang,setLang}){
  const s=STRINGS[lang];
  const totalStars=Object.values(progress).reduce((a,v)=>a+v,0);
  const done=Object.keys(progress).length;
  return (
    <div style={{...pg(lang==="ar"?"rtl":"ltr"),alignItems:"center",justifyContent:"center",position:"relative"}}>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes glow2{0%,100%{opacity:.7}50%{opacity:1}}
        @keyframes scan{0%{top:-2px}100%{top:100vh}}
        @keyframes twinkle{0%,100%{opacity:.1;transform:scale(1)}50%{opacity:.55;transform:scale(1.7)}}
      `}</style>

      {/* scan line */}
      <div style={{position:"fixed",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#00f0ff15,transparent)",animation:"scan 6s linear infinite",pointerEvents:"none"}}/>

      {/* bg dots */}
      {[...Array(22)].map((_,i)=>(
        <div key={i} style={{position:"fixed",borderRadius:"50%",
          width:i%3===0?4:2,height:i%3===0?4:2,
          background:[C.cyan,C.pink,C.gold,C.green][i%4],
          left:`${(i*43)%97}%`,top:`${(i*71+11)%94}%`,
          animation:`twinkle ${2+(i%4)*.7}s ${(i%5)*.3}s ease-in-out infinite`,
          pointerEvents:"none"}}/>
      ))}

      {/* lang + mute row */}
      <div style={{position:"fixed",top:12,right:14,display:"flex",gap:8}}>
        <button onClick={()=>setLang(l=>l==="ar"?"en":"ar")} style={{
          background:"#0d0d20",border:`1px solid ${C.border}`,color:C.cyan,
          borderRadius:8,padding:"5px 10px",fontSize:12,cursor:"pointer",fontFamily:"inherit",
        }}>{s.lang}</button>
      </div>

      <div style={{animation:"float 3s ease-in-out infinite",fontSize:68,marginBottom:10}}>⚽</div>
      <h1 style={{margin:"0 0 2px",fontSize:26,fontWeight:900,color:C.cyan,textAlign:"center"}}>{s.appName}</h1>
      <p style={{color:"#1a1a3a",fontSize:10,letterSpacing:4,marginBottom:8}}>{s.appSub}</p>
      <p style={{color:"#2a2a3a",fontSize:12,marginBottom:28}}>{s.tagline}</p>

      <div style={{display:"flex",flexDirection:"column",gap:12,width:"90%",alignItems:"center"}}>
        {[
          {label:s.play,  color:C.cyan, to:"levels"},
          {label:s.shop,  color:C.gold, to:"shop"},
          {label:s.stats, color:C.pink, to:"stats"},
        ].map(b=>(
          <button key={b.to} onClick={()=>navigate(b.to)} style={bigBtn(b.color)}>{b.label}</button>
        ))}
      </div>

      <div style={{display:"flex",gap:24,marginTop:30}}>
        {[
          {val:`${done}/${LEVELS.length}`, label:s.levelLabel, color:C.cyan},
          {val:`${totalStars}⭐`,          label:s.star,       color:C.gold},
          {val:hints,                      label:s.hint,       color:C.green},
        ].map(st=>(
          <div key={st.label} style={{textAlign:"center"}}>
            <div style={{color:st.color,fontWeight:900,fontSize:20}}>{st.val}</div>
            <div style={{color:"#333",fontSize:10,marginTop:2}}>{st.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
//  §12  LEVEL SELECT
// ══════════════════════════════════════════════════════
function LevelSelectScreen({navigate,progress,lang}){
  const s=STRINGS[lang];
  const groups=[...new Set(LEVELS.map(l=>l.group))];
  return (
    <div style={pg(lang==="ar"?"rtl":"ltr")}>
      <div style={topBarStyle}>
        <button style={backBtnStyle(lang)} onClick={()=>navigate("menu")}>{s.back}</button>
        <span style={{color:"#fff",fontWeight:700,fontSize:15}}>{s.chooseLvl}</span>
        <div style={{width:64}}/>
      </div>
      <div style={{overflowY:"auto",padding:"10px 14px 28px",flex:1}}>
        {groups.map(g=>{
          const lvs=LEVELS.filter(l=>l.group===g);
          return (
            <div key={g} style={{marginBottom:20}}>
              <div style={{color:"#333",fontSize:11,letterSpacing:2,marginBottom:10,paddingRight:2}}>── {s[g]} ──</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
                {lvs.map(level=>{
                  const idx=LEVELS.indexOf(level);
                  const done=progress[level.id];
                  const locked=idx>0&&!progress[LEVELS[idx-1].id];
                  return (
                    <button key={level.id} onClick={()=>{
                      if(!locked){haptic.light();navigate("game",{levelIndex:idx});}
                    }} style={{
                      background:done?"#00f0ff08":locked?"#07070f":C.card,
                      border:`1.5px solid ${done?C.cyan:locked?"#111":"#2a2a3a"}`,
                      borderRadius:16,padding:"14px 10px",textAlign:"center",
                      cursor:locked?"not-allowed":"pointer",opacity:locked?.4:1,
                      fontFamily:"inherit",
                    }}>
                      <div style={{fontSize:22,marginBottom:4}}>{done?"✅":locked?"🔒":"🎯"}</div>
                      <div style={{color:done?C.cyan:locked?"#333":"#ddd",fontWeight:700,fontSize:13}}>
                        {s.levelLabel} {level.id}
                      </div>
                      <div style={{color:"#444",fontSize:11,marginTop:2}}>{level.title[lang]}</div>
                      <div style={{marginTop:6,fontSize:13}}>{done?("⭐".repeat(done)+"☆".repeat(3-done)):`${s.par} ${level.par}`}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
//  §13  GAME SCREEN
// ══════════════════════════════════════════════════════
function GameScreen({navigate,levelIndex,progress,onWin,hints,onUseHint,lang,muted,setMuted,completedCount}){
  const lv=LEVELS[levelIndex];
  const COLS=lv.cols, ROWS=lv.rows;
  const s=STRINGS[lang];
  const audio=useAudio();

  // Responsive cell size — works on iPhone SE (320px) to large phones
  const vp=Math.min(window.innerWidth,480)-28;
  const CS=Math.floor((vp-4*(COLS-1))/COLS);

  const [cells,    setCells]    = useState(()=>lv.cells.map(c=>({...c})));
  const [phase,    setPhase]    = useState("idle");
  const [ballPos,  setBallPos]  = useState(null);
  const [visited,  setVisited]  = useState(new Set());
  const [moves,    setMoves]    = useState(0);
  const [showWin,  setShowWin]  = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [failMsg,  setFailMsg]  = useState("");
  const [particles,setParticles]= useState(false);
  const [hintCell, setHintCell] = useState(null);
  const cancelRef=useRef(false);

  useEffect(()=>{
    cancelRef.current=true;
    setTimeout(()=>{
      setCells(lv.cells.map(c=>({...c})));
      setPhase("idle"); setBallPos(null); setVisited(new Set());
      setMoves(0); setShowWin(false); setShowFail(false);
      setFailMsg(""); setParticles(false); setHintCell(null);
      cancelRef.current=false;
    },30);
  },[levelIndex]);

  // Hint — finds first free cell that needs rotation, flashes it
  const handleHint=useCallback(()=>{
    if(hints<=0||phase!=="idle") return;
    haptic.light(); audio.hint();
    let bestIdx=null;
    outer: for(let t=0;t<COLS*ROWS*4;t++){
      const trial=cells.map(c=>({...c}));
      for(let i=0;i<trial.length;i++){
        if(trial[i].l) continue;
        const save=trial[i].d;
        for(let rot=1;rot<=3;rot++){
          trial[i]={...trial[i],d:(save+rot)%4};
          if(simulate(trial,COLS,ROWS,lv.start,lv.exit).result==="win"){bestIdx=i;break outer;}
          trial[i]={...trial[i],d:save};
        }
      }
      break;
    }
    if(bestIdx!==null){
      onUseHint();
      setHintCell(bestIdx);
      setTimeout(()=>setHintCell(null),1200);
      setCells(prev=>prev.map((cl,j)=>j===bestIdx?{...cl,d:(cl.d+1)%4}:cl));
      setMoves(n=>n+1);
    }
  },[hints,phase,cells,COLS,ROWS,lv,audio,onUseHint]);

  const handleLaunch=()=>{
    if(phase!=="idle") return;
    audio.launch(); haptic.light();
    const {path,result}=simulate(cells,COLS,ROWS,lv.start,lv.exit);
    setPhase("animating"); cancelRef.current=false;
    let i=0;
    const tick=()=>{
      if(cancelRef.current) return;
      if(i<path.length){
        audio.step(); haptic.light();
        setBallPos(path[i]);
        setVisited(new Set(path.slice(0,i+1).map(([pr,pc])=>`${pr},${pc}`)));
        i++; setTimeout(tick,210);
      } else {
        if(!cancelRef.current){
          if(result==="win"){
            haptic.win(); audio.win();
            setPhase("won"); setShowWin(true);
            setParticles(true); setTimeout(()=>setParticles(false),1800);
            onWin(lv.id,calcStars(moves,lv.par));
          } else {
            haptic.fail(); audio.fail();
            setPhase("lost"); setShowFail(true);
            setFailMsg(result==="loop"?s.fail_loop:s.fail_oob);
          }
        }
      }
    };
    tick();
  };

  const reset=()=>{
    cancelRef.current=true;
    setTimeout(()=>{
      setCells(lv.cells.map(c=>({...c})));
      setPhase("idle"); setBallPos(null); setVisited(new Set());
      setMoves(0); setShowWin(false); setShowFail(false);
      setFailMsg(""); setParticles(false); setHintCell(null);
      cancelRef.current=false;
    },30);
  };

  const isStart=(r,c)=>lv.start[0]===r&&lv.start[1]===c;
  const isExit =(r,c)=>lv.exit[0]===r&&lv.exit[1]===c;
  const isBall =(r,c)=>ballPos&&ballPos[0]===r&&ballPos[1]===c;
  const isVis  =(r,c)=>visited.has(`${r},${c}`);
  const stars=calcStars(moves,lv.par);
  const prevDone=progress[lv.id];

  return (
    <div style={pg(lang==="ar"?"rtl":"ltr")}>
      <Particles active={particles}/>
      <style>{`
        @keyframes ballBounce{0%{transform:scale(.65)}60%{transform:scale(1.3)}100%{transform:scale(1)}}
        @keyframes winGlow{0%,100%{box-shadow:0 0 22px #00f0ff30}50%{box-shadow:0 0 55px #00f0ff90}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
        @keyframes overlayIn{from{opacity:0;transform:scale(.93) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes hintPulse{0%,100%{box-shadow:0 0 0 0 #ffe60080;background:#1a1a0a}50%{box-shadow:0 0 0 8px #ffe60000;background:#2a2a00}}
      `}</style>

      {/* ── TOP BAR ── */}
      <div style={{...topBarStyle,gap:6}}>
        <button style={backBtnStyle(lang)} onClick={()=>{cancelRef.current=true;navigate("levels");}}>←</button>

        <div style={{textAlign:"center",flex:1,minWidth:0}}>
          <div style={{color:C.cyan,fontSize:12,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
            {lv.title[lang]} · {levelIndex+1}/{LEVELS.length}
          </div>
          <div style={{color:"#2a2a3a",fontSize:10}}>{s.par} {lv.par} · {s.moves}: {moves}</div>
        </div>

        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
          {/* HINT BUTTON — << ADMOB >> при 0 hints показывай Rewarded Ad */}
          <button onClick={handleHint} disabled={hints<=0||phase!=="idle"} style={{
            background:hints>0&&phase==="idle"?"#00f0ff12":"#0d0d20",
            border:`1px solid ${hints>0&&phase==="idle"?C.cyan:C.border}`,
            color:hints>0&&phase==="idle"?C.cyan:"#333",
            borderRadius:8,padding:"5px 9px",fontSize:12,cursor:hints>0?"pointer":"not-allowed",fontFamily:"inherit",
          }}>{s.hintBtn}{hints}</button>

          {/* MUTE BUTTON */}
          <button onClick={()=>setMuted(m=>!m)} style={{
            background:"#0d0d20",border:`1px solid ${C.border}`,color:"#555",
            borderRadius:8,padding:"5px 8px",fontSize:13,cursor:"pointer",
          }}>{muted?"🔇":"🔊"}</button>
        </div>
      </div>

      {/* ── GRID ── */}
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"8px 0"}}>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${COLS},${CS}px)`,gap:4}}>
          {cells.map((cell,i)=>{
            const r=Math.floor(i/COLS), c=i%COLS;
            const ball=isBall(r,c),exit_=isExit(r,c),start=isStart(r,c),vis=isVis(r,c);
            const free=!cell.l&&!ball&&!exit_&&phase==="idle";
            const isHinted=hintCell===i;

            let bg=C.card,border=`1px solid ${C.border}`,shadow="none";
            if(ball)    {bg="#1a0e00";border=`2px solid #ff9900`;shadow="0 0 18px #ff990065";}
            else if(exit_) {bg="#001a20";border=`2px solid ${C.cyan}`;shadow=`0 0 16px ${C.cyan}50`;}
            else if(start) {bg="#180020";border=`2px solid ${C.pink}`;shadow=`0 0 12px ${C.pink}40`;}
            else if(vis)   {bg="#09091e";border="1.5px solid #3030aa";}
            else if(cell.l){bg="#080808";border="1px solid #111";}
            else           {bg="#0a1a0a";border="1.5px solid #00cc55";}

            return (
              <div key={i} onClick={()=>{
                if(!free) return;
                haptic.light(); audio.click();
                setCells(prev=>prev.map((cl,j)=>j===i?{...cl,d:(cl.d+1)%4}:cl));
                setMoves(n=>n+1);
              }} style={{
                width:CS,height:CS,background:bg,borderRadius:10,
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                cursor:free?"pointer":"default",border,boxShadow:shadow,
                fontSize:ball?Math.min(CS*.42,26):Math.min(CS*.38,20),
                userSelect:"none",position:"relative",transition:"background .12s",
                // تأثير التلميح
                animation: isHinted?"hintPulse 0.35s ease-in-out 3":ball?"ballBounce .25s ease":"none",
                ...(isHinted?{border:"2px solid #ffe600",boxShadow:"0 0 22px #ffe60090"}:{}),
              }}>
                {ball?"⚽":exit_?"⭐":start&&!ball?"🔵":ARROWS[cell.d]}
                {free&&<div style={{position:"absolute",bottom:3,width:4,height:4,borderRadius:"50%",background:"#00cc55",opacity:.8}}/>}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── LAUNCH / RESET ── */}
      <div style={{display:"flex",gap:10,justifyContent:"center",padding:"8px 16px 12px",flexShrink:0}}>
        {phase==="idle"&&(
          <button onClick={handleLaunch} style={{
            background:"linear-gradient(135deg,#8800cc,#ff00c8)",color:"#fff",
            border:"none",borderRadius:14,padding:"13px 34px",fontWeight:800,
            fontSize:17,cursor:"pointer",fontFamily:"inherit",flexShrink:0,
          }}>{s.launch}</button>
        )}
        <button onClick={reset} style={{
          background:C.card,color:"#555",border:`1px solid ${C.border}`,
          borderRadius:14,padding:"13px 16px",fontSize:16,cursor:"pointer",
        }}>{s.reset}</button>
      </div>

      {/* << ADMOB >> Banner Ad — يظهر هنا أسفل اللعبة (مخفي لمشتري إزالة الإعلانات) */}
      {/* <AdMobBanner adUnitId="ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY" /> */}

      {/* ══ WIN OVERLAY ══ */}
      {showWin&&(
        <div style={{position:"fixed",inset:0,background:"#000000cc",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"#001814",border:"2px solid #00f0ff",borderRadius:24,padding:"28px 24px",textAlign:"center",maxWidth:320,width:"88%",animation:"overlayIn .35s ease,winGlow 1.8s ease-in-out 0.3s infinite"}}>
            <div style={{fontSize:44,marginBottom:4}}>🎉</div>
            <div style={{color:C.cyan,fontWeight:900,fontSize:22,marginBottom:4}}>{s.win}</div>
            <div style={{fontSize:26,marginBottom:6}}>{"⭐".repeat(stars)}{"☆".repeat(3-stars)}</div>
            <div style={{color:"#555",fontSize:13,marginBottom:4}}>{moves} {s.winSub} {lv.par}</div>
            {prevDone&&prevDone>=stars&&(
              <div style={{color:C.green,fontSize:11,marginBottom:8}}>{s.prevRecord}: {"⭐".repeat(prevDone)}</div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,margin:"14px 0 18px",background:"#0a0a18",borderRadius:14,padding:"12px 8px"}}>
              {[
                {l:s.moves, v:moves, c:C.pink},
                {l:s.par,   v:lv.par, c:"#888"},
                {l:"⭐",    v:stars, c:C.gold},
              ].map(st=>(
                <div key={st.l} style={{textAlign:"center"}}>
                  <div style={{color:st.c,fontWeight:900,fontSize:18}}>{st.v}</div>
                  <div style={{color:"#444",fontSize:10,marginTop:2}}>{st.l}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button onClick={reset} style={{background:"transparent",border:`1px solid ${C.border}`,color:"#555",borderRadius:12,padding:"10px 14px",cursor:"pointer",fontSize:16}}>{s.reset}</button>
              {levelIndex<LEVELS.length-1
                ?<button onClick={()=>navigate("game",{levelIndex:levelIndex+1})} style={{background:C.cyan,color:C.bg,border:"none",borderRadius:12,padding:"10px 24px",fontWeight:900,fontSize:15,cursor:"pointer",flex:1}}>
                  {s.next}
                </button>
                :<button onClick={()=>navigate("menu")} style={{background:C.gold,color:C.bg,border:"none",borderRadius:12,padding:"10px 24px",fontWeight:900,fontSize:15,cursor:"pointer",flex:1}}>
                  {s.complete}
                </button>
              }
            </div>
          </div>
        </div>
      )}

      {/* ══ FAIL OVERLAY ══ */}
      {showFail&&(
        <div style={{position:"fixed",inset:0,background:"#000000cc",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"#180000",border:"2px solid #ff3333",borderRadius:24,padding:"28px 24px",textAlign:"center",maxWidth:300,width:"88%",animation:"overlayIn .3s ease,shake .45s ease .1s"}}>
            <div style={{fontSize:44,marginBottom:8}}>💥</div>
            <div style={{color:"#ff5555",fontWeight:700,fontSize:17,marginBottom:16}}>{failMsg}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,background:"#0d0000",borderRadius:12,padding:"12px",marginBottom:18}}>
              {[
                {l:s.moves,v:moves,c:"#ff6666"},
                {l:s.par,  v:lv.par,c:"#888"},
              ].map(st=>(
                <div key={st.l} style={{textAlign:"center"}}>
                  <div style={{color:st.c,fontWeight:900,fontSize:20}}>{st.v}</div>
                  <div style={{color:"#444",fontSize:10,marginTop:2}}>{st.l}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>{setShowFail(false);reset();}} style={{
              border:`1.5px solid #ff3333`,color:"#ff4444",background:"transparent",
              borderRadius:12,padding:"12px 28px",cursor:"pointer",fontSize:14,fontWeight:700,fontFamily:"inherit",width:"100%",
            }}>{s.tryAgain}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════
//  §14  SHOP SCREEN
// ══════════════════════════════════════════════════════
function ShopScreen({onBack,hints,noAds,onBuyHints,onBuyNoAds,lang}){
  const s=STRINGS[lang];
  const card=(color)=>({display:"flex",alignItems:"center",background:`${color}09`,border:`1px solid ${color}35`,borderRadius:16,padding:"16px",marginBottom:14});
  const btn=(color)=>({background:color,color:C.bg,border:"none",borderRadius:10,padding:"8px 13px",fontWeight:800,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"});
  return (
    <div style={pg(lang==="ar"?"rtl":"ltr")}>
      <div style={topBarStyle}>
        <button style={backBtnStyle(lang)} onClick={onBack}>{s.back}</button>
        <span style={{color:C.gold,fontWeight:700,fontSize:16}}>{s.shopTitle}</span>
        <div style={{width:64}}/>
      </div>
      <div style={{padding:"12px 16px",overflowY:"auto",flex:1}}>
        {/* << ADMOB >> إزالة الإعلانات — اربط هنا Google Play Billing / RevenueCat */}
        <div style={card(C.gold)}>
          <div style={{fontSize:36}}>🚫</div>
          <div style={{flex:1,margin:"0 12px"}}>
            <div style={{color:C.gold,fontWeight:700,fontSize:14}}>{s.removeAds}</div>
            <div style={{color:"#555",fontSize:11,marginTop:3}}>{s.removeAdsSub}</div>
          </div>
          {noAds?<div style={{color:C.green,fontSize:12,fontWeight:700}}>{s.activated}</div>
                :<button style={btn(C.gold)} onClick={onBuyNoAds}>$1.99</button>}
        </div>

        {/* << ADMOB >> حزمة تلميحات — اربط هنا In-App Purchase */}
        <div style={card(C.cyan)}>
          <div style={{fontSize:36}}>💡</div>
          <div style={{flex:1,margin:"0 12px"}}>
            <div style={{color:C.cyan,fontWeight:700,fontSize:14}}>{s.hints5}</div>
            <div style={{color:"#555",fontSize:11,marginTop:3}}>{s.hints5Sub}</div>
          </div>
          <button style={btn(C.cyan)} onClick={()=>onBuyHints(5)}>$0.99</button>
        </div>

        {/* << ADMOB >> تلميح مجاني بإعلان — اربط AdMob.showRewardedAd() */}
        <div style={card(C.green)}>
          <div style={{fontSize:36}}>📺</div>
          <div style={{flex:1,margin:"0 12px"}}>
            <div style={{color:C.green,fontWeight:700,fontSize:14}}>{s.freeHint}</div>
            <div style={{color:"#555",fontSize:11,marginTop:3}}>{s.freeHintSub}</div>
          </div>
          <button style={btn(C.green)} onClick={()=>onBuyHints(1)}>{s.free}</button>
        </div>

        <div style={{background:"#0a0a18",borderRadius:14,border:`1px solid ${C.border}`,padding:"14px",textAlign:"center"}}>
          <div style={{color:"#333",fontSize:11,lineHeight:1.8}}>
            {s.hintsNow}: <span style={{color:C.cyan,fontWeight:700}}>{hints}</span><br/>
            {s.demoNote}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
//  §15  STATS SCREEN
// ══════════════════════════════════════════════════════
function StatsScreen({onBack,progress,lang}){
  const s=STRINGS[lang];
  const totalStars=Object.values(progress).reduce((a,v)=>a+v,0);
  const maxStars=LEVELS.length*3;
  const done=Object.keys(progress).length;
  const threeStars=Object.values(progress).filter(v=>v===3).length;
  const groups=[...new Set(LEVELS.map(l=>l.group))];
  return (
    <div style={pg(lang==="ar"?"rtl":"ltr")}>
      <div style={topBarStyle}>
        <button style={backBtnStyle(lang)} onClick={onBack}>{s.back}</button>
        <span style={{color:C.cyan,fontWeight:700,fontSize:16}}>{s.statsTitle}</span>
        <div style={{width:64}}/>
      </div>
      <div style={{overflowY:"auto",padding:"8px 16px 28px",flex:1}}>
        <div style={{textAlign:"center",margin:"16px 0 22px"}}>
          <div style={{fontSize:44}}>⭐</div>
          <div style={{fontSize:38,fontWeight:900,color:C.gold,lineHeight:1}}>{totalStars}</div>
          <div style={{color:"#444",fontSize:13,marginTop:4}}>{s.totalStars} {maxStars} {s.starLabel}</div>
          <div style={{marginTop:12,background:"#0d0d20",borderRadius:999,height:10,width:"72%",margin:"12px auto 0"}}>
            <div style={{background:"linear-gradient(90deg,#ffe600,#ff9900)",borderRadius:999,height:10,width:`${Math.round((totalStars/maxStars)*100)}%`,transition:"width 1s"}}/>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
          {[
            {v:done,          l:s.doneLabel,  c:C.cyan},
            {v:threeStars,    l:s.threeLabel, c:C.gold},
            {v:LEVELS.length-done, l:s.leftLabel, c:C.pink},
          ].map(st=>(
            <div key={st.l} style={{background:C.card,borderRadius:14,padding:"14px 8px",textAlign:"center",border:`1px solid ${C.border}`}}>
              <div style={{color:st.c,fontWeight:900,fontSize:22}}>{st.v}</div>
              <div style={{fontSize:10,color:"#444",marginTop:4}}>{st.l}</div>
            </div>
          ))}
        </div>

        {groups.map(g=>{
          const lvs=LEVELS.filter(l=>l.group===g);
          const gDone=lvs.filter(l=>progress[l.id]!==undefined).length;
          return (
            <div key={g} style={{background:"#0a0a18",borderRadius:14,padding:"14px",marginBottom:12,border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <span style={{color:"#ddd",fontWeight:700,fontSize:14}}>{s[g]}</span>
                <span style={{color:"#444",fontSize:12}}>{gDone}/{lvs.length}</span>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {lvs.map(l=>{
                  const st=progress[l.id]||0;
                  return (
                    <div key={l.id} style={{background:st>0?"#1a1a35":"#111",borderRadius:8,padding:"6px 10px",border:`1px solid ${st===3?C.gold:st>0?"#00f0ff28":C.border}`}}>
                      <div style={{color:st>0?"#ddd":"#333",fontSize:10}}>{l.title[lang]}</div>
                      <div style={{fontSize:11,marginTop:2}}>{"⭐".repeat(st)}{"☆".repeat(3-st)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
//  §16  ROOT APP
// ══════════════════════════════════════════════════════
export default function App(){
  const [screen,    setScreen]    = useState("menu");
  const [lvlIdx,    setLvlIdx]    = useState(0);
  const [progress,  setProgress]  = useState(()=>LS.load("gt_prog_v2",{}));
  const [hints,     setHints]     = useState(()=>LS.load("gt_hints_v2",3));
  const [noAds,     setNoAds]     = useState(()=>LS.load("gt_noads_v2",false));
  const [lang,      setLang]      = useState(()=>LS.load("gt_lang_v2","ar"));
  const [muted,     setMuted]     = useState(()=>LS.load("gt_muted_v2",false));
  const [showAd,    setShowAd]    = useState(false);
  const [pendingNav,setPendingNav]= useState(null);

  // persist lang & mute
  useEffect(()=>LS.save("gt_lang_v2",lang),[lang]);
  useEffect(()=>{ LS.save("gt_muted_v2",muted); mutedRef.current=muted; },[muted]);

  const mutedRef=useRef(muted);
  const audioEngine=useRef(buildAudio(mutedRef)).current;

  const navigate=(s,params={})=>{
    if(params.levelIndex!==undefined) setLvlIdx(params.levelIndex);
    setScreen(s);
  };

  const handleWin=(levelId,stars)=>{
    setProgress(prev=>{
      const u={...prev};
      if(!u[levelId]||u[levelId]<stars) u[levelId]=stars;
      LS.save("gt_prog_v2",u);
      return u;
    });
  };

  const useHint=()=>{
    setHints(n=>{ const v=Math.max(0,n-1); LS.save("gt_hints_v2",v); return v; });
  };
  const buyHints=(n)=>{
    // << ADMOB >> هنا اربط Rewarded Ad أو Google Play Billing
    setHints(prev=>{ const v=prev+n; LS.save("gt_hints_v2",v); return v; });
    alert(`✅ +${n} ${STRINGS[lang].hint} (تجريبي)`);
  };
  const buyNoAds=()=>{
    // << ADMOB >> هنا اربط Google Play Billing
    LS.save("gt_noads_v2",true); setNoAds(true);
    alert(STRINGS[lang].activated+" (تجريبي)");
  };

  // Interstitial Ad trigger: every 3 completed levels
  // << ADMOB INTERSTITIAL >> هنا يتم إظهار الإعلان البيني كل 3 مستويات
  const completedCount=Object.keys(progress).length;
  const prevCount=useRef(completedCount);
  useEffect(()=>{
    if(completedCount>prevCount.current && completedCount%3===0 && !noAds){
      // << ADMOB INTERSTITIAL >> استبدل setShowAd(true) بـ AdMob.showInterstitialAd(adUnitId)
      setShowAd(true);
    }
    prevCount.current=completedCount;
  },[completedCount,noAds]);

  return (
    <AudioCtx.Provider value={audioEngine}>
      <LangCtx.Provider value={lang}>
        {showAd&&<AdInterstitial lang={lang} onClose={()=>{setShowAd(false);if(pendingNav){navigate(...pendingNav);setPendingNav(null);}}}/>}

        {screen==="menu"   &&<MenuScreen navigate={navigate} progress={progress} hints={hints} lang={lang} setLang={setLang}/>}
        {screen==="levels" &&<LevelSelectScreen navigate={navigate} progress={progress} lang={lang}/>}
        {screen==="game"   &&<GameScreen navigate={navigate} levelIndex={lvlIdx} progress={progress} onWin={handleWin} hints={hints} onUseHint={useHint} lang={lang} muted={muted} setMuted={setMuted} completedCount={completedCount}/>}
        {screen==="shop"   &&<ShopScreen onBack={()=>navigate("menu")} hints={hints} noAds={noAds} onBuyHints={buyHints} onBuyNoAds={buyNoAds} lang={lang}/>}
        {screen==="stats"  &&<StatsScreen onBack={()=>navigate("menu")} progress={progress} lang={lang}/>}
      </LangCtx.Provider>
    </AudioCtx.Provider>
  );
}
