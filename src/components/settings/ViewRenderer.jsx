import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  ChevronRight,
  Check,
  Settings,
  Palette,
  Moon,
  Globe,
  Star,
  Zap,
  Square,
  Sun,
  Snowflake,
  Sparkles,
  Minus,
  Plus,
  BellRing,
  Move,
  Layers,
  ArrowUpLeft,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDownRight,
  CreditCard,
} from 'lucide-react';
import { SETTING_TYPES } from '../../constants/settings';
import { useToast } from '../../context/ToastContext';

const getIcon = (iconName) => {
  if (!iconName) return null;
  // If it's already a component or node (like flag emoji string), return it
  if (typeof iconName !== 'string') return iconName;
  if (iconName.match(/[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]/)) return iconName; // Simple emoji check

  switch (iconName) {
    case 'palette': return <Palette size={20} />;
    case 'moon': return <Moon size={20} />;
    case 'globe': return <Globe size={20} />;
    case 'settings': return <Settings size={20} />;
    case 'star': return <Star size={20} />;
    case 'zap': return <Zap size={20} />;
    case 'square': return <Square size={20} />;
    case 'sun': return <Sun size={20} />;
    case 'snowflake': return <Snowflake size={20} />;
    case 'sparkles': return <Sparkles size={20} />;
    case 'bell-ring': return <BellRing size={20} />;
    case 'move': return <Move size={20} />;
    case 'layer': return <Layers size={20} />;
    case 'arrow-up-left': return <ArrowUpLeft size={20} />;
    case 'arrow-up-right': return <ArrowUpRight size={20} />;
    case 'arrow-down-left': return <ArrowDownLeft size={20} />;
    case 'arrow-down-right': return <ArrowDownRight size={20} />;
    case 'credit-card': return <CreditCard size={20} />;
    default: return iconName;
  }
};

/**
 * ViewRenderer Component
 * 
 * Renders a settings view based on configuration.
 * Handles different setting types: navigation, select, slider, toggle
 * 
 * Props:
 * - view: View configuration object
 * - currentValues: Current setting values
 * - onNavigate: Callback for navigation items
 * - onValueChange: Callback for value changes
 */
const ViewRenderer = ({ view, currentValues, onNavigate, onValueChange }) => {
  const { t } = useTranslation();
  const { addToast } = useToast();

  if (!view || !view.items) {
    return <EmptyState>{t('common.no_settings')}</EmptyState>;
  }

  return (
    <ViewContainer $layout={view.layout}>
      {view.items.map(item => (
        <SettingItem key={item.id} $span={item.span || 1}>
          {renderSettingItem(item, currentValues, onNavigate, onValueChange, t, addToast)}
        </SettingItem>
      ))}
    </ViewContainer>
  );
};

const renderSettingItem = (item, currentValues, onNavigate, onValueChange, t, addToast) => {
  switch (item.type) {
    case SETTING_TYPES.NAVIGATION:
      return (
        <NavigationItem
          item={item}
          onNavigate={onNavigate}
          currentValues={currentValues}
          t={t}
        />
      );

    case SETTING_TYPES.SELECT:
      return (
        <SelectItem
          item={item}
          currentValues={currentValues}
          onValueChange={onValueChange}
          onNavigate={onNavigate}
          t={t}
          addToast={addToast}
        />
      );

    case SETTING_TYPES.SLIDER:
      return (
        <SliderItem
          item={item}
          currentValues={currentValues}
          onValueChange={onValueChange}
          t={t}
          addToast={addToast}
        />
      );

    case SETTING_TYPES.TOGGLE:
      return (
        <ToggleItem
          item={item}
          currentValues={currentValues}
          onValueChange={onValueChange}
          t={t}
          addToast={addToast}
        />
      );

    case SETTING_TYPES.DIVIDER:
      return <Divider />;

    default:
      return null;
  }
};

/**
 * Navigation Item - Opens a new view
 */
