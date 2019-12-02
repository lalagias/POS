// Receipt Modal to display the tables orders broke down by item, quantity and cost followed by sub-total, tax and total

// Uses react-bootstrap for CSS styling
import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';

// Loops through the receipt items to display them individually and put them in Row Col form
const createReceipt = (items, toggle) => {
  return (
    items.map(item => {
      return (
        <div className="tile">
          <div className="tile-content">
            <Grid fluid>
              <Row key={item._id}>
                <Col xs={5}>
                  {item.name}
                </Col>
                <Col xs={3}>
                  {item.quantity}
                </Col>
                <Col xs={3}>
                  &euro; {parseFloat(item.charge).toFixed(2)}
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      )
    })
  )
};

// Renders headers and costs.
const print = props => {
  return (

    <Grid fluid>

      {createReceipt(props.table.bill.items, props.removeItemToggle)}

      <Row>
        <Col smOffset={3} sm={6} xs={12}>
          <div className="tile">
            <div className="tile-content text-center">
              Total: €{parseFloat(props.table.bill.total).toFixed(2)}
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  )
};

export default print;
