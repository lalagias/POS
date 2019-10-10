import React, {Component} from 'react';
import {
    Button,
    Well,
    ListGroup,
    ListGroupItem,
    DropdownButton,
    MenuItem,
    FormGroup,
    FormControl,
    ControlLabel,
    Table,
    Grid
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
    partialPaymentItems: []
};

class Checkout extends Component {
    state = initialState;

    resetToInitialState = () => {
        this.setState(initialState)
    };

    tablePropsToState = () => {
        console.log(this.props.table.bill.items);
        this.setState({partialPaymentItems: [...this.props.table.bill.items]}, () => {
            console.log(this.state.partialPaymentItems);
        });

    };

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

    handleAmountChange=(event) => {
        //could use some validation if time allows
        this.setState({amountTendered: event.target.value})
    };

    handleCreditChange=(event) => {
        //could use some validation if time allows
        let card={...this.state.card};
        card.cardNumber = event.target.value;
        this.setState({card: card})
    };

    handleExpChange=(event) => {
        //could use some validation if time allows
        let card = { ...this.state.card };
        card.cardExp = event.target.value;
        this.setState({ card: card })
    };

    handleCvcChange=(event) => {
        //could use some validation if time allows
        let card = { ...this.state.card };
        card.cvc = event.target.value;
        this.setState({ card: card })
    };

    submitPayment=()=>{
        let paymentObject = {};
        paymentObject.amount = this.state.amountTendered;
        paymentObject.paymentType = this.state.paymentMethod;
        paymentObject.card = this.state.card;
        paymentObject.bill = this.props.table.bill;

        //send the object "down the chain"
        this.props.submitPayment(paymentObject);
        //reset the state
        this.resetToInitialState();
    };

    // called when Choose ("+") button is clicked
    getItemToPayPartial = (event) => {
        this.tablePropsToState();

        // Retrieves the id information and removes the word delete to retrieve the item name
        const itemToPay = event.target;
        let itemToPayQuantity = itemToPay.parentElement.previousSibling;
        let itemToPayQuantityInt = parseInt(itemToPayQuantity.getAttribute('data-quantity'), 16);
        if (itemToPayQuantityInt > 0) {
            const itemToPayName = itemToPay.id.replace("choose","");
            console.log('itemToPay', itemToPay);
            console.log('itemToPayName', itemToPayName);
            console.log('itemToPayQuantityInt', itemToPayQuantityInt);

            const itemObject = {
                name: itemToPayName,
                quantity: null,
            };

            console.log('itemObject', itemObject);
            //
            // this.setState({ partialPaymentItems: [...this.state.partialPaymentItems, itemObject] });
            // this.setState({partialPaymentItems: {...this.state.partialPaymentItems, quantity: }});
            console.log(this.state.partialPaymentItems);
            itemToPayQuantity.setAttribute('data-quantity', itemToPayQuantityInt - 1);
            itemToPayQuantityInt = parseInt(itemToPayQuantity.getAttribute('data-quantity'), 16);
            itemToPayQuantity.innerText = itemToPayQuantityInt;
        }
    };

    render() {

        //conditional rendering based on the pulldown menu
        let paymentMethodRender = null;
        switch(this.state.paymentMethod){
            
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
                            <Table striped bordered condensed hover>
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
                                            <td data-quantity={item.quantity}>
                                                {item.quantity}
                                            </td>
                                            <td>
                                                <Button bsStyle="info" id={item.name + " choose"} onClick={(event) => this.getItemToPayPartial(event)}>+</Button>
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
                                    <tr>Partial Payment Bill</tr>
                                </thead>
                                <tbody>
                                    {/* Loops through partialPaymentItems and dispays the item name, quantity and delete button */}
                                    {this.state.partialPaymentItems.map((item) => {
                                        return (
                                            <tr key={item._id} data-quantity={item.quantity}>
                                                <td>
                                                    {item.name}
                                                </td>
                                                <td>
                                                    {item.quantity}
                                                </td>
                                                <td>
                                                    <Button id={item.name + "delete"} onClick={(event) => this.getItemToRemove(event)}>X</Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Grid>
                        <Button
                            bsSize="large"
                            bsStyle="info"
                            disabled>Submit</Button>
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
                        onChange={this.handleAmountChange} />
                    </div>
                    <div>
                        <ControlLabel>Card Number</ControlLabel>
                        <FormControl 
                        type="text" 
                        value={this.state.card.cardNumber} 
                        placeholder="Card Number" 
                        onChange={this.handleCreditChange} />
                    </div>
                    <div>
                        <ControlLabel>Card Expiration</ControlLabel>
                        <FormControl 
                        type="text" 
                        bsSize="small" 
                        value={this.state.card.cardExp} 
                        placeholder="Card Expiration" 
                        onChange={this.handleExpChange} />
                    </div>
                    <div>
                        <ControlLabel>Card CVC</ControlLabel>
                        <FormControl 
                        type="text" 
                        bsSize="small" 
                        value={this.state.card.cvc} 
                        placeholder="CVC" 
                        onChange={this.handleCvcChange} />
                    </div>
                    <Button bsSize="large" 
                    bsStyle="info" 
                    onClick={this.submitPayment}>Submit</Button>
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
