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
    if (invoice.length === 0) {
      getInvoices(setInvoice);
    }
    setDetails([]);
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
                setSelectedRow(row.original);
              },
              sx: {
                cursor: "pointer", //you might want to change the cursor too when adding an onClick
              },
            })}
          ></Table>
        </section>
        <section>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="modal">
              <h1>Invoice Details</h1>
              <label>{selectedRow.date}</label>
              <span></span>
              <Table columns={InvoiceDetailsColumns} data={details}></Table>
            </div>
          </Popup>
        </section>
      </main>
    </>
  );
};

export default InvoicePage;
