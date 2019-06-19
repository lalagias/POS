// Reciept Modal to display the tables orders broke down by item, quantity and cost followed by sub-total, tax and total

// Uses react-bootstrap for CSS styling
import React,{Component }from 'react'
import {
    Button,
    FormControl,
} from 'react-bootstrap';
import Hoc from '../../../Hoc/Hoc';


const initialState = {
    tableNo: ""
};

// TODo herein put the form and the submit button to send the data and update the table :D


class ChangeTable extends Component {
    state = initialState;

    handleTableChange = (event) => {
        if (event.target.value !== '') {
            this.setState({
                tableNo: event.target.value
            });
        }
    };

    //todo: bug with the UI update, if u refresh change table functionality is fine
    changeTable = () => {
        console.log('props before name changed:', this.props.table);
        this.props.table.name = "Table " + this.state.tableNo;
        console.log('props after name changed:', this.props.table);
        // let tab = this.props.table
        // console.log(tab)
        this.props.changeTable(this.props.table);
        console.log('after api call:', this.props.table);
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
