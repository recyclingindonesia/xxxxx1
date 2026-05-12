// ==========================================
// OMNI v31.3 Backend - OTAK (General Ledger Edition)
// FULL SYSTEM: INVOICE PDF, EMAIL DISTRIBUTOR & AUTO-MITIGASI
// Layer: OTAK, TIKUS (PDF Fix), TUYUL, LABA-LABA, JAGAN, MANTRA, HANTU
// ==========================================

// ------------------------------------------
// 1. AREA KONFIGURASI UTAMA (NGOPREK)
// ------------------------------------------
const MASTER_PIN = "778899"; // PIN Keamanan Aplikasi (JAGAN)
const GEMINI_API_KEY = "AIzaSyDoqhYUlGejcyiI1Na1DaGPwRTqxmsP-SQ"; // API Key Gemini Anda

const FOLDER_INVOICE_ID = "1Zg3WgGvq5vBnvjTIuSScWWFr2EevRY_a";
const TEMPLATE_DOC_ID = "101wSB_0PSNaqKb8W13fncA3w5Yi3Mtf8pRZ7XKBxxiM";
const EMAIL_ADMIN = "recyclingindonesia@gmail.com, newpinabudiarti84@gmail.com";

// ------------------------------------------
// 2. ROUTER API (Penghubung Web App <-> Database)
// ------------------------------------------
function doGet(e) {
  const action = (e && e.parameter) ? e.parameter.action : null;
  const pinInput = (e && e.parameter) ? e.parameter.pin : null;

  // Global check for GET actions that need PIN
  const actionsRequiringPin = ['getData', 'getHistory', 'add', 'pay', 'edit', 'checkout', 'addExpense'];
  if (actionsRequiringPin.indexOf(action) !== -1) {
    if (pinInput !== MASTER_PIN) {
      return ContentService.createTextOutput(JSON.stringify({ error: "[ SYSTEM_LOCK ]: AKSES DITOLAK! PIN SALAH." })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  if (action === 'getData') {
    return ContentService.createTextOutput(JSON.stringify(getTenantData())).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'getHistory') {
    return ContentService.createTextOutput(JSON.stringify(getHistoryData())).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'getAIPesan') {
    const pesanCerdas = racikPesanAI(e.parameter.nama, e.parameter.kamar, e.parameter.sisa);
    return ContentService.createTextOutput(JSON.stringify({ pesan: pesanCerdas })).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'add') {
    return ContentService.createTextOutput(JSON.stringify({ message: addTenant(e.parameter.kamar, e.parameter.nama, e.parameter.wa, e.parameter.siklus, e.parameter.tgl, e.parameter.emailTenant, e.parameter.nominal) })).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'pay') {
    return ContentService.createTextOutput(JSON.stringify({ message: confirmPayment(e.parameter.kamar, e.parameter.bayarBulan, e.parameter.nominal) })).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'edit') {
    return ContentService.createTextOutput(JSON.stringify({ message: editTenant(e.parameter.kamar, e.parameter.nama, e.parameter.wa, e.parameter.emailTenant, e.parameter.tempo, e.parameter.siklus) })).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'checkout') {
    return ContentService.createTextOutput(JSON.stringify({ message: checkoutTenant(e.parameter.kamar) })).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'addExpense') {
    return ContentService.createTextOutput(JSON.stringify({ message: addExpense(e.parameter.kat, e.parameter.nominal, e.parameter.ket) })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "API OMNI v31.3 Online & Ready!" })).setMimeType(ContentService.MimeType.JSON);
}

// ------------------------------------------
// 3. CORE ENGINE & AUTO-BUILDER
// ------------------------------------------
function pastikanDatabaseAman() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheetKos = ss.getSheetByName('DataKos');
  if (!sheetKos) {
    sheetKos = ss.insertSheet('DataKos');
    sheetKos.appendRow(['ID/KM', 'NAMA PENGHUNI', 'WHATSAPP', 'SIKLUS (BLN)', 'JATUH TEMPO', 'EMAIL PENGHUNI']);
    sheetKos.getRange("A1:F1").setFontWeight("bold").setBackground("#cccccc");
  }
  let sheetRiwayat = ss.getSheetByName('RiwayatPembayaran');
  if (!sheetRiwayat) {
    sheetRiwayat = ss.insertSheet('RiwayatPembayaran');
    sheetRiwayat.appendRow(['WAKTU TRANSAKSI', 'KAMAR', 'NAMA PENGHUNI', 'DURASI (BULAN)', 'NOMINAL UANG (Rp)']);
    sheetRiwayat.getRange("A1:E1").setFontWeight("bold").setBackground("#d9ead3");
  }
  return { sheetKos, sheetRiwayat };
}

function hitungJatuhTempo(tglAwal, tambahBulan) {
  let d = new Date(tglAwal);
  let bulanTarget = (d.getMonth() + parseInt(tambahBulan)) % 12;
  d.setMonth(d.getMonth() + parseInt(tambahBulan));
  if (d.getMonth() !== bulanTarget) d.setDate(0);
  return d;
}

function getTenantData() {
  const db = pastikanDatabaseAman();
  const data = db.sheetKos.getDataRange().getValues();
  data.shift();
  const today = new Date(); today.setHours(0,0,0,0);

  return data.map(row => {
    if(!row[0]) return null;
    let isKosong = (row[1] === "KOSONG" || !row[1]);

    if (isKosong) {
      return {
        kamar: row[0], nama: "KOSONG", wa: "-", jatuhTempo: "-", sisaHari: 0, status: "KOSONG", emailTenant: "-", tempoAsli: "", siklus: "1"
      };
    }

    let nextDue = new Date(row[4]);
    let timeDiff = nextDue.getTime() - today.getTime();
    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let statusStr = 'AMAN';
    if (dayDiff < 0) statusStr = 'OVERDUE';
    else if (dayDiff <= 3) statusStr = 'URGENT';
    else if (dayDiff <= 7) statusStr = 'WARNING';

    // Format YYYY-MM-DD for HTML input
    let tempoAsli = "";
    try {
       tempoAsli = nextDue.toISOString().split('T')[0];
    } catch(e) {}

    return {
      kamar: row[0], nama: row[1], wa: row[2],
      jatuhTempo: nextDue.toLocaleDateString('id-ID'),
      tempoAsli: tempoAsli,
      sisaHari: dayDiff, status: statusStr, emailTenant: row[5] || "",
      siklus: row[3] ? String(row[3]) : "1"
    };
  }).filter(item => item !== null);
}

function getHistoryData() {
  const db = pastikanDatabaseAman();
  const data = db.sheetRiwayat.getDataRange().getValues();
  data.shift();

  // Sort by date descending
  return data.map(row => {
    let waktuRaw = row[0];
    let waktuTeks = "";
    if (waktuRaw instanceof Date) {
      waktuTeks = waktuRaw.toLocaleString('id-ID');
    } else {
      waktuTeks = String(waktuRaw);
      // Attempt to parse if it's a string
      waktuRaw = new Date(waktuRaw);
    }

    return {
      waktu_raw: waktuRaw,
      waktu_teks: waktuTeks,
      kamar: row[1],
      nama: row[2],
      siklus: row[3],
      nominal: row[4]
    };
  }).reverse();
}

function addTenant(kamar, nama, wa, siklus, tgl, emailTenant, nominalAwal) {
  const db = pastikanDatabaseAman();
  let jatuhTempoAwal = hitungJatuhTempo(tgl, siklus);
  db.sheetKos.appendRow([kamar, nama, wa, siklus, jatuhTempoAwal, emailTenant || "-"]);

  let nominalUang = nominalAwal ? parseInt(nominalAwal) : 0;
  let timestamp = new Date();
  db.sheetRiwayat.appendRow([timestamp, kamar, nama, siklus, nominalUang]);

  return `Sukses! Penghuni ${nama} (Kamar ${kamar}) berhasil ditambahkan ke sistem.`;
}

function editTenant(kamar, nama, wa, email, tempo, siklus) {
  const db = pastikanDatabaseAman();
  const data = db.sheetKos.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == kamar) {
      db.sheetKos.getRange(i + 1, 2).setValue(nama);
      db.sheetKos.getRange(i + 1, 3).setValue(wa);
      db.sheetKos.getRange(i + 1, 4).setValue(siklus);
      db.sheetKos.getRange(i + 1, 5).setValue(new Date(tempo));
      db.sheetKos.getRange(i + 1, 6).setValue(email || "-");
      return `Sukses! Data Kamar ${kamar} (${nama}) telah diperbarui.`;
    }
  }
  return `[ ERROR ]: Kamar ${kamar} tidak ditemukan.`;
}

