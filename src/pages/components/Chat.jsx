/* eslint-disable react-hooks/exhaustive-deps */
import Message from "./Message.jsx";
import UserInputField from "./InputField.jsx";
import Dropdown from "./Dropdown.jsx";
import InputField from "./InputField.jsx";
import { useState, useEffect, useRef } from "react";
import {languageConfig} from "../utils/language-config.js"


async function submitMessage(message, conversation, setConversation) {
  conversation.push({ role: "user", content: message });
  createCompletion(conversation, setConversation);
  
}

async function createCompletion(conversation, setConversation) {
  console.log("creating completion");
  try {
    console.log("messages before", conversation);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation }),
    });

    const json = await response.json();
    const responseConversation = json.conversation;
    console.log("response conver", responseConversation);
    if (responseConversation !== undefined) {
      setConversation(responseConversation);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function changeLanguage(newLanguage, setCurrentLanguage,setConversation){
    setCurrentLanguage(newLanguage)
    createCompletion(languageConfig[newLanguage].seed, setConversation);
}

export default function Chat() {
  const [conversation, setConversation] = useState(
    languageConfig["English"].seed
  );
  const [currentLanguage, setCurrentLanguage] = useState(
    "English"
  );

  const [recording, setRecording] = useState(false);

  const chatDisplay = useRef(null);


  useEffect(() => {
    createCompletion(conversation, setConversation);
  }, []);

  useEffect(() => {
    chatDisplay.current.scrollTop = 999;
  }, [conversation])


  return (
    <div className="chat">
      <Dropdown
        currentLanguage={currentLanguage}
        languageHandler={(newLanguage)=>changeLanguage(newLanguage,setCurrentLanguage,setConversation)}
      />
      <div className="chatArea">
        <div ref={chatDisplay} className="chatDisplay">
          {conversation.map((msg,indx) => (
            <Message key={indx} body={msg} />
          ))}
          {recording && <Message key='tempMsg' body={{role:'User', content:'.........'}} state='pending'/>}
        </div>
      </div>
      <div className="userInputField">
        <InputField
          languageCode={languageConfig[currentLanguage].code}
          recordingState={{recording, setRecording}}
          submitHandler={(message) => {
            submitMessage(message, conversation, setConversation);
          }}
        />
      </div>
    </div>
  );
}
