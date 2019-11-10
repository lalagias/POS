import React, {Component} from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleRegister: true
    };
  }

  handleRegister = () => {
    this.setState((prevState) => ({
      isToggleRegister: !prevState.isToggleRegister
    }));
  };

  render() {

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
            onClick={this.handleRegister}>
            {this.state.isToggleRegister ? 'Open Register' : 'Close Register'}
          </button>
        </div>
      </div>
    )
  }
}

export default Register;