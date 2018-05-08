import React from "react";
import { Route, Switch } from 'react-router-dom';
import PropTypes from "prop-types";
import FoodList from '../FoodList/FoodList';
import './Main.css';

class Main extends React.Component {

    render() {

        return (
            <main>
                <Switch>
                    <Route path='/'
                           render={() => {
                               return(
                                   <div>
                                       {    this.props.errorMessage &&
                                           <p className='errorMsg'>{this.props.errorMessage}</p>
                                       }
                                       <FoodList foods={this.props.foods} />
                                   </div>
                               )}
                           }/>
                </Switch>
            </main>
        );
    }
}

Main.propTypes = {
    foods: PropTypes.array.isRequired,
    errorMessage: PropTypes.string,
};

export default Main;