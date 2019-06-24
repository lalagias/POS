// Reciept Modal to display the tables orders broke down by item, quantity and cost followed by sub-total, tax and total

// Uses react-bootstrap for CSS styling
import React,{Component }from 'react'
import {
    Button,
    FormControl,
} from 'react-bootstrap';
import Hoc from '../../../Hoc/Hoc';


const initialState = {
    tableName: "",
    error: false,
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

    //todo: need to add functionality to update table if it exists and if it is not occupied
    //todo: need to find and squash bug
    changeTable = () => {
        console.log(this.props.tables);
        // if (s1 === s2 || s1 === s2.toLowerCase())
        console.log('this.state.tableName', this.state.tableName);
        let tableName = this.state.tableName;
        this.props.tables.find((table) => {
            // console.log('this.state:', this.state)
            // console.log('this', this);
            // console.log(state.tableName);
            console.log('table.name', table.name);
             if (tableName === table.name || tableName === table.name.toLowerCase()) {
                console.log('found table');
                if (!table.isOccupied) {
                    console.log('table can change');
                    return tableName = table.name;

                } else {
                    console.log('table is occupied! Please choose another table.');
                    return this.setState({error : true});
                }
             } else {
                 console.log('no table with that name');
                 return this.setState({error : true});
             }
        });
        if (!this.state.error) {
            let tableObj = {};
            tableObj.bill = this.props.table.bill;

            tableObj.guestNumber = this.props.table.guestNumber;
            tableObj.isOccupied = this.props.table.isOccupied;
            tableObj.name = tableName;
            tableObj.pendingOrder = this.props.table.pendingOrder;
            tableObj.server = this.props.table.server;

            console.log('tableObj', tableObj);
            // console.log('this.props.table',this.props.table);
            // this.props.table.name = "Table " + this.state.tableNo;
            this.props.changeTable(tableObj);
            console.log('after api call:', this.props.table);
            console.log('after api call tableObj:', this.tableObj);
        } else {

        }
    };

    render() {
        let error = this.state.error;
        return(
            <div>
                <Hoc>
                    <FormControl
                        type="text"
                        value={this.state.tableName}
                        placeholder={this.props.table.name}
                        onChange={this.handleTableChange}/>
                    <Button
                        bsSize="large"
                        bsStyle="info"
                        onClick={this.changeTable}>
                    Change
                    </Button>
                    {error ? <div>error</div> : <div></div>}
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
