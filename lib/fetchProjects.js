import { GITHUB_CONFIG } from "@/config";
import fallbackProjects from "@/data/projects.json";

// Vortex Project tidak pakai database konvensional — datanya dibaca langsung
// dari file JSON di repo GitHub kamu lewat raw.githubusercontent.com.
// Berkat `revalidate`, Next.js akan ambil ulang data itu secara berkala
// tanpa perlu redeploy tiap kali kamu menambah/mengubah proyek.
export async function fetchProjects() {
  const { owner, repo, branch, path } = GITHUB_CONFIG;
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      throw new Error(`GitHub merespons status ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Format projects.json harus berupa array");
    }

    return data;
  } catch (error) {
    console.warn(
      "[Vortex] Gagal ambil data dari GitHub, memakai data lokal sebagai cadangan:",
      error.message
    );
    return fallbackProjects;
  }
}
