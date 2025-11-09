// for content Gmail / Outlook integration
console.log("MailWizardAI content script loaded");

function waitForGmail() {
    return new Promise((resolve) => {
        if (document.querySelector('[role="main"]')) {
            resolve();
        } else {
            const observer = new MutationObserver(() => {
                if (document.querySelector('[role="main"]')) {
                    observer.disconnect();
                    resolve();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true })
        }
    });
}

function extractEmailContent() {
    const selectors = [
        '[data-message-id] [dir="ltr"]',
        '.a3s.aiL',
        '.ii.gt',
        '[role="listitem"] [dir="ltr"]'
    ];

    for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            const lastElement = elements[elements.length - 1];
            const emailContent = lastElement.innerText || lastElement.textContent;
            if (emailContent && emailContent.trim().length > 10) {
                return emailContent.trim();
            }
        }
    }
    return null;
}

function insertResponseIntoGmail(text) {
    const replyButtons = document.querySelectorAll('[role="button"]');
    let replyClicked = false;

    for (const button of replyButtons) {
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes('reply') || buttonText.includes('respond') 
            || buttonText.includes('répondre') || buttonText.includes('repondre')) {
            button.click();
            replyClicked = true;
            break;
        }
    }

    setTimeout(() => {
        const composeArea = document.querySelector('[role="textbox"][aria-label*="Corps"]') ||
            document.querySelector('[role="textbox"][g_editable="true"]') ||
            document.querySelector('div[aria-label*="Message"]');

        if (composeArea) {
            composeArea.focus();
            composeArea.innerText = text;
            const event = new Event('input', { bubbles: true });
            composeArea.dispatchEvent(event);
            showNotification('✓ Response inserted with success !', 'success');
        } else {
            showNotification('⚠ Impossible to find compose area', 'error');
        }
    }, replyClicked ? 500 : 100);
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `mailwizard-notification mailwizard-notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function observeEmailChanges() {
    const observer = new MutationObserver(() => {
        injectFloatingButton();
    });
    const emailView = document.querySelector('[role="main"]');
    if (emailView) {
        observer.observe(emailView, { childList: true, subtree: true });
    }
}

function injectFloatingButton() {
    const existingBtn = document.querySelector('.mailwizard-floating-btn');
    if (existingBtn) existingBtn.remove();
    const emailView = document.querySelector('[role="main"]');
    if (!emailView) return;
    const emailContent = extractEmailContent();
    if (!emailContent) return;
    
    const floatingBtn = document.createElement('button');
    floatingBtn.className = 'mailwizard-floating-btn';
    floatingBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Answer avec MailWizard</span>
    `;
    floatingBtn.title = 'Generate Magical Answer';
    
    floatingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // open the extension popup instead of sending message
        //chrome.runtime.sendMessage({ action: 'openPopupAndGenerate' });
        showNotificationhowNotification('📧 Open MailWizard extension to generate an answer', 'info');
    });
    document.body.appendChild(floatingBtn);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getEmailContent') {
        const emailContent = extractEmailContent();
        sendResponse({ success: true, content: emailContent});
    }
    if (request.action === 'insertResponse') {
        insertResponseIntoGmail(request.text);
        sendResponse({ success: true});
    }
    return true;
});

waitForGmail().then(() => {
    console.log('MailWizard: Gmail loaded, initializing...');
    injectFloatingButton();
    observeEmailChanges();
    setInterval(injectFloatingButton, 2000)
});