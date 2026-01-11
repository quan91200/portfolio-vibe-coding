# PROMPT 2: UNIFIED MODAL SYSTEM WITH SLIDE TRANSITIONS

Design a premium, reusable **Modal component** using `framer-motion` or standard CSS transitions that supports multi-level navigation and "drill-down" views.

## 1. Visual Aesthetics
- **Backdrop**: Blurred glassmorphism effect (`backdrop-filter: blur(4px)`) with semi-transparent overlay.
- **Panel**: Centered, rounded corners (`16px`), glassmorphism background (`rgba(255, 255, 255, 0.7)` or dark equivalent).
- **Animations**:
    - **Modal Entry**: Scale up and fade in.
    - **View Transitions**: Content should slide horizontally when moving between sub-views (e.g., from Main Settings to Color Drip Settings).

## 2. Functional Requirements
- **Props**: `isOpen`, `onClose`, `title`, `children`, `showBackButton`, `onBack`, `transitionDirection` ('forward' | 'backward').
- **Accessibility**:
    - Focus trap (use `useRef` and `useEffect`).
    - Close on `Escape` key.
    - Click outside to close.
    - ARIA labels for accessibility.
- **Structure**:
    - `ModalHeader`: Title, optional Back Button (Left), and Close Button (Right).
    - `ModalBody`: Scrollable content area where view transitions occur.

## 3. Transition Logic
- Moving "Forward" (into detail view): New content slides in from the right.
- Moving "Backward" (to main view): Previous content slides in from the left.
- Ensure smooth height animations if possible or fixed height to prevent flickering.
