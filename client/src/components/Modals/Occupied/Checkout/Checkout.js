import React, {Component} from 'react';
import {
  ControlLabel,
  DropdownButton,
  FormControl,
  FormGroup,
  Grid,
  Row,
  Col,
  MenuItem,
} from 'react-bootstrap';
import Hoc from '../../../Hoc/Hoc';

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

    //send the object "down the chain"
    this.props.submitPayment(paymentObject);
    //reset the state
    this.resetToInitialState();
  };

  // Called when Choose ("+") button is clicked
  getItemToPayPartial = (event) => {
    event.preventDefault();

    console.log('ADD PARTIAL ITEM');
    console.log('event.target', event.target);
    // Retrieves the event.target information
    const itemToPay = event.target;

    let itemToPayQuantity = itemToPay.parentElement.previousSibling;
    let itemToPayQuantityInt = parseInt(itemToPayQuantity.getAttribute('data-quantity'), 16);
    let itemToPayChargeInt = parseFloat(itemToPayQuantity.getAttribute('data-charge'));
    console.log('itemToPayQuantity', itemToPayQuantity);
    console.log('itemToPayQuantityInt', itemToPayQuantityInt);
    console.log('itemToPayChargeInt', itemToPayChargeInt);
    let itemToPayCost = itemToPayChargeInt / itemToPayQuantityInt;

    // Condition that you can't add any more items if quantity is zero
    if (itemToPayQuantityInt > 0) {
      // removes the word choose to retrieve the item name
      const itemToPayName = itemToPay.id.replace(" choose", "");
      console.log('itemToPayName', itemToPayName);
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
      console.log('itemToPayQuantityInt', itemToPayQuantityInt);
      console.log('itemToPayQuantity', itemToPayQuantity);
      console.log('this.state', this.state.partialTotal);
      console.log('this.state', this.state.partialPaymentItems);
    }
  };

  // called when Remove ("X") button is clicked
  removeItemFromPartialPaymentBill = (event) => {
    event.preventDefault();

    console.log('REMOVE ITEM FROM PARTIAL');
    console.log('this.state.partialTotal', this.state.partialTotal);
    console.log('this.state.partialPaymentItems', this.state.partialPaymentItems);

    console.log('event.target', event.target);
    // Retrieves the event.target information
    const itemToPay = event.target;

    let itemToPayQuantity = itemToPay.parentElement.previousSibling;
    let itemToPayQuantityInt = parseInt(itemToPayQuantity.getAttribute('data-quantity'), 16);
    let itemToPayChargeInt = parseFloat(itemToPayQuantity.getAttribute('data-charge'));
    console.log('itemToPayQuantity', itemToPayQuantity);
    console.log('itemToPayQuantityInt', itemToPayQuantityInt);
    console.log('itemToPayChargeInt', itemToPayChargeInt);
    let itemToPayCost = itemToPayChargeInt / itemToPayQuantityInt;

    console.log('itemToPayCost', itemToPayCost);
    if (itemToPayQuantityInt > 0) {
      const itemToPayName = itemToPay.id.replace(" delete", "");
      console.log('itemToPayName', itemToPayName);

      // Find index of item in the state partialPaymentItems
      let indexPartialPaymentItem = this.state.partialPaymentItems.findIndex(item => item.name === itemToPayName);
      console.log('indexPartialPaymentItem', indexPartialPaymentItem);
      // Find index of item in the bill
      let propItemIndex = this.props.table.bill.items.findIndex(item => item.name === itemToPayName);
      console.log('propItemIndex', propItemIndex);

      // Increase quantity of item in the state of bill and recalculate new charge
      this.props.table.bill.items[propItemIndex].quantity += 1;
      this.props.table.bill.items[propItemIndex].charge = this.props.table.bill.items[propItemIndex].quantity * itemToPayCost;
      console.log('this.props.table.bill.items[propItemIndex].quantity', this.props.table.bill.items[propItemIndex].quantity);
      console.log('this.props.table.bill.items[propItemIndex].charge', this.props.table.bill.items[propItemIndex].charge);

      // Set new State of partial Data
      let itemsCopy = this.state.partialPaymentItems;
      itemsCopy[indexPartialPaymentItem].quantity -= 1;
      itemsCopy[indexPartialPaymentItem].charge = itemsCopy[indexPartialPaymentItem].cost * itemsCopy[indexPartialPaymentItem].quantity;
      console.log('itemsCopy', itemsCopy);
      console.log('itemsCopy[indexPartialPaymentItem]', itemsCopy[indexPartialPaymentItem]);

      let partialTotal = itemsCopy.reduce((a, b) => a + b.charge, 0);

      this.setState({partialTotal: partialTotal}, () => {
        console.log('this.state.partialTotal', this.state.partialTotal);
      });
      this.setState({partialPaymentItems: [...itemsCopy]}, () => {
        console.log('this.state.partialPaymentItems', this.state.partialPaymentItems)
      });

      console.log('itemToPayQuantityInt', itemToPayQuantityInt);
      itemToPayQuantity.setAttribute('data-quantity', itemToPayQuantityInt - 1);
      itemToPayQuantityInt = parseInt(itemToPayQuantity.getAttribute('data-quantity'), 16);
      itemToPayQuantity.innerText = itemToPayQuantityInt;

      console.log('itemToPayQuantityInt', itemToPayQuantityInt);
      console.log('itemToPayQuantity', itemToPayQuantity);
    }
  };

  submitPartialPayment = async () => {
    let newPartialTable = {...this.props.table};
    newPartialTable.name = newPartialTable.name + " partial";

    let orderList = [...this.state.partialPaymentItems];
    newPartialTable.pendingOrder = [...orderList];

    newPartialTable.bill.total -= this.state.partialTotal;
    newPartialTable.amountTendered = this.state.partialTotal;
    newPartialTable.card = this.state.card;
    newPartialTable.paymentType = this.state.paymentMethod;
    newPartialTable.paid = false;

    let seatGuestsPartialPayment = await this.props.seatGuestsPartialPayment(this.props.table.server, this.props.table.guestNumber, newPartialTable.name);
    let orderSubmit = await this.props.orderSubmit(newPartialTable);
  };

  render() {

    // conditional rendering based on the pull-down menu
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
            <div className="text-center">
              <button
                className="btn-clearfix btn-submit"
                onClick={this.submitPayment}>Submit
              </button>
            </div>
          </Hoc>
        );
        break;

      case("Payment Method"):
        paymentMethodRender = (
          <div className="text-center">
            <button
              className="btn-clearfix btn-submit"
              disabled>Submit
            </button>
          </div>
        );
        break;

      case("Partial Payment"):
        // this.tablePropsToState();
        paymentMethodRender = (
          <Hoc>
            <div className="text-center">
              Total Bill
            </div>
            <table className="mb-3">
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
                      <button className="btn-clearfix btn-submit btn icon-plus-symbol mb-0" id={item.name + " choose"}
                              onClick={(event) => this.getItemToPayPartial(event)}/>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <div
              className="text-center">
              Partial Payment Bill
              {/*{this.state.partialPaymentItems[0] !== undefined ? 'STATE ' + this.state.partialPaymentItems[0].quantity : 'STATE NULL'}*/}

              {/*PROPS: {this.props.table.bill.items[0].quantity}*/}
            </div>
            <table className="mb-3">
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
                      <button className="btn-clearfix btn-delete btn-red mb-0" id={item.name + " delete"}
                              onClick={(event) => this.removeItemFromPartialPaymentBill(event)}>-
                      </button>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <div className="tile text-center">
              <div className="tile-content">Partial Total: {this.state.partialTotal} &euro;</div>
            </div>

            <div className="text-center">
              <button className="btn-clearfix btn-submit"
                      onClick={this.submitPartialPayment}>Submit
              </button>
            </div>
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
              <button className="btn-clearfix btn-submit"
                      onClick={this.submitPayment}>
                Submit
              </button>
            </div>
          </Hoc>
        )
    }
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={6} smOffset={3}>
              <div className="tile">
                <div className="tile-content text-center">
                  Total: {this.props.table.bill.total} &euro;
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
        <form>
          <FormGroup>
            <Grid fluid>
              <Row>
                <Col xs={12} sm={6} smOffset={3}
                     className="text-center mb-3">
                  <DropdownButton
                    id="checkoutDropDown"
                    className="btn-clearfix btn-gray m-0"
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
                </Col>
                <Col xs={12} className="text-center">
                  {paymentMethodRender}
                </Col>
              </Row>
            </Grid>
          </FormGroup>
        </form>
      </div>
    )
  }
}

export default Checkout;
