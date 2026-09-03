(function(){
const R=[
['6.022x10^23','$6.022\\times10^{23}$'],
['mg/L = (mol/L) x (molecular weight, g/mol) x 1,000','$mg/L=(mol/L)\\times(MW\\,/\\,g\\!\\cdot\\!mol^{-1})\\times1{,}000$'],
['H2O <-> H+ + OH-','$H_2O\\rightleftharpoons H^+ + OH^-$'],
['Kw = [H+][OH-] = 1.0x10^-14','$K_w=[H^+][OH^-]=1.0\\times10^{-14}$'],
['pH + pOH = 14','$pH+pOH=14$'],['pH = -log[H+]','$pH=-\\log[H^+]$'],['pOH = -log[OH-]','$pOH=-\\log[OH^-]$'],
['C = C0 x e^(-kt)','$C=C_0e^{-kt}$'],['A1v1 = A2v2','$A_1v_1=A_2v_2$'],['Q = Av','$Q=Av$'],
['v^2/2g','$v^2/(2g)$'],['P/gamma','$P/\\gamma$'],['Q = Cd x A x sqrt(2gh)','$Q=C_dA\\sqrt{2gh}$'],
['v = (1.49/n) R^(2/3) S^(1/2)','$v=(1.49/n)R^{2/3}S^{1/2}$'],['Q = CiA','$Q=CiA$'],['Q = KAi','$Q=KAi$'],['v = Ki','$v=Ki$'],
['T = K x b','$T=Kb$'],['v_c = v_s/R','$v_c=v_s/R$'],['v_c=v_s/R','$v_c=v_s/R$'],
['N = N0 x (1/2)^(t/half-life)','$N=N_0(1/2)^{t/t_{1/2}}$'],['F = P(1+i)^n','$F=P(1+i)^n$'],['P = F/(1+i)^n','$P=F/(1+i)^n$'],
['Capitalized Cost = A/i','$\\mathrm{Capitalized\\ Cost}=A/i$'],['annual depreciation = (Cost - Salvage Value) / Useful Life','$D=(C-S)/N$'],
['effective rate = (1 + nominal/m)^m - 1','$i_{eff}=(1+i_{nom}/m)^m-1$'],['F = Pe^(rn)','$F=Pe^{rn}$'],
['dose = demand + residual','$D=Demand+Residual$'],['Total hardness = carbonate hardness + non-carbonate hardness','$TH=CH+NCH$'],
['hardness = carbonate hardness + non-carbonate hardness','$TH=CH+NCH$'],['alkalinity = bicarbonate + carbonate','$Alk\\approx[HCO_3^-]+[CO_3^{2-}]$'],
['Koc = 0.63 x Kow','$K_{oc}=0.63K_{ow}$'],['R = 1 + (bulk density / porosity) x Kd','$R=1+(\\rho_b/n)K_d$'],
['V = Qt','$V=Qt$'],['V=Qt','$V=Qt$'],['I2 = I1 x (d1/d2)^2','$I_2=I_1(d_1/d_2)^2$']
];
function run(){const a=document.getElementById('app');if(!a||typeof renderMathInElement!=='function')return;const w=document.createTreeWalker(a,NodeFilter.SHOW_TEXT),ns=[];let n;while(w.nextNode()){n=w.currentNode;if(n.parentElement&&!n.parentElement.closest('.katex,code,pre'))ns.push(n)}ns.forEach(n=>{let s=n.nodeValue;R.forEach(x=>{s=s.split(x[0]).join(x[1])});n.nodeValue=s});renderMathInElement(a,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false},{left:'\\(',right:'\\)',display:false},{left:'\\[',right:'\\]',display:true}],throwOnError:false})}
const a=document.getElementById('app');if(a)new MutationObserver(()=>setTimeout(run,0)).observe(a,{childList:true,subtree:true});window.addEventListener('load',run);run();
})();