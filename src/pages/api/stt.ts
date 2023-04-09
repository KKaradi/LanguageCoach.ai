import {submitMessage, } from "@/pages/components/Chat";

const sdk = require("microsoft-cognitiveservices-speech-sdk");

export default async function speechToText(language, setRecording, onText) {
    console.log('starting language',language)
    const speechConfig = sdk.SpeechConfig.fromSubscription("8a573047d17e4d4b9d7308d74ea7dbbb", "eastus");
    speechConfig.speechRecognitionLanguage = language;

    let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case sdk.ResultReason.RecognizedSpeech:
                onText(result.text);
                setRecording(false);
                break;
            case sdk.ResultReason.NoMatch:
                console.log("NOMATCH: Speech could not be recognized.");
                break;
            case sdk.ResultReason.Canceled:
                const cancellation = sdk.CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason == sdk.CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
        }
        speechRecognizer.close();
    });
}