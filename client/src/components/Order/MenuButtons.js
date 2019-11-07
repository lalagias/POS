import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class MenuButtons extends Component {
    
    // Takes the information regarding the item that was clicked, places it in an array, then passes it back to Order page to be processed
    addOrder = (event) => {
        const itemToAdd = {name: event.target.id, quantity: 1};
        this.props.addToOrder(itemToAdd);
    };

    // Loops through list of items to be displayed based on the category chosen
    // If category is blank don't display anything
    renderButtons(props){
        if(props.category !== ""){
            return (
                props.menu.map((items) => {
                    if (items.category === props.category){
                        return <Button key={items._id} id={items.name} onClick={(event) => this.addOrder(event)}>{items.name}</Button>
                    }
                })
            );     
        }else{
            return <p/>
        }
    }

    // Calls renderButtons to process items to be displayed
    render () {
        return(
            <div>
                {this.renderButtons(this.props)}
            </div>
        )
    }
}

export default MenuButtons;