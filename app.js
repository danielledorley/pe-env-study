const STORAGE_KEY = 'pe-study-progress-v1';

const state = {
  topics: [],
  flashcards: [],
  problems: [],
  view: 'home',
  progress: loadProgress(),
  session: null, // active flashcard or problem session
};

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { cards: {}, problems: {} };
  } catch (e) {
    return { cards: {}, problems: {} };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function topicById(id) {
  return state.topics.find(t => t.id === id) || { name: id, color: '#2E4150' };
}

async function loadData() {
  const [topics, flashcards, problems] = await Promise.all([
    fetch('data/topics.json').then(r => r.json()),
    fetch('data/flashcards.json').then(r => r.json()),
    fetch('data/problems.json').then(r => r.json()),
  ]);
  state.topics = topics;
  state.flashcards = flashcards;
  state.problems = problems;
}

function setView(view) {
  state.view = view;
  state.session = null;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
  render();
}

document.getElementById('tabs').addEventListener('click', (e) => {
  const btn = e.target.closest('.tab');
  if (btn) setView(btn.dataset.view);
});

function render() {
  const app = document.getElementById('app');
  if (state.view === 'home') return renderHome(app);
  if (state.view === 'flashcards') return renderFlashcardsHub(app);
  if (state.view === 'problems') return renderProblemsHub(app);
}

/* ---------- HOME ---------- */
function renderHome(app) {
  const cardsDue = countDueCards();
  app.innerHTML = `
    <h1 class="hero">Study Bench</h1>
    <p class="hero-sub">Flashcards and problem sets for the PE Environmental exam, organized by NCEES exam-spec area. ${cardsDue} card${cardsDue === 1 ? '' : 's'} due for review today.</p>
    <div class="topic-grid">
      ${state.topics.map(t => renderTopicCard(t)).join('')}
    </div>
  `;
  app.querySelectorAll('[data-action="study-topic"]').forEach(btn => {
    btn.addEventListener('click', () => startFlashcardSession(btn.dataset.topic));
  });
  app.querySelectorAll('[data-action="quiz-topic"]').forEach(btn => {
    btn.addEventListener('click', () => startProblemSession(btn.dataset.topic));
  });
}

function renderTopicCard(t) {
  const cards = state.flashcards.filter(c => c.topic === t.id);
  const probs = state.problems.filter(p => p.topic === t.id);
  const known = cards.filter(c => (state.progress.cards[c.id]?.box || 0) >= 3).length;
  const pct = cards.length ? Math.round((known / cards.length) * 100) : 0;
  return `
    <div class="topic-card" style="--accent:${t.color}">
      <h3>${t.name}</h3>
      <p>${t.description}</p>
      <div class="topic-stats">
        <span>${cards.length} cards</span>
        <span>${probs.length} problems</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="row">
        <button class="btn primary small" data-action="study-topic" data-topic="${t.id}" ${cards.length ? '' : 'disabled'}>Study cards</button>
        <button class="btn small" data-action="quiz-topic" data-topic="${t.id}" ${probs.length ? '' : 'disabled'}>Quiz</button>
      </div>
    </div>
  `;
}

function countDueCards() {
  const today = Date.now();
  return state.flashcards.filter(c => {
    const p = state.progress.cards[c.id];
    return !p || p.due <= today;
  }).length;
}

/* ---------- FLASHCARDS HUB ---------- */
function renderFlashcardsHub(app) {
  app.innerHTML = `
    <h1 class="hero">Flashcards</h1>
    <p class="hero-sub">Pick a topic, or study everything due today.</p>
    <div class="filter-chips">
      <button class="chip" data-topic="">All topics</button>
      ${state.topics.map(t => `<button class="chip" data-topic="${t.id}">${t.name}</button>`).join('')}
    </div>
    <div id="flashcard-session"></div>
  `;
  app.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => startFlashcardSession(chip.dataset.topic));
  });
  startFlashcardSession('');
}

function startFlashcardSession(topicId) {
  let pool = topicId ? state.flashcards.filter(c => c.topic === topicId) : state.flashcards.slice();
  if (!pool.length) {
    renderSessionEmpty('No flashcards in this topic yet — add some to data/flashcards.json.');
    return;
  }
  // Prioritize due / never-seen cards, shuffle within priority
  const today = Date.now();
  pool.sort((a, b) => {
    const pa = state.progress.cards[a.id];
    const pb = state.progress.cards[b.id];
    const dueA = !pa || pa.due <= today ? 0 : 1;
    const dueB = !pb || pb.due <= today ? 0 : 1;
    return dueA - dueB || Math.random() - 0.5;
  });
  state.session = { type: 'flashcards', queue: pool, index: 0, flipped: false, topicId };
  ensureSessionMount();
  renderFlashcardSession();
}

function ensureSessionMount() {
  if (state.view !== 'flashcards') setViewSilently('flashcards');
  let mount = document.getElementById('flashcard-session');
  if (!mount) {
    // full view wasn't rendered (e.g. called from home) — render hub shell first
    renderFlashcardsHub(document.getElementById('app'));
  }
}

function setViewSilently(view) {
  state.view = view;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
}

