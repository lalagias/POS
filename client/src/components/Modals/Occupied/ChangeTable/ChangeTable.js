// Reciept Modal to display the tables orders broke down by item, quantity and cost followed by sub-total, tax and total

// Uses react-bootstrap for CSS styling
import React,{Component }from 'react'
import {
    Button,
    FormControl,
} from 'react-bootstrap';
import Hoc from '../../../Hoc/Hoc';


const initialState = {
    tableNo: "",
};

class ChangeTable extends Component {
    state = initialState;

    handleTableChange = (event) => {
        if (event.target.value !== '') {
            this.setState({
                tableNo: event.target.value
            });
        }
    };

    //todo: need to add functionality to update table if it exists and if it is not occupied
    changeTable = () => {
        console.log('props before name changed:', this.props.table);
        console.log('this.state.tableNo:', this.state.tableNo);

        let tableObj = {};
        tableObj.bill = this.props.table.bill;
        console.log('tableObj.bill.id', tableObj.bill.id);
        console.log('this.props.table.bill.id', this.props.table.bill.id);
        tableObj.guestNumber = this.props.table.guestNumber;
        tableObj.isOccupied = this.props.table.isOccupied;
        tableObj.name = "Table " + this.state.tableNo;
        tableObj.pendingOrder = this.props.table.pendingOrder;
        tableObj.server = this.props.table.server;

        console.log('tableObj', tableObj);
        // console.log('this.props.table',this.props.table);
        // this.props.table.name = "Table " + this.state.tableNo;
        this.props.changeTable(tableObj);
        console.log('after api call:', this.props.table);
        console.log('after api call tableObj:', tableObj);
    };

    render() {
        return(
            <div>
                <Hoc>
                    <FormControl
                        type="text"
                        value={this.state.tableNo}
                        placeholder={this.props.table.name}
                        onChange={this.handleTableChange}/>
                    <Button
                        bsSize="large"
                        bsStyle="info"
                        onClick={this.changeTable}>
                    Change
                    </Button>
                </Hoc>
            </div>
        )
    }
}
// Loops through the reciept items to display them individually and put them in Row Col form
/*
const ChangeT = props => {
    console.log(props.table)
    }
*/

export default ChangeTable;
