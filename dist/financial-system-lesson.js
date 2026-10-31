(() => {
  const template = `
    <article class="lesson">
      <header class="lesson-opening">
        <p class="lesson-kicker">LABORATORIO MENTAL · FINANCIAR UNA PLANTA</p>
        <h2>¿Cómo llega el ahorro de una familia hasta una máquina en una fábrica?</h2>
        <p>Una empresa quiere instalar una máquina que cuesta <strong>100&nbsp;000 unidades monetarias</strong>. Tiene una nave y trabajadores, pero no suficiente efectivo. Sigue el dinero y los documentos que cambian de manos: si un eslabón falla, la máquina no llega a producir.</p>
        <div class="lesson-question"><span>Tu misión</span>Descubrir quién aporta el dinero, quién lo canaliza, qué recibe a cambio y qué hace posible que el intercambio se cumpla.</div>
      </header>

      <section class="lesson-section" aria-labelledby="control-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">01</span><div><p class="lesson-kicker">PANEL DE CONTROL</p><h3 id="control-title">Cambia las condiciones del caso</h3></div></div>
        <div class="finance-controls">
          <label class="finance-control" for="finance-target">
            <span>Capital que necesita la empresa</span>
            <output id="finance-target-output" for="finance-target">100 000</output>
            <input id="finance-target" type="range" min="50000" max="200000" step="10000" value="100000">
          </label>
          <label class="finance-control" for="finance-price">
            <span>Precio de emisión por acción</span>
            <output id="finance-price-output" for="finance-price">10</output>
            <input id="finance-price" type="range" min="5" max="50" step="1" value="10">
          </label>
          <label class="finance-control" for="finance-demand">
            <span>Demanda de los inversores</span>
            <output id="finance-demand-output" for="finance-demand">100 %</output>
            <input id="finance-demand" type="range" min="0" max="150" step="10" value="100">
          </label>
        </div>
        <div class="finance-calculation" aria-live="polite">
          <div class="calculation-item"><span>Acciones necesarias</span><strong id="finance-shares">10 000</strong><small>capital necesario ÷ precio por acción</small></div>
          <div class="calculation-operator" aria-hidden="true">→</div>
          <div class="calculation-item"><span>Dinero recibido</span><strong id="finance-raised">100 000</strong><small>acciones vendidas × precio por acción</small></div>
          <div class="calculation-operator" aria-hidden="true">→</div>
          <div class="calculation-item calculation-gap"><span>Falta por financiar</span><strong id="finance-gap">0</strong><small>necesidad − dinero recibido</small></div>
        </div>
        <p class="calculation-note" id="finance-calculation-note">100 000 ÷ 10 = 10 000 acciones. Si se venden todas: 10 000 × 10 = 100 000.</p>
        <div class="algebra-board">
          <p class="lesson-kicker">RECONSTRUYE LA CUENTA, SIN SALTOS</p>
          <div id="algebra-steps" aria-live="polite"></div>
          <p class="unit-check"><strong>Chequeo físico de unidades:</strong> dinero ÷ (dinero por acción) = acciones. Si el resultado no tiene unidades de acciones, la cuenta está mal planteada.</p>
        </div>
        <p class="lesson-hint">Prueba 50 % de demanda: la mitad de las acciones encuentra comprador. Después prueba 150 %: hay más órdenes que acciones ofrecidas, pero la empresa no recibe más que el importe de su emisión.</p>
      </section>

      <section class="lesson-section" aria-labelledby="route-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">02</span><div><p class="lesson-kicker">PANTALLA DE SIMULACIÓN</p><h3 id="route-title">Sigue el recorrido del dinero y los títulos</h3></div></div>
        <div class="route-controls" role="group" aria-label="Etapas del recorrido financiero">
          <button type="button" class="route-step is-selected" data-route-step="0"><span>1</span>Necesidad</button>
          <button type="button" class="route-step" data-route-step="1"><span>2</span>Intermediación</button>
          <button type="button" class="route-step" data-route-step="2"><span>3</span>Emisión</button>
          <button type="button" class="route-step" data-route-step="3"><span>4</span>Inversión</button>
          <button type="button" class="route-step" data-route-step="4"><span>5</span>Reventa</button>
          <button type="button" class="route-step" data-route-step="5"><span>6</span>Liquidación</button>
        </div>
        <div class="flow-board" id="flow-board" aria-live="polite">
          <div class="flow-actor"><span class="actor-icon">🏭</span><strong>Empresa</strong><small>necesita capital</small></div>
          <span class="flow-arrow" aria-hidden="true">←</span>
          <div class="flow-actor"><span class="actor-icon">◇</span><strong>Inversores</strong><small>aportan ahorro</small></div>
          <span class="flow-arrow" aria-hidden="true">←</span>
          <div class="flow-actor"><span class="actor-icon">🏦</span><strong>Instituciones</strong><small>conectan y verifican</small></div>
        </div>
        <div class="route-explanation" id="route-explanation" aria-live="polite"></div>
        <div class="route-navigation">
          <button type="button" class="lesson-button lesson-button-secondary" id="route-previous">← Anterior</button>
          <span id="route-counter">ETAPA 1 DE 6</span>
          <button type="button" class="lesson-button" id="route-next">Siguiente →</button>
        </div>
      </section>

      <section class="lesson-section" aria-labelledby="structure-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">03</span><div><p class="lesson-kicker">MAPA DE PIEZAS</p><h3 id="structure-title">¿Quién hace qué?</h3></div></div>
        <p class="section-lead">Una transferencia de dinero puede parecer sencilla. Para hacerla entre desconocidos hacen falta varias funciones distintas. En un mercado concreto algunas las cumple la misma entidad y otras están separadas.</p>
        <div class="role-grid">
          <article class="role-card"><span class="role-number">A</span><h4>Hogares y ahorradores</h4><p>Deciden cuándo consumir y cuándo reservar dinero. El ahorro es capacidad de compra no usada hoy que puede financiar consumo o inversión de otros.</p><span class="role-output">Entregan fondos · reciben depósitos o inversiones</span></article>
          <article class="role-card"><span class="role-number">B</span><h4>Empresas y gobiernos</h4><p>Necesitan fondos para construir, comprar equipo o cubrir gastos. Pueden pedir un préstamo o emitir títulos que prometen pagos o una participación.</p><span class="role-output">Reciben fondos · asumen pagos o derechos</span></article>
          <article class="role-card"><span class="role-number">C</span><h4>Bancos y otros intermediarios</h4><p>Un banco puede captar depósitos y prestar por cuenta propia: transforma vencimientos y asume riesgo de crédito. Un fondo reúne aportes y compra activos para sus partícipes.</p><span class="role-output">Conectan balances · evalúan y administran riesgos</span></article>
          <article class="role-card"><span class="role-number">D</span><h4>Mercados y plataformas</h4><p>Organizan ofertas y órdenes de compra y venta. Una bolsa publica reglas de negociación; un mercado OTC permite pactar directamente condiciones entre partes.</p><span class="role-output">Organizan el encuentro · forman precios</span></article>
          <article class="role-card"><span class="role-number">E</span><h4>Bróker, compensación y depósito</h4><p>El bróker transmite órdenes. La cámara de compensación calcula lo que cada participante debe entregar. El depósito central registra quién posee cada título.</p><span class="role-output">Órdenes · obligaciones · registro de propiedad</span></article>
          <article class="role-card"><span class="role-number">F</span><h4>Banco central y autoridad supervisora</h4><p>El banco central opera la liquidación entre bancos en dinero de banco central y conduce la política monetaria. Los supervisores establecen y vigilan reglas de solvencia, conducta y divulgación.</p><span class="role-output">Liquidación bancaria · estabilidad y vigilancia</span></article>
        </div>
        <div class="instrument-map">
          <h4>Cuatro rutas para pagar la máquina</h4>
          <div class="instrument-row instrument-heading"><span>Contrato</span><span>Qué entrega quien aporta fondos</span><span>Qué promete o entrega la empresa</span></div>
          <div class="instrument-row"><strong>Préstamo bancario</strong><span>El banco entrega dinero hoy.</span><span>Devolver principal e intereses; el prestamista no se vuelve dueño por prestar.</span></div>
          <div class="instrument-row"><strong>Acción nueva</strong><span>Un inversor paga a la empresa.</span><span>Participación y derechos definidos; no hay una devolución fija como en una deuda.</span></div>
          <div class="instrument-row"><strong>Bonos</strong><span>Varios inversores compran títulos de deuda.</span><span>Principal e intereses según calendario y condiciones del bono.</span></div>
          <div class="instrument-row"><strong>Fondos propios</strong><span>La empresa usa efectivo que ya generó.</span><span>No nace una obligación frente a un nuevo prestamista o accionista.</span></div>
        </div>
      </section>

      <section class="lesson-section" aria-labelledby="compare-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">04</span><div><p class="lesson-kicker">CAMBIO DE ESCENARIO</p><h3 id="compare-title">La misma acción, dos viajes diferentes</h3></div></div>
        <div class="transaction-comparison">
          <article class="transaction-card primary-transaction">
            <p class="lesson-kicker">MERCADO PRIMARIO · NACE EL TÍTULO</p>
            <div class="transaction-flow"><span>Inversor</span><b>100 000 →</b><span>Empresa</span></div>
            <div class="transaction-flow"><span>Empresa</span><b>10 000 acciones nuevas →</b><span>Inversor</span></div>
            <p>La empresa crea y vende títulos nuevos. El efectivo de la emisión llega al emisor, descontando costes pactados.</p>
            <strong>La empresa financia la planta.</strong>
          </article>
          <article class="transaction-card secondary-transaction">
            <p class="lesson-kicker">MERCADO SECUNDARIO · CAMBIA EL DUEÑO</p>
            <div class="transaction-flow"><span>Comprador B</span><b>12 000 →</b><span>Vendedor A</span></div>
            <div class="transaction-flow"><span>Vendedor A</span><b>1 000 acciones →</b><span>Comprador B</span></div>
            <p>A revende 1 000 acciones a 12. La empresa emisora no es parte de esta operación.</p>
            <strong>La empresa recibe 0 en esta reventa.</strong>
          </article>
        </div>
        <p class="lesson-hint">El precio secundario puede cambiar la valoración de la empresa y las condiciones de futuras emisiones. Pero una reventa ya realizada no deposita por sí sola dinero en la caja de la empresa.</p>
      </section>

      <section class="lesson-section" aria-labelledby="settlement-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">05</span><div><p class="lesson-kicker">CIERRE DEL CIRCUITO</p><h3 id="settlement-title">Una orden no es todavía una entrega</h3></div></div>
        <div class="settlement-sequence">
          <div><b>1 · Negociar</b><span>Comprador y vendedor acuerdan título, cantidad y precio.</span></div>
          <div><b>2 · Compensar</b><span>Se calculan obligaciones netas y garantías para gestionar incumplimientos.</span></div>
          <div><b>3 · Liquidar</b><span>Se transfiere el dinero y se actualiza la propiedad del título, idealmente de forma coordinada.</span></div>
          <div><b>4 · Conciliar</b><span>Los registros de intermediarios y depositarios deben reflejar el mismo resultado.</span></div>
        </div>
        <div class="lesson-callout"><strong>¿Por qué separar estos pasos?</strong><span>Si el comprador paga pero no recibe el título —o el vendedor entrega el título sin cobrar— alguien soporta una pérdida. La infraestructura reduce ese riesgo mediante reglas, garantías, registros y entrega contra pago.</span></div>
      </section>

      <section class="lesson-section" aria-labelledby="stress-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">06</span><div><p class="lesson-kicker">PRUEBA DE ESTRÉS</p><h3 id="stress-title">¿Qué se rompe si quitamos una pieza?</h3></div></div>
        <div class="stress-test" id="stress-test">
          <button type="button" data-stress="bank" aria-pressed="false">Quitar al banco</button>
          <button type="button" data-stress="market" aria-pressed="false">Quitar al mercado</button>
          <button type="button" data-stress="settlement" aria-pressed="false">Quitar la liquidación</button>
          <p id="stress-result" aria-live="polite">Elige una pieza para ver qué tarea queda sin resolver.</p>
        </div>
      </section>

      <section class="lesson-section recall-card" aria-labelledby="recall-title">
        <div class="lesson-section-heading"><span class="lesson-step-mark">07</span><div><p class="lesson-kicker">RECUPERACIÓN ACTIVA</p><h3 id="recall-title">Cierra el panel e intenta reconstruirlo</h3></div></div>
        <details>
          <summary>¿Qué tres cosas deben viajar para que una compra de acciones termine?</summary>
          <p>Una orden debe convertirse en obligaciones; el dinero debe liquidarse; y la titularidad del activo debe actualizarse. Indica qué entidad o proceso se ocupa de cada cosa en el mercado que estás imaginando.</p>
        </details>
        <details>
          <summary>¿Quién recibe el efectivo de una acción nueva? ¿Y de una reventa?</summary>
          <p>En la emisión primaria, lo recibe la empresa (menos costes). En la reventa secundaria, lo recibe el vendedor actual; la empresa no recibe el precio de esa transacción.</p>
        </details>
        <details>
          <summary>¿Un banco y una bolsa hacen el mismo trabajo?</summary>
          <p>No necesariamente. El banco puede intermediar préstamos y depósitos en su balance. La bolsa organiza la negociación de títulos según reglas. Un emisor puede financiarse mediante un préstamo sin usar una bolsa, o emitir títulos sin obtener un préstamo bancario.</p>
        </details>
      </section>
    </article>
  `;

  const steps = [
    {
      label: "Necesidad",
      explanation: "<strong>Iteración 1 · aparece el problema.</strong> La máquina cuesta 100 000. La empresa compara el efectivo disponible con el coste: si tiene 20 000, la brecha es 100 000 − 20 000 = 80 000. Tiene que aplazar el proyecto, conseguir ingresos, vender un activo o financiar esa diferencia."
    },
    {
      label: "Intermediación",
      explanation: "<strong>Iteración 2 · se conecta la necesidad con el ahorro.</strong> Una vía es un banco: ahorradores depositan dinero y el banco presta a la empresa, que promete devolver principal e intereses. Otra es vender acciones nuevas: inversores aportan capital y reciben derechos de propiedad. Son contratos distintos y reparten el riesgo de forma distinta."
    },
    {
      label: "Emisión",
      explanation: "<strong>Iteración 3 · se crea un título.</strong> Si la empresa necesita 100 000 y fija el precio de emisión en 10 por acción, necesita 100 000 ÷ 10 = 10 000 acciones. La empresa recibe dinero cuando los inversores compran los títulos nuevos; antes del pago, solo hay una oferta."
    },
    {
      label: "Inversión",
      explanation: "<strong>Iteración 4 · el ahorro toma forma de inversión.</strong> Una persona puede comprar directamente o participar mediante un fondo de pensiones o de inversión. El inversor entrega efectivo; a cambio recibe una acción y los derechos que establecen las reglas: por ejemplo, votar y participar en distribuciones si las hubiera."
    },
    {
      label: "Reventa",
      explanation: "<strong>Iteración 5 · el dueño cambia, no el emisor.</strong> Si A vende 1 000 acciones a B por 12, B entrega 1 000 × 12 = 12 000 a A. Las acciones pasan de A a B. La empresa no recibe esos 12 000 porque no las emitió en esta operación."
    },
    {
      label: "Liquidación",
      explanation: "<strong>Iteración 6 · se completa la promesa.</strong> Los sistemas de compensación determinan obligaciones; los depositarios registran al nuevo dueño; los bancos transfieren el pago. Si comprador y vendedor usan bancos distintos, las entidades deben liquidar sus saldos. Solo al cerrar esos registros la transacción deja de ser una orden pendiente."
    }
  ];

  function formatMoney(value) {
    return new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(value);
  }

  function init(root) {
    const target = root.querySelector("#finance-target");
    const price = root.querySelector("#finance-price");
    const demand = root.querySelector("#finance-demand");
    const selectedStep = root.querySelector("#route-explanation");
    let activeStep = 0;

    const updateCapital = () => {
      const targetValue = Number(target.value);
      const priceValue = Number(price.value);
      const demandValue = Number(demand.value);
      const requiredShares = targetValue / priceValue;
      const requestedShares = Math.floor(requiredShares * demandValue / 100);
      const soldShares = Math.min(requiredShares, requestedShares);
      const raised = soldShares * priceValue;
      const gap = Math.max(0, targetValue - raised);

      root.querySelector("#finance-target-output").textContent = formatMoney(targetValue);
      root.querySelector("#finance-price-output").textContent = formatMoney(priceValue);
      root.querySelector("#finance-demand-output").textContent = `${demandValue} %`;
      root.querySelector("#finance-shares").textContent = formatMoney(requiredShares);
      root.querySelector("#finance-raised").textContent = formatMoney(raised);
      root.querySelector("#finance-gap").textContent = formatMoney(gap);
      root.querySelector("#finance-calculation-note").textContent =
        `${formatMoney(targetValue)} ÷ ${formatMoney(priceValue)} = ${formatMoney(requiredShares)} acciones. ` +
        `Demanda: ${formatMoney(requestedShares)} acciones; se venden ${formatMoney(soldShares)}. ` +
        `${formatMoney(soldShares)} × ${formatMoney(priceValue)} = ${formatMoney(raised)} recibidos.`;
      root.querySelector("#algebra-steps").innerHTML = `
        <p><span>1 · Nombra lo que no sabemos</span><code>acciones necesarias = N</code></p>
        <p><span>2 · Multiplica unidades vendidas por el dinero de cada una</span><code>capital = N × precio por acción</code></p>
        <p><span>3 · Sustituye por el caso que puedes tocar</span><code>${formatMoney(targetValue)} = N × ${formatMoney(priceValue)}</code></p>
        <p><span>4 · Divide ambos lados por el mismo precio</span><code>${formatMoney(targetValue)} ÷ ${formatMoney(priceValue)} = (N × ${formatMoney(priceValue)}) ÷ ${formatMoney(priceValue)}</code></p>
        <p><span>5 · Se cancela el precio y queda el número de acciones</span><code>N = ${formatMoney(requiredShares)} acciones</code></p>
        <p><span>6 · Comprueba multiplicando hacia atrás</span><code>${formatMoney(requiredShares)} × ${formatMoney(priceValue)} = ${formatMoney(targetValue)}</code></p>`;
      root.querySelector("#finance-gap").parentElement.classList.toggle("has-gap", gap > 0);
    };

    const updateStep = stepIndex => {
      activeStep = Math.min(Math.max(stepIndex, 0), steps.length - 1);
      const step = steps[activeStep];
      root.querySelectorAll("[data-route-step]").forEach(button => {
        const selected = Number(button.dataset.routeStep) === activeStep;
        button.classList.toggle("is-selected", selected);
        button.setAttribute("aria-current", selected ? "step" : "false");
      });
      selectedStep.innerHTML = step.explanation;
      root.querySelector("#route-counter").textContent = `ETAPA ${activeStep + 1} DE ${steps.length}`;
      root.querySelector("#route-previous").disabled = activeStep === 0;
      root.querySelector("#route-next").disabled = activeStep === steps.length - 1;
      const actors = [
        ["🏭", "Empresa", "necesita capital"],
        ["🏦", "Banco / fondo", "canaliza el ahorro"],
        ["📄", "Emisor", "crea acciones nuevas"],
        ["◇", "Inversor", "entrega efectivo"],
        ["⇄", "Comprador B", "paga al vendedor A"],
        ["✓", "Liquidación", "dinero y título"]
      ];
      const currentActors = activeStep === 0
        ? [actors[0], ["◷", "Proyecto", "espera financiación"]]
        : activeStep === 1
          ? [actors[0], actors[1], ["◉", "Ahorradores", "aportan fondos"]]
          : activeStep === 2
            ? [actors[0], actors[2], actors[3]]
            : activeStep === 3
              ? [actors[3], actors[0], ["▤", "Acciones", "cambian de manos"]]
              : activeStep === 4
                ? [["◇", "Vendedor A", "recibe el pago"], actors[4], ["▤", "Acciones", "se transfieren"]]
                : [["◇", "Comprador", "entrega fondos"], actors[5], ["▤", "Depositario", "actualiza el registro"]];
      root.querySelector("#flow-board").innerHTML = currentActors.map((actor, index) =>
        `${index ? '<span class="flow-arrow" aria-hidden="true">↔</span>' : ""}<div class="flow-actor"><span class="actor-icon">${actor[0]}</span><strong>${actor[1]}</strong><small>${actor[2]}</small></div>`
      ).join("");
    };

    [target, price, demand].forEach(input => input.addEventListener("input", updateCapital));
    root.querySelectorAll("[data-route-step]").forEach(button =>
      button.addEventListener("click", () => updateStep(Number(button.dataset.routeStep)))
    );
    root.querySelector("#route-previous").addEventListener("click", () => updateStep(activeStep - 1));
    root.querySelector("#route-next").addEventListener("click", () => updateStep(activeStep + 1));

    const stressResults = {
      bank: "Sin un banco, la empresa todavía puede emitir acciones si encuentra inversores y una infraestructura de mercado. Lo que desaparece es la vía del préstamo bancario y la transformación de depósitos en crédito.",
      market: "Sin una bolsa, aún puede haber un préstamo bancario, una colocación privada o una negociación OTC. Lo que falta es esa plataforma común y sus reglas de negociación; no desaparecen todas las formas de financiarse.",
      settlement: "Sin liquidación, compradores y vendedores acumulan promesas sin confirmar quién pagó o quién posee el título. Aumenta el riesgo de que una parte cumpla y la otra no; la operación no tiene cierre fiable."
    };
    root.querySelectorAll("[data-stress]").forEach(button => {
      button.addEventListener("click", () => {
        root.querySelectorAll("[data-stress]").forEach(option => option.setAttribute("aria-pressed", String(option === button)));
        root.querySelector("#stress-result").textContent = stressResults[button.dataset.stress];
      });
    });

    updateCapital();
    updateStep(0);
  }

  window.financialSystemLesson = { template, init };
})();
