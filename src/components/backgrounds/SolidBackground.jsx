import React from 'react';
import styled from 'styled-components';

const SolidBackground = () => {
  return <SolidContainer />;
};

export default SolidBackground;

const SolidContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--bg-base);
  pointer-events: none;
  z-index: 0;
`;
