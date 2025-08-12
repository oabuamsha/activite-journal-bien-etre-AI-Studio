// --- I. ICONS ---
// SVG icons from lucide.dev, to be used in the UI
const icons = {
  edit3: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  barChart3: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
  chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  trendingUp: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  alertTriangle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
};

// --- II. STATE & CONSTANTS ---
interface JournalEntry {
    energy: number;
    mood: string;
    difficultSituations: string;
    bodyReaction: string[];
    mindReaction: string[];
    whatWouldHelp: string;
    positiveAspects: string;
    date?: string;
}

const state: {
  currentDay: number;
  journalEntries: { [day: string]: JournalEntry };
  viewMode: 'entry' | 'view' | 'analysis';
} = {
  currentDay: 1,
  journalEntries: {},
  viewMode: 'entry', // 'entry', 'view', 'analysis'
};

const constants = {
  moods: ['Joyeux', 'Énergique', 'Neutre', 'Fatigué', 'Irritable', 'Anxieux', 'Triste'],
  bodyReactions: ['Maux de tête', 'Tension musculaire', 'Fatigue oculaire', 'Insomnie', 'Problèmes digestifs', 'Douleurs dorsales'],
  mindReactions: ['Difficulté de concentration', 'Pensées répétitives', 'Irritabilité', 'Sentiment dépassé', 'Perte de motivation', 'Stress'],
};

// --- III. DOM ELEMENT REFERENCES ---
const dom = {
  nav: {
    entry: document.getElementById('nav-entry'),
    view: document.getElementById('nav-view'),
    analysis: document.getElementById('nav-analysis'),
  },
  dayNavContainer: document.getElementById('day-navigation-container'),
  contentContainer: document.getElementById('content-container'),
  footer: {
      icon: document.getElementById('footer-icon'),
      title: document.getElementById('footer-title'),
      list: document.getElementById('footer-list'),
  }
};

// --- IV. PERSISTENCE (LocalStorage) ---
const saveEntriesToStorage = () => {
  localStorage.setItem('wellbeingJournalEntries', JSON.stringify(state.journalEntries));
};

const loadEntriesFromStorage = () => {
  const storedEntries = localStorage.getItem('wellbeingJournalEntries');
  state.journalEntries = storedEntries ? JSON.parse(storedEntries) : {};
};

// --- V. CORE LOGIC & HELPER FUNCTIONS ---
const getCurrentEntry = (): JournalEntry => {
  return state.journalEntries[state.currentDay] || {
    energy: 0,
    mood: '',
    difficultSituations: '',
    bodyReaction: [],
    mindReaction: [],
    whatWouldHelp: '',
    positiveAspects: ''
  };
};

const getMostCommon = (arr: string[]): [string, number] | null => {
    if (!arr.length) {
        return null;
    }
    const counts = arr.reduce((acc: Record<string, number>, v: string) => {
        acc[v] = (acc[v] || 0) + 1;
        return acc;
    }, {});
    const sortedEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sortedEntries.length > 0 ? sortedEntries[0] : null;
};

