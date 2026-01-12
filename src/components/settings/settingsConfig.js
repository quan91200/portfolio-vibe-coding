/**
 * Settings Configuration
 * 
 * This file defines all settings in a declarative, configuration-driven format.
 * Each setting can trigger navigation, toggle values, or open pickers.
 * 
 * Adding new settings requires NO changes to modal core logic.
 */

import { SETTING_TYPES, VIEW_IDS } from '../../constants/settings'

/**
 * Settings View Configuration
 * Each view is a separate panel that can be navigated to
 */
export const settingsViews = {
  [VIEW_IDS.ROOT]: {
    id: VIEW_IDS.ROOT,
    title: 'common.settings',
    items: [
      {
        id: 'background-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'settings.background_style',
        description: 'settings.background_style_desc',
        icon: 'palette',
        targetView: VIEW_IDS.BACKGROUND,
      },
      {
        id: 'theme-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'common.appearance',
        description: 'common.appearance_desc',
        icon: 'moon',
        targetView: VIEW_IDS.THEME,
      },
      {
        id: 'language-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'common.language',
        description: 'common.language_desc',
        icon: 'globe',
        targetView: VIEW_IDS.LANGUAGE,
      },
      {
        id: 'notifications-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'settings.notifications',
        description: 'settings.notifications_desc',
        icon: 'bell-ring',
        targetView: VIEW_IDS.NOTIFICATIONS,
      },
      {
        id: 'advanced-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'common.advanced',
        description: 'common.advanced_desc',
        icon: 'settings',
        targetView: VIEW_IDS.ADVANCED,
      },
    ],
  },

  // Background selection view - shows all background types
  [VIEW_IDS.BACKGROUND]: {
    id: VIEW_IDS.BACKGROUND,
    title: 'settings.background_style',
    items: [
      {
        id: 'bg-color-drip-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'settings.color_drip',
        description: 'settings.description_color_drip',
        icon: 'palette',
        targetView: VIEW_IDS.BACKGROUND_COLOR_DRIP,
      },
      {
        id: 'bg-meteor-shower-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'settings.meteor_shower',
        description: 'settings.description_meteor_shower',
        icon: 'star',
        targetView: VIEW_IDS.BACKGROUND_METEOR_SHOWER,
      },
      {
        id: 'bg-snowfall-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'settings.snowfall',
        description: 'settings.description_snowfall',
        icon: 'snowflake',
        targetView: VIEW_IDS.BACKGROUND_SNOWFALL,
        disabledWhen: (currentValues) => currentValues?.theme === 'light',
      },
      {
        id: 'bg-fireworks-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'settings.fireworks',
        description: 'settings.description_fireworks',
        icon: 'sparkles',
        targetView: VIEW_IDS.BACKGROUND_FIREWORKS,
        disabledWhen: (currentValues) => currentValues?.theme === 'light',
      },
      {
        id: 'bg-gradient-wash-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'settings.gradient_wash',
        description: 'settings.description_gradient_wash',
        icon: 'zap',
        targetView: VIEW_IDS.BACKGROUND_GRADIENT_WASH,
      },
      {
        id: 'bg-solid-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'settings.solid',
        description: 'settings.description_solid',
        icon: 'square',
        targetView: VIEW_IDS.BACKGROUND_SOLID,
      },
    ],
  },

  // Color Drip Background Settings - dedicated view with selection + advanced settings
  [VIEW_IDS.BACKGROUND_COLOR_DRIP]: {
    id: VIEW_IDS.BACKGROUND_COLOR_DRIP,
    title: 'settings.color_drip',
    items: [
      {
        id: 'select-color-drip',
        type: SETTING_TYPES.SELECT,
        label: 'settings.use_color_drip',
        description: 'settings.description_color_drip',
        value: 'color-drip',
        group: 'background',
      },
      {
        id: 'color-drip-divider',
        type: SETTING_TYPES.DIVIDER,
      },
      {
        id: 'line-thickness',
        type: SETTING_TYPES.SLIDER,
        label: 'settings.line_thickness',
        description: 'settings.line_thickness_desc',
        min: 1,
        max: 5,
        step: 1,
        unit: 'px',
        settingKey: 'colorDripSettings.lineThickness',
      },
    ],
  },

  // Meteor Shower Background Settings - dedicated view with selection + advanced settings
  [VIEW_IDS.BACKGROUND_METEOR_SHOWER]: {
    id: VIEW_IDS.BACKGROUND_METEOR_SHOWER,
    title: 'settings.meteor_shower',
    items: [
      {
        id: 'select-meteor-shower',
        type: SETTING_TYPES.SELECT,
        label: 'settings.use_meteor_shower',
        description: 'settings.description_meteor_shower',
        value: 'meteor-shower',
        group: 'background',
      },
      {
        id: 'meteor-divider',
        type: SETTING_TYPES.DIVIDER,
      },
      {
        id: 'meteor-count',
        type: SETTING_TYPES.SLIDER,
        label: 'settings.meteor_count',
        description: 'settings.meteor_count_desc',
        min: 5,
        max: 50,
        step: 5,
        unit: '',
        settingKey: 'meteorShowerSettings.meteorCount',
      },
    ],
  },

  // Snowfall Background Settings
  [VIEW_IDS.BACKGROUND_SNOWFALL]: {
    id: VIEW_IDS.BACKGROUND_SNOWFALL,
    title: 'settings.snowfall',
    items: [
      {
        id: 'select-snowfall',
        type: SETTING_TYPES.SELECT,
        label: 'settings.use_snowfall',
        description: 'settings.description_snowfall',
        value: 'snowfall',
        group: 'background',
      },
      {
        id: 'snowfall-divider',
        type: SETTING_TYPES.DIVIDER,
      },
      {
        id: 'snowflake-count',
        type: SETTING_TYPES.SLIDER,
        label: 'settings.snowflake_count',
        description: 'settings.snowflake_count_desc',
        min: 10,
        max: 200,
        step: 10,
        unit: '',
        settingKey: 'snowfallSettings.snowflakeCount',
      },
    ],
  },

  // Fireworks Background Settings
  [VIEW_IDS.BACKGROUND_FIREWORKS]: {
    id: VIEW_IDS.BACKGROUND_FIREWORKS,
    title: 'settings.fireworks',
    layout: 'grid',
    items: [
      {
        id: 'select-fireworks',
        type: SETTING_TYPES.SELECT,
        label: 'settings.use_fireworks',
        description: 'settings.description_fireworks',
        value: 'fireworks',
        group: 'background',
        span: 2,
      },
      {
        id: 'fireworks-divider',
        type: SETTING_TYPES.DIVIDER,
        span: 2,
      },
      {
        id: 'fireworks-click',
        type: SETTING_TYPES.TOGGLE,
        label: 'settings.fireworks_click',
        description: 'settings.fireworks_click_desc',
        settingKey: 'fireworksSettings.enableClickFirework',
        defaultValue: true,
      },
      {
        id: 'fireworks-auto',
        type: SETTING_TYPES.TOGGLE,
        label: 'settings.fireworks_auto',
        description: 'settings.fireworks_auto_desc',
        settingKey: 'fireworksSettings.enableAutoFirework',
        defaultValue: true,
      },
      {
        id: 'fireworks-auto-frequency',
        type: SETTING_TYPES.SLIDER,
        label: 'settings.fireworks_auto_frequency',
        description: 'settings.fireworks_auto_frequency_desc',
        min: 1,
        max: 60,
        step: 1,
        unit: '/min',
        settingKey: 'fireworksSettings.autoFirePerMinute',
      },
      {
        id: 'fireworks-happy-new-year',
        type: SETTING_TYPES.TOGGLE,
        label: 'settings.fireworks_happy_new_year',
        description: 'settings.fireworks_happy_new_year_desc',
        settingKey: 'fireworksSettings.enableHappyNewYear',
        defaultValue: true,
      },
      {
        id: 'fireworks-happy-new-year-frequency',
        type: SETTING_TYPES.SLIDER,
        label: 'settings.fireworks_happy_new_year_frequency',
        description: 'settings.fireworks_happy_new_year_frequency_desc',
        min: 1,
        max: 12,
        step: 1,
        unit: '/hour',
        settingKey: 'fireworksSettings.happyNewYearPerHour',
      },
      {
        id: 'fireworks-year-text',
        type: SETTING_TYPES.TOGGLE,
        label: 'settings.fireworks_year_text',
        description: 'settings.fireworks_year_text_desc',
        settingKey: 'fireworksSettings.enableYearText',
        defaultValue: true,
      },
      {
        id: 'fireworks-year-text-frequency',
        type: SETTING_TYPES.SLIDER,
        label: 'settings.fireworks_year_text_frequency',
        description: 'settings.fireworks_year_text_frequency_desc',
        min: 1,
        max: 12,
        step: 1,
        unit: '/hour',
        settingKey: 'fireworksSettings.yearTextPerHour',
      },
      {
        id: 'fireworks-divider-2',
        type: SETTING_TYPES.DIVIDER,
      },
      {
        id: 'fireworks-trail-fade',
        type: SETTING_TYPES.SLIDER,
        label: 'settings.fireworks_trail_fade',
        description: 'settings.fireworks_trail_fade_desc',
        min: 1,
        max: 10,
        step: 0.5,
        unit: 's',
        settingKey: 'fireworksSettings.trailFadeTime',
      },
    ],
  },


  // Gradient Wash Background Settings
  [VIEW_IDS.BACKGROUND_GRADIENT_WASH]: {
    id: VIEW_IDS.BACKGROUND_GRADIENT_WASH,
    title: 'settings.gradient_wash',
    items: [
      {
        id: 'select-gradient-wash',
        type: SETTING_TYPES.SELECT,
        label: 'settings.use_gradient_wash',
        description: 'settings.description_gradient_wash',
        value: 'gradient-wash',
        group: 'background',
      },
    ],
  },

  // Solid Background Settings
  [VIEW_IDS.BACKGROUND_SOLID]: {
    id: VIEW_IDS.BACKGROUND_SOLID,
    title: 'settings.solid',
    items: [
      {
        id: 'select-solid',
        type: SETTING_TYPES.SELECT,
        label: 'settings.use_solid',
        description: 'settings.description_solid',
        value: 'solid',
        group: 'background',
      },
    ],
  },

  // Theme settings
  [VIEW_IDS.THEME]: {
    id: VIEW_IDS.THEME,
    title: 'common.appearance',
    items: [
      {
        id: 'theme-light',
        type: SETTING_TYPES.SELECT,
        label: 'common.light_mode',
        description: 'common.light_mode_desc',
        value: 'light',
        group: 'theme',
        icon: 'sun'
      },
      {
        id: 'theme-dark',
        type: SETTING_TYPES.SELECT,
        label: 'common.dark_mode',
        description: 'common.dark_mode_desc',
        value: 'dark',
        group: 'theme',
        icon: 'moon'
      }
    ],
  },

  // Language settings
  [VIEW_IDS.LANGUAGE]: {
    id: VIEW_IDS.LANGUAGE,
    title: 'common.language',
    items: [
      {
        id: 'lang-en',
        type: SETTING_TYPES.SELECT,
        label: 'English',
        description: 'English (US)',
        value: 'en',
        group: 'language',
        icon: '🇺🇸',
      },
      {
        id: 'lang-vi',
        type: SETTING_TYPES.SELECT,
        label: 'Tiếng Việt',
        description: 'Vietnamese',
        value: 'vi',
        group: 'language',
        icon: '🇻🇳',
      },
      {
        id: 'lang-jp',
        type: SETTING_TYPES.SELECT,
        label: '日本語',
        description: 'Japanese',
        value: 'jp',
        group: 'language',
        icon: '🇯🇵',
      },
      {
        id: 'lang-zh',
        type: SETTING_TYPES.SELECT,
        label: '中文 (简体)',
        description: 'Chinese (Simplified)',
        value: 'zh',
        group: 'language',
        icon: '🇨🇳',
      },
    ],
  },

  // Notifications / Toast Settings
  [VIEW_IDS.NOTIFICATIONS]: {
    id: VIEW_IDS.NOTIFICATIONS,
    title: 'settings.notifications',
    items: [
      {
        id: 'toast-icon',
        type: SETTING_TYPES.TOGGLE,
        label: 'settings.toast_icon',
        description: 'settings.toast_icon_desc',
        settingKey: 'toasts.showIcon',
        defaultValue: true,
      },
      {
        id: 'toast-divider',
        type: SETTING_TYPES.DIVIDER,
      },
      {
        id: 'toast-position-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'settings.toast_position',
        description: 'settings.toast_position_desc',
        icon: 'move',
        targetView: VIEW_IDS.NOTIFICATIONS_POSITION,
      },
      {
        id: 'toast-theme-nav',
        type: SETTING_TYPES.NAVIGATION,
        label: 'settings.toast_theme',
        description: 'settings.toast_theme_desc',
        icon: 'palette',
        targetView: VIEW_IDS.NOTIFICATIONS_THEME,
      },
    ],
  },

  // Notification Position Settings
  [VIEW_IDS.NOTIFICATIONS_POSITION]: {
    id: VIEW_IDS.NOTIFICATIONS_POSITION,
    title: 'settings.toast_position',
    layout: 'grid',
    items: [
      {
        id: 'pos-top-left',
        type: SETTING_TYPES.SELECT,
        label: 'settings.top_left',
        value: 'top-left',
        group: 'toastPosition',
        icon: 'arrow-up-left',
      },
      {
        id: 'pos-top-right',
        type: SETTING_TYPES.SELECT,
        label: 'settings.top_right',
        value: 'top-right',
        group: 'toastPosition',
        icon: 'arrow-up-right',
      },
      {
        id: 'pos-bottom-left',
        type: SETTING_TYPES.SELECT,
        label: 'settings.bottom_left',
        value: 'bottom-left',
        group: 'toastPosition',
        icon: 'arrow-down-left',
      },
      {
        id: 'pos-bottom-right',
        type: SETTING_TYPES.SELECT,
        label: 'settings.bottom_right',
        value: 'bottom-right',
        group: 'toastPosition',
        icon: 'arrow-down-right',
      },
    ],
  },

  // Notification Theme Settings
  [VIEW_IDS.NOTIFICATIONS_THEME]: {
    id: VIEW_IDS.NOTIFICATIONS_THEME,
    title: 'settings.toast_theme',
    items: [
      {
        id: 'theme-default',
        type: SETTING_TYPES.SELECT,
        label: 'settings.theme_default',
        description: 'settings.theme_default_desc',
        value: 'default',
        group: 'toastTheme',
        icon: 'layer',
      },
      {
        id: 'theme-simple',
        type: SETTING_TYPES.SELECT,
        label: 'settings.theme_simple',
        description: 'settings.theme_simple_desc',
        value: 'simple',
        group: 'toastTheme',
        icon: 'credit-card',
      },
      {
        id: 'theme-vibrant',
        type: SETTING_TYPES.SELECT,
        label: 'settings.theme_vibrant',
        description: 'settings.theme_vibrant_desc',
        value: 'vibrant',
        group: 'toastTheme',
        icon: 'zap',
      },
    ],
  },

  // Advanced settings
  [VIEW_IDS.ADVANCED]: {
    id: VIEW_IDS.ADVANCED,
    title: 'common.advanced',
    items: [
      {
        id: 'animations',
        type: SETTING_TYPES.TOGGLE,
        label: 'settings.animations',
        description: 'settings.animations_desc',
        settingKey: 'advanced.animations',
        defaultValue: true
      },
      {
        id: 'reduce-motion',
        type: SETTING_TYPES.TOGGLE,
        label: 'settings.reduce_motion',
        description: 'settings.reduce_motion_desc',
        settingKey: 'advanced.reduceMotion',
        defaultValue: false
      },
      {
        id: 'advanced-divider',
        type: SETTING_TYPES.DIVIDER
      },
      {
        id: 'modal-blur',
        type: SETTING_TYPES.SLIDER,
        label: 'settings.modal_blur',
        description: 'settings.modal_blur_desc',
        min: 0,
        max: 20,
        step: 1,
        unit: 'px',
        settingKey: 'advanced.modalBlur'
      },
      {
        id: 'modal-opacity',
        type: SETTING_TYPES.SLIDER,
        label: 'settings.modal_opacity',
        description: 'settings.modal_opacity_desc',
        min: 0,
        max: 1,
        step: 0.05,
        unit: '',
        settingKey: 'advanced.modalOpacity'
      }
    ]
  }
}

/**
 * Get a view configuration by ID
 */
export const getView = (viewId, context = null) => {
  const view = settingsViews[viewId]
  if (!view) return null

  if (view.dynamic && view.getItems) {
    return {
      ...view,
      items: view.getItems(context),
    }
  }

  return view
}

/**
 * Get all items for a specific view
 */
export const getViewItems = (viewId, context = null) => {
  const view = getView(viewId, context)
  return view ? view.items : []
}
