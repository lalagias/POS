import React from 'react';
import Servers from './Servers/Servers';
import Menu from './Menu/Menu';
import Total from './Total/Total';
import Hoc from '../Hoc/Hoc';

const admin = props => (
  <Hoc>
    <Total
      server={props.server}
      register={props.register}
      getRegister={props.getRegister}
      getShift={props.getShift}
      shift={props.shift}
      todaysTotal={props.todaysTotal}
      shiftTotal={props.shiftTotal}/>
    <Menu
      menuDelete={props.menuDelete}
      menu={props.menu}
      addMenu={props.addMenu}/>
    <Servers
      servers={props.servers}
      addServer={props.addServer}/>
  </Hoc>
);

export default admin;
