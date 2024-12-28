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
          navigate('/admin/report');
          break;
        case 'appointments':
          navigate('/admin/appointments');
          break;
        case 'medicines':
          navigate('/admin/medicines');
          break;
        case 'warehouse':
          navigate('/admin/warehouse');
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
        default:
          break;
      }
    }
  };

  return { handleOptionClick };
};

export default useMenuOptionHandler;
