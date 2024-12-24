import React from 'react';
import '../../styles/MenuOptions.css';

const MenuOptions = ({ options, activeOption, onOptionClick }) => {
  return (
    <div className="menu-options">
      {options.map((option) => (
        <button
          key={option.value}
          className={`menu-button ${
            activeOption === option.value ? 'active' : ''
          } ${option.logout ? 'logout' : ''}`}
          onClick={() => onOptionClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default MenuOptions;
