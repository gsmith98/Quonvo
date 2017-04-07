import React from 'react';

const Profile = ({ onPressButton }) => (
  <div onClick={onPressButton} className="menu_container">
    <div className="menu_icon" style={{ paddingBottom: '12vh' }}>
      <img alt="" className="profile" src="assets/profile-01.png" />
    </div>
  </div>
);

export default Profile;
