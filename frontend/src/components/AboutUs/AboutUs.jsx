import React from 'react';
// import './AboutUs.css';
import Chefs from './Chefs';
import Reviews from './Reviews';

const AboutUs = () => {
  return (
    <div className='about-us' id='about'>
      <Chefs />
      <Reviews />
    </div>
  );
};

export default AboutUs;
