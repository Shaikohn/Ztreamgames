import axios from 'axios'
import {getAllOrders, getOrderId} from '../slices/orderSlice'

const baseURL = 'https://ztreamgames-backend-dev-bfgm.1.us-1.fl0.io'

export const getOrders = ()=> (dispatch) => {
    axios(`${baseURL}/order/order`)
    .then(({data})=> dispatch(getAllOrders(data)))
    .catch((err)=>console.log(err))
}
export const OrderId=(id)=> (dispatch) => {
    axios(`${baseURL}/order/order/${id}`)
    .then(({data})=> dispatch(getOrderId(data)))
    .catch((err)=> console.log(err))


}