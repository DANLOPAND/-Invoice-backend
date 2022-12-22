import styles from './Button.module.scss'

const Button = ({name}) => {
  return (
      <input className={styles.Button} value={name} type='submit' />
  )
}

export default Button