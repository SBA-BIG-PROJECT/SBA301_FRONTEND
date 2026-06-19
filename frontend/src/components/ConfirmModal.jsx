import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', confirmColor = 'bg-[#E50914]' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl w-full max-w-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden font-['Inter']">
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-[#94A3B8] text-sm">{message}</p>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#334155] bg-[#0F172A]">
          <button 
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-[#334155] text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-all text-sm font-medium"
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white hover:brightness-110 active:brightness-90 transition-all font-medium text-sm flex items-center gap-1 shadow-lg ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
