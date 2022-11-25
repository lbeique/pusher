import Head from 'next/head'
import Image from 'next/image'
import Button from '../src/components/Button'
import MessageContainer from '../src/components/MessageContainer'
import MessageForm from '../src/components/MessageForm'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pusher from 'pusher-js'

export default function Home() {

  const [messages, setMessages] = useState([])
  const [color, setColor] = useState('')

  useEffect(() => {
    const pusher = new Pusher('a50b039438a2d6b0a70c', {
      cluster: 'us3'
    });
    const channelName = 'messages'
    const channel = pusher.subscribe(channelName);
    channel.bind('message-event', function(data) {
      setMessages(messages => [...messages, data.message])
    });

    return () => {
      pusher.unsubscribe(channelName)
      pusher.disconnect()
    }
  }, [])
  
  async function sendMessage(message) {
    console.log(message)
    if (message.text) {
      handleMadness()
      const response = await axios.post('/api/message', { message })
      console.log(response)
    }
  }

  function handleMadness() {
    setColor(Math.floor(Math.random()*16777215).toString(16))
  }


  return (
    <div className={styles.container} style={{backgroundColor: `#${color}`}}>
      <Head>
        <title>Pusher Madness</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Pusher Madness!
        </h1>

        <MessageContainer messages={messages}></MessageContainer>
        <MessageForm sendMessage={sendMessage}></MessageForm>
        <Button value={'Push me?'} handleClick={handleMadness}></Button>

      </main>
    </div>
  )
}