const NavigationItem = ({ item, onNavigate, t, currentValues }) => {
  // Check if this navigation item corresponds to the active background
  // Extract background type from targetView (e.g., "BACKGROUND_SNOWFALL" -> "snowfall")
  const getBackgroundTypeFromView = (viewId) => {
    if (!viewId) return null;

    // Explicit mappings for reliability
    const mapping = {
      'background_color_drip': 'color-drip',
      'background_meteor_shower': 'meteor-shower',
      'background_snowfall': 'snowfall',
      'background_fireworks': 'fireworks',
      'background_gradient_wash': 'gradient-wash',
      'background_solid': 'solid'
    };

    if (mapping[viewId]) return mapping[viewId];

    // Fallback logic
    if (viewId.startsWith('background_')) {
      return viewId.replace('background_', '').replace(/_/g, '-');
    }
    return null;
  };

  const targetBackgroundType = getBackgroundTypeFromView(item.targetView);
  const isActive = targetBackgroundType && currentValues?.background === targetBackgroundType;

  // Check if this item should be disabled
  const isDisabled = item.disabledWhen && item.disabledWhen(currentValues);

  const handleClick = () => {
    if (!isDisabled) {
      onNavigate(item.targetView);
    }
  };

  return (
    <NavButton
      onClick={handleClick}
      $active={isActive}
      $disabled={isDisabled}
      disabled={isDisabled}
    >
      <ItemContent>
        {item.icon && <ItemIcon $disabled={isDisabled}>{getIcon(item.icon)}</ItemIcon>}
        <ItemText>
          <ItemLabel $disabled={isDisabled}>{t(item.label)}</ItemLabel>
          {item.description && <ItemDescription $disabled={isDisabled}>{t(item.description)}</ItemDescription>}
        </ItemText>
      </ItemContent>
      <ChevronIcon $disabled={isDisabled}>
        <ChevronRight size={20} />
      </ChevronIcon>
    </NavButton>
  )
};

/**
 * Select Item - Single selection from group
 */
const SelectItem = ({ item, currentValues, onValueChange, onNavigate, t, addToast }) => {
  const isActive = currentValues[item.group] === item.value;

  const handleClick = () => {
    onValueChange(item.group, item.value);

    // Trigger toast only if changing selection
    if (!isActive) {
      addToast(t('common.settings_saved'), 'success');
    }
  };

  return (
    <SelectWrapper>
      <SelectButton $active={isActive} onClick={handleClick}>
        <ItemContent>
          {item.icon && <ItemIcon>{getIcon(item.icon)}</ItemIcon>}
          <ItemText>
            <ItemLabel>{t(item.label)}</ItemLabel>
            {item.description && <ItemDescription>{t(item.description)}</ItemDescription>}
          </ItemText>
        </ItemContent>
        <CheckIcon $visible={isActive}>
          <Check size={20} />
        </CheckIcon>
      </SelectButton>

      {/* Advanced settings button */}
      {item.hasAdvanced && isActive && (
        <AdvancedButton
          onClick={() => onNavigate(item.advancedView, item.advancedContext)}
          title={t('common.advanced_settings')}
        >
          <Settings size={14} style={{ marginRight: '0.5rem' }} />
          {t('common.advanced')}
        </AdvancedButton>
      )}
    </SelectWrapper>
  );
};

/**
 * Slider Item - Numeric range input
 */
