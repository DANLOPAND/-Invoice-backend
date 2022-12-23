import styles from './Button.module.scss'

const Input = ({name, onClick}) => {
  return (
      <button className={styles.Button} onClick={onClick}> {name} </button>
  )
}

export default Input
