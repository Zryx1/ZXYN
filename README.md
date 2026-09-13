# Vortex Project

Galeri proyek dengan thumbnail, nama, dan klik langsung menuju link. Ada pencarian nama dan filter kategori: **Python**, **JavaScript**, **Multi**, **HTML Only**, **HTML+**.

Data proyek "disimpan" di GitHub — kamu edit file `data/projects.json` langsung lewat website GitHub, dan situsnya otomatis ambil data terbaru tanpa perlu redeploy manual.

## 1. Jalankan di komputer sendiri (opsional)

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## 2. Upload ke GitHub

1. Buat repo baru di GitHub, misal `vortex-project`.
2. Upload semua isi folder ini ke repo tersebut (lewat `git push` atau drag-and-drop file di web GitHub).
3. Buka `config.js`, ganti:
   ```js
   export const GITHUB_CONFIG = {
     owner: "USERNAME-GITHUB-KAMU", // username GitHub kamu
     repo: "vortex-project",        // nama repo kamu
     branch: "main",
     path: "data/projects.json",
   };
   ```
   dengan username & nama repo yang sebenarnya, lalu commit perubahan itu.

> Catatan: `config.js` menentukan repo mana yang jadi "database". Kamu boleh pakai repo yang sama dengan kode (seperti di atas), atau repo terpisah khusus data — asal file `projects.json`-nya publik.

## 3. Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) → **Add New Project**.
2. Pilih **Import Git Repository**, sambungkan akun GitHub kamu, pilih repo `vortex-project`.
3. Framework otomatis terdeteksi sebagai **Next.js** — biarkan setting default, klik **Deploy**.
4. Tunggu build selesai, situs langsung online dengan URL `*.vercel.app`.

Karena Vercel sudah terhubung ke GitHub, setiap kali kamu push perubahan kode ke branch `main`, Vercel otomatis build & deploy ulang.

## 4. Menambah / mengubah proyek (database via GitHub)

Cukup edit `data/projects.json` langsung di GitHub:

1. Buka file `data/projects.json` di repo GitHub kamu.
2. Klik ikon pensil (Edit).
3. Tambah/ubah entry mengikuti format ini:
   ```json
   {
     "id": "7",
     "name": "Nama Proyek Kamu",
     "thumbnail": "https://url-gambar-thumbnail.png",
     "link": "https://link-tujuan-proyek.com",
     "category": "python"
   }
   ```
4. Nilai `category` harus salah satu dari:
   - `python` → Python
   - `javascript` → JavaScript
   - `multi` → Multi (Python + JavaScript)
   - `html` → HTML Only
   - `html-plus` → HTML+ (HTML dengan CSS/JS terpisah)
5. Commit langsung ke branch `main`.

Situs akan otomatis mengambil data terbaru dalam **maksimal 60 detik** (tanpa redeploy Vercel), karena halaman pakai revalidate otomatis Next.js. Kalau mau update instan, buka dashboard Vercel → project → **Deployments** → **Redeploy**.

## Struktur file

```
vortex-project/
├── app/                  # Halaman & layout (Next.js App Router)
├── components/           # UI: search bar, tab kategori, kartu proyek
├── lib/fetchProjects.js  # Logika ambil data dari GitHub
├── data/projects.json    # Data contoh / cadangan kalau fetch GitHub gagal
├── config.js             # Alamat repo GitHub yang jadi sumber data
```
