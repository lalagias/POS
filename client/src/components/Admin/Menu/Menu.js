import React, { Component } from 'react';
import { Button, Well, Panel, Grid, FormControl, Row, Col, Table } from 'react-bootstrap'
import { withAlert } from 'react-alert';

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
        let menu = { ...this.state.newMenu };
        menu[item] = event.target.value;
        this.setState({ newMenu: menu })

    };
    //submits new menu item
    newMenuSubmitHandler = () => {
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
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <Well>
                                <Table striped bordered condensed hover>
                                    <thead>
                                    <tr>
                                        <th> Name </th>
                                        <th> Description </th>
                                        <th> Cost </th>
                                        <th> Category </th>
                                        <th> Delete </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.menu.map(menu => {
                                            return (
                                                <tr data-menuid={menu._id} key={menu._id}>
                                                    <td> {menu.name} </td>
                                                    <td> {menu.description} </td>
                                                    <td> {menu.cost} </td>
                                                    <td> {menu.category} </td>
                                                    <td><Button id={menu.name + "delete"}
                                                                onClick={(event) => this.deleteMenuItem(event)}>X</Button></td>
                                                </tr>)
                                        }
                                    )}
                                    <tr>
                                        <td>
                                            <FormControl
                                                type="text"
                                                bsSize="small"
                                                value={this.state.newMenu.name}
                                                onChange={event => this.changeHandler(event, "name")} />
                                        </td>

                                        <td>
                                            <FormControl
                                                type="text"
                                                bsSize="small"
                                                value={this.state.newMenu.description}
                                                onChange={event => this.changeHandler(event, "description")} />
                                        </td>

                                        <td>
                                            <FormControl
                                                type="text"
                                                bsSize="small"
                                                value={this.state.newMenu.cost}
                                                onChange={event => this.changeHandler(event, "cost")} />
                                        </td>

                                        <td>
                                            <FormControl
                                                componentClass="select"
                                                value={this.state.newMenu.category}
                                                onChange={event => this.changeHandler(event,"category")}>
                                                <option selected
                                                        value="Salads"
                                                > Salads
                                                </option>
                                                <option
                                                    value="Starters"
                                                > Starters
                                                </option>
                                                <option
                                                    value="Drinks"
                                                > Drinks
                                                </option>
                                                <option
                                                    value="Main"
                                                > Main
                                                </option>
                                                <option
                                                    value="Special"
                                                > Special
                                                </option>
                                            </FormControl>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>

                                <Button
                                    bsSize="large"
                                    bsStyle="info"
                                    onClick={this.newMenuSubmitHandler}> Submit
                                </Button>
                            </Well>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default withAlert(Menu);
