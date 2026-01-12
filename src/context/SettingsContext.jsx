import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

/**
 * Settings Context
 * 
 * Manages all application settings in a centralized location.
 * Provides methods to update nested settings and persists to localStorage.
 * 
 * This context is separate from ThemeContext and BackgroundContext
 * but provides a unified interface for the settings modal.
 */

const SettingsContext = createContext()

const STORAGE_KEY = 'app.settings'

const DEFAULT_SETTINGS = {
  advanced: {
    animations: true,
    reduceMotion: false,
    modalBlur: 12,
    modalOpacity: 0.8
  },
  language: 'en'
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        } catch (e) {
          console.error('Failed to parse settings:', e)
        }
      }
    }
    return DEFAULT_SETTINGS
  })

  // Persist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    }
  }, [settings])

  // Synchronize language with i18next
  useEffect(() => {
    import('../i18n/i18n').then(({ default: i18n }) => {
      if (i18n.language !== settings.language) {
        i18n.changeLanguage(settings.language)
      }
    })
  }, [settings.language])

  /**
   * Update a setting value
   * Supports nested keys using dot notation (e.g., "advanced.animations")
   */
  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const keys = key.split('.')
      const newSettings = { ...prev }

      let current = newSettings
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i]
        if (!current[k] || typeof current[k] !== 'object') {
          current[k] = {}
        } else {
          current[k] = { ...current[k] }
        }
        current = current[k]
      }

      current[keys[keys.length - 1]] = value
      return newSettings
    })
  }, [])

  /**
   * Get a setting value
   * Supports nested keys using dot notation
   */
  const getSetting = useCallback((key, defaultValue = null) => {
    const keys = key.split('.')
    let value = settings

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return defaultValue
      }
    }

    return value
  }, [settings])

  /**
   * Reset all settings to defaults
   */
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
  }, [])

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSetting,
      getSetting,
      resetSettings,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
