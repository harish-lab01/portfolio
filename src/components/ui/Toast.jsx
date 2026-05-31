import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck, FiX, FiInfo, FiAlertTriangle } from 'react-icons/fi';

// ── Toast config ─────────────────────────────────────────────────────────────
const STYLES = {
  success: {
    icon: FiCheck,
    bar: 'bg-emerald-500',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-500',
  },
  error: {
    icon: FiX,
    bar: 'bg-red-500',
    iconBg: 'bg-red-500/15',
    iconColor: 'text-red-500',
  },
  info: {
    icon: FiInfo,
    bar: 'bg-primary-glow-from',
    iconBg: 'bg-primary-glow-from/15',
    iconColor: 'text-primary-glow-from',
  },
  warning: {
    icon: FiAlertTriangle,
    bar: 'bg-amber-500',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-500',
  },
};

// ── Single Toast ──────────────────────────────────────────────────────────────
function ToastItem({ toast, onRemove }) {
  const { id, message, type = 'success', duration = 3000, emoji } = toast;
  const style = STYLES[type] || STYLES.success;
  const Icon = style.icon;
  const progressRef = useRef(null);

  // Auto-remove after duration
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className="relative flex items-center gap-3 bg-white/95 backdrop-blur-xl border border-border-glow rounded-2xl px-4 py-3.5 shadow-xl shadow-black/10 min-w-[260px] max-w-[340px] overflow-hidden"
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${style.bar}`} />

      {/* Icon */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg}`}>
        {emoji
          ? <span className="text-base leading-none">{emoji}</span>
          : <Icon size={14} className={style.iconColor} />
        }
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-code font-semibold text-text-primary leading-snug">{message}</p>
      </div>

      {/* Close button */}
      <button
        onClick={() => onRemove(id)}
        className="w-5 h-5 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-text-muted/10 transition-all shrink-0 cursor-pointer"
        aria-label="Dismiss"
      >
        <FiX size={10} />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border-glow/30 rounded-b-2xl overflow-hidden">
        <div
          ref={progressRef}
          className={`h-full ${style.bar} origin-left`}
          style={{
            animation: `toast-shrink ${duration}ms linear forwards`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Toast Container (fixed bottom-right, above chatbot) ──────────────────────
export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col gap-2 items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={onRemove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── useToast hook ─────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'success', duration = 3000, emoji }) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration, emoji }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
