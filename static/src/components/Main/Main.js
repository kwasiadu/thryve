import React from "react";
import { Route, Switch } from 'react-router-dom';
import PropTypes from "prop-types";
import FoodList from '../FoodList/FoodList';

class Main extends React.Component {

    render() {

        return (
            <main>
                <Switch>
                    <Route path='/'
                           render={() => <FoodList foods={this.props.foods}/>}/>
                </Switch>
            </main>
        );
    }
}

Main.propTypes = {
    foods: PropTypes.array.isRequired,
    searchText: PropTypes.string,
    errorMessage: PropTypes.string,
};

export default Main;