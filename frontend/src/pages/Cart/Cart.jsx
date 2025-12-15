import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    promoDiscount,
    getFinalTotal
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  // Subtotal + Delivery Fee
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 5;
  const finalTotal = getFinalTotal();

  // Handle Promo Apply
  const handleApply = () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    const result = applyPromoCode(promoCode.trim());
    if (!result.success) {
      setPromoError(result.message);
    } else {
      setPromoError('');
      setPromoCode('');
    }
  };

  return (
    <div className='cart'>
      {/* Cart Header */}
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="cart-item-count">
          {Object.values(cartItems).reduce((total, q) => total + q, 0)} items
        </p>
      </div>

      {/* Cart Items Section */}
      <div className="cart-items">
        <div className="cart-items-header">
          <div className="header-item">Product</div>
          <div className="header-price">Price</div>
          <div className="header-quantity">Quantity</div>
          <div className="header-total">Total</div>
          <div className="header-remove">Remove</div>
        </div>

        <div className="cart-items-list">
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index} className="cart-item">
                  <div className="item-product">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                    </div>
                  </div>
                  <div className="item-price">${item.price}</div>
                  <div className="item-quantity">
                    <span className="quantity-badge">{cartItems[item._id]}</span>
                  </div>
                  <div className="item-total">
                    ${(item.price * cartItems[item._id]).toFixed(2)}
                  </div>
                  <div className="item-remove">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {subtotal === 0 && (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add some delicious items to get started!</p>
          </div>
        )}
      </div>

      {/* Cart Summary Section */}
      {subtotal > 0 && (
        <div className="cart-summary">
          {/* Promo Code Section */}
          <div className="promo-section">
            <h3>Promo Code</h3>

            {appliedPromo ? (
              <div className="applied-promo">
                <div className="promo-info">
                  <span className="promo-code">{appliedPromo.code}</span>
                  <span className="promo-desc">{appliedPromo.description}</span>
                  <span className="promo-savings">-${promoDiscount.toFixed(2)}</span>
                </div>
                <button className="remove-promo" onClick={removePromoCode}>
                  Remove
                </button>
              </div>
            ) : (
              <div className="promo-input-section">
                <div className="promo-input">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    onKeyPress={(e) => e.key === 'Enter' && handleApply()}
                  />
                  <button onClick={handleApply}>Apply</button>
                </div>
                {promoError && <div className="promo-error">{promoError}</div>}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>

            <div className="summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-line">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            {promoDiscount > 0 && (
              <div className="summary-line discount-line">
                <span>Discount ({appliedPromo.code})</span>
                <span>- ${promoDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-line total-line">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate('/order')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
