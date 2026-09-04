(function(){'use strict';
var A='#2E6F95',G='#4E8065',D='#657785',T='#243D55';
var data={
'Orifice discharge':['Q = C_d A √(2gh)','H₁ − H₂','Free: depth to centerline'],
'Discharge from tanks and orifices':['Q = C_d A √(2gh)','H₁ − H₂','Free vs submerged driving head'],
'Manometers':['Down = +γh · Up = −γh','P₁ ↕ P₂','Walk the pressure path'],
'The energy equation':['z + p/γ + v²/(2g) + hₚ = downstream + hL','ENERGY','Add pumps; subtract losses'],
'Energy equation':['z + p/γ + v²/(2g) + hₚ = downstream + hL','ENERGY','Add pumps; subtract losses'],
'HGL & EGL':['EGL = HGL + v²/(2g)','EGL / HGL','Gap = velocity head'],
'Pipes in series & parallel':['Series: same Q · Parallel: same Δh','Q → Q → Q','Parallel branches split Q'],
'Minor losses and pipe networks':['hL = K V²/(2g)','NETWORK','Losses occur at fittings/branches'],
'Continuity':['A₁V₁ = A₂V₂ = Q','A₁ → A₂','Smaller area → faster flow'],
'Friction loss':['h_f = f(L/D)V²/(2g)','PIPE → → →','Longer/smaller/faster → more loss'],
'Pump head':['hₚ = head added by pump','PUMP →','Pump raises total head'],
'Pump/system curves':['H_system = H_static + hL','PUMP CURVE × SYSTEM','Intersection = operating point'],
'Manning equation':['V = (1/n)R^(2/3)S^(1/2)','OPEN CHANNEL','R = A / wetted perimeter'],
'Stormwater runoff — Rational Method':['Q = CiA','RAIN → RUNOFF','C × i × A gives peak Q'],
'Detention / storage':['t_d = V/Q_out','INFLOW → [ V ] → OUTFLOW','Stored volume / outflow'],
'Darcy’s law':['Q = −KA(dh/dl)','HIGH HEAD → LOW HEAD','Flow follows hydraulic gradient'],
"Darcy's law":['Q = −KA(dh/dl)','HIGH HEAD → LOW HEAD','Flow follows hydraulic gradient'],
'Confined aquifer':['Thiem / potentiometric head','PRESSURE ↑ WELL','Confined aquifer is pressurized'],
'Unconfined aquifer':['Water table = top of saturation','WATER TABLE ↓','Saturated zone below'],
'Clarifier surface loading':['SLR = Q/A_s','Q ↓ over A_s','Compare surface overflow rate'],
'Activated sludge':['Influent → Aeration → Clarifier → Effluent','RAS ↩ · WAS →','Recycle biomass; waste excess solids'],
'Mixing and mass balance':['Accumulation = In − Out','IN → [ CONTROL VOLUME ] → OUT','Steady state: accumulation = 0'],
'Mixing / mass balance':['Accumulation = In − Out','IN → [ CONTROL VOLUME ] → OUT','Steady state: accumulation = 0'],
'BOD removal':['L = L₀e^(−kt)','L₀ → L','First-order decay'],
'Fecal coliform removal':['N = N₀e^(−kt)','N₀ → N','First-order decay during disinfection'],
'Baghouse':['Dirty gas → Fabric bags → Clean gas','GAS → ||||| → GAS','Particles collect on fabric'],
'Wet scrubber':['Dirty gas + liquid spray → cleaner gas','GAS + 💧 → GAS','Gas-liquid contact removes pollutants'],
'Culverts':['Q = AV · control by headwater/tailwater','HW → [ CULVERT ] → TW','Identify inlet vs outlet control'],
'Weirs and Parshall flumes':['Q ∝ H^(3/2)','WATER → |CREST| →','Head over crest controls flow']};
function esc(s){return String(s).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function diagram(d){var eq=d[0],mid=d[1],tip=d[2];return '<div class="ggd" style="display:block!important;margin:18px 0;padding:16px;border:1px solid #cbd9df;border-radius:14px;background:#fff;box-sizing:border-box"><div style="font:700 .67rem IBM Plex Mono,monospace;letter-spacing:.1em;color:'+A+'">PE VISUAL</div><div style="font:700 1.05rem DM Sans,Arial;color:'+T+'">'+esc(d[3]||'')+'</div><div style="font:600 1rem Georgia,serif;text-align:center;color:#173b63;padding:7px">'+esc(eq)+'</div><svg viewBox="0 0 760 150" style="width:100%;height:auto;display:block" role="img" aria-label="diagram"><rect width="760" height="150" rx="10" fill="#f8fbfc"/><line x1="70" y1="75" x2="690" y2="75" stroke="'+A+'" stroke-width="6"/><circle cx="70" cy="75" r="18" fill="#dff1f8" stroke="'+D+'" stroke-width="3"/><circle cx="690" cy="75" r="18" fill="#eef6f2" stroke="'+G+'" stroke-width="3"/><text x="380" y="62" text-anchor="middle" font-family="DM Sans,Arial" font-size="22" font-weight="700" fill="'+T+'">'+esc(mid)+'</text><text x="380" y="108" text-anchor="middle" font-family="DM Sans,Arial" font-size="16" fill="'+T+'">'+esc(tip)+'</text></svg><div style="margin-top:9px;padding:9px 11px;border-radius:8px;background:#eef6f2;color:#38574a;font:500 .78rem DM Sans,Arial"><b>PE takeaway:</b> '+esc(tip)+'</div></div>'}
function install(){var app=document.getElementById('app');if(!app)return;var a=app.querySelector('.guide-article')||app;var hs=a.querySelectorAll('h2,h3');for(var i=0;i<hs.length;i++){var h=hs[i],name=h.textContent.trim(),d=null;Object.keys(data).some(function(k){if(name.toLowerCase().indexOf(k.toLowerCase())>-1){d=data[k].slice();d.push(name);return true}});if(!d||h.nextElementSibling&&h.nextElementSibling.classList.contains('ggd'))continue;var w=document.createElement('div');w.innerHTML=diagram(d);h.insertAdjacentElement('afterend',w.firstElementChild)}}
function start(){install();new MutationObserver(install).observe(document.body,{childList:true,subtree:true});setInterval(install,1000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
