import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Hoc from "../../Hoc/Hoc";
import './Total.css';
import Shifts from "../Shifts/Shifts";
import Register from "../Register/Register";

class Total extends Component {

  shiftTotal = () => {
    this.props.shiftTotal(false);
  };

  printTotal = () => {
    this.props.shiftTotal(true);
  };

  componentDidMount() {
    this.shiftTotal();
  }

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
          <Register/>
          <Shifts/>
        </Col>
      </Hoc>
    )
  }
}

export default Total;