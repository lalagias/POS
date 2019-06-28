import React from 'react';
import { Grid, Row, Jumbotron } from'react-bootstrap'
import Servers from './Servers/Servers'
import Menu from './Menu/Menu'
import Total from './Total/Total'

const admin = props => (
        <Grid>
            <Row>
                <Jumbotron>
                    <h1> Admin Console </h1>
                    <Total
                    todaysTotal={props.todaysTotal}
                    shiftTotal={props.shiftTotal}/>
                </Jumbotron>
                <Servers
                 servers={props.servers}
                 addServer={props.addServer}/>
                <Menu
                 menu={props.menu} 
                 addMenu={props.addMenu}/>
            </Row>  
        </Grid>
);

export default admin;
