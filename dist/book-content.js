/**
 * ENTROPÍA — CONTENIDO CIENTÍFICO ESTRUCTURADO
 * Todos los textos, fórmulas, datos empíricos y simulaciones reales preservados íntegramente.
 */

window.ENTROPIA_BOOK = {
  meta: {
    title: "Entropía — Cuaderno de Econofísica y Complejidad",
    author: "Jhimy Sayas Parodi",
    version: "2.0.0",
    institution: "Laboratorio Abierto de Sistemas Complejos"
  },
  
  // Módulos temáticos del cuaderno
  modules: [
    {
      id: "mod-0",
      number: "00",
      title: "Fundamentos y Marco Metodológico",
      description: "Del equilibrio estático neoclásico a los sistemas dinámicos fuera del equilibrio.",
      icon: "∿",
      chapters: [
        { id: "ch-0-1", pageStart: 2, title: "¿Qué es la Econofísica?", duration: "6 min" },
        { id: "ch-0-2", pageStart: 4, title: "Economía Clásica vs. Econofísica Moderna", duration: "8 min" }
      ]
    },
    {
      id: "mod-1",
      number: "01",
      title: "Fenómenos Estocásticos y Colas Pesadas",
      description: "Por qué la campana de Gauss ignora las crisis y cómo las leyes de potencias explican los cisnes negros.",
      icon: "▲",
      chapters: [
        { id: "ch-1-1", pageStart: 6, title: "Colas Pesadas (Fat Tails) y Leyes de Potencia", duration: "10 min" },
        { id: "ch-1-2", pageStart: 8, title: "Memoria Larga, Fractales y Exponente de Hurst", duration: "9 min" }
      ]
    },
    {
      id: "mod-2",
      number: "02",
      title: "Laboratorio Experimental de Difusión",
      description: "Simulaciones numéricas de paseos aleatorios y visualizaciones de redes tridimensionales.",
      icon: "✦",
      chapters: [
        { id: "ch-2-1", pageStart: 10, title: "Simulador 2D: Paseo Aleatorio Discreto", duration: "12 min", hasSimulation: true },
        { id: "ch-2-2", pageStart: 12, title: "Visualizador 3D: Red Cuántica de Agentes", duration: "10 min", has3D: true }
      ]
    },
    {
      id: "mod-3",
      number: "03",
      title: "Redes Complejas y Riesgo Sistémico",
      description: "Topología de contagio interbancario, efecto dominó y modelos basados en agentes.",
      icon: "☊",
      chapters: [
        { id: "ch-3-1", pageStart: 14, title: "Grafos Libres de Escala y Resiliencia Financiera", duration: "11 min" },
        { id: "ch-3-2", pageStart: 16, title: "Modelos Basados en Agentes (ABM) e Ising", duration: "10 min" }
      ]
    },
    {
      id: "mod-4",
      number: "04",
      title: "Archivo Científico y Cuaderno Personal",
      description: "Gestión de hipótesis, datos empíricos y notas guardadas localmente en el navegador.",
      icon: "📖",
      chapters: [
        { id: "ch-4-1", pageStart: 18, title: "Bitácora de Investigaciones (IndexedDB)", duration: "Interactiva" }
      ]
    },
    {
      id: "mod-5",
      number: "05",
      title: "Preguntas Clave y Recuperación Activa",
      description: "Consolidación metacognitiva y resolución de problemas fundamentales de econofísica.",
      icon: "❓",
      chapters: [
        { id: "ch-5-1", pageStart: 20, title: "FAQ Científica con Respuestas Detalladas", duration: "8 min" },
        { id: "ch-5-2", pageStart: 22, title: "Autoevaluación de Aprendizaje Activo", duration: "7 min", hasQuiz: true }
      ]
    },
    {
      id: "mod-6",
      number: "06",
      title: "Literatura Seminal y Ruta Formativa",
      description: "Bibliografía canónica de investigación y mapa gradual de competencias.",
      icon: "📚",
      chapters: [
        { id: "ch-6-1", pageStart: 24, title: "Lecturas y Textos de Referencia Canónica", duration: "7 min" },
        { id: "ch-6-2", pageStart: 26, title: "Itinerario de Aprendizaje y Competencias", duration: "Práctica" }
      ]
    }
  ],

  // Páginas reales del libro (cada spread corresponde a p y p+1)
  // Página 0: Portada interior / Dedicatoria
  // Página 1: Índice general / Tabla de contenidos
  // Páginas 2-27: Contenido científico estructurado
  pages: [
    // PÁGINA 0: Frontispicio
    {
      number: 0,
      module: "mod-0",
      type: "frontispiece",
      html: `
        <div class="page-inner frontispiece-page">
          <div class="deckle-stamp">ARCHIVUM EXPERIMENTALE · 2026</div>
          <div class="symbol-hero">∿</div>
          <h1 class="book-inner-title">ENTROPÍA</h1>
          <p class="book-inner-subtitle">Cuaderno de Econofísica y Dinámica de Sistemas Complejos</p>
          <div class="ornament-rule"><span>✦ ✦ ✦</span></div>
          <div class="dedication-block">
            <p><em>"Un espacio para formular preguntas, contrastar microdatos empíricos y descubrir las leyes de escala universales que gobiernan las fluctuaciones humanas."</em></p>
            <p class="signature">— Jhimy Sayas Parodi · Laboratorio Abierto</p>
          </div>
          <div class="book-colophon">
            <span>FÍSICA ESTADÍSTICA · TEORÍA DEL CAOS · FRACTALES</span>
            <small>EDICIÓN CIENTÍFICA DIGITAL INTERACTIVA</small>
          </div>
        </div>
      `
    },

    // PÁGINA 1: Índice interactivo (Página Izquierda)
    {
      number: 1,
      module: "mod-0",
      type: "toc",
      html: `
        <div class="page-inner toc-page">
          <div class="page-header">
            <span>ÍNDICE GENERAL</span>
            <span class="mono">PARTE I</span>
          </div>
          <h2 class="toc-title">Temario de Investigación</h2>
          <p class="toc-intro">Selecciona cualquier capítulo para abrir directamente la página correspondiente:</p>

          <div class="toc-list">
            <div class="toc-group" data-module="mod-0">
              <div class="toc-group-header">
                <span class="toc-mod-badge">MOD 00</span>
                <strong>Fundamentos y Metodología</strong>
              </div>
              <a href="#p-2" class="toc-item" data-goto="2">
                <span class="toc-ch-num">0.1</span>
                <span class="toc-ch-name">¿Qué es la Econofísica?</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 02</span>
              </a>
              <a href="#p-4" class="toc-item" data-goto="4">
                <span class="toc-ch-num">0.2</span>
                <span class="toc-ch-name">Economía Clásica vs. Econofísica</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 04</span>
              </a>
            </div>

            <div class="toc-group" data-module="mod-1">
              <div class="toc-group-header">
                <span class="toc-mod-badge">MOD 01</span>
                <strong>Fenómenos Estocásticos y Colas Pesadas</strong>
              </div>
              <a href="#p-6" class="toc-item" data-goto="6">
                <span class="toc-ch-num">1.1</span>
                <span class="toc-ch-name">Colas Pesadas y Leyes de Potencia</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 06</span>
              </a>
              <a href="#p-8" class="toc-item" data-goto="8">
                <span class="toc-ch-num">1.2</span>
                <span class="toc-ch-name">Memoria Larga, Fractales y Hurst</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 08</span>
              </a>
            </div>

            <div class="toc-group" data-module="mod-2">
              <div class="toc-group-header">
                <span class="toc-mod-badge">MOD 02</span>
                <strong>Laboratorio Experimental de Difusión</strong>
              </div>
              <a href="#p-10" class="toc-item" data-goto="10">
                <span class="toc-ch-num">2.1</span>
                <span class="toc-ch-name">Simulador 2D: Paseo Aleatorio Discreto</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 10</span>
              </a>
              <a href="#p-12" class="toc-item" data-goto="12">
                <span class="toc-ch-num">2.2</span>
                <span class="toc-ch-name">Visualizador 3D: Red Cuántica de Agentes</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 12</span>
              </a>
            </div>
          </div>
          <div class="page-footer">
            <span class="mono">pág. 01</span>
          </div>
        </div>
      `
    },

    // PÁGINA 2: Índice interactivo (Página Derecha / Módulos avanzados)
    {
      number: 2,
      module: "mod-0",
      type: "toc",
      html: `
        <div class="page-inner toc-page">
          <div class="page-header">
            <span>ÍNDICE GENERAL</span>
            <span class="mono">PARTE II</span>
          </div>
          <div class="toc-list" style="margin-top: 20px;">
            <div class="toc-group" data-module="mod-3">
              <div class="toc-group-header">
                <span class="toc-mod-badge">MOD 03</span>
                <strong>Redes Complejas y Riesgo Sistémico</strong>
              </div>
              <a href="#p-14" class="toc-item" data-goto="14">
                <span class="toc-ch-num">3.1</span>
                <span class="toc-ch-name">Grafos Libres de Escala y Resiliencia</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 14</span>
              </a>
              <a href="#p-16" class="toc-item" data-goto="16">
                <span class="toc-ch-num">3.2</span>
                <span class="toc-ch-name">Modelos de Agentes e Ising</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 16</span>
              </a>
            </div>

            <div class="toc-group" data-module="mod-4">
              <div class="toc-group-header">
                <span class="toc-mod-badge">MOD 04</span>
                <strong>Archivo y Cuaderno Personal</strong>
              </div>
              <a href="#p-18" class="toc-item" data-goto="18">
                <span class="toc-ch-num">4.1</span>
                <span class="toc-ch-name">Bitácora de Investigaciones (IndexedDB)</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 18</span>
              </a>
            </div>

            <div class="toc-group" data-module="mod-5">
              <div class="toc-group-header">
                <span class="toc-mod-badge">MOD 05</span>
                <strong>Preguntas Clave y Autoevaluación</strong>
              </div>
              <a href="#p-20" class="toc-item" data-goto="20">
                <span class="toc-ch-num">5.1</span>
                <span class="toc-ch-name">FAQ Científica Detallada</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 20</span>
              </a>
              <a href="#p-22" class="toc-item" data-goto="22">
                <span class="toc-ch-num">5.2</span>
                <span class="toc-ch-name">Autoevaluación de Aprendizaje Activo</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 22</span>
              </a>
            </div>

            <div class="toc-group" data-module="mod-6">
              <div class="toc-group-header">
                <span class="toc-mod-badge">MOD 06</span>
                <strong>Literatura Seminal y Ruta</strong>
              </div>
              <a href="#p-24" class="toc-item" data-goto="24">
                <span class="toc-ch-num">6.1</span>
                <span class="toc-ch-name">Textos y Literatura Canónica</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 24</span>
              </a>
              <a href="#p-26" class="toc-item" data-goto="26">
                <span class="toc-ch-num">6.2</span>
                <span class="toc-ch-name">Ruta Formativa de Competencias</span>
                <span class="toc-dots"></span>
                <span class="toc-page-num">Pág. 26</span>
              </a>
            </div>
          </div>

          <div class="quick-search-box">
            <label for="book-search">🔍 Buscar en el cuaderno:</label>
            <input type="text" id="book-search" placeholder="Ej. colas pesadas, Bachelier, Pareto...">
          </div>

          <div class="page-footer">
            <span class="mono">pág. 02</span>
          </div>
        </div>
      `
    },

    // PÁGINA 3: Cap 0.1 - ¿Qué es la Econofísica? (Parte 1: Planteamiento y Fenómeno)
    {
      number: 3,
      module: "mod-0",
      title: "¿Qué es la Econofísica?",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 00 · FUNDAMENTOS</span>
            <span class="chapter-tag">CAP. 0.1</span>
          </div>
          
          <div class="lesson-problem-box">
            <span class="problem-label">PREGUNTA CIENTÍFICA INICIAL</span>
            <p>¿Por qué las teorías económicas tradicionales fracasan repetidamente al predecir o modelar caídas bursátiles catastróficas, mientras que la física de transiciones de fase describe con exactitud el comportamiento colectivo de millones de agentes?</p>
          </div>

          <h3>1. El nacimiento de una disciplina interdisciplinar</h3>
          <p>La <strong>econofísica</strong> fue formalizada en 1995 en una conferencia celebrada en Calcuta por el físico estadounidense <em>H. Eugene Stanley</em> (Boston University) junto con colaboradores como <em>Rosario Mantegna</em>. Su premisa radical parte de un hecho empírico irrefutable:</p>
          
          <blockquote class="science-quote">
            "Los sistemas económicos no son mecanismos cerrados en equilibrio termodinámico estático, sino sistemas complejos adaptativos permanentemente fuera del equilibrio."
          </blockquote>

          <p>Durante décadas, la economía neoclásica asumió axiomas matemáticos por elegancia analítica: agentes racionales que maximizan su utilidad esperada, mercados eficientes en arbitraje continuo y perturbaciones aleatorias gaussianas. Sin embargo, los físicos estadísticos notaron que las distribuciones empíricas de precios en bolsas de valores exhiben regularidades estadísticas universales análogas a:</p>

          <ul class="clean-list">
            <li><strong>Turbulencia hidrodinámica:</strong> Cascadas de energía entre escalas temporales de microsegundos a meses.</li>
            <li><strong>Transiciones de fase y criticalidad:</strong> Formación de clusters magnéticos idénticos al contagio de opiniones bursátiles.</li>
            <li><strong>Mecánica estadística de medios desordenados:</strong> Ruido térmico y difusión en presencia de interacción heterogénea.</li>
          </ul>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 03</span>
          </div>
        </div>
      `
    },

    // PÁGINA 4: Cap 0.1 - ¿Qué es la Econofísica? (Parte 2: Primeros Principios y Leyes Universales)
    {
      number: 4,
      module: "mod-0",
      title: "Principios Universales de Escala",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 00 · FUNDAMENTOS</span>
            <span class="chapter-tag">CAP. 0.1 (CONT.)</span>
          </div>

          <h3>2. Del Microcomportamiento al Fenómeno Colectivo</h3>
          <p>En física estadística no intentamos predecir la trayectoria microscópica de cada una de las \\(10^{23}\\) moléculas de un gas para calcular su presión; derivamos leyes macroscópicas a partir de distribuciones y promedios de ensamble.</p>

          <p>De forma homóloga, la econofísica estudia el mercado financiero como un sistema de \\(N\\) agentes interactuantes. El precio emerge de un balance dinámico entre oferta y demanda:</p>

          <div class="math-card">
            <div class="math-caption">Ecuación de Impacto de Flujo de Órdenes</div>
            <div class="katex-eq" data-tex="r(t) = \\ln\\left(\\frac{P(t+\\Delta t)}{P(t)}\\right) \\propto \\lambda \\cdot \\Omega(t) + \\xi(t)"></div>
            <p class="math-legend">Donde \\(r(t)\\) es el retorno logarítmico, \\(\\lambda\\) es la profundidad del libro de órdenes (resiliencia de liquidez), \\(\\Omega(t)\\) es el desbalance neto de compradores/vendedores y \\(\\xi(t)\\) representa el ruido estocástico microscópico.</p>
          </div>

          <div class="callout-concept">
            <h4>💡 Conexión Conceptual Clave</h4>
            <p>A diferencia del enfoque deductivo de la econometría pura, la econofísica es <strong>inductiva y guiada por microdatos</strong>: se obtienen series temporales reales tick-by-tick y se comprueban qué leyes matemáticas se sostienen invariantes en el tiempo.</p>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 04</span>
          </div>
        </div>
      `
    },

    // PÁGINA 5: Cap 0.2 - Economía Clásica vs Econofísica (Tabla Comparativa Rigurosa)
    {
      number: 5,
      module: "mod-0",
      title: "Economía Clásica vs. Econofísica Moderna",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 00 · METODOLOGÍA</span>
            <span class="chapter-tag">CAP. 0.2</span>
          </div>

          <h3>Tabla Comparativa Fundamental de Paradigmas</h3>
          <p class="lead-p">Contraste entre los axiomas de la teoría financiera neoclásica y los hallazgos empíricos de la física de sistemas complejos:</p>

          <div class="table-wrap compact">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>DIMENSIÓN</th>
                  <th>PARADIGMA CLÁSICO</th>
                  <th>ECONOFÍSICA MODERNA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Estado del Sistema</strong></td>
                  <td>Equilibrio general estacionario. Oferta y demanda se igualan instantáneamente.</td>
                  <td>Sistema adaptativo permanentemente fuera del equilibrio con dinámicas metaestables.</td>
                </tr>
                <tr>
                  <td><strong>Racionalidad</strong></td>
                  <td>Agente representativo homogéneo, perfectamente racional y maximizador.</td>
                  <td>Agentes heterogéneos con racionalidad limitada, imitación y comportamiento en manada.</td>
                </tr>
                <tr>
                  <td><strong>Distribución</strong></td>
                  <td>Distribución Normal (Gauss). Desvíos grandes se consideran casi imposibles.</td>
                  <td>Colas pesadas (Fat Tails), leyes de potencias invariantes de escala y distribuciones de Lévy.</td>
                </tr>
                <tr>
                  <td><strong>Correlación Temporal</strong></td>
                  <td>Ruidos blancos incorrelados sin memoria histórica (Paseo aleatorio puro).</td>
                  <td>Agrupamiento de volatilidad (*volatility clustering*), persistencia temporal y fractales.</td>
                </tr>
                <tr>
                  <td><strong>Estructura</strong></td>
                  <td>Agentes atomizados que interactúan solo a través del vector de precios.</td>
                  <td>Redes complejas de crédito interbancario y grafos de producción con riesgo de cascada.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 05</span>
          </div>
        </div>
      `
    },

    // PÁGINA 6: Cap 0.2 (Cont.) - Resumen y Transición a Fenómenos Estocásticos
    {
      number: 6,
      module: "mod-0",
      title: "La Ruptura del Supuesto Gaussiano",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 00 · METODOLOGÍA</span>
            <span class="chapter-tag">CAP. 0.2 (CONT.)</span>
          </div>

          <h3>¿Por qué importa esta distinción matemática?</h3>
          <p>Si las variaciones diarias de los precios bursátiles siguieran realmente una campana de Gauss con media cero y desviación típica \\(\\sigma\\):</p>

          <div class="stat-callout-grid">
            <div class="stat-card">
              <span class="stat-big">10^{-15}</span>
              <p>Probabilidad de un movimiento de <strong>8 desviaciones estándar (8\\(\\sigma\\))</strong> bajo Gauss: ocurriría una vez cada 100.000 millones de años (mucho más que la edad del universo).</p>
            </div>
            <div class="stat-card highlight">
              <span class="stat-big">&gt; 1 cada 5 años</span>
              <p>Frecuencia real observada en los mercados mundiales: Caídas de 8 a 15\\(\\sigma\\) han ocurrido en 1987, 1998, 2008 y 2020.</p>
            </div>
          </div>

          <p>Esta discrepancia astronómica no es un simple error de redondeo: es la prueba formal de que el modelo gaussiano subestima el riesgo sistémico de manera catastrófica.</p>

          <div class="interactive-tag-box">
            <span>SIGUIENTE CAPÍTULO:</span>
            <strong>Pasa la página para analizar la derivación formal de las leyes de potencia de Pareto y Lévy →</strong>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 06</span>
          </div>
        </div>
      `
    },

    // PÁGINA 7: Cap 1.1 - Colas Pesadas y Leyes de Potencia (Parte 1: Derivación)
    {
      number: 7,
      module: "mod-1",
      title: "Colas Pesadas y Leyes de Potencia",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 01 · FENÓMENOS ESTOCÁSTICOS</span>
            <span class="chapter-tag">CAP. 1.1</span>
          </div>

          <div class="lesson-problem-box">
            <span class="problem-label">EL PROBLEMA DE LOS EVENTOS EXTREMOS</span>
            <p>¿Qué función de probabilidad describe rigurosamente la probabilidad de que una fluctuación de precio supere una magnitud dada \\(x\\)?</p>
          </div>

          <h3>1. La Ley Invariante de Escala de Pareto</h3>
          <p>Vilfredo Pareto (1896) observó originalmente que la distribución de los ingresos en la sociedad no decae exponencialmente, sino que sigue una <strong>ley de potencia asintótica</strong>:</p>

          <div class="math-card">
            <div class="math-caption">Distribución Acumulada de Cola de Potencia</div>
            <div class="katex-eq" data-tex="P(X > x) \\sim x^{-\\alpha}, \\quad \\text{para } x \\gg x_{\\min}"></div>
            <p class="math-legend">Donde \\(\\alpha\\) es el exponente de Pareto. Para la distribución de la riqueza mundial empírica, \\(\\alpha \\approx 1.5\\) a \\(2.0\\). Para retornos financieros normalizados diarios, el exponente de cola se sitúa universalmente en \\(\\alpha \\approx 3\\) (la conocida como <em>Ley Cúbica Universal de Fluctuaciones</em> de Stanley y Mantegna).</p>
          </div>

          <h3>2. Consecuencias en los Momentos Estadísticos</h3>
          <p>Una propiedad matemática fascinante de las distribuciones de ley de potencia con función de densidad \\(f(x) \\propto x^{-(1+\\alpha)}\\) es que sus momentos teóricos \\(\\mathbb{E}[X^k]\\) divergen cuando \\(k \\ge \\alpha\\):</p>
          <ul class="clean-list">
            <li>Si \\(\\alpha \\le 2\\): La varianza \\(\\sigma^2 = \\infty\\) diverge en el límite teórico. ¡El Teorema Central del Límite clásico colapsa!</li>
            <li>En su lugar, rige el <strong>Teorema Central del Límite Generalizado de Lévy-Gnedenko</strong>, convergiendo a distribuciones estables de Lévy.</li>
          </ul>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 07</span>
          </div>
        </div>
      `
    },

    // PÁGINA 8: Cap 1.1 - Colas Pesadas (Parte 2: Gráfico Conceptual y Ejemplo)
    {
      number: 8,
      module: "mod-1",
      title: "Comparación de Decaimiento: Gauss vs. Ley de Potencia",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 01 · FENÓMENOS ESTOCÁSTICOS</span>
            <span class="chapter-tag">CAP. 1.1 (CONT.)</span>
          </div>

          <h3>Comparativa Matemática del Decaimiento de Cola</h3>
          <p>Observemos cómo decae la probabilidad en el infinito entre la función gaussiana y la ley de potencia:</p>

          <div class="math-card">
            <div class="math-caption">Contraste de Funciones de Cola</div>
            <div class="katex-eq" data-tex="f_{\\text{Gauss}}(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{x^2}{2\\sigma^2}} \\quad \\text{vs.} \\quad f_{\\text{Potencia}}(x) = \\frac{\\alpha x_0^\\alpha}{x^{\\alpha+1}}"></div>
          </div>

          <div class="concept-breakdown-card">
            <h4>Decaimiento Exponencial vs. Polinomial</h4>
            <p>La curva de Gauss cae con el término \\(e^{-x^2}\\), un decaimiento super-exponencial tan aplastante que cualquier evento a más de \\(4\\sigma\\) es descartado como ruido imposible. Por el contrario, la ley de potencia cae de forma polinomial suave \\(x^{-(\\alpha+1)}\\), permitiendo que coexistan eventos regulares con fluctuaciones colosales dentro de una misma ley estadística.</p>
          </div>

          <div class="worked-example">
            <span class="example-badge">EJEMPLO RESUELTO EN FINANZAS</span>
            <p><strong>Cálculo:</strong> Si el retorno de un índice sigue una ley de potencia con \\(\\alpha = 3\\) para retornos normalizados \\(x \\ge 2\\), calcula el ratio entre la probabilidad de observar una caída de \\(10\\sigma\\) frente a \\(2\\sigma\\):</p>
            <div class="katex-eq" data-tex="\\frac{P(X > 10)}{P(X > 2)} = \\left(\\frac{10}{2}\\right)^{-3} = 5^{-3} = \\frac{1}{125} = 0.008"></div>
            <p>Bajo la distribución normal, ese mismo ratio sería \\(\\frac{e^{-50}}{e^{-2}} = e^{-48} \\approx 1.4 \\times 10^{-21}\\). ¡La ley de potencia asigna una probabilidad <strong>19 órdenes de magnitud mayor</strong> al evento extremo!</p>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 08</span>
          </div>
        </div>
      `
    },

    // PÁGINA 9: Cap 1.2 - Memoria Larga, Fractales y Hurst
    {
      number: 9,
      module: "mod-1",
      title: "Fractales y Memoria Larga",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 01 · FENÓMENOS ESTOCÁSTICOS</span>
            <span class="chapter-tag">CAP. 1.2</span>
          </div>

          <div class="lesson-problem-box">
            <span class="problem-label">¿SON LOS PRECIOS INDEPENDIENTES DÍA TRAS DÍA?</span>
            <p>Si los precios fueran un paseo aleatorio ideal, la autocorrelación de la volatilidad debería ser cero. ¿Qué demuestran los datos del matemático Benoit Mandelbrot?</p>
          </div>

          <h3>1. El Fenómeno del Agrupamiento de Volatilidad</h3>
          <p>Aunque los retornos simples \\(r(t)\\) presentan una autocorrelación lineal casi nula (lo que impide predecir fácilmente si mañana subirá o bajará el precio), sus valores absolutos \\(|r(t)|\\) y cuadrados \\(r(t)^2\\) presentan una <strong>autocorrelación de decaimiento hiperbólico muy lento</strong>:</p>

          <div class="math-card">
            <div class="math-caption">Autocorrelación de Volatilidad con Memoria Larga</div>
            <div class="katex-eq" data-tex="C(\\tau) = \\text{Corr}\\left(|r(t)|, |r(t+\\tau)|\\right) \\sim \\tau^{-\\gamma}, \\quad 0 < \\gamma < 1"></div>
            <p class="math-legend">Grandes variaciones van seguidas de grandes variaciones (en cualquier dirección), y días calmos van seguidos de calma. El mercado "recuerda" la turbulencia durante semanas o meses.</p>
          </div>

          <h3>2. El Exponente de Hurst y Geometría Fractal</h3>
          <p>Desarrollado por el hidrólogo Harold Edwin Hurst y popularizado por Benoit Mandelbrot en su libro <em>Fractales y Finanzas</em>, el exponente \\(H\\) cuantifica la persistencia de una serie temporal:</p>
          <ul class="clean-list">
            <li><strong>\\(H = 0.5\\):</strong> Paseo aleatorio browniano clásico puro. Incrementos estadísticamente independientes.</li>
            <li><strong>\\(0.5 < H < 1.0\\):</strong> Serie temporal <em>persistente</em> o con memoria de largo alcance. Una tendencia al alza estadísticamente refuerza la inercia continuada.</li>
            <li><strong>\\(0 < H < 0.5\\):</strong> Serie temporal <em>antipersistente</em> o reversión media continua.</li>
          </ul>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 09</span>
          </div>
        </div>
      `
    },

    // PÁGINA 10: Cap 1.2 (Cont.) - Dimensión Fractal y Tiempo Multifractal
    {
      number: 10,
      module: "mod-1",
      title: "Tiempo Financiero y Rugosidad Multifractal",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 01 · FENÓMENOS ESTOCÁSTICOS</span>
            <span class="chapter-tag">CAP. 1.2 (CONT.)</span>
          </div>

          <h3>3. Relación entre Dimensión Fractal y Exponente de Hurst</h3>
          <p>La rugosidad visual de un gráfico de precios bursátiles se vincula directamente a su dimensión de Hausdorff-Besicovitch \\(D\\):</p>

          <div class="math-card">
            <div class="katex-eq" data-tex="D = 2 - H"></div>
            <p class="math-legend">Para un paseo browniano ordinario (\\(H = 0.5\\)), la trayectoria tiene dimensión fractal \\(D = 1.5\\). En activos altamente volátiles con saltos y agrupamiento de liquidez, la dimensión fractal fluctúa localmente, requiriendo un espectro <strong>multifractal</strong> completo \\(f(\\alpha)\\).</p>
          </div>

          <div class="callout-concept">
            <h4>El "Tiempo de Trading" no es el tiempo del reloj</h4>
            <p>Mandelbrot introdujo el concepto de <em>tiempo operativo</em>: el mercado acelera durante períodos de noticias y transacciones masivas, y se ralentiza durante la noche. Al medir las fluctuaciones no por horas astronómicas sino por volumen de órdenes transadas, muchas de las anomalías aparentes se unifican bajo leyes invariantes de escala.</p>
          </div>

          <div class="interactive-tag-box">
            <span>A CONTINUACIÓN EN EL CUADERNO:</span>
            <strong>Pasa a la página 11 para experimentar con el Simulador Numérico interactivo del Paseo Aleatorio →</strong>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 10</span>
          </div>
        </div>
      `
    },

    // PÁGINA 11: Cap 2.1 - Simulador 2D de Paseo Aleatorio (Control y Teoría)
    {
      number: 11,
      module: "mod-2",
      title: "Simulador Numérico: Paseo Aleatorio Discreto",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 02 · LABORATORIO VIRTUAL</span>
            <span class="chapter-tag">CAP. 2.1</span>
          </div>

          <div class="lesson-problem-box">
            <span class="problem-label">EXPERIMENTO 001 · DIFUSIÓN BROWNIANA</span>
            <p>Modela computacionalmente una trayectoria estocástica unidimensional y evalúa cómo el parámetro de dispersión temporal \\(\\sigma\\) modifica la varianza final del ensamble.</p>
          </div>

          <div class="math-card">
            <div class="math-caption">Ecuación en Diferencias Finitas</div>
            <div class="katex-eq" data-tex="x_{t+1} = x_t + \\sigma \\cdot \\varepsilon_t, \\quad \\varepsilon_t \\sim \\mathcal{U}(-1, 1)"></div>
            <p class="math-legend">Donde \\(x_0 = 100\\), \\(t = 1, \\dots, 200\\) pasos y \\(\\sigma\\) es la amplitud de fluctuación estocástica instantánea.</p>
          </div>

          <div class="lab-controls-panel">
            <div class="slider-group">
              <label for="book-vol">Amplitud de fluctuación (\\(\\sigma\\)): <output id="book-volOut" class="mono">5</output></label>
              <input type="range" id="book-vol" min="1" max="15" value="5" class="quant-slider">
            </div>

            <div class="lab-btn-row">
              <button class="button cta" id="book-simulate">↻ Generar Nueva Trayectoria</button>
              <button class="text-link" id="book-multirun">Generar Ensamble (x10)</button>
            </div>
          </div>

          <div class="metrics-grid">
            <div class="metric-card">
              <span class="metric-lbl">PRECIO FINAL (x_{200})</span>
              <span class="metric-val mono" id="m-final">100.0</span>
            </div>
            <div class="metric-card">
              <span class="metric-lbl">RETORNO ACUMULADO</span>
              <span class="metric-val mono" id="m-ret">0.0%</span>
            </div>
            <div class="metric-card">
              <span class="metric-lbl">VOLATILIDAD REALIZADA</span>
              <span class="metric-val mono" id="m-vol">5.0</span>
            </div>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 11</span>
          </div>
        </div>
      `
    },

    // PÁGINA 12: Cap 2.1 (Cont.) - Canvas Gráfico del Simulador 2D
    {
      number: 12,
      module: "mod-2",
      title: "Visualización Gráfica de la Trayectoria",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 02 · LABORATORIO VIRTUAL</span>
            <span class="chapter-tag">CAP. 2.1 (CANVAS)</span>
          </div>

          <div class="chart-container-card">
            <div class="chart-header-bar">
              <span class="chart-tag mono">TRAYECTORIA ESTOCÁSTICA DISCRETA</span>
              <span class="chart-status mono">200 PASOS TEMPORALES</span>
            </div>
            <canvas id="book-chart" width="460" height="260" aria-label="Gráfico de trayectoria estocástica"></canvas>
            <div class="chart-footer-bar">
              <span class="mono">EJE X: TIEMPO t (PASOS)</span>
              <span class="mono">EJE Y: VALOR x(t)</span>
            </div>
          </div>

          <div class="callout-concept" style="margin-top: 15px;">
            <h4>Nota Metodológica sobre Modelos Ideales</h4>
            <p>Este simulador representa una difusión browniana simple con incrementos acotados. Observa que, a diferencia de los mercados reales, <strong>aquí no existen colas pesadas ni saltos abruptos</strong> porque los pasos son independientes y uniformes. En el capítulo 1.1 contrastamos cómo la física añade distribuciones de Lévy para capturar los pánicos de liquidez.</p>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 12</span>
          </div>
        </div>
      `
    },

    // PÁGINA 13: Cap 2.2 - Visualizador 3D: Red Cuántica de Agentes (Teoría)
    {
      number: 13,
      module: "mod-2",
      title: "Visualizador 3D: Red de Agentes Económicos",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 02 · LABORATORIO VIRTUAL</span>
            <span class="chapter-tag">CAP. 2.2</span>
          </div>

          <div class="lesson-problem-box">
            <span class="problem-label">VISUALIZACIÓN ESPACIAL 3D</span>
            <p>¿Cómo se propaga la información y el riesgo de crédito en una red de \\(N\\) instituciones financieras acopladas en un espacio tridimensional de fase?</p>
          </div>

          <h3>Topología de Acoplamiento y Matriz de Adyacencia</h3>
          <p>Consideremos un grafo tridimensional \\(G = (V, E)\\) donde cada nodo \\(v_i \\in V\\) representa una entidad financiera con posición espacial \\(\\vec{r}_i(t)\\) y balance neto. Dos nodos están conectados por una arista \\(e_{ij} \\in E\\) si la distancia de acoplamiento de liquidez es menor a un umbral crítico \\(r_c\\):</p>

          <div class="math-card">
            <div class="math-caption">Condición de Acoplamiento y Matriz de Adyacencia</div>
            <div class="katex-eq" data-tex="A_{ij} = \\begin{cases} 1 & \\text{si } \\|\\vec{r}_i - \\vec{r}_j\\| \\le r_c \\\\ 0 & \\text{en caso contrario} \\end{cases}"></div>
          </div>

          <p>En la página contigua tienes a tu disposición un <strong>visor tridimensional interactivo</strong> implementado directamente en WebGL. Puedes rotar con el ratón o gesto táctil, pausar la dinámica oscilatoria y modificar la densidad de interconexión para observar la formación de clusters.</p>

          <div class="lab-controls-panel">
            <button class="button small" id="toggle-3d-nodes">↻ Reorganizar Enjambre 3D</button>
            <button class="text-link" id="toggle-3d-rotate">Pausar / Reanudar Giro</button>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 13</span>
          </div>
        </div>
      `
    },

    // PÁGINA 14: Cap 2.2 (Cont.) - Visor 3D Interactivo de Red
    {
      number: 14,
      module: "mod-2",
      title: "Explorador WebGL 3D Integrado",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 02 · LABORATORIO VIRTUAL</span>
            <span class="chapter-tag">CAP. 2.2 (3D VIEWPORT)</span>
          </div>

          <div class="viewport-3d-card">
            <div class="viewport-header">
              <span class="mono" style="color:var(--primary-cyan);">● RED DE ACOPLAMIENTO NO LINEAL</span>
              <span class="mono" style="font-size:9px;">ARRASTRA PARA ROTAR · ZOOM DISPONIBLE</span>
            </div>
            
            <div id="inline-3d-container" class="inline-webgl-canvas" style="width:100%;height:270px;background:#03060c;border-radius:14px;position:relative;overflow:hidden;">
              <canvas id="network-3d-canvas" style="width:100%;height:100%;"></canvas>
              <div class="canvas-3d-overlay">
                <span class="overlay-badge">NODOS ACTIVOS: 105</span>
                <span class="overlay-badge">ENLACES: DINÁMICOS</span>
              </div>
            </div>

            <div class="viewport-caption">
              <span>FIG. 3D-01 · DINÁMICA DE ENJAMBRE Y RESILIENCIA ESTRUCTURAL</span>
            </div>
          </div>

          <div class="callout-concept" style="margin-top:12px;">
            <h4>¿Qué fenómeno físico ilustra esta simulación?</h4>
            <p>Muestra cómo pequeños desplazamientos locales pueden desconectar subgrafos completos o, alternativamente, provocar una <strong>percolación global</strong> donde cualquier shock local se transmite a toda la red en tiempo real.</p>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 14</span>
          </div>
        </div>
      `
    },

    // PÁGINA 15: Cap 3.1 - Grafos Libres de Escala y Resiliencia Financiera
    {
      number: 15,
      module: "mod-3",
      title: "Grafos Libres de Escala y Resiliencia",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 03 · REDES COMPLEJAS</span>
            <span class="chapter-tag">CAP. 3.1</span>
          </div>

          <div class="lesson-problem-box">
            <span class="problem-label">EL DILEMA DE LA TOPOLOGÍA FINANCIERA</span>
            <p>¿Por qué las redes libres de escala son altamente robustas frente a fallos aleatorios pero extremadamente frágiles ante ataques o quiebras de sus nodos centrales (*hubs*)?</p>
          </div>

          <h3>1. Distribución de Grado Libre de Escala</h3>
          <p>En una red de crédito interbancario o de cadenas de suministro globales, el número de conexiones \\(k\\) de cada nodo no sigue una campana de Poisson como en los grafos aleatorios de Erdős-Rényi, sino una ley de potencia de Barabási-Albert:</p>

          <div class="math-card">
            <div class="math-caption">Distribución de Grado de Conexión</div>
            <div class="katex-eq" data-tex="P(k) \\sim k^{-\\gamma}, \\quad 2 < \\gamma < 3"></div>
            <p class="math-legend">La inmensa mayoría de instituciones bancarias tienen pocos enlaces \\(k\\), mientras que unos pocos "superhubs" (instituciones sistémicamente importantes, o <em>Too Big to Fail</em>) concentran miles de enlaces directos e indirectos.</p>
          </div>

          <h3>2. Cascada de Quiebras y Efecto Dominó</h3>
          <p>El modelo de Eisenberg y Noe (2001) y Gai-Kapadia (2010) formaliza cómo las pérdidas en el balance de un banco \\(i\\) se transfieren a sus acreedores \\(j\\) mediante el vector de pagos de liquidación:</p>

          <div class="math-card">
            <div class="katex-eq" data-tex="p_i^* = \\min\\left(e_i + \\sum_{j=1}^N \\Pi_{ji} p_j^*, \\; \\bar{p}_i\\right)"></div>
            <p class="math-legend">Donde \\(e_i\\) son los activos externos, \\(\\Pi_{ji}\\) es la proporción de deuda relativa entre bancos y \\(\\bar{p}_i\\) es la obligación nominal total.</p>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 15</span>
          </div>
        </div>
      `
    },

    // PÁGINA 16: Cap 3.2 - Modelos Basados en Agentes (ABM) e Ising
    {
      number: 16,
      module: "mod-3",
      title: "Modelos de Agentes e Ising en Finanzas",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 03 · REDES COMPLEJAS</span>
            <span class="chapter-tag">CAP. 3.2</span>
          </div>

          <h3>El Modelo de Ising Ferromagnético Aplicado a Mercados</h3>
          <p>En física del estado sólido, el modelo de Ising describe la magnetización espontánea de espines atómicos \\(s_i \\in \\{+1, -1\\}\\). En econofísica (modelo de Lux-Marchesi y Bouchaud), cada espín representa la postura de un inversor:</p>

          <ul class="clean-list">
            <li><strong>\\(s_i = +1\\):</strong> Comprador optimista (Bull).</li>
            <li><strong>\\(s_i = -1\\):</strong> Vendedor pesimista (Bear).</li>
          </ul>

          <div class="math-card">
            <div class="math-caption">Hamiltoniano Social de Interacción</div>
            <div class="katex-eq" data-tex="\\mathcal{H} = -\\sum_{\\langle i, j \\rangle} J_{ij} s_i s_j - \\sum_i h_i s_i"></div>
            <p class="math-legend">Donde \\(J_{ij} > 0\\) representa la fuerza de imitación social (efecto rebaño) y \\(h_i\\) representa las noticias fundamentales exógenas.</p>
          </div>

          <div class="concept-breakdown-card">
            <h4>Transición de Fase y Criticalidad</h4>
            <p>A temperatura alta (alta incertidumbre idiosincrática), los agentes compran y venden al azar: el mercado está desordenado. Cuando el acoplamiento imitativo \\(J\\) supera un valor crítico \\(J_c\\), ocurre una <strong>transición de fase de segundo orden</strong>: todos los agentes adoptan súbitamente la misma postura, provocando burbujas especulativas o pánicos de venta masiva sin necesidad de noticias externas.</p>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 16</span>
          </div>
        </div>
      `
    },

    // PÁGINA 17: Cap 4.1 - Bitácora de Investigaciones (IndexedDB) - Introducción y Formulario
    {
      number: 17,
      module: "mod-4",
      title: "Bitácora Científica Personal (IndexedDB)",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 04 · ARCHIVO PERSONAL</span>
            <span class="chapter-tag">CAP. 4.1</span>
          </div>

          <div class="lesson-problem-box">
            <span class="problem-label">REGISTRO DE HIPÓTESIS Y HALLAZGOS</span>
            <p>Guarda tus preguntas abiertas, modelos matemáticos y notas experimentales de forma persistente y privada en el almacenamiento IndexedDB de tu navegador.</p>
          </div>

          <div class="notebook-entry-form-wrap">
            <h4>Nueva Entrada de Investigación</h4>
            <form id="book-entry-form" class="book-compact-form">
              <label>Título de la pregunta o hallazgo:
                <input type="text" id="b-title" required placeholder="¿Cómo se compara la volatilidad del activo X?" maxlength="120">
              </label>

              <div class="form-row-compact">
                <label>Línea de exploración:
                  <select id="b-topic">
                    <option value="Mercados">Mercados Financieros</option>
                    <option value="Redes">Redes Complejas</option>
                    <option value="Estadística">Física Estadística</option>
                  </select>
                </label>
                <label>Estado:
                  <select id="b-status">
                    <option value="Idea inicial">Idea inicial</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completada">Completada</option>
                  </select>
                </label>
              </div>

              <label>Resumen conceptual, hipótesis o metodología:
                <textarea id="b-notes" rows="3" required placeholder="Escribe aquí tu razonamiento matemático o datos analizados..."></textarea>
              </label>

              <button type="submit" class="button cta" style="width:100%;margin-top:8px;">＋ Guardar en mi Cuaderno</button>
            </form>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 17</span>
          </div>
        </div>
      `
    },

    // PÁGINA 18: Cap 4.1 (Cont.) - Lista de Investigaciones Guardadas
    {
      number: 18,
      module: "mod-4",
      title: "Archivo de Entradas y Exportación",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 04 · ARCHIVO PERSONAL</span>
            <span class="chapter-tag">CAP. 4.1 (REGISTRO)</span>
          </div>

          <div class="archive-header-row">
            <h4>Investigaciones Registradas</h4>
            <button class="text-link" id="book-export-json" style="font-size:11px;padding:6px 12px;">Exportar JSON ↗</button>
          </div>

          <div class="book-entries-container" id="book-entries-list">
            <!-- Entradas inyectadas dinámicamente desde IndexedDB -->
            <div class="loading-entries-msg">Cargando archivo de investigaciones...</div>
          </div>

          <div class="archive-storage-legend">
            <span>◉ Guardado localmente en IndexedDB. Privado y seguro en este equipo.</span>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 18</span>
          </div>
        </div>
      `
    },

    // PÁGINA 19: Cap 5.1 - FAQ Científica (Parte 1)
    {
      number: 19,
      module: "mod-5",
      title: "Preguntas Frecuentes sobre Econofísica",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 05 · PREGUNTAS CLAVE</span>
            <span class="chapter-tag">CAP. 5.1</span>
          </div>

          <div class="section-tag" style="margin-bottom:12px;">CONSULTAS CONCEPTUALES</div>
          <h3>Dudas Clave en la Aplicación de la Física</h3>

          <div class="book-faq-list">
            <details class="faq-item" open>
              <summary>¿Por qué la campana de Gauss no predice adecuadamente las crisis?</summary>
              <p>
                La distribución normal asume que desviaciones superiores a \\(5\\sigma\\) tienen una probabilidad infinitesimal (ocurrirían una vez cada varios miles de millones de años). Sin embargo, los retornos financieros reales presentan colas pesadas (leyes de potencias de Pareto-Lévy), lo que significa que las fluctuaciones extremas ocurren constantemente.
              </p>
            </details>

            <details class="faq-item">
              <summary>¿Qué diferencia a la econofísica de la econometría clásica?</summary>
              <p>
                La econometría tradicional parte de axiomas teóricos deductivos (equilibrio general y agentes racionales) para forzar los datos a encajar. La econofísica es inductiva: analiza microdatos empíricos sin asumir equilibrio estático y busca leyes universales de escala con herramientas de la física estadística.
              </p>
            </details>

            <details class="faq-item">
              <summary>¿Qué herramientas matemáticas y computacionales se utilizan?</summary>
              <p>
                Ecuaciones diferenciales estocásticas (Fokker-Planck y Langevin), mecánica estadística clásica y cuántica, modelos de percolación, teoría de grafos complejos y modelos basados en agentes (ABM).
              </p>
            </details>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 19</span>
          </div>
        </div>
      `
    },

    // PÁGINA 20: Cap 5.1 (Cont.) - FAQ Científica (Parte 2: Predicción de Colapsos)
    {
      number: 20,
      module: "mod-5",
      title: "¿Puede la física predecir colapsos bursátiles?",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 05 · PREGUNTAS CLAVE</span>
            <span class="chapter-tag">CAP. 5.1 (CONT.)</span>
          </div>

          <div class="book-faq-list">
            <details class="faq-item" open>
              <summary>¿Puede la física predecir cuándo ocurrirá un desplome bursátil?</summary>
              <p>
                No para un segundo exacto o de manera determinista fija, pues los agentes tienen libre albedrío y adaptan sus estrategias. No obstante, físicos como <em>Didier Sornette</em> han demostrado que las burbujas especulativas previas a los grandes colapsos presentan <strong>oscilaciones log-periódicas de ley de potencias (LPPL)</strong> que señalan la proximidad inminente de una transición de fase crítica, exactamente como ocurre en la fractura de materiales y los terremotos.
              </p>
            </details>

            <details class="faq-item">
              <summary>¿Cómo previene la física estadística el riesgo sistémico?</summary>
              <p>
                Modelando la topología de la red de préstamos interbancarios mediante teoría de grafos. Permite identificar qué instituciones son "nodos de percolación" cuya insolvencia dispararía una cascada de quiebras en efecto dominó, permitiendo regular el capital mínimo de forma adaptativa.
              </p>
            </details>
          </div>

          <div class="callout-concept" style="margin-top:16px;">
            <h4>Principios Cognitivos Aplicados</h4>
            <p>El aprendizaje profundo requiere <strong>recuperación activa</strong>. En la página siguiente encontrarás 3 desafíos conceptuales para poner a prueba tu asimilación de los temas estudiados.</p>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 20</span>
          </div>
        </div>
      `
    },

    // PÁGINA 21: Cap 5.2 - Autoevaluación de Aprendizaje Activo (Desafíos 1 y 2)
    {
      number: 21,
      module: "mod-5",
      title: "Autoevaluación de Aprendizaje Activo",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 05 · RECUPERACIÓN ACTIVA</span>
            <span class="chapter-tag">CAP. 5.2</span>
          </div>

          <div class="quiz-challenge-card" data-quiz-id="q1">
            <span class="quiz-tag">DESAFÍO 01 · DISTRIBUCIONES</span>
            <p class="quiz-question">Si una serie de retornos financieros sigue una ley de potencia \\(P(X > x) \\sim x^{-\\alpha}\\) con exponente \\(\\alpha = 1.6\\), ¿qué ocurre con su varianza estadística?</p>
            
            <div class="quiz-options">
              <button class="quiz-opt" data-correct="false" data-fb="Incorrecto. Cuando alpha <= 2, la integral del segundo momento diverge, por lo que la varianza matemática es infinita.">A) La varianza es finita y coincide con la campana de Gauss.</button>
              <button class="quiz-opt" data-correct="true" data-fb="¡Exacto! Como alpha <= 2, el segundo momento diverge en el límite teórico, gobernando el Teorema Central del Límite Generalizado de Lévy.">B) La varianza teórica diverge (es infinita), invalidando el Teorema Central del Límite clásico.</button>
              <button class="quiz-opt" data-correct="false" data-fb="Incorrecto. El exponente de Hurst determina la memoria temporal, no directamente el valor de la varianza.">C) La varianza es estrictamente cero porque el sistema está en equilibrio.</button>
            </div>
            <div class="quiz-feedback-box" style="display:none;"></div>
          </div>

          <div class="quiz-challenge-card" data-quiz-id="q2" style="margin-top:18px;">
            <span class="quiz-tag">DESAFÍO 02 · FRACTALES Y HURST</span>
            <p class="quiz-question">Un analista mide un exponente de Hurst \\(H = 0.72\\) en una serie de precios de materias primas. ¿Qué comportamiento describe este valor?</p>
            
            <div class="quiz-options">
              <button class="quiz-opt" data-correct="true" data-fb="¡Correcto! Un valor 0.5 < H < 1.0 indica persistencia o memoria de largo alcance: las tendencias pasadas tienen correlación positiva con las futuras.">A) Comportamiento persistente con memoria de largo alcance (tendencias auto-reforzadas).</button>
              <button class="quiz-opt" data-correct="false" data-fb="Incorrecto. Un paseo aleatorio browniano puro corresponde a H = 0.5 exactamente.">B) Un paseo aleatorio puro sin ninguna memoria temporal.</button>
              <button class="quiz-opt" data-correct="false" data-fb="Incorrecto. La antipersistencia o reversión a la media ocurre cuando 0 < H < 0.5.">C) Reversión a la media estricta y rápida a corto plazo.</button>
            </div>
            <div class="quiz-feedback-box" style="display:none;"></div>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 21</span>
          </div>
        </div>
      `
    },

    // PÁGINA 22: Cap 5.2 (Cont.) - Desafío 3 y Registro de Competencias
    {
      number: 22,
      module: "mod-5",
      title: "Desafío de Redes y Logros Dominados",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 05 · RECUPERACIÓN ACTIVA</span>
            <span class="chapter-tag">CAP. 5.2 (CONT.)</span>
          </div>

          <div class="quiz-challenge-card" data-quiz-id="q3">
            <span class="quiz-tag">DESAFÍO 03 · TOPOLOGÍA DE REDES</span>
            <p class="quiz-question">En una red interbancaria libre de escala (\\(P(k) \\sim k^{-\\gamma}\\)), ¿cuál es la principal vulnerabilidad del sistema ante una crisis de liquidez?</p>
            
            <div class="quiz-options">
              <button class="quiz-opt" data-correct="false" data-fb="Incorrecto. La caída de un nodo periférico ordinario apenas afecta al resto del grafo.">A) La quiebra de un banco pequeño periférico desconecta toda la red de inmediato.</button>
              <button class="quiz-opt" data-correct="true" data-fb="¡Excelente! Los superhubs concentran la mayor densidad de enlaces; su caída fractura la red en cascada por contagio sistémico.">B) La caída de un nodo central ('superhub') desencadena una cascada de quiebras en efecto dominó.</button>
              <button class="quiz-opt" data-correct="false" data-fb="Incorrecto. Los grafos libres de escala son altamente heterogéneos, no uniformes.">C) Todas las instituciones tienen exactamente la misma probabilidad de contagiar a las demás.</button>
            </div>
            <div class="quiz-feedback-box" style="display:none;"></div>
          </div>

          <div class="mastery-summary-card" style="margin-top:20px;">
            <h4>Tu Estado de Competencias Científicas</h4>
            <div class="mastery-bar-wrap">
              <div class="mastery-bar-fill" id="mastery-fill" style="width:33%;"></div>
            </div>
            <div class="mastery-badges-row">
              <span class="m-badge achieved" id="badge-fundamentos">✓ Fundamentos</span>
              <span class="m-badge" id="badge-estocastico">○ Colas Pesadas</span>
              <span class="m-badge" id="badge-redes">○ Redes Complejas</span>
            </div>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 22</span>
          </div>
        </div>
      `
    },

    // PÁGINA 23: Cap 6.1 - Literatura Seminal y Textos Fundacionales
    {
      number: 23,
      module: "mod-6",
      title: "Literatura Canónica y Referencias",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 06 · LITERATURA CANÓNICA</span>
            <span class="chapter-tag">CAP. 6.1</span>
          </div>

          <div class="section-tag" style="margin-bottom:12px;">BIBLIOGRAFÍA FORMAL</div>
          <h3>Textos Fundacionales de Referencia</h3>
          <p class="lead-p">Obras canónicas recomendadas para profundizar en los fundamentos matemáticos y experimentales de la econofísica:</p>

          <div class="book-ref-cards-grid">
            <div class="ref-card">
              <span class="ref-type">LIBRO SEMINAL · 1999</span>
              <h4>An Introduction to Econophysics: Correlations and Complexity in Finance</h4>
              <span class="ref-authors">Rosario N. Mantegna &amp; H. Eugene Stanley — Cambridge University Press</span>
              <p class="ref-desc">El primer texto formal sobre la disciplina. Aborda paseos aleatorios, distribución empírica de retornos y leyes de potencias.</p>
            </div>

            <div class="ref-card">
              <span class="ref-type">MONOGRAFÍA TÉCNICA · 2003</span>
              <h4>Theory of Financial Risk and Derivative Pricing</h4>
              <span class="ref-authors">Jean-Philippe Bouchaud &amp; Marc Potters — Cambridge University Press</span>
              <p class="ref-desc">Examen riguroso del riesgo real superando Black-Scholes, con teoría de matrices aleatorias (RMT) y distribuciones truncadas de Lévy.</p>
            </div>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 23</span>
          </div>
        </div>
      `
    },

    // PÁGINA 24: Cap 6.1 (Cont.) - Mandelbrot, Sornette y Autor
    {
      number: 24,
      module: "mod-6",
      title: "Obras Clásicas y Nota de Autoría",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 06 · LITERATURA CANÓNICA</span>
            <span class="chapter-tag">CAP. 6.1 (CONT.)</span>
          </div>

          <div class="book-ref-cards-grid">
            <div class="ref-card">
              <span class="ref-type">COMPLEJIDAD · 2003</span>
              <h4>Why Stock Markets Crash: Critical Events in Complex Financial Systems</h4>
              <span class="ref-authors">Didier Sornette — Princeton University Press</span>
              <p class="ref-desc">Compara colapsos bursátiles con sismos geológicos y fractura de materiales mediante criticalidad autoorganizada y leyes log-periódicas.</p>
            </div>

            <div class="ref-card">
              <span class="ref-type">GEOMETRÍA FRACTAL · 2004</span>
              <h4>The (Mis)Behavior of Markets: A Fractal View of Risk</h4>
              <span class="ref-authors">Benoit B. Mandelbrot &amp; Richard L. Hudson — Basic Books</span>
              <p class="ref-desc">Crítica magistral a la hipótesis de mercados eficientes por el creador de los fractales, proponiendo modelos multifractales continuos.</p>
            </div>
          </div>

          <div class="author-box" style="margin-top:20px;padding:20px;">
            <div>
              <h4 style="margin:0 0 6px;color:#fff;">Laboratorio Entropía</h4>
              <p style="font-size:12px;margin:0;color:var(--text-secondary);">
                Plataforma de investigación y divulgación científica creada por <strong>Jhimy Sayas Parodi</strong>. Diseñada para fomentar el estudio riguroso de la física estadística aplicada a la economía.
              </p>
            </div>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 24</span>
          </div>
        </div>
      `
    },

    // PÁGINA 25: Cap 6.2 - Ruta Formativa de Competencias
    {
      number: 25,
      module: "mod-6",
      title: "Ruta Formativa de Aprendizaje",
      html: `
        <div class="page-inner lesson-page">
          <div class="page-header">
            <span>MOD 06 · RUTA FORMATIVA</span>
            <span class="chapter-tag">CAP. 6.2</span>
          </div>

          <div class="section-tag" style="margin-bottom:10px;">ITINERARIO DE ESTUDIO</div>
          <h3>Plan Gradual de Dominio Científico</h3>
          <p class="lead-p" style="font-size:13px;margin-bottom:18px;">Estructura pedagógica por etapas diseñada según principios de andamiaje cognitivo:</p>

          <div class="curriculum-steps-stack">
            <div class="step-card" data-step-idx="0">
              <div class="step-badge mono">ETAPA 01</div>
              <div class="step-info">
                <h4>Construir las Bases Matemáticas</h4>
                <p>Cálculo estocástico, ecuaciones de difusión, procesos de Markov y programación científica en Python/Numpy.</p>
                <button class="step-toggle-btn" data-step="0">Marcar como dominado ○</button>
              </div>
            </div>

            <div class="step-card" data-step-idx="1">
              <div class="step-badge mono">ETAPA 02</div>
              <div class="step-info">
                <h4>Modelar los Sistemas Complejos</h4>
                <p>Distribuciones de Lévy, estimación del exponente de Hurst, modelos de Ising y redes de percolación interbancaria.</p>
                <button class="step-toggle-btn" data-step="1">Marcar como dominado ○</button>
              </div>
            </div>

            <div class="step-card" data-step-idx="2">
              <div class="step-badge mono">ETAPA 03</div>
              <div class="step-info">
                <h4>Formular Investigaciones Empíricas</h4>
                <p>Descarga de series temporales de alta frecuencia, ajuste de colas de Pareto y publicación de bitácoras.</p>
                <button class="step-toggle-btn" data-step="2">Marcar como dominado ○</button>
              </div>
            </div>
          </div>

          <div class="page-footer">
            <button class="nav-back-toc" data-goto="1">← Volver al Índice</button>
            <span class="mono">pág. 25</span>
          </div>
        </div>
      `
    },

    // PÁGINA 26: Contracubierta interior / Cierre del cuaderno
    {
      number: 26,
      module: "mod-6",
      type: "endpaper",
      html: `
        <div class="page-inner endpaper-page">
          <div class="symbol-hero">∿</div>
          <h3>Fin del Cuaderno Científico</h3>
          <p>Has recorrido los fundamentos teóricos, formulaciones matemáticas y simulaciones numéricas de la econofísica.</p>
          
          <div class="end-actions-card">
            <button class="button cta" id="book-restart-toc">Volver al Índice General ↗</button>
            <button class="text-link" id="book-close-cover">Cerrar el Cuaderno ↺</button>
          </div>

          <div class="book-final-note">
            <span>ENTROPÍA · LABORATORIO ABIERTO DE ECONOFÍSICA</span>
            <small>Desarrollado con Three.js, WebGL y KaTeX · 2026</small>
          </div>

          <div class="page-footer">
            <span class="mono">pág. 26</span>
          </div>
        </div>
      `
    }
  ]
};
