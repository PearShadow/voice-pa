use criterion::{black_box, criterion_group, criterion_main, Criterion};
use voice_pa_core::audio::{AudioRecorder, AudioConfig};

fn benchmark_audio_recording(c: &mut Criterion) {
    c.bench_function("audio_config_creation", |b| {
        b.iter(|| {
            black_box(AudioConfig::default());
        });
    });
}

criterion_group!(benches, benchmark_audio_recording);
criterion_main!(benches);
