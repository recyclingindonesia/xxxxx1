# Panduan OmniPost Pro // OMNI GENESIS Edition

Selamat datang di **OMNI GENESIS v22.4**, sistem Hybrid SEO Generator tercanggih untuk Blogger. Dashboard ini menggabungkan manajemen penjualan profesional (Sales Vault) dengan mesin otomatisasi konten (Atom Core).

## 1. Persiapan Backend (Google Apps Script)
1. Buat Google Spreadsheet baru. ID Spreadsheet Anda adalah: `1NgDZ6fzz30wH9pElVwoSepkkkPd73mmccl2WRCIyZ7A`.
2. Buka **Extensions** > **Apps Script**.
3. Salin kode dari `code.gs` ke editor.
4. Di Editor, klik ikon **+ (Services)** di sebelah kiri, tambahkan **Blogger API v3**.
5. Klik **Deploy** > **New Deployment** > **Web App**.
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Salin **Web App URL** yang dihasilkan.

## 2. Inisialisasi Sistem
1. Buka `index.html` di browser Anda.
2. Karena ini adalah pertama kali, sistem akan berada di layar **Access Protocol**.
3. Klik **System Config** (ikon roda gigi di pojok kiri bawah atau lewat menu pengaturan).
4. Masukkan konfigurasi berikut:
   - **Target Blogspot Domain**: Alamat blog Anda (misal: `toko-honda.blogspot.com`).
   - **Bridge Interface (GAS URL)**: Masukkan URL Web App yang Anda salin di langkah sebelumnya.
   - **Gemini Master Keys**: Masukkan satu atau beberapa API Key Gemini (satu per baris). Dapatkan di [Google AI Studio](https://aistudio.google.com/).
   - **Blogger Blog ID**: Masukkan ID blog Anda.
5. Klik **Commit Changes**.

## 3. Modul OMNI GENESIS
### 🛰️ Dashboard
Pusat kontrol untuk melihat statistik inventaris penjualan dan jumlah konten SEO yang telah diproduksi.

### 🔒 Sales Vault (Individual CRUD)
Gunakan modul ini untuk posting jualan manual. Dilengkapi fitur **AI Synthesize** untuk membuat deskripsi produk otomatis berdasarkan judul, harga, dan lokasi. Gambar akan otomatis dikompres ke lebar 400px untuk memastikan penyimpanan optimal di Google Sheets.

### 🏛️ Architect
Editor artikel AI tunggal. Masukkan topik, dan AI akan menyintesis artikel lengkap dengan format Markdown yang siap dipublikasikan.

### ⚔️ War Room (Tuyul Ideation)
Mesin ideasi massal. Masukkan satu kata kunci (Seed), dan biarkan AI "Tuyul" menyarankan 10 jenis layanan dan 10 lokasi target di Indonesia. Klik **Construct Attack Vectors** untuk membuat kombinasi massal (hingga 100 kombinasi sekaligus).

### ⚛️ Atom Core (Automation Loop)
Pusat eksekusi otomatis. Setelah antrean (queue) dibuat di War Room, modul ini akan menjalankan loop otomatis untuk menulis artikel SEO satu per satu dan mempublikasikannya ke Blogger sesuai interval waktu yang Anda tentukan.

## 4. Keamanan & Data
- **Enkripsi Lokal**: Semua pengaturan (API Key, URL, ID) disimpan di browser Anda menggunakan Base64.
- **Isolasi Operator**: Setiap operator menggunakan password unik. Data postingan di Spreadsheet dipisahkan berdasarkan password tersebut, sehingga satu spreadsheet bisa digunakan oleh banyak orang tanpa data tertukar.
- **Image Optimization**: Sistem secara otomatis mengoptimalkan gambar agar tetap di bawah batas 50.000 karakter sel Google Sheets.

---
*OmniPost Pro - Genesis Edition // Hybrid SEO Evolution*
