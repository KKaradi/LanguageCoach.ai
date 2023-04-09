import { useRef } from 'react'
import OptionBar from './OptionBar.jsx'


export default function InputField({submitHandler, languageCode}) {
    const textbox = useRef(null);

    function onSubmitHandler(e) {
        e.preventDefault(); 
        submitHandler(textbox.current.value)
        textbox.current.value = "";
    }

    function onResetHandler(e){
        e.preventDefault();
        console.log('reset')
    }

    return ( 
        <form onSubmit={onSubmitHandler} onReset={onResetHandler} action="">
            <textarea ref={textbox} name="" id="" cols="30" rows="10" />
            <OptionBar submitHandler={submitHandler} languageCode={languageCode}/>
        </form>
    )
}