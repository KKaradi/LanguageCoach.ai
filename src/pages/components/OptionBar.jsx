import speechToText from "@/pages/api/stt";
import {useState} from "react";

export default function OptionBar(textboxref) {
    const [recording, setRecording] = useState(false);

    return (
        <div className="optionBar">
            <button onClick={(e) => {
                e.preventDefault();
                speechToText("en-us", setRecording);
                setTimeout(() => {setRecording(true)}, 800);
            }} className="styledButton">{recording ? "Recording..." : "Record"}</button>
            <input className="styledButton" type="submit" value="Send"  />
        </div>
    )
}