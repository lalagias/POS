// This component generates the login screen for the PoS.
// Uses react-bootstrap for CSS styling
// API import handles the API routes to express
import React, {Component} from 'react'
import {Grid, Row, Col, Form, FormControl} from 'react-bootstrap';
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
      <Col
        lg={4} lgOffset={4}
        md={6} mdOffset={3}
        xs={10} xsOffset={1}>
        <div className="card">
          <Grid fluid>
            <Row className="text-center">
              <Col xs={12}>
                <Form className="mt-3">
                  <FormControl
                    type="text"
                    name="id"
                    className="idCode"
                    value={this.state.code}
                    disabled="disabled"
                  />
                </Form>
              </Col>
            </Row>
            <Row className="text-center">
              <Col xs={4}>
                <button className="btn-clearfix btn-login" onClick={(event) => this.enterId(event)}
                        value="1">1
                </button>
              </Col>
              <Col xs={4}>
                <button className="btn-clearfix btn-login" onClick={(event) => this.enterId(event)}
                        value="2">2
                </button>
              </Col>
              <Col xs={4}>
                <button className="btn-clearfix btn-login" onClick={(event) => this.enterId(event)}
                        value="3">3
                </button>
              </Col>
            </Row>
            <Row className="text-center">
              <Col xs={4}>
                <button className="btn-clearfix btn-login" onClick={(event) => this.enterId(event)}
                        value="4">4
                </button>
              </Col>
              <Col xs={4}>
                <button className="btn-clearfix btn-login" onClick={(event) => this.enterId(event)}
                        value="5">5
                </button>
              </Col>
              <Col xs={4}>
                <button className="btn-clearfix btn-login" onClick={(event) => this.enterId(event)}
                        value="6">6
                </button>
              </Col>
            </Row>
            <Row className="text-center">
              <Col xs={4}>
                <button className="btn-clearfix btn-login" onClick={(event) => this.enterId(event)}
                        value="7">7
                </button>
              </Col>
              <Col xs={4}>
                <button className="btn-clearfix btn-login" onClick={(event) => this.enterId(event)}
                        value="8">8
                </button>
              </Col>
              <Col xs={4}>
                <button className="btn-clearfix btn-login" onClick={(event) => this.enterId(event)}
                        value="9">9
                </button>
              </Col>
            </Row>
            <Row className="text-center">
              <Col xs={4} xsOffset={4}>
                <button className="btn-clearfix btn-login"
                        onClick={(event) => this.enterId(event)}
                        value="0">0
                </button>
              </Col>
            </Row>
            <Row className="text-center">
              <Col xs={4}>
                <button className="btn-clearfix btn-submit"
                        onClick={() => this.userCheck()}>Login
                </button>
              </Col>
              <Col xs={4} xsOffset={4} className="pl-0">
                <button className="btn-clearfix btn-red"
                        onClick={() => this.deleteChar()}>Delete
                </button>
              </Col>
            </Row>
          </Grid>
        </div>
      </Col>
    )
  }
}

export default Login