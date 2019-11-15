// Receipt Modal to display the tables orders broke down by item, quantity and cost followed by sub-total, tax and total

// Uses react-bootstrap for CSS styling
import React, {Component} from 'react'
import {
  FormControl,
} from 'react-bootstrap';
import Hoc from '../../../Hoc/Hoc';


const initialState = {
  tableName: "",
  error: false,
  errorMessage: "",
};

class ChangeTable extends Component {
  state = initialState;

  handleTableChange = (event) => {
    if (event.target.value !== '') {
      this.setState({
        tableName: event.target.value
      });
    }
  };

  changeTable = () => {
    let tableName = this.state.tableName;

    for (let table of this.props.tables) {
      // console.log('table', table);
      // return ;
      console.log('table.name', table.name);
      if (tableName === table.name || tableName === table.name.toLowerCase()) {
        console.log('tableName', tableName);
        if (!table.isOccupied) {
          tableName = table.name;

          let tableObj = {};

          tableObj.bill = this.props.table.bill;
          tableObj.guestNumber = this.props.table.guestNumber;
          tableObj.isOccupied = this.props.table.isOccupied;
          tableObj.name = tableName;
          tableObj.pendingOrder = this.props.table.pendingOrder;
          tableObj.server = this.props.table.server;

          this.props.changeTable(tableObj);
          this.setState({
            errorMessage: "",
            error: false
          });
        } else {
          console.log('table occupied');
          this.setState({
            errorMessage: "Table is occupied! Please choose another table.",
            error: true
          });
        }
      } else {
        console.log("No table with that name! Please enter a new table.");
        this.setState({
          errorMessage: "No table with that name! Please enter a new table.",
          error: true
        });
      }
    }
  };

  render() {

    return (
      <div>
        <Hoc>
          <FormControl
            type="text"
            value={this.state.tableName}
            placeholder={this.props.table.name}
            onChange={this.handleTableChange}/>
          <button
            className="btn-clearfix btn-submit"
            onClick={this.changeTable}>
            Change
          </button>
          {this.state.error ? <h3 className="text-center text-danger">{this.state.errorMessage}</h3> : null}
        </Hoc>
      </div>
    )
  }
}

export default ChangeTable;
