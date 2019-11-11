import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Hoc from "../../Hoc/Hoc";
import Shifts from "../Shifts/Shifts";
import Register from "../Register/Register";

class Total extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegisterOpen: false,
      isShiftOpen: false,
      registerTotal: 0,
      shiftTotal: 0,
      ordersNo: 0,
      cashRegister: 0,
      cardRegister: 0,
      cashServer: 0,
      cardServer: 0,
    };
  }

  // Register can open when Shift is closed
  handleRegister = () => {
    if (!this.state.isShiftOpen) {
      this.setState((prevState) => ({
        isRegisterOpen: !prevState.isRegisterOpen
      }));
    }
  };

  // Shift can open when Register is Open
  handleShift = () => {
    if (this.state.isRegisterOpen) {
      this.setState((prevState) => ({
        isShiftOpen: !prevState.isShiftOpen
      }));
    }
  };

  shiftTotal = () => {
    this.props.shiftTotal(false);
  };

  printTotal = () => {
    this.props.shiftTotal(true);
  };

  componentDidMount() {
    this.shiftTotal();
  };

  render() {

    return (
      <Hoc>
        <Col
          className="mb-3"
          lg={3}
          md={3}
          xs={12}>
          <div className="card mb-3">
            <div className="card-title">
              Total
            </div>
            <div className="card-value-total text-center">
              {this.props.todaysTotal}&euro;
            </div>
            <div className="text-center">
              <button
                className="btn-clearfix btn-submit"
                onClick={this.printTotal}>
                Print total
              </button>
            </div>
          </div>
          <Register
            getRegister={this.props.getRegister}
            openRegister={this.props.openRegister}
            updateRegister={this.props.updateRegister}
            closeRegister={this.props.closeRegister}
            isRegisterOpen={this.state.isRegisterOpen}
            isShiftOpen={this.state.isShiftOpen}
            handleRegister={this.handleRegister}
          />
          <Shifts
            getShift={this.props.getShift}
            startShift={this.props.startShift}
            updateShift={this.props.updateShift}
            finishShift={this.props.finishShift}
            isRegisterOpen={this.state.isRegisterOpen}
            isShiftOpen={this.state.isShiftOpen}
            handleShift={this.handleShift}
          />
        </Col>
      </Hoc>
    )
  }
}

export default Total;