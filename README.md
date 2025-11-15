# MailWizard 🧙‍♂️

**Generate magical AI-powered email responses (100% free)**

A Chrome extension that helps you write intelligent email replies using Google Gemini - completely free, no credit card required!

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)

---

## ✨ Features

- 🎯 **Direct Gmail integration** - Floating button + accessible popup
- ⚡ **Automatic generation** - Click and your response is generated
- 🎨 **5 tones available** - Normal, Professional, Friendly, Formal, Academic
- 🔄 **Easy regeneration** - Change tone and regenerate instantly
- 📋 **One-click copy** - Copy response to clipboard
- ✅ **Auto-insert** - Paste directly into Gmail
- 📚 **History** - Access your previous responses
- 🆓 **100% Free** - Uses Google Gemini (no credit card)
- 🔒 **Secure** - Your API key stays on your machine
- 🌐 **Flexible** - Works from any tab with manual paste option

---

## 🚀 Installation

### Step 1: Install the extension

1. **Download** the `MailWizard` folder

2. **Open Chrome** and navigate to:
   ```
   chrome://extensions/
   ```

3. **Enable "Developer mode"** (top right corner)

4. **Click "Load unpacked"**

5. **Select the folder** `MailWizard`

6. ✅ Extension installed! The icon appears in Chrome.

### Step 2: Get your Gemini API key (free)

1. Go to **[Google AI Studio](https://makersuite.google.com/app/apikey)**

2. Sign in with your Google account

3. Click **"Create API Key"** (or "Get API Key")

4. **Copy the generated key**

5. **In the extension**:
   - Click the MailWizard icon
   - Go to "Settings" tab
   - Paste your API key
   - Click "Save Key"

🎉 **That's it! You're ready to go!**

---

## 💡 Usage

### Method 1: Via floating button (fastest)

1. **Open an email** in Gmail
2. **Click the floating button** "Answer with MailWizard" (bottom right)
3. **Popup opens** - click "Generate Magical Answer"
4. **Choose an action**:
   - 🔄 **Regenerate** - Change tone or add instructions
   - 📋 **Copy** - Copy to clipboard
   - ✅ **Paste to Gmail** - Auto-insert the response

### Method 2: Via extension icon

1. **Open an email** in Gmail
2. **Click the MailWizard icon** in Chrome
3. In the popup, click **"Generate Magical Answer"**
4. Use **Regenerate / Copy / Paste** buttons

### Method 3: Manual mode (from any tab)

1. **Copy the email content** you want to reply to
2. **Click the MailWizard icon** from any Chrome tab
3. Click **"Generate Magical Answer"**
4. **Paste the email content** when prompted
5. Get your AI-generated response!

### Customize the response

#### Change the tone
- **Normal** - Neutral and polite (default)
- **Professional** - Formal and business-like
- **Friendly** - Warm and casual
- **Formal** - Very respectful and official
- **Academic** - Precise and scholarly

#### Add instructions
In the "Instructions" field, you can add:
- "Mention my availability on Tuesday"
- "Keep it brief, max 3 sentences"
- "Suggest a phone call"
- etc.

---

## 📚 Popup tabs

### 🎨 Generate (main)
- Tone selector
- Optional instructions field
- Generation button
- Result with actions (Regenerate/Copy/Paste)

### 🕐 History
- List of last 10 generated responses
- Minimalist display (first 2 lines)
- Click to view full response
- Filter by tone and date

### ⚙️ Settings
- Gemini API key configuration
- Key obtaining guide
- Clear history
- Version information

---

## 🎯 Use cases

### 📧 Professional email
```
Received: "Hello, I'd like to discuss the project..."
Tone: Professional
Result: Formal and structured response
```

### 🤝 Friendly email
```
Received: "Hey! Want to grab coffee?"
Tone: Friendly
Result: Warm and casual response
```

### 🎓 Academic email
```
Received: "Professor, regarding the thesis..."
Tone: Academic
Result: Precise and respectful response
```

---

## 🔧 Project structure

```
MailWizard/
├── manifest.json           # extension configuration
├── background/
│   └── background.js       # service worker (Gemini API)
├── content/
│   ├── content.js          # Gmail/Outlook injection
│   └── content.css         # injected elements styles
├── popup/
│   ├── popup.html          # popup interface
│   ├── popup.css           # popup styles
│   └── popup.js            # popup logic
├── icons/                  # icons (16, 32, 48, 128px)
└── README.md               # this file
```

---

## 💰 Costs and limits

### Google Gemini (free tier)
- ✅ **100% free**
- ✅ **No credit card required**
- ✅ **60 requests per minute**
- ✅ **Excellent quality**

For normal usage (10-20 emails/day), you're well within the free limits!

---

## 🛠️ Development

### Technologies used
- **Manifest V3** (latest Chrome version)
- **Google Gemini 2.5-flash API** (free AI)
- **Vanilla JavaScript** (no framework)
- **Modern CSS** (gradients, animations)

### Modify the extension

1. **Change tones**: Edit `background/background.js` in the `buildPrompt()` function
2. **Customize style**: Edit `popup/popup.css` or `content/content.css`
3. **Add features**: Edit `popup/popup.js` or `content/content.js`

### Reload after modifications

1. Go to `chrome://extensions/`
2. Click the reload icon (🔄)
3. Reload Gmail to see changes

---

## ❓ FAQ

### The extension doesn't work
- ✅ Check you're on `mail.google.com`
- ✅ Verify your API key is configured
- ✅ Reload the Gmail page
- ✅ Open an email before clicking MailWizard

### How to get the API key?
Follow the guide in the "Settings" tab of the popup or go to [Google AI Studio](https://makersuite.google.com/app/apikey)

### The response doesn't match
- Change the tone
- Add specific instructions
- Regenerate

### The floating button doesn't appear
- Make sure you've opened an email
- Wait a few seconds
- Reload the page

### Is it really free?
YES! Google Gemini has a completely free tier with no credit card required.

### Outlook support?
Partial support - automatic extraction may not work reliably on Outlook. Use manual mode (copy/paste) as a fallback.

---

## 🔮 Roadmap

### Version 1.1 (coming soon)
- [ ] Improved Outlook support
- [ ] Customizable templates
- [ ] Keyboard shortcuts
- [ ] History export

### Version 1.2 (coming soon)
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Smart suggestions
- [ ] Usage statistics

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest improvements
- Contribute code

---

## 📄 License

This project is under MIT License - Free to use and modify.

---

## 💌 Support

For any questions or issues:
- Open an issue on GitHub
- Check the FAQ above
- Verify your API key is properly configured

---

**Created with ✨ and a bit of magic**

Enjoy MailWizard to save time on your emails! 🧙‍♂️📧