import Message from "./Message.jsx";
import Dropdown from "./Dropdown.jsx";
import InputField from "./InputField.jsx";
import { useState, useEffect } from "react";
import textToSpeech from "@/pages/api/tts";


export async function submitMessage(message, conversation, setConversation, audioPlaying, setAudioPlaying){
    conversation.push({role:"user",content:message});
    createCompletion(conversation,setConversation, audioPlaying, setAudioPlaying);
}

export async function createCompletion(conversation, setConversation, audioPlaying, setAudioPlaying) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation }),
    });

    const json = await response.json();
    const responseConversation = json.conversation;
    if (responseConversation !== undefined) {
      setConversation(responseConversation);

      if (!audioPlaying) {
        setAudioPlaying(true);
        textToSpeech(responseConversation[responseConversation.length - 1].content, "es").then((e) => {
          const audioCtx = new AudioContext();

          audioCtx.decodeAudioData(e, function (buffer) {
            const source = audioCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(audioCtx.destination);
            source.addEventListener('ended', () => {
              setAudioPlaying(false);
            });
            source.start();
          });
        });

      }
    }

    // console.log('g',response,messages)
  } catch (error) {
    console.error(error);
  }
}

const ORDER_A_DRINK_CONVERSATION_SEED = [
  {
    role: "system",
    content:
      "You are a Spanish chat bot roleplaying as a Spanish Barista. The user will submit messages in Spanish and as an assistant your job is to respond.",
  },
];

//[{role:"user","system","assistant", content:"string"}]
export default function Chat() {
  const [conversation, setConversation] = useState(ORDER_A_DRINK_CONVERSATION_SEED);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    createCompletion(conversation, setConversation, audioPlaying, setAudioPlaying);
  }, []);

  return (
    <>
      <Dropdown />
      <div className="chat">
        <div className="chatDisplay">
          {conversation.map((msg,indx) => (
            <Message key={indx} body={msg} />
          ))}
        </div>
        <div className="userInputField">
          <InputField onSubmit = {(message)=>{submitMessage(message,conversation,setConversation, audioPlaying, setAudioPlaying)}} />
        </div>
      </div>
    </>
  );
}
