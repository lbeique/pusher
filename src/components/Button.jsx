import styles from '../../styles/Home.module.css'

export default function Button(props = {}) {
    return (
        <button className={styles.button} onClick={props.handleClick}>
        {props.value}
        </button>
    )
}