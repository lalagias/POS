import React, {Component} from 'react';
import {
  Button,
  ControlLabel,
  DropdownButton,
  FormControl,
  FormGroup,
  Grid,
  ListGroup,
  ListGroupItem,
  MenuItem,
  Panel,
  Table,
  Well
} from 'react-bootstrap';
import Hoc from '../../../Hoc/Hoc';
import API from "../../../../utils/API";

//initial state 
const initialState = {
  paymentMethod: "Payment Method",
  amountTendered: "",
  card: {
    cardNumber: "",
    cardExp: "",
    cvc: ""
  },
  partialPaymentItems: [],
  partialTotal: 0
};

class Checkout extends Component {
  state = initialState;

  resetToInitialState = () => {
    this.setState(initialState)
  };

  // tablePropsToState = () => {
  //     console.log(this.props.table.bill.items);
  //     let items = [...this.props.table.bill.items];
  //
  //     items.map(item => {
  //        // item.quantity = 0;
  //        return item.name;
  //     });
  //
  //     this.setState({partialPaymentItems: [...items]}, () => {
  //         console.log(this.state.partialPaymentItems);
  //     });
  //
  // };

  getUnpaidChecks = () => {
    console.log('getUnpaidChecks');
    //this checks the database on load to see if there are unpaid checks
    API.getTables().then(results => {
      console.log(results);
    });
  };

  payment = method => {
    this.setState({paymentMethod: method});
  };

  handleAmountChange = (event) => {
    //could use some validation if time allows
    this.setState({amountTendered: event.target.value})
  };

  handleCreditChange = (event) => {
    //could use some validation if time allows
    let card = {...this.state.card};
    card.cardNumber = event.target.value;
    this.setState({card: card})
  };

  handleExpChange = (event) => {
    //could use some validation if time allows
    let card = {...this.state.card};
    card.cardExp = event.target.value;
    this.setState({card: card})
  };

  handleCvcChange = (event) => {
    //could use some validation if time allows
    let card = {...this.state.card};
    card.cvc = event.target.value;
    this.setState({card: card})
  };

  submitPayment = () => {
    let paymentObject = {};
    paymentObject.amount = this.props.table.bill.total;
    paymentObject.paymentType = this.state.paymentMethod;
    paymentObject.card = this.state.card;
    paymentObject.bill = this.props.table.bill;

    console.log('this.state.amountTendered', this.state.amountTendered);
    console.log('this.state.paymentMethod', this.state.paymentMethod);
    console.log('this.props.table.bill', this.props.table.bill);
    console.log('this.state.partialTotal', this.state.partialTotal);

    //send the object "down the chain"
    this.props.submitPayment(paymentObject);
    //reset the state
    this.resetToInitialState();
  };

  // called when Choose ("+") button is clicked
  getItemToPayPartial = (event) => {
    console.log('this.props', this.props);
    // Retrieves the id information
    const itemToPay = event.target;

    let itemToPayQuantity = itemToPay.parentElement.previousSibling;
    let itemToPayQuantityInt = parseInt(itemToPayQuantity.getAttribute('data-quantity'), 16);
    let itemToPayChargeInt = parseFloat(itemToPayQuantity.getAttribute('data-charge'));

    let itemToPayCost = itemToPayChargeInt / itemToPayQuantityInt;

    // Condition that you can't add any more items if quantity is zero
    if (itemToPayQuantityInt > 0) {
      // removes the word choose to retrieve the item name
      const itemToPayName = itemToPay.id.replace(" choose", "");
      // create new item Object
      const itemObject = {
        name: itemToPayName,
        quantity: 1,
        charge: null,
        cost: itemToPayCost
      };

      // calculate charge (formula: cost * quantity)
      itemObject.charge = itemObject.cost * itemObject.quantity;

      // find index of item in the state
      let indexPartialPaymentItem = this.state.partialPaymentItems.findIndex(item => item.name === itemToPayName);
      let propItemIndex = this.props.table.bill.items.findIndex(item => item.name === itemToPayName);
      this.props.table.bill.items[propItemIndex].quantity -= 1;
      this.props.table.bill.items[propItemIndex].charge = this.props.table.bill.items[propItemIndex].quantity * itemToPayCost;

      let partialTotal = this.state.partialTotal;
      partialTotal += itemObject.charge;
      this.setState({partialTotal: partialTotal});

      // Condition to check if item exists in state
      if (indexPartialPaymentItem === -1) {
        //if not then update state just to entry it
        this.setState({partialPaymentItems: [...this.state.partialPaymentItems, itemObject]});
      } else {
        // else create new item with the new data to update the state
        let itemsCopy = this.state.partialPaymentItems;

        itemsCopy[indexPartialPaymentItem].quantity += 1;
        itemsCopy[indexPartialPaymentItem].charge = itemsCopy[indexPartialPaymentItem].cost * itemsCopy[indexPartialPaymentItem].quantity;

        partialTotal = itemsCopy.reduce((a, b) => a + b.charge, 0);

        this.setState({partialTotal: partialTotal});
        this.setState({partialPaymentItems: [...itemsCopy]});
      }

      itemToPayQuantity.setAttribute('data-quantity', itemToPayQuantityInt - 1);
      itemToPayQuantityInt = parseInt(itemToPayQuantity.getAttribute('data-quantity'), 16);
      itemToPayQuantity.innerText = itemToPayQuantityInt;
    }
  };