function renderFlashcardSession() {
  const mount = document.getElementById('flashcard-session');
  const s = state.session;
  if (!mount || !s) return;
  if (s.index >= s.queue.length) {
    mount.innerHTML = `<div class="empty-state">Session complete — ${s.queue.length} card${s.queue.length === 1 ? '' : 's'} reviewed.<br><br><button class="btn primary" id="restart-session">Study again</button></div>`;
    document.getElementById('restart-session').addEventListener('click', () => startFlashcardSession(s.topicId));
    return;
  }
  const card = s.queue[s.index];
  const t = topicById(card.topic);
  mount.innerHTML = `
    <div class="session-bar"><span>Card ${s.index + 1} of ${s.queue.length}</span><span>${t.name}</span></div>
    <div class="card-stage">
      <div class="flashcard" style="--accent:${t.color}" id="flip-target">
        <div class="eyebrow">${s.flipped ? 'Answer' : 'Question'}</div>
        <div class="content">${s.flipped ? card.back : card.front}</div>
        <div class="hint">tap to flip</div>
      </div>
    </div>
    <div class="grade-row">
      ${s.flipped ? `
        <button class="grade-btn again" id="grade-again">Again</button>
        <button class="grade-btn good" id="grade-good">Got it</button>
      ` : `<button class="btn" id="reveal-btn">Show answer</button>`}
    </div>
  `;
  document.getElementById('flip-target').addEventListener('click', () => {
    s.flipped = !s.flipped;
    renderFlashcardSession();
  });
  const revealBtn = document.getElementById('reveal-btn');
  if (revealBtn) revealBtn.addEventListener('click', (e) => { e.stopPropagation(); s.flipped = true; renderFlashcardSession(); });
  const again = document.getElementById('grade-again');
  const good = document.getElementById('grade-good');
  if (again) again.addEventListener('click', (e) => { e.stopPropagation(); gradeCard(card, false); });
  if (good) good.addEventListener('click', (e) => { e.stopPropagation(); gradeCard(card, true); });
}

function gradeCard(card, gotIt) {
  const p = state.progress.cards[card.id] || { box: 0 };
  const box = gotIt ? Math.min((p.box || 0) + 1, 4) : 0;
  const intervalDays = [0, 1, 3, 7, 21][box];
  state.progress.cards[card.id] = { box, due: Date.now() + intervalDays * 86400000 };
  saveProgress();
  state.session.index += 1;
  state.session.flipped = false;
  renderFlashcardSession();
}

function renderSessionEmpty(msg) {
  ensureSessionMount();
  document.getElementById('flashcard-session').innerHTML = `<div class="empty-state">${msg}</div>`;
}

/* ---------- PROBLEM SETS ---------- */
function renderProblemsHub(app) {
  app.innerHTML = `
    <h1 class="hero">Problem Sets</h1>
    <p class="hero-sub">Multiple-choice practice with worked explanations.</p>
    <div class="filter-chips">
      <button class="chip" data-topic="">All topics</button>
      ${state.topics.map(t => `<button class="chip" data-topic="${t.id}">${t.name}</button>`).join('')}
    </div>
    <div id="problem-session"></div>
  `;
  app.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => startProblemSession(chip.dataset.topic));
  });
  startProblemSession('');
}

function startProblemSession(topicId) {
  let pool = topicId ? state.problems.filter(p => p.topic === topicId) : state.problems.slice();
  if (state.view !== 'problems') setViewSilently('problems');
  let mount = document.getElementById('problem-session');
  if (!mount) { renderProblemsHub(document.getElementById('app')); mount = document.getElementById('problem-session'); }
  if (!pool.length) {
    mount.innerHTML = `<div class="empty-state">No problems in this topic yet — add some to data/problems.json.</div>`;
    return;
  }
  pool = pool.sort(() => Math.random() - 0.5);
  state.session = { type: 'problems', queue: pool, index: 0, answered: false, correctCount: 0, topicId };
  renderProblemSession();
}

function renderProblemSession() {
  const mount = document.getElementById('problem-session');
  const s = state.session;
  if (!mount || !s) return;
  if (s.index >= s.queue.length) {
    mount.innerHTML = `<div class="empty-state">Quiz complete — ${s.correctCount} / ${s.queue.length} correct.<br><br><button class="btn primary" id="restart-quiz">Try again</button></div>`;
    document.getElementById('restart-quiz').addEventListener('click', () => startProblemSession(s.topicId));
    return;
  }
  const prob = s.queue[s.index];
  const t = topicById(prob.topic);
  mount.innerHTML = `
    <div class="session-bar"><span>Question ${s.index + 1} of ${s.queue.length}</span><span>Score: ${s.correctCount}/${s.index}</span></div>
    <div class="problem-card" style="--accent:${t.color}">
      <div class="eyebrow">${t.name}</div>
      <div class="problem-question">${prob.question}</div>
      ${prob.choices.map((c, i) => `<button class="choice" data-index="${i}">${c}</button>`).join('')}
      <div id="explanation-slot"></div>
    </div>
    <div class="session-controls" style="margin-top:16px;">
      <button class="btn" id="next-question" style="display:none;">Next question →</button>
    </div>
  `;
  mount.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', () => answerProblem(prob, parseInt(btn.dataset.index, 10)));
  });
}

function answerProblem(prob, chosenIndex) {
  const s = state.session;
  if (s.answered) return;
  s.answered = true;
  const correct = chosenIndex === prob.answerIndex;
  if (correct) s.correctCount += 1;
  document.querySelectorAll('.choice').forEach((btn, i) => {
    btn.disabled = true;
    if (i === prob.answerIndex) btn.classList.add('correct');
    else if (i === chosenIndex) btn.classList.add('incorrect');
  });
  document.getElementById('explanation-slot').innerHTML = `<div class="explanation">${prob.explanation || ''}</div>`;
  const nextBtn = document.getElementById('next-question');
  nextBtn.style.display = 'inline-block';
  nextBtn.addEventListener('click', () => {
    s.index += 1;
    s.answered = false;
    renderProblemSession();
  });
}

/* ---------- INIT ---------- */
loadData().then(render);
