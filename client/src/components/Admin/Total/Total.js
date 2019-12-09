import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import Hoc from "../../Hoc/Hoc";
import Shifts from "../Shifts/Shifts";
import Register from "../Register/Register";

class Total extends Component {
  constructor(props) {
    super(props);
  }

  // Register can close when Shift is closed
  handleRegister = () => {
    let register = {...this.props.register};

    if (this.props.register.closed) {
      register.id = null;
      register.closed = false;
      this.props.openRegister(register);
    } else if (!this.props.register.closed && this.props.shift.finished) {
      register.closed = true;
      this.props.closeRegister(register);
    }
  };

  // Shift can open when Register is Open
  handleShift = () => {
    let shift = {...this.props.shift};
    shift.name = this.props.server;
    console.log('unpaidTables', this.props.shift.unpaidTables);
    console.log('unpaidTables', this.props.shift.cost);
    if (!this.props.register.closed && this.props.shift.finished) {
      shift.finished = false;
      this.props.startShift(shift);
    } else if (!this.props.shift.unpaidTables && !this.props.shift.finished) {
      shift.finished = true;
      this.props.finishShift(shift);
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
    this.props.getRegister();
    this.props.getShift();
    this.props.getUnpaidCheckBool();
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
              Total Register
            </div>
            <div className="card-value-total text-center">
              {this.props.register.total} &euro;
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
            register={this.props.register}
            handleRegister={this.handleRegister}
          />
          <Shifts
            shift={this.props.shift}
            handleShift={this.handleShift}
          />
        </Col>
      </Hoc>
    )
  }
}

export default Total;