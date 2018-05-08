import React from "react";
import PropTypes from 'prop-types';
import FoodItem from '../FoodItem/FoodItem';
import './FoodList.css';


class FoodList extends React.Component {

    render() {
        const list = [];

        this.props.foods.forEach((food) => {
            list.push(
                <FoodItem food={food} key={food.id}/>
            );
        });

        return (
            <div>
                <div className="FoodList">{list}</div>
                <div>{this.props.errorMessage}</div>
            </div>
        );
    }
}

FoodList.propTypes = {
    foods: PropTypes.array.isRequired
};

export default FoodList