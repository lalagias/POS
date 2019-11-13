// This component generates the login screen for the PoS.
// Uses react-bootstrap for CSS styling
// API import handles the API routes to express
import React, {Component} from 'react'
import {Grid, Row, Col, Panel, Well, Button, Form, ControlLabel, FormControl} from 'react-bootstrap';
import API from '../../utils/API'

class Login extends Component {
  //Code is updated with the server code that is being entered
  state = {
    code: ""
  };

  // As the code is entered this function updates state to match the current code entry
  enterId = event => {
    let newId = this.state.code + event.target.value;
    this.setState({
      code: newId
    });
  };

  //Called when login is clicked, calls the login API route to validate user.
  //Empties the code so that it blanks out on each attempt
  userCheck = () => {
    this.setState({
      code: ""
    });

    API.login(this.state.code, this.props.setUser)
  };

  // Called when delete is clicked, deleted last character of ID.
  deleteChar = () => {
    let idCode = document.querySelector('.idCode').value;
    idCode = idCode.slice(0, -1);

    this.setState({
      code: idCode
    })
  };

  //Renders the login page with a 10 digit keypad with display and login button
  render(params) {
    return (
      <Grid xs={10} xsOffset={2} className="mt-5">
        <Col
          lg={4} lgOffset={4}
          md={6} mdOffset={3}
          xs={10} xsOffset={1}>
          <Panel>
            <Well>
              <Form>
                <ControlLabel>
                  id:
                  <FormControl
                    type="text"
                    name="id"
                    className="idCode"
                    value={this.state.code}
                    disabled="disabled"
                  />
                </ControlLabel>
              </Form>
              <Row className="text-center">
                <Col xs={4}><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)}
                                    value="1">1</Button></Col>
                <Col xs={4}><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)}
                                    value="2">2</Button></Col>
                <Col xs={4}><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)}
                                    value="3">3</Button></Col>
              </Row>
              <Row className="text-center">
                <Col xs={4}><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)}
                                    value="4">4</Button></Col>
                <Col xs={4}><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)}
                                    value="5">5</Button></Col>
                <Col xs={4}><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)}
                                    value="6">6</Button></Col>
              </Row>
              <Row className="text-center">
                <Col xs={4}><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)}
                                    value="7">7</Button></Col>
                <Col xs={4}><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)}
                                    value="8">8</Button></Col>
                <Col xs={4}><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)}
                                    value="9">9</Button></Col>
              </Row>
              <Row className="text-center">
                <Col xs={4} xsOffset={4}><Button bsSize="large" bsStyle="info" onClick={(event) => this.enterId(event)}
                                                 value="0">0</Button></Col>
              </Row>
              <Row className="text-center">
                <Col xs={4}><Button bsSize="large" bsStyle="success"
                                    onClick={() => this.userCheck()}>Login</Button></Col>
                <Col xs={4} xsOffset={4}><Button bsSize="large" bsStyle="danger"
                                                 onClick={() => this.deleteChar()}>Delete</Button></Col>
              </Row>
            </Well>
          </Panel>
        </Col>
      </Grid>
    )
  }
}

export default Login