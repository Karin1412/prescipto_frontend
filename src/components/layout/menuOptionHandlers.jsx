// menuOptionHandlers.jsx

import { useNavigate } from 'react-router-dom';

const useMenuOptionHandler = (setActiveOption) => {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if (option === 'logout') {
      alert('Bạn đã đăng xuất!');
    } else {
      setActiveOption(option); // Cập nhật option hiện tại

      // Chuyển hướng đến trang tương ứng với option
      switch (option) {
        case 'report':
          navigate('/report');
          break;
        case 'appointments':
          navigate('/appointments');
          break;
        case 'medicines':
          navigate('/medicines');
          break;
        case 'warehouse':
          navigate('/warehouse');
          break;
        case 'invoices':
          navigate('/doctor/invoice');
          break;
        case 'suppliers':
          navigate('/doctor/suppliers');
          break;
        case 'users':
          navigate('/users');
          break;
        default:
          break;
      }
    }
  };

  return { handleOptionClick };
};

export default useMenuOptionHandler;
