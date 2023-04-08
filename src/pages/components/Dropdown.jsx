import {useState} from 'react'
import StyledContainer from './StyledContainer.jsx'

export default () => {
    const [isVisible, setIsVisible] = useState(false);
    const LANGUAGE_OPTIONS = [
        {language: "English", icon: "/flags_icons/gb.svg"},
        {language: "Chinese", icon: "/flags_icons/cn.svg"},
        {language: "Spainish", icon: "/flags_icons/es.svg"},
        {language: "French", icon: "/flags_icons/fr.svg"}
    ]

    return (
        <div className='language-dropdown'>

            <div className='optionList'>
                {isVisible && LANGUAGE_OPTIONS.map(
                    l => (
                        <StyledContainer>
                            <span>{l.language}</span>
                            <img id='flagIcon' src={l.icon} alt="language icon"/>
                        </StyledContainer>
                    )
                )}
            </div>
        </div>
    )
}