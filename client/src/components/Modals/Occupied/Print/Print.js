// Reciept Modal to display the tables orders broke down by item, quantity and cost followed by sub-total, tax and total

// Uses react-bootstrap for CSS styling
import React from 'react'
import {Row, Col, Button} from 'react-bootstrap';

const align = {
    textAlign: "left"
};


// Loops through the receipt items to display them individually and put them in Row Col form
const createReceipt = (items) => {
    return(
        items.map(item => {

            return(
                <Row key={item._id}>

                    <Col xs={5} style={align}>
                        {item.name}
                    </Col>

                    <Col xs={3}>
                        {item.quantity}
                    </Col>

                    <Col xs={3} style={align} >
                    ${parseFloat(item.charge).toFixed(2)}
                    </Col>

                </Row>
            );
        })
    )
};

// Renders headers and costs.
const print = props => {
    return (
        <div style={{height :'40vh', overflow: 'auto'}} >
            <Button
                bsSize="large"
                bsStyle="info">
                Edit
            </Button>
            <Row>

                <Col 
               xs={5}>
                    <h3>Item</h3>
                </Col>
                <Col 
                xs={3}>
                    <h3>#</h3>
                </Col>
                <Col 
                xs={3}>
                    <h3>Cost</h3>
                </Col>  
            </Row>
            {createReceipt(props.table.bill.items)}

            <Row>
                <Col mdOffset={4}  md={5} style={align}>
                    <h4>Total: €{parseFloat(props.table.bill.total).toFixed(2)}</h4>
                </Col>
            </Row>
            {/*<Row>
                <Col mdOffset={4} md={5} style={align}>
                    <h4>Tax: €{(parseFloat(props.table.bill.total) * 0.07).toFixed(2)}</h4>
                </Col>
            </Row>
            <Row>
                <Col mdOffset={4} md={5} style={align}>
                    <h4>Total: €{(parseFloat(props.table.bill.total) * 1.07).toFixed(2)}</h4>
                </Col>
                
            </Row>*/}


        </div>
    )
};

export default print;
