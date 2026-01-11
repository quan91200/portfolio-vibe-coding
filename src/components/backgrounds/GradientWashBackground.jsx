import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

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

const GradientContainer = styled.div`
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

const GradientWashBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return <GradientContainer $isDark={isDark} />;
};

export default GradientWashBackground;
