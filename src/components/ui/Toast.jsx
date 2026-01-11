import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';

const slideInRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const ToastsContainer = styled.div`
  position: fixed;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  gap: 0.5rem;

  ${props => {
    switch (props.$position) {
      case 'top-left':
        return css`
          top: 10px;
          left: 10px;
          bottom: auto;
          right: auto;
          align-items: flex-start;
        `;
      case 'bottom-right':
        return css`
          top: auto;
          left: auto;
          bottom: 10px;
          right: 10px;
          align-items: flex-end;
          flex-direction: column-reverse; /* Stack upwards from bottom */
        `;
      case 'bottom-left':
        return css`
          top: auto;
          left: 10px;
          bottom: 10px;
          right: auto;
          align-items: flex-start;
          flex-direction: column-reverse; /* Stack upwards from bottom */
        `;
      case 'top-right':
      default:
        return css`
          top: 10px;
          left: auto;
          bottom: auto;
          right: 10px;
          align-items: flex-end;
        `;
    }
  }}
`;

const ToastItem = styled.div`
  border-radius: 8px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  font-weight: 500;
  max-width: 300px;
  
  animation: ${props => props.$position?.includes('left') ? slideInLeft : slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.3s ease;

  ${props => {
    // Theme Styles
    if (props.$theme === 'simple') {
      return css`
         background: var(--card-bg, #fff);
         color: var(--foreground);
         border: 1px solid var(--border);
         .dark & { background: #1e1b4b; border-color: rgba(255,255,255,0.1); }
       `;
    }
    if (props.$theme === 'vibrant') {
      if (props.$type === 'success') return css`background: linear-gradient(135deg, #10b981, #059669); color: white; border: none;`;
      if (props.$type === 'error') return css`background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none;`;
      return css`background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; border: none;`;
    }

    // Default Theme (Colored Text / White BG)
    return css`
       background: var(--card-bg, #fff);
       .dark & { background: #1e1b4b; }
       color: ${props.$type === 'success' ? '#10b981' : props.$type === 'error' ? '#ef4444' : '#8b5cf6'};
     `;
  }}
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const getToastIcon = (type) => {
  switch (type) {
    case 'success': return <CheckCircle size={20} />;
    case 'error': return <AlertCircle size={20} />;
    default: return <Info size={20} />;
  }
};

const ToastList = ({ toasts, position = 'top-right', showIcon = true, theme = 'default' }) => {
  return (
    <ToastsContainer id="toasts" $position={position}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          $type={toast.type}
          $position={position}
          $theme={theme}
          className="toast"
        >
          {showIcon && (
            <IconWrapper>
              {getToastIcon(toast.type)}
            </IconWrapper>
          )}
          <span>{toast.message}</span>
        </ToastItem>
      ))}
    </ToastsContainer>
  );
};

export default ToastList;
