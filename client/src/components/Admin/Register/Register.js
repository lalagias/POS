import React from 'react';

function Register(props) {

  return (
    <div className="card mb-3">
      <div className="card-title">
        Register
      </div>
      <div className="card-value-subtotal text-center">
        0&euro;
      </div>
      <div className="text-center">
        <button
          className="btn-clearfix btn-submit"
          onClick={props.handleRegister}>
          {props.register.closed ? 'Open Register' : 'Close Register'}
        </button>
      </div>
    </div>
  );
}

export default Register;