const SliderItem = ({ item, currentValues, onValueChange, t, addToast }) => {
  // Parse nested setting key
  const getValue = () => {
    const keys = item.settingKey.split('.');
    let value = currentValues;
    for (const key of keys) {
      value = value?.[key];
    }
    return value ?? item.defaultValue ?? item.min;
  };

  const currentValue = getValue();

  const handleDecrement = () => {
    const newValue = Math.max(item.min, currentValue - item.step);
    onValueChange(item.settingKey, newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(item.max, currentValue + item.step);
    onValueChange(item.settingKey, newValue);
  };

  // Format display value
  const displayValue = item.step < 1 ? currentValue.toFixed(1) : currentValue;

  return (
    <StepperWrapper>
      <StepperMain>
        <ItemText>
          <ItemLabel>{t(item.label)}</ItemLabel>
          {item.description && <ItemDescription>{t(item.description)}</ItemDescription>}
        </ItemText>

        <StepperControls>
          <StepperButton
            onClick={handleDecrement}
            disabled={currentValue <= item.min}
            type="button"
          >
            <Minus size={16} />
          </StepperButton>

          <StepperValue>
            {displayValue}{item.unit}
          </StepperValue>

          <StepperButton
            onClick={handleIncrement}
            disabled={currentValue >= item.max}
            type="button"
          >
            <Plus size={16} />
          </StepperButton>
        </StepperControls>
      </StepperMain>
    </StepperWrapper>
  );
};

/**
 * Toggle Item - Boolean on/off switch
 */
const ToggleItem = ({ item, currentValues, onValueChange, t, addToast }) => {
  const getValue = () => {
    const keys = item.settingKey.split('.');
    let value = currentValues;
    for (const key of keys) {
      value = value?.[key];
    }
    return value ?? item.defaultValue ?? false;
  };

  const isEnabled = getValue();

  const handleToggle = () => {
    onValueChange(item.settingKey, !isEnabled);
    // Add simple feedback
    addToast(`${t(item.label)}: ${!isEnabled ? 'On' : 'Off'}`, !isEnabled ? 'success' : 'info');
  };

  return (
    <ToggleWrapper onClick={handleToggle}>
      <ItemText>
        <ItemLabel>{t(item.label)}</ItemLabel>
        {item.description && <ItemDescription>{t(item.description)}</ItemDescription>}
      </ItemText>
      <ToggleSwitch $enabled={isEnabled}>
        <ToggleThumb $enabled={isEnabled} />
      </ToggleSwitch>
    </ToggleWrapper>
  );
};

export default ViewRenderer;

// Styled Components

const ViewContainer = styled.div`
  display: ${props => props.$layout === 'grid' ? 'grid' : 'flex'};
  flex-direction: column;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  align-items: stretch;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    display: flex;
  }
`;

const SettingItem = styled.div`
  /* Container for each setting item */
  grid-column: span ${props => props.$span || 1};
  height: 100%;
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--muted-foreground);
  font-size: 0.875rem;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border);
  margin: 0.5rem 0;
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

const ItemIcon = styled.span`
  font-size: 1.5rem;
  line-height: 1;
  opacity: ${props => props.$disabled ? 0.4 : 1};
  transition: opacity 0.2s;
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const ItemLabel = styled.div`
  font-weight: 500;
  font-size: 0.9375rem;
  color: var(--foreground);
  opacity: ${props => props.$disabled ? 0.4 : 1};
  transition: opacity 0.2s;
`;

const ItemDescription = styled.div`
  font-size: 0.8125rem;
  color: var(--muted-foreground);
  opacity: ${props => props.$disabled ? 0.4 : 1};
  transition: opacity 0.2s;
`;

// Navigation Item Styles
const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background: ${props => props.$active ? 'var(--button-bg)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border)'};
  border-radius: var(--radius);
  color: var(--foreground);
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: ${props => props.$disabled ? 'transparent' : 'var(--button-hover)'};
    border-color: ${props => props.$disabled ? 'var(--border)' : (props.$active ? 'var(--primary)' : 'var(--foreground)')};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ChevronIcon = styled.span`
  font-size: 1.5rem;
  color: var(--muted-foreground);
  opacity: ${props => props.$disabled ? 0.3 : 1};
  transition: transform 0.2s, opacity 0.2s;

  ${NavButton}:hover & {
    transform: ${props => props.$disabled ? 'none' : 'translateX(4px)'};
    color: ${props => props.$disabled ? 'var(--muted-foreground)' : 'var(--foreground)'};
  }

  @media (prefers-reduced-motion: reduce) {
    ${NavButton}:hover & {
      transform: none;
    }
  }
`;

// Select Item Styles
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background: ${props => props.$active ? 'var(--button-bg)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border)'};
  border-radius: var(--radius);
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: var(--button-hover);
    border-color: ${props => props.$active ? 'var(--primary)' : 'var(--foreground)'};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const CheckIcon = styled.span`
  color: var(--primary);
  font-size: 1.25rem;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.2s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const AdvancedButton = styled.button`
  padding: 0.5rem 0.75rem;
  background: var(--button-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--foreground);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-start;
  margin-left: 1rem;

  &:hover {
    background: var(--button-hover);
    border-color: var(--foreground);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// Stepper Item Styles (Formerly Slider)
const StepperWrapper = styled.div`
  padding: 1rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const StepperMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const StepperControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--button-bg);
  padding: 0.25rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
`;

const StepperButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: var(--button-hover);
    color: var(--primary);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const StepperValue = styled.span`
  font-weight: 600;
  color: var(--primary);
  font-size: 0.9375rem;
  min-width: 3.5rem;
  text-align: center;
`;

// Toggle Item Styles
const ToggleWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: var(--button-hover);
    border-color: var(--foreground);
  }

  height: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 44px;
  height: 24px;
  background: ${props => props.$enabled ? 'var(--primary)' : 'var(--border)'};
  border-radius: 12px;
  transition: background 0.2s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ToggleThumb = styled.div`
  position: absolute;
  top: 2px;
  left: ${props => props.$enabled ? '22px' : '2px'};
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: left 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
