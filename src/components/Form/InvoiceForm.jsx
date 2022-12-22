import Input from "./Input/Input";
import Button from "./Button/Button";
import { useState, useRef, useEffect } from "react";
import styles from "./Form.module.scss";
import ComboBox from "./ComboBox/ComboBox";
import SelectDate from "./DatePicker/SelectDate";
import { getClients } from "../../Services/Services";
import DetailsForm from "./DetailsForm";

const InvoiceForm = ({}) => {
  const [date, setDate] = useState(new Date());
  const [client, setclient] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getClients(setclient);
  }, []);

  // prettier-ignore
  return (
    <>
      <form className={styles.Form} onSubmit={(ev) => { ev.preventDefault }}>
        <div className={styles.Grid}>
          <SelectDate name="Date"date={date} setDate={setDate}></SelectDate>
          <ComboBox name="Clients" desc="--- Select a client ---" list={client}></ComboBox>
          <Input name="Discount (%)" type="number" placeholder="10" max={2}></Input>
        </div>
          <Button id="download" value="Descargar"></Button>
      </form>
      <DetailsForm Details={details}></DetailsForm>
    </>
  );
};

export default InvoiceForm;
