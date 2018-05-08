import React from "react";
import { Route, Switch } from 'react-router-dom';
import PropTypes from "prop-types";
import FoodList from '../FoodList/FoodList';
import FoodItem from '../FoodItem/FoodItem';

class Main extends React.Component {

    render() {

        return (
            <main>
                <Switch>
                    <Route exact path='/'
                           render={() => <FoodList foods={this.props.foods}/>}/>
                    <Route path='/:id'
                           render={({match}) => <FoodItem foods={this.props.foods[match.params.id - 1]}/>}/>
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