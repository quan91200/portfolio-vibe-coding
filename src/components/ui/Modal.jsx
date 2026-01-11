import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes, css } from 'styled-components';

/**
 * Enhanced Modal Component with View Transitions
 * 
 * Features:
 * - Slide transitions for multi-level navigation
 * - Forward/backward animation support
 * - Respects prefers-reduced-motion
 * - Back button for nested views
 * - All original modal features preserved
 * 
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - title: string
 * - children: React node
 * - maxWidth: string
 * - isDark: boolean
 * - showBackButton: boolean (new)
 * - onBack: function (new)
 * - transitionDirection: 'forward' | 'backward' (new)
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth,
  isDark = false,
  showBackButton = false,
  onBack,
  transitionDirection = 'forward',
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Update content key when children change to trigger transition
  useEffect(() => {
    if (isOpen) {
      setContentKey(prev => prev + 1);
    }
  }, [children, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Save currently focused element
    previousFocusRef.current = document.activeElement;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Focus modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Handle ESC key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      // Restore body scroll
      document.body.style.overflow = '';

      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }

      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay
      $isDark={isDark}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <ModalPanel
        ref={modalRef}
        $isDark={isDark}
        $maxWidth={maxWidth}
        tabIndex={-1}
      >
        <ModalHeader>
          {showBackButton && (
            <BackButton onClick={onBack} aria-label="Go back">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </BackButton>
          )}
          <ModalTitle id="modal-title" $hasBackButton={showBackButton}>
            {title}
          </ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <ContentTransition
            key={contentKey}
            $direction={transitionDirection}
          >
            {children}
          </ContentTransition>
        </ModalBody>
      </ModalPanel>
    </Overlay>,
    document.body
  );
};

export default Modal;

// Animations

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${props => props.$isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)'};
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ModalPanel = styled.div`
  background: ${props => props.$isDark ? 'rgba(30, 30, 30, 0.4)' : 'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: ${props => props.$isDark
    ? '0 20px 60px rgba(0, 0, 0, 0.5)'
    : '0 20px 60px rgba(0, 0, 0, 0.15)'};
  max-width: ${props => props.$maxWidth || '500px'};
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: ${scaleIn} 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ModalHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: var(--muted-foreground);
  cursor: pointer;
  padding: 0.5rem;
  margin-left: -0.5rem;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: var(--button-hover);
    color: var(--foreground);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--foreground);
  margin: 0;
  flex: 1;
  text-align: ${props => props.$hasBackButton ? 'left' : 'left'};
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--muted-foreground);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: var(--button-hover);
    color: var(--foreground);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  position: relative;
`;

const ContentTransition = styled.div`
  ${props => {
    const animation = props.$direction === 'forward'
      ? slideInFromRight
      : slideInFromLeft;

    return css`
      animation: ${animation} 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    `;
  }}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
