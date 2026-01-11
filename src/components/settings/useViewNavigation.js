import { useState, useCallback } from 'react';
import { VIEW_IDS } from '../../constants/settings';

/**
 * Custom hook for managing view navigation stack
 * 
 * Implements a stack-based navigation pattern similar to mobile apps:
 * - push: Navigate forward to a new view
 * - pop: Navigate back to previous view
 * - reset: Return to root view
 * 
 * Each view maintains its own context for dynamic content
 */
export const useViewNavigation = (initialView = VIEW_IDS.ROOT) => {
  const [viewStack, setViewStack] = useState([
    { viewId: initialView, context: null }
  ]);

  // Current view is always the last item in the stack
  const currentView = viewStack[viewStack.length - 1];
  const canGoBack = viewStack.length > 1;

  /**
   * Navigate to a new view (push onto stack)
   */
  const navigateTo = useCallback((viewId, context = null) => {
    setViewStack(prev => [...prev, { viewId, context }]);
  }, []);

  /**
   * Go back to previous view (pop from stack)
   */
  const goBack = useCallback(() => {
    if (canGoBack) {
      setViewStack(prev => prev.slice(0, -1));
    }
  }, [canGoBack]);

  /**
   * Reset to root view
   */
  const reset = useCallback(() => {
    setViewStack([{ viewId: VIEW_IDS.ROOT, context: null }]);
  }, []);

  /**
   * Get navigation direction for animations
   * Returns 'forward' or 'backward'
   */
  const [navigationDirection, setNavigationDirection] = useState('forward');

  const navigateToWithDirection = useCallback((viewId, context = null) => {
    setNavigationDirection('forward');
    navigateTo(viewId, context);
  }, [navigateTo]);

  const goBackWithDirection = useCallback(() => {
    setNavigationDirection('backward');
    goBack();
  }, [goBack]);

  return {
    currentView,
    canGoBack,
    navigateTo: navigateToWithDirection,
    goBack: goBackWithDirection,
    reset,
    navigationDirection,
    viewStack,
  };
};
