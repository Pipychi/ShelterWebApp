import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WarningModal from '../components/WarningModal';
import SuccessModal from '../components/SuccessModal';
import { ProfileIcon, LogoutIcon } from '../components/Icons';

const MOCK_REQUESTS = [
  {
    id: 1,
    shelterName: 'Приют "Верный друг"',
    category: 'Корм',
    description: 'Нужно 15 кг сухого корма для взрослых собак средних пород.',
    deadline: 'До 15.05.2026',
    status: 'Открыта'
  },
  {
    id: 2,
    shelterName: 'Кошкин дом',
    category: 'Медикаменты',
    description: 'Срочно требуются капли от блох и клещей, 10 упаковок.',
    deadline: 'До 10.05.2026',
    status: 'Открыта'
  },
  {
    id: 3,
    shelterName: 'Доброе сердце',
    category: 'Хозтовары',
    description: 'Впитывающие пеленки 60x90, влажные салфетки.',
    deadline: 'До 18.05.2026',
    status: 'Открыта'
  },
  {
    id: 4,
    shelterName: 'Приют "Верный друг"',
    category: 'Транспорт',
    description: 'Помощь с перевозкой 3 собак в ветеринарную клинику на осмотр.',
    deadline: '12.05.2026 (утро)',
    status: 'Открыта'
  }
];

function VolunteerDashboard() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { isLoggedIn, takeRequest, user, logout } = useAuth();
  const navigate = useNavigate();

  const profileLink = user?.role === 'shelter' ? '/shelter-profile' : '/profile';

  const handleHelpClick = (request) => {
    if (!isLoggedIn) {
      setShowAuthWarning(true);
      return;
    }
    takeRequest(request);

    setSuccessMessage(`Вы выбрали заявку #${request.id}! Спасибо за помощь!`);
    setShowSuccess(true);
  };

  return (
    <>
      <header className="relative z-10 px-4 sm:px-8 py-4 sm:py-6 max-w-[1400px] w-full mx-auto flex flex-col sm:flex-row items-center justify-between">
        <Link to="/" className="inline-block cursor-pointer transition-transform duration-300 hover:scale-105 transform-gpu mb-4 sm:mb-0">
          <img
            src="/logo.png"
            alt="Логотип"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/report" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-serif font-bold px-4 py-2 sm:px-6 sm:py-2 rounded-[30px] shadow-sm text-sm sm:text-base leading-tight text-center flex items-center justify-center h-[50px] sm:h-[60px]">
            Загрузка<br />фотоотчёта
          </Link>

          <Link to={profileLink} className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform rounded-full shadow-sm flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
            <ProfileIcon role={user?.role} />
          </Link>
          <button
            onClick={() => { logout(); navigate('/'); }}
            aria-label="Выйти из аккаунта"
            className="bg-[#D1B89B] hover:bg-[#c4725a] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] hover:text-white rounded-full shadow-sm flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]"
            title="Выход"
          >
            <LogoutIcon />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 sm:px-8 pb-16 w-full max-w-[1200px] mx-auto mt-4 sm:mt-0">
        <h1 className="font-serif text-[#5C4A3D] text-[28px] sm:text-[36px] md:text-[42px] leading-[1.2] mb-10 sm:mb-12 text-center font-bold">
          Что нужно прямо сейчас
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full max-w-[900px]">
          {requests.map((request) => (
            <div key={request.id} className="flex flex-col gap-3 group">
              <div className="bg-[#E6E1D8] border-[4px] border-[#8E8981] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-[4px_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:-translate-y-1">
                <p className="font-serif text-[#5C4A3D] text-[18px] sm:text-[20px] font-bold mb-1">
                  {request.shelterName}
                </p>
                <p className="font-serif text-[#5C4A3D] text-[18px] sm:text-[20px] font-bold mb-1">
                  {request.category}
                </p>
                <p className="font-serif text-[#5C4A3D] text-[18px] sm:text-[20px] font-bold mb-1">
                  {request.description}
                </p>
                <p className="font-serif text-[#5C4A3D] text-[18px] sm:text-[20px] font-bold mb-1">
                  {request.deadline}
                </p>
                <p className="font-serif text-[#5C4A3D] text-[18px] sm:text-[20px] font-bold">
                  Статус: "{request.status}"
                </p>
              </div>

              <button
                onClick={() => handleHelpClick(request)}
                className="bg-[#758A6A] hover:bg-[#5f7454] hover:scale-[1.02] transition-all duration-300 transform-gpu backface-hidden will-change-transform text-white text-[20px] sm:text-[24px] font-serif py-3 rounded-full shadow-md hover:shadow-lg w-full"
              >
                Хочу помочь
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Auth Warning Modal — custom since it has navigation buttons */}
      {showAuthWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-[#FFFDF9] border-[3px] border-[#8BA080] rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-serif text-[#5C4A3D] text-2xl font-bold mb-3 text-center">
              Внимание!
            </h3>
            <p className="text-[#5C4A3D] text-center mb-8 font-medium">
              Для выполнения заявки необходимо войти в аккаунт или зарегистрироваться.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/login-volunteer')}
                className="bg-[#758A6A] hover:bg-[#5f7454] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-white font-bold px-8 py-3 rounded-full shadow-sm w-full text-center"
              >
                Войти
              </button>
              <button
                onClick={() => navigate('/register-volunteer')}
                className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-bold px-8 py-3 rounded-full shadow-sm w-full text-center"
              >
                Зарегистрироваться
              </button>
              <button
                onClick={() => setShowAuthWarning(false)}
                className="mt-2 text-[#8E8981] hover:text-[#5C4A3D] underline transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      <SuccessModal
        isOpen={showSuccess}
        title="Успешно!"
        message={successMessage}
        onClose={() => setShowSuccess(false)}
        buttonText="Отлично"
      />
    </>
  );
}

export default VolunteerDashboard;
