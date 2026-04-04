# Proyek: Blogger OmniPost Pro (Hybrid SEO Generator)

## Kebutuhan yang Dikonfirmasi:
1. **Frontend (Single Page Application)**:
   - Form Pendaftaran (Legalitas Pengirim).
   - Form Postingan: Judul, Harga, Deskripsi, Alamat.
   - Kompresi Gambar: Menggunakan Canvas (client-side) agar ringan/cepat.
   - Alt Text otomatis pada gambar.
   - Sistem Akses Password: Untuk memanggil data user dari Spreadsheet/LocalStorage.
   - 1 Postingan untuk 1 Pengunjung.
   - Data tersimpan di Spreadsheet dan LocalStorage (bisa diedit kembali).

2. **Backend (Google Apps Script)**:
   - Manajemen API Key AI: Rotasi otomatis beberapa API Key (Gemini) jika limit tercapai.
   - AI SEO: Menghasilkan deskripsi dan label otomatis yang SEO friendly.
   - Spreadsheet Storage: Menyimpan data pendaftaran, JSON-ID, dan detail postingan.
   - Blogger Integration: Membuat postingan dengan judul max 150 karakter, label otomatis, dan JSON-ID.
   - Optimasi Gambar: Gambar tidak disimpan di Drive, diproses langsung ke konten.
