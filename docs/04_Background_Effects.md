# PROMPT 4: ADVANCED BACKGROUND EFFECTS

Develop high-performance, visually stunning background effects as React components that react to dynamic settings.

## 1. Meteor Shower Effect
- **Logic**: Generate an array of "meteor" objects with randomized `top`, `left`, `delay`, and `duration`.
- **Dynamic**: The number of meteors should be controlled by a `meteorCount` prop/state.
- **Rendering**:
    - Use `useMemo` to regenerate the array ONLY when the count changes.
    - Animate meteors using CSS keyframes (falling diagonally).
    - Add a "trail" effect using linear gradients.

## 2. Color Drip Effect
- **Logic**: Create vertical lines distributed horizontally across the screen.
- **Animation**: Use CSS pseudo-elements (`::after`) to animate a falling gradient "drip" on each line.
- **Dynamic**: Control the thickness of the vertical lines using a `lineThickness` prop (1-5px).
- **Variations**: Each drip should have a staggered delay and a unique accent color based on a predefined palette.

## 3. Performance Guidelines
- Use CSS animations (`transform` and `opacity`) instead of JS-based frame updates where possible to leverage GPU.
- Ensure the background is fixed (`position: fixed`, `inset: 0`) and has `pointer-events: none` to avoid interfering with user interaction.
- Implement `prefers-reduced-motion` check to disable heavy animations for accessibility.
