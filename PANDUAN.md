# Panduan Pengaturan OmniPost Pro

Selamat! Anda telah memiliki sistem **Blogger Hybrid SEO Generator**. Ikuti langkah-langkah di bawah ini untuk mengaktifkan aplikasi Anda.

## 1. Persiapan Google Spreadsheet & Otomatisasi
1. Buat Google Spreadsheet baru.
2. Buka **Extensions** > **Apps Script**.
3. Salin kode dari `code.gs` ke editor Apps Script.
4. Di bagian atas editor, pilih fungsi **setupSystem** dari menu dropdown dan klik **Run**.
5. Script akan otomatis membuat sheet **Users** dan **Posts** dengan kolom yang sesuai.
   *   *Catatan:* Jika script tidak menempel langsung di Spreadsheet (standalone), masukkan ID Spreadsheet Anda ke variabel `SPREADSHEET_ID` di `code.gs`.

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
2. Cari **Blogger API**, pilih versi v3, dan klik **Add/Tambah**.

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
4. Di **Dashboard**, Anda bisa melihat daftar postingan Anda dan mengeditnya sewaktu-waktu.
5. Gunakan tombol **+ Post Baru** untuk membuat konten jualan SEO otomatis.

---
**Fitur Unggulan:**
- **Otomatisasi SEO:** Deskripsi dan Label dibuat oleh AI.
- **Rotasi API Key:** Anti-limit jika salah satu key mencapai kuota.
- **Kompresi Gambar:** Gambar diperkecil di sisi pengunjung sebelum diunggah (lebih ringan).
- **CRUD Manager:** Simpan, Lihat, dan Edit data langsung dari satu halaman.
