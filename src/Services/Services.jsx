import axios from "axios"

const BaseUrl = "http://localhost:3000"

const getProducts = async (setData) => {
  axios.get(BaseUrl + "/products").then((res) => {
    setData(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

const getClients = async (setData) => {
  axios.get(BaseUrl + "/clients").then((res) => {
    setData(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export { getProducts, getClients }
