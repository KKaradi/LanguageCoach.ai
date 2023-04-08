import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  async function handleButtonClick() {
    const url = '/api/chat';
    const data = 'hola quiero cafe'
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log(responseData)
  }

  handleButtonClick()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
    </main>
  )
}
