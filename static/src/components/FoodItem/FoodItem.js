import React from "react";
import { Link } from 'react-router-dom';

import NutrientTable from '../NutrientTable/NutrientTable';
import './FoodItem.css';
import PropTypes from "prop-types";

class FoodItem extends React.Component {

    truncate (string, limit=20) {
        if(string.length > limit) {
            return string.slice(0, limit) + " ..."
        } else {
            return string
        }
    }

    render() {
        const food = this.props.food;
        return (
            <Link to={`/${food.id}`}>
                <div key={food.id} className='FoodDetail'>
                    <img className='FoodDetail_img' src={food.image_url}/>
                    <h4 className='FoodDetail_title FoodDetail_tooltip'>{ this.truncate(food.name) }
                        <span className="FoodDetail_tooltiptext">{ food.name }</span>
                    </h4>
                    <div className="extra-details">
                    <div className='FoodDetail_info'>
                        <span>wt: { food.weight }</span>
                        <span>measure: { food.measure }</span>
                    </div>
                    <NutrientTable nutrients={ food.nutrients } />
                    </div>
                </div>
            </Link>
        );
    }
}

FoodItem.propTypes = {
    food: PropTypes.object.isRequired
};

export default FoodItem;
