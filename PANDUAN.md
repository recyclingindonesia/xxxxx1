# Panduan Pengaturan OmniPost Pro

Selamat! Anda telah memiliki sistem **Blogger Hybrid SEO Generator**. Ikuti langkah-langkah di bawah ini untuk mengaktifkan aplikasi Anda.

## 1. Persiapan Google Spreadsheet
1. Buat Google Spreadsheet baru.
2. Salin **ID Spreadsheet** (ada di URL: `https://docs.google.com/spreadsheets/d/ID_SPREADSHEET_ANDA/edit`).
3. Buka file `code.gs` di Editor Apps Script dan ganti `YOUR_SPREADSHEET_ID` dengan ID tersebut.

## 2. Mendapatkan Blogger Blog ID
1. Buka dashboard Blogger Anda.
2. Lihat URL di browser: `https://www.blogger.com/blog/posts/ID_BLOG_ANDA`.
3. Salin ID tersebut dan ganti `YOUR_BLOG_ID` di `code.gs`.

## 3. Mendapatkan API Key Gemini (AI)
1. Buka [Google AI Studio](https://aistudio.google.com/).
2. Buat API Key baru.
3. Masukkan satu atau beberapa API Key ke dalam array `GEMINI_API_KEYS` di `code.gs` untuk fitur rotasi otomatis.

## 4. Mengaktifkan Layanan Blogger di Apps Script
1. Di Editor Apps Script, klik ikon **+ (Tambah Layanan)** di sebelah kiri (Services).
2. Cari **Blogger API**, pilih, dan klik **Add/Tambah**.

## 5. Deployment sebagai Web App
1. Klik tombol **Deploy** > **New Deployment**.
2. Pilih tipe: **Web App**.
3. Deskripsi: "OmniPost Pro v1".
4. Execute as: **Me (Saya)**.
5. Who has access: **Anyone (Siapa saja)**.
6. Klik **Deploy**, lalu salin **Web App URL**.

## 6. Menghubungkan Frontend ke Backend
1. Buka file `index.html`.
2. Cari variabel `const GAS_URL = "YOUR_APPS_SCRIPT_URL";`.
3. Ganti dengan URL yang Anda salin di langkah sebelumnya.
4. Simpan file `index.html`.

## 7. Cara Menggunakan
1. Buka `index.html` di browser atau pasang kodenya di halaman statis Blogspot Anda.
2. Lakukan **Pendaftaran** terlebih dahulu untuk membuat password akses.
3. Gunakan password tersebut untuk **Login**.
4. Mulai buat postingan dengan mengunggah foto. Sistem akan otomatis mengompres gambar, membuat deskripsi SEO via AI, menyimpan data ke Spreadsheet, dan mengirimkannya ke Blogger.

---
**Catatan Penting:**
- Pastikan Anda memberikan izin (authorize) saat pertama kali menjalankan script.
- Gambar tidak disimpan di Drive, melainkan dikonversi menjadi data inline untuk postingan agar lebih ringan dan cepat.
