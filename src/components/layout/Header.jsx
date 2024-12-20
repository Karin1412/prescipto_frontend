import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import "../../styles/Header.css";
import LargeRoundedCornerButton from './LargeRoundedCornerButton';
import '../../styles/LargeRoundedCornerButton.css';

function Header() {
    // Trạng thái xác định đã đăng nhập hay chưa
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="header">
            {/* Logo và Tên web */}
            <div className="logo" onClick={() => window.location.href = "/"}>
                <img src="/Logo.svg" alt="Logo" className="logo-img" />
                <span className="website-name">Prescripto</span>
            </div>

            {/* Navigation chính giữa */}
            <nav className="nav">
                <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>Trang Chủ</Link>
                <Link to="/all-doctors" className={`nav-item ${isActive('/all-doctors') ? 'active' : ''}`}>Danh sách bác sĩ</Link>
                <Link to="/about" className={`nav-item ${isActive('/about') ? 'active' : ''}`}>Về chúng tôi</Link>
                <Link to="/contact" className={`nav-item ${isActive('/contact') ? 'active' : ''}`}>Liên hệ</Link>
            </nav>

            {/* Đăng nhập hoặc Combobox và Avatar*/}
            <div className="user-login-or-avatar">          
          {/*{user ? ( */}
          {isLoggedIn ? (
            <div className="ms-4 dropdown">
              <button
                className="btn dropdown-toggle text-white custom-dropdown-toggle"
                type="button"
                id="dropDownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  {/*<img
                    src={user?.avatar ? user?.avatar?.url
                      : "/images/default_avatar.jpg"}
                    alt="User Avatar"
                    className="rounded-circle"
                  />*/}
                  <img alt="User Avatar"
                    className="rounded-circle"></img>
                </figure>
                <span className="username">Name</span>
                {/* Lấy tên (từ khoản trắng cuối cùng) */}
                {/*<span className="username">{user?.name.split(' ').pop()}</span>*/}
              </button>
              <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
                {/*{user?.role === "admin" && (
                  <Link className="dropdown-item" to="/admin/dashboard"> Admin Dashboard{" "} </Link>
                )}
                
                {user?.role === "patient" && (
                <Link className="dropdown-item" to="/me/orders"> Lịch khám{" "} </Link>
                )}

                {user?.role === "patient" && (
                <Link className="dropdown-item" to="/me/profile"> Hồ sơ bệnh án{" "} </Link>              
                )}

                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}> Đăng xuất{" "} </Link>
                */}

                <a className="dropdown-item" href="/me/my-appointments"> Lịch khám{" "} </a>
                <a className="dropdown-item" href="/me/medical-records"> Hồ sơ bệnh án{" "} </a>   
                <a className="dropdown-item text-danger" href="/" onClick={() => setIsLoggedIn(false)}> Đăng xuất{" "} </a>  
              </div>
            </div>
          ): (
            // Nếu không phải loading status, chỉ hiện nút đăng nhập
            !isLoggedIn && (
              //<Link to="/login" className="btn ms-4" id="login_btn"> Đăng nhập </Link>
                <LargeRoundedCornerButton className="large-rounded-corner-button"
                                    text='Đăng nhập'
                                    variant='primary'
                                    onClick={() => setIsLoggedIn(true)}/>        
              )
          )}  
        </div>
        </header>
    );
}

export default Header;
