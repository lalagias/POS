import React, {Component} from 'react';
import {Button, Col, Row, Grid, Panel} from 'react-bootstrap';
import Hoc from "../../Hoc/Hoc";
import './Total.css';


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
      <Grid fluid>
        <Row>
          <Hoc>
            <Col
              lg={4}
              lgOffset={4}
              md={4}
              mdOffset={4}
              xs={12}>
              <Panel className="totalPanel text-center">
                <h3>Total: {this.props.todaysTotal} &euro;</h3>

              </Panel>
            </Col>
          </Hoc>
        </Row>
        <Row>
          <Hoc>
            <Col
              lg={4}
              lgOffset={4}
              md={4}
              mdOffset={4}
              xs={12}
              className="text-center">
              <Button
                bsSize="large"
                bsStyle="info"
                onClick={this.printTotal}>
                Print total
              </Button>
            </Col>
          </Hoc>
        </Row>
      </Grid>
    )
  }
}

export default Total;