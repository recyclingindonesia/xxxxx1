
        document.addEventListener('DOMContentLoaded', () => {
            // ... (DOM Elements and App State remain the same) ...

            // --- DOM Elements ---
            const manualInputOverlay = document.getElementById('manualInputOverlay');
            const manualInputName = document.getElementById('manualInputName');
            const manualInputAddress = document.getElementById('manualInputAddress');
            const manualInputPhone = document.getElementById('manualInputPhone');
            const saveManualInputBtn = document.getElementById('saveManualInputBtn');
            const manualInputNotaBtn = document.getElementById('manualInputNotaBtn');

			// --- App State ---
			let isManualInputForNota = false; // Flag to check the context


            // ... (Existing functions like normalizePhoneNumber, callGeminiAPI, etc., remain) ...

            // --- Event Listeners ---
            addMenuItems.forEach(item => {
                item.addEventListener('click', () => {
                    addMenu.classList.remove('active');
                    const action = item.dataset.action;
                    if (action === 'quick-input') {
                        // ... (existing quick-input logic) ...
                    } else if (action === 'manual-input') {
                        isManualInputForNota = false; // Reset flag
                        manualInputOverlay.classList.add('active');
                    } else if (action === 'ambil-kontak') {
                        // ... (existing ambil-kontak logic) ...
                    } else if (action === 'scan-card') {
                        // ... (existing scan-card logic) ...
                    }
                });
            });

            manualInputNotaBtn.addEventListener('click', () => {
                isManualInputForNota = true; // Set flag for Nota context
                manualInputOverlay.classList.add('active');
            });

            saveManualInputBtn.addEventListener('click', async () => {
                const name = manualInputName.value.trim();
                const address = manualInputAddress.value.trim();
                const phone = manualInputPhone.value.trim();

                if (!name || !phone) {
                    showModal('Info', 'Nama dan Nomor Telepon wajib diisi.');
                    return;
                }

                const newStoreData = {
                    id: crypto.randomUUID(),
                    timestamp: Date.now(),
                    name,
                    address,
                    phone: normalizePhoneNumber(phone),
                    phoneType: normalizePhoneNumber(phone).startsWith('628') ? 'whatsapp' : 'landline'
                };

                // Check for duplicates before saving
                const isDuplicate = savedStores.some(store => store.phone === newStoreData.phone && newStoreData.phone);
                if (isDuplicate) {
                    showModal('Info', 'Data toko dengan nomor telepon ini sudah ada.');
                    return;
                }

                savedStores.push(newStoreData);
                saveAndRerenderStores();

                if (isManualInputForNota) {
                    // If the context is from 'Buat Nota', populate the fields and close
                    notaCustomerName.value = newStoreData.name;
                    notaCustomerWhatsapp.value = newStoreData.phone;
                    manualInputOverlay.classList.remove('active');
                } else {
                    // Follow the regular save and continue flow
                    manualInputOverlay.classList.remove('active');
                    temporaryStoreData = newStoreData;

                    if (temporaryStoreData.phoneType === 'whatsapp') {
                        const defaultTemplate = savedTemplates.find(t => t.isActive);
                        if (defaultTemplate) {
                            const finalMessage = generateFinalMessage(defaultTemplate.content, temporaryStoreData);
                            window.open(`https://wa.me/${temporaryStoreData.phone}?text=${encodeURIComponent(finalMessage)}`, '_blank');
                            setTimeout(promptForWhatsAppSuccess, 3000);
                        } else {
                            finalizeSuccessfulSubmission(); // Save without sending WA if no default template
                        }
                    } else {
                        finalizeSuccessfulSubmission();
                    }
                }

				// Clear the form fields after saving
				manualInputName.value = '';
				manualInputAddress.value = '';
				manualInputPhone.value = '';
            });


            async function handleModuleAction(action) {
                // ... (existing handleModuleAction logic) ...

                switch (action) {
                    // REMOVE 'tempelData' case
                    // case 'tempelData': ...

                    // ... (other cases remain the same) ...
                }
            }

            // ... (Rest of the app.js code remains the same) ...
        });
