import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '@/components/ui/Modal'
import ViewRenderer from './ViewRenderer'
import { useViewNavigation } from './useViewNavigation'
import { getView } from './settingsConfig'
import { VIEW_IDS } from '../../constants/settings'
import { useTheme } from '@/context/ThemeContext'
import { useBackground } from '@/context/BackgroundContext'
import { useSettings } from '@/context/SettingsContext'

/**
 * Settings Modal
 * 
 * Architecture:
 * - Configuration-driven (settingsConfig.js)
 * - Stack-based navigation (useViewNavigation)
 * - Dynamic view rendering (ViewRenderer)
 * - Slide transitions (Modal)
 * - Centralized state management (contexts)
 * 
 * Features:
 * - Multi-level settings navigation
 * - Smooth slide transitions
 * - Back button on nested views
 * - Extensible via configuration
 * - No hardcoded settings logic
 * 
 * Props:
 * - isOpen: boolean
 * - onClose: function
 */
const SettingsModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const { theme, setThemeMode } = useTheme()
  const {
    backgroundType,
    switchBackground,
    meteorShowerSettings,
    updateMeteorShowerSettings,
    colorDripSettings,
    updateColorDripSettings,
    snowfallSettings,
    updateSnowfallSettings,
    fireworksSettings,
    updateFireworksSettings,
  } = useBackground()
  const { settings, updateSetting } = useSettings()

  const {
    currentView,
    canGoBack,
    navigateTo,
    goBack,
    reset,
    navigationDirection,
  } = useViewNavigation(VIEW_IDS.ROOT)

  // Reset to root view when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  // Aggregate all current values for the view renderer
  const currentValues = useMemo(() => ({
    background: backgroundType,
    theme: theme,
    language: settings.language || 'en',
    meteorShowerSettings,
    colorDripSettings,
    snowfallSettings,
    fireworksSettings,
    advanced: settings.advanced || {},
    toastPosition: settings.toasts?.position || 'top-right',
    toastTheme: settings.toasts?.theme || 'default',
    toasts: settings.toasts || {}
  }), [backgroundType, theme, settings, meteorShowerSettings, colorDripSettings, snowfallSettings, fireworksSettings])

  /**
   * Handle navigation to a new view
   */
  const handleNavigate = (viewId, context = null) => {
    navigateTo(viewId, context)
  }

  /**
   * Handle value changes from settings items
   */
  const handleValueChange = (key, value) => {
    // Route to appropriate context based on key
    if (key === 'background') {
      switchBackground(value)
    } else if (key === 'theme') {
      setThemeMode(value)
    } else if (key === 'language') {
      updateSetting('language', value)
    } else if (key.startsWith('meteorShowerSettings.')) {
      const settingKey = key.replace('meteorShowerSettings.', '')
      updateMeteorShowerSettings({ [settingKey]: value })
    } else if (key.startsWith('colorDripSettings.')) {
      const settingKey = key.replace('colorDripSettings.', '')
      updateColorDripSettings({ [settingKey]: value })
    } else if (key.startsWith('snowfallSettings.')) {
      const settingKey = key.replace('snowfallSettings.', '')
      updateSnowfallSettings({ [settingKey]: value })
    } else if (key.startsWith('fireworksSettings.')) {
      const settingKey = key.replace('fireworksSettings.', '')
      updateFireworksSettings({ [settingKey]: value })
    } else if (key === 'toastPosition') {
      updateSetting('toasts.position', value)
    } else if (key === 'toastTheme') {
      updateSetting('toasts.theme', value)
    } else {
      // Generic settings (advanced, etc.)
      updateSetting(key, value)
    }
  }

  // Get current view configuration
  const view = getView(currentView.viewId, currentView.context)

  if (!view) {
    return null
  }

  // Get theme settings with defaults from ADVANCED
  const modalBlur = settings.advanced?.modalBlur ?? 12
  const modalOpacity = settings.advanced?.modalOpacity ?? 0.8

  // Animation settings
  const animations = settings.advanced?.animations ?? true
  const reduceMotion = settings.advanced?.reduceMotion ?? false

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t(view.title)}
      maxWidth={view.layout === 'grid' ? "700px" : "500px"}
      isDark={theme === 'dark'}
      showBackButton={canGoBack}
      onBack={goBack}
      transitionDirection={navigationDirection}
      blur={modalBlur}
      opacity={modalOpacity}
      enableAnimations={animations}
      reduceMotion={reduceMotion}
    >
      <ViewRenderer
        view={view}
        currentValues={currentValues}
        onNavigate={handleNavigate}
        onValueChange={handleValueChange}
      />
    </Modal>
  )
}

export default SettingsModal
