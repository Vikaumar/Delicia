import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import deliveryAnim from './animations/DeliveryMan.json';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="fullscreen">
          <Lottie animationData={deliveryAnim} loop={true} />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  
`;

export default Loader;
