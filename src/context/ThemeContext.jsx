import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const ThemeContext = createContext();

const LIGHT_BG_GRADIENT = `linear-gradient(
  135deg,
  #dbeafe 0%,
  #e0e7ff 20%,
  #fce7f3 40%,
  #fed7aa 60%,
  #cffafe 80%,
  #dbeafe 100%
)`;

const DARK_BG_GRADIENT = `linear-gradient(
  135deg,
  #0f172a 0%,
  #1e1b4b 25%,
  #312e81 50%,
  #1e1b4b 75%,
  #0f172a 100%
)`;

const LIGHT_COLORS = ["#dbeafe", "#e0e7ff", "#fce7f3", "#fed7aa", "#cffafe"];
const DARK_COLORS = ["#0f172a", "#1e1b4b", "#312e81", "#1e1b4b", "#0f172a"];

const getLuminance = (hex) => {
  const rgb = hex.replace("#", "").match(/.{2}/g).map(x => parseInt(x, 16) / 255);
  const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  // Derived Values
  const isDark = theme === "dark";
  const activeGradient = isDark ? DARK_BG_GRADIENT : LIGHT_BG_GRADIENT;
  const activeColors = isDark ? DARK_COLORS : LIGHT_COLORS;

  // Contrast Logic
  const foreground = isDark ? "#ffffff" : "#0f172a";
  const fgRgb = hexToRgb(foreground);
  const primaryColor = isDark ? "#e8f0ff" : "#1e1b4b"; // Dynamic primary based on bg
  const accentColor = isDark ? "#818cf8" : "#3b82f6";

  useEffect(() => {
    const root = document.documentElement

    // 1. Background
    root.style.setProperty("--bg-gradient", activeGradient)
    root.style.setProperty("--bg-base", activeColors[0])

    // 2. Button & Interactive Colors
    root.style.setProperty("--button-bg", `rgba(${fgRgb}, 0.08)`)
    root.style.setProperty("--button-hover", `rgba(${fgRgb}, 0.15)`)
    root.style.setProperty("--button-text", foreground)

    // Primary Button - Use accentColor (#818cf8 in dark mode, #3b82f6 in light mode)
    root.style.setProperty("--btn-primary-bg", accentColor)
    root.style.setProperty("--btn-primary-text", "#ffffff")
    root.style.setProperty("--btn-primary-hover-color", accentColor)

    // Shadows
    root.style.setProperty("--button-hover-shadow", isDark
      ? "0 6px 16px rgba(129, 140, 248, 0.3)"
      : "0 6px 16px rgba(0,0,0,0.1)")
    root.style.setProperty("--shadow", isDark
      ? "0 4px 12px rgba(0,0,0,0.3)"
      : "0 4px 12px rgba(0,0,0,0.05)")

    // 3. Text Gradient
    root.style.setProperty("--gradient-text", `linear-gradient(to right, ${accentColor}, ${isDark ? "#c7d2fe" : "#60a5fa"})`)

    // 4. Global Tokens
    root.style.setProperty("--primary", accentColor)
    root.style.setProperty("--foreground", foreground)
    root.style.setProperty("--muted-foreground", `rgba(${fgRgb}, 0.6)`)
    root.style.setProperty("--border", `rgba(${fgRgb}, 0.1)`)
    root.style.setProperty("--navbar-bg", isDark ? "rgba(15, 23, 42, 0.75)" : "rgba(255, 255, 255, 0.75)")

    // Toggle Class
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme, isDark, activeGradient, activeColors, fgRgb, foreground, accentColor])

  const setThemeMode = (mode) => {
    if (mode === theme) return;

    const root = document.documentElement;

    // Add transition class
    root.classList.add('theme-transitioning');

    // Set theme
    setTheme(mode);

    // Remove transition class after animation completes
    setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 600);
  };

  const toggleTheme = () => {
    setThemeMode(theme === "light" ? "dark" : "light");
  };

  // No-op for removed functionality to avoid breaking older components momentarily
  const nextVariant = () => { };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode, nextVariant, activeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
