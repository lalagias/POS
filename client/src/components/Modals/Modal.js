import React, { Component } from 'react';
import Hoc from '../Hoc/Hoc'
import Occupied from './Occupied/Occupied';
import NewSeating from './NewSeating/NewSeating'


class SeatModal extends Component {

    state = {
        chosenServer: "Select Server",
        guestNumber: "Select Number",
        occupiedRender: null,
        removeItemToggle: false,
    };

    occupiedRenderHandler = (page) => {
        this.setState({occupiedRender: page})
    };

    handleServerSelection = (server) => {
        this.setState({chosenServer: server});  
        this.props.setServer(server);     
    };

    setGuests = (numOfGuests) => {
        this.setState({guestNumber: numOfGuests})
    };

    removeItemFromOrder = () => {
        console.log('remove Item');
        this.setState({removeItemToggle: !this.state.removeItemToggle})
    };
    
    render() {
        let table = this.props.tables[this.props.activeTableIndex];
        let tables = this.props.tables;
        let removeItemToggle = this.state.removeItemToggle;

        if (this.props.activeTable) {
            return (
                <Hoc>
                    {/* if the table is occupied, render the waitstaff functions, else render a new seating function */}
                    {table.isOccupied ? (
                        <Occupied 
                        table={table}
                        tables={tables}
                        removeItemToggle={removeItemToggle}
                        click={this.occupiedRenderHandler}
                        removeItemFromOrder={this.removeItemFromOrder}
                        order={this.props.order}
                        receipt={this.props.receipt}
                        submitPayment={this.props.submitPayment}
                        changeTable={this.props.changeTable}
                        close={this.props.close}
                        render={this.state.occupiedRender} />
                    ) : (
                        <NewSeating 
                        table={table} 
                        chosenServer={this.state.chosenServer} 
                        servers={this.props.servers} 
                        setGuests={this.setGuests} 
                        seatGuests={this.props.seatGuests} 
                        handleServerSelection={this.handleServerSelection} 
                        guestNumber={this.state.guestNumber} 
                        close={this.props.close} 
                        submitButtonLockout={this.submitButtonLockout}/>   
                        )
                    }
                </Hoc>
            )
        }
        else {
            this.props.close();
            return null;
        }
    }
}
export default SeatModal;