function checkoutTenant(kamar) {
  const db = pastikanDatabaseAman();
  const data = db.sheetKos.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == kamar) {
      let namaLama = data[i][1];
      db.sheetKos.getRange(i + 1, 2).setValue("KOSONG");
      db.sheetKos.getRange(i + 1, 3).setValue("-");
      db.sheetKos.getRange(i + 1, 5).setValue(""); // Reset tempo
      db.sheetKos.getRange(i + 1, 6).setValue("-");

      // Catat ke riwayat
      db.sheetRiwayat.appendRow([new Date(), kamar, "CHECKOUT", namaLama, 0]);

      return `Sukses! Kamar ${kamar} kini telah dikosongkan.`;
    }
  }
  return `[ ERROR ]: Kamar ${kamar} tidak ditemukan.`;
}

function addExpense(kat, nominal, ket) {
  const db = pastikanDatabaseAman();
  let timestamp = new Date();
  // Di backend, ket -> nama, kat -> siklus (sesuai logika frontend render)
  // sheetRiwayat: ['WAKTU TRANSAKSI', 'KAMAR', 'NAMA PENGHUNI', 'DURASI (BULAN)', 'NOMINAL UANG (Rp)']
  db.sheetRiwayat.appendRow([timestamp, "PENGELUARAN", ket, kat, -Math.abs(parseInt(nominal))]);
  return `Sukses! Pengeluaran "${ket}" sebesar Rp ${parseInt(nominal).toLocaleString('id-ID')} telah dicatat.`;
}

