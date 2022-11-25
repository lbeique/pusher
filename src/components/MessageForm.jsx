import { useState } from 'react';
import styles from '../../styles/Home.module.css'

export default function MessageForm(props = {}) {

    const [message, setMessage] = useState({ text: '', time: '' });

    const getCurrentDate = () => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return `${hours}:${minutes}:${seconds}`;
    };

    const handleChange = (e) => {
        setMessage({text: e.target.value, time: getCurrentDate()});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.sendMessage(message);
        setMessage({ text: '', time: '' });
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                className={styles.input}
                value={message.text}
                onChange={handleChange}
                placeholder="Enter a message..."
            />
            <button className={styles.formButton}>Send</button>
        </form>
    );
}