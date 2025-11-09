chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'generateResponse') {
        handleGenerateResponse(request)
          .then(response => sendResponse(response))
          .catch(error => sendResponse({ success: false, error: error.message }));
        return true; //to indicates that the response is sent asynchronously
    }
    if (request.action === 'saveToHistory') {
        saveToHistory(request.data)
          .then(response => sendResponse({ success: true }))
          .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
    if (request.action === 'getHistory') {
        getHistory()
          .then(response => sendResponse({ success: true, history: response }))
          .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
});

async function handleGenerateResponse({ emailContent, tone, instructions }) {
    try {
        const apiKey = await chrome.storage.sync.get(['geminiApiKey']);
        const geminiApiKey = apiKey.geminiApiKey;
        if (!geminiApiKey) {
            return { success: false, error: "GeminiApiKey not configured. Please configure it in the extension settings." }
        }
        const prompt = buildPrompt(emailContent, tone, instructions);
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024
                    }
                })
            }
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || "Error: Gemini API request failed")
        }

        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text.trim();
        await saveToHistory({
            text: generatedText,
            tone: tone,
            timestamp: Date.now(),
            emailSnippet: emailContent.substring(0, 100)
        });
        return { success: true, data: generatedText };
    } catch (error) {
        console.error("Error generating response:", error);
        return { success: false, error: error.message };
    }
}

async function buildPrompt(emailContent, tone, instructions) {
    let toneDescription = "";
    switch (tone) {
        case 'professional':
            toneDescription = "a professional and formal tone";
            break;
        case 'friendly':
            toneDescription = "a friendly and casual tone";
            break;
        case 'formal':
            toneDescription = "a formal and respectful tone";
            break;
        case 'academic':
            toneDescription = "an academic and scholarly tone";
            break;
        default:
            toneDescription = "a neutral tone";
            break;
    }

    let prompt = `I need to reply to the following email:\n\n"${emailContent}"\n\n
        Please draft a response using ${toneDescription}.`;
    if (instructions) {
        prompt += ` Additionally, please follow these instructions: ${instructions}.\n\n`;
    }
    prompt += `The answer must be direct, without an introductory formula like "Here is an answer..." or "Dear...". 
        Starts directly with the content of the response.`;
    return prompt;
}

async function saveToHistory(data) {
    try {
        const { history = [] } = await chrome.storage.local.get(['history']);
        const updatedHistory = [data, ...history].slice(0, 10);
        await chrome.storage.local.set({ history: updatedHistory})
    } catch (error) {
        console.error("Error saving to history:", error);
    }
}

async function getHistory() {
    try {
        const { history = [] } = await chrome.storage.local.get(['history']);
        return history;
    } catch (error) {
        console.error("Error getting to history:", error);
        return [];
    }
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('MailWizard installed successfully');
});