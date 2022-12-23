import axios from "axios"
import { toast } from "react-toastify"

const BaseUrl = "http://localhost:3000"

const getProducts = async (setData) => {
  axios.get(BaseUrl + "/products").then((res) => {
    setData(res.data)
  }).catch((err) => {
    toast.error("Error getting products")
  })
}

const getClients = async (setData) => {
  axios.get(BaseUrl + "/clients").then((res) => {
    setData(res.data)
  }).catch((err) => {
    toast.error("Error getting clients")
  })
}

const setInvoice = async ( data, onFinish) =>{
  axios.post(BaseUrl + "/invoices", data).then((res) => {
    toast.success("Invoice created")
    onFinish()
  }).catch((err) => {
    toast.error("Error creating invoice")
  })
}

const getInvoices = async (setData) => {
  axios.get(BaseUrl + "/invoices").then((res) => {
    setData(res.data)
  }).catch((err) => {
    console.log(err)
    toast.error("Error getting invoices")
  })
}

const getInvoiceDetails = async (id, setData) => {
  axios.get(BaseUrl + "/invoices/details/" + `'${id}'`
  ).then((res) => {
    setData(res.data)
  }).catch((err) => {
    console.log(err)
    toast.error("Error getting invoice details")
  })
}

export { getProducts, getClients, setInvoice, getInvoices, getInvoiceDetails }
