import React from 'react';

const ArchiveButton = ({ onPressButton }) => (
  <div onClick={onPressButton} className="menu_icon">
    <img alt="" src="assets/archive_icon-01.png" className="icon" />
    <span className="menu_bold"> ARCHIVE </span>
  </div>

);

export default ArchiveButton;
