import { useState, useEffect } from "react";
import ToastNotification from "./components/ToastNotification/Notification";
import 'reactjs-popup/dist/index.css';
import InvoicePage from "./pages/InvoicePage";




const App = () => {
  return (
    <>
      <InvoicePage />
      <ToastNotification/>
    </>
  );
};

export default App;
