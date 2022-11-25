import styles from '../../styles/Home.module.css'

export default function MessageContainer(props = {}) {
    
    return (
        <div className={styles.messageContainer}>
            {props.messages.map((message, index) => (
                <div key={index} className={styles.message}>
                    <div>{message.text}</div>
                    <div>{message.time}</div>
                </div>
            ))}
        </div>
    );
}