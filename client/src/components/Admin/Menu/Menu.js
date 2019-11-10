import React, { Component } from 'react';
import { Grid, FormControl, Row, Col } from 'react-bootstrap'
import {withAlert} from 'react-alert';
import Hoc from '../../Hoc/Hoc';

// makes it easy to reset the state of the page / clear the forms

const initialState = {
  newMenu: {
    name: "",
    description: "",
    cost: "",
    category: "Salads"
  }
};

class Menu extends Component {
  state = initialState;

  //updates states immediately on change for all onChange events
  changeHandler = (event, item) => {
    let menu = {...this.state.newMenu};
    menu[item] = event.target.value;
    this.setState({newMenu: menu}, () => {
      console.log('this.state', this.state)
    })

  };

  // Submit New menu item
  newMenuSubmitHandler = (event) => {
    event.preventDefault();
    this.props.addMenu(this.state.newMenu);
    this.resetToInitialState();
  };

  resetToInitialState = () => {
    this.setState(initialState, function () {
      this.props.alert.show('New Menu Item Successfully Submitted.')
    })
  };

  // called when delete ("X") button is clicked
  deleteMenuItem = (event) => {
    // Retrieves the id information and removes the word delete to retrieve the item name
    console.log('deleteMenuItem', event.target);
    console.log('deleteMenuItem', event.target.parentElement);
    console.log('deleteMenuItem', event.target.parentElement.parentElement);
    let menuItem = {};
    menuItem.id = event.target.parentElement.parentElement.dataset.menuid;
    console.log('menuItem.id', menuItem.id);
    this.props.menuDelete(menuItem);
  };

  render() {

    return (
      <Hoc>
        <Col
          className="mb-3"
          lg={6}
          xs={12}>
          <div className="card">
            <div className="card-title">
              Menu Management
            </div>
            {this.props.menu.map(menu => {
                return (
                  <div className="tile">
                    <Grid fluid>
                      <Row
                        data-menuid={menu._id} key={menu._id}
                      >
                        <Col
                          className="pt-2 "
                          lg={3}
                        > {menu.name} </Col>
                        <Col
                          className="pt-2 "
                          lg={3}
                        > {menu.description} </Col>
                        <Col
                          className="pt-2 "
                          lg={2}
                        > {menu.cost}&euro; </Col>
                        <Col
                          className="pt-2 "
                          lg={2}
                        > {menu.category} </Col>
                        <Col
                          className="pt-2 "
                          lg={1}
                        >
                          <button
                            className="btn-clearfix btn-red btn-delete"
                            id={menu.name + "delete"}
                            onClick={(event) => this.deleteMenuItem(event)}>
                            X
                          </button>
                        </Col>
                      </Row>
                    </Grid>
                  </div>)
              }
            )}
            <form>
              <div className="form-row">
                <FormControl
                  type="text"
                  value={this.state.newMenu.name}
                  placeholder="Enter name"
                  onChange={event => this.changeHandler(event, "name")}/>
                <FormControl
                  type="text"
                  value={this.state.newMenu.description}
                  placeholder="Enter description"
                  onChange={event => this.changeHandler(event, "description")}/>

                <FormControl
                  type="text"
                  value={this.state.newMenu.cost}
                  placeholder="Enter cost"
                  onChange={event => this.changeHandler(event, "cost")}/>

                <FormControl
                  componentClass="select"
                  value={this.state.newMenu.category}
                  onChange={event => this.changeHandler(event, "category")}>
                  <option selected
                          value="Salads"
                  >
                    Salads
                  </option>
                  <option
                    value="Starters"
                  >
                    Starters
                  </option>
                  <option
                    value="Drinks"
                  >
                    Drinks
                  </option>
                  <option
                    value="Main"
                  >
                    Main
                  </option>
                  <option
                    value="Special"
                  >
                    Special
                  </option>
                </FormControl>
                <div className="text-center">
                  <button
                    className="btn-clearfix btn-submit"
                    onClick={this.newMenuSubmitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Hoc>
    )
  }
}

export default withAlert(Menu);
