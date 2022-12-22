import Input from "./Input/Input";
import Button from "./Button/Button";
import { useState, useRef, useEffect } from "react";
import styles from "./InvoiceForm.module.scss";
import ComboBox from "./ComboBox/ComboBox";
import SelectDate from "./DatePicker/SelectDate";
import { getProducts, getClients } from "../../Services/Services";

const InvoiceForm = ({}) => {
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [client, setclient] = useState([]);

  useEffect(() => {
    getProducts(setProducts);
    getClients(setclient);
  }, []);

  // prettier-ignore
  return (
    <>
      <form
        className={styles.Form}
        onSubmit={(ev) => {
          ev.preventDefault;
        }}
      >
        <div className={styles.grid}>
          <SelectDate name="Date"date={date} setDate={setDate}></SelectDate>
          <ComboBox
            name={"Clients"}
            desc="--- Select a client ---"
            list={client}
          ></ComboBox>
          <Input
            name="Discount (%)"
            type="number"
            placeholder="10"
            max={2}
          ></Input>
        </div>

        <div className="grid">
          <Button id="download" value="Descargar"></Button>
        </div>
      </form>
      <form onSubmit={(ev) => ev.preventDefault}>
        <h2>list some products</h2>
        <ComboBox
          name="Products"
          desc="--- Select a product ---"
          list={products}
        ></ComboBox>
        <input type="submit" />
      </form>
    </>
  );
};
export default InvoiceForm;
