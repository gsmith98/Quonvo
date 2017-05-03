import React from 'react';

const LoginModal = () => (

  <div className="display_container">
    <div className="header_block" style={{ height: '40%' }}>
      <span className="explanation" style={{ fontSize: '24px', paddingTop: '5%' }}> LOG IN </span>
      <div className="signin_wrapper">
        <input
          className="field"
          placeholder="email"
        />
        <input
          className="field"
          placeholder="password"
        />
        <button className="ask_button"> LOGIN</button>
        <br />
      </div>
    </div>
  </div>


  );

export default LoginModal;
