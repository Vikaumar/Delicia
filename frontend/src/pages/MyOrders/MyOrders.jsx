  import React, { useContext, useEffect, useState } from 'react'
  import './MyOrders.css'
  import axios from 'axios'
  import { StoreContext } from '../../Context/StoreContext';
  import { assets } from '../../assets/assets';

  const MyOrders = () => {
    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
      try {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data || []);
      } catch (err) {
        console.error("Failed fetching orders:", err);
        setData([]);
      }
    }

    useEffect(()=>{
      if (token) {
        fetchOrders();
      }
    },[token])

    return (
      <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
          {data.length === 0 && <p>No orders yet.</p>}
          {data.map((order, index) => {
            // format promo info if available
            const hasPromo = !!(order.promoCode || order.promoDiscount);
            return (
              <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                <div className="order-info">
                  <p className="order-items">{order.items.map((item,i)=>{
                    return item.name + " x " + item.quantity + (i === order.items.length - 1 ? "" : ", ")
                  })}</p>

                  <div className="order-meta">
                    <p className="order-amount">Amount: ${order.amount?.toFixed ? order.amount.toFixed(2) : (order.amount || 0)}</p>

                    {hasPromo && (
                      <div className="order-promo">
                        {order.promoCode && <p>Promo: <strong>{order.promoCode}</strong></p>}
                        {order.promoDiscount != null && <p>Promo Saved: ${Number(order.promoDiscount).toFixed(2)}</p>}
                      </div>
                    )}

                    <p>Items: {order.items.length}</p>
                    <p className="order-status"><span>&#x25cf;</span> <b>{order.status}</b></p>
                  </div>
                  <button>Track Order</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  export default MyOrders
