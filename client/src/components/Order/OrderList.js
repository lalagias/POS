import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-bootstrap';

// Renders a list of all items selected in the Order screen
class OrderList extends Component {
  getOrderItems = (props) => {
    return (
      <div className="card-content">
        {/* Loops through orderList from app.js state and displays the item name, quantity and delete button */}
        {props.newOrderList.map((item) => {
            return (
              <div className="tile">
                <Grid fluid>
                  <Row
                    className="text-center"
                    key={item._id}
                  >
                    <Col
                      className="pt-2 tile-content-menu"
                      xs={4}
                    > {item.name} </Col>
                    <Col
                      className="pt-2 tile-content-menu"
                      xs={4}
                    > {item.quantity} </Col>
                    <Col
                      className="pt-2 tile-content-menu"
                      xs={4}
                    >
                      <button
                        className="btn-clearfix btn-delete btn-red"
                        id={item.name + "delete"} onClick={(event) => this.getItemToRemove(event)}>-
                        {/*<img className="svg-icons" src={require('../../resources/svgs/minus-symbol.svg')} alt={"minus icon"}/>*/}
                      </button>
                    </Col>
                  </Row>
                </Grid>
              </div>
            )
          }
        )}
      </div>
    );
  };

  // called when delete ("X") button is clicked
  getItemToRemove = (event) => {
    // Retrieves the id information and removes the word delete to retrieve the item name
    const itemToRemove = event.target.id.replace("delete", "");
    console.log('itemToRemove', itemToRemove);
    // passes the item to Order to be processed
    this.props.removeFromOrder(itemToRemove);
  };

  // Renders the page by calling function
  render() {
    return (
      this.getOrderItems(this.props)
    )
  };
}

export default OrderList;