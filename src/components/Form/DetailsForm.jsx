import Button from "./Button/Button";
import ComboBox from "./ComboBox/ComboBox";
import Input from "./Input/Input";
import styles from "./Form.module.scss";
import { getProducts } from "../../Services/Services";
import { useState, useEffect } from "react";

const DetailsForm = ({addDetails}) => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [SelectedProduct, setSelectedProduct] = useState({});

  const handleDetails = (ev) => {
    ev.preventDefault();
    addDetails({id : SelectedProduct.id, name: SelectedProduct.name, quantity: quantity, price: price, subTotal: subTotal});
  };

  const handleProductChange = (ev) => {
    setPrice(ev.target.value);
    products.find((item) => {
      if (item.id.toString() === ev.target.value) {
        setSelectedProduct(item);
        setPrice(item.price);
      }
    });
  };

  useEffect(() => {
    getProducts(setProducts);
    setSubTotal(quantity * price);
  }, [quantity, price]);

  return (
    <form className={styles.Form} onSubmit={(ev) => handleDetails(ev)}>
      <h2>list some products</h2>
      <div className={styles.Grid}>
        <ComboBox
          name="Products"
          desc="--- Select a product ---"
          list={products}
          onChange={handleProductChange}
        ></ComboBox>
        <Input
          name="Quantity"
          type="number"
          onChange={(ev) => setQuantity(ev.target.value)}
        ></Input>
        <Input name="Price" disabled={true} value={price}></Input>
        <Input name="Total" disabled={true} value={subTotal}></Input>
      </div>
      <Button name="Add Product"></Button>
    </form>
  );
};

export default DetailsForm;
