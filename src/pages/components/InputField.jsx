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
<<<<<<< HEAD
            <textarea ref={textbox} name="" id="" cols="30" rows="10" />
            <OptionBar submitHandler={submitHandler} languageCode={languageCode}/>
=======
            <textarea placeholder='Type something...' ref={textbox} name="" id="" cols="30" rows="10" />
            <OptionBar submitHandler={onSubmit}/>
>>>>>>> 170b99baa76527762344350ce27d84bdaae5623f
        </form>
    )
}