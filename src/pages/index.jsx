import Navbar from './components/Navbar.jsx'
import Chat from "./components/Chat.jsx"

export default function Home() {
    return (
        <>
            <header>
                <Navbar/>
            </header>
            <main>
               <Chat />
            </main>
        </>
    )
}