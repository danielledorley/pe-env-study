(function(){
'use strict';
var navy='#243D55',blue='#2E6F95',green='#4E8065',gray='#657785';
var map={
'Continuity':['Q = A V','A₁  →  A₂','V₂ > V₁ when A₂ < A₁'],
'The energy equation':['H = z + p/γ + V²/(2g)','EGL ↓ with loss','Pump adds head; losses subtract'],
'Energy equation':['H = z + p/γ + V²/(2g)','EGL ↓ with loss','Pump adds head; losses subtract'],
'Friction loss':['h_f = f(L/D)V²/(2g)','L  →  →  →  D','Longer, smaller, faster = more loss'],
'Minor losses and pipe networks':['h_L = K V²/(2g)','VALVE  →  ELBOW  →  TEE','Fittings add local head loss'],
'Pipes in series & parallel':['Series: same Q   |   Parallel: same Δh','→ [ A ] → [ B ] →','Parallel branches split total Q'],
'Pump head':['h_p = head added','RESERVOIR → PUMP → SYSTEM','Pump raises the energy grade line'],
'Pump/system curves':['Operating point = pump × system','H ↑  |  ×','Flow is set at the intersection'],
'HGL & EGL':['EGL = HGL + V²/(2g)','EGL  ─────────╲','HGL  ───────────╲'],
'Manometers':['ΔP = γ Δh','P₁  ─┐  U-tube  ┌─  P₂','Down = +γh; up = −γh'],
'Orifice discharge':['Q = C_d A √(2gh)','H₁ ───────── H₂','Submerged: h = H₁ − H₂'],
'Discharge from tanks and orifices':['Q = C_d A √(2gh)','Free surface ───── ○','Free: h to centerline'],
'Manning equation':['V = (1/n) R^(2/3) S^(1/2)','WATER  ~~~~~~~~~','R = A / wetted perimeter'],
'Stormwater runoff — Rational Method':['Q = C i A','RAIN ↓↓↓  →  WATERSHED  →  OUTLET','C × i × A gives peak Q'],
'Detention / storage':['t = V / Q_out','INFLOW → [  STORAGE  ] → OUTFLOW','Volume stored / discharge'],
'Darcy’s law':['Q = K A i','HIGH HEAD  ───────→  LOW HEAD','i = Δh/L'],
"Darcy's law":['Q = K A i','HIGH HEAD  ───────→  LOW HEAD','i = Δh/L'],
'Confined aquifer':['Hydraulic head / potentiometric surface','WELL ↑  |  aquifer between confining beds','Pressurized saturated zone'],
'Unconfined aquifer':['Water table = top of saturation','WATER TABLE ─────────','Saturated zone below'],
'Clarifier surface loading':['SOR = Q / A_s','IN →  ↓↓↓  [ CLARIFIER ]  → OUT','Particles settle; overflow rate matters'],
'Activated sludge':['Influent → Aeration → Clarifier → Effluent','                 ↖ RAS    WAS ↗','Recycle biomass; waste excess solids'],
'Mixing and mass balance':['Accumulation = In − Out','IN → [ CONTROL VOLUME ] → OUT','Steady state: accumulation = 0'],
'Mixing / mass balance':['Accumulation = In − Out','IN → [ CONTROL VOLUME ] → OUT','Steady state: accumulation = 0'],
'BOD removal':['L = L₀ e^(−kt)','L₀ ●──────────────● L','Organic load decays with time'],
'Fecal coliform removal':['N = N₀ e^(−kt)','N₀ ●──────────────● N','Disinfection reduces organisms'],
'Baghouse':['η = (C_in − C_out)/C_in','DIRTY GAS → ||||| FABRIC ||||| → CLEAN GAS','Particles collect on bags'],
'Wet scrubber':['Gas + liquid contact','DIRTY GAS → 💧💧💧 → CLEAN GAS','Droplets capture/absorb pollutants'],
'Culverts':['Q = A V','HW → [  CULVERT  ] → TW','Check inlet vs outlet control'],
'Weirs and Parshall flumes':['Q ∝ H^(3/2)','WATER ────┐  CREST  ┌────','Head over crest controls flow']
};
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function card(title,d){var eq=d[0],mid=d[1],tip=d[2];return '<div class="static-guide-diagram"><div class="sg-kicker">PE VISUAL</div><div class="sg-title">'+esc(title)+'</div><div class="sg-eq">'+esc(eq)+'</div><svg viewBox="0 0 760 170" role="img" aria-label="'+esc(title)+' diagram"><rect x="1" y="1" width="758" height="168" rx="12" fill="#f8fbfc" stroke="#d8e4e8"/><line x1="70" y1="85" x2="690" y2="85" stroke="'+blue+'" stroke-width="5" stroke-linecap="round"/><circle cx="70" cy="85" r="17" fill="#e8f4f8" stroke="'+gray+'" stroke-width="2"/><circle cx="690" cy="85" r="17" fill="#edf7f1" stroke="'+green+'" stroke-width="2"/><text x="380" y="72" text-anchor="middle" font-family="DM Sans,Arial,sans-serif" font-size="21" font-weight="600" fill="'+navy+'">'+esc(mid)+'</text><text x="380" y="118" text-anchor="middle" font-family="DM Sans,Arial,sans-serif" font-size="15" fill="'+gray+'">'+esc(tip)+'</text></svg><div class="sg-takeaway"><b>PE takeaway:</b> '+esc(tip)+'</div></div>'}
function install(){var root=document.getElementById('app');if(!root)return;var article=root.querySelector('.guide-article');if(!article)return;var hs=article.querySelectorAll('h2,h3,h4');for(var i=0;i<hs.length;i++){var h=hs[i],t=h.textContent.trim(),key=null;Object.keys(map).some(function(k){if(t.toLowerCase()===k.toLowerCase()||t.toLowerCase().indexOf(k.toLowerCase())===0){key=k;return true}return false});if(!key)continue;if(h.nextElementSibling&&h.nextElementSibling.classList.contains('static-guide-diagram'))continue;var wrap=document.createElement('div');wrap.innerHTML=card(t,map[key]);h.insertAdjacentElement('afterend',wrap.firstElementChild)}}
function start(){install();new MutationObserver(function(){install()}).observe(document.getElementById('app')||document.body,{childList:true,subtree:true});setInterval(install,500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();