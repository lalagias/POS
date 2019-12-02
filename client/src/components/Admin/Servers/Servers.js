import React, {Component} from 'react';
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Col
} from 'react-bootstrap';
import {withAlert} from 'react-alert';
import Hoc from '../../Hoc/Hoc';

// makes it easy to reset the state of the page / clear the forms
const initialState = {
  newServer: {
    name: "",
    code: ""
  }
};

class Servers extends Component {
  state = initialState;

  // updates states immediately on change
  newServerNameChangeHandler = event => {
    let server = {...this.state.newServer};
    server.name = event.target.value;
    this.setState({newServer: server})
  };

  // updates states immediately on change
  newServerCodeChangeHandler = event => {
    let server = {...this.state.newServer};
    server.code = event.target.value;
    this.setState({newServer: server})
  };

  // Submit a new server
  newServerSubmitHandler = (event) => {
    event.preventDefault();
    this.props.addServer(this.state.newServer);

    this.resetToInitialState()
  };

  resetToInitialState = () => {
    this.setState(initialState, function () {
      this.props.alert.show('Server Added', {type: "success"})
    })
  };

  render() {

    return (
      <Hoc>
        <Col
          className="mb-3"
          lg={3}
          md={3}
          xs={12}>
          <div className="card">
            <div className="card-title">
              Current Servers
            </div>
            <div className="card-content">
              {this.props.servers.map((server) => (
                <div className="tile" key={server._id}>
                  <div className="tile-content">
                    {server.name}
                  </div>
                </div>
              ))
              }
            </div>
          </div>
        </Col>
        <Col
          className="mb-3"
          lg={3}
          md={3}
          xs={12}>
          <div className="card">
            <div className="card-title">
              Add new Server
            </div>
            <form>
              <FormGroup>
                <ControlLabel>New Server Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.newServer.name}
                  onChange={this.newServerNameChangeHandler}/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>New Server Pin Code</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.newServer.code}
                  onChange={this.newServerCodeChangeHandler}/>
              </FormGroup>
              <div className="text-center">
                <button
                  className="btn-clearfix btn-submit"
                  onClick={this.newServerSubmitHandler}> Submit
                </button>
              </div>
            </form>
          </div>
        </Col>
      </Hoc>
    )
  }
}

export default withAlert(Servers);