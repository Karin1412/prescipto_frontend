import React, { useState } from "react";
import "../../styles/Header.css";
import "../../styles/global.css";

function Header() {
    // Trạng thái xác định đã đăng nhập hay chưa
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <header className="header">
            {/* Logo và Tên web */}
            <div className="logo" onClick={() => window.location.href = "/"}>
                <img src="Logo.svg" alt="Logo" className="logo-img" />
                <span className="website-name">Prescripto</span>
            </div>

            {/* Navigation chính giữa */}
            <nav className="nav">
                <a href="/home" className="nav-link">Trang Chủ</a>
                <a href="/all-doctors" className="nav-link">Danh sách bác sĩ</a>
                <a href="/about" className="nav-link">Về chúng tôi</a>
                <a href="/contact" className="nav-link">Liên hệ</a>
            </nav>

            {/* Đăng nhập hoặc Combobox và Avatar*/}
            <div className="col-6 col-md-2 mt-4 mt-md-0 text-center text-md-end">          
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

                <a className="dropdown-item" href="/me/my-appointment"> Lịch khám{" "} </a>
                <a className="dropdown-item" href="/me/medical-records"> Hồ sơ bệnh án{" "} </a>   
                <a className="dropdown-item text-danger" href="/" onClick={() => setIsLoggedIn(false)}> Đăng xuất{" "} </a>  
              </div>
            </div>
          ): (
            // Nếu không phải loading status, chỉ hiện nút đăng nhập
            !isLoggedIn && (
              //<Link to="/login" className="btn ms-4" id="login_btn"> Đăng nhập </Link>
                <button className="blue-large-round-btn" onClick={() => setIsLoggedIn(true)}>Đăng nhập</button>          
              )
          )}  
        </div>
        </header>
    );
}

export default Header;
