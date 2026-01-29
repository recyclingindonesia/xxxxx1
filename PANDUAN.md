# Panduan Pengaturan OmniPost Pro (Direct Posting)

Selamat! Anda telah memiliki sistem **Blogger Sales Post Manager**. Ikuti langkah-langkah di bawah ini untuk mengaktifkan aplikasi Anda.

## 1. Persiapan Google Spreadsheet & Otomatisasi
1. Buat Google Spreadsheet baru.
2. Buka **Extensions** > **Apps Script**.
3. Salin kode dari `code.gs` ke editor Apps Script.
4. Klik ikon **Project Settings (Roda Gigi)** di sebelah kiri.
5. Gulir ke bawah ke **Script Properties** dan tambahkan:
   - `BLOG_ID`: ID Blog Blogger Anda.
6. Kembali ke Editor, pilih fungsi **setupSystem** dari menu dropdown dan klik **Run**.
   - Sistem akan otomatis menyiapkan kolom Spreadsheet yang diperlukan (**Users** & **Posts**).

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
3. Deskripsi: "OmniPost Pro Direct".
4. Execute as: **Me (Saya)**.
5. Who has access: **Anyone (Siapa saja)**.
6. Klik **Deploy**, lalu salin **Web App URL**.

## 5. Menghubungkan Frontend ke Backend
1. Buka file `index.html`.
2. Cari variabel `const GAS_URL = "YOUR_APPS_SCRIPT_URL";`.
3. Ganti dengan URL yang Anda salin di langkah sebelumnya.
4. Simpan file `index.html`.

## 6. Cara Menggunakan
1. Buka `index.html` di browser.
2. Lakukan **Pendaftaran** (Hanya sekali) untuk membuat password akses.
3. Gunakan password tersebut untuk **Login**.
4. Di **Dashboard**, Anda bisa melihat daftar postingan Anda dan mengeditnya sewaktu-waktu.
5. Gunakan tombol **+ Post Baru** untuk membuat postingan langsung ke Blogger.

---
**Fitur Utama:**
- **Langsung & Cepat:** Tidak menggunakan AI agar proses posting lebih stabil dan instan.
- **Kompresi Gambar:** Gambar diperkecil secara otomatis sebelum dikirim (hemat kuota).
- **Manajemen Data:** Lihat dan Edit postingan Anda langsung dari dashboard.
- **Keamanan:** Blog ID disimpan aman di Script Properties.
