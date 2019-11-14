import React from 'react'
import {Button, Modal, ButtonGroup} from 'react-bootstrap';
import Checkout from './Checkout/Checkout'
import Print from './Print/Print'
import ChangeTable from './ChangeTable/ChangeTable'
import Order from "../../Order/Order";

const occupied = props => {
  let occupiedRenderPage = null;

  // console.log('props', props);

//conditional rendering
  switch (props.render) {

    case ('receipt'):
      props.removeItemFromOrder;
      console.log('props.removeItemToggle', props.removeItemToggle);
      occupiedRenderPage = (
        <Print
          removeItemFromOrder={props.removeItemFromOrder}
          removeItemToggle={props.removeItemToggle}
          table={props.table}
        />
      );
      break;

    case ('checkout'):
      occupiedRenderPage = (
        <Checkout
          register={props.register}
          shift={props.shift}
          table={props.table}
          partialTable={props.partialTable}
          submitPayment={props.submitPayment}
          submitPartialPayment={props.submitPartialPayment}
          orderSubmit={props.orderSubmit}
          updatePendingOrder={props.updatePendingOrder}
          seatGuestsPartialPayment={props.seatGuestsPartialPayment}
        />
      );
      break;
    case('changeTable'):
      console.log('case entered changeTable');
      occupiedRenderPage = (
        <ChangeTable
          table={props.table}
          tables={props.tables}
          changeTable={props.changeTable}/>
      );
      break;
    default:
      occupiedRenderPage = (
        <ButtonGroup
          className="text-center"
          vertical
          block>
          <button
            className="btn-modal-fix btn-green"
            onClick={props.order}> Place Order
          </button>
          <button
            className="btn-modal-fix btn-submit"
            onClick={() => props.click("receipt")}> Print Check
          </button>
          <button
            className="btn-modal-fix btn-red"
            onClick={() => props.click("changeTable")}> Change Table
          </button>
          <button
            className="btn-modal-fix btn-gray"
            onClick={() => props.click("checkout")}> Checkout
          </button>
        </ButtonGroup>
      )
  }
  return (
    <div
      className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{props.table.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tile">
            <div className="tile-content">Guests: {props.table.guestNumber}</div>
            <div className="tile-content">Server: {props.server}</div>
          </div>
          {/*Guests: {props.table.guestNumber}*/}
          {/*{props.removeItemToggle ? <Button*/}
            {/*bsSize="large"*/}
            {/*bsStyle="info"*/}
            {/*className="pull-right"*/}
            {/*onClick={props.removeItem}>Edit</Button> : null}*/}
        </Modal.Body>
        {occupiedRenderPage}
        <Modal.Footer>
          <button
            className="btn-clearfix btn-red"
            onClick={props.close}>Close
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
};

export default occupied;