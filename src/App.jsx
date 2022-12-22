import { useState, useEffect } from "react";
import Button from "./components/Button/Button";
import InvoiceForm from "./components/Form/InvoiceForm";


const App = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    
  }, [show]);

  return (
    <main>
      <h1 className="tittle">INVOICE</h1>
      <section>
        <h1>
          <section hidden={!show}>{
            <InvoiceForm /> 
          }</section>
        </h1>
        <Button onClick={() => setShow(!show)}>Show</Button>
      </section>
      <section>
        <h1>
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </table>
        </h1>
      </section>
    </main>
  );
};

export default App;
