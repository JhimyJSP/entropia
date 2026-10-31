(() => {
  const book = window.ENTROPIA_BOOK;
  const index = document.getElementById("curriculum-index");
  const moduleList = document.getElementById("module-list");
  const indexCount = document.getElementById("index-count");
  const topicView = document.getElementById("topic-view");
  const topicStage = document.getElementById("topic-stage");
  const topicTitle = document.getElementById("topic-title");
  const topicLesson = document.getElementById("topic-lesson");
  const backButton = document.getElementById("back-to-index");
  const welcome = document.getElementById("welcome-screen");
  const appShell = document.getElementById("app-shell");
  const openButton = document.getElementById("open-curriculum");

  if (!book || !Array.isArray(book.modules)) {
    throw new Error("No se pudo cargar el índice del cuaderno.");
  }

  function enterCurriculum(updateHistory = true) {
    if (updateHistory) {
      history.pushState({ view: "index" }, "", `${location.pathname}${location.search}`);
    }
    appShell.hidden = false;
    welcome.classList.add("leaving");
    window.setTimeout(() => {
      welcome.hidden = true;
    }, 420);
  }

  function showWelcome() {
    appShell.hidden = true;
    welcome.hidden = false;
    welcome.classList.remove("leaving");
    window.welcomeBook?.resume();
  }

  const topics = book.modules.reduce((total, module) => total + module.topics.length, 0);
  indexCount.textContent = `${book.modules.length} etapas · ${topics} temas`;

  book.modules.forEach((module, moduleIndex) => {
    const section = document.createElement("section");
    section.className = "module-card";

    const heading = document.createElement("div");
    heading.className = "module-heading";

    const number = document.createElement("span");
    number.className = "module-number";
    number.textContent = `ETAPA ${module.number}`;

    const title = document.createElement("h2");
    title.textContent = module.title;
    heading.append(number, title);

    const topicList = document.createElement("div");
    topicList.className = "topic-list";

    module.topics.forEach((topic, topicIndex) => {
      const button = document.createElement("button");
      button.className = "topic-link";
      button.type = "button";
      button.dataset.topic = `${moduleIndex}-${topicIndex}`;
      button.innerHTML = `<span class="topic-number">${String(topicIndex + 1).padStart(2, "0")}</span><span class="topic-label"></span><span class="topic-arrow" aria-hidden="true">→</span>`;
      button.querySelector(".topic-label").textContent = topic;
      button.addEventListener("click", () => openTopic(moduleIndex, topicIndex));
      topicList.append(button);
    });

    section.append(heading, topicList);
    moduleList.append(section);
  });

  function openTopic(moduleIndex, topicIndex, updateHistory = true) {
    const module = book.modules[moduleIndex];
    const topic = module?.topics[topicIndex];
    if (!topic) {
      showIndex();
      return;
    }

    if (updateHistory) {
      history.pushState({ view: "topic" }, "", `#tema-${moduleIndex}-${topicIndex}`);
    }
    index.hidden = true;
    topicView.hidden = false;
    topicStage.textContent = `ETAPA ${module.number} · ${module.title}`;
    topicTitle.textContent = topic;
    if (moduleIndex === 0 && topicIndex === 0 && window.financialSystemLesson) {
      topicLesson.innerHTML = window.financialSystemLesson.template;
      window.financialSystemLesson.init(topicLesson);
    } else {
      topicLesson.innerHTML = "<p>Este tema todavía no tiene contenido desarrollado.</p>";
    }
    topicView.scrollTop = 0;
    window.scrollTo(0, 0);
    document.title = `${topic} | ${book.meta.title}`;
  }

  function showIndex(updateHistory = true) {
    if (updateHistory) {
      history.pushState({ view: "index" }, "", `${location.pathname}${location.search}`);
    }
    appShell.hidden = false;
    welcome.hidden = true;
    topicView.hidden = true;
    index.hidden = false;
    window.scrollTo(0, 0);
    document.title = book.meta.title;
  }

  function restoreFromLocation() {
    const match = location.hash.match(/^#tema-(\d+)-(\d+)$/);
    if (match) {
      if (history.state?.view !== "topic") {
        history.replaceState({ view: "topic" }, "", location.href);
      }
      enterCurriculum(false);
      openTopic(Number(match[1]), Number(match[2]), false);
    } else if (history.state?.view === "index") {
      showIndex(false);
    } else {
      showWelcome();
    }
  }

  openButton.addEventListener("click", () => enterCurriculum());
  backButton.addEventListener("click", () => {
    if (history.state?.view === "topic") {
      history.back();
    } else {
      showIndex();
    }
  });
  window.addEventListener("popstate", restoreFromLocation);
  window.addEventListener("hashchange", restoreFromLocation);
  restoreFromLocation();
})();
