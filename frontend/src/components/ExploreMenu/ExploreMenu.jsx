import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({category,setCategory}) => {

  const {menu_list} = useContext(StoreContext);
  
  return (
    <div className='explore-menu ' style={{paddingTop:20}} id='explore-menu'>
      <h1 className="text-[50px] font-bold tracking-[-1px] uppercase">Delicious Menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <hr />
    </div>
  )
}

export default ExploreMenu
