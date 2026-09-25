// ==========================================
// T-02C: DARK MODE THEME ENGINE
// ==========================================

const themeToggle = document.querySelector("#theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (themeToggle) {
    const isDark = theme === "dark";

    themeToggle.setAttribute(
      "aria-pressed",
      String(isDark)
    );

    themeToggle.textContent =
      isDark ? "Light Mode" : "Dark Mode";
  }
}

const savedTheme =
  localStorage.getItem("theme") || "light";

applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme");

  const nextTheme =
    currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
});


// ==========================================
// T-03C: RESILIENT COMPONENT STATE MACHINE
// ==========================================

const projectContainer =
  document.querySelector("#project-container");

const projectData = [
  {
    title: "Accessible Portfolio",
    description:
      "A responsive developer portfolio built with semantic HTML5 and accessibility best practices.",
    badges: ["HTML5", "A11y"],
  },

  {
    title: "Responsive Grid System",
    description:
      "A flexible two-dimensional layout created with modern CSS Grid.",
    badges: ["CSS Grid", "Responsive"],
  },

  {
    title: "Theme Engine",
    description:
      "A light and dark theme system using modern JavaScript.",
    badges: ["JavaScript", "localStorage"],
  },
];

function clearProjects() {
  if (!projectContainer) return;

  projectContainer.replaceChildren();
}


// ==========================================
// LOADING STATE
// ==========================================

function renderLoading() {
  if (!projectContainer) return;

  clearProjects();

  projectContainer.setAttribute(
    "aria-busy",
    "true"
  );

  for (let index = 0; index < 3; index += 1) {
    const skeleton =
      document.createElement("article");

    skeleton.className = "skeleton-item";

    skeleton.setAttribute(
      "aria-hidden",
      "true"
    );

    projectContainer.appendChild(skeleton);
  }
}


// ==========================================
// CREATE PROJECT CARD
// ==========================================

function createProjectCard(project) {
  const article =
    document.createElement("article");

  article.className = "project-card";


  const title =
    document.createElement("h3");

  title.textContent = project.title;


  const description =
    document.createElement("p");

  description.textContent =
    project.description;


  const badgeGroup =
    document.createElement("footer");

  badgeGroup.className = "badge-group";


  project.badges.forEach((badgeText) => {
    const badge =
      document.createElement("span");

    badge.className = "badge";

    badge.textContent = badgeText;

    badgeGroup.appendChild(badge);
  });


  article.append(
    title,
    description,
    badgeGroup
  );

  return article;
}


// ==========================================
// LIVE DATA STATE
// ==========================================

function renderLive(data) {
  if (!projectContainer) return;

  clearProjects();

  projectContainer.setAttribute(
    "aria-busy",
    "false"
  );

  data.forEach((project) => {
    const card =
      createProjectCard(project);

    projectContainer.appendChild(card);
  });
}


// ==========================================
// EMPTY STATE
// ==========================================

function renderEmpty() {
  if (!projectContainer) return;

  clearProjects();

  projectContainer.setAttribute(
    "aria-busy",
    "false"
  );

  const message =
    document.createElement("p");

  message.textContent =
    "No projects are available yet.";

  projectContainer.appendChild(message);
}


// ==========================================
// ERROR STATE
// ==========================================

function renderError() {
  if (!projectContainer) return;

  clearProjects();

  projectContainer.setAttribute(
    "aria-busy",
    "false"
  );


  const message =
    document.createElement("p");

  message.setAttribute(
    "role",
    "alert"
  );

  message.textContent =
    "Failed to load projects.";


  const retryButton =
    document.createElement("button");

  retryButton.type = "button";

  retryButton.textContent = "Retry";

  retryButton.setAttribute(
    "aria-label",
    "Retry loading projects"
  );


  retryButton.addEventListener(
    "click",
    () => {
      renderLoading();

      setTimeout(() => {
        renderLive(projectData);
      }, 700);
    }
  );


  projectContainer.append(
    message,
    retryButton
  );
}


// ==========================================
// STATE CONTROLLER
// ==========================================

function renderState(state) {
  if (state === "loading") {
    renderLoading();
    return;
  }

  if (state === "empty") {
    renderEmpty();
    return;
  }

  if (state === "error") {
    renderError();
    return;
  }

  renderLive(projectData);
}


// ==========================================
// READ STATE FROM URL
// ==========================================

const params =
  new URLSearchParams(
    window.location.search
  );

const requestedState =
  params.get("state");

const allowedStates = [
  "loading",
  "live",
  "empty",
  "error",
];

const initialState =
  allowedStates.includes(requestedState)
    ? requestedState
    : "live";

renderState(initialState);