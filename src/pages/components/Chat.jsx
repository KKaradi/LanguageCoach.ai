import Message from './Message.jsx'
import OptionBar from './OptionBar.jsx'
import UserInputField from './InputField.jsx'
import Dropdown from './Dropdown.jsx'
import { fetchMessages } from '../utils/FetchDataUtil.js'
import InputField from './InputField.jsx';

export default function Chat() {
    let messages = [];
    //fetchMessages().then(r => messages=r);

    return (
        <div id='mainContainer'>
            <Dropdown />
            <div className='chat'>
                <div className='chatDisplay'>
                    {messages.map( msg => (
                        <Message body={msg} />
                    ))}
                </div>
                <div className="userInputField">
                    <OptionBar />
                    <InputField />
                </div>
            </div>
        </div>
    )
}