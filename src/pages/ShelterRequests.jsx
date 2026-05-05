import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProfileIcon, LogoutIcon } from '../components/Icons';

const MOCK_SHELTER_REQUESTS = [
  {
    title: 'Корм для собак',
    status: 'В работе',
    volunteer: 'Иван Иванов',
    stage: 'На проверке'
  },
  {
    title: 'Медикаменты',
    status: 'Открыта',
    volunteer: '—',
    stage: 'Открыта'
  },
  {
    title: 'Хозтовары',
    status: 'Выполнена',
    volunteer: 'Мария Петрова',
    stage: 'Выполнена'
  },
  {
    title: 'Транспорт',
    status: 'В работе',
    volunteer: 'Алексей Сидоров',
    stage: 'На проверке'
  }
];

function ShelterRequests() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileLink = user?.role === 'shelter' ? '/shelter-profile' : '/profile';

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
        
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
          <Link to="/verify-report" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-serif font-bold px-4 py-2 sm:px-8 sm:py-3 rounded-[30px] shadow-sm text-sm sm:text-[20px] leading-tight text-center flex items-center justify-center h-[50px] sm:h-[60px]">
            Проверка<br />фотоотчёта
          </Link>
          <Link to="/create-request" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-serif font-bold px-4 py-2 sm:px-6 sm:py-2 rounded-[30px] shadow-sm text-sm sm:text-base leading-tight text-center flex items-center justify-center h-[50px] sm:h-[60px]">
            Создание/<br />редактирование заявки
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
          Мои заявки
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full max-w-[1000px]">
          {MOCK_SHELTER_REQUESTS.map((request, index) => (
            <div key={index} className="flex flex-col gap-3 group">
              <div className="bg-[#E6E1D8] border-[4px] border-[#8E8981] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-[4px_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:-translate-y-1">
                <div className="font-serif text-[#5C4A3D] text-[18px] sm:text-[22px] font-bold space-y-1">
                  <p>{request.title}</p>
                  <p>{request.status}</p>
                  <p>Кто взял ({request.volunteer})</p>
                  <p>{request.stage}</p>
                </div>
              </div>
              
              {request.stage === 'На проверке' && (
                <Link 
                  to="/verify-report"
                  className="bg-[#758A6A] hover:bg-[#5f7454] hover:scale-[1.02] transition-all duration-300 transform-gpu backface-hidden will-change-transform text-white text-[18px] sm:text-[20px] font-serif py-2 rounded-full shadow-md text-center font-bold"
                >
                  Проверить отчёт
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default ShelterRequests;
