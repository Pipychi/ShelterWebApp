import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SuccessModal({ 
  isOpen, 
  title, 
  message, 
  onClose, 
  buttonText = "ОК",
  buttonLink = null
}) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="bg-[#FFFDF9] border-[3px] border-[#758A6A] rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-center mb-4 text-[#758A6A]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-serif text-[#5C4A3D] text-2xl font-bold mb-3 text-center">{title}</h3>
        <p className="text-[#5C4A3D] text-center mb-6 font-medium">{message}</p>
        <div className="flex justify-center">
          {buttonLink ? (
            <Link 
              to={buttonLink}
              className="bg-[#758A6A] hover:bg-[#5f7454] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-white font-bold px-8 py-2 rounded-full shadow-sm"
            >
              {buttonText}
            </Link>
          ) : (
            <button 
              onClick={onClose} 
              className="bg-[#758A6A] hover:bg-[#5f7454] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-white font-bold px-8 py-2 rounded-full shadow-sm"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
