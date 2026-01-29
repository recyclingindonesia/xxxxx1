# Panduan Pengaturan OmniPost Pro (Professional CRUD Edition)

Selamat! Anda telah memiliki sistem **Blogger Sales Management Dashboard** yang profesional. Ikuti langkah-langkah di bawah ini untuk mengaktifkan aplikasi Anda.

## 1. Persiapan Google Spreadsheet & Otomatisasi
1. Buat Google Spreadsheet baru.
2. Buka **Extensions** > **Apps Script**.
3. Salin kode dari `code.gs` ke editor Apps Script.
4. Klik ikon **Project Settings (Roda Gigi)** di sebelah kiri.
5. Gulir ke bawah ke **Script Properties** dan tambahkan properti berikut:
   - `BLOG_ID`: ID Blog Blogger Anda.
6. Kembali ke Editor, pilih fungsi **setupSystem** dari menu dropdown dan klik **Run**.
   - Sistem akan otomatis menyiapkan kolom Spreadsheet yang diperlukan (**Users** & **Posts**) dengan skema profesional terbaru.

## 2. Mendapatkan Blogger Blog ID
1. Buka dashboard Blogger Anda.
2. Lihat URL di browser: `https://www.blogger.com/blog/posts/ID_BLOG_ANDA`.
3. Salin ID tersebut untuk dimasukkan ke Script Properties (Langkah 1.5).

## 3. Mengaktifkan Layanan Blogger di Apps Script
1. Di Editor Apps Script, klik ikon **+ (Tambah Layanan)** di sebelah kiri (Services).
2. Cari **Blogger API**, pilih versi v3, dan klik **Add/Tambah**.

## 4. Deployment sebagai Web App
1. Klik tombol **Deploy** > **New Deployment**.
2. Pilih tipe: **Web App**.
3. Execute as: **Me (Saya)**.
4. Who has access: **Anyone (Siapa saja)**.
5. Klik **Deploy**, lalu salin **Web App URL**.

## 5. Menghubungkan Frontend ke Backend
1. Buka file `index.html`.
2. Cari variabel `const GAS_URL = "YOUR_APPS_SCRIPT_URL";`.
3. Ganti dengan URL yang Anda salin di langkah sebelumnya.

## 6. Fitur Dashboard Profesional
Sistem ini dirancang untuk memudahkan manajemen jualan Anda:
- **Visual Dashboard**: Menampilkan foto produk langsung di halaman utama.
- **Status Barang**: Anda bisa menandai barang sebagai **Aktif** atau **Terjual**. Status ini akan muncul sebagai label otomatis di postingan Blogger.
- **Full CRUD**: Buat, Lihat, Edit, dan Hapus postingan langsung dari satu dashboard.
- **AI SEO Generator (Client-Side)**: Klik tombol ✨ **GUNAKAN AI SEO** untuk membuat deskripsi profesional, label SEO, dan Alt Text. Anda bisa mengatur API Key Gemini langsung melalui menu Pengaturan (ikon roda gigi ⚙️) di dashboard.
- **Keamanan**: Data setiap pengunjung dipisahkan berdasarkan password akses yang didaftarkan. API Key Gemini disimpan secara lokal di browser Anda.

## Tambahan: Menghubungkan ke Google Cloud Project (Opsional)
Jika Anda ingin menghubungkan script ini ke Project Google Cloud Anda (misalnya untuk monitoring atau limit API yang lebih tinggi):
1. Buka Apps Script > **Project Settings**.
2. Klik **Change Project**.
3. Masukkan **Project Number** Anda: `827330939462`.

---
**Tips Penggunaan:**
- Gunakan **Alt Text** yang deskriptif untuk meningkatkan SEO gambar di Google Image.
- Saat mengedit, sistem akan menggunakan kembali foto lama jika Anda tidak mengunggah foto baru (hemat waktu!).
