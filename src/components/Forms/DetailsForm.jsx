import { ComboBox, Input, Button } from "../index";
import styles from "./Form.module.scss";
import { getProducts } from "../../Services/Services";
import { useState, useEffect } from "react";


// component to add products to the details of the invoice
const DetailsForm = ({ addDetails }) => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [SelectedProduct, setSelectedProduct] = useState({});


  // add the product to the details of the invoice and clean the form to add another product
  const handleDetails = (ev) => {
    ev.preventDefault();

    // the details is being added to the invoice in the parent component as a object
    addDetails({
      id:SelectedProduct.id,
      name: SelectedProduct.name,
      quantity: parseInt(quantity),
      price: price,
      subTotal: subTotal,
    });
  };

  // handle the change of the state of the product selected in the combobox
  const handleProductChange = (ev) => {
    //
    setPrice(ev.target.value);

    // find the product selected in the combobox
    products.find((item) => {

      // check if the id of the product selected is the same as the id of the product in the list to get all the data of the product
      if (item.id.toString() === ev.target.value) {
        setSelectedProduct(item);
        setPrice(item.price);
      }
    });
  };

  useEffect(() => {

    // get the list of products from the API if the list is empty
    if (products.length === 0) {
      getProducts(setProducts);
    }

    // calculate the subtotal of the product
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
