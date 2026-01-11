# PROMPT 8: FIREWORKS BACKGROUND EFFECT

Develop a realistic, interactive fireworks background effect using HTML5 Canvas 2D and React that creates a celebratory atmosphere with customizable settings.

## 1. Core Requirements

### Visual Components
- **Launch Phase**: Rocket launches from bottom of screen to target position
  - White glowing projectile
  - Colored smoke trail that fades quickly
  - Upward trajectory with physics
- **Explosion Phase**: Burst of particles at target position
  - Radial particle spread (40 particles minimum)
  - Vibrant colors (#ff4b5c, #ffae00, #9b59b6, #3498db, #1abc9c, #f1c40f, #e67e22, #e74c3c)
  - Glow effect with shadow blur
  - Gravity and friction physics
- **Text Fireworks**: Special explosions forming text characters
  - "HAPPY NEW YEAR" sequence
  - Year digits (e.g., "2026")
  - Pixel-based particle formation from text rendering

### Animation Engine
- **Canvas 2D**: Use `requestAnimationFrame` for smooth 60fps animation
- **Delta Time**: Calculate `dt` for frame-independent physics
- **Particle System**: Object-oriented design with Particle and Firework classes
- **Physics Simulation**:
  - Gravity: 0.05 for explosion particles, 0.02 for trails
  - Friction: 0.98 standard, 0.95 for smoke
  - Velocity-based movement with delta time scaling

## 2. Class Architecture

### Particle Class
```javascript
class Particle {
  constructor(x, y, vx, vy, size, color, life, isTrail, isSmoke)
  update(dt) // Apply physics
  draw(ctx) // Render with alpha fade
  isAlive() // Check if particle should be removed
}
```

**Properties**:
- Position (x, y), velocity (vx, vy)
- Visual (size, color, alpha based on age/life ratio)
- Physics (gravity, friction)
- Type flags (isTrail, isSmoke)

### Firework Class
```javascript
class Firework {
  constructor(startX, startY, targetX, targetY, color, onExplode, trailFadeTime)
  update(dt) // Move toward target, generate trail
  draw(ctx) // Render projectile and trail
  isAlive() // Check if exploded and trail cleared
}
```

**Features**:
- Calculated trajectory from start to target
- Trail particle generation (smoke + colored trail)
- Explosion callback when reaching target
- Configurable trail fade time

## 3. Interactive Features

### Click-to-Launch
- **Toggle**: `enableClickFirework` setting
- **Behavior**: Click anywhere to launch firework to that position
- **Implementation**: `mousedown` event listener on canvas

### Auto Fireworks
- **Toggle**: `enableAutoFirework` setting
- **Frequency**: Configurable (1-60 per minute, default: 15)
- **Target**: Random horizontal (10-90% width), random vertical (20-50% height)
- **Interval**: `(60 / autoFirePerMinute) * 1000` milliseconds

### Text Fireworks - "HAPPY NEW YEAR"
- **Toggle**: `enableHappyNewYear` setting
- **Frequency**: Configurable (1-12 per hour, default: 1)
- **Sequence**: 
  - Split text into individual characters (exclude spaces)
  - Launch each letter with 20ms delay for smooth wave effect
  - Position horizontally across screen (15% start, 5% spacing)
  - Target height: 30-45% of viewport
- **Color**: Golden yellow (#f1c40f)

### Text Fireworks - Year
- **Toggle**: `enableYearText` setting
- **Frequency**: Configurable (1-12 per hour, default: 1)
- **Sequence**:
  - Use current year or custom year from settings
  - Launch each digit with 20ms delay
  - Position horizontally (35% start, 10% spacing)
  - Target height: 20-35% of viewport
- **Color**: Red (#e74c3c)

## 4. Text Particle Generation

### Algorithm
1. Create offscreen canvas (fontSize * 1.5 dimensions)
2. Render character with bold font (120px "Outfit")
3. Extract pixel data using `getImageData()`
4. Sample pixels at step intervals (6px for performance)
5. Create particle for each opaque pixel (alpha > 128)
6. Position particles relative to explosion center
7. Add slight random velocity for natural spread

### Performance
- Sampling step: 6px (balance between detail and particle count)
- Font size: 120px for good visibility
- Particle size: 2.5px
- Lifetime: Uses `trailFadeTime` setting

## 5. Dynamic Settings

### Customizable Parameters
- `enableClickFirework`: Boolean toggle
- `enableAutoFirework`: Boolean toggle
- `enableHappyNewYear`: Boolean toggle
- `enableYearText`: Boolean toggle
- `year`: String (default: current year)
- `trailFadeTime`: Number (1-10 seconds, default: 2.5)
  - Controls how long particles fade out
  - Applies to trails (15%), smoke (20%), and explosions (100%)
- `autoFirePerMinute`: Number (1-60, default: 15)
- `happyNewYearPerHour`: Number (1-12, default: 1)
- `yearTextPerHour`: Number (1-12, default: 1)

### Settings UI Integration
- Toggles for each feature
- Sliders for frequency and fade time controls
- Real-time updates via BackgroundContext
- Persist to localStorage

## 6. Background Design

### Dark Mode
```css
background: linear-gradient(to bottom, #020617 0%, #0a0a1a 100%)
```
- Deep blue-black night sky

### Light Mode
```css
background: linear-gradient(to bottom, #E0F6FF 0%, #87CEEB 50%, #4682B4 100%)
```
- Light sky blue transitioning to deeper blue (daytime fireworks)

## 7. Performance Optimization

### Particle Management
- Auto-cleanup: Filter out dead particles each frame
- Limit particle count through sampling and trail generation rate
- Use `isAlive()` checks before update/draw

### Canvas Optimization
- Clear entire canvas each frame: `ctx.clearRect(0, 0, width, height)`
- Set canvas size to match window dimensions
- Handle resize events to update canvas dimensions
- Use `globalAlpha` for efficient fade effects

### Memory Efficiency
- Use refs for persistent data (`fireworksRef`, `particlesRef`)
- Avoid creating new arrays unnecessarily
- Filter arrays in-place when removing dead objects

## 8. Physics Implementation

### Trail Generation
- **Smoke particles**: Every 50ms, create particle with upward velocity
  - Lifetime: `trailFadeTime * 0.2`
  - Size: 4-8px
  - Color: White with gradient
- **Trail particles**: Every frame, create particle at rocket position
  - Lifetime: `trailFadeTime * 0.15`
  - Size: 2px
  - Color: Matches rocket color

### Explosion Particles
- **Normal burst**: 40 particles in radial pattern
  - Even angular distribution: `(i / count) * Math.PI * 2`
  - Random speed: 2-6 units
  - Lifetime: Full `trailFadeTime` value
- **Text burst**: Pixel-based particle formation
  - Position based on character shape
  - Slight random velocity for natural effect

## 9. Implementation Checklist

- [ ] Create Particle class with physics and rendering
- [ ] Create Firework class with trajectory and trail generation
- [ ] Implement Canvas 2D rendering loop with delta time
- [ ] Add click-to-launch functionality
- [ ] Add auto-launch with configurable frequency
- [ ] Implement text particle generation algorithm
- [ ] Add "HAPPY NEW YEAR" sequence with proper timing
- [ ] Add year text sequence
- [ ] Connect all settings to BackgroundContext
- [ ] Create settings UI with toggles and sliders
- [ ] Add theme-aware background gradients
- [ ] Implement canvas resize handling
- [ ] Optimize particle cleanup and memory usage
- [ ] Add multi-language support for all setting labels
- [ ] Test performance with multiple simultaneous fireworks
- [ ] Verify smooth 60fps animation
- [ ] Document all helper functions with JSDoc

## 10. Code Quality Standards

### File Structure
1. Imports (React, styled-components, contexts)
2. Utility functions (random, randomColor)
3. Class definitions (Particle, Firework)
4. Styled components (Canvas)
5. Main component (FireworksBackground)

### Best Practices
- No semicolons (project standard)
- JSDoc comments for all functions and classes
- Use `useCallback` for event handlers
- Use `useRef` for mutable data that doesn't trigger re-renders
- Follow SOLID principles
- Proper cleanup in useEffect return functions
