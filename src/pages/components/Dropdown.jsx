import {useState} from 'react'

export default () => {
    const [isVisible, setIsVisible] = useState(false);
    const LANGUAGE_OPTIONS = ['English', 'Chinese', 'Spanish']

    return (
        <div className='language-dropdown'>
            

            <div className='optionList'>
                <div>English</div>
                <div>Spanish</div>
                <div>Chinese</div>
            </div>
        </div>
    )
}