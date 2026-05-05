import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <header className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 py-6 max-w-[1400px] w-full mx-auto">
        <Link to="/" className="flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105 transform-gpu mb-4 lg:mb-0">
          <img 
            src="/logo.png" 
            alt="Логотип" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
          />
        </Link>
        
        <nav className="flex gap-2 sm:gap-4 lg:ml-8 flex-wrap justify-center w-full lg:w-auto">
          <Link to="/login-volunteer" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 hover:shadow-md transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-medium px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full shadow-sm text-xs sm:text-sm inline-flex items-center justify-center">
            Я волонтер
          </Link>
          <Link to="/register-volunteer" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 hover:shadow-md transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-medium px-4 py-2 md:px-6 lg:px-8 rounded-full shadow-sm text-xs sm:text-sm leading-tight text-center inline-flex items-center justify-center">
            Хочу стать<br />волонтером
          </Link>
          <Link to="/login-shelter" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 hover:shadow-md transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-medium px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full shadow-sm text-xs sm:text-sm inline-flex items-center justify-center">
            Я приют
          </Link>
          <Link to="/register-shelter" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 hover:shadow-md transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-medium px-4 py-2 md:px-6 lg:px-8 rounded-full shadow-sm text-xs sm:text-sm leading-tight text-center inline-flex items-center justify-center">
            Регистрация<br />приюта
          </Link>
          <Link to="/login-admin" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 hover:shadow-md transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-medium px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full shadow-sm text-xs sm:text-sm inline-flex items-center justify-center">
            Админ
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 text-center mt-8 lg:mt-[-80px] pb-12">
        <h1 className="font-serif text-[#5C4A3D] text-[24px] sm:text-[32px] md:text-[36px] lg:text-[42px] leading-[1.2] mb-8 sm:mb-12 max-w-3xl">
          Больше не надо мониторить 40 чатов.<br className="hidden sm:block" />
          Все реальные нужды приютов — здесь.<br className="hidden sm:block" />
          Выбери и помоги!
        </h1>
        
        <Link to="/requests" className="bg-[#758A6A] hover:bg-[#5f7454] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform border-[4px] md:border-[6px] border-[#8BA080] text-white font-serif text-[18px] sm:text-[22px] lg:text-[26px] px-8 sm:px-10 lg:px-14 py-3 sm:py-4 rounded-[40px] lg:rounded-[50px] leading-tight shadow-md hover:shadow-lg inline-block">
          Перейти<br />к заявкам
        </Link>
      </main>
    </>
  );
}

export default Home;
