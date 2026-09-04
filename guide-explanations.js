/* Short teaching callouts inserted beside the matching Study Guide sections. */
(function(){
  function callout(kind,title,html){
    return `<section class="guide-explanation-callout" data-guide-explanation="${kind}"><div class="guide-explanation-kicker">PE EXAM EXPLANATION</div><h4>${title}</h4><div class="guide-explanation-body">${html}</div></section>`;
  }
  function install(topicId){
    if(topicId!=='water-resources')return;
    const article=document.querySelector('.guide-article'); if(!article)return;
    article.querySelectorAll('[data-guide-explanation]').forEach(e=>e.remove());
    const headings=[...article.querySelectorAll('h2,h3')];
    const energy=headings.find(h=>h.textContent.trim()==='The energy equation');
    const orifice=headings.find(h=>h.textContent.trim()==='Discharge from tanks and orifices');
    if(energy)energy.insertAdjacentHTML('afterend',callout('bernoulli','Bernoulli’s equation — think in energy heads',`<p>For a closed-conduit flow, the total head is the sum of <strong>elevation head</strong>, <strong>pressure head</strong>, and <strong>velocity head</strong>:</p><div class="guide-explanation-equation">H = z + p/γ + v²/(2g)</div><p>Between two points, include energy added by a pump and subtract losses from pipe friction and fittings:</p><div class="guide-explanation-equation">z₁ + p₁/γ + v₁²/(2g) + hₚ = z₂ + p₂/γ + v₂²/(2g) + hL</div><p><strong>How to use it:</strong> choose two points, write all three heads at each point, then add pump head and subtract losses. If the pipe gets smaller, continuity changes the velocity term; if a pump is present, the pump raises the available energy head.</p><p class="guide-explanation-tip"><strong>PE shortcut:</strong> If both points are open to atmosphere, pressure heads cancel. If the pipe diameter is unchanged, the velocity heads cancel. Then the problem may reduce to elevation change plus losses and/or pump head.</p>`));
    if(orifice)orifice.insertAdjacentHTML('afterend',callout('orifice','Orifice discharge — identify the driving head first',`<p>The real-world discharge equation keeps the same form:</p><div class="guide-explanation-equation">Q = C<sub>d</sub>A√(2gh)</div><p>The important part is deciding what <strong>h</strong> means.</p><ul><li><strong>Free discharge to atmosphere:</strong> h is the vertical water depth from the free surface to the orifice centerline.</li><li><strong>Submerged orifice:</strong> h is the difference between the upstream and downstream water-surface elevations, h = H₁ − H₂.</li></ul><p>Why? A free jet has atmospheric pressure downstream, so the driving pressure difference is represented by the upstream water depth. A submerged opening has water pushing back on the other side, so only the <em>difference</em> in water-surface head drives the flow.</p><p class="guide-explanation-tip"><strong>PE shortcut:</strong> Same equation, different h. Draw both water surfaces before plugging anything into the calculator.</p>`));
  }
  const original=window.renderGuideArticle;
  if(typeof original==='function')window.renderGuideArticle=function(topicId){original(topicId);install(topicId);};
})();
