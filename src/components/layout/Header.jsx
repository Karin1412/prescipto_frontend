import React, { useState, useEffect } from "react";
import "../../styles/Header.css";
import LargeRoundedCornerButton from './LargeRoundedCornerButton';
import '../../styles/LargeRoundedCornerButton.css';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userInfo));  
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <header className="header">
            {/* Logo và Tên web */}
            <div className="logo" onClick={() => window.location.href = "/"}> 
                <img src="/Logo.svg" alt="Logo" className="logo-img" />
                <span className="website-name">Prescripto</span>
            </div>

            {/* Navigation chính giữa */}
            <nav className="nav">
                <a href="/" className="nav-link">Trang Chủ</a>
                <a href="/all-doctors" className="nav-link">Danh sách bác sĩ</a>
                <a href="/about" className="nav-link">Về chúng tôi</a>
                <a href="/contact" className="nav-link">Liên hệ</a>
            </nav>

            {/* Đăng nhập hoặc Combobox và Avatar */}
            <div className="col-6 col-md-2 mt-4 mt-md-0 text-center text-md-end">          
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
                                <img alt="User Avatar" className="rounded-circle"></img>
                            </figure>
                            <span className="username">{user?.name}</span>
                        </button>
                        <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
                            <a className="dropdown-item" href="/me/my-appointments"> Lịch khám </a>
                            <a className="dropdown-item" href="/me/medical-records"> Hồ sơ bệnh án </a>   
                            <a className="dropdown-item text-danger" href="/" onClick={handleLogout}> Đăng xuất </a>  
                        </div>
                    </div>
                ) : (
                    <LargeRoundedCornerButton 
                        className="large-rounded-corner-button"
                        text='Đăng nhập'
                        variant='primary'
                        onClick={() => window.location.href = '/login'}  // Dẫn đến trang đăng nhập
                    />
                )}
            </div>
        </header>
    );
}

export default Header;
