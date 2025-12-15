import React from "react";
import "./Promotions.css";
import { FaShoppingCart } from "react-icons/fa";

const Promotions = () => {
  return (
    <div className="promotions">
      {/* Card 1: Top-left large card - Quality Food Service */}
      <div className="promo-card food-quality">
        <div>
          <span className="badge">FESTIVAL SPECIAL</span>
          <h2>QUALITY FOOD  SERVICE</h2>
        </div>
        <button className="shop-btn red">
          <FaShoppingCart /> <span className="btn-text">SHOP NOW</span>
        </button>
      </div>

      {/* Card 2: Bottom-right - Hot Deals Pack */}
      <div className="promo-card hot-deals-red">
        <div>
          <h2>HOT DEALS PACK</h2>
        </div>
        <button className="shop-btn blue">
          <FaShoppingCart /> <span className="btn-text">SHOP NOW</span>
        </button>
      </div>

      {/* Card 3: Bottom-left - Hot Deals Pack with discount */}  
      <div className="promo-card hot-deals-yellow">
        <div>
          <h2>HOT DEALS PACK</h2>
        </div>
        <span className="badge discount">20% OFF</span>
        <button className="shop-btn yellow">
          <FaShoppingCart /> <span className="btn-text">SHOP NOW</span>
        </button>

      </div>

      {/* Card 4: Top-right wide - Burger Combo */}
      <div className="promo-card burger-combo">
        <div>
          <span className="badge">GET UP TO 50% OFF</span>
          <h2>BURGER<br />COMBO PACK</h2>
        </div>
        <button className="shop-btn green" >
          <FaShoppingCart /> <span className="btn-text">SHOP NOW</span>
        </button>
      </div>
    </div>
  );
};

export default Promotions;