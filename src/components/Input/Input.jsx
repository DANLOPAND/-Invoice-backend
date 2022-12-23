import styles from './Input.module.scss'

const Input = ({name, ...prop}) => {
  // prettier-ignore

  return (
    <label className={styles.Input}>
      {name}
      <input  {...prop}/>
    </label>
  )
}

export default Input
