import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SuccessModal from '../components/SuccessModal';
import { ProfileIcon, LogoutIcon } from '../components/Icons';

const MOCK_EXISTING_REQUESTS = [
  {
    id: 'req_1',
    category: 'Корм',
    title: 'Корм для собак',
    deadline: 'До 15.05.2026',
    description: 'Нужно 15 кг сухого корма для взрослых собак средних пород.'
  },
  {
    id: 'req_2',
    category: 'Медикаменты',
    title: 'Лекарства для кошек',
    deadline: 'До 10.05.2026',
    description: 'Срочно требуются капли от блох и клещей, 10 упаковок.'
  },
  {
    id: 'req_3',
    category: 'Транспорт',
    title: 'Перевозка собак',
    deadline: '12.05.2026',
    description: 'Помощь с перевозкой 3 собак в ветеринарную клинику.'
  }
];

function CreateEditRequest() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);

  const [createData, setCreateData] = useState({
    category: '',
    title: '',
    deadline: '',
    description: ''
  });

  const [editData, setEditData] = useState({
    id: '',
    category: '',
    title: '',
    deadline: '',
    description: ''
  });

  const handleSelectRequest = (e) => {
    const requestId = e.target.value;
    if (!requestId) {
      setEditData({ id: '', category: '', title: '', deadline: '', description: '' });
      return;
    }
    const selected = MOCK_EXISTING_REQUESTS.find(r => r.id === requestId);
    if (selected) {
      setEditData(selected);
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setShowCreateSuccess(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowEditSuccess(true);
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
        
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
          <Link to="/verify-report" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-serif font-bold px-4 py-2 sm:px-8 sm:py-3 rounded-[30px] shadow-sm text-sm sm:text-[20px] leading-tight text-center flex items-center justify-center h-[50px] sm:h-[60px]">
            Проверка<br />фотоотчёта
          </Link>
          <Link to="/shelter-requests" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform text-[#5C4A3D] font-serif font-bold px-4 py-2 sm:px-8 sm:py-3 rounded-[30px] shadow-sm text-sm sm:text-[20px] leading-tight text-center flex items-center justify-center h-[50px] sm:h-[60px]">
            Мои заявки
          </Link>
          <Link to="/shelter-profile" className="bg-[#D1B89B] hover:bg-[#bca07e] hover:scale-105 transition-all duration-300 transform-gpu backface-hidden will-change-transform rounded-full shadow-sm flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
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

      <main className="flex-1 flex flex-col items-center px-4 sm:px-8 pb-16 w-full max-w-[800px] mx-auto mt-4 sm:mt-0">
        {/* Create Section */}
        <section className="w-full mb-20">
          <h1 className="font-serif text-[#5C4A3D] text-[28px] sm:text-[36px] md:text-[42px] leading-[1.2] mb-10 text-center font-bold">
            Создание заявки
          </h1>
          
          <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="create-category" className="font-serif text-[#5C4A3D] text-[18px] sm:text-[22px] font-bold ml-1">Категория:</label>
              <input 
                id="create-category"
                type="text" value={createData.category} onChange={(e) => setCreateData({...createData, category: e.target.value})}
                className="bg-[#E6E1D8] border-[3px] border-[#8E8981] rounded-md h-[46px] shadow-[4px_4px_10px_rgba(0,0,0,0.15)] px-4 text-[#5C4A3D] font-medium w-full focus:outline-none focus:ring-2 focus:ring-[#758A6A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="create-title" className="font-serif text-[#5C4A3D] text-[18px] sm:text-[22px] font-bold ml-1">Заголовок:</label>
              <input 
                id="create-title"
                type="text" value={createData.title} onChange={(e) => setCreateData({...createData, title: e.target.value})}
                className="bg-[#E6E1D8] border-[3px] border-[#8E8981] rounded-md h-[46px] shadow-[4px_4px_10px_rgba(0,0,0,0.15)] px-4 text-[#5C4A3D] font-medium w-full focus:outline-none focus:ring-2 focus:ring-[#758A6A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="create-deadline" className="font-serif text-[#5C4A3D] text-[18px] sm:text-[22px] font-bold ml-1">Срок актуальности:</label>
              <input 
                id="create-deadline"
                type="text" value={createData.deadline} onChange={(e) => setCreateData({...createData, deadline: e.target.value})}
                className="bg-[#E6E1D8] border-[3px] border-[#8E8981] rounded-md h-[46px] shadow-[4px_4px_10px_rgba(0,0,0,0.15)] px-4 text-[#5C4A3D] font-medium w-full focus:outline-none focus:ring-2 focus:ring-[#758A6A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="create-description" className="font-serif text-[#5C4A3D] text-[18px] sm:text-[22px] font-bold ml-1">Описание:</label>
              <textarea 
                id="create-description"
                rows="6" value={createData.description} onChange={(e) => setCreateData({...createData, description: e.target.value})}
                className="bg-[#E6E1D8] border-[3px] border-[#8E8981] rounded-md shadow-[4px_4px_10px_rgba(0,0,0,0.15)] p-4 text-[#5C4A3D] font-medium w-full focus:outline-none focus:ring-2 focus:ring-[#758A6A] resize-none"
              ></textarea>
            </div>
            
            <div className="flex justify-center mt-6">
              <button type="submit" className="bg-[#758A6A] hover:bg-[#5f7454] hover:scale-105 transition-all text-white text-[20px] sm:text-[24px] px-12 py-3 rounded-[40px] shadow-md font-serif w-full sm:w-auto">
                Опубликовать
              </button>
            </div>
          </form>
        </section>

        {/* Edit Section */}
        <section className="w-full">
          <h2 className="font-serif text-[#5C4A3D] text-[28px] sm:text-[36px] md:text-[42px] leading-[1.2] mb-10 text-center font-bold">
            Редактирование заявки
          </h2>
          
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="edit-select" className="font-serif text-[#5C4A3D] text-[18px] sm:text-[22px] font-bold ml-1">Выберите заявку:</label>
              <select 
                id="edit-select"
                value={editData.id} 
                onChange={handleSelectRequest}
                className="bg-[#E6E1D8] border-[3px] border-[#8E8981] rounded-md h-[46px] shadow-[4px_4px_10px_rgba(0,0,0,0.15)] px-4 text-[#5C4A3D] font-medium w-full focus:outline-none focus:ring-2 focus:ring-[#758A6A] appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%235C4A3D\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
              >
                <option value="">-- Выберите заявку для редактирования --</option>
                {MOCK_EXISTING_REQUESTS.map(req => (
                  <option key={req.id} value={req.id}>{req.title} ({req.category})</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="edit-category" className="font-serif text-[#5C4A3D] text-[18px] sm:text-[22px] font-bold ml-1">Категория:</label>
              <input 
                id="edit-category"
                type="text" value={editData.category} onChange={(e) => setEditData({...editData, category: e.target.value})}
                className="bg-[#E6E1D8] border-[3px] border-[#8E8981] rounded-md h-[46px] shadow-[4px_4px_10px_rgba(0,0,0,0.15)] px-4 text-[#5C4A3D] font-medium w-full focus:outline-none focus:ring-2 focus:ring-[#758A6A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="edit-title" className="font-serif text-[#5C4A3D] text-[18px] sm:text-[22px] font-bold ml-1">Заголовок:</label>
              <input 
                id="edit-title"
                type="text" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})}
                className="bg-[#E6E1D8] border-[3px] border-[#8E8981] rounded-md h-[46px] shadow-[4px_4px_10px_rgba(0,0,0,0.15)] px-4 text-[#5C4A3D] font-medium w-full focus:outline-none focus:ring-2 focus:ring-[#758A6A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="edit-deadline" className="font-serif text-[#5C4A3D] text-[18px] sm:text-[22px] font-bold ml-1">Срок актуальности:</label>
              <input 
                id="edit-deadline"
                type="text" value={editData.deadline} onChange={(e) => setEditData({...editData, deadline: e.target.value})}
                className="bg-[#E6E1D8] border-[3px] border-[#8E8981] rounded-md h-[46px] shadow-[4px_4px_10px_rgba(0,0,0,0.15)] px-4 text-[#5C4A3D] font-medium w-full focus:outline-none focus:ring-2 focus:ring-[#758A6A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="edit-description" className="font-serif text-[#5C4A3D] text-[18px] sm:text-[22px] font-bold ml-1">Описание:</label>
              <textarea 
                id="edit-description"
                rows="6" value={editData.description} onChange={(e) => setEditData({...editData, description: e.target.value})}
                className="bg-[#E6E1D8] border-[3px] border-[#8E8981] rounded-md shadow-[4px_4px_10px_rgba(0,0,0,0.15)] p-4 text-[#5C4A3D] font-medium w-full focus:outline-none focus:ring-2 focus:ring-[#758A6A] resize-none"
              ></textarea>
            </div>
            
            <div className="flex justify-center mt-6">
              <button type="submit" className="bg-[#758A6A] hover:bg-[#5f7454] hover:scale-105 transition-all text-white text-[20px] sm:text-[24px] px-12 py-3 rounded-[40px] shadow-md font-serif w-full sm:w-auto">
                Изменить
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* Success Modals */}
      <SuccessModal 
        isOpen={showCreateSuccess}
        title="Опубликовано!"
        message="Ваша заявка успешно создана и добавлена в общую ленту."
        onClose={() => setShowCreateSuccess(false)}
      />

      <SuccessModal 
        isOpen={showEditSuccess}
        title="Изменено!"
        message="Данные заявки успешно обновлены."
        onClose={() => setShowEditSuccess(false)}
      />
    </>
  );
}

export default CreateEditRequest;
