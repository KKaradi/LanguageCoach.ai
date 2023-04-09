import Message from "./Message.jsx";
import UserInputField from "./InputField.jsx";
import Dropdown from "./Dropdown.jsx";
import InputField from "./InputField.jsx";
import { useState, useEffect } from "react";
import textToSpeech from "@/pages/api/tts";
import { languageConfig } from "../utils/language-config.js"


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

export async function changeLanguage(newLanguage, setCurrentLanguage,setConversation){
    setCurrentLanguage(newLanguage)
    createCompletion(languageConfig[newLanguage].seed, setConversation);
}

//[{role:"user","system","assistant", content:"string"}]
export default function Chat() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [conversation, setConversation] = useState(
    languageConfig["English"].seed
  );
  const [currentLanguage, setCurrentLanguage] = useState(
    "English"
  );

  useEffect(() => {
    createCompletion(conversation, setConversation, audioPlaying, setAudioPlaying);
  }, []);


  return (
    <div className="chat">
      <Dropdown
        currentLanguage={currentLanguage}
        languageHandler={(newLanguage)=>changeLanguage(newLanguage,setCurrentLanguage,setConversation)}
      />
      <div className="chatArea">
        <div className="chatDisplay">
          {conversation.map((msg,indx) => (
            <Message key = {indx} body={msg} />
          ))}
        </div>
      </div>
      <div className="userInputField">
        <InputField
            languageCode={languageConfig[currentLanguage].code}
            submitHandler={(message) => {
              submitMessage(message, conversation, setConversation, audioPlaying, setAudioPlaying);
            }}
        />
      </div>
    </div>
  );
}
