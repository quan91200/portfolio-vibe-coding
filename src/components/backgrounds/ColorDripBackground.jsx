import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useBackground } from '../../context/BackgroundContext';

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const ColorDripBackground = () => {
  const { theme } = useTheme();
  const { colorDripSettings } = useBackground();
  const isDark = theme === 'dark';

  return (
    <BackgroundWrapper $isDark={isDark}>
      <ColorDripContainer>
        <Line $thickness={colorDripSettings.lineThickness} />
        <Line $thickness={colorDripSettings.lineThickness} />
        <Line $thickness={colorDripSettings.lineThickness} />
        <Line $thickness={colorDripSettings.lineThickness} />
        <Line $thickness={colorDripSettings.lineThickness} />
        <Line $thickness={colorDripSettings.lineThickness} />
        <Line $thickness={colorDripSettings.lineThickness} />
        <Line $thickness={colorDripSettings.lineThickness} />
        <Line $thickness={colorDripSettings.lineThickness} />
        <Line $thickness={colorDripSettings.lineThickness} />
      </ColorDripContainer>
    </BackgroundWrapper>
  );
};

export default ColorDripBackground;

const BackgroundWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: ${props => props.$isDark
    ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 20%, #312e81 40%, #1e1b4b 60%, #0f172a 80%, #1e1b4b 100%)'
    : 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 20%, #fce7f3 40%, #fed7aa 60%, #cffafe 80%, #dbeafe 100%)'};
  background-size: 200% 200%;
  background-attachment: fixed;
  animation: ${gradientShift} 15s ease infinite;
  pointer-events: none;
  z-index: 0;
`;

const ColorDripContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 90vw;
  margin: auto;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const Line = styled.div`
  position: relative;
  width: ${props => props.$thickness || 1}px;
  height: 100%;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: 0;
    width: 100%;
    height: 15vh;
    animation: drip 7s cubic-bezier(0.4, 0.26, 0, 0.97) infinite;
  }

  /* Dark Mode - Vivid Saturated Colors */
  .dark &:nth-child(1)::after { 
    background: linear-gradient(to bottom, transparent, #FF4500); 
    animation-delay: 0.5s; 
  }
  .dark &:nth-child(2)::after { 
    background: linear-gradient(to bottom, transparent, #32CD32); 
    animation-delay: 1s; 
  }
  .dark &:nth-child(3)::after { 
    background: linear-gradient(to bottom, transparent, #1E90FF); 
    animation-delay: 1.5s; 
  }
  .dark &:nth-child(4)::after { 
    background: linear-gradient(to bottom, transparent, #FFD700); 
    animation-delay: 2s; 
  }
  .dark &:nth-child(5)::after { 
    background: linear-gradient(to bottom, transparent, #8A2BE2); 
    animation-delay: 2.5s; 
  }
  .dark &:nth-child(6)::after { 
    background: linear-gradient(to bottom, transparent, #20B2AA); 
    animation-delay: 3s; 
  }
  .dark &:nth-child(7)::after { 
    background: linear-gradient(to bottom, transparent, #DC143C); 
    animation-delay: 3.5s; 
  }
  .dark &:nth-child(8)::after { 
    background: linear-gradient(to bottom, transparent, #00FA9A); 
    animation-delay: 4s; 
  }
  .dark &:nth-child(9)::after { 
    background: linear-gradient(to bottom, transparent, #FF1493); 
    animation-delay: 4.5s; 
  }
  .dark &:nth-child(10)::after { 
    background: linear-gradient(to bottom, transparent, #00BFFF); 
    animation-delay: 5s; 
  }

  /* Light Mode - Soft Pastel Colors */
  :not(.dark) &:nth-child(1)::after { 
    background: linear-gradient(to bottom, transparent, rgba(255, 99, 71, 0.6)); 
    animation-delay: 0.5s; 
  }
  :not(.dark) &:nth-child(2)::after { 
    background: linear-gradient(to bottom, transparent, rgba(60, 179, 113, 0.6)); 
    animation-delay: 1s; 
  }
  :not(.dark) &:nth-child(3)::after { 
    background: linear-gradient(to bottom, transparent, rgba(65, 105, 225, 0.6)); 
    animation-delay: 1.5s; 
  }
  :not(.dark) &:nth-child(4)::after { 
    background: linear-gradient(to bottom, transparent, rgba(255, 165, 0, 0.6)); 
    animation-delay: 2s; 
  }
  :not(.dark) &:nth-child(5)::after { 
    background: linear-gradient(to bottom, transparent, rgba(147, 112, 219, 0.6)); 
    animation-delay: 2.5s; 
  }
  :not(.dark) &:nth-child(6)::after { 
    background: linear-gradient(to bottom, transparent, rgba(72, 209, 204, 0.6)); 
    animation-delay: 3s; 
  }
  :not(.dark) &:nth-child(7)::after { 
    background: linear-gradient(to bottom, transparent, rgba(220, 20, 60, 0.6)); 
    animation-delay: 3.5s; 
  }
  :not(.dark) &:nth-child(8)::after { 
    background: linear-gradient(to bottom, transparent, rgba(34, 139, 34, 0.6)); 
    animation-delay: 4s; 
  }
  :not(.dark) &:nth-child(9)::after { 
    background: linear-gradient(to bottom, transparent, rgba(255, 20, 147, 0.6)); 
    animation-delay: 4.5s; 
  }
  :not(.dark) &:nth-child(10)::after { 
    background: linear-gradient(to bottom, transparent, rgba(30, 144, 255, 0.6)); 
    animation-delay: 5s; 
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }

  @keyframes drip {
    0%   { top: -50%; }
    100% { top: 110%; }
  }
`;
