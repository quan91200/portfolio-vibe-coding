import React from 'react';
import { useBackground } from '@/context/BackgroundContext';
import styled from 'styled-components';

const BackgroundSettings = () => {
  const { backgroundType, switchBackground, BACKGROUND_TYPES } = useBackground();

  return (
    <SettingsPanel>
      <SettingsTitle>Background Style</SettingsTitle>
      <BackgroundOption
        $active={backgroundType === BACKGROUND_TYPES.COLOR_DRIP}
        onClick={() => switchBackground(BACKGROUND_TYPES.COLOR_DRIP)}
      >
        Color Drip
      </BackgroundOption>
      <BackgroundOption
        $active={backgroundType === BACKGROUND_TYPES.GRADIENT_WASH}
        onClick={() => switchBackground(BACKGROUND_TYPES.GRADIENT_WASH)}
      >
        Gradient Wash
      </BackgroundOption>
      <BackgroundOption
        $active={backgroundType === BACKGROUND_TYPES.SOLID}
        onClick={() => switchBackground(BACKGROUND_TYPES.SOLID)}
      >
        Solid Color
      </BackgroundOption>
    </SettingsPanel>
  );
};

export default BackgroundSettings;

const SettingsPanel = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--navbar-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  z-index: 100;
  box-shadow: var(--shadow);
`;

const SettingsTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--foreground);
`;

const BackgroundOption = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  background: ${props => props.$active ? 'var(--button-bg)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'var(--button-text)' : 'var(--border)'};
  border-radius: calc(var(--radius) - 2px);
  color: var(--foreground);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: var(--button-hover);
  }
`;
