import { useRef } from 'react'
import OptionBar from './OptionBar.jsx'


export default function InputField({submitHandler, languageCode}) {
    const textbox = useRef(null);

    function onSubmitHandler(e) {
        e.preventDefault(); 
        submitHandler(textbox.current.value)
        textbox.current.value = "";
        console.log(textbox.current.value)
    }
    return ( 
        <form onSubmit={onSubmitHandler} action="">
            <textarea ref={textbox} name="" id="" cols="30" rows="10" />
            <OptionBar submitHandler={submitHandler} languageCode={languageCode}/>
        </form>
    )
}