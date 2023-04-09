const sdk = require("microsoft-cognitiveservices-speech-sdk");

export default async function textToSpeech(text, language) {
    console.log('calling tts')
    const speechConfig = sdk.SpeechConfig.fromSubscription("8a573047d17e4d4b9d7308d74ea7dbbb", "eastus");
    // speechConfig.speechSynthesisLanguage = language;

    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    return new Promise((resolve, reject) => {
        synthesizer.speakTextAsync(text, result => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                const audio = result.audioData;
                resolve(audio);
            } else if (result.reason === sdk.ResultReason.Canceled) {
                reject(result.errorDetails);
            }
        });
    });
}