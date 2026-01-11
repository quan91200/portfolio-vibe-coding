import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useBackground } from '../../context/BackgroundContext';

const meteorAnimation = keyframes`
  0% {
    transform: rotate(215deg) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(215deg) translateX(-100vh);
    opacity: 0;
  }
`;

const MeteorContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${props => props.$isDark
    ? 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)'
    : 'radial-gradient(ellipse at top, #87ceeb 0%, #e0f6ff 100%)'};
  z-index: 0;
  pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 2px;
  background: ${props => props.$isDark
    ? 'linear-gradient(-45deg, #5f91ff, rgba(0, 0, 255, 0))'
    : 'linear-gradient(-45deg, #1e3a8a, rgba(30, 58, 138, 0))'};
  filter: ${props => props.$isDark
    ? 'drop-shadow(0 0 6px #699bff)'
    : 'drop-shadow(0 0 4px rgba(30, 58, 138, 0.6))'};
  animation: ${meteorAnimation} 3000ms ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 1px;
    background: ${props => props.$isDark
    ? 'linear-gradient(90deg, #5f91ff, transparent)'
    : 'linear-gradient(90deg, #1e3a8a, transparent)'};
  }
`;

const MeteorShowerBackground = () => {
  const { theme } = useTheme();
  const { meteorShowerSettings } = useBackground();
  const isDark = theme === 'dark';

  // Generate random values for each meteor to ensure unique positioning and timing
  const meteors = useMemo(() => {
    return Array.from({ length: meteorShowerSettings.meteorCount }).map((_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 100) - 50 + '%', // -50% to 50% vertical offset
      left: Math.floor(Math.random() * 100) + '%',
      delay: Math.floor(Math.random() * 3000) + 'ms',
      duration: Math.floor(Math.random() * 2000 + 3000) + 'ms',
      size: Math.random() < 0.5 ? '1px' : '2px', // Random width variance
    }));
  }, [meteorShowerSettings.meteorCount]);

  return (
    <MeteorContainer $isDark={isDark}>
      {meteors.map((m) => (
        <Star
          key={m.id}
          $isDark={isDark}
          style={{
            top: m.top,
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </MeteorContainer>
  );
};

export default MeteorShowerBackground;
