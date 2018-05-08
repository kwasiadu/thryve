import React from "react";
import { Link } from 'react-router-dom';

import NutrientTable from '../NutrientTable/NutrientTable';
import './FoodItem.css';
import PropTypes from "prop-types";

class FoodItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsHidden: true,
            height: 'short'
        };
        this.toggleDetails = this.toggleDetails.bind(this);
        this.truncate = this.truncate.bind(this);
    }

    toggleDetails() {
        this.toggleDetailsTimeout = window.setTimeout(function () {
            this.setState({
                detailsHidden: !this.state.detailsHidden
            });
            this.toggleDetailsTimeout = null
        }.bind(this), 100);

    }

    truncate(string, limit=40) {
        if(this.state.hidden && string.length > limit) {
            return string.slice(0, limit) + " ..."
        } else {
            return string
        }
    }

    componentWillUnmount () {
        if(this.toggleDetailsTimeout) {
            clearTimeout(this.toggleDetailsTimeout)
        }
    }

    render() {
        const food = this.props.food;
        return (
            <div key={food.id}
                 className={`FoodDetail ${this.state.detailsHidden && this.state.height}`}
                 onMouseEnter={this.toggleDetails}  onMouseLeave={this.toggleDetails}>
                <img className='FoodDetail_img' src={food.image_url}/>
                <h5 className='FoodDetail_title FoodDetail_tooltip'>{ this.truncate(food.name) }
                    <span className="FoodDetail_tooltiptext">{ food.name }</span>
                </h5>
                { !this.state.detailsHidden &&
                (<div className="extra-details">
                    <div className='FoodDetail_info'>
                        <span>wt: { food.weight }</span>
                        <span>measure: { food.measure }</span>
                    </div>
                    <NutrientTable nutrients={ food.nutrients } />
                </div>)}
            </div>
        );
    }
}

FoodItem.propTypes = {
    food: PropTypes.object.isRequired
};

export default FoodItem;
