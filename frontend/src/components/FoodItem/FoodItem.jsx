import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

export default function FoodItem({ item }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const { _id, name, price, description, image } = item;

  const count = cartItems[_id] || 0;
  const imageSrc = image || require('../../assets/default.jpg');

  return (
    <div className="flex items-center transition-all duration-200 gap-5"
    style={{padding: '16px', width: '100%', minHeight: '120px'}}>
      <div className="flex-shrink-0 mr-4">
        <img
          className="w-[110px] h-[110px] rounded-full object-cover bg-white border-13 border-white shadow-sm"
          src={imageSrc}
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = require('../../assets/default.jpg');
          }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between min-h-[80px]">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-stone-900 leading-tight flex-shrink-0 hover:text-[#AB162C] cursor-pointer transition-colors duration-200 ease-in-out"
          style={{fontSize: "20px" , fontWeight: "600"}}>{name}</h3>
          <div className="flex-1 border-b border border-stone-300"></div>
          <p className="text-base font-bold text-[#AB162C] cursor-pointer flex-shrink-0">${price.toFixed(2)}</p>
        </div>
        
        <div className="flex items-start justify-between gap-10">
          <p className="text-stone-600 text-xs leading-relaxed flex-1 line-clamp-2">{description}</p>
          <div className="flex-shrink-0">
            {count === 0 ? (
              <button 
                className="flex items-center space-x-1 bg-[#F2A22A] hover:bg-[#AB162C] text-white rounded-full cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg gap-[6px]"
                style={{padding: '5px 15px', fontWeight: '500'}}
                onClick={() => addToCart(_id)}
              >
                <span className="text-m font-semibold">+</span>
                <span className="text-[15px]">Add</span>
              </button>
            ) : (
              <div className="flex items-center space-x-1 bg-[#F2A22A] text-white rounded-full px-1 py-0.5 shadow-lg"
              style={{padding: '5px 10px'}}>
                <button 
                  className="w-5 h-5 rounded-full bg-orange-300 hover:bg-orange-300 text-white text-xs font-bold cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
                  onClick={() => removeFromCart(_id)}
                >
                  −
                </button>
                <span className="text-xs font-bold min-w-4 text-center px-1">{count}</span>
                <button 
                  className="w-5 h-5 rounded-full bg-orange-300 hover:bg-orange-300 text-white text-xs font-bold cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
                  onClick={() => addToCart(_id)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}