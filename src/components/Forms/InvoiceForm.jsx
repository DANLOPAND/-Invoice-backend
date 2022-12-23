// prettier-ignore
import styles from "./Form.module.scss";
import { useState, useEffect } from "react";
import { getClients, setInvoice } from "../../Services/Services";
import { toast } from "react-toastify";
import {
  Input,
  SubmitButton,
  ComboBox,
  SelectDate,
  DetailsForm,
  Table,
  ProductColumns
} from "../index";

const InvoiceForm = ({}) => {
  const [date, setDate] = useState(new Date());
  const [clients, setclients] = useState([]);
  const [details, setDetails] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [SelectedClient, setSelectedClient] = useState([]);
  const [subTotal, setSubTotals] = useState(0);

  useEffect(() => {
    // get the list of clients from the API if the list is empty
    if (clients.length === 0) {
      getClients(setclients);
    }
    // calculate the total of the invoice each time the some detail is changed
    handleTotal();
  }, [details, discount]);

  //is used to clean the form after the invoice is created
  const cleanForm = () => {
    setDate(new Date());
    setDetails([]);
    setDiscount(0);
    setSelectedClient([]);
    setSubTotals(0);
  };

  // add or update the product of the invoice
  const addDetails = (ev) => {

    // check if the list of products doesn't have more than 10 products
    if (details.length === 10) {
      toast.warning("You can't add more than 10 products");
      return;
    }

    // check if the product is selected and the quantity is greater than 0
    if (!ev.id || parseInt(ev.quantity) <= 0 || !ev.quantity ) {
      toast.warning("Please select a product and quantity");
      return;
    }
    // check if the product is already in the list of products and update the quantity and subtotal
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

  // change the client to the selected client in the combobox and update the state
  const handleClientChange = (ev) => {
    clients.find((item) => {
      if (item.id.toString() === ev.target.value) {
        setSelectedClient(item);
      }
    });
  };

  // calculate the total of the invoice
  const handleTotal = () => {
    let subTotal = 0;
    details.forEach((item) => {
      subTotal += parseInt(item.subTotal);
    });
    setSubTotals(subTotal);
  };

  // create the invoice and send it to the API
  const handleSubmit = (ev) => {
    ev.preventDefault();

    // check if the list of products is empty and the client is selected
    if (details.length === 0) {
      toast.warning("Please add at least one product");
      return;
    }

    // check if the client is selected
    if (SelectedClient.length === 0) {
      toast.warning("Please select a client");
      return;
    }

    // send the invoice to the API
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
