// menuOptionHandlers.jsx

import { useNavigate } from 'react-router-dom';

const useMenuOptionHandler = (setActiveOption) => {

  const navigate = useNavigate();
  const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      
    };

  const handleOptionClick = (option) => {
    if (option === 'logout') {
      handleLogout();
      navigate('/');
    } else {
      setActiveOption(option); // Cập nhật option hiện tại

      // Chuyển hướng đến trang tương ứng với option
      switch (option) {
        case 'report':
          navigate('/admin/report');
          break;
        case 'appointments':
          navigate('/admin/appointments');
          break;
        case 'drugs':
          navigate('/admin/drugs');
          break;
        case 'goods-receipt-notes':
          navigate('/admin/goods-receipt-notes');
          break;
        case 'invoices':
          navigate('/admin/invoice');
          break;
        case 'suppliers':
          navigate('/admin/suppliers');
          break;
        case 'users':
          navigate('/admin/user');
          break;
         case 'doctors':
          navigate('/admin/doctor');
          break;
        default:
          break;
      }
    }
  };

  return { handleOptionClick };
};

export default useMenuOptionHandler;
