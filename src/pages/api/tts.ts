const sdk = require("microsoft-cognitiveservices-speech-sdk");

async function textToSpeech(text, language) {
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
    speechConfig.speechRecognitionLanguage = language;

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