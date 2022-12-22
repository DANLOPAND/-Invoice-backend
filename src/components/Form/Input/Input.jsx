import styles from './Input.module.scss'

const Input = ({name, type, disabled, max, onChange, value}) => {
  // prettier-ignore

  return (
    <label className={styles.Input}>
      {name}
      <input type={type} value={value} maxLength={max || 255} disabled={disabled} onChange={onChange}/>
    </label>
  )
}

export default Input
