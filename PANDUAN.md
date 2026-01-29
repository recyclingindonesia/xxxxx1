# Panduan Pengaturan OmniPost Pro (v2 - Secure)

Selamat! Anda telah memiliki sistem **Blogger Hybrid SEO Generator**. Ikuti langkah-langkah di bawah ini untuk mengaktifkan aplikasi Anda dengan aman.

## 1. Persiapan Google Spreadsheet & Otomatisasi
1. Buat Google Spreadsheet baru.
2. Buka **Extensions** > **Apps Script**.
3. Salin kode dari `code.gs` ke editor Apps Script.
4. Klik ikon **Project Settings (Roda Gigi)** di sebelah kiri.
5. Gulir ke bawah ke **Script Properties** dan tambahkan:
   - `BLOG_ID`: ID Blog Blogger Anda.
   - `GEMINI_API_KEYS`: Daftar API Key Gemini Anda (pisahkan dengan koma jika lebih dari satu, contoh: `KEY1,KEY2,KEY3`).
6. Kembali ke Editor, pilih fungsi **setupSystem** dari menu dropdown dan klik **Run**.
   - Sistem akan otomatis menyiapkan folder dan kolom Spreadsheet yang diperlukan.

## 2. Mendapatkan Blogger Blog ID
1. Buka dashboard Blogger Anda.
2. Lihat URL di browser: `https://www.blogger.com/blog/posts/ID_BLOG_ANDA`.
3. Salin ID tersebut untuk dimasukkan ke Script Properties (Langkah 1.5).

## 3. Mendapatkan API Key Gemini (AI)
1. Buka [Google AI Studio](https://aistudio.google.com/).
2. Buat API Key baru.
3. Masukkan ke Script Properties (Langkah 1.5).

## 4. Mengaktifkan Layanan Blogger di Apps Script
1. Di Editor Apps Script, klik ikon **+ (Tambah Layanan)** di sebelah kiri (Services).
2. Cari **Blogger API**, pilih versi v3, dan klik **Add/Tambah**.

## 5. Deployment sebagai Web App
1. Klik tombol **Deploy** > **New Deployment**.
2. Pilih tipe: **Web App**.
3. Execute as: **Me (Saya)**.
4. Who has access: **Anyone (Siapa saja)**.
5. Klik **Deploy**, lalu salin **Web App URL**.

## 6. Menghubungkan Frontend ke Backend
1. Buka file `index.html`.
2. Cari variabel `const GAS_URL = "YOUR_APPS_SCRIPT_URL";`.
3. Ganti dengan URL yang Anda salin di langkah sebelumnya.
4. Simpan file `index.html`.

## 7. Cara Menggunakan
1. Buka `index.html` di browser.
2. Lakukan **Pendaftaran** (Hanya sekali) untuk membuat password akses.
3. Gunakan password tersebut untuk **Login**.
4. Di **Dashboard**, Anda bisa melihat daftar postingan Anda dan mengeditnya sewaktu-waktu tanpa kehilangan gambar.
5. Gunakan tombol **+ Post Baru** untuk membuat konten jualan SEO otomatis.

---
**Peningkatan di Versi Ini:**
- **Keamanan Tinggi:** API Key dan Blog ID tidak lagi terlihat di kode sumber (menggunakan Script Properties).
- **Update Aman:** Mengedit postingan tidak akan menghapus gambar yang sudah ada.
- **Manual Edit:** Deskripsi yang Anda edit secara manual di dashboard akan tersimpan dengan benar.
