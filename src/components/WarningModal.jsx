import React, { useEffect } from 'react';

export default function WarningModal({ isOpen, title = "Внимание!", message, onClose, buttonText = "ОК" }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="bg-[#FFFDF9] border-[3px] border-[#8BA080] rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
        <h3 className="font-serif text-[#5C4A3D] text-2xl font-bold mb-3 text-center">
          {title}
        </h3>
        <p className="text-[#5C4A3D] text-center mb-6 font-medium">
          {message}
        </p>
        <div className="flex justify-center">
          <button 
            onClick={onClose}
            className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-bold px-8 py-2 rounded-full shadow-sm"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
