import React from 'react';
import './Header.css';        // <<-- UNCOMMENT / ADD this
import bg1 from "../../assets/bg1.png";
import burger from "../../assets/burger.png";
import Navbar from '../Navbar/Navbar';

export default function Header() {
  const scrollToMenu = () => {
    const section = document.getElementById('explore-menu');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className='relative bg-gray-400 overflow-x-hidden header-hero'
         style={{backgroundImage: `url(${bg1})`, backgroundSize: 'cover', height: '100vh', width: '99vw'}}>

      <div className='relative flex flex-row justify-between overflow-hidden header-inner'
           style={{
             paddingLeft: "5rem",
             paddingRight: "3rem",
             paddingTop: "6rem",
             paddingBottom: "5rem",
           }}>
        <div className='h-106 w-286 flex flex-col' style={{paddingRight: "2rem"}}>
            <h1
              className='relative uppercase text-black h-full w-full leading-none md:text-7xl tracking-tight animate-hero-title'
              style={{
                paddingTop: "7rem",
                paddingBottom: "1rem",
                fontWeight: "700",
              }}>
              Meet, Eat & <br /> Enjoy The <span style={{ color: "#F2A22A" }}> True</span> <br /> <span style={{ color: "#F2A22A" }}>Taste</span>
            </h1>

            <p className="max-w-2xl text-lg text-gray-600 leading-relaxed animate-hero-sub"
               style={{ transitionDelay: "0.4s" }}>
              Discover flavors that bring people together. At <span style={{ color: "#F2A22A" }}>True Taste</span>,
              we serve not just meals but unforgettable experiences — crafted with love,
              fresh ingredients, and a passion for excellence.
            </p>

            <button
              onClick={scrollToMenu}
              className="w-fit text-lg font-bold text-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition animate-hero-cta"
              style={{
                marginTop: "2.5rem",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                backgroundColor: "#AB162C",
              }}>
              Explore Menu
            </button>
        </div>

        <div className="hero-burger-wrapper">
          <img src={burger} style={{marginTop: "1rem"}} className='relative h-146 w-256 animate-hero-burger' />
        </div>
      </div>
    </div>
  );
}
