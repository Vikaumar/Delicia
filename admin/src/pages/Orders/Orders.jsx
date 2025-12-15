import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url } from '../../assets/assets';

const Order = () => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`)
      if (response.data.success) {
        setOrders(response.data.data.reverse());
        console.log("Orders fetched from database:", response.data.data);
      }
      else {
        toast.error("Error fetching orders")
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Error: " + error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Error updating status")
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3 className='top'>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img className="order-icon" src={assets.parcel_icon} alt="" />

              <div>
                <p className='order-item-food'>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} <strong>x{item.quantity}</strong>
                      {idx < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p className='order-item-name'>Order #{order._id.slice(-6).toUpperCase()}</p>
                <div className='order-item-address'>
                  <p>{order.address.street}</p>
                  <p>{order.address.city} • {order.address.pincode}</p>
                </div>
                <p className='order-item-phone'>📍 {order.address.city}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status} name="" id="">
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  )
}

export default Order