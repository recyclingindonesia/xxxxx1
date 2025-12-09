
        document.addEventListener('DOMContentLoaded', () => {
            // --- Data Migration for Settings ---
            const creatorInfo = JSON.parse(localStorage.getItem('creatorInfo'));
            if (creatorInfo) {
                const senderProfile = {
                    name: creatorInfo.name || '',
                    role: creatorInfo.role || '',
                    phone: creatorInfo.phone || ''
                };
                const objectProfile = {
                    name: creatorInfo.productName || '',
                    desc: creatorInfo.productDesc || '',
                    link: creatorInfo.productLink || ''
                };
                localStorage.setItem('senderProfile', JSON.stringify(senderProfile));
                localStorage.setItem('objectProfile', JSON.stringify(objectProfile));
                localStorage.removeItem('creatorInfo'); // Clean up old key
            }

            // --- DOM Elements ---
            const tabs = document.querySelectorAll('.tab-item');
            const addTab = document.querySelector('[data-tab="add"]');
            const addMenu = document.getElementById('addMenu');
            const addMenuItems = document.querySelectorAll('.add-menu-item');

            const homeSection = document.getElementById('homeSection');
            const settingsSection = document.querySelector('.settings-section');
            const moduleSection = document.getElementById('moduleSection');
            const guideSection = document.getElementById('guideSection');
            const mainModuleGrid = document.getElementById('mainModuleGrid');

            const createNewTemplateBtn = document.getElementById('createNewTemplateBtn');
            const daftarTemplateContainer = document.getElementById('daftarTemplate');
            const templateEditorOverlay = document.getElementById('templateEditorOverlay');
            const closeTemplateEditorBtn = document.getElementById('closeTemplateEditorBtn');
            const templateEditorTitle = document.getElementById('templateEditorTitle');
            const templateIdInput = document.getElementById('templateIdInput');
            const templateTitleInput = document.getElementById('templateTitleInput');
            const templateContentInput = document.getElementById('templateContentInput');
            const templateAiPrompt = document.getElementById('templateAiPrompt');
            const generateTemplateBtnAI = document.getElementById('generateTemplateBtnAI');
            const isActiveTemplateCheckbox = document.getElementById('isActiveTemplateCheckbox');
            const saveTemplateBtn = document.getElementById('saveTemplateBtn');

            // SMS Template Elements
            const createNewSmsTemplateBtn = document.getElementById('createNewSmsTemplateBtn');
            const smsTemplateEditorOverlay = document.getElementById('smsTemplateEditorOverlay');
            const smsTemplateIdInput = document.getElementById('smsTemplateIdInput');
            const smsTemplateTitleInput = document.getElementById('smsTemplateTitleInput');
            const smsTemplateContentInput = document.getElementById('smsTemplateContentInput');
            const smsCharCounter = document.getElementById('smsCharCounter');
            const smsTemplateAiPrompt = document.getElementById('smsTemplateAiPrompt');
            const generateSmsTemplateBtnAI = document.getElementById('generateSmsTemplateBtnAI');
            const isDefaultSmsTemplateCheckbox = document.getElementById('isDefaultSmsTemplateCheckbox');
            const saveSmsTemplateBtn = document.getElementById('saveSmsTemplateBtn');
            const daftarSmsTemplateContainer = document.getElementById('daftarSmsTemplate');

            const storeDataOverlay = document.getElementById('storeDataOverlay');
            const closeStoreOverlayBtn = document.getElementById('closeStoreOverlayBtn');
            const whatsappStoresList = document.getElementById('whatsappStoresList');
            const otherStoresList = document.getElementById('otherStoresList');
            const hapusSemuaStoreBtn = document.getElementById('hapusSemuaStoreBtn');
            const exportCsvBtn = document.getElementById('exportCsvBtn');
            const exportVcfBtn = document.getElementById('exportVcfBtn');

            const quickInputOverlay = document.getElementById('quickInputOverlay');
            const quickInputTextarea = document.getElementById('quickInputTextarea');
            const processQuickInputBtnAI = document.getElementById('processQuickInputBtnAI');
            const processQuickInputBtnStandard = document.getElementById('processQuickInputBtnStandard');
            const saveQuickInputBtn = document.getElementById('saveQuickInputBtn');
            const closeQuickInputBtn = document.getElementById('closeQuickInputBtn');
            const parsedChipsContainer = document.getElementById('parsedChipsContainer');
            const sheetStatus = document.getElementById('sheet-status');

            const cameraOverlay = document.getElementById('cameraOverlay');
            const closeCameraBtn = document.getElementById('closeCameraBtn');
            const cameraFeed = document.getElementById('cameraFeed');
            const captureBtn = document.getElementById('captureBtn');
            const cameraCanvas = document.getElementById('cameraCanvas');
            const cameraSpinner = document.getElementById('cameraSpinner');

            const suggestionOverlay = document.getElementById('suggestionOverlay');
            const closeSuggestionBtn = document.getElementById('closeSuggestionBtn');
            const suggestionList = document.getElementById('suggestionList');

            const personalizedMessageOverlay = document.getElementById('personalizedMessageOverlay');
            const closePersonalizedMessageBtn = document.getElementById('closePersonalizedMessageBtn');
            const personalizedMessageStoreName = document.getElementById('personalizedMessageStoreName');
            const personalizedMessageGoal = document.getElementById('personalizedMessageGoal');
            const personalizedMessageResult = document.getElementById('personalizedMessageResult');
            const generatePersonalizedMessageBtn = document.getElementById('generatePersonalizedMessageBtn');
            const copyPersonalizedMessageBtn = document.getElementById('copyPersonalizedMessageBtn');
            const sendPersonalizedMessageBtn = document.getElementById('sendPersonalizedMessageBtn');

            // Purchase Note Elements
            const purchaseNoteOverlay = document.getElementById('purchaseNoteOverlay');
            const notaCustomerName = document.getElementById('notaCustomerName');
            const notaCustomerWhatsapp = document.getElementById('notaCustomerWhatsapp');
            const notaItemsContainer = document.getElementById('notaItemsContainer');
            const addNotaItemBtn = document.getElementById('addNotaItemBtn');
            const purchaseNoteTotal = document.getElementById('purchaseNoteTotal');
            const copyNotaBtn = document.getElementById('copyNotaBtn');
            const sendNotaWaBtn = document.getElementById('sendNotaWaBtn');
            const pickCustomerBtn = document.getElementById('pickCustomerBtn');

            // Customer Picker Elements
            const customerPickerOverlay = document.getElementById('customerPickerOverlay');
            const customerSearchInput = document.getElementById('customerSearchInput');
            const customerListContainer = document.getElementById('customerListContainer');

            const variableButtons = document.querySelectorAll('.variable-btn');

            const letterGeneratorOverlay = document.getElementById('letterGeneratorOverlay');
            const closeLetterGeneratorBtn = document.getElementById('closeLetterGeneratorBtn');
            const letterTemplateTextarea = document.getElementById('letterTemplateTextarea');
            const letterPreview = document.getElementById('letterPreview');
            const letterAiPrompt = document.getElementById('letterAiPrompt');
            const generateLetterBtnAI = document.getElementById('generateLetterBtnAI');
            const previewLetterBtn = document.getElementById('previewLetterBtn');
            const exportLetterBtn = document.getElementById('exportLetterBtn');

            const exportLetterOverlay = document.getElementById('exportLetterOverlay');
            const closeExportLetterBtn = document.getElementById('closeExportLetterBtn');
            const letterExportContentPreview = document.getElementById('letterExportContentPreview');
            const copyLetterExportBtn = document.getElementById('copyLetterExportBtn');
            const emailLetterBtn = document.getElementById('emailLetterBtn');
            const downloadTxtBtn = document.getElementById('downloadTxtBtn');

            const saveAllSettingsBtn = document.getElementById('saveAllSettingsBtn');

            const customModal = document.getElementById('customModalOverlay');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');
            const modalConfirmBtn = document.getElementById('modalConfirmBtn');
            const modalCancelBtn = document.getElementById('modalCancelBtn');
            const modalExtraBtn = document.getElementById('modalExtraBtn');


            // --- App State ---
            let savedStores = JSON.parse(localStorage.getItem('savedStores')) || [];
            let savedTemplates = JSON.parse(localStorage.getItem('savedTemplates')) || [];
            let savedSmsTemplates = JSON.parse(localStorage.getItem('savedSmsTemplates')) || [];
            let senderProfile = JSON.parse(localStorage.getItem('senderProfile')) || {};
            let objectProfile = JSON.parse(localStorage.getItem('objectProfile')) || {};
            let parsedData = {};
            let temporaryStoreData = null;
            let lastSavedStoreId = null;
            let cameraStream = null;
            let currentStoreForPersonalizedMessage = null;


            // --- Gemini API Configuration ---
            const API_KEY = ""; // KOSONGKAN SAJA
            const API_URL_FLASH = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

            // --- Functions ---

            function normalizePhoneNumber(phoneStr) {
                if (!phoneStr || typeof phoneStr !== 'string') return '';
                let cleaned = phoneStr.trim().replace(/[\s-()]/g, '');
                if (cleaned.startsWith('08')) {
                    return '62' + cleaned.substring(1);
                }
                if (cleaned.startsWith('+62')) {
                    return cleaned.substring(1);
                }
                return cleaned.replace('+', '');
            }

            async function callGeminiAPI(url, payload) {
                let retries = 3;
                let delay = 1000;
                while (retries > 0) {
                    try {
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const result = await response.json();
                        if (result.candidates && result.candidates[0].content) {
                            return result;
                        } else {
                             if (result.candidates && result.candidates.length === 0) {
                                console.warn("API response blocked due to safety settings.", result);
                                throw new Error("Konten diblokir oleh filter keamanan AI.");
                            }
                            throw new Error("Invalid response structure from API.");
                        }

                    } catch (error) {
                        console.error(`API call failed: ${error.message}. Retrying in ${delay}ms...`);
                        retries--;
                        if (retries === 0) {
                            showModal('Kesalahan AI', `Gagal terhubung ke layanan AI. Pastikan koneksi internet Anda stabil dan coba lagi nanti.`);
                            return null;
                        }
                        await new Promise(resolve => setTimeout(resolve, delay));
                        delay *= 2;
                    }
                }
                return null;
            }

            async function parseRawDataWithAI() {
                const rawData = quickInputTextarea.value;
                if (!rawData.trim()) {
                    showModal('Info', 'Harap tempelkan data terlebih dahulu!');
                    return;
                }

                processQuickInputBtnAI.disabled = true;
                processQuickInputBtnAI.textContent = 'Memproses...';
                processQuickInputBtnStandard.disabled = true;

                const systemInstruction = {
                    parts: [{
                        text: "You are an expert data extraction tool for an Indonesian marketing app. Your task is to extract the store name, full address, and phone number from the user's raw text input. Prioritize finding a mobile number (starting with +628 or 08) as the 'phone'. Return the data in a structured JSON format. The phone number should be cleaned of any special characters like dashes or spaces."
                    }]
                };

                const payload = {
                    contents: [{ parts: [{ text: rawData }] }],
                    systemInstruction: systemInstruction,
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: "OBJECT",
                            properties: {
                                "name": { "type": "STRING" },
                                "address": { "type": "STRING" },
                                "phone": { "type": "STRING" },
                            },
                            required: ["name", "address", "phone"]
                        }
                    }
                };

                const result = await callGeminiAPI(API_URL_FLASH, payload);

                processQuickInputBtnAI.disabled = false;
                processQuickInputBtnAI.textContent = '✨ Proses dengan AI';
                processQuickInputBtnStandard.disabled = false;

                if (result && result.candidates[0].content.parts[0].text) {
                    try {
                        const extractedData = JSON.parse(result.candidates[0].content.parts[0].text);
                        const phone = normalizePhoneNumber(extractedData.phone || '');
                        let phoneType = 'none';
                        if (phone.startsWith('628')) {
                            phoneType = 'whatsapp';
                        } else if (phone) {
                            phoneType = 'landline';
                        }

                        parsedData = { ...extractedData, phone, phoneType };
                        displayParsedChips(parsedData);
                        processQuickInputBtnAI.style.display = 'none';
                        processQuickInputBtnStandard.style.display = 'none';
                        saveQuickInputBtn.style.display = 'block';
                    } catch (e) {
                        showModal('Kesalahan Parsing', 'AI mengembalikan format yang tidak valid. Coba proses standar.');
                        console.error("Error parsing JSON from AI:", e);
                    }
                } else {
                    showModal('Gagal Memproses', 'AI tidak dapat memproses teks. Coba proses standar.');
                }
            }

            function parseRawDataStandard() {
                const rawData = quickInputTextarea.value;
                if (!rawData.trim()) {
                    showModal('Info', 'Harap tempelkan data terlebih dahulu!');
                    return;
                }
                const lines = rawData.split('\n').map(line => line.trim()).filter(line => line.length > 0);
                let name = '';
                let address = '';
                let phone = '';
                let phoneType = 'none';

                const phoneRegex = /(?:(\+62|0)\s?-?8[0-9\s-]{7,13})|(?:0\d{2,4}[\s-]?\d{5,9})|(?:\(0\d{2,4}\)[\s-]?\d{5,9})/;

                for (const line of lines) {
                    const phoneMatch = line.match(phoneRegex);
                    if (phoneMatch) {
                        phone = normalizePhoneNumber(phoneMatch[0]);
                        if (phone.startsWith('628')) {
                            phoneType = 'whatsapp';
                        } else {
                            phoneType = 'landline';
                        }
                        break;
                    }
                }

                let addressParts = [];
                let nameFound = false;
                for(const line of lines) {
                    if (!line.match(phoneRegex) && !line.toLowerCase().includes('google maps') && !line.match(/^[A-Z0-9]{4}\+[A-Z0-9]{2,}/)) {
                        if (!nameFound) {
                            name = line;
                            nameFound = true;
                        } else {
                            addressParts.push(line);
                        }
                    }
                }
                address = addressParts.join(', ');

                parsedData = { name, address, phone, phoneType };
                displayParsedChips(parsedData);
                processQuickInputBtnAI.style.display = 'none';
                processQuickInputBtnStandard.style.display = 'none';
                saveQuickInputBtn.style.display = 'block';
            }

            async function generateTemplateWithAI() {
                const prompt = templateAiPrompt.value.trim();
                if (!prompt) {
                    showModal('Info', 'Harap masukkan ide atau topik untuk pesan AI.');
                    return;
                }

                generateTemplateBtnAI.disabled = true;
                generateTemplateBtnAI.textContent = 'Membuat...';

                 const aiContext = `Buat template pesan WA marketing.
                Produk: ${objectProfile.name || '[Produk]'}.
                Pengirim: ${senderProfile.name || '[Nama]'}.
                Topik: ${prompt}.
                Gunakan placeholder [Nama Toko], [Nama Saya], [Nama Produk].`;

                const payload = {
                    contents: [{ parts: [{ text: aiContext }] }],
                };

                const result = await callGeminiAPI(API_URL_FLASH, payload);

                generateTemplateBtnAI.disabled = false;
                generateTemplateBtnAI.textContent = '✨ Buat Isi Pesan';

                if (result && result.candidates[0].content.parts[0].text) {
                    templateContentInput.value = result.candidates[0].content.parts[0].text;
                } else {
                    showModal('Gagal Membuat Pesan', 'AI tidak dapat membuat pesan. Silakan coba lagi.');
                }
            }

            async function getFollowUpSuggestions(store) {
                 suggestionList.innerHTML = '<li>Memuat saran...</li>';
                 suggestionOverlay.classList.add('active');

                 const systemInstruction = {
                     parts: [{ text: "Anda adalah asisten marketing yang proaktif dan strategis. Berikan 3 saran tindak lanjut (follow-up) yang singkat, konkret, dan profesional untuk tim marketing dalam bahasa Indonesia. Setiap saran harus berupa tindakan yang bisa langsung dikerjakan. Berikan dalam format daftar bernomor (1., 2., 3.)." }]
                 };
                 const prompt = `Saya baru saja menyimpan kontak baru: Nama Toko: "${store.name}", Alamat: "${store.address}". Berikan 3 saran tindak lanjut.`;

                 const payload = {
                     contents: [{ parts: [{ text: prompt }] }],
                     systemInstruction: systemInstruction,
                 };

                 const result = await callGeminiAPI(API_URL_FLASH, payload);

                 if (result && result.candidates[0].content.parts[0].text) {
                     const suggestions = result.candidates[0].content.parts[0].text.split('\n').filter(s => s.trim() !== '');
                     suggestionList.innerHTML = suggestions.map(s => `<li>${s.replace(/^\d+\.\s*/, '')}</li>`).join('');
                 } else {
                     suggestionList.innerHTML = '<li>Gagal memuat saran.</li>';
                 }
             }

            async function generatePersonalizedMessage() {
                if (!currentStoreForPersonalizedMessage) return;

                const goal = personalizedMessageGoal.value.trim();
                if (!goal) {
                    showModal('Info', 'Harap masukkan tujuan pesan.');
                    return;
                }

                generatePersonalizedMessageBtn.disabled = true;
                generatePersonalizedMessageBtn.textContent = 'Membuat...';

                const systemInstruction = {
                    parts: [{ text: "You are a creative marketing assistant for an Indonesian company. Your task is to write a short, effective, and friendly personalized WhatsApp message in Indonesian to a specific store, based on a given objective. You MUST include the placeholders `[Info Pembuat]` and `[Pesan Perkenalan]` which will be replaced by the app." }]
                };
                const prompt = `Toko Target: "${currentStoreForPersonalizedMessage.name}" di "${currentStoreForPersonalizedMessage.address}". Tujuan Pesan: "${goal}".`;

                const payload = {
                    contents: [{ parts: [{ text: prompt }] }],
                    systemInstruction: systemInstruction,
                };

                const result = await callGeminiAPI(API_URL_FLASH, payload);

                generatePersonalizedMessageBtn.disabled = false;
                generatePersonalizedMessageBtn.textContent = 'Buat';

                if (result && result.candidates[0].content.parts[0].text) {
                    personalizedMessageResult.value = result.candidates[0].content.parts[0].text;
                } else {
                    personalizedMessageResult.value = "Gagal membuat pesan. Silakan coba lagi.";
                }
            }

            async function generateLetterWithAI() {
                const prompt = letterAiPrompt.value.trim();
                const newestStore = savedStores.length > 0 ? savedStores.sort((a,b) => b.timestamp - a.timestamp)[0] : null;

                if (!prompt) {
                    showModal('Info', 'Harap masukkan tujuan surat.');
                    return;
                }

                generateLetterBtnAI.disabled = true;
                generateLetterBtnAI.textContent = 'Membuat...';

                const systemInstruction = {
                    parts: [{ text: "You are a professional business communication assistant for an Indonesian company. Write a formal but friendly letter based on the user's objective. The letter must be in Indonesian. You MUST use placeholders like `[Nama Toko]`, `[Alamat Toko]`, and should also include a placeholder for a closing, like `[Info Pembuat]`." }]
                };
                const fullPrompt = `Toko Target: "${newestStore?.name || '[Nama Toko]'}" di "${newestStore?.address || '[Alamat Toko]'}". Tujuan Surat: "${prompt}".`;

                const payload = {
                    contents: [{ parts: [{ text: fullPrompt }] }],
                    systemInstruction: systemInstruction,
                };

                const result = await callGeminiAPI(API_URL_FLASH, payload);

                generateLetterBtnAI.disabled = false;
                generateLetterBtnAI.textContent = '✨ Buat Draf Surat';

                if (result && result.candidates[0].content.parts[0].text) {
                    letterTemplateTextarea.value = result.candidates[0].content.parts[0].text;
                    previewLetterBtn.click(); // Automatically generate preview
                } else {
                    letterTemplateTextarea.value = "Gagal membuat draf surat. Silakan coba lagi.";
                }
            }


            async function openCamera() {
                if (!('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)) {
                    showModal('Error', 'Perangkat Anda tidak mendukung akses kamera.');
                    return;
                }

                cameraOverlay.classList.add('active');

                try {
                    const constraints = { video: { facingMode: 'environment' } };
                    cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
                    cameraFeed.srcObject = cameraStream;
                } catch (err) {
                    console.error("Camera access error:", err);
                    showModal('Izin Ditolak', 'Gagal mengakses kamera. Pastikan Anda telah memberikan izin pada browser.');
                    closeCamera();
                }
            }

            function closeCamera() {
                if (cameraStream) {
                    cameraStream.getTracks().forEach(track => track.stop());
                }
                cameraStream = null;
                cameraOverlay.classList.remove('active');
            }

            async function captureAndProcessImage() {
                cameraSpinner.style.display = 'block';
                captureBtn.disabled = true;

                const context = cameraCanvas.getContext('2d');
                cameraCanvas.width = cameraFeed.videoWidth;
                cameraCanvas.height = cameraFeed.videoHeight;
                context.drawImage(cameraFeed, 0, 0, cameraCanvas.width, cameraCanvas.height);

                const base64ImageData = cameraCanvas.toDataURL('image/jpeg').split(',')[1];

                closeCamera();

                const systemInstruction = {
                    parts: [{ text: "You are an expert OCR and data extraction tool for an Indonesian marketing app. Your task is to analyze the provided image of a business card. Extract the company/store name, full address, and a primary phone number. Prioritize a mobile number if multiple numbers are present. Return the data in a structured JSON format. The phone number should be cleaned of any special characters." }]
                };

                const payload = {
                    contents: [{
                        parts: [
                            { text: "Extract the information from this business card image." },
                            { inlineData: { mimeType: "image/jpeg", data: base64ImageData } }
                        ]
                    }],
                    systemInstruction: systemInstruction,
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: "OBJECT",
                            properties: {
                                "name": { "type": "STRING" },
                                "address": { "type": "STRING" },
                                "phone": { "type": "STRING" },
                            },
                            required: ["name", "address", "phone"]
                        }
                    }
                };

                const result = await callGeminiAPI(API_URL_FLASH, payload);

                cameraSpinner.style.display = 'none';
                captureBtn.disabled = false;

                if (result && result.candidates[0].content.parts[0].text) {
                    try {
                        const extractedData = JSON.parse(result.candidates[0].content.parts[0].text);
                        const phone = normalizePhoneNumber(extractedData.phone || '');
                        let phoneType = 'none';
                        if (phone.startsWith('628')) {
                            phoneType = 'whatsapp';
                        } else if (phone) {
                            phoneType = 'landline';
                        }

                        parsedData = { ...extractedData, phone, phoneType };

                        quickInputOverlay.classList.add('active');
                        displayParsedChips(parsedData);
                        processQuickInputBtnAI.style.display = 'none';
                        processQuickInputBtnStandard.style.display = 'none';
                        saveQuickInputBtn.style.display = 'block';

                    } catch (e) {
                        showModal('Kesalahan Parsing', 'AI mengembalikan format yang tidak valid setelah memindai. Silakan coba lagi.');
                    }
                } else {
                    showModal('Gagal Memindai', 'AI tidak dapat membaca data dari gambar. Pastikan gambar jelas dan coba lagi.');
                }
            }


            function populateSettings() {
                // Sender
                document.getElementById('senderName').value = senderProfile.name || '';
                document.getElementById('senderRole').value = senderProfile.role || '';
                document.getElementById('senderPhone').value = senderProfile.phone || '';

                // Object
                document.getElementById('objectName').value = objectProfile.name || '';
                document.getElementById('objectDesc').value = objectProfile.desc || '';
                document.getElementById('objectLink').value = objectProfile.link || '';

                updateHomeStatus();
            }

            function updateHomeStatus() {
                const statusEl = document.getElementById('homeStatusText');
                if(senderProfile.name && objectProfile.name) {
                    statusEl.innerHTML = `Pengirim: <strong>${senderProfile.name}</strong><br>Menawarkan: <strong>${objectProfile.name}</strong>`;
                    statusEl.style.color = "var(--success-color)";
                } else {
                    statusEl.textContent = "Profil belum lengkap. Silakan lengkapi di menu Setelan.";
                    statusEl.style.color = "var(--danger-color)";
                }
            }

            function saveSettings() {
                senderProfile = {
                    name: document.getElementById('senderName').value,
                    role: document.getElementById('senderRole').value,
                    phone: document.getElementById('senderPhone').value
                };

                objectProfile = {
                    name: document.getElementById('objectName').value,
                    desc: document.getElementById('objectDesc').value,
                    link: document.getElementById('objectLink').value
                };

                localStorage.setItem('senderProfile', JSON.stringify(senderProfile));
                localStorage.setItem('objectProfile', JSON.stringify(objectProfile));
                showModal('Sukses', 'Profil Pengirim dan Obyek berhasil disimpan!');
                updateHomeStatus();
            }

            function saveAndRerenderStores() {
                localStorage.setItem('savedStores', JSON.stringify(savedStores));
                renderSavedStores();
            }

            function showModal(title, message, isConfirm = false, extraBtnConfig = null) {
                return new Promise((resolve) => {
                    modalTitle.textContent = title;
                    modalMessage.textContent = message;
                    modalCancelBtn.style.display = isConfirm ? 'block' : 'none';

                    if (extraBtnConfig) {
                        modalExtraBtn.textContent = extraBtnConfig.text;
                        modalExtraBtn.style.display = 'block';
                        modalExtraBtn.onclick = () => {
                            customModal.classList.remove('active');
                            extraBtnConfig.onClick();
                        };
                    } else {
                        modalExtraBtn.style.display = 'none';
                    }

                    customModal.classList.add('active');

                    modalConfirmBtn.onclick = () => {
                        customModal.classList.remove('active');
                        resolve(true);
                    };

                    modalCancelBtn.onclick = () => {
                        customModal.classList.remove('active');
                        resolve(false);
                    };
                });
            }

            function renderSavedStores() {
                whatsappStoresList.innerHTML = '';
                otherStoresList.innerHTML = '';
                savedStores.sort((a,b) => b.timestamp - a.timestamp);
                const whatsappStores = savedStores.filter(store => store.phoneType === 'whatsapp');
                const otherStores = savedStores.filter(store => store.phoneType !== 'whatsapp');

                if (whatsappStores.length === 0) {
                    whatsappStoresList.innerHTML = '<p style="text-align:center; color:#999;">Belum ada data toko dengan WhatsApp.</p>';
                } else {
                    whatsappStores.forEach(store => whatsappStoresList.appendChild(createStoreCard(store)));
                }

                if (otherStores.length === 0) {
                    otherStoresList.innerHTML = '<p style="text-align:center; color:#999;">Belum ada data toko lainnya.</p>';
                } else {
                    otherStores.forEach(store => otherStoresList.appendChild(createStoreCard(store)));
                }
            }

            function createStoreCard(store) {
                const storeCard = document.createElement('div');
                storeCard.className = 'saved-stores-card';
                storeCard.innerHTML = `
                    <p><strong>Nama:</strong> ${store.name || 'Tidak Ditemukan'}</p>
                    <p><strong>Alamat:</strong> ${store.address || 'Tidak Ditemukan'}</p>
                    <p><strong>Telepon:</strong> ${store.phone || 'Tidak Ditemukan'}</p>
                    <div class="card-actions">
                        <button class="btn btn-secondary btn-sm edit-store-btn" data-id="${store.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-store-btn" data-id="${store.id}">Hapus</button>
                        <button class="btn btn-info btn-sm personalized-ai-btn" data-id="${store.id}">✨ Pesan AI</button>
                    </div>
                `;
                return storeCard;
            }

            function renderTemplates() {
                daftarTemplateContainer.innerHTML = '';
                if(savedTemplates.length === 0) {
                    daftarTemplateContainer.innerHTML = '<p style="text-align:center; color:#999;">Belum ada template. Klik tombol di atas untuk membuat.</p>';
                    return;
                }

                savedTemplates.forEach(template => {
                    const card = document.createElement('div');
                    card.className = 'template-card';
                    card.innerHTML = `
                        <div class="template-card-header">
                            <span class="template-card-title">${template.title}</span>
                            ${template.isActive ? '<span class="active-badge">Aktif</span>' : ''}
                        </div>
                        <p class="template-card-content">${template.content.substring(0, 100)}${template.content.length > 100 ? '...' : ''}</p>
                        <div class="template-card-actions">
                            <button class="btn btn-secondary edit-template-btn" data-id="${template.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger delete-template-btn" data-id="${template.id}"><i class="fas fa-trash"></i> Hapus</button>
                        </div>
                    `;
                    daftarTemplateContainer.appendChild(card);
                });
            }

            function openTemplateEditor(template = null) {
                if (template) {
                    templateEditorTitle.textContent = "Edit Template";
                    templateIdInput.value = template.id;
                    templateTitleInput.value = template.title;
                    templateContentInput.value = template.content;
                    isActiveTemplateCheckbox.checked = template.isActive;
                } else {
                    templateEditorTitle.textContent = "Buat Template Baru";
                    templateIdInput.value = '';
                    templateTitleInput.value = '';
                    templateContentInput.value = '';
                    templateAiPrompt.value = '';
                    isActiveTemplateCheckbox.checked = true;
                }
                templateEditorOverlay.classList.add('active');
            }

            function saveTemplate() {
                const id = templateIdInput.value;
                const title = templateTitleInput.value.trim();
                const content = templateContentInput.value.trim();
                const isActive = isActiveTemplateCheckbox.checked;

                if (!title || !content) {
                    showModal('Info', 'Judul dan Isi Pesan tidak boleh kosong.');
                    return;
                }

                if (isActive) {
                    savedTemplates.forEach(t => t.isActive = false);
                }

                if (id) { // Editing existing
                    const index = savedTemplates.findIndex(t => t.id === id);
                    if (index > -1) {
                        savedTemplates[index] = { id, title, content, isActive };
                    }
                } else { // Creating new
                    savedTemplates.push({ id: crypto.randomUUID(), title, content, isActive });
                }

                if (!savedTemplates.some(t => t.isActive)) {
                    const templateToDefault = id ? savedTemplates.find(t => t.id === id) : savedTemplates[savedTemplates.length - 1];
                    if (templateToDefault) templateToDefault.isActive = true;
                }

                localStorage.setItem('savedTemplates', JSON.stringify(savedTemplates));
                renderTemplates();
                templateEditorOverlay.classList.remove('active');
                showModal('Sukses', 'Template berhasil disimpan!');
            }

            function getTimeGreeting() {
                const hour = new Date().getHours();
                if (hour < 11) return "Pagi";
                if (hour < 15) return "Siang";
                if (hour < 18) return "Sore";
                return "Malam";
            }

            function displayParsedChips(data) {
                parsedChipsContainer.innerHTML = '';
                parsedChipsContainer.style.display = 'flex';

                const nameChip = document.createElement('span');
                nameChip.className = 'chip chip-name';
                nameChip.innerHTML = `Nama: ${data.name || 'Tidak Ditemukan'}<button class="chip-delete-btn" data-type="name">&times;</button>`;
                parsedChipsContainer.appendChild(nameChip);

                const addressChip = document.createElement('span');
                addressChip.className = 'chip chip-address';
                addressChip.innerHTML = `Alamat: ${data.address || 'Tidak Ditemukan'}<button class="chip-delete-btn" data-type="address">&times;</button>`;
                parsedChipsContainer.appendChild(addressChip);

                const phoneChip = document.createElement('span');
                let chipClass = '';
                let chipLabel = '';
                if (data.phoneType === 'whatsapp') {
                    chipClass = 'chip-phone-whatsapp';
                    chipLabel = 'WhatsApp';
                } else if (data.phoneType === 'landline') {
                    chipClass = 'chip-phone-landline';
                    chipLabel = 'Telepon/Surat';
                } else {
                    chipClass = 'chip-phone-none';
                    chipLabel = 'Telepon';
                }
                phoneChip.className = `chip ${chipClass}`;
                phoneChip.innerHTML = `${chipLabel}: ${data.phone || 'Tidak Ditemukan'}<button class="chip-delete-btn" data-type="phone">&times;</button>`;
                parsedChipsContainer.appendChild(phoneChip);
            }

            function generateFinalMessage(templateContent, store) {
                let msg = templateContent;

                // Variabel Toko
                msg = msg.replace(/\[Nama Toko\]/g, store.name || '');
                msg = msg.replace(/\[Alamat Toko\]/g, store.address || '');
                msg = msg.replace(/\[Waktu\]/g, getTimeGreeting());

                // Variabel Pengirim (Sender)
                msg = msg.replace(/\[Nama Saya\]/g, senderProfile.name || 'Saya');
                msg = msg.replace(/\[Jabatan Saya\]/g, senderProfile.role || 'Marketing');
                msg = msg.replace(/\[No HP Saya\]/g, senderProfile.phone || '');

                // Variabel Obyek (Produk)
                msg = msg.replace(/\[Nama Produk\]/g, objectProfile.name || '');
                msg = msg.replace(/\[Deskripsi Produk\]/g, objectProfile.desc || '');
                msg = msg.replace(/\[Link Produk\]/g, objectProfile.link || '');

                return msg;
            }

            // --- New Workflow Functions ---
            function promptForWhatsAppSuccess() {
                showModal('Konfirmasi Pengiriman','Apakah pengiriman pesan WhatsApp BERHASIL?',true)
                .then(isSuccess => {
                    if (isSuccess) {
                        finalizeSuccessfulSubmission();
                    } else {
                        cancelTemporarySubmission();
                    }
                });
            }

            async function finalizeSuccessfulSubmission() {
                if (!temporaryStoreData) return;

                const dataToSave = { ...temporaryStoreData };
                lastSavedStoreId = dataToSave.id;
                temporaryStoreData = null;

                savedStores.push(dataToSave);
                saveAndRerenderStores();

                sheetStatus.textContent = 'Mengonfirmasi... Mengirim data ke Google Sheet...';
                const success = await sendToGoogleScript(dataToSave);

                if (success) {
                    const extraBtnConfig = {
                        text: '✨ Dapatkan Saran',
                        onClick: () => getFollowUpSuggestions(dataToSave)
                    };
                    showModal('Berhasil!', 'Data telah berhasil disimpan secara lokal dan di Google Sheet.', false, extraBtnConfig);
                    sheetStatus.textContent = 'Penyimpanan berhasil!';
                    quickInputTextarea.value = '';
                    parsedChipsContainer.innerHTML = '';
                    parsedChipsContainer.style.display = 'none';
                    processQuickInputBtnAI.style.display = 'block';
                    processQuickInputBtnStandard.style.display = 'block';
                    saveQuickInputBtn.style.display = 'none';
                    quickInputOverlay.classList.remove('active');
                }
            }

            function cancelTemporarySubmission() {
                temporaryStoreData = null;
                showModal('Dibatalkan', 'Penyimpanan data dibatalkan karena pengiriman WhatsApp tidak berhasil atau dibatalkan oleh pengguna.');
                sheetStatus.textContent = 'Penyimpanan dibatalkan oleh pengguna.';
            }

            async function sendToGoogleScript(storeDoc) {
                const googleScriptURL = 'https://script.google.com/macros/s/AKfycbzqh_Iyed2PUGrigkemUJpeTl1-3jH8pMTJ6FkMnEsrObIg9PeCr41r5baVhG65KXM/exec';
                const formData = new FormData();
                formData.append('nama-toko-input', storeDoc.name);
                formData.append('alamat-toko-input', storeDoc.address);
                formData.append('telepon-toko-input', storeDoc.phone);

                try {
                    await fetch(googleScriptURL, { method: 'POST', body: formData, mode: 'no-cors' });
                    return true;
                } catch (networkError) {
                    console.error("Gagal mengirim ke Google Sheet:", networkError);
                    sheetStatus.textContent = 'Data disimpan lokal, tapi GAGAL mengirim ke Google Sheet.';
                    showModal('Peringatan Jaringan', `Data berhasil disimpan lokal, tapi GAGAL dikirim ke Google Sheet. Periksa koneksi internet Anda. Kesalahan: ${networkError.message}`);
                    return false;
                }
            }


            // --- Event Listeners ---

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    if (tab.dataset.tab === 'add') {
                        addMenu.classList.toggle('active');
                        return;
                    }
                    addMenu.classList.remove('active');
                    tabs.forEach(item => item.classList.remove('active'));
                    tab.classList.add('active');

                    // Hide all main content sections and overlays
                    const allSections = document.querySelectorAll('.content > div, .settings-section');
                    allSections.forEach(section => {
                        if (section.id !== 'guideSection') { // Keep guide section separate
                            section.style.display = 'none';
                        }
                    });
                    document.getElementById('guideSection').style.display = 'none'; // Explicitly hide guide

                    const overlays = document.querySelectorAll('.overlay');
                    overlays.forEach(o => o.classList.remove('active'));

                    // Show the correct section based on the tab clicked
                    const tabName = tab.dataset.tab;
                    if (tabName === 'home') {
                        homeSection.style.display = 'block';
                    } else if (tabName === 'settings') {
                        settingsSection.style.display = 'block';
                        renderTemplates();
                        renderSmsTemplates();
                        populateSettings();
                    } else if (tabName === 'module') {
                        moduleSection.style.display = 'block';
                    } else if (tabName === 'guide') {
                        guideSection.style.display = 'block';
                    } else if (tabName === 'store-data-overlay') {
                        renderSavedStores();
                        storeDataOverlay.classList.add('active');
                    }
                });
            });

            addMenuItems.forEach(item => {
                item.addEventListener('click', () => {
                    addMenu.classList.remove('active');
                    const action = item.dataset.action;
                    if (action === 'quick-input') {
                        quickInputOverlay.classList.add('active');
                        parsedChipsContainer.style.display = 'none';
                        processQuickInputBtnAI.style.display = 'block';
                        processQuickInputBtnStandard.style.display = 'block';
                        saveQuickInputBtn.style.display = 'none';
                        quickInputTextarea.value = '';
                    } else if (action === 'ambil-kontak') {
                        selectContacts();
                    } else if (action === 'scan-card') {
                        openCamera();
                    }
                });
            });

            async function selectContacts() {
                try {
                    const contacts = await navigator.contacts.select(['name', 'tel']);
                    if (contacts && contacts.length > 0) {
                        const contact = contacts[0];
                        const name = contact.name[0] || 'Nama Tidak Ditemukan';
                        const phone = normalizePhoneNumber(contact.tel.length > 0 ? contact.tel[0] : 'Nomor Tidak Ditemukan');
                        parsedData = { name, address: '', phone, phoneType: 'whatsapp' };
                        quickInputOverlay.classList.add('active');
                        displayParsedChips(parsedData);
                        quickInputTextarea.value = `Nama: ${name}\nNomor Telepon: ${phone}`;
                        processQuickInputBtnAI.style.display = 'none';
                        processQuickInputBtnStandard.style.display = 'none';
                        saveQuickInputBtn.style.display = 'block';
                    }
                } catch (err) {
                    showModal('Info', 'Gagal mengambil kontak. Pastikan browser Anda mendukung fitur ini dan Anda telah memberikan izin.');
                    console.error('Contact picker failed: ', err);
                }
            }

            [closeStoreOverlayBtn, closeQuickInputBtn, closeLetterGeneratorBtn, closeCameraBtn, closeSuggestionBtn, closePersonalizedMessageBtn, closeTemplateEditorBtn, closeExportLetterBtn].forEach(btn => {
                btn.addEventListener('click', () => {
                    if(btn.id === 'closeCameraBtn') {
                        closeCamera();
                    } else {
                       btn.closest('.overlay').classList.remove('active');
                    }
                });
            });

            captureBtn.addEventListener('click', captureAndProcessImage);
            generatePersonalizedMessageBtn.addEventListener('click', generatePersonalizedMessage);

            copyPersonalizedMessageBtn.addEventListener('click', async () => {
                const textToCopy = personalizedMessageResult.value;
                if(textToCopy) {
                    await navigator.clipboard.writeText(textToCopy);
                    showModal('Sukses', 'Pesan berhasil disalin!');
                }
            });

            sendPersonalizedMessageBtn.addEventListener('click', () => {
                 if (!currentStoreForPersonalizedMessage || !currentStoreForPersonalizedMessage.phone) {
                    showModal('Info', 'Nomor telepon toko tidak tersedia.');
                    return;
                }
                const message = personalizedMessageResult.value;
                if (!message) {
                    showModal('Info', 'Harap buat pesan terlebih dahulu.');
                    return;
                }
                const phoneNumber = currentStoreForPersonalizedMessage.phone;
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
            });


            mainModuleGrid.addEventListener('click', (event) => {
                const button = event.target.closest('.module-btn');
                if (button) {
                    const action = button.dataset.action;
                    handleModuleAction(action);
                }
            });

            async function handleModuleAction(action) {
                const newestStore = savedStores.length > 0 ? savedStores.sort((a,b) => b.timestamp - a.timestamp)[0] : null;

                if (!newestStore && !['tempelData', 'buatSurat', 'cariLokasi'].includes(action)) {
                    showModal('Info', 'Tidak ada data toko tersimpan. Silakan simpan data terlebih dahulu.');
                    return;
                }

                switch (action) {
                    case 'tempelData':
                        try {
                            const rawData = await navigator.clipboard.readText();
                            quickInputTextarea.value = rawData;
                            quickInputOverlay.classList.add('active');
                            await parseRawDataWithAI();
                        } catch (err) {
                            showModal('Info', 'Gagal membaca clipboard. Pastikan Anda telah memberikan izin.');
                        }
                        break;
                    case 'kirimWa': {
                        if (!newestStore.phone) {
                            showModal('Info', 'Toko terakhir tidak memiliki nomor telepon.');
                            return;
                        }
                        const activeTemplates = savedTemplates.filter(t => t.isActive);
                        if (activeTemplates.length === 0) {
                            showModal('Info', 'Aktifkan minimal 1 template di Setelan.');
                            return;
                        }
                        const template = activeTemplates[Math.floor(Math.random() * activeTemplates.length)];
                        const finalMessage = generateFinalMessage(template.content, newestStore);
                        const phoneNumber = newestStore.phone;
                        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`, '_blank');
                        break;
                    }
                    case 'kirimSms': {
                        if (!newestStore.phone) { showModal('Info', 'Toko terakhir tidak memiliki nomor telepon.'); return; }
                        const defaultSmsTemplate = savedSmsTemplates.find(t => t.isDefault);
                        if (!defaultSmsTemplate) {
                            showModal('Info', 'Harap atur template SMS default di menu Setelan.');
                            return;
                        }
                        const finalMessage = generateFinalMessage(defaultSmsTemplate.content, newestStore);
                        window.open(`sms:${newestStore.phone}?body=${encodeURIComponent(finalMessage)}`);
                        break;
                    }
                    case 'telepon':
                        if (!newestStore.phone) { showModal('Info', 'Toko terakhir tidak memiliki nomor telepon.'); return; }
                        window.open(`tel:${newestStore.phone}`);
                        break;
                    case 'cariLokasi':
                        window.open('https://www.google.com/maps/d/', '_blank');
                        break;
                    case 'buatSurat': {
                        letterGeneratorOverlay.classList.add('active');
                        letterPreview.textContent = 'Memuat kode sumber...';
                        letterTemplateTextarea.value = 'Memuat kode sumber...';
                        letterAiPrompt.value = '';

                        try {
                            const [htmlResponse, jsResponse] = await Promise.all([
                                fetch('index.html'),
                                fetch('app.js')
                            ]);
                            const htmlText = await htmlResponse.text();
                            const jsText = await jsResponse.text();

                            const unifiedCode = `<!-- ######## START: index.html ######## -->\n\n${htmlText}\n\n<!-- ######## END: index.html ######## -->\n\n\n\n/* ######## START: app.js ######## */\n\n${jsText}\n\n/* ######## END: app.js ######## */`;

                            letterTemplateTextarea.value = unifiedCode;
                            letterPreview.textContent = unifiedCode;
                        } catch (error) {
                            console.error('Gagal memuat kode sumber:', error);
                            const errorMessage = 'Gagal memuat kode sumber. Pastikan file index.html dan app.js dapat diakses.';
                            letterTemplateTextarea.value = errorMessage;
                            letterPreview.textContent = errorMessage;
                        }
                        break;
                    }
                    case 'jadwalkanKunjungan': {
                        const eventTitle = `Kunjungan ${newestStore.name || 'Toko Baru'}`;
                        const eventDetails = `Kunjungan ke ${newestStore.name || 'Toko'}. Alamat: ${newestStore.address || 'N/A'}. Kontak: ${newestStore.phone || 'N/A'}.`;
                        window.open(`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(newestStore.address)}`, '_blank');
                        break;
                    }
                    case 'buatNota':
                        purchaseNoteOverlay.classList.add('active');
                        notaItemsContainer.innerHTML = '';
                        addNotaItem(); // Add one item row by default
                        break;
                }
            }

            // --- Purchase Note Logic ---
            function addNotaItem() {
                const itemId = crypto.randomUUID();
                const itemRow = document.createElement('div');
                itemRow.className = 'item-row';
                itemRow.setAttribute('data-id', itemId);
                itemRow.innerHTML = `
                    <input type="text" class="nota-item-name" placeholder="Nama produk">
                    <input type="number" class="nota-item-qty" placeholder="Qty" value="1" style="width: 50px;">
                    <input type="number" class="nota-item-price" placeholder="Harga" style="width: 80px;">
                    <button class="btn btn-danger btn-sm delete-item-btn">&times;</button>
                `;
                notaItemsContainer.appendChild(itemRow);
            }

            function calculateNotaTotal() {
                let total = 0;
                notaItemsContainer.querySelectorAll('.item-row').forEach(row => {
                    const qty = row.querySelector('.nota-item-qty').value;
                    const price = row.querySelector('.nota-item-price').value;
                    total += (parseInt(qty) || 0) * (parseInt(price) || 0);
                });
                purchaseNoteTotal.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`;
            }

            addNotaItemBtn.addEventListener('click', addNotaItem);
            notaItemsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-item-btn')) {
                    e.target.closest('.item-row').remove();
                    calculateNotaTotal();
                }
            });
            notaItemsContainer.addEventListener('input', calculateNotaTotal);

            // --- Customer Picker Logic ---
            function renderCustomerList(filter = '') {
                customerListContainer.innerHTML = '';
                const filteredStores = savedStores.filter(store => store.name.toLowerCase().includes(filter.toLowerCase()));

                if (filteredStores.length === 0) {
                    customerListContainer.innerHTML = '<p style="text-align:center; color:#999;">Tidak ada pelanggan ditemukan.</p>';
                    return;
                }

                filteredStores.forEach(store => {
                    const item = document.createElement('div');
                    item.className = 'customer-list-item';
                    item.textContent = store.name;
                    item.dataset.id = store.id;
                    customerListContainer.appendChild(item);
                });
            }

            pickCustomerBtn.addEventListener('click', () => {
                renderCustomerList();
                customerPickerOverlay.classList.add('active');
            });

            customerSearchInput.addEventListener('input', (e) => {
                renderCustomerList(e.target.value);
            });

            customerListContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('customer-list-item')) {
                    const storeId = e.target.dataset.id;
                    const selectedStore = savedStores.find(store => store.id === storeId);
                    if (selectedStore) {
                        notaCustomerName.value = selectedStore.name;
                        notaCustomerWhatsapp.value = selectedStore.phone;
                        customerPickerOverlay.classList.remove('active');
                    }
                }
            });

            function generateNotaText() {
                const customerName = notaCustomerName.value.trim();
                let total = 0;
                let itemsText = '';

                notaItemsContainer.querySelectorAll('.item-row').forEach(row => {
                    const name = row.querySelector('.nota-item-name').value.trim();
                    const qty = parseInt(row.querySelector('.nota-item-qty').value) || 0;
                    const price = parseInt(row.querySelector('.nota-item-price').value) || 0;
                    const subtotal = qty * price;
                    total += subtotal;

                    if (name && qty > 0 && price > 0) {
                        itemsText += `\n- ${name} (x${qty}) - Rp ${subtotal.toLocaleString('id-ID')}`;
                    }
                });

                const header = `NOTA PEMBELIAN\nPelanggan: ${customerName || 'Tidak ada nama'}\nTanggal: ${new Date().toLocaleDateString('id-ID')}\n---`;
                const footer = `---\n*TOTAL: Rp ${total.toLocaleString('id-ID')}*`;

                return `${header}${itemsText}\n${footer}`;
            }

            copyNotaBtn.addEventListener('click', async () => {
                const notaText = generateNotaText();
                await navigator.clipboard.writeText(notaText);
                showModal('Sukses', 'Nota berhasil disalin ke clipboard!');
            });

            sendNotaWaBtn.addEventListener('click', () => {
                const customerWhatsapp = notaCustomerWhatsapp.value.trim();
                if (!customerWhatsapp) {
                    showModal('Info', 'Harap masukkan nomor WhatsApp pelanggan.');
                    return;
                }
                const notaText = generateNotaText();
                const url = `https://wa.me/${normalizePhoneNumber(customerWhatsapp)}?text=${encodeURIComponent(notaText)}`;
                window.open(url, '_blank');
            });


            previewLetterBtn.addEventListener('click', () => {
                const newestStore = savedStores.length > 0 ? savedStores.sort((a,b) => b.timestamp - a.timestamp)[0] : null;
                if (!newestStore) {
                    showModal('Info', 'Tidak ada data toko tersimpan untuk membuat pratinjau surat.');
                    return;
                }
                const finalLetter = generateFinalMessage(letterTemplateTextarea.value, newestStore);
                letterPreview.textContent = finalLetter;
            });

            generateLetterBtnAI.addEventListener('click', generateLetterWithAI);

            exportLetterBtn.addEventListener('click', () => {
                if (!letterPreview.textContent.trim()) {
                    showModal('Info', 'Harap buat pratinjau surat terlebih dahulu.');
                    return;
                }
                letterExportContentPreview.textContent = letterPreview.textContent;
                exportLetterOverlay.classList.add('active');
            });

            copyLetterExportBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(letterExportContentPreview.textContent);
                    showModal('Sukses', 'Surat berhasil disalin ke clipboard!');
                } catch (err) {
                    showModal('Gagal', 'Gagal menyalin surat.');
                }
            });

            emailLetterBtn.addEventListener('click', () => {
                const newestStore = savedStores.length > 0 ? savedStores.sort((a,b) => b.timestamp - a.timestamp)[0] : { name: "Pelanggan" };
                const subject = `Informasi untuk ${newestStore.name}`;
                const body = letterExportContentPreview.textContent;
                window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
            });

            downloadTxtBtn.addEventListener('click', () => {
                const newestStore = savedStores.length > 0 ? savedStores.sort((a, b) => b.timestamp - a.timestamp)[0] : { name: "Pelanggan" };
                const textContent = letterExportContentPreview.textContent;
                const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                const filename = `Surat untuk ${newestStore.name.replace(/ /g, '_')}.txt`;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
                showModal('Sukses', `File ${filename} berhasil diunduh. Anda dapat mengunggahnya ke Google Drive.`);
            });


            document.addEventListener('click', (event) => {
                if (!addMenu.contains(event.target) && !addTab.contains(event.target)) {
                    addMenu.classList.remove('active');
                }
            });

            processQuickInputBtnAI.addEventListener('click', parseRawDataWithAI);
            processQuickInputBtnStandard.addEventListener('click', parseRawDataStandard);

            saveQuickInputBtn.addEventListener('click', async () => {
                if (!parsedData.name) {
                    showModal('Gagal', 'Gagal menyimpan. Pastikan nama terdeteksi.');
                    return;
                }

                const isDuplicate = savedStores.some(store => store.phone === parsedData.phone && store.phone);
                if (isDuplicate) {
                    showModal('Info', 'Data toko dengan nomor telepon ini sudah ada. Tidak disimpan.');
                    return;
                }

                temporaryStoreData = { ...parsedData, id: crypto.randomUUID(), timestamp: Date.now() };

                if (temporaryStoreData.phoneType !== 'whatsapp') {
                    finalizeSuccessfulSubmission();
                    return;
                }

                const defaultTemplate = savedTemplates.find(t => t.isActive);
                if (!defaultTemplate) {
                    showModal('Info', 'Harap atur template default di menu Setelan sebelum melanjutkan.');
                    temporaryStoreData = null;
                    return;
                }

                const finalMessage = generateFinalMessage(defaultTemplate.content, temporaryStoreData);
                const phoneNumber = temporaryStoreData.phone;

                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`, '_blank');

                setTimeout(promptForWhatsAppSuccess, 3000);
            });

            parsedChipsContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('chip-delete-btn')) {
                    parsedData[event.target.dataset.type] = '';
                    displayParsedChips(parsedData);
                }
            });

            storeDataOverlay.addEventListener('click', async (event) => {
                const target = event.target.closest('.btn');
                if (!target) return;

                const storeId = target.dataset.id;
                if (!storeId) return;

                const storeIndex = savedStores.findIndex(s => s.id === storeId);
                const storeToHandle = savedStores[storeIndex];

                if (target.classList.contains('delete-store-btn')) {
                    const confirmed = await showModal('Konfirmasi', 'Apakah Anda yakin ingin menghapus data toko ini?', true);
                    if (confirmed) {
                        savedStores.splice(storeIndex, 1);
                        saveAndRerenderStores();
                        showModal('Sukses', 'Data toko berhasil dihapus!');
                    }
                } else if (target.classList.contains('edit-store-btn')) {
                    quickInputTextarea.value = `${storeToHandle.name}\n${storeToHandle.address}\n${storeToHandle.phone}`;
                    storeDataOverlay.classList.remove('active');
                    quickInputOverlay.classList.add('active');
                    parsedData = storeToHandle;
                    displayParsedChips(parsedData);
                    processQuickInputBtnAI.style.display = 'none';
                    processQuickInputBtnStandard.style.display = 'none';
                    saveQuickInputBtn.style.display = 'block';
                    saveQuickInputBtn.textContent = 'Perbarui & Selesai';
                    savedStores.splice(storeIndex, 1);
                } else if (target.classList.contains('personalized-ai-btn')) {
                    currentStoreForPersonalizedMessage = storeToHandle;
                    personalizedMessageStoreName.textContent = storeToHandle.name;
                    personalizedMessageGoal.value = '';
                    personalizedMessageResult.value = '';
                    personalizedMessageOverlay.classList.add('active');
                }
            });

            variableButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetId = btn.dataset.target;
                    const textarea = document.getElementById(targetId);
                    if(!textarea) return;

                    const variable = btn.dataset.variable;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    textarea.value = textarea.value.substring(0, start) + variable + textarea.value.substring(end);
                    textarea.focus();
                    textarea.selectionEnd = start + variable.length;
                });
            });

            createNewTemplateBtn.addEventListener('click', () => openTemplateEditor());
            saveTemplateBtn.addEventListener('click', saveTemplate);
            generateTemplateBtnAI.addEventListener('click', generateTemplateWithAI);

            daftarTemplateContainer.addEventListener('click', async (event) => {
                const target = event.target.closest('.btn');
                if (!target) return;

                const templateId = target.dataset.id;
                const template = savedTemplates.find(t => t.id === templateId);
                if (!template) return;

                if (target.classList.contains('edit-template-btn')) {
                    openTemplateEditor(template);
                } else if (target.classList.contains('delete-template-btn')) {
                    const confirmed = await showModal('Konfirmasi', `Yakin ingin menghapus template "${template.title}"?`, true);
                    if (confirmed) {
                        savedTemplates = savedTemplates.filter(t => t.id !== templateId);
                        localStorage.setItem('savedTemplates', JSON.stringify(savedTemplates));
                        renderTemplates();
                        showModal('Sukses', 'Template berhasil dihapus.');
                    }
                }
            });


            hapusSemuaStoreBtn.addEventListener('click', async () => {
                const confirmed = await showModal('Konfirmasi', 'Apakah Anda yakin ingin menghapus semua data toko? Tindakan ini tidak dapat dibatalkan.', true);
                if (confirmed) {
                    savedStores = [];
                    saveAndRerenderStores();
                    showModal('Sukses', 'Semua data toko berhasil dihapus.');
                }
            });

            saveAllSettingsBtn.addEventListener('click', saveSettings);

            function getExportFilename(baseName, extension) {
                const date = new Date().toISOString().slice(0, 10);
                const defaultFilename = `${baseName}_${date}`;
                const userFilename = prompt(`Masukkan nama file (tanpa ekstensi .${extension}):`, defaultFilename);
                if (userFilename === null || userFilename.trim() === '') {
                    return null; // User cancelled or entered empty name
                }
                return `${userFilename.trim()}.${extension}`;
            }

            function exportToCsv() {
                if (savedStores.length === 0) {
                    showModal('Info', 'Tidak ada data untuk diekspor.');
                    return;
                }

                const filename = getExportFilename('data_toko', 'csv');
                if (!filename) {
                    showModal('Info', 'Ekspor dibatalkan.');
                    return;
                }

                const headers = ['Nama Toko', 'Alamat Toko', 'Nomor Telepon', 'Tipe Telepon'];
                const csvRows = [headers.join(',')];

                const escapeCsvCell = (cell) => {
                    const strCell = String(cell || '');
                    if (strCell.includes(',') || strCell.includes('"') || strCell.includes('\n')) {
                        return `"${strCell.replace(/"/g, '""')}"`;
                    }
                    return strCell;
                };

                savedStores.forEach(store => {
                    const row = [
                        escapeCsvCell(store.name),
                        escapeCsvCell(store.address),
                        escapeCsvCell(store.phone),
                        escapeCsvCell(store.phoneType)
                    ];
                    csvRows.push(row.join(','));
                });

                const csvString = csvRows.join('\n');
                const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showModal('Sukses', `Data CSV berhasil diunduh sebagai ${filename}.`);
            }

            function exportToVcf() {
                if (savedStores.length === 0) {
                    showModal('Info', 'Tidak ada data untuk diekspor.');
                    return;
                }

                const filename = getExportFilename('kontak_toko', 'vcf');
                if (!filename) {
                    showModal('Info', 'Ekspor dibatalkan.');
                    return;
                }

                const vcfCards = savedStores.map(store => {
                    if (!store.name || !store.phone) return '';
                    return [
                        'BEGIN:VCARD',
                        'VERSION:3.0',
                        `FN:${store.name}`,
                        `ORG:${store.name}`,
                        `TEL;TYPE=CELL:${store.phone}`,
                        `ADR;TYPE=WORK:;;${store.address || ''}`,
                        'END:VCARD'
                    ].join('\n');
                }).filter(card => card !== '').join('\n');

                if (!vcfCards) {
                    showModal('Info', 'Tidak ada data valid (nama & telepon) untuk diekspor ke VCF.');
                    return;
                }

                const blob = new Blob([vcfCards], { type: 'text/vcard;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showModal('Sukses', `File VCF berhasil diunduh sebagai ${filename}.`);
            }

            exportCsvBtn.addEventListener('click', exportToCsv);
            exportVcfBtn.addEventListener('click', exportToVcf);

            // --- SMS Template Management ---
            function renderSmsTemplates() {
                daftarSmsTemplateContainer.innerHTML = '';
                if (savedSmsTemplates.length === 0) {
                    daftarSmsTemplateContainer.innerHTML = '<p style="text-align:center; color:#999;">Belum ada template SMS.</p>';
                    return;
                }
                savedSmsTemplates.forEach(template => {
                    const card = document.createElement('div');
                    card.className = 'template-card';
                    card.innerHTML = `
                        <div class="template-card-header">
                            <span class="template-card-title">${template.title}</span>
                            ${template.isDefault ? '<span class="default-badge">DEFAULT</span>' : ''}
                        </div>
                        <p class="template-card-content">${template.content}</p>
                        <div class="template-card-actions">
                            <button class="btn btn-secondary btn-sm edit-sms-template-btn" data-id="${template.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger btn-sm delete-sms-template-btn" data-id="${template.id}"><i class="fas fa-trash"></i> Hapus</button>
                        </div>
                    `;
                    daftarSmsTemplateContainer.appendChild(card);
                });
            }

            function openSmsTemplateEditor(template = null) {
                if (template) {
                    smsTemplateIdInput.value = template.id;
                    smsTemplateTitleInput.value = template.title;
                    smsTemplateContentInput.value = template.content;
                    isDefaultSmsTemplateCheckbox.checked = template.isDefault;
                } else {
                    smsTemplateIdInput.value = '';
                    smsTemplateTitleInput.value = '';
                    smsTemplateContentInput.value = '';
                    isDefaultSmsTemplateCheckbox.checked = false;
                }
                smsTemplateContentInput.dispatchEvent(new Event('input')); // Update counter
                smsTemplateEditorOverlay.classList.add('active');
            }

            function saveSmsTemplate() {
                const id = smsTemplateIdInput.value;
                const title = smsTemplateTitleInput.value.trim();
                const content = smsTemplateContentInput.value.trim();
                const isDefault = isDefaultSmsTemplateCheckbox.checked;

                if (!title || !content) {
                    showModal('Info', 'Judul dan Isi Pesan SMS tidak boleh kosong.');
                    return;
                }

                if (isDefault) {
                    savedSmsTemplates.forEach(t => t.isDefault = false);
                }

                if (id) {
                    const index = savedSmsTemplates.findIndex(t => t.id === id);
                    if (index > -1) {
                        savedSmsTemplates[index] = { id, title, content, isDefault };
                    }
                } else {
                    savedSmsTemplates.push({ id: crypto.randomUUID(), title, content, isDefault });
                }

                if (!savedSmsTemplates.some(t => t.isDefault) && savedSmsTemplates.length > 0) {
                    savedSmsTemplates[0].isDefault = true;
                }

                localStorage.setItem('savedSmsTemplates', JSON.stringify(savedSmsTemplates));
                renderSmsTemplates();
                smsTemplateEditorOverlay.classList.remove('active');
                showModal('Sukses', 'Template SMS berhasil disimpan!');
            }

            async function generateSmsTemplateWithAI() {
                const prompt = smsTemplateAiPrompt.value.trim();
                if (!prompt) {
                    showModal('Info', 'Harap masukkan ide atau topik untuk SMS AI.');
                    return;
                }

                generateSmsTemplateBtnAI.disabled = true;
                generateSmsTemplateBtnAI.textContent = 'Membuat...';

                const aiContext = `Buat template pesan SMS marketing singkat (maks 160 karakter). Topik: ${prompt}. Gunakan placeholder [Nama Toko].`;
                const payload = { contents: [{ parts: [{ text: aiContext }] }] };
                const result = await callGeminiAPI(API_URL_FLASH, payload);

                generateSmsTemplateBtnAI.disabled = false;
                generateSmsTemplateBtnAI.textContent = '✨ Buat';

                if (result && result.candidates[0].content.parts[0].text) {
                    smsTemplateContentInput.value = result.candidates[0].content.parts[0].text.slice(0, 160);
                    smsTemplateContentInput.dispatchEvent(new Event('input'));
                } else {
                    showModal('Gagal Membuat Pesan', 'AI tidak dapat membuat pesan SMS. Silakan coba lagi.');
                }
            }

            // --- Initial Load ---
            renderSavedStores();
            renderTemplates();
            renderSmsTemplates();
            populateSettings();

            // --- SMS Event Listeners ---
            createNewSmsTemplateBtn.addEventListener('click', () => openSmsTemplateEditor());
            saveSmsTemplateBtn.addEventListener('click', saveSmsTemplate);
            generateSmsTemplateBtnAI.addEventListener('click', generateSmsTemplateWithAI);
            smsTemplateContentInput.addEventListener('input', () => {
                const count = smsTemplateContentInput.value.length;
                smsCharCounter.textContent = `${count}/160`;
            });
            daftarSmsTemplateContainer.addEventListener('click', async (event) => {
                const target = event.target.closest('.btn');
                if (!target) return;

                const templateId = target.dataset.id;
                const template = savedSmsTemplates.find(t => t.id === templateId);
                if (!template) return;

                if (target.classList.contains('edit-sms-template-btn')) {
                    openSmsTemplateEditor(template);
                } else if (target.classList.contains('delete-sms-template-btn')) {
                    const confirmed = await showModal('Konfirmasi', `Yakin ingin menghapus template SMS "${template.title}"?`, true);
                    if (confirmed) {
                        savedSmsTemplates = savedSmsTemplates.filter(t => t.id !== templateId);
                        localStorage.setItem('savedSmsTemplates', JSON.stringify(savedSmsTemplates));
                        renderSmsTemplates();
                        showModal('Sukses', 'Template SMS berhasil dihapus.');
                    }
                }
            });
        });
