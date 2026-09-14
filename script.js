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
//   nama=Nama Script
//   thumbnail=https://...
//   link=https://...
//   codetype=Python, JavaScript
//   note=Deskripsi singkat script ini
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
      if (key === "codetype") item.codetype = value;
      if (key === "note") item.note = value;
    });
    return item;
  }).filter((item) => item.name && item.link);
}

// ============ 3. RENDER ============
let allProjects = [];
let activeQuery = "";

function renderProjects() {
  const grid = document.getElementById("grid");
  const emptyState = document.getElementById("emptyState");
  const resultCount = document.getElementById("resultCount");

  const q = activeQuery.trim().toLowerCase();
  const filtered = allProjects.filter((p) => p.name.toLowerCase().includes(q));

  resultCount.textContent = `${filtered.length} dari ${allProjects.length} script`;

  grid.innerHTML = "";
  if (filtered.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  filtered.forEach((project) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";

    card.innerHTML = `
      <div class="card-thumb">
        <img src="${project.thumbnail || ""}" alt="${project.name}" loading="lazy" />
      </div>
      <div class="card-body">
        <h3>${project.name}</h3>
        <span class="badge">Script</span>
      </div>
    `;

    card.addEventListener("click", () => openModal(project));
    grid.appendChild(card);
  });
}

// ============ 4. MODAL / POPUP DETAIL ============
function openModal(project) {
  const overlay = document.getElementById("modalOverlay");
  const codeTypesWrap = document.getElementById("modalCodeTypes");

  document.getElementById("modalName").textContent = project.name;
  document.getElementById("modalNote").textContent = project.note || "-";
  document.getElementById("modalLink").href = project.link;

  const types = (project.codetype || "-").split(",").map((t) => t.trim()).filter(Boolean);
  codeTypesWrap.innerHTML = types
    .map((t) => `<span class="codetype-chip">${t}</span>`)
    .join("");

  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("modal-open"));
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("modal-open");
  document.body.style.overflow = "";
  setTimeout(() => { overlay.hidden = true; }, 200);
}

function setupModal() {
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ============ 5. EVENT: SEARCH ============
function setupControls() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    activeQuery = e.target.value;
    renderProjects();
  });
  setupModal();
}

// ============ 6. INIT ============
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
