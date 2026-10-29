/* Temario integral de Econofísica. Solo índice; sin desarrollo de contenidos. */
window.ENTROPIA_BOOK = {
  meta: { title: "Econofísica — Temario integral", author: "", version: "1.0.0", institution: "" },
  modules: [
    { id: "m1", number: "1", title: "Sistemas económicos, mercados y observación", chapters: ["La perspectiva de la econofísica","Instituciones y mecanismos económicos","Datos económicos y financieros","Hechos estilizados y preguntas fundamentales"] },
    { id: "m2", number: "2", title: "Distribuciones, fluctuaciones y escalamiento", chapters: ["Modelos estocásticos de referencia","Colas pesadas, leyes de potencia y extremos","Escalamiento y universalidad","Dependencia temporal y memoria","Fractales, multifractales y cascadas","Información, entropía y complejidad"] },
    { id: "m3", number: "3", title: "Microestructura, agentes y fenómenos emergentes", chapters: ["Formación de precios y dinámica de mercados","Libro de órdenes y negociación de alta frecuencia","Impacto de mercado y ejecución","Modelos de agentes y mercados artificiales","Interacción social, imitación y comportamiento colectivo","Burbujas, crisis y transiciones de régimen"] },
    { id: "m4", number: "4", title: "Dependencia multiactivo, redes y riesgo sistémico", chapters: ["Dependencias multivariadas y factores","Teoría de matrices aleatorias en finanzas","Redes económicas y financieras","Contagio financiero y riesgo sistémico"] },
    { id: "m5", number: "5", title: "Distribución, empresas y macrocomplejidad", chapters: ["Riqueza, ingresos y desigualdad","Empresas, crecimiento y sistemas urbanos","Macroeconomía basada en agentes","Redes de producción y complejidad económica","Sociofísica y procesos socioeconómicos"] },
    { id: "m6", number: "6", title: "Aplicaciones cuantitativas y mercados digitales", chapters: ["Riesgo financiero y escenarios extremos","Carteras y asignación dinámica de activos","Derivados y cobertura más allá del modelo gaussiano","Estrategias cuantitativas y ejecución algorítmica","Mercados de criptoactivos y finanzas descentralizadas"] },
    { id: "m7", number: "7", title: "Modelización física avanzada e inferencia científica", chapters: ["Cinética y mecánica estadística económica","Dinámica no lineal y física fuera del equilibrio","Calibración, identificación y validación de modelos","Causalidad, intervención y cambios de régimen"] },
    { id: "m8", number: "8", title: "Fronteras de investigación y problemas abiertos", chapters: ["Aprendizaje automático y modelos físicos híbridos","Agentes de aprendizaje, IA generativa y mercados","Simuladores diferenciales y gemelos digitales","Redes de orden superior y riesgos interdependientes","Crisis extremas, anticipación y adaptación colectiva","Líneas exploratorias y agenda de investigación"] }
  ]
};

window.ENTROPIA_BOOK.pages = [
  { number: 0, html: '<div class="page-inner blank-page"></div>' },
  { number: 1, type: "toc", html: '<div class="page-inner toc-page"><div class="page-header"><span>ECONOFÍSICA / PROGRAMA INTEGRAL</span><span class="mono">ÍNDICE DEL TEMARIO</span></div><h2 class="toc-title">Temario integral</h2><div class="toc-list">' + renderModules([0,1,2,3]) + '</div><div class="page-footer"><span class="mono">pág. i</span></div></div>' },
  { number: 2, type: "toc", html: '<div class="page-inner toc-page"><div class="page-header"><span>ECONOFÍSICA / PROGRAMA INTEGRAL</span><span class="mono">ÍNDICE DEL TEMARIO</span></div><div class="toc-list">' + renderModules([4,5,6,7]) + '</div><div class="page-footer"><span class="mono">pág. ii</span></div></div>' }
];

function renderModules(indices) {
  return indices.map(function(index) {
    var module = window.ENTROPIA_BOOK.modules[index];
    return '<div class="toc-group"><div class="toc-group-header"><span class="toc-mod-badge">' + module.number + '</span><strong>' + module.title + '</strong></div>' +
      module.chapters.map(function(title, i) { return '<div class="toc-item" data-section="' + module.number + '.' + (i + 1) + '"><span class="toc-ch-num">' + module.number + '.' + (i + 1) + '</span><span class="toc-ch-name">' + title + '</span></div>'; }).join('') +
      '</div>';
  }).join('');
}
