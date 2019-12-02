import React, {Component} from 'react';
import {Col} from 'react-bootstrap';

class MenuButtons extends Component {

  // Takes the information regarding the item that was clicked, places it in an array, then passes it back to Order page to be processed
  addOrder = (event) => {
    const itemToAdd = {name: event.target.id, quantity: 1};
    this.props.addToOrder(itemToAdd);
  };

  // Loops through list of items to be displayed based on the category chosen
  // If category is blank don't display anything
  renderButtons(props) {
    if (props.category !== "") {
      let noItems = true;

      let indexOfCategory = props.menu.findIndex((item) => {
        return item.category === props.category;
      });

      indexOfCategory === -1 ? noItems = true : noItems = false;

      if (!noItems) {
        return (
          props.menu.map((items) => {
            if (items.category === props.category) {
              return (
                <Col xs={6}>
                  <div className="tile">
                    <div className="tile-content hover-pointer text-center" key={items._id} id={items.name}
                         onClick={(event) => this.addOrder(event)}>
                      {items.name}
                    </div>
                  </div>
                </Col>
              )
            }
          })
        )
      } else {
        return (
          <Col xs={12}>
            <div className="tile">
              <div className="tile-content hover-pointer text-center">
                No Items in this category
              </div>
            </div>
          </Col>
        )
      }

    } else {

      return (
        <Col xs={12}>
          <div className="tile">
            <div className="tile-content hover-pointer text-center">
              Choose a category
            </div>
          </div>
        </Col>
      )
    }
  }

  // Calls renderButtons to process items to be displayed
  render() {
    return (
      <div>
        {this.renderButtons(this.props)}
      </div>
    )
  }
}

export default MenuButtons;