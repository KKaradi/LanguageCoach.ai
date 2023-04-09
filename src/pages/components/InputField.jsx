import { useRef } from 'react'
import OptionBar from './OptionBar.jsx'


export default function InputField(onSubmit) {
    const textbox = useRef(null);

    function onSubmitHandler(e) {
        e.preventDefault(); 
        // onSubmit.onSubmit(textbox.current.value)
        console.log(textbox.current.value)
    }
    return ( 
        <form onSubmit={onSubmitHandler} action="">
            <textarea ref={textbox} name="" id="" cols="30" rows="10" placeholder='Type something...' />
            <OptionBar/>
        </form>
    )
}