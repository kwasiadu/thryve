import React from "react";
import PropTypes from 'prop-types';
import FoodItem from '../FoodItem/FoodItem';
import './FoodList.css';


class FoodList extends React.Component {

    render() {
        const rows = [];
        const foods = this.props.foods || [];

        foods.forEach((food) => {
            rows.push(
                <FoodItem food={food} key={food.id}/>
            );
        });

        return (
            <div>
                <div className="FoodList">{rows}</div>
                <div>{this.props.errorMessage}</div>
            </div>
        );
    }
}

FoodList.propTypes = {
    foods: PropTypes.array.isRequired
};

export default FoodList