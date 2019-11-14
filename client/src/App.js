import React, {Component} from 'react';
import './App.css';
import {Grid, Row} from 'react-bootstrap';
import API from './utils/API';
import Order from './components/Order';
import Navbar from './components/Nav/Navbar';
import Table from './components/Table/Table';
import Admin from './components/Admin/Admin';
import Modal from './components/Modals/Modal';
import Hoc from './components/Hoc/Hoc';
import OrderModal from './components/Modals/Order';
import Login from './components/Login/Login';
import {withAlert} from 'react-alert';

class App extends Component {
  state = {
    // Holds all information regarding the tables.
    // Pending Order contains name and quantity
    // Items contains name, quantity, and cost
    tables: [
      {
        name: "Table 11",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 12",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 13",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 14",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 15",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 16",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 21",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 22",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 23",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 24",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 25",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 26",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      }, {
        name: "Table 31",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      },
      {
        name: "Table 32",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      }, {
        name: "Table 33",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      }, {
        name: "Table 34",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      }, {
        name: "Balcony 1",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      }, {
        name: "Balcony 2",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: [],
        bill: {
          id: null,
          items: [],
          total: 0.00
        }
      }
    ],
    // Today's total
    todaysTotal: null,
    // List of servers
    servers: [],
    // Holds all menu information found in DB: id, name, description, cost
    menu: {},
    // Currently logged in User
    user: null,
    // the page that is currently active
    activePage: "Tables",
    // Table that has been selected
    activeTable: null,
    // Index position of table that has been selected
    activeTableIndex: null,
    // Is modal active
    modalActive: false,
    // is order modal active
    orderModal: false,
    // Response from DB upon submitted the order from order component
    orderResponse: null,
    // Response from DB upon submitted the partial payment from checkout component
    partialPaymentResponse: null,
    // Is message modal active
    messageModalActive: false,
    // Content of message modal
    messageModal: "",
    // Partial Table
    partialTable: {
      bill: {
        id: "",
        items: [],
        total: 0,
      },
      guestNumber: 0,
      isOccupied: false,
      name: "",
      pendingOrder: [],
      server: "",
      print: false
    },
    // Register
    register: {
      id: null,
      closed: true,
      cash: 0,
      card: 0,
      total: 0
    },
    // Shift
    shift: {
      id: null,
      finished: true,
      cost: 0,
      ordersNo: 0,
      cash: 0,
      card: 0,
      unpaidTables: false
    }
  };

  componentDidMount() {
    //populates the data from the DB
    console.log('got DATA');
    this.populateData();
  };

  populateData = () => {
    this.getMenu();
    this.getServers();
    this.getUnpaidChecks();
    if (this.state.user) {
      this.getRegister();
      this.getShift();
      this.getOpenedShifts();
    }
  };

  activePageHandler = (event) => {
    // This is for the navbar to find the active page
    this.getUnpaidChecks();
    this.forceUpdate();
    this.setState({activePage: event});
  };

  getMenu = () => {
    API.getMenu().then(results => {
      let newMenu = results.data;
      this.setState({menu: newMenu})
    }).catch(error => {
      if (error) throw (error)
    })
  };

  getServers = () => {
    API.getServers().then((results) => {
      let newServers = results.data;
      this.setState({servers: newServers})
    }).catch(error => {
      if (error) throw (error)
    })
  };

  getUnpaidCheckBool = () => {
    API.getTables().then(results => {

      if (Array.isArray(results.data) && results.data.length === 0) {
        let newShift = {...this.state.shift};
        newShift.unpaidTables = false;
        this.setState({shift: newShift}, () => {
          console.log('unpaidTables', this.state.shift.unpaidTables)
        })
      } else if (results.data.length > 0) {
        let newShift = {...this.state.shift};
        newShift.unpaidTables = true;
        this.setState({shift: newShift}, () => {
          console.log('unpaidTables', this.state.shift.unpaidTables)
        })
      }
    })
  };

