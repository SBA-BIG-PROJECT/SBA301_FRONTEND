import React, { useEffect, useState, useCallback } from 'react';

/**
 * Individual Toast Item
 */
const ToastItem = ({ id, type, message, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setVisible(true), 10);
    // Auto close after 3.5s
    const autoClose = setTimeout(() => handleClose(), 3500);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(autoClose);
    };
  }, []);

  const handleClose = () => {
    setLeaving(true);
    setTimeout(() => onClose(id), 350);
  };

  const config = {
    success: {
      bg: 'linear-gradient(135deg, #1a472a 0%, #2d6a4f 100%)',
      border: '#40916c',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#40916c" />
          <path d="M7 12l3.5 3.5L17 8.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: 'Success',
    },
    error: {
      bg: 'linear-gradient(135deg, #4a0d0d 0%, #7b1a1a 100%)',
      border: '#c0392b',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#c0392b" />
          <path d="M15 9l-6 6M9 9l6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
      label: 'Error',
    },
    warning: {
      bg: 'linear-gradient(135deg, #4a3200 0%, #7a5200 100%)',
      border: '#f39c12',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 20h20L12 2z" fill="#f39c12" />
          <path d="M12 9v5M12 16.5v.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
      label: 'Warning',
    },
    info: {
      bg: 'linear-gradient(135deg, #0d2a4a 0%, #1a4a7a 100%)',
      border: '#2980b9',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#2980b9" />
          <path d="M12 8v1M12 11v5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
      label: 'Info',
    },
  };

  const { bg, border, icon, label } = config[type] || config.info;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: '12px',
        background: bg,
        border: `1px solid ${border}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
        minWidth: '300px',
        maxWidth: '420px',
        transform: visible && !leaving ? 'translateX(0) scale(1)' : 'translateX(110%) scale(0.95)',
        opacity: visible && !leaving ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease',
        cursor: 'default',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* Icon */}
      <div style={{ flexShrink: 0, marginTop: '1px' }}>{icon}</div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          color: border,
          marginBottom: '3px',
        }}>
          {label}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#e2e8f0',
          lineHeight: '1.4',
          wordBreak: 'break-word',
        }}>
          {message}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          flexShrink: 0,
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          padding: '2px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.2s',
          marginTop: '1px',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
        onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: border,
        borderRadius: '0 0 12px 12px',
        opacity: 0.6,
        animation: 'toastProgress 3.5s linear forwards',
      }} />
    </div>
  );
};

/**
 * Toast Container — renders all toasts, placed at top-right
 */
export const ToastContainer = ({ toasts, onClose }) => {
  return (
    <>
      <style>{`
        @keyframes toastProgress {
          from { transform: scaleX(1); transform-origin: left; }
          to   { transform: scaleX(0); transform-origin: left; }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none',
      }}>
        {toasts.map(t => (
          <div key={t.id} style={{ pointerEvents: 'auto', position: 'relative' }}>
            <ToastItem id={t.id} type={t.type} message={t.message} onClose={onClose} />
          </div>
        ))}
      </div>
    </>
  );
};

/**
 * useToast hook — call in any component
 *
 * const { toasts, showToast, closeToast } = useToast();
 * showToast('success', 'Saved successfully!');
 * showToast('error', 'An error occurred.');
 */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const closeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, showToast, closeToast };
};

export default ToastContainer;
