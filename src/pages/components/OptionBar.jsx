import speechToText from "@/pages/api/stt";
import {useState} from "react";

export default function OptionBar(submitHandler) {
    const [recording, setRecording] = useState(false);
    async function onText(text) {
        console.log(submitHandler)
        submitHandler.submitHandler.onSubmit(text);
    }

    return (
        <div className="optionBar">
            <button onClick={(e) => {
                e.preventDefault();
                speechToText("en-us", setRecording, onText);
                setTimeout(() => {setRecording(true)}, 800);
            }} className="styledButton">{recording ? "Recording..." : "Record"}</button>
            <input className="styledButton" type="submit" value="Send" />
        </div>
    )
}