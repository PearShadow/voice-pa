// Background service worker for Google Meet extension
let audioStream = null;

chrome.runtime.onInstalled.addListener(() => {
    console.log('Voice PA for Google Meet installed');
});

// Handle messages from popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startRecording') {
        startCapture(sendResponse);
        return true; // Keep message channel open for async response
    }
    if (request.action === 'stopRecording') {
        stopCapture(sendResponse);
        return true;
    }
    if (request.action === 'updateMetadata') {
        console.log('Received metadata:', request.metadata);
        // In a real app, store this to associate with the current recording
        currentSessionMetadata = request.metadata;
    }
});

let currentSessionMetadata = null;

async function startCapture(sendResponse) {
    try {
        // Tab capture requires user gesture in some contexts, 
        // but can be initiated from background if permission is granted.
        // For standard extensions, we use chrome.tabCapture.
        chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
            if (!stream) {
                console.error('Error capturing tab audio:', chrome.runtime.lastError);
                sendResponse({ status: 'error', message: 'Failed to capture audio' });
                return;
            }

            audioStream = stream;
            console.log('Audio capture started');

            // In a real implementation, we would process this stream via AudioContext
            // and websocket it to the backend.
            setupAudioProcessing(stream);

            sendResponse({ status: 'started' });
        });
    } catch (error) {
        console.error('Capture error:', error);
        sendResponse({ status: 'error', message: error.message });
    }
}

function stopCapture(sendResponse) {
    if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        audioStream = null;
        console.log('Audio capture stopped');
        sendResponse({ status: 'stopped' });
    } else {
        sendResponse({ status: 'idle' });
    }
}

function setupAudioProcessing(stream) {
    // This is a placeholder for the Worklet/Processor logic
    // const audioContext = new AudioContext();
    // const source = audioContext.createMediaStreamSource(stream);
    // source.connect(audioContext.destination); // Play locally too if needed
}
