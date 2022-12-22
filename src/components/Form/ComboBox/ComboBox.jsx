import styles from './ComboBox.module.scss'

const ComboBox = ({ name, desc, list, onChange}) => {

  return (
    <label className={styles.ComboBox}>
      {name}
      <select name="name" onChange={onChange}>
        <option value={0}>{desc}</option>
        {list.map(item => (
          <option value={item.id} key={item.id}>{item.name}</option>
        ))}
      </select>
    </label>
  )
}

export default ComboBox
