# PROMPT 5: SCALABLE MULTI-LANGUAGE SYSTEM (I18N)

Implement a robust internationalization (i18n) system for a React application using `i18next` that synchronizes with global settings and supports declarative UI translations.

## 1. Core Configuration (`i18n.js`)
- Use `i18next`, `react-i18next`, and `i18next-browser-languagedetector`.
- **Locales**: Organize translations in JSON files (e.g., `en.json`, `vi.json`).
- **Structure**: Group translations by scope (`common`, `settings`, `hero`, `about`, `projects`).
- **Initialization**: Set English as `fallbackLng` and enable `initReactI18next`.

## 2. Global State Synchronization
- **Settings Context**: The `language` setting should be the source of truth.
- **Auto-Sync**: Use a `useEffect` in the `SettingsProvider` to trigger `i18n.changeLanguage(newLang)` whenever the user switches language in the UI.
- **Persistence**: Ensure the preferred language is saved in LocalStorage and restored on page load via the `LanguageDetector` or custom context logic.

## 3. Declarative UI Translation
- **Config-Driven**: Instead of hardcoding strings in configuration files (like `settingsConfig.js`), use dot-notation keys (e.g., `common.appearance`).
- **Dynamic Rendering**: In the `ViewRenderer`, pass the `t` function from `useTranslation` to sub-components to resolve these keys dynamically at render time.

## 4. Component Implementation
- **Hooks**: Use `const { t } = useTranslation()` in functional components.
- **Complex Types**: Handle arrays or objects in translation files using `{ returnObjects: true }` (e.g., for rotating phrases or project lists).
- **Interpolation**: Support dynamic data within translation strings using `{{value}}` syntax.

## 5. Best Practices
- **Fallback**: Provide meaningful default values for missing keys.
- **SEO**: Ensure the `lang` attribute on the `<html>` tag is updated when the language changes.
- **Efficiency**: Use `useMemo` when mapping large datasets (like project lists) to their translated counterparts to prevent re-translation on every render.
