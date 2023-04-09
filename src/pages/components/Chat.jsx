/* eslint-disable react-hooks/exhaustive-deps */
import Message from "./Message.jsx";
import UserInputField from "./InputField.jsx";
import Dropdown from "./Dropdown.jsx";
import InputField from "./InputField.jsx";
import { useState, useEffect } from "react";
import {languageConfig} from "../utils/language-config.js"


export async function submitMessage(message, conversation, setConversation) {
  conversation.push({ role: "user", content: message });
  createCompletion(conversation, setConversation);
}


export async function createCompletion(conversation, setConversation) {
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
  const [conversation, setConversation] = useState(
    languageConfig["English"].seed
  );
  const [currentLanguage, setCurrentLanguage] = useState(
    "English"
  );

  useEffect(() => {
    createCompletion(conversation, setConversation);
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
            submitMessage(message, conversation, setConversation);
          }}
        />
      </div>
    </div>
  );
}
