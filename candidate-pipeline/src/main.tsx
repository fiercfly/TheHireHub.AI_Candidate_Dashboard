import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from './components/ToastProvider.tsx'
import { polyfill } from "mobile-drag-drop";
import "mobile-drag-drop/default.css";

// Polyfill for native HTML5 drag and drop on mobile touch devices
polyfill({
    // Require a 200ms hold before dragging so users can still scroll standardly!
    holdToDrag: 200,
});

// Recommended by mobile-drag-drop to ensure iOS Safari works properly
window.addEventListener('touchmove', () => {}, { passive: false });

createRoot(document.getElementById('root')!).render(
    <ToastProvider>
      <App />
    </ToastProvider>
)
