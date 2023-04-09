
import { useState } from 'react'
import ChatSetting from './ChatSetting.jsx';
import Dropdown from './Dropdown.jsx';

export default function SettingBox({languageState, languageHandler, setContinuousConversation}) {
    const [visibleId, setVisibleId] = useState(0);
    
    return (
        <div className="settingBox">
            <Dropdown
                currentLanguage={languageState}
                languageHandler={languageHandler}
                visibleElm={{visibleId, setVisibleId}}
            />
            <ChatSetting
                visibleElm={{visibleId, setVisibleId}}
                setContinuousConversation={setContinuousConversation}
            />
        </div>
    );
}