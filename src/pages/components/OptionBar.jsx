import speechToText from "@/pages/api/stt";
import {useState} from "react";

export default function OptionBar({submitHandler, languageCode, recordingState, conversationState}) {
    const {recording, setRecording} = recordingState;
    async function onText(text) {
        submitHandler(text);
    }

    return (
        <div className="optionBar">
            <button onClick={(e) => {
                e.preventDefault();
                speechToText(languageCode, setRecording, onText);
                setTimeout(() => {setRecording(true)}, 500);
            }} className="styledButton" disabled={recording || conversationState
            } id="recordButton">{recording ? "Recording..." : "Record"}</button>
            <input className="styledButton" type="submit" value="Send" />
            <button className="styledButton" type="reset">Regenerate</button>
        </div>
    )
}