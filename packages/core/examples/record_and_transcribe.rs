use voice_pa_core::audio::{AudioRecorder, AudioConfig, AudioFormat, WavEncoder, AudioEncoder};
use voice_pa_core::transcription::WhisperClient;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    env_logger::init();
    
    println!("🎙️  Voice PA Core - Audio Recording Example");
    println!("==========================================\n");

    // Check for API key
    let api_key = env::var("OPENAI_API_KEY")
        .expect("OPENAI_API_KEY environment variable not set");

    // Create audio recorder
    println!("1. Creating audio recorder...");
    let config = AudioConfig {
        sample_rate: 16000,
        channels: 1,
        format: AudioFormat::Wav,
    };
    
    let mut recorder = match AudioRecorder::with_config(config) {
        Ok(r) => {
            println!("   ✓ Audio recorder created successfully");
            r
        }
        Err(e) => {
            eprintln!("   ✗ Failed to create recorder: {}", e);
            eprintln!("   Note: This might fail if no audio input device is available");
            return Ok(());
        }
    };

    // Start recording
    println!("\n2. Starting recording...");
    recorder.start_recording().await?;
    println!("   ✓ Recording started");
    println!("   🔴 Recording for 5 seconds... Speak now!");

    // Record for 5 seconds
    tokio::time::sleep(tokio::time::Duration::from_secs(5)).await;

    // Stop recording
    println!("\n3. Stopping recording...");
    let audio_data = recorder.stop_recording().await?;
    println!("   ✓ Recording stopped");
    println!("   📊 Captured {} samples", audio_data.len());
    println!("   ⏱️  Duration: {:.2} seconds", recorder.duration());

    // Encode to WAV
    println!("\n4. Encoding to WAV...");
    let encoder = WavEncoder::new();
    let actual_rate = recorder.actual_sample_rate();
    let actual_channels = recorder.actual_channels();
    println!("   ℹ️  Actual config: {} Hz, {} channels", actual_rate, actual_channels);
    
    let wav_data = encoder.encode(&audio_data, actual_rate, actual_channels)?;
    println!("   ✓ Encoded to WAV");
    println!("   📦 WAV file size: {} bytes", wav_data.len());

    // Save to file
    println!("\n5. Saving to file...");
    std::fs::write("recording.wav", &wav_data)?;
    println!("   ✓ Saved to recording.wav");

    // Transcribe with Whisper
    println!("\n6. Transcribing with OpenAI Whisper...");
    let client = WhisperClient::new(api_key);
    
    match client.transcribe(&wav_data).await {
        Ok(transcript) => {
            println!("   ✓ Transcription complete");
            println!("\n📝 Transcript:");
            println!("   Language: {}", transcript.language);
            println!("   Text: {}", transcript.text);
            println!("\n   Segments:");
            for segment in &transcript.segments {
                println!("   [{:.2}s - {:.2}s] {}", 
                    segment.start_time, 
                    segment.end_time, 
                    segment.text
                );
            }
        }
        Err(e) => {
            eprintln!("   ✗ Transcription failed: {}", e);
            eprintln!("   Note: Make sure OPENAI_API_KEY is set correctly");
        }
    }

    println!("\n✅ Example completed!");
    Ok(())
}
