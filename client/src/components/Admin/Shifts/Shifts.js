import React from 'react';

function Shifts(props) {
  console.log(props);

  return (
    <div className="card mb-3">
      <div className="card-title">
        Shift
      </div>
      <div className="card-value-subtotal text-center">
        0&euro;
      </div>
      <div className="text-center">
        <button
          className="btn-clearfix btn-submit"
          onClick={props.handleShift}>
          {props.isShiftOpen ? 'Close Shift' : 'Open Shift' }
        </button>
      </div>
    </div>
  );
}

export default Shifts;