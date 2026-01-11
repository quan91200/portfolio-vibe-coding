# CODING STANDARDS & RULES

All source code in this project must strictly adhere to the following rules to ensure consistency, performance, and maintainability.

## 1. File Structure (JSX/JS Order)
Every React component file (JSX) must be organized in this specific order:
1.  **Imports**: External libraries first, then internal components/contexts.
2.  **Main Function**: The primary React component (Component logic).
3.  **Styled Components**: All styled-component definitions must reside at the end of the file.

## 2. Import Rules
- **Classification**: Categorize imports (e.g., React core, Lucide icons, Styles, Contexts). Each group must be separated by **one empty line**.
- **Destructuring**: For imports using curly braces `{}`, each property (prop) must be on its own **separate line**.
  *Example:*
  ```javascript
  import {
    useState,
    useEffect,
    useMemo
  } from "react"
  ```

## 3. Syntax & Formatting
- **Semicolons**: DO NOT use semicolons `;` at the end of statements in `.js` and `.jsx` files.
- **Emojis**: Absolutely no direct use of emojis as UI icons (e.g., 🎨, 🚀, ⚙️). You must use icon libraries such as `lucide-react` or `react-icons`.

## 4. Documentation
- **JSDocs**: Every function (including component helpers) must have JSDocs with detailed descriptions. English or Vietnamese is acceptable.
  *Example:*
  ```javascript
  /**
   * Calculates the display value based on a ratio
   * @param {number} value - Input value
   * @returns {string} - Formatted percentage string
   */
  const formatPercent = (value) => {
    return `${value}%`
  }
  ```

## 5. Design Principles (SOLID)
- Apply **SOLID** principles to functions and components:
    - **Single Responsibility**: Each function/component should perform only one unique task.
    - **Open/Closed**: Code should be open for extension but closed for modification.
    - **Interface Segregation**: Components should not be forced to depend on props they do not use.

## 6. CSS & Styling
- Prioritize using **Styled Components** for component-specific styles.
- Use CSS variables (`var(--name)`) from `index.css` to ensure theme consistency.

## 7. Multi-Language Support (i18n)
- **Mandatory**: When adding ANY new feature, UI element, or setting, you MUST add multi-language support.
- **Translation Files**: Add translation keys to both `en.json` and `vi.json` in the `locales` directory.
- **Key Structure**: Use dot-notation keys grouped by scope (e.g., `settings.fireworks`, `common.save`, `hero.welcome`).
- **No Hardcoded Strings**: Never hardcode user-facing text in components or configuration files. Always use translation keys.
- **Settings Config**: In `settingsConfig.js`, use translation keys for `label` and `description` fields, not literal strings.
- **Validation**: Before completing any feature, verify that all text is translatable and works in both English and Vietnamese.