  // called when Remove ("X") button is clicked
  removeItemFromPartialPaymentBill = (event) => {
    console.log('THIS PROPS:', this.props);

    const itemToPay = event.target;

    let itemToPayQuantity = itemToPay.parentElement.previousSibling;
    let itemToPayQuantityInt = parseInt(itemToPayQuantity.getAttribute('data-quantity'), 16);
    let itemToPayChargeInt = parseFloat(itemToPayQuantity.getAttribute('data-charge'));

    let itemToPayCost = itemToPayChargeInt / itemToPayQuantityInt;
    if (itemToPayQuantityInt > 0) {
      const itemToPayName = itemToPay.id.replace(" delete", "");

      let indexPartialPaymentItem = this.state.partialPaymentItems.findIndex(item => item.name === itemToPayName);

      let propItemIndex = this.props.table.bill.items.findIndex(item => item.name === itemToPayName);

      this.props.table.bill.items[propItemIndex].quantity += 1;
      this.props.table.bill.items[propItemIndex].charge = this.props.table.bill.items[propItemIndex].quantity * itemToPayCost;

      let itemsCopy = this.state.partialPaymentItems;
      itemsCopy[indexPartialPaymentItem].quantity -= 1;
      itemsCopy[indexPartialPaymentItem].charge = itemsCopy[indexPartialPaymentItem].cost * itemsCopy[indexPartialPaymentItem].quantity;

      let partialTotal = itemsCopy.reduce((a, b) => a + b.charge, 0);
      this.setState({partialTotal: partialTotal});
      this.setState({partialPaymentItems: [...itemsCopy]},);

      itemToPayQuantity.setAttribute('data-quantity', itemToPayQuantityInt + 1);
      itemToPayQuantityInt = parseInt(itemToPayQuantity.getAttribute('data-quantity'), 16);
      itemToPayQuantity.innerText = itemToPayQuantityInt;
    }
  };

  submitPartialPayment = async () => {
    console.log('submit Partial Payment props.table', this.props.table.bill);

    let newPartialTable = {...this.props.table};

    console.log('newPartialTable BEFORE HANDLING', newPartialTable);
    console.log('this.state.partialPaymentItems', this.state.partialPaymentItems);
    newPartialTable.name = newPartialTable.name + " partial";
    let orderList = [...this.state.partialPaymentItems];
    newPartialTable.pendingOrder = [...orderList];
    0
    newPartialTable.bill.total -= this.state.partialTotal;
    newPartialTable.amountTendered = this.state.partialTotal;
    newPartialTable.card = this.state.card;
    newPartialTable.paymentType = this.state.paymentMethod;
    newPartialTable.paid = false;
    console.log('newPartialTable AFTER HANDLER', newPartialTable);
    // this.props.orderSubmit(newPartialTable);
    let seatGuestsPartialPayment = await this.props.seatGuestsPartialPayment(this.props.table.server, this.props.table.guestNumber, newPartialTable.name);
    let orderSubmit = await this.props.orderSubmit(newPartialTable);
  };

  // handleNewPartialTable = (newPartialTable) => {
  //   console.log('newPartialTable before', newPartialTable.name);
  //   newPartialTable.name = newPartialTable.name + " partial";
  //   console.log('newPartialTable after', newPartialTable.name);
  //   console.log('submit Partial Payment props.table', this.props.table.bill);
  //   let partialPaymentItems = [...this.props.table.bill.items];
  //   let partialTotal = this.props.table.bill.total;
  //   partialPaymentItems = [...this.state.partialPaymentItems];
  //   partialTotal = this.state.partialTotal;
  //   newPartialTable.bill.items = [...partialPaymentItems];
  //   newPartialTable.bill.total = partialTotal;
  //   console.log('newPartialTable', newPartialTable.bill);
  //   console.log('submit Partial Payment props.table', this.props.table);
  // };

