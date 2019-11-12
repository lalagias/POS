import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import Hoc from "../../Hoc/Hoc";
import Shifts from "../Shifts/Shifts";
import Register from "../Register/Register";
import API from "../../../utils/API";

class Total extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: {
        id: "",
        closed: true,
        cash: 0,
        card: 0,
        total: 0
      },
      shift: {
        id: "",
        finished: true,
        total: 0,
        ordersNo: 0,
        cash: 0,
        card: 0,
        unpaidTables: 0,
        name: ""
      }
    };
  }

  /* * * * * * * * * * * * * * * * *
         REGISTER FUNCTIONALITY
 * * * * * * * * * * * * * * * * * */
  getRegister = () => {
    API.getRegister()
      .then((results) => {
        if (results.status === 200) {
          let register = {};

          if (results.data.length !== 0) {
            register.id = results.data[results.data.length - 1]._id;
            register.closed = results.data[results.data.length - 1].closed;
            register.cash = results.data[results.data.length - 1].cash;
            register.card = results.data[results.data.length - 1].card;
            register.total = results.data[results.data.length - 1].total;

            this.setState({register: {...register}}, () => {
              console.log(this.state)
            })
          }
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  openRegister = (register) => {
    console.log('OPEN REGISTER------------', register);
    API.openRegister(register)
      .then((results) => {
        if (results.status === 200) {
          console.log(results.data);
          let register = {};
          register.id = results.data._id;
          register.closed = results.data.closed;
          register.cash = results.data.cash;
          register.card = results.data.card;
          register.total = results.data.total;

          this.setState({register: {...register}})
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  updateRegister = () => {
    API.updateRegister()
      .then((results) => {
      }).catch(error => {
      if (error) throw (error)
    })
  };

  closeRegister = (register) => {
    console.log('INVOKED closeRegister');
    console.log('data send', register);
    API.closeRegister(register)
      .then((results) => {
        if (results.status === 200) {
          console.log(results.data);
          let register = {};
          register.closed = results.data.register.closed;
          register.cash = results.data.register.cash;
          register.card = results.data.register.card;
          register.total = results.data.register.total;

          this.setState({register: {...register}}, () => {
            console.log('after close register', this.state.register)
          })
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };


  /* * * * * * * * * * * * * * * * *
          SHIFT FUNCTIONALITY
  * * * * * * * * * * * * * * * * * */
  getShift = () => {
    API.getShifts()
      .then((results) => {
      }).catch(error => {
      if (error) throw (error)
    })
  };

  startShift = () => {
    API.startShift()
      .then((results) => {
      }).catch(error => {
      if (error) throw (error)
    })
  };

  updateShift = () => {
    API.updateShift()
      .then((results) => {
      }).catch(error => {
      if (error) throw (error)
    })
  };

  finishShift = () => {
    API.getTables().then(results => {
      console.log(results.data);
      API.finishShift()
        .then((results) => {
        }).catch(error => {
        if (error) throw (error)
      })
    });
  };

  // Register can close when Shift is closed
  handleRegister = () => {
    console.log('handleRegister');
    let register = {};
    register.cash = this.state.register.cash;
    register.card = this.state.register.card;
    register.total = this.state.register.total;
    register.id = this.state.register.id;

    if (this.state.register.closed) {
      this.openRegister(register);
    } else {
      register.closed = true;
      console.log('closeRegister handler',register);
      this.closeRegister(register);
    }
  };

  // Shift can open when Register is Open
  handleShift = () => {
    let unpaidTables = this.props.finishShift();
    this.setState({unpaidTables: unpaidTables});

    if (this.state.register.closed && this.state.unpaidTables === 0) {
      this.setState((prevState) => ({
        isShiftOpen: !prevState.isShiftOpen
      }));
    } else if (this.state.unpaidTables !== 0) {
      console.log('NOT ALL TABLES ARE PAID')
    } else if (!this.state.isRegisterOpen) {
      console.log('REGISTER IS NOT YET OPENED')
    }
  };

  shiftTotal = () => {
    this.props.shiftTotal(false);
  };

  printTotal = () => {
    this.props.shiftTotal(true);
  };

  populateData = () => {
    this.getRegister();
  };

  componentDidMount() {
    this.shiftTotal();
    this.populateData();
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
            register={this.state.register}
            handleRegister={this.handleRegister}
          />
          <Shifts
            shift={this.state.shift}
            handleShift={this.handleShift}
          />
        </Col>
      </Hoc>
    )
  }
}

export default Total;