// ------------------------------------------
// 4. MODUL INVOICE & EMAIL (TUYUL & LABA-LABA)
// ------------------------------------------
function confirmPayment(noKamar, bayarBulan, nominal) {
  const db = pastikanDatabaseAman();
  const data = db.sheetKos.getDataRange().getValues();
  let namaPenghuni = "Unknown";
  let emailPenghuni = "";

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == noKamar) {
      namaPenghuni = data[i][1];
      emailPenghuni = data[i][5];

      let cycle = bayarBulan ? parseInt(bayarBulan) : parseInt(data[i][3]);
      let nominalUang = nominal ? parseInt(nominal) : 0;
      let oldDue = data[i][4] instanceof Date ? new Date(data[i][4]) : new Date();
      let nextDue = hitungJatuhTempo(oldDue, cycle);
      let timestamp = new Date();
      let tglStr = timestamp.toLocaleDateString('id-ID');

      // Update Database
      db.sheetKos.getRange(i + 1, 5).setValue(nextDue);
      db.sheetRiwayat.appendRow([timestamp, noKamar, namaPenghuni, cycle, nominalUang]);

      let pesanSukses = `Data masuk: Kamar ${noKamar} (${namaPenghuni})\nJatuh Tempo baru: ${nextDue.toLocaleDateString('id-ID')}`;

      // Eksekusi Pembuatan PDF
      if(FOLDER_INVOICE_ID && TEMPLATE_DOC_ID) {
         let pdfFile = buatInvoicePDF(noKamar, namaPenghuni, nominalUang, cycle, tglStr);
         if(pdfFile) {
            let emailTerkirim = kirimInvoiceEmail(emailPenghuni, namaPenghuni, noKamar, pdfFile, nominalUang, tglStr);
            if(emailTerkirim) pesanSukses += `\n\n✅ PDF Invoice berhasil dibuat & dikirim ke Email!`;
            else pesanSukses += `\n\n⚠️ PDF Dibuat, tapi gagal kirim email (Email penghuni kosong/salah).`;
         } else {
            pesanSukses += `\n\n❌ Gagal membuat PDF. Pastikan folder & template ID benar.`;
         }
      }
      return pesanSukses;
    }
  }
  return `[ ERROR ]: Nomor Kamar ${noKamar} tidak ditemukan di database.`;
}

