# Rust Core - Testing Guide

## Quick Start

### 1. Install Rust (if not already installed)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### 2. Set up environment

```bash
cd /Users/menilvukovic/projects/voice-pa/packages/core

# Set your OpenAI API key
export OPENAI_API_KEY=your-api-key-here
```

### 3. Run tests

```bash
# Run all tests
cargo test

# Run tests with logging
RUST_LOG=debug cargo test

# Run specific test
cargo test test_audio_config_default
```

## Testing with Real Audio

### Option 1: Record and Transcribe (Live Recording)

This will record 5 seconds of audio from your microphone and transcribe it:

```bash
export OPENAI_API_KEY=your-api-key-here
cargo run --example record_and_transcribe
```

**What it does:**
1. Creates an audio recorder
2. Records 5 seconds of audio
3. Encodes to WAV format
4. Saves to `recording.wav`
5. Transcribes with OpenAI Whisper
6. Displays the transcript

### Option 2: Transcribe Existing File

If you have a WAV file to test with:

```bash
export OPENAI_API_KEY=your-api-key-here
cargo run --example transcribe_file path/to/your/audio.wav
```

### Option 3: Use Test Audio File

Download a test audio file:

```bash
# Download a sample audio file
curl -o test_audio.wav "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"

# Transcribe it
export OPENAI_API_KEY=your-api-key-here
cargo run --example transcribe_file test_audio.wav
```

## Expected Output

### Successful Recording:
```
🎙️  Voice PA Core - Audio Recording Example
==========================================

1. Creating audio recorder...
   ✓ Audio recorder created successfully

2. Starting recording...
   ✓ Recording started
   🔴 Recording for 5 seconds... Speak now!

3. Stopping recording...
   ✓ Recording stopped
   📊 Captured 80000 samples
   ⏱️  Duration: 5.00 seconds

4. Encoding to WAV...
   ✓ Encoded to WAV
   📦 WAV file size: 160044 bytes

5. Saving to file...
   ✓ Saved to recording.wav

6. Transcribing with OpenAI Whisper...
   ✓ Transcription complete

📝 Transcript:
   Language: en
   Text: Hello, this is a test recording.

   Segments:
   [0.00s - 2.50s] Hello, this is a test recording.

✅ Example completed!
```

## Troubleshooting

### "No input device available"
- Make sure you have a microphone connected
- Check system audio permissions
- Try listing audio devices: `cargo run --example list_devices` (if we create it)

### "OPENAI_API_KEY not set"
```bash
export OPENAI_API_KEY=sk-your-key-here
```

### "Transcription failed"
- Verify API key is correct
- Check internet connection
- Ensure audio file is valid WAV format
- Check OpenAI API status

### Build errors
```bash
# Clean and rebuild
cargo clean
cargo build
```

## Performance Benchmarks

Run performance benchmarks:

```bash
cargo bench
```

## What to Test

✅ **Audio Capture**
- Verify microphone input works
- Check sample rate (16000 Hz)
- Confirm mono channel recording

✅ **Audio Encoding**
- WAV file is valid
- File size is reasonable
- Can be played in audio player

✅ **Transcription**
- API connection works
- Transcription is accurate
- Segments have timestamps
- Confidence scores are present

✅ **Error Handling**
- Invalid API key handled
- Network errors handled
- Invalid audio format handled

## Next Steps

Once core tests pass:
1. Test speaker diarization
2. Test offline storage
3. Integrate with mobile app
4. Test FFI bindings