const handleExportCSV = () => {
  const entries = Object.entries(state.journalEntries)
      .map(([day, entry]) => ({ day: parseInt(day, 10), ...entry }))
      .sort((a, b) => a.day - b.day);

  if (entries.length === 0) {
      alert("Aucune entrée à exporter.");
      return;
  }

  const headers = ['Jour', 'Date', 'Énergie (1-5)', 'Humeur', 'Situations difficiles', 'Réactions corporelles', 'Réactions mentales', 'Ce qui aurait aidé', 'Aspects positifs'];
  const formatCell = (cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`;
  const toCsvRow = (entry) => [entry.day, entry.date || '', entry.energy, entry.mood, entry.difficultSituations, entry.bodyReaction.join('; '), entry.mindReaction.join('; '), entry.whatWouldHelp, entry.positiveAspects].map(formatCell).join(',');
  const csvContent = [headers.join(','), ...entries.map(toCsvRow)].join('\r\n');
  const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "journal_bien_etre.csv";
  link.click();
  URL.revokeObjectURL(link.href);
};


// --- VI. RENDER FUNCTIONS ---
const renderDayNavigation = () => {
  const entry = state.journalEntries[state.currentDay];
  dom.dayNavContainer.innerHTML = `
    <button id="prev-day" class="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" ${state.currentDay === 1 ? 'disabled' : ''}>
      ${icons.chevronLeft}
    </button>
    <div class="flex items-center space-x-4">
      ${icons.calendar}
      <span class="font-medium text-gray-800">Jour ${state.currentDay}</span>
      ${entry ? `<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Complété</span>` : ''}
    </div>
    <button id="next-day" class="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
      ${icons.chevronRight}
    </button>
  `;
  document.getElementById('prev-day').addEventListener('click', () => { state.currentDay = Math.max(1, state.currentDay - 1); render(); });
  document.getElementById('next-day').addEventListener('click', () => { state.currentDay += 1; render(); });
};

const renderEntryForm = () => {
  const entry = getCurrentEntry();
  dom.contentContainer.innerHTML = `
    <div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h3 class="text-lg font-semibold text-blue-800 mb-2">Jour ${state.currentDay} - Mon Journal</h3>
        <p class="text-blue-600 text-sm">Prenez quelques minutes pour réfléchir à votre journée de travail.</p>
      </div>

      <!-- Sections -->
      <div class="bg-white p-4 rounded-lg border border-gray-200">
        <label class="block text-sm font-medium text-gray-700 mb-3">Mon énergie du jour (1-5 étoiles)</label>
        <div id="energy-stars" class="flex space-x-2">${[1, 2, 3, 4, 5].map(star => `<button data-value="${star}" aria-label="Noter ${star} étoiles" class="text-3xl transition-colors ${star <= entry.energy ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400">★</button>`).join('')}</div>
      </div>
      
      <div class="bg-white p-4 rounded-lg border border-gray-200">
          <label for="mood-select" class="block text-sm font-medium text-gray-700 mb-3">Mon humeur générale</label>
          <select id="mood-select" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Sélectionnez votre humeur</option>
              ${constants.moods.map(mood => `<option value="${mood}" ${entry.mood === mood ? 'selected' : ''}>${mood}</option>`).join('')}
          </select>
      </div>

      <div class="bg-white p-4 rounded-lg border border-gray-200">
          <label for="difficult-situations" class="block text-sm font-medium text-gray-700 mb-3">Situations difficiles aujourd'hui</label>
          <textarea id="difficult-situations" placeholder="Décrivez les moments difficiles..." class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3">${entry.difficultSituations}</textarea>
      </div>
      
      <div class="bg-white p-4 rounded-lg border border-gray-200">
          <label class="block text-sm font-medium text-gray-700 mb-3">Réactions de mon corps</label>
          <div id="body-reactions" class="grid grid-cols-2 gap-2">${constants.bodyReactions.map(r => `<label class="flex items-center space-x-2"><input type="checkbox" value="${r}" ${entry.bodyReaction.includes(r) ? 'checked' : ''} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="text-sm text-gray-700">${r}</span></label>`).join('')}</div>
      </div>

      <div class="bg-white p-4 rounded-lg border border-gray-200">
          <label class="block text-sm font-medium text-gray-700 mb-3">Réactions de mon esprit</label>
          <div id="mind-reactions" class="grid grid-cols-2 gap-2">${constants.mindReactions.map(r => `<label class="flex items-center space-x-2"><input type="checkbox" value="${r}" ${entry.mindReaction.includes(r) ? 'checked' : ''} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="text-sm text-gray-700">${r}</span></label>`).join('')}</div>
      </div>
      
      <div class="bg-white p-4 rounded-lg border border-gray-200">
          <label for="what-would-help" class="block text-sm font-medium text-gray-700 mb-3">Qu'est-ce qui m'aurait aidé ?</label>
          <textarea id="what-would-help" placeholder="Une pause, du soutien..." class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="2">${entry.whatWouldHelp}</textarea>
      </div>

      <div class="bg-white p-4 rounded-lg border border-gray-200">
          <label for="positive-aspects" class="block text-sm font-medium text-gray-700 mb-3">Qu'est-ce qui m'a fait du bien aujourd'hui ?</label>
          <textarea id="positive-aspects" placeholder="Une réussite, une interaction positive..." class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="2">${entry.positiveAspects}</textarea>
      </div>

      <button id="save-entry" class="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium">Sauvegarder cette entrée</button>
    </div>
  `;
  
  // Attach event listeners
  document.getElementById('save-entry').addEventListener('click', () => {
    const newEntry: JournalEntry = {
      energy: entry.energy, // gets updated by star click handler
      mood: (document.getElementById('mood-select') as HTMLSelectElement).value,
      difficultSituations: (document.getElementById('difficult-situations') as HTMLTextAreaElement).value,
      bodyReaction: Array.from(document.querySelectorAll('#body-reactions input:checked')).map(el => (el as HTMLInputElement).value),
      mindReaction: Array.from(document.querySelectorAll('#mind-reactions input:checked')).map(el => (el as HTMLInputElement).value),
      whatWouldHelp: (document.getElementById('what-would-help') as HTMLTextAreaElement).value,
      positiveAspects: (document.getElementById('positive-aspects') as HTMLTextAreaElement).value,
      date: new Date().toLocaleDateString('fr-FR'),
    };
    state.journalEntries[state.currentDay] = newEntry;
    saveEntriesToStorage();
    alert('Entrée sauvegardée pour le jour ' + state.currentDay);
    render();
  });

  document.getElementById('energy-stars').addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const button = target.closest('button');
    if (button && button.dataset.value) {
      const newEnergyValue = parseInt(button.dataset.value, 10);
      entry.energy = newEnergyValue; // Update the energy on the current entry object.

      // Directly update the stars' appearance without a full re-render.
      const starsContainer = document.getElementById('energy-stars');
      if (starsContainer) {
        const starButtons = starsContainer.querySelectorAll('button');
        starButtons.forEach(starButton => {
          const starValue = parseInt((starButton as HTMLElement).dataset.value, 10);
          if (starValue <= newEnergyValue) {
            starButton.classList.add('text-yellow-400');
            starButton.classList.remove('text-gray-300');
          } else {
            starButton.classList.add('text-gray-300');
            starButton.classList.remove('text-yellow-400');
          }
        });
      }
    }
  });
};

const renderViewer = () => {
  const entries = Object.entries(state.journalEntries).map(([day, entry]) => ({ day: parseInt(day, 10), ...entry })).sort((a,b) => a.day - b.day);
  if (entries.length === 0) {
    dom.contentContainer.innerHTML = `<div class="text-center py-8"><div class="mx-auto h-12 w-12 text-gray-400 mb-4">${icons.calendar}</div><p class="text-gray-500">Aucune entrée enregistrée.</p><p class="text-sm text-gray-400">Commencez par créer votre première entrée.</p></div>`;
    return;
  }
  dom.contentContainer.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Mes entrées de journal</h3>
        <button id="export-csv" class="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">${icons.download}<span class="ml-2">Exporter</span></button>
      </div>
      ${entries.map(entry => `
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-medium text-gray-800">Jour ${entry.day}</h4>
            <div class="flex items-center space-x-2"><span class="text-sm text-gray-500">Énergie:</span><div class="flex space-x-1">${[1, 2, 3, 4, 5].map(star => `<span class="text-lg ${star <= entry.energy ? 'text-yellow-400' : 'text-gray-300'}">★</span>`).join('')}</div></div>
          </div>
          ${entry.mood ? `<p class="text-sm mb-2"><strong>Humeur:</strong> ${entry.mood}</p>` : ''}
          ${entry.difficultSituations ? `<p class="text-sm mb-2"><strong>Situations difficiles:</strong> ${entry.difficultSituations}</p>` : ''}
          ${entry.bodyReaction.length > 0 ? `<p class="text-sm mb-2"><strong>Réactions corporelles:</strong> ${entry.bodyReaction.join(', ')}</p>` : ''}
          ${entry.mindReaction.length > 0 ? `<p class="text-sm mb-2"><strong>Réactions mentales:</strong> ${entry.mindReaction.join(', ')}</p>` : ''}
          ${entry.positiveAspects ? `<p class="text-sm mb-2"><strong>Aspects positifs:</strong> ${entry.positiveAspects}</p>` : ''}
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('export-csv').addEventListener('click', handleExportCSV);
};

const renderAnalysis = () => {
  const entries = Object.values(state.journalEntries);
  if (entries.length < 2) {
    dom.contentContainer.innerHTML = `<div class="text-center py-8"><div class="mx-auto h-12 w-12 text-gray-400 mb-4">${icons.barChart3}</div><p class="text-gray-500">Au moins 2 entrées sont nécessaires.</p><p class="text-sm text-gray-400">Continuez à remplir votre journal.</p></div>`;
    return;
  }
  const avgEnergy = entries.reduce((s, e) => s + e.energy, 0) / entries.length;
  const mostCommonBody = getMostCommon(entries.flatMap(e => e.bodyReaction));
  const mostCommonMind = getMostCommon(entries.flatMap(e => e.mindReaction));

  dom.contentContainer.innerHTML = `
    <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-400"><h3 class="text-lg font-semibold text-purple-800 mb-2">Analyse de vos ${entries.length} entrées</h3><p class="text-purple-600 text-sm">Découvrez les tendances de votre bien-être.</p></div>
        <div class="bg-white p-4 rounded-lg border border-gray-200"><h4 class="font-medium text-gray-800 mb-3 flex items-center">${icons.trendingUp}<span class="ml-2">Niveau d'énergie moyen</span></h4><div class="flex items-center space-x-3"><div class="flex space-x-1">${[1, 2, 3, 4, 5].map(s => `<span class="text-2xl ${s <= Math.round(avgEnergy) ? 'text-yellow-400' : 'text-gray-300'}">★</span>`).join('')}</div><span class="text-lg font-semibold text-gray-700">${avgEnergy.toFixed(1)}/5</span></div></div>
        ${(mostCommonBody || mostCommonMind) ? `<div class="bg-white p-4 rounded-lg border border-gray-200"><h4 class="font-medium text-gray-800 mb-3 flex items-center">${icons.alertTriangle}<span class="ml-2">Signaux d'alerte récurrents</span></h4>${mostCommonBody ? `<div class="mb-2"><span class="font-medium text-orange-600">Corporel:</span><span class="ml-2">${mostCommonBody[0]} (${mostCommonBody[1]}x)</span></div>` : ''}${mostCommonMind ? `<div><span class="font-medium text-orange-600">Mental:</span><span class="ml-2">${mostCommonMind[0]} (${mostCommonMind[1]}x)</span></div>` : ''}</div>` : ''}
        <div class="bg-white p-4 rounded-lg border border-gray-200"><h4 class="font-medium text-gray-800 mb-3 flex items-center">${icons.lightbulb}<span class="ml-2">Recommandations</span></h4><ul class="space-y-2 text-sm text-gray-700 list-disc list-inside">${avgEnergy < 3 ? `<li class="text-red-700">Votre niveau d'énergie est bas. Envisagez de consulter votre médecin.</li>`: ''}${mostCommonBody && mostCommonBody[1] >= 2 ? `<li class="text-orange-700">Symptôme récurrent : ${mostCommonBody[0]}. Pensez à des pauses régulières.</li>` : ''}${mostCommonMind && mostCommonMind[1] >= 2 ? `<li class="text-orange-700">Réaction fréquente : ${mostCommonMind[0]}. Considérez des techniques de gestion du stress.</li>`: ''}<li class="text-green-700">Continuez ce journal pour identifier d'autres tendances sur le long terme.</li></ul></div>
    </div>
  `;
};

const updateNavButtons = () => {
    Object.values(dom.nav).forEach(btn => btn.classList.remove('bg-gray-600', 'text-white'));
    Object.values(dom.nav).forEach(btn => btn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200'));
    const activeBtn = dom.nav[state.viewMode];
    activeBtn.classList.add('bg-gray-600', 'text-white');
    activeBtn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
};

const updateFooter = () => {
    dom.footer.icon.innerHTML = icons.lightbulb;
    dom.footer.title.textContent = "Conseils d'utilisation";
    dom.footer.list.innerHTML = `
        <li>Prenez 5-10 minutes chaque soir pour remplir votre journal</li>
        <li>Soyez honnête et précis dans vos observations</li>
        <li>Après une semaine, analysez vos tendances pour identifier les déclencheurs</li>
        <li>N'hésitez pas à chercher de l'aide si les signaux d'alerte persistent</li>
    `;
};

const render = () => {
  updateNavButtons();
  if (state.viewMode === 'entry') {
    dom.dayNavContainer.className = 'flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg';
    renderDayNavigation();
    renderEntryForm();
  } else {
    dom.dayNavContainer.className = 'hidden';
    if (state.viewMode === 'view') renderViewer();
    else if (state.viewMode === 'analysis') renderAnalysis();
  }
};

// --- VII. EVENT LISTENERS & INITIALIZATION ---
const init = () => {
  // Setup main nav buttons
  dom.nav.entry.innerHTML = `${icons.edit3}<span class="ml-2">Saisir une entrée</span>`;
  dom.nav.view.innerHTML = `${icons.eye}<span class="ml-2">Voir mes entrées</span>`;
  dom.nav.analysis.innerHTML = `${icons.barChart3}<span class="ml-2">Analyser</span>`;

  // Attach nav event listeners
  Object.keys(dom.nav).forEach(key => {
    dom.nav[key].addEventListener('click', () => {
      state.viewMode = key as 'entry' | 'view' | 'analysis';
      render();
    });
  });

  // Load data and perform initial render
  loadEntriesFromStorage();
  updateFooter();
  render();
};

// Start the application
init();