import React from "react";
import PropTypes from "prop-types";

const WhiteWithBlackBorderBtn = ({
  text = "Button",         // Nội dung hiển thị của button
  onClick = () => {},      // Hành động khi nhấn
  style = {},              // Kiểu dáng tùy chỉnh
  className = "",          // Lớp CSS tùy chọn
  disabled = false,        // Trạng thái tắt
  variant = "primary",     // Loại button (primary, secondary, ...)
}) => {
  return (
    <button
      onClick={onClick}
      className={`button ${variant} ${className}`}
      style={style}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

// Định nghĩa các kiểu props để dễ bảo trì và debug
WhiteWithBlackBorderBtn.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
};

export default WhiteWithBlackBorderBtn;
