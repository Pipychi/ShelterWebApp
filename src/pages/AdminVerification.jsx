import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SuccessModal from '../components/SuccessModal';
import ImageLightbox from '../components/ImageLightbox';
import { LogoutIcon } from '../components/Icons';

const MOCK_SHELTERS = [
  { id: 1, name: 'Приют Надежда', documentUrl: 'https://placehold.co/800x600/E6E1D8/5C4A3D?text=Документ+Приюта+1' },
  { id: 2, name: 'Приют Верный Друг', documentUrl: 'https://placehold.co/800x600/E6E1D8/5C4A3D?text=Документ+Приюта+2' },
  { id: 3, name: 'Кошкин Дом', documentUrl: 'https://placehold.co/800x600/E6E1D8/5C4A3D?text=Документ+Приюта+3' },
  { id: 4, name: 'Хвостики', documentUrl: 'https://placehold.co/800x600/E6E1D8/5C4A3D?text=Документ+Приюта+4' }
];

function AdminVerification() {
  const [shelters, setShelters] = useState(MOCK_SHELTERS);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAction = (id, action) => {
    if (action === 'approve') {
      setModalTitle("Приют верифицирован");
      setModalMessage("Документы успешно проверены, статус приюта обновлен.");
    } else {
      setModalTitle("Отклонено");
      setModalMessage("Документы отклонены, приюту отправлено уведомление.");
    }
    
    setShelters(prev => prev.filter(s => s.id !== id));
    setShowModal(true);
  };

  return (
    <>
      <header className="relative z-10 px-4 sm:px-8 py-4 sm:py-6 max-w-[1400px] w-full mx-auto flex items-center justify-between">
        <Link to="/" className="inline-block cursor-pointer transition-transform duration-300 hover:scale-105 transform-gpu">
          <img 
            src="/logo.png" 
            alt="Логотип" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
          />
        </Link>
        <button
          onClick={() => { logout(); navigate('/'); }}
          aria-label="Выйти из аккаунта"
          className="bg-[#D1B89B] hover:bg-[#c4725a] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] hover:text-white rounded-full shadow-sm flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]"
          title="Выход"
        >
          <LogoutIcon />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 sm:px-8 w-full max-w-[1200px] mx-auto pb-16">
        <h1 className="font-serif text-[#5C4A3D] text-[32px] sm:text-[40px] md:text-[48px] font-bold text-center mb-12">
          Список приютов на верификацию
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 w-full max-w-[1000px]">
          {shelters.map(shelter => (
            <div key={shelter.id} className="flex flex-col items-center">
              {/* Документы приюта */}
              <div 
                className="w-full aspect-[16/9] bg-[#E6E1D8] border-[3px] border-[#8E8981] rounded-md flex items-center justify-center shadow-sm mb-6 transition-transform hover:scale-[1.02] cursor-pointer overflow-hidden group relative"
                onClick={() => setSelectedImage(shelter.documentUrl)}
              >
                <img 
                  src={shelter.documentUrl} 
                  alt={`Документы ${shelter.name}`} 
                  className="w-full h-full object-cover"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  </svg>
                </div>
              </div>
              
              {/* Кнопки */}
              <div className="flex gap-4 sm:gap-8 w-full px-2 sm:px-8">
                <button 
                  onClick={() => handleAction(shelter.id, 'approve')}
                  className="flex-1 bg-[#8BA080] hover:bg-[#758A6A] transition-all text-white font-serif font-bold text-[18px] sm:text-[20px] py-3 rounded-[30px] border-[3px] border-[#7A8C6F] shadow-sm hover:scale-105"
                >
                  Подтвердить
                </button>
                <button 
                  onClick={() => handleAction(shelter.id, 'reject')}
                  className="flex-1 bg-[#8BA080] hover:bg-[#758A6A] transition-all text-white font-serif font-bold text-[18px] sm:text-[20px] py-3 rounded-[30px] border-[3px] border-[#7A8C6F] shadow-sm hover:scale-105"
                >
                  Отклонить
                </button>
              </div>
            </div>
          ))}
          {shelters.length === 0 && (
            <div className="col-span-full text-center text-[#5C4A3D] font-serif text-2xl mt-10 font-bold">
              Нет приютов, ожидающих верификацию.
            </div>
          )}
        </div>
      </main>

      <SuccessModal 
        isOpen={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />

      <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} alt="Документ крупным планом" />
    </>
  );
}

export default AdminVerification;
