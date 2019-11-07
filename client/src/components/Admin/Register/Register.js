import React, {Component} from 'react'
import {
  Button,
} from 'react-bootstrap'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleRegister: true
    };
  }

  handleRegister = (event) => {
    this.setState((prevState) => ({
      isToggleRegister: !prevState.isToggleRegister
    }));
  };

  render() {

    return (
      <div>
        <Button
          bsSize="large"
          bsStyle="info"
          onClick={this.handleShift}>
          {this.state.isToggleRegister ? 'Open Register' : 'Close Register'}
        </Button>
      </div>
    )
  }
}

export default Register;