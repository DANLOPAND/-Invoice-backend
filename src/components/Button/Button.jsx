import styles from './Button.module.scss'

const Input = ({id, value, placeholder, onClick}) => {
  return (
      <input className={styles.Button} value={value} id={id} type='submit' placeholder={placeholder} onClick={onClick}/>
  )
}

export default Input