function buatInvoicePDF(kamar, nama, nominal, bulan, tanggal) {
  try {
    const folder = DriveApp.getFolderById(FOLDER_INVOICE_ID);
    const template = DriveApp.getFileById(TEMPLATE_DOC_ID);

    const fileName = `INV_KM${kamar}_${nama}_${tanggal.replace(/[\/\\]/g,'-')}`;
    const tempFile = template.makeCopy(fileName, folder);
    const tempDoc = DocumentApp.openById(tempFile.getId());
    const body = tempDoc.getBody();

    // Injeksi data
    body.replaceText("{{NAMA}}", nama);
    body.replaceText("{{KAMAR}}", kamar);
    body.replaceText("{{NOMINAL}}", "Rp " + nominal.toLocaleString('id-ID'));
    body.replaceText("{{BULAN}}", bulan + " Bulan");
    body.replaceText("{{TANGGAL}}", tanggal);

    tempDoc.saveAndClose();

    // 🔥 LAYER TIKUS: Solusi ampuh agar PDF tidak kosong.
    Utilities.sleep(3000);

    const pdfBlob = tempFile.getAs(MimeType.PDF);
    const savedPdf = folder.createFile(pdfBlob);
    tempFile.setTrashed(true);

    return savedPdf;
  } catch (e) {
    Logger.log("Error Pembuatan PDF: " + e.toString());
    return null;
  }
}

function kirimInvoiceEmail(emailTenant, nama, kamar, pdfFile, nominal, tanggal) {
  let isEmailSent = false;
  let subject = `🧾 Invoice Pembayaran Kos - Kamar ${kamar} (${nama})`;

  let bodyHTMLPenghuni = `
    <div style="font-family: Arial, sans-serif; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0ea5e9; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">Terima Kasih, ${nama}!</h2>
      </div>
      <div style="padding: 20px;">
        <p>Pembayaran kos Anda telah kami terima dan dicatat oleh sistem dengan rincian:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Kamar</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">${kamar}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Tanggal</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">${tanggal}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Nominal</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right; color: #059669; font-weight: bold;">Rp ${nominal.toLocaleString('id-ID')}</td></tr>
        </table>
        <p>File <strong>Invoice Resmi (PDF)</strong> telah kami lampirkan pada email ini untuk arsip Anda.</p>
        <br>
        <p style="margin-bottom: 0;">Salam Hangat,<br><strong>Pengelola Kos</strong></p>
      </div>
    </div>
  `;

  let attachments = [pdfFile.getAs(MimeType.PDF)];

  if (emailTenant && emailTenant.includes("@")) {
    try {
      MailApp.sendEmail({ to: emailTenant, subject: subject, htmlBody: bodyHTMLPenghuni, attachments: attachments });
      isEmailSent = true;
    } catch (e) { Logger.log("Gagal kirim ke penghuni: " + e.toString()); }
  }

  try {
    MailApp.sendEmail({
      to: EMAIL_ADMIN,
      subject: `[ARSIP MASUK] ${subject}`,
      htmlBody: `<p>Sistem OMNI telah berhasil menerbitkan invoice pembayaran untuk <b>${nama} (Kamar ${kamar})</b>. Arsip PDF terlampir.</p>`,
      attachments: attachments
    });
  } catch (e) { Logger.log("Gagal kirim ke admin: " + e.toString()); }

  return isEmailSent;
}

