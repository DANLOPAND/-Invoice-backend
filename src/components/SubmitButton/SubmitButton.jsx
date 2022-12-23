import styles from './SubmitButton.module.scss'

const SubmitButton = ({name}) => {
  return (
      <input className={styles.Button} value={name} type='submit' />
  )
}

export default SubmitButton