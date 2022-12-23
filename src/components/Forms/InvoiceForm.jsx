// prettier-ignore
import styles from "./Form.module.scss";
import { useState, useEffect } from "react";
import { getClients, setInvoice } from "../../Services/Services";
import { ProductColumns } from "../Table/Columns";
import {
  Input,
  SubmitButton,
  ComboBox,
  SelectDate,
  DetailsForm,
  Table,
} from "../index";

import { toast } from "react-toastify";

const InvoiceForm = ({}) => {
  const [date, setDate] = useState(new Date());
  const [clients, setclients] = useState([]);
  const [details, setDetails] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [SelectedClient, setSelectedClient] = useState([]);
  const [subTotal, setSubTotals] = useState(0);

  useEffect(() => {
    if (clients.length === 0) {
      getClients(setclients);
    }
    handleTotal();
  }, [details, discount]);

  const cleanForm = () => {
    setDate(new Date());
    setDetails([]);
    setDiscount(0);
    setSelectedClient([]);
    setSubTotals(0);
  };

  const addDetails = (ev) => {
    if (details.length === 10) {
      toast.warning("You can't add more than 10 products");
      return;
    }

    if (!ev.id || parseInt(ev.quantity) === 0) {
      toast.warning("Please select a product and quantity");
      return;
    }

    if (details.find((item) => item.id === ev.id)) {
      details.find((item) => {
        if (item.id === ev.id) {
          details[details.indexOf(item)] = ev;
          setDetails([...details]);
        }
      });
      return;
    }
    setDetails([...details, ev]);
  };

  const handleClientChange = (ev) => {
    clients.find((item) => {
      if (item.id.toString() === ev.target.value) {
        setSelectedClient(item);
      }
    });
  };

  const handleTotal = () => {
    let subTotal = 0;
    details.forEach((item) => {
      subTotal += parseInt(item.subTotal);
    });
    setSubTotals(subTotal);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (details.length === 0) {
      toast.warning("Please add at least one product");
      return;
    }
    console.log(SelectedClient);
    if (SelectedClient.length === 0) {
      toast.warning("Please select a client");
      return;
    }

    setInvoice({
      idClient: SelectedClient.id,
      date: date,
      discount: discount,
      subTotal: subTotal.toString(),
      total: (subTotal - (subTotal * discount) / 100).toString(),
      invoiceDetails: details.map((item) => {
        return {
          idProduct: item.id,
          quantity: item.quantity,
        };
      }),
    }, cleanForm);
  };

  // prettier-ignore
  return (
    <>
      <form className={styles.Form} onSubmit={(ev) => {handleSubmit(ev)}}>
        <div className={styles.Grid}>
          <SelectDate name="Date"date={date} setDate={setDate}/>
          <ComboBox name="Clients" desc="--- Select a client ---" list={clients} onChange={ev => {handleClientChange(ev)}}/>
        </div>
      <DetailsForm details={details} addDetails={ev => addDetails(ev)}/>
      <Table columns={ProductColumns} data={details}></Table>
      <div className={styles.Grid}>
        <Input name="Sub Total" value={subTotal} disabled readOnly/>
        <Input name="Discount (%)" type="number" max={2} value={discount} onChange={ev => {setDiscount(ev.target.value)}}/>
        <Input name="Total" value={subTotal - (subTotal * discount) / 100} disabled readOnly/>
      </div>
      <SubmitButton name=' Save invoice'/>
      </form>
    </>
  );
};

export default InvoiceForm;
