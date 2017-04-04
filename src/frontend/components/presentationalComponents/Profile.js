import React from 'react';

const Profile = ({ onPressButton }) => (
  <div onClick={onPressButton} className="menu_container" style={{ position: 'relative', paddingLeft: '4vw' }}>
    <div className="menu_icon" style={{ paddingTop: '0m', paddingBottom: '15vh' }}>
      <img alt="" className="profile" src="./assets/profile-01.png" />
    </div>
  </div>
);

export default Profile;
