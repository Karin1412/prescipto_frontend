import React from 'react'
import "../styles/global.css";
import "../styles/Contact_page.css";
import WhiteWithBlackBorderBtn from './layout/WhiteWithBlackBorderBtn';
import "../styles/WhiteWithBlackBorderBtn.css"

const Contact_Page = () => {
  return (
    <div className='Contact_Page'>
        <div className='main-title'>Liên hệ với chúng tôi</div>
        <div className='img_and_contact'>
            <img className='contact_image' src="contact_image.png"></img>
            <div>
                <div className='title'>Văn Phòng</div>
                <div className="multiline-text">
                    54709 Willms Station <br/>
                    Suite 350, Washington, USA
                </div>
                <div className="multiline-text">
                    Tel: (415) 555‑0132 <br/>
                    Email: greatstackdev@gmail.com
                </div>

                <div className='title'>việc làm tại bệnh viện</div>
                <div className="multiline-text">
                    Tìm hiểu thêm về đội ngũ của chúng tôi và cơ hội việc làm.
                </div>

                <WhiteWithBlackBorderBtn 
                text="Khám phá việc làm"
                variant="primary" />
            </div>
        </div>
    </div>
  )
}

export default Contact_Page