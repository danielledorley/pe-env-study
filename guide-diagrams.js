/* Visual study-guide diagrams. Keep these inline SVGs so they stay crisp on desktop/mobile and require no external assets. */
(function () {
  function orificeDiagram() {
    return `
      <section class="guide-visual-card" aria-label="Orifice driving head visual">
        <div class="guide-visual-kicker">VISUAL CONCEPT</div>
        <div class="guide-visual-title">Orifice driving head: what actually pushes the water?</div>
        <div class="guide-visual-formula">Q = C<sub>d</sub>A√(2gh)</div>
        <div class="guide-visual-grid">
          <div class="guide-visual-panel">
            <div class="guide-visual-panel-title">1 · Submerged orifice</div>
            <div class="guide-visual-caption">Water is present on both sides of the opening.</div>
            <svg viewBox="0 0 520 330" role="img" aria-label="Submerged orifice with head equal to the difference between water surface elevations">
              <defs>
                <marker id="orifice-arrow-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2E6F95"/></marker>
              </defs>
              <rect x="28" y="42" width="205" height="250" rx="4" fill="#eaf5fb" stroke="#657785" stroke-width="3"/>
              <rect x="233" y="132" width="250" height="160" rx="4" fill="#eaf5fb" stroke="#657785" stroke-width="3"/>
              <line x1="29" y1="82" x2="232" y2="82" stroke="#2E6F95" stroke-width="3"/>
              <line x1="234" y1="174" x2="482" y2="174" stroke="#2E6F95" stroke-width="3"/>
              <text x="38" y="65" font-family="DM Sans, sans-serif" font-size="15" fill="#263746">Water surface 1</text>
              <text x="338" y="157" font-family="DM Sans, sans-serif" font-size="15" fill="#263746">Water surface 2</text>
              <rect x="226" y="153" width="15" height="42" rx="2" fill="#fff" stroke="#263746" stroke-width="2"/>
              <line x1="243" y1="174" x2="332" y2="174" stroke="#2E6F95" stroke-width="4" marker-end="url(#orifice-arrow-a)"/>
              <text x="285" y="204" font-family="IBM Plex Mono, monospace" font-size="14" fill="#2E6F95">flow</text>
              <line x1="205" y1="82" x2="205" y2="174" stroke="#7A5C61" stroke-width="2" marker-start="url(#orifice-arrow-a)" marker-end="url(#orifice-arrow-a)"/>
              <text x="118" y="130" font-family="IBM Plex Mono, monospace" font-size="16" fill="#7A5C61">h = H₁ − H₂</text>
              <text x="70" y="320" font-family="DM Sans, sans-serif" font-size="14" fill="#53606c">Driving head = difference in water levels</text>
            </svg>
            <div class="guide-visual-equation">h = H<sub>1</sub> − H<sub>2</sub></div>
          </div>
          <div class="guide-visual-panel">
            <div class="guide-visual-panel-title">2 · Free discharge to atmosphere</div>
            <div class="guide-visual-caption">The jet exits into the atmosphere, so downstream water does not push back.</div>
            <svg viewBox="0 0 520 330" role="img" aria-label="Free discharge orifice with head equal to water depth above the orifice centerline">
              <defs>
                <marker id="orifice-arrow-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2E6F95"/></marker>
              </defs>
              <rect x="35" y="42" width="230" height="250" rx="4" fill="#eaf5fb" stroke="#657785" stroke-width="3"/>
              <line x1="36" y1="82" x2="264" y2="82" stroke="#2E6F95" stroke-width="3"/>
              <text x="48" y="65" font-family="DM Sans, sans-serif" font-size="15" fill="#263746">Water surface (atmospheric)</text>
              <rect x="258" y="153" width="15" height="42" rx="2" fill="#fff" stroke="#263746" stroke-width="2"/>
              <path d="M273 174 C330 174 365 190 410 222 C438 242 458 260 478 286" fill="none" stroke="#2E6F95" stroke-width="4" marker-end="url(#orifice-arrow-b)"/>
              <path d="M273 181 C330 181 370 199 414 232 C442 253 461 271 483 298" fill="none" stroke="#78a9d4" stroke-width="2"/>
              <line x1="237" y1="82" x2="237" y2="174" stroke="#7A5C61" stroke-width="2" marker-start="url(#orifice-arrow-b)" marker-end="url(#orifice-arrow-b)"/>
              <text x="86" y="130" font-family="IBM Plex Mono, monospace" font-size="16" fill="#7A5C61">h = depth to centerline</text>
              <text x="292" y="132" font-family="DM Sans, sans-serif" font-size="14" fill="#53606c">orifice centerline</text>
              <text x="342" y="315" font-family="DM Sans, sans-serif" font-size="14" fill="#53606c">free jet → atmosphere</text>
            </svg>
            <div class="guide-visual-equation">h = water depth above the orifice centerline</div>
          </div>
        </div>
        <div class="guide-visual-takeaway"><strong>PE takeaway:</strong> The equation stays the same. Only the definition of the driving head <em>h</em> changes.</div>
      </section>`;
  }

  const originalRenderGuideArticle = window.renderGuideArticle;
  if (typeof originalRenderGuideArticle !== 'function') return;

  window.renderGuideArticle = function (topicId) {
    originalRenderGuideArticle(topicId);
    if (topicId !== 'water-resources') return;
    const article = document.querySelector('.guide-article');
    if (!article || article.querySelector('[data-guide-visual="orifice"]')) return;
    const visual = document.createElement('div');
    visual.setAttribute('data-guide-visual', 'orifice');
    visual.innerHTML = orificeDiagram();
    article.insertBefore(visual.firstElementChild, article.firstChild);
  };
})();
