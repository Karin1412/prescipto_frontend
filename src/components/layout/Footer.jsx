import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <div className="logo-container">
                    <img src="/Logo.svg" alt="Logo" className="logo-img" />
                    <span className="website-name">Prescripto</span>
                </div>
                <p>
                Prescripto cung cấp dịch vụ chăm sóc sức khỏe chất lượng cao, với đội ngũ bác sĩ chuyên nghiệp và trang thiết bị hiện đại, cam kết mang đến sự an tâm và chăm sóc tận tâm cho bệnh nhân. Prescripto - Nơi sức khỏe khởi nguồn, niềm tin lan tỏa.
                </p>
            </div>
            <div className="footer-section">
                <h4>COMPANY</h4>
                <p><a href="/">Trang chủ</a></p>
                <p><a href="/about">Về chúng tôi</a></p>
                <p><a href="/contact">Liên lạc</a></p>
            </div>
            <div className="footer-section">
                <h4>Liên lạc</h4>
                <p>+1-212-456-7890</p>
                <p>info@gmail.com</p>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-copyright">
                Nhóm 26 - SE100.P13
            </div>
        </footer>
    );
};

export default Footer;
