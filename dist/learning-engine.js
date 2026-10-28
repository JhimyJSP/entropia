/**
 * ENTROPÍA — MOTOR DE APRENDIZAJE Y EXPERIENCIA INTERACTIVA
 * Orquesta la navegación hoja por hoja, el renderizado de fórmulas KaTeX,
 * las simulaciones numéricas 2D/3D, autoevaluaciones con retroalimentación explicativa
 * y la persistencia local de competencias científicas.
 */

class LearningEngine {
  constructor() {
    this.bookData = window.ENTROPIA_BOOK;
    this.currentPage = parseInt(localStorage.getItem('entropia-last-page') || '1', 10);
    this.totalPages = this.bookData.pages.length;
    this.isMobile = window.innerWidth < 900;
    
    // Contenedores del DOM
    this.pagesContainer = document.getElementById('pages-container');
    this.leftPageEl = document.getElementById('left-page');
    this.rightPageEl = document.getElementById('right-page');
    this.progressBar = document.getElementById('reading-progress-fill');
    this.pageIndicator = document.getElementById('page-indicator');
    
    // Estado de simulaciones
    this.walkData = [100];
    this.walkVol = 5;
    this.is3DNetworkRunning = true;
    this.db = null;
    this.userEntries = [];

    this.init();
  }

  init() {
    window.addEventListener('resize', () => {
      const mobileNow = window.innerWidth < 900;
      if (mobileNow !== this.isMobile) {
        this.isMobile = mobileNow;
        this.renderCurrentSpread();
      }
    });

    this.setupKeyboard();
    this.setupTouchGestures();
    this.setupURLHash();
    this.setupIndexedDB();
  }

  onBookOpened() {
    this.renderCurrentSpread();
    this.updateProgress();

    // Comprobar si hay un hash en la URL para saltar directamente a un capítulo
    const hash = window.location.hash;
    if (hash && hash.startsWith('#p-')) {
      const targetP = parseInt(hash.replace('#p-', ''), 10);
      if (!isNaN(targetP) && targetP >= 1 && targetP < this.totalPages) {
        this.goToPage(targetP);
      }
    }
  }

  // Renderiza la doble página (desktop) o página individual (móvil)
  renderCurrentSpread(animate = false) {
    if (!this.bookData || !this.leftPageEl || !this.rightPageEl) return;

    // En pantallas grandes se leen spreads pares/impares:
    // Spread 1: Página 1 (izq) y Página 2 (der) -> Índice
    // Spread 2: Página 3 (izq) y Página 4 (der) -> Cap 0.1
    let leftIdx, rightIdx;

    if (this.isMobile) {
      // En móvil se muestra solo una página a la vez
      leftIdx = this.currentPage;
      rightIdx = null;
      this.rightPageEl.style.display = 'none';
      this.leftPageEl.style.width = '100%';
    } else {
      this.rightPageEl.style.display = 'block';
      this.leftPageEl.style.width = '50%';
      this.rightPageEl.style.width = '50%';

      if (this.currentPage % 2 === 1) {
        leftIdx = this.currentPage;
        rightIdx = this.currentPage + 1 < this.totalPages ? this.currentPage + 1 : null;
      } else {
        leftIdx = this.currentPage - 1;
        rightIdx = this.currentPage;
      }
    }

    const leftData = this.bookData.pages[leftIdx] || this.bookData.pages[1];
    const rightData = rightIdx !== null ? this.bookData.pages[rightIdx] : null;

    if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.pagesContainer.classList.add('page-flipping');
      setTimeout(() => {
        this.injectPageContent(this.leftPageEl, leftData);
        if (rightData) {
          this.injectPageContent(this.rightPageEl, rightData);
        } else {
          this.rightPageEl.innerHTML = '<div class="page-inner blank-page"></div>';
        }
        this.postRender();
        this.pagesContainer.classList.remove('page-flipping');
      }, 180);
    } else {
      this.injectPageContent(this.leftPageEl, leftData);
      if (rightData) {
        this.injectPageContent(this.rightPageEl, rightData);
      } else {
        this.rightPageEl.innerHTML = '<div class="page-inner blank-page"></div>';
      }
      this.postRender();
    }

