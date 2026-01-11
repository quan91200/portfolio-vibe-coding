# PROMPT 7: SNOWFALL BACKGROUND EFFECT

Develop a realistic, performant snowfall background effect using React and CSS animations that creates a winter festive atmosphere.

## 1. Core Requirements

### Visual Design
- **Snowflakes**: Small circular particles (2-5px) falling from top to bottom
- **Variation**: Each snowflake should have randomized:
  - Size (2-5px diameter)
  - Fall speed (5-10 seconds duration)
  - Starting position (0-100vw horizontal)
  - Opacity (0.3-0.8)
  - Animation delay (0-5s for staggered effect)
- **Theme Support**: 
  - Dark mode: White snowflakes (#fff) on dark blue gradient background
  - Light mode: Gray snowflakes (#94a3b8) on light gray gradient background

### Animation Behavior
- **Keyframes**: Use CSS `@keyframes` for smooth GPU-accelerated animation
  - Start: `translateY(-10vh)` with `opacity: 0` (above viewport)
  - 10%: `opacity: 1` (fade in)
  - End: `translateY(110vh)` with slight horizontal drift and fade out
- **Infinite Loop**: Snowflakes should continuously fall and restart
- **Natural Movement**: Add subtle horizontal drift (translateX) to simulate wind

## 2. Performance Optimization

### Rendering Strategy
- **useMemo**: Generate snowflake array only when `snowflakeCount` changes
- **CSS Animations**: Use `transform` and `opacity` for hardware acceleration
- **Particle Limit**: Default 50 snowflakes, adjustable via settings (10-200 range)
- **No JavaScript Animation**: Avoid `requestAnimationFrame` - use pure CSS

### Memory Management
- Fixed array size based on settings
- No dynamic particle creation/destruction during runtime
- Reuse DOM elements with inline styles

## 3. Dynamic Settings Integration

### Context Integration
- Connect to `BackgroundContext` for `snowfallSettings`
- Support real-time updates when user changes settings
- Settings to expose:
  - `snowflakeCount`: Number of snowflakes (10-200, default: 50)

### Settings UI
- Slider control for snowflake count
- Live preview of changes
- Persist settings to localStorage

## 4. Component Structure

### File Organization
```javascript
// Imports
import React, { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { useTheme } from '../../context/ThemeContext'
import { useBackground } from '../../context/BackgroundContext'

// Keyframes definition
const snowFall = keyframes`...`

// Styled components
const SnowContainer = styled.div`...`
const Snowflake = styled.div`...`

// Main component
const SnowfallBackground = () => { ... }
```

### Component Logic
1. Get theme and settings from contexts
2. Use `useMemo` to generate snowflake array with random properties
3. Render container with mapped snowflake elements
4. Apply inline styles for individual snowflake variations

## 5. Accessibility & Best Practices

### Accessibility
- Set `pointer-events: none` to avoid blocking user interactions
- Consider `prefers-reduced-motion` media query for users with motion sensitivity
- Ensure sufficient contrast between snowflakes and background

### Code Quality
- Follow project coding standards (no semicolons, proper imports)
- Add JSDoc comments for helper functions
- Use styled-components for all styling
- Maintain single responsibility principle

## 6. Background Gradient Design

### Dark Mode
```css
background: linear-gradient(to bottom, #0f172a 0%, #1e293b 100%)
```
- Deep slate blue creating night sky atmosphere

### Light Mode
```css
background: linear-gradient(to bottom, #e2e8f0 0%, #f8fafc 100%)
```
- Light gray creating overcast winter day atmosphere

## 7. Implementation Checklist

- [ ] Create snowfall keyframe animation with fade in/out
- [ ] Build SnowContainer with theme-aware background
- [ ] Build Snowflake styled component with circular shape
- [ ] Implement useMemo for snowflake generation
- [ ] Add random properties (size, position, duration, delay, opacity)
- [ ] Connect to BackgroundContext for settings
- [ ] Test performance with various snowflake counts
- [ ] Verify theme switching works correctly
- [ ] Add multi-language support for settings labels
- [ ] Document settings in settingsConfig.js
