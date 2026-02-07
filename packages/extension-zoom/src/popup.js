// Popup script for Voice PA extension
const recordBtn = document.getElementById('recordBtn');
const statusDiv = document.getElementById('status');

let isRecording = false;

recordBtn.addEventListener('click', async () => {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
});

function startRecording() {
    chrome.runtime.sendMessage({ action: 'startRecording' }, (response) => {
        if (response && response.status === 'started') {
            isRecording = true;
            recordBtn.textContent = 'Stop Recording';
            recordBtn.style.background = '#ef4444';
            statusDiv.textContent = 'Recording session...';
        } else {
            statusDiv.textContent = 'Error: ' + (response ? response.message : 'Unknown');
        }
    });
}

function stopRecording() {
    chrome.runtime.sendMessage({ action: 'stopRecording' }, (response) => {
        isRecording = false;
        recordBtn.textContent = 'Start Recording';
        recordBtn.style.background = '#7c3aed';
        statusDiv.textContent = 'Recording stopped. Transcription syncing...';
    });
}
