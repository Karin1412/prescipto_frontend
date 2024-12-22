import React from 'react'
import "../../styles/ContactPage.css";
import "../../styles/SharpCornerBlackBorderBtn.css"

const ContactPage = () => {
  return (
    <div className='contact-page'>
        <div className='contact-page-main-title'>Liên hệ với chúng tôi</div>
        <div className='img-and-contact'>
            <img className='contact-image' src="/contact_image.png"></img>
            <div>
                <div className='contact-page-title'>Văn Phòng</div>
                <div className="multiline-text">
                    54709 Willms Station <br/>
                    Suite 350, Washington, USA
                </div>
                <div className="multiline-text">
                    Tel: (415) 555‑0132 <br/>
                    Email: info@gmail.com
                </div>

                <div className='contact-page-title'>việc làm tại bệnh viện</div>
                <div className="multiline-text">
                    Tìm hiểu thêm về đội ngũ của chúng tôi và cơ hội việc làm.
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactPage