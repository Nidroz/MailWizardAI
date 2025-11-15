// popup logic for MailWizardAI extension
console.log("MailWizardAI popup script loaded");

class MailWizardPopup {
    constructor() {
        this.currentTab = "generate";
        this.currentResponse = "";
        //this.init();
    }

    async init() {
        await this.loadApiKey();
        this.setupTabs();
        this.setupGenerateTab();
        this.setupSettingsTab();
        await this.loadHistory();
        console.log("MailWizardAI popup initialized");
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        // update tab buttons
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        // update tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tabName}-panel`);
        });
        this.currentTab = tabName;
        if (tabName === "history") { // reload history when switching to history tab
            this.loadHistory();
        }
    }

    setupGenerateTab() {
        const generateButton = document.getElementById('generate-button');
        const regenerateButton = document.getElementById('regenerate-button');
        const copyButton = document.getElementById('copy-button');
        const pasteButton = document.getElementById('paste-button');
        generateButton.addEventListener('click', () => this.generateResponse());
        regenerateButton.addEventListener('click', () => this.generateResponse());
        copyButton.addEventListener('click', () => this.copyResponse());
        pasteButton.addEventListener('click', () => this.pasteResponse());
        console.log("Generate tab setup complete");
    }

    async loadHistory() {
        console.log("Loading history...");
        try {
            console.log("RUNTIME", chrome.runtime);
            const result = await chrome.runtime.sendMessage({ action: "getHistory" });
            if (result.success && result.history && result.history.length > 0) {
                this.displayHistory(result.history);
            } else {
                const historyList = document.getElementById('history-list');
                historyList.innerHTML = `
                    <div class="empty-state">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <p>No history found yet</p>
                        <small>Your generated answers will appear here</small>
                    </div>
                `;
            }
        } catch (error) {
            console.error("Error loading history:", error);
        }
    }

    displayHistory(history) {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            const date = new Date(item.timestamp);
            const dateStr = date.toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
            historyItem.innerHTML = `
                <div class="history-item-header">
                <span class="history-item-tone">${this.getToneName(item.tone)}</span>
                <span class="history-item-date">${dateStr}</span>
                </div>
                <div class="history-item-text">${item.text}</div>
            `;
            historyItem.addEventListener('click', () => {
                this.showHistoryItem(item);
            });
            historyList.appendChild(historyItem);
        });
    }

    getToneName(tone) {
        const toneNames = {
            'normal': 'Normal',
            'professional': 'Professional',
            'friendly': 'Friendly',
            'formal': 'Formal',
            'academic': 'Academic'
        };
        return toneNames[tone] || 'Normal';
    }

    showHistoryItem(item) {
        this.switchTab('generate');
        this.currentResponse = item.text;
        this.showResult(item.text);
        document.getElementById('tone-select').value = item.tone;
    }

    async generateResponse() {
        const tone = document.getElementById('tone-select').value;
        const instructions = document.getElementById('instructions-input').value;
        document.getElementById('loading-state').style.display = 'block';
        document.getElementById('result-container').style.display = 'none';
        try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
            const activeTab = tabs[0];
            let emailContent = "";
            // try to get email content from Gmail/Outlook
            if (activeTab.url.includes('mail.google.com') || activeTab.url.includes('outlook.office.com/mail')) {
                try {
                    const response = await chrome.tabs.sendMessage(activeTab.id, {
                        action: "getEmailContent",
                    });
                    if (response.success && response.content) {
                        emailContent = response.content;
                    }
                } catch (error) {
                    console.log("Could not extract email from page:", error);
                }
            }
            // if no email content extracted, ask user to provide it
            if (!emailContent) {
                emailContent = prompt("Paste the email content you want to reply to:");
                if (!emailContent) {
                    throw new Error("No email content provided.");
                }
            }

            const result = await chrome.runtime.sendMessage({
                action: "generateResponse",
                emailContent: emailContent,
                tone: tone,
                instructions: instructions
            });
            document.getElementById('loading-state').style.display = 'none';

            if (result.success && result.data) {
                this.currentResponse = result.data;
                this.showResult(result.data);
            } else {
                alert("Error: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            document.getElementById('response-text').style.display = "none";
            alert("Error: " + error.message);
        }
    }

    showResult(text) {
        document.getElementById('response-text').textContent = text;
        document.getElementById('result-container').style.display = "block";
    }

    async copyResponse() {
        try {
            await navigator.clipboard.writeText(this.currentResponse);
            
            const button = document.getElementById('copy-button');
            const originalHTML = button.innerHTML;
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
                </svg>
                Copied !
            `;
            button.style.background = '#059669';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
        }, 2000);

        } catch (error) {
            alert('Error copying: ' + error.message);
        }
    }

    async pasteResponse() {
        try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
            const activeTab = tabs[0];
            if (!activeTab.url.includes('mail.google.com') && !activeTab.url.includes('outlook.office.com/mail')) {
                alert("This extension only works on Gmail and Outlook web interfaces.");
                return;
            }
            await chrome.tabs.sendMessage(activeTab.id, {
                action: 'insertResponse',
                text: this.currentResponse
            });
            const button = document.getElementById('paste-button');
            const originalHTML = button.innerHTML;
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
                </svg>
                Pasted !
            `;
            setTimeout(() => {
                button.innerHTML = originalHTML;
            }, 2000);
        } catch (error) {
            alert("Error: " + error.message);
        }
    }

    setupSettingsTab() {
        const toggleButton = document.getElementById('toggle-key-visibility');
        const saveButton = document.getElementById('save-api-key-button');
        const clearHistoryButton = document.getElementById('clear-history-button');
        toggleButton.addEventListener('click', () => {
            const input = document.getElementById('api-key-input');
            input.type = input.type === 'password' ? 'text' : 'password';
        });
        saveButton.addEventListener('click', () => this.saveApiKey());
        clearHistoryButton.addEventListener('click', () => this.clearHistory());
        console.log("Settings tab setup complete");
    }

    async loadApiKey() {
        try {
            const { geminiApiKey } = await chrome.storage.sync.get(['geminiApiKey']);
            if (geminiApiKey) {
                document.getElementById('api-key-input').value = geminiApiKey;
                this.updateApiStatus(true);
            }
        } catch (error) {
            console.error("Error loading API key;", error)
        }
    }

    updateApiStatus(isApiSet) {
        const statusText = document.getElementById('status-text');
        const apiStatus = document.getElementById('api-status');
        if (isApiSet) {
            statusText.textContent = "✓ API Key Set";
            apiStatus.classList.add("success");
            apiStatus.classList.remove("error");
        } else {
            statusText.textContent = "✗ API Key Not Set";
            apiStatus.classList.remove("success");
        }
    }

    async saveApiKey() {
        const apiKey = document.getElementById('api-key-input').value.trim();
        if (!apiKey) {
            alert('Please enter a valid API key');
            return;
        }
        try {
            await chrome.storage.sync.set({ geminiApiKey: apiKey });
            this.updateApiStatus(true);
            
            const button = document.getElementById('save-api-key-button');
            const originalHTML = button.innerHTML;
            button.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
                </svg>
                Saved !
            `;
            button.style.background = '#10B981';
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = "";
            }, 2000);
        } catch (error) {
            alert('Error saving API key: ' +error.message);
        }
    }

    async clearHistory() {
        if (!confirm('Are you sure you want to clear the hisotry ?')) {
            return;
        }
        try {
            await chrome.storage.local.set({ history: [] });
            await this.loadHistory();
            alert('✓ History cleared');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}



let popup = null;

function initPopup() {
    // console.log("=== INIT DEBUG ===");
    // console.log("typeof chrome:", typeof chrome);
    // console.log("chrome:", chrome);
    // console.log("chrome.runtime:", chrome?.runtime);
    // console.log("chrome.storage:", chrome?.storage);
    // console.log("==================");
    
    popup = new MailWizardPopup();
    popup.init();
}

// Triple vérification
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup);
} else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // Attendre un peu pour être sûr
    setTimeout(initPopup, 50);
} else {
    initPopup();
}