import React from 'react';
import './styles/AboutPage.css';
import aboutImage from '../assets/about_image.png';

const AboutPage = () => {
  return (
    <div className="about-page">
        <h1 className="about-title">VỀ CHÚNG TÔI</h1>
        <div className="about-content">
            <div className="about-image">
                <img src={aboutImage} alt="Doctors" className="image" />
            </div>
            <div className="about-text">
                    
                <p>
                Chào mừng bạn đến với Prescripto, đối tác đáng tin cậy của bạn trong việc quản lý nhu cầu chăm sóc sức khỏe một cách thuận tiện và hiệu quả. Tại Prescripto, chúng tôi hiểu rõ những thách thức mà mọi người gặp phải khi đặt lịch hẹn với bác sĩ và quản lý hồ sơ sức khỏe của mình.
                </p>
                <p>
                Prescripto cam kết mang đến sự xuất sắc trong công nghệ chăm sóc sức khỏe. Chúng tôi không ngừng nỗ lực cải tiến nền tảng của mình, tích hợp những tiến bộ mới nhất để nâng cao trải nghiệm người dùng và cung cấp dịch vụ vượt trội. Dù bạn đang đặt lịch hẹn đầu tiên hay quản lý chăm sóc sức khỏe dài hạn, Prescripto luôn đồng hành cùng bạn trên từng bước đường.
                </p>
                <h2>TẦM NHÌN</h2>
                <p>
                Tầm nhìn của chúng tôi tại Prescripto là tạo ra một trải nghiệm chăm sóc sức khỏe liền mạch cho mọi người dùng. Chúng tôi hướng tới việc thu hẹp khoảng cách giữa bệnh nhân và nhà cung cấp dịch vụ y tế, giúp bạn dễ dàng tiếp cận dịch vụ chăm sóc sức khỏe mà bạn cần, vào thời điểm bạn cần.
                </p>
            </div>
        </div>
        <section className="reasons-section">
            <h2>LÝ DO CHỌN CHÚNG TÔI</h2>
            <div className="reason-boxes">
                <div className="reason-box">
                    <h3>HIỆU QUẢ</h3>
                    <p>Lên lịch cuộc hẹn hợp lý phù hợp với lối sống bận rộn của bạn.</p>
                </div>
                <div className="reason-box">
                    <h3>TIỆN LỢI</h3>
                    <p>Truy cập vào mạng lưới các chuyên gia chăm sóc sức khỏe đáng tin cậy trong khu vực của bạn.</p>
                </div>
                <div className="reason-box">
                    <h3>CÁ NHÂN HÓA</h3>
                    <p>Các đề xuất và lời nhắc phù hợp để giúp bạn luôn cập nhật về sức khỏe của mình.</p>
                </div>
            </div>
        </section>
        </div>
    );
};

export default AboutPage;
