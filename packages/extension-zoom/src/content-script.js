// Content script to inject transcription overlay into Google Meet
console.log('Voice PA: Content script injected');

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'voice-pa-overlay';
    overlay.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        max-width: 800px;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(10px);
        color: white;
        padding: 20px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 9999;
        font-family: sans-serif;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        display: none;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 0.8rem;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 1px;
    `;
    header.innerHTML = '<span>Voice PA Live Transcript</span><span id="vpa-status">Syncing...</span>';

    const content = document.createElement('div');
    content.id = 'vpa-transcript-content';
    content.style.cssText = `
        height: 100px;
        overflow-y: auto;
        font-size: 1.1rem;
        line-height: 1.5;
    `;
    content.innerHTML = '<i>Transcript will appear here once audio processing starts...</i>';

    overlay.appendChild(header);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    return overlay;
}

const overlay = createOverlay();

function getMeetMetadata() {
    const title = document.querySelector('[data-meeting-title]')?.textContent ||
        document.querySelector('.Jyj16')?.textContent ||
        'Google Meet Session';
    const participants = document.querySelector('.uGOf1d')?.textContent || '1';
    return { title, participants };
}

// Send metadata to background once overlay is created or on request
function syncMetadata() {
    const metadata = getMeetMetadata();
    chrome.runtime.sendMessage({ action: 'updateMetadata', metadata });

    // Update overlay status if needed
    const status = document.getElementById('vpa-status');
    if (status) status.textContent = `${metadata.participants} Participants`;
}

// Poll for metadata changes
setInterval(syncMetadata, 5000);

// Listen for updates from background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateTranscript') {
        const content = document.getElementById('vpa-transcript-content');
        if (content) {
            content.innerHTML = `<p>${request.text}</p>`;
            overlay.style.display = 'block';
        }
    }
});
