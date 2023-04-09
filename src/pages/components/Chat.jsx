import Message from "./Message.jsx";
import Dropdown from "./Dropdown.jsx";
import InputField from "./InputField.jsx";
import { languageConfig } from "../utils/language-config.js";
import RegenerationPopUp from "./RegenerationPopUp.jsx";
import { useState, useEffect, useRef } from "react";
import textToSpeech from "@/pages/api/tts";
import SettingBox from './SettingBox.jsx'

export async function submitMessage(message, conversation, setConversation, audioPlaying, setAudioPlaying, continuousConversation){
    conversation.push({role:"user",content:message});
    createCompletion(conversation,setConversation, audioPlaying, setAudioPlaying, continuousConversation);
}

export async function createCompletion(conversation, setConversation, audioPlaying, setAudioPlaying, continuousConversation) {
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
              if (continuousConversation) {
                document.getElementById("recordButton").click();
              }
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

export async function changeLanguage(
  newLanguage,
  setCurrentLanguage,
  setConversation
) {
  setCurrentLanguage(newLanguage);
  createCompletion(languageConfig[newLanguage].seed, setConversation);
  
}

export async function regenerate(text,setConversation,currentLanguage){
  if(text === ""){
    createCompletion(languageConfig[currentLanguage].seed, setConversation);
  }else{
    console.log('t;',text)
    createCompletion([{role:'system',content:text}], setConversation);
  }
}

//[{role:"user","system","assistant", content:"string"}]
export default function Chat() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [conversation, setConversation] = useState(
    languageConfig["English"].seed
  );
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [regenerationPopUpOpen, setRegenerationPopUpOpen] = useState(false);

  const [recording, setRecording] = useState(false);

  const chatDisplay = useRef(null);


  useEffect(() => {
    createCompletion(conversation, setConversation, audioPlaying, setAudioPlaying);
  }, []);

  useEffect(() => {
    chatDisplay.current.scrollTop = 999;
  }, [conversation])


  return (
    <div className="chat">
      <SettingBox 
        languageState={currentLanguage} 
        languageHandler={(newLanguage)=>changeLanguage(newLanguage,setCurrentLanguage,setConversation)}
      />
      <div className="chatArea">
        <div ref={chatDisplay} className="chatDisplay">
          {conversation.map((msg,indx) => (
            <Message key = {indx} body={msg} />
          ))}
          {recording && <Message key='tempMsg' body={{role:'User', content:'.........'}} state='pending'/>}
        </div>
      </div>
      <div className="userInputField">
        <InputField
          languageCode={languageConfig[currentLanguage].code}
          resetHandler={() => setRegenerationPopUpOpen(true)}
          recordingState={{recording, setRecording}}
          submitHandler={(message) => {
            submitMessage(message, conversation, setConversation, audioPlaying, setAudioPlaying);
          }}
        />
        <RegenerationPopUp
          regenerationPopUpOpen={regenerationPopUpOpen}
          submitHandler={(text) => {
            regenerate(text,setConversation,currentLanguage);
            setRegenerationPopUpOpen(false);
          }}
        />
      </div>
    </div>
  );
}
