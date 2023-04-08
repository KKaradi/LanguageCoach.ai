import Message from './Message.jsx'
import UserInputField from './InputField.jsx'
import Dropdown from './Dropdown.jsx'
import { fetchMessages } from '../utils/FetchDataUtil.js'
import InputField from './InputField.jsx';
import { useState, useEffect} from 'react'

//[{role:"user","system","assistant", content:"string"}]
export default function Chat() {
    const [messages, setMessages] = useState([]);
    // fetchMessages().then(r => setMessages(r));
    
    useEffect(() =>{
        fetchMessages().then(r => setMessages(r));
        console.log(messages);
    }, [])


    return (
        <>
            <Dropdown />
            <div className='chat'>
                <div className='chatDisplay'>
                    {messages.map( msg => (
                        <Message body={msg} />
                    ))}
                </div>
                <div className="userInputField">
                    <InputField />
                </div>
            </div>
        </>
    )
}