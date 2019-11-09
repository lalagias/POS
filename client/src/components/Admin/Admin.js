import React from 'react';
import {Grid, Row, Jumbotron} from 'react-bootstrap';
import Servers from './Servers/Servers';
import Menu from './Menu/Menu';
import Total from './Total/Total';
import Shifts from './Shifts/Shifts';
import Register from './Register/Register';

const admin = props => (
  <Grid className="mt-5">
    <Row>
      <Jumbotron>
        <h1> Admin Console </h1>
        <Total
          todaysTotal={props.todaysTotal}
          shiftTotal={props.shiftTotal}/>
      </Jumbotron>
      <Shifts/>
      <Register/>
      <Servers
        servers={props.servers}
        addServer={props.addServer}/>
      <Menu
        menuDelete={props.menuDelete}
        menu={props.menu}
        addMenu={props.addMenu}/>
    </Row>
  </Grid>
);

export default admin;
