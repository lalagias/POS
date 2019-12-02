import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import HOC from "../Hoc/Hoc";

const navbar = (props) => {

  return (
    <Nav
      navbar
      className="navigation-bar"
      activeKey={props.activePage}
      onSelect={k => props.handleSelect(k)}>
      <NavItem
        eventKey="Tables"
        title="Tables"
        className="tables-nav">
        Tables
      </NavItem>
      {props.activeTable ? (<NavItem
          eventKey="Orders"
          title="Orders"
          className="orders-nav"> Orders
        </NavItem>)
        :
        (<NavItem
          eventKey="Orders"
          title="Orders"
          disabled> Orders
        </NavItem>)}
      <NavItem
        eventKey="Admin"
        title="Admin"
        className="admin-nav">
        Admin
      </NavItem>
      {props.activeTable ?
        (<NavItem
          disabled
          eventKey="ActiveStuff"> Active Table: {props.activeTable}
        </NavItem>)
        : null}
      {
        props.loggedInUser ?
          (
            <HOC>
              <NavItem
                eventKey="LoggedInServer"
                title="LoggedInServer"
                disabled>{props.loggedInUser}
              </NavItem>
              <button
                title="LogOutUser"
                className="btn-clearfix btn-red"
                onClick={props.logOut}>Logout
              </button>
            </HOC>
          )
          : null}
    </Nav>
  );
};

export default navbar;
