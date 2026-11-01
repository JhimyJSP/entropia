(() => {
  const template = `
    <article class="lesson">
      <header class="lesson-opening">
        <p class="lesson-kicker">LABORATORIO INTERACTIVO · FASE 1</p>
        <h2>Estructura del sistema financiero: del intercambio humano a las redes de capital</h2>
        <p>En una pequeña comunidad, Ana cultiva alimentos, Bruno fabrica herramientas, Carla construye viviendas y Diego guarda parte de su dinero. Carla encuentra una casa que puede construir, pero hoy no tiene suficiente efectivo. Sigue el dinero, las promesas y los registros hasta descubrir qué problema resuelve cada pieza del sistema financiero.</p>
        <div class="lesson-question"><strong>Problema inicial</strong><span>¿Cómo puede Carla empezar una vivienda que cuesta S/ 400 si solo tiene S/ 50 disponibles?</span></div>
        <p class="lesson-note">Todos los importes de esta simulación son ilustrativos y están expresados en soles (S/). El modelo es educativo; los contratos y requisitos reales dependen de la jurisdicción y de cada institución.</p>
      </header>

      <nav class="lab-toc" aria-label="Secciones de la fase uno">
        <a href="#lab-community">01 · Economía</a>
        <a href="#lab-matching">02 · Búsqueda</a>
        <a href="#lab-banking">03 · Balances bancarios</a>
        <a href="#lab-map">04 · Mapa del sistema</a>
      </nav>

      <section class="lesson-section" id="lab-community" aria-labelledby="community-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">01</span><div><p class="lesson-kicker">ECONOMÍA DE CUATRO PERSONAS</p><h3 id="community-title">Primero intenta financiar la vivienda sin instituciones</h3></div></div>
        <div class="lab-grid community-grid">
          <div class="lab-control-panel">
            <p class="panel-caption">CAMBIA LOS RECURSOS Y EL TAMAÑO DEL PROYECTO</p>
            <label class="lab-slider" for="community-ana">Efectivo de Ana <output id="community-ana-out">S/ 100</output><input id="community-ana" type="range" min="0" max="1000" step="10" value="100"></label>
            <label class="lab-slider" for="community-bruno">Efectivo de Bruno <output id="community-bruno-out">S/ 200</output><input id="community-bruno" type="range" min="0" max="1000" step="10" value="200"></label>
            <label class="lab-slider" for="community-carla">Efectivo de Carla <output id="community-carla-out">S/ 50</output><input id="community-carla" type="range" min="0" max="1000" step="10" value="50"></label>
            <label class="lab-slider" for="community-diego">Efectivo de Diego <output id="community-diego-out">S/ 500</output><input id="community-diego" type="range" min="0" max="1500" step="10" value="500"></label>
            <label class="lab-slider" for="community-project">Costo de la vivienda <output id="community-project-out">S/ 400</output><input id="community-project" type="range" min="100" max="1000" step="10" value="400"></label>
            <label class="lab-slider" for="community-duration">Duración del préstamo <output id="community-duration-out">12 meses</output><input id="community-duration" type="range" min="1" max="36" step="1" value="12"></label>
            <label class="lab-slider" for="community-loan">Préstamo propuesto <output id="community-loan-out">S/ 350</output><input id="community-loan" type="range" min="0" max="500" step="10" value="350"></label>
            <button type="button" class="lab-button" id="community-reset">Reiniciar economía</button>
          </div>
          <div class="lab-observation">
            <div class="prediction-card">
              <p class="panel-caption">PREDICE ANTES DE TRANSFERIR</p>
              <p>¿Qué recibirá Carla junto con el dinero prestado?</p>
              <div class="prediction-options" role="group" aria-label="Predicción sobre el préstamo">
                <button type="button" data-prediction="gift" aria-pressed="false">Un regalo sin obligación</button>
                <button type="button" data-prediction="debt" aria-pressed="false">Dinero y una deuda del mismo importe</button>
                <button type="button" data-prediction="work" aria-pressed="false">Una herramienta fabricada por Bruno</button>
              </div>
              <button type="button" class="lab-button lab-button-secondary" id="check-prediction" disabled>Comprobar predicción</button>
              <p id="prediction-feedback" class="feedback-message" aria-live="polite">Elige una hipótesis; la simulación todavía no la revelará.</p>
            </div>
            <div class="resource-comparison" id="community-bars" aria-live="polite"></div>
            <div class="community-actions">
              <button type="button" class="lab-button" id="community-lend">Diego presta a Carla</button>
              <span id="community-action-status" aria-live="polite">Aún no se ha transferido dinero.</span>
            </div>
            <div class="balance-pair" id="community-balances" aria-live="polite"></div>
            <p class="accounting-rule"><strong>Patrimonio financiero neto = activos financieros − pasivos financieros.</strong> El préstamo cambia quién tiene efectivo y quién tiene un derecho de cobro/deuda. Por sí solo no crea riqueza financiera neta para el par.</p>
          </div>
        </div>
      </section>

      <section class="lesson-section" id="lab-matching" aria-labelledby="matching-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">02</span><div><p class="lesson-kicker">CUANDO LA COMUNIDAD CRECE</p><h3 id="matching-title">¿Cuánto cuesta encontrar a la persona adecuada?</h3></div></div>
        <p class="section-lead">Imagina ahora 30 ahorradores, 20 empresas y 50 hogares que cobran o pagan. Sin intermediarios, cada prestatario debe encontrar a alguien con efectivo disponible, plazo compatible y voluntad de aceptar el riesgo. En la vía bancaria, los ahorradores depositan, el banco evalúa solicitudes y concede préstamos desde su balance.</p>
        <div class="lab-grid">
          <div class="lab-control-panel">
            <p class="panel-caption">CONTROLES DEL EXPERIMENTO</p>
            <label class="lab-slider" for="matching-lenders">Ahorradores disponibles <output id="matching-lenders-out">30</output><input id="matching-lenders" type="range" min="2" max="30" step="1" value="30"></label>
            <label class="lab-slider" for="matching-borrowers">Personas que buscan fondos <output id="matching-borrowers-out">20</output><input id="matching-borrowers" type="range" min="2" max="30" step="1" value="20"></label>
            <label class="lab-slider" for="matching-contact-cost">Costo ilustrativo por contacto <output id="matching-contact-cost-out">S/ 2</output><input id="matching-contact-cost" type="range" min="0" max="20" step="1" value="2"></label>
            <label class="lab-slider" for="matching-liquidity">Ahorro que se reserva por preferencia de liquidez <output id="matching-liquidity-out">20 %</output><input id="matching-liquidity" type="range" min="0" max="80" step="10" value="20"></label>
            <label class="lab-slider" for="matching-default">Probabilidad de incumplimiento asumida <output id="matching-default-out">10 %</output><input id="matching-default" type="range" min="0" max="50" step="5" value="10"></label>
            <label class="lab-slider" for="matching-duration">Plazo buscado <output id="matching-duration-out">12 meses</output><input id="matching-duration" type="range" min="1" max="36" step="1" value="12"></label>
            <button type="button" class="lab-button" id="matching-run">Repetir búsqueda</button>
          </div>
          <div class="matching-result">
            <div class="matching-controls" role="group" aria-label="Comparar vías de financiación">
              <button type="button" data-match-mode="direct" aria-pressed="true">Préstamos directos</button>
              <button type="button" data-match-mode="bank" aria-pressed="false">Intermediación bancaria</button>
            </div>
            <div id="matching-network" class="matching-network" aria-label="Diagrama de contactos simulados"></div>
            <div id="matching-metrics" class="matching-metrics" aria-live="polite"></div>
            <p id="matching-explanation" class="matching-explanation"></p>
          </div>
        </div>
        <p class="lesson-note">La búsqueda usa una regla didáctica reproducible: cada solicitante intenta contactar ahorradores hasta encontrar uno disponible; una parte de los contactos se rechaza según el plazo o la tolerancia ilustrativa al incumplimiento. El resultado no es un dato histórico ni una estimación empírica.</p>
      </section>

      <section class="lesson-section" id="lab-banking" aria-labelledby="bank-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">03</span><div><p class="lesson-kicker">BALANCES Y CREACIÓN DE DEPÓSITOS</p><h3 id="bank-title">Concede un préstamo y observa qué cambia de verdad</h3></div></div>
        <p class="section-lead">Al conceder un préstamo, el banco registra simultáneamente un derecho de cobro (activo) y un depósito a favor del cliente (pasivo). La operación crea dinero bancario en forma de depósito; no crea reservas bancarias. Después, una transferencia a otro banco mueve depósitos y reservas entre bancos.</p>
        <div class="bank-opening">
          <div><span>Banco A · situación inicial</span><strong>Reservas S/ 1 000 · Préstamos S/ 400 · Depósitos S/ 900 · Patrimonio S/ 500</strong></div>
          <div><span>Banco B · situación inicial</span><strong>Reservas S/ 500 · Préstamos S/ 300 · Depósitos S/ 650 · Patrimonio S/ 150</strong></div>
        </div>
        <div class="bank-actions">
          <button type="button" class="lab-button" id="bank-grant">1 · Conceder préstamo de S/ 200</button>
          <button type="button" class="lab-button lab-button-secondary" id="bank-transfer" disabled>2 · Pagar S/ 150 a un cliente del Banco B</button>
          <button type="button" class="lab-button lab-button-secondary" id="bank-repay" disabled>3 · Devolver S/ 100 de principal</button>
          <button type="button" class="lab-button lab-button-quiet" id="bank-reset">Reiniciar balances</button>
        </div>
        <div class="bank-ledgers" id="bank-ledgers" aria-live="polite"></div>
        <div class="bank-equation" id="bank-equation" aria-live="polite">Selecciona la primera operación para ver los asientos contables.</div>
        <div class="reserve-check" id="reserve-check" aria-live="polite"></div>
        <div class="bank-history" id="bank-history"></div>
        <p class="lesson-note"><strong>Advertencia conceptual:</strong> los bancos comerciales modernos no son simples cajas que vuelven a prestar depósitos preexistentes. En la concesión del préstamo se registran crédito y depósito. La capacidad de prestar también depende de capital, liquidez, financiación, riesgo, regulación, demanda solvente y rentabilidad; no la explica universalmente un multiplicador mecánico de reservas.</p>

        <details class="constraint-panel">
          <summary>Abre el panel: ¿qué puede limitar un nuevo préstamo?</summary>
          <div class="lab-control-panel constraint-controls">
            <label class="lab-slider" for="credit-capital">Capital regulatorio disponible <output id="credit-capital-out">S/ 100</output><input id="credit-capital" type="range" min="0" max="500" step="10" value="100"></label>
            <label class="lab-slider" for="credit-risk-weight">Ponderación de riesgo ilustrativa <output id="credit-risk-weight-out">100 %</output><input id="credit-risk-weight" type="range" min="50" max="150" step="10" value="100"></label>
            <label class="lab-slider" for="credit-liquidity">Liquidez utilizable <output id="credit-liquidity-out">S/ 300</output><input id="credit-liquidity" type="range" min="0" max="1000" step="25" value="300"></label>
            <label class="lab-slider" for="credit-funding-cost">Costo anual de financiación <output id="credit-funding-cost-out">5 %</output><input id="credit-funding-cost" type="range" min="0" max="20" step="0.5" value="5"></label>
            <label class="lab-slider" for="credit-demand">Demanda solvente estimada <output id="credit-demand-out">S/ 400</output><input id="credit-demand" type="range" min="0" max="1000" step="25" value="400"></label>
            <label class="lab-slider" for="credit-default">Probabilidad ilustrativa de incumplimiento <output id="credit-default-out">5 %</output><input id="credit-default" type="range" min="0" max="40" step="1" value="5"></label>
          </div>
          <div class="credit-capacity" id="credit-capacity" aria-live="polite"></div>
          <p class="lesson-note">Regla transparente del modelo: capacidad limitada por el mínimo entre demanda solvente, liquidez disponible y capital disponible dividido por el requisito de capital asumido. La ponderación de riesgo ajusta la exposición; la tasa de incumplimiento estima pérdida esperada de forma simplificada. Son supuestos pedagógicos, no una regla prudencial universal.</p>
        </details>
      </section>

      <section class="lesson-section" id="lab-map" aria-labelledby="map-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">04</span><div><p class="lesson-kicker">MAPA INTERACTIVO DEL SISTEMA</p><h3 id="map-title">Selecciona una institución y sigue sus conexiones</h3></div></div>
        <p class="section-lead">Hogares, empresas, gobiernos y el resto del mundo participan en el sistema. Las instituciones, los mercados y las infraestructuras cumplen papeles distintos; la regulación y la supervisión los atraviesan sin convertirlos en una sola entidad.</p>
        <div class="map-layers" role="group" aria-label="Capas del mapa financiero">
          <label><input type="checkbox" data-map-layer="money" checked> Dinero y pagos</label>
          <label><input type="checkbox" data-map-layer="funding" checked> Ahorro y crédito</label>
          <label><input type="checkbox" data-map-layer="securities" checked> Títulos financieros</label>
          <label><input type="checkbox" data-map-layer="infrastructure" checked> Infraestructura</label>
          <label><input type="checkbox" data-map-layer="risk" checked> Exposiciones y riesgo</label>
          <label><input type="checkbox" data-map-layer="oversight" checked> Regulación</label>
        </div>
        <div class="system-map" id="system-map" aria-label="Mapa de participantes e instituciones financieras"></div>
        <div class="map-detail" id="map-detail" aria-live="polite"></div>
        <p class="lesson-note">El mapa representa funciones, no un organigrama legal de un país. Una misma entidad puede realizar más de una función; otras actividades requieren entidades distintas según la legislación aplicable.</p>
      </section>

      <section class="lesson-section recall-card" aria-labelledby="phase-check-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">✓</span><div><p class="lesson-kicker">PON A PRUEBA EL MODELO</p><h3 id="phase-check-title">Antes de seguir a la siguiente fase</h3></div></div>
        <details><summary>¿El préstamo hizo más rico al conjunto de Carla y Diego?</summary><p>No por el solo asiento inicial: Carla gana efectivo y adquiere una deuda igual; Diego pierde efectivo y adquiere un crédito igual. El patrimonio financiero neto conjunto no cambia si se valora el crédito a su nominal y no hay comisiones, impuestos ni riesgo de impago.</p></details>
        <details><summary>¿El préstamo nuevo de un banco aumenta sus reservas?</summary><p>No en el momento de concederlo. Aumentan simultáneamente el activo «préstamo» y el pasivo «depósito». Las reservas cambian cuando se liquidan pagos entre bancos, con el banco central o con el exterior.</p></details>
        <details><summary>¿Qué debe cuadrar en cada balance?</summary><p>Activos = pasivos + patrimonio. Cada operación tiene contrapartidas: comprueba las dos caras antes de explicar el movimiento del dinero.</p></details>
      </section>
    </article>
  `;

  const mapNodes = [
    { id: "households", label: "Hogares", type: "participantes", x: 8, y: 30, layers: ["money", "funding"], assets: "Efectivo, depósitos, títulos y bienes.", income: "Salarios, ventas, intereses o transferencias.", risk: "Ingreso, liquidez, inflación y pérdida de valor de activos.", removed: "Desaparecerían ahorro, pagos de consumo y una fuente importante de depósitos." },
    { id: "firms", label: "Empresas", type: "participantes", x: 8, y: 70, layers: ["money", "funding", "securities"], assets: "Efectivo, inventarios, maquinaria y derechos de cobro.", income: "Ventas de bienes y servicios.", risk: "Demanda, costes, tasas, crédito y moneda.", removed: "Los proyectos y la inversión productiva no podrían financiarse mediante esta ruta." },
    { id: "banks", label: "Bancos", type: "intermediarios", x: 32, y: 49, layers: ["money", "funding", "infrastructure"], assets: "Reservas, préstamos y títulos.", income: "Margen financiero y comisiones, sujeto a gastos y pérdidas.", risk: "Crédito, liquidez, tasas, operación y concentración.", removed: "Se pierde la vía de depósitos, préstamos y pagos que presta el banco; siguen existiendo otras rutas financieras." },
    { id: "markets", label: "Mercados y bolsas", type: "mercados", x: 55, y: 25, layers: ["funding", "securities"], assets: "No son necesariamente una contraparte: organizan órdenes según sus reglas.", income: "Tarifas de negociación, listado o servicios.", risk: "Operación, tecnología, conducta e integridad del mercado.", removed: "La financiación por emisión y la negociación organizada se dificultarían, pero el crédito bancario o acuerdos privados aún podrían existir." },
    { id: "funds", label: "Fondos e inversores", type: "inversores", x: 55, y: 72, layers: ["funding", "securities"], assets: "Participaciones, bonos, acciones y efectivo.", income: "Rendimientos de cartera menos costes.", risk: "Mercado, liquidez, crédito y mandato de inversión.", removed: "Disminuiría la capacidad de reunir ahorro de muchos partícipes para invertirlo." },
    { id: "infrastructure", label: "Compensación y depósito", type: "infraestructura", x: 77, y: 28, layers: ["money", "securities", "infrastructure"], assets: "Registros y recursos de garantía conforme al mandato; no son todos iguales.", income: "Tarifas por compensación, custodia, registro o liquidación.", risk: "Operación, liquidación, contraparte y ciberseguridad.", removed: "La confirmación, compensación y actualización de propiedad perderían una parte de su infraestructura especializada." },
    { id: "central-bank", label: "Banco central", type: "sector público", x: 77, y: 70, layers: ["money", "infrastructure", "oversight"], assets: "Activos de política monetaria y créditos conforme al marco institucional.", income: "Ingresos por activos y operaciones; su objetivo no equivale al de un banco comercial.", risk: "Operación de política, balance y estabilidad monetaria.", removed: "Cambiarían la provisión de liquidación final bancaria y las funciones de política monetaria asignadas al banco central." },
    { id: "government", label: "Gobierno y supervisores", type: "sector público", x: 94, y: 48, layers: ["funding", "securities", "oversight"], assets: "Activos públicos y derechos fiscales; los supervisores ejercen mandatos públicos.", income: "Impuestos y otras rentas públicas; supervisión no es una cartera comercial.", risk: "Riesgo fiscal, legal, institucional y de estabilidad.", removed: "Faltarían emisores públicos y las reglas y tareas de supervisión correspondientes." },
    { id: "world", label: "Resto del mundo", type: "participantes externos", x: 31, y: 10, layers: ["money", "funding", "securities"], assets: "Depósitos, créditos, bonos, acciones y moneda extranjera.", income: "Ventas, intereses, dividendos y rendimientos de cartera.", risk: "Cambio, jurisdicción, crédito y movilidad de capital.", removed: "Desaparecerían de este modelo los flujos transfronterizos de bienes, pagos e inversión." }
  ];

  const mapEdges = [
    ["households", "banks", "money", "Depósitos y pagos"],
    ["banks", "firms", "funding", "Préstamos"],
    ["households", "firms", "money", "Compras y salarios"],
    ["firms", "markets", "securities", "Emisión de títulos"],
    ["funds", "markets", "securities", "Órdenes de inversión"],
    ["markets", "infrastructure", "infrastructure", "Operaciones compensadas"],
    ["infrastructure", "banks", "money", "Liquidación bancaria"],
    ["central-bank", "banks", "money", "Reservas y liquidación"],
    ["government", "markets", "securities", "Deuda pública"],
    ["world", "banks", "money", "Pagos internacionales"],
    ["world", "markets", "securities", "Inversión transfronteriza"],
    ["government", "banks", "oversight", "Reglas y supervisión"],
    ["banks", "firms", "risk", "Exposición a crédito empresarial"],
    ["banks", "funds", "risk", "Exposición entre instituciones"],
    ["world", "banks", "risk", "Exposición transfronteriza"]
  ];

  function init(root) {
    initCommunity(root);
    initMatching(root);
    initBanking(root);
    initMap(root);
  }

  function format(amount) {
    return new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(amount);
  }

  function initCommunity(root) {
    const ids = ["ana", "bruno", "carla", "diego", "project", "duration", "loan"];
    const inputs = Object.fromEntries(ids.map(id => [id, root.querySelector(`#community-${id}`)]));
    const names = { ana: "Ana", bruno: "Bruno", carla: "Carla", diego: "Diego" };
    const initial = { ana: 100, bruno: 200, carla: 50, diego: 500 };
    let loanExecuted = false;
    let prediction = "";
    const current = () => Object.fromEntries(Object.keys(names).map(key => [key, Number(inputs[key].value)]));
    const update = () => {
      const cash = current();
      const project = Number(inputs.project.value);
      const loan = Number(inputs.loan.value);
      const carlaGap = Math.max(0, project - cash.carla);
      const usedLoan = loanExecuted ? Math.min(loan, cash.diego, carlaGap) : 0;
      const raisedCarla = cash.carla + usedLoan;
      const remainingDiego = cash.diego - usedLoan;
      const shareWidth = Math.min(100, cash.carla / Math.max(project, 1) * 100);
      const gapWidth = Math.min(100, carlaGap / Math.max(project, 1) * 100);

      ids.forEach(id => {
        const output = root.querySelector(`#community-${id}-out`);
        output.textContent = id === "duration" ? `${inputs[id].value} meses` : `S/ ${format(Number(inputs[id].value))}`;
      });
      root.querySelector("#community-bars").innerHTML = `
        <div class="resource-bar-card">
          <div class="resource-bar-heading"><strong>Carla · vivienda</strong><span>Disponible S/ ${format(raisedCarla)} / S/ ${format(project)}</span></div>
          <div class="resource-track"><i class="resource-fill" style="width:${Math.min(100, raisedCarla / Math.max(project, 1) * 100)}%"></i></div>
          <div class="resource-bar-heading"><span>Sin préstamo, falta S/ ${format(carlaGap)}</span><span>${inputs.duration.value} meses</span></div>
          <div class="resource-track resource-track-muted"><i class="resource-fill resource-fill-gap" style="width:${gapWidth}%"></i></div>
        </div>
        <div class="people-cash-grid">${Object.entries(names).map(([key, name]) =>
          `<div class="people-cash"><span>${name}</span><strong>S/ ${format(key === "carla" ? raisedCarla : key === "diego" ? remainingDiego : cash[key])}</strong><small>${key === "carla" && loanExecuted ? "efectivo; debe S/ " + format(usedLoan) : key === "diego" && loanExecuted ? "efectivo; crédito por cobrar S/ " + format(usedLoan) : "efectivo disponible"}</small></div>`
        ).join("")}</div>`;

      const diegoAssets = loanExecuted ? remainingDiego + usedLoan : cash.diego;
      const carlaAssets = loanExecuted ? raisedCarla : cash.carla;
      const carlaDebt = loanExecuted ? usedLoan : 0;
      const diegoNetWorth = diegoAssets;
      const carlaNetWorth = carlaAssets - carlaDebt;
      root.querySelector("#community-balances").innerHTML = `
        <article class="mini-balance"><h4>Carla · S/</h4><div><span>Efectivo</span><b>${format(carlaAssets)}</b></div><div><span>Deuda con Diego</span><b>${format(carlaDebt)}</b></div><div class="balance-total"><span>Patrimonio financiero neto</span><b>${format(carlaNetWorth)}</b></div></article>
        <article class="mini-balance"><h4>Diego · S/</h4><div><span>Efectivo</span><b>${format(remainingDiego)}</b></div><div><span>Préstamo por cobrar</span><b>${format(loanExecuted ? usedLoan : 0)}</b></div><div class="balance-total"><span>Patrimonio financiero neto</span><b>${format(diegoNetWorth)}</b></div></article>`;
      root.querySelector("#community-lend").disabled = loanExecuted || loan <= 0 || cash.diego <= 0 || loan > carlaGap;
      if (loanExecuted) {
        root.querySelector("#community-action-status").textContent = `Transferencia completada: Diego entregó S/ ${format(usedLoan)} y Carla recibió el mismo importe.`;
      }
    };

    ids.forEach(id => inputs[id].addEventListener("input", () => {
      if (loanExecuted) loanExecuted = false;
      root.querySelector("#community-action-status").textContent = "Cambiaste los supuestos; repite la transferencia para ver los balances nuevos.";
      update();
    }));
    root.querySelector("#community-lend").addEventListener("click", () => {
      const cash = current();
      const needed = Math.max(0, Number(inputs.project.value) - cash.carla);
      const amount = Math.min(Number(inputs.loan.value), cash.diego, needed);
      if (amount <= 0) {
        root.querySelector("#community-action-status").textContent = "No se puede transferir: el préstamo debe ser positivo y Diego debe tener efectivo.";
        return;
      }
      loanExecuted = true;
      root.querySelector("#community-action-status").textContent = `Asiento emparejado: Carla +S/ ${format(amount)} de efectivo y +S/ ${format(amount)} de deuda; Diego −S/ ${format(amount)} de efectivo y +S/ ${format(amount)} por cobrar.`;
      update();
    });
    root.querySelectorAll("[data-prediction]").forEach(button => button.addEventListener("click", () => {
      prediction = button.dataset.prediction;
      root.querySelectorAll("[data-prediction]").forEach(option => option.setAttribute("aria-pressed", String(option === button)));
      root.querySelector("#check-prediction").disabled = false;
    }));
    root.querySelector("#check-prediction").addEventListener("click", () => {
      const feedback = prediction === "debt"
        ? "Correcto. Carla gana efectivo disponible y registra una obligación de devolver el principal según el contrato. Diego cambia parte de su efectivo por un derecho de cobro. La liquidez cambia; el patrimonio financiero neto conjunto no aumenta por el préstamo mismo."
        : "Mira las dos caras del contrato: si Carla recibe efectivo que debe devolver, registra al mismo tiempo una deuda; Diego entrega efectivo y recibe un derecho de cobro. Un préstamo no es un regalo.";
      root.querySelector("#prediction-feedback").textContent = feedback;
      root.querySelector("#prediction-feedback").classList.add("is-revealed");
    });
    root.querySelector("#community-reset").addEventListener("click", () => {
      Object.entries(initial).forEach(([key, value]) => { inputs[key].value = String(value); });
      inputs.project.value = "400";
      inputs.duration.value = "12";
      inputs.loan.value = "350";
      loanExecuted = false;
      prediction = "";
      root.querySelector("#community-action-status").textContent = "Aún no se ha transferido dinero.";
      root.querySelector("#prediction-feedback").textContent = "Elige una hipótesis; la simulación todavía no la revelará.";
      root.querySelector("#prediction-feedback").classList.remove("is-revealed");
      root.querySelectorAll("[data-prediction]").forEach(option => option.setAttribute("aria-pressed", "false"));
      root.querySelector("#check-prediction").disabled = true;
      update();
    });
    root.querySelector("#community-action-status").textContent = "Compara primero los recursos disponibles y los necesarios.";
    update();
  }

  function initMatching(root) {
    const controls = ["lenders", "borrowers", "contact-cost", "liquidity", "default", "duration"];
    const inputs = Object.fromEntries(controls.map(id => [id, root.querySelector(`#matching-${id}`)]));
    let mode = "direct";
    let seed = 41;

    const run = () => {
      const lenders = Number(inputs.lenders.value);
      const borrowers = Number(inputs.borrowers.value);
      const cost = Number(inputs["contact-cost"].value);
      const liquidityPreference = Number(inputs.liquidity.value);
      const defaultRisk = Number(inputs.default.value);
      const duration = Number(inputs.duration.value);
      root.querySelector("#matching-lenders-out").textContent = String(lenders);
      root.querySelector("#matching-borrowers-out").textContent = String(borrowers);
      root.querySelector("#matching-contact-cost-out").textContent = `S/ ${cost}`;
      root.querySelector("#matching-liquidity-out").textContent = `${liquidityPreference} %`;
      root.querySelector("#matching-default-out").textContent = `${defaultRisk} %`;
      root.querySelector("#matching-duration-out").textContent = `${duration} meses`;
      if (mode === "direct") {
        const availableLenders = Math.floor((lenders * (100 - liquidityPreference)) / 100);
        let state = seed >>> 0;
        const random = () => {
          state = (1664525 * state + 1013904223) >>> 0;
          return state / 4294967296;
        };
        const edges = [];
        const usedLenders = new Set();
        let contacts = 0;
        let matched = 0;
        let riskRejected = 0;
        const toleratedRisk = 0.1 + ((duration - 1) / 35) * 0.25;
        for (let borrower = 0; borrower < borrowers && availableLenders > 0; borrower += 1) {
          let found = false;
          const startingLender = Math.floor(random() * availableLenders);
          for (let offset = 0; offset < availableLenders; offset += 1) {
            const lender = (startingLender + offset) % availableLenders;
            if (usedLenders.has(lender)) continue;
            contacts += 1;
            const riskAccepted = defaultRisk / 100 <= toleratedRisk;
            if (!riskAccepted) riskRejected += 1;
            const acceptance = riskAccepted && random() >= 0.25;
            if (acceptance) {
              edges.push({ borrower, lender, accepted: true });
              usedLenders.add(lender);
              matched += 1;
              found = true;
              break;
            }
            edges.push({ borrower, lender, accepted: false });
          }
          if (!found) edges.push({ borrower, lender: -1, accepted: false });
        }
        const nodes = [];
        for (let i = 0; i < lenders; i += 1) nodes.push(`<span class="network-node saver-node ${i >= availableLenders ? "liquidity-locked" : ""}" style="left:8%;top:${8 + i * 84 / Math.max(lenders - 1, 1)}%" title="Ahorrador ${i + 1}${i >= availableLenders ? ": reserva su liquidez" : ""}">${i + 1}</span>`);
        for (let i = 0; i < borrowers; i += 1) nodes.push(`<span class="network-node borrower-node" style="right:8%;top:${8 + i * 84 / Math.max(borrowers - 1, 1)}%" title="Solicitante ${i + 1}">${i + 1}</span>`);
        const lines = edges.filter(edge => edge.lender >= 0).map(edge => {
          const y1 = 8 + edge.lender * 84 / Math.max(lenders - 1, 1);
          const y2 = 8 + edge.borrower * 84 / Math.max(borrowers - 1, 1);
          const color = edge.accepted ? "#22d3ee" : "#f59e0b";
          return `<line x1="13%" y1="${y1}%" x2="87%" y2="${y2}%" stroke="${color}" stroke-width="${edge.accepted ? 2 : 1}" opacity="${edge.accepted ? 0.68 : 0.2}"/>`;
        }).join("");
        root.querySelector("#matching-network").innerHTML = `<span class="network-side-label saver-label">AHORRADORES</span><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${lines}</svg><span class="network-side-label borrower-label">SOLICITANTES</span>${nodes.join("")}<span class="network-legend"><i></i> contacto aceptado <i class="rejected-legend"></i> contacto rechazado</span>`;
        root.querySelector("#matching-metrics").innerHTML = `
          <div><span>Contactos realizados</span><strong>${contacts}</strong></div>
          <div><span>Ahorradores que prestan (modelo)</span><strong>${availableLenders} / ${lenders}</strong></div>
          <div><span>Préstamos logrados</span><strong>${matched} / ${borrowers}</strong></div>
          <div><span>Costo de búsqueda modelado</span><strong>S/ ${format(contacts * cost)}</strong></div>
          <div><span>Contactos rechazados por riesgo</span><strong>${riskRejected}</strong></div>`;
        root.querySelector("#matching-explanation").textContent = `Con búsqueda directa, cada contacto consume tiempo y costo. De ${lenders} ahorradores potenciales, ${availableLenders} prestan y ${lenders - availableLenders} reservan liquidez. El modelo registró ${contacts} contactos y encontró ${matched} pares compatibles. Plazo: ${duration} meses; el filtro admite más riesgo para plazos más largos. Todos los porcentajes son supuestos pedagógicos, no predicciones.`;
      } else {
        const approved = Math.round(borrowers * (1 - defaultRisk / 100));
        const contacts = lenders + borrowers;
        root.querySelector("#matching-network").innerHTML = `<div class="bank-network-flow"><div class="network-group saver-group">${Array.from({ length: Math.min(lenders, 8) }, (_, index) => `<span class="network-person">A${index + 1}</span>`).join("")}<strong>${lenders} ahorradores</strong><small>depositan fondos</small></div><span class="network-flow-arrow">→</span><div class="network-bank">BANCO<strong>evalúa riesgo</strong><small>procesa pagos</small></div><span class="network-flow-arrow">→</span><div class="network-group borrower-group">${Array.from({ length: Math.min(borrowers, 8) }, (_, index) => `<span class="network-person">S${index + 1}</span>`).join("")}<strong>${borrowers} solicitantes</strong><small>piden crédito</small></div></div>`;
        root.querySelector("#matching-metrics").innerHTML = `
          <div><span>Conexiones operativas</span><strong>${contacts}</strong></div>
          <div><span>Solicitudes elegibles tras filtro de riesgo</span><strong>${approved} / ${borrowers}</strong></div>
          <div><span>Costo de contacto centralizado</span><strong>S/ ${format(contacts * cost)}</strong></div>
          <div><span>Plazo del crédito</span><strong>${duration} meses</strong></div>`;
        root.querySelector("#matching-explanation").textContent = "La institución evalúa varias solicitudes y administra contratos y pagos. No elimina el riesgo: transforma quién lo asume. En una economía real los bancos no se limitan a redistribuir un depósito específico; un préstamo bancario suele crear simultáneamente un préstamo en el activo y un depósito en el pasivo.";
      }
    };

    controls.forEach(id => inputs[id].addEventListener("input", run));
    root.querySelectorAll("[data-match-mode]").forEach(button => button.addEventListener("click", () => {
      mode = button.dataset.matchMode;
      root.querySelectorAll("[data-match-mode]").forEach(option => option.setAttribute("aria-pressed", String(option === button)));
      run();
    }));
    root.querySelector("#matching-run").addEventListener("click", () => { seed += 1; run(); });
    run();
  }

  function initBanking(root) {
    const initial = {
      A: { reserves: 1000, loans: 400, deposits: 900, equity: 500 },
      B: { reserves: 500, loans: 300, deposits: 650, equity: 150 }
    };
    let state;
    let loanCreated;
    let transferDone;
    let repaymentDone;
    let history;

    const reset = () => {
      state = JSON.parse(JSON.stringify(initial));
      loanCreated = false;
      transferDone = false;
      repaymentDone = false;
      history = [];
      root.querySelector("#bank-equation").textContent = "Selecciona la primera operación para ver los asientos contables.";
      update();
    };

    const ledgerTable = (bank, values) => {
      const assets = values.reserves + values.loans;
      const liabilities = values.deposits + values.equity;
      const difference = assets - liabilities;
      return `<article class="bank-ledger ${Math.abs(difference) < 0.001 ? "balanced" : "unbalanced"}">
        <h4>Balance del Banco ${bank} <span>${Math.abs(difference) < 0.001 ? "CUADRA" : "REVISAR"}</span></h4>
        <div class="ledger-columns"><strong>ACTIVOS · S/</strong><strong>PASIVOS Y PATRIMONIO · S/</strong></div>
        <div class="ledger-line"><span>Reservas</span><b>${format(values.reserves)}</b><span>Depósitos</span><b>${format(values.deposits)}</b></div>
        <div class="ledger-line"><span>Préstamos por cobrar</span><b>${format(values.loans)}</b><span>Patrimonio</span><b>${format(values.equity)}</b></div>
        <div class="ledger-total"><span>Total activos</span><b>${format(assets)}</b><span>Total pasivos + patrimonio</span><b>${format(liabilities)}</b></div>
        <p class="balance-identity">Activos − Pasivos − Patrimonio = S/ ${format(difference)}</p>
      </article>`;
    };

    const update = () => {
      root.querySelector("#bank-ledgers").innerHTML = ledgerTable("A", state.A) + ledgerTable("B", state.B);
      root.querySelector("#bank-transfer").disabled = !loanCreated || transferDone;
      root.querySelector("#bank-repay").disabled = !loanCreated || repaymentDone;
      const reserveTotal = state.A.reserves + state.B.reserves;
      root.querySelector("#reserve-check").innerHTML = `Reservas del sistema: Banco A S/ ${format(state.A.reserves)} + Banco B S/ ${format(state.B.reserves)} = <strong>S/ ${format(reserveTotal)}</strong>. La concesión inicial no las altera; el pago interbancario solo las mueve entre bancos.`;
      root.querySelector("#bank-history").innerHTML = history.length
        ? `<p class="panel-caption">REGISTRO DE ASIENTOS</p>${history.map((entry, index) => `<div class="journal-entry"><span>${index + 1}</span><p>${entry}</p></div>`).join("")}`
        : '<p class="bank-idle">Aún no hay operaciones. Empieza por conceder un préstamo de S/ 200.</p>';
    };

    root.querySelector("#bank-grant").addEventListener("click", () => {
      if (loanCreated) return;
      state.A.loans += 200;
      state.A.deposits += 200;
      loanCreated = true;
      root.querySelector("#bank-equation").innerHTML = "<strong>Préstamo +S/ 200 (activo) = depósito +S/ 200 (pasivo).</strong> Reservas: sin cambio. Activos: S/ 1 600. Pasivos y patrimonio: S/ 1 600.";
      history.push("Banco A: débito «Préstamos por cobrar» S/ 200; crédito «Depósitos del prestatario» S/ 200. Las dos partidas conservan el balance.");
      update();
    });

    root.querySelector("#bank-transfer").addEventListener("click", () => {
      if (!loanCreated || transferDone) return;
      state.A.reserves -= 150;
      state.A.deposits -= 150;
      state.B.reserves += 150;
      state.B.deposits += 150;
      transferDone = true;
      root.querySelector("#bank-equation").innerHTML = "<strong>Pago al Banco B:</strong> depósitos de Banco A −S/ 150; reservas de Banco A −S/ 150. Banco B recibe +S/ 150 de reservas y reconoce +S/ 150 de depósito al beneficiario.";
      history.push("Transferencia interbancaria S/ 150: Banco A reduce reservas y depósitos; Banco B aumenta reservas y depósitos. Reservas totales: sin cambio.");
      update();
    });

    root.querySelector("#bank-repay").addEventListener("click", () => {
      if (!loanCreated || repaymentDone) return;
      state.A.loans -= 100;
      state.A.deposits -= 100;
      repaymentDone = true;
      root.querySelector("#bank-equation").innerHTML = "<strong>Amortización de principal:</strong> préstamo −S/ 100 y depósito del cliente en Banco A −S/ 100. No se toca la cuenta de reservas. Los intereses se reconocerían aparte como ingreso del banco y gasto del cliente.";
      history.push("Devolución de principal S/ 100 desde un depósito en Banco A: débito «Depósitos» S/ 100; crédito «Préstamos por cobrar» S/ 100. Se reduce el dinero bancario.");
      update();
    });

    root.querySelector("#bank-reset").addEventListener("click", reset);

    const creditInputs = ["capital", "risk-weight", "liquidity", "funding-cost", "demand", "default"];
    const updateCapacity = () => {
      const capital = Number(root.querySelector("#credit-capital").value);
      const riskWeight = Number(root.querySelector("#credit-risk-weight").value) / 100;
      const liquidity = Number(root.querySelector("#credit-liquidity").value);
      const fundingCost = Number(root.querySelector("#credit-funding-cost").value);
      const demand = Number(root.querySelector("#credit-demand").value);
      const defaultRate = Number(root.querySelector("#credit-default").value) / 100;
      const capitalRequirement = 0.1;
      const capitalLimit = riskWeight > 0 ? capital / (capitalRequirement * riskWeight) : 0;
      const approved = Math.min(capitalLimit, liquidity, demand);
      const expectedLoss = approved * defaultRate;
      creditInputs.forEach(id => {
        const value = root.querySelector(`#credit-${id}`).value;
        root.querySelector(`#credit-${id}-out`).textContent =
          id === "risk-weight" || id === "default" ? `${value} %` :
            id === "funding-cost" ? `${value} % anual` : `S/ ${format(Number(value))}`;
      });
      root.querySelector("#credit-capacity").innerHTML = `
        <div><span>Límite por capital (supuesto 10 %)</span><strong>S/ ${format(capitalLimit)}</strong><small>${format(capital)} ÷ (10 % × ${Math.round(riskWeight * 100)} %)</small></div>
        <div><span>Límite por liquidez</span><strong>S/ ${format(liquidity)}</strong><small>fondos utilizables elegidos</small></div>
        <div><span>Demanda solvente estimada</span><strong>S/ ${format(demand)}</strong><small>demanda declarada en este ejemplo</small></div>
        <div class="capacity-approved"><span>Crédito máximo del modelo</span><strong>S/ ${format(approved)}</strong><small>mínimo de los tres límites</small></div>
        <div><span>Pérdida esperada simplificada</span><strong>S/ ${format(expectedLoss)}</strong><small>crédito × probabilidad de incumplimiento</small></div>
        <div><span>Costo de financiación</span><strong>${fundingCost.toFixed(1)} % anual</strong><small>afecta rentabilidad y precio del crédito</small></div>`;
    };
    creditInputs.forEach(id => root.querySelector(`#credit-${id}`).addEventListener("input", updateCapacity));
    reset();
    updateCapacity();
  }

  function initMap(root) {
    const map = root.querySelector("#system-map");
    const detail = root.querySelector("#map-detail");
    const positions = Object.fromEntries(mapNodes.map(node => [node.id, node]));

    const edgeMarkup = mapEdges.map(([from, to, layer, label]) => {
      const a = positions[from];
      const b = positions[to];
      const x1 = a.x + (b.x > a.x ? 7 : -7);
      const x2 = b.x + (a.x > b.x ? 7 : -7);
      return `<g class="map-edge" data-layer="${layer}" data-from="${from}" data-to="${to}"><line x1="${x1}%" y1="${a.y}%" x2="${x2}%" y2="${b.y}%"/><title>${label}</title></g>`;
    }).join("");
    const nodeMarkup = mapNodes.map(node =>
      `<button type="button" class="map-node" data-node="${node.id}" style="left:${node.x}%;top:${node.y}%" aria-pressed="false"><span>${node.label}</span><small>${node.type}</small></button>`
    ).join("");
    map.innerHTML = `<svg class="map-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${edgeMarkup}</svg>${nodeMarkup}`;

    const selectNode = node => {
      map.querySelectorAll(".map-node").forEach(button => {
        const selected = button.dataset.node === node.id;
        button.setAttribute("aria-pressed", String(selected));
        const related = button.dataset.node === node.id || map.querySelector(`.map-edge[data-from="${node.id}"][data-to="${button.dataset.node}"]`) || map.querySelector(`.map-edge[data-to="${node.id}"][data-from="${button.dataset.node}"]`);
        button.classList.toggle("is-related", Boolean(related));
      });
      map.querySelectorAll(".map-edge").forEach(edge => {
        edge.classList.toggle("is-connected", edge.dataset.from === node.id || edge.dataset.to === node.id);
      });
      detail.innerHTML = `<div class="map-detail-heading"><span>${node.type}</span><h4>${node.label}</h4></div><dl><div><dt>Activos o función</dt><dd>${node.assets}</dd></div><div><dt>Ingresos o flujo</dt><dd>${node.income}</dd></div><div><dt>Riesgos principales</dt><dd>${node.risk}</dd></div><div><dt>Si se retira de esta red</dt><dd>${node.removed}</dd></div></dl>`;
    };

    map.querySelectorAll(".map-node").forEach(button => button.addEventListener("click", () => {
      const node = positions[button.dataset.node];
      selectNode(node);
    }));
    root.querySelectorAll("[data-map-layer]").forEach(input => input.addEventListener("change", () => {
      map.querySelectorAll(`.map-edge[data-layer="${input.dataset.mapLayer}"]`).forEach(edge => {
        edge.classList.toggle("layer-hidden", !input.checked);
      });
    }));
    selectNode(positions.banks);
  }

  window.financialSystemLesson = { template, init };
})();
