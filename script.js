// ============ 1. SPLASH SCREEN (0 - 100%) ============
function runSplash(onDone) {
  const fill = document.getElementById("splashBarFill");
  const percentText = document.getElementById("splashPercent");
  let progress = 0;

  const interval = setInterval(() => {
    // Naik dengan kecepatan acak biar terasa natural, bukan lurus
    progress += Math.random() * 12 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = "100%";
      percentText.textContent = "100%";
      setTimeout(onDone, 350);
      return;
    }
    fill.style.width = progress + "%";
    percentText.textContent = Math.floor(progress) + "%";
  }, 120);
}

function hideSplashAndShowApp() {
  const splash = document.getElementById("splash");
  const app = document.getElementById("app");

  splash.classList.add("splash-out");
  app.classList.remove("app-hidden");

  setTimeout(() => {
    app.classList.add("app-show");
    splash.remove();
  }, 50);
}

// ============ 2. PARSING data.txt ============
// Format data.txt: blok dipisah baris kosong, tiap baris "key=value"
// Contoh:
//   nama=Nama Proyek
//   thumbnail=https://...
//   link=https://...
//   kategori=python
function parseDataText(raw) {
  const blocks = raw
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    const item = { id: String(index + 1) };
    block.split("\n").forEach((line) => {
      const idx = line.indexOf("=");
      if (idx === -1) return;
      const key = line.slice(0, idx).trim().toLowerCase();
      const value = line.slice(idx + 1).trim();
      if (key === "nama") item.name = value;
      if (key === "thumbnail") item.thumbnail = value;
      if (key === "link") item.link = value;
      if (key === "kategori") item.category = value;
    });
    return item;
  }).filter((item) => item.name && item.link);
}

// ============ 3. RENDER ============
const CATEGORY_LABELS = {
  python: "Python",
  javascript: "JavaScript",
  multi: "Multi",
  html: "HTML Only",
  "html-plus": "HTML+",
};

let allProjects = [];
let activeCategory = "all";
let activeQuery = "";

function renderProjects() {
  const grid = document.getElementById("grid");
  const emptyState = document.getElementById("emptyState");
  const resultCount = document.getElementById("resultCount");

  const q = activeQuery.trim().toLowerCase();
  const filtered = allProjects.filter((p) => {
    const matchQuery = p.name.toLowerCase().includes(q);
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    return matchQuery && matchCategory;
  });

  resultCount.textContent = `${filtered.length} dari ${allProjects.length} proyek`;

  grid.innerHTML = "";
  if (filtered.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  filtered.forEach((project) => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = project.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    const label = CATEGORY_LABELS[project.category] || project.category || "-";

    card.innerHTML = `
      <div class="card-thumb">
        <img src="${project.thumbnail || ""}" alt="${project.name}" loading="lazy" />
      </div>
      <div class="card-body">
        <h3>${project.name}</h3>
        <span class="badge">${label}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ============ 4. EVENT: SEARCH & TABS ============
function setupControls() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    activeQuery = e.target.value;
    renderProjects();
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("tab-active"));
      tab.classList.add("tab-active");
      activeCategory = tab.dataset.category;
      renderProjects();
    });
  });
}

// ============ 5. INIT ============
async function loadProjects() {
  try {
    const res = await fetch("data.txt", { cache: "no-store" });
    const text = await res.text();
    allProjects = parseDataText(text);
  } catch (err) {
    console.warn("Gagal memuat data.txt:", err);
    allProjects = [];
  }
  renderProjects();
}

document.addEventListener("DOMContentLoaded", () => {
  const hasSplash = document.getElementById("splash");
  const hasGallery = document.getElementById("grid");

  if (hasSplash) {
    runSplash(hideSplashAndShowApp);
  }

  if (hasGallery) {
    setupControls();
    loadProjects();
  }
});
