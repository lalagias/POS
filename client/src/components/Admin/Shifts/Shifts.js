import React, {Component} from 'react'
import {
  Button,
} from 'react-bootstrap'

class Shifts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleShift: true
    };
  }

  handleShift = (event) => {
    this.setState((prevState) => ({
      isToggleShift: !prevState.isToggleShift
    }));
  };

  render() {

    return (
      <div>
        <Button
          bsSize="large"
          bsStyle="info"
          onClick={this.handleShift}>
          {this.state.isToggleShift ? 'Open Shift' : 'Close Shift'}
        </Button>
      </div>
    )
  }
}

export default Shifts;