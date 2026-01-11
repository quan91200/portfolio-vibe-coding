# PROMPT 1: CORE ARCHITECTURE & STATE MANAGEMENT

Establish a robust state management system for a modern React portfolio using Context API. The system should manage Themes, Background Effects, and Global App Settings with persistence.

## 1. Theme Configuration
- Support `light` and `dark` modes.
- Implement a `ThemeContext` to provide current theme and toggle functions.
- Persist selection in LocalStorage (`ui.theme`).
- Use `styled-components` to apply global styles and theme variables (colors, borders, backgrounds).

## 2. Background State Management
- Create a `BackgroundContext` to manage the active background type.
- **Background Types**: `color-drip`, `meteor-shower`, `gradient-wash`, `solid`.
- **Advanced Settings**:
    - `meteor-shower`: `meteorCount` (Range 5-50).
    - `color-drip`: `lineThickness` (Range 1-5px).
- Persist both background type and individual settings in LocalStorage.

## 3. Generic Settings Framework
- Create a `SettingsContext` for non-UI specific state (Language, Accessibility).
- Implement a `updateSetting(key, value)` function supporting dot notation (e.g., `advanced.animations`).
- Persist all settings in a single `app.settings` object in LocalStorage.

## 4. Key Rules
- Use `useCallback` for update functions to prevent unnecessary re-renders.
- Default to `dark` theme for a premium developer feel.
- Ensure all contexts are properly wrapped in a main `App` entry point.
