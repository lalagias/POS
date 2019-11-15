// Order Window to place orders.

// Menubuttons displays imports the items in the center of the screen
// Order list displays the far right list of items
// Hoc is a self wrapper for react

import React, {Component} from 'react';
import {Button, Panel, Grid, Row, Col, Well} from 'react-bootstrap';
import Menubuttons from "./MenuButtons";
import OrderList from "./OrderList";
import Hoc from "../Hoc/Hoc";


class Order extends Component {
  // State category holds the selected food category to be displayed ex:entree
  state = {
    category: "",
    newOrderList: []
  };

  // Passed as prop to Menu buttons and processes the clicking of an item to be added to the pending order
  addToOrder = (newItem) => {
    //props.table is passed in from app.js and is information for that table from state.
    let orderList = this.props.table.pendingOrder;

    let itemIndex;

    //Looks to see if the item already exists in orderList if found increase its quantity count by 1 if not found push the information into the list.
    itemIndex = orderList.findIndex(index => index.name === newItem.name);
    itemIndex !== -1 ? orderList[itemIndex].quantity = parseInt(orderList[itemIndex].quantity, 10) + 1 : orderList.push(newItem);
    console.log('this.props.table.pendingOrder FROM ADD-TO-ORDER', orderList);
    //function passed in from app.js and adds the item to app.js' pendingOrder state
    this.props.updatePendingOrder(orderList);
  };

  /*
      When the remove button ("X") is clicked in orderList this function is called to remove 1 unit of that item from the list.
  */
  removeFromOrder = (itemToRemove) => {
    let orderList = this.props.table.pendingOrder;
    let itemIndex;

    // Find the index position of the item in the list
    itemIndex = orderList.findIndex(index => index.name === itemToRemove);

    // if quantity of item is greater than 1 subtract 1 from the quantity else remove the item completely
    orderList[itemIndex].quantity > 1 ? orderList[itemIndex].quantity = parseInt(orderList[itemIndex].quantity, 10) - 1 : orderList.splice(orderList[itemIndex], 1);

    // call function in app.js to update app.js state
    this.props.updatePendingOrder(orderList);
  };

  // Sets state of category with the name of the category clicked
  onItemClick = event => {
    this.setState({
      category: event.target.id
    });
  };

  // Upon clicking the Submit button this function is called
  // Calls the following functions residing in app.js to move the orders from pending to ordered
  orderSubmit = () => {
    let orderList = this.props.table.pendingOrder;
    console.log('this.props.table.pendingOrder', this.props.table.pendingOrder);
    // console.log(this.state.newOrderList);
    console.log('orderList', orderList);
    // Empties app.js pendingOrder State for active table
    this.props.updatePendingOrder(orderList);
    // Passes the information to app.js for processing
    this.props.orderSubmit();
    // console.log(this.state.newOrderList);
  };

  updatePending = () => {
    let orderList = this.props.table.pendingOrder;
    this.props.updatePendingOrder(orderList);
  };

  // Renders a list of categories, the items the ordered list and a submit button
  render() {
    return (
      <Hoc>
        <Col id="section" xs={12} className="mb-3">
          <div className="card">
            <div className="menu-items-bar text-center">
              <Grid fluid>
                <Row>
                  <Col sm={2} smOffset={1} xs={12} className="category" onClick={(event) => this.onItemClick(event)} id={"Drinks"}>
                    Drinks
                  </Col>
                  <Col sm={2} xs={12} className="category" onClick={(event) => this.onItemClick(event)} id={"Salads"}>
                    Salads
                  </Col>
                  <Col sm={2} xs={12} className="category" onClick={(event) => this.onItemClick(event)} id={"Starters"}>
                    Starters
                  </Col>
                  <Col sm={2} xs={12} className="category" onClick={(event) => this.onItemClick(event)} id={"Main"}>
                    Main
                  </Col>
                  <Col sm={2} xs={12} className="category" onClick={(event) => this.onItemClick(event)} id={"Special"}>
                    Special
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </Col>
        <Col id="items" className="mb-3" sm={6} xs={12}>
          <div className="card">
            <div className="card-title">
              Menu Items
            </div>
            <div className="card-content">
              <Grid fluid>
                <Row>
                  <Menubuttons addToOrder={this.addToOrder.bind(this)} menu={this.props.menu}
                               category={this.state.category}/>
                </Row>
              </Grid>
            </div>
          </div>
        </Col>
        <Col id="order-list" sm={6} xs={12}>
          <div className="card">
            <div className="card-title">
              Order Items
            </div>
            <OrderList removeFromOrder={this.removeFromOrder.bind(this)}
                       newOrderList={this.props.table.pendingOrder}/>
            <div className="text-center">
              <div id="comments" className="mb-3">
                  <textarea cols="42" rows="8">
                  </textarea>
              </div>
              <button className="btn-clearfix btn-submit" onClick={() => this.orderSubmit()}>Submit</button>
            </div>
          </div>
        </Col>
      </Hoc>
    )
  }
}

export default Order;