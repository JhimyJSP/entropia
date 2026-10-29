(function () {
  const book = window.ENTROPIA_BOOK;
  const source = window.ENTROPIA_CHAPTER_1
    .replace(
      'Sistema físico: gasSistema económico: mercadoMoléculasCompradores y vendedoresPosiciones y velocidadesDinero, inventarios, órdenes y expectativasColisiones e interaccionesTransacciones e intercambio de informaciónPresión y temperaturaPrecios, volumen y volatilidadDistribución de velocidadesDistribución de riqueza o rendimientosLa correspondencia',
      'Sistema físico | Sistema económico\n---|---\nMoléculas | Compradores y vendedores\nPosiciones y velocidades | Dinero, inventarios, órdenes y expectativas\nColisiones e interacciones | Transacciones e intercambio de información\nPresión y temperatura | Precios, volumen y volatilidad\nDistribución de velocidades | Distribución de riqueza o rendimientos\n\nLa correspondencia'
    )
    .replace(
      'Día (t)Precio (P_t)01001102210131054103Podemos analizar directamente',
      'Día (t) | Precio (P_t)\n---|---\n0 | 100\n1 | 102\n2 | 101\n3 | 105\n4 | 103\n\nPodemos analizar directamente'
    )
    .replace(
      'Compradores: precioCantidadVendedores: precioCantidad99.9040100.103099.8060100.205099.70100100.3080Los compradores',
      'Compradores: precio | Cantidad | Vendedores: precio | Cantidad\n---|---|---|---\n99.90 | 40 | 100.10 | 30\n99.80 | 60 | 100.20 | 50\n99.70 | 100 | 100.30 | 80\n\nLos compradores'
    )
    .replace(/^Implementa tarjetas desplegables.*\r?\n/m, '')
    .replace(/^El estudiante debe poder intentar responder.*\r?\n/m, '');
  if (!book || !source) throw new Error('No se pudo cargar el contenido del capítulo 1.');

  const escapeHTML = value => String(value).replace(/[&<>"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
  })[char]);

  function inline(text) {
    return escapeHTML(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function renderMarkdown(markdown) {
    const lines = markdown.split(/\r?\n/);
    const html = [];
    let paragraph = [];
    let listType = '';
    let quote = [];
    let table = [];

    const flushParagraph = () => {
      if (paragraph.length) html.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    };
    const flushList = () => {
      if (listType) html.push(`</${listType}>`);
      listType = '';
    };
    const flushQuote = () => {
      if (quote.length) html.push(`<blockquote>${quote.map(line => `<p>${inline(line)}</p>`).join('')}</blockquote>`);
      quote = [];
    };
    const flushTable = () => {
      if (table.length) {
        const rows = table.map(row => row.split('|').map(cell => cell.trim()).filter(Boolean));
        const validRows = rows.filter(row => !row.every(cell => /^[-: ]+$/.test(cell)));
        if (validRows.length) {
          html.push('<div class="chapter-table-wrap"><table class="chapter-table">');
          validRows.forEach((row, index) => {
            const tag = index === 0 ? 'th' : 'td';
            html.push(`<tr>${row.map(cell => `<${tag}>${inline(cell)}</${tag}>`).join('')}</tr>`);
          });
          html.push('</table></div>');
        }
      }
      table = [];
    };

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const trimmed = line.trim();

      if (trimmed === '[' || trimmed === '\\[') {
        flushParagraph(); flushList(); flushQuote(); flushTable();
        const equation = [];
        index += 1;
        while (index < lines.length && lines[index].trim() !== ']' && lines[index].trim() !== '\\]') {
          equation.push(lines[index]);
          index += 1;
        }
        html.push(`<div class="katex-eq" data-tex="${escapeHTML(equation.join('\n'))}"></div>`);
        continue;
      }
      if (!trimmed) {
        flushParagraph(); flushList(); flushQuote(); flushTable();
        continue;
      }
      if (trimmed.startsWith('# ') && !/^# (CAPÍTULO 1\.|1\.[1-5]\b|EJERCICIOS|MAPA CONCEPTUAL)/.test(trimmed)) {
        flushParagraph(); flushList(); flushQuote(); flushTable();
        html.push(`<div class="katex-eq" data-tex="${escapeHTML(trimmed.slice(2))}"></div>`);
        continue;
      }
      if (/^#{1,6}\s/.test(trimmed)) {
        flushParagraph(); flushList(); flushQuote(); flushTable();
        const depth = trimmed.match(/^#+/)[0].length;
        const title = trimmed.replace(/^#{1,6}\s+/, '');
        html.push(`<h${Math.min(depth + 1, 6)}>${inline(title)}</h${Math.min(depth + 1, 6)}>`);
        continue;
      }
      if (/^---+$/.test(trimmed)) {
        flushParagraph(); flushList(); flushQuote(); flushTable();
        html.push('<hr>');
        continue;
      }
      if (trimmed.startsWith('|') || trimmed.includes('|')) {
        flushParagraph(); flushList(); flushQuote();
        table.push(trimmed);
        continue;
      }
      if (trimmed.startsWith('>')) {
        flushParagraph(); flushList(); flushTable();
        quote.push(trimmed.replace(/^>\s?/, ''));
        continue;
      }
      flushQuote(); flushTable();
      const bullet = trimmed.match(/^[-*]\s+(.+)/);
      const numbered = trimmed.match(/^\d+\.\s+(.+)/);
      if (bullet || numbered) {
        flushParagraph();
        const nextType = bullet ? 'ul' : 'ol';
        if (listType && listType !== nextType) flushList();
        if (!listType) {
          listType = nextType;
          html.push(`<${listType} class="clean-list">`);
        }
        html.push(`<li>${inline((bullet || numbered)[1])}</li>`);
        continue;
      }
      flushList();
      paragraph.push(trimmed);
    }

    flushParagraph(); flushList(); flushQuote(); flushTable();
    return html.join('');
  }

  function simulation(type, title) {
    const heading = `<h3>${escapeHTML(title)}</h3>`;
    const wrapper = (content, note = '') => `<section class="chapter-simulation" data-sim="${type}">${heading}${note ? `<p class="sim-note">${note}</p>` : ''}${content}</section>`;
    const range = (id, label, min, max, value, step = 1) =>
      `<label class="sim-control">${label}<input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"><output for="${id}">${value}</output></label>`;
    const number = (id, label, value, min = 1, max = 1000, step = 1) =>
      `<label class="sim-control">${label}<input id="${id}" type="number" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
    const button = (id, text) => `<button class="sim-button" id="${id}" type="button">${text}</button>`;

    if (type === 'agents') return wrapper(`
      <p class="sim-equation">Q = Σ sᵢ &nbsp; · &nbsp; m = Q / N &nbsp; · &nbsp; P₁ = P₀ + λQ</p>
      <div class="agent-grid">${[1, 1, -1, 1, -1].map((state, index) => `<button class="agent ${state > 0 ? 'buyer' : 'seller'}" data-agent="${index}" aria-pressed="${state > 0}">Agente ${index + 1}<strong>${state > 0 ? 'Compra' : 'Vende'}</strong></button>`).join('')}</div>
      ${range('agent-impact', 'Impacto λ', 0.1, 2, 0.5, 0.1)}
      <div class="sim-metrics"><span>Desequilibrio Q <b id="agent-q">1</b></span><span>Magnetización m <b id="agent-m">0.20</b></span><span>Precio final <b id="agent-price">100.50</b></span></div>
      <div class="sim-bar" id="agent-bar" aria-label="Desequilibrio de órdenes"></div>
      <p id="agent-equation">P₁ = 100 + (0.5)(1) = 100.5</p>
      <div class="sim-actions">${button('agent-all-buy', 'Todos compran')}${button('agent-all-sell', 'Todos venden')}${button('agent-reset', 'Reiniciar decisiones')}</div>
    `, 'Cambia la decisión de cada agente y predice el precio antes de observarlo.');

    if (type === 'monte-carlo') return wrapper(`
      <div class="sim-controls">${number('mc-agents', 'Agentes N', 1000, 10, 5000)}${range('mc-probability', 'Probabilidad de compra p', 0, 1, 0.6, 0.01)}${number('mc-runs', 'Experimentos M', 500, 20, 5000)}${number('mc-seed', 'Semilla', 17, 0, 999999)}</div>
      <div class="sim-actions">${button('mc-run', 'Ejecutar Monte Carlo')}${button('mc-reset', 'Restablecer')}</div>
      <div class="sim-metrics"><span>Media empírica <b id="mc-mean">—</b></span><span>Media teórica <b id="mc-expected">—</b></span><span>Varianza <b id="mc-variance">—</b></span><span>Desv. estándar <b id="mc-deviation">—</b></span></div>
      <div class="sim-chart" id="mc-chart" aria-label="Histograma del desequilibrio"></div>
      <p>La simulación usa decisiones independientes: E[Q] = N(2p − 1), Var(Q) = 4Np(1 − p).</p>
    `, 'La misma semilla reproduce los mismos experimentos.');

    if (type === 'correlated') return wrapper(`
      ${number('corr-agents', 'Agentes N', 1000, 20, 5000)}${range('corr-strength', 'Seguimiento de señal c', 0, 1, 0.3, 0.01)}${number('corr-runs', 'Experimentos', 400, 50, 2000)}${number('corr-seed', 'Semilla', 2026, 0, 999999)}
      <div class="sim-actions">${button('corr-run', 'Comparar sistemas')}</div>
      <div class="sim-metrics"><span>Varianza independiente <b id="corr-independent">—</b></span><span>Varianza correlacionada <b id="corr-empirical">—</b></span><span>Predicción teórica <b id="corr-theory">—</b></span></div>
      <div class="sim-chart" id="corr-chart"></div>
      <p>Para este mecanismo, Var(Q) = N + N(N − 1)c². c = 0 representa independencia y c = 1 sincronía total.</p>
    `, 'Cada experimento correlacionado comparte una señal aleatoria; las decisiones no se interpretan como evidencia de causalidad real.');

    if (type === 'orderbook') return wrapper(`
      <div class="sim-controls">${number('book-size', 'Tamaño de orden', 50, 1, 500)}${number('book-limit-price', 'Precio límite', 99.8, 90, 110, 0.1)}</div>
      <div class="sim-actions">${button('book-add-bid', 'Añadir compra limitada')}${button('book-add-ask', 'Añadir venta limitada')}${button('book-buy', 'Mercado: comprar')}${button('book-sell', 'Mercado: vender')}${button('book-reset', 'Reiniciar libro')}</div>
      <div class="sim-metrics"><span>Mejor bid <b id="book-bid">—</b></span><span>Mejor ask <b id="book-ask">—</b></span><span>Spread <b id="book-spread">—</b></span><span>Precio medio <b id="book-mid">—</b></span></div>
      <div id="book-levels"></div><p id="book-result" aria-live="polite">Libro de órdenes inicializado.</p>
    `, 'Las órdenes de mercado consumen primero el mejor precio disponible y pueden ejecutarse parcialmente.');

    if (type === 'returns') return wrapper(`
      <div class="sim-controls">${range('return-start', 'Precio inicial P₀', 20, 200, 100)}${range('return-end', 'Precio final P₁', 20, 200, 110)}</div>
      <div class="sim-metrics"><span>Rendimiento simple <b id="return-simple">—</b></span><span>Rendimiento logarítmico <b id="return-log">—</b></span></div>
      <p id="return-equation"></p><div class="sim-chart" id="return-chart"></div>
      <p>Para cambios pequeños, ln(1 + R) ≈ R. Los rendimientos logarítmicos se suman entre períodos.</p>
    `, 'Mueve los precios y compara los dos rendimientos en porcentaje.');

    if (type === 'tails') return wrapper(`
      ${number('tails-samples', 'Muestras', 1200, 100, 5000)}${range('tails-df', 'Grados de libertad ν', 3, 30, 5)}${number('tails-seed', 'Semilla', 891, 0, 999999)}
      <div class="sim-actions">${button('tails-run', 'Generar muestras')}</div>
      <div class="sim-chart" id="tails-chart"></div>
      <div class="sim-metrics"><span>|Z| > 2 normal <b id="tails-normal">—</b></span><span>|T| > 2 estandarizada <b id="tails-student">—</b></span></div>
      <p>La t de Student se estandariza para comparar varianzas (ν &gt; 2). Son muestras simuladas, no datos de mercado.</p>
    `, 'La semilla fija permite repetir exactamente una comparación.');

    if (type === 'volatility') return wrapper(`
      ${range('vol-calm', 'Volatilidad tranquila (%)', 0.1, 3, 0.8, 0.1)}${range('vol-turbulent', 'Volatilidad turbulenta (%)', 0.1, 6, 3, 0.1)}${number('vol-seed', 'Semilla de perturbaciones', 24, 0, 999999)}
      <div class="sim-actions">${button('vol-run', 'Generar trayectoria')}${button('vol-new', 'Nuevas perturbaciones')}</div>
      <div class="sim-chart" id="vol-chart"></div><div class="sim-metrics"><span>Precio inicial <b>100</b></span><span>Precio final <b id="vol-final">—</b></span></div>
      <p id="vol-equation">rₜ = σₜεₜ; Pₜ₊₁ = Pₜ exp(rₜ). La volatilidad controla la magnitud, no la dirección.</p>
    `, 'Al cambiar solo la volatilidad se conservan las mismas perturbaciones aleatorias.');

    if (type === 'network') return wrapper(`
      ${range('net-factor', 'Intensidad del factor común', 0, 0.95, 0.6, 0.05)}${number('net-observations', 'Observaciones', 250, 50, 1000, 50)}${number('net-seed', 'Semilla', 39, 0, 999999)}
      <div class="sim-actions">${button('net-run', 'Generar activos')}</div>
      <div class="sim-chart" id="net-matrix"></div><p>El modelo usa un factor común y ruido específico. Correlación no significa causalidad.</p>
    `, 'Ajusta el factor compartido y observa cómo cambia la matriz de correlación.');

    if (type === 'regimes') return wrapper(`
      ${range('regime-stay-calm', 'Permanecer tranquilo p₁₁', 0, 1, 0.9, 0.05)}${range('regime-stay-turbulent', 'Permanecer turbulento p₂₂', 0, 1, 0.75, 0.05)}${range('regime-calm-vol', 'Volatilidad tranquila (%)', 0.1, 4, 0.5, 0.1)}${range('regime-turb-vol', 'Volatilidad turbulenta (%)', 0.1, 8, 3, 0.1)}${range('regime-calm-mean', 'Media tranquila (%)', -2, 2, 0, 0.1)}${range('regime-turb-mean', 'Media turbulenta (%)', -2, 2, 0, 0.1)}${number('regime-periods', 'Períodos', 100, 20, 300)}${number('regime-seed', 'Semilla', 48, 0, 999999)}
      <div class="sim-actions">${button('regime-run', 'Simular regímenes')}</div><div class="sim-chart" id="regime-chart"></div><p class="sim-metrics">Transición T = [[p₁₁, 1−p₁₁], [1−p₂₂, p₂₂]].</p><p id="regime-stats"></p>
    `, 'El estado generado es conocido en esta simulación; no es una estimación de un régimen real.');

    if (type === 'noise') return wrapper(`
      ${range('noise-amplitude', 'Amplitud del ruido', 0, 3, 1, 0.1)}<div class="sim-chart" id="noise-chart"></div>
      <p>yₜ = xₜ + εₜ. La serie real es una señal artificial conocida; el ruido es normal de media cero.</p>
    `, 'Modifica el ruido de medición y compara la señal observada con el estado real.');

    if (type === 'liquidity') return wrapper(`
      ${number('liquidity-size', 'Tamaño de compra', 100, 1, 1000)}
      <div class="sim-actions">${button('liquidity-run', 'Comparar ambos mercados')}</div><div class="sim-chart" id="liquidity-results"></div>
    `, 'Misma orden de compra, dos profundidades hipotéticas. No son cotizaciones reales.');

    if (type === 'particles') return wrapper(`
      ${range('particle-count', 'Número de elementos', 10, 100, 40)}
      <div class="sim-chart" id="particle-panels"></div>
      <p>La analogía compara estructuras estadísticas; las personas no obedecen leyes de colisión molecular.</p>
    `, 'Observa los estados individuales y la magnitud agregada sin confundir analogía con identidad.');

    if (type === 'process') return wrapper(`
      <div class="process-flow">${['Agentes', 'Interacciones', 'Dinámica', 'Observaciones', 'Contrastación'].map((step, index) => `<button type="button" class="process-step" data-step="${index}">${step}</button>`).join('<span aria-hidden="true">→</span>')}</div>
      <p class="process-description" id="process-description">Selecciona una etapa para ver qué pregunta científica responde.</p>
    `, 'Una investigación distingue hipótesis, mecanismo, datos y contraste.');
    if (type === 'map') return wrapper(`
      <div class="process-flow">${['Decisiones individuales', 'Interacciones e instituciones', 'Transacciones y precios', 'Datos y distribuciones', 'Modelos y contrastación'].map((step, index) => `<button type="button" class="process-step" data-step="${index}">${step}</button>`).join('<span aria-hidden="true">→</span>')}</div>
      <p class="process-description" id="process-description">Selecciona un concepto para recorrer el mapa del capítulo.</p>
    `, 'El mapa conecta las decisiones microscópicas con el contraste de modelos.');

    return wrapper(`<p>${escapeHTML(title)}</p>`);
  }

  const simulationTypes = [
    ['SIMULACIÓN INTERACTIVA 1', 'agents'],
    ['SIMULACIÓN INTERACTIVA 2', 'monte-carlo'],
    ['SIMULACIÓN INTERACTIVA 3', 'correlated'],
    ['SIMULACIÓN INTERACTIVA 4', 'orderbook'],
    ['SIMULACIÓN INTERACTIVA 5', 'returns'],
    ['SIMULACIÓN INTERACTIVA 6', 'tails'],
    ['SIMULACIÓN INTERACTIVA 7', 'volatility'],
    ['SIMULACIÓN INTERACTIVA 8', 'network'],
    ['SIMULACIÓN INTERACTIVA 9', 'regimes']
  ];
  const visualizationTypes = [
    ['Visualización obligatoria 1', 'agents'],
    ['Visualización obligatoria 2', 'particles'],
    ['Visualización obligatoria 3', 'liquidity'],
    ['Visualización obligatoria 4', 'process'],
    ['Visualización obligatoria 5', 'noise'],
    ['Visualización obligatoria 6', 'process'],
    ['MAPA CONCEPTUAL FINAL DEL CAPÍTULO', 'map']
  ];

  const sections = [];
  let title = 'Capítulo 1';
  let sectionLines = [];
  let current = null;
  const inputLines = source.split(/\r?\n/);
  for (let index = 0; index < inputLines.length; index += 1) {
    const line = inputLines[index];
    if (/^# (CAPÍTULO 1\.|1\.[1-5]\b|EJERCICIOS|MAPA CONCEPTUAL)/.test(line)) {
      if (current) sections.push(current);
      current = { title, lines: sectionLines };
      sectionLines = [];
      title = line.replace(/^#\s+/, '');
      current = null;
      continue;
    }
    if (line.startsWith('## ')) {
      if (current) sections.push(current);
      current = { title: line.replace(/^##\s+/, ''), lines: [] };
      continue;
    }
    if (!current && !line.trim()) continue;
    if (!current) current = { title, lines: sectionLines };
    const simulation = simulationTypes.find(([label]) => line.startsWith(`### ${label}`));
    const visualization = visualizationTypes.find(([label]) => line.startsWith(`### ${label}`));
    if (simulation || visualization) {
      current.lines.push(`\u0000${simulation ? 'simulation' : 'visualization'}:${(simulation || visualization)[1]}:${line.replace(/^###\s+/, '').replace(/^[^:]+:\s*/, '')}`);
      index += 1;
      while (index < inputLines.length && !/^#{1,2}\s/.test(inputLines[index])) index += 1;
      index -= 1;
      continue;
    }
    current.lines.push(line);
  }
  if (current) sections.push(current);

  const chapterPages = sections.map((section, index) => {
    const content = [];
    const body = [];
    let solutionOpen = false;
    const flushBody = () => {
      if (body.length) {
        content.push(renderMarkdown(body.join('\n')));
        body.length = 0;
      }
    };
    section.lines.forEach(line => {
      if (line.startsWith('\u0000')) {
        flushBody();
        const parts = line.split(':');
        const type = parts[1];
        const widgetTitle = parts.slice(2).join(':');
        content.push(simulation(type, widgetTitle));
      } else if (section.title.startsWith('Ejercicio ') && line.trim() === '**Solución:**') {
        flushBody();
        content.push('<details class="exercise-solution"><summary>Revelar solución</summary>');
        solutionOpen = true;
      } else {
        body.push(line);
      }
    });
    flushBody();
    if (solutionOpen) content.push('</details>');
    const number = book.pages.length + index;
    const html = `<div class="page-inner chapter-page"><div class="page-header"><span>ECONOFÍSICA / CAPÍTULO 1</span><span class="mono">SISTEMAS, MERCADOS Y OBSERVACIÓN</span></div><h2 class="chapter-page-title">${escapeHTML(section.title)}</h2>${content.join('')}<div class="page-footer"><span class="mono">pág. ${number - 2}</span></div></div>`;
    return { number, type: 'chapter', title: section.title, html };
  });
  book.pages.push(...chapterPages);
  book.pages.slice(1, 3).forEach(page => {
    page.html = page.html.replace(/<div class="toc-item" data-section="([^"]+)"/g, (item, section) => {
      const target = chapterPages.find(chapter => chapter.title.startsWith(`${section}.`));
      return target
        ? item.replace('class="toc-item"', `class="toc-item" data-goto="${target.number}" role="button" tabindex="0"`)
        : item;
    });
  });

  function seededRandom(seed) {
    let state = seed >>> 0;
    return () => {
      state = (1664525 * state + 1013904223) >>> 0;
      return state / 4294967296;
    };
  }
  function normalRandom(random) {
    return Math.sqrt(-2 * Math.log(Math.max(random(), 1e-12))) * Math.cos(2 * Math.PI * random());
  }
  function svgLine(values, label, color = '#22d3ee', second = null) {
    const all = second ? values.concat(second) : values;
    const min = Math.min(...all), max = Math.max(...all);
    const scaleY = value => 12 + (max === min ? 40 : (max - value) / (max - min) * 76);
    const points = data => data.map((value, i) => `${12 + i * 376 / Math.max(data.length - 1, 1)},${scaleY(value)}`).join(' ');
    return `<svg class="sim-svg" viewBox="0 0 400 112" role="img" aria-label="${escapeHTML(label)}"><path d="M12 88H388M12 50H388M12 12H388" class="chart-grid"/><polyline points="${points(values)}" fill="none" stroke="${color}" stroke-width="2"/>${second ? `<polyline points="${points(second)}" fill="none" stroke="#f59e0b" stroke-width="2"/>` : ''}</svg>`;
  }
  function sliderOutput(input) {
    const output = document.querySelector(`output[for="${input.id}"]`);
    if (output) output.value = input.value;
  }
  function bindSimulation(root) {
    const find = id => root.querySelector(`#${id}`);
    root.querySelectorAll('input[type="range"]').forEach(input => input.addEventListener('input', () => {
      sliderOutput(input);
      update();
    }));
    root.querySelectorAll('input[type="number"]').forEach(input => input.addEventListener('input', update));
    root.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      if (button.id === 'agent-reset') root.querySelectorAll('[data-agent]').forEach((agent, index) => {
        const buy = [0, 1, 3].includes(index);
        agent.classList.toggle('buyer', buy); agent.classList.toggle('seller', !buy);
        agent.setAttribute('aria-pressed', String(buy)); agent.querySelector('strong').textContent = buy ? 'Compra' : 'Vende';
      });
      if (button.id === 'agent-all-buy' || button.id === 'agent-all-sell') {
        const buy = button.id === 'agent-all-buy';
        root.querySelectorAll('[data-agent]').forEach(agent => {
          agent.classList.toggle('buyer', buy); agent.classList.toggle('seller', !buy);
          agent.setAttribute('aria-pressed', String(buy)); agent.querySelector('strong').textContent = buy ? 'Compra' : 'Vende';
        });
      }
      if (button.id === 'book-reset') resetBook();
      if (button.id === 'mc-reset') { find('mc-agents').value = 1000; find('mc-probability').value = 0.6; find('mc-runs').value = 500; find('mc-seed').value = 17; }
      if (button.id === 'vol-new') find('vol-seed').value = Number(find('vol-seed').value) + 1;
      if (button.id === 'mc-run' || button.id === 'mc-reset') runMonteCarlo();
      if (button.id === 'corr-run') runCorrelation();
      if (button.id === 'book-add-bid') addOrder('bid');
      if (button.id === 'book-add-ask') addOrder('ask');
      if (button.id === 'book-buy') executeOrder('ask');
      if (button.id === 'book-sell') executeOrder('bid');
      if (button.id === 'tails-run') runTails();
      if (button.id === 'vol-run' || button.id === 'vol-new') runVolatility();
      if (button.id === 'net-run') runNetwork();
      if (button.id === 'regime-run') runRegimes();
      if (button.id === 'liquidity-run') runLiquidity();
      if (button.id.startsWith('agent-')) update();
    }));

    let bids = [[99.9, 40], [99.8, 60], [99.7, 100]];
    let asks = [[100.1, 30], [100.2, 50], [100.3, 80]];
    function update() {
      if (root.dataset.sim === 'agents') {
        const states = [...root.querySelectorAll('[data-agent]')].map(agent => agent.classList.contains('buyer') ? 1 : -1);
        const q = states.reduce((sum, state) => sum + state, 0);
        const lambda = Number(find('agent-impact').value);
        find('agent-q').textContent = q;
        find('agent-m').textContent = (q / states.length).toFixed(2);
        find('agent-price').textContent = (100 + lambda * q).toFixed(2);
        find('agent-equation').textContent = `P₁ = 100 + (${lambda.toFixed(1)})(${q}) = ${(100 + lambda * q).toFixed(2)}`;
        find('agent-bar').innerHTML = `<span style="width:${Math.max(3, (Math.abs(q) / 5) * 100)}%;margin-left:${q < 0 ? `${50 - Math.abs(q) * 10}%` : '50%'};background:${q < 0 ? '#f87171' : '#4ade80'}"></span>`;
      }
      if (root.dataset.sim === 'returns') {
        const p0 = Number(find('return-start').value), p1 = Number(find('return-end').value);
        const simple = (p1 - p0) / p0, log = Math.log(p1 / p0);
        find('return-simple').textContent = `${(simple * 100).toFixed(3)}%`;
        find('return-log').textContent = `${(log * 100).toFixed(3)}%`;
        find('return-equation').textContent = `R = (${p1} − ${p0}) / ${p0} = ${(simple * 100).toFixed(3)}%; r = ln(${p1} / ${p0}) = ${(log * 100).toFixed(3)}%`;
        const r = Array.from({ length: 41 }, (_, i) => -0.9 + i * 0.05);
        find('return-chart').innerHTML = svgLine(r.map(x => Math.log(1 + x)), 'ln(1+R), línea ámbar: R', '#22d3ee', r);
      }
      if (root.dataset.sim === 'noise') runNoise();
      if (root.dataset.sim === 'particles') runParticles();
      if (root.dataset.sim === 'process' || root.dataset.sim === 'map') {
        root.querySelectorAll('.process-step').forEach(step => step.onclick = () => {
          const descriptions = root.dataset.sim === 'map'
            ? ['Cada persona, empresa e institución toma decisiones.', 'Las reglas y la información conectan las decisiones.', 'Los intercambios agregados contribuyen a formar precios.', 'Los precios se convierten en series y distribuciones observables.', 'Los modelos se comparan con datos y preguntas explícitas.']
            : ['Personas y organizaciones con recursos y objetivos.', 'Decisiones que se influyen mediante información y transacciones.', 'Reglas transforman decisiones en intercambios y precios.', 'Precios y cantidades medidos con error y frecuencia definidos.', 'Comparación de resultados con una hipótesis explícita.'];
          find('process-description').textContent = descriptions[Number(step.dataset.step)];
        });
      }
    }
    function runMonteCarlo() {
      const n = Math.min(5000, Math.max(10, Number(find('mc-agents').value) || 1000));
      const p = Math.min(1, Math.max(0, Number(find('mc-probability').value)));
      const runs = Math.min(5000, Math.max(20, Number(find('mc-runs').value) || 500));
      const random = seededRandom(Number(find('mc-seed').value) || 1);
      const values = Array.from({ length: runs }, () => {
        let q = 0; for (let i = 0; i < n; i += 1) q += random() < p ? 1 : -1; return q;
      });
      const mean = values.reduce((sum, x) => sum + x, 0) / runs;
      const variance = values.reduce((sum, x) => sum + (x - mean) ** 2, 0) / runs;
      find('mc-mean').textContent = mean.toFixed(2);
      find('mc-expected').textContent = (n * (2 * p - 1)).toFixed(2);
      find('mc-variance').textContent = variance.toFixed(2);
      find('mc-deviation').textContent = Math.sqrt(variance).toFixed(2);
      drawHistogram(find('mc-chart'), values);
    }
    function runCorrelation() {
      const n = Math.min(5000, Math.max(20, Number(find('corr-agents').value) || 1000));
      const c = Number(find('corr-strength').value), runs = Math.min(2000, Number(find('corr-runs').value) || 400);
      const random = seededRandom(Number(find('corr-seed').value) || 1);
      let sum = 0, sum2 = 0;
      for (let r = 0; r < runs; r += 1) {
        const signal = random() < 0.5 ? 1 : -1;
        let q = 0;
        for (let i = 0; i < n; i += 1) q += random() < c ? signal : (random() < 0.5 ? 1 : -1);
        sum += q; sum2 += q * q;
      }
      const empirical = sum2 / runs - (sum / runs) ** 2;
      const expected = n + n * (n - 1) * c * c;
      find('corr-independent').textContent = n.toLocaleString();
      find('corr-empirical').textContent = empirical.toFixed(0);
      find('corr-theory').textContent = expected.toFixed(0);
      find('corr-chart').innerHTML = `<div class="variance-bars"><span style="height:16px">Independientes: ${n.toLocaleString()}</span><span style="height:${Math.max(20, Math.min(100, empirical / expected * 100))}px">Correlacionados: ${empirical.toFixed(0)}</span></div>`;
    }
    function paintBook(message) {
      bids.sort((a, b) => b[0] - a[0]); asks.sort((a, b) => a[0] - b[0]);
      const bestBid = bids[0]?.[0], bestAsk = asks[0]?.[0];
      find('book-bid').textContent = bestBid?.toFixed(2) || '—';
      find('book-ask').textContent = bestAsk?.toFixed(2) || '—';
      find('book-spread').textContent = bestBid && bestAsk ? (bestAsk - bestBid).toFixed(2) : '—';
      find('book-mid').textContent = bestBid && bestAsk ? ((bestAsk + bestBid) / 2).toFixed(2) : '—';
      find('book-levels').innerHTML = `<div class="chapter-table-wrap"><table class="chapter-table"><tr><th>Compras (bid)</th><th>Cantidad</th><th>Ventas (ask)</th><th>Cantidad</th></tr>${Array.from({ length: Math.max(bids.length, asks.length) }, (_, i) => `<tr><td>${bids[i]?.[0].toFixed(2) || '—'}</td><td>${bids[i]?.[1] || '—'}</td><td>${asks[i]?.[0].toFixed(2) || '—'}</td><td>${asks[i]?.[1] || '—'}</td></tr>`).join('')}</table></div>`;
      find('book-result').textContent = message || 'Libro actualizado.';
    }
    function resetBook() { bids = [[99.9, 40], [99.8, 60], [99.7, 100]]; asks = [[100.1, 30], [100.2, 50], [100.3, 80]]; paintBook('Libro reiniciado.'); }
    function addOrder(side) {
      const price = Number(find('book-limit-price').value), size = Math.max(1, Number(find('book-size').value));
      (side === 'bid' ? bids : asks).push([price, size]);
      paintBook(`Orden limitada añadida: ${side === 'bid' ? 'compra' : 'venta'} de ${size} a ${price.toFixed(2)}.`);
    }
    function executeOrder(side) {
      let remaining = Math.max(1, Number(find('book-size').value)), cost = 0, quantity = 0;
      const levels = side === 'ask' ? asks : bids;
      levels.sort((a, b) => side === 'ask' ? a[0] - b[0] : b[0] - a[0]);
      while (remaining > 0 && levels.length) {
        const level = levels[0], used = Math.min(remaining, level[1]);
        remaining -= used; quantity += used; cost += used * level[0]; level[1] -= used;
        if (level[1] === 0) levels.shift();
      }
      paintBook(`Ejecutadas ${quantity}; promedio ponderado ${quantity ? (cost / quantity).toFixed(3) : '—'}; sin ejecutar ${remaining}.`);
    }
    function runTails() {
      const samples = Math.min(5000, Math.max(100, Number(find('tails-samples').value) || 1200));
      const df = Math.max(3, Number(find('tails-df').value) || 5), random = seededRandom(Number(find('tails-seed').value) || 1);
      let normalExtreme = 0, studentExtreme = 0;
      const values = [];
      for (let i = 0; i < samples; i += 1) {
        const z = normalRandom(random);
        let chi = 0; for (let d = 0; d < df; d += 1) chi += normalRandom(random) ** 2;
        const t = z / Math.sqrt(chi / df) * Math.sqrt((df - 2) / df);
        values.push(t);
        if (Math.abs(z) > 2) normalExtreme += 1;
        if (Math.abs(t) > 2) studentExtreme += 1;
      }
      find('tails-normal').textContent = `${(normalExtreme / samples * 100).toFixed(1)}%`;
      find('tails-student').textContent = `${(studentExtreme / samples * 100).toFixed(1)}%`;
      drawHistogram(find('tails-chart'), values);
    }
    function runVolatility() {
      const random = seededRandom(Number(find('vol-seed').value) || 1);
      let price = 100; const prices = [price];
      const calm = Number(find('vol-calm').value) / 100, turbulent = Number(find('vol-turbulent').value) / 100;
      for (let i = 0; i < 40; i += 1) {
        const sigma = i >= 13 && i < 27 ? turbulent : calm;
        price *= Math.exp(sigma * normalRandom(random));
        prices.push(price);
      }
      find('vol-chart').innerHTML = svgLine(prices, 'Precio simulado; 100 períodos', '#22d3ee');
      find('vol-final').textContent = price.toFixed(2);
    }
    function runNetwork() {
      const assets = 5, samples = Math.min(1000, Math.max(50, Number(find('net-observations').value) || 250));
      const factor = Number(find('net-factor').value), random = seededRandom(Number(find('net-seed').value) || 1);
      const data = Array.from({ length: assets }, () => []);
      for (let t = 0; t < samples; t += 1) {
        const common = normalRandom(random);
        data.forEach(series => series.push(Math.sqrt(factor) * common + Math.sqrt(1 - factor) * normalRandom(random)));
      }
      const mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;
      const corr = (a, b) => {
        const ma = mean(a), mb = mean(b);
        const cov = a.reduce((s, x, i) => s + (x - ma) * (b[i] - mb), 0);
        const va = a.reduce((s, x) => s + (x - ma) ** 2, 0), vb = b.reduce((s, x) => s + (x - mb) ** 2, 0);
        return va && vb ? cov / Math.sqrt(va * vb) : 0;
      };
      find('net-matrix').innerHTML = `<div class="chapter-table-wrap"><table class="chapter-table heatmap"><tr><th></th>${data.map((_, i) => `<th>${String.fromCharCode(65 + i)}</th>`).join('')}</tr>${data.map((series, i) => `<tr><th>${String.fromCharCode(65 + i)}</th>${data.map(other => { const value = corr(series, other); const intensity = Math.round(Math.abs(value) * 65); const color = value >= 0 ? `rgba(34,211,238,${intensity / 100})` : `rgba(248,113,113,${intensity / 100})`; return `<td style="background:${color}">${value.toFixed(2)}</td>`; }).join('')}</tr>`).join('')}</table></div>`;
    }
    function runRegimes() {
      const random = seededRandom(Number(find('regime-seed').value) || 1);
      let regime = 0, price = 100, calmCount = 0, turbulentCount = 0;
      const prices = [price], states = [];
      const pCalm = Number(find('regime-stay-calm').value), pTurb = Number(find('regime-stay-turbulent').value);
      const n = Math.min(300, Math.max(20, Number(find('regime-periods').value) || 100));
      for (let i = 0; i < n; i += 1) {
        if (regime === 0 ? random() > pCalm : random() > pTurb) regime = 1 - regime;
        const prefix = regime ? 'regime-turb' : 'regime-calm';
        const sigma = Number(find(`${prefix}-vol`).value) / 100;
        const mean = Number(find(`${prefix}-mean`).value) / 100;
        price *= Math.exp(mean + sigma * normalRandom(random));
        prices.push(price); states.push(regime);
        if (regime) turbulentCount += 1; else calmCount += 1;
      }
      find('regime-chart').innerHTML = `${svgLine(prices, 'Precio simulado por regímenes')}<div class="regime-strip">${states.map(state => `<i class="${state ? 'turbulent' : 'calm'}"></i>`).join('')}</div>`;
      find('regime-stats').textContent = `Períodos tranquilos: ${calmCount}; turbulentos: ${turbulentCount}; precio final: ${price.toFixed(2)}.`;
    }
    function runNoise() {
      const random = seededRandom(31), amplitude = Number(find('noise-amplitude').value);
      const signal = Array.from({ length: 45 }, (_, i) => Math.sin(i / 5) + Math.cos(i / 9) * 0.3);
      const observed = signal.map(value => value + normalRandom(random) * amplitude);
      find('noise-chart').innerHTML = svgLine(signal, 'Estado real en cian y medición ruidosa en ámbar', '#22d3ee', observed);
    }
    function runParticles() {
      const count = Number(find('particle-count').value);
      find('particle-panels').innerHTML = `<div class="particle-row"><strong>Gas: ${count} moléculas</strong>${Array.from({ length: count }, (_, i) => `<i style="left:${(i * 37 + 13) % 97}%;top:${(i * 61 + 9) % 85}%;animation-delay:-${i % 7}s"></i>`).join('')}</div><div class="particle-row economic"><strong>Mercado: ${count} agentes</strong>${Array.from({ length: count }, (_, i) => `<i class="${i % 2 ? 'buyer' : 'seller'}" style="left:${(i * 43 + 8) % 96}%;top:${(i * 53 + 12) % 84}%"></i>`).join('')}</div>`;
    }
    function runLiquidity() {
      const size = Math.max(1, Number(find('liquidity-size').value));
      const estimate = (depth, step) => {
        let remaining = size, cost = 0, filled = 0, level = 0;
        while (remaining && level < 20) {
          const quantity = Math.min(remaining, depth);
          cost += quantity * (100 + level * step); filled += quantity; remaining -= quantity; level += 1;
        }
        return { avg: filled ? cost / filled : 0, filled, slippage: filled ? (cost / filled - 100) : 0, levels: level };
      };
      const deep = estimate(100, 0.1), shallow = estimate(20, 0.5);
      find('liquidity-results').innerHTML = `<div class="chapter-table-wrap"><table class="chapter-table"><tr><th>Mercado</th><th>Ejecutado</th><th>Precio medio</th><th>Deslizamiento</th><th>Niveles</th></tr><tr><td>Profundo</td><td>${deep.filled}</td><td>${deep.avg.toFixed(2)}</td><td>${deep.slippage.toFixed(2)}</td><td>${deep.levels}</td></tr><tr><td>Poco profundo</td><td>${shallow.filled}</td><td>${shallow.avg.toFixed(2)}</td><td>${shallow.slippage.toFixed(2)}</td><td>${shallow.levels}</td></tr></table></div>`;
    }

    function drawHistogram(container, values) {
      const bins = 21, min = Math.min(...values), max = Math.max(...values), counts = Array(bins).fill(0);
      values.forEach(value => counts[Math.min(bins - 1, Math.floor((value - min) / (max - min || 1) * bins))] += 1);
      const peak = Math.max(...counts, 1);
      container.innerHTML = `<div class="histogram">${counts.map((count, i) => `<i title="intervalo ${i + 1}: ${count}" style="height:${Math.max(2, count / peak * 100)}%"></i>`).join('')}</div><div class="chart-axis"><span>${min.toFixed(0)}</span><span>Desequilibrio Q</span><span>${max.toFixed(0)}</span></div>`;
    }

    if (root.dataset.sim === 'agents') root.querySelectorAll('[data-agent]').forEach(agent => agent.onclick = () => { const buy = agent.classList.contains('buyer'); agent.classList.toggle('buyer', !buy); agent.classList.toggle('seller', buy); agent.setAttribute('aria-pressed', String(!buy)); agent.querySelector('strong').textContent = buy ? 'Vende' : 'Compra'; update(); });
    if (root.dataset.sim === 'orderbook') resetBook();
    if (root.dataset.sim === 'monte-carlo') runMonteCarlo();
    if (root.dataset.sim === 'correlated') runCorrelation();
    if (root.dataset.sim === 'returns') update();
    if (root.dataset.sim === 'tails') runTails();
    if (root.dataset.sim === 'volatility') runVolatility();
    if (root.dataset.sim === 'network') runNetwork();
    if (root.dataset.sim === 'regimes') runRegimes();
    if (root.dataset.sim === 'liquidity') runLiquidity();
    update();
  }

  window.ChapterOne = {
    init() {
      document.querySelectorAll('.chapter-simulation').forEach(root => {
        if (!root.dataset.initialized) {
          root.dataset.initialized = 'true';
          bindSimulation(root);
        }
      });
    }
  };
})();
