import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const BackgroundContext = createContext();

const BACKGROUND_TYPES = {
  COLOR_DRIP: 'color-drip',
  GRADIENT_WASH: 'gradient-wash',
  SOLID: 'solid',
  METEOR_SHOWER: 'meteor-shower',
  SNOWFALL: 'snowfall',
  FIREWORKS: 'fireworks'
};

const DEFAULT_METEOR_SETTINGS = {
  meteorCount: 20 // meteors per cycle
};

const DEFAULT_SNOWFALL_SETTINGS = {
  snowflakeCount: 50
};

const DEFAULT_FIREWORKS_SETTINGS = {
  intensity: 5, // 1-10 scale
  enableClickFirework: true,
  enableAutoFirework: true,
  enableHappyNewYear: true,
  enableYearText: true,
  year: new Date().getFullYear().toString(),
  trailFadeTime: 2.5, // seconds - how long particles take to fade out (1-10)
  autoFirePerMinute: 15, // how many auto fireworks per minute (1-60)
  happyNewYearPerHour: 1, // how many times per hour to show "HAPPY NEW YEAR" (1-12)
  yearTextPerHour: 1, // how many times per hour to show year text (1-12)
};

const DEFAULT_COLOR_DRIP_SETTINGS = {
  lineThickness: 1 // 1-5px
};

export const BackgroundProvider = ({ children }) => {
  const { theme } = useTheme();

  const [backgroundType, setBackgroundType] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ui.background.type") || BACKGROUND_TYPES.COLOR_DRIP;
    }
    return BACKGROUND_TYPES.COLOR_DRIP;
  });

  const [meteorShowerSettings, setMeteorShowerSettings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ui.background.meteorShower");
      return saved ? JSON.parse(saved) : DEFAULT_METEOR_SETTINGS;
    }
    return DEFAULT_METEOR_SETTINGS;
  });

  const [colorDripSettings, setColorDripSettings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ui.background.colorDrip");
      return saved ? JSON.parse(saved) : DEFAULT_COLOR_DRIP_SETTINGS;
    }
    return DEFAULT_COLOR_DRIP_SETTINGS;
  });

  const [snowfallSettings, setSnowfallSettings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ui.background.snowfall");
      return saved ? JSON.parse(saved) : DEFAULT_SNOWFALL_SETTINGS;
    }
    return DEFAULT_SNOWFALL_SETTINGS;
  });

  const [fireworksSettings, setFireworksSettings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ui.background.fireworks");
      return saved ? JSON.parse(saved) : DEFAULT_FIREWORKS_SETTINGS;
    }
    return DEFAULT_FIREWORKS_SETTINGS;
  });

  // Auto-switch background when changing to light mode if current bg is dark-only
  useEffect(() => {
    if (theme === 'light') {
      const darkOnlyBackgrounds = [BACKGROUND_TYPES.FIREWORKS, BACKGROUND_TYPES.SNOWFALL];
      if (darkOnlyBackgrounds.includes(backgroundType)) {
        setBackgroundType(BACKGROUND_TYPES.SOLID);
      }
    }
  }, [theme, backgroundType]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ui.background.type", backgroundType);
    }
  }, [backgroundType]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ui.background.meteorShower", JSON.stringify(meteorShowerSettings));
    }
  }, [meteorShowerSettings]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ui.background.colorDrip", JSON.stringify(colorDripSettings));
    }
  }, [colorDripSettings]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ui.background.snowfall", JSON.stringify(snowfallSettings));
    }
  }, [snowfallSettings]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ui.background.fireworks", JSON.stringify(fireworksSettings));
    }
  }, [fireworksSettings]);

  const switchBackground = (type) => {
    if (Object.values(BACKGROUND_TYPES).includes(type)) {
      setBackgroundType(type);
    }
  };

  const updateMeteorShowerSettings = (settings) => {
    setMeteorShowerSettings(prev => ({ ...prev, ...settings }));
  };

  const updateColorDripSettings = (settings) => {
    setColorDripSettings(prev => ({ ...prev, ...settings }));
  };

  const updateSnowfallSettings = (settings) => {
    setSnowfallSettings(prev => ({ ...prev, ...settings }));
  };

  const updateFireworksSettings = (settings) => {
    setFireworksSettings(prev => ({ ...prev, ...settings }));
  };

  return (
    <BackgroundContext.Provider value={{
      backgroundType,
      switchBackground,
      BACKGROUND_TYPES,
      meteorShowerSettings,
      updateMeteorShowerSettings,
      colorDripSettings,
      updateColorDripSettings,
      snowfallSettings,
      updateSnowfallSettings,
      fireworksSettings,
      updateFireworksSettings
    }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
