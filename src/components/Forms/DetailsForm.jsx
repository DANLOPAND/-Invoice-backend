import { ComboBox, Input, Button } from "../index";
import styles from "./Form.module.scss";
import { getProducts } from "../../Services/Services";
import { useState, useEffect } from "react";

const DetailsForm = ({ addDetails }) => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [SelectedProduct, setSelectedProduct] = useState({});

  const handleDetails = (ev) => {
    ev.preventDefault();
    addDetails({
      id:SelectedProduct.id,
      name: SelectedProduct.name,
      quantity: parseInt(quantity),
      price: price,
      subTotal: subTotal,
    });
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
    if (products.length === 0) {
      getProducts(setProducts);
    }
    setSubTotal(quantity * price);
  }, [quantity, price]);

  return (
    <>
      <h2 className={styles.subTitle}>Insert products</h2>
      <div className={styles.Grid}>
        <ComboBox
          name="Products"
          desc="Select a product"
          list={products}
          onChange={handleProductChange}
        ></ComboBox>
        <Input
          name="Quantity"
          type="number"
          value={quantity}
          onChange={(ev) => setQuantity(ev.target.value)}
        ></Input>
        <Input name="Price" disabled={true} value={price}></Input>
      </div>
      <Button name="Add Product" onClick={handleDetails}></Button>
    </>
  );
};

export default DetailsForm;
