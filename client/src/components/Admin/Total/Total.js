import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import Hoc from "../../Hoc/Hoc";
import Shifts from "../Shifts/Shifts";
import Register from "../Register/Register";
import API from "../../../utils/API";

class Total extends Component {
  constructor(props) {
    super(props);
  }

  //
  // getUnpaidChecks = () => {
  //   API.getTables()
  //     .then((results) => {
  //       if (results.status === 200) {
  //         let unpaidTables = results.data;
  //         if (Array.isArray(unpaidTables) && unpaidTables.length === 0) {
  //           let newShift = {...this.state.shift};
  //           newShift.unpaidTables = false;
  //           this.setState({shift: newShift}, () => {
  //             console.log('unpaidTables', this.state.shift.unpaidTables)
  //           })
  //         }
  //       }
  //     }).catch(error => {
  //     if (error) throw (error)
  //   })
  // };

  /* * * * * * * * * * * * * * * * *
         REGISTER FUNCTIONALITY
 * * * * * * * * * * * * * * * * * */
  // getRegister = () => {
  //   API.getRegister()
  //     .then((results) => {
  //       if (results.status === 200) {
  //         let register = {};
  //
  //         if (results.data.length !== 0) {
  //           register.id = results.data[results.data.length - 1]._id;
  //           register.closed = results.data[results.data.length - 1].closed;
  //           register.cash = results.data[results.data.length - 1].cash;
  //           register.card = results.data[results.data.length - 1].card;
  //           register.total = results.data[results.data.length - 1].total;
  //
  //           this.setState({register: {...register}}, () => {
  //             console.log(this.state)
  //           })
  //         }
  //       }
  //     }).catch(error => {
  //     if (error) throw (error)
  //   })
  // };

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

          this.props.register = register;
          // this.setState({register: {...register}})
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

          this.props.register = register;
          // this.setState({register: {...register}}, () => {
          //   console.log('after close register', this.state.register)
          // })
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };


  /* * * * * * * * * * * * * * * * *
          SHIFT FUNCTIONALITY
  * * * * * * * * * * * * * * * * * */
  // getShift = () => {
  //   API.getShifts()
  //     .then((results) => {
  //       console.log(results);
  //       if (results.status === 200) {
  //         let indexOfShift = results.data.findIndex((result) => {
  //           return (result.name === this.props.server && result.finished === false)
  //         });
  //
  //         console.log('indexOfShift', indexOfShift);
  //
  //         if (indexOfShift !== -1) {
  //           console.log( results.data[indexOfShift]);
  //
  //           let shift ={};
  //           shift.name = this.props.server;
  //           shift.finished = results.data[indexOfShift].finished;
  //           shift.cost = results.data[indexOfShift].cost;
  //           shift.card = results.data[indexOfShift].card;
  //           shift.cash = results.data[indexOfShift].cash;
  //           shift.ordersNo = results.data[indexOfShift].ordersNo;
  //           shift.unpaidTables = this.state.shift.unpaidTables;
  //           shift.id = results.data[indexOfShift]._id;
  //
  //           console.log(shift);
  //           this.setState({ shift: shift }, () => {
  //             console.log(this.state.shift);
  //           })
  //         }
  //       }
  //     }).catch(error => {
  //     if (error) throw (error)
  //   })
  // };

  startShift = (shift) => {
    API.startShift(shift)
      .then((results) => {
        console.log(results.data);
        if (results.status === 200) {
          console.log(results.data);
          let shift = {};
          shift.id = results.data._id;
          shift.cash = results.data.cash;
          shift.card = results.data.card;
          shift.cost = results.data.cost;
          shift.ordersNo = results.data.ordersNo;
          shift.finished = results.data.finished;
          // shift.name = results.data.name;
          shift.unpaidTables = this.props.shift.unpaidTables;

          this.props.shift = shift;
          // this.setState({shift: {...shift}}, () => {
          //   console.log('this.state.shift',this.state.shift);
          // })
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  finishShift = (shift) => {
    API.finishShift(shift)
      .then((results) => {
        if (results.status === 200) {
          console.log(results.data);

          let shift = {};
          shift.id = results.data.shift._id;
          shift.cash = results.data.shift.cash;
          shift.card = results.data.shift.card;
          shift.cost = results.data.shift.cost;
          shift.ordersNo = results.data.shift.ordersNo;
          shift.finished = results.data.shift.finished;
          // shift.name = results.data.shift.name;
          shift.unpaidTables = this.props.shift.unpaidTables;

          this.props.shift = shift;
          // this.setState({shift: {...shift}}, () => {
          //   console.log('this.state.shift',this.state.shift);
          // })
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  // Register can close when Shift is closed
  handleRegister = () => {

    let register = {...this.props.register};

    if (this.props.register.closed) {
      register.id = null;
      this.openRegister(register);
    } else {
      register.closed = true;
      this.closeRegister(register);
    }
  };

  // Shift can open when Register is Open
  handleShift = () => {
    console.log('when clicking', this.props.shift.finished);
    let shift = {...this.props.shift};
    shift.name = this.props.server;


    if (!this.props.register.closed && this.props.shift.finished) {
      shift.finished = false;
      this.startShift(shift);
      console.log('after starting shift', this.props.shift.finished);
      console.log('Should be CLOSE SHIFT');
    } else if (!this.props.shift.unpaidTables && !this.props.shift.finished) {
      shift.finished = true;
      this.finishShift(shift);
      console.log('after finishing shift', this.props.shift.finished);
      console.log('Should be OPEN SHIFT');
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
    console.log('COMPONENT MOUNT PROPS', this.props);
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