    this.updateProgress();
    localStorage.setItem('entropia-last-page', String(this.currentPage));
  }

  injectPageContent(element, pageData) {
    element.innerHTML = pageData.html;
    element.setAttribute('data-page-num', pageData.number);
  }

  postRender() {
    this.renderMathEquations();
    this.bindInternalNavLinks();
    this.initSimulationsIfNeeded();
    this.initQuizzesIfNeeded();
    this.initSearchIfNeeded();
    this.renderSavedEntries();
    this.initCurriculumSteps();
  }

  // Renderizado dinámico de LaTeX con KaTeX
  renderMathEquations() {
    if (!window.katex) {
      console.warn('KaTeX no está disponible; no se pueden renderizar las ecuaciones.');
      return;
    }

    document.querySelectorAll('.katex-eq').forEach(el => {
      const tex = el.getAttribute('data-tex');
      if (tex && !el.classList.contains('katex-rendered')) {
        try {
          window.katex.render(tex, el, {
            throwOnError: false,
            displayMode: true
          });
          el.classList.add('katex-rendered');
        } catch (e) {
          console.warn('Error renderizando KaTeX:', e);
        }
      }
    });

    if (!window.renderMathInElement) {
      console.warn('El auto-render de KaTeX no está disponible; las ecuaciones en línea no se renderizarán.');
      return;
    }

    [this.leftPageEl, this.rightPageEl].forEach(page => {
      window.renderMathInElement(page, {
        delimiters: [
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
    });
  }

  bindInternalNavLinks() {
    // Enlaces de índice y botones de retorno
    document.querySelectorAll('[data-goto]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const targetPage = parseInt(btn.getAttribute('data-goto'), 10);
        this.goToPage(targetPage);
      };
    });

    const closeBtn = document.getElementById('book-close-cover');
    if (closeBtn && window.book3D) {
      closeBtn.onclick = () => window.book3D.closeBook();
    }

    const restartBtn = document.getElementById('book-restart-toc');
    if (restartBtn) {
      restartBtn.onclick = () => this.goToPage(1);
    }
  }

  goToPage(pageNum) {
    if (pageNum < 1 || pageNum >= this.totalPages) return;
    if (pageNum === this.currentPage) return;

    if (window.bookAudio) {
      window.bookAudio.playPageFlip();
    }

    this.currentPage = pageNum;
    window.location.hash = `#p-${this.currentPage}`;
    this.renderCurrentSpread(true);
  }

  nextPage() {
    const step = this.isMobile ? 1 : 2;
    if (this.currentPage + step < this.totalPages) {
      this.goToPage(this.currentPage + step);
    }
  }

  prevPage() {
    const step = this.isMobile ? 1 : 2;
    if (this.currentPage - step >= 1) {
      this.goToPage(this.currentPage - step);
    }
  }

  updateProgress() {
    const percent = Math.min(100, Math.round((this.currentPage / (this.totalPages - 1)) * 100));
    document.body.classList.toggle('is-reading', this.currentPage > 2);
    if (this.progressBar) {
      this.progressBar.style.width = `${percent}%`;
    }
    if (this.pageIndicator) {
      if (this.isMobile) {
        this.pageIndicator.textContent = `Pág. ${this.currentPage} de ${this.totalPages - 1}`;
      } else {
        const pLeft = this.currentPage % 2 === 1 ? this.currentPage : this.currentPage - 1;
        const pRight = Math.min(this.totalPages - 1, pLeft + 1);
        this.pageIndicator.textContent = `Págs. ${pLeft}–${pRight} de ${this.totalPages - 1}`;
      }
    }
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Ignorar si el usuario está escribiendo en el buscador o formulario
      const tag = document.activeElement ? document.activeElement.tagName : '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (!window.book3D || !window.book3D.isOpen) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        this.nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        this.prevPage();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        this.goToPage(1); // Volver al Temario
      } else if (e.key === 'Escape') {
        if (window.book3D) window.book3D.closeBook();
      }
    });
  }

  setupTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;

    this.pagesContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    this.pagesContainer.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      // Deslizar horizontalmente con ángulo plano
      if (Math.abs(dx) > 55 && Math.abs(dy) < 70) {
        if (dx < 0) {
          this.nextPage(); // Deslizar hacia la izquierda = siguiente página
        } else {
          this.prevPage(); // Deslizar hacia la derecha = página anterior
        }
      }
    }, { passive: true });
  }

  setupURLHash() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#p-')) {
        const page = parseInt(hash.replace('#p-', ''), 10);
        if (!isNaN(page) && page !== this.currentPage) {
          this.goToPage(page);
        }
      }
    });
  }

  // SIMULADOR 2D: PASEO ALEATORIO DISCRETO
  initSimulationsIfNeeded() {
    const chartCanvas = document.getElementById('book-chart');
    if (chartCanvas) {
      const volSlider = document.getElementById('book-vol');
      const volOut = document.getElementById('book-volOut');
      const simBtn = document.getElementById('book-simulate');
      const multiBtn = document.getElementById('book-multirun');

      if (volSlider && volOut) {
        volSlider.value = this.walkVol;
        volOut.value = this.walkVol;
        volSlider.oninput = () => {
          this.walkVol = parseFloat(volSlider.value);
          volOut.value = this.walkVol;
          this.runSimulation();
        };
      }

      if (simBtn) {
        simBtn.onclick = () => this.runSimulation();
      }

      if (multiBtn) {
        multiBtn.onclick = () => this.runMultiSimulation();
      }

      this.runSimulation();
    }

    // SIMULADOR 3D: RED CUÁNTICA DE AGENTES EN PÁGINA
    const net3DCanvas = document.getElementById('network-3d-canvas');
    if (net3DCanvas && !net3DCanvas.classList.contains('initialized')) {
      net3DCanvas.classList.add('initialized');
      this.initInline3DNetwork(net3DCanvas);
    }
  }

  runSimulation() {
    this.walkData = [100];
    const steps = 200;
    for (let i = 1; i <= steps; i++) {
      const step = (Math.random() * 2 - 1) * this.walkVol;
      this.walkData.push(this.walkData[i - 1] + step);
    }
    this.drawChart();
    this.updateSimMetrics();
  }

  runMultiSimulation() {
    this.runSimulation();
  }

  drawChart() {
    const canvas = document.getElementById('book-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Fondo terminal dark
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, w, h);

    const min = Math.min(...this.walkData) - 8;
    const max = Math.max(...this.walkData) + 8;

    // Rejilla de coordenadas tenue
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
    ctx.fillStyle = '#64748b';

    for (let i = 0; i < 5; i++) {
      const y = 20 + i * (h - 40) / 4;
      ctx.beginPath();
      ctx.moveTo(35, y);
      ctx.lineTo(w - 10, y);
      ctx.stroke();

      const labelVal = Math.round(max - ((max - min) * i / 4));
      ctx.fillText(labelVal, 4, y + 3);
    }

    // Trazo de trayectoria en cian neón
    const points = this.walkData.map((val, i) => [
      35 + (i * (w - 45) / (this.walkData.length - 1)),
      20 + ((max - val) / (max - min)) * (h - 40)
    ]);

    ctx.beginPath();
    points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2.0;
    ctx.shadowColor = 'rgba(34, 211, 238, 0.6)';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Área bajo la curva con gradiente azul/cian
    ctx.lineTo(w - 10, h - 20);
    ctx.lineTo(35, h - 20);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(34, 211, 238, 0.28)');
    grad.addColorStop(1, 'rgba(37, 99, 235, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();
  }

  updateSimMetrics() {
    const finalVal = this.walkData[this.walkData.length - 1];
    const initialVal = this.walkData[0];
    const retPct = (((finalVal - initialVal) / initialVal) * 100).toFixed(1);

    const mFinal = document.getElementById('m-final');
    const mRet = document.getElementById('m-ret');
    const mVol = document.getElementById('m-vol');

    if (mFinal) mFinal.textContent = finalVal.toFixed(1);
    if (mRet) {
      mRet.textContent = `${retPct >= 0 ? '+' : ''}${retPct}%`;
      mRet.style.color = retPct >= 0 ? '#4ade80' : '#f87171';
    }
    if (mVol) mVol.textContent = this.walkVol.toFixed(1);
  }

  // RED 3D WEBGL INTERACTIVA EN PÁGINA
  initInline3DNetwork(canvas) {
    if (!window.THREE) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03060c);

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 50);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Nodos en esfera
    const nodeCount = 95;
    const nodes = [];
    const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });

    const group = new THREE.Group();

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 1.35 + (Math.random() - 0.5) * 0.3;

      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      group.add(mesh);
      nodes.push(mesh.position);
    }

    // Líneas de conexión
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.35
    });

    const linePositions = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 0.65) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    group.add(linesMesh);

    scene.add(group);

    // Controles de rotación táctil y ratón
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => (isDragging = false));

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMousePos.x;
      const dy = e.clientY - prevMousePos.y;
      group.rotation.y += dx * 0.01;
      group.rotation.x += dy * 0.01;
      prevMousePos = { x: e.clientX, y: e.clientY };
    });

    const toggleBtn = document.getElementById('toggle-3d-rotate');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        this.is3DNetworkRunning = !this.is3DNetworkRunning;
      };
    }

    const reorgBtn = document.getElementById('toggle-3d-nodes');
    if (reorgBtn) {
      reorgBtn.onclick = () => {
        group.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      };
    }

    const renderLoop = () => {
      if (canvas.isConnected) {
        requestAnimationFrame(renderLoop);
        if (this.is3DNetworkRunning) {
          group.rotation.y += 0.004;
          group.rotation.x += 0.002;
        }
        renderer.render(scene, camera);
      }
    };
    renderLoop();
  }

  // AUTOEVALUACIÓN Y RECUPERACIÓN ACTIVA
  initQuizzesIfNeeded() {
    document.querySelectorAll('.quiz-challenge-card').forEach(card => {
      const quizId = card.getAttribute('data-quiz-id');
      const fbBox = card.querySelector('.quiz-feedback-box');
      const opts = card.querySelectorAll('.quiz-opt');

      opts.forEach(btn => {
        btn.onclick = () => {
          const isCorrect = btn.getAttribute('data-correct') === 'true';
          const feedback = btn.getAttribute('data-fb');

          opts.forEach(b => {
            b.classList.remove('selected-correct', 'selected-wrong');
            b.disabled = true;
          });

          if (isCorrect) {
            btn.classList.add('selected-correct');
            fbBox.className = 'quiz-feedback-box correct';
            fbBox.innerHTML = `<strong>✓ ¡Excelente!</strong> ${feedback}`;
            this.recordCompetency(quizId);
          } else {
            btn.classList.add('selected-wrong');
            fbBox.className = 'quiz-feedback-box incorrect';
            fbBox.innerHTML = `<strong>✕ Explicación científica:</strong> ${feedback}`;
          }
          fbBox.style.display = 'block';
        };
      });
    });
  }

  recordCompetency(quizId) {
    const competencies = JSON.parse(localStorage.getItem('entropia-competencies') || '[]');
    if (!competencies.includes(quizId)) {
      competencies.push(quizId);
      localStorage.setItem('entropia-competencies', JSON.stringify(competencies));
    }

    // Actualizar barras y badges de dominio
    const fill = document.getElementById('mastery-fill');
    if (fill) {
      const pct = Math.min(100, Math.round((competencies.length / 3) * 100));
      fill.style.width = `${pct}%`;
    }

    const b1 = document.getElementById('badge-fundamentos');
    const b2 = document.getElementById('badge-estocastico');
    const b3 = document.getElementById('badge-redes');

    if (b1) b1.classList.toggle('achieved', competencies.includes('q1'));
    if (b2) b2.classList.toggle('achieved', competencies.includes('q2'));
    if (b3) b3.classList.toggle('achieved', competencies.includes('q3'));
  }

  // BÚSQUEDA EN EL TEMARIO
  initSearchIfNeeded() {
    const searchInput = document.getElementById('book-search');
    if (!searchInput) return;

    searchInput.oninput = () => {
      const query = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.toc-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });
    };
  }

  // ITINERARIO FORMATIVO
  initCurriculumSteps() {
    const steps = JSON.parse(localStorage.getItem('entropia-curriculum-steps') || '[]');
    document.querySelectorAll('.step-toggle-btn').forEach(btn => {
      const stepIdx = btn.getAttribute('data-step');
      const isDone = steps.includes(stepIdx);
      btn.textContent = isDone ? 'Dominado ✓' : 'Marcar como dominado ○';
      btn.classList.toggle('is-done', isDone);

      btn.onclick = () => {
        let current = JSON.parse(localStorage.getItem('entropia-curriculum-steps') || '[]');
        if (current.includes(stepIdx)) {
          current = current.filter(s => s !== stepIdx);
        } else {
          current.push(stepIdx);
        }
        localStorage.setItem('entropia-curriculum-steps', JSON.stringify(current));
        this.initCurriculumSteps();
      };
    });
  }

  // BITÁCORA PERSONAL CON INDEXEDDB
  setupIndexedDB() {
    const req = indexedDB.open('entropia-notebook-v2', 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('entries')) {
        db.createObjectStore('entries', { keyPath: 'id' });
      }
    };
    req.onsuccess = (e) => {
      this.db = e.target.result;
      this.loadEntries();
    };
  }

  loadEntries() {
    if (!this.db) return;
    const tx = this.db.transaction('entries', 'readonly');
    const store = tx.objectStore('entries');
    const getAll = store.getAll();
    getAll.onsuccess = () => {
      this.userEntries = getAll.result || [];
      this.renderSavedEntries();
    };
  }

  renderSavedEntries() {
    const container = document.getElementById('book-entries-list');
    if (!container) return;

    const form = document.getElementById('book-entry-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById('b-title').value.trim();
        const topic = document.getElementById('b-topic').value;
        const status = document.getElementById('b-status').value;
        const notes = document.getElementById('b-notes').value.trim();

        if (!title || !notes) return;

        const newEntry = {
          id: `entry-${Date.now()}`,
          title,
          topic,
          status,
          notes,
          date: new Date().toISOString()
        };

        if (this.db) {
          const tx = this.db.transaction('entries', 'readwrite');
          tx.objectStore('entries').put(newEntry);
          tx.oncomplete = () => {
            this.userEntries.unshift(newEntry);
            form.reset();
            this.renderSavedEntries();
          };
        }
      };
    }

    const exportBtn = document.getElementById('book-export-json');
    if (exportBtn) {
      exportBtn.onclick = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.userEntries, null, 2));
        const a = document.createElement('a');
        a.href = dataStr;
        a.download = "entropia-investigaciones.json";
        a.click();
      };
    }

    if (this.userEntries.length === 0) {
      container.innerHTML = `
        <div class="empty-entry-state">
          <p>Aún no hay notas registradas. Usa el formulario de la página izquierda para anotar tu primera hipótesis.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.userEntries.map(entry => `
      <div class="book-entry-card" data-entry-id="${entry.id}">
        <div class="entry-card-top">
          <span class="entry-topic-pill">${entry.topic}</span>
          <span class="entry-status-badge">● ${entry.status}</span>
        </div>
        <h5>${entry.title}</h5>
        <p>${entry.notes}</p>
        <span class="entry-date mono">${new Date(entry.date).toLocaleDateString()}</span>
      </div>
    `).join('');
  }
}

window.learningEngine = new LearningEngine();
