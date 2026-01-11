import React from 'react';
import { useBackground } from '@/context/BackgroundContext';
import ColorDripBackground from './ColorDripBackground';
import GradientWashBackground from './GradientWashBackground';
import SolidBackground from './SolidBackground';
import MeteorShowerBackground from './MeteorShowerBackground';
import SnowfallBackground from './SnowfallBackground';
import FireworksBackground from './FireworksBackground';

const BackgroundRenderer = () => {
  const { backgroundType, BACKGROUND_TYPES } = useBackground();

  switch (backgroundType) {
    case BACKGROUND_TYPES.COLOR_DRIP:
      return <ColorDripBackground />;
    case BACKGROUND_TYPES.GRADIENT_WASH:
      return <GradientWashBackground />;
    case BACKGROUND_TYPES.SOLID:
      return <SolidBackground />;
    case BACKGROUND_TYPES.METEOR_SHOWER:
      return <MeteorShowerBackground />;
    case BACKGROUND_TYPES.SNOWFALL:
      return <SnowfallBackground />;
    case BACKGROUND_TYPES.FIREWORKS:
      return <FireworksBackground />;
    default:
      return <ColorDripBackground />;
  }
};

export default BackgroundRenderer;