// ------------------------------------------
// 5. MODUL AI GEMINI & MITIGASI PENAGIHAN (MANTRA, HANTU, MEJA BUNDAR)
// ------------------------------------------
function tanyaGemini(promptTeks) {
  const pesanDefault = "Halo, sekadar mengingatkan untuk mengecek status tagihan kos Anda bulan ini. Terima kasih.";
  if (!GEMINI_API_KEY) return pesanDefault;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  const payload = { "contents": [{ "parts": [{ "text": promptTeks }] }] };
  const options = { "method": "post", "contentType": "application/json", "payload": JSON.stringify(payload), "muteHttpExceptions": true };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());
    if(json.error) return pesanDefault;
    if(json.candidates && json.candidates.length > 0) {
      let teksBalasan = json.candidates[0].content.parts[0].text.trim();
      return teksBalasan.replace(/\*/g, '');
    }
    return pesanDefault;
  } catch (e) { return pesanDefault; }
}

function racikPesanAI(nama, kamar, sisaHari) {
  let sisa = parseInt(sisaHari);
  let kondisi = sisa < 0 ? `Telat bayar ${Math.abs(sisa)} hari` : `Akan jatuh tempo dalam ${sisa} hari`;
  let prompt = `Kamu adalah pemilik kos di Semarang. Buat 1 pesan WhatsApp singkat (maks 25 kata) untuk menagih kos ke penghuni bernama ${nama} di Kamar ${kamar}. Kondisi saat ini: ${kondisi}. Gunakan bahasa yang sopan, akrab, tapi tegas. Langsung ke inti, tanpa basa-basi.`;
  return tanyaGemini(prompt);
}

