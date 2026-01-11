import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useBackground } from '../../context/BackgroundContext';

const snowFall = keyframes`
  0% {
    transform: translateY(-10vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) translateX(20px);
    opacity: 0.3;
  }
`;

const SnowContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${props => props.$isDark
    ? 'linear-gradient(to bottom, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(to bottom, #e2e8f0 0%, #f8fafc 100%)'};
  z-index: 0;
  pointer-events: none;
`;

const Snowflake = styled.div`
  position: absolute;
  background: ${props => props.$isDark ? '#fff' : '#94a3b8'};
  border-radius: 50%;
  opacity: 0.8;
  animation: ${snowFall} linear infinite;
`;

const SnowfallBackground = () => {
  const { theme } = useTheme();
  // We'll add this context setting later
  const { snowfallSettings = { snowflakeCount: 50 } } = useBackground();
  const isDark = theme === 'dark';

  const snowflakes = useMemo(() => {
    return Array.from({ length: snowfallSettings.snowflakeCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      size: Math.random() * 3 + 2 + 'px', // 2-5px
      animationDuration: Math.random() * 5 + 5 + 's', // 5-10s
      animationDelay: Math.random() * 5 + 's',
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, [snowfallSettings.snowflakeCount]);

  return (
    <SnowContainer $isDark={isDark}>
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.id}
          $isDark={isDark}
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            opacity: flake.opacity,
          }}
        />
      ))}
    </SnowContainer>
  );
};

export default SnowfallBackground;
