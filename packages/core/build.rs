fn main() {
    uniffi::generate_scaffolding("src/voice_pa.udl").expect("Expecting valid UDL file");
}
