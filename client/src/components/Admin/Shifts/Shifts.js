import React, {Component} from 'react';

class Shifts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleShift: true
    };
  }

  handleShift = () => {
    this.setState((prevState) => ({
      isToggleShift: !prevState.isToggleShift
    }));
  };

  render() {

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
            onClick={this.handleShift}>
            {this.state.isToggleShift ? 'Open Shift' : 'Close Shift'}
          </button>
        </div>
      </div>
    )
  }
}

export default Shifts;