function kirimEmailReport() {
  const data = getTenantData();
  let listTagihan = "";
  let countAction = 0;
  const hariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  data.forEach(item => {
    if (item.status === "KOSONG") return;
    if (item.sisaHari <= 7) {
      countAction++;
      let sisa = item.sisaHari;
      let isOverdue = sisa < 0;
      let teksStatus = isOverdue ? `NUNGGAK ${Math.abs(sisa)} HARI` : (sisa === 0 ? "HARI INI" : `H-${sisa}`);
      let warnaStatus = isOverdue ? '#ef4444' : (sisa === 0 ? '#f97316' : '#f59e0b');

      let pesanWA = racikPesanAI(item.nama, item.kamar, sisa);
      let urlWA = `https://wa.me/${item.wa}?text=${encodeURIComponent(pesanWA)}`;

      // AUTO-MITIGASI EMAIL KE PENGHUNI
      if ([7, 3, 1, 0, -1, -3, -7].includes(sisa)) {
        if (item.emailTenant && item.emailTenant.includes("@")) {
          let subjectPenghuni = "";
          let htmlBodyPenghuni = "";

          if (sisa > 0) {
            subjectPenghuni = `ℹ️ [INFO KOS] Pengingat Tagihan Kamar ${item.kamar} (H-${sisa})`;
            htmlBodyPenghuni = `<div style="font-family: Arial, sans-serif; color: #334155; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h3 style="color: #0ea5e9;">Halo ${item.nama},</h3>
              <p>Sekadar mengingatkan bahwa tagihan kos untuk <b>Kamar ${item.kamar}</b> akan jatuh tempo dalam <b>${sisa} hari</b> (Tepatnya pada: <b>${item.jatuhTempo}</b>).</p>
              <p>Mohon siapkan pembayarannya ya. Jika sudah membayar, abaikan pesan ini.</p>
              <br><p>Salam Hangat,<br>Pengelola Kos</p></div>`;
          } else if (sisa === 0) {
            subjectPenghuni = `⏳ [HARI INI] Batas Pembayaran Kos Kamar ${item.kamar}`;
            htmlBodyPenghuni = `<div style="font-family: Arial, sans-serif; color: #334155; padding: 20px; border: 1px solid #f97316; border-radius: 8px;">
              <h3 style="color: #f97316;">Halo ${item.nama},</h3>
              <p>Hari ini (<b>${item.jatuhTempo}</b>) adalah batas waktu pembayaran kos untuk <b>Kamar ${item.kamar}</b>.</p>
              <p>Mohon segera melakukan pembayaran hari ini agar administrasi bulan ini lancar.</p>
              <br><p>Terima Kasih,<br>Pengelola Kos</p></div>`;
          } else {
            subjectPenghuni = `⚠️ [PENTING] Tagihan Kamar ${item.kamar} TERLAMBAT ${Math.abs(sisa)} Hari`;
            htmlBodyPenghuni = `<div style="font-family: Arial, sans-serif; color: #334155; padding: 20px; border: 2px solid #ef4444; border-radius: 8px; background-color: #fef2f2;">
              <h3 style="color: #ef4444;">Peringatan Tagihan: ${item.nama}</h3>
              <p>Berdasarkan catatan sistem kami, pembayaran kos untuk <b>Kamar ${item.kamar}</b> telah <b>MELEWATI JATUH TEMPO selama ${Math.abs(sisa)} hari</b>.</p>
              <p>Batas jatuh tempo Anda adalah <b>${item.jatuhTempo}</b>.</p>
              <p>Mohon <b>SEGERA</b> melunasi tunggakan Anda hari ini juga. Abaikan peringatan ini jika Anda baru saja melakukan transfer ke pengelola.</p>
              <br><p>Hormat Kami,<br>Pengelola Kos</p></div>`;
          }

          try { MailApp.sendEmail({ to: item.emailTenant, subject: subjectPenghuni, htmlBody: htmlBodyPenghuni }); }
          catch (e) { Logger.log("Gagal kirim ke " + item.emailTenant); }
        }
      }

      // REKAP ADMIN
      listTagihan += `<tr>
        <td style="border: 1px solid #cbd5e1; padding: 10px;">KM ${item.kamar} - <b>${item.nama}</b></td>
        <td style="border: 1px solid #cbd5e1; padding: 10px;">${item.jatuhTempo}</td>
        <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: ${warnaStatus};">${teksStatus}</td>
        <td style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">
          <a href="${urlWA}" style="background-color: #10b981; color: white; padding: 6px 12px; text-decoration: none; border-radius: 4px; font-size: 12px; font-weight: bold;">Tembak WA (AI)</a>
        </td>
      </tr>`;
    }
  });

  // KIRIM LAPORAN ADMIN
  if (countAction > 0) {
    const htmlBodyAdmin = `
      <div style="font-family: sans-serif; color: #334155;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">Laporan Mitigasi Kos (Sistem OMNI)</h2>
        <p>Tanggal: <b>${hariIni}</b></p>
        <p>Ada <b>${countAction} penghuni</b> yang berada dalam radar penagihan. Sistem telah mengirimkan email otomatis (H-7, H-3, dll) ke mereka.</p>
        <p>Panel intervensi manual (WA):</p>
        <table style="border-collapse: collapse; width: 100%; margin-top: 15px;">
          <thead>
            <tr style="background-color: #f8fafc;">
              <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">PENGHUNI</th>
              <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">TEMPO</th>
              <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">STATUS</th>
              <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: center;">AKSI WA</th>
            </tr>
          </thead>
          <tbody>${listTagihan}</tbody>
        </table>
        <p style="font-size: 12px; color: #64748b; margin-top: 20px;">*Sistem OMNI berjalan otomatis setiap jam 08:00 Pagi.</p>
      </div>`;

    MailApp.sendEmail({ to: EMAIL_ADMIN, subject: `🛡️ [OMNI RADAR] ${countAction} Kamar Butuh Perhatian (${hariIni})`, htmlBody: htmlBodyAdmin });
  }
}

// ------------------------------------------
// 6. SETUP TRIGGER (Jalankan 1x secara manual)
// ------------------------------------------
function mulaiSistemHarian() {
  hapusSemuaTrigger();
  ScriptApp.newTrigger('kirimEmailReport').timeBased().everyDays(1).atHour(8).create();
}
function hapusSemuaTrigger() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
}
