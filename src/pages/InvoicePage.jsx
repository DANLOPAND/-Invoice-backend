import { useState, useEffect } from "react";
import {
  InvoiceColumns,
  InvoiceDetailsColumns,
  Table,
  InvoiceForm,
  Button,
  Header,
} from "../components";
import { getInvoices, getInvoiceDetails } from "../Services/Services";
import React from "react";
import Popup from "reactjs-popup";
import style from "./InvoicePage.module.scss";

const InvoicePage = () => {
  const [show, setShow] = useState(false);
  const [invoice, setInvoice] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [details, setDetails] = useState([]);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    // get the list of invoices from the API if the list is empty
    if (invoice.length === 0) {
      getInvoices(setInvoice);
    }
    setDetails([]);
    // get the details of the invoice selected from the API
    getInvoiceDetails(selectedRow.id, setDetails);
  }, [show, selectedRow]);

  return (
    <>
      <Header />
      <main className={style.main}>
        <h1 className={style.tittle}>INVOICE</h1>
        <section>
          <h1>
            <section hidden={!show}>{<InvoiceForm />}</section>
          </h1>
          <Button
            name={show ? "Close" : "Create Invoice"}
            onClick={() => setShow(!show)}
          >
            Show
          </Button>
          <Table
            columns={InvoiceColumns}
            data={invoice}
            enableMultiRowSelection={false}
          
            muiTableBodyRowProps={({ row }) => ({
              onClick: (event) => {
                setOpen(true);
                // update the state of the selected invoice
                setSelectedRow(row.original);
              },
              sx: {
                cursor: "pointer",
              },
            })}
          ></Table>
        </section>
        <section>
          <Popup className={style.Popup} open={open} closeOnDocumentClick onClose={closeModal}>
          <h1>Invoice Details</h1>
            <div className={style.modal}>
              <label>Date: <span>{selectedRow.date}</span></label>
              <label>Client: <span>{selectedRow.name}</span></label>
              <label>Subtotal: <span>{selectedRow.subTotal}</span></label>
              <label>discount: <span>{selectedRow.discount}</span></label>
              <label>Total: <span>{selectedRow.total}</span></label>
            </div>
            <Table columns={InvoiceDetailsColumns} data={details}
            enableDensityToggle={false}
            initialState={{ density: 'compact' }}
            ></Table>
          </Popup>
        </section>
      </main>
    </>
  );
};

export default InvoicePage;