  render() {

    //conditional rendering based on the pulldown menu
    let paymentMethodRender = null;
    switch (this.state.paymentMethod) {

      case("Cash"):
        paymentMethodRender = (
          <Hoc>
            <FormControl
              type="text"
              value={this.state.amountTendered}
              placeholder="Cash Tendered"
              onChange={this.handleAmountChange}/>
            <Button
              bsSize="large"
              bsStyle="info"
              onClick={this.submitPayment}>Submit</Button>
          </Hoc>
        );
        break;

      case("Payment Method"):
        paymentMethodRender = (
          <Button
            bsSize="large"
            bsStyle="info"
            disabled>Submit</Button>
        );
        break;

      case("Partial Payment"):
        // this.tablePropsToState();
        paymentMethodRender = (
          <Hoc>
            <Grid fluid>
              <Table striped bordered condensed hover className="mt-5">
                <thead>
                <tr>
                  <th>
                    Item
                  </th>
                  <th>
                    Quantity
                  </th>
                  <th>
                    Choose
                  </th>
                </tr>
                </thead>
                <tbody>
                {/* Loops through bill.items and displays the item name, quantity and delete button */}
                {this.props.table.bill.items.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        {item.name}
                      </td>
                      <td data-quantity={item.quantity} data-charge={item.charge}>
                        {item.quantity}
                      </td>
                      <td>
                        <Button bsStyle="info" id={item.name + " choose"}
                                onClick={(event) => this.getItemToPayPartial(event)}>+</Button>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </Table>
            </Grid>
            <Grid fluid>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>
                    Partial Payment Bill
                  </th>
                  <th>
                    Quantity
                  </th>
                  <th>
                    Delete
                  </th>
                </tr>
                </thead>
                <tbody>
                {/* Loops through partialPaymentItems and displays the item name, quantity and delete button */}
                {this.state.partialPaymentItems.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        {item.name}
                      </td>
                      <td data-quantity={item.quantity} data-charge={item.charge}>
                        {item.quantity}
                      </td>
                      <td>
                        <Button bsStyle="danger" id={item.name + " delete"}
                                onClick={(event) => this.removeItemFromPartialPaymentBill(event)}>X</Button>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </Table>
            </Grid>
            <Panel className="totalPanel text-center">
              <h3>Partial Total: {this.state.partialTotal} &euro;</h3>
            </Panel>
            <Button
              bsSize="large"
              bsStyle="info"
              onClick={this.submitPartialPayment}>Submit</Button>
          </Hoc>
        );
        break;

      // all non cash (credit)
      default:
        paymentMethodRender = (
          <Hoc>
            <div>
              <ControlLabel> Amount Tendered </ControlLabel>
              <FormControl
                type="text"
                value={this.state.amountTendered}
                placeholder="Credit Tendered"
                onChange={this.handleAmountChange}/>
            </div>
            <div>
              <ControlLabel>Card Number</ControlLabel>
              <FormControl
                type="text"
                value={this.state.card.cardNumber}
                placeholder="Card Number"
                onChange={this.handleCreditChange}/>
            </div>
            <div>
              <ControlLabel>Card Expiration</ControlLabel>
              <FormControl
                type="text"
                bsSize="small"
                value={this.state.card.cardExp}
                placeholder="Card Expiration"
                onChange={this.handleExpChange}/>
            </div>
            <div>
              <ControlLabel>Card CVC</ControlLabel>
              <FormControl
                type="text"
                bsSize="small"
                value={this.state.card.cvc}
                placeholder="CVC"
                onChange={this.handleCvcChange}/>
            </div>
            <div className="text-center">
              <Button
                bsSize="large"
                bsStyle="info"
                onClick={this.submitPayment}>
                Submit
              </Button>
            </div>
          </Hoc>
        )
    }
    return (
      <Well>
        <ListGroup>
          <ListGroupItem> Server: {this.props.table.server} </ListGroupItem>
          <ListGroupItem> ID: {this.props.table.bill.id} </ListGroupItem>
          <ListGroupItem> Total: {this.props.table.bill.total} </ListGroupItem>
        </ListGroup>
        <form>
          <FormGroup>
            <DropdownButton
              id="checkoutDropDown"
              title={this.state.paymentMethod}>
              {/*<MenuItem
                                    value="VISA" 
                                    onSelect={() => this.payment("VISA")}>VISA
                                    </MenuItem>

                                    <MenuItem 
                                    value="MasterCard" 
                                    onSelect={() => this.payment("MasterCard")}>MasterCard
                                    </MenuItem>

                                    <MenuItem 
                                    value="AMEX" 
                                    onSelect={() => this.payment("AMEX")}>AMEX
                                    </MenuItem>

                                    <MenuItem 
                                    value="Diners Club" 
                                    onSelect={() => this.payment("Diners Club")}>Diners Club
                                    </MenuItem>*/}
              <MenuItem
                value="Cash"
                onSelect={() => this.payment("Cash")}>Cash
              </MenuItem>
              <MenuItem
                value="Partial Payment"
                onSelect={() => this.payment("Partial Payment")}>Partial Payment
              </MenuItem>
            </DropdownButton>

            {paymentMethodRender}

          </FormGroup>
        </form>
      </Well>
    )
  }
}

export default Checkout;
