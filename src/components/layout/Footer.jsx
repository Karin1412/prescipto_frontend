import React from 'react';
import '../styles/Footer.css';
import logo from '../../assets/logo_image.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <div className="logo-container">
                    <img src={logo} alt="Prescripto Logo" className="logo" />
                    <span className="app-name">Prescripto</span>
                </div>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <div className="footer-section">
                <h4>COMPANY</h4>
                <p><a href="#">Trang chủ</a></p>
                <p><a href="./about">Về chúng tôi</a></p>
                <p><a href="#">Liên lạc</a></p>
                <p><a href="#">Chính sách bảo mật</a></p>
            </div>
            <div className="footer-section">
                <h4>Liên lạc</h4>
                <p>+1-212-456-7890</p>
                <p>greatstackdev@gmail.com</p>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-copyright">
                Copyright © 2024 GreatStack - All Right Reserved.
            </div>
        </footer>
    );
};

export default Footer;
