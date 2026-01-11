# PROMPT 3: CONFIGURATION-DRIVEN SETTINGS SYSTEM

Implement a scalable **Settings Modal** where the UI is generated declaratively from a nested configuration file.

## 1. Declarative Configuration (`settingsConfig.js`)
- Define settings as an object of `views`.
- Each `view` contains `items` with properties:
    - `id`, `type` (`navigation`, `select`, `slider`, `toggle`, `divider`).
    - `label`, `description`, `icon` (Lucide component key).
    - `targetView` (for navigation types).
    - `settingKey` (to map directly to context state).

## 2. Navigation Controller (`useViewNavigation.js`)
- Manage a **navigation stack** (array of view IDs).
- Provide functions: `navigateTo(viewId)`, `goBack()`, `reset()`.
- Track `navigationDirection` to trigger the correct slide animation in the Modal.

## 3. Dynamic Renderer (`ViewRenderer.jsx`)
- Map setting `type` to specialized sub-components:
    - **NavigationItem**: Clickable row that opens a sub-view (with ChevronRight icon).
    - **SelectItem**: List items where one can be active (with Check icon).
    - **SliderItem**: Range input with real-time value display and labels.
    - **ToggleItem**: Switch for boolean values.
- All icons must be imported from `lucide-react`.

## 4. Integration
- Connect the `ViewRenderer` results to the `SettingsModal` which wraps everything in the `Modal` system.
- Ensure state updates flow through `onValueChange` and update relevant contexts (`Background`, `Theme`, or `Settings`).
