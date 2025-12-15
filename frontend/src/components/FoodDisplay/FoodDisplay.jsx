import React, { useContext } from 'react'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'
import './FoodDisplay.css'

const FoodDisplay = ({ category }) => {
  const { food_list = [] } = useContext(StoreContext);

  // if category is not provided yet, don't render items (parent should provide it)
  if (!category) {
    return (
      <div id="food-display" className="!mt-8 !px-4 !py-6 !block">
        <div className="!flex !flex-wrap !gap-4 !max-w-5xl !mx-auto">
          <div className="w-full text-center py-8 text-gray-500">
            Loading categories...
          </div>
        </div>
      </div>
    );
  }

  const filtered = food_list.filter(item => item && item.category === category);

  return (
    <div
      className="!mt-8 !px-4 !py-6 !block"
      style={{ display: 'block !important' }}
      id="food-display"
    >
      <div
        className="!flex !flex-wrap !gap-4 !max-w-5xl !mx-auto"
        style={{ display: 'flex !important', flexWrap: 'wrap !important' }}
      >
        {filtered.length === 0 ? (
          <div className="w-full text-center py-8 text-gray-500">
            No items found for {category}.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item._id}
              className="!w-full lg:!w-[calc(50%-8px)] !block !mb-4"
              style={{ width: 'calc(50% - 8px)', display: 'block', float: 'none' }}
            >
              <FoodItem item={item} />
            </div>
          ))
        )}
      </div>
      {/* <button type="button" className="animated-button text-center mx-auto mt-6 block">
            <span>Sign Up</span>
      </button> */}
    </div>
  );
};

export default FoodDisplay;
