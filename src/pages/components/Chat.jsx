/* eslint-disable react-hooks/exhaustive-deps */
import Message from "./Message.jsx";
import UserInputField from "./InputField.jsx";
import Dropdown from "./Dropdown.jsx";
import InputField from "./InputField.jsx";
import { useState, useEffect } from "react";
import { languageConfig } from "../utils/language-config.js";
import RegenerationPopUp from "./RegenerationPopUp.jsx";



export async function submitMessage(message, conversation, setConversation) {
  conversation.push({ role: "user", content: message });
  createCompletion(conversation, setConversation);
}


export async function createCompletion(conversation, setConversation) {
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
    // console.log("response conver", responseConversation);
    if (responseConversation !== undefined) {
      setConversation(responseConversation);
    }
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

export default function Chat() {
  const [conversation, setConversation] = useState(
    languageConfig["English"].seed
  );
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [regenerationPopUpOpen, setRegenerationPopUpOpen] = useState(false);

  useEffect(() => {
    createCompletion(conversation, setConversation);
  }, []);

  return (
    <div className="chat">
      <Dropdown
        currentLanguage={currentLanguage}
        languageHandler={(newLanguage) =>
          changeLanguage(newLanguage, setCurrentLanguage, setConversation)
        }
      />
      <div className="chatArea">
        <div className="chatDisplay">
          {conversation.map((msg, indx) => (
            <Message key={indx} body={msg} />
          ))}
        </div>
      </div>
      <div className="userInputField">
        <InputField
          languageCode={languageConfig[currentLanguage].code}
          resetHandler={() => setRegenerationPopUpOpen(true)}
          submitHandler={(message) => {
            submitMessage(message, conversation, setConversation);
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
