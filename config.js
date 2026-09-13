// Konfigurasi "database" Vortex Project.
// Data proyek (nama, thumbnail, link, kategori) diambil langsung dari file
// JSON yang ada di repo GitHub kamu — jadi update konten cukup edit file ini
// di GitHub, tanpa perlu redeploy manual.

export const GITHUB_CONFIG = {
  owner: "USERNAME-GITHUB-KAMU", // ganti dengan username/organisasi GitHub kamu
  repo: "vortex-project", // ganti dengan nama repo tempat file projects.json disimpan
  branch: "main", // branch yang dipakai (biasanya "main")
  path: "data/projects.json", // lokasi file data di dalam repo
};
