import styles from './Input.module.scss'

const Input = ({reference, name, type, placeholder, pattern, max }) => {
  // prettier-ignore
  return (
    <label className={styles.Input}>
      {name}
      <input ref={reference} type={type} placeholder={placeholder} pattern={'' || pattern} maxLength={max || 255}
      />
    </label>
  )
}

export default Input
