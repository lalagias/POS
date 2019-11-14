import axios from 'axios'

export default {
  // for initialization / Reinit of state
  getMenu: () => {
    return axios.get("/menu")
  },

  getServers: () => {
    return axios.get("/servers")
  },

  getTables: () => {
    return axios.get("/check/unpaid")
  },

  seatGuests: (seating) => {
    console.log('seating', seating);
    //seats new guests
    return axios.post("/check/seat", seating)
      .then(response => {
        return response
      }).catch(error => {
        if (error) {
          return error;
        }
      })
  },

  // place new order
  placeOrder: (order, dbresponse) => {
    console.log("place new order", order);
    return axios.put("/order/" + order.bill.id, order)
      .then(response => {
        console.log('response', response);
        dbresponse(response);
        return response;
      })
      .catch(error => {
        console.log('error', error);
        return error;
      })
  },

  //change Table
  changeTable: (table, tablesList) => {
    console.log('tablesList from API.js', tablesList);
    return axios.put("/check/updateTable/" + table.bill.id, table)
      .then(response => {
        return response
      }).catch(error => {
        if (error) {
          console.log(error);
          return error;
        }
      })
  },
  //Delete menu item
  menuDelete: (menuitem) => {
    console.log(menuitem);
    return axios.delete("menu/delete/" + menuitem.id).then(response => {
      return response
    }).catch(error => {
      if (error) {
        console.log(error);
        return error;
      }
    })
  },

  //close register for a shift
  shiftTotal: (print) => {
    let body = {};
    body.print = print;
    console.log('print from API:', print);
    return axios.get("/check/shift/total/" + body.print)
      .then(response => {
        return response
      }).catch(error => {
        if (error) {
          console.log(error);
          return error;
        }
      })
  },

  //checkout process
  submitPayment: (payment) => {
    let newPayment = {};
    newPayment.paid = true;
    newPayment.card = payment.card;
    newPayment.amountTendered = payment.amount;
    newPayment.paymentType = payment.paymentType;

    let URL = encodeURI("/check/" + payment.bill.id);
    console.log('URL', URL);
    return (
      axios.put(URL, newPayment)
        .then(response => {
          console.log('MPIKE');
          return response;

        })
        .catch(error => {
          console.log('ERROR');
          return error;
        })
    )
  },

  //checkout partial payment process
  submitPartialPayment: (payment) => {
    let newPartialPayment = {};
    newPartialPayment.card = payment.card;
    newPartialPayment.amountTendered = payment.amountTendered;
    newPartialPayment.paymentType = payment.paymentType;
    newPartialPayment.paid = true;

    let URL = encodeURI("/check/" + payment.bill.id);
    return (
      axios.put(URL, newPartialPayment)
        .then(response => {
          return response;
        })
        .catch(error => {
          return error;
        })
    )
  },

  login: (code, setUser) => {
    return (
      axios.get(`/servers/login/${code}`)
        .then(response => {
          console.log('login data', response.data);
          setUser(response.data);
          return response.data;
        })
        .catch(error => {
          console.log('error login');
          return error;
        })
    )
  },

  addServer: (server) => {
    if (server) {
      let newServer = {};
      newServer.name = server.name;
      newServer.code = server.code;

      return (
        axios.post('/servers/add', newServer)
          .then(response => {
            return response;
          })
          .catch(error => {
            return error;
          })
      )
    }
  },

  addMenu: (item) => {
    if (item) {
      let newItem = {};
      newItem.name = item.name;
      newItem.description = item.description;
      newItem.cost = parseFloat(item.cost);
      newItem.category = item.category;
      return (
        axios.post('/menu/add', newItem)
          .then(response => {
            return response;
          })
          .catch(error => {
            return error;
          })
      )
    }
  },

  /* * * * * * * * * * * * * * * * * * * * * * * * *
  * * * * * * API CALLS FOR SHIFT MODEL  * * * * * *
  * * * * * * * * * * * * * * * * * * * * * * * * */

  // Get All shifts
  getShifts: () => {
    return axios.get("/shift")
  },

  // Start new shift
  startShift: (shift) => {
    console.log(shift);
    return (
      axios.post('/shift/start', shift)
        .then(response => {
          return response;
        })
        .catch(error => {
          return error;
        })
    )
  },

  // Update Shift
  updateShift: (shift) => {

    let URL = encodeURI("/shift/updateShift/" + shift.id);
    return (
      axios.put(URL, shift)
        .then(response => {
          return response;
        })
        .catch(error => {
          return error;
        })
    )
  },

  // Finish Shift
  finishShift: (shift) => {
    // 'name': { type: String, required: true},
    // 'ordersNo': { type: Number, required: true },
    // 'cost': { type: Number, required: true },
    // 'cash': { type: Number, required: true },
    // 'card': { type: Number, required: true },
    console.log('finish shift data send', shift);
    let URL = encodeURI("/shift/finishShift/" + shift.id);
    return (
      axios.put(URL, shift)
        .then(response => {
          return response;
        })
        .catch(error => {
          return error;
        })
    )
  },

  /* * * * * * * * * * * * * * * * * * * * * * * * *
  * * * * * * API CALLS FOR REGISTER MODEL * * * * * *
  * * * * * * * * * * * * * * * * * * * * * * * * */

  // Get Register
  getRegister: () => {
    return axios.get("/register")
  },

  // Open Register
  openRegister: (register) => {
    return (
      axios.post('/register/open', register)
        .then(response => {
          return response;
        })
        .catch(error => {
          return error;
        })
    )
  },

  // Update Register
  updateRegister: (register) => {
    console.log(register);
    let URL = encodeURI("/register/updateRegister/" + register.id);
    return (
      axios.put(URL, register)
        .then(response => {
          return response;
        })
        .catch(error => {
          return error;
        })
    )
  },

  // Close Register
  closeRegister: (register) => {
    console.log(register);

    let URL = encodeURI("/register/close/" + register.id);
    return (
      axios.post(URL, register)
        .then(response => {
          console.log(response);
          return response;
        })
        .catch(error => {
          return error;
        })
    )
  },
}