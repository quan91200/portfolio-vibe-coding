import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastList from '@/components/ui/Toast';
import { useSettings } from './SettingsContext';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const { getSetting } = useSettings();

  const position = getSetting('toasts.position', 'top-right');
  const showIcon = getSetting('toasts.showIcon', true);
  const theme = getSetting('toasts.theme', 'default');

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastList
        toasts={toasts}
        removeToast={removeToast}
        position={position}
        showIcon={showIcon}
        theme={theme}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
