import styles from './SelectDate.module.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const selectDate = ({name, date, setDate }) => {
  // prettier-ignore
  return (
    <label className={styles.Input}>
      {name}
      <DatePicker selected={date} onChange={date => setDate(date) }/>
    </label>
  )
}

export default selectDate