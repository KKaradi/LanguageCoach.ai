import {useState} from 'react'
import StyledContainer from './StyledContainer.jsx'

export default () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState({language: "Spanish", icon: "/flags_icons/es.svg"})

    const LANGUAGE_OPTIONS = [
        {language: "English", icon: "/flags_icons/gb.svg"},
        {language: "Chinese", icon: "/flags_icons/cn.svg"},
        {language: "Spanish", icon: "/flags_icons/es.svg"},
        {language: "French", icon: "/flags_icons/fr.svg"},
        {language: "Japanese", icon: "/flags_icons/jp.svg"}

    ]

    function toggleDropdown() {
        setIsVisible(!isVisible)
    }

    return (
        <div className={'languageDropdown '+ (isVisible? 'expanded' : '')}>
            <div onClick={toggleDropdown} className='currentOption'>
                <StyledContainer>
                    <img id='flagIcon' src={currentLanguage.icon} alt="language icon"/>
                </StyledContainer>
            </div>
            <div className='optionList'>
                { LANGUAGE_OPTIONS.map(
                    l => (
                        <StyledContainer clickHandler={() => setCurrentLanguage(l)}>
                            <span>{l.language}</span>
                            <img id='flagIcon' src={l.icon} alt="language icon"/>
                        </StyledContainer>
                    )
                )}
            </div>
        </div>
    )
}