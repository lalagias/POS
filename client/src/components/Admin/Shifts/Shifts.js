import React from 'react';

function Shifts(props) {

  return (
    <div className="card mb-3">
      <div className="card-title">
        Shift
      </div>
      <div className="card-value-subtotal text-center">
        {props.shift.cost} &euro;
      </div>
      <div className="text-center">
        <button
          className="btn-clearfix btn-submit"
          onClick={props.handleShift}>
          {props.shift.finished ? 'Open Shift' : 'Close Shift' }
        </button>
      </div>
    </div>
  );
}

export default Shifts;