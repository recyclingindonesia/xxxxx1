import sys
import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#4A5568"))

        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(36, 810, "PANDUAN BLUEPRINT & BUKU PETUNJUK OPERASIONAL OMNI GENESIS M3 PWA")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(36, 802, 576, 802)

        # Footer
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#718096"))
        self.drawString(36, 25, "OMNI GENESIS M3 PWA — Sistem CRM & Marketing Automation Otonom Client-Side")
        page_text = f"Halaman {self._pageNumber} dari {page_count}"
        self.drawRightString(576, 25, page_text)
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(36, 35, 576, 35)

        self.restoreState()

def build_pdf(filename="Blueprint_OMNI_GENESIS_M3_PWA.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom Palette
    PRIMARY = colors.HexColor("#1E3A8A")    # Deep Navy
    SECONDARY = colors.HexColor("#0D9488")  # Teal Accent
    DARK_TEXT = colors.HexColor("#0F172A")  # Slate 900
    LIGHT_BG = colors.HexColor("#F8FAFC")   # Slate 50
    CARD_BG = colors.HexColor("#F1F5F9")    # Slate 100
    ACCENT = colors.HexColor("#2563EB")     # Royal Blue
    BORDER = colors.HexColor("#E2E8F0")

    # Custom Paragraph Styles
    styles.add(ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=PRIMARY,
        spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=SECONDARY,
        spaceAfter=15
    ))
    styles.add(ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        'SubSectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=SECONDARY,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=DARK_TEXT,
        spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=DARK_TEXT,
        leftIndent=12,
        spaceAfter=4
    ))
    styles.add(ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#1E293B")
    ))
    styles.add(ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white,
        alignment=1
    ))
    styles.add(ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=DARK_TEXT
    ))

    story = []

    # --- COVER / HEADER BANNER ---
    header_data = [
        [
            Paragraph("<b>BLUEPRINT OPERASIONAL & MANUAL PENGGUNA</b><br/><font size=18 color='#1E3A8A'><b>OMNI GENESIS M3 PWA</b></font>", styles['DocTitle']),
        ],
        [
            Paragraph("Sistem CRM Otonom, Prospeksi Cerdas, & Dispatcher Outreach Berbasis Gemini AI (Client-Side Local First)", styles['DocSubtitle'])
        ]
    ]
    header_table = Table(header_data, colWidths=[540])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER),
        ('PADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,1), (-1,1), 10),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 10))

    # EXECUTIVE SUMMARY
    story.append(Paragraph("1. Ringkasan Eksekutif & Gambaran Umum Sistem", styles['SectionHeader']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=2, spaceAfter=8))

    summary_p1 = (
        "<b>OMNI GENESIS M3 PWA</b> adalah platform otomatisasi pemasaran outbound dan manajemen hubungan pelanggan (CRM) "
        "otonom yang mengintegrasikan kecerdasan buatan <b>Gemini AI</b> langsung dalam lingkungan Progressive Web App (PWA) "
        "berbasis <i>Client-Side Local-First</i>. Sistem ini dirancang untuk memfasilitasi bisnis B2B dan B2C dalam "
        "menjalankan pencarian prospek (lead generation), penyusunan naskah penawaran tersuai (copywriting), hingga "
        "pengiriman pesan massal terotomatisasi secara aman, etis, dan bebas hambatan privasi."
    )
    story.append(Paragraph(summary_p1, styles['CustomBody']))

    summary_p2 = (
        "Dengan arsitektur terisolasi (sandbox) di browser pengguna, data kontak pribadi dan riwayat interaksi tersimpan "
        "100% secara lokal (IndexedDB/LocalStorage), memastikan proteksi privasi mutlak tanpa ketergantungan pada server pihak ketiga."
    )
    story.append(Paragraph(summary_p2, styles['CustomBody']))

    # ARSITEKTUR FILOSOFI 4 LAYER
    story.append(Spacer(1, 6))
    story.append(Paragraph("2. Arsitektur Filosofi 4 Layer (Struktur Sistem)", styles['SectionHeader']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=2, spaceAfter=8))

    arch_data = [
        [Paragraph("<b>Layer / Lapisan</b>", styles['TableHeader']), Paragraph("<b>Nama & Komponen</b>", styles['TableHeader']), Paragraph("<b>Fungsi Utama & Deskripsi Operational</b>", styles['TableHeader'])],
        [
            Paragraph("<b>Layer 1</b>", styles['TableCell']),
            Paragraph("<b>Ideologi</b><br/>(Etis & Skalabel)", styles['TableCell']),
            Paragraph("Landasan etika pemasaran tanpa spam liar. AI memastikan penawaran highly-relevant, personal, dan menghormati privasi calon pelanggan.", styles['TableCell'])
        ],
        [
            Paragraph("<b>Layer 2</b>", styles['TableCell']),
            Paragraph("<b>Strategi</b><br/>(Ringan & Resilien)", styles['TableCell']),
            Paragraph("Modul pencarian prospek presisi (Miner) dan pencernaan profil bisnis (Ingest Dokumen). Menghasilkan lead terverifikasi dengan beban server minimal.", styles['TableCell'])
        ],
        [
            Paragraph("<b>Layer 3</b>", styles['TableCell']),
            Paragraph("<b>Eksekusi</b><br/>(Mantra & Tuyul)", styles['TableCell']),
            Paragraph("Kombinasi Studio Copywriting AI (Mantra AI) untuk pembuat naskah adaptif dan Outbox (Tuyul Dispatcher) untuk penyiaran sekuensial aman.", styles['TableCell'])
        ],
        [
            Paragraph("<b>Layer 4</b>", styles['TableCell']),
            Paragraph("<b>Operator</b><br/>(Mandor & JAGAN)", styles['TableCell']),
            Paragraph("Pusat kendali operasional (Mandor Tower), audit kualitas data, pembersihan otomatis, serta protokol pengamanan otomatisasi (Lapis JAGAN Guardrail).", styles['TableCell'])
        ],
    ]
    arch_table = Table(arch_data, colWidths=[60, 110, 370])
    arch_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, LIGHT_BG]),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(arch_table)

    # MODUL DETAIL
    story.append(Spacer(1, 10))
    story.append(Paragraph("3. Panduan Detail Fitur & Modul Utama OMNI GENESIS M3 PWA", styles['SectionHeader']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=2, spaceAfter=8))

    # Modul 1
    story.append(Paragraph("A. Ruang Ingest Dokumen & Identitas Bisnis (Mode Pemalas Cerdas)", styles['SubSectionHeader']))
    story.append(Paragraph("Ruang Ingest Dokumen berfungsi sebagai pusat data tunggal untuk membekali AI Gemini dengan profil lengkap bisnis Anda agar naskah penawaran yang dihasilkan akurat dan natural.", styles['CustomBody']))
    story.append(Paragraph("• <b>Melatih Identitas Bisnis:</b> Menyimpan Nama Usaha, Value Proposition, Niche Industri, Alamat Operasional, Website, dan Gaya Bahasa.", styles['BulletText']))
    story.append(Paragraph("• <b>Mode Pemalas Cerdas (Ekstraksi Otomatis):</b> Cukup menempelkan (paste) teks mentah dari bio Instagram, profil Google Maps, artikel website, atau rangkuman chat WA. AI Gemini membedah teks dan menginput bidang identitas otomatis.", styles['BulletText']))
    story.append(Paragraph("• <b>Unggah Dokumen PDF/Brosur:</b> Mendukung analisis profil perusahaan dalam format PDF.", styles['BulletText']))
    story.append(Paragraph("• <b>Penetapan Tujuan Penawaran (Offer Goal):</b> AI merekomendasikan target penawaran yang kemudian disinkronkan ke seluruh sistem CRM dan templat pesan.", styles['BulletText']))

    # Modul 2
    story.append(Paragraph("B. Modul Miner (Pusat Penambangan & Ekstraksi Prospek)", styles['SubSectionHeader']))
    story.append(Paragraph("Modul Miner berfungsi mengumpulkan data calon pelanggan (B2B/B2C) secara otonom dari berbagai sumber masukan:", styles['CustomBody']))
    story.append(Paragraph("• <b>Link Maps & Web:</b> Membedah link Google Maps (nama, HP/WA, alamat, rating) atau URL website umum dengan isolasi keamanan (Lapis JAGAN) untuk mencegah injeksi skrip berbahaya.", styles['BulletText']))
    story.append(Paragraph("• <b>Foto AI (OCR - Gemini Vision):</b> Membaca foto kartu nama, spanduk toko, brosur cetak, atau screenshot untuk diekstrak menjadi struktur data digital (Nama, WA, Alamat, Kategori).", styles['BulletText']))
    story.append(Paragraph("• <b>Cari Area AI & Peta Radar Geografis:</b> Memetakan koordinat GPS lokasi usaha pengguna beserta sebaran prospek sekitar secara real-time, dilengkapi integrasi KML Tools & Google Street View.", styles['BulletText']))
    story.append(Paragraph("• <b>Paste Teks Mentah:</b> Memproses data kontak acak menjadi daftar prospek terstruktur.", styles['BulletText']))

    # Modul 3
    story.append(Paragraph("C. Studio Copywriting AI (Mantra AI & Lapis Hantu)", styles['SubSectionHeader']))
    story.append(Paragraph("Modul Studio bertindak sebagai mesin pembuat naskah penawaran yang persuasif, adaptif, dan bebas dari deteksi spam:", styles['CustomBody']))
    story.append(Paragraph("• <b>Generator Mantra AI:</b> Merumuskan naskah cold-outreach WhatsApp/SMS berdasarkan profil bisnis di Ingest Dokumen, target audiens, dan Offer Goal.", styles['BulletText']))
    story.append(Paragraph("• <b>Variabel Tag Dinamis:</b> Mendukung tag otomatis seperti <code>[NAMA_TOKO]</code>, <code>[ALAMAT]</code>, <code>[KATEGORI]</code>, dan <code>[WAKTU_SAPAAN]</code>.", styles['BulletText']))
    story.append(Paragraph("• <b>Adaptasi Bahasa & Dialek Lokal:</b> Pengaturan sapaan otomatis berbasis waktu dan dialek daerah (Indonesia Santai, Formal, Jawa Ngoko, Sugeng Enjang/Siang, dll.).", styles['BulletText']))
    story.append(Paragraph("• <b>Anti-Blokir Spintax:</b> Format Pengacak kata <code>{Halo|Hai|Selamat Pagi}</code> untuk memastikan setiap pesan unik dan tidak terdeteksi robot.", styles['BulletText']))

    # Modul 4
    story.append(Paragraph("D. Outbox Dispatcher (Broadcasting Otonom & Lapis Tuyul)", styles['SubSectionHeader']))
    story.append(Paragraph("Outbox adalah pusat eksekusi penyiaran pesan penawaran outbound:", styles['CustomBody']))
    story.append(Paragraph("• <b>Pengiriman Sekuensial Terkontrol (Lapis Tuyul):</b> Mengatur jeda pengiriman (delay) acak antar pesan untuk menghindari rate-limiting dan pemblokiran nomor.", styles['BulletText']))
    story.append(Paragraph("• <b>Personalisasi Instan:</b> Menggabungkan templat Studio dengan atribut prospek dari Miner secara otomatis sebelum pesan terkirim.", styles['BulletText']))
    story.append(Paragraph("• <b>Integrasi Saluran Komunikasi:</b> Terhubung langsung ke WhatsApp API / Web Intent untuk penjangkauan cepat.", styles['BulletText']))

    # Modul 5
    story.append(Paragraph("E. Modul Lokal (Buku Kontak Privasi & Mode Sandbox 100%)", styles['SubSectionHeader']))
    story.append(Paragraph("Lingkungan terisolasi di perangkat client-side untuk mengelola kontak internal atau pribadi:", styles['CustomBody']))
    story.append(Paragraph("• <b>Proteksi Privasi 100%:</b> Data tersimpan murni di memori browser (IndexedDB) tanpa pernah diunggah ke cloud server manapun.", styles['BulletText']))
    story.append(Paragraph("• <b>Android Contact Picker API & Google Contacts:</b> Pengambilan kontak langsung dari buku alamat HP atau impor Google Contacts.", styles['BulletText']))
    story.append(Paragraph("• <b>Pemisahan Database:</b> Mencegah kontak pribadi bercampur dengan database bisnis di modul Miner.", styles['BulletText']))

    # Modul 6
    story.append(Paragraph("F. Mandor Control Tower (Audit, Lead Scoring, & Auto-Undo)", styles['SubSectionHeader']))
    story.append(Paragraph("Pusat pengawasan kinerja dan kesehatan basis data CRM:", styles['CustomBody']))
    story.append(Paragraph("• <b>360° Metrics & Database Health:</b> Memantau skor kevalidan kontak, deduplikasi nomor ganda, dan latensi sistem.", styles['BulletText']))
    story.append(Paragraph("• <b>Aksi Cepat Pembersihan Data:</b> Sekali klik untuk menghapus duplikat atau menyaring prospek tanpa nomor kontak.", styles['BulletText']))
    story.append(Paragraph("• <b>Autonomous Undo & Snapshot:</b> Otomatis membuat cadangan sementara sebelum eksekusi besar sehingga data dapat dipulihkan jika ada kesalahan.", styles['BulletText']))
    story.append(Paragraph("• <b>Vault Backup & Restore:</b> Ekspor dan impor snapshot lengkap seluruh database dalam format file `.json` terenkripsi.", styles['BulletText']))

    # Modul 7 & 8
    story.append(Paragraph("G. Modul Seting, Radar Mesin AI, & Protokol JAGAN", styles['SubSectionHeader']))
    story.append(Paragraph("• <b>Rotasi API Key Gemini (Load Balancing):</b> Mendukung hingga 5+ API Key pribadi untuk failover otomatis saat kuota/rate limit tercapai.", styles['BulletText']))
    story.append(Paragraph("• <b>Modus Otonomi JAGAN Protocol:</b>", styles['BulletText']))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;- <i>Guardrail Mode (Default):</i> AI menampilkan kartu konfirmasi sebelum mengeksekusi aksi sensitif.", styles['BulletText']))
    story.append(Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;- <i>Fast-Track Mode:</i> Eksekusi otomatis serba cepat tanpa menghentikan proses.", styles['BulletText']))
    story.append(Paragraph("• <b>Integrasi External CRM & Webhook:</b> Meneruskan data prospek baru via HTTP POST ke Make.com, Zapier, n8n, atau Google Sheets.", styles['BulletText']))

    story.append(Paragraph("H. Header Toolbar, Vacuum RAM, & CS Voice AI", styles['SubSectionHeader']))
    story.append(Paragraph("• <b>CS Voice AI:</b> Asisten suara interaktif untuk panduan navigasi dan konsultasi pengoperasian sistem.", styles['BulletText']))
    story.append(Paragraph("• <b>Vacuum RAM:</b> Pembersihan memori browser seketika tanpa perlu reload halaman untuk menjaga PWA tetap responsif.", styles['BulletText']))
    story.append(Paragraph("• <b>Kredit AI Balance:</b> Memantau penggunaan token/kredit AI Gemini secara real-time.", styles['BulletText']))

    story.append(PageBreak())

    # TENTANG KOLABORASI WORKSPACE
    story.append(Paragraph("4. Manajemen Kolaborasi Tim & Multi-Tenant Workspace", styles['SectionHeader']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=2, spaceAfter=8))

    collab_text = (
        "<b>OMNI GENESIS M3 PWA</b> mendukung kerja tim multi-user tanpa perlu infrastruktur server rumit. "
        "Melalui penggunaan <b>Sync Key (Kunci Sinkronisasi)</b>, beberapa perangkat dapat terhubung ke ruang kerja cloud "
        "(seperti <i>tim-alfa-2026</i>) untuk berbagi daftar prospek, templat pesan, dan riwayat outreach secara real-time.<br/><br/>"
        "<b>Fitur Utama Kolaborasi:</b><br/>"
        "1. <b>Tautan Undangan Kolaborator:</b> Menyalin tautan workspace yang otomatis memuat seluruh data saat dibuka oleh tim.<br/>"
        "2. <b>Integrasi Google Sheets:</b> Menghubungkan Google Spreadsheet publik sebagai pusat data bersama untuk tim pemasaran.<br/>"
        "3. <b>Mode Clean State (<code>?clean=true</code>):</b> Bagikan tautan bersih untuk pengguna/klien baru tanpa mengganggu workspace utama.<br/>"
        "4. <b>Ruang Obrolan Tim Internal:</b> Kanal obrolan antar-operator untuk berbagi lead dan strategi copywriting secara langsung."
    )
    story.append(Paragraph(collab_text, styles['CustomBody']))

    # SOP OPERASIONAL LANGKAH DEMI LANGKAH
    story.append(Spacer(1, 10))
    story.append(Paragraph("5. Standar Prosedur Operasional (SOP) Langkah Demi Langkah", styles['SectionHeader']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=2, spaceAfter=8))

    sop_data = [
        [Paragraph("<b>Langkah</b>", styles['TableHeader']), Paragraph("<b>Modul</b>", styles['TableHeader']), Paragraph("<b>Aktivitas Operasional</b>", styles['TableHeader']), Paragraph("<b>Hasil / Output</b>", styles['TableHeader'])],
        [
            Paragraph("<b>1</b>", styles['TableCell']),
            Paragraph("<b>Seting / Ingest</b>", styles['TableCell']),
            Paragraph("Input API Key Gemini & tempel deskripsi bisnis di Ruang Ingest Dokumen (Gunakan Mode Pemalas Cerdas).", styles['TableCell']),
            Paragraph("Profil bisnis & Offer Goal AI terkonfigurasi.", styles['TableCell'])
        ],
        [
            Paragraph("<b>2</b>", styles['TableCell']),
            Paragraph("<b>Miner Engine</b>", styles['TableCell']),
            Paragraph("Lakukan penambangan prospek via Link Maps, Foto AI (OCR), atau Cari Area Geografis di Peta Radar.", styles['TableCell']),
            Paragraph("Daftar prospek B2B/B2C masuk ke database.", styles['TableCell'])
        ],
        [
            Paragraph("<b>3</b>", styles['TableCell']),
            Paragraph("<b>Mandor Tower</b>", styles['TableCell']),
            Paragraph("Jalankan 'Bersihkan Duplikat' & 'Saring Kontak Tanpa HP' untuk audit kualitas data.", styles['TableCell']),
            Paragraph("Database prospek bersih & terverifikasi.", styles['TableCell'])
        ],
        [
            Paragraph("<b>4</b>", styles['TableCell']),
            Paragraph("<b>Studio AI</b>", styles['TableCell']),
            Paragraph("Generate naskah penawaran dengan Mantra AI, tambahkan Spintax `{Halo|Hai}` & Dynamic Tags.", styles['TableCell']),
            Paragraph("Templat copywriting siap broadcast.", styles['TableCell'])
        ],
        [
            Paragraph("<b>5</b>", styles['TableCell']),
            Paragraph("<b>Outbox</b>", styles['TableCell']),
            Paragraph("Atur delay jeda pengiriman (Lapis Tuyul), lalu eksekusi broadcast penawaran ke prospek.", styles['TableCell']),
            Paragraph("Pesan penawaran terikirim otomatis & aman.", styles['TableCell'])
        ],
        [
            Paragraph("<b>6</b>", styles['TableCell']),
            Paragraph("<b>Mandor & Local</b>", styles['TableCell']),
            Paragraph("Pantau grafik konversi di Mandor Tower, kelola kontak yang merespons di modul Lokal, dan simpan Vault Backup JSON.", styles['TableCell']),
            Paragraph("Laporan kinerja & data aman terenkripsi.", styles['TableCell'])
        ],
    ]
    sop_table = Table(sop_data, colWidths=[40, 80, 240, 180])
    sop_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, LIGHT_BG]),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(sop_table)

    # GLOSARIUM LAPISAN FILOSOFI
    story.append(Spacer(1, 10))
    story.append(Paragraph("6. Glosarium Lapisan Strategi & Istilah Sistem", styles['SectionHeader']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=2, spaceAfter=8))

    glos_data = [
        [Paragraph("<b>Istilah Sistem</b>", styles['TableHeader']), Paragraph("<b>Penjelasan Konseptual & Teknis</b>", styles['TableHeader'])],
        [
            Paragraph("<b>Lapis JAGAN (Guardrail)</b>", styles['TableCell']),
            Paragraph("Protokol perlindungan keselamatan sistem. Memvalidasi skrip luar, mencegah injeksi kode, dan memberikan gerbang konfirmasi sebelum tindakan eksekusi besar.", styles['TableCell'])
        ],
        [
            Paragraph("<b>Lapis HANTU (Copywriting)</b>", styles['TableCell']),
            Paragraph("Strategi penyusunan naskah pesan adaptif menggunakan Gemini AI dan Spintax agar pesan tidak terasa seperti hasil ketikan robot atau spam.", styles['TableCell'])
        ],
        [
            Paragraph("<b>Lapis TUYUL (Otomatisasi)</b>", styles['TableCell']),
            Paragraph("Mesin pengatur jeda antrean pengiriman pesan secara sekuensial dan terukur di Outbox untuk menghindari pemblokiran nomor.", styles['TableCell'])
        ],
        [
            Paragraph("<b>Lapis BESI (SOP Sekuensial)</b>", styles['TableCell']),
            Paragraph("Rangkaian alur kerja operasional terstandarisasi yang memastikan proses dari penambangan data hingga penutupan transaksi berjalan rapi.", styles['TableCell'])
        ],
        [
            Paragraph("<b>Lapis TIKUS (Resiliensi Offline)</b>", styles['TableCell']),
            Paragraph("Daya tahan sistem terhadap kegagalan koneksi internet dengan mengandalkan penyimpanan local-first (IndexedDB) dan penyelarasan otomatis saat kembali online.", styles['TableCell'])
        ],
    ]
    glos_table = Table(glos_data, colWidths=[130, 410])
    glos_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), SECONDARY),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, LIGHT_BG]),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(glos_table)

    # Footer note
    story.append(Spacer(1, 15))
    footer_note = (
        "<b>Catatan Penutup:</b> Dokumentasi Blueprint OMNI GENESIS M3 PWA ini disusun sebagai petunjuk teknis "
        "resmi bagi seluruh operator, pengembang, dan tim pemasaran. Selalu gunakan sistem secara etis dan patuhi "
        "pedoman privasi data dalam setiap kegiatan komunikasi bisnis."
    )
    story.append(Paragraph(footer_note, styles['CalloutText']))

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated: {filename}")

if __name__ == "__main__":
    build_pdf()
