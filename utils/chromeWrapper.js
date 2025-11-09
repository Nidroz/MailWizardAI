const safeChrome = {
    runtime: {
        sendMessage: async (message) => {
            if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
                return await chrome.runtime.sendMessage(message);
            }
            console.error("chrome.runtime.sendMessage not available");
            throw new Error("Extension API not available");
        }
    },
    storage: {
        sync: {
            get: async (keys) => {
                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                    return await chrome.storage.sync.get(keys);
                }
                console.error("chrome.storage.sync.get not available");
                return {};
            },
            set: async (data) => {
                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                    return await chrome.storage.sync.set(data);
                }
                console.error("chrome.storage.sync.set not available");
                throw new Error("Storage API not available");
            }
        },
        local: {
            get: async (keys) => {
                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                    return await chrome.storage.local.get(keys);
                }
                console.error("chrome.storage.local.get not available");
                return {};
            },
            set: async (data) => {
                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                    return await chrome.storage.local.set(data);
                }
                console.error("chrome.storage.local.set not available");
                throw new Error("Storage API not available");
            }
        }
    },
    tabs: {
        query: async (queryInfo) => {
            if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
                return await chrome.tabs.query(queryInfo);
            }
            console.error("chrome.tabs.query not available");
            throw new Error("Tabs API not available");
        },
        sendMessage: async (tabId, message) => {
            if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.sendMessage) {
                return await chrome.tabs.sendMessage(tabId, message);
            }
            console.error("chrome.tabs.sendMessage not available");
            throw new Error("Tabs API not available");
        }
    }
};

export default safeChrome;