  getUnpaidChecks = () => {
    console.log('getUnpaidChecks');
    //this checks the database on load to see if there are unpaid checks
    API.getTables().then(results => {

      if (Array.isArray(results.data) && results.data.length === 0) {
        let newShift = {...this.state.shift};
        newShift.unpaidTables = false;
        this.setState({shift: newShift}, () => {
          console.log('unpaidTables', this.state.shift.unpaidTables)
        })
      } else if (results.data.length > 0) {
        let newShift = {...this.state.shift};
        newShift.unpaidTables = true;
        this.setState({shift: newShift}, () => {
          console.log('unpaidTables', this.state.shift.unpaidTables)
        })
      }

      let newTablesData = results.data;

      // if the result has data, there are unpaid checks
      if (newTablesData) {
        // get the tables from state in a stretch
        let updateChecks = [...this.state.tables];
        //map through the data from the d/b
        newTablesData.map(item => {
          // match them against the tables in state
          updateChecks.map((table, index) => {
            if (table.name === item.table) {
              let updateChecksIndex;
              //update the table's object
              updateChecksIndex = index;
              updateChecks[updateChecksIndex].bill.id = item._id;
              updateChecks[updateChecksIndex].isOccupied = true;
              updateChecks[updateChecksIndex].server = item.server;
              updateChecks[updateChecksIndex].guestNumber = item.guests;
              updateChecks[updateChecksIndex].bill.items = item.items;
              updateChecks[updateChecksIndex].bill.total = item.total;
            }
          })
        });
        //push the changed tables back to state
        this.setState({tables: updateChecks});
      }
    })
  };

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
              console.log('getRegister',this.state.register)
            })
          }
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  getShift = () => {
    API.getShifts()
      .then((results) => {
        console.log(results);
        if (results.status === 200) {
          let indexOfShift = results.data.findIndex((result) => {
            return (result.name === this.state.user && result.finished === false)
          });

          console.log('indexOfShift', indexOfShift);

          if (indexOfShift !== -1) {
            console.log(results.data[indexOfShift]);

            let shift = {};
            shift.name = this.state.user;
            shift.finished = results.data[indexOfShift].finished;
            shift.cost = results.data[indexOfShift].cost;
            shift.card = results.data[indexOfShift].card;
            shift.cash = results.data[indexOfShift].cash;
            shift.ordersNo = results.data[indexOfShift].ordersNo;
            shift.unpaidTables = this.state.shift.unpaidTables;
            shift.id = results.data[indexOfShift]._id;

            console.log(shift);
            this.setState({shift: shift}, () => {
              console.log('this.state.shift', this.state.shift);
            })
          }
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  getOpenedShifts = () => {
    API.getShifts()
      .then((results) => {
        console.log(results);
        if (results.status === 200) {
          let data = results.data.filter((result) => {
            return (result.finished === false)
          });
          console.log('getOpenedShifts', data);
          if (Array.isArray(data) && data.length > 0) {
            let register = {...this.state.register};
            register.cash = data.reduce((a, b) => a + b.cash, 0);
            register.card = data.reduce((a, b) => a + b.card, 0);
            register.total = data.reduce((a, b) => a + b.cost, 0);
            console.log(register);
            this.setState({register: register}, () => {
              this.updateRegister(register);
            });
          }
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  //clears the active table;
  cleanTable = () => {
    let misterClean = [...this.state.tables];
    misterClean[this.state.activeTableIndex].isOccupied = false;
    misterClean[this.state.activeTableIndex].guestNumber = null;
    misterClean[this.state.activeTableIndex].server = null;
    misterClean[this.state.activeTableIndex].pendingOrder = [];
    misterClean[this.state.activeTableIndex].bill.id = null;
    misterClean[this.state.activeTableIndex].bill.items = [];
    misterClean[this.state.activeTableIndex].total = null;

    this.setState({
      tables: misterClean,
      activeTable: null,
      activeTableIndex: null,
      modalActive: false
    });
  };

  // handles what happens when a table is clicked (sets an active table, active index, and opens the modal
  handleTableClick = (item) => {
    let newTableIndex = null;
    this.state.tables.map((table, index) => {
      if (table.name === item) {
        newTableIndex = index;
        this.setState({activeTable: item, activeTableIndex: newTableIndex},
          () => {
            this.modalOpen()
          })
      }
    })
  };

  // Callback function for DB query to verify login code
  setUser = (name) => {
    // Checks if return is a string or object
    if (typeof name === "string") {
      //Sets the user name that does callback to display login
      this.setState({
        user: name
      }, () => {
        this.getRegister();
        this.getShift();
        this.props.alert.show('Successfully Logged In!', {type: "success"});
      })
    }
  };

  // When user clicks logout button set user to null
  unsetUser = () => {
    this.setState({
      user: null
    }, function () {
      this.props.alert.show('Successfully Logged Out!')
    })
  };

  // Called from Order.js component, updates pending order list for active table
  updatePendingOrder = pendingOrder => {
    this.setState({
      [this.state.tables[this.state.activeTableIndex].pendingOrder]: pendingOrder
    }, () => console.log('state after update pending order', this.state.tables[this.state.activeTableIndex].pendingOrder));
  };

  // Saves pending orders into ordered list
  savePendingOrder = (newPartialOrder) => {
    if (newPartialOrder) {
      return new Promise((resolve, reject) => {
        let pendingOrders = newPartialOrder.pendingOrder;
        let total = 0;

        // Loop through list of pending orders
        let items = pendingOrders.map(item => {
          let newItem = {};
          total += item.charge;
          newItem.charge = item.charge;
          newItem.quantity = item.quantity;
          newItem.name = item.name;
          return newItem;
        });

        let tableTemp = {...this.state.partialTable};
        tableTemp.bill.items = [...items];
        tableTemp.bill.total = total;
        tableTemp.paymentType = newPartialOrder.paymentType;
        tableTemp.card = newPartialOrder.card;
        tableTemp.amountTendered = newPartialOrder.amountTendered;

        this.setState({partialTable: tableTemp}, () => {
          resolve(this.state.partialTable)
        });
      }).then(async (result) => {
        await this.orderToDb(this.state.partialTable);
        this.orderToDb();
        return result
      })

    } else {
      // variables for aesthetic purposes, shorten code length
      const activeTable = this.state.activeTableIndex;
      const pendingOrders = this.state.tables[activeTable].pendingOrder;

      let currentOrderList = this.state.tables[activeTable].bill.items;
      let table = this.state.tables[activeTable];

      // Loop through list of pending orders
      pendingOrders.map(newItem => {
        // Gets index position of newItem from table
        const currentItemIndex = currentOrderList.findIndex(index => index.name === newItem.name);
        // Gets index position of item from menu
        const menuItemIndex = this.state.menu.findIndex(index => index.name === newItem.name);
        // variables for aesthetic purposes, shorten code length
        const menuItem = this.state.menu[menuItemIndex];

        // If item is found in the list add the ordered quantity to the pending quantity and calculate the new cost of the quantity
        // If not found calculate the total cost and push all items into the array

        if (currentItemIndex !== -1) {
          currentOrderList[currentItemIndex].quantity = parseInt(currentOrderList[currentItemIndex].quantity, 10) + parseInt(newItem.quantity, 10);
          currentOrderList[currentItemIndex].charge = (parseFloat(currentOrderList[currentItemIndex].quantity) * parseFloat(menuItem.cost));
        } else {
          newItem.charge = parseInt(newItem.quantity, 10) * parseFloat(menuItem.cost);
          currentOrderList.push(newItem);
        }
      });

      // Store updated info into table object
      table.bill.items = currentOrderList;
      // Reduce function to sum up all the charges in the bill array
      table.bill.total = this.state.tables[activeTable].bill.items.map(item => item.charge).reduce((sum, nextCharge) => sum + nextCharge);
      table.pendingOrder = [];

      //Set State using table object and use callback once state is updated
      this.setState({
          [this.state.tables[activeTable]]: table,
        }, () => this.orderToDb()
      );
    }
  };

  // Call placeOrder API route to update database and wait for response
  orderToDb = (partialNewOrder = false) => {
    if (partialNewOrder) {
      return new Promise((resolve, reject) => {
        API.placeOrder(this.state.partialTable, this.dbresponse);
        resolve(this.state.partialTable);
      }).then((result) => {
        this.submitPartialPayment(this.state.partialTable);
        return result
      })
    } else {
      API.placeOrder(this.state.tables[this.state.activeTableIndex], this.dbresponse);
    }
  };

  // Process route response from updating order and set message to be forwarded to Order component
  dbresponse = (response) => {
    let orderMessage;

    response.status === 200 ? orderMessage = "Order Submitted" : orderMessage = "An error occured, order was saved and will be saved on next transaction";

    this.setState({
      orderResponse: orderMessage,
      orderModal: true
    });
  };
  //
  // dbPartialPaymentResponse = (response) => {
  //   let partialPaymentMessage;
  //
  //   response.status === 200 ? partialPaymentMessage = "Partial Payment Submitted!" : partialPaymentMessage = "An error occured";
  //
  //   this.setState({
  //     partialPaymentResponse: partialPaymentMessage,
  //     orderModal: true
  //   })
  // };

  // Close Response modal
  orderClose = () => {
    this.setState({
      orderModal: false
    })
  };

  setServer = (server) => {
    this.setState({[this.state.tables[this.state.activeTableIndex].server]: server});
  };

  addServer = (server, callback) => {
    API.addServer(server)
      .then(results => {
          if (results.status === 200) {
            this.getServers();
          }
        }
      ).catch(error => {
      throw error
    })
  };

  addMenu = (menu) => {
    API.addMenu(menu)
      .then(results => {
          if (results.status === 200) {
            this.getMenu();
          }
        }
      ).catch(error => {
      throw error
    })
  };

  seatGuestsHelperFromPartialPayment = (server, guests, tableName) => {
    return new Promise((resolve, reject) => {
      // Push to the DB
      const seating = {};
      seating.server = server;
      seating.guests = guests;
      seating.table = tableName;

      API.seatGuests(seating).then(results => {
        if (results.status === 200) {

          let partialTable = {
            bill: {
              id: results.data._id,
              items: results.data.items,
              total: results.data.total,
            },
            isOccupied: true,
            pendingOrder: [],
            guestNumber: results.data.guests,
            name: results.data.table,
            server: results.data.server,
            print: false,
          };

          this.setState({partialTable: {...partialTable}}, () => {
            resolve(this.state.partialTable);
          });
        } else {
          console.log(results.status);
        }
      });
    }).then((result) => {
      return result
    })

  };

  seatGuestsFromModalHandler = (server, guests) => {
    //click handler from the modal, seats new guests, updates state, creates a new receipt and then updates state with the new receipt
    // Push to the DB
    const seating = {};
    seating.server = server;
    seating.guests = guests;
    seating.table = this.state.activeTable;

    API.seatGuests(seating).then(results => {
      if (results.status === 200) {

        let updateTables = [...this.state.tables];
        updateTables[this.state.activeTableIndex].guestNumber = guests;
        updateTables[this.state.activeTableIndex].server = server;
        updateTables[this.state.activeTableIndex].isOccupied = true;
        updateTables[this.state.activeTableIndex].bill.id = results.data._id;
        this.setState({
          modalActive: false,
          tables: updateTables
        }, function () {
          this.props.alert.show('Guests Seated Successfully', {type: "success"})
        });
      }
    });
  };

  //these are helper functions to open and close the modals
  modalOpen = () => {
    this.getUnpaidChecks();
    this.setState({modalActive: true}, function () {
    })
  };

  modalClose = () => {
    this.setState({modalActive: false}, function () {
    })
  };

  modalOrder = () => {
    // from inside the modal, this function lets the modal open an order page, it closes the modal too
    this.setState({activePage: "Orders", modalActive: false})
  };

  changeTable = (table, tables) => {
    API.changeTable(table, tables)
      .then(results => {
        if (results.status === 200) {
          this.cleanTable();
          this.getUnpaidChecks();
        }
      })
      .catch(error => {
        throw error
      })
  };

  shiftTotal = (print) => {
    API.shiftTotal(print).then(result => {
      if (result.status === 200) {
        this.setState({todaysTotal: result.data.totalSales});
      }
    }).catch(error => {
      throw error;
    })
  };

  submitPayment = (payment) => {
    API.submitPayment(payment)
      .then(results => {
        if (results.status === 200) {
          console.log('payment data submit payment', payment);
          this.updateShiftHandler(payment);
          this.cleanTable();
        }
      })
      .catch(error => {
        throw error
      })
  };

  submitPartialPayment = (payment) => {
    API.submitPartialPayment(payment)
      .then(results => {
        if (results.status === 200) {
          console.log('payment data submit payment', payment);
          this.updateShiftHandler(payment);
          this.setState({
            activeTable: null,
            activeTableIndex: null,
            modalActive: false
          });
        }
      })
      .catch(error => {
        throw error
      })
  };

  menuDelete = (menuItem) => {
    API.menuDelete(menuItem)
      .then(results => {
        if (results.status === 200) {
          this.getMenu()
        }
      })
      .catch(error => {
        throw error
      })
  };

  /* * * * * * * * * * * * * * * * *
          REGISTER FUNCTIONALITY
  * * * * * * * * * * * * * * * * * */

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

          // this.props.register = register;
          this.setState({register: {...register}})
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  updateRegister = (register) => {
    console.log('updateRegister', register);
    API.updateRegister(register)
      .then((results) => {
        if (results.status === 200) {
          console.log(results.data);
          let register = {};
          register.id = results.data._id;
          register.closed = results.data.closed;
          register.cash = results.data.cash;
          register.card = results.data.card;
          register.total = results.data.total;

          // this.props.register = register;
          this.setState({register: {...register}})
        }
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

          // this.props.register = register;
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
          shift.unpaidTables = this.state.shift.unpaidTables;

          this.setState({shift: {...shift}}, () => {
            console.log('this.state.shift',this.state.shift);
          })
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  updateShift = (shift) => {
    console.log('data send to API updateshidt', shift);
    API.updateShift(shift)
      .then((results) => {
        console.log(results.data);
        if (results.status === 200) {
          let shift = {};
          shift.id = results.data.shift._id;
          shift.cash = results.data.shift.cash;
          shift.card = results.data.shift.card;
          shift.cost = results.data.shift.cost;
          shift.ordersNo = results.data.shift.ordersNo;
          shift.finished = results.data.shift.finished;
          shift.unpaidTables = this.state.shift.unpaidTables;

          this.setState({ shift: shift })
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  updateShiftHandler = (payment) => {
    let shift = {...this.state.shift};
    console.log(this.state.shift);
    if (payment.paymentType === "Card") {
      //TBD
    } else if (payment.paymentType === "Cash" || payment.paymentType === "Partial Payment") {
      payment.amountTendered ? shift.cash = payment.amountTendered : shift.cash = payment.amount;
      shift.cost = shift.cash;
      console.log('updateShiftHandler',shift);
    }
    this.updateShift(shift);
  };

  finishShift = (shift) => {
    API.finishShift(shift)
      .then((results) => {
        if (results.status === 200) {
          console.log(results.data);

          let shift = {};
          shift.id = null;
          shift.cash = 0;
          shift.card = 0;
          shift.cost = 0;
          shift.ordersNo = 0;
          shift.finished = results.data.shift.finished;
          shift.unpaidTables = this.state.shift.unpaidTables;

          this.setState({shift: {...shift}}, () => {
            console.log('this.state.shift',this.state.shift);
          })
        }
      }).catch(error => {
      if (error) throw (error)
    })
  };

  render() {
    let activeContent = null;
    if (this.state.user === null) {
      activeContent = (<Login setUser={this.setUser}/>)
    } else {

      switch (this.state.activePage) {
        case ("Tables"):
          activeContent = (
            <Table
              tables={this.state.tables}
              clicked={this.handleTableClick}/>

          );
          break;
        case ("Orders"):
          // Sets Order Page as rendered page and passes props to Order Component
          activeContent = (
            <Order
              menu={this.state.menu}
              activeTable={this.state.activeTable}
              table={this.state.tables[this.state.activeTableIndex]}
              orderSubmit={this.savePendingOrder}
              updatePendingOrder={this.updatePendingOrder}
              orderModal={this.state.orderModal}/>
          );
          break;
        case ("Admin"):
          activeContent = (
            <Admin
              getOpenedShifts={this.getOpenedShifts}
              getUnpaidCheckBool = {this.getUnpaidCheckBool}
              register={this.state.register}
              shift={this.state.shift}
              getRegister={this.getRegister}
              getShift={this.getShift}
              startShift={this.startShift}
              finishShift={this.finishShift}
              openRegister={this.openRegister}
              closeRegister={this.closeRegister}
              server={this.state.user}
              menuDelete={this.menuDelete}
              todaysTotal={this.state.todaysTotal}
              shiftTotal={this.shiftTotal}
              servers={this.state.servers}
              addServer={this.addServer}
              menu={this.state.menu}
              addMenu={this.addMenu}/>
          );
          break;
        default:
          activeContent = null
      }
    }

    return (
      <Hoc>
        <Grid fluid className="mt-1">
          <Navbar
            activePage={this.state.activePage}
            handleSelect={this.activePageHandler}
            activeTable={this.state.activeTable}
            loggedInUser={this.state.user}
            logOut={this.unsetUser}/>
        </Grid>
        <Grid className="mt-5">
          <Row>
            {/* active content (conditional page render) */}
            {activeContent}
          </Row>
          {/* modal conditional rendering is below */}
          {/* Displays Order modal if state is true */}
          {
            this.state.orderModal ?
              <OrderModal
                orderMessage={this.state.orderResponse}
                orderClose={this.orderClose}/>
              : null
          }
          {
            this.state.modalActive ?
              (<Modal
                register={this.state.register}
                shift={this.state.shift}
                server={this.state.user}
                tables={this.state.tables}
                activeTable={this.state.activeTable}
                activeTableIndex={this.state.activeTableIndex}
                partialTable={this.state.partialTable}
                servers={this.state.servers}
                close={this.modalClose}
                order={this.modalOrder}
                receipt={this.printReceipt}
                submitPayment={this.submitPayment}
                submitPartialPayment={this.submitPartialPayment}
                orderSubmit={this.savePendingOrder}
                updatePendingOrder={this.updatePendingOrder}
                changeTable={this.changeTable}
                setServer={this.setServer}
                seatGuests={this.seatGuestsFromModalHandler}
                seatGuestsPartialPayment={this.seatGuestsHelperFromPartialPayment}/>)
              : null
          }
        </Grid>
      </Hoc>
    );
  }
}

export default withAlert(App);