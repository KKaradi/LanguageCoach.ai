import Navbar from './components/Navbar.jsx'
import Chat from "./components/Chat.jsx"

export default function Home() {
    return (
        <>
            <Navbar/>
            <div id='centeredContainer'>
                <main>
                <Chat />
                </main>
            </div>
        </